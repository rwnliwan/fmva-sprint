/* variants-b3.js — Batch 3 of "angka beda" mistake-review variants.
   Scope (69 keys, the remainder after concept-graph.js + B1 + B2):
   fondasi-b:2,5; hari-01:4,5; hari-02:2,5,6,7,8,9,10,11,12; hari-03:0,2,4,5,6,7;
   hari-24:0..12; hari-26:0..9; hari-27:0..9; hari-29:0..10; hari-30:0..5.
   Schema matches concept-graph.js exactly: each key "lesson:qi" ->
   {diff, gen: (rng) => ({q, opts[4], answer (index AFTER shuffle),
   explain, steps[]})}. Every number in an answer is recomputed from the
   variant's own numbers; steps show the arithmetic so it is verifiable.
   Each generator is bilingual: (rng, ref, L) with L "id" (default) or "en";
   VARIANT_FNS_B3 calls it in Indonesian, VARIANT_FNS_EN_B3 in English
   with the same numbers. Depends on the global vShuffle(rng) helper from
   concept-graph.js. Helper names are b3*-prefixed: no collision with
   concept-graph.js / variants-b1.js / variants-b2.js.
   This file defines only VARIANT_FNS_B3 / VARIANT_FNS_EN_B3 and calls
   no function at load time. Wiring (merge into the live registries) is
   the coordinator's job. FMVA Sprint here is a learning program (sprint),
   NOT a completed certificate. */

/* ---------- shared helpers (b3- prefix) ---------- */
function b3i(v, d, L){ if (d === "id" || d === "en") { L = d; d = 0; } d = (d === undefined ? 0 : d); return v.toLocaleString(L === "en" ? "en-US" : "id-ID", {minimumFractionDigits: d, maximumFractionDigits: d}); }
function b3n(v, L){ return v.toLocaleString(L === "en" ? "en-US" : "id-ID", {minimumFractionDigits: 0, maximumFractionDigits: 2}); }
function b3ri(rng, lo, hi, step){ step = step || 1; return lo + step * Math.floor(rng() * ((hi - lo) / step + 1)); }
function b3pick(rng, arr){ return arr[Math.floor(rng() * arr.length)]; }
function b3mk(rng, q, vals, explain, steps){
  const order = vShuffle([0, 1, 2, 3], rng);
  return {q: q, opts: order.map(i => vals[i]), answer: order.indexOf(0), explain: explain, steps: steps};
}
function b3txt(rng, q, opts, ci, explain, steps){
  const order = vShuffle([0, 1, 2, 3], rng);
  return {q: q, opts: order.map(i => opts[i]), answer: order.indexOf(ci), explain: explain, steps: steps};
}
/* Re-roll guard: distractor pairs coincide only for specific parameter
   draws (e.g. a ratio of 2,00 makes "double" equal "correct"; a WACC
   rounded to 1 decimal can equal the no-tax version). Each attempt is
   self-consistent, so re-rolling with the advancing rng stream keeps the
   answer correct and guarantees 4 distinct options. Capped at 60 tries. */
function b3retry(fn){
  let r = fn(), guard = 0;
  while (new Set(r.opts).size < 4 && guard++ < 60) r = fn();
  return r;
}
function b3twin(s){
  const a = s.split("");
  if (a.length >= 4 && a[1] !== a[2]) { const t = a[1]; a[1] = a[2]; a[2] = t; }
  else { const t = a[0]; a[0] = a[1]; a[1] = t; }
  return a.join("");
}

/* ================= fondasi-b ================= */
/* fb:2 — beban non-kas: penyusutan memotong laba, kas tidak keluar */
function b3fb2(rng, ref, L){
  const en = L === "en";
  const D = b3ri(rng, 2, 10, 1), S = b3ri(rng, 5, 20, 5);
  const u = en ? "k" : "rb";
  if (en) return b3txt(rng,
    `Which statement is TRUE? (Depreciation Rp${D}k, credit sales Rp${S}k.)`,
    ["Profit and cash always move together",
     "Dividends are recorded as an expense",
     `Credit sales of Rp${S}k add cash today`,
     `Depreciation of Rp${D}k reduces profit, no cash leaves`], 3,
    `Depreciation is a non-cash expense — it reduces profit without spending cash. (${ref})`,
    ["Analysis: the question asks which claim survives — test each against cash.",
     `Solve 1: depreciation Rp${D}k is an accounting allocation, not a cash payment.`,
     "Solve 2: profit falls by the depreciation, cash does not move.",
     "Solve 3: the other three are the classic traps — profit ≠ cash, dividends are not an expense, credit sales add receivables, not cash."]);
  return b3txt(rng,
    `Mana yang BENAR? (Penyusutan Rp${D}jt, jual kredit Rp${S}jt.)`,
    ["Laba dan kas selalu bergerak sama",
     "Dividen dicatat sebagai beban",
     `Jual kredit Rp${S}jt menambah kas hari ini`,
     `Susut Rp${D}jt mengurangi laba, kas tidak keluar`], 3,
    `Penyusutan adalah beban non-kas — mengurangi laba tanpa mengeluarkan kas. (${ref})`,
    ["Analysis: yang ditanya klaim mana yang bertahan — uji tiap klaim terhadap kas.",
     `Solve 1: penyusutan Rp${D}jt adalah alokasi akuntansi, bukan pembayaran kas.`,
     "Solve 2: laba turun sebesar penyusutan, kas tidak bergerak.",
     "Solve 3: tiga lainnya jebakan klasik — laba ≠ kas, dividen bukan beban, jual kredit menambah piutang, bukan kas."]);
}
/* fb:5 — FIFO vs LIFO saat harga naik: LIFO menekan laba & pajak */
function b3fb5(rng, ref, L){
  const en = L === "en";
  const P = b3pick(rng, [18, 20, 22]), a = b3pick(rng, [8, 9, 10, 11]);
  const b = a + b3pick(rng, [2, 3]), t = b3pick(rng, [20, 22, 25]);
  const U = 100, R = U * P, gF = U * (P - a), gL = U * (P - b);
  const tF = gF * t / 100, tL = gL * t / 100, nF = gF - tF, nL = gL - tL;
  const u = en ? "k" : "rb";
  const qid = `Harga naik. Terjual ${U} unit @ Rp${P}rb. Biaya lama Rp${a}rb/unit, biaya baru Rp${b}rb/unit, pajak ${t}%. LIFO vs FIFO: laba bersih & pajak?`;
  const qen = `Prices are rising. ${U} units sold @ Rp${P}k. Old cost Rp${a}k/unit, new cost Rp${b}k/unit, tax ${t}%. LIFO vs FIFO: net income & tax?`;
  const correct = en
    ? `Lower profit & tax — LIFO: net income Rp${b3i(nL)}k, tax Rp${b3i(tL)}k`
    : `Laba & pajak lebih KECIL — LIFO: laba Rp${b3i(nL)}rb, pajak Rp${b3i(tL)}rb`;
  const swap = en
    ? `Higher profit & tax — LIFO: net income Rp${b3i(nF)}k, tax Rp${b3i(tF)}k`
    : `Laba & pajak lebih BESAR — LIFO: laba Rp${b3i(nF)}rb, pajak Rp${b3i(tF)}rb`;
  const vals = [correct, swap,
    en ? "Same profit, different tax" : "Laba sama, pajak beda",
    en ? "No difference at all" : "Tidak ada bedanya"];
  const ex = en
    ? `LIFO COGS = ${U}×${b} = Rp${b3i(U * b)}k, FIFO COGS = ${U}×${a} = Rp${b3i(U * a)}k. LIFO gross profit Rp${b3i(gL)}k, tax ${t}% = Rp${b3i(tL)}k, net income Rp${b3i(nL)}k; FIFO: profit Rp${b3i(gF)}k, tax Rp${b3i(tF)}k, net income Rp${b3i(nF)}k. Rising prices make LIFO depress profit & tax. (${ref})`
    : `COGS LIFO = ${U}×${b} = Rp${b3i(U * b)}rb, COGS FIFO = ${U}×${a} = Rp${b3i(U * a)}rb. Laba kotor LIFO Rp${b3i(gL)}rb, pajak ${t}% = Rp${b3i(tL)}rb, laba bersih Rp${b3i(nL)}rb; FIFO: laba kotor Rp${b3i(gF)}rb, pajak Rp${b3i(tF)}rb, laba bersih Rp${b3i(nF)}rb. Saat harga naik, LIFO menekan laba & pajak. (${ref})`;
  const st = en ? [
    "Analysis: rising prices — which method sells the expensive units first?",
    `Solve 1: revenue = ${U} × ${P} = Rp${b3i(R)}k either way.`,
    `Solve 2: FIFO COGS = ${U}×${a} = Rp${b3i(U * a)}k; LIFO COGS = ${U}×${b} = Rp${b3i(U * b)}k.`,
    `Solve 3: LIFO gross profit Rp${b3i(gL)}k → tax ${t}% Rp${b3i(tL)}k → net income Rp${b3i(nL)}k, below FIFO's Rp${b3i(nF)}k.`
  ] : [
    "Analysis: harga naik — metode mana yang menjual unit mahal dulu?",
    `Solve 1: revenue = ${U} × ${P} = Rp${b3i(R)}rb, sama untuk keduanya.`,
    `Solve 2: COGS FIFO = ${U}×${a} = Rp${b3i(U * a)}rb; COGS LIFO = ${U}×${b} = Rp${b3i(U * b)}rb.`,
    `Solve 3: laba kotor LIFO Rp${b3i(gL)}rb → pajak ${t}% Rp${b3i(tL)}rb → laba bersih Rp${b3i(nL)}rb, di bawah FIFO Rp${b3i(nF)}rb.`
  ];
  return b3mk(rng, en ? qen : qid, vals, ex, st);
}

/* ================= hari-01 ================= */
/* h01:4 — terbit utang: BS kas & utang naik, CFS pendanaan, IS belum efek */
function b3h014(rng, ref, L){
  const en = L === "en";
  const X = b3pick(rng, [10, 15, 20, 25, 30]);
  if (en) return b3txt(rng,
    `The company issues a bank loan of Rp${X}k in cash. What is the effect?`,
    [`IS: no effect yet; BS: cash & debt up Rp${X}k; CFS: financing inflow Rp${X}k`,
     "No effect on any statement at all",
     "It only increases net income",
     "Equity falls as well"], 0,
    `BS: cash +${X}k, debt +${X}k (it balances). CFS: +${X}k in financing. IS: no effect until interest accrues. (${ref})`,
    ["Analysis: trace the loan through all three statements, one at a time.",
     `Solve 1: cash in = asset +Rp${X}k; the loan = liability +Rp${X}k — the balance sheet still balances.`,
     `Solve 2: cash received from a lender is a financing inflow in the CFS (+Rp${X}k).`,
     "Solve 3: the IS is untouched — interest only hits it as time passes."]);
  return b3txt(rng,
    `Perusahaan menerbitkan utang bank Rp${X}jt tunai. Efeknya?`,
    [`IS: belum ada efek; BS: kas & utang naik Rp${X}jt; CFS: masuk pendanaan Rp${X}jt`,
     "Tidak ada efek ke laporan mana pun juga",
     "Hanya menambah laba bersih perusahaan",
     "Ekuitas perusahaan ikut berkurang"], 0,
    `BS: kas +${X}jt, utang +${X}jt (balance). CFS: +${X}jt di pendanaan. IS: belum ada efek sampai bunga berjalan. (${ref})`,
    ["Analysis: telusuri pinjaman itu lewat ketiga laporan, satu per satu.",
     `Solve 1: kas masuk = aset +Rp${X}jt; pinjaman = liabilitas +Rp${X}jt — neraca tetap balance.`,
     `Solve 2: kas dari pemberi pinjaman = arus masuk pendanaan di CFS (+Rp${X}jt).`,
     "Solve 3: IS tidak tersentuh — bunga baru masuk seiring berjalannya waktu."]);
}
/* h01:5 — aturan #1: angka di sel input, rumus hanya referensi */
function b3h015(rng, ref, L){
  const en = L === "en";
  const g = b3ri(rng, 3, 12, 1);
  const f = en ? (1 + g / 100).toFixed(2) : (1 + g / 100).toFixed(2).replace(".", ",");
  if (en) return b3txt(rng,
    `A projection cell holds the formula =B5*${f}. What is the professional rule about numbers in formulas?`,
    ["Hardcoding is fine as long as it is consistent",
     "Hardcode only for the tax rate",
     "Numbers live in input cells; formulas only reference them",
     "There is no standard rule"], 2,
    `The number ${f} is a hardcode — ${g}% growth belongs in a blue input cell, e.g. =B5*(1+Growth). (${ref})`,
    ["Analysis: the question asks about the number typed inside the formula.",
     `Solve 1: ${f} = 1 + ${g}% — the growth assumption is typed inside the formula.`,
     "Solve 2: in 3 months nobody will remember what that number was.",
     "Solve 3: move it to a named blue input cell; the formula only references it."]);
  return b3txt(rng,
    `Sel proyeksi berisi rumus =B5*${f}. Aturan #1 modeling profesional soal angka dalam rumus?`,
    ["Boleh hardcode asal konsisten",
     "Hardcode hanya untuk tarif pajak",
     "Angka di sel input; rumus hanya referensi",
     "Tidak ada aturan baku"], 2,
    `Angka ${f} adalah hardcode — pertumbuhan ${g}% harusnya di sel input biru, mis. =B5*(1+Growth). (${ref})`,
    ["Analysis: yang ditanya soal angka yang diketik di dalam rumus.",
     `Solve 1: ${f} = 1 + ${g}% — angka asumsi pertumbuhan diketik di dalam rumus.`,
     "Solve 2: 3 bulan lagi tidak ada yang ingat angka itu apa.",
     "Solve 3: pindahkan ke sel input biru bernama; rumus hanya me-referensi."]);
}

/* ================= hari-02 ================= */
/* h02:2 — mulai dari revenue: semua baris IS fungsi dari revenue */
function b3h022(rng, ref, L){
  const en = L === "en";
  const nm = en ? b3pick(rng, ["PT Maju Jaya", "Rina's Kiosk", "Sari Coffee Stall"]) : b3pick(rng, ["PT Maju Jaya", "Kios Rina", "Warung Kopi Sari"]);
  if (en) return b3txt(rng,
    `Why does the ${nm} practice model start from revenue instead of guessing profit directly?`,
    ["Because revenue is the largest number in the income statement",
     "Because COGS, opex, and profit are all functions of revenue",
     "Because revenue is the easiest number for an analyst to guess",
     "Because accounting standards require that work order"], 1,
    `Every IS line is a function of revenue. Guessing profit directly = assumptions that cannot be audited. (${ref})`,
    ["Analysis: the question asks about the chain — revenue → ? → ? → profit.",
     "Solve 1: COGS is a % of revenue; opex is driven by volume and revenue.",
     "Solve 2: profit is the END of that chain, not the start.",
     "Solve 3: a guessed profit has no driver to test; a revenue-driven profit can be audited line by line."]);
  return b3txt(rng,
    `Kenapa untuk model latihan ${nm} kita mulai dari revenue, bukan langsung menebak laba?`,
    ["Karena revenue adalah angka terbesar di laporan laba rugi",
     "Karena COGS, opex, dan laba semuanya fungsi dari revenue",
     "Karena revenue adalah angka yang paling mudah ditebak analis",
     "Karena standar akuntansi mewajibkan urutan pengerjaan itu"], 1,
    `Semua baris IS adalah fungsi dari revenue. Menebak laba langsung = asumsinya tidak bisa diaudit. (${ref})`,
    ["Analysis: yang ditanya rantainya — revenue → ? → ? → laba.",
     "Solve 1: COGS adalah % dari revenue; opex digerakkan volume dan revenue.",
     "Solve 2: laba adalah UJUNG rantai itu, bukan awalnya.",
     "Solve 3: laba yang ditebak langsung tidak punya driver untuk diuji; laba yang digerakkan revenue bisa diaudit baris demi baris."]);
}
/* h02:5 — margin tertekan padahal revenue naik: biaya/unit naik lebih cepat */
function b3h025(rng, ref, L){
  const en = L === "en";
  const rg = b3pick(rng, [15, 20, 25]), m1 = b3pick(rng, [50, 55, 60]);
  const m2 = m1 - b3pick(rng, [5, 7, 8, 10]);
  if (en) return b3txt(rng,
    `Revenue rose ${rg}% but gross margin fell ${m1}% → ${m2}%. Most likely diagnosis?`,
    ["The selling price rose faster than costs",
     "Salaries and rent that rose along",
     "Cost per unit rose faster than the selling price",
     "No problem — what matters is that revenue rose"], 2,
    `A squeezed margin = cost per unit rising faster than the selling price (or the mix shifting to cheaper products). Rising revenue hides the problem — do not be fooled. (${ref})`,
    ["Analysis: margin fell while revenue rose — which side moved faster?",
     `Solve 1: margin = (Revenue − COGS) ÷ Revenue; it fell ${m1}% → ${m2}%.`,
     "Solve 2: if the price had risen faster, margin would have EXPANDED, not shrunk.",
     "Solve 3: so COGS per unit outran the price — the margin squeeze is a cost problem, not a sales problem."]);
  return b3txt(rng,
    `Revenue naik ${rg}% tapi gross margin turun ${m1}% → ${m2}%. Diagnosis paling mungkin?`,
    ["Harga jual naik lebih cepat dari biaya",
     "Beban gaji dan sewa yang ikut naik",
     "Biaya per unit naik lebih cepat dari harga jual",
     "Tidak ada masalah — yang penting revenue naik"], 2,
    `Margin tertekan = biaya per unit naik lebih cepat dari harga jual (atau mix bergeser ke produk murah). Revenue naik menutupi masalahnya — jangan terkecoh. (${ref})`,
    ["Analysis: margin turun padahal revenue naik — sisi mana yang bergerak lebih cepat?",
     `Solve 1: margin = (Revenue − COGS) ÷ Revenue; turun ${m1}% → ${m2}%.`,
     "Solve 2: kalau harga naik lebih cepat, margin akan MELEBAR, bukan menyusut.",
     "Solve 3: jadi COGS per unit menyalip harga — ini masalah biaya, bukan masalah penjualan."]);
}
/* h02:6 — DuPont: ROE = margin × perputaran aset × pengali ekuitas */
function b3h026(rng, ref, L){
  const en = L === "en";
  const t3 = b3pick(rng, [[10, 1.25, 2], [8, 1.5, 2], [12, 1.5, 1.5], [10, 2, 1.5], [8, 1.25, 2], [12, 2, 2], [10, 1.5, 2]]);
  const m = t3[0], t = t3[1], e = t3[2];
  const roe = m * t * e;
  const vals = [b3n(roe, L) + "%", b3n(m * t, L) + "%", b3n(m * e, L) + "%", b3n(roe + 10, L) + "%"];
  const q = en
    ? `Margin ${b3n(m, L)}%, asset turnover ${b3n(t, L)}×, equity multiplier ${b3n(e, L)}×. ROE (DuPont)?`
    : `Margin ${b3n(m, L)}%, perputaran aset ${b3n(t, L)}×, pengali ekuitas ${b3n(e, L)}×. ROE (DuPont)?`;
  const ex = en
    ? `${b3n(m / 100, L)} × ${b3n(t, L)} × ${b3n(e, L)} = ${b3n(roe, L)}%. The three levers are multiplied — not added. (${ref})`
    : `${b3n(m / 100, L)} × ${b3n(t, L)} × ${b3n(e, L)} = ${b3n(roe, L)}%. Tiga tuas dikalikan — bukan dijumlah. (${ref})`;
  const st = en ? [
    "Analysis: DuPont splits ROE into three levers — multiply them.",
    `Solve 1: margin as a decimal = ${m}% = ${b3n(m / 100, L)}.`,
    `Solve 2: ${b3n(m / 100, L)} × ${b3n(t, L)} = ${b3n(m / 100 * t, L)}; × ${b3n(e, L)} = ${b3n(roe / 100, L)}.`,
    `Solve 3: as a percent → ${b3n(roe, L)}%.`
  ] : [
    "Analysis: DuPont memecah ROE jadi tiga tuas — kalikan ketiganya.",
    `Solve 1: margin sebagai desimal = ${m}% = ${b3n(m / 100, L)}.`,
    `Solve 2: ${b3n(m / 100, L)} × ${b3n(t, L)} = ${b3n(m / 100 * t, L)}; × ${b3n(e, L)} = ${b3n(roe / 100, L)}.`,
    `Solve 3: sebagai persen → ${b3n(roe, L)}%.`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h02:7 — pengakuan pendapatan IFRS 15: barang point-in-time + servis over-time */
function b3h027(rng, ref, L){
  const en = L === "en";
  const G = b3pick(rng, [1, 2, 3]), S = b3pick(rng, [6, 12, 18]);
  const per = S / 12, m1 = G + per, rem = S - per;
  const u = en ? "k" : "jt";
  const vals = ["Rp" + b3n(m1, L) + u, "Rp" + b3n(per, L) + u, "Rp" + b3i(G + S, L) + u, "Rp" + b3n(G, L) + u];
  const q = en
    ? `A 12-month contract of Rp${b3i(G + S, L)}k: goods of Rp${b3n(G, L)}k delivered at signing, services of Rp${b3i(S, L)}k over 12 months. Revenue in month 1?`
    : `Kontrak 12 bln Rp${b3i(G + S, L)}jt: barang Rp${b3n(G, L)}jt diserahkan saat tanda tangan, servis Rp${b3i(S, L)}jt selama 12 bln. Revenue bulan 1?`;
  const ex = en
    ? `${b3n(G, L)} + ${b3n(per, L)} = Rp${b3n(m1, L)}k. The remaining Rp${b3n(rem, L)}k = contract liability, not revenue — cash received ≠ revenue recognised. (${ref})`
    : `${b3n(G, L)} + ${b3n(per, L)} = Rp${b3n(m1, L)}jt. Sisanya Rp${b3n(rem, L)}jt = liabilitas kontrak, bukan revenue — kas sudah diterima ≠ revenue sudah diakui. (${ref})`;
  const st = en ? [
    "Analysis: split the contract — goods are point-in-time, services are over time.",
    `Solve 1: goods recognised at delivery = Rp${b3n(G, L)}k.`,
    `Solve 2: services per month = ${S} ÷ 12 = Rp${b3n(per, L)}k.`,
    `Solve 3: month 1 = ${b3n(G, L)} + ${b3n(per, L)} = Rp${b3n(m1, L)}k; the rest stays a contract liability.`
  ] : [
    "Analysis: pisahkan kontrak — barang point-in-time, servis over-time.",
    `Solve 1: barang diakui saat diserahkan = Rp${b3n(G, L)}jt.`,
    `Solve 2: servis per bulan = ${S} ÷ 12 = Rp${b3n(per, L)}jt.`,
    `Solve 3: bulan 1 = ${b3n(G, L)} + ${b3n(per, L)} = Rp${b3n(m1, L)}jt; sisanya tetap liabilitas kontrak.`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h02:8 — current ratio = aset lancar ÷ liabilitas lancar */
function b3h028(rng, ref, L){
  const en = L === "en";
  const CA = b3ri(rng, 4, 12, 1) * 1000, CL = b3pick(rng, [6000, 8000, 9000, 10000, 12000, 15000]);
  const r = CA / CL, inv = CL / CA, wc = (CA - CL) / CL, half = CA / (2 * CL);
  const vals = [b3i(r, 2, L) + "×", b3i(inv, 2, L) + "×", b3i(wc, 2, L) + "×", b3i(half, 2, L) + "×"];
  const q = en
    ? `Current assets Rp${b3i(CA, L)}k, current liabilities Rp${b3i(CL, L)}k. Current ratio?`
    : `Aset lancar Rp${b3i(CA, L)}jt, liabilitas lancar Rp${b3i(CL, L)}jt. Current ratio?`;
  const ex = en
    ? `${b3i(CA, L)} ÷ ${b3i(CL, L)} = ${b3i(r, 2, L)}×. ${r < 1 ? "Below 1 — ask about the business model first before panicking." : "Above 1 — short-term cover looks adequate; still check the mix."} (${ref})`
    : `${b3i(CA, L)} ÷ ${b3i(CL, L)} = ${b3i(r, 2, L)}×. ${r < 1 ? "Di bawah 1 — tanyakan dulu model bisnisnya sebelum panik." : "Di atas 1 — penutup jangka pendek terlihat memadai; tetap cek komposisinya."} (${ref})`;
  const st = en ? [
    "Analysis: current ratio compares short-term resources with short-term claims.",
    `Solve 1: formula — current ratio = current assets ÷ current liabilities.`,
    `Solve 2: substitute → ${b3i(CA, L)} ÷ ${b3i(CL, L)}.`,
    `Solve 3: compute → ${b3i(r, 2, L)}×.`
  ] : [
    "Analysis: current ratio membandingkan sumber jangka pendek dengan klaim jangka pendek.",
    "Solve 1: rumus — current ratio = aset lancar ÷ liabilitas lancar.",
    `Solve 2: substitusi → ${b3i(CA, L)} ÷ ${b3i(CL, L)}.`,
    `Solve 3: hitung → ${b3i(r, 2, L)}×.`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h02:9 — D/E (utang berbunga) & interest coverage = EBIT ÷ bunga */
function b3h029(rng, ref, L){
  const en = L === "en";
  const D = b3pick(rng, [8, 10, 12]), E = b3pick(rng, [4, 5, 6]);
  const EBIT = b3pick(rng, [5, 6, 8]), I = b3pick(rng, [1, 2]);
  const de = D / E, cov = EBIT / I;
  const fmt = (d, c) => `D/E ${b3i(d, 2, L)}×; coverage ${b3n(c, L)}×`;
  const vals = [fmt(de, cov), fmt(E / D, cov), fmt(de, I / EBIT), fmt(E / D, I / EBIT)];
  const q = en
    ? `Interest-bearing debt Rp${D}T, equity Rp${E}T, EBIT Rp${EBIT}T, interest Rp${I}T. D/E and interest coverage?`
    : `Utang berbunga Rp${D}T, ekuitas Rp${E}T, EBIT Rp${EBIT}T, bunga Rp${I}T. D/E dan interest coverage?`;
  const ex = en
    ? `D/E (interest-bearing debt) = ${D} ÷ ${E} = ${b3i(de, 2, L)}×; coverage = ${EBIT} ÷ ${I} = ${b3n(cov, L)}×. High leverage, but interest is still covered ${b3n(cov, L)} times. (${ref})`
    : `D/E (utang berbunga) = ${D} ÷ ${E} = ${b3i(de, 2, L)}×; coverage = ${EBIT} ÷ ${I} = ${b3n(cov, L)}×. Leverage tinggi tapi bunga masih tertutup ${b3n(cov, L)} kali. (${ref})`;
  const st = en ? [
    "Analysis: two ratios, two formulas — do not mix the numerators.",
    `Solve 1: D/E = interest-bearing debt ÷ equity = ${D} ÷ ${E} = ${b3i(de, 2, L)}×.`,
    `Solve 2: coverage = EBIT ÷ interest = ${EBIT} ÷ ${I} = ${b3n(cov, L)}×.`,
    "Solve 3: read them together — leverage says how much debt, coverage says whether it can be serviced."
  ] : [
    "Analysis: dua rasio, dua rumus — jangan campur pembilangnya.",
    `Solve 1: D/E = utang berbunga ÷ ekuitas = ${D} ÷ ${E} = ${b3i(de, 2, L)}×.`,
    `Solve 2: coverage = EBIT ÷ bunga = ${EBIT} ÷ ${I} = ${b3n(cov, L)}×.`,
    "Solve 3: baca keduanya bersama — leverage bilang seberapa besar utang, coverage bilang apakah bunganya terbayar."
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h02:10 — CVP: BEP = biaya tetap ÷ kontribusi; margin of safety */
function b3h0210(rng, ref, L){
  const en = L === "en";
  const pair = b3pick(rng, [[100, 150], [80, 120], [100, 160], [120, 180], [150, 200], [100, 140]]);
  const BEP = pair[0], U = pair[1];
  const contrib = b3pick(rng, [8, 10, 12]), P = contrib + b3pick(rng, [10, 12, 15]);
  const V = P - contrib, F = contrib * BEP;
  const mos = (U - BEP) / U * 100;
  const BEPa = Math.round(F / P), mosA = (U - BEPa) / U * 100;
  const BEPb = Math.round(F / V), mosB = (U - BEPb) / U * 100;
  const mosC = (U - BEP) / BEP * 100;
  const fmt = (b, m) => `${b3i(b, L)} ${en ? "units" : "unit"}; ${b3i(m, 1, L)}%`;
  const vals = [fmt(BEP, mos), fmt(BEPa, mosA), fmt(BEPb, mosB), fmt(BEP, mosC)];
  const q = en
    ? `Price Rp${P}k, variable cost Rp${V}k, fixed cost Rp${F}k/month. Break-even point and margin of safety at ${U} units?`
    : `Harga Rp${P}rb, biaya variabel Rp${V}rb, biaya tetap Rp${F}rb/bulan. BEP dan margin of safety pada ${U} unit?`;
  const ex = en
    ? `Contribution Rp${contrib}k; BEP = ${F} ÷ ${contrib} = ${BEP} units. Margin of safety = (${U} − ${BEP}) ÷ ${U} = ${b3i(mos, 1, L)}%. (${ref})`
    : `Kontribusi Rp${contrib}rb; BEP = ${F} ÷ ${contrib} = ${BEP} unit. Margin of safety = (${U} − ${BEP}) ÷ ${U} = ${b3i(mos, 1, L)}%. (${ref})`;
  const st = en ? [
    "Analysis: break-even first, then how far actual sales sit above it.",
    `Solve 1: contribution = ${P} − ${V} = Rp${contrib}k per unit.`,
    `Solve 2: BEP = fixed cost ÷ contribution = ${F} ÷ ${contrib} = ${BEP} units.`,
    `Solve 3: margin of safety = (${U} − ${BEP}) ÷ ${U} = ${b3i(mos, 1, L)}%.`
  ] : [
    "Analysis: break-even dulu, baru seberapa jauh penjualan aktual di atasnya.",
    `Solve 1: kontribusi = ${P} − ${V} = Rp${contrib}rb per unit.`,
    `Solve 2: BEP = biaya tetap ÷ kontribusi = ${F} ÷ ${contrib} = ${BEP} unit.`,
    `Solve 3: margin of safety = (${U} − ${BEP}) ÷ ${U} = ${b3i(mos, 1, L)}%.`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h02:11 — ABC costing: tarif aktivitas × pemakaian aktivitas */
function b3h0211(rng, ref, L){
  const en = L === "en";
  const rs = b3pick(rng, [5, 10, 15]), ri = b3pick(rng, [2, 4, 5]);
  const s = b3pick(rng, [10, 20, 25]), ii = b3pick(rng, [40, 50, 60]);
  const u = b3pick(rng, [500, 1000]);
  const setup = s * rs, insp = ii * ri, abc = setup + insp, pu = abc / u;
  const poolS = rs * 40, poolI = ri * 200;
  const fmt = (tot, per) => `Rp${b3i(tot, L)}${en ? "k" : "rb"} (Rp${b3n(per, L)}${en ? "k" : "rb"}/unit)`;
  const vals = [fmt(abc, pu), fmt(setup, setup / u), fmt(insp, insp / u), fmt(poolS + poolI, (poolS + poolI) / u)];
  const q = en
    ? `Overhead Rp${b3i(poolS + poolI, L)}k: setups Rp${b3i(poolS, L)}k / 40 setups, inspections Rp${b3i(poolI, L)}k / 200 inspections. Coffee: ${s} setups, ${ii} inspections, ${b3i(u, L)} units. Overhead for Coffee under ABC?`
    : `Overhead Rp${b3i(poolS + poolI, L)}rb: setup Rp${b3i(poolS, L)}rb/40 setup, inspeksi Rp${b3i(poolI, L)}rb/200 inspeksi. Kopi: ${s} setup, ${ii} inspeksi, ${b3i(u, L)} unit. Biaya overhead Kopi menurut ABC?`;
  const ex = en
    ? `ABC Coffee = ${s}×${rs} + ${ii}×${ri} = ${setup} + ${insp} = Rp${b3i(abc, L)}k (Rp${b3n(pu, L)}k/unit). Volume allocation would charge the whole pool — the opposite, because the other product is the inspection-hungry one. (${ref})`
    : `ABC Kopi = ${s}×${rs} + ${ii}×${ri} = ${setup} + ${insp} = Rp${b3i(abc, L)}rb (Rp${b3n(pu, L)}rb/unit). Alokasi volume memberi seluruh pool — kebalikannya, karena produk lain yang rakus inspeksi. (${ref})`;
  const st = en ? [
    "Analysis: ABC charges each product for the activities it actually consumes.",
    `Solve 1: setup rate = ${poolS} ÷ 40 = Rp${rs}k; inspection rate = ${poolI} ÷ 200 = Rp${ri}k.`,
    `Solve 2: setups ${s} × ${rs} = ${setup}; inspections ${ii} × ${ri} = ${insp}.`,
    `Solve 3: total Rp${b3i(abc, L)}k ÷ ${b3i(u, L)} units = Rp${b3n(pu, L)}k/unit.`
  ] : [
    "Analysis: ABC membebankan tiap produk sesuai aktivitas yang benar-benar dipakai.",
    `Solve 1: tarif setup = ${poolS} ÷ 40 = Rp${rs}rb; tarif inspeksi = ${poolI} ÷ 200 = Rp${ri}rb.`,
    `Solve 2: setup ${s} × ${rs} = ${setup}; inspeksi ${ii} × ${ri} = ${insp}.`,
    `Solve 3: total Rp${b3i(abc, L)}rb ÷ ${b3i(u, L)} unit = Rp${b3n(pu, L)}rb/unit.`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h02:12 — harga transfer minimum = biaya variabel (kapasitas menganggur) */
function b3h0212(rng, ref, L){
  const en = L === "en";
  const VC = b3pick(rng, [20, 25, 30, 35]), MP = b3pick(rng, [50, 60, 70, 80]);
  const mid = (VC + MP) / 2;
  const vals = ["Rp" + b3i(VC, L) + (en ? "k" : "rb"), "Rp" + b3i(mid, L) + (en ? "k" : "rb"), "Rp" + b3i(MP, L) + (en ? "k" : "rb"), "Rp0"];
  const q = en
    ? `Upstream variable cost Rp${VC}k, market price Rp${MP}k, upstream capacity idle. Minimum transfer price?`
    : `Biaya variabel Hulu Rp${VC}rb, harga pasar Rp${MP}rb, kapasitas Hulu menganggur. Harga transfer minimum?`;
  const ex = en
    ? `Minimum = variable cost Rp${VC}k (idle capacity). Above Rp${MP}k, Downstream is better off buying outside. (${ref})`
    : `Minimum = biaya variabel Rp${VC}rb (kapasitas menganggur). Di atas Rp${MP}rb, Hilir lebih baik beli dari luar. (${ref})`;
  const st = en ? [
    "Analysis: the minimum is the cost of one more unit when capacity is idle.",
    `Solve 1: below variable cost Rp${VC}k, Upstream loses on every unit.`,
    `Solve 2: with idle capacity there is no opportunity cost to add.`,
    `Solve 3: so the floor is Rp${VC}k; the market price Rp${MP}k is the ceiling, not the floor.`
  ] : [
    "Analysis: minimum adalah biaya satu unit tambahan saat kapasitas menganggur.",
    `Solve 1: di bawah biaya variabel Rp${VC}rb, Hulu rugi tiap unit.`,
    `Solve 2: kapasitas menganggur = tidak ada opportunity cost yang ditambahkan.`,
    `Solve 3: jadi lantainya Rp${VC}rb; harga pasar Rp${MP}rb adalah batas atas, bukan batas bawah.`
  ];
  return b3mk(rng, q, vals, ex, st);
}

/* ================= hari-03 ================= */
/* h03:0 — DSO: hari dari penjualan sampai kas diterima */
function b3h030(rng, ref, L){
  const en = L === "en";
  const D = b3pick(rng, [20, 30, 45, 60]);
  if (en) return b3txt(rng,
    `DSO of ${D} days means?`,
    [`The company pays suppliers within ${D} days`,
     `Average stock sells out within ${D} days`,
     `On average ${D} days from sale until cash is received`,
     `The company's cash lasts ${D} days without sales`], 2,
    `DSO measures collection speed: ${D} days from sale until cash is received. (${ref})`,
    ["Analysis: DSO = Days SALES Outstanding — it is about sales, not suppliers or stock.",
     `Solve 1: receivables ÷ revenue × 365 = days of sales sitting unpaid.`,
     `Solve 2: ${D} days is the average wait between selling and collecting.`,
     "Solve 3: paying suppliers is DPO; stock turning over is DIO — different letters, different clocks."]);
  return b3txt(rng,
    `DSO ${D} hari artinya?`,
    [`Perusahaan membayar supplier dalam ${D} hari`,
     `Stok rata-rata habis terjual dalam ${D} hari`,
     `Rata-rata ${D} hari dari penjualan sampai kas diterima`,
     `Kas perusahaan bertahan ${D} hari tanpa penjualan`], 2,
    `DSO mengukur kecepatan menagih: ${D} hari dari penjualan sampai kas diterima. (${ref})`,
    ["Analysis: DSO = Days SALES Outstanding — soal penjualan, bukan supplier atau stok.",
     "Solve 1: piutang ÷ revenue × 365 = hari penjualan yang belum dibayar.",
     `Solve 2: ${D} hari adalah rata-rata menunggu antara menjual dan menagih.`,
     "Solve 3: membayar supplier itu DPO; stok berputar itu DIO — huruf beda, jam beda."]);
}
/* h03:2 — laba naik tapi kas turun: laba tertahan di working capital */
function b3h032(rng, ref, L){
  const en = L === "en";
  const nm = en ? b3pick(rng, ["PT Maju Jaya", "Rina's Kiosk", "Sari Coffee Stall"]) : b3pick(rng, ["PT Maju Jaya", "Kios Rina", "Warung Kopi Sari"]);
  if (en) return b3txt(rng,
    `${nm}'s net income rose but cash fell. Most likely explanation?`,
    ["Rising depreciation cutting profit",
     "A large cash dividend paid to owners",
     "Credit sales falling so less cash comes in",
     "Receivables/inventory rising — profit is parked in working capital"], 3,
    `Cash is parked in swelling receivables/inventory — profit exists on paper, the cash is stuck there. (${ref})`,
    ["Analysis: profit rose, so this is not a profitability problem — follow the cash.",
     "Solve 1: depreciation rising would CUT profit, not raise it.",
     "Solve 2: a dividend is a financing outflow, but it does not explain profit rising while operating cash falls.",
     "Solve 3: receivables/inventory up = cash trapped in working capital — profit on paper, no cash in hand."]);
  return b3txt(rng,
    `Laba bersih ${nm} naik tapi kas turun. Penjelasan paling mungkin?`,
    ["Beban penyusutan yang naik memotong laba",
     "Dividen tunai besar yang dibayar ke pemilik",
     "Penjualan kredit turun sehingga kas masuk berkurang",
     "Piutang/persediaan naik — laba tertahan di working capital"], 3,
    `Kas tertahan di piutang/persediaan yang membengkak — laba ada di kertas, kasnya parkir. (${ref})`,
    ["Analysis: laba naik = bukan masalah profitabilitas — ikuti kasnya.",
     "Solve 1: penyusutan naik akan MEMOTONG laba, bukan menaikkannya.",
     "Solve 2: dividen adalah arus keluar pendanaan, tapi tidak menjelaskan laba naik sementara kas operasi turun.",
     "Solve 3: piutang/persediaan naik = kas terjebak di working capital — laba di kertas, kas tidak di tangan."]);
}
/* h03:4 — DPO naik → CCC turun sebesar itu, kas lebih lega */
function b3h034(rng, ref, L){
  const en = L === "en";
  const a = b3pick(rng, [30, 45, 60]), d = b3pick(rng, [10, 15, 20]);
  const b = a + d;
  if (en) return b3txt(rng,
    `Suppliers extend terms from ${a} → ${b} days, everything else unchanged. Effect?`,
    [`CCC rises ${d} days; cash gets tighter`,
     "CCC unchanged; supplier terms do not matter",
     `CCC falls ${d} days; cash is more comfortable`,
     `CCC rises ${d} days; cash is more comfortable`], 2,
    `DPO +${d} → CCC falls ${d} days. Suppliers fund operations longer = cash is more comfortable. (${ref})`,
    ["Analysis: CCC = DSO + DIO − DPO — DPO is SUBTRACTED.",
     `Solve 1: DPO rises ${a} → ${b}, so +${d} on the subtracted term.`,
     `Solve 2: CCC moves the opposite way: −${d} days.`,
     "Solve 3: longer supplier terms = the supplier lends you cash longer — breathing room, not tighter cash."]);
  return b3txt(rng,
    `Supplier memperpanjang tempo ${a} → ${b} hari, lainnya tetap. Efeknya?`,
    [`CCC naik ${d} hari; kas makin ketat`,
     "CCC tetap; tempo supplier tidak berpengaruh",
     `CCC turun ${d} hari; kas lebih lega`,
     `CCC naik ${d} hari; kas lebih lega`], 2,
    `DPO +${d} → CCC turun ${d} hari. Supplier membiayai operasi lebih lama = kas lebih lega. (${ref})`,
    ["Analysis: CCC = DSO + DIO − DPO — DPO DIKURANGKAN.",
     `Solve 1: DPO naik ${a} → ${b}, jadi +${d} pada suku yang dikurangkan.`,
     `Solve 2: CCC bergerak berlawanan arah: −${d} hari.`,
     "Solve 3: tempo supplier lebih panjang = supplier meminjamkan kas lebih lama — ruang napas, bukan kas makin ketat."]);
}
/* h03:5 — CFO = NI + beban non-kas − ΔWC */
function b3h035(rng, ref, L){
  const en = L === "en";
  const NI = b3ri(rng, 1200, 2500, 100), dep = b3ri(rng, 200, 600, 100), dw = b3ri(rng, 150, 400, 50);
  const cfo = NI + dep - dw;
  const u = en ? "k" : "rb";
  const vals = ["Rp" + b3i(cfo, L) + u, "Rp" + b3i(NI + dep + dw, L) + u, "Rp" + b3i(NI - dep - dw, L) + u, "Rp" + b3i(NI + dep, L) + u];
  const q = en
    ? `NI Rp${b3i(NI, L)}k, depreciation Rp${b3i(dep, L)}k, ΔWC +Rp${b3i(dw, L)}k (up). Estimated operating cash flow?`
    : `NI Rp${b3i(NI, L)}rb, depresiasi Rp${b3i(dep, L)}rb, ΔWC +Rp${b3i(dw, L)}rb (naik). Perkiraan arus kas operasi?`;
  const ex = en
    ? `${b3i(NI, L)} + ${b3i(dep, L)} − ${b3i(dw, L)} = Rp${b3i(cfo, L)}k. Trap: forgetting the add-back (${b3i(NI - dw, L)}) or flipping the ΔWC sign (${b3i(NI + dep + dw, L)}). (${ref})`
    : `${b3i(NI, L)} + ${b3i(dep, L)} − ${b3i(dw, L)} = Rp${b3i(cfo, L)}rb. Jebakan: lupa add-back (${b3i(NI - dw, L)}) atau salah tanda ΔWC (${b3i(NI + dep + dw, L)}). (${ref})`;
  const st = en ? [
    "Analysis: indirect CFO starts from net income, then fixes the non-cash and WC items.",
    `Solve 1: add back depreciation (non-cash): ${NI} + ${dep} = ${NI + dep}.`,
    `Solve 2: rising WC consumes cash — subtract ΔWC: ${NI + dep} − ${dw}.`,
    `Solve 3: CFO = Rp${b3i(cfo, L)}k.`
  ] : [
    "Analysis: CFO tidak langsung mulai dari laba bersih, lalu koreksi item non-kas dan WC.",
    `Solve 1: add-back depresiasi (non-kas): ${NI} + ${dep} = ${NI + dep}.`,
    `Solve 2: WC naik menghabiskan kas — kurangi ΔWC: ${NI + dep} − ${dw}.`,
    `Solve 3: CFO = Rp${b3i(cfo, L)}rb.`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h03:6 — EFN = ΔAset − Δliabilitas spontan − laba ditahan (surplus bila negatif) */
function b3h036(rng, ref, L){
  const en = L === "en";
  let S, g, a, l, m, p, dS, dA, dL, ni2, re, efn, guard = 0;
  do {
    S = b3pick(rng, [800, 1000, 1200]); g = b3pick(rng, [15, 20, 25]);
    a = b3pick(rng, [0.5, 0.6]); l = b3pick(rng, [0.2, 0.3]);
    m = b3pick(rng, [8, 10, 12]); p = b3pick(rng, [30, 40, 50]);
    dS = S * g / 100; dA = dS * a; dL = dS * l;
    ni2 = (S + dS) * m / 100; re = ni2 * (1 - p / 100); efn = dA - dL - re;
  } while ((!Number.isInteger(re) || efn >= 0) && guard++ < 60);
  if (!Number.isInteger(re) || efn >= 0) { S = 1000; g = 20; a = 0.6; l = 0.3; m = 10; p = 40; dS = 200; dA = 120; dL = 60; ni2 = 120; re = 72; efn = -12; }
  const vals = [
    en ? `Surplus Rp${b3i(-efn, L)}jt (EFN ${b3i(efn, L)})` : `Surplus Rp${b3i(-efn, L)}jt (EFN ${b3i(efn, L)})`,
    en ? `Needs Rp${b3i(-efn, L)}jt` : `Butuh Rp${b3i(-efn, L)}jt`,
    en ? `Needs Rp${b3i(dA - dL, L)}jt` : `Butuh Rp${b3i(dA - dL, L)}jt`,
    en ? `Needs Rp${b3i(dA, L)}jt` : `Butuh Rp${b3i(dA, L)}jt`
  ];
  const q = en
    ? `Sales Rp${b3i(S, L)}jt growing ${g}%; Assets/Sales ${b3n(a, L)}; spontaneous liabilities/Sales ${b3n(l, L)}; margin ${m}%; payout ${p}%. EFN?`
    : `Sales Rp${b3i(S, L)}jt tumbuh ${g}%; Aset/Sales ${b3n(a, L)}; liabilitas spontan/Sales ${b3n(l, L)}; margin ${m}%; payout ${p}%. EFN?`;
  const ex = en
    ? `ΔAssets ${b3i(dA, L)} − Δspontaneous liabilities ${b3i(dL, L)} − retained earnings ${b3i(re, L)} = ${b3i(efn, L)}. Surplus Rp${b3i(-efn, L)}jt: growth funds itself. (${ref})`
    : `ΔAset ${b3i(dA, L)} − Δliabilitas spontan ${b3i(dL, L)} − laba ditahan ${b3i(re, L)} = ${b3i(efn, L)}. Surplus Rp${b3i(-efn, L)}jt: pertumbuhan membiayai dirinya sendiri. (${ref})`;
  const st = en ? [
    "Analysis: EFN = new assets needed − spontaneous funding − internal funding.",
    `Solve 1: ΔSales = ${S} × ${g}% = ${b3i(dS, L)}; ΔAssets = ${b3i(dS, L)} × ${b3n(a, L)} = ${b3i(dA, L)}; Δspontaneous = ${b3i(dS, L)} × ${b3n(l, L)} = ${b3i(dL, L)}.`,
    `Solve 2: next sales ${b3i(S + dS, L)} × margin ${m}% = NI ${b3i(ni2, L)}; retained = ${b3i(ni2, L)} × ${100 - p}% = ${b3i(re, L)}.`,
    `Solve 3: EFN = ${b3i(dA, L)} − ${b3i(dL, L)} − ${b3i(re, L)} = ${b3i(efn, L)} — negative means surplus, not a need.`
  ] : [
    "Analysis: EFN = aset baru yang dibutuhkan − pendanaan spontan − pendanaan internal.",
    `Solve 1: ΔSales = ${S} × ${g}% = ${b3i(dS, L)}; ΔAset = ${b3i(dS, L)} × ${b3n(a, L)} = ${b3i(dA, L)}; Δspontan = ${b3i(dS, L)} × ${b3n(l, L)} = ${b3i(dL, L)}.`,
    `Solve 2: sales berikut ${b3i(S + dS, L)} × margin ${m}% = NI ${b3i(ni2, L)}; ditahan = ${b3i(ni2, L)} × ${100 - p}% = ${b3i(re, L)}.`,
    `Solve 3: EFN = ${b3i(dA, L)} − ${b3i(dL, L)} − ${b3i(re, L)} = ${b3i(efn, L)} — negatif berarti surplus, bukan kebutuhan.`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h03:7 — tuas EFN tercepat: turunkan payout, tambah laba ditahan */
function b3h037(rng, ref, L){
  const en = L === "en";
  const X = b3pick(rng, [40, 60, 80]);
  if (en) return b3txt(rng,
    `EFN is large and positive at Rp${X}jt. Fastest lever to bring it down without changing operations?`,
    ["Lower the payout ratio (retain earnings)",
     "Raise the selling price",
     "Add bank debt",
     "Sell fixed assets"], 0,
    `Lowering the payout adds retained earnings, a direct subtraction from EFN. Bank debt IS the EFN itself — it is the need being measured, not the solution. (${ref})`,
    ["Analysis: EFN = ΔAssets − Δspontaneous − retained earnings. Which lever touches the last term?",
    "Solve 1: a lower payout → (1 − payout) rises → retained earnings grow.",
    "Solve 2: retained earnings are subtracted in the EFN formula, so EFN falls dollar-for-dollar.",
    "Solve 3: raising prices or selling assets changes operations; bank debt just funds the gap EFN measures."]);
  return b3txt(rng,
    `EFN positif besar Rp${X}jt. Tuas pertama yang paling cepat menurunkannya tanpa mengubah operasi?`,
    ["Menurunkan payout ratio (menahan laba)",
     "Menaikkan harga jual",
     "Menambah utang bank",
     "Menjual aset tetap"], 0,
    `Menurunkan payout menambah laba ditahan, pengurang langsung EFN. Utang bank justru adalah EFN itu sendiri — bukan solusi, melainkan kebutuhan yang diukur. (${ref})`,
    ["Analysis: EFN = ΔAset − Δspontan − laba ditahan. Tuas mana yang menyentuh suku terakhir?",
    "Solve 1: payout turun → (1 − payout) naik → laba ditahan membesar.",
    "Solve 2: laba ditahan dikurangkan dalam rumus EFN, jadi EFN turun rupiah-per-rupiah.",
    "Solve 3: menaikkan harga atau menjual aset mengubah operasi; utang bank hanya mendanai celah yang diukur EFN."]);
}

/* ================= hari-24 ================= */
/* h24:0 — PV anuitas: PMT × [1 − (1+r)^−n] ÷ r */
function b3h240(rng, ref, L){
  const en = L === "en";
  const PMT = b3pick(rng, [800, 1000, 1200, 1500]), n = b3pick(rng, [4, 5, 6]);
  const r = b3pick(rng, [6, 8, 10]);
  const factor = (1 - Math.pow(1 + r / 100, -n)) / (r / 100);
  const pv = Math.round(PMT * factor), fv = Math.round(PMT * (Math.pow(1 + r / 100, n) - 1) / (r / 100));
  const u = en ? "k" : "rb";
  const vals = [
    `Rp${b3i(pv, L)}${u}`,
    `Rp${b3i(fv, L)}${u} — ${en ? "that is the future value, not the present value" : "itu future value, bukan present value"}`,
    `Rp${b3i(PMT * n, L)}${u} — ${en ? `${PMT} × ${n}, no discounting at all` : `${PMT} × ${n}, tanpa diskonto sama sekali`}`,
    `Rp${b3i(factor, 3, L)}${u} — ${en ? "that is only the factor, not yet multiplied by " : "itu faktornya saja, belum dikali "}${PMT}`
  ];
  const q = en
    ? `Annual rent of Rp${b3i(PMT, L)}k for ${n} years, discount rate ${r}%. What is its present value?`
    : `Sewa tahunan Rp${b3i(PMT, L)}rb selama ${n} tahun, diskonto ${r}%. Berapa present value-nya?`;
  const ex = en
    ? `${b3i(PMT, L)} × ${b3i(factor, 5, L)} = ${b3i(pv, L)}. Two eternal traps: a positive exponent = future value (${b3i(fv, L)}), and forgetting to multiply by PMT (${b3i(factor, 3, L)}). The sign of the exponent = the direction of time: negative = bring back to today. (${ref})`
    : `${b3i(PMT, L)} × ${b3i(factor, 5, L)} = ${b3i(pv, L)}. Dua jebakan abadi: pangkat positif = future value (${b3i(fv, L)}), dan lupa mengalikan PMT (${b3i(factor, 3, L)}). Tanda pangkat = arah waktu: negatif = mundurkan ke kini. (${ref})`;
  const st = en ? [
    "Analysis: an annuity's PV = payment × annuity factor.",
    `Solve 1: factor = [1 − (1+${r}%)^−${n}] ÷ ${r}% = ${b3i(factor, 5, L)}.`,
    `Solve 2: PV = ${PMT} × ${b3i(factor, 5, L)}.`,
    `Solve 3: compute → Rp${b3i(pv, L)}k.`
  ] : [
    "Analysis: PV anuitas = pembayaran × faktor anuitas.",
    `Solve 1: faktor = [1 − (1+${r}%)^−${n}] ÷ ${r}% = ${b3i(factor, 5, L)}.`,
    `Solve 2: PV = ${PMT} × ${b3i(factor, 5, L)}.`,
    `Solve 3: hitung → Rp${b3i(pv, L)}rb.`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h24:1 — CFO: NI + depresiasi − Δpiutang + Δutang usaha */
function b3h241(rng, ref, L){
  const en = L === "en";
  const NI = b3ri(rng, 3500, 5500, 500), dep = b3pick(rng, [600, 800, 1000]);
  const dAR = b3pick(rng, [400, 600, 800]), dAP = b3pick(rng, [200, 300, 400]);
  const cfo = NI + dep - dAR + dAP;
  const u = en ? "k" : "rb";
  const vals = [
    `Rp${b3i(cfo, L)}${u}`,
    `Rp${b3i(NI + dep + dAR + dAP, L)}${u} — ${en ? "receivables rising were added instead (direction flipped)" : "piutang naik malah ditambah (arah terbalik)"}`,
    `Rp${b3i(NI + dep - dAR, L)}${u} — ${en ? "payables forgotten" : "utang usaha lupa dihitung"}`,
    `Rp${b3i(NI + dep + dAR - dAP, L)}${u} — ${en ? "both WC directions flipped" : "kedua arah ΔWC terbalik"}`
  ];
  const q = en
    ? `NI ${b3i(NI, L)}, depreciation ${b3i(dep, L)}, receivables up ${b3i(dAR, L)}, payables up ${b3i(dAP, L)}. CFO?`
    : `NI ${b3i(NI, L)}, depresiasi ${b3i(dep, L)}, piutang naik ${b3i(dAR, L)}, utang usaha naik ${b3i(dAP, L)}. CFO?`;
  const ex = en
    ? `${b3i(NI, L)} + ${b3i(dep, L)} − ${b3i(dAR, L)} + ${b3i(dAP, L)} = ${b3i(cfo, L)}. Receivables up = cash parked with customers = subtract; payables up = cash parked with the company = add. The ΔWC direction is the eternal linkage trap. (${ref})`
    : `${b3i(NI, L)} + ${b3i(dep, L)} − ${b3i(dAR, L)} + ${b3i(dAP, L)} = ${b3i(cfo, L)}. Piutang naik = kas tertahan di pelanggan = kurangi; utang usaha naik = kas tertahan di perusahaan = tambah. Arah ΔWC adalah jebakan abadi linkage 3 laporan. (${ref})`;
  const st = en ? [
    "Analysis: CFO = NI + non-cash expenses ± ΔWC — get every sign right.",
    `Solve 1: add back depreciation: ${NI} + ${dep} = ${NI + dep}.`,
    `Solve 2: receivables up ${dAR} = cash out → −${dAR}; payables up ${dAP} = cash in → +${dAP}.`,
    `Solve 3: ${NI + dep} − ${dAR} + ${dAP} = Rp${b3i(cfo, L)}k.`
  ] : [
    "Analysis: CFO = NI + beban non-kas ± ΔWC — tiap tanda harus benar.",
    `Solve 1: add-back depresiasi: ${NI} + ${dep} = ${NI + dep}.`,
    `Solve 2: piutang naik ${dAR} = kas keluar → −${dAR}; utang usaha naik ${dAP} = kas masuk → +${dAP}.`,
    `Solve 3: ${NI + dep} − ${dAR} + ${dAP} = Rp${b3i(cfo, L)}rb.`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h24:2 — DSO = piutang ÷ (revenue ÷ 360) */
function b3h242(rng, ref, L){
  const en = L === "en";
  const day = b3pick(rng, [100, 150, 200, 250]), dso = b3pick(rng, [30, 40, 45, 50, 60]);
  const rev = day * 360, ar = day * dso;
  const inv = Math.round(360 / dso * 10) / 10;
  const vals = [
    `${b3n(dso, L)} ${en ? "days" : "hari"}`,
    `${b3n(inv, L)} ${en ? "days — the formula is flipped (revenue ÷ receivables)" : "hari — rumusnya terbalik (revenue ÷ piutang)"}`,
    `${b3i(day, L)} ${en ? "days — that is revenue per day, not DSO" : "hari — itu revenue per hari, bukan DSO"}`,
    `${b3n(dso / 10, L)} ${en ? "days — the decimal point slipped one digit" : "hari — koma desimal meleset satu digit"}`
  ];
  const q = en
    ? `Annual revenue ${b3i(rev, L)}, receivables ${b3i(ar, L)}. DSO?`
    : `Revenue tahunan ${b3i(rev, L)}, piutang ${b3i(ar, L)}. DSO?`;
  const ex = en
    ? `${b3i(ar, L)} ÷ ${b3i(day, L)} = ${dso} days — cash parked ${dso} days in receivables. Trap: flipping the formula (${b3n(inv, L)} days) or stopping at daily revenue (${b3i(day, L)}). Always ask first: 'what is revenue per day?' (${ref})`
    : `${b3i(ar, L)} ÷ ${b3i(day, L)} = ${dso} hari — kas tertahan ${dso} hari di piutang. Jebakan: membalik rumus (${b3n(inv, L)} hari) atau berhenti di revenue harian (${b3i(day, L)}). Selalu tanya dulu: 'berapa revenue per harinya?' (${ref})`;
  const st = en ? [
    "Analysis: DSO turns rupiah into days — find daily revenue first.",
    `Solve 1: daily revenue = ${rev} ÷ 360 = ${day}.`,
    `Solve 2: DSO = receivables ÷ daily revenue = ${ar} ÷ ${day}.`,
    `Solve 3: compute → ${dso} days.`
  ] : [
    "Analysis: DSO mengubah rupiah jadi hari — cari revenue harian dulu.",
    `Solve 1: revenue per hari = ${rev} ÷ 360 = ${day}.`,
    `Solve 2: DSO = piutang ÷ revenue harian = ${ar} ÷ ${day}.`,
    `Solve 3: hitung → ${dso} hari.`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h24:3 — WACC = wE×ke + wD×kd×(1−t) */
function b3h243(rng, ref, L){
  const en = L === "en";
  const wE = b3pick(rng, [50, 60, 70]), wD = 100 - wE;
  const ke = b3pick(rng, [12, 14, 15]), kd = b3pick(rng, [7, 8, 9]), t = b3pick(rng, [20, 22, 25]);
  const wacc = wE / 100 * ke + wD / 100 * kd * (1 - t / 100);
  const noTax = wE / 100 * ke + wD / 100 * kd;
  const swap = wD / 100 * ke + wE / 100 * kd * (1 - t / 100);
  const r1 = v => Math.round(v * 10) / 10;
  const vals = [b3i(r1(wacc), 1, L) + "%", b3i(r1(noTax), 1, L) + "% — " + (en ? "forgot the tax shield" : "lupa perisai pajak"), b3i(r1(swap), 1, L) + "% — " + (en ? "equity and debt weights swapped" : "bobot ekuitas dan utang tertukar"), b3i(ke, 1, L) + "% — " + (en ? "only the cost of equity" : "hanya cost of equity")];
  const q = en
    ? `Capital structure: equity ${wE}%, debt ${wD}%, cost of equity ${ke}%, cost of debt ${kd}%, tax ${t}%. WACC?`
    : `Struktur modal: ekuitas ${wE}%, utang ${wD}%, cost of equity ${ke}%, cost of debt ${kd}%, pajak ${t}%. WACC?`;
  const ex = en
    ? `${b3n(wE / 100 * ke, L)}% + ${b3n(wD / 100 * kd * (1 - t / 100), L)}% = ${b3i(r1(wacc), 1, L)}%. Eternal trap: forgetting (1−t) → ${b3i(r1(noTax), 1, L)}%. Debt is cheaper precisely because its interest cuts tax — without the shield, WACC is not WACC. (${ref})`
    : `${b3n(wE / 100 * ke, L)}% + ${b3n(wD / 100 * kd * (1 - t / 100), L)}% = ${b3i(r1(wacc), 1, L)}%. Jebakan abadi: lupa (1−t) → ${b3i(r1(noTax), 1, L)}%. Utang lebih murah justru karena bunganya mengurangi pajak — tanpa perisai itu, WACC bukan WACC. (${ref})`;
  const st = en ? [
    "Analysis: WACC weights each capital source by its after-tax cost.",
    `Solve 1: equity leg = ${wE}% × ${ke}% = ${b3n(wE / 100 * ke, L)}%.`,
    `Solve 2: after-tax debt cost = ${kd}% × (1 − ${t}%) = ${b3n(kd * (1 - t / 100), L)}%; debt leg = ${wD}% × ${b3n(kd * (1 - t / 100), L)}% = ${b3n(wD / 100 * kd * (1 - t / 100), L)}%.`,
    `Solve 3: WACC = ${b3n(wE / 100 * ke, L)}% + ${b3n(wD / 100 * kd * (1 - t / 100), L)}% = ${b3i(r1(wacc), 1, L)}%.`
  ] : [
    "Analysis: WACC membobot tiap sumber modal dengan biaya setelah pajaknya.",
    `Solve 1: kaki ekuitas = ${wE}% × ${ke}% = ${b3n(wE / 100 * ke, L)}%.`,
    `Solve 2: biaya utang setelah pajak = ${kd}% × (1 − ${t}%) = ${b3n(kd * (1 - t / 100), L)}%; kaki utang = ${wD}% × ${b3n(kd * (1 - t / 100), L)}% = ${b3n(wD / 100 * kd * (1 - t / 100), L)}%.`,
    `Solve 3: WACC = ${b3n(wE / 100 * ke, L)}% + ${b3n(wD / 100 * kd * (1 - t / 100), L)}% = ${b3i(r1(wacc), 1, L)}%.`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h24:4 — TV Gordon: FCFF₅ × (1+g) ÷ (WACC − g) */
function b3h244(rng, ref, L){
  const en = L === "en";
  const F = b3pick(rng, [2000, 3000, 4000, 5000]), g = b3pick(rng, [3, 4, 5]);
  const W = g + 8, num = F * (1 + g / 100), tv = Math.round(num / 0.08);
  const u = en ? "k" : "rb";
  const vals = [
    `Rp${b3i(tv, L)}${u}`,
    `Rp${b3i(Math.round(F / 0.08), L)}${u} — ${en ? "forgot ×(1+g) in the numerator" : "lupa ×(1+g) di pembilang"}`,
    `Rp${b3i(Math.round(num / (W / 100)), L)}${u} — ${en ? "denominator is WACC alone, not WACC−g" : "penyebutnya WACC saja, bukan WACC−g"}`,
    `Rp${b3i(Math.round(num / 0.07), L)}${u} — ${en ? "denominator 0,07 (miscomputed WACC−g)" : "penyebut 0,07 (salah hitung WACC−g)"}`
  ];
  const q = en
    ? `Year-5 FCFF = ${b3i(F, L)}, g = ${g}%, WACC = ${W}%. Terminal value (Gordon)?`
    : `FCFF tahun-5 = ${b3i(F, L)}, g = ${g}%, WACC = ${W}%. Terminal value (Gordon)?`;
  const ex = en
    ? `${b3i(num, L)} ÷ ${b3n(0.08, L)} = ${b3i(tv, L)}. Two Gordon traps: forgetting (1+g) → ${b3i(Math.round(F / 0.08), L)}, and using WACC alone as the denominator → ${b3i(Math.round(num / (W / 100)), L)}. TV is often >70% of DCF value — getting this wrong = getting the valuation wrong. (${ref})`
    : `${b3i(num, L)} ÷ ${b3n(0.08, L)} = ${b3i(tv, L)}. Dua jebakan Gordon: lupa (1+g) → ${b3i(Math.round(F / 0.08), L)}, dan penyebut WACC saja → ${b3i(Math.round(num / (W / 100)), L)}. TV sering >70% nilai DCF — salah di sini = salah valuasi. (${ref})`;
  const st = en ? [
    "Analysis: Gordon TV grows the last FCFF by g, then capitalises it at (WACC − g).",
    `Solve 1: numerator = ${F} × (1 + ${g}%) = ${b3i(num, L)}.`,
    `Solve 2: denominator = ${W}% − ${g}% = 8%.`,
    `Solve 3: TV = ${b3i(num, L)} ÷ ${b3n(0.08, L)} = Rp${b3i(tv, L)}k.`
  ] : [
    "Analysis: TV Gordon menumbuhkan FCFF terakhir dengan g, lalu mengkapitalisasi dengan (WACC − g).",
    `Solve 1: pembilang = ${F} × (1 + ${g}%) = ${b3i(num, L)}.`,
    `Solve 2: penyebut = ${W}% − ${g}% = 8%.`,
    `Solve 3: TV = ${b3i(num, L)} ÷ ${b3n(0.08, L)} = Rp${b3i(tv, L)}rb.`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h24:5 — akresi: bayar P/E target < P/E acquirer = akretif */
function b3h245(rng, ref, L){
  const en = L === "en";
  const pa = b3pick(rng, [10, 12, 14, 15]), pb = b3pick(rng, [6, 8, 9]);
  if (en) return b3txt(rng,
    `A (P/E ${pa}x) acquires B (P/E ${pb}x) entirely with shares. Impact on year-1 EPS (ignore synergies)?`,
    [`Accretive — paying ${pb}x for earnings the market prices at ${pa}x`,
     "Dilutive — the target's P/E is lower",
     "Neutral — P/E is irrelevant",
     "Cannot be determined without knowing synergies"], 0,
    `Accretive: each new share 'buys' B's earnings at ${pb}x while the market prices A's earnings at ${pa}x. But remember Day 16: accretive ≠ good — ${pb}x can still be overpaying if B's earnings are fragile. (${ref})`,
    ["Analysis: compare the price paid with the price the market puts on your own earnings.",
     `Solve 1: A issues shares priced at ${pa}x its earnings to buy earnings priced at ${pb}x.`,
     `Solve 2: ${pb}x < ${pa}x — A buys earnings more cheaply than the market values its own.`,
     "Solve 3: cheaper earnings per share issued = EPS rises = accretive (before any synergy)."]);
  return b3txt(rng,
    `A (P/E ${pa}x) mengakuisisi B (P/E ${pb}x) sepenuhnya dengan saham. Dampak ke EPS tahun-1 (abaikan sinergi)?`,
    [`Akretif — membayar ${pb}x untuk laba yang pasar hargai ${pa}x`,
     "Dilutif — P/E target lebih rendah",
     "Netral — P/E tidak relevan",
     "Tidak bisa ditentukan tanpa tahu sinergi"], 0,
    `Akretif: tiap saham baru 'membeli' laba B seharga ${pb}x sementara pasar menghargai laba A ${pa}x. Tapi ingat Hari 16: akretif ≠ bagus — harga ${pb}x bisa kemahalan kalau laba B rapuh. (${ref})`,
    ["Analysis: bandingkan harga yang dibayar vs harga pasar atas labamu sendiri.",
     `Solve 1: A menerbitkan saham yang dihargai ${pa}x atas labanya untuk membeli laba seharga ${pb}x.`,
     `Solve 2: ${pb}x < ${pa}x — A membeli laba lebih murah dari penilaian pasar atas labanya sendiri.`,
     "Solve 3: laba yang dibeli lebih murah per saham yang diterbitkan = EPS naik = akretif (sebelum sinergi apa pun)."]);
}
/* h24:6 — sinergi butuh 12–24 bulan + biaya integrasi, jangan booking penuh tahun-1 */
function b3h246(rng, ref, L){
  const en = L === "en";
  const S = b3pick(rng, [2000, 3000, 4000]), mo = b3pick(rng, [12, 18, 24]);
  if (en) return b3txt(rng,
    `The model books the full Rp${b3i(S, L)}k of synergies in year 1 to justify the acquisition price. What is wrong?`,
    ["Nothing — synergies always happen",
     `Synergies take ${mo} months + integration costs; claiming them in full in year 1 = paying for a promise`,
     "Synergies must be zero forever",
     "Synergies cannot be modelled"], 1,
    `The price is paid today; synergies (if any) arrive ${mo} months later, after integration costs. A model that books them in full in year 1 legalises overpaying in a spreadsheet. (${ref})`,
    ["Analysis: match the timing — when is the price paid, when does the cash arrive?",
     "Solve 1: the acquisition price leaves the bank on day one.",
     `Solve 2: synergies need ${mo} months of integration work — and integration itself costs money.`,
     "Solve 3: booking the full amount in year 1 makes an overpriced deal look fair on paper."]);
  return b3txt(rng,
    `Model memakai sinergi Rp${b3i(S, L)}rb penuh di tahun-1 untuk membenarkan harga akuisisi. Masalahnya?`,
    ["Tidak ada — sinergi pasti terjadi",
     `Sinergi butuh ${mo} bulan + biaya integrasi; mengklaim penuh di tahun-1 = membayar untuk janji`,
     "Sinergi harus nol selamanya",
     "Sinergi tidak bisa dimodelkan"], 1,
    `Harga dibayar hari ini; sinergi (kalau ada) datang ${mo} bulan lagi setelah biaya integrasi. Model yang membooking penuh di tahun-1 melegalkan overpay di spreadsheet. (${ref})`,
    ["Analysis: cocokkan waktunya — kapan harga dibayar, kapan kasnya datang?",
     "Solve 1: harga akuisisi keluar dari bank di hari pertama.",
     `Solve 2: sinergi butuh ${mo} bulan kerja integrasi — dan integrasi itu sendiri berbiaya.`,
     "Solve 3: membooking penuh di tahun-1 membuat deal yang kemahalan terlihat wajar di kertas."]);
}
/* h24:7 — jadwal utang: bunga dari saldo AWAL, utang akhir = awal − kas */
function b3h247(rng, ref, L){
  const en = L === "en";
  const D = b3pick(rng, [10000, 12000, 15000, 20000]), r = b3pick(rng, [8, 9, 10]);
  const C = b3pick(rng, [3000, 4000, 5000]);
  const intr = D * r / 100, end = D - C;
  const u = en ? "k" : "rb";
  const vals = [
    en ? `Interest ${b3i(intr, L)}, ending debt ${b3i(end, L)}` : `Bunga ${b3i(intr, L)}, utang akhir ${b3i(end, L)}`,
    en ? `Interest ${b3i(end * r / 100, L)} — ${r}% × ending debt (${b3i(end, L)}): circular` : `Bunga ${b3i(end * r / 100, L)} — ${r}% × utang akhir (${b3i(end, L)}): circular`,
    en ? `Interest ${b3i(D * (r + 1) / 100, L)} — wrong rate (${r + 1}% × opening debt)` : `Bunga ${b3i(D * (r + 1) / 100, L)} — tarif salah (${r + 1}% × utang awal)`,
    en ? `Interest ${b3i(intr, L)}, ending debt ${b3i(end - 1000, L)} — cash short by 1,000` : `Bunga ${b3i(intr, L)}, utang akhir ${b3i(end - 1000, L)} — kas salah kurang`
  ];
  const q = en
    ? `Debt schedule: opening debt ${b3i(D, L)}, interest ${r}%, cash to debt ${b3i(C, L)}. Year-1 interest and ending debt?`
    : `Jadwal utang: utang awal ${b3i(D, L)}, bunga ${r}%, kas ke utang ${b3i(C, L)}. Bunga tahun-1 dan utang akhir?`;
  const ex = en
    ? `Interest = ${r}% × ${b3i(D, L)} = ${b3i(intr, L)}; ending debt = ${b3i(D, L)} − ${b3i(C, L)} = ${b3i(end, L)}. Using ending debt for interest = a circular reference (interest→NI→cash→ending debt→interest). In a debt schedule, the opening balance is always the base. (${ref})`
    : `Bunga = ${r}% × ${b3i(D, L)} = ${b3i(intr, L)}; utang akhir = ${b3i(D, L)} − ${b3i(C, L)} = ${b3i(end, L)}. Memakai utang akhir untuk bunga = circular reference (bunga→NI→kas→utang akhir→bunga). Di jadwal utang, saldo awal selalu jadi basis. (${ref})`;
  const st = en ? [
    "Analysis: interest is charged on the balance that existed when the year started.",
    `Solve 1: interest = ${r}% × opening debt ${D} = ${intr}.`,
    `Solve 2: ending debt = opening debt − cash to debt = ${D} − ${C} = ${end}.`,
    "Solve 3: never feed the ending balance back into the interest — that is the circle."
  ] : [
    "Analysis: bunga dibebankan atas saldo yang ada saat tahun dimulai.",
    `Solve 1: bunga = ${r}% × utang awal ${D} = ${intr}.`,
    `Solve 2: utang akhir = utang awal − kas ke utang = ${D} − ${C} = ${end}.`,
    "Solve 3: jangan pernah mengumpankan saldo akhir kembali ke bunga — itulah lingkarannya."
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h24:8 — floor utang: MAX(utang awal − kas, 0) */
function b3h248(rng, ref, L){
  const en = L === "en";
  const D = b3pick(rng, [6000, 8000, 10000]), C = D + b3pick(rng, [1200, 1500, 2000]);
  const ex2 = C - D;
  const u = en ? "k" : "rb";
  const vals = [
    en ? `Rp0 — floor MAX; the excess ${b3i(ex2, L)} becomes cash/dividends` : `Rp0 — floor MAX; kelebihan ${b3i(ex2, L)} jadi kas/dividen`,
    `−Rp${b3i(ex2, L)}${u} — ${en ? "negative debt" : "utang negatif"}`,
    `Rp${b3i(ex2, L)}${u} — ${en ? "the excess becomes new debt" : "kelebihannya jadi utang baru"}`,
    `Rp${b3i(C, L)}${u} — ${en ? "the cash is lost" : "kasnya hangus"}`
  ];
  const q = en
    ? `Cash to debt ${b3i(C, L)}, opening debt ${b3i(D, L)}. Ending debt?`
    : `Kas ke utang ${b3i(C, L)}, utang awal ${b3i(D, L)}. Utang akhir?`;
  const ex = en
    ? `MAX(${b3i(D, L)} − ${b3i(C, L)}, 0) = 0. The excess ${b3i(ex2, L)} piles up as cash (or dividends). Negative debt does not exist in the real world — the zero floor is mandatory in every debt schedule. (${ref})`
    : `MAX(${b3i(D, L)} − ${b3i(C, L)}, 0) = 0. Kelebihan ${b3i(ex2, L)} menumpuk sebagai kas (atau dividen). Utang negatif tidak ada di dunia nyata — floor nol wajib di tiap jadwal utang. (${ref})`;
  const st = en ? [
    "Analysis: you cannot repay more debt than exists — cap it at zero.",
    `Solve 1: raw subtraction = ${D} − ${C} = ${D - C}.`,
    "Solve 2: a negative debt balance is impossible — the bank does not owe you.",
    `Solve 3: MAX(${D - C}, 0) = 0; the extra ${ex2} stays as cash.`
  ] : [
    "Analysis: utang yang dibayar tidak bisa melebihi utang yang ada — batasi di nol.",
    `Solve 1: pengurangan mentah = ${D} − ${C} = ${D - C}.`,
    "Solve 2: saldo utang negatif mustahil — bank tidak berutang padamu.",
    `Solve 3: MAX(${D - C}, 0) = 0; kelebihan ${ex2} tetap sebagai kas.`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h24:9 — MoIC = equity keluar ÷ equity masuk; untung% = MoIC − 1 */
function b3h249(rng, ref, L){
  const en = L === "en";
  const Ein = b3pick(rng, [20000, 25000, 30000, 40000]);
  const mult = b3pick(rng, [2, 2.5, 2.8, 3, 3.2]);
  const Eout = Ein * mult, profit = (mult - 1) * 100;
  const vals = [
    `${b3n(mult, L)}x = ${b3n(profit, L)}% ${en ? "profit" : "untung"}`,
    `${b3n(mult, L)}x = ${b3n(mult * 100, L)}% ${en ? "profit" : "untung"}`,
    `${b3n(mult - 1, L)}x = ${b3n(profit, L)}% ${en ? "profit" : "untung"}`,
    `${b3n(mult, L)}x = ${b3n((mult + 1) * 100, L)}% ${en ? "profit" : "untung"}`
  ];
  const q = en
    ? `Opening equity ${b3i(Ein, L)} grows to exit equity ${b3i(Eout, L)}. MoIC and the profit?`
    : `Equity awal ${b3i(Ein, L)} tumbuh menjadi equity exit ${b3i(Eout, L)}. MoIC dan keuntungannya?`;
  const ex = en
    ? `${b3i(Eout, L)} ÷ ${b3i(Ein, L)} = ${b3n(mult, L)}x → capital multiplied ${b3n(mult, L)} times; the profit is ${b3n(profit, L)}% (${b3n(mult, L)} − 1). '${b3n(mult, L)}x = ${b3n(mult * 100, L)}%' mixes up the multiple with the percent — the same trap that felled Day 17 and 21. (${ref})`
    : `${b3i(Eout, L)} ÷ ${b3i(Ein, L)} = ${b3n(mult, L)}x → modal berlipat ${b3n(mult, L)}; keuntungannya ${b3n(profit, L)}% (${b3n(mult, L)} − 1). '${b3n(mult, L)}x = ${b3n(mult * 100, L)}%' mencampuradukkan lipat dengan persen — jebakan yang sama menumbangkan Hari 17 dan 21. (${ref})`;
  const st = en ? [
    "Analysis: MoIC is a multiple; profit % is the multiple minus one.",
    `Solve 1: MoIC = exit ÷ entry = ${Eout} ÷ ${Ein} = ${b3n(mult, L)}x.`,
    `Solve 2: profit = MoIC − 1 = ${b3n(mult, L)} − 1 = ${b3n(mult - 1, L)} → ${b3n(profit, L)}%.`,
    "Solve 3: 2,8x means you get 2,8 back for every 1 in — the gain is 1,8, i.e. 180%."
  ] : [
    "Analysis: MoIC adalah kelipatan; persen untung adalah kelipatan dikurangi satu.",
    `Solve 1: MoIC = exit ÷ masuk = ${Eout} ÷ ${Ein} = ${b3n(mult, L)}x.`,
    `Solve 2: untung = MoIC − 1 = ${b3n(mult, L)} − 1 = ${b3n(mult - 1, L)} → ${b3n(profit, L)}%.`,
    "Solve 3: 2,8x berarti tiap 1 yang masuk kembali 2,8 — keuntungannya 1,8, alias 180%."
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h24:10 — forecast hidup & di-update; budget dikunci */
function b3h2410(rng, ref, L){
  const en = L === "en";
  const nm = en ? b3pick(rng, ["A manager", "The FP&A lead", "A division head"]) : b3pick(rng, ["Manajer", "Kepala FP&A", "Kepala divisi"]);
  const per = en ? b3pick(rng, ["every quarter", "every month"]) : b3pick(rng, ["tiap kuartal", "tiap bulan"]);
  if (en) return b3txt(rng,
    `${nm} complains: 'the forecast is revised ${per} — the target keeps moving!' What is the correct reply?`,
    ["Correct — a forecast must never change",
     "A misunderstanding: a forecast = an expectation that IS updated; a budget = a commitment that is locked",
     "Delete both and use instinct",
     "It is the budget that must be revised every quarter"], 1,
    `A forecast is alive — updated ${per} as reality arrives. What is locked is the budget (the performance benchmark). Demanding an unchanging forecast = demanding that a January weather forecast still be right in December. (${ref})`,
    ["Analysis: the complaint confuses two different tools — which one is the promise?",
     "Solve 1: a forecast is an expectation; new information SHOULD move it.",
     "Solve 2: a budget is the commitment against which performance is judged — that is the locked one.",
     "Solve 3: revising the forecast is the feature, not the bug."]);
  return b3txt(rng,
    `${nm} protes: 'forecast direvisi ${per} — target terus berubah!' Koreksi yang tepat?`,
    ["Benar — forecast tidak boleh berubah",
     "Salah paham: forecast = ekspektasi yang memang di-update; budget = komitmen yang dikunci",
     "Hapus keduanya, pakai insting",
     "Budget yang harus direvisi tiap kuartal"], 1,
    `Forecast memang hidup — di-update ${per} mengikuti realita. Yang dikunci adalah budget (tolok ukur kinerja). Menuntut forecast tidak berubah = menuntut ramalan cuaca Januari tetap benar di Desember. (${ref})`,
    ["Analysis: keluhan ini mencampur dua alat berbeda — mana yang janji?",
     "Solve 1: forecast adalah ekspektasi; informasi baru SEHARUSNYA menggerakkannya.",
     "Solve 2: budget adalah komitmen yang dipakai menilai kinerja — itu yang dikunci.",
     "Solve 3: merevisi forecast adalah fiturnya, bukan bug-nya."]);
}
/* h24:11 — referensi absolut $: asumsi dikunci, deret waktu relatif */
function b3h2411(rng, ref, L){
  const en = L === "en";
  const gcell = b3pick(rng, ["$C$3", "$D$2", "$B$5"]);
  const cell = b3pick(rng, ["C10", "D12", "B8"]);
  if (en) return b3txt(rng,
    `The formula =${cell}*(1+${gcell}) is copied to the right for Y1..Y5. What happens to ${gcell}?`,
    [`It shifts to the right — $ has no effect when copying right`,
     `It stays ${gcell} — the assumption cell is locked for all years`,
     "It shifts down a row each year",
     "Error #REF!"], 1,
    `${gcell} is fully absolute — copied anywhere, it still points at the same assumption cell. ${cell} is relative — it moves with the year. Eternal rule: assumptions = absolute, time series = relative. (${ref})`,
    ["Analysis: $ locks the column AND the row it sits on.",
     `Solve 1: ${gcell} has $ on both sides → it never moves.`,
     `Solve 2: ${cell} has no $ → copying right shifts it to the next year.`,
     "Solve 3: that is the design — one assumption cell feeding five years."]);
  return b3txt(rng,
    `Rumus =${cell}*(1+${gcell}) di-copy ke kanan untuk Y1..Y5. Apa yang terjadi pada ${gcell}?`,
    [`Bergeser ke kanan — $ tidak berpengaruh saat copy ke kanan`,
     `Tetap ${gcell} — sel asumsi dikunci untuk semua tahun`,
     "Bergeser ke bawah satu baris tiap tahun",
     "Error #REF!"], 1,
    `${gcell} absolut penuh — di-copy ke mana pun tetap menunjuk sel asumsi yang sama. ${cell} relatif — bergeser mengikuti tahunnya. Aturan abadi: asumsi = absolute, deret waktu = relatif. (${ref})`,
    ["Analysis: $ mengunci kolom DAN baris yang ditempelinya.",
     `Solve 1: ${gcell} punya $ di kedua sisi → tidak pernah bergerak.`,
     `Solve 2: ${cell} tanpa $ → copy ke kanan menggesernya ke tahun berikut.`,
     "Solve 3: itulah desainnya — satu sel asumsi memberi makan lima tahun."]);
}
/* h24:12 — prioritas drill: topik terendah di bawah 60% */
function b3h2412(rng, ref, L){
  const en = L === "en";
  const topics = en ? ["DCF", "Comps", "LBO", "WACC"] : ["DCF", "Comps", "LBO", "WACC"];
  const low = b3pick(rng, topics);
  const lowS = b3pick(rng, [35, 40, 45, 50, 55]);
  const others = topics.filter(t => t !== low);
  const s1 = b3pick(rng, [65, 70, 75, 80, 85]), s2 = b3pick(rng, [65, 70, 75, 80, 85]);
  const total = b3pick(rng, [62, 65, 68, 70]);
  const opts = [
    `${low} ${lowS}% ${en ? "(below 60%)" : "(di bawah 60%)"}`,
    `${others[0]} ${s1}%`,
    `${en ? "Total" : "Total"} ${total}%`,
    `${others[1]} ${s2}%`
  ];
  const q = en
    ? `Mock 1: total ${total}%, ${low} ${lowS}%, ${others[0]} ${s1}%, ${others[1]} ${s2}%. First drill priority?`
    : `Mock 1: total ${total}%, ${low} ${lowS}%, ${others[0]} ${s1}%, ${others[1]} ${s2}%. Drill prioritas pertama?`;
  const ex = en
    ? `${low} ${lowS}% — furthest below the 60% bar. The total ${total}% hides the hole; the per-topic dashboard shows it. (${ref})`
    : `${low} ${lowS}% — paling jauh di bawah ambang 60%. Total ${total}% menyembunyikan lubang; dashboard per topik menunjukkannya. (${ref})`;
  const st = en ? [
    "Analysis: drill where the hole is — the total score is an average that hides it.",
    `Solve 1: the bar is 60%; ${low} at ${lowS}% is furthest below it.`,
    `Solve 2: ${others[0]} (${s1}%) and ${others[1]} (${s2}%) are above the bar already.`,
    "Solve 3: one focused drill on the weakest topic beats re-doing everything."
  ] : [
    "Analysis: drill di mana lubangnya — skor total adalah rata-rata yang menyembunyikannya.",
    `Solve 1: ambangnya 60%; ${low} di ${lowS}% paling jauh di bawahnya.`,
    `Solve 2: ${others[0]} (${s1}%) dan ${others[1]} (${s2}%) sudah di atas ambang.`,
    "Solve 3: satu drill fokus pada topik terlemah mengalahkan mengulang semuanya."
  ];
  return b3txt(rng, q, opts, 0, ex, st);
}

/* ================= hari-26 ================= */
/* h26:0 — NII = NIM × rata-rata kredit (bunga mengalir sepanjang tahun) */
function b3h260(rng, ref, L){
  const en = L === "en";
  const nim = b3pick(rng, [4, 5, 6]), Ls = b3pick(rng, [8000, 10000]);
  const g = b3pick(rng, [10, 12, 15]), Le = Math.round(Ls * (1 + g / 100));
  if (en) return b3txt(rng,
    `NII = NIM × average loans, not × year-end loans. Why? (NIM ${nim}%, loans ${b3i(Ls, L)} → ${b3i(Le, L)}.)`,
    ["To make the formula longer",
     "Interest income is earned through the whole year; the year-end stock has not earned a full year of interest yet",
     "An OJK rule",
     "Because opening loans are always larger"], 1,
    `Interest flows through the year while the loan stock grows. Using the year-end stock (full only in December) overstates NII by about half of that year's growth. The average is the honest approximation for a flow. (${ref})`,
    ["Analysis: NII is a FLOW (a whole year of interest); the loan balance is a STOCK (a snapshot).",
     `Solve 1: loans grew ${Ls} → ${Le} during the year — most of the new loans existed only for part of it.`,
     "Solve 2: the year-end stock was only 'full' in December; it did not earn a full year of interest.",
     "Solve 3: the average stock approximates what actually earned interest all year."]);
  return b3txt(rng,
    `NII = NIM × rata-rata kredit, bukan × kredit akhir tahun. Kenapa? (NIM ${nim}%, kredit ${b3i(Ls, L)} → ${b3i(Le, L)}.)`,
    ["Agar rumusnya lebih panjang",
     "Pendapatan bunga diperoleh sepanjang tahun; stok akhir belum menghasilkan bunga setahun penuh",
     "Aturan OJK",
     "Karena kredit awal selalu lebih besar"], 1,
    `Bunga mengalir sepanjang tahun sementara stok kredit tumbuh. Memakai stok akhir (penuh di Desember) melebih-lebihkan NII sebesar setengah pertumbuhan tahun itu. Rata-rata = pendekatan jujur untuk arus. (${ref})`,
    ["Analysis: NII adalah ARUS (bunga setahun penuh); saldo kredit adalah STOK (foto sesaat).",
     `Solve 1: kredit tumbuh ${Ls} → ${Le} selama setahun — sebagian besar kredit baru hanya ada sebagian tahun.`,
     "Solve 2: stok akhir tahun baru 'penuh' di Desember; ia belum menghasilkan bunga setahun penuh.",
     "Solve 3: rata-rata stok mendekati jumlah yang benar-benar menghasilkan bunga sepanjang tahun."]);
}
/* h26:1 — payout naik → dividen menggerus laba ditahan, ekuitas, CAR */
function b3h261(rng, ref, L){
  const en = L === "en";
  const p1 = b3pick(rng, [25, 30, 35]), p2 = b3pick(rng, [50, 60, 70]);
  if (en) return b3txt(rng,
    `Dividend payout is raised ${p1}% → ${p2}% (all other assumptions unchanged). Impact on T3 equity and CAR?`,
    ["Up — dividends raise equity",
     "Unchanged",
     `Down — dividends reduce retained earnings → smaller equity → lower CAR; the dividend-vs-capital trade-off`,
     "CAR rises because of dividends"], 2,
    `Every rupiah of dividends = one rupiah of capital gone. T3 equity falls → the CAR numerator shrinks → CAR falls. This is the bank's core trade-off: pleasing shareholders today vs keeping the capital buffer to grow tomorrow. (${ref})`,
    ["Analysis: follow the equity walk — E = E_last + NI − Dividends.",
     `Solve 1: payout ${p1}% → ${p2}% means more of NI leaves as dividends.`,
     "Solve 2: less retained earnings = smaller equity at T3.",
     "Solve 3: CAR's numerator shrinks while risk-weighted assets do not — CAR falls."]);
  return b3txt(rng,
    `Dividend payout dinaikkan ${p1}% → ${p2}% (semua asumsi lain sama). Dampak ke Ekuitas T3 dan CAR?`,
    ["Naik — dividen menaikkan ekuitas",
     "Tidak berubah",
     "Turun — dividen mengurangi laba ditahan → ekuitas lebih kecil → CAR lebih rendah; trade-off dividen vs modal",
     "CAR naik karena dividen"], 2,
    `Setiap rupiah dividen = satu rupiah modal hilang. Ekuitas T3 turun → pembilang CAR mengecil → CAR turun. Inilah trade-off inti bank: memanjakan pemegang saham hari ini vs menjaga buffer modal untuk tumbuh besok. (${ref})`,
    ["Analysis: ikuti equity walk — E = E_lalu + NI − Dividen.",
     `Solve 1: payout ${p1}% → ${p2}% berarti lebih banyak NI keluar sebagai dividen.`,
     "Solve 2: laba ditahan lebih sedikit = ekuitas T3 lebih kecil.",
     "Solve 3: pembilang CAR mengecil sementara ATMR tidak — CAR turun."]);
}
/* h26:2 — provisi memburuk 2×: rantai Provisi → EBT → NI → Dividen → Ekuitas → CAR */
function b3h262(rng, ref, L){
  const en = L === "en";
  const p = b3pick(rng, [1.5, 1.8, 2.0]), p2 = p * 2;
  if (en) return b3txt(rng,
    `Provisions are ${b3n(p, L)}% of ending loans. If actual NPLs worsen 2× (effective provisions ${b3n(p2, L)}%), what happens?`,
    ["Nothing — provisions are only a reserve",
     `EBT falls by the extra provisions each year; NI, dividends, equity, and CAR are eroded in a chain`,
     "Only CAR falls",
     "Loans fall automatically"], 1,
    `Provisions are an expense: +${b3n(p, L)}pp of provisions cuts EBT dollar-for-dollar, then flows into NI, dividends, the equity walk, and CAR. Deteriorating asset quality hits a bank twice: profit falls AND capital is eroded. (${ref})`,
    ["Analysis: a provision is not a memo — it is an expense in the income statement.",
     `Solve 1: provisions rise ${b3n(p, L)}% → ${b3n(p2, L)}% of loans — EBT falls by the extra amount.`,
     "Solve 2: lower EBT → lower NI → lower dividends → less retained earnings.",
     "Solve 3: less retained earnings → smaller equity → lower CAR. One shock, five links."]);
  return b3txt(rng,
    `Provisi ${b3n(p, L)}% dari kredit akhir. Jika NPL aktual memburuk 2× lipat (provisi efektif ${b3n(p2, L)}%), apa yang terjadi?`,
    ["Tidak ada — provisi hanya cadangan",
     `EBT turun sebesar tambahan provisi tiap tahun; NI, dividen, ekuitas, dan CAR ikut tergerus berantai`,
     "Hanya CAR yang turun",
     "Kredit ikut turun otomatis"], 1,
    `Provisi adalah beban: +${b3n(p, L)}pp provisi memotong EBT dolar-per-dolar, lalu mengalir ke NI, dividen, equity walk, dan CAR. Kualitas aset yang memburuk menghantam bank dua kali: laba turun DAN modal tergerus. (${ref})`,
    ["Analysis: provisi bukan catatan pinggir — ia beban di laporan laba rugi.",
     `Solve 1: provisi naik ${b3n(p, L)}% → ${b3n(p2, L)}% dari kredit — EBT turun sebesar tambahannya.`,
     "Solve 2: EBT lebih rendah → NI lebih rendah → dividen lebih rendah → laba ditahan lebih sedikit.",
     "Solve 3: laba ditahan lebih sedikit → ekuitas lebih kecil → CAR lebih rendah. Satu guncangan, lima mata rantai."]);
}
/* h26:3 — CAR di atas ambang: buffer + tren menurun */
function b3h263(rng, ref, L){
  const en = L === "en";
  const car = b3pick(rng, [15.25, 16.75, 17.89, 18.68, 19.56]);
  const thr = 12, buf = car - thr;
  const t1 = car + 2, t2 = car + 1;
  if (en) return b3txt(rng,
    `CAR T3 ${b3i(car, 2, L)}% vs an illustrative ${thr}% threshold (trend ${b3i(t1, 2, L)} → ${b3i(t2, 2, L)} → ${b3i(car, 2, L)}). Correct reading?`,
    ["The bank has failed — CAR must be 100%",
     `A ${b3i(buf, 2, L)}pp buffer above the threshold: room to grow, raise dividends, or absorb shocks — but the trend is falling, so watch it`,
     "CAR does not matter",
     "Pay out 100% dividends immediately"], 1,
    `A ${b3i(buf, 2, L)}pp buffer = room to manoeuvre (grow, pay dividends, absorb a shock). But the trend is falling because loans grow faster than capital — project when the buffer runs out. CAR is a trend metric, not a photograph. (${ref})`,
    ["Analysis: two questions — how big is the buffer, and which way is it moving?",
     `Solve 1: buffer = ${b3i(car, 2, L)} − ${thr} = ${b3i(buf, 2, L)}pp above the threshold.`,
     `Solve 2: trend ${b3i(t1, 2, L)} → ${b3i(t2, 2, L)} → ${b3i(car, 2, L)} is falling — capital grows slower than loans.`,
     "Solve 3: a buffer with a falling trend is a countdown, not a comfort."]);
  return b3txt(rng,
    `CAR T3 ${b3i(car, 2, L)}% vs ambang ilustrasi ${thr}%. Bacaan yang benar? (tren ${b3i(t1, 2, L)} → ${b3i(t2, 2, L)} → ${b3i(car, 2, L)})`,
    ["Bank gagal — CAR harus 100%",
     `Buffer ${b3i(buf, 2, L)}pp di atas ambang: ruang untuk tumbuh, menaikkan dividen, atau menyerap guncangan — tetapi trennya turun, jadi awasi`,
     "CAR tidak penting",
     "Segera bagi dividen 100%"], 1,
    `Buffer ${b3i(buf, 2, L)}pp = ruang manuver (tumbuh, dividen, shock). Tetapi tren menurun karena kredit tumbuh lebih cepat dari modal — proyeksikan kapan buffer habis. CAR adalah metrik tren, bukan foto. (${ref})`,
    ["Analysis: dua pertanyaan — seberapa besar buffernya, dan ke mana arahnya?",
     `Solve 1: buffer = ${b3i(car, 2, L)} − ${thr} = ${b3i(buf, 2, L)}pp di atas ambang.`,
     `Solve 2: tren ${b3i(t1, 2, L)} → ${b3i(t2, 2, L)} → ${b3i(car, 2, L)} menurun — modal tumbuh lebih lambat dari kredit.`,
     "Solve 3: buffer dengan tren menurun adalah hitung mundur, bukan kenyamanan."]);
}
/* h26:4 — P/BV > 1 adalah premi atas ROE > CoE; bila ROE jatuh, premi menguap */
function b3h264(rng, ref, L){
  const en = L === "en";
  const BV = b3pick(rng, [150, 180, 200, 250]), mult = b3pick(rng, [1.2, 1.4, 1.5, 1.6]);
  const price = BV * mult;
  if (en) return b3txt(rng,
    `Fair price ${b3n(price, L)} = BV ${b3i(BV, L)} × P/BV ${b3n(mult, L)}. When does this ${b3n(mult, L)}× multiple collapse?`,
    ["Never — multiples stay put",
     "If ROE persistently falls below the cost of equity → the market will not pay a premium → P/BV < 1",
     "If the stock splits",
     "If dividends rise"], 1,
    `P/BV > 1 is a premium for a bank able to earn ROE above its cost of equity. If ROE falls below it persistently, the premium evaporates — even becoming a discount (P/BV < 1): the market values Rp1 of bank capital at less than Rp1. A multiple mirrors ROE; it is not a magic number. (${ref})`,
    ["Analysis: ask what the premium is paid FOR.",
     `Solve 1: ${b3n(mult, L)}× means paying a ${(mult - 1) * 100}% premium over book value.`,
     "Solve 2: the premium is only justified while ROE beats the cost of equity.",
     "Solve 3: ROE below CoE persistently → no premium → P/BV slides under 1."]);
  return b3txt(rng,
    `Harga wajar ${b3n(price, L)} = BV ${b3i(BV, L)} × P/BV ${b3n(mult, L)}. Kapan multiple ${b3n(mult, L)}× ini runtuh?`,
    ["Tidak pernah — multiple tetap",
     "Bila ROE persisten jatuh di bawah cost of equity → pasar tak mau bayar premi → P/BV < 1",
     "Bila sahamnya stock split",
     "Bila dividen naik"], 1,
    `P/BV > 1 adalah premi atas kemampuan bank menghasilkan ROE di atas cost of equity. Bila ROE jatuh di bawahnya secara persisten, premi menguap — bahkan menjadi diskon (P/BV < 1): pasar menilai Rp1 modal bank kurang berharga dari Rp1. Multiple = cerminan ROE, bukan angka sakti. (${ref})`,
    ["Analysis: tanyakan premi itu dibayar UNTUK apa.",
     `Solve 1: ${b3n(mult, L)}× berarti membayar premi ${(mult - 1) * 100}% di atas nilai buku.`,
     "Solve 2: premi hanya beralasan selama ROE mengalahkan cost of equity.",
     "Solve 3: ROE di bawah CoE secara persisten → tidak ada premi → P/BV meluncur di bawah 1."]);
}
/* h26:5 — Cost of Credit = beban CKPN ÷ rata-rata kredit */
function b3h265(rng, ref, L){
  const en = L === "en";
  const A = b3pick(rng, [8000, 8500, 9000, 10000]), p = b3pick(rng, [1.6, 1.9, 2.2]);
  const delta = b3pick(rng, [800, 960, 1000, 1200]);
  const S0 = A - delta / 2, S1 = A + delta / 2;
  const exp = A * p / 100;
  const onEnd = exp / S1 * 100, onStart = exp / S0 * 100;
  const vals = [b3i(p, 1, L) + "%", b3i(onEnd, 2, L) + "%", b3i(onStart, 2, L) + "%", b3i(2 * p, 1, L) + "%"];
  const q = en
    ? `CKPN expense T1 Rp${b3n(exp, L)}k; loans opening ${b3i(S0, L)}, closing ${b3i(S1, L)}. Cost of Credit?`
    : `Beban CKPN T1 Rp${b3n(exp, L)}rb; kredit awal ${b3i(S0, L)}, akhir ${b3i(S1, L)}. Cost of Credit?`;
  const ex = en
    ? `${b3n(exp, L)} ÷ ((${b3i(S0, L)}+${b3i(S1, L)})÷2) = ${b3n(exp, L)} ÷ ${b3i(A, L)} = ${b3i(p, 1, L)}%. Dividing by ending loans instead gives ${b3i(onEnd, 2, L)}% — that is the trap: CoC uses the AVERAGE. (${ref})`
    : `${b3n(exp, L)} ÷ ((${b3i(S0, L)}+${b3i(S1, L)})÷2) = ${b3n(exp, L)} ÷ ${b3i(A, L)} = ${b3i(p, 1, L)}%. Membagi dengan kredit AKHIR memberi ${b3i(onEnd, 2, L)}% — itu jebakannya: CoC memakai RATA-RATA. (${ref})`;
  const st = en ? [
    "Analysis: CoC divides the expense by the average loan stock that generated it.",
    `Solve 1: average loans = (${S0} + ${S1}) ÷ 2 = ${A}.`,
    `Solve 2: CoC = ${b3n(exp, L)} ÷ ${A} = ${b3n(p / 100, L)}.`,
    `Solve 3: as a percent → ${b3i(p, 1, L)}%.`
  ] : [
    "Analysis: CoC membagi beban dengan rata-rata stok kredit yang menghasilkannya.",
    `Solve 1: rata-rata kredit = (${S0} + ${S1}) ÷ 2 = ${A}.`,
    `Solve 2: CoC = ${b3n(exp, L)} ÷ ${A} = ${b3n(p / 100, L)}.`,
    `Solve 3: sebagai persen → ${b3i(p, 1, L)}%.`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h26:6 — DDM = RI untuk bank: g = ROE×(1−payout); D1 = ROE×BV×payout */
function b3h266(rng, ref, L){
  const en = L === "en";
  const BV = b3pick(rng, [160, 180, 200, 220]), ROE = b3pick(rng, [8.5, 9.5, 9.77, 10.5, 11]);
  const CoE = b3pick(rng, [11, 12, 13]), pay = b3pick(rng, [25, 30, 35, 40]);
  const roe = ROE / 100, g = roe * (1 - pay / 100);
  const D1 = roe * BV * pay / 100, ddm = D1 / (CoE / 100 - g);
  const pbvPrice = BV * 1.4, riMag = Math.abs(BV - ddm);
  if (ddm <= 0 || Math.abs(ddm - BV) < 5 || Math.abs(ddm - pbvPrice) < 1 || Math.abs(ddm - riMag) < 1) return b3h266(rng, ref, L);
  const vals = [b3i(ddm, 2, L), b3i(pbvPrice, 2, L), b3i(BV, 2, L), b3i(riMag, 2, L)];
  const q = en
    ? `Bank model: BV/share ${b3i(BV, 2, L)}; ROE ${b3n(ROE, L)}%; CoE ${CoE}%; payout ${pay}%. DDM (= RI) value per share?`
    : `Bank model: BV/saham ${b3i(BV, 2, L)}; ROE ${b3n(ROE, L)}%; CoE ${CoE}%; payout ${pay}%. Nilai DDM (= RI) per saham?`;
  const ex = en
    ? `DDM = RI = ${b3i(ddm, 2, L)}. Justified P/BV ${b3n(ddm / BV, L)}× — ROE ${b3n(ROE, L)}% < CoE ${CoE}% means this bank destroys value vs book. (${ref})`
    : `DDM = RI = ${b3i(ddm, 2, L)}. Justified P/BV ${b3n(ddm / BV, L)}× — ROE ${b3n(ROE, L)}% < CoE ${CoE}% berarti bank ini menghancurkan nilai vs buku. (${ref})`;
  const st = en ? [
    "Analysis: for a bank, DDM and residual income give the same value — build it from ROE.",
    `Solve 1: g = ${b3n(ROE, L)}% × ${100 - pay}% = ${b3n(g * 100, L)}%; D1 = ${b3n(ROE, L)}% × ${BV} × ${pay}% = ${b3i(D1, 2, L)}.`,
    `Solve 2: DDM = ${b3i(D1, 2, L)} ÷ (${CoE}% − ${b3n(g * 100, L)}%) = ${b3i(D1, 2, L)} ÷ ${b3n(CoE - g * 100, L)}%.`,
    `Solve 3: compute → ${b3i(ddm, 2, L)} (${b3i(pbvPrice, 2, L)} is the P/BV 1,4× price; ${b3i(riMag, 2, L)} is the size of the negative RI, not the value).`
  ] : [
    "Analysis: untuk bank, DDM dan residual income memberi nilai yang sama — bangun dari ROE.",
    `Solve 1: g = ${b3n(ROE, L)}% × ${100 - pay}% = ${b3n(g * 100, L)}%; D1 = ${b3n(ROE, L)}% × ${BV} × ${pay}% = ${b3i(D1, 2, L)}.`,
    `Solve 2: DDM = ${b3i(D1, 2, L)} ÷ (${CoE}% − ${b3n(g * 100, L)}%) = ${b3i(D1, 2, L)} ÷ ${b3n(CoE - g * 100, L)}%.`,
    `Solve 3: hitung → ${b3i(ddm, 2, L)} (${b3i(pbvPrice, 2, L)} itu harga dari P/BV 1,4×; ${b3i(riMag, 2, L)} itu besaran RI negatifnya, bukan nilainya).`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h26:7 — CAR = modal ÷ ATMR */
function b3h267(rng, ref, L){
  const en = L === "en";
  const C = b3pick(rng, [8, 10, 12]), A = b3pick(rng, [64, 80, 100]);
  const car = C / A * 100;
  const vals = [b3i(car, 1, L) + "%", b3i(2 * car, 1, L) + "%", b3i((C + 2) / A * 100, 1, L) + "%", b3i(A / C * 100, 0, L) + "%"];
  const q = en
    ? `Bank: capital Rp${C}T, risk-weighted assets Rp${A}T. CAR?`
    : `Bank: modal Rp${C}T, ATMR Rp${A}T. CAR?`;
  const ex = en
    ? `CAR = ${C} ÷ ${A} = ${b3i(car, 1, L)}%. (${ref})`
    : `CAR = ${C} ÷ ${A} = ${b3i(car, 1, L)}%. (${ref})`;
  const st = en ? [
    "Analysis: CAR is capital divided by risk-weighted assets.",
    `Solve 1: formula — CAR = capital ÷ ATMR.`,
    `Solve 2: substitute → ${C} ÷ ${A}.`,
    `Solve 3: compute → ${b3i(car, 1, L)}%.`
  ] : [
    "Analysis: CAR adalah modal dibagi aset tertimbang menurut risiko.",
    "Solve 1: rumus — CAR = modal ÷ ATMR.",
    `Solve 2: substitusi → ${C} ÷ ${A}.`,
    `Solve 3: hitung → ${b3i(car, 1, L)}%.`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h26:8 — plafon dividen dari kelebihan CET1 di atas target */
function b3h268(rng, ref, L){
  const en = L === "en";
  const pair = b3pick(rng, [[100, 8], [100, 9], [100, 10], [80, 10], [60, 10]]);
  const A = pair[0], tgt = pair[1];
  const C = b3pick(rng, [8, 9, 10, 11, 12]);
  const ratio = C / A * 100, req = tgt / 100 * A, cap = C - req;
  if (cap <= 0) return b3h268(rng, ref, L);
  const vals = [`Rp${b3n(cap, L)}T`, `Rp${b3n(C, L)}T`, `Rp${b3n(cap + 1, L)}T`, `Rp${b3n(req, L)}T`];
  const q = en
    ? `CET1 Rp${C}T, risk-weighted assets Rp${A}T, CET1 target ${tgt}%. Dividend ceiling from excess capital?`
    : `CET1 Rp${C}T, ATMR Rp${A}T, target CET1 ${tgt}%. Plafon dividen dari kelebihan modal?`;
  const ex = en
    ? `(${b3i(ratio, 2, L)}% − ${tgt}%) × ${A} = Rp${b3n(cap, L)}T. A bank may not pay dividends above its excess capital, however large its profit. (${ref})`
    : `(${b3i(ratio, 2, L)}% − ${tgt}%) × ${A} = Rp${b3n(cap, L)}T. Bank tidak boleh membagi dividen di atas kelebihan modalnya, berapa pun labanya. (${ref})`;
  const st = en ? [
    "Analysis: dividends are capped by the capital ABOVE the target, not by profit.",
    `Solve 1: CET1 ratio = ${C} ÷ ${A} = ${b3i(ratio, 2, L)}%.`,
    `Solve 2: excess ratio = ${b3i(ratio, 2, L)}% − ${tgt}% = ${b3n(ratio - tgt, L)}pp.`,
    `Solve 3: excess capital = ${b3n((ratio - tgt) / 100, L)} × ${A} = Rp${b3n(cap, L)}T.`
  ] : [
    "Analysis: dividen dibatasi modal DI ATAS target, bukan oleh laba.",
    `Solve 1: rasio CET1 = ${C} ÷ ${A} = ${b3i(ratio, 2, L)}%.`,
    `Solve 2: kelebihan rasio = ${b3i(ratio, 2, L)}% − ${tgt}% = ${b3n(ratio - tgt, L)}pp.`,
    `Solve 3: kelebihan modal = ${b3n((ratio - tgt) / 100, L)} × ${A} = Rp${b3n(cap, L)}T.`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h26:9 — P/TBV = harga ÷ (BV − intangibles); P/PPP = harga ÷ PPOP */
function b3h269(rng, ref, L){
  const en = L === "en";
  const P = b3pick(rng, [4000, 5000, 6000]), BV = b3pick(rng, [1800, 2000, 2500]);
  const I = b3pick(rng, [200, 300, 400, 500]), PP = b3pick(rng, [400, 500, 600]);
  const TBV = BV - I, ptbv = P / TBV, pppp = P / PP;
  const pbv = P / BV, pppp2 = P / (PP + 100);
  const fmt = (a, b) => `${b3i(a, 2, L)}× ${en ? "and" : "dan"} ${b3i(b, 1, L)}×`;
  const vals = [fmt(ptbv, pppp), fmt(pbv, pppp), fmt(ptbv, pppp2), fmt(pbv, pppp2)];
  const q = en
    ? `Price Rp${b3i(P, L)}; BV/share Rp${b3i(BV, L)}; intangibles Rp${b3i(I, L)}/share; PPOP/share Rp${b3i(PP, L)}. P/TBV and P/PPP?`
    : `Harga Rp${b3i(P, L)}; BV/saham Rp${b3i(BV, L)}; intangibles Rp${b3i(I, L)}/saham; PPOP/saham Rp${b3i(PP, L)}. P/TBV dan P/PPP?`;
  const ex = en
    ? `P/TBV = ${b3i(P, L)} ÷ ${b3i(TBV, L)} = ${b3i(ptbv, 2, L)}×; P/PPP = ${b3i(P, L)} ÷ ${b3i(PP, L)} = ${b3i(pppp, 1, L)}×. (${ref})`
    : `P/TBV = ${b3i(P, L)} ÷ ${b3i(TBV, L)} = ${b3i(ptbv, 2, L)}×; P/PPP = ${b3i(P, L)} ÷ ${b3i(PP, L)} = ${b3i(pppp, 1, L)}×. (${ref})`;
  const st = en ? [
    "Analysis: tangible book value strips intangibles out of book value first.",
    `Solve 1: TBV = ${BV} − ${I} = ${TBV}.`,
    `Solve 2: P/TBV = ${P} ÷ ${TBV} = ${b3i(ptbv, 2, L)}×.`,
    `Solve 3: P/PPP = ${P} ÷ ${PP} = ${b3i(pppp, 1, L)}×.`
  ] : [
    "Analysis: tangible book value mengeluarkan intangibles dari nilai buku dulu.",
    `Solve 1: TBV = ${BV} − ${I} = ${TBV}.`,
    `Solve 2: P/TBV = ${P} ÷ ${TBV} = ${b3i(ptbv, 2, L)}×.`,
    `Solve 3: P/PPP = ${P} ÷ ${PP} = ${b3i(pppp, 1, L)}×.`
  ];
  return b3mk(rng, q, vals, ex, st);
}

/* ================= hari-27 ================= */
/* h27:0 — hook 1 menit: satu kalimat urgensi, bukan profil perusahaan */
function b3h270(rng, ref, L){
  const en = L === "en";
  const nm = en ? b3pick(rng, ["a regional bank", "a consumer-goods maker", "a telecom operator"]) : b3pick(rng, ["bank daerah", "produsen barang konsumsi", "operator telekomunikasi"]);
  const d = b3pick(rng, [20, 25, 30]);
  const why = en ? b3pick(rng, ["the market misread its NPLs", "cash is piling up unused", "a new segment is growing twice as fast as the core"]) : b3pick(rng, ["pasar salah baca NPL-nya", "kas menumpuk tak terpakai", "segmen baru tumbuh 2× lebih cepat dari bisnis inti"]);
  if (en) return b3txt(rng,
    `A good 1-minute hook contains… (Thesis: ${nm} is discounted ${d}% because ${why}.)`,
    ["One sentence on why this company deserves attention RIGHT NOW",
     "Company profile: founded in, headcount…",
     "Disclaimer and table of contents",
     "The presenter's biography"], 0,
    `Hook = one sentence of urgency ('this bank is discounted ${d}% because ${why}'). A company profile = information, not a hook — the audience can read it themselves. (${ref})`,
    ["Analysis: a hook must earn the next 9 minutes — what does that in 60 seconds?",
     "Solve 1: urgency = a mispricing + a reason, stated in one sentence.",
     "Solve 2: founding year and headcount are facts the audience can read.",
     "Solve 3: the audience decides in the first 90 seconds — spend them on 'why now'."]);
  return b3txt(rng,
    `Hook 1 menit yang baik berisi… (Thesis: ${nm} didiskon ${d}% karena ${why}.)`,
    ["Satu kalimat kenapa perusahaan ini layak diperhatikan SEKARANG",
     "Profil perusahaan: berdiri tahun, jumlah karyawan…",
     "Disclaimer dan daftar isi",
     "Biodata presenter"], 0,
    `Hook = satu kalimat urgensi ('bank ini didiskon ${d}% karena ${why}'). Profil perusahaan = informasi, bukan kail — audiens bisa baca sendiri. (${ref})`,
    ["Analysis: hook harus memenangkan 9 menit berikutnya — apa yang bisa dalam 60 detik?",
     "Solve 1: urgensi = mispricing + alasan, dalam satu kalimat.",
     "Solve 2: tahun berdiri dan jumlah karyawan adalah fakta yang bisa dibaca audiens.",
     "Solve 3: audiens memutuskan dalam 90 detik pertama — pakai untuk 'kenapa sekarang'."]);
}
/* h27:1 — blok model & asumsi: driver + 2–3 asumsi penggerak valuasi */
function b3h271(rng, ref, L){
  const en = L === "en";
  const drv = en ? b3pick(rng, ["growth, WACC, and the exit multiple", "NIM, cost of credit, and the P/BV multiple", "volume, price, and the terminal growth rate"]) : b3pick(rng, ["growth, WACC, dan exit multiple", "NIM, cost of credit, dan multiple P/BV", "volume, harga, dan growth terminal"]);
  if (en) return b3txt(rng,
    `The 3-minute 'model & key assumptions' block should…`,
    ["Read every line of the model from top to bottom",
     "Explain the WACC formula from CAPM",
     "Show a full screenshot of the spreadsheet",
     `Drivers + the 2–3 assumptions that move valuation most (${drv})`], 3,
    `Three minutes is enough for: 'this value is driven by three things — ${drv}; here is the basis for each number.' Reading rows aloud = presenting for the printer, not for humans. (${ref})`,
    ["Analysis: 10 minutes = 1 idea per 2 minutes. What survives in memory?",
     "Solve 1: the audience remembers structure, not rows.",
     "Solve 2: name the drivers and the 2–3 assumptions that move the value.",
     "Solve 3: the full model is in the appendix — the talk is the argument, not the spreadsheet."]);
  return b3txt(rng,
    `Blok 3 menit 'model & asumsi kunci' seharusnya…`,
    ["Membacakan semua baris model dari atas ke bawah",
     "Menjelaskan rumus WACC dari CAPM",
     "Menampilkan screenshot spreadsheet penuh",
     `Driver + 2–3 asumsi yang paling menggerakkan valuasi (${drv})`], 3,
    `Tiga menit cukup untuk: 'nilai ini digerakkan tiga hal — ${drv}; begini dasar tiap angkanya.' Membacakan baris = presentasi untuk printer, bukan manusia. (${ref})`,
    ["Analysis: 10 menit = 1 ide per 2 menit. Apa yang bertahan di ingatan?",
     "Solve 1: audiens ingat struktur, bukan baris.",
     "Solve 2: sebutkan driver dan 2–3 asumsi yang menggerakkan nilai.",
     "Solve 3: model lengkap ada di lampiran — presentasi adalah argumen, bukan spreadsheet."]);
}
/* h27:2 — jawaban 'apa yang membunuh thesis-mu?': skenario spesifik + angka */
function b3h272(rng, ref, L){
  const en = L === "en";
  const g1 = b3pick(rng, [3, 4, 5]), g2 = b3pick(rng, [7, 8, 9]);
  const drop = b3pick(rng, [20, 25, 30]);
  if (en) return b3txt(rng,
    `Best answer to 'what kills your thesis?'`,
    ["'Nothing — my model is solid'",
     "'Risk is always present in every investment'",
     `'Growth ${g1}% instead of ${g2}% → target down ${drop}%; that is my bear case'`,
     "'I have not thought about it'"], 2,
    `'Nothing' = not credible; 'risk always exists' = empty. A strong answer: a specific scenario + its numeric impact + where it is already accommodated (the bear case). Attacking your own thesis first leaves the opponent out of ammunition. (${ref})`,
    ["Analysis: credibility = the courage to name your own weakness — with numbers.",
     `Solve 1: pick the assumption that matters most — growth ${g2}% in the base case.`,
     `Solve 2: quantify the kill: growth ${g1}% → target down ${drop}%.`,
     "Solve 3: show it is already in the bear case — the risk is priced into the range, not hidden."]);
  return b3txt(rng,
    `Jawaban terbaik untuk 'apa yang membunuh thesis-mu?'`,
    ["'Tidak ada — model saya solid'",
     "'Risiko selalu ada di setiap investasi'",
     `'Growth ${g1}% bukan ${g2}% → target turun ${drop}%; itu bear case saya'`,
     "'Saya belum memikirkannya'"], 2,
    `'Tidak ada' = tidak kredibel; 'risiko selalu ada' = kosong. Jawaban kuat: skenario spesifik + dampak angkanya + di mana ia sudah diakomodasi (bear case). Menyerang thesis sendiri duluan = lawan kehabisan amunisi. (${ref})`,
    ["Analysis: kredibilitas = keberanian menyebut kelemahan sendiri — dengan angka.",
     `Solve 1: pilih asumsi yang paling penting — growth ${g2}% di base case.`,
     `Solve 2: kuantifikasi pembunuhnya: growth ${g1}% → target turun ${drop}%.`,
     "Solve 3: tunjukkan ia sudah ada di bear case — risikonya masuk ke rentang, bukan disembunyikan."]);
}
/* h27:3 — angka dibulatkan saat lisan: presisi milik slide, bukan mulut */
function b3h273(rng, ref, L){
  const en = L === "en";
  const A = b3pick(rng, [95, 120, 250]);
  const full = en ? `${A},830,000,000` : `${A}.830.000.000`;
  if (en) return b3txt(rng,
    `Why round numbers when presenting out loud?`,
    ["To look smarter",
     `'Around ${A} billion' is remembered as a direction; '${full}' is remembered as noise — precision belongs to the slide, not the mouth`,
     "Because exact numbers do not matter",
     "To make the presentation shorter"], 1,
    `The audience stores direction and order of magnitude, not decimals. Reciting 12 digits makes them busy taking notes instead of listening. Full precision still exists — on the slide and in the model, not in the mouth. (${ref})`,
    ["Analysis: spoken numbers compete with listening — what can memory hold?",
     `Solve 1: 'around ${A} billion' = one idea: the size.`,
     `Solve 2: '${full}' = twelve digits of noise nobody will retain.`,
     "Solve 3: keep precision where it belongs — slides and model; the voice carries direction."]);
  return b3txt(rng,
    `Kenapa angka dibulatkan saat presentasi lisan?`,
    ["Agar terlihat pintar",
     `'Sekitar ${A} miliar' diingat sebagai arah; '${full}' diingat sebagai derau — presisi milik slide, bukan mulut`,
     "Karena angka pasti tidak penting",
     "Agar presentasi lebih pendek"], 1,
    `Audiens menyimpan arah dan orde besaran, bukan desimal. Menyebut 12 digit membuat mereka sibuk mencatat, bukan mendengar. Presisi penuh tetap ada — di slide dan model, bukan di mulut. (${ref})`,
    ["Analysis: angka yang diucapkan bersaing dengan mendengarkan — apa yang bisa ditahan memori?",
     `Solve 1: 'sekitar ${A} miliar' = satu ide: besarannya.`,
     `Solve 2: '${full}' = dua belas digit derau yang takkan diingat siapa pun.`,
     "Solve 3: simpan presisi di tempatnya — slide dan model; suara membawa arah."]);
}
/* h27:4 — 'kenapa WACC-mu X%?': komponen + sensitivitas */
function b3h274(rng, ref, L){
  const en = L === "en";
  const w = b3pick(rng, [10, 11, 12, 13]), sh = b3pick(rng, [8, 10, 12, 15]);
  if (en) return b3txt(rng,
    `Framework for answering 'why is your WACC ${w}%?'`,
    ["'That is the industry standard'",
     "'From Bloomberg'",
     `Name the components (ke, kd, weights) + sensitivity: '±1 point moves the target ${sh}%'`,
     "'My lecturer said so'"], 2,
    `Components + sensitivity prove two things: you know where the number comes from AND how fragile it is. 'Industry standard' = admitting you do not know, politely. (${ref})`,
    ["Analysis: the real question is 'how well do you understand your own number?'",
     `Solve 1: state the components — cost of equity, cost of debt, weights — that build ${w}%.`,
     `Solve 2: add the sensitivity — ±1 point moves the target ${sh}%.`,
     "Solve 3: now the questioner knows both the source and the fragility."]);
  return b3txt(rng,
    `Kerangka menjawab 'kenapa WACC-mu ${w}%?'`,
    ["'Itu standar industri'",
     "'Dari Bloomberg'",
     `Sebut komponen (ke, kd, bobot) + sensitivitas: '±1 poin menggeser target ${sh}%'`,
     "'Kata dosen saya'"], 2,
    `Komponen + sensitivitas membuktikan dua hal: kamu tahu asal angka DAN tahu seberapa rapuh ia. 'Standar industri' = mengaku tidak tahu dengan sopan. (${ref})`,
    ["Analysis: yang ditanya sebenarnya: 'seberapa paham kamu dengan angkamu sendiri?'",
     `Solve 1: sebutkan komponen — cost of equity, cost of debt, bobot — yang membangun ${w}%.`,
     `Solve 2: tambahkan sensitivitas — ±1 poin menggeser target ${sh}%.`,
     "Solve 3: kini penanya tahu sumbernya DAN kerapuhannya."]);
}
/* h27:5 — kesalahan delivery paling merusak: terburu-buru mengejar 10 menit */
function b3h275(rng, ref, L){
  const en = L === "en";
  if (en) return b3txt(rng,
    `Most damaging delivery mistake in a 10-minute presentation?`,
    ["Rushing to fit 10 minutes — every block fails: hook lost, no time for Q&A",
     "Too few slides",
     "Smiling too much",
     "Standing too straight"], 0,
    `Rushing sacrifices all blocks at once: the hook is skipped, assumptions are read fast, the buffer is gone. One speed mistake damages six blocks. That is why the delivery checklist puts pace first. (${ref})`,
    ["Analysis: 10 minutes = 6 blocks. What happens when block 2 overruns by 3 minutes?",
     "Solve 1: every later block is compressed or cut — hook, assumptions, conclusion, buffer.",
     "Solve 2: the Q&A — where the thesis is actually tested — never happens.",
     "Solve 3: pace is the foundation; fix the speed and the blocks survive."]);
  return b3txt(rng,
    `Kesalahan delivery paling merusak presentasi 10 menit?`,
    ["Terburu-buru mengejar 10 menit — semua blok gagal: hook hilang, Q&A tak sempat",
     "Slide terlalu sedikit",
     "Terlalu banyak senyum",
     "Berdiri terlalu tegak"], 0,
    `Terburu-buru = semua blok dikorbankan sekaligus: hook terlewat, asumsi dibaca cepat, buffer habis. Satu kesalahan kecepatan merusak enam blok. Itu sebabnya checklist delivery menaruh kecepatan di urutan pertama. (${ref})`,
    ["Analysis: 10 menit = 6 blok. Apa yang terjadi bila blok 2 molor 3 menit?",
     "Solve 1: tiap blok sesudahnya terkompresi atau terpotong — hook, asumsi, kesimpulan, buffer.",
     "Solve 2: Q&A — tempat thesis benar-benar diuji — tidak pernah terjadi.",
     "Solve 3: kecepatan adalah fondasi; perbaiki kecepatan dan blok-blok selamat."]);
}
/* h27:6 — buffer 1 menit: napas + buka Q&A, bukan materi baru */
function b3h276(rng, ref, L){
  const en = L === "en";
  if (en) return b3txt(rng,
    `What is the last 1-minute buffer for?`,
    ["Backup material in case time remains",
     "A breath + opening the Q&A — not new material",
     "Repeating the conclusion 3×",
     "The presenter asking the audience questions"], 1,
    `Buffer = a breath + the sentence that opens Q&A ('I have shown the three biggest risks — attack away'). New material in minute 9 = an idea that never gets defended. (${ref})`,
    ["Analysis: a buffer is reserve capacity, not a material slot.",
     "Solve 1: new material needs defence time — minute 9 has none.",
     "Solve 2: the breath resets pace before the hardest part: questions.",
     "Solve 3: the best Q&A opener names the risks first — then invites attack."]);
  return b3txt(rng,
    `Fungsi buffer 1 menit terakhir?`,
    ["Materi cadangan kalau waktu tersisa",
     "Napas + buka Q&A — bukan materi baru",
     "Kesimpulan yang diulang 3×",
     "Presenter bertanya ke audiens"], 1,
    `Buffer = napas + kalimat pembuka Q&A ('tiga risiko terbesar sudah saya tunjukkan — silakan serang'). Materi baru di menit 9 = ide yang tak sempat dibela. (${ref})`,
    ["Analysis: buffer adalah cadangan, bukan slot materi.",
     "Solve 1: materi baru butuh waktu pembelaan — menit 9 tidak punya.",
     "Solve 2: napas mereset kecepatan sebelum bagian tersulit: pertanyaan.",
     "Solve 3: pembuka Q&A terbaik menyebut risikonya dulu — lalu mengundang serangan."]);
}
/* h27:7 — rubrik: total ≥12 DAN tanpa aspek bernilai 1 */
function b3h277(rng, ref, L){
  const en = L === "en";
  const comp = b3pick(rng, [[1, 4, 4, 3], [4, 1, 4, 3], [4, 4, 1, 3], [4, 4, 3, 1]]);
  const cs = `(${comp.join(", ")})`;
  if (en) return b3txt(rng,
    `Rubric total 16. When do you pass? (Example composition ${cs} = total 12.)`,
    ["Total ≥12 — enough",
     "Every aspect = 4",
     "Total ≥12 AND no aspect scored 1",
     "Total ≥8"], 2,
    `Total 12 with composition ${cs} = Q&A destroyed but 'passed' — yet Q&A is where the thesis is tested. The 'no score of 1' rule stops an average from hiding a structural hole. (${ref})`,
    ["Analysis: an average can hide a hole — check the composition, not just the total.",
    `Solve 1: ${cs} sums to 12 — it clears the total bar.`,
    "Solve 2: but one aspect scored 1 means one whole pillar collapsed.",
    "Solve 3: the pass rule needs BOTH bars — total ≥12 AND no 1s."]);
  return b3txt(rng,
    `Rubrik total 16. Lolos bila… (Contoh komposisi ${cs} = total 12.)`,
    ["Total ≥12 — cukup",
     "Semua aspek = 4",
     "Total ≥12 DAN tidak ada aspek bernilai 1",
     "Total ≥8"], 2,
    `Total 12 dengan komposisi ${cs} = Q&A hancur tapi 'lolos' — padahal Q&A tempat thesis diuji. Aturan 'tanpa skor 1' mencegah rata-rata menyembunyikan lubang struktural. (${ref})`,
    ["Analysis: rata-rata bisa menyembunyikan lubang — cek komposisinya, bukan hanya totalnya.",
    `Solve 1: ${cs} berjumlah 12 — lolos ambang total.`,
     "Solve 2: tapi satu aspek bernilai 1 berarti satu pilar utuh runtuh.",
     "Solve 3: aturan lolos butuh KEDUA ambang — total ≥12 DAN tanpa skor 1."]);
}
/* h27:8 — teaser: 1–2 halaman, anonim, untuk calon pembeli luas */
function b3h278(rng, ref, L){
  const en = L === "en";
  if (en) return b3txt(rng,
    `A 1–2 page anonymous document for a wide pool of prospective buyers — what is it called?`,
    ["Teaser",
     "CIM",
     "Pitchbook",
     "SPA"], 0,
    `Teaser: an anonymous profile without the company name. The CIM (30–80 pages) only goes to buyers who have signed an NDA. (${ref})`,
    ["Analysis: match the document to its audience and its secrecy level.",
     "Solve 1: wide pool + anonymous = the document must hide the name.",
     "Solve 2: the CIM is the thick detailed book — it needs an NDA first.",
     "Solve 3: pitchbook is for clients/committees; SPA is the sale agreement."]);
  return b3txt(rng,
    `Dokumen 1–2 halaman, anonim, untuk calon pembeli luas — apa namanya?`,
    ["Teaser",
     "CIM",
     "Pitchbook",
     "SPA"], 0,
    `Teaser: profil anonim tanpa nama perusahaan. CIM (30–80 hal) hanya untuk pembeli yang sudah tanda tangan NDA. (${ref})`,
    ["Analysis: cocokkan dokumen dengan audiens dan tingkat kerahasiaannya.",
     "Solve 1: pembeli luas + anonim = dokumen harus menyembunyikan nama.",
     "Solve 2: CIM adalah buku tebal yang detail — butuh NDA dulu.",
     "Solve 3: pitchbook untuk klien/komite; SPA adalah perjanjian jual-beli."]);
}
/* h27:9 — CIM dibagikan setelah NDA, minggu 3–6 */
function b3h279(rng, ref, L){
  const en = L === "en";
  if (en) return b3txt(rng,
    `In a sell-side auction, when is the CIM shared?`,
    ["After the buyer signs an NDA (weeks 3–6)",
     "Together with the teaser in week 1",
     "After signing",
     "Never — the CIM is internal only"], 0,
    `The CIM is shared in weeks 3–6, only with buyers who have signed an NDA. The anonymous teaser goes out first (weeks 1–2). (${ref})`,
    ["Analysis: information is leverage — it is released in stages.",
     "Solve 1: the teaser (anonymous) goes wide in weeks 1–2.",
     "Solve 2: interested buyers sign an NDA — only then do they earn the detail.",
     "Solve 3: the CIM (weeks 3–6) rewards the NDA; sharing it in week 1 gives the leverage away."]);
  return b3txt(rng,
    `Dalam sell-side auction, kapan CIM dibagikan?`,
    ["Setelah pembeli tanda tangan NDA (minggu 3–6)",
     "Bersamaan dengan teaser minggu 1",
     "Setelah signing",
     "Tidak pernah — CIM hanya internal"], 0,
    `CIM dibagikan minggu 3–6, hanya ke pembeli yang sudah tanda tangan NDA. Teaser anonim keluar lebih dulu (minggu 1–2). (${ref})`,
    ["Analysis: informasi = leverage — ia dilepas bertahap.",
     "Solve 1: teaser (anonim) disebar luas di minggu 1–2.",
     "Solve 2: pembeli yang berminat tanda tangan NDA — baru mereka berhak atas detailnya.",
     "Solve 3: CIM (minggu 3–6) adalah hadiah untuk NDA; membagikannya di minggu 1 sama dengan memberikan leverage."]);
}

/* ================= hari-29 ================= */
/* h29:0 — anggaran per soal = total menit ÷ jumlah soal */
function b3h290(rng, ref, L){
  const en = L === "en";
  const pair = b3pick(rng, [[180, 50], [150, 50], [240, 60], [200, 50], [120, 40], [180, 60]]);
  const T = pair[0], N = pair[1];
  const b = Math.floor((T / N) * 2) / 2;
  const vals = [
    `±${b3n(b, L)} ${en ? "minutes — " : "menit — "}${T} ÷ ${N}`,
    `±${b3n(b + 1.5, L)} ${en ? "minutes — the rest as reserve" : "menit — sisanya cadangan"}`,
    `±${b3n(b + 2, L)} ${en ? "minutes — the rest for checking" : "menit — sisanya untuk cek"}`,
    en ? "Free — what matters is finishing" : "Bebas, yang penting selesai"
  ];
  const q = en
    ? `Exam ${T} minutes, ${N} questions. Time budget per question?`
    : `Exam ${T} menit, ${N} soal. Anggaran per soal?`;
  const ex = en
    ? `${b3n(T / N, L)} minutes — rounded to ${b3n(b, L)}. This is a budget, not a target: easy questions under 2 minutes bank reserve for the hard ones. Without a budget, 1 hard question eats 3 easy ones. (${ref})`
    : `${b3n(T / N, L)} menit — dibulatkan ${b3n(b, L)}. Ini anggaran, bukan target: soal mudah <2 menit memberi cadangan untuk yang sulit. Tanpa anggaran, 1 soal sulit memakan 3 soal mudah. (${ref})`;
  const st = en ? [
    "Analysis: a budget is total time divided by question count — compute it before starting.",
    `Solve 1: ${T} ÷ ${N} = ${b3n(T / N, L)} minutes per question.`,
    `Solve 2: round to a usable budget → ±${b3n(b, L)} minutes.`,
    "Solve 3: the budget is a ceiling per question, not a target to fill."
  ] : [
    "Analysis: anggaran adalah total waktu dibagi jumlah soal — hitung sebelum mulai.",
    `Solve 1: ${T} ÷ ${N} = ${b3n(T / N, L)} menit per soal.`,
    `Solve 2: bulatkan ke anggaran yang bisa dipakai → ±${b3n(b, L)} menit.`,
    "Solve 3: anggaran adalah batas per soal, bukan target yang harus dihabiskan."
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h29:1 — pass 1: soal 8 menit → tandai, lanjut, kembali di pass 2 */
function b3h291(rng, ref, L){
  const en = L === "en";
  const mins = b3pick(rng, [7, 8, 10]);
  const ratio = mins / 3.5;
  if (en) return b3txt(rng,
    `Pass 1: a question looks like it needs ${mins} minutes. What do you do?`,
    ["Work it to the end — a shame to abandon it halfway",
     "Guess quickly so nothing is blank",
     "Mark it, move on — come back in pass 2",
     "Skip it permanently"], 2,
    `Mark it, move on. ${mins} minutes = ${b3n(ratio, L)} question-budgets sacrificed for 1 point. In pass 2 you return with safe time left — and the answer often appears after the brain has 'rested' from that question. (${ref})`,
    ["Analysis: compare the cost of this question with the budget it consumes.",
     `Solve 1: one question-budget is ~3,5 minutes; ${mins} minutes ≈ ${b3n(ratio, L)} budgets.`,
     "Solve 2: ego says 'a little more'; the budget says those minutes are 2 easy questions.",
     "Solve 3: pass 2 returns with fresh eyes — and a safe clock."]);
  return b3txt(rng,
    `Pass 1: soal terasa butuh ${mins} menit. Tindakan?`,
    ["Kerjakan sampai dapat — sayang sudah setengah jalan",
     "Tebak cepat agar tidak kosong",
     "Tandai, lanjut — kembali di pass 2",
     "Lewati permanen"], 2,
    `Tandai, lanjut. ${mins} menit = ${b3n(ratio, L)} anggaran soal dikorbankan untuk 1 poin. Di pass 2 kamu kembali dengan sisa waktu yang aman — dan sering kali jawabannya muncul setelah otak 'istirahat' dari soal itu. (${ref})`,
    ["Analysis: bandingkan biaya soal ini dengan anggaran yang dihabiskannya.",
     `Solve 1: satu anggaran soal ≈ 3,5 menit; ${mins} menit ≈ ${b3n(ratio, L)} anggaran.`,
     "Solve 2: ego berkata 'sedikit lagi'; anggaran berkata menit itu adalah 2 soal mudah.",
     "Solve 3: pass 2 kembali dengan mata segar — dan jam yang aman."]);
}
/* h29:2 — jebakan negasi: lingkari kata 'BUKAN' dulu */
function b3h292(rng, ref, L){
  const en = L === "en";
  const topic = en ? b3pick(rng, ["budget", "forecast"]) : b3pick(rng, ["budget", "forecast"]);
  if (en) return b3txt(rng,
    `Question: 'which is NOT a characteristic of a ${topic}?' Strategy?`,
    [`Read the word 'NOT' first — circle it — then eliminate the options that ARE characteristics of a ${topic}`,
     "Read the options first, then the question",
     "Pick the longest one",
     "Pick 'all are correct'"], 0,
    `Circle the negation BEFORE reading the options. At minute 150+, a tired brain turns 'not' into 'is' — 1 second of circling saves 1 point. (${ref})`,
    ["Analysis: the trap is one word — it flips the whole question.",
     "Solve 1: find the negation ('NOT') before any option can anchor you.",
     "Solve 2: circle it — the physical mark survives tired eyes.",
     "Solve 3: now eliminate what IS a characteristic; what remains is the answer."]);
  return b3txt(rng,
    `Soal: 'manakah yang BUKAN ciri ${topic}?' Strategi?`,
    [`Baca kata 'BUKAN' dulu — lingkari — lalu eliminasi opsi yang merupakan ciri ${topic}`,
     "Baca opsi dulu, baru soal",
     "Pilih yang paling panjang",
     "Pilih 'semua benar'"], 0,
    `Lingkari kata negasi SEBELUM membaca opsi. Di menit 150+, otak lelah mengubah 'bukan' jadi 'adalah' — 1 detik melingkari menyelamatkan 1 poin. (${ref})`,
    ["Analysis: jebakannya satu kata — ia membalik seluruh soal.",
     "Solve 1: temukan negasi ('BUKAN') sebelum opsi mana pun menancap.",
     "Solve 2: lingkari — tanda fisik itu bertahan melewati mata lelah.",
     "Solve 3: kini eliminasi yang MERUPAKAN ciri; yang tersisa adalah jawabannya."]);
}
/* h29:3 — jebakan satuan: samakan satuan dulu, baru DSO */
function b3h293(rng, ref, L){
  const en = L === "en";
  const R = b3pick(rng, [36, 54, 72, 90]), dso = b3pick(rng, [30, 40, 50, 60]);
  const rev = R * 1000000;
  const ARk = dso * (rev / 360) / 1000;
  const wrong = dso / 1000;
  const vals = [
    `${b3n(dso, L)} ${en ? "days — align units first: receivables = " : "hari — samakan satuan dulu: piutang = "}${b3i(ARk, L)} ${en ? "thousand = " : "ribu = "}${b3i(ARk * 1000, L)}`,
    `${b3n(wrong, L)} ${en ? "days — units not aligned" : "hari — satuan tidak disamakan"}`,
    `${b3n(dso / 10, L)} ${en ? "days — decimal slipped" : "hari — koma meleset"}`,
    `${b3i(dso * 10, L)} ${en ? "days — revenue not converted" : "hari — revenue tidak dikonversi"}`
  ];
  const q = en
    ? `Data: revenue Rp${b3i(rev, L)} (in Rp), receivables Rp${b3i(ARk, L)} (in Rp thousand). DSO?`
    : `Data: revenue Rp${b3i(rev, L)} (dalam Rp), piutang Rp${b3i(ARk, L)} (dalam Rp ribu). DSO?`;
  const ex = en
    ? `Receivables ${b3i(ARk, L)} thousand = ${b3i(ARk * 1000, L)}; revenue ${b3i(rev, L)} → daily ${b3i(rev / 360, L)} → DSO ${dso} days. Without converting = ${b3n(wrong, L)} days — an answer 'computed right, read wrong'. Write the conversion on scratch paper BEFORE calculating. (${ref})`
    : `Piutang ${b3i(ARk, L)} ribu = ${b3i(ARk * 1000, L)}; revenue ${b3i(rev, L)} → harian ${b3i(rev / 360, L)} → DSO ${dso} hari. Tanpa konversi = ${b3n(wrong, L)} hari — jawaban yang 'dihitung benar, dibaca salah'. Tulis konversi di coretan SEBELUM menghitung. (${ref})`;
  const st = en ? [
    "Analysis: the trap is units — Rp vs Rp thousand differ by 1,000×.",
    `Solve 1: convert receivables: ${ARk} thousand × 1,000 = ${ARk * 1000}.`,
    `Solve 2: daily revenue = ${rev} ÷ 360 = ${rev / 360}.`,
    `Solve 3: DSO = ${ARk * 1000} ÷ ${rev / 360} = ${dso} days.`
  ] : [
    "Analysis: jebakannya satuan — Rp vs Rp ribu beda 1.000×.",
    `Solve 1: konversi piutang: ${ARk} ribu × 1.000 = ${ARk * 1000}.`,
    `Solve 2: revenue harian = ${rev} ÷ 360 = ${rev / 360}.`,
    `Solve 3: DSO = ${ARk * 1000} ÷ ${rev / 360} = ${dso} hari.`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h29:4 — 'semua jawaban benar' = 4 klaim; cari SATU yang salah */
function b3h294(rng, ref, L){
  const en = L === "en";
  if (en) return b3txt(rng,
    `Option: 'all answers are correct'. How do you check it?`,
    ["Pick it immediately — it is usually right",
     "Never pick it",
     "Verify each option one by one; one wrong option kills this whole option",
     "Pick the shortest one"], 2,
    `'All correct' is 4 claims that must each be verified. One wrong option = the whole option is eliminated. Fastest way: find ONE clearly wrong option — found it = eliminated. (${ref})`,
    ["Analysis: 'all correct' is not one claim — it is four claims bundled together.",
     "Solve 1: test option A — true or false?",
     "Solve 2: test B, C, D the same way — one false is enough.",
     "Solve 3: the shortcut is hunting for a single false option, not proving all four true."]);
  return b3txt(rng,
    `Opsi: 'semua jawaban benar'. Cara cek?`,
    ["Langsung pilih — biasanya benar",
     "Jangan pernah pilih",
     "Verifikasi tiap opsi satu per satu; satu opsi salah = opsi ini gugur",
     "Pilih yang paling pendek"], 2,
    `'Semua benar' adalah 4 klaim yang harus diverifikasi satu per satu. Satu opsi yang salah = seluruh opsi gugur. Cara cepat: cari SATU opsi yang jelas salah — ketemu = eliminasi. (${ref})`,
    ["Analysis: 'semua benar' bukan satu klaim — ia empat klaim yang dibundel.",
     "Solve 1: uji opsi A — benar atau salah?",
     "Solve 2: uji B, C, D dengan cara sama — satu yang salah sudah cukup.",
     "Solve 3: jalan pintasnya berburu satu opsi yang salah, bukan membuktikan keempatnya benar."]);
}
/* h29:5 — opsi kembar beda digit: hitung ulang penuh dari rumus */
function b3h295(rng, ref, L){
  const en = L === "en";
  const PMT = b3pick(rng, [800, 1000, 1200]), n = b3pick(rng, [4, 5]);
  const r = b3pick(rng, [8, 10]);
  const factor = (1 - Math.pow(1 + r / 100, -n)) / (r / 100);
  const pv = Math.round(PMT * factor);
  const twin = parseInt(b3twin(String(pv)), 10);
  const u = en ? "k" : "rb";
  const vals = [
    en ? `Recompute fully from the formula — then pick Rp${b3i(pv, L)}${u}` : `Hitung ulang penuh dari rumus — lalu pilih Rp${b3i(pv, L)}${u}`,
    en ? `Pick Rp${b3i(pv, L)}${u} — 'looks right'` : `Pilih Rp${b3i(pv, L)}${u} — 'kayaknya benar'`,
    en ? `Pick Rp${b3i(twin, L)}${u} — the different one is usually right` : `Pilih Rp${b3i(twin, L)}${u} — yang beda biasanya benar`,
    en ? "Guess" : "Tebak"
  ];
  const q = en
    ? `Options: ${b3i(pv, L)} vs ${b3i(twin, L)}. You computed ${b3i(pv, L)} (PV of Rp${b3i(PMT, L)}k/year for ${n} years at ${r}%). What do you do?`
    : `Opsi: ${b3i(pv, L)} vs ${b3i(twin, L)}. Kamu menghitung ${b3i(pv, L)} (PV sewa Rp${b3i(PMT, L)}rb/tahun ${n} tahun, ${r}%). Tindakan?`;
  const ex = en
    ? `Recompute fully from the formula — twin options differing by one digit are designed to catch a transposition slip (${b3i(pv, L)} vs ${b3i(twin, L)}). 60 seconds of verification is cheaper than 1 point lost to 'looks right'. (${ref})`
    : `Hitung ulang penuh dari rumus — opsi kembar beda digit dirancang menangkap slip transposisi (${b3i(pv, L)} vs ${b3i(twin, L)}). 60 detik verifikasi lebih murah dari 1 poin yang hilang karena 'kayaknya'. (${ref})`;
  const st = en ? [
    "Analysis: twin options mean the question is testing verification, not arithmetic.",
    `Solve 1: recompute the factor: [1 − (1+${r}%)^−${n}] ÷ ${r}% = ${b3i(factor, 5, L)}.`,
    `Solve 2: PV = ${PMT} × ${b3i(factor, 5, L)} = Rp${b3i(pv, L)}k.`,
    `Solve 3: the twin ${b3i(twin, L)} differs only by swapped digits — trust the recomputation, not the feeling.`
  ] : [
    "Analysis: opsi kembar berarti soal menguji verifikasi, bukan aritmetika.",
    `Solve 1: hitung ulang faktornya: [1 − (1+${r}%)^−${n}] ÷ ${r}% = ${b3i(factor, 5, L)}.`,
    `Solve 2: PV = ${PMT} × ${b3i(factor, 5, L)} = Rp${b3i(pv, L)}rb.`,
    `Solve 3: kembaran ${b3i(twin, L)} hanya beda digit yang tertukar — percayai hitung ulang, bukan perasaan.`
  ];
  return b3mk(rng, q, vals, ex, st);
}
/* h29:6 — sisa waktu sedikit, soal kosong: isi SEMUA dengan tebakan cerdas */
function b3h296(rng, ref, L){
  const en = L === "en";
  const mins = b3pick(rng, [10, 15, 20]), blank = b3pick(rng, [8, 10, 12]);
  const exp = Math.round(blank / 3);
  if (en) return b3txt(rng,
    `${mins} minutes left, ${blank} questions still blank. What do you do?`,
    [`Focus on finishing 3 correctly, leave the rest blank`,
     `Fill in ALL of them — blank = a certain 0; smart guessing after eliminating options gives ${exp} points`,
     "Panic and click randomly",
     "Ask for extra time"], 1,
    `Blank = a certain 0. Smart guessing (eliminate 1–2 options first) = 33–50% per question. ${blank} questions × 33% ≈ ${exp} free points — it can be the difference between passing and failing. (${ref})`,
    ["Analysis: compare the expected value of blank vs a guess.",
     "Solve 1: blank = 0% chance, always.",
     `Solve 2: eliminate 1 option first → 33% per question; ${blank} × 33% ≈ ${exp} points expected.`,
     "Solve 3: guessing is not panic — it is the highest-value use of the last minutes."]);
  return b3txt(rng,
    `Sisa ${mins} menit, ${blank} soal masih kosong. Tindakan?`,
    ["Fokus selesaikan 3 dengan benar, sisanya kosong",
     `Isi SEMUA — kosong = 0 pasti; tebak cerdas via eliminasi tiap soal memberi ≈${exp} poin`,
     "Panik dan asal klik",
     "Minta tambah waktu"], 1,
    `Kosong = 0 pasti. Tebakan cerdas (eliminasi 1–2 opsi dulu) = 33–50% peluang per soal. ${blank} soal × 33% ≈ ${exp} poin gratis — bisa jadi selisih lulus. (${ref})`,
    ["Analysis: bandingkan nilai harapan kosong vs tebakan.",
     "Solve 1: kosong = peluang 0%, selalu.",
     `Solve 2: eliminasi 1 opsi dulu → 33% per soal; ${blank} × 33% ≈ ${exp} poin harapan.`,
     "Solve 3: menebak bukan panik — itu penggunaan menit terakhir dengan nilai tertinggi."]);
}
/* h29:7 — cheatsheet ditulis 10 menit pertama, dari ingatan */
function b3h297(rng, ref, L){
  const en = L === "en";
  const nf = b3pick(rng, [8, 10, 12]);
  if (en) return b3txt(rng,
    `When do you write the cheatsheet on scratch paper?`,
    ["No need — memorise it in your head",
     "At minute 100, when you forget a formula",
     "After the exam ends",
     `In the first 10 minutes, from memory, before touching any question (${nf} formulas)`], 3,
    `Minutes 0–10: the brain is fresh — writing ${nf} formulas from memory = an external memory for the next 170 minutes. Waiting until you forget = the formula is already gone when you need it most. (${ref})`,
    ["Analysis: the cheatsheet is insurance — buy it while the brain is fresh.",
     "Solve 1: minute 0–10, the mind is calm and recall is at its best.",
     "Solve 2: writing from memory also warms up recall for the whole exam.",
     "Solve 3: at minute 100 the stressed brain cannot retrieve what it never wrote down."]);
  return b3txt(rng,
    `Kapan menulis cheatsheet di kertas coret?`,
    ["Tidak perlu — hafal di kepala cukup",
     "Menit 100, saat lupa rumus",
     "Setelah exam selesai",
     `10 menit pertama, dari ingatan, sebelum menyentuh soal (${nf} rumus)`], 3,
    `Menit 0–10: otak segar, tulis ${nf} rumus dari ingatan = memori eksternal untuk 170 menit berikutnya. Menunggu sampai lupa = rumusnya sudah hilang saat paling dibutuhkan. (${ref})`,
    ["Analysis: cheatsheet adalah asuransi — beli selagi otak segar.",
     "Solve 1: menit 0–10, pikiran tenang dan recall sedang terbaik.",
     "Solve 2: menulis dari ingatan sekaligus memanaskan recall untuk seluruh exam.",
     "Solve 3: di menit 100 otak yang stres tidak bisa mengambil apa yang tak pernah ditulis."]);
}
/* h29:8 — H-1: tidur 8 jam mengalahkan begadang */
function b3h298(rng, ref, L){
  const en = L === "en";
  const extra = b3pick(rng, [2, 3, 4]), dmg = b3pick(rng, [20, 25, 30]);
  const sleep = b3pick(rng, [7, 8]);
  if (en) return b3txt(rng,
    `H-1: stay up ${extra} extra hours vs sleep ${sleep} hours. Choose?`,
    [`Stay up — ${extra} hours of memorising beats sleep`,
     "Stay up + 3 cups of coffee",
     `Sleep ${sleep} hours — staying up damages recall ${dmg}%; panicked memorising never enters long-term memory`,
     "Do not sleep at all"], 2,
    `Sleep is when the brain consolidates memory. Staying up damages recall ${dmg}% — you trade ${extra} hours of panicked memorising (which is not stored) for ${dmg}% of the whole exam. Not a good trade. (${ref})`,
    ["Analysis: the exam tests recall, not input — where does recall come from?",
     "Solve 1: consolidation happens during sleep, not during hour 3 of cramming.",
     `Solve 2: staying up costs ${dmg}% of recall across the entire exam.`,
     `Solve 3: ${extra} hours of panicked input that never consolidates is worth less than ${dmg}% of everything.`]);
  return b3txt(rng,
    `H-1: begadang ${extra} jam tambahan vs tidur ${sleep} jam. Pilih?`,
    [`Begadang — ${extra} jam hafalan > tidur`,
     "Begadang + kopi 3 gelas",
     `Tidur ${sleep} jam — begadang merusak recall ${dmg}%; hafalan panik tidak masuk memori jangka panjang`,
     "Tidak tidur sama sekali"], 2,
    `Tidur = saat otak mengonsolidasi memori. Begadang merusak recall ${dmg}% — kamu menukar ${extra} jam hafalan panik (yang tidak tersimpan) dengan ${dmg}% seluruh exam. Bukan perdagangan yang bagus. (${ref})`,
    ["Analysis: exam menguji recall, bukan input — recall datang dari mana?",
     "Solve 1: konsolidasi terjadi saat tidur, bukan di jam ke-3 begadang.",
     `Solve 2: begadang merugikan ${dmg}% recall di seluruh exam.`,
     `Solve 3: ${extra} jam input panik yang tak pernah terkonsolidasi bernilai kurang dari ${dmg}% segalanya.`]);
}
/* h29:9 — angka pengecoh: tulis rumus dulu, ambil hanya yang dibutuhkan */
function b3h299(rng, ref, L){
  const en = L === "en";
  const F = b3pick(rng, [2000, 3000, 4000]), g = b3pick(rng, [3, 4, 5]);
  const W = b3pick(rng, [11, 12, 13]);
  const NI = b3pick(rng, [800, 1200]), cx = b3pick(rng, [500, 700]);
  const sh = b3pick(rng, [100, 200]);
  if (en) return b3txt(rng,
    `The question gives 6 numbers: FCFF Rp${b3i(F, L)}k, g ${g}%, WACC ${W}%, NI Rp${b3i(NI, L)}k, capex Rp${b3i(cx, L)}k, shares ${sh} million. The TV formula only needs 3. What do you do?`,
    ["Use all 6 — more complete is more correct",
     "Average all 6 numbers",
     "Pick the 3 largest",
     "Write the formula first → take only what is needed; the rest are distractors"], 3,
    `Writing the formula first = you know exactly which 3 numbers are needed; the other 3 are distractors designed to be used. 'Use everything' = the answer the question-setter cooked for those who do not write the formula. (${ref})`,
    ["Analysis: the formula is the filter — it decides what counts.",
     `Solve 1: TV = FCFF × (1+g) ÷ (WACC − g) needs FCFF ${F}, g ${g}%, WACC ${W}%.`,
     `Solve 2: NI ${NI}, capex ${cx}, shares ${sh} million appear nowhere in that formula.`,
     "Solve 3: extra numbers are not extra information — they are the trap."]);
  return b3txt(rng,
    `Soal memberi 6 angka: FCFF Rp${b3i(F, L)}rb, g ${g}%, WACC ${W}%, NI Rp${b3i(NI, L)}rb, capex Rp${b3i(cx, L)}rb, saham ${sh} juta. Rumus TV hanya butuh 3. Tindakan?`,
    ["Pakai semua 6 — semakin lengkap semakin benar",
     "Rata-ratakan ke-6 angka",
     "Pilih 3 yang terbesar",
     "Tulis rumus dulu → ambil hanya yang dibutuhkan; sisanya pengecoh"], 3,
    `Rumus ditulis dulu = kamu tahu persis 3 angka yang dibutuhkan; 3 sisanya = pengecoh yang dirancang untuk dipakai. 'Pakai semua' = jawaban yang diracik pembuat soal untuk yang tidak menulis rumus. (${ref})`,
    ["Analysis: rumus adalah filter — ia yang memutuskan apa yang dihitung.",
     `Solve 1: TV = FCFF × (1+g) ÷ (WACC − g) butuh FCFF ${F}, g ${g}%, WACC ${W}%.`,
     `Solve 2: NI ${NI}, capex ${cx}, saham ${sh} juta tidak muncul di rumus itu.`,
     "Solve 3: angka ekstra bukan informasi ekstra — ia jebakannya."]);
}
/* h29:10 — menjelang hari-H: terima topik lemah, jaga topik yang sudah aman */
function b3h2910(rng, ref, L){
  const en = L === "en";
  const low = en ? b3pick(rng, ["LBO", "DCF", "Comps"]) : b3pick(rng, ["LBO", "DCF", "Comps"]);
  const s = b3pick(rng, [50, 55, 58]), o1 = b3pick(rng, [80, 82, 85, 88, 90]);
  if (en) return b3txt(rng,
    `Near exam day, ${low} is still ${s}% in Mock 3, other topics ≥${o1}%. Decision on Day 29?`,
    [`Accept ${low}; keep the other topics safe`,
     `Stay up chasing ${low} to 80%`,
     "Ignore the dashboard, redo everything",
     "Focus on the topics already at 80%"], 0,
    `Accept ${low} as it is; one light drill if time allows, but do not sacrifice the topics that are already safe. The Day-24 dashboard exists so this decision is made calmly, not in panic. (${ref})`,
    ["Analysis: the dashboard's job is triage — what is locked, what is still movable?",
     `Solve 1: topics ≥${o1}% across two mocks are locked — protect them.`,
     `Solve 2: ${low} at ${s}% will not jump to 80% in one panicked night.`,
     "Solve 3: one light drill, then defend the safe ground — that is the highest-value Day 29."]);
  return b3txt(rng,
    `Menjelang hari-H, topik ${low} masih ${s}% di Mock 3, topik lain ≥${o1}%. Keputusan H29?`,
    [`Terima ${low}; jaga topik lain tetap aman`,
     `Begadang kejar ${low} sampai 80%`,
     "Abaikan dashboard, kerjakan semua ulang",
     "Fokus ke topik yang sudah 80%"], 0,
    `Terima ${low} apa adanya; satu drill ringan bila sempat, tapi jangan korbankan topik yang sudah aman. Dashboard H24 ada agar keputusan ini dibuat tenang, bukan panik. (${ref})`,
    ["Analysis: tugas dashboard adalah triase — mana yang terkunci, mana yang masih bisa bergerak?",
     `Solve 1: topik ≥${o1}% di dua mock beruntun terkunci — lindungi.`,
     `Solve 2: ${low} di ${s}% tidak akan melonjak ke 80% dalam satu malam panik.`,
     "Solve 3: satu drill ringan, lalu pertahankan tanah yang aman — itulah H29 bernilai tertinggi."]);
}

/* ================= hari-30 ================= */
/* h30:0 — bukti terkuat siap: jelaskan tiap angka TANPA catatan */
function b3h300(rng, ref, L){
  const en = L === "en";
  if (en) return b3txt(rng,
    `Strongest proof you are ready as an analyst?`,
    ["You can explain every number in your model WITHOUT notes — including its assumptions and limits",
     "A 100% mock score",
     "Memorising every formula",
     "Having 2 capstones"], 0,
    `A score = the past; explaining without notes = living understanding. An analyst is judged by the ability to defend their numbers in front of someone who doubts them — exactly like Day 27. (${ref})`,
    ["Analysis: the interviewer never asks for your score — what do they test instead?",
     "Solve 1: can you state each assumption and where it could be wrong?",
     "Solve 2: can you do it without looking at notes?",
     "Solve 3: that — not the mock score — is the proof the understanding is alive."]);
  return b3txt(rng,
    `Bukti terkuat kamu siap sebagai analis?`,
    ["Bisa menjelaskan tiap angka di modelmu TANPA melihat catatan — termasuk asumsi dan batasnya",
     "Skor mock 100%",
     "Hafal semua rumus",
     "Punya 2 capstone"], 0,
    `Skor = masa lalu; penjelasan tanpa catatan = pemahaman yang hidup. Analis dinilai dari kemampuan mempertahankan angkanya di depan orang yang meragukannya — persis seperti Hari 27. (${ref})`,
    ["Analysis: pewawancara tidak bertanya skor — apa yang mereka uji?",
     "Solve 1: bisakah kamu menyatakan tiap asumsi dan di mana ia bisa salah?",
     "Solve 2: bisakah kamu melakukannya tanpa melihat catatan?",
     "Solve 3: itu — bukan skor mock — bukti pemahamannya hidup."]);
}
/* h30:1 — latihan terbaik pasca-lulus: 1 model DCF emiten nyata per bulan */
function b3h301(rng, ref, L){
  const en = L === "en";
  if (en) return b3txt(rng,
    `After graduating, what is the best exercise to keep modelling skills alive?`,
    ["Re-read all lessons every week",
     "1 DCF model of a real listed company per month",
     "Re-memorise the cheatsheet every day",
     "No need — you have graduated"], 1,
    `One real company per month = 12 valuations a year with messy real-world data. Re-reading lessons = repeating theory; real modelling = training judgment — and judgment is what gets paid. (${ref})`,
    ["Analysis: skill is a muscle — what trains it, repetition of theory or real reps?",
     "Solve 1: 1 real DCF a month = 12 valuations a year.",
     "Solve 2: real data is messy — that mess is where judgment is built.",
     "Solve 3: re-reading feels productive but trains memory, not judgment."]);
  return b3txt(rng,
    `Setelah lulus, latihan terbaik menjaga skill modeling?`,
    ["Baca ulang semua lesson tiap minggu",
     "1 model DCF emiten nyata per bulan",
     "Hafal ulang cheatsheet tiap hari",
     "Tidak perlu — sudah lulus"], 1,
    `Satu emiten nyata per bulan = 12 valuasi per tahun dengan data berantakan dunia nyata. Membaca ulang lesson = mengulang teori; modeling nyata = melatih judgment — dan judgment-lah yang dibayar. (${ref})`,
    ["Analysis: skill = otot — apa yang melatihnya, pengulangan teori atau repetisi nyata?",
     "Solve 1: 1 DCF nyata per bulan = 12 valuasi per tahun.",
     "Solve 2: data nyata berantakan — kekacauan itulah tempat judgment dibangun.",
     "Solve 3: membaca ulang terasa produktif tapi melatih ingatan, bukan judgment."]);
}
/* h30:2 — 'walk me through your DCF': Asumsi → FCFF → WACC → TV → sensitivitas */
function b3h302(rng, ref, L){
  const en = L === "en";
  if (en) return b3txt(rng,
    `'Walk me through your DCF' — the 5-minute answer structure?`,
    ["Read every line of the model",
     "Tell the company's 5-minute history",
     "Just state the numbers",
     "Assumptions → FCFF → WACC → TV → sensitivity & conclusion"], 3,
    `Assumptions → FCFF → WACC → TV → sensitivity: the same logic chain as the Day 27 presentation, compressed. The interviewer hears how you think, not the numbers — the numbers are in the model. (${ref})`,
    ["Analysis: 5 minutes = the Day 27 chain, compressed — what is the order?",
     "Solve 1: start with assumptions — they are the claims everything rests on.",
     "Solve 2: FCFF → WACC → TV is the valuation engine, in order.",
     "Solve 3: end with sensitivity and conclusion — what would change your mind?"]);
  return b3txt(rng,
    `'Walk me through your DCF' — struktur jawaban 5 menit?`,
    ["Baca semua baris model",
     "Ceritakan sejarah perusahaan 5 menit",
     "Sebutkan angkanya saja",
     "Asumsi → FCFF → WACC → TV → sensitivitas & kesimpulan"], 3,
    `Asumsi → FCFF → WACC → TV → sensitivitas: rantai logika yang sama dengan presentasi Hari 27, dipadatkan. Pewawancara mendengar cara berpikir, bukan angka — angka ada di model. (${ref})`,
    ["Analysis: 5 menit = rantai Hari 27 yang dipadatkan — apa urutannya?",
     "Solve 1: mulai dari asumsi — itu klaim yang menopang segalanya.",
     "Solve 2: FCFF → WACC → TV adalah mesin valuasi, berurutan.",
     "Solve 3: akhiri dengan sensitivitas dan kesimpulan — apa yang mengubah pikiranmu?"]);
}
/* h30:3 — capstone portofolio: yang tiap angkanya bisa dipertahankan */
function b3h303(rng, ref, L){
  const en = L === "en";
  if (en) return b3txt(rng,
    `Which capstone belongs in a portfolio?`,
    ["Both — the more the better",
     "The one whose every number you can defend in front of an interviewer",
     "The one with the best valuation",
     "The thickest one"], 1,
    `A portfolio = inviting people to attack your model. One capstone you can defend fully > two capstones that wobble at the third question. Quality of defence > quantity of files. (${ref})`,
    ["Analysis: a portfolio is an invitation to be attacked — what survives attack?",
     "Solve 1: the interviewer will probe the third question, not admire the cover.",
     "Solve 2: a capstone you can defend line by line survives; a shaky one collapses.",
     "Solve 3: one defensible model beats two impressive-looking ones."]);
  return b3txt(rng,
    `Capstone mana yang layak jadi portofolio?`,
    ["Keduanya — semakin banyak semakin bagus",
     "Yang tiap angkanya bisa kamu pertahankan di depan pewawancara",
     "Yang nilainya paling bagus",
     "Yang paling tebal"], 1,
    `Portofolio = kamu mengundang orang menyerang modelmu. Satu capstone yang bisa dipertahankan penuh > dua capstone yang goyah di pertanyaan ketiga. Kualitas pertahanan > kuantitas file. (${ref})`,
    ["Analysis: portofolio adalah undangan untuk diserang — apa yang bertahan?",
     "Solve 1: pewawancara akan menguji pertanyaan ketiga, bukan mengagumi sampul.",
     "Solve 2: capstone yang bisa dipertahankan baris demi baris bertahan; yang goyah runtuh.",
     "Solve 3: satu model yang bisa dibela mengalahkan dua model yang terlihat mengesankan."]);
}
/* h30:4 — kebiasaan seumur karier: asumsi tertulis + audit rumus */
function b3h304(rng, ref, L){
  const en = L === "en";
  if (en) return b3txt(rng,
    `One habit from the sprint most worth carrying for a whole career?`,
    ["Staying up late before deadlines",
     "Working as fast as possible",
     "Written assumptions + formula audit before sending — no number without a basis and a trail",
     "Memorising every Excel shortcut"], 2,
    `Written assumptions = your numbers can be tested; a formula audit = your model can be trusted. These two habits separate analysts who are 'probably right' from analysts who actually are — in this sprint and 10 years from now. (${ref})`,
    ["Analysis: which habit saved you on Days 19–21 — speed, memory, or auditability?",
     "Solve 1: written assumptions make every number testable by someone else.",
     "Solve 2: a formula audit makes the model trustworthy before it is sent.",
     "Solve 3: habits are what you do without being told — these two compound for a career."]);
  return b3txt(rng,
    `Satu kebiasaan dari sprint yang paling layak dibawa seumur karier?`,
    ["Begadang sebelum deadline",
     "Kerja secepat mungkin",
     "Asumsi tertulis + audit rumus sebelum kirim — tidak ada angka tanpa dasar dan tanpa jejak",
     "Hafal semua shortcut Excel"], 2,
    `Asumsi tertulis = angkamu bisa diuji; audit rumus = modelmu bisa dipercaya. Dua kebiasaan ini membedakan analis yang 'kayaknya benar' dari yang benar-benar benar — di sprint ini maupun 10 tahun ke depan. (${ref})`,
    ["Analysis: kebiasaan mana yang menyelamatkanmu di Hari 19–21 — kecepatan, hafalan, atau auditabilitas?",
     "Solve 1: asumsi tertulis membuat tiap angka bisa diuji orang lain.",
     "Solve 2: audit rumus membuat model bisa dipercaya sebelum dikirim.",
     "Solve 3: kebiasaan adalah yang dilakukan tanpa disuruh — dua ini berlipat sepanjang karier."]);
}
/* h30:5 — batas cakupan: derivatif & hedging di luar cakupan, bukan backlog */
function b3h305(rng, ref, L){
  const en = L === "en";
  if (en) return b3txt(rng,
    `Why are derivatives & hedging NOT taught in this Sprint?`,
    ["Outside the FMVA scope — an explicit boundary, not a backlog",
     "Because they are too easy",
     "Because they are already in Day 15",
     "Because the exchange forbids them"], 0,
    `An explicit boundary: the FMVA program does not test derivatives; hedging is learned from the treasury track after graduation. Decision trees & binomial (Day 15, real-07) are enough to recognise the value of flexibility. (${ref})`,
    ["Analysis: a scope boundary is a decision, not an omission — what does it say?",
     "Solve 1: the program's syllabus explicitly excludes derivatives.",
     "Solve 2: hedging is its own discipline — treasury — learned on its own track.",
     "Solve 3: the sprint still teaches flexibility value (decision trees, binomial) — the boundary is about depth, not ignorance."]);
  return b3txt(rng,
    `Mengapa derivatif & hedging TIDAK diajarkan di Sprint ini?`,
    ["Di luar cakupan FMVA — batas eksplisit, bukan backlog",
     "Karena terlalu mudah",
     "Karena sudah ada di H15",
     "Karena dilarang BEI"], 0,
    `Batas eksplisit: FMVA tidak menguji derivatif; hedging dipelajari dari jalur treasury setelah lulus. Decision tree & binomial (H15, real-07) sudah cukup untuk mengenali nilai fleksibilitas. (${ref})`,
    ["Analysis: batas cakupan adalah keputusan, bukan kelalaian — apa katanya?",
     "Solve 1: silabus program secara eksplisit mengecualikan derivatif.",
     "Solve 2: hedging adalah disiplin sendiri — treasury — dipelajari di jalurnya sendiri.",
     "Solve 3: sprint tetap mengajarkan nilai fleksibilitas (decision tree, binomial) — batasnya soal kedalaman, bukan ketidaktahuan."]);
}

/* ================================================================
   REGISTRIES
   ID: VARIANT_FNS_B3 — Indonesian variants (69 keys)
   EN: VARIANT_FNS_EN_B3 — English variants, same numbers (69 keys)
   Shape per key (identical to concept-graph.js): {diff, gen}
   gen receives rng (Math.random in app.js) and returns
   {q, opts[4], answer, explain, steps[]}.
   ================================================================ */
const VARIANT_FNS_B3 = {
/* ---- fondasi-b (2) ---- */
"fondasi-b:2": {diff: "Easy", gen: (rng) => b3retry(() => b3fb2(rng, "Fondasi B § Istilah yang sering menipu pemula", "id"))},
"fondasi-b:5": {diff: "Medium", gen: (rng) => b3retry(() => b3fb5(rng, "Fondasi B § FIFO vs LIFO", "id"))},
/* ---- hari-01 (2) ---- */
"hari-01:4": {diff: "Easy", gen: (rng) => b3retry(() => b3h014(rng, "Hari 01 § Jembatan 2", "id"))},
"hari-01:5": {diff: "Easy", gen: (rng) => b3retry(() => b3h015(rng, "Hari 01 § Aturan no-hardcode", "id"))},
/* ---- hari-02 (9) ---- */
"hari-02:2": {diff: "Easy", gen: (rng) => b3retry(() => b3h022(rng, "Hari 02 § IS: titik awal model", "id"))},
"hari-02:5": {diff: "Easy", gen: (rng) => b3retry(() => b3h025(rng, "Hari 02 § COGS & gross margin", "id"))},
"hari-02:6": {diff: "Easy", gen: (rng) => b3retry(() => b3h026(rng, "Hari 02 § DuPont", "id"))},
"hari-02:7": {diff: "Medium", gen: (rng) => b3retry(() => b3h027(rng, "Hari 02 § Pengakuan pendapatan", "id"))},
"hari-02:8": {diff: "Easy", gen: (rng) => b3retry(() => b3h028(rng, "Hari 02 § Rasio: current ratio", "id"))},
"hari-02:9": {diff: "Medium", gen: (rng) => b3retry(() => b3h029(rng, "Hari 02 § Rasio: leverage", "id"))},
"hari-02:10": {diff: "Medium", gen: (rng) => b3retry(() => b3h0210(rng, "Hari 02 § CVP", "id"))},
"hari-02:11": {diff: "Medium", gen: (rng) => b3retry(() => b3h0211(rng, "Hari 02 § ABC costing", "id"))},
"hari-02:12": {diff: "Easy", gen: (rng) => b3retry(() => b3h0212(rng, "Hari 02 § Transfer pricing", "id"))},
/* ---- hari-03 (6) ---- */
"hari-03:0": {diff: "Easy", gen: (rng) => b3retry(() => b3h030(rng, "Hari 03 § DSO, DIO, DPO", "id"))},
"hari-03:2": {diff: "Easy", gen: (rng) => b3retry(() => b3h032(rng, "Hari 03 § Kenapa laba bukan kas", "id"))},
"hari-03:4": {diff: "Easy", gen: (rng) => b3retry(() => b3h034(rng, "Hari 03 § DSO, DIO, DPO", "id"))},
"hari-03:5": {diff: "Easy", gen: (rng) => b3retry(() => b3h035(rng, "Hari 03 § Jembatan ke arus kas", "id"))},
"hari-03:6": {diff: "Medium", gen: (rng) => b3retry(() => b3h036(rng, "Hari 03 § EFN", "id"))},
"hari-03:7": {diff: "Easy", gen: (rng) => b3retry(() => b3h037(rng, "Hari 03 § EFN", "id"))},
/* ---- hari-24 (13) ---- */
"hari-24:0": {diff: "Medium", gen: (rng) => b3retry(() => b3h240(rng, "Hari 24 § Drill varian: PV anuitas", "id"))},
"hari-24:1": {diff: "Medium", gen: (rng) => b3retry(() => b3h241(rng, "Hari 24 § Drill varian: CFO", "id"))},
"hari-24:2": {diff: "Easy", gen: (rng) => b3retry(() => b3h242(rng, "Hari 24 § Drill varian: DSO", "id"))},
"hari-24:3": {diff: "Medium", gen: (rng) => b3retry(() => b3h243(rng, "Hari 24 § Drill varian: WACC", "id"))},
"hari-24:4": {diff: "Medium", gen: (rng) => b3retry(() => b3h244(rng, "Hari 24 § Drill varian: TV Gordon", "id"))},
"hari-24:5": {diff: "Easy", gen: (rng) => b3retry(() => b3h245(rng, "Hari 24 § Drill varian: akresi", "id"))},
"hari-24:6": {diff: "Easy", gen: (rng) => b3retry(() => b3h246(rng, "Hari 24 § Drill varian: sinergi", "id"))},
"hari-24:7": {diff: "Medium", gen: (rng) => b3retry(() => b3h247(rng, "Hari 24 § Drill varian: jadwal utang", "id"))},
"hari-24:8": {diff: "Easy", gen: (rng) => b3retry(() => b3h248(rng, "Hari 24 § Drill varian: floor utang", "id"))},
"hari-24:9": {diff: "Medium", gen: (rng) => b3retry(() => b3h249(rng, "Hari 24 § Drill varian: MoIC", "id"))},
"hari-24:10": {diff: "Easy", gen: (rng) => b3retry(() => b3h2410(rng, "Hari 24 § Drill varian: forecast vs budget", "id"))},
"hari-24:11": {diff: "Easy", gen: (rng) => b3retry(() => b3h2411(rng, "Hari 24 § Drill varian: referensi absolut", "id"))},
"hari-24:12": {diff: "Easy", gen: (rng) => b3retry(() => b3h2412(rng, "Hari 24 § Dashboard skor per topik", "id"))},
/* ---- hari-26 (10) ---- */
"hari-26:0": {diff: "Easy", gen: (rng) => b3retry(() => b3h260(rng, "Hari 26 § NIM dari rata-rata kredit", "id"))},
"hari-26:1": {diff: "Medium", gen: (rng) => b3retry(() => b3h261(rng, "Hari 26 § Dividen vs CAR", "id"))},
"hari-26:2": {diff: "Medium", gen: (rng) => b3retry(() => b3h262(rng, "Hari 26 § Provisi & rantai CAR", "id"))},
"hari-26:3": {diff: "Medium", gen: (rng) => b3retry(() => b3h263(rng, "Hari 26 § CAR: buffer & tren", "id"))},
"hari-26:4": {diff: "Medium", gen: (rng) => b3retry(() => b3h264(rng, "Hari 26 § P/BV & ROE", "id"))},
"hari-26:5": {diff: "Medium", gen: (rng) => b3retry(() => b3h265(rng, "Hari 26 § Cost of Credit", "id"))},
"hari-26:6": {diff: "Hard", gen: (rng) => b3retry(() => b3h266(rng, "Hari 26 § DDM & residual income", "id"))},
"hari-26:7": {diff: "Easy", gen: (rng) => b3retry(() => b3h267(rng, "Hari 26 § CAR", "id"))},
"hari-26:8": {diff: "Medium", gen: (rng) => b3retry(() => b3h268(rng, "Hari 26 § Plafon dividen CET1", "id"))},
"hari-26:9": {diff: "Medium", gen: (rng) => b3retry(() => b3h269(rng, "Hari 26 § P/TBV & P/PPP", "id"))},
/* ---- hari-27 (10) ---- */
"hari-27:0": {diff: "Easy", gen: (rng) => b3retry(() => b3h270(rng, "Hari 27 § Hook 1 menit", "id"))},
"hari-27:1": {diff: "Easy", gen: (rng) => b3retry(() => b3h271(rng, "Hari 27 § Blok model & asumsi", "id"))},
"hari-27:2": {diff: "Medium", gen: (rng) => b3retry(() => b3h272(rng, "Hari 27 § Q&A: membunuh thesis", "id"))},
"hari-27:3": {diff: "Easy", gen: (rng) => b3retry(() => b3h273(rng, "Hari 27 § Angka saat lisan", "id"))},
"hari-27:4": {diff: "Easy", gen: (rng) => b3retry(() => b3h274(rng, "Hari 27 § Q&A: WACC", "id"))},
"hari-27:5": {diff: "Easy", gen: (rng) => b3retry(() => b3h275(rng, "Hari 27 § Checklist delivery", "id"))},
"hari-27:6": {diff: "Easy", gen: (rng) => b3retry(() => b3h276(rng, "Hari 27 § Buffer 1 menit", "id"))},
"hari-27:7": {diff: "Medium", gen: (rng) => b3retry(() => b3h277(rng, "Hari 27 § Rubrik penilaian", "id"))},
"hari-27:8": {diff: "Easy", gen: (rng) => b3retry(() => b3h278(rng, "Hari 27 § Teaser", "id"))},
"hari-27:9": {diff: "Easy", gen: (rng) => b3retry(() => b3h279(rng, "Hari 27 § CIM & NDA", "id"))},
/* ---- hari-29 (11) ---- */
"hari-29:0": {diff: "Easy", gen: (rng) => b3retry(() => b3h290(rng, "Hari 29 § Anggaran per soal", "id"))},
"hari-29:1": {diff: "Easy", gen: (rng) => b3retry(() => b3h291(rng, "Hari 29 § Aturan 2 pass", "id"))},
"hari-29:2": {diff: "Easy", gen: (rng) => b3retry(() => b3h292(rng, "Hari 29 § Jebakan negasi", "id"))},
"hari-29:3": {diff: "Medium", gen: (rng) => b3retry(() => b3h293(rng, "Hari 29 § Jebakan satuan", "id"))},
"hari-29:4": {diff: "Easy", gen: (rng) => b3retry(() => b3h294(rng, "Hari 29 § Jebakan 'semua benar'", "id"))},
"hari-29:5": {diff: "Medium", gen: (rng) => b3retry(() => b3h295(rng, "Hari 29 § Jebakan opsi kembar", "id"))},
"hari-29:6": {diff: "Easy", gen: (rng) => b3retry(() => b3h296(rng, "Hari 29 § Menit-menit terakhir", "id"))},
"hari-29:7": {diff: "Easy", gen: (rng) => b3retry(() => b3h297(rng, "Hari 29 § Cheatsheet", "id"))},
"hari-29:8": {diff: "Easy", gen: (rng) => b3retry(() => b3h298(rng, "Hari 29 § Ritual H-1", "id"))},
"hari-29:9": {diff: "Easy", gen: (rng) => b3retry(() => b3h299(rng, "Hari 29 § Jebakan angka pengecoh", "id"))},
"hari-29:10": {diff: "Medium", gen: (rng) => b3retry(() => b3h2910(rng, "Hari 29 § Dashboard H24", "id"))},
/* ---- hari-30 (6) ---- */
"hari-30:0": {diff: "Easy", gen: (rng) => b3retry(() => b3h300(rng, "Hari 30 § Bukti siap sebagai analis", "id"))},
"hari-30:1": {diff: "Easy", gen: (rng) => b3retry(() => b3h301(rng, "Hari 30 § Latihan pasca-lulus", "id"))},
"hari-30:2": {diff: "Medium", gen: (rng) => b3retry(() => b3h302(rng, "Hari 30 § Walk me through your DCF", "id"))},
"hari-30:3": {diff: "Easy", gen: (rng) => b3retry(() => b3h303(rng, "Hari 30 § Capstone portofolio", "id"))},
"hari-30:4": {diff: "Easy", gen: (rng) => b3retry(() => b3h304(rng, "Hari 30 § Kebiasaan seumur karier", "id"))},
"hari-30:5": {diff: "Easy", gen: (rng) => b3retry(() => b3h305(rng, "Hari 30 § Batas cakupan", "id"))},
};
const VARIANT_FNS_EN_B3 = {
/* ---- fondasi-b (2) ---- */
"fondasi-b:2": {diff: "Easy", gen: (rng) => b3retry(() => b3fb2(rng, "Foundation B § Tricky terms for beginners", "en"))},
"fondasi-b:5": {diff: "Medium", gen: (rng) => b3retry(() => b3fb5(rng, "Foundation B § FIFO vs LIFO", "en"))},
/* ---- hari-01 (2) ---- */
"hari-01:4": {diff: "Easy", gen: (rng) => b3retry(() => b3h014(rng, "Day 01 § Bridge 2", "en"))},
"hari-01:5": {diff: "Easy", gen: (rng) => b3retry(() => b3h015(rng, "Day 01 § No-hardcode rule", "en"))},
/* ---- hari-02 (9) ---- */
"hari-02:2": {diff: "Easy", gen: (rng) => b3retry(() => b3h022(rng, "Day 02 § IS: the starting point", "en"))},
"hari-02:5": {diff: "Easy", gen: (rng) => b3retry(() => b3h025(rng, "Day 02 § COGS & gross margin", "en"))},
"hari-02:6": {diff: "Easy", gen: (rng) => b3retry(() => b3h026(rng, "Day 02 § DuPont", "en"))},
"hari-02:7": {diff: "Medium", gen: (rng) => b3retry(() => b3h027(rng, "Day 02 § Revenue recognition", "en"))},
"hari-02:8": {diff: "Easy", gen: (rng) => b3retry(() => b3h028(rng, "Day 02 § Ratios: current ratio", "en"))},
"hari-02:9": {diff: "Medium", gen: (rng) => b3retry(() => b3h029(rng, "Day 02 § Ratios: leverage", "en"))},
"hari-02:10": {diff: "Medium", gen: (rng) => b3retry(() => b3h0210(rng, "Day 02 § CVP", "en"))},
"hari-02:11": {diff: "Medium", gen: (rng) => b3retry(() => b3h0211(rng, "Day 02 § ABC costing", "en"))},
"hari-02:12": {diff: "Easy", gen: (rng) => b3retry(() => b3h0212(rng, "Day 02 § Transfer pricing", "en"))},
/* ---- hari-03 (6) ---- */
"hari-03:0": {diff: "Easy", gen: (rng) => b3retry(() => b3h030(rng, "Day 03 § DSO, DIO, DPO", "en"))},
"hari-03:2": {diff: "Easy", gen: (rng) => b3retry(() => b3h032(rng, "Day 03 § Why profit is not cash", "en"))},
"hari-03:4": {diff: "Easy", gen: (rng) => b3retry(() => b3h034(rng, "Day 03 § DSO, DIO, DPO", "en"))},
"hari-03:5": {diff: "Easy", gen: (rng) => b3retry(() => b3h035(rng, "Day 03 § Bridge to cash flow", "en"))},
"hari-03:6": {diff: "Medium", gen: (rng) => b3retry(() => b3h036(rng, "Day 03 § EFN", "en"))},
"hari-03:7": {diff: "Easy", gen: (rng) => b3retry(() => b3h037(rng, "Day 03 § EFN", "en"))},
/* ---- hari-24 (13) ---- */
"hari-24:0": {diff: "Medium", gen: (rng) => b3retry(() => b3h240(rng, "Day 24 § Variant drill: annuity PV", "en"))},
"hari-24:1": {diff: "Medium", gen: (rng) => b3retry(() => b3h241(rng, "Day 24 § Variant drill: CFO", "en"))},
"hari-24:2": {diff: "Easy", gen: (rng) => b3retry(() => b3h242(rng, "Day 24 § Variant drill: DSO", "en"))},
"hari-24:3": {diff: "Medium", gen: (rng) => b3retry(() => b3h243(rng, "Day 24 § Variant drill: WACC", "en"))},
"hari-24:4": {diff: "Medium", gen: (rng) => b3retry(() => b3h244(rng, "Day 24 § Variant drill: Gordon TV", "en"))},
"hari-24:5": {diff: "Easy", gen: (rng) => b3retry(() => b3h245(rng, "Day 24 § Variant drill: accretion", "en"))},
"hari-24:6": {diff: "Easy", gen: (rng) => b3retry(() => b3h246(rng, "Day 24 § Variant drill: synergies", "en"))},
"hari-24:7": {diff: "Medium", gen: (rng) => b3retry(() => b3h247(rng, "Day 24 § Variant drill: debt schedule", "en"))},
"hari-24:8": {diff: "Easy", gen: (rng) => b3retry(() => b3h248(rng, "Day 24 § Variant drill: debt floor", "en"))},
"hari-24:9": {diff: "Medium", gen: (rng) => b3retry(() => b3h249(rng, "Day 24 § Variant drill: MoIC", "en"))},
"hari-24:10": {diff: "Easy", gen: (rng) => b3retry(() => b3h2410(rng, "Day 24 § Variant drill: forecast vs budget", "en"))},
"hari-24:11": {diff: "Easy", gen: (rng) => b3retry(() => b3h2411(rng, "Day 24 § Variant drill: absolute references", "en"))},
"hari-24:12": {diff: "Easy", gen: (rng) => b3retry(() => b3h2412(rng, "Day 24 § Score dashboard by topic", "en"))},
/* ---- hari-26 (10) ---- */
"hari-26:0": {diff: "Easy", gen: (rng) => b3retry(() => b3h260(rng, "Day 26 § NIM from average loans", "en"))},
"hari-26:1": {diff: "Medium", gen: (rng) => b3retry(() => b3h261(rng, "Day 26 § Dividends vs CAR", "en"))},
"hari-26:2": {diff: "Medium", gen: (rng) => b3retry(() => b3h262(rng, "Day 26 § Provisions & the CAR chain", "en"))},
"hari-26:3": {diff: "Medium", gen: (rng) => b3retry(() => b3h263(rng, "Day 26 § CAR: buffer & trend", "en"))},
"hari-26:4": {diff: "Medium", gen: (rng) => b3retry(() => b3h264(rng, "Day 26 § P/BV & ROE", "en"))},
"hari-26:5": {diff: "Medium", gen: (rng) => b3retry(() => b3h265(rng, "Day 26 § Cost of Credit", "en"))},
"hari-26:6": {diff: "Hard", gen: (rng) => b3retry(() => b3h266(rng, "Day 26 § DDM & residual income", "en"))},
"hari-26:7": {diff: "Easy", gen: (rng) => b3retry(() => b3h267(rng, "Day 26 § CAR", "en"))},
"hari-26:8": {diff: "Medium", gen: (rng) => b3retry(() => b3h268(rng, "Day 26 § CET1 dividend ceiling", "en"))},
"hari-26:9": {diff: "Medium", gen: (rng) => b3retry(() => b3h269(rng, "Day 26 § P/TBV & P/PPP", "en"))},
/* ---- hari-27 (10) ---- */
"hari-27:0": {diff: "Easy", gen: (rng) => b3retry(() => b3h270(rng, "Day 27 § The 1-minute hook", "en"))},
"hari-27:1": {diff: "Easy", gen: (rng) => b3retry(() => b3h271(rng, "Day 27 § Model & assumptions block", "en"))},
"hari-27:2": {diff: "Medium", gen: (rng) => b3retry(() => b3h272(rng, "Day 27 § Q&A: killing the thesis", "en"))},
"hari-27:3": {diff: "Easy", gen: (rng) => b3retry(() => b3h273(rng, "Day 27 § Numbers out loud", "en"))},
"hari-27:4": {diff: "Easy", gen: (rng) => b3retry(() => b3h274(rng, "Day 27 § Q&A: WACC", "en"))},
"hari-27:5": {diff: "Easy", gen: (rng) => b3retry(() => b3h275(rng, "Day 27 § Delivery checklist", "en"))},
"hari-27:6": {diff: "Easy", gen: (rng) => b3retry(() => b3h276(rng, "Day 27 § The 1-minute buffer", "en"))},
"hari-27:7": {diff: "Medium", gen: (rng) => b3retry(() => b3h277(rng, "Day 27 § Scoring rubric", "en"))},
"hari-27:8": {diff: "Easy", gen: (rng) => b3retry(() => b3h278(rng, "Day 27 § Teaser", "en"))},
"hari-27:9": {diff: "Easy", gen: (rng) => b3retry(() => b3h279(rng, "Day 27 § CIM & NDA", "en"))},
/* ---- hari-29 (11) ---- */
"hari-29:0": {diff: "Easy", gen: (rng) => b3retry(() => b3h290(rng, "Day 29 § Time budget per question", "en"))},
"hari-29:1": {diff: "Easy", gen: (rng) => b3retry(() => b3h291(rng, "Day 29 § The 2-pass rule", "en"))},
"hari-29:2": {diff: "Easy", gen: (rng) => b3retry(() => b3h292(rng, "Day 29 § Negation trap", "en"))},
"hari-29:3": {diff: "Medium", gen: (rng) => b3retry(() => b3h293(rng, "Day 29 § Units trap", "en"))},
"hari-29:4": {diff: "Easy", gen: (rng) => b3retry(() => b3h294(rng, "Day 29 § 'All correct' trap", "en"))},
"hari-29:5": {diff: "Medium", gen: (rng) => b3retry(() => b3h295(rng, "Day 29 § Twin-options trap", "en"))},
"hari-29:6": {diff: "Easy", gen: (rng) => b3retry(() => b3h296(rng, "Day 29 § Final minutes", "en"))},
"hari-29:7": {diff: "Easy", gen: (rng) => b3retry(() => b3h297(rng, "Day 29 § Cheatsheet", "en"))},
"hari-29:8": {diff: "Easy", gen: (rng) => b3retry(() => b3h298(rng, "Day 29 § H-1 ritual", "en"))},
"hari-29:9": {diff: "Easy", gen: (rng) => b3retry(() => b3h299(rng, "Day 29 § Distractor numbers", "en"))},
"hari-29:10": {diff: "Medium", gen: (rng) => b3retry(() => b3h2910(rng, "Day 29 § Day-24 dashboard", "en"))},
/* ---- hari-30 (6) ---- */
"hari-30:0": {diff: "Easy", gen: (rng) => b3retry(() => b3h300(rng, "Day 30 § Proof you are ready", "en"))},
"hari-30:1": {diff: "Easy", gen: (rng) => b3retry(() => b3h301(rng, "Day 30 § Practice after graduation", "en"))},
"hari-30:2": {diff: "Medium", gen: (rng) => b3retry(() => b3h302(rng, "Day 30 § Walk me through your DCF", "en"))},
"hari-30:3": {diff: "Easy", gen: (rng) => b3retry(() => b3h303(rng, "Day 30 § Portfolio capstone", "en"))},
"hari-30:4": {diff: "Easy", gen: (rng) => b3retry(() => b3h304(rng, "Day 30 § A career-long habit", "en"))},
"hari-30:5": {diff: "Easy", gen: (rng) => b3retry(() => b3h305(rng, "Day 30 § Scope boundary", "en"))},
};
