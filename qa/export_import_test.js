/* Test node untuk hardening export/import progress (js/app.js).
   Memuat blok EXPORT-IMPORT-PURE dari app.js (tanpa DOM) + stub localStorage.
   Jalankan: node qa/export_import_test.js  (dari root repo; exit 0 = ALL PASS) */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const appSrc = fs.readFileSync(path.join(__dirname, "..", "js", "app.js"), "utf-8");
const START = "/* EXPORT-IMPORT-PURE-START */";
const END = "/* EXPORT-IMPORT-PURE-END */";
const i0 = appSrc.indexOf(START);
const i1 = appSrc.indexOf(END);
if (i0 === -1 || i1 === -1 || i1 <= i0) { console.error("FAIL marker EXPORT-IMPORT-PURE tidak ditemukan di js/app.js"); process.exit(1); }
/* Gap (c) R10: doResetProgress WAJIB backup dulu sebelum removeItem (cek
   statis — doResetProgress sendiri di luar blok pure karena memanggil route()). */
if (!/function doResetProgress\(\)\s*\{\s*backupProgressNow\(\);\s*localStorage\.removeItem\("fmva_progress"\)/.test(appSrc)) {
  console.error("FAIL doResetProgress tidak memanggil backupProgressNow() sebelum removeItem");
  process.exit(1);
}
console.log("PASS doResetProgress: backupProgressNow() sebelum removeItem");
/* S1 R10: importProgress WAJIB membatalkan import (prog_backup_fail) bila
   backup gagal — guard pure-nya sendiri diuji di dalam blok (5h–5m). */
if (appSrc.indexOf("importBackupGuard(curP, backupProgressNow())") === -1 || appSrc.indexOf('T("prog_backup_fail")') === -1) {
  console.error("FAIL importProgress tidak memakai importBackupGuard / prog_backup_fail");
  process.exit(1);
}
console.log("PASS importProgress: importBackupGuard + prog_backup_fail terpasang");
const pureSrc = appSrc.slice(i0 + START.length, i1);

/* Stub localStorage (Map-backed, lengkap dengan length + key()). */
class FakeStorage {
  constructor(){ this.m = new Map(); }
  get length(){ return this.m.size; }
  getItem(k){ const v = this.m.get(String(k)); return v === undefined ? null : v; }
  setItem(k, v){ this.m.set(String(k), String(v)); }
  removeItem(k){ this.m.delete(String(k)); }
  key(i){ return Array.from(this.m.keys())[i] || null; }
  clear(){ this.m.clear(); }
}

const sandbox = {
  console: console,
  localStorage: new FakeStorage(),
  __fails: [],
  __passes: 0,
};
sandbox.__check = function(name, cond, detail){
  if (cond) { sandbox.__passes++; console.log("PASS " + name); }
  else { sandbox.__fails.push(name); console.log("FAIL " + name + (detail ? " — " + detail : "")); }
};
sandbox.__eq = function(a, b){ return JSON.stringify(a) === JSON.stringify(b); };
vm.createContext(sandbox);

const tests = `
(function(){
  const check = __check, eq = __eq;

  /* --- fixture --- */
  const cur = {
    lesson: { "f1": { read: true, quiz: 90, sheet: true }, "f2": { read: true, quiz: true } },
    quiz: { "f1": 90 },
    hellQuiz: { "f1": 80 },
    mistakes: { "m1": { k: "m1", n: 2, recovered: false }, "m2": { k: "m2", n: 1, recovered: true } },
    checker: { "f1": { score: 70, date: 1000 } },
    mission: { "x": { done: true } },
    streak: 5,
    _pg2: true
  };
  const imp = {
    lesson: { "f1": { read: true, quiz: 70 }, "f3": { read: true, quiz: 100 } },
    quiz: { "f1": 70, "f3": 100 },
    hellQuiz: { "f1": 95 },
    mistakes: { "m1": { k: "m1", n: 3, recovered: true }, "m3": { k: "m3", n: 1 } },
    checker: { "f1": { score: 85, date: 2000 }, "f2": { score: 60, date: 2000 } },
    mission: { "y": { done: false } },
    streak: 3,
    _pg2: true
  };

  /* (1) export v2 lalu import kembali = identik */
  const wrapped = wrapExport(cur, new Date("2026-11-09T10:00:00.000Z"));
  check("1a wrapExport: format/version/app", wrapped.format === "fmva-progress" && wrapped.version === 2 && wrapped.app === "1.69", JSON.stringify(wrapped).slice(0, 120));
  check("1b wrapExport: exportedAt ISO", wrapped.exportedAt === "2026-11-09T10:00:00.000Z", wrapped.exportedAt);
  const rt = parseProgressFile(JSON.stringify(wrapped));
  check("1c round-trip v2: format v2", rt.format === "v2", rt.format);
  check("1d round-trip v2: data identik", eq(rt.data, cur), JSON.stringify(rt.data));
  check("1e round-trip v2: tanpa key diabaikan", rt.ignored.length === 0, rt.ignored.join(","));

  /* (2) import legacy tetap jalan */
  const leg = parseProgressFile(JSON.stringify(cur));
  check("2a legacy: format legacy", leg.format === "legacy", leg.format);
  check("2b legacy: data identik", eq(leg.data, cur));
  const legMin = parseProgressFile(JSON.stringify({ lesson: {}, streak: 0 }));
  check("2c legacy minimal lolos", legMin.format === "legacy" && eq(legMin.data, { lesson: {}, streak: 0 }));

  /* (3) file rusak ditolak */
  function rejects(name, text){
    let ok = false;
    try { parseProgressFile(text); } catch (e) { ok = true; }
    check("3 " + name, ok, "tidak ditolak: " + text.slice(0, 60));
  }
  rejects("bukan JSON", "{bukan json");
  rejects("array top-level", "[1, 2, 3]");
  rejects("quiz bukan objek", JSON.stringify({ quiz: 5 }));
  rejects("lesson array", JSON.stringify({ lesson: [] }));
  rejects("mistakes null", JSON.stringify({ mistakes: null }));
  rejects("streak bukan number", JSON.stringify({ streak: "7" }));
  rejects("_pg2 bukan boolean", JSON.stringify({ _pg2: 1 }));
  rejects("simulator.best bukan number", JSON.stringify({ simulator: { best: "100" } }));
  rejects("simulator.runs bukan number", JSON.stringify({ simulator: { runs: "3" } }));
  rejects("simulator.last bukan number", JSON.stringify({ simulator: { last: "kemarin" } }));
  rejects("simulator array", JSON.stringify({ simulator: [] }));
  rejects("checker bukan objek", JSON.stringify({ checker: "x" }));
  rejects("format asing", JSON.stringify({ format: "lain", data: {} }));
  rejects("v2 tanpa data", JSON.stringify({ format: "fmva-progress", version: 2 }));
  rejects("v2 data array", JSON.stringify({ format: "fmva-progress", version: 2, data: [] }));
  rejects("v2 version 99 ditolak", JSON.stringify({ format: "fmva-progress", version: 99, data: {} }));
  rejects("v2 version 3 ditolak", JSON.stringify({ format: "fmva-progress", version: 3, data: {} }));
  rejects("v2 tanpa version ditolak", JSON.stringify({ format: "fmva-progress", data: {} }));
  rejects("v2 version string ditolak", JSON.stringify({ format: "fmva-progress", version: "2", data: {} }));
  rejects("string polos", '"hello"');
  rejects("null", "null");

  /* S2: version 2 (dan lebih lama) diterima */
  const v2ok = parseProgressFile(JSON.stringify({ format: "fmva-progress", version: 2, data: { lesson: {} } }));
  check("3u v2 version 2 diterima", v2ok.format === "v2", v2ok.format);
  const v1ok = parseProgressFile(JSON.stringify({ format: "fmva-progress", version: 1, data: { lesson: {} } }));
  check("3v v2 version 1 (lebih lama) diterima", v1ok.format === "v2", v1ok.format);

  /* simulator number / null lolos */
  const simOk = parseProgressFile(JSON.stringify({ simulator: { best: 100, runs: 3, last: 1762650000000 } }));
  check("3s simulator number lolos", simOk.format === "legacy" && simOk.data.simulator.best === 100 && simOk.data.simulator.runs === 3);
  const simNull = parseProgressFile(JSON.stringify({ simulator: { best: null, runs: 0 } }));
  check("3t simulator best null lolos", simNull.data.simulator.best === null && simNull.data.simulator.runs === 0);

  /* key tidak dikenal diabaikan, bukan ditolak */
  const unk = parseProgressFile(JSON.stringify({ lesson: {}, futureKey: { a: 1 }, streak: 2 }));
  check("3m unknown key diabaikan + dicatat", unk.ignored.length === 1 && unk.ignored[0] === "futureKey", unk.ignored.join(","));
  check("3n unknown key DIBUANG dari data import", unk.data.futureKey === undefined, JSON.stringify(unk.data));
  /* mode replace: data hasil parse sudah bersih (v2 wrapped) */
  const unkV2 = parseProgressFile(JSON.stringify({ format: "fmva-progress", version: 2, data: { lesson: {}, futureKey: 1 } }));
  check("3o unknown key v2 DIBUANG + dicatat", unkV2.ignored[0] === "futureKey" && unkV2.data.futureKey === undefined, JSON.stringify(unkV2.data));
  /* mode merge: unknown key dari imp dibuang, dari cur dipertahankan */
  const curUnk = { lesson: {}, oldKey: { z: 9 } };
  const impUnk = parseProgressFile(JSON.stringify({ lesson: {}, futureKey: { a: 1 } }));
  const mUnk = mergeProgress(curUnk, impUnk.data);
  check("3p merge: unknown key imp dibuang", mUnk.futureKey === undefined, JSON.stringify(mUnk));
  check("3q merge: unknown key cur dipertahankan", mUnk.oldKey && mUnk.oldKey.z === 9, JSON.stringify(mUnk));

  /* (4) merge mempertahankan skor terbaik + gabung mistakes/checker */
  const m = mergeProgress(cur, imp);
  check("4a lesson f1: quiz tertinggi 90", m.lesson["f1"].quiz === 90, JSON.stringify(m.lesson["f1"]));
  check("4b lesson f1: sheet tetap true", m.lesson["f1"].sheet === true);
  check("4c lesson f2: quiz true dipertahankan", m.lesson["f2"].quiz === true, JSON.stringify(m.lesson["f2"]));
  check("4d lesson f3: dari imp", m.lesson["f3"] && m.lesson["f3"].quiz === 100);
  check("4e quiz map: max per lesson", m.quiz["f1"] === 90 && m.quiz["f3"] === 100, JSON.stringify(m.quiz));
  check("4f hellQuiz: nilai tertinggi 95", m.hellQuiz["f1"] === 95, JSON.stringify(m.hellQuiz));
  check("4g mistakes m1: n=max(2,3)=3 + recovered", m.mistakes["m1"].n === 3 && m.mistakes["m1"].recovered === true, JSON.stringify(m.mistakes["m1"]));
  check("4h mistakes m2+m3: keduanya ada", m.mistakes["m2"] && m.mistakes["m3"] && m.mistakes["m3"].n === 1);
  check("4i checker f1: skor tertinggi 85", m.checker["f1"].score === 85, JSON.stringify(m.checker["f1"]));
  check("4j checker f2: dari imp", m.checker["f2"] && m.checker["f2"].score === 60);
  check("4k streak: max(5,3)=5", m.streak === 5, String(m.streak));
  check("4l mission: union — x cur + y imp keduanya bertahan", m.mission && m.mission["x"] && m.mission["x"].done === true && m.mission["y"] && m.mission["y"].done === false, JSON.stringify(m.mission));
  check("4m merge tidak mutasi input", cur.quiz["f1"] === 90 && imp.quiz["f1"] === 70);
  check("4n merge dgn cur kosong = imp", eq(mergeProgress({}, imp).quiz, imp.quiz));
  check("4o merge dgn imp kosong = cur", eq(mergeProgress(cur, {}).quiz, cur.quiz));

  /* (4p) M2: mission key sama — best=max, latest dari date terbaru, bal=OR, date=max */
  const mM = mergeProgress(
    { mission: { k: { best: 80, latest: 7, bal: false, date: 1000 } }, done: { a: true } },
    { mission: { k: { best: 60, latest: 9, bal: true, date: 2000 } }, done: { b: true } });
  check("4p mission key sama: best = max(80,60)", mM.mission["k"].best === 80, JSON.stringify(mM.mission["k"]));
  check("4q mission key sama: latest+date dari imp (date terbaru)", mM.mission["k"].latest === 9 && mM.mission["k"].date === 2000, JSON.stringify(mM.mission["k"]));
  check("4r mission key sama: bal = OR", mM.mission["k"].bal === true, JSON.stringify(mM.mission["k"]));
  const mM2 = mergeProgress(
    { mission: { k: { best: 50, latest: 5, bal: true, date: 3000 } } },
    { mission: { k: { best: 90, latest: 8, bal: false, date: 2000 } } });
  check("4s mission key sama: latest dari cur (date cur terbaru) + best max", mM2.mission["k"].best === 90 && mM2.mission["k"].latest === 5 && mM2.mission["k"].date === 3000 && mM2.mission["k"].bal === true, JSON.stringify(mM2.mission["k"]));
  check("4t done: union — a cur + b imp keduanya true", mM.done && mM.done["a"] === true && mM.done["b"] === true, JSON.stringify(mM.done));

  /* N4: simulator.runs = max, BUKAN jumlah (file tumpang tindih -> jumlah double-count) */
  const mS = mergeProgress({ simulator: { best: 80, runs: 3, last: 100 } }, { simulator: { best: 70, runs: 5, last: 200 } });
  check("4u simulator runs = max(3,5)=5, bukan 8", mS.simulator.runs === 5 && mS.simulator.best === 80 && mS.simulator.last === 200, JSON.stringify(mS.simulator));

  /* S3: checker skor seri -> date terbaru menang */
  const mC1 = mergeProgress({ checker: { f1: { score: 80, date: 1000 } } }, { checker: { f1: { score: 80, date: 2000 } } });
  check("4v checker seri: date imp terbaru menang", mC1.checker["f1"].date === 2000, JSON.stringify(mC1.checker["f1"]));
  const mC2 = mergeProgress({ checker: { f1: { score: 80, date: 3000 } } }, { checker: { f1: { score: 80, date: 2000 } } });
  check("4w checker seri: date cur terbaru menang", mC2.checker["f1"].date === 3000, JSON.stringify(mC2.checker["f1"]));
  const mC3 = mergeProgress({ checker: { f1: { score: 80 } } }, { checker: { f1: { score: 80, date: 2000 } } });
  check("4x checker seri: hanya imp punya date -> imp", mC3.checker["f1"].date === 2000, JSON.stringify(mC3.checker["f1"]));
  const mC4 = mergeProgress({ checker: { f1: { score: 80, date: 1000 } } }, { checker: { f1: { score: 80 } } });
  check("4y checker seri: hanya cur punya date -> cur", mC4.checker["f1"].date === 1000, JSON.stringify(mC4.checker["f1"]));
  const mC5 = mergeProgress({ checker: { f1: { score: 80 } } }, { checker: { f1: { score: 80 } } });
  check("4z checker seri: keduanya tanpa date -> cur", mC5.checker["f1"] && !("date" in mC5.checker["f1"]), JSON.stringify(mC5.checker["f1"]));

  /* (5) backup dibuat sebelum overwrite + maks 3 */
  localStorage.clear();
  check("5a tanpa progress: backup null", backupProgressNow() === null);
  localStorage.setItem("fmva_progress", JSON.stringify(cur));
  /* S5: tanggal tetap (bukan jam dinding) — backup deterministik. */
  const bkey = backupProgressNow(new Date(2026, 10, 9, 10, 0, 0));
  check("5b backup dibuat", typeof bkey === "string" && bkey.indexOf("fmva_progress_backup_") === 0, String(bkey));
  check("5b2 backup key stempel tanggal tetap", bkey === "fmva_progress_backup_20261109-100000", String(bkey));
  check("5c backup berisi progress lama", eq(JSON.parse(localStorage.getItem(bkey)), cur));
  check("5d stempel pola yyyymmdd-hhmmss", /^fmva_progress_backup_\\d{8}-\\d{6}$/.test(bkey), bkey);
  check("5g stempel beda detik dalam menit sama", progressBackupStamp(new Date(2026, 10, 9, 10, 0, 1)) !== progressBackupStamp(new Date(2026, 10, 9, 10, 0, 59)));
  /* S1: import dibatalkan bila backup gagal & progress saat ini tidak kosong */
  check("5h guard: progress isi + backup null -> batal", importBackupGuard(cur, null) === true);
  check("5i guard: progress isi + backup ok -> lanjut", importBackupGuard(cur, "fmva_progress_backup_20261109-100000") === false);
  check("5j guard: progress kosong + backup null -> lanjut", importBackupGuard({}, null) === false);
  check("5k guard: hanya _pg2 + backup null -> lanjut", importBackupGuard({ _pg2: true }, null) === false);
  /* backup gagal disimulasikan: localStorage yang throw di setItem (kuota). */
  localStorage.clear();
  localStorage.setItem("fmva_progress", JSON.stringify(cur));
  const realLS = localStorage;
  localStorage = { getItem: k => realLS.getItem(k), setItem: () => { throw new Error("quota"); },
    removeItem: k => realLS.removeItem(k), key: i => realLS.key(i), clear: () => realLS.clear(),
    get length(){ return realLS.length; } };
  check("5l backup gagal (setItem throw) -> null", backupProgressNow() === null);
  check("5m guard + backup gagal -> batal", importBackupGuard(cur, backupProgressNow()) === true);
  localStorage = realLS;
  /* pruning: 4 backup lama + 1 baru -> sisa 3 terbaru */
  localStorage.clear();
  ["20260101-000000", "20260102-000000", "20260103-000000", "20260104-000000"].forEach(s => {
    localStorage.setItem("fmva_progress_backup_" + s, "{}");
  });
  localStorage.setItem("fmva_progress", JSON.stringify(cur));
  backupProgressNow(new Date(2026, 0, 5, 0, 0, 0));
  const kept = [];
  for (let i = 0; i < localStorage.length; i++){
    const k = localStorage.key(i);
    if (k.indexOf("fmva_progress_backup_") === 0) kept.push(k);
  }
  kept.sort();
  check("5e pruning: maks 3 backup", kept.length === 3, kept.join(","));
  check("5f pruning: yang tertua terhapus", kept.indexOf("fmva_progress_backup_20260101-000000") === -1 && kept.indexOf("fmva_progress_backup_20260102-000000") === -1, kept.join(","));

  /* konstanta format */
  check("6a PROGRESS_EXPORT_VERSION=2", PROGRESS_EXPORT_VERSION === 2);
  check("6b PROGRESS_APP_VERSION=1.69", PROGRESS_APP_VERSION === "1.69");
})();
`;

vm.runInContext(pureSrc + "\n" + tests, sandbox);
console.log("\n" + sandbox.__passes + " passed, " + sandbox.__fails.length + " failed.");
if (sandbox.__fails.length) { console.log("FAILED: " + sandbox.__fails.join(", ")); process.exit(1); }
console.log("ALL PASS");
