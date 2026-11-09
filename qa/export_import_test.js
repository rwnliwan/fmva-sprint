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
  rejects("checker bukan objek", JSON.stringify({ checker: "x" }));
  rejects("format asing", JSON.stringify({ format: "lain", data: {} }));
  rejects("v2 tanpa data", JSON.stringify({ format: "fmva-progress", version: 2 }));
  rejects("v2 data array", JSON.stringify({ format: "fmva-progress", version: 2, data: [] }));
  rejects("string polos", '"hello"');
  rejects("null", "null");

  /* key tidak dikenal diabaikan, bukan ditolak */
  const unk = parseProgressFile(JSON.stringify({ lesson: {}, futureKey: { a: 1 }, streak: 2 }));
  check("3m unknown key diabaikan + dicatat", unk.ignored.length === 1 && unk.ignored[0] === "futureKey", unk.ignored.join(","));

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
  check("4l mission: dari imp bila ada", m.mission && m.mission["y"] && !m.mission["x"], JSON.stringify(m.mission));
  check("4m merge tidak mutasi input", cur.quiz["f1"] === 90 && imp.quiz["f1"] === 70);
  check("4n merge dgn cur kosong = imp", eq(mergeProgress({}, imp).quiz, imp.quiz));
  check("4o merge dgn imp kosong = cur", eq(mergeProgress(cur, {}).quiz, cur.quiz));

  /* (5) backup dibuat sebelum overwrite + maks 3 */
  localStorage.clear();
  check("5a tanpa progress: backup null", backupProgressNow() === null);
  localStorage.setItem("fmva_progress", JSON.stringify(cur));
  const bkey = backupProgressNow();
  check("5b backup dibuat", typeof bkey === "string" && bkey.indexOf("fmva_progress_backup_") === 0, String(bkey));
  check("5c backup berisi progress lama", eq(JSON.parse(localStorage.getItem(bkey)), cur));
  check("5d stempel pola yyyymmdd-hhmm", /^fmva_progress_backup_\\d{8}-\\d{4}$/.test(bkey), bkey);
  /* pruning: 4 backup lama + 1 baru -> sisa 3 terbaru */
  localStorage.clear();
  ["20260101-0000", "20260102-0000", "20260103-0000", "20260104-0000"].forEach(s => {
    localStorage.setItem("fmva_progress_backup_" + s, "{}");
  });
  localStorage.setItem("fmva_progress", JSON.stringify(cur));
  backupProgressNow();
  const kept = [];
  for (let i = 0; i < localStorage.length; i++){
    const k = localStorage.key(i);
    if (k.indexOf("fmva_progress_backup_") === 0) kept.push(k);
  }
  kept.sort();
  check("5e pruning: maks 3 backup", kept.length === 3, kept.join(","));
  check("5f pruning: yang tertua terhapus", kept.indexOf("fmva_progress_backup_20260101-0000") === -1 && kept.indexOf("fmva_progress_backup_20260102-0000") === -1, kept.join(","));

  /* konstanta format */
  check("6a PROGRESS_EXPORT_VERSION=2", PROGRESS_EXPORT_VERSION === 2);
  check("6b PROGRESS_APP_VERSION=1.69", PROGRESS_APP_VERSION === "1.69");
})();
`;

vm.runInContext(pureSrc + "\n" + tests, sandbox);
console.log("\n" + sandbox.__passes + " passed, " + sandbox.__fails.length + " failed.");
if (sandbox.__fails.length) { console.log("FAILED: " + sandbox.__fails.join(", ")); process.exit(1); }
console.log("ALL PASS");
