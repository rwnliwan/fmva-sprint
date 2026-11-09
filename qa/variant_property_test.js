/* Property test node untuk SEMUA varian mistake-review (Ronde 10, Gap b).
   Untuk tiap kunci varian dari registry LIVE (534 kunci x ID+EN), jalankan
   gen() 100x dan assert tiap run: 4 opts BERBEDA + answer 0-3 valid +
   q/explain/steps non-kosong. Juga mengunci N2 (variantEntry fallback
   EN->ID) dengan satu key sintetis yang hanya ada di registry ID.
   Memuat js/concept-graph.js + js/variants-b1/b2/b3.js + js/i18n.js di vm
   (tanpa DOM; vShuffle di-stub, localStorage di-stub untuk lang()).
   Jalankan: node qa/variant_property_test.js  (dari root repo; exit 0 = ALL PASS)
   Runtime ~30 dtk (534 kunci x 2 bahasa x 100 run = 106.800 gen call). */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const TOTAL_QUIZ = 534; /* wajib sama dengan qa/variant_coverage.py — ubah sengaja bila soal kuis berubah */
const RUNS_PER_KEY = 100;

/* Stub localStorage minimal (Map-backed) untuk lang() di i18n.js. */
class FakeStorage {
  constructor(){ this.m = new Map(); }
  getItem(k){ const v = this.m.get(String(k)); return v === undefined ? null : v; }
  setItem(k, v){ this.m.set(String(k), String(v)); }
  removeItem(k){ this.m.delete(String(k)); }
}

const sandbox = {
  console: console,
  localStorage: new FakeStorage(),
};
sandbox.vShuffle = function(arr, rng){
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(rng() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
};
vm.createContext(sandbox);
for (const f of ["js/concept-graph.js", "js/variants-b1.js", "js/variants-b2.js", "js/variants-b3.js", "js/i18n.js"])
  vm.runInContext(fs.readFileSync(path.join(__dirname, "..", f), "utf-8"), sandbox);

/* RNG deterministik (mulberry32) + hash string FNV-1a untuk seed per kunci. */
function rng32(seed){
  let a = seed >>> 0;
  return function(){
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hashStr(s){
  let h = 2166136261;
  for (let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

let passes = 0;
const fails = [];
function check(name, cond, detail){
  if (cond) { passes++; }
  else { fails.push(name); console.log("FAIL " + name + (detail ? " — " + detail : "")); }
}

const REGISTRIES = [
  ["ID", "VARIANT_FNS"], ["EN", "VARIANT_FNS_EN"],
  ["ID", "VARIANT_FNS_B1"], ["EN", "VARIANT_FNS_EN_B1"],
  ["ID", "VARIANT_FNS_B2"], ["EN", "VARIANT_FNS_EN_B2"],
  ["ID", "VARIANT_FNS_B3"], ["EN", "VARIANT_FNS_EN_B3"],
];
const keysByLang = { ID: new Set(), EN: new Set() };
let totalRuns = 0;
for (const [L, name] of REGISTRIES){
  const keys = vm.runInContext("Object.keys(" + name + ")", sandbox);
  keys.forEach(k => keysByLang[L].add(k));
  console.log("sweep " + name + ": " + keys.length + " kunci x " + RUNS_PER_KEY + " run");
  for (const k of keys){
    const gen = vm.runInContext(name + "[" + JSON.stringify(k) + "].gen", sandbox);
    let keyFails = 0;
    let firstDetail = "";
    for (let i = 0; i < RUNS_PER_KEY; i++){
      totalRuns++;
      let r;
      try {
        r = gen(rng32((hashStr(k + "|" + L) + i * 7919) >>> 0));
      } catch (e){
        keyFails++;
        if (!firstDetail) firstDetail = "run" + i + " throw: " + e.message;
        continue;
      }
      const probs = [];
      if (!r || typeof r !== "object") probs.push("bukan objek");
      else {
        if (!Array.isArray(r.opts) || r.opts.length !== 4) probs.push("opts!=4");
        else {
          if (new Set(r.opts).size < 4) probs.push("duplikat opts: " + JSON.stringify(r.opts));
          r.opts.forEach(o => { if (typeof o !== "string" || !o.trim()) probs.push("opt kosong/bukan string: " + JSON.stringify(o)); });
        }
        if (!(Number.isInteger(r.answer) && r.answer >= 0 && r.answer <= 3)) probs.push("answer invalid: " + r.answer);
        if (typeof r.q !== "string" || !r.q.trim()) probs.push("q kosong");
        if (typeof r.explain !== "string" || !r.explain.trim()) probs.push("explain kosong");
        if (!Array.isArray(r.steps) || !r.steps.length || r.steps.some(s => typeof s !== "string" || !s.trim())) probs.push("steps kosong");
      }
      if (probs.length){
        keyFails++;
        if (!firstDetail) firstDetail = "run" + i + ": " + probs.join("; ");
      }
    }
    check("prop " + k + ":" + L + " (" + RUNS_PER_KEY + " run)", keyFails === 0,
      keyFails ? keyFails + " run gagal, e.g. " + firstDetail : "");
  }
}
check("total kunci ID = " + TOTAL_QUIZ, keysByLang.ID.size === TOTAL_QUIZ, "ID=" + keysByLang.ID.size);
check("total kunci EN = " + TOTAL_QUIZ, keysByLang.EN.size === TOTAL_QUIZ, "EN=" + keysByLang.EN.size);
check("kunci ID == kunci EN", keysByLang.ID.size === keysByLang.EN.size &&
  Array.from(keysByLang.ID).every(k => keysByLang.EN.has(k)),
  "hanya-ID: " + Array.from(keysByLang.ID).filter(k => !keysByLang.EN.has(k)).slice(0, 5).join(",") +
  "; hanya-EN: " + Array.from(keysByLang.EN).filter(k => !keysByLang.ID.has(k)).slice(0, 5).join(","));

/* ---------- N2: variantEntry fallback EN -> ID di dalam fungsi ---------- */
(function(){
  const marker = { __n2id: true };
  vm.runInContext("VARIANT_FNS[\"__n2:test\"] = " + JSON.stringify(marker) + ";", sandbox);
  sandbox.localStorage.setItem("fmva_lang", "en");
  const gotEN = vm.runInContext("variantEntry(\"__n2:test\")", sandbox);
  check("N2 fallback: key hanya-ID tetap ketemu saat lang=en", gotEN && gotEN.__n2id === true, JSON.stringify(gotEN));
  /* EN menang bila key ADA di registry EN (fallback tidak menimpa EN). */
  const realEN = vm.runInContext("VARIANT_FNS_EN_B1[\"hari-09:1\"]", sandbox);
  const gotReal = vm.runInContext("variantEntry(\"hari-09:1\")", sandbox);
  check("N2 fallback: key yang ada di EN tetap pakai EN", gotReal === realEN, "bukan entri EN");
  sandbox.localStorage.setItem("fmva_lang", "id");
  const gotID = vm.runInContext("variantEntry(\"__n2:test\")", sandbox);
  check("N2 fallback: key hanya-ID ketemu saat lang=id", gotID && gotID.__n2id === true, JSON.stringify(gotID));
  vm.runInContext("delete VARIANT_FNS[\"__n2:test\"];", sandbox);
})();

console.log("\n" + totalRuns + " gen run, " + passes + " checks passed, " + fails.length + " failed.");
if (fails.length) { console.log("FAILED: " + fails.join(", ")); process.exit(1); }
console.log("ALL PASS");
