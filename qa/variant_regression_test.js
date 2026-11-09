/* Regression test node untuk fix review Terra R10 (varian generator).
   (a) vB2TSM (hari-20:5, ID+EN): angka proceeds di explain/steps harus
       (n*k)/1000 dgn suffix rb/k — BUKAN n*k mentah (cacat 1000x, T-M1).
   (b) b1_h104 / b1EN_h104 (hari-10:4, ID+EN): Q harus memuat angka FCFF
       yang sama dgn yang dipakai steps (T-S4).
   Memuat js/variants-b1.js + js/variants-b2.js di vm (tanpa DOM; vShuffle
   di-stub karena b1 memakainya dari concept-graph.js).
   Jalankan: node qa/variant_regression_test.js  (dari root repo; exit 0 = ALL PASS) */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const sandbox = { console: console };
sandbox.vShuffle = function(arr, rng){
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(rng() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "js", "variants-b1.js"), "utf-8"), sandbox);
vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "js", "variants-b2.js"), "utf-8"), sandbox);

let passes = 0;
const fails = [];
function check(name, cond, detail){
  if (cond) { passes++; console.log("PASS " + name); }
  else { fails.push(name); console.log("FAIL " + name + (detail ? " — " + detail : "")); }
}
/* RNG deterministik (mulberry32) agar gen bisa diulang. */
function rng32(seed){
  let a = seed >>> 0;
  return function(){
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const idNum = s => parseInt(s.replace(/\./g, ""), 10);
const enNum = s => parseInt(s.replace(/,/g, ""), 10);
const fmtID = v => v.toLocaleString("id-ID");
const fmtEN = v => v.toLocaleString("en-US");

/* ---------- (a) vB2TSM: proceeds tampil dalam rb/k ---------- */
(function(){
  const rngID = rng32(20051), rngEN = rng32(20052);
  let okExplainID = 0, okS1ID = 0, okS2ID = 0;
  let okExplainEN = 0, okS1EN = 0, okS2EN = 0;
  for (let i = 0; i < 200; i++){
    /* ID */
    const r = sandbox.vB2TSM(rngID, "Hari 20 \u00a76");
    const qm = r.q.match(/^([\d.]+) opsi, strike Rp([\d.]+), harga pasar rata-rata Rp([\d.]+)/);
    if (!qm) { fails.push("a-ID q tidak ter-parse: " + r.q); break; }
    const n = idNum(qm[1]), k = idNum(qm[2]), m = idNum(qm[3]);
    const procRb = (n * k) / 1000; /* proceeds dalam rb; selalu bulat */
    const em = r.explain.match(/Proceeds Rp([\d.]+)rb/);
    if (em && em[1] === fmtID(procRb)) okExplainID++;
    else fails.push("a-ID explain proceeds salah: " + r.explain + " (n=" + n + " k=" + k + ")");
    const s1 = (r.steps[1] || "").match(/= Rp([\d.]+)rb\./);
    if (s1 && s1[1] === fmtID(procRb)) okS1ID++;
    else fails.push("a-ID Solve 1 proceeds salah: " + r.steps[1]);
    /* Solve 2: angka mentah tanpa suffix, tetap n*k (Rp) ÷ m — jangan berubah */
    const s2 = (r.steps[2] || "").match(/= ([\d.]+) ÷ ([\d.]+) = /);
    if (s2 && idNum(s2[1]) === n * k && idNum(s2[2]) === m) okS2ID++;
    else fails.push("a-ID Solve 2 berubah: " + r.steps[2]);

    /* EN */
    const e = sandbox.vB2TSM(rngEN, "Day 20 \u00a76", "en");
    const eq = e.q.match(/^([\d,]+) options, strike Rp([\d,]+), average market price Rp([\d,]+)/);
    if (!eq) { fails.push("a-EN q tidak ter-parse: " + e.q); break; }
    const en = enNum(eq[1]), ek = enNum(eq[2]), emkt = enNum(eq[3]);
    const procK = (en * ek) / 1000;
    const eem = e.explain.match(/Proceeds Rp([\d,]+)k/);
    if (eem && eem[1] === fmtEN(procK)) okExplainEN++;
    else fails.push("a-EN explain proceeds salah: " + e.explain + " (n=" + en + " k=" + ek + ")");
    const es1 = (e.steps[1] || "").match(/= Rp([\d,]+)k\./);
    if (es1 && es1[1] === fmtEN(procK)) okS1EN++;
    else fails.push("a-EN Solve 1 proceeds salah: " + e.steps[1]);
    const es2 = (e.steps[2] || "").match(/= ([\d,]+) ÷ ([\d,]+) = /);
    if (es2 && enNum(es2[1]) === en * ek && enNum(es2[2]) === emkt) okS2EN++;
    else fails.push("a-EN Solve 2 berubah: " + e.steps[2]);
  }
  check("a-ID explain proceeds = (n*k)/1000 rb, 200x", okExplainID === 200, okExplainID + "/200");
  check("a-ID Solve 1 proceeds = (n*k)/1000 rb, 200x", okS1ID === 200, okS1ID + "/200");
  check("a-ID Solve 2 tetap n*k mentah ÷ m, 200x", okS2ID === 200, okS2ID + "/200");
  check("a-EN explain proceeds = (n*k)/1000 k, 200x", okExplainEN === 200, okExplainEN + "/200");
  check("a-EN Solve 1 proceeds = (n*k)/1000 k, 200x", okS1EN === 200, okS1EN + "/200");
  check("a-EN Solve 2 tetap n*k mentah ÷ m, 200x", okS2EN === 200, okS2EN + "/200");
})();

/* ---------- (b) b1_h104 / b1EN_h104: FCFF tercantum di Q ---------- */
(function(){
  const rngID = rng32(10041), rngEN = rng32(10042);
  let okID = 0, okEN = 0;
  for (let i = 0; i < 20; i++){
    const r = sandbox.b1_h104(rngID);
    const qm = r.q.match(/FCFF Rp([\d.]+)rb/);
    const sm = (r.steps[1] || "").match(/TV lama = ([\d.]+) ÷/);
    if (qm && sm && qm[1] === sm[1]) okID++;
    else fails.push("b-ID FCFF Q != steps: Q=" + r.q + " | S1=" + r.steps[1]);
    const e = sandbox.b1EN_h104(rngEN);
    const eqm = e.q.match(/FCFF Rp([\d,]+)k/);
    const esm = (e.steps[1] || "").match(/old TV = ([\d,]+) ÷/);
    if (eqm && esm && eqm[1] === esm[1]) okEN++;
    else fails.push("b-EN FCFF Q != steps: Q=" + e.q + " | S1=" + e.steps[1]);
  }
  check("b-ID Q memuat FCFF yang sama dgn steps, 20x", okID === 20, okID + "/20");
  check("b-EN Q memuat FCFF yang sama dgn steps, 20x", okEN === 20, okEN + "/20");
})();

console.log("\n" + passes + " passed, " + fails.length + " failed.");
if (fails.length) { console.log("FAILED: " + fails.slice(0, 5).join(" | ")); process.exit(1); }
console.log("ALL PASS");
