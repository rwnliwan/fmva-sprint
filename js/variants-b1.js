/* variants-b1.js — Batch 1 of "angka beda" mistake-review variants.
   Scope: fondasi-a (qi 0-4), fondasi-c (qi 0-4), hari-04..hari-15 (all qi).
   fondasi-b / hari-01 / hari-02 / hari-03 already live in concept-graph.js
   (VARIANT_FNS / VARIANT_FNS_EN) and are NOT duplicated here.
   Schema matches concept-graph.js exactly: each key "lesson:qi" ->
   {diff, gen: (rng) => ({q, opts[4], answer (index AFTER shuffle),
   explain, steps[]})}. Every number in an answer is recomputed from the
   variant's own numbers; steps show the arithmetic so it is verifiable.
   Depends on the global vShuffle(rng) helper from concept-graph.js.
   This file defines only VARIANT_FNS_B1 / VARIANT_FNS_EN_B1 and calls
   no function at load time. Wiring (merge into the live registries) is
   the coordinator's job. Never claim FMVA as a completed certificate. */

/* ---------- shared helpers (b1- prefix: no collision with concept-graph.js) ---------- */
function b1f(v, d){ d = (d === undefined ? 0 : d); return v.toLocaleString("id-ID", {minimumFractionDigits: d, maximumFractionDigits: d}); }
function b1fe(v, d){ d = (d === undefined ? 0 : d); return v.toLocaleString("en-US", {minimumFractionDigits: d, maximumFractionDigits: d}); }
function b1ri(rng, lo, hi, step){ step = step || 1; return lo + step * Math.floor(rng() * ((hi - lo) / step + 1)); }
function b1pick(rng, arr){ return arr[Math.floor(rng() * arr.length)]; }
function b1mk(rng, q, vals, explain, steps){
  const order = vShuffle([0, 1, 2, 3], rng);
  return {q: q, opts: order.map(i => vals[i]), answer: order.indexOf(0), explain: explain, steps: steps};
}
function b1txt(rng, q, opts, ci, explain, steps){
  const order = vShuffle([0, 1, 2, 3], rng);
  return {q: q, opts: order.map(i => opts[i]), answer: order.indexOf(ci), explain: explain, steps: steps};
}
/* Re-roll guard: some distractor pairs coincide only for specific parameter
   draws (e.g. beta = 1.0 makes CoE equal Rf+MRP; d1 = d2 collapses two
   discount steps; g = 5 makes "double growth" equal "g+5"). Each attempt is
   self-consistent, so re-rolling with the advancing rng stream keeps the
   answer correct and guarantees 4 distinct options. Capped at 60 tries. */
function b1retry(fn, rng){
  let r = fn(rng), guard = 0;
  while (new Set(r.opts).size < 4 && guard++ < 60) r = fn(rng);
  return r;
}

/* ================= fondasi-a ================= */
/* a:0 — financial statements record the past, a model projects the future */
function b1_fa0(rng){
  const nm = b1pick(rng, ["PT Maju Jaya", "Kios Rina", "Warung Kopi Sari"]);
  return b1txt(rng,
    `Apa perbedaan utama laporan keuangan ${nm} vs financial model-nya?`,
    ["Laporan mencatat masa lalu, model memproyeksikan masa depan",
     "Laporan dibuat analis, model dibuat oleh akuntan",
     "Laporan untuk urusan pajak, model untuk investor",
     "Keduanya sama-sama proyeksi, hanya beda formatnya"], 0,
    `Laporan keuangan mencatat masa lalu; model memproyeksikan masa depan untuk pengambilan keputusan. (Fondasi A § Laporan vs model)`,
    ["Analysis: yang ditanya perbedaan FUNGSI — kapan waktunya?",
     "Solve 1: laporan keuangan = catatan transaksi yang SUDAH terjadi.",
     "Solve 2: financial model = proyeksi angka yang BELUM terjadi.",
     "Solve 3: jadi laporan melihat ke belakang, model melihat ke depan."]);
}
function b1EN_fa0(rng){
  const nm = b1pick(rng, ["PT Maju Jaya", "Rina's Kiosk", "Sari Coffee Stall"]);
  return b1txt(rng,
    `What is the main difference between ${nm}'s financial statements and its financial model?`,
    ["Statements record the past; the model projects the future",
     "Statements are made by analysts, models by accountants",
     "Statements are for tax, models are for investors",
     "Both are projections, only the format differs"], 0,
    `Financial statements record the past; the model projects the future to support decisions. (Foundation A § Statements vs model)`,
    ["Analysis: the question asks about FUNCTION — which time direction?",
     "Solve 1: financial statements = a record of transactions that ALREADY happened.",
     "Solve 2: a financial model = a projection of numbers that have NOT happened yet.",
     "Solve 3: so statements look backward, the model looks forward."]);
}
/* a:1 — 3-Statement is the foundation of all valuation models */
function b1_fa1(rng){
  const nm = b1pick(rng, ["DCF", "LBO", "Comps"]);
  return b1txt(rng,
    `Model apa yang menjadi fondasi semua model valuasi — termasuk ${nm}?`,
    ["LBO", "Comps", "3-Statement", "Budget forecast"], 2,
    `3-Statement adalah fondasi — DCF, LBO, dan M&A semuanya dibangun di atasnya. (Fondasi A § Peta model)`,
    ["Analysis: yang ditanya fondasi — model apa yang menopang model lain?",
     "Solve 1: DCF butuh FCFF — FCFF lahir dari 3 laporan yang terhubung.",
     "Solve 2: LBO dan comps juga membaca angka yang sama dari 3 laporan.",
     "Solve 3: tanpa 3-Statement yang balance, semua model di atasnya goyah."]);
}
function b1EN_fa1(rng){
  const nm = b1pick(rng, ["DCF", "LBO", "Comps"]);
  return b1txt(rng,
    `Which model is the foundation of all valuation models — including ${nm}?`,
    ["LBO", "Comps", "3-Statement", "Budget forecast"], 2,
    `The 3-Statement is the foundation — DCF, LBO, and M&A are all built on it. (Foundation A § Model map)`,
    ["Analysis: the question asks for the foundation — which model supports the others?",
     "Solve 1: DCF needs FCFF — FCFF is born from 3 linked statements.",
     "Solve 2: LBO and comps also read the same numbers from those 3 statements.",
     "Solve 3: without a balancing 3-Statement, every model above it wobbles."]);
}
/* a:2 — assumption numbers only in blue input cells */
function b1_fa2(rng){
  const g = b1ri(rng, 3, 12, 1);
  const f = (1 + g / 100).toFixed(2).replace(".", ",");
  return b1txt(rng,
    `Rumus =B5*${f} di sel proyeksi. Masalahnya?`,
    ["Tidak ada masalah, rumusnya jalan",
     "Hardcode: angka pertumbuhan harus di sel input",
     "Seharusnya pakai fungsi SUM",
     "Referensi B5-nya keliru"], 1,
    `Angka ${f} adalah hardcode — pertumbuhan ${g}% harusnya di sel input biru bernama, mis. =B5*(1+Growth). (Fondasi A § Aturan no-hardcode)`,
    ["Analysis: yang ditanya masalah rumus — ada angka yang diketik langsung?",
     `Solve 1: ${f} = 1 + ${g}% — angka asumsi pertumbuhan diketik di dalam rumus.`,
     "Solve 2: 3 bulan lagi tidak ada yang ingat dari mana angka itu berasal.",
     "Solve 3: pindahkan ke sel input biru bernama Growth, rumus hanya me-referensi."]);
}
function b1EN_fa2(rng){
  const g = b1ri(rng, 3, 12, 1);
  const f = (1 + g / 100).toFixed(2);
  return b1txt(rng,
    `The formula =B5*${f} sits in a projection cell. What is wrong with it?`,
    ["Nothing is wrong, the formula works",
     "Hardcode: the growth number belongs in an input cell",
     "It should use the SUM function",
     "The B5 reference is wrong"], 1,
    `The number ${f} is a hardcode — ${g}% growth belongs in a named blue input cell, e.g. =B5*(1+Growth). (Foundation A § No-hardcode rule)`,
    ["Analysis: the question asks what is wrong with the formula — is a number typed inside it?",
     `Solve 1: ${f} = 1 + ${g}% — the growth assumption is typed inside the formula.`,
     "Solve 2: in 3 months nobody will remember where that number came from.",
     "Solve 3: move it to a named blue input cell called Growth; the formula only references it."]);
}
/* a:3 — credit analyst judges ability to repay debt */
function b1_fa3(rng){
  const who = b1pick(rng, ["debitur korporasi", "UMKM", "debitur ritel"]);
  return b1txt(rng,
    `Credit analyst menilai ${who} memakai model terutama untuk menilai…`,
    ["Harga wajar saham perusahaan",
     "Besar bonus manajemen",
     "Efisiensi pajak perusahaan",
     "Kemampuan debitur membayar utang"], 3,
    `Credit analyst menilai kemampuan bayar utang — proyeksi arus kas vs kewajiban. (Fondasi A § Peran analis)`,
    ["Analysis: yang ditanya fokus credit analyst — risiko apa yang ia jaga?",
     "Solve 1: pemberi pinjaman rugi bila debitur gagal bayar — bukan bila harga saham turun.",
     "Solve 2: jadi yang diuji = arus kas masa depan vs jadwal kewajiban.",
     "Solve 3: harga saham, bonus, dan pajak bukan ukuran kemampuan bayar."]);
}
function b1EN_fa3(rng){
  const who = b1pick(rng, ["a corporate borrower", "an SME", "a retail borrower"]);
  return b1txt(rng,
    `A credit analyst assessing ${who} uses a model mainly to judge…`,
    ["The fair share price of the company",
     "The size of management bonuses",
     "The company's tax efficiency",
     "The borrower's ability to repay debt"], 3,
    `A credit analyst judges ability to repay — projected cash flows vs obligations. (Foundation A § Analyst roles)`,
    ["Analysis: the question asks what a credit analyst guards — which risk?",
     "Solve 1: a lender loses when the borrower defaults — not when the share price falls.",
     "Solve 2: so what is tested = future cash flows vs the schedule of obligations.",
     "Solve 3: share price, bonuses, and tax are not measures of ability to pay."]);
}
/* a:4 — pre-revenue startup needs a budget forecast (runway) */
function b1_fa4(rng){
  const sc = b1pick(rng, ["Startup rintisan belum punya revenue", "Aplikasi baru dengan pengguna gratis", "Warung yang baru buka 1 bulan"]);
  return b1txt(rng,
    `${sc}. Model apa yang PALING dibutuhkan founder-nya saat ini?`,
    ["DCF untuk valuasi IPO",
     "Budget forecast: berapa bulan kas bertahan",
     "LBO untuk akuisisi",
     "Comps vs kompetitor"], 1,
    `Budget forecast: runway kas = nyawa startup. DCF/LBO butuh arus kas stabil yang belum ada. (Fondasi A § Model yang tepat)`,
    ["Analysis: yang ditanya kebutuhan MENDESAK — apa yang menentukan hidup-mati usaha ini?",
     "Solve 1: tanpa revenue, tidak ada arus kas stabil untuk didiskon (DCF) atau di-leverage (LBO).",
     "Solve 2: pertanyaan hidup-matinya = kas di tangan habis dalam berapa bulan.",
     "Solve 3: itu dijawab budget forecast — runway, bukan valuasi."]);
}
function b1EN_fa4(rng){
  const sc = b1pick(rng, ["A seed startup with no revenue yet", "A new app with only free users", "A food stall open for just 1 month"]);
  return b1txt(rng,
    `${sc}. Which model does the founder need MOST right now?`,
    ["DCF for an IPO valuation",
     "Budget forecast: how many months cash lasts",
     "LBO for an acquisition",
     "Comps vs competitors"], 1,
    `Budget forecast: cash runway = the startup's lifeline. DCF/LBO need stable cash flows that do not exist yet. (Foundation A § The right model)`,
    ["Analysis: the question asks for the URGENT need — what decides whether this business lives or dies?",
     "Solve 1: with no revenue, there is no stable cash flow to discount (DCF) or lever (LBO).",
     "Solve 2: the life-or-death question = in how many months does the cash on hand run out.",
     "Solve 3: that is answered by a budget forecast — runway, not valuation."]);
}

/* ================= fondasi-c ================= */
/* c:0 — hardcode inside a formula (growth factor) */
function b1_fc0(rng){
  const g = b1ri(rng, 3, 12, 1);
  const f = (1 + g / 100).toFixed(2).replace(".", ",");
  return b1txt(rng,
    `Rumus =B5*${f} di sel proyeksi. Masalahnya?`,
    ["Tidak ada masalah, rumusnya jalan",
     "Seharusnya pakai fungsi SUM",
     `Hardcode: ${f} harus di sel input`,
     "Referensi B5-nya keliru"], 2,
    `${f} adalah hardcode — harusnya di sel input biru bernama, mis. =B5*(1+Growth) dengan Growth ${g}%. (Fondasi C § No-hardcode)`,
    ["Analysis: yang ditanya masalah rumus — adakah angka asumsi di dalamnya?",
     `Solve 1: ${f} = 1 + ${g}% — asumsi pertumbuhan diketik langsung.`,
     "Solve 2: angka di dalam rumus tidak bisa diaudit dan mudah terlupakan.",
     "Solve 3: pindahkan ke sel input biru bernama; rumus hanya me-referensi."]);
}
function b1EN_fc0(rng){
  const g = b1ri(rng, 3, 12, 1);
  const f = (1 + g / 100).toFixed(2);
  return b1txt(rng,
    `The formula =B5*${f} sits in a projection cell. What is wrong with it?`,
    ["Nothing is wrong, the formula works",
     "It should use the SUM function",
     `Hardcode: ${f} belongs in an input cell`,
     "The B5 reference is wrong"], 2,
    `${f} is a hardcode — it belongs in a named blue input cell, e.g. =B5*(1+Growth) with Growth ${g}%. (Foundation C § No-hardcode)`,
    ["Analysis: the question asks what is wrong with the formula — is an assumption number inside it?",
     `Solve 1: ${f} = 1 + ${g}% — the growth assumption is typed directly.`,
     "Solve 2: a number inside a formula cannot be audited and is easily forgotten.",
     "Solve 3: move it to a named blue input cell; the formula only references it."]);
}
/* c:1 — blue = input cells */
function b1_fc1(rng){
  const nm = b1pick(rng, ["sel input", "sel asumsi yang diketik manual"]);
  return b1txt(rng,
    `Warna standar ${nm} dalam modeling?`,
    ["Merah", "Biru", "Hijau", "Kuning"], 1,
    `Biru = input/ketik manual. Hitam = rumus. Hijau = link antar-sheet. (Fondasi C § Konvensi warna)`,
    ["Analysis: yang ditanya konvensi warna — warna apa untuk angka yang diketik?",
     "Solve 1: biru = angka yang diketik manusia (asumsi/input).",
     "Solve 2: hitam = rumus; hijau = link antar-sheet.",
     "Solve 3: konvensi ini membuat asumsi langsung terlihat saat audit."]);
}
function b1EN_fc1(rng){
  const nm = b1pick(rng, ["input cells", "manually typed assumption cells"]);
  return b1txt(rng,
    `What is the standard colour for ${nm} in modelling?`,
    ["Red", "Blue", "Green", "Yellow"], 1,
    `Blue = input/typed manually. Black = formula. Green = link across sheets. (Foundation C § Colour convention)`,
    ["Analysis: the question asks about the colour convention — which colour for typed numbers?",
     "Solve 1: blue = numbers typed by a human (assumptions/inputs).",
     "Solve 2: black = formula; green = link across sheets.",
     "Solve 3: the convention makes assumptions instantly visible during an audit."]);
}
/* c:2 — PMT computes the periodic loan payment */
function b1_fc2(rng){
  const nm = b1pick(rng, ["cicilan utang tiap periode", "pembayaran periodik pinjaman"]);
  return b1txt(rng,
    `Fungsi untuk menghitung ${nm}?`,
    ["PMT", "NPV", "IRR", "SUMIFS"], 0,
    `PMT menghitung pembayaran periodik (pokok + bunga) pinjaman. (Fondasi C § Fungsi keuangan)`,
    ["Analysis: yang ditanya fungsi cicilan — pembayaran TETAP tiap periode?",
     "Solve 1: NPV mendiskon arus kas; IRR mencari tingkat pengembalian.",
     "Solve 2: SUMIFS menjumlah dengan kriteria — bukan pembayaran.",
     "Solve 3: PMT = pembayaran periodik pinjaman (pokok + bunga)."]);
}
function b1EN_fc2(rng){
  const nm = b1pick(rng, ["the loan instalment each period", "the periodic loan payment"]);
  return b1txt(rng,
    `Which function calculates ${nm}?`,
    ["PMT", "NPV", "IRR", "SUMIFS"], 0,
    `PMT calculates the periodic payment (principal + interest) of a loan. (Foundation C § Financial functions)`,
    ["Analysis: the question asks for the instalment function — a FIXED payment each period?",
     "Solve 1: NPV discounts cash flows; IRR finds the rate of return.",
     "Solve 2: SUMIFS sums with criteria — not a payment.",
     "Solve 3: PMT = the periodic loan payment (principal + interest)."]);
}
/* c:3 — balance check ERROR means fix before use */
function b1_fc3(rng){
  const yr = b1ri(rng, 2027, 2030, 1);
  return b1txt(rng,
    `Balance check menunjukkan ERROR di tahun ${yr}. Artinya?`,
    ["Model tetap bisa dipakai seperti biasa",
     "Itu normal di tahun proyeksi",
     "Hapus saja balance check-nya",
     "Ada yang salah — perbaiki sebelum dipakai"], 3,
    `Model dengan balance ERROR tidak valid — perbaiki dulu sebelum dipakai untuk keputusan. (Fondasi C § Balance check)`,
    ["Analysis: yang ditanya arti ERROR — bolehkah model dipakai?",
     "Solve 1: balance check = Aset harus = Liabilitas + Ekuitas.",
     `Solve 2: ERROR di ${yr} berarti ada link/angka yang bocor di tahun itu.`,
     "Solve 3: keputusan dari model yang tidak balance = keputusan dari angka yang salah."]);
}
function b1EN_fc3(rng){
  const yr = b1ri(rng, 2027, 2030, 1);
  return b1txt(rng,
    `The balance check shows ERROR in year ${yr}. What does that mean?`,
    ["The model can still be used as usual",
     "That is normal in a forecast year",
     "Just delete the balance check",
     "Something is wrong — fix it before using the model"], 3,
    `A model with a balance ERROR is not valid — fix it before using it for decisions. (Foundation C § Balance check)`,
    ["Analysis: the question asks what ERROR means — can the model be used?",
     "Solve 1: the balance check = Assets must equal Liabilities + Equity.",
     `Solve 2: ERROR in ${yr} means a link or number is leaking in that year.`,
     "Solve 3: a decision from an unbalanced model = a decision from wrong numbers."]);
}
/* c:4 — relative reference shifts when copied */
function b1_fc4(rng){
  const cols = b1pick(rng, [["A", "B", "C"], ["C", "D", "E"], ["D", "E", "F"], ["F", "G", "H"]]);
  const r = b1ri(rng, 1, 9, 1);
  return b1txt(rng,
    `Rumus =${cols[0]}${r}+${cols[1]}${r} di-copy 1 sel ke kanan menjadi =${cols[1]}${r}+${cols[2]}${r}. Ini contoh…`,
    ["Absolute reference yang terkunci",
     "Circular reference yang berputar",
     "Relative reference: bergeser ikut posisi",
     "Hardcode angka dalam rumus"], 2,
    `Tanpa $, referensi bergeser relatif mengikuti posisi copy. Inilah default Excel — dan alasan $ ada. (Fondasi C § Referensi relatif)`,
    ["Analysis: yang ditanya jenis referensi — apa yang terjadi saat di-copy?",
     `Solve 1: ${cols[0]}${r} menjadi ${cols[1]}${r}, ${cols[1]}${r} menjadi ${cols[2]}${r} — keduanya geser 1 kolom.`,
     "Solve 2: tidak ada $ yang mengunci — jadi referensi mengikuti posisi baru.",
     "Solve 3: itulah relative reference, default Excel."]);
}
function b1EN_fc4(rng){
  const cols = b1pick(rng, [["A", "B", "C"], ["C", "D", "E"], ["D", "E", "F"], ["F", "G", "H"]]);
  const r = b1ri(rng, 1, 9, 1);
  return b1txt(rng,
    `The formula =${cols[0]}${r}+${cols[1]}${r} copied 1 cell to the right becomes =${cols[1]}${r}+${cols[2]}${r}. This is an example of…`,
    ["A locked absolute reference",
     "A circular reference looping back",
     "A relative reference: shifting with position",
     "A hardcoded number inside a formula"], 2,
    `Without $, references shift relatively with the copy position. That is Excel's default — and the reason $ exists. (Foundation C § Relative references)`,
    ["Analysis: the question asks which reference type — what happens when copied?",
     `Solve 1: ${cols[0]}${r} becomes ${cols[1]}${r}, ${cols[1]}${r} becomes ${cols[2]}${r} — both shift 1 column.`,
     "Solve 2: no $ locks anything — so the references follow the new position.",
     "Solve 3: that is a relative reference, Excel's default."]);
}

/* ---------- signed-rupiah helpers (function declarations hoist; usable above) ---------- */
function b1rp(v, unit){ return (v < 0 ? "−Rp" + b1f(-v) + unit : "Rp" + b1f(v) + unit); }
function b1rpe(v, unit){ return (v < 0 ? "−Rp" + b1fe(-v) + unit : "Rp" + b1fe(v) + unit); }

/* ================= hari-04 ================= */
/* 04:0 — depreciation is a non-cash add-back to CFO */
function b1_h040(rng){
  const X = b1ri(rng, 200, 900, 100);
  return b1txt(rng,
    `Penyusutan Rp${b1f(X)}rb: efeknya ke arus kas operasi (CFO)?`,
    [`Mengurangi CFO Rp${b1f(X)}rb karena memotong laba`,
     `Menambah CFO Rp${b1f(X)}rb (add-back): beban non-kas`,
     "Tidak ada efek — penyusutan bukan akun kas",
     `Mengurangi CFO Rp${b1f(X)}rb karena aset berkurang`], 1,
    `Add-back Rp${b1f(X)}rb: laba terpotong tanpa kas keluar, jadi ditambahkan kembali. (Hari 04 § Metode tidak langsung)`,
    ["Analysis: yang ditanya efek ke CFO — apakah kas benar-benar keluar?",
     "Solve 1: penyusutan memotong laba bersih, tapi tidak ada pembayaran.",
     "Solve 2: metode tidak langsung mulai dari laba bersih, lalu mengembalikan beban non-kas.",
     `Solve 3: CFO naik Rp${b1f(X)}rb (add-back) — bukan turun, bukan nol.`]);
}
function b1EN_h040(rng){
  const X = b1ri(rng, 200, 900, 100);
  return b1txt(rng,
    `Depreciation of Rp${b1fe(X)}k: what is its effect on operating cash flow (CFO)?`,
    [`It reduces CFO by Rp${b1fe(X)}k because it cuts profit`,
     `It adds Rp${b1fe(X)}k to CFO (add-back): a non-cash expense`,
     "No effect — depreciation is not a cash account",
     `It reduces CFO by Rp${b1fe(X)}k because assets fall`], 1,
    `Add-back of Rp${b1fe(X)}k: profit is cut with no cash leaving, so it is added back. (Day 04 § Indirect method)`,
    ["Analysis: the question asks about the effect on CFO — does cash really leave?",
     "Solve 1: depreciation cuts net income, but no payment is made.",
     "Solve 2: the indirect method starts from net income, then restores non-cash expenses.",
     `Solve 3: CFO rises by Rp${b1fe(X)}k (add-back) — not falls, not zero.`]);
}
/* 04:1 — indirect-method CFO = NI + depreciation − ΔWC */
function b1_h041(rng){
  const ni = b1ri(rng, 1000, 3000, 100), dep = b1ri(rng, 200, 600, 100), dwc = b1ri(rng, 100, 500, 50);
  const cfo = ni + dep - dwc;
  return b1mk(rng,
    `NI Rp${b1f(ni)}rb, penyusutan Rp${b1f(dep)}rb, ΔWC +Rp${b1f(dwc)}rb (naik). CFO?`,
    ["Rp" + b1f(cfo) + "rb", "Rp" + b1f(ni + dep + dwc) + "rb", "Rp" + b1f(ni - dwc) + "rb", "Rp" + b1f(ni + dep) + "rb"],
    `${b1f(ni)} + ${b1f(dep)} − ${b1f(dwc)} = Rp${b1f(cfo)}rb. Jebakan: lupa add-back atau salah tanda ΔWC. (Hari 04 § Rekonsiliasi)`,
    ["Analysis: yang ditanya CFO metode tidak langsung; diketahui NI, penyusutan, ΔWC.",
     "Solve 1: rumus — CFO = NI + beban non-kas − kenaikan WC.",
     `Solve 2: substitusi → ${b1f(ni)} + ${b1f(dep)} − ${b1f(dwc)}.`,
     `Solve 3: hitung → Rp${b1f(cfo)}rb.`]);
}
function b1EN_h041(rng){
  const ni = b1ri(rng, 1000, 3000, 100), dep = b1ri(rng, 200, 600, 100), dwc = b1ri(rng, 100, 500, 50);
  const cfo = ni + dep - dwc;
  return b1mk(rng,
    `NI Rp${b1fe(ni)}k, depreciation Rp${b1fe(dep)}k, ΔWC +Rp${b1fe(dwc)}k (up). CFO?`,
    ["Rp" + b1fe(cfo) + "k", "Rp" + b1fe(ni + dep + dwc) + "k", "Rp" + b1fe(ni - dwc) + "k", "Rp" + b1fe(ni + dep) + "k"],
    `${b1fe(ni)} + ${b1fe(dep)} − ${b1fe(dwc)} = Rp${b1fe(cfo)}k. Traps: forgetting the add-back or flipping the ΔWC sign. (Day 04 § Reconciliation)`,
    ["Analysis: the question asks for indirect-method CFO; NI, depreciation, and ΔWC are known.",
     "Solve 1: the formula — CFO = NI + non-cash expenses − rise in WC.",
     `Solve 2: substitute → ${b1fe(ni)} + ${b1fe(dep)} − ${b1fe(dwc)}.`,
     `Solve 3: compute → Rp${b1fe(cfo)}k.`]);
}
/* 04:2 — capex is investing cash flow (CFI) */
function b1_h042(rng){
  const X = b1ri(rng, 1000, 5000, 500);
  return b1txt(rng,
    `Warung beli peralatan Rp${b1f(X)}rb tunai. Masuk seksi arus kas mana?`,
    [`Arus kas investasi (CFI) −Rp${b1f(X)}rb`,
     `Arus kas operasi (CFO) −Rp${b1f(X)}rb`,
     `Arus kas pendanaan (CFF) −Rp${b1f(X)}rb`,
     "Bukan arus kas — hanya tukar aset"], 0,
    `Capex = CFI negatif. Bukan CFO (bukan operasi harian) dan bukan CFF (bukan utang/modal). (Hari 04 § CFI & CFF)`,
    ["Analysis: yang ditanya seksi arus kas — beli peralatan itu aktivitas apa?",
     "Solve 1: peralatan = aset jangka panjang, bukan persediaan harian.",
     "Solve 2: pembelian aset jangka panjang = aktivitas investasi.",
     `Solve 3: CFI −Rp${b1f(X)}rb (kas keluar).`]);
}
function b1EN_h042(rng){
  const X = b1ri(rng, 1000, 5000, 500);
  return b1txt(rng,
    `A shop buys equipment for Rp${b1fe(X)}k cash. Which cash-flow section is it in?`,
    [`Investing cash flow (CFI) −Rp${b1fe(X)}k`,
     `Operating cash flow (CFO) −Rp${b1fe(X)}k`,
     `Financing cash flow (CFF) −Rp${b1fe(X)}k`,
     "Not a cash flow — just an asset swap"], 0,
    `Capex = negative CFI. Not CFO (not daily operations) and not CFF (not debt/equity). (Day 04 § CFI & CFF)`,
    ["Analysis: the question asks for the cash-flow section — what activity is buying equipment?",
     "Solve 1: equipment = a long-term asset, not daily inventory.",
     "Solve 2: buying long-term assets = an investing activity.",
     `Solve 3: CFI −Rp${b1fe(X)}k (cash out).`]);
}
/* 04:3 — healthy CFO can still coexist with falling cash (capex + dividends) */
function b1_h043(rng){
  const cfo = b1ri(rng, 1500, 3000, 50), cx = b1ri(rng, 1500, 3000, 100), dv = b1ri(rng, 2000, 4000, 100);
  const net = cfo - cx - dv;
  return b1txt(rng,
    `CFO +Rp${b1f(cfo)}rb tapi kas bersih turun Rp${b1f(-net)}rb. Penjelasan yang benar?`,
    ["CFO pasti salah hitung — ada rumus yang rusak",
     "Laba bersih tidak cukup menutup beban",
     "ΔWC seharusnya menambah kas, bukan mengurangi",
     `Capex Rp${b1f(cx)}rb + dividen Rp${b1f(dv)}rb menguras kas`], 3,
    `${b1f(cfo)} − ${b1f(cx)} − ${b1f(dv)} = ${b1f(net)}rb. Operasi sehat, tapi investasi + dividen menguras kas. (Hari 04 § CFI & CFF)`,
    ["Analysis: yang ditanya kenapa kas turun padahal CFO positif — hitung semua seksi.",
     `Solve 1: kas bersih = CFO − capex − dividen = ${b1f(cfo)} − ${b1f(cx)} − ${b1f(dv)}.`,
     `Solve 2: hitung → ${b1f(net)}rb (negatif = kas berkurang).`,
     "Solve 3: CFO sehat tidak menjamin kas naik — CFI dan CFF bisa mengurasnya."]);
}
function b1EN_h043(rng){
  const cfo = b1ri(rng, 1500, 3000, 50), cx = b1ri(rng, 1500, 3000, 100), dv = b1ri(rng, 2000, 4000, 100);
  const net = cfo - cx - dv;
  return b1txt(rng,
    `CFO is +Rp${b1fe(cfo)}k yet net cash falls by Rp${b1fe(-net)}k. Which explanation is right?`,
    ["CFO must be miscalculated — some formula is broken",
     "Net income is not enough to cover expenses",
     "ΔWC should add cash, not reduce it",
     `Capex Rp${b1fe(cx)}k + dividends Rp${b1fe(dv)}k drain the cash`], 3,
    `${b1fe(cfo)} − ${b1fe(cx)} − ${b1fe(dv)} = ${b1fe(net)}k. Operations are healthy, but investing + dividends drain cash. (Day 04 § CFI & CFF)`,
    ["Analysis: the question asks why cash falls while CFO is positive — add up all sections.",
     `Solve 1: net cash = CFO − capex − dividends = ${b1fe(cfo)} − ${b1fe(cx)} − ${b1fe(dv)}.`,
     `Solve 2: compute → ${b1fe(net)}k (negative = cash falls).`,
     "Solve 3: healthy CFO does not guarantee rising cash — CFI and CFF can drain it."]);
}
/* 04:4 — FCFF = CFO − capex */
function b1_h044(rng){
  let cfo = b1ri(rng, 1000, 3000, 250), cx = b1ri(rng, 1500, 3500, 250), guard = 0;
  while (cfo - cx === 0 && guard++ < 60) cx = b1ri(rng, 1500, 3500, 250);
  const fcff = cfo - cx;
  return b1mk(rng,
    `CFO Rp${b1f(cfo)}rb, capex Rp${b1f(cx)}rb. FCFF?`,
    [b1rp(fcff, "rb"), "Rp" + b1f(cfo + cx) + "rb", "Rp" + b1f(cfo) + "rb", b1rp(cx - cfo, "rb")],
    `${b1f(cfo)} − ${b1f(cx)} = ${b1rp(fcff, "rb")}: warung menginvestasikan lebih dari kas operasinya — wajar saat ekspansi. (Hari 04 § FCFF)`,
    ["Analysis: yang ditanya FCFF; diketahui CFO & capex.",
     "Solve 1: rumus — FCFF = CFO − capex.",
     `Solve 2: substitusi → ${b1f(cfo)} − ${b1f(cx)}.`,
     `Solve 3: hitung → ${b1rp(fcff, "rb")}.`]);
}
function b1EN_h044(rng){
  let cfo = b1ri(rng, 1000, 3000, 250), cx = b1ri(rng, 1500, 3500, 250), guard = 0;
  while (cfo - cx === 0 && guard++ < 60) cx = b1ri(rng, 1500, 3500, 250);
  const fcff = cfo - cx;
  return b1mk(rng,
    `CFO Rp${b1fe(cfo)}k, capex Rp${b1fe(cx)}k. FCFF?`,
    [b1rpe(fcff, "k"), "Rp" + b1fe(cfo + cx) + "k", "Rp" + b1fe(cfo) + "k", b1rpe(cx - cfo, "k")],
    `${b1fe(cfo)} − ${b1fe(cx)} = ${b1rpe(fcff, "k")}: the shop invests more than its operating cash — normal while expanding. (Day 04 § FCFF)`,
    ["Analysis: the question asks for FCFF; CFO & capex are known.",
     "Solve 1: the formula — FCFF = CFO − capex.",
     `Solve 2: substitute → ${b1fe(cfo)} − ${b1fe(cx)}.`,
     `Solve 3: compute → ${b1rpe(fcff, "k")}.`]);
}

/* ================= hari-05 ================= */
/* 05:0 — buying equipment for cash is an asset swap: total assets unchanged */
function b1_h050(rng){
  const X = b1ri(rng, 1000, 4000, 500);
  return b1txt(rng,
    `Warung membeli peralatan Rp${b1f(X)}rb tunai. Dampak ke total aset?`,
    [`Tetap — kas −${b1f(X)}, PPE +${b1f(X)} (tukar aset)`,
     `Naik Rp${b1f(X)}rb karena ada aset baru`,
     `Turun Rp${b1f(X)}rb karena kas keluar`,
     `Naik Rp${b1f(2 * X)}rb (kas dan PPE sama-sama naik)`], 0,
    `Tukar aset: −${b1f(X)} kas, +${b1f(X)} PPE. Total aset tidak berubah. (Hari 05 § Capex & susut)`,
    ["Analysis: yang ditanya total aset — dua akun bergerak sekaligus?",
     `Solve 1: kas (aset) turun Rp${b1f(X)}rb.`,
     `Solve 2: PPE (aset) naik Rp${b1f(X)}rb.`,
     "Solve 3: −X + X = 0 — total aset tetap."]);
}
function b1EN_h050(rng){
  const X = b1ri(rng, 1000, 4000, 500);
  return b1txt(rng,
    `A shop buys equipment for Rp${b1fe(X)}k cash. What happens to total assets?`,
    [`Unchanged — cash −${b1fe(X)}, PPE +${b1fe(X)} (asset swap)`,
     `Up Rp${b1fe(X)}k because there is a new asset`,
     `Down Rp${b1fe(X)}k because cash leaves`,
     `Up Rp${b1fe(2 * X)}k (cash and PPE both rise)`], 0,
    `Asset swap: −${b1fe(X)} cash, +${b1fe(X)} PPE. Total assets are unchanged. (Day 05 § Capex & depreciation)`,
    ["Analysis: the question asks about total assets — do two accounts move at once?",
     `Solve 1: cash (asset) falls Rp${b1fe(X)}k.`,
     `Solve 2: PPE (asset) rises Rp${b1fe(X)}k.`,
     "Solve 3: −X + X = 0 — total assets stay the same."]);
}
/* 05:1 — depreciation cuts net PPE, not cash */
function b1_h051(rng){
  const X = b1ri(rng, 200, 800, 100);
  return b1txt(rng,
    `Penyusutan Rp${b1f(X)}rb tahun ini. Mana yang BENAR?`,
    [`Kas berkurang Rp${b1f(X)}rb`,
     `Aset tetap neto berkurang Rp${b1f(X)}rb; kas tidak bergerak`,
     `Laba ditahan bertambah Rp${b1f(X)}rb`,
     "Total aset tidak berubah"], 1,
    `Susut memotong PPE neto dan RE tanpa menyentuh kas — alasan ia di-add-back di CFO. (Hari 05 § Capex & susut)`,
    ["Analysis: yang ditanya efek penyusutan — akun apa yang bergerak?",
     `Solve 1: akumulasi penyusutan naik → PPE neto turun Rp${b1f(X)}rb.`,
     "Solve 2: tidak ada pembayaran tunai saat beban diakui.",
     "Solve 3: laba (dan RE) turun, kas diam — itulah beban non-kas."]);
}
function b1EN_h051(rng){
  const X = b1ri(rng, 200, 800, 100);
  return b1txt(rng,
    `Depreciation of Rp${b1fe(X)}k this year. Which statement is TRUE?`,
    [`Cash falls by Rp${b1fe(X)}k`,
     `Net fixed assets fall by Rp${b1fe(X)}k; cash does not move`,
     `Retained earnings rise by Rp${b1fe(X)}k`,
     "Total assets are unchanged"], 1,
    `Depreciation cuts net PPE and RE without touching cash — the reason it is added back in CFO. (Day 05 § Capex & depreciation)`,
    ["Analysis: the question asks what depreciation moves — which accounts change?",
     `Solve 1: accumulated depreciation rises → net PPE falls Rp${b1fe(X)}k.`,
     "Solve 2: no cash payment happens when the expense is recognised.",
     "Solve 3: profit (and RE) falls, cash stays put — that is a non-cash expense."]);
}
/* 05:2 — dividends never touch the income statement */
function b1_h052(rng){
  const X = b1ri(rng, 1000, 5000, 500);
  return b1txt(rng,
    `Dividen tunai Rp${b1f(X)}rb. Pernyataan yang benar?`,
    [`Beban di laporan laba rugi Rp${b1f(X)}rb`,
     `Kas −${b1f(X)} dan laba ditahan −${b1f(X)}; tidak lewat IS`,
     `Laba bersih turun Rp${b1f(X)}rb`,
     `Modal disetor berkurang Rp${b1f(X)}rb`], 1,
    `Dividen tidak pernah menyentuh IS: langsung kas −${b1f(X)}, RE −${b1f(X)}. (Hari 05 § Dividen)`,
    ["Analysis: yang ditanya efek dividen — apakah ia beban?",
     "Solve 1: dividen = pembagian laba, bukan biaya untuk menghasilkan laba.",
     `Solve 2: kas turun Rp${b1f(X)}rb; ekuitas (RE) turun Rp${b1f(X)}rb.`,
     "Solve 3: IS tidak tersentuh — laba bersih tetap."]);
}
function b1EN_h052(rng){
  const X = b1ri(rng, 1000, 5000, 500);
  return b1txt(rng,
    `Cash dividends of Rp${b1fe(X)}k. Which statement is true?`,
    [`An expense on the income statement of Rp${b1fe(X)}k`,
     `Cash −${b1fe(X)} and retained earnings −${b1fe(X)}; never via the IS`,
     `Net income falls by Rp${b1fe(X)}k`,
     `Paid-in capital falls by Rp${b1fe(X)}k`], 1,
    `Dividends never touch the IS: cash −${b1fe(X)}, RE −${b1fe(X)} directly. (Day 05 § Dividends)`,
    ["Analysis: the question asks about the effect of dividends — are they an expense?",
     "Solve 1: a dividend = a distribution of profit, not a cost of earning it.",
     `Solve 2: cash falls Rp${b1fe(X)}k; equity (RE) falls Rp${b1fe(X)}k.`,
     "Solve 3: the IS is untouched — net income stays the same."]);
}
/* 05:3 — closing total assets = sum of the four asset lines */
function b1_h053(rng){
  const kas = b1ri(rng, 3000, 6000, 50), piu = b1ri(rng, 800, 2000, 50), per = b1ri(rng, 700, 1500, 50), ppe = b1ri(rng, 2500, 4500, 100);
  const T = kas + piu + per + ppe;
  return b1mk(rng,
    `Total aset tutup 31 Des 2026? (Kas Rp${b1f(kas)}rb, piutang Rp${b1f(piu)}rb, persediaan Rp${b1f(per)}rb, PPE Rp${b1f(ppe)}rb)`,
    ["Rp" + b1f(T) + "rb", "Rp" + b1f(T + 1200) + "rb", "Rp" + b1f(T - 700) + "rb", "Rp" + b1f(T + 600) + "rb"],
    `${b1f(kas)} + ${b1f(piu)} + ${b1f(per)} + ${b1f(ppe)} = Rp${b1f(T)}rb. Jebakan: angka pembuka bukan angka tutup. (Hari 05 § Walk)`,
    ["Analysis: yang ditanya total aset TUTUP — jumlahkan keempat lini aset tutup.",
     `Solve 1: kas + piutang + persediaan + PPE.`,
     `Solve 2: substitusi → ${b1f(kas)} + ${b1f(piu)} + ${b1f(per)} + ${b1f(ppe)}.`,
     `Solve 3: hitung → Rp${b1f(T)}rb.`]);
}
function b1EN_h053(rng){
  const kas = b1ri(rng, 3000, 6000, 50), piu = b1ri(rng, 800, 2000, 50), per = b1ri(rng, 700, 1500, 50), ppe = b1ri(rng, 2500, 4500, 100);
  const T = kas + piu + per + ppe;
  return b1mk(rng,
    `Total closing assets on 31 Dec 2026? (Cash Rp${b1fe(kas)}k, receivables Rp${b1fe(piu)}k, inventory Rp${b1fe(per)}k, PPE Rp${b1fe(ppe)}k)`,
    ["Rp" + b1fe(T) + "k", "Rp" + b1fe(T + 1200) + "k", "Rp" + b1fe(T - 700) + "k", "Rp" + b1fe(T + 600) + "k"],
    `${b1fe(kas)} + ${b1fe(piu)} + ${b1fe(per)} + ${b1fe(ppe)} = Rp${b1fe(T)}k. Trap: the opening figure is not the closing figure. (Day 05 § Walk)`,
    ["Analysis: the question asks for CLOSING total assets — sum the four closing asset lines.",
     "Solve 1: cash + receivables + inventory + PPE.",
     `Solve 2: substitute → ${b1fe(kas)} + ${b1fe(piu)} + ${b1fe(per)} + ${b1fe(ppe)}.`,
     `Solve 3: compute → Rp${b1fe(T)}k.`]);
}
/* 05:4 — closing retained earnings = opening + NI − dividends */
function b1_h054(rng){
  let R0 = b1ri(rng, 1000, 2000, 100), ni = b1ri(rng, 1000, 2500, 100), D = b1ri(rng, 2000, 3500, 100), guard = 0;
  while ((R0 + ni - D <= 0 || R0 + ni - D === ni || R0 + ni - D === D) && guard++ < 60) D = b1ri(rng, 2000, 3500, 100);
  const RE = R0 + ni - D;
  return b1mk(rng,
    `Laba ditahan tutup 31 Des 2026? (Awal Rp${b1f(R0)}rb, laba bersih Rp${b1f(ni)}rb, dividen Rp${b1f(D)}rb)`,
    ["Rp" + b1f(RE) + "rb", "Rp" + b1f(R0 + ni) + "rb", "Rp" + b1f(ni) + "rb", "Rp" + b1f(D) + "rb"],
    `${b1f(R0)} + ${b1f(ni)} − ${b1f(D)} = Rp${b1f(RE)}rb. Jebakan: lupa kurangi dividen. (Hari 05 § Dividen)`,
    ["Analysis: yang ditanya RE tutup; diketahui RE awal, NI, dividen.",
     "Solve 1: rumus — RE(akhir) = RE(awal) + NI − Dividen.",
     `Solve 2: substitusi → ${b1f(R0)} + ${b1f(ni)} − ${b1f(D)}.`,
     `Solve 3: hitung → Rp${b1f(RE)}rb.`]);
}
function b1EN_h054(rng){
  let R0 = b1ri(rng, 1000, 2000, 100), ni = b1ri(rng, 1000, 2500, 100), D = b1ri(rng, 2000, 3500, 100), guard = 0;
  while ((R0 + ni - D <= 0 || R0 + ni - D === ni || R0 + ni - D === D) && guard++ < 60) D = b1ri(rng, 2000, 3500, 100);
  const RE = R0 + ni - D;
  return b1mk(rng,
    `Closing retained earnings on 31 Dec 2026? (Opening Rp${b1fe(R0)}k, net income Rp${b1fe(ni)}k, dividends Rp${b1fe(D)}k)`,
    ["Rp" + b1fe(RE) + "k", "Rp" + b1fe(R0 + ni) + "k", "Rp" + b1fe(ni) + "k", "Rp" + b1fe(D) + "k"],
    `${b1fe(R0)} + ${b1fe(ni)} − ${b1fe(D)} = Rp${b1fe(RE)}k. Trap: forgetting to subtract dividends. (Day 05 § Dividends)`,
    ["Analysis: the question asks for closing RE; opening RE, NI, and dividends are known.",
     "Solve 1: the formula — RE(end) = RE(start) + NI − Dividends.",
     `Solve 2: substitute → ${b1fe(R0)} + ${b1fe(ni)} − ${b1fe(D)}.`,
     `Solve 3: compute → Rp${b1fe(RE)}k.`]);
}

/* ================= hari-06 ================= */
/* 06:0 — RE roll-forward (golden check #3) */
function b1_h060(rng){
  let R0 = b1ri(rng, 1200, 2000, 100), ni = b1ri(rng, 1200, 2200, 100), D = b1ri(rng, 2500, 3500, 100), guard = 0;
  while ((R0 + ni - D <= 0 || R0 + ni - D === ni) && guard++ < 60) D = b1ri(rng, 2500, 3500, 100);
  const RE = R0 + ni - D;
  return b1mk(rng,
    `RE awal ${b1f(R0)}, NI ${b1f(ni)}, dividen ${b1f(D)}. RE akhir?`,
    ["Rp" + b1f(RE) + "rb", "Rp" + b1f(R0 + ni) + "rb", "Rp" + b1f(ni) + "rb", "Rp" + b1f(R0 + ni + D) + "rb"],
    `${b1f(R0)} + ${b1f(ni)} − ${b1f(D)} = Rp${b1f(RE)}rb. Golden check #3. (Hari 06 § Jembatan 1)`,
    ["Analysis: yang ditanya RE akhir; diketahui RE awal, NI, dividen.",
     "Solve 1: rumus — RE(akhir) = RE(awal) + NI − Dividen.",
     `Solve 2: substitusi → ${b1f(R0)} + ${b1f(ni)} − ${b1f(D)}.`,
     `Solve 3: hitung → Rp${b1f(RE)}rb.`]);
}
function b1EN_h060(rng){
  let R0 = b1ri(rng, 1200, 2000, 100), ni = b1ri(rng, 1200, 2200, 100), D = b1ri(rng, 2500, 3500, 100), guard = 0;
  while ((R0 + ni - D <= 0 || R0 + ni - D === ni) && guard++ < 60) D = b1ri(rng, 2500, 3500, 100);
  const RE = R0 + ni - D;
  return b1mk(rng,
    `Opening RE ${b1fe(R0)}, NI ${b1fe(ni)}, dividends ${b1fe(D)}. Ending RE?`,
    ["Rp" + b1fe(RE) + "k", "Rp" + b1fe(R0 + ni) + "k", "Rp" + b1fe(ni) + "k", "Rp" + b1fe(R0 + ni + D) + "k"],
    `${b1fe(R0)} + ${b1fe(ni)} − ${b1fe(D)} = Rp${b1fe(RE)}k. Golden check #3. (Day 06 § Bridge 1)`,
    ["Analysis: the question asks for ending RE; opening RE, NI, and dividends are known.",
     "Solve 1: the formula — RE(end) = RE(start) + NI − Dividends.",
     `Solve 2: substitute → ${b1fe(R0)} + ${b1fe(ni)} − ${b1fe(D)}.`,
     `Solve 3: compute → Rp${b1fe(RE)}k.`]);
}
/* 06:1 — PPE roll-forward */
function b1_h061(rng){
  const P0 = b1ri(rng, 1500, 3000, 100), cx = b1ri(rng, 1000, 3000, 100), dep = b1ri(rng, 200, 600, 50);
  const P1 = P0 + cx - dep;
  return b1mk(rng,
    `PPE neto awal ${b1f(P0)}, capex ${b1f(cx)}, susut ${b1f(dep)}. PPE neto akhir?`,
    ["Rp" + b1f(P1) + "rb", "Rp" + b1f(P0 + cx) + "rb", "Rp" + b1f(P0) + "rb", "Rp" + b1f(P0 + cx + dep) + "rb"],
    `${b1f(P0)} + ${b1f(cx)} − ${b1f(dep)} = Rp${b1f(P1)}rb. Jembatan 4 (roll-forward PPE). (Hari 06 § Jembatan 3 & 4)`,
    ["Analysis: yang ditanya PPE neto akhir; diketahui PPE awal, capex, susut.",
     "Solve 1: rumus — PPE(akhir) = PPE(awal) + capex − penyusutan.",
     `Solve 2: substitusi → ${b1f(P0)} + ${b1f(cx)} − ${b1f(dep)}.`,
     `Solve 3: hitung → Rp${b1f(P1)}rb.`]);
}
function b1EN_h061(rng){
  const P0 = b1ri(rng, 1500, 3000, 100), cx = b1ri(rng, 1000, 3000, 100), dep = b1ri(rng, 200, 600, 50);
  const P1 = P0 + cx - dep;
  return b1mk(rng,
    `Opening net PPE ${b1fe(P0)}, capex ${b1fe(cx)}, depreciation ${b1fe(dep)}. Closing net PPE?`,
    ["Rp" + b1fe(P1) + "k", "Rp" + b1fe(P0 + cx) + "k", "Rp" + b1fe(P0) + "k", "Rp" + b1fe(P0 + cx + dep) + "k"],
    `${b1fe(P0)} + ${b1fe(cx)} − ${b1fe(dep)} = Rp${b1fe(P1)}k. Bridge 4 (PPE roll-forward). (Day 06 § Bridges 3 & 4)`,
    ["Analysis: the question asks for closing net PPE; opening PPE, capex, and depreciation are known.",
     "Solve 1: the formula — PPE(end) = PPE(start) + capex − depreciation.",
     `Solve 2: substitute → ${b1fe(P0)} + ${b1fe(cx)} − ${b1fe(dep)}.`,
     `Solve 3: compute → Rp${b1fe(P1)}k.`]);
}
/* 06:2 — opening working capital = AR + inventory − payables */
function b1_h062(rng){
  const ar = b1ri(rng, 800, 2000, 100), inv = b1ri(rng, 500, 1500, 100), ap = b1ri(rng, 300, 900, 100);
  const dwc = b1ri(rng, 100, 400, 50);
  const WC0 = ar + inv - ap, WC1 = WC0 + dwc;
  return b1mk(rng,
    `WC awal = piutang ${b1f(ar)} + persediaan ${b1f(inv)} − utang ${b1f(ap)}?`,
    ["Rp" + b1f(WC0) + "rb", "Rp" + b1f(WC1) + "rb", "Rp" + b1f(ar + inv) + "rb", "Rp" + b1f(ar + inv + ap) + "rb"],
    `Rp${b1f(WC0)}rb. WC tutup ${b1f(WC1)} → ΔWC +${b1f(dwc)} (golden check #4). Jebakan: ${b1f(WC1)} = WC TUTUP. (Hari 06 § Jembatan 3 & 4)`,
    ["Analysis: yang ditanya WC AWAL; diketahui piutang, persediaan, utang awal.",
     "Solve 1: rumus — WC = Piutang + Persediaan − Utang usaha.",
     `Solve 2: substitusi → ${b1f(ar)} + ${b1f(inv)} − ${b1f(ap)}.`,
     `Solve 3: hitung → Rp${b1f(WC0)}rb.`]);
}
function b1EN_h062(rng){
  const ar = b1ri(rng, 800, 2000, 100), inv = b1ri(rng, 500, 1500, 100), ap = b1ri(rng, 300, 900, 100);
  const dwc = b1ri(rng, 100, 400, 50);
  const WC0 = ar + inv - ap, WC1 = WC0 + dwc;
  return b1mk(rng,
    `Opening WC = receivables ${b1fe(ar)} + inventory ${b1fe(inv)} − payables ${b1fe(ap)}?`,
    ["Rp" + b1fe(WC0) + "k", "Rp" + b1fe(WC1) + "k", "Rp" + b1fe(ar + inv) + "k", "Rp" + b1fe(ar + inv + ap) + "k"],
    `Rp${b1fe(WC0)}k. Closing WC ${b1fe(WC1)} → ΔWC +${b1fe(dwc)} (golden check #4). Trap: ${b1fe(WC1)} is the CLOSING WC. (Day 06 § Bridges 3 & 4)`,
    ["Analysis: the question asks for OPENING WC; opening receivables, inventory, and payables are known.",
     "Solve 1: the formula — WC = Receivables + Inventory − Trade payables.",
     `Solve 2: substitute → ${b1fe(ar)} + ${b1fe(inv)} − ${b1fe(ap)}.`,
     `Solve 3: compute → Rp${b1fe(WC0)}k.`]);
}
/* 06:3 — cash tie-out: BS cash = CFS ending cash */
function b1_h063(rng){
  const X = b1ri(rng, 3000, 6000, 50);
  return b1txt(rng,
    `Kas neraca tutup ${b1f(X)} = kas akhir arus kas ${b1f(X)}. Artinya?`,
    ["Jembatan 2 lolos — model konsisten",
     "Kebetulan; dua angka ini tidak harus sama",
     "Salah satu pasti salah hitung",
     "Hanya berlaku bila tidak ada dividen"], 0,
    `Tie-out 0 = golden check #2 lolos. Kas tidak punya estimasi — selisih Rp1 pun tidak ditoleransi. (Hari 06 § Jembatan 2)`,
    ["Analysis: yang ditanya arti angka kas yang SAMA dari dua laporan.",
     "Solve 1: kas neraca dihitung dari A = L + E; kas akhir CFS dari arus kas.",
     "Solve 2: dua jalur independen menghasilkan angka yang sama.",
     "Solve 3: selisih 0 = Jembatan 2 lolos, model konsisten."]);
}
function b1EN_h063(rng){
  const X = b1ri(rng, 3000, 6000, 50);
  return b1txt(rng,
    `Balance-sheet closing cash ${b1fe(X)} equals cash-flow ending cash ${b1fe(X)}. What does that mean?`,
    ["Bridge 2 passes — the model is consistent",
     "Coincidence; the two numbers need not match",
     "One of them must be miscalculated",
     "Only true when there are no dividends"], 0,
    `Tie-out of 0 = golden check #2 passes. Cash has no estimates — even a Rp1 gap is not tolerated. (Day 06 § Bridge 2)`,
    ["Analysis: the question asks what it means when cash matches from two statements.",
     "Solve 1: balance-sheet cash comes from A = L + E; ending CFS cash comes from cash flows.",
     "Solve 2: two independent paths produce the same number.",
     "Solve 3: a gap of 0 = Bridge 2 passes, the model is consistent."]);
}
/* 06:4 — one dividend, two statements, zero IS effect */
function b1_h064(rng){
  const X = b1ri(rng, 1000, 4000, 250);
  return b1txt(rng,
    `Dividen Rp${b1f(X)}rb: efek ke 3 laporan?`,
    [`IS: beban −${b1f(X)}; BS: RE −${b1f(X)}; CFS: CFF −${b1f(X)}`,
     `IS: tidak ada efek; BS: kas & RE −${b1f(X)}; CFS: CFF −${b1f(X)}`,
     `IS: laba turun ${b1f(X)}; BS: modal −${b1f(X)}`,
     `CFS: CFO −${b1f(X)}; lainnya tidak berubah`], 1,
    `Satu keputusan, dua laporan, nol efek di IS. RE −${b1f(X)} harus = CFF −${b1f(X)}. (Hari 06 § Dividen)`,
    ["Analysis: yang ditanya efek dividen ke IS, BS, CFS sekaligus.",
     "Solve 1: dividen bukan beban → IS tidak tersentuh.",
     `Solve 2: kas −${b1f(X)} dan RE −${b1f(X)} di BS.`,
     `Solve 3: CFS mencatatnya di CFF −${b1f(X)} — bukan CFO.`]);
}
function b1EN_h064(rng){
  const X = b1ri(rng, 1000, 4000, 250);
  return b1txt(rng,
    `A dividend of Rp${b1fe(X)}k: what is its effect on the 3 statements?`,
    [`IS: expense −${b1fe(X)}; BS: RE −${b1fe(X)}; CFS: CFF −${b1fe(X)}`,
     `IS: no effect; BS: cash & RE −${b1fe(X)}; CFS: CFF −${b1fe(X)}`,
     `IS: profit falls ${b1fe(X)}; BS: capital −${b1fe(X)}`,
     `CFS: CFO −${b1fe(X)}; nothing else changes`], 1,
    `One decision, two statements, zero IS effect. RE −${b1fe(X)} must equal CFF −${b1fe(X)}. (Day 06 § Dividends)`,
    ["Analysis: the question asks for the dividend's effect on the IS, BS, and CFS together.",
     "Solve 1: a dividend is not an expense → the IS is untouched.",
     `Solve 2: cash −${b1fe(X)} and RE −${b1fe(X)} on the BS.`,
     `Solve 3: the CFS records it in CFF −${b1fe(X)} — not CFO.`]);
}

/* ================= hari-07 ================= */
/* 07:0 — retained earnings from the balance sheet: RE = A − L − paid-in capital */
function b1_h070(rng){
  let A = b1ri(rng, 6000, 12000, 100), L = b1ri(rng, 400, 1200, 100), M = b1ri(rng, 3000, 7000, 100), guard = 0;
  while (A - L - M <= 0 && guard++ < 60) A = b1ri(rng, 6000, 12000, 100);
  const RE = A - L - M;
  return b1mk(rng,
    `Neraca Kios Rina: total aset Rp${b1f(A)}rb, utang usaha Rp${b1f(L)}rb, modal disetor Rp${b1f(M)}rb. Laba ditahan?`,
    ["Rp" + b1f(RE) + "rb", "Rp" + b1f(A) + "rb", "Rp" + b1f(A - L) + "rb", "Rp" + b1f(A - M) + "rb"],
    `RE = ${b1f(A)} − ${b1f(L)} − ${b1f(M)} = Rp${b1f(RE)}rb. Jebakan: ${b1f(A)} = total aset, bukan RE.`,
    ["Analysis: yang ditanya RE; diketahui total aset, utang, modal disetor.",
     "Solve 1: A = L + E, dan E = Modal disetor + RE.",
     `Solve 2: RE = A − L − Modal = ${b1f(A)} − ${b1f(L)} − ${b1f(M)}.`,
     `Solve 3: hitung → Rp${b1f(RE)}rb.`]);
}
function b1EN_h070(rng){
  let A = b1ri(rng, 6000, 12000, 100), L = b1ri(rng, 400, 1200, 100), M = b1ri(rng, 3000, 7000, 100), guard = 0;
  while (A - L - M <= 0 && guard++ < 60) A = b1ri(rng, 6000, 12000, 100);
  const RE = A - L - M;
  return b1mk(rng,
    `Rina's Kiosk balance sheet: total assets Rp${b1fe(A)}k, trade payables Rp${b1fe(L)}k, paid-in capital Rp${b1fe(M)}k. Retained earnings?`,
    ["Rp" + b1fe(RE) + "k", "Rp" + b1fe(A) + "k", "Rp" + b1fe(A - L) + "k", "Rp" + b1fe(A - M) + "k"],
    `RE = ${b1fe(A)} − ${b1fe(L)} − ${b1fe(M)} = Rp${b1fe(RE)}k. Trap: ${b1fe(A)} is total assets, not RE.`,
    ["Analysis: the question asks for RE; total assets, payables, and paid-in capital are known.",
     "Solve 1: A = L + E, and E = Paid-in capital + RE.",
     `Solve 2: RE = A − L − Capital = ${b1fe(A)} − ${b1fe(L)} − ${b1fe(M)}.`,
     `Solve 3: compute → Rp${b1fe(RE)}k.`]);
}
/* 07:1 — cash salary: assets down, equity down (via profit) */
function b1_h071(rng){
  const X = b1ri(rng, 1000, 3000, 250);
  return b1txt(rng,
    `Beban gaji Rp${b1f(X)}rb dibayar tunai. Dampak ke persamaan A = L + E?`,
    [`Aset −${b1f(X)}, liabilitas −${b1f(X)}`,
     `Aset −${b1f(X)} (kas), ekuitas −${b1f(X)} (via laba)`,
     `Aset tetap, liabilitas +${b1f(X)}`,
     "Tidak ada dampak — gaji bukan transaksi"], 1,
    `Kas −${b1f(X)} (aset); NI −${b1f(X)} → RE −${b1f(X)} (ekuitas). Dua sisi turun.`,
    ["Analysis: yang ditanya dampak ke A = L + E — akun apa bergerak?",
     `Solve 1: kas keluar Rp${b1f(X)}rb → aset turun.`,
     `Solve 2: beban gaji memotong laba → RE (ekuitas) turun Rp${b1f(X)}rb.`,
     "Solve 3: kedua sisi turun sama besar — persamaan tetap balance."]);
}
function b1EN_h071(rng){
  const X = b1ri(rng, 1000, 3000, 250);
  return b1txt(rng,
    `A salary expense of Rp${b1fe(X)}k is paid in cash. What happens to A = L + E?`,
    [`Assets −${b1fe(X)}, liabilities −${b1fe(X)}`,
     `Assets −${b1fe(X)} (cash), equity −${b1fe(X)} (via profit)`,
     `Assets unchanged, liabilities +${b1fe(X)}`,
     "No effect — salary is not a transaction"], 1,
    `Cash −${b1fe(X)} (asset); NI −${b1fe(X)} → RE −${b1fe(X)} (equity). Both sides fall.`,
    ["Analysis: the question asks about the effect on A = L + E — which accounts move?",
     `Solve 1: cash leaves Rp${b1fe(X)}k → assets fall.`,
     `Solve 2: the salary expense cuts profit → RE (equity) falls Rp${b1fe(X)}k.`,
     "Solve 3: both sides fall by the same amount — the equation stays balanced."]);
}
/* 07:2 — gross margin = (Revenue − COGS) ÷ Revenue */
function b1_h072(rng){
  let rev = b1ri(rng, 10000, 30000, 1000), m = b1ri(rng, 30, 60, 5), guard = 0;
  while (new Set([m, 100 - m, m + 10, m - 10]).size < 4 && guard++ < 60) m = b1ri(rng, 30, 60, 5);
  const cogs = rev * (100 - m) / 100;
  return b1mk(rng,
    `Revenue Rp${b1f(rev)}rb, COGS Rp${b1f(cogs)}rb. Gross margin?`,
    [b1f(m) + "%", b1f(100 - m) + "%", b1f(m + 10) + "%", b1f(m - 10) + "%"],
    `(${b1f(rev)} − ${b1f(cogs)}) ÷ ${b1f(rev)} = ${b1f(m)}%.`,
    ["Analysis: yang ditanya gross margin; diketahui revenue & COGS.",
     "Solve 1: rumus — Margin = (Revenue − COGS) ÷ Revenue.",
     `Solve 2: substitusi → (${b1f(rev)} − ${b1f(cogs)}) ÷ ${b1f(rev)}.`,
     `Solve 3: hitung → ${b1f(m)}%.`]);
}
function b1EN_h072(rng){
  let rev = b1ri(rng, 10000, 30000, 1000), m = b1ri(rng, 30, 60, 5), guard = 0;
  while (new Set([m, 100 - m, m + 10, m - 10]).size < 4 && guard++ < 60) m = b1ri(rng, 30, 60, 5);
  const cogs = rev * (100 - m) / 100;
  return b1mk(rng,
    `Revenue Rp${b1fe(rev)}k, COGS Rp${b1fe(cogs)}k. Gross margin?`,
    [b1fe(m) + "%", b1fe(100 - m) + "%", b1fe(m + 10) + "%", b1fe(m - 10) + "%"],
    `(${b1fe(rev)} − ${b1fe(cogs)}) ÷ ${b1fe(rev)} = ${b1fe(m)}%.`,
    ["Analysis: the question asks for gross margin; revenue & COGS are known.",
     "Solve 1: the formula — Margin = (Revenue − COGS) ÷ Revenue.",
     `Solve 2: substitute → (${b1fe(rev)} − ${b1fe(cogs)}) ÷ ${b1fe(rev)}.`,
     `Solve 3: compute → ${b1fe(m)}%.`]);
}
/* 07:3 — operating leverage: fixed cost stays, so Δprofit = Δrevenue × (1 − variable %) */
function b1_h073(rng){
  let dRev = b1ri(rng, 1000, 4000, 500), v = b1ri(rng, 40, 70, 10), guard = 0;
  while ((v === 50 || dRev * (100 - v) / 100 === dRev * v / 100) && guard++ < 60) v = b1ri(rng, 40, 70, 10);
  const dP = dRev * (100 - v) / 100;
  return b1mk(rng,
    `Biaya tetap Rp${b1f(b1ri(rng, 4000, 8000, 1000))}rb. Revenue naik Rp${b1f(dRev)}rb, biaya variabel ${b1f(v)}% dari revenue. Kenaikan laba bersih?`,
    ["Rp" + b1f(dP) + "rb", "Rp" + b1f(dRev) + "rb", "Rp" + b1f(dRev * v / 100) + "rb", "Rp" + b1f(dP / 2) + "rb"],
    `Δlaba = ${b1f(dRev)} − ${b1f(v)}%×${b1f(dRev)} = Rp${b1f(dP)}rb. Biaya tetap diam = operating leverage.`,
    ["Analysis: yang ditanya kenaikan laba; biaya tetap tidak bergerak.",
     "Solve 1: kenaikan biaya variabel = v% × Δrevenue.",
     `Solve 2: Δlaba = Δrevenue − biaya variabel = ${b1f(dRev)} − ${b1f(dRev * v / 100)}.`,
     `Solve 3: hitung → Rp${b1f(dP)}rb.`]);
}
function b1EN_h073(rng){
  let dRev = b1ri(rng, 1000, 4000, 500), v = b1ri(rng, 40, 70, 10), guard = 0;
  while ((v === 50 || dRev * (100 - v) / 100 === dRev * v / 100) && guard++ < 60) v = b1ri(rng, 40, 70, 10);
  const dP = dRev * (100 - v) / 100;
  const fc = b1ri(rng, 4000, 8000, 1000);
  return b1mk(rng,
    `Fixed cost Rp${b1fe(fc)}k. Revenue rises by Rp${b1fe(dRev)}k, variable cost is ${b1fe(v)}% of revenue. How much does net profit rise?`,
    ["Rp" + b1fe(dP) + "k", "Rp" + b1fe(dRev) + "k", "Rp" + b1fe(dRev * v / 100) + "k", "Rp" + b1fe(dP / 2) + "k"],
    `Δprofit = ${b1fe(dRev)} − ${b1fe(v)}%×${b1fe(dRev)} = Rp${b1fe(dP)}k. Fixed cost stays put = operating leverage.`,
    ["Analysis: the question asks how much profit rises; fixed cost does not move.",
     "Solve 1: the rise in variable cost = v% × Δrevenue.",
     `Solve 2: Δprofit = Δrevenue − variable cost = ${b1fe(dRev)} − ${b1fe(dRev * v / 100)}.`,
     `Solve 3: compute → Rp${b1fe(dP)}k.`]);
}
/* 07:4 — working capital = AR + inventory − payables */
function b1_h074(rng){
  const ar = b1ri(rng, 1000, 2500, 100), inv = b1ri(rng, 800, 1800, 100), ap = b1ri(rng, 500, 1200, 100);
  const wc = ar + inv - ap;
  return b1mk(rng,
    `Piutang Rp${b1f(ar)}rb, persediaan Rp${b1f(inv)}rb, utang usaha Rp${b1f(ap)}rb. Working capital?`,
    ["Rp" + b1f(wc) + "rb", "Rp" + b1f(ar + inv) + "rb", "Rp" + b1f(ar + inv + ap) + "rb", "Rp" + b1f(ap) + "rb"],
    `${b1f(ar)} + ${b1f(inv)} − ${b1f(ap)} = Rp${b1f(wc)}rb.`,
    ["Analysis: yang ditanya WC; diketahui piutang, persediaan, utang usaha.",
     "Solve 1: rumus — WC = Piutang + Persediaan − Utang usaha.",
     `Solve 2: substitusi → ${b1f(ar)} + ${b1f(inv)} − ${b1f(ap)}.`,
     `Solve 3: hitung → Rp${b1f(wc)}rb.`]);
}
function b1EN_h074(rng){
  const ar = b1ri(rng, 1000, 2500, 100), inv = b1ri(rng, 800, 1800, 100), ap = b1ri(rng, 500, 1200, 100);
  const wc = ar + inv - ap;
  return b1mk(rng,
    `Receivables Rp${b1fe(ar)}k, inventory Rp${b1fe(inv)}k, trade payables Rp${b1fe(ap)}k. Working capital?`,
    ["Rp" + b1fe(wc) + "k", "Rp" + b1fe(ar + inv) + "k", "Rp" + b1fe(ar + inv + ap) + "k", "Rp" + b1fe(ap) + "k"],
    `${b1fe(ar)} + ${b1fe(inv)} − ${b1fe(ap)} = Rp${b1fe(wc)}k.`,
    ["Analysis: the question asks for WC; receivables, inventory, and trade payables are known.",
     "Solve 1: the formula — WC = Receivables + Inventory − Trade payables.",
     `Solve 2: substitute → ${b1fe(ar)} + ${b1fe(inv)} − ${b1fe(ap)}.`,
     `Solve 3: compute → Rp${b1fe(wc)}k.`]);
}
/* 07:5 — CCC = DSO + DIO − DPO */
function b1_h075(rng){
  let dso = b1ri(rng, 20, 50, 5), dio = b1ri(rng, 30, 60, 5), dpo = b1ri(rng, 10, 40, 5), guard = 0;
  while ((dso + dio - dpo <= 0 || new Set([dso + dio - dpo, dso + dio + dpo, dso + dio, dso + dpo]).size < 4) && guard++ < 60)
    { dso = b1ri(rng, 20, 50, 5); dio = b1ri(rng, 30, 60, 5); dpo = b1ri(rng, 10, 40, 5); }
  const ccc = dso + dio - dpo;
  return b1mk(rng,
    `DSO ${b1f(dso)} hari, DIO ${b1f(dio)} hari, DPO ${b1f(dpo)} hari (1 tahun = 360 hari). Cash conversion cycle?`,
    [b1f(ccc) + " hari", b1f(dso + dio + dpo) + " hari", b1f(dso + dio) + " hari", b1f(dso + dpo) + " hari"],
    `${b1f(dso)} + ${b1f(dio)} − ${b1f(dpo)} = ${b1f(ccc)} hari.`,
    ["Analysis: yang ditanya CCC; diketahui DSO, DIO, DPO.",
     "Solve 1: rumus — CCC = DSO + DIO − DPO.",
     `Solve 2: substitusi → ${b1f(dso)} + ${b1f(dio)} − ${b1f(dpo)}.`,
     `Solve 3: hitung → ${b1f(ccc)} hari kas terperangkap di operasi.`]);
}
function b1EN_h075(rng){
  let dso = b1ri(rng, 20, 50, 5), dio = b1ri(rng, 30, 60, 5), dpo = b1ri(rng, 10, 40, 5), guard = 0;
  while ((dso + dio - dpo <= 0 || new Set([dso + dio - dpo, dso + dio + dpo, dso + dio, dso + dpo]).size < 4) && guard++ < 60)
    { dso = b1ri(rng, 20, 50, 5); dio = b1ri(rng, 30, 60, 5); dpo = b1ri(rng, 10, 40, 5); }
  const ccc = dso + dio - dpo;
  return b1mk(rng,
    `DSO ${b1fe(dso)} days, DIO ${b1fe(dio)} days, DPO ${b1fe(dpo)} days (1 year = 360 days). Cash conversion cycle?`,
    [b1fe(ccc) + " days", b1fe(dso + dio + dpo) + " days", b1fe(dso + dio) + " days", b1fe(dso + dpo) + " days"],
    `${b1fe(dso)} + ${b1fe(dio)} − ${b1fe(dpo)} = ${b1fe(ccc)} days.`,
    ["Analysis: the question asks for the CCC; DSO, DIO, and DPO are known.",
     "Solve 1: the formula — CCC = DSO + DIO − DPO.",
     `Solve 2: substitute → ${b1fe(dso)} + ${b1fe(dio)} − ${b1fe(dpo)}.`,
     `Solve 3: compute → ${b1fe(ccc)} days of cash trapped in operations.`]);
}
/* 07:6 — indirect CFO */
function b1_h076(rng){
  const ni = b1ri(rng, 1500, 3000, 100), dep = b1ri(rng, 300, 700, 100), dwc = b1ri(rng, 100, 500, 50);
  const cfo = ni + dep - dwc;
  return b1mk(rng,
    `Laba bersih Rp${b1f(ni)}rb, penyusutan Rp${b1f(dep)}rb, kenaikan WC Rp${b1f(dwc)}rb. Arus kas operasi (metode tidak langsung)?`,
    ["Rp" + b1f(cfo) + "rb", "Rp" + b1f(ni + dep + dwc) + "rb", "Rp" + b1f(ni - dwc) + "rb", "Rp" + b1f(ni + dep) + "rb"],
    `${b1f(ni)} + ${b1f(dep)} − ${b1f(dwc)} = Rp${b1f(cfo)}rb.`,
    ["Analysis: yang ditanya CFO metode tidak langsung; diketahui NI, penyusutan, kenaikan WC.",
     "Solve 1: rumus — CFO = NI + beban non-kas − kenaikan WC.",
     `Solve 2: substitusi → ${b1f(ni)} + ${b1f(dep)} − ${b1f(dwc)}.`,
     `Solve 3: hitung → Rp${b1f(cfo)}rb.`]);
}
function b1EN_h076(rng){
  const ni = b1ri(rng, 1500, 3000, 100), dep = b1ri(rng, 300, 700, 100), dwc = b1ri(rng, 100, 500, 50);
  const cfo = ni + dep - dwc;
  return b1mk(rng,
    `Net income Rp${b1fe(ni)}k, depreciation Rp${b1fe(dep)}k, working capital rises by Rp${b1fe(dwc)}k. Operating cash flow (indirect method)?`,
    ["Rp" + b1fe(cfo) + "k", "Rp" + b1fe(ni + dep + dwc) + "k", "Rp" + b1fe(ni - dwc) + "k", "Rp" + b1fe(ni + dep) + "k"],
    `${b1fe(ni)} + ${b1fe(dep)} − ${b1fe(dwc)} = Rp${b1fe(cfo)}k.`,
    ["Analysis: the question asks for indirect-method CFO; NI, depreciation, and the WC rise are known.",
     "Solve 1: the formula — CFO = NI + non-cash expenses − rise in WC.",
     `Solve 2: substitute → ${b1fe(ni)} + ${b1fe(dep)} − ${b1fe(dwc)}.`,
     `Solve 3: compute → Rp${b1fe(cfo)}k.`]);
}
/* 07:7 — FCFF = CFO − capex */
function b1_h077(rng){
  let cfo = b1ri(rng, 1500, 3500, 100), cx = b1ri(rng, 800, 2500, 100), guard = 0;
  while (cfo - cx === 0 && guard++ < 60) cx = b1ri(rng, 800, 2500, 100);
  const fcff = cfo - cx;
  return b1mk(rng,
    `CFO Rp${b1f(cfo)}rb, belanja modal (capex) Rp${b1f(cx)}rb. FCFF?`,
    [b1rp(fcff, "rb"), "Rp" + b1f(cfo + cx) + "rb", b1rp(cx - cfo, "rb"), "Rp" + b1f(cfo) + "rb"],
    `${b1f(cfo)} − ${b1f(cx)} = ${b1rp(fcff, "rb")}.`,
    ["Analysis: yang ditanya FCFF; diketahui CFO & capex.",
     "Solve 1: rumus — FCFF = CFO − capex.",
     `Solve 2: substitusi → ${b1f(cfo)} − ${b1f(cx)}.`,
     `Solve 3: hitung → ${b1rp(fcff, "rb")}.`]);
}
function b1EN_h077(rng){
  let cfo = b1ri(rng, 1500, 3500, 100), cx = b1ri(rng, 800, 2500, 100), guard = 0;
  while (cfo - cx === 0 && guard++ < 60) cx = b1ri(rng, 800, 2500, 100);
  const fcff = cfo - cx;
  return b1mk(rng,
    `CFO Rp${b1fe(cfo)}k, capital expenditure (capex) Rp${b1fe(cx)}k. FCFF?`,
    [b1rpe(fcff, "k"), "Rp" + b1fe(cfo + cx) + "k", b1rpe(cx - cfo, "k"), "Rp" + b1fe(cfo) + "k"],
    `${b1fe(cfo)} − ${b1fe(cx)} = ${b1rpe(fcff, "k")}.`,
    ["Analysis: the question asks for FCFF; CFO & capex are known.",
     "Solve 1: the formula — FCFF = CFO − capex.",
     `Solve 2: substitute → ${b1fe(cfo)} − ${b1fe(cx)}.`,
     `Solve 3: compute → ${b1rpe(fcff, "k")}.`]);
}
/* 07:8 — RE roll-forward */
function b1_h078(rng){
  let R0 = b1ri(rng, 800, 1800, 100), ni = b1ri(rng, 1500, 3000, 100), D = b1ri(rng, 500, 1500, 100), guard = 0;
  while ((R0 + ni - D <= 0 || R0 + ni - D === ni) && guard++ < 60) D = b1ri(rng, 500, 1500, 100);
  const RE = R0 + ni - D;
  return b1mk(rng,
    `Laba ditahan awal Rp${b1f(R0)}rb, laba bersih Rp${b1f(ni)}rb, dividen Rp${b1f(D)}rb. Laba ditahan akhir?`,
    ["Rp" + b1f(RE) + "rb", "Rp" + b1f(R0 + ni) + "rb", "Rp" + b1f(ni - D) + "rb", "Rp" + b1f(R0 + ni + D) + "rb"],
    `${b1f(R0)} + ${b1f(ni)} − ${b1f(D)} = Rp${b1f(RE)}rb. Jebakan: lupa kurangi dividen.`,
    ["Analysis: yang ditanya RE akhir; diketahui RE awal, NI, dividen.",
     "Solve 1: rumus — RE(akhir) = RE(awal) + NI − Dividen.",
     `Solve 2: substitusi → ${b1f(R0)} + ${b1f(ni)} − ${b1f(D)}.`,
     `Solve 3: hitung → Rp${b1f(RE)}rb.`]);
}
function b1EN_h078(rng){
  let R0 = b1ri(rng, 800, 1800, 100), ni = b1ri(rng, 1500, 3000, 100), D = b1ri(rng, 500, 1500, 100), guard = 0;
  while ((R0 + ni - D <= 0 || R0 + ni - D === ni) && guard++ < 60) D = b1ri(rng, 500, 1500, 100);
  const RE = R0 + ni - D;
  return b1mk(rng,
    `Opening retained earnings Rp${b1fe(R0)}k, net income Rp${b1fe(ni)}k, dividends Rp${b1fe(D)}k. Ending retained earnings?`,
    ["Rp" + b1fe(RE) + "k", "Rp" + b1fe(R0 + ni) + "k", "Rp" + b1fe(ni - D) + "k", "Rp" + b1fe(R0 + ni + D) + "k"],
    `${b1fe(R0)} + ${b1fe(ni)} − ${b1fe(D)} = Rp${b1fe(RE)}k. Trap: forgetting to subtract dividends.`,
    ["Analysis: the question asks for ending RE; opening RE, NI, and dividends are known.",
     "Solve 1: the formula — RE(end) = RE(start) + NI − Dividends.",
     `Solve 2: substitute → ${b1fe(R0)} + ${b1fe(ni)} − ${b1fe(D)}.`,
     `Solve 3: compute → Rp${b1fe(RE)}k.`]);
}
/* 07:9 — PPE roll-forward */
function b1_h079(rng){
  const P0 = b1ri(rng, 2000, 4000, 100), cx = b1ri(rng, 800, 2000, 100), dep = b1ri(rng, 300, 700, 50);
  const P1 = P0 + cx - dep;
  return b1mk(rng,
    `PPE neto awal Rp${b1f(P0)}rb, beli peralatan Rp${b1f(cx)}rb, penyusutan Rp${b1f(dep)}rb. PPE neto akhir?`,
    ["Rp" + b1f(P1) + "rb", "Rp" + b1f(P0 + cx) + "rb", "Rp" + b1f(P0 - dep) + "rb", "Rp" + b1f(P0 + cx + dep) + "rb"],
    `${b1f(P0)} + ${b1f(cx)} − ${b1f(dep)} = Rp${b1f(P1)}rb.`,
    ["Analysis: yang ditanya PPE neto akhir; diketahui PPE awal, pembelian, susut.",
     "Solve 1: rumus — PPE(akhir) = PPE(awal) + capex − penyusutan.",
     `Solve 2: substitusi → ${b1f(P0)} + ${b1f(cx)} − ${b1f(dep)}.`,
     `Solve 3: hitung → Rp${b1f(P1)}rb.`]);
}
function b1EN_h079(rng){
  const P0 = b1ri(rng, 2000, 4000, 100), cx = b1ri(rng, 800, 2000, 100), dep = b1ri(rng, 300, 700, 50);
  const P1 = P0 + cx - dep;
  return b1mk(rng,
    `Opening net PPE Rp${b1fe(P0)}k, equipment bought Rp${b1fe(cx)}k, depreciation Rp${b1fe(dep)}k. Closing net PPE?`,
    ["Rp" + b1fe(P1) + "k", "Rp" + b1fe(P0 + cx) + "k", "Rp" + b1fe(P0 - dep) + "k", "Rp" + b1fe(P0 + cx + dep) + "k"],
    `${b1fe(P0)} + ${b1fe(cx)} − ${b1fe(dep)} = Rp${b1fe(P1)}k.`,
    ["Analysis: the question asks for closing net PPE; opening PPE, purchases, and depreciation are known.",
     "Solve 1: the formula — PPE(end) = PPE(start) + capex − depreciation.",
     `Solve 2: substitute → ${b1fe(P0)} + ${b1fe(cx)} − ${b1fe(dep)}.`,
     `Solve 3: compute → Rp${b1fe(P1)}k.`]);
}
/* 07:10 — cash tie-out (Bridge 2) */
function b1_h0710(rng){
  const X = b1ri(rng, 3500, 6500, 100);
  return b1txt(rng,
    `Kas di neraca Rp${b1f(X)}rb dan kas akhir laporan arus kas juga Rp${b1f(X)}rb. Kesimpulan?`,
    ["Tie-out 0 — Jembatan 2 lolos ✓",
     "Pasti ada kesalahan link",
     "Kas harusnya selalu beda",
     "Laba ditahan pasti salah"], 0,
    `Selisih 0 = Jembatan 2 lolos. Kas neraca dan kas akhir CF adalah angka yang sama dari dua jalur.`,
    ["Analysis: yang ditanya arti dua angka kas yang sama.",
     "Solve 1: kas neraca dari A = L + E; kas akhir CF dari arus kas.",
     "Solve 2: dua jalur independen, hasil sama.",
     "Solve 3: selisih 0 = Jembatan 2 lolos."]);
}
function b1EN_h0710(rng){
  const X = b1ri(rng, 3500, 6500, 100);
  return b1txt(rng,
    `Cash on the balance sheet is Rp${b1fe(X)}k and ending cash on the cash-flow statement is also Rp${b1fe(X)}k. What is the conclusion?`,
    ["Tie-out of 0 — Bridge 2 passes ✓",
     "There must be a broken link",
     "Cash should always differ",
     "Retained earnings must be wrong"], 0,
    `A gap of 0 = Bridge 2 passes. Balance-sheet cash and ending CF cash are the same number from two paths.`,
    ["Analysis: the question asks what two matching cash numbers mean.",
     "Solve 1: balance-sheet cash comes from A = L + E; ending CF cash comes from cash flows.",
     "Solve 2: two independent paths, same result.",
     "Solve 3: a gap of 0 = Bridge 2 passes."]);
}
/* 07:11 — ΔWC from the BS schedule must equal ΔWC used in the CFS */
function b1_h0711(rng){
  const X = b1ri(rng, 100, 500, 50);
  return b1txt(rng,
    `ΔWC dari schedule neraca = +${b1f(X)}; ΔWC yang dipakai di arus kas = +${b1f(X)}. Artinya?`,
    ["Salah satunya pasti salah hitung",
     "WC tidak memengaruhi kas",
     "Konsisten — angka sama dari dua jalur independen",
     "CFO pasti salah"], 2,
    `Angka yang sama dari dua jalur independen = konsisten. Beda = ada link yang putus.`,
    ["Analysis: yang ditanya arti ΔWC yang sama dari dua sumber.",
     "Solve 1: schedule neraca menghitung ΔWC dari saldo awal-akhir.",
     "Solve 2: arus kas memakai ΔWC yang sama untuk rekonsiliasi CFO.",
     "Solve 3: sama = konsisten; beda = ada link yang putus."]);
}
function b1EN_h0711(rng){
  const X = b1ri(rng, 100, 500, 50);
  return b1txt(rng,
    `ΔWC from the balance-sheet schedule = +${b1fe(X)}; ΔWC used in the cash-flow statement = +${b1fe(X)}. What does that mean?`,
    ["One of them must be miscalculated",
     "WC does not affect cash",
     "Consistent — the same number from two independent paths",
     "CFO must be wrong"], 2,
    `The same number from two independent paths = consistent. Different = a broken link.`,
    ["Analysis: the question asks what matching ΔWC from two sources means.",
     "Solve 1: the BS schedule computes ΔWC from opening-closing balances.",
     "Solve 2: the cash-flow statement uses the same ΔWC to reconcile CFO.",
     "Solve 3: matching = consistent; different = a broken link."]);
}
/* 07:12 — dividends do not affect net income */
function b1_h0712(rng){
  const X = b1ri(rng, 1000, 2500, 250);
  return b1txt(rng,
    `Dividen tunai Rp${b1f(X)}rb dibayar. Dampak ke laba bersih?`,
    [`Naik Rp${b1f(X)}rb`,
     "Tidak ada — dividen bukan beban",
     `Turun Rp${b1f(X)}rb`,
     `Turun Rp${b1f(X / 2)}rb`], 1,
    `Nol. Dividen langsung mengurangi kas dan laba ditahan — tidak menyentuh IS.`,
    ["Analysis: yang ditanya efek dividen ke laba bersih.",
     "Solve 1: laba bersih = revenue − beban; dividen bukan beban.",
     `Solve 2: kas −${b1f(X)} dan RE −${b1f(X)} — keduanya di BS.`,
     "Solve 3: IS tidak tersentuh → laba bersih tetap."]);
}
function b1EN_h0712(rng){
  const X = b1ri(rng, 1000, 2500, 250);
  return b1txt(rng,
    `Cash dividends of Rp${b1fe(X)}k are paid. What is the effect on net income?`,
    [`Up Rp${b1fe(X)}k`,
     "None — a dividend is not an expense",
     `Down Rp${b1fe(X)}k`,
     `Down Rp${b1fe(X / 2)}k`], 1,
    `Zero. Dividends directly reduce cash and retained earnings — they never touch the IS.`,
    ["Analysis: the question asks about the effect of dividends on net income.",
     "Solve 1: net income = revenue − expenses; a dividend is not an expense.",
     `Solve 2: cash −${b1fe(X)} and RE −${b1fe(X)} — both on the BS.`,
     "Solve 3: the IS is untouched → net income stays the same."]);
}
/* 07:13 — higher depreciation (no tax) leaves CFO unchanged: NI −X, add-back +X */
function b1_h0713(rng){
  const X = b1ri(rng, 50, 300, 50);
  return b1txt(rng,
    `Beban penyusutan naik Rp${b1f(X)}rb (tanpa pajak). Dampak ke arus kas operasi?`,
    [`Turun Rp${b1f(X)}rb`,
     `Naik Rp${b1f(X)}rb`,
     "Tetap — non-kas, di-add-back penuh",
     `Turun Rp${b1f(X / 2)}rb`], 2,
    `Tetap. NI turun ${b1f(X)}, add-back naik ${b1f(X)} — neto nol di CFO.`,
    ["Analysis: yang ditanya efek neto ke CFO — dua efek berlawanan?",
     `Solve 1: NI turun Rp${b1f(X)}rb karena beban naik.`,
     `Solve 2: add-back penyusutan naik Rp${b1f(X)}rb.`,
     "Solve 3: −X + X = 0 — CFO tetap."]);
}
function b1EN_h0713(rng){
  const X = b1ri(rng, 50, 300, 50);
  return b1txt(rng,
    `Depreciation expense rises by Rp${b1fe(X)}k (no tax). What happens to operating cash flow?`,
    [`It falls by Rp${b1fe(X)}k`,
     `It rises by Rp${b1fe(X)}k`,
     "Unchanged — non-cash, fully added back",
     `It falls by Rp${b1fe(X / 2)}k`], 2,
    `Unchanged. NI falls ${b1fe(X)}, the add-back rises ${b1fe(X)} — net zero in CFO.`,
    ["Analysis: the question asks for the net effect on CFO — two opposite effects?",
     `Solve 1: NI falls Rp${b1fe(X)}k because the expense rises.`,
     `Solve 2: the depreciation add-back rises Rp${b1fe(X)}k.`,
     "Solve 3: −X + X = 0 — CFO is unchanged."]);
}
/* 07:14 — dividends are financing cash flow */
function b1_h0714(rng){
  const X = b1ri(rng, 1000, 3000, 250), Y = b1ri(rng, 1000, 3000, 250), Z = b1ri(rng, 500, 2000, 250);
  return b1txt(rng,
    `Transaksi yang tercatat di arus kas PENDANAAN (CFF)?`,
    [`Bayar dividen tunai Rp${b1f(X)}rb`,
     `Beli peralatan tunai Rp${b1f(Y)}rb`,
     "Jual barang secara kredit",
     `Bayar gaji karyawan Rp${b1f(Z)}rb`], 0,
    `Bayar dividen = arus pendanaan. Beli peralatan = CFI; gaji = CFO; jual kredit = bukan kas.`,
    ["Analysis: yang ditanya transaksi CFF — mana yang terkait pendanaan (utang/modal)?",
     "Solve 1: dividen = pengembalian ke pemilik modal → pendanaan.",
     "Solve 2: beli peralatan = investasi; gaji = operasi.",
     "Solve 3: jual kredit belum ada kas yang bergerak."]);
}
function b1EN_h0714(rng){
  const X = b1ri(rng, 1000, 3000, 250), Y = b1ri(rng, 1000, 3000, 250), Z = b1ri(rng, 500, 2000, 250);
  return b1txt(rng,
    `Which transaction is recorded in FINANCING cash flow (CFF)?`,
    [`Paying cash dividends of Rp${b1fe(X)}k`,
     `Buying equipment for Rp${b1fe(Y)}k cash`,
     "Selling goods on credit",
     `Paying employee salaries of Rp${b1fe(Z)}k`], 0,
    `Paying dividends = financing flow. Buying equipment = CFI; salaries = CFO; selling on credit = no cash yet.`,
    ["Analysis: the question asks for the CFF transaction — which one relates to funding (debt/equity)?",
     "Solve 1: dividends = a return to the owners of capital → financing.",
     "Solve 2: buying equipment = investing; salaries = operating.",
     "Solve 3: selling on credit moves no cash yet."]);
}

/* ================= hari-08 ================= */
/* 08:0 — revenue next year = revenue × (1 + growth) */
function b1_h080(rng){
  const rev0 = b1ri(rng, 10000, 25000, 500), g = b1ri(rng, 5, 15, 1);
  const rev1 = rev0 * (100 + g) / 100;
  return b1mk(rng,
    `Revenue 2026 Rp${b1f(rev0)}rb, growth ${b1f(g)}%. Revenue 2027?`,
    ["Rp" + b1f(rev1) + "rb", "Rp" + b1f(rev0) + "rb", "Rp" + b1f(rev0 * (100 + 2 * g) / 100) + "rb", "Rp" + b1f(rev0 * (105 + g) / 100) + "rb"],
    `${b1f(rev0)} × ${(1 + g / 100).toFixed(2).replace(".", ",")} = Rp${b1f(rev1)}rb. Driver × asumsi, bukan tebakan.`,
    ["Analysis: yang ditanya revenue 2027; diketahui revenue 2026 & growth.",
     "Solve 1: rumus — Revenue(t+1) = Revenue(t) × (1 + g).",
     `Solve 2: substitusi → ${b1f(rev0)} × (1 + ${b1f(g)}%).`,
     `Solve 3: hitung → Rp${b1f(rev1)}rb.`]);
}
function b1EN_h080(rng){
  const rev0 = b1ri(rng, 10000, 25000, 500), g = b1ri(rng, 5, 15, 1);
  const rev1 = rev0 * (100 + g) / 100;
  return b1mk(rng,
    `Revenue 2026 Rp${b1fe(rev0)}k, growth ${b1fe(g)}%. Revenue 2027?`,
    ["Rp" + b1fe(rev1) + "k", "Rp" + b1fe(rev0) + "k", "Rp" + b1fe(rev0 * (100 + 2 * g) / 100) + "k", "Rp" + b1fe(rev0 * (105 + g) / 100) + "k"],
    `${b1fe(rev0)} × ${(1 + g / 100).toFixed(2)} = Rp${b1fe(rev1)}k. Driver × assumption, not a guess.`,
    ["Analysis: the question asks for 2027 revenue; 2026 revenue & growth are known.",
     "Solve 1: the formula — Revenue(t+1) = Revenue(t) × (1 + g).",
     `Solve 2: substitute → ${b1fe(rev0)} × (1 + ${b1fe(g)}%).`,
     `Solve 3: compute → Rp${b1fe(rev1)}k.`]);
}
/* 08:1 — PPE roll-forward (forecast year) */
function b1_h081(rng){
  const P0 = b1ri(rng, 3000, 5000, 100), cx = b1ri(rng, 1500, 3000, 100), dep = b1ri(rng, 400, 700, 50);
  const P1 = P0 + cx - dep;
  return b1mk(rng,
    `PPE neto awal Rp${b1f(P0)}rb, capex Rp${b1f(cx)}rb, susut Rp${b1f(dep)}rb. PPE neto akhir?`,
    ["Rp" + b1f(P1) + "rb", "Rp" + b1f(P0 + cx) + "rb", "Rp" + b1f(P0 - dep) + "rb", "Rp" + b1f(P0 + cx + dep) + "rb"],
    `${b1f(P0)} + ${b1f(cx)} − ${b1f(dep)} = Rp${b1f(P1)}rb.`,
    ["Analysis: yang ditanya PPE neto akhir; diketahui PPE awal, capex, susut.",
     "Solve 1: rumus — PPE(akhir) = PPE(awal) + capex − penyusutan.",
     `Solve 2: substitusi → ${b1f(P0)} + ${b1f(cx)} − ${b1f(dep)}.`,
     `Solve 3: hitung → Rp${b1f(P1)}rb.`]);
}
function b1EN_h081(rng){
  const P0 = b1ri(rng, 3000, 5000, 100), cx = b1ri(rng, 1500, 3000, 100), dep = b1ri(rng, 400, 700, 50);
  const P1 = P0 + cx - dep;
  return b1mk(rng,
    `Opening net PPE Rp${b1fe(P0)}k, capex Rp${b1fe(cx)}k, depreciation Rp${b1fe(dep)}k. Closing net PPE?`,
    ["Rp" + b1fe(P1) + "k", "Rp" + b1fe(P0 + cx) + "k", "Rp" + b1fe(P0 - dep) + "k", "Rp" + b1fe(P0 + cx + dep) + "k"],
    `${b1fe(P0)} + ${b1fe(cx)} − ${b1fe(dep)} = Rp${b1fe(P1)}k.`,
    ["Analysis: the question asks for closing net PPE; opening PPE, capex, and depreciation are known.",
     "Solve 1: the formula — PPE(end) = PPE(start) + capex − depreciation.",
     `Solve 2: substitute → ${b1fe(P0)} + ${b1fe(cx)} − ${b1fe(dep)}.`,
     `Solve 3: compute → Rp${b1fe(P1)}k.`]);
}
/* 08:2 — receivables from revenue and DSO: AR = daily revenue × DSO */
function b1_h082(rng){
  let k = b1ri(rng, 30, 80, 5), dso = b1ri(rng, 20, 45, 5), guard = 0;
  while (new Set([k * dso, k * (dso + 10), Math.round(360 * k / 10), k * (dso - 5)]).size < 4 && guard++ < 60) dso = b1ri(rng, 20, 45, 5);
  const rev = 360 * k, ar = k * dso;
  return b1mk(rng,
    `Revenue Rp${b1f(rev)}rb, DSO ${b1f(dso)} hari (1 tahun = 360 hari). Piutang 2027?`,
    ["Rp" + b1f(ar) + "rb", "Rp" + b1f(k * (dso + 10)) + "rb", "Rp" + b1f(Math.round(rev / 10)) + "rb", "Rp" + b1f(k * (dso - 5)) + "rb"],
    `${b1f(rev)} × ${b1f(dso)}/360 = Rp${b1f(ar)}rb.`,
    ["Analysis: yang ditanya piutang; diketahui revenue tahunan & DSO.",
     "Solve 1: revenue harian = revenue ÷ 360.",
     `Solve 2: piutang = revenue harian × DSO = ${b1f(k)} × ${b1f(dso)}.`,
     `Solve 3: hitung → Rp${b1f(ar)}rb.`]);
}
function b1EN_h082(rng){
  let k = b1ri(rng, 30, 80, 5), dso = b1ri(rng, 20, 45, 5), guard = 0;
  while (new Set([k * dso, k * (dso + 10), Math.round(360 * k / 10), k * (dso - 5)]).size < 4 && guard++ < 60) dso = b1ri(rng, 20, 45, 5);
  const rev = 360 * k, ar = k * dso;
  return b1mk(rng,
    `Revenue Rp${b1fe(rev)}k, DSO ${b1fe(dso)} days (1 year = 360 days). Receivables in 2027?`,
    ["Rp" + b1fe(ar) + "k", "Rp" + b1fe(k * (dso + 10)) + "k", "Rp" + b1fe(Math.round(rev / 10)) + "k", "Rp" + b1fe(k * (dso - 5)) + "k"],
    `${b1fe(rev)} × ${b1fe(dso)}/360 = Rp${b1fe(ar)}k.`,
    ["Analysis: the question asks for receivables; annual revenue & DSO are known.",
     "Solve 1: daily revenue = revenue ÷ 360.",
     `Solve 2: receivables = daily revenue × DSO = ${b1fe(k)} × ${b1fe(dso)}.`,
     `Solve 3: compute → Rp${b1fe(ar)}k.`]);
}
/* 08:3 — forecast CFO */
function b1_h083(rng){
  const ni = b1ri(rng, 1500, 2500, 25), dep = b1ri(rng, 400, 700, 25), dwc = b1ri(rng, 100, 400, 25);
  const cfo = ni + dep - dwc;
  return b1mk(rng,
    `NI Rp${b1f(ni)}rb, susut Rp${b1f(dep)}rb, ΔWC +Rp${b1f(dwc)}rb. CFO 2027?`,
    ["Rp" + b1f(cfo) + "rb", "Rp" + b1f(ni + dep + dwc) + "rb", "Rp" + b1f(ni - dwc) + "rb", "Rp" + b1f(ni + dep) + "rb"],
    `${b1f(ni)} + ${b1f(dep)} − ${b1f(dwc)} = Rp${b1f(cfo)}rb.`,
    ["Analysis: yang ditanya CFO 2027; diketahui NI, susut, ΔWC.",
     "Solve 1: rumus — CFO = NI + beban non-kas − kenaikan WC.",
     `Solve 2: substitusi → ${b1f(ni)} + ${b1f(dep)} − ${b1f(dwc)}.`,
     `Solve 3: hitung → Rp${b1f(cfo)}rb.`]);
}
function b1EN_h083(rng){
  const ni = b1ri(rng, 1500, 2500, 25), dep = b1ri(rng, 400, 700, 25), dwc = b1ri(rng, 100, 400, 25);
  const cfo = ni + dep - dwc;
  return b1mk(rng,
    `NI Rp${b1fe(ni)}k, depreciation Rp${b1fe(dep)}k, ΔWC +Rp${b1fe(dwc)}k. CFO in 2027?`,
    ["Rp" + b1fe(cfo) + "k", "Rp" + b1fe(ni + dep + dwc) + "k", "Rp" + b1fe(ni - dwc) + "k", "Rp" + b1fe(ni + dep) + "k"],
    `${b1fe(ni)} + ${b1fe(dep)} − ${b1fe(dwc)} = Rp${b1fe(cfo)}k.`,
    ["Analysis: the question asks for 2027 CFO; NI, depreciation, and ΔWC are known.",
     "Solve 1: the formula — CFO = NI + non-cash expenses − rise in WC.",
     `Solve 2: substitute → ${b1fe(ni)} + ${b1fe(dep)} − ${b1fe(dwc)}.`,
     `Solve 3: compute → Rp${b1fe(cfo)}k.`]);
}
/* 08:4 — ending cash = opening cash + CFO − capex − dividends */
function b1_h084(rng){
  let kas0 = b1ri(rng, 3500, 5500, 50), cfo = b1ri(rng, 1800, 3000, 50), cx = b1ri(rng, 1800, 3000, 50), dv = b1ri(rng, 1000, 2000, 50), guard = 0;
  while (kas0 + cfo - cx - dv <= 0 && guard++ < 60) dv = b1ri(rng, 1000, 2000, 50);
  const kas1 = kas0 + cfo - cx - dv;
  return b1mk(rng,
    `Kas awal Rp${b1f(kas0)}rb, CFO Rp${b1f(cfo)}rb, capex Rp${b1f(cx)}rb, dividen Rp${b1f(dv)}rb. Kas akhir 2027?`,
    ["Rp" + b1f(kas1) + "rb", "Rp" + b1f(kas0) + "rb", "Rp" + b1f(kas0 + cfo) + "rb", "Rp" + b1f(kas1 + 1000) + "rb"],
    `${b1f(kas0)} + (${b1f(cfo)} − ${b1f(cx)} − ${b1f(dv)}) = Rp${b1f(kas1)}rb.`,
    ["Analysis: yang ditanya kas akhir; diketahui kas awal, CFO, capex, dividen.",
     "Solve 1: rumus — Kas akhir = Kas awal + CFO − capex − dividen.",
     `Solve 2: substitusi → ${b1f(kas0)} + ${b1f(cfo)} − ${b1f(cx)} − ${b1f(dv)}.`,
     `Solve 3: hitung → Rp${b1f(kas1)}rb.`]);
}
function b1EN_h084(rng){
  let kas0 = b1ri(rng, 3500, 5500, 50), cfo = b1ri(rng, 1800, 3000, 50), cx = b1ri(rng, 1800, 3000, 50), dv = b1ri(rng, 1000, 2000, 50), guard = 0;
  while (kas0 + cfo - cx - dv <= 0 && guard++ < 60) dv = b1ri(rng, 1000, 2000, 50);
  const kas1 = kas0 + cfo - cx - dv;
  return b1mk(rng,
    `Opening cash Rp${b1fe(kas0)}k, CFO Rp${b1fe(cfo)}k, capex Rp${b1fe(cx)}k, dividends Rp${b1fe(dv)}k. Ending cash in 2027?`,
    ["Rp" + b1fe(kas1) + "k", "Rp" + b1fe(kas0) + "k", "Rp" + b1fe(kas0 + cfo) + "k", "Rp" + b1fe(kas1 + 1000) + "k"],
    `${b1fe(kas0)} + (${b1fe(cfo)} − ${b1fe(cx)} − ${b1fe(dv)}) = Rp${b1fe(kas1)}k.`,
    ["Analysis: the question asks for ending cash; opening cash, CFO, capex, and dividends are known.",
     "Solve 1: the formula — Ending cash = Opening cash + CFO − capex − dividends.",
     `Solve 2: substitute → ${b1fe(kas0)} + ${b1fe(cfo)} − ${b1fe(cx)} − ${b1fe(dv)}.`,
     `Solve 3: compute → Rp${b1fe(kas1)}k.`]);
}

/* ================= hari-09 ================= */
/* 09:0 — FCFF can be negative in an investment year */
function b1_h090(rng){
  let cfo = b1ri(rng, 1800, 2800, 100), cx = b1ri(rng, 2000, 3200, 100), guard = 0;
  while (cfo - cx === 0 && guard++ < 60) cx = b1ri(rng, 2000, 3200, 100);
  const fcff = cfo - cx;
  return b1mk(rng,
    `CFO Rp${b1f(cfo)}rb, capex Rp${b1f(cx)}rb. FCFF 2027?`,
    [b1rp(fcff, "rb"), "Rp" + b1f(cfo + cx) + "rb", "Rp" + b1f(cfo) + "rb", b1rp(cx - cfo, "rb")],
    `${b1f(cfo)} − ${b1f(cx)} = ${b1rp(fcff, "rb")}. Negatif = investasi melebihi kas operasi tahun ini.`,
    ["Analysis: yang ditanya FCFF; diketahui CFO & capex.",
     "Solve 1: rumus — FCFF = CFO − capex.",
     `Solve 2: substitusi → ${b1f(cfo)} − ${b1f(cx)}.`,
     `Solve 3: hitung → ${b1rp(fcff, "rb")}.`]);
}
function b1EN_h090(rng){
  let cfo = b1ri(rng, 1800, 2800, 100), cx = b1ri(rng, 2000, 3200, 100), guard = 0;
  while (cfo - cx === 0 && guard++ < 60) cx = b1ri(rng, 2000, 3200, 100);
  const fcff = cfo - cx;
  return b1mk(rng,
    `CFO Rp${b1fe(cfo)}k, capex Rp${b1fe(cx)}k. FCFF in 2027?`,
    [b1rpe(fcff, "k"), "Rp" + b1fe(cfo + cx) + "k", "Rp" + b1fe(cfo) + "k", b1rpe(cx - cfo, "k")],
    `${b1fe(cfo)} − ${b1fe(cx)} = ${b1rpe(fcff, "k")}. Negative = investment exceeds this year's operating cash.`,
    ["Analysis: the question asks for FCFF; CFO & capex are known.",
     "Solve 1: the formula — FCFF = CFO − capex.",
     `Solve 2: substitute → ${b1fe(cfo)} − ${b1fe(cx)}.`,
     `Solve 3: compute → ${b1rpe(fcff, "k")}.`]);
}
/* 09:1 — CAPM: CoE = Rf + beta × MRP */
function b1_h091(rng){
  const r1 = v => Math.round(v * 10) / 10;
  /* beta TIDAK BOLEH 1,0: beta=1 membuat CoE = Rf+MRP (opsi 2 = jawaban)
     dan Rf+beta×(MRP+2) = CoE+2 (opsi 3 = opsi 4) — dua duplikat sekaligus.
     Daftar eksplisit tanpa 1,0: by construction, bukan re-roll. */
  const rf = b1ri(rng, 50, 80, 5) / 10, beta = b1pick(rng, [0.8, 0.9, 1.1, 1.2, 1.3, 1.4, 1.5]), mrp = b1ri(rng, 50, 70, 5) / 10;
  const coe = r1(rf + beta * mrp);
  return b1mk(rng,
    `CAPM: Rf ${b1f(rf, 1)}%, beta ${b1f(beta, 1)}, MRP ${b1f(mrp, 1)}%. Cost of equity?`,
    [b1f(coe, 1) + "%", b1f(r1(rf + mrp), 1) + "%", b1f(r1(rf + beta * (mrp + 2)), 1) + "%", b1f(r1(coe + 2), 1) + "%"],
    `${b1f(rf, 1)}% + ${b1f(beta, 1)} × ${b1f(mrp, 1)}% = ${b1f(coe, 1)}%.`,
    ["Analysis: yang ditanya cost of equity (CAPM); diketahui Rf, beta, MRP.",
     "Solve 1: rumus — CoE = Rf + beta × MRP.",
     `Solve 2: substitusi → ${b1f(rf, 1)}% + ${b1f(beta, 1)} × ${b1f(mrp, 1)}%.`,
     `Solve 3: hitung → ${b1f(coe, 1)}%.`]);
}
function b1EN_h091(rng){
  const r1 = v => Math.round(v * 10) / 10;
  /* beta TIDAK BOLEH 1,0 — lihat b1_h091: beta=1 membuat dua duplikat. */
  const rf = b1ri(rng, 50, 80, 5) / 10, beta = b1pick(rng, [0.8, 0.9, 1.1, 1.2, 1.3, 1.4, 1.5]), mrp = b1ri(rng, 50, 70, 5) / 10;
  const coe = r1(rf + beta * mrp);
  return b1mk(rng,
    `CAPM: Rf ${b1fe(rf, 1)}%, beta ${b1fe(beta, 1)}, MRP ${b1fe(mrp, 1)}%. Cost of equity?`,
    [b1fe(coe, 1) + "%", b1fe(r1(rf + mrp), 1) + "%", b1fe(r1(rf + beta * (mrp + 2)), 1) + "%", b1fe(r1(coe + 2), 1) + "%"],
    `${b1fe(rf, 1)}% + ${b1fe(beta, 1)} × ${b1fe(mrp, 1)}% = ${b1fe(coe, 1)}%.`,
    ["Analysis: the question asks for the cost of equity (CAPM); Rf, beta, and MRP are known.",
     "Solve 1: the formula — CoE = Rf + beta × MRP.",
     `Solve 2: substitute → ${b1fe(rf, 1)}% + ${b1fe(beta, 1)} × ${b1fe(mrp, 1)}%.`,
     `Solve 3: compute → ${b1fe(coe, 1)}%.`]);
}
/* 09:2 — no interest-bearing debt: WACC = cost of equity */
function b1_h092(rng){
  const r1 = v => Math.round(v * 10) / 10;
  const rf = b1ri(rng, 50, 80, 5) / 10, beta = b1ri(rng, 8, 15, 1) / 10, mrp = b1ri(rng, 50, 70, 5) / 10;
  const coe = r1(rf + beta * mrp);
  return b1txt(rng,
    `Perusahaan tanpa utang berbunga. WACC-nya? (Rf ${b1f(rf, 1)}%, beta ${b1f(beta, 1)}, MRP ${b1f(mrp, 1)}%)`,
    [`= cost of equity (bobot ekuitas 100%) — ${b1f(coe, 1)}%`,
     "= cost of debt",
     "= 0",
     `= Rf (${b1f(rf, 1)}%)`], 0,
    `Tanpa utang berbunga, seluruh modal = ekuitas → WACC = CoE = ${b1f(coe, 1)}%.`,
    ["Analysis: yang ditanya WACC tanpa utang berbunga.",
     "Solve 1: WACC = rata-rata tertimbang biaya utang & ekuitas.",
     "Solve 2: bobot utang 0 → bobot ekuitas 100%.",
     `Solve 3: WACC = CoE = ${b1f(rf, 1)}% + ${b1f(beta, 1)} × ${b1f(mrp, 1)}% = ${b1f(coe, 1)}%.`]);
}
function b1EN_h092(rng){
  const r1 = v => Math.round(v * 10) / 10;
  const rf = b1ri(rng, 50, 80, 5) / 10, beta = b1ri(rng, 8, 15, 1) / 10, mrp = b1ri(rng, 50, 70, 5) / 10;
  const coe = r1(rf + beta * mrp);
  return b1txt(rng,
    `A company with no interest-bearing debt. What is its WACC? (Rf ${b1fe(rf, 1)}%, beta ${b1fe(beta, 1)}, MRP ${b1fe(mrp, 1)}%)`,
    [`= cost of equity (equity weight 100%) — ${b1fe(coe, 1)}%`,
     "= cost of debt",
     "= 0",
     `= Rf (${b1fe(rf, 1)}%)`], 0,
    `With no interest-bearing debt, all capital = equity → WACC = CoE = ${b1fe(coe, 1)}%.`,
    ["Analysis: the question asks for WACC with no interest-bearing debt.",
     "Solve 1: WACC = the weighted average of the cost of debt & equity.",
     "Solve 2: debt weight 0 → equity weight 100%.",
     `Solve 3: WACC = CoE = ${b1fe(rf, 1)}% + ${b1fe(beta, 1)} × ${b1fe(mrp, 1)}% = ${b1fe(coe, 1)}%.`]);
}
/* 09:3 — discounting a negative FCFF one year */
function b1_h093(rng){
  const f2 = v => (v < 0 ? "−Rp" + b1f(-v, 2) + "rb" : "Rp" + b1f(v, 2) + "rb");
  const X = b1ri(rng, 50, 200, 10), r = b1ri(rng, 100, 150, 5) / 10;
  const pv = Math.round(-X / (1 + r / 100) * 100) / 100;
  return b1mk(rng,
    `FCFF ${f2(-X)} didiskonto 1 tahun pada ${b1f(r, 1)}%. Present value?`,
    [f2(pv), f2(-X), f2(Math.round(-X * (1 + r / 100) * 100) / 100), f2(-pv)],
    `${f2(-X)} ÷ 1,${b1f(Math.round(r * 10), 0)} = ${f2(pv)}. Tanda negatif ikut — kas keluar yang didiskonto.`,
    ["Analysis: yang ditanya PV FCFF negatif 1 tahun ke depan.",
     "Solve 1: rumus — PV = FCFF ÷ (1 + r).",
     `Solve 2: substitusi → ${f2(-X)} ÷ (1 + ${b1f(r, 1)}%).`,
     `Solve 3: hitung → ${f2(pv)}.`]);
}
function b1EN_h093(rng){
  const f2 = v => (v < 0 ? "−Rp" + b1fe(-v, 2) + "k" : "Rp" + b1fe(v, 2) + "k");
  const X = b1ri(rng, 50, 200, 10), r = b1ri(rng, 100, 150, 5) / 10;
  const pv = Math.round(-X / (1 + r / 100) * 100) / 100;
  return b1mk(rng,
    `FCFF of ${f2(-X)} discounted 1 year at ${b1fe(r, 1)}%. Present value?`,
    [f2(pv), f2(-X), f2(Math.round(-X * (1 + r / 100) * 100) / 100), f2(-pv)],
    `${f2(-X)} ÷ ${(1 + r / 100).toFixed(3)} = ${f2(pv)}. The negative sign stays — a discounted cash outflow.`,
    ["Analysis: the question asks for the PV of a negative FCFF one year out.",
     "Solve 1: the formula — PV = FCFF ÷ (1 + r).",
     `Solve 2: substitute → ${f2(-X)} ÷ (1 + ${b1fe(r, 1)}%).`,
     `Solve 3: compute → ${f2(pv)}.`]);
}
/* 09:4 — beta rises: CoE rises by Δbeta × MRP */
function b1_h094(rng){
  const r1 = v => Math.round(v * 10) / 10;
  const rf = b1ri(rng, 50, 80, 5) / 10, mrp = b1ri(rng, 50, 70, 5) / 10, b0 = b1ri(rng, 9, 12, 1) / 10;
  const b1v = r1(b0 + 0.2), coe0 = r1(rf + b0 * mrp), coe1 = r1(rf + b1v * mrp);
  return b1mk(rng,
    `Beta naik ${b1f(b0, 1)} → ${b1f(b1v, 1)} (Rf & MRP tetap: Rf ${b1f(rf, 1)}%, MRP ${b1f(mrp, 1)}%). Cost of equity baru?`,
    [b1f(coe1, 1) + "%", b1f(coe0, 1) + "%", b1f(r1(coe1 + 1.5), 1) + "%", b1f(r1(coe1 - 1.5), 1) + "%"],
    `${b1f(rf, 1)}% + ${b1f(b1v, 1)} × ${b1f(mrp, 1)}% = ${b1f(coe1, 1)}%. Beta +0,2 → CoE +${b1f(r1(coe1 - coe0), 1)} poin.`,
    ["Analysis: yang ditanya CoE baru setelah beta naik; Rf & MRP tetap.",
     "Solve 1: rumus — CoE = Rf + beta × MRP.",
     `Solve 2: substitusi → ${b1f(rf, 1)}% + ${b1f(b1v, 1)} × ${b1f(mrp, 1)}%.`,
     `Solve 3: hitung → ${b1f(coe1, 1)}%.`]);
}
function b1EN_h094(rng){
  const r1 = v => Math.round(v * 10) / 10;
  const rf = b1ri(rng, 50, 80, 5) / 10, mrp = b1ri(rng, 50, 70, 5) / 10, b0 = b1ri(rng, 9, 12, 1) / 10;
  const b1v = r1(b0 + 0.2), coe0 = r1(rf + b0 * mrp), coe1 = r1(rf + b1v * mrp);
  return b1mk(rng,
    `Beta rises from ${b1fe(b0, 1)} to ${b1fe(b1v, 1)} (Rf & MRP unchanged: Rf ${b1fe(rf, 1)}%, MRP ${b1fe(mrp, 1)}%). New cost of equity?`,
    [b1fe(coe1, 1) + "%", b1fe(coe0, 1) + "%", b1fe(r1(coe1 + 1.5), 1) + "%", b1fe(r1(coe1 - 1.5), 1) + "%"],
    `${b1fe(rf, 1)}% + ${b1fe(b1v, 1)} × ${b1fe(mrp, 1)}% = ${b1fe(coe1, 1)}%. Beta +0.2 → CoE +${b1fe(r1(coe1 - coe0), 1)} points.`,
    ["Analysis: the question asks for the new CoE after beta rises; Rf & MRP are unchanged.",
     "Solve 1: the formula — CoE = Rf + beta × MRP.",
     `Solve 2: substitute → ${b1fe(rf, 1)}% + ${b1fe(b1v, 1)} × ${b1fe(mrp, 1)}%.`,
     `Solve 3: compute → ${b1fe(coe1, 1)}%.`]);
}
/* 09:5 — unlevered beta: betaL ÷ (1 + (1−t) × D/E) */
function b1_h095(rng){
  const r2 = v => Math.round(v * 100) / 100;
  let bL = b1ri(rng, 100, 160, 5) / 100, de = b1ri(rng, 4, 8, 1) / 10, guard = 0;
  while (new Set([r2(bL / (1 + 0.78 * de)), bL, r2(bL * (1 + 0.78 * de)), r2(bL / (1 + de))]).size < 4 && guard++ < 60)
    { bL = b1ri(rng, 100, 160, 5) / 100; de = b1ri(rng, 4, 8, 1) / 10; }
  const bU = r2(bL / (1 + 0.78 * de));
  return b1mk(rng,
    `Peer: beta levered ${b1f(bL, 2)}, D/E ${b1f(de, 1)}, pajak 22%. Beta unlevered?`,
    [b1f(bU, 2), b1f(bL, 2), b1f(r2(bL * (1 + 0.78 * de)), 2), b1f(r2(bL / (1 + de)), 2)],
    `${b1f(bL, 2)} ÷ (1 + 0,78 × ${b1f(de, 1)}) = ${b1f(bU, 2)}. Unlever membuang leverage peer — beta asetnya lebih kecil dari beta levered-nya.`,
    ["Analysis: yang ditanya beta unlevered peer; diketahui beta levered, D/E, pajak.",
     "Solve 1: rumus — betaU = betaL ÷ (1 + (1−t) × D/E).",
     `Solve 2: substitusi → ${b1f(bL, 2)} ÷ (1 + 0,78 × ${b1f(de, 1)}).`,
     `Solve 3: hitung → ${b1f(bU, 2)}.`]);
}
function b1EN_h095(rng){
  const r2 = v => Math.round(v * 100) / 100;
  let bL = b1ri(rng, 100, 160, 5) / 100, de = b1ri(rng, 4, 8, 1) / 10, guard = 0;
  while (new Set([r2(bL / (1 + 0.78 * de)), bL, r2(bL * (1 + 0.78 * de)), r2(bL / (1 + de))]).size < 4 && guard++ < 60)
    { bL = b1ri(rng, 100, 160, 5) / 100; de = b1ri(rng, 4, 8, 1) / 10; }
  const bU = r2(bL / (1 + 0.78 * de));
  return b1mk(rng,
    `Peer: levered beta ${b1fe(bL, 2)}, D/E ${b1fe(de, 1)}, tax 22%. Unlevered beta?`,
    [b1fe(bU, 2), b1fe(bL, 2), b1fe(r2(bL * (1 + 0.78 * de)), 2), b1fe(r2(bL / (1 + de)), 2)],
    `${b1fe(bL, 2)} ÷ (1 + 0.78 × ${b1fe(de, 1)}) = ${b1fe(bU, 2)}. Unlevering removes the peer's leverage — the asset beta is smaller than its levered beta.`,
    ["Analysis: the question asks for the peer's unlevered beta; levered beta, D/E, and tax are known.",
     "Solve 1: the formula — betaU = betaL ÷ (1 + (1−t) × D/E).",
     `Solve 2: substitute → ${b1fe(bL, 2)} ÷ (1 + 0.78 × ${b1fe(de, 1)}).`,
     `Solve 3: compute → ${b1fe(bU, 2)}.`]);
}
/* 09:6 — FCFE = FCFF − interest×(1−t) + net borrowing */
function b1_h096(rng){
  let fcff = b1ri(rng, 300, 800, 50), intr = b1ri(rng, 50, 200, 50), nb = b1ri(rng, 10, 150, 10), guard = 0;
  while (nb === intr && guard++ < 60) nb = b1ri(rng, 10, 150, 10);
  const fcfe = fcff - Math.round(intr * 0.78) + nb;
  return b1mk(rng,
    `FCFF Rp${b1f(fcff)}rb, bunga Rp${b1f(intr)}rb, pajak 22%, net borrowing Rp${b1f(nb)}rb. FCFE?`,
    ["Rp" + b1f(fcfe) + "rb", "Rp" + b1f(fcff) + "rb", "Rp" + b1f(fcff - intr + nb) + "rb", "Rp" + b1f(fcff + nb) + "rb"],
    `${b1f(fcff)} − ${b1f(intr)}×0,78 + ${b1f(nb)} = ${b1f(fcfe)}. Bunga after-tax ${b1f(Math.round(intr * 0.78))}, bukan ${b1f(intr)} — pajak sudah menanggung 22-nya.`,
    ["Analysis: yang ditanya FCFE; diketahui FCFF, bunga, pajak, net borrowing.",
     "Solve 1: rumus — FCFE = FCFF − bunga×(1−t) + net borrowing.",
     `Solve 2: substitusi → ${b1f(fcff)} − ${b1f(intr)}×0,78 + ${b1f(nb)}.`,
     `Solve 3: hitung → Rp${b1f(fcfe)}rb.`]);
}
function b1EN_h096(rng){
  let fcff = b1ri(rng, 300, 800, 50), intr = b1ri(rng, 50, 200, 50), nb = b1ri(rng, 10, 150, 10), guard = 0;
  while (nb === intr && guard++ < 60) nb = b1ri(rng, 10, 150, 10);
  const fcfe = fcff - Math.round(intr * 0.78) + nb;
  return b1mk(rng,
    `FCFF Rp${b1fe(fcff)}k, interest Rp${b1fe(intr)}k, tax 22%, net borrowing Rp${b1fe(nb)}k. FCFE?`,
    ["Rp" + b1fe(fcfe) + "k", "Rp" + b1fe(fcff) + "k", "Rp" + b1fe(fcff - intr + nb) + "k", "Rp" + b1fe(fcff + nb) + "k"],
    `${b1fe(fcff)} − ${b1fe(intr)}×0.78 + ${b1fe(nb)} = ${b1fe(fcfe)}. After-tax interest is ${b1fe(Math.round(intr * 0.78))}, not ${b1fe(intr)} — tax already bears 22% of it.`,
    ["Analysis: the question asks for FCFE; FCFF, interest, tax, and net borrowing are known.",
     "Solve 1: the formula — FCFE = FCFF − interest×(1−t) + net borrowing.",
     `Solve 2: substitute → ${b1fe(fcff)} − ${b1fe(intr)}×0.78 + ${b1fe(nb)}.`,
     `Solve 3: compute → Rp${b1fe(fcfe)}k.`]);
}
/* 09:7 — bond price: PV of coupons + PV of principal (coupon < YTM → discount) */
function b1_h097(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const c = b1ri(rng, 6, 10, 1), y = c + 2, n = 3, nom = 1000, coup = nom * c / 100;
  const ann = (1 - Math.pow(1 + y / 100, -n)) / (y / 100);
  const coupPV = r2(coup * ann), prinPV = r2(nom * Math.pow(1 + y / 100, -n)), P = r2(coupPV + prinPV);
  const f2 = v => "Rp" + b1f(v, 2) + "rb";
  return b1mk(rng,
    `Obligasi nominal Rp${b1f(nom)}rb, kupon ${b1f(c)}%, YTM ${b1f(y)}%, tenor ${n} tahun. Harganya?`,
    [f2(P), f2(nom), f2(coupPV), f2(prinPV)],
    `${f2(coupPV)} (kupon) + ${f2(prinPV)} (pokok) = ${f2(P)} — diskon, karena kupon ${b1f(c)}% < YTM ${b1f(y)}%.`,
    ["Analysis: yang ditanya harga obligasi; diketahui nominal, kupon, YTM, tenor.",
     "Solve 1: harga = PV kupon + PV pokok.",
     `Solve 2: kupon/tahun Rp${b1f(coup)}rb; faktor anuitas ${b1f(ann, 4)}; PV pokok = ${b1f(nom)} ÷ ${(1 + y / 100).toFixed(2).replace(".", ",")}^${n}.`,
     `Solve 3: ${f2(coupPV)} + ${f2(prinPV)} = ${f2(P)}.`]);
}
function b1EN_h097(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const c = b1ri(rng, 6, 10, 1), y = c + 2, n = 3, nom = 1000, coup = nom * c / 100;
  const ann = (1 - Math.pow(1 + y / 100, -n)) / (y / 100);
  const coupPV = r2(coup * ann), prinPV = r2(nom * Math.pow(1 + y / 100, -n)), P = r2(coupPV + prinPV);
  const f2 = v => "Rp" + b1fe(v, 2) + "k";
  return b1mk(rng,
    `A bond with face value Rp${b1fe(nom)}k, coupon ${b1fe(c)}%, YTM ${b1fe(y)}%, tenor ${n} years. What is its price?`,
    [f2(P), f2(nom), f2(coupPV), f2(prinPV)],
    `${f2(coupPV)} (coupons) + ${f2(prinPV)} (principal) = ${f2(P)} — a discount, because the ${b1fe(c)}% coupon is below the ${b1fe(y)}% YTM.`,
    ["Analysis: the question asks for the bond price; face value, coupon, YTM, and tenor are known.",
     "Solve 1: price = PV of coupons + PV of principal.",
     `Solve 2: coupon/year Rp${b1fe(coup)}k; annuity factor ${b1fe(ann, 4)}; PV of principal = ${b1fe(nom)} ÷ ${(1 + y / 100).toFixed(2)}^${n}.`,
     `Solve 3: ${f2(coupPV)} + ${f2(prinPV)} = ${f2(P)}.`]);
}
/* 09:8 — APV = value of the unlevered firm + PV of the tax shield */
function b1_h098(rng){
  const vu = b1ri(rng, 1000, 2000, 25), pvts = b1ri(rng, 100, 300, 5) / 10;
  const apv = Math.round((vu + pvts) * 10) / 10;
  const f1 = v => "Rp" + b1f(v, 1) + "jt";
  return b1mk(rng,
    `VU Rp${b1f(vu, 1)}jt; PV tax shield utang diamortisasi Rp${b1f(pvts, 1)}jt. APV?`,
    [f1(apv), f1(vu), f1(Math.round((vu - pvts) * 10) / 10), f1(Math.round((vu + 2 * pvts) * 10) / 10)],
    `APV = ${b1f(vu, 1)} + ${b1f(pvts, 1)} = ${f1(apv)}.`,
    ["Analysis: yang ditanya APV; diketahui VU & PV tax shield.",
     "Solve 1: rumus — APV = VU + PV(tax shield).",
     `Solve 2: substitusi → ${b1f(vu, 1)} + ${b1f(pvts, 1)}.`,
     `Solve 3: hitung → ${f1(apv)}.`]);
}
function b1EN_h098(rng){
  const vu = b1ri(rng, 1000, 2000, 25), pvts = b1ri(rng, 100, 300, 5) / 10;
  const apv = Math.round((vu + pvts) * 10) / 10;
  const f1 = v => "Rp" + b1fe(v, 1) + "m";
  return b1mk(rng,
    `VU Rp${b1fe(vu, 1)}m; PV of the tax shield on amortising debt Rp${b1fe(pvts, 1)}m. APV?`,
    [f1(apv), f1(vu), f1(Math.round((vu - pvts) * 10) / 10), f1(Math.round((vu + 2 * pvts) * 10) / 10)],
    `APV = ${b1fe(vu, 1)} + ${b1fe(pvts, 1)} = ${f1(apv)}.`,
    ["Analysis: the question asks for APV; VU & the PV of the tax shield are known.",
     "Solve 1: the formula — APV = VU + PV(tax shield).",
     `Solve 2: substitute → ${b1fe(vu, 1)} + ${b1fe(pvts, 1)}.`,
     `Solve 3: compute → ${f1(apv)}.`]);
}
/* 09:9 — firm value via economic profit: value = capital + PV(EP) */
function b1_h099(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const cap = b1ri(rng, 800, 1500, 100), w = b1ri(rng, 8, 12, 1), g = b1ri(rng, 2, 4, 1);
  const ep = b1ri(rng, 30, 80, 10), nopat = cap * w / 100 + ep;
  const V = r2(cap + ep * 100 / (w - g));
  const f2 = v => "Rp" + b1f(v, 2) + "jt";
  return b1mk(rng,
    `NOPAT Rp${b1f(nopat)}jt, modal Rp${b1f(cap)}jt, WACC ${b1f(w)}%, EP tumbuh ${b1f(g)}%. Nilai perusahaan via economic profit?`,
    [f2(V), f2(r2(cap + ep * 100 / w)), f2(cap), f2(r2(nopat * 100 / (w - g)))],
    `EP = ${b1f(nopat)} − ${b1f(w)}%×${b1f(cap)} = Rp${b1f(ep)}jt; PV(EP) = ${b1f(ep)} ÷ ${b1f(w - g)}% = ${f2(r2(ep * 100 / (w - g)))}; nilai = ${b1f(cap)} + ${f2(r2(ep * 100 / (w - g))).slice(2)} = ${f2(V)}.`,
    ["Analysis: yang ditanya nilai perusahaan via EP; diketahui NOPAT, modal, WACC, g.",
     `Solve 1: EP = NOPAT − WACC×modal = ${b1f(nopat)} − ${b1f(cap * w / 100)} = Rp${b1f(ep)}jt.`,
     `Solve 2: PV(EP) = EP ÷ (WACC−g) = ${b1f(ep)} ÷ ${b1f(w - g)}%.`,
     `Solve 3: nilai = modal + PV(EP) = ${f2(V)}.`]);
}
function b1EN_h099(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const cap = b1ri(rng, 800, 1500, 100), w = b1ri(rng, 8, 12, 1), g = b1ri(rng, 2, 4, 1);
  const ep = b1ri(rng, 30, 80, 10), nopat = cap * w / 100 + ep;
  const V = r2(cap + ep * 100 / (w - g));
  const f2 = v => "Rp" + b1fe(v, 2) + "m";
  return b1mk(rng,
    `NOPAT Rp${b1fe(nopat)}m, capital Rp${b1fe(cap)}m, WACC ${b1fe(w)}%, EP grows at ${b1fe(g)}%. Firm value via economic profit?`,
    [f2(V), f2(r2(cap + ep * 100 / w)), f2(cap), f2(r2(nopat * 100 / (w - g)))],
    `EP = ${b1fe(nopat)} − ${b1fe(w)}%×${b1fe(cap)} = Rp${b1fe(ep)}m; PV(EP) = ${b1fe(ep)} ÷ ${b1fe(w - g)}% = ${f2(r2(ep * 100 / (w - g)))}; value = ${b1fe(cap)} + ${f2(r2(ep * 100 / (w - g))).slice(2)} = ${f2(V)}.`,
    ["Analysis: the question asks for firm value via EP; NOPAT, capital, WACC, and g are known.",
     `Solve 1: EP = NOPAT − WACC×capital = ${b1fe(nopat)} − ${b1fe(cap * w / 100)} = Rp${b1fe(ep)}m.`,
     `Solve 2: PV(EP) = EP ÷ (WACC−g) = ${b1fe(ep)} ÷ ${b1fe(w - g)}%.`,
     `Solve 3: value = capital + PV(EP) = ${f2(V)}.`]);
}
/* 09:10 — cost of equity with a country risk premium */
function b1_h0910(rng){
  const r1 = v => Math.round(v * 10) / 10;
  const rf = b1ri(rng, 30, 60, 5) / 10, erp = b1ri(rng, 40, 60, 5) / 10, beta = b1ri(rng, 10, 14, 1) / 10, crp = b1ri(rng, 15, 30, 5) / 10;
  const ke = r1(rf + beta * erp + crp);
  return b1mk(rng,
    `Rf ${b1f(rf, 1)}%, ERP ${b1f(erp, 1)}%, beta ${b1f(beta, 1)}, CRP Indonesia ${b1f(crp, 1)}%. Cost of equity?`,
    [b1f(ke, 1) + "%", b1f(r1(rf + beta * erp), 1) + "%", b1f(r1(ke + 2.5), 1) + "%", b1f(r1(rf + beta * (erp + 2) + crp), 1) + "%"],
    `Ke = ${b1f(rf, 1)} + ${b1f(beta, 1)}×${b1f(erp, 1)} + ${b1f(crp, 1)} = ${b1f(ke, 1)}%.`,
    ["Analysis: yang ditanya cost of equity dengan CRP; diketahui Rf, ERP, beta, CRP.",
     "Solve 1: rumus — Ke = Rf + beta×ERP + CRP.",
     `Solve 2: substitusi → ${b1f(rf, 1)} + ${b1f(beta, 1)}×${b1f(erp, 1)} + ${b1f(crp, 1)}.`,
     `Solve 3: hitung → ${b1f(ke, 1)}%.`]);
}
function b1EN_h0910(rng){
  const r1 = v => Math.round(v * 10) / 10;
  const rf = b1ri(rng, 30, 60, 5) / 10, erp = b1ri(rng, 40, 60, 5) / 10, beta = b1ri(rng, 10, 14, 1) / 10, crp = b1ri(rng, 15, 30, 5) / 10;
  const ke = r1(rf + beta * erp + crp);
  return b1mk(rng,
    `Rf ${b1fe(rf, 1)}%, ERP ${b1fe(erp, 1)}%, beta ${b1fe(beta, 1)}, Indonesia CRP ${b1fe(crp, 1)}%. Cost of equity?`,
    [b1fe(ke, 1) + "%", b1fe(r1(rf + beta * erp), 1) + "%", b1fe(r1(ke + 2.5), 1) + "%", b1fe(r1(rf + beta * (erp + 2) + crp), 1) + "%"],
    `Ke = ${b1fe(rf, 1)} + ${b1fe(beta, 1)}×${b1fe(erp, 1)} + ${b1fe(crp, 1)} = ${b1fe(ke, 1)}%.`,
    ["Analysis: the question asks for the cost of equity with a CRP; Rf, ERP, beta, and CRP are known.",
     "Solve 1: the formula — Ke = Rf + beta×ERP + CRP.",
     `Solve 2: substitute → ${b1fe(rf, 1)} + ${b1fe(beta, 1)}×${b1fe(erp, 1)} + ${b1fe(crp, 1)}.`,
     `Solve 3: compute → ${b1fe(ke, 1)}%.`]);
}
/* 09:11 — indifference EBIT between an all-equity plan and a debt plan */
function b1_h0911(rng){
  const N1 = b1ri(rng, 800, 1200, 200), N2 = N1 * 0.6, I = b1ri(rng, 200, 400, 40);
  const E = I * N1 / (N1 - N2);
  const eps = Math.round(E * 0.78 / N1 * 1000) / 1000;
  return b1mk(rng,
    `Rencana ekuitas ${b1f(N1)} saham vs rencana utang (bunga Rp${b1f(I)}jt) ${b1f(N2)} saham, pajak 22%. EBIT impas?`,
    ["Rp" + b1f(E) + "jt", "Rp" + b1f(I) + "jt", "Rp" + b1f(Math.round(E * 0.78)) + "jt", "Rp" + b1f(E + 400) + "jt"],
    `EBIT* = Rp${b1f(E)}jt (cek: EPS kedua rencana = Rp${b1f(eps, 3)}jt). Di atas ${b1f(E)} utang mengangkat EPS; di bawahnya menekan EPS.`,
    ["Analysis: yang ditanya EBIT impas — EPS kedua rencana sama.",
     "Solve 1: EPS ekuitas = EBIT×(1−t) ÷ N1; EPS utang = (EBIT−bunga)×(1−t) ÷ N2.",
     `Solve 2: samakan → EBIT* = I×N1 ÷ (N1−N2) = ${b1f(I)}×${b1f(N1)} ÷ ${b1f(N1 - N2)}.`,
     `Solve 3: hitung → Rp${b1f(E)}jt.`]);
}
function b1EN_h0911(rng){
  const N1 = b1ri(rng, 800, 1200, 200), N2 = N1 * 0.6, I = b1ri(rng, 200, 400, 40);
  const E = I * N1 / (N1 - N2);
  const eps = Math.round(E * 0.78 / N1 * 1000) / 1000;
  return b1mk(rng,
    `An all-equity plan of ${b1fe(N1)} shares vs a debt plan (interest Rp${b1fe(I)}m) of ${b1fe(N2)} shares, tax 22%. Indifference EBIT?`,
    ["Rp" + b1fe(E) + "m", "Rp" + b1fe(I) + "m", "Rp" + b1fe(Math.round(E * 0.78)) + "m", "Rp" + b1fe(E + 400) + "m"],
    `EBIT* = Rp${b1fe(E)}m (check: EPS under both plans = Rp${b1fe(eps, 3)}m). Above ${b1fe(E)} debt lifts EPS; below it depresses EPS.`,
    ["Analysis: the question asks for the indifference EBIT — EPS is equal under both plans.",
     "Solve 1: equity-plan EPS = EBIT×(1−t) ÷ N1; debt-plan EPS = (EBIT−interest)×(1−t) ÷ N2.",
     `Solve 2: equate → EBIT* = I×N1 ÷ (N1−N2) = ${b1fe(I)}×${b1fe(N1)} ÷ ${b1fe(N1 - N2)}.`,
     `Solve 3: compute → Rp${b1fe(E)}m.`]);
}

/* ================= hari-10 ================= */
/* 10:0 — Gordon terminal value: TV = FCFF_n ÷ (WACC − g) */
function b1_h100(rng){
  const f = b1ri(rng, 1500, 3500, 100), w = b1ri(rng, 12, 15, 1), g = b1ri(rng, 2, 4, 1);
  const tv = Math.round(f / ((w - g) / 100));
  return b1mk(rng,
    `FCFF 2028 Rp${b1f(f)}rb, WACC ${b1f(w)}%, g ${b1f(g)}%. Terminal value (perpetuity)?`,
    ["Rp" + b1f(tv) + "rb", "Rp" + b1f(Math.round(f / (w / 100))) + "rb", "Rp" + b1f(f) + "rb", "Rp" + b1f(Math.round(tv * 1.2)) + "rb"],
    `${b1f(f)} ÷ ${b1f(w - g)}% = Rp${b1f(tv)}rb.`,
    ["Analysis: yang ditanya TV perpetuitas; diketahui FCFF tahun akhir, WACC, g.",
     "Solve 1: rumus Gordon — TV = FCFF ÷ (WACC − g).",
     `Solve 2: substitusi → ${b1f(f)} ÷ (${b1f(w)}% − ${b1f(g)}%).`,
     `Solve 3: hitung → Rp${b1f(tv)}rb.`]);
}
function b1EN_h100(rng){
  const f = b1ri(rng, 1500, 3500, 100), w = b1ri(rng, 12, 15, 1), g = b1ri(rng, 2, 4, 1);
  const tv = Math.round(f / ((w - g) / 100));
  return b1mk(rng,
    `FCFF in 2028 Rp${b1fe(f)}k, WACC ${b1fe(w)}%, g ${b1fe(g)}%. Terminal value (perpetuity)?`,
    ["Rp" + b1fe(tv) + "k", "Rp" + b1fe(Math.round(f / (w / 100))) + "k", "Rp" + b1fe(f) + "k", "Rp" + b1fe(Math.round(tv * 1.2)) + "k"],
    `${b1fe(f)} ÷ ${b1fe(w - g)}% = Rp${b1fe(tv)}k.`,
    ["Analysis: the question asks for the perpetuity TV; final-year FCFF, WACC, and g are known.",
     "Solve 1: the Gordon formula — TV = FCFF ÷ (WACC − g).",
     `Solve 2: substitute → ${b1fe(f)} ÷ (${b1fe(w)}% − ${b1fe(g)}%).`,
     `Solve 3: compute → Rp${b1fe(tv)}k.`]);
}
/* 10:1 — PV of the terminal value, one year out */
function b1_h101(rng){
  const tv = b1ri(rng, 15000, 28000, 500), w = b1ri(rng, 11, 15, 1);
  const pv = Math.round(tv / (1 + w / 100));
  return b1mk(rng,
    `TV Rp${b1f(tv)}rb (di akhir 2027) didiskonto pada ${b1f(w)}%. PV TV?`,
    ["Rp" + b1f(pv) + "rb", "Rp" + b1f(tv) + "rb", "Rp" + b1f(Math.round(pv * 1.1)) + "rb", "Rp" + b1f(Math.round(tv / Math.pow(1 + w / 100, 2))) + "rb"],
    `${b1f(tv)} ÷ 1,${b1f(w)} = Rp${b1f(pv)}rb.`,
    ["Analysis: yang ditanya PV TV 1 tahun ke depan.",
     "Solve 1: rumus — PV = TV ÷ (1 + WACC).",
     `Solve 2: substitusi → ${b1f(tv)} ÷ (1 + ${b1f(w)}%).`,
     `Solve 3: hitung → Rp${b1f(pv)}rb.`]);
}
function b1EN_h101(rng){
  const tv = b1ri(rng, 15000, 28000, 500), w = b1ri(rng, 11, 15, 1);
  const pv = Math.round(tv / (1 + w / 100));
  return b1mk(rng,
    `TV of Rp${b1fe(tv)}k (at the end of 2027) discounted at ${b1fe(w)}%. PV of TV?`,
    ["Rp" + b1fe(pv) + "k", "Rp" + b1fe(tv) + "k", "Rp" + b1fe(Math.round(pv * 1.1)) + "k", "Rp" + b1fe(Math.round(tv / Math.pow(1 + w / 100, 2))) + "k"],
    `${b1fe(tv)} ÷ 1.${b1fe(w)} = Rp${b1fe(pv)}k.`,
    ["Analysis: the question asks for the PV of the TV one year out.",
     "Solve 1: the formula — PV = TV ÷ (1 + WACC).",
     `Solve 2: substitute → ${b1fe(tv)} ÷ (1 + ${b1fe(w)}%).`,
     `Solve 3: compute → Rp${b1fe(pv)}k.`]);
}
/* 10:2 — exit-multiple TV: TV = final-year EBITDA × multiple */
function b1_h102(rng){
  const eb = b1ri(rng, 1500, 4000, 125), m = b1ri(rng, 6, 10, 1);
  const tv = eb * m;
  return b1mk(rng,
    `EBITDA 2027 Rp${b1f(eb)}rb, exit multiple ${b1f(m)}×. TV (exit multiple)?`,
    ["Rp" + b1f(tv) + "rb", "Rp" + b1f(eb * (m + 2)) + "rb", "Rp" + b1f(eb) + "rb", "Rp" + b1f(eb * (m - 2)) + "rb"],
    `${b1f(eb)} × ${b1f(m)} = Rp${b1f(tv)}rb.`,
    ["Analysis: yang ditanya TV metode exit multiple; diketahui EBITDA akhir & multiple.",
     "Solve 1: rumus — TV = EBITDA × multiple.",
     `Solve 2: substitusi → ${b1f(eb)} × ${b1f(m)}.`,
     `Solve 3: hitung → Rp${b1f(tv)}rb.`]);
}
function b1EN_h102(rng){
  const eb = b1ri(rng, 1500, 4000, 125), m = b1ri(rng, 6, 10, 1);
  const tv = eb * m;
  return b1mk(rng,
    `EBITDA in 2027 Rp${b1fe(eb)}k, exit multiple ${b1fe(m)}×. TV (exit multiple)?`,
    ["Rp" + b1fe(tv) + "k", "Rp" + b1fe(eb * (m + 2)) + "k", "Rp" + b1fe(eb) + "k", "Rp" + b1fe(eb * (m - 2)) + "k"],
    `${b1fe(eb)} × ${b1fe(m)} = Rp${b1fe(tv)}k.`,
    ["Analysis: the question asks for the exit-multiple TV; final-year EBITDA & the multiple are known.",
     "Solve 1: the formula — TV = EBITDA × multiple.",
     `Solve 2: substitute → ${b1fe(eb)} × ${b1fe(m)}.`,
     `Solve 3: compute → Rp${b1fe(tv)}k.`]);
}
/* 10:3 — enterprise value = PV(FCFF) + PV(TV) */
function b1_h103(rng){
  const pvf = -b1ri(rng, 20, 100, 10), pvtv = b1ri(rng, 15000, 25000, 500);
  const ev = pvtv + pvf;
  return b1mk(rng,
    `PV FCFF 2027 ${b1rp(pvf, "rb")} + PV TV Rp${b1f(pvtv)}rb. Enterprise value?`,
    ["Rp" + b1f(ev) + "rb", "Rp" + b1f(pvtv) + "rb", "Rp" + b1f(pvtv - pvf) + "rb", "Rp" + b1f(ev - 1000) + "rb"],
    `${b1rp(pvf, "rb")} + ${b1f(pvtv)} = Rp${b1f(ev)}rb.`,
    ["Analysis: yang ditanya EV; diketahui PV FCFF (negatif) & PV TV.",
     "Solve 1: rumus — EV = PV(FCFF) + PV(TV).",
     `Solve 2: substitusi → (${b1f(pvf)}) + ${b1f(pvtv)}.`,
     `Solve 3: hitung → Rp${b1f(ev)}rb.`]);
}
function b1EN_h103(rng){
  const pvf = -b1ri(rng, 20, 100, 10), pvtv = b1ri(rng, 15000, 25000, 500);
  const ev = pvtv + pvf;
  return b1mk(rng,
    `PV of 2027 FCFF ${b1rpe(pvf, "k")} + PV of TV Rp${b1fe(pvtv)}k. Enterprise value?`,
    ["Rp" + b1fe(ev) + "k", "Rp" + b1fe(pvtv) + "k", "Rp" + b1fe(pvtv - pvf) + "k", "Rp" + b1fe(ev - 1000) + "k"],
    `${b1rpe(pvf, "k")} + ${b1fe(pvtv)} = Rp${b1fe(ev)}k.`,
    ["Analysis: the question asks for EV; PV of FCFF (negative) & PV of TV are known.",
     "Solve 1: the formula — EV = PV(FCFF) + PV(TV).",
     `Solve 2: substitute → (${b1fe(pvf)}) + ${b1fe(pvtv)}.`,
     `Solve 3: compute → Rp${b1fe(ev)}k.`]);
}
/* 10:4 — higher WACC lowers the perpetuity TV (denominator grows) */
function b1_h104(rng){
  const f = b1ri(rng, 2000, 3000, 100), w0 = b1ri(rng, 12, 14, 1), g = b1ri(rng, 2, 4, 1);
  const tv0 = Math.round(f / ((w0 - g) / 100)), tv1 = Math.round(f / ((w0 + 2 - g) / 100));
  return b1txt(rng,
    `FCFF Rp${b1f(f)}rb, WACC naik ${b1f(w0)}% → ${b1f(w0 + 2)}% (g tetap ${b1f(g)}%). Dampak ke TV perpetuity?`,
    ["Naik",
     `Turun — penyebut (WACC−g) membesar (TV Rp${b1f(tv0)}rb → Rp${b1f(tv1)}rb)`,
     "Tetap",
     "Jadi negatif"], 1,
    `${b1f(f)} ÷ ${b1f(w0 + 2 - g)}% = Rp${b1f(tv1)}rb < ${b1f(tv0)}. WACC naik = diskonto lebih galak = TV turun.`,
    ["Analysis: yang ditanya arah TV saat WACC naik.",
     `Solve 1: TV lama = ${b1f(f)} ÷ ${b1f(w0 - g)}% = Rp${b1f(tv0)}rb.`,
     `Solve 2: TV baru = ${b1f(f)} ÷ ${b1f(w0 + 2 - g)}% = Rp${b1f(tv1)}rb.`,
     "Solve 3: penyebut membesar → TV turun."]);
}
function b1EN_h104(rng){
  const f = b1ri(rng, 2000, 3000, 100), w0 = b1ri(rng, 12, 14, 1), g = b1ri(rng, 2, 4, 1);
  const tv0 = Math.round(f / ((w0 - g) / 100)), tv1 = Math.round(f / ((w0 + 2 - g) / 100));
  return b1txt(rng,
    `FCFF Rp${b1fe(f)}k, WACC rises from ${b1fe(w0)}% to ${b1fe(w0 + 2)}% (g unchanged at ${b1fe(g)}%). What happens to the perpetuity TV?`,
    ["It rises",
     `It falls — the (WACC−g) denominator grows (TV Rp${b1fe(tv0)}k → Rp${b1fe(tv1)}k)`,
     "It stays the same",
     "It becomes negative"], 1,
    `${b1fe(f)} ÷ ${b1fe(w0 + 2 - g)}% = Rp${b1fe(tv1)}k < ${b1fe(tv0)}. Higher WACC = harsher discounting = lower TV.`,
    ["Analysis: the question asks which way the TV moves when WACC rises.",
     `Solve 1: old TV = ${b1fe(f)} ÷ ${b1fe(w0 - g)}% = Rp${b1fe(tv0)}k.`,
     `Solve 2: new TV = ${b1fe(f)} ÷ ${b1fe(w0 + 2 - g)}% = Rp${b1fe(tv1)}k.`,
     "Solve 3: the denominator grows → the TV falls."]);
}
/* 10:5 — mid-year discounting: cash is assumed to arrive mid-year */
function b1_h105(rng){
  const tv = b1ri(rng, 15000, 28000, 500), w = b1ri(rng, 11, 15, 1);
  const pvm = Math.round(tv / Math.pow(1 + w / 100, 0.5)), pve = Math.round(tv / (1 + w / 100));
  return b1mk(rng,
    `WACC ${b1f(w)}%, TV Rp${b1f(tv)}rb (akhir 2027). PV mid-year?`,
    ["Rp" + b1f(pvm) + "rb", "Rp" + b1f(pve) + "rb", "Rp" + b1f(tv) + "rb", "Rp" + b1f(Math.round(tv * Math.pow(1 + w / 100, 0.5))) + "rb"],
    `${b1f(tv)} ÷ (1,${b1f(w)})^0,5 = Rp${b1f(pvm)}rb — lebih besar dari ${b1f(pve)} karena kas dianggap tiba di tengah tahun, bukan akhir tahun.`,
    ["Analysis: yang ditanya PV mid-year — eksponen diskon setengah tahun.",
     "Solve 1: rumus — PV mid-year = TV ÷ (1 + WACC)^0,5.",
     `Solve 2: substitusi → ${b1f(tv)} ÷ (1 + ${b1f(w)}%)^0,5.`,
     `Solve 3: hitung → Rp${b1f(pvm)}rb.`]);
}
function b1EN_h105(rng){
  const tv = b1ri(rng, 15000, 28000, 500), w = b1ri(rng, 11, 15, 1);
  const pvm = Math.round(tv / Math.pow(1 + w / 100, 0.5)), pve = Math.round(tv / (1 + w / 100));
  return b1mk(rng,
    `WACC ${b1fe(w)}%, TV Rp${b1fe(tv)}k (end of 2027). Mid-year PV?`,
    ["Rp" + b1fe(pvm) + "k", "Rp" + b1fe(pve) + "k", "Rp" + b1fe(tv) + "k", "Rp" + b1fe(Math.round(tv * Math.pow(1 + w / 100, 0.5))) + "k"],
    `${b1fe(tv)} ÷ (1.${b1fe(w)})^0.5 = Rp${b1fe(pvm)}k — larger than ${b1fe(pve)} because cash is assumed to arrive mid-year, not year-end.`,
    ["Analysis: the question asks for the mid-year PV — a half-year discount exponent.",
     "Solve 1: the formula — mid-year PV = TV ÷ (1 + WACC)^0.5.",
     `Solve 2: substitute → ${b1fe(tv)} ÷ (1 + ${b1fe(w)}%)^0.5.`,
     `Solve 3: compute → Rp${b1fe(pvm)}k.`]);
}
/* 10:6 — stub-period PV: cut the flow AND the discount exponent (months/12) */
function b1_h106(rng){
  const f2 = v => (v < 0 ? "−" + b1f(-v, 2) : b1f(v, 2));
  const X = b1ri(rng, 20, 100, 5), m = b1ri(rng, 5, 9, 1), w = b1ri(rng, 11, 15, 1);
  const stub = Math.round(-X * m / 12 * 100) / 100;
  const pv = Math.round(stub / Math.pow(1 + w / 100, m / 12) * 100) / 100;
  const fullPV = Math.round(-X / (1 + w / 100) * 100) / 100;
  return b1mk(rng,
    `FCFF 2027 = ${f2(-X)}, valuasi 31 Mei (stub ${b1f(m)} bulan), WACC ${b1f(w)}%. PV FCFF stub?`,
    [f2(pv), f2(stub), f2(fullPV), f2(-X)],
    `${f2(stub)} ÷ (1,${b1f(w)})^${b1f(m)}/12 = ${f2(pv)}. Potong arusnya (${b1f(m)}/12) DAN potong diskonnya (eksponen ${b1f(m)}/12) — jangan salah satunya saja.`,
    ["Analysis: yang ditanya PV FCFF stub — periode parsial.",
     `Solve 1: arus stub = FCFF × ${b1f(m)}/12 = ${f2(stub)}.`,
     `Solve 2: diskon dengan eksponen ${b1f(m)}/12 → ${f2(stub)} ÷ (1 + ${b1f(w)}%)^${b1f(m)}/12.`,
     `Solve 3: hitung → ${f2(pv)}.`]);
}
function b1EN_h106(rng){
  const f2 = v => (v < 0 ? "−" + b1fe(-v, 2) : b1fe(v, 2));
  const X = b1ri(rng, 20, 100, 5), m = b1ri(rng, 5, 9, 1), w = b1ri(rng, 11, 15, 1);
  const stub = Math.round(-X * m / 12 * 100) / 100;
  const pv = Math.round(stub / Math.pow(1 + w / 100, m / 12) * 100) / 100;
  const fullPV = Math.round(-X / (1 + w / 100) * 100) / 100;
  return b1mk(rng,
    `FCFF in 2027 = ${f2(-X)}, valuation on 31 May (stub of ${b1fe(m)} months), WACC ${b1fe(w)}%. PV of the stub FCFF?`,
    [f2(pv), f2(stub), f2(fullPV), f2(-X)],
    `${f2(stub)} ÷ (1.${b1fe(w)})^${b1fe(m)}/12 = ${f2(pv)}. Cut the flow (${b1fe(m)}/12) AND cut the discount exponent (${b1fe(m)}/12) — not just one of them.`,
    ["Analysis: the question asks for the PV of a stub-period FCFF — a partial period.",
     `Solve 1: stub flow = FCFF × ${b1fe(m)}/12 = ${f2(stub)}.`,
     `Solve 2: discount with exponent ${b1fe(m)}/12 → ${f2(stub)} ÷ (1 + ${b1fe(w)}%)^${b1fe(m)}/12.`,
     `Solve 3: compute → ${f2(pv)}.`]);
}

/* ================= hari-11 ================= */
/* 11:0 — median of five EV/EBITDA multiples */
function b1_h110(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const base = b1ri(rng, 750, 950, 5) / 100;
  const vals5 = [-0.42, -0.15, 0, 0.39, 0.81].map(o => r2(base + o));
  const med = base, mx = vals5[4], mn = vals5[0];
  const mean = r2(vals5.reduce((a, b) => a + b, 0) / 5);
  const disp = vShuffle(vals5.slice(), rng);
  return b1mk(rng,
    `EV/EBITDA lima emiten: ${disp.map(v => b1f(v, 2)).join(" / ")}. Mediannya?`,
    [b1f(med, 2) + "×", b1f(mx, 2) + "×", b1f(mean, 2) + "×", b1f(mn, 2) + "×"],
    `Urutan: ${vals5.map(v => b1f(v, 2)).join(" – ")}. Tengah = ${b1f(med, 2)}×.`,
    ["Analysis: yang ditanya median — nilai tengah setelah diurutkan.",
     `Solve 1: urutkan → ${vals5.map(v => b1f(v, 2)).join(", ")}.`,
     "Solve 2: dari 5 angka, median = angka ke-3.",
     `Solve 3: angka ke-3 = ${b1f(med, 2)}×.`]);
}
function b1EN_h110(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const base = b1ri(rng, 750, 950, 5) / 100;
  const vals5 = [-0.42, -0.15, 0, 0.39, 0.81].map(o => r2(base + o));
  const med = base, mx = vals5[4], mn = vals5[0];
  const mean = r2(vals5.reduce((a, b) => a + b, 0) / 5);
  const disp = vShuffle(vals5.slice(), rng);
  return b1mk(rng,
    `EV/EBITDA of five issuers: ${disp.map(v => b1fe(v, 2)).join(" / ")}. What is the median?`,
    [b1fe(med, 2) + "×", b1fe(mx, 2) + "×", b1fe(mean, 2) + "×", b1fe(mn, 2) + "×"],
    `Sorted: ${vals5.map(v => b1fe(v, 2)).join(" – ")}. The middle one = ${b1fe(med, 2)}×.`,
    ["Analysis: the question asks for the median — the middle value after sorting.",
     `Solve 1: sort → ${vals5.map(v => b1fe(v, 2)).join(", ")}.`,
     "Solve 2: of 5 numbers, the median = the 3rd one.",
     `Solve 3: the 3rd one = ${b1fe(med, 2)}×.`]);
}
/* 11:1 — implied EV = median multiple × EBITDA */
function b1_h111(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const m = b1ri(rng, 750, 950, 5) / 100, E = b1ri(rng, 80, 150, 5) / 10;
  const ev = r2(m * E);
  const f2 = v => "Rp" + b1f(v, 2) + "T";
  return b1mk(rng,
    `Median EV/EBITDA ${b1f(m, 2)} × EBITDA INDF Rp${b1f(E, 1)}T. INDF implied EV?`,
    [f2(ev), f2(r2(m * (E - 1))), f2(r2((m + 1) * E)), f2(r2(m * E * 0.9))],
    `${b1f(m, 2)} × ${b1f(E, 1)} = ${f2(ev)}.`,
    ["Analysis: yang ditanya implied EV; diketahui median multiple & EBITDA.",
     "Solve 1: rumus — Implied EV = median multiple × EBITDA.",
     `Solve 2: substitusi → ${b1f(m, 2)} × ${b1f(E, 1)}.`,
     `Solve 3: hitung → ${f2(ev)}.`]);
}
function b1EN_h111(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const m = b1ri(rng, 750, 950, 5) / 100, E = b1ri(rng, 80, 150, 5) / 10;
  const ev = r2(m * E);
  const f2 = v => "Rp" + b1fe(v, 2) + "T";
  return b1mk(rng,
    `Median EV/EBITDA ${b1fe(m, 2)} × INDF EBITDA of Rp${b1fe(E, 1)}T. INDF implied EV?`,
    [f2(ev), f2(r2(m * (E - 1))), f2(r2((m + 1) * E)), f2(r2(m * E * 0.9))],
    `${b1fe(m, 2)} × ${b1fe(E, 1)} = ${f2(ev)}.`,
    ["Analysis: the question asks for implied EV; the median multiple & EBITDA are known.",
     "Solve 1: the formula — Implied EV = median multiple × EBITDA.",
     `Solve 2: substitute → ${b1fe(m, 2)} × ${b1fe(E, 1)}.`,
     `Solve 3: compute → ${f2(ev)}.`]);
}
/* 11:2 — implied equity = median P/E × net income */
function b1_h112(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const pe = b1ri(rng, 1000, 1800, 25) / 100, ni = b1ri(rng, 40, 90, 5) / 10;
  const eq = r2(pe * ni);
  const f2 = v => "Rp" + b1f(v, 2) + "T";
  return b1mk(rng,
    `Median P/E ${b1f(pe, 2)} × laba bersih INDF Rp${b1f(ni, 1)}T. INDF implied ekuitas?`,
    [f2(eq), f2(r2(pe * (ni - 1))), f2(r2((pe + 2) * ni)), f2(r2(pe * ni * 0.9))],
    `${b1f(pe, 2)} × ${b1f(ni, 1)} = ${f2(eq)}.`,
    ["Analysis: yang ditanya implied ekuitas; diketahui median P/E & laba bersih.",
     "Solve 1: rumus — Implied ekuitas = median P/E × laba bersih.",
     `Solve 2: substitusi → ${b1f(pe, 2)} × ${b1f(ni, 1)}.`,
     `Solve 3: hitung → ${f2(eq)}.`]);
}
function b1EN_h112(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const pe = b1ri(rng, 1000, 1800, 25) / 100, ni = b1ri(rng, 40, 90, 5) / 10;
  const eq = r2(pe * ni);
  const f2 = v => "Rp" + b1fe(v, 2) + "T";
  return b1mk(rng,
    `Median P/E ${b1fe(pe, 2)} × INDF net income of Rp${b1fe(ni, 1)}T. INDF implied equity?`,
    [f2(eq), f2(r2(pe * (ni - 1))), f2(r2((pe + 2) * ni)), f2(r2(pe * ni * 0.9))],
    `${b1fe(pe, 2)} × ${b1fe(ni, 1)} = ${f2(eq)}.`,
    ["Analysis: the question asks for implied equity; the median P/E & net income are known.",
     "Solve 1: the formula — Implied equity = median P/E × net income.",
     `Solve 2: substitute → ${b1fe(pe, 2)} × ${b1fe(ni, 1)}.`,
     `Solve 3: compute → ${f2(eq)}.`]);
}
/* 11:3 — precedent EV = implied EV × (1 + control premium) */
function b1_h113(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const ev = b1ri(rng, 800, 1200, 5) / 10, p = b1ri(rng, 20, 30, 5);
  const pev = r2(ev * (1 + p / 100));
  const f2 = v => "Rp" + b1f(v, 2) + "T";
  return b1mk(rng,
    `INDF implied EV Rp${b1f(ev, 1)}T, control premium ${b1f(p)}%. Precedent EV?`,
    [f2(pev), f2(ev), f2(r2(ev * (1 + 2 * p / 100))), f2(r2(ev * (1 - p / 100)))],
    `${b1f(ev, 1)} × 1,${b1f(p)} = ${f2(pev)}.`,
    ["Analysis: yang ditanya precedent EV; diketahui implied EV & premium kendali.",
     "Solve 1: rumus — Precedent EV = implied EV × (1 + premium).",
     `Solve 2: substitusi → ${b1f(ev, 1)} × (1 + ${b1f(p)}%).`,
     `Solve 3: hitung → ${f2(pev)}.`]);
}
function b1EN_h113(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const ev = b1ri(rng, 800, 1200, 5) / 10, p = b1ri(rng, 20, 30, 5);
  const pev = r2(ev * (1 + p / 100));
  const f2 = v => "Rp" + b1fe(v, 2) + "T";
  return b1mk(rng,
    `INDF implied EV Rp${b1fe(ev, 1)}T, control premium ${b1fe(p)}%. Precedent EV?`,
    [f2(pev), f2(ev), f2(r2(ev * (1 + 2 * p / 100))), f2(r2(ev * (1 - p / 100)))],
    `${b1fe(ev, 1)} × ${(1 + p / 100).toFixed(2)} = ${f2(pev)}.`,
    ["Analysis: the question asks for precedent EV; implied EV & the control premium are known.",
     "Solve 1: the formula — Precedent EV = implied EV × (1 + premium).",
     `Solve 2: substitute → ${b1fe(ev, 1)} × (1 + ${b1fe(p)}%).`,
     `Solve 3: compute → ${f2(pev)}.`]);
}
/* 11:4 — football field: which method gives the low end, which the high end */
function b1_h114(rng){
  const lo = b1ri(rng, 500, 700, 5) / 10, hi = b1ri(rng, 900, 1100, 5) / 10;
  return b1txt(rng,
    `Football field INDF: ${b1f(lo, 1)}–${b1f(hi, 1)}T. Batas bawah dari metode apa? Batas atas?`,
    ["DCF low & precedent",
     "P/E & DCF high",
     "EV/EBITDA & precedent",
     "DCF low & P/E"], 0,
    `Bawah ${b1f(lo, 1)} = DCF low; atas ${b1f(hi, 1)} = precedent ekuitas.`,
    ["Analysis: yang ditanya asal batas bawah & atas football field.",
     `Solve 1: batas bawah ${b1f(lo, 1)}T = ujung pesimis DCF (DCF low).`,
     `Solve 2: batas atas ${b1f(hi, 1)}T = valuasi transaksi precedent (dengan premium kendali).`,
     "Solve 3: rentang = peta kemungkinan, bukan satu harga pasti."]);
}
function b1EN_h114(rng){
  const lo = b1ri(rng, 500, 700, 5) / 10, hi = b1ri(rng, 900, 1100, 5) / 10;
  return b1txt(rng,
    `INDF football field: ${b1fe(lo, 1)}–${b1fe(hi, 1)}T. Which method gives the low end? The high end?`,
    ["DCF low & precedent",
     "P/E & DCF high",
     "EV/EBITDA & precedent",
     "DCF low & P/E"], 0,
    `Low ${b1fe(lo, 1)} = DCF low; high ${b1fe(hi, 1)} = precedent equity.`,
    ["Analysis: the question asks where the football field's low & high ends come from.",
     `Solve 1: the low end ${b1fe(lo, 1)}T = the pessimistic DCF end (DCF low).`,
     `Solve 2: the high end ${b1fe(hi, 1)}T = precedent-transaction value (with control premium).`,
     "Solve 3: the range = a map of possibilities, not one certain price."]);
}
/* 11:5 — cross-check via EV/EBIT */
function b1_h115(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const m = b1ri(rng, 900, 1300, 25) / 100, eb = b1ri(rng, 70, 120, 5) / 10;
  const ev = r2(m * eb);
  const f2 = v => "Rp" + b1f(v, 2) + "T";
  return b1mk(rng,
    `Median EV/EBIT ${b1f(m, 2)}× × EBIT INDF Rp${b1f(eb, 1)}T. Implied EV?`,
    [f2(ev), f2(r2(ev - 20)), f2(r2(ev + 20)), f2(r2(m * (eb + 2)))],
    `${b1f(m, 2)} × ${b1f(eb, 1)} = ${f2(ev)} — cross-check ketiga yang sepakat.`,
    ["Analysis: yang ditanya implied EV via EV/EBIT; diketahui median multiple & EBIT.",
     "Solve 1: rumus — Implied EV = median EV/EBIT × EBIT.",
     `Solve 2: substitusi → ${b1f(m, 2)} × ${b1f(eb, 1)}.`,
     `Solve 3: hitung → ${f2(ev)}.`]);
}
function b1EN_h115(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const m = b1ri(rng, 900, 1300, 25) / 100, eb = b1ri(rng, 70, 120, 5) / 10;
  const ev = r2(m * eb);
  const f2 = v => "Rp" + b1fe(v, 2) + "T";
  return b1mk(rng,
    `Median EV/EBIT ${b1fe(m, 2)}× × INDF EBIT of Rp${b1fe(eb, 1)}T. Implied EV?`,
    [f2(ev), f2(r2(ev - 20)), f2(r2(ev + 20)), f2(r2(m * (eb + 2)))],
    `${b1fe(m, 2)} × ${b1fe(eb, 1)} = ${f2(ev)} — the third cross-check that agrees.`,
    ["Analysis: the question asks for implied EV via EV/EBIT; the median multiple & EBIT are known.",
     "Solve 1: the formula — Implied EV = median EV/EBIT × EBIT.",
     `Solve 2: substitute → ${b1fe(m, 2)} × ${b1fe(eb, 1)}.`,
     `Solve 3: compute → ${f2(ev)}.`]);
}
/* 11:6 — PEG = P/E ÷ EPS growth */
function b1_h116(rng){
  const r2 = v => Math.round(v * 100) / 100;
  let pe = b1ri(rng, 900, 1500, 25) / 100, g = b1ri(rng, 60, 100, 5) / 10, guard = 0;
  while (new Set([r2(pe / g), r2(pe / (g + 2)), 1, r2(pe / g * 1.5)]).size < 4 && guard++ < 60)
    { pe = b1ri(rng, 900, 1500, 25) / 100; g = b1ri(rng, 60, 100, 5) / 10; }
  const peg = r2(pe / g);
  return b1mk(rng,
    `P/E INDF ${b1f(pe, 2)}×, pertumbuhan EPS ${b1f(g, 1)}%. PEG?`,
    [b1f(peg, 2) + "×", b1f(r2(pe / (g + 2)), 2) + "×", "1,00×", b1f(r2(peg * 1.5), 2) + "×"],
    `${b1f(pe, 2)} ÷ ${b1f(g, 1)} = ${b1f(peg, 2)}×. Di atas 1,0× (patokan Lynch) — pasar membayar premi atas pertumbuhan INDF.`,
    ["Analysis: yang ditanya PEG; diketahui P/E & pertumbuhan EPS.",
     "Solve 1: rumus — PEG = P/E ÷ pertumbuhan EPS.",
     `Solve 2: substitusi → ${b1f(pe, 2)} ÷ ${b1f(g, 1)}.`,
     `Solve 3: hitung → ${b1f(peg, 2)}×.`]);
}
function b1EN_h116(rng){
  const r2 = v => Math.round(v * 100) / 100;
  let pe = b1ri(rng, 900, 1500, 25) / 100, g = b1ri(rng, 60, 100, 5) / 10, guard = 0;
  while (new Set([r2(pe / g), r2(pe / (g + 2)), 1, r2(pe / g * 1.5)]).size < 4 && guard++ < 60)
    { pe = b1ri(rng, 900, 1500, 25) / 100; g = b1ri(rng, 60, 100, 5) / 10; }
  const peg = r2(pe / g);
  return b1mk(rng,
    `INDF P/E ${b1fe(pe, 2)}×, EPS growth ${b1fe(g, 1)}%. PEG?`,
    [b1fe(peg, 2) + "×", b1fe(r2(pe / (g + 2)), 2) + "×", "1.00×", b1fe(r2(peg * 1.5), 2) + "×"],
    `${b1fe(pe, 2)} ÷ ${b1fe(g, 1)} = ${b1fe(peg, 2)}×. Above 1.0× (the Lynch benchmark) — the market pays a premium for INDF's growth.`,
    ["Analysis: the question asks for the PEG; P/E & EPS growth are known.",
     "Solve 1: the formula — PEG = P/E ÷ EPS growth.",
     `Solve 2: substitute → ${b1fe(pe, 2)} ÷ ${b1fe(g, 1)}.`,
     `Solve 3: compute → ${b1fe(peg, 2)}×.`]);
}
/* 11:7 — minority + illiquidity discounts stack multiplicatively */
function b1_h117(rng){
  const V = b1ri(rng, 800, 1500, 50), d1 = b1ri(rng, 15, 25, 5), d2 = b1ri(rng, 20, 30, 5);
  const res = Math.round(V * (1 - d1 / 100) * (1 - d2 / 100));
  const v1 = Math.round(V * (1 - d1 / 100)), v2 = Math.round(V * (1 - d2 / 100)), v3 = Math.round(V * (1 - (d1 + d2) / 100));
  return b1mk(rng,
    `Nilai kendali Rp${b1f(V)}jt; diskon minoritas ${b1f(d1)}%; DLOM ${b1f(d2)}%. Nilai saham minoritas tak-likuid?`,
    ["Rp" + b1f(res) + "jt", "Rp" + b1f(v1) + "jt", "Rp" + b1f(v2) + "jt", "Rp" + b1f(v3) + "jt"],
    `${b1f(V)} × ${b1f(100 - d1)}% = ${b1f(v1)}; ${b1f(v1)} × ${b1f(100 - d2)}% = Rp${b1f(res)}jt. Diskon gabungan ${b1f(d1 + d2 - d1 * d2 / 100, 1)}%.`,
    ["Analysis: yang ditanya nilai minoritas tak-likuid; dua diskon berurutan.",
     "Solve 1: diskon minoritas dulu — nilai × (1 − d1).",
     `Solve 2: ${b1f(V)} × ${b1f(100 - d1)}% = Rp${b1f(v1)}jt.`,
     `Solve 3: lalu DLOM — ${b1f(v1)} × ${b1f(100 - d2)}% = Rp${b1f(res)}jt.`]);
}
function b1EN_h117(rng){
  const V = b1ri(rng, 800, 1500, 50), d1 = b1ri(rng, 15, 25, 5), d2 = b1ri(rng, 20, 30, 5);
  const res = Math.round(V * (1 - d1 / 100) * (1 - d2 / 100));
  const v1 = Math.round(V * (1 - d1 / 100)), v2 = Math.round(V * (1 - d2 / 100)), v3 = Math.round(V * (1 - (d1 + d2) / 100));
  return b1mk(rng,
    `Control value Rp${b1fe(V)}m; minority discount ${b1fe(d1)}%; DLOM ${b1fe(d2)}%. Value of an illiquid minority stake?`,
    ["Rp" + b1fe(res) + "m", "Rp" + b1fe(v1) + "m", "Rp" + b1fe(v2) + "m", "Rp" + b1fe(v3) + "m"],
    `${b1fe(V)} × ${b1fe(100 - d1)}% = ${b1fe(v1)}; ${b1fe(v1)} × ${b1fe(100 - d2)}% = Rp${b1fe(res)}m. Combined discount ${b1fe(d1 + d2 - d1 * d2 / 100, 1)}%.`,
    ["Analysis: the question asks for the illiquid minority value; two discounts in sequence.",
     "Solve 1: minority discount first — value × (1 − d1).",
     `Solve 2: ${b1fe(V)} × ${b1fe(100 - d1)}% = Rp${b1fe(v1)}m.`,
     `Solve 3: then DLOM — ${b1fe(v1)} × ${b1fe(100 - d2)}% = Rp${b1fe(res)}m.`]);
}
/* 11:8 — convert when conversion value exceeds the bond value */
function b1_h118(rng){
  let N = b1ri(rng, 50, 200, 10), P = b1ri(rng, 8, 20, 1), guard = 0;
  while (N * P <= 1000 && guard++ < 60) P = b1ri(rng, 8, 20, 1);
  const conv = N * P;
  return b1txt(rng,
    `Obligasi konversi Rp1.000jt → ${b1f(N)} saham; harga saham Rp${b1f(P)}jt. Apa yang dilakukan pemegang?`,
    [`Konversi (nilai konversi Rp${b1f(conv)}jt > obligasi)`,
     "Tetap pegang obligasi",
     "Jual obligasi di bawah par",
     "Tidak bisa ditentukan"], 0,
    `Nilai konversi = ${b1f(N)} × Rp${b1f(P)}jt = Rp${b1f(conv)}jt > Rp1.000jt → konversi menguntungkan. DCF harus pakai saham terdilusi.`,
    ["Analysis: yang ditanya keputusan pemegang — bandingkan nilai konversi vs nilai obligasi.",
     `Solve 1: nilai konversi = jumlah saham × harga saham = ${b1f(N)} × ${b1f(P)}.`,
     `Solve 2: hitung → Rp${b1f(conv)}jt vs obligasi Rp1.000jt.`,
     "Solve 3: konversi lebih besar → konversi."]);
}
function b1EN_h118(rng){
  let N = b1ri(rng, 50, 200, 10), P = b1ri(rng, 8, 20, 1), guard = 0;
  while (N * P <= 1000 && guard++ < 60) P = b1ri(rng, 8, 20, 1);
  const conv = N * P;
  return b1txt(rng,
    `A convertible bond of Rp1,000m converts into ${b1fe(N)} shares; the share price is Rp${b1fe(P)}m. What does the holder do?`,
    [`Convert (conversion value Rp${b1fe(conv)}m > the bond)`,
     "Keep holding the bond",
     "Sell the bond below par",
     "Cannot be determined"], 0,
    `Conversion value = ${b1fe(N)} × Rp${b1fe(P)}m = Rp${b1fe(conv)}m > Rp1,000m → converting pays. DCF must use diluted shares.`,
    ["Analysis: the question asks what the holder does — compare conversion value vs bond value.",
     `Solve 1: conversion value = shares × share price = ${b1fe(N)} × ${b1fe(P)}.`,
     `Solve 2: compute → Rp${b1fe(conv)}m vs the Rp1,000m bond.`,
     "Solve 3: conversion is larger → convert."]);
}

/* ================= hari-12 ================= */
/* 12:0 — EBIT = Revenue − COGS − SG&A */
function b1_h120(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const rev = b1ri(rng, 1000, 1800, 10) / 10, cp = b1ri(rng, 65, 75, 1), sga = b1ri(rng, 120, 250, 5) / 10;
  const cogs = r2(rev * cp / 100), ebit = r2(rev - cogs - sga);
  const f2 = v => "Rp" + b1f(v, 2) + "T";
  return b1mk(rng,
    `Revenue Rp${b1f(rev, 1)}T, COGS ${b1f(cp)}%, SG&A Rp${b1f(sga, 1)}T. EBIT 2026?`,
    [f2(ebit), f2(r2(rev - cogs)), f2(r2(rev - sga)), f2(r2(ebit + 5))],
    `${b1f(rev, 1)} − ${f2(cogs).slice(2)} − ${b1f(sga, 1)} = ${f2(ebit)} (marjin ${b1f(r2(ebit / rev * 100), 1)}%).`,
    ["Analysis: yang ditanya EBIT; diketahui revenue, COGS%, SG&A.",
     `Solve 1: COGS = ${b1f(cp)}% × revenue = ${f2(cogs)}.`,
     `Solve 2: EBIT = Revenue − COGS − SG&A = ${b1f(rev, 1)} − ${b1f(cogs, 2)} − ${b1f(sga, 1)}.`,
     `Solve 3: hitung → ${f2(ebit)}.`]);
}
function b1EN_h120(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const rev = b1ri(rng, 1000, 1800, 10) / 10, cp = b1ri(rng, 65, 75, 1), sga = b1ri(rng, 120, 250, 5) / 10;
  const cogs = r2(rev * cp / 100), ebit = r2(rev - cogs - sga);
  const f2 = v => "Rp" + b1fe(v, 2) + "T";
  return b1mk(rng,
    `Revenue Rp${b1fe(rev, 1)}T, COGS ${b1fe(cp)}%, SG&A Rp${b1fe(sga, 1)}T. EBIT in 2026?`,
    [f2(ebit), f2(r2(rev - cogs)), f2(r2(rev - sga)), f2(r2(ebit + 5))],
    `${b1fe(rev, 1)} − ${f2(cogs).slice(2)} − ${b1fe(sga, 1)} = ${f2(ebit)} (margin ${b1fe(r2(ebit / rev * 100), 1)}%).`,
    ["Analysis: the question asks for EBIT; revenue, COGS%, and SG&A are known.",
     `Solve 1: COGS = ${b1fe(cp)}% × revenue = ${f2(cogs)}.`,
     `Solve 2: EBIT = Revenue − COGS − SG&A = ${b1fe(rev, 1)} − ${b1fe(cogs, 2)} − ${b1fe(sga, 1)}.`,
     `Solve 3: compute → ${f2(ebit)}.`]);
}
/* 12:1 — CFO (trillion scale) */
function b1_h121(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const ni = b1ri(rng, 1200, 1800, 5) / 100, dep = b1ri(rng, 500, 800, 5) / 100, dwc = b1ri(rng, 10, 50, 1) / 100;
  const cfo = r2(ni + dep - dwc);
  const f2 = v => "Rp" + b1f(v, 2) + "T";
  return b1mk(rng,
    `NI Rp${b1f(ni, 2)}T, susut Rp${b1f(dep, 2)}T, ΔWC +Rp${b1f(dwc, 2)}T. CFO 2026?`,
    [f2(cfo), f2(r2(ni + dep)), f2(r2(ni - dwc)), f2(r2(ni + dep + dwc))],
    `${b1f(ni, 2)} + ${b1f(dep, 2)} − ${b1f(dwc, 2)} = ${f2(cfo)}.`,
    ["Analysis: yang ditanya CFO 2026; diketahui NI, susut, ΔWC.",
     "Solve 1: rumus — CFO = NI + beban non-kas − kenaikan WC.",
     `Solve 2: substitusi → ${b1f(ni, 2)} + ${b1f(dep, 2)} − ${b1f(dwc, 2)}.`,
     `Solve 3: hitung → ${f2(cfo)}.`]);
}
function b1EN_h121(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const ni = b1ri(rng, 1200, 1800, 5) / 100, dep = b1ri(rng, 500, 800, 5) / 100, dwc = b1ri(rng, 10, 50, 1) / 100;
  const cfo = r2(ni + dep - dwc);
  const f2 = v => "Rp" + b1fe(v, 2) + "T";
  return b1mk(rng,
    `NI Rp${b1fe(ni, 2)}T, depreciation Rp${b1fe(dep, 2)}T, ΔWC +Rp${b1fe(dwc, 2)}T. CFO in 2026?`,
    [f2(cfo), f2(r2(ni + dep)), f2(r2(ni - dwc)), f2(r2(ni + dep + dwc))],
    `${b1fe(ni, 2)} + ${b1fe(dep, 2)} − ${b1fe(dwc, 2)} = ${f2(cfo)}.`,
    ["Analysis: the question asks for 2026 CFO; NI, depreciation, and ΔWC are known.",
     "Solve 1: the formula — CFO = NI + non-cash expenses − rise in WC.",
     `Solve 2: substitute → ${b1fe(ni, 2)} + ${b1fe(dep, 2)} − ${b1fe(dwc, 2)}.`,
     `Solve 3: compute → ${f2(cfo)}.`]);
}
/* 12:2 — FCFF from CFO: add back after-tax interest, subtract capex */
function b1_h122(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const cfo = b1ri(rng, 1800, 2400, 5) / 100, intr = b1ri(rng, 100, 300, 25) / 100, cx = b1ri(rng, 400, 700, 10) / 100;
  const fcff = r2(cfo + intr * 0.78 - cx);
  const f2 = v => "Rp" + b1f(v, 2) + "T";
  return b1mk(rng,
    `CFO Rp${b1f(cfo, 2)}T, bunga Rp${b1f(intr, 2)}T, pajak 22%, capex Rp${b1f(cx, 2)}T. FCFF 2026?`,
    [f2(fcff), f2(r2(cfo - cx)), f2(cfo), f2(r2(cfo + intr - cx))],
    `${b1f(cfo, 2)} + ${b1f(r2(intr * 0.78), 2)} − ${b1f(cx, 2)} = ${f2(fcff)}. Tanpa add-back bunga = arus kas levered, bukan FCFF.`,
    ["Analysis: yang ditanya FCFF; diketahui CFO (levered), bunga, pajak, capex.",
     "Solve 1: rumus — FCFF = CFO + bunga×(1−t) − capex.",
     `Solve 2: substitusi → ${b1f(cfo, 2)} + ${b1f(intr, 2)}×0,78 − ${b1f(cx, 2)}.`,
     `Solve 3: hitung → ${f2(fcff)}.`]);
}
function b1EN_h122(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const cfo = b1ri(rng, 1800, 2400, 5) / 100, intr = b1ri(rng, 100, 300, 25) / 100, cx = b1ri(rng, 400, 700, 10) / 100;
  const fcff = r2(cfo + intr * 0.78 - cx);
  const f2 = v => "Rp" + b1fe(v, 2) + "T";
  return b1mk(rng,
    `CFO Rp${b1fe(cfo, 2)}T, interest Rp${b1fe(intr, 2)}T, tax 22%, capex Rp${b1fe(cx, 2)}T. FCFF in 2026?`,
    [f2(fcff), f2(r2(cfo - cx)), f2(cfo), f2(r2(cfo + intr - cx))],
    `${b1fe(cfo, 2)} + ${b1fe(r2(intr * 0.78), 2)} − ${b1fe(cx, 2)} = ${f2(fcff)}. Without the interest add-back it is levered cash flow, not FCFF.`,
    ["Analysis: the question asks for FCFF; levered CFO, interest, tax, and capex are known.",
     "Solve 1: the formula — FCFF = CFO + interest×(1−t) − capex.",
     `Solve 2: substitute → ${b1fe(cfo, 2)} + ${b1fe(intr, 2)}×0.78 − ${b1fe(cx, 2)}.`,
     `Solve 3: compute → ${f2(fcff)}.`]);
}
/* 12:3 — RE roll-forward (trillion scale) */
function b1_h123(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const R0 = b1ri(rng, 4500, 5500, 5) / 100, ni = b1ri(rng, 1200, 1800, 5) / 100, D = b1ri(rng, 300, 500, 5) / 100;
  const RE = r2(R0 + ni - D);
  const f2 = v => "Rp" + b1f(v, 2) + "T";
  return b1mk(rng,
    `RE awal Rp${b1f(R0, 2)}T, NI Rp${b1f(ni, 2)}T, dividen Rp${b1f(D, 2)}T. RE akhir 2026?`,
    [f2(RE), f2(r2(R0 + ni)), f2(r2(R0 + ni + D)), f2(r2(R0 - D))],
    `${b1f(R0, 2)} + ${b1f(ni, 2)} − ${b1f(D, 2)} = ${f2(RE)}.`,
    ["Analysis: yang ditanya RE akhir 2026; diketahui RE awal, NI, dividen.",
     "Solve 1: rumus — RE(akhir) = RE(awal) + NI − Dividen.",
     `Solve 2: substitusi → ${b1f(R0, 2)} + ${b1f(ni, 2)} − ${b1f(D, 2)}.`,
     `Solve 3: hitung → ${f2(RE)}.`]);
}
function b1EN_h123(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const R0 = b1ri(rng, 4500, 5500, 5) / 100, ni = b1ri(rng, 1200, 1800, 5) / 100, D = b1ri(rng, 300, 500, 5) / 100;
  const RE = r2(R0 + ni - D);
  const f2 = v => "Rp" + b1fe(v, 2) + "T";
  return b1mk(rng,
    `Opening RE Rp${b1fe(R0, 2)}T, NI Rp${b1fe(ni, 2)}T, dividends Rp${b1fe(D, 2)}T. Ending RE in 2026?`,
    [f2(RE), f2(r2(R0 + ni)), f2(r2(R0 + ni + D)), f2(r2(R0 - D))],
    `${b1fe(R0, 2)} + ${b1fe(ni, 2)} − ${b1fe(D, 2)} = ${f2(RE)}.`,
    ["Analysis: the question asks for ending RE in 2026; opening RE, NI, and dividends are known.",
     "Solve 1: the formula — RE(end) = RE(start) + NI − Dividends.",
     `Solve 2: substitute → ${b1fe(R0, 2)} + ${b1fe(ni, 2)} − ${b1fe(D, 2)}.`,
     `Solve 3: compute → ${f2(RE)}.`]);
}
/* 12:4 — equity = total assets − total liabilities */
function b1_h124(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const A = b1ri(rng, 14000, 16000, 10) / 100, L = b1ri(rng, 7500, 9000, 10) / 100;
  const E = r2(A - L);
  const f2 = v => "Rp" + b1f(v, 2) + "T";
  return b1mk(rng,
    `Total aset Rp${b1f(A, 2)}T, liabilitas Rp${b1f(L, 2)}T. Ekuitas?`,
    [f2(E), f2(A), f2(r2(A + L)), f2(L)],
    `${b1f(A, 2)} − ${b1f(L, 2)} = ${f2(E)}.`,
    ["Analysis: yang ditanya ekuitas; diketahui total aset & liabilitas.",
     "Solve 1: persamaan — Aset = Liabilitas + Ekuitas.",
     `Solve 2: Ekuitas = Aset − Liabilitas = ${b1f(A, 2)} − ${b1f(L, 2)}.`,
     `Solve 3: hitung → ${f2(E)}.`]);
}
function b1EN_h124(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const A = b1ri(rng, 14000, 16000, 10) / 100, L = b1ri(rng, 7500, 9000, 10) / 100;
  const E = r2(A - L);
  const f2 = v => "Rp" + b1fe(v, 2) + "T";
  return b1mk(rng,
    `Total assets Rp${b1fe(A, 2)}T, liabilities Rp${b1fe(L, 2)}T. Equity?`,
    [f2(E), f2(A), f2(r2(A + L)), f2(L)],
    `${b1fe(A, 2)} − ${b1fe(L, 2)} = ${f2(E)}.`,
    ["Analysis: the question asks for equity; total assets & liabilities are known.",
     "Solve 1: the equation — Assets = Liabilities + Equity.",
     `Solve 2: Equity = Assets − Liabilities = ${b1fe(A, 2)} − ${b1fe(L, 2)}.`,
     `Solve 3: compute → ${f2(E)}.`]);
}

/* ================= hari-13 ================= */
/* 13:0 — next-year FCFF grows by g */
function b1_h130(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const F0 = b1ri(rng, 800, 1500, 25) / 100, g = b1ri(rng, 150, 250, 25) / 100;
  const F1 = r2(F0 * (1 + g / 100));
  const f2 = v => "Rp" + b1f(v, 2) + "T";
  return b1mk(rng,
    `FCFF 2030 Rp${b1f(F0, 2)}T, g ${b1f(g, 2)}%. FCFF 2031?`,
    [f2(F1), f2(F0), f2(r2(F0 * (1 + 2 * g / 100))), f2(r2(F0 * (1 - g / 100)))],
    `${b1f(F0, 2)} × ${(1 + g / 100).toFixed(4).replace(".", ",")} = ${f2(F1)}.`,
    ["Analysis: yang ditanya FCFF tahun depan; diketahui FCFF tahun ini & g.",
     "Solve 1: rumus — FCFF(t+1) = FCFF(t) × (1 + g).",
     `Solve 2: substitusi → ${b1f(F0, 2)} × (1 + ${b1f(g, 2)}%).`,
     `Solve 3: hitung → ${f2(F1)}.`]);
}
function b1EN_h130(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const F0 = b1ri(rng, 800, 1500, 25) / 100, g = b1ri(rng, 150, 250, 25) / 100;
  const F1 = r2(F0 * (1 + g / 100));
  const f2 = v => "Rp" + b1fe(v, 2) + "T";
  return b1mk(rng,
    `FCFF in 2030 Rp${b1fe(F0, 2)}T, g ${b1fe(g, 2)}%. FCFF in 2031?`,
    [f2(F1), f2(F0), f2(r2(F0 * (1 + 2 * g / 100))), f2(r2(F0 * (1 - g / 100)))],
    `${b1fe(F0, 2)} × ${(1 + g / 100).toFixed(4)} = ${f2(F1)}.`,
    ["Analysis: the question asks for next year's FCFF; this year's FCFF & g are known.",
     "Solve 1: the formula — FCFF(t+1) = FCFF(t) × (1 + g).",
     `Solve 2: substitute → ${b1fe(F0, 2)} × (1 + ${b1fe(g, 2)}%).`,
     `Solve 3: compute → ${f2(F1)}.`]);
}
/* 13:1 — Gordon TV from next-year FCFF */
function b1_h131(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const F0 = b1ri(rng, 800, 1500, 25) / 100, g = b1ri(rng, 150, 250, 25) / 100;
  const F1 = r2(F0 * (1 + g / 100)), w = b1ri(rng, 100, 130, 5) / 10;
  const tv = r2(F1 / ((w - g) / 100));
  const f2 = v => "Rp" + b1f(v, 2) + "T";
  return b1mk(rng,
    `TV = ${b1f(F1, 2)} ÷ (${b1f(w, 1)} − ${b1f(g, 2)}). Hasil?`,
    [f2(tv), f2(r2(F1 / (w / 100))), f2(r2(F1 / ((w + g) / 100))), f2(r2(tv * 1.2))],
    `${b1f(F1, 2)} ÷ ${b1f(r2(w - g), 2)}% = ${f2(tv)}.`,
    ["Analysis: yang ditanya TV; diketahui FCFF tahun depan, WACC, g.",
     "Solve 1: rumus Gordon — TV = FCFF(1) ÷ (WACC − g).",
     `Solve 2: substitusi → ${b1f(F1, 2)} ÷ (${b1f(w, 1)}% − ${b1f(g, 2)}%).`,
     `Solve 3: hitung → ${f2(tv)}.`]);
}
function b1EN_h131(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const F0 = b1ri(rng, 800, 1500, 25) / 100, g = b1ri(rng, 150, 250, 25) / 100;
  const F1 = r2(F0 * (1 + g / 100)), w = b1ri(rng, 100, 130, 5) / 10;
  const tv = r2(F1 / ((w - g) / 100));
  const f2 = v => "Rp" + b1fe(v, 2) + "T";
  return b1mk(rng,
    `TV = ${b1fe(F1, 2)} ÷ (${b1fe(w, 1)} − ${b1fe(g, 2)}). What is the result?`,
    [f2(tv), f2(r2(F1 / (w / 100))), f2(r2(F1 / ((w + g) / 100))), f2(r2(tv * 1.2))],
    `${b1fe(F1, 2)} ÷ ${b1fe(r2(w - g), 2)}% = ${f2(tv)}.`,
    ["Analysis: the question asks for the TV; next-year FCFF, WACC, and g are known.",
     "Solve 1: the Gordon formula — TV = FCFF(1) ÷ (WACC − g).",
     `Solve 2: substitute → ${b1fe(F1, 2)} ÷ (${b1fe(w, 1)}% − ${b1fe(g, 2)}%).`,
     `Solve 3: compute → ${f2(tv)}.`]);
}
/* 13:2 — EV = PV(TV) + PV(FCFF) */
function b1_h132(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const pvtv = b1ri(rng, 5500, 7500, 25) / 100, pvf = b1ri(rng, 4500, 6000, 25) / 100;
  const ev = r2(pvtv + pvf);
  const f2 = v => "Rp" + b1f(v, 2) + "T";
  return b1mk(rng,
    `PV TV Rp${b1f(pvtv, 2)}T + PV FCFF Rp${b1f(pvf, 2)}T. Enterprise value?`,
    [f2(ev), f2(r2(pvtv + pvf + 10)), f2(pvtv), f2(r2(pvtv - pvf))],
    `${b1f(pvtv, 2)} + ${b1f(pvf, 2)} = ${f2(ev)}.`,
    ["Analysis: yang ditanya EV; diketahui PV TV & PV FCFF.",
     "Solve 1: rumus — EV = PV(TV) + PV(FCFF).",
     `Solve 2: substitusi → ${b1f(pvtv, 2)} + ${b1f(pvf, 2)}.`,
     `Solve 3: hitung → ${f2(ev)}.`]);
}
function b1EN_h132(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const pvtv = b1ri(rng, 5500, 7500, 25) / 100, pvf = b1ri(rng, 4500, 6000, 25) / 100;
  const ev = r2(pvtv + pvf);
  const f2 = v => "Rp" + b1fe(v, 2) + "T";
  return b1mk(rng,
    `PV of TV Rp${b1fe(pvtv, 2)}T + PV of FCFF Rp${b1fe(pvf, 2)}T. Enterprise value?`,
    [f2(ev), f2(r2(pvtv + pvf + 10)), f2(pvtv), f2(r2(pvtv - pvf))],
    `${b1fe(pvtv, 2)} + ${b1fe(pvf, 2)} = ${f2(ev)}.`,
    ["Analysis: the question asks for EV; PV of TV & PV of FCFF are known.",
     "Solve 1: the formula — EV = PV(TV) + PV(FCFF).",
     `Solve 2: substitute → ${b1fe(pvtv, 2)} + ${b1fe(pvf, 2)}.`,
     `Solve 3: compute → ${f2(ev)}.`]);
}
/* 13:3 — equity value = EV − net debt */
function b1_h133(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const ev = b1ri(rng, 10000, 13000, 25) / 100, nd = b1ri(rng, 3500, 4500, 25) / 100;
  const eq = r2(ev - nd);
  const f2 = v => "Rp" + b1f(v, 2) + "T";
  return b1mk(rng,
    `EV Rp${b1f(ev, 2)}T, net debt Rp${b1f(nd, 2)}T. Ekuitas?`,
    [f2(eq), f2(r2(ev + nd)), f2(nd), f2(ev)],
    `${b1f(ev, 2)} − ${b1f(nd, 2)} = ${f2(eq)}.`,
    ["Analysis: yang ditanya nilai ekuitas; diketahui EV & net debt.",
     "Solve 1: rumus — Ekuitas = EV − net debt.",
     `Solve 2: substitusi → ${b1f(ev, 2)} − ${b1f(nd, 2)}.`,
     `Solve 3: hitung → ${f2(eq)}.`]);
}
function b1EN_h133(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const ev = b1ri(rng, 10000, 13000, 25) / 100, nd = b1ri(rng, 3500, 4500, 25) / 100;
  const eq = r2(ev - nd);
  const f2 = v => "Rp" + b1fe(v, 2) + "T";
  return b1mk(rng,
    `EV Rp${b1fe(ev, 2)}T, net debt Rp${b1fe(nd, 2)}T. Equity value?`,
    [f2(eq), f2(r2(ev + nd)), f2(nd), f2(ev)],
    `${b1fe(ev, 2)} − ${b1fe(nd, 2)} = ${f2(eq)}.`,
    ["Analysis: the question asks for equity value; EV & net debt are known.",
     "Solve 1: the formula — Equity = EV − net debt.",
     `Solve 2: substitute → ${b1fe(ev, 2)} − ${b1fe(nd, 2)}.`,
     `Solve 3: compute → ${f2(eq)}.`]);
}
/* 13:4 — value per share = equity ÷ shares outstanding */
function b1_h134(rng){
  const E = b1ri(rng, 6000, 9000, 50) / 100, S = b1ri(rng, 700, 1000, 25) / 100;
  const px = Math.round(E / S * 1000);
  return b1mk(rng,
    `Ekuitas Rp${b1f(E, 2)}T, saham ${b1f(S, 2)} miliar. Nilai per saham?`,
    ["Rp" + b1f(px), "Rp" + b1f(Math.round(E / (S + 1) * 1000)), "Rp" + b1f(Math.round((E + 10) / S * 1000)), "Rp" + b1f(Math.round(E / S * 100))],
    `${b1f(E, 2)} ÷ ${b1f(S, 2)} × 1.000 = Rp${b1f(px)} (ilustrasi).`,
    ["Analysis: yang ditanya nilai per saham; diketahui ekuitas & jumlah saham.",
     "Solve 1: rumus — Harga/saham = ekuitas ÷ saham beredar.",
     `Solve 2: substitusi → ${b1f(E, 2)}T ÷ ${b1f(S, 2)} miliar.`,
     `Solve 3: hitung → Rp${b1f(px)}.`]);
}
function b1EN_h134(rng){
  const E = b1ri(rng, 6000, 9000, 50) / 100, S = b1ri(rng, 700, 1000, 25) / 100;
  const px = Math.round(E / S * 1000);
  return b1mk(rng,
    `Equity Rp${b1fe(E, 2)}T, ${b1fe(S, 2)} billion shares. Value per share?`,
    ["Rp" + b1fe(px), "Rp" + b1fe(Math.round(E / (S + 1) * 1000)), "Rp" + b1fe(Math.round((E + 10) / S * 1000)), "Rp" + b1fe(Math.round(E / S * 100))],
    `${b1fe(E, 2)} ÷ ${b1fe(S, 2)} × 1,000 = Rp${b1fe(px)} (illustration).`,
    ["Analysis: the question asks for value per share; equity & shares outstanding are known.",
     "Solve 1: the formula — Price/share = equity ÷ shares outstanding.",
     `Solve 2: substitute → ${b1fe(E, 2)}T ÷ ${b1fe(S, 2)} billion.`,
     `Solve 3: compute → Rp${b1fe(px)}.`]);
}
/* 13:5 — normalised EV: mid-cycle FCFF, not peak FCFF */
function b1_h135(rng){
  const fmid = b1ri(rng, 150, 300, 10), w = b1ri(rng, 10, 12, 1), g = b1ri(rng, 2, 4, 1);
  const evn = Math.round(fmid * (1 + g / 100) / ((w - g) / 100));
  const fpeak = fmid * 1.75, evp = Math.round(fpeak * (1 + g / 100) / ((w - g) / 100));
  return b1mk(rng,
    `FCFF mid-cycle Rp${b1f(fmid)}jt, WACC ${b1f(w)}%, g ${b1f(g)}%. EV ternormalisasi? (FCFF puncak Rp${b1f(fpeak, 1)}jt memberi EV Rp${b1f(evp)}jt.)`,
    ["Rp" + b1f(evn) + "jt", "Rp" + b1f(evp) + "jt", "Rp" + b1f(Math.round(fmid / ((w - g) / 100))) + "jt", "Rp" + b1f(evn + 500) + "jt"],
    `EV = ${b1f(fmid * (1 + g / 100), 1)} ÷ ${b1f(w - g)}% = Rp${b1f(evn)}jt. FCFF puncak memberi Rp${b1f(evp)}jt — lebih mahal untuk perusahaan yang sama.`,
    ["Analysis: yang ditanya EV ternormalisasi — pakai FCFF mid-cycle, bukan puncak.",
     `Solve 1: FCFF tahun depan = ${b1f(fmid)} × (1 + ${b1f(g)}%) = Rp${b1f(fmid * (1 + g / 100), 1)}jt.`,
     `Solve 2: EV = FCFF(1) ÷ (WACC−g) = ${b1f(fmid * (1 + g / 100), 1)} ÷ ${b1f(w - g)}%.`,
     `Solve 3: hitung → Rp${b1f(evn)}jt.`]);
}
function b1EN_h135(rng){
  const fmid = b1ri(rng, 150, 300, 10), w = b1ri(rng, 10, 12, 1), g = b1ri(rng, 2, 4, 1);
  const evn = Math.round(fmid * (1 + g / 100) / ((w - g) / 100));
  const fpeak = fmid * 1.75, evp = Math.round(fpeak * (1 + g / 100) / ((w - g) / 100));
  return b1mk(rng,
    `Mid-cycle FCFF Rp${b1fe(fmid)}m, WACC ${b1fe(w)}%, g ${b1fe(g)}%. Normalised EV? (Peak FCFF Rp${b1fe(fpeak, 1)}m gives EV Rp${b1fe(evp)}m.)`,
    ["Rp" + b1fe(evn) + "m", "Rp" + b1fe(evp) + "m", "Rp" + b1fe(Math.round(fmid / ((w - g) / 100))) + "m", "Rp" + b1fe(evn + 500) + "m"],
    `EV = ${b1fe(fmid * (1 + g / 100), 1)} ÷ ${b1fe(w - g)}% = Rp${b1fe(evn)}m. Peak FCFF gives Rp${b1fe(evp)}m — pricier for the same company.`,
    ["Analysis: the question asks for normalised EV — use mid-cycle FCFF, not peak FCFF.",
     `Solve 1: next-year FCFF = ${b1fe(fmid)} × (1 + ${b1fe(g)}%) = Rp${b1fe(fmid * (1 + g / 100), 1)}m.`,
     `Solve 2: EV = FCFF(1) ÷ (WACC−g) = ${b1fe(fmid * (1 + g / 100), 1)} ÷ ${b1fe(w - g)}%.`,
     `Solve 3: compute → Rp${b1fe(evn)}m.`]);
}
/* 13:6 — an ESG-driven WACC rise cuts EV (same risk must not be double-counted) */
function b1_h136(rng){
  const r2 = v => Math.round(v * 100) / 100, r1 = v => Math.round(v * 10) / 10;
  const fcff = b1ri(rng, 80, 150, 10), w0 = b1ri(rng, 100, 120, 5) / 10, w1 = r1(w0 + 0.5), g = b1ri(rng, 20, 40, 5) / 10;
  const ev0 = r2(fcff * (1 + g / 100) / ((w0 - g) / 100)), ev1 = r2(fcff * (1 + g / 100) / ((w1 - g) / 100));
  const pct = r1((ev0 - ev1) / ev0 * 100);
  return b1txt(rng,
    `ESG menaikkan WACC dari ${b1f(w0, 1)}% ke ${b1f(w1, 1)}% (FCFF Rp${b1f(fcff)}jt, g ${b1f(g, 1)}%). Efek ke EV?`,
    [`Turun ${b1f(pct, 1)}% (Rp${b1f(ev0, 2)}jt → Rp${b1f(ev1, 2)}jt)`,
     `Naik ${b1f(pct, 1)}%`,
     "Tidak berubah",
     `Turun ${b1f(r1(pct * 2), 1)}%`], 0,
    `EV baru = ${b1f(fcff * (1 + g / 100), 1)} ÷ ${b1f(r2(w1 - g), 2)}% = Rp${b1f(ev1, 2)}jt, turun ${b1f(pct, 1)}%. ESG hanya lewat pintu WACC atau arus kas — jangan keduanya untuk risiko yang sama.`,
    ["Analysis: yang ditanya efek kenaikan WACC ke EV.",
     `Solve 1: EV lama = ${b1f(fcff * (1 + g / 100), 1)} ÷ ${b1f(r2(w0 - g), 2)}% = Rp${b1f(ev0, 2)}jt.`,
     `Solve 2: EV baru = ${b1f(fcff * (1 + g / 100), 1)} ÷ ${b1f(r2(w1 - g), 2)}% = Rp${b1f(ev1, 2)}jt.`,
     `Solve 3: turun ${b1f(pct, 1)}% — WACC naik, EV turun.`]);
}
function b1EN_h136(rng){
  const r2 = v => Math.round(v * 100) / 100, r1 = v => Math.round(v * 10) / 10;
  const fcff = b1ri(rng, 80, 150, 10), w0 = b1ri(rng, 100, 120, 5) / 10, w1 = r1(w0 + 0.5), g = b1ri(rng, 20, 40, 5) / 10;
  const ev0 = r2(fcff * (1 + g / 100) / ((w0 - g) / 100)), ev1 = r2(fcff * (1 + g / 100) / ((w1 - g) / 100));
  const pct = r1((ev0 - ev1) / ev0 * 100);
  return b1txt(rng,
    `ESG lifts WACC from ${b1fe(w0, 1)}% to ${b1fe(w1, 1)}% (FCFF Rp${b1fe(fcff)}m, g ${b1fe(g, 1)}%). What happens to EV?`,
    [`Down ${b1fe(pct, 1)}% (Rp${b1fe(ev0, 2)}m → Rp${b1fe(ev1, 2)}m)`,
     `Up ${b1fe(pct, 1)}%`,
     "Unchanged",
     `Down ${b1fe(r1(pct * 2), 1)}%`], 0,
    `New EV = ${b1fe(fcff * (1 + g / 100), 1)} ÷ ${b1fe(r2(w1 - g), 2)}% = Rp${b1fe(ev1, 2)}m, down ${b1fe(pct, 1)}%. ESG enters through WACC or through cash flows — never both for the same risk.`,
    ["Analysis: the question asks what a WACC rise does to EV.",
     `Solve 1: old EV = ${b1fe(fcff * (1 + g / 100), 1)} ÷ ${b1fe(r2(w0 - g), 2)}% = Rp${b1fe(ev0, 2)}m.`,
     `Solve 2: new EV = ${b1fe(fcff * (1 + g / 100), 1)} ÷ ${b1fe(r2(w1 - g), 2)}% = Rp${b1fe(ev1, 2)}m.`,
     `Solve 3: down ${b1fe(pct, 1)}% — WACC up, EV down.`]);
}

/* ================= hari-14 ================= */
/* 14:0 — FCFF in an investment year */
function b1_h140(rng){
  let cfo = b1ri(rng, 1500, 2500, 100), cx = b1ri(rng, 3000, 5000, 100), guard = 0;
  while (cfo - cx === 0 && guard++ < 60) cx = b1ri(rng, 3000, 5000, 100);
  const fcff = cfo - cx;
  return b1mk(rng,
    `PT Maju Jaya: CFO Rp${b1f(cfo)}rb, capex Rp${b1f(cx)}rb. FCFF?`,
    [b1rp(fcff, "rb"), "Rp" + b1f(cfo + cx) + "rb", "Rp" + b1f(cfo) + "rb", b1rp(cx - cfo, "rb")],
    `${b1f(cfo)} − ${b1f(cx)} = ${b1rp(fcff, "rb")}. Negatif karena tahun investasi (capex > CFO) — dijelaskan, bukan salah hitung.`,
    ["Analysis: yang ditanya FCFF; diketahui CFO & capex.",
     "Solve 1: rumus — FCFF = CFO − capex.",
     `Solve 2: substitusi → ${b1f(cfo)} − ${b1f(cx)}.`,
     `Solve 3: hitung → ${b1rp(fcff, "rb")}.`]);
}
function b1EN_h140(rng){
  let cfo = b1ri(rng, 1500, 2500, 100), cx = b1ri(rng, 3000, 5000, 100), guard = 0;
  while (cfo - cx === 0 && guard++ < 60) cx = b1ri(rng, 3000, 5000, 100);
  const fcff = cfo - cx;
  return b1mk(rng,
    `PT Maju Jaya: CFO Rp${b1fe(cfo)}k, capex Rp${b1fe(cx)}k. FCFF?`,
    [b1rpe(fcff, "k"), "Rp" + b1fe(cfo + cx) + "k", "Rp" + b1fe(cfo) + "k", b1rpe(cx - cfo, "k")],
    `${b1fe(cfo)} − ${b1fe(cx)} = ${b1rpe(fcff, "k")}. Negative because it is an investment year (capex > CFO) — explained, not miscalculated.`,
    ["Analysis: the question asks for FCFF; CFO & capex are known.",
     "Solve 1: the formula — FCFF = CFO − capex.",
     `Solve 2: substitute → ${b1fe(cfo)} − ${b1fe(cx)}.`,
     `Solve 3: compute → ${b1rpe(fcff, "k")}.`]);
}
/* 14:1 — a stated teaching WACC trains mechanics, it does not price the market */
function b1_h141(rng){
  const w = b1ri(rng, 10, 14, 1);
  return b1txt(rng,
    `WACC ${b1f(w)}% di Gerbang 2 dinyatakan sebagai 'asumsi pengajaran' yang langsung diberikan. Implikasinya?`,
    ["Boleh dipakai untuk menawar saham sungguhan",
     "Jangan diklaim sebagai biaya modal pasar — ia melatih mekanik, bukan memvonis harga",
     `Angka ini harus diganti ${b1f(w + 1)}%`,
     "Tidak boleh dipakai sama sekali"], 1,
    `${b1f(w)}% adalah input soal untuk melatih mekanik DCF. Mengklaimnya sebagai biaya modal pasar PT Maju Jaya = false precision.`,
    ["Analysis: yang ditanya status angka WACC yang diberikan sebagai asumsi pengajaran.",
     "Solve 1: asumsi pengajaran = angka latihan, bukan estimasi pasar.",
     "Solve 2: mekanik DCF-nya nyata; biaya modal pasarnya belum diestimasi.",
     "Solve 3: pakai untuk belajar, jangan untuk menawar saham sungguhan."]);
}
function b1EN_h141(rng){
  const w = b1ri(rng, 10, 14, 1);
  return b1txt(rng,
    `A WACC of ${b1fe(w)}% in Gate 2 is stated as a 'teaching assumption' given directly. What does that imply?`,
    ["It can be used to bid for real shares",
     "Do not claim it as the market cost of capital — it trains mechanics, not verdicts on price",
     `The number must be changed to ${b1fe(w + 1)}%`,
     "It must not be used at all"], 1,
    `${b1fe(w)}% is a problem input for practising DCF mechanics. Claiming it as PT Maju Jaya's market cost of capital = false precision.`,
    ["Analysis: the question asks about the status of a WACC given as a teaching assumption.",
     "Solve 1: a teaching assumption = a practice number, not a market estimate.",
     "Solve 2: the DCF mechanics are real; the market cost of capital has not been estimated.",
     "Solve 3: use it to learn, not to bid for real shares."]);
}
/* 14:2 — PV of a negative current-year FCFF */
function b1_h142(rng){
  const X = b1ri(rng, 1500, 2500, 100), w = b1ri(rng, 10, 14, 1);
  const pv = Math.round(-X / (1 + w / 100));
  return b1mk(rng,
    `FCFF tahun berjalan ${b1rp(-X, "rb")} didiskonto 1 tahun pada WACC ${b1f(w)}%. Present value?`,
    [b1rp(pv, "rb"), b1rp(Math.round(-X * (1 + w / 100)), "rb"), b1rp(-pv, "rb"), b1rp(-X, "rb")],
    `${b1rp(-X, "rb")} ÷ 1,${b1f(w)} = ${b1rp(pv, "rb")}. Jebakan: dikali (bukan dibagi); tanda hilang; lupa didiskon.`,
    ["Analysis: yang ditanya PV FCFF negatif 1 tahun ke depan.",
     "Solve 1: rumus — PV = FCFF ÷ (1 + WACC).",
     `Solve 2: substitusi → ${b1rp(-X, "rb")} ÷ (1 + ${b1f(w)}%).`,
     `Solve 3: hitung → ${b1rp(pv, "rb")}.`]);
}
function b1EN_h142(rng){
  const X = b1ri(rng, 1500, 2500, 100), w = b1ri(rng, 10, 14, 1);
  const pv = Math.round(-X / (1 + w / 100));
  return b1mk(rng,
    `Current-year FCFF of ${b1rpe(-X, "k")} discounted 1 year at a WACC of ${b1fe(w)}%. Present value?`,
    [b1rpe(pv, "k"), b1rpe(Math.round(-X * (1 + w / 100)), "k"), b1rpe(-pv, "k"), b1rpe(-X, "k")],
    `${b1rpe(-X, "k")} ÷ 1.${b1fe(w)} = ${b1rpe(pv, "k")}. Traps: multiplying (not dividing); dropping the sign; forgetting to discount.`,
    ["Analysis: the question asks for the PV of a negative FCFF one year out.",
     "Solve 1: the formula — PV = FCFF ÷ (1 + WACC).",
     `Solve 2: substitute → ${b1rpe(-X, "k")} ÷ (1 + ${b1fe(w)}%).`,
     `Solve 3: compute → ${b1rpe(pv, "k")}.`]);
}
/* 14:3 — Gordon TV (Gate 2) */
function b1_h143(rng){
  const f = b1ri(rng, 2500, 5000, 100), w = b1ri(rng, 10, 14, 1), g = b1ri(rng, 2, 4, 1);
  const tv = Math.round(f / ((w - g) / 100));
  return b1mk(rng,
    `FCFF normal Rp${b1f(f)}rb, WACC ${b1f(w)}%, g ${b1f(g)}%. Terminal value (perpetuitas Gordon)?`,
    ["Rp" + b1f(tv) + "rb", "Rp" + b1f(Math.round(f / (w / 100))) + "rb", "Rp" + b1f(f) + "rb", "Rp" + b1f(Math.round(tv * 1.5)) + "rb"],
    `${b1f(f)} ÷ ${b1f(w - g)}% = Rp${b1f(tv)}rb.`,
    ["Analysis: yang ditanya TV Gordon; diketahui FCFF normal, WACC, g.",
     "Solve 1: rumus — TV = FCFF ÷ (WACC − g).",
     `Solve 2: substitusi → ${b1f(f)} ÷ (${b1f(w)}% − ${b1f(g)}%).`,
     `Solve 3: hitung → Rp${b1f(tv)}rb.`]);
}
function b1EN_h143(rng){
  const f = b1ri(rng, 2500, 5000, 100), w = b1ri(rng, 10, 14, 1), g = b1ri(rng, 2, 4, 1);
  const tv = Math.round(f / ((w - g) / 100));
  return b1mk(rng,
    `Normal FCFF Rp${b1fe(f)}k, WACC ${b1fe(w)}%, g ${b1fe(g)}%. Terminal value (Gordon perpetuity)?`,
    ["Rp" + b1fe(tv) + "k", "Rp" + b1fe(Math.round(f / (w / 100))) + "k", "Rp" + b1fe(f) + "k", "Rp" + b1fe(Math.round(tv * 1.5)) + "k"],
    `${b1fe(f)} ÷ ${b1fe(w - g)}% = Rp${b1fe(tv)}k.`,
    ["Analysis: the question asks for the Gordon TV; normal FCFF, WACC, and g are known.",
     "Solve 1: the formula — TV = FCFF ÷ (WACC − g).",
     `Solve 2: substitute → ${b1fe(f)} ÷ (${b1fe(w)}% − ${b1fe(g)}%).`,
     `Solve 3: compute → Rp${b1fe(tv)}k.`]);
}
/* 14:4 — g ≥ WACC breaks Gordon: negative denominator */
function b1_h144(rng){
  const w = b1ri(rng, 10, 13, 1), g = w + 2;
  return b1txt(rng,
    `Seorang analis memakai g = ${b1f(g)}% dengan WACC ${b1f(w)}% di rumus Gordon. Apa yang terjadi?`,
    [`Penyebut negatif → TV negatif/tak bermakna — syarat g < WACC dilanggar (g ${b1f(g)}% > WACC ${b1f(w)}%)`,
     "TV menjadi lebih akurat",
     "TV menjadi nol",
     "Tidak masalah — g boleh berapa saja"], 0,
    `Penyebut ${b1f(w - g)}% → TV negatif. Syarat mutlak Gordon: g < WACC. g ≥ WACC = model meminta dunia yang mustahil.`,
    ["Analysis: yang ditanya akibat g ≥ WACC di rumus Gordon.",
     `Solve 1: penyebut = WACC − g = ${b1f(w)}% − ${b1f(g)}% = ${b1f(w - g)}%.`,
     "Solve 2: penyebut negatif → TV negatif — nilai perusahaan negatif itu tak bermakna.",
     "Solve 3: syarat mutlak: g < WACC, selalu."]);
}
function b1EN_h144(rng){
  const w = b1ri(rng, 10, 13, 1), g = w + 2;
  return b1txt(rng,
    `An analyst uses g = ${b1fe(g)}% with a WACC of ${b1fe(w)}% in the Gordon formula. What happens?`,
    [`The denominator turns negative → the TV is negative/meaningless — the g < WACC condition is broken (g ${b1fe(g)}% > WACC ${b1fe(w)}%)`,
     "The TV becomes more accurate",
     "The TV becomes zero",
     "No problem — g can be anything"], 0,
    `The denominator is ${b1fe(w - g)}% → a negative TV. Gordon's absolute condition: g < WACC. g ≥ WACC = the model asks for an impossible world.`,
    ["Analysis: the question asks what happens when g ≥ WACC in the Gordon formula.",
     `Solve 1: the denominator = WACC − g = ${b1fe(w)}% − ${b1fe(g)}% = ${b1fe(w - g)}%.`,
     "Solve 2: a negative denominator → a negative TV — a negative firm value is meaningless.",
     "Solve 3: the absolute condition: g < WACC, always."]);
}
/* 14:5 — when TV dominates EV, the DCF is a bet on g & the multiple */
function b1_h145(rng){
  const f = b1ri(rng, 3000, 4200, 300), X = b1ri(rng, 1500, 2500, 100);
  const tv = Math.round(f / 0.09), pvtv = Math.round(tv / 1.12), pv0 = Math.round(-X / 1.12), ev = pvtv + pv0;
  return b1txt(rng,
    `EV PT Maju Jaya Rp${b1f(ev)}rb, tetapi PV FCFF tahun berjalan hanya ${b1rp(pv0, "rb")}. Kesimpulan paling jujur?`,
    ["Modelnya pasti rusak",
     "Praktis seluruh nilai datang dari TV — akurasi DCF ini ≈ akurasi asumsi g & multiple",
     "FCFF tidak penting dalam DCF",
     "WACC-nya terlalu rendah"], 1,
    `PV TV ${b1f(pvtv)} vs EV ${b1f(ev)} — TV mendominasi. DCF ini praktis = taruhan pada g dan multiple, bukan pada forecast tahun berjalan.`,
    ["Analysis: yang ditanya kesimpulan jujur saat TV mendominasi EV.",
     `Solve 1: PV TV = ${b1f(tv)} ÷ 1,12 = Rp${b1f(pvtv)}rb.`,
     `Solve 2: EV = PV TV + PV FCFF = ${b1f(pvtv)} + (${b1f(pv0)}) = Rp${b1f(ev)}rb.`,
     "Solve 3: hampir semua nilai dari TV → akurasi = akurasi asumsi g & multiple."]);
}
function b1EN_h145(rng){
  const f = b1ri(rng, 3000, 4200, 300), X = b1ri(rng, 1500, 2500, 100);
  const tv = Math.round(f / 0.09), pvtv = Math.round(tv / 1.12), pv0 = Math.round(-X / 1.12), ev = pvtv + pv0;
  return b1txt(rng,
    `PT Maju Jaya's EV is Rp${b1fe(ev)}k, yet the PV of current-year FCFF is only ${b1rpe(pv0, "k")}. What is the most honest conclusion?`,
    ["The model must be broken",
     "Practically all the value comes from the TV — this DCF is only as accurate as its g & multiple assumptions",
     "FCFF does not matter in a DCF",
     "The WACC is too low"], 1,
    `PV of TV ${b1fe(pvtv)} vs EV ${b1fe(ev)} — the TV dominates. This DCF is practically a bet on g and the multiple, not on the current-year forecast.`,
    ["Analysis: the question asks for the honest conclusion when the TV dominates EV.",
     `Solve 1: PV of TV = ${b1fe(tv)} ÷ 1.12 = Rp${b1fe(pvtv)}k.`,
     `Solve 2: EV = PV of TV + PV of FCFF = ${b1fe(pvtv)} + (${b1fe(pv0)}) = Rp${b1fe(ev)}k.`,
     "Solve 3: almost all value comes from the TV → accuracy = accuracy of the g & multiple assumptions."]);
}
/* 14:6 — the exit multiple is a stated illustrative assumption, not a verdict */
function b1_h146(rng){
  const eb = b1ri(rng, 6000, 10000, 500), m = b1ri(rng, 5, 8, 1);
  const tv = eb * m;
  return b1txt(rng,
    `TV exit = EBITDA Rp${b1f(eb)}rb × ${b1f(m)} = Rp${b1f(tv)}rb. Status angka '${b1f(m)}' ini?`,
    ["Data pasar yang pasti benar",
     "Tarif resmi yang ditetapkan otoritas",
     "Asumsi ilustratif yang dinyatakan — titik rawan perdebatan, bukan vonis",
     "Hasil regresi data historis"], 2,
    `${b1f(m)}x adalah asumsi ilustratif yang dinyatakan. Ia titik awal perdebatan ('kenapa ${b1f(m)}, bukan ${b1f(m - 1)} atau ${b1f(m + 2)}?'), bukan vonis.`,
    ["Analysis: yang ditanya status angka multiple — fakta atau asumsi?",
     "Solve 1: tidak ada otoritas yang menetapkan multiple; bukan hasil regresi.",
     "Solve 2: multiple dipilih analis dan dinyatakan eksplisit di model.",
     "Solve 3: karena asumsi, ia harus bisa diperdebatkan — bukan diterima sebagai vonis."]);
}
function b1EN_h146(rng){
  const eb = b1ri(rng, 6000, 10000, 500), m = b1ri(rng, 5, 8, 1);
  const tv = eb * m;
  return b1txt(rng,
    `Exit TV = EBITDA Rp${b1fe(eb)}k × ${b1fe(m)} = Rp${b1fe(tv)}k. What is the status of the number '${b1fe(m)}'?`,
    ["Market data that is certainly correct",
     "An official rate set by an authority",
     "A stated illustrative assumption — a debatable starting point, not a verdict",
     "The result of a historical-data regression"], 2,
    `${b1fe(m)}× is a stated illustrative assumption. It is the starting point of a debate ('why ${b1fe(m)}, not ${b1fe(m - 1)} or ${b1fe(m + 2)}?'), not a verdict.`,
    ["Analysis: the question asks about the status of the multiple — fact or assumption?",
     "Solve 1: no authority sets a multiple; it is not a regression result.",
     "Solve 2: the analyst chooses the multiple and states it explicitly in the model.",
     "Solve 3: because it is an assumption, it must be debatable — not accepted as a verdict."]);
}
/* 14:7 — two TV methods give a valuation range (football field) */
function b1_h147(rng){
  const lo = b1ri(rng, 28000, 38000, 1000), hi = lo + b1ri(rng, 5000, 9000, 1000);
  return b1txt(rng,
    `Metode perpetuitas → EV Rp${b1f(lo)}rb; exit multiple → EV Rp${b1f(hi)}rb. Cara membaca yang benar?`,
    ["Ambil rata-ratanya sebagai harga pasti",
     "Pilih metode yang angkanya lebih tinggi",
     "Buang metode yang lebih rendah",
     "Rentang valuasi — keputusan dari perbandingan harga pasar vs rentang"], 3,
    `${b1f(lo)}–${b1f(hi)} adalah rentang (football field). Harga pasar di bawah rentang = murah; di atas = mahal; di dalam = abu-abu.`,
    ["Analysis: yang ditanya cara membaca dua EV yang berbeda.",
     "Solve 1: dua metode, dua asumsi — keduanya punya ketidakpastian.",
     "Solve 2: rata-rata atau pilih yang tinggi = menyembunyikan ketidakpastian.",
     "Solve 3: baca sebagai rentang; bandingkan harga pasar dengan rentang itu."]);
}
function b1EN_h147(rng){
  const lo = b1ri(rng, 28000, 38000, 1000), hi = lo + b1ri(rng, 5000, 9000, 1000);
  return b1txt(rng,
    `The perpetuity method gives EV Rp${b1fe(lo)}k; the exit-multiple method gives EV Rp${b1fe(hi)}k. How should that be read?`,
    ["Take the average as the certain price",
     "Pick the method with the higher number",
     "Discard the lower method",
     "A valuation range — decide by comparing the market price with the range"], 3,
    `${b1fe(lo)}–${b1fe(hi)} is a range (football field). A market price below the range = cheap; above = expensive; inside = grey.`,
    ["Analysis: the question asks how to read two different EVs.",
     "Solve 1: two methods, two assumptions — both carry uncertainty.",
     "Solve 2: averaging or picking the higher one hides the uncertainty.",
     "Solve 3: read it as a range; compare the market price with that range."]);
}
/* 14:8 — WACC up 2pp cuts the Gordon TV */
function b1_h148(rng){
  const f = b1ri(rng, 3000, 4200, 100);
  const tv0 = Math.round(f / 0.09), tv1 = Math.round(f / 0.11);
  return b1txt(rng,
    `WACC naik 12% → 14% (g tetap 3%). Dampak ke TV perpetuitas? (FCFF normal Rp${b1f(f)}rb)`,
    [`Turun — penyebut (WACC−g) membesar (${b1f(f)} ÷ 11% = ${b1f(tv1)} < ${b1f(tv0)})`,
     "Naik",
     "Tetap",
     "Berubah menjadi nol"], 0,
    `${b1f(f)} ÷ 0,11 = ${b1f(tv1)} < ${b1f(tv0)}. WACC menggigit lewat penyebut — naik 2 poin memangkas TV ~${b1f(Math.round((tv0 - tv1) / tv0 * 100))}%.`,
    ["Analysis: yang ditanya dampak WACC naik ke TV.",
     `Solve 1: TV lama = ${b1f(f)} ÷ 9% = Rp${b1f(tv0)}rb.`,
     `Solve 2: TV baru = ${b1f(f)} ÷ 11% = Rp${b1f(tv1)}rb.`,
     "Solve 3: penyebut membesar → TV turun."]);
}
function b1EN_h148(rng){
  const f = b1ri(rng, 3000, 4200, 100);
  const tv0 = Math.round(f / 0.09), tv1 = Math.round(f / 0.11);
  return b1txt(rng,
    `WACC rises from 12% to 14% (g stays at 3%). What happens to the perpetuity TV? (Normal FCFF Rp${b1fe(f)}k)`,
    [`It falls — the (WACC−g) denominator grows (${b1fe(f)} ÷ 11% = ${b1fe(tv1)} < ${b1fe(tv0)})`,
     "It rises",
     "It stays the same",
     "It becomes zero"], 0,
    `${b1fe(f)} ÷ 0.11 = ${b1fe(tv1)} < ${b1fe(tv0)}. WACC bites through the denominator — 2 points up cuts the TV by ~${b1fe(Math.round((tv0 - tv1) / tv0 * 100))}%.`,
    ["Analysis: the question asks what a WACC rise does to the TV.",
     `Solve 1: old TV = ${b1fe(f)} ÷ 9% = Rp${b1fe(tv0)}k.`,
     `Solve 2: new TV = ${b1fe(f)} ÷ 11% = Rp${b1fe(tv1)}k.`,
     "Solve 3: the denominator grows → the TV falls."]);
}
/* 14:9 — test WACC and g two ways: both live in the (WACC−g) denominator */
function b1_h149(rng){
  const nm = b1pick(rng, ["Gerbang 2", "Hari 14"]);
  return b1txt(rng,
    `Tabel sensitivitas ${nm} menguji WACC dan g dua arah. Kenapa tidak satu arah saja?`,
    ["Supaya tabelnya terlihat penuh",
     "Keduanya menggigit lewat penyebut (WACC−g) — menguji satu saja menyembunyikan risiko",
     "Karena g tidak penting",
     "Karena WACC tidak penting"], 1,
    `Keduanya hidup di penyebut (WACC−g). Sensitivitas satu arah = memeriksa satu sisi bom saja.`,
    ["Analysis: yang ditanya kenapa sensitivitas dua arah.",
     "Solve 1: TV = FCFF ÷ (WACC − g) — WACC dan g berbagi satu penyebut.",
     "Solve 2: WACC naik ATAU g turun sama-sama memperbesar penyebut.",
     "Solve 3: uji satu saja = risiko dari sisi lain tidak terlihat."]);
}
function b1EN_h149(rng){
  const nm = b1pick(rng, ["Gate 2", "Day 14"]);
  return b1txt(rng,
    `The ${nm} sensitivity table tests WACC and g in both directions. Why not one direction only?`,
    ["To make the table look full",
     "Both bite through the (WACC−g) denominator — testing one alone hides risk",
     "Because g does not matter",
     "Because WACC does not matter"], 1,
    `Both live in the (WACC−g) denominator. One-way sensitivity = checking only one side of the bomb.`,
    ["Analysis: the question asks why sensitivity is tested two ways.",
     "Solve 1: TV = FCFF ÷ (WACC − g) — WACC and g share one denominator.",
     "Solve 2: WACC up OR g down both enlarge the denominator.",
     "Solve 3: testing one alone leaves the other side's risk unseen."]);
}
/* 14:10 — profit is not cash: WC and capex separate NI from FCFF */
function b1_h1410(rng){
  let ni = b1ri(rng, 5000, 9000, 200), dep = b1ri(rng, 500, 1200, 100), dwc = b1ri(rng, 4000, 7000, 500), cx = b1ri(rng, 3000, 5000, 500), guard = 0;
  while (ni + dep - dwc <= 0 && guard++ < 60) dwc = b1ri(rng, 4000, 7000, 500);
  const cfo = ni + dep - dwc, fcff = cfo - cx;
  return b1txt(rng,
    `Laba bersih Rp${b1f(ni)}rb tetapi FCFF ${b1rp(fcff, "rb")}. Penjelasan satu kalimat yang benar?`,
    ["Pasti salah hitung",
     "Dividennya terlalu besar",
     `Laba tertahan di WC (+Rp${b1f(dwc)}rb) dan capex (Rp${b1f(cx)}rb) melampaui CFO — kas ≠ laba`,
     "Penyusutannya salah tanda"], 2,
    `${b1f(ni)} + ${b1f(dep)} − ${b1f(dwc)} (ΔWC) = CFO ${b1f(cfo)}; ${b1f(cfo)} − ${b1f(cx)} (capex) = FCFF ${b1rp(fcff, "rb")}. Laba bukan kas — WC dan capex yang memisahkan.`,
    ["Analysis: yang ditanya kenapa laba besar tapi FCFF kecil/negatif.",
     `Solve 1: CFO = NI + susut − ΔWC = ${b1f(ni)} + ${b1f(dep)} − ${b1f(dwc)} = Rp${b1f(cfo)}rb.`,
     `Solve 2: FCFF = CFO − capex = ${b1f(cfo)} − ${b1f(cx)} = ${b1rp(fcff, "rb")}.`,
     "Solve 3: laba tertahan di WC dan habis untuk capex — kas ≠ laba."]);
}
function b1EN_h1410(rng){
  let ni = b1ri(rng, 5000, 9000, 200), dep = b1ri(rng, 500, 1200, 100), dwc = b1ri(rng, 4000, 7000, 500), cx = b1ri(rng, 3000, 5000, 500), guard = 0;
  while (ni + dep - dwc <= 0 && guard++ < 60) dwc = b1ri(rng, 4000, 7000, 500);
  const cfo = ni + dep - dwc, fcff = cfo - cx;
  return b1txt(rng,
    `Net income is Rp${b1fe(ni)}k yet FCFF is ${b1rpe(fcff, "k")}. Which one-sentence explanation is right?`,
    ["It must be miscalculated",
     "The dividends are too large",
     `Profit is trapped in WC (+Rp${b1fe(dwc)}k) and capex (Rp${b1fe(cx)}k) exceeds CFO — cash ≠ profit`,
     "The depreciation sign is wrong"], 2,
    `${b1fe(ni)} + ${b1fe(dep)} − ${b1fe(dwc)} (ΔWC) = CFO ${b1fe(cfo)}; ${b1fe(cfo)} − ${b1fe(cx)} (capex) = FCFF ${b1rpe(fcff, "k")}. Profit is not cash — WC and capex separate them.`,
    ["Analysis: the question asks why profit is large yet FCFF is small/negative.",
     `Solve 1: CFO = NI + depreciation − ΔWC = ${b1fe(ni)} + ${b1fe(dep)} − ${b1fe(dwc)} = Rp${b1fe(cfo)}k.`,
     `Solve 2: FCFF = CFO − capex = ${b1fe(cfo)} − ${b1fe(cx)} = ${b1rpe(fcff, "k")}.`,
     "Solve 3: profit is trapped in WC and spent on capex — cash ≠ profit."]);
}
/* 14:11 — RE from the balance sheet */
function b1_h1411(rng){
  let A = b1ri(rng, 24000, 32000, 200), L = b1ri(rng, 1500, 3000, 100), M = b1ri(rng, 18000, 24000, 200), guard = 0;
  while (A - L - M <= 0 && guard++ < 60) A = b1ri(rng, 24000, 32000, 200);
  const RE = A - L - M;
  return b1mk(rng,
    `Neraca PT Maju Jaya: total aset Rp${b1f(A)}rb, utang usaha Rp${b1f(L)}rb, modal disetor Rp${b1f(M)}rb. Laba ditahan?`,
    ["Rp" + b1f(RE) + "rb", "Rp" + b1f(A) + "rb", "Rp" + b1f(A - L) + "rb", "Rp" + b1f(A - M) + "rb"],
    `${b1f(A)} − ${b1f(L)} − ${b1f(M)} = Rp${b1f(RE)}rb.`,
    ["Analysis: yang ditanya RE; diketahui total aset, utang usaha, modal disetor.",
     "Solve 1: A = L + E, dan E = Modal disetor + RE.",
     `Solve 2: RE = A − L − Modal = ${b1f(A)} − ${b1f(L)} − ${b1f(M)}.`,
     `Solve 3: hitung → Rp${b1f(RE)}rb.`]);
}
function b1EN_h1411(rng){
  let A = b1ri(rng, 24000, 32000, 200), L = b1ri(rng, 1500, 3000, 100), M = b1ri(rng, 18000, 24000, 200), guard = 0;
  while (A - L - M <= 0 && guard++ < 60) A = b1ri(rng, 24000, 32000, 200);
  const RE = A - L - M;
  return b1mk(rng,
    `PT Maju Jaya's balance sheet: total assets Rp${b1fe(A)}k, trade payables Rp${b1fe(L)}k, paid-in capital Rp${b1fe(M)}k. Retained earnings?`,
    ["Rp" + b1fe(RE) + "k", "Rp" + b1fe(A) + "k", "Rp" + b1fe(A - L) + "k", "Rp" + b1fe(A - M) + "k"],
    `${b1fe(A)} − ${b1fe(L)} − ${b1fe(M)} = Rp${b1fe(RE)}k.`,
    ["Analysis: the question asks for RE; total assets, trade payables, and paid-in capital are known.",
     "Solve 1: A = L + E, and E = Paid-in capital + RE.",
     `Solve 2: RE = A − L − Capital = ${b1fe(A)} − ${b1fe(L)} − ${b1fe(M)}.`,
     `Solve 3: compute → Rp${b1fe(RE)}k.`]);
}
/* 14:12 — ΔWC consistency between BS schedule and CFS */
function b1_h1412(rng){
  const X = b1ri(rng, 4000, 7000, 500);
  return b1txt(rng,
    `ΔWC dari schedule neraca = +Rp${b1f(X)}rb; ΔWC yang dipakai di arus kas = +Rp${b1f(X)}rb. Artinya?`,
    ["Konsisten — angka sama dari dua jalur independen",
     "Salah satunya pasti salah hitung",
     "CFO pasti salah",
     "WC tidak memengaruhi kas"], 0,
    `Sama dari dua jalur independen = konsisten. Beda = ada link yang putus.`,
    ["Analysis: yang ditanya arti ΔWC yang sama dari dua sumber.",
     "Solve 1: schedule neraca menghitung ΔWC dari saldo awal-akhir.",
     "Solve 2: arus kas memakai ΔWC yang sama untuk rekonsiliasi CFO.",
     "Solve 3: sama = konsisten; beda = ada link yang putus."]);
}
function b1EN_h1412(rng){
  const X = b1ri(rng, 4000, 7000, 500);
  return b1txt(rng,
    `ΔWC from the balance-sheet schedule = +Rp${b1fe(X)}k; ΔWC used in the cash-flow statement = +Rp${b1fe(X)}k. What does that mean?`,
    ["Consistent — the same number from two independent paths",
     "One of them must be miscalculated",
     "CFO must be wrong",
     "WC does not affect cash"], 0,
    `The same number from two independent paths = consistent. Different = a broken link.`,
    ["Analysis: the question asks what matching ΔWC from two sources means.",
     "Solve 1: the BS schedule computes ΔWC from opening-closing balances.",
     "Solve 2: the cash-flow statement uses the same ΔWC to reconcile CFO.",
     "Solve 3: matching = consistent; different = a broken link."]);
}
/* 14:13 — RE of a brand-new company (opening RE = 0) */
function b1_h1413(rng){
  let ni = b1ri(rng, 5000, 9000, 200), D = b1ri(rng, 500, 2000, 100), guard = 0;
  while ((ni - D <= 0 || new Set([ni - D, ni + D, ni, Math.max(100, ni - 2 * D)]).size < 4) && guard++ < 60) D = b1ri(rng, 500, 2000, 100);
  const RE = ni - D;
  return b1mk(rng,
    `Perusahaan baru (RE awal = 0): laba bersih Rp${b1f(ni)}rb, dividen tunai Rp${b1f(D)}rb. Laba ditahan akhir?`,
    ["Rp" + b1f(RE) + "rb", "Rp" + b1f(ni + D) + "rb", "Rp" + b1f(ni) + "rb", "Rp" + b1f(Math.max(100, ni - 2 * D)) + "rb"],
    `0 + ${b1f(ni)} − ${b1f(D)} = Rp${b1f(RE)}rb. Jebakan: dividen malah ditambah.`,
    ["Analysis: yang ditanya RE akhir perusahaan baru; RE awal 0.",
     "Solve 1: rumus — RE(akhir) = 0 + NI − Dividen.",
     `Solve 2: substitusi → 0 + ${b1f(ni)} − ${b1f(D)}.`,
     `Solve 3: hitung → Rp${b1f(RE)}rb.`]);
}
function b1EN_h1413(rng){
  let ni = b1ri(rng, 5000, 9000, 200), D = b1ri(rng, 500, 2000, 100), guard = 0;
  while ((ni - D <= 0 || new Set([ni - D, ni + D, ni, Math.max(100, ni - 2 * D)]).size < 4) && guard++ < 60) D = b1ri(rng, 500, 2000, 100);
  const RE = ni - D;
  return b1mk(rng,
    `A brand-new company (opening RE = 0): net income Rp${b1fe(ni)}k, cash dividends Rp${b1fe(D)}k. Ending retained earnings?`,
    ["Rp" + b1fe(RE) + "k", "Rp" + b1fe(ni + D) + "k", "Rp" + b1fe(ni) + "k", "Rp" + b1fe(Math.max(100, ni - 2 * D)) + "k"],
    `0 + ${b1fe(ni)} − ${b1fe(D)} = Rp${b1fe(RE)}k. Trap: adding the dividend instead of subtracting it.`,
    ["Analysis: the question asks for the ending RE of a new company; opening RE is 0.",
     "Solve 1: the formula — RE(end) = 0 + NI − Dividends.",
     `Solve 2: substitute → 0 + ${b1fe(ni)} − ${b1fe(D)}.`,
     `Solve 3: compute → Rp${b1fe(RE)}k.`]);
}
/* 14:14 — dividends do not touch net income */
function b1_h1414(rng){
  const X = b1ri(rng, 500, 2000, 100);
  return b1txt(rng,
    `Dividen tunai Rp${b1f(X)}rb dibayar. Dampak ke laba bersih?`,
    [`Naik Rp${b1f(X)}rb`,
     `Turun Rp${b1f(X)}rb`,
     "Nol — dividen bukan beban",
     `Naik Rp${b1f(X / 2)}rb`], 2,
    `Nol. Dividen langsung mengurangi kas dan laba ditahan — tidak menyentuh IS.`,
    ["Analysis: yang ditanya efek dividen ke laba bersih.",
     "Solve 1: laba bersih = revenue − beban; dividen bukan beban.",
     `Solve 2: kas −${b1f(X)} dan RE −${b1f(X)} — keduanya di BS.`,
     "Solve 3: IS tidak tersentuh → laba bersih tetap."]);
}
function b1EN_h1414(rng){
  const X = b1ri(rng, 500, 2000, 100);
  return b1txt(rng,
    `Cash dividends of Rp${b1fe(X)}k are paid. What is the effect on net income?`,
    [`Up Rp${b1fe(X)}k`,
     `Down Rp${b1fe(X)}k`,
     "Zero — a dividend is not an expense",
     `Up Rp${b1fe(X / 2)}k`], 2,
    `Zero. Dividends directly reduce cash and retained earnings — they never touch the IS.`,
    ["Analysis: the question asks about the effect of dividends on net income.",
     "Solve 1: net income = revenue − expenses; a dividend is not an expense.",
     `Solve 2: cash −${b1fe(X)} and RE −${b1fe(X)} — both on the BS.`,
     "Solve 3: the IS is untouched → net income stays the same."]);
}
/* 14:15 — no interest-bearing debt: tax shield is Rp0 (no double-count) */
function b1_h1415(rng){
  const t = b1pick(rng, [22, 20, 25]);
  return b1txt(rng,
    `Model PT Maju Jaya tanpa utang berbunga. Perlakuan perisai pajak (tax shield) yang benar? (Tarif pajak ${b1f(t)}%)`,
    [`Kurangi FCFF sebesar ${b1f(t)}%`,
     "Tambahkan ke terminal value",
     `Hitung ${b1f(t)}% × beban bunga`,
     "Rp0 — tax shield hanya hidup di WACC saat ada bunga; memotong FCFF juga = double-count"], 3,
    `Rp0. Tanpa beban bunga tidak ada tax shield. Memotong FCFF ${b1f(t)}% 'untuk pajak' sementara WACC sudah after-tax = double-count.`,
    ["Analysis: yang ditanya tax shield tanpa utang berbunga.",
     "Solve 1: tax shield = pajak yang dihemat karena ada beban bunga.",
     "Solve 2: tanpa bunga, tidak ada yang dihemat.",
     "Solve 3: WACC sudah after-tax — memotong FCFF lagi = menghitung dua kali."]);
}
function b1EN_h1415(rng){
  const t = b1pick(rng, [22, 20, 25]);
  return b1txt(rng,
    `The PT Maju Jaya model has no interest-bearing debt. What is the correct tax-shield treatment? (Tax rate ${b1fe(t)}%)`,
    [`Cut FCFF by ${b1fe(t)}%`,
     "Add it to the terminal value",
     `Compute ${b1fe(t)}% × interest expense`,
     "Rp0 — the tax shield only lives in WACC when there is interest; cutting FCFF too = double-counting"], 3,
    `Rp0. With no interest expense there is no tax shield. Cutting FCFF by ${b1fe(t)}% 'for tax' while WACC is already after-tax = double-counting.`,
    ["Analysis: the question asks about the tax shield with no interest-bearing debt.",
     "Solve 1: the tax shield = tax saved because there is interest expense.",
     "Solve 2: with no interest, nothing is saved.",
     "Solve 3: WACC is already after-tax — cutting FCFF again counts it twice."]);
}
/* 14:16 — trade payables are operating, not financing: excluded from WACC */
function b1_h1416(rng){
  const X = b1ri(rng, 1500, 3000, 100);
  return b1txt(rng,
    `Utang usaha Rp${b1f(X)}rb (non-bunga, tempo supplier). Masuk perhitungan WACC?`,
    ["Tidak — utang dagang adalah konsekuensi operasi, bukan keputusan pendanaan",
     "Ya, sebagai komponen utang",
     "Ya, setengahnya",
     "Tergantung analis"], 0,
    `Tidak. WACC = biaya modal berbunga (bank, obligasi). Utang dagang non-bunga adalah konsekuensi operasi — mencampurnya mengotori biaya modal.`,
    ["Analysis: yang ditanya apakah utang dagang masuk WACC.",
     "Solve 1: WACC = biaya modal dari keputusan pendanaan (utang berbunga + ekuitas).",
     "Solve 2: utang dagang muncul dari operasi (tempo supplier), bukan dari meminjam.",
     "Solve 3: memasukkannya = mencampur biaya operasi ke biaya modal."]);
}
function b1EN_h1416(rng){
  const X = b1ri(rng, 1500, 3000, 100);
  return b1txt(rng,
    `Trade payables of Rp${b1fe(X)}k (non-interest-bearing, supplier terms). Do they enter the WACC calculation?`,
    ["No — trade payables are a consequence of operations, not a financing decision",
     "Yes, as a debt component",
     "Yes, half of them",
     "It depends on the analyst"], 0,
    `No. WACC = the cost of interest-bearing capital (bank loans, bonds). Non-interest trade payables are an operating consequence — mixing them in pollutes the cost of capital.`,
    ["Analysis: the question asks whether trade payables enter WACC.",
     "Solve 1: WACC = the cost of capital from financing decisions (interest-bearing debt + equity).",
     "Solve 2: trade payables arise from operations (supplier terms), not from borrowing.",
     "Solve 3: including them mixes operating cost into the cost of capital."]);
}
/* 14:17 — FCFF defined */
function b1_h1417(rng){
  const nm = b1pick(rng, ["PT Maju Jaya", "Kios Rina"]);
  return b1txt(rng,
    `FCFF ${nm} didefinisikan sebagai…`,
    ["Laba bersih − dividen",
     "CFO + bunga×(1−t) − capex",
     "EBITDA − pajak",
     "Revenue − COGS"], 1,
    `FCFF = CFO + bunga×(1−t) − capex: kas operasi setelah belanja modal — kas yang benar-benar bebas untuk semua pemodal. Tanpa utang (tanpa bunga): CFO − capex.`,
    ["Analysis: yang ditanya definisi FCFF — kas untuk SIAPA?",
     "Solve 1: mulai dari CFO (kas operasi, sudah levered).",
     "Solve 2: kembalikan bunga after-tax — FCFF untuk SEMUA pemodal, bukan hanya ekuitas.",
     "Solve 3: kurangi capex — sisanya kas yang benar-benar bebas."]);
}
function b1EN_h1417(rng){
  const nm = b1pick(rng, ["PT Maju Jaya", "Rina's Kiosk"]);
  return b1txt(rng,
    `FCFF for ${nm} is defined as…`,
    ["Net income − dividends",
     "CFO + interest×(1−t) − capex",
     "EBITDA − tax",
     "Revenue − COGS"], 1,
    `FCFF = CFO + interest×(1−t) − capex: operating cash after capital spending — the cash truly free for all investors. With no debt (no interest): CFO − capex.`,
    ["Analysis: the question asks for the definition of FCFF — cash for WHOM?",
     "Solve 1: start from CFO (operating cash, still levered).",
     "Solve 2: add back after-tax interest — FCFF is for ALL investors, not just equity.",
     "Solve 3: subtract capex — what remains is the truly free cash."]);
}
/* 14:18 — every model number must trace to a stated input cell */
function b1_h1418(rng){
  const nm = b1pick(rng, ["Gerbang 2", "Hari 14"]);
  return b1txt(rng,
    `Setiap angka di model ${nm} harus bisa ditelusur kembali ke…`,
    ["Feeling analis",
     "Angka tahun lalu mentah-mentah",
     "Sel input asumsi yang dinyatakan eksplisit",
     "Rata-rata industri"], 2,
    `Sel input (biru) yang dinyatakan eksplisit. Angka yang tidak bisa ditelusur ke asumsi = tidak bisa diperdebatkan = tidak bisa dipercaya.`,
    ["Analysis: yang ditanya syarat ketertelusuran angka model.",
     "Solve 1: angka tanpa sumber = tebakan yang berdasi.",
     "Solve 2: sel input biru = asumsi yang dinyatakan + alasannya.",
     "Solve 3: bisa ditelusur → bisa diperdebatkan → bisa dipercaya."]);
}
function b1EN_h1418(rng){
  const nm = b1pick(rng, ["Gate 2", "Day 14"]);
  return b1txt(rng,
    `Every number in the ${nm} model must be traceable back to…`,
    ["The analyst's feeling",
     "Last year's numbers, raw",
     "A stated, explicit assumption input cell",
     "The industry average"], 2,
    `A stated, explicit (blue) input cell. A number that cannot be traced to an assumption cannot be debated = cannot be trusted.`,
    ["Analysis: the question asks what every model number must be traceable to.",
     "Solve 1: a number with no source = a guess in a suit.",
     "Solve 2: a blue input cell = a stated assumption + its reason.",
     "Solve 3: traceable → debatable → trustworthy."]);
}
/* 14:19 — PV of the perpetuity TV one year out */
function b1_h1419(rng){
  const tv = b1ri(rng, 30000, 60000, 5000), w = b1ri(rng, 10, 14, 1);
  const pv = Math.round(tv / (1 + w / 100));
  return b1mk(rng,
    `TV perpetuitas Rp${b1f(tv)}rb jatuh di akhir tahun berjalan. PV-nya pada WACC ${b1f(w)}%?`,
    ["Rp" + b1f(pv) + "rb", "Rp" + b1f(tv) + "rb", "Rp" + b1f(Math.round(tv * (1 + w / 100))) + "rb", "Rp" + b1f(Math.round(tv / Math.pow(1 + w / 100, 2))) + "rb"],
    `${b1f(tv)} ÷ 1,${b1f(w)} = Rp${b1f(pv)}rb. Jebakan: lupa didiskon; malah dikali.`,
    ["Analysis: yang ditanya PV TV 1 tahun ke depan.",
     "Solve 1: rumus — PV = TV ÷ (1 + WACC).",
     `Solve 2: substitusi → ${b1f(tv)} ÷ (1 + ${b1f(w)}%).`,
     `Solve 3: hitung → Rp${b1f(pv)}rb.`]);
}
function b1EN_h1419(rng){
  const tv = b1ri(rng, 30000, 60000, 5000), w = b1ri(rng, 10, 14, 1);
  const pv = Math.round(tv / (1 + w / 100));
  return b1mk(rng,
    `A perpetuity TV of Rp${b1fe(tv)}k falls at the end of the current year. What is its PV at a WACC of ${b1fe(w)}%?`,
    ["Rp" + b1fe(pv) + "k", "Rp" + b1fe(tv) + "k", "Rp" + b1fe(Math.round(tv * (1 + w / 100))) + "k", "Rp" + b1fe(Math.round(tv / Math.pow(1 + w / 100, 2))) + "k"],
    `${b1fe(tv)} ÷ 1.${b1fe(w)} = Rp${b1fe(pv)}k. Traps: forgetting to discount; multiplying instead.`,
    ["Analysis: the question asks for the PV of the TV one year out.",
     "Solve 1: the formula — PV = TV ÷ (1 + WACC).",
     `Solve 2: substitute → ${b1fe(tv)} ÷ (1 + ${b1fe(w)}%).`,
     `Solve 3: compute → Rp${b1fe(pv)}k.`]);
}

/* ================= hari-15 ================= */
/* 15:0 — base-case EV (anchor from Day 14) */
function b1_h150(rng){
  const X = b1ri(rng, 1500, 2500, 100), fn = b1ri(rng, 2700, 4500, 300);
  const tv = Math.round(fn / 0.09), pvtv = Math.round(tv / 1.12), pv0 = Math.round(-X / 1.12);
  const ev = Math.round(-X / 1.12 + tv / 1.12);
  return b1mk(rng,
    `PT Maju Jaya: FCFF0 ${b1rp(-X, "rb")}, FCFFn Rp${b1f(fn)}rb, WACC 12%, g 3%. EV base?`,
    ["Rp" + b1f(ev) + "rb", "Rp" + b1f(tv) + "rb", "Rp" + b1f(pvtv) + "rb", b1rp(pv0, "rb")],
    `${b1rp(pv0, "rb")} + ${b1f(pvtv)} = Rp${b1f(ev)}rb — jangkar Hari 14, harus sama persis.`,
    ["Analysis: yang ditanya EV base; diketahui FCFF0, FCFFn, WACC, g.",
     `Solve 1: TV = ${b1f(fn)} ÷ 9% = Rp${b1f(tv)}rb; PV TV = ${b1f(tv)} ÷ 1,12 = Rp${b1f(pvtv)}rb.`,
     `Solve 2: PV FCFF0 = ${b1rp(-X, "rb")} ÷ 1,12 = ${b1rp(pv0, "rb")}.`,
     `Solve 3: EV = ${b1rp(pv0, "rb")} + ${b1f(pvtv)} = Rp${b1f(ev)}rb.`]);
}
function b1EN_h150(rng){
  const X = b1ri(rng, 1500, 2500, 100), fn = b1ri(rng, 2700, 4500, 300);
  const tv = Math.round(fn / 0.09), pvtv = Math.round(tv / 1.12), pv0 = Math.round(-X / 1.12);
  const ev = Math.round(-X / 1.12 + tv / 1.12);
  return b1mk(rng,
    `PT Maju Jaya: FCFF0 ${b1rpe(-X, "k")}, FCFFn Rp${b1fe(fn)}k, WACC 12%, g 3%. Base-case EV?`,
    ["Rp" + b1fe(ev) + "k", "Rp" + b1fe(tv) + "k", "Rp" + b1fe(pvtv) + "k", b1rpe(pv0, "k")],
    `${b1rpe(pv0, "k")} + ${b1fe(pvtv)} = Rp${b1fe(ev)}k — the Day 14 anchor, it must match exactly.`,
    ["Analysis: the question asks for base-case EV; FCFF0, FCFFn, WACC, and g are known.",
     `Solve 1: TV = ${b1fe(fn)} ÷ 9% = Rp${b1fe(tv)}k; PV of TV = ${b1fe(tv)} ÷ 1.12 = Rp${b1fe(pvtv)}k.`,
     `Solve 2: PV of FCFF0 = ${b1rpe(-X, "k")} ÷ 1.12 = ${b1rpe(pv0, "k")}.`,
     `Solve 3: EV = ${b1rpe(pv0, "k")} + ${b1fe(pvtv)} = Rp${b1fe(ev)}k.`]);
}
/* 15:1 — one cell of the WACC × g data table */
function b1_h151(rng){
  const evAt = (X, fn, w, g) => Math.round(-X / (1 + w / 100) + (fn / ((w - g) / 100)) / (1 + w / 100));
  let X = b1ri(rng, 1500, 2500, 100), fn = b1ri(rng, 2700, 4500, 300), w = b1ri(rng, 13, 15, 1), g = b1ri(rng, 1, 3, 1), guard = 0;
  while (new Set([evAt(X, fn, w, g), evAt(X, fn, 12, 3), evAt(X, fn, w, g) + 5000, evAt(X, fn, w, g) - 5000]).size < 4 && guard++ < 60)
    { w = b1ri(rng, 13, 15, 1); g = b1ri(rng, 1, 3, 1); }
  const ev = evAt(X, fn, w, g), base = evAt(X, fn, 12, 3);
  return b1mk(rng,
    `Data table: WACC ${b1f(w)}%, g ${b1f(g)}%. EV? (FCFF0 ${b1rp(-X, "rb")}, FCFFn Rp${b1f(fn)}rb)`,
    ["Rp" + b1f(ev) + "rb", "Rp" + b1f(base) + "rb", "Rp" + b1f(ev + 5000) + "rb", "Rp" + b1f(ev - 5000) + "rb"],
    `TV = ${b1f(fn)} ÷ ${b1f(w - g)}% = Rp${b1f(Math.round(fn / ((w - g) / 100)))}rb; PV TV = ÷ 1,${b1f(w)}; PV FCFF0 = ${b1rp(Math.round(-X / (1 + w / 100)), "rb")} → EV Rp${b1f(ev)}rb — sel pojok: WACC tertinggi + g terendah.`,
    ["Analysis: yang ditanya EV pada sel tabel (WACC, g); diketahui FCFF0 & FCFFn.",
     `Solve 1: TV = FCFFn ÷ (WACC−g) = ${b1f(fn)} ÷ ${b1f(w - g)}%.`,
     `Solve 2: PV TV = TV ÷ (1 + ${b1f(w)}%); PV FCFF0 = ${b1rp(-X, "rb")} ÷ (1 + ${b1f(w)}%).`,
     `Solve 3: EV = PV FCFF0 + PV TV = Rp${b1f(ev)}rb.`]);
}
function b1EN_h151(rng){
  const evAt = (X, fn, w, g) => Math.round(-X / (1 + w / 100) + (fn / ((w - g) / 100)) / (1 + w / 100));
  let X = b1ri(rng, 1500, 2500, 100), fn = b1ri(rng, 2700, 4500, 300), w = b1ri(rng, 13, 15, 1), g = b1ri(rng, 1, 3, 1), guard = 0;
  while (new Set([evAt(X, fn, w, g), evAt(X, fn, 12, 3), evAt(X, fn, w, g) + 5000, evAt(X, fn, w, g) - 5000]).size < 4 && guard++ < 60)
    { w = b1ri(rng, 13, 15, 1); g = b1ri(rng, 1, 3, 1); }
  const ev = evAt(X, fn, w, g), base = evAt(X, fn, 12, 3);
  return b1mk(rng,
    `Data table: WACC ${b1fe(w)}%, g ${b1fe(g)}%. EV? (FCFF0 ${b1rpe(-X, "k")}, FCFFn Rp${b1fe(fn)}k)`,
    ["Rp" + b1fe(ev) + "k", "Rp" + b1fe(base) + "k", "Rp" + b1fe(ev + 5000) + "k", "Rp" + b1fe(ev - 5000) + "k"],
    `TV = ${b1fe(fn)} ÷ ${b1fe(w - g)}% = Rp${b1fe(Math.round(fn / ((w - g) / 100)))}k; PV of TV = ÷ 1.${b1fe(w)}; PV of FCFF0 = ${b1rpe(Math.round(-X / (1 + w / 100)), "k")} → EV Rp${b1fe(ev)}k — the corner cell: highest WACC + lowest g.`,
    ["Analysis: the question asks for EV at one data-table cell (WACC, g); FCFF0 & FCFFn are known.",
     `Solve 1: TV = FCFFn ÷ (WACC−g) = ${b1fe(fn)} ÷ ${b1fe(w - g)}%.`,
     `Solve 2: PV of TV = TV ÷ (1 + ${b1fe(w)}%); PV of FCFF0 = ${b1rpe(-X, "k")} ÷ (1 + ${b1fe(w)}%).`,
     `Solve 3: EV = PV of FCFF0 + PV of TV = Rp${b1fe(ev)}k.`]);
}
/* 15:2 — Bear scenario: a coherent worsening world */
function b1_h152(rng){
  const evAt = (X, fn, w, g) => Math.round(-X / (1 + w / 100) + (fn / ((w - g) / 100)) / (1 + w / 100));
  const X = b1ri(rng, 1500, 2500, 100), fn = b1ri(rng, 2800, 3600, 200);
  const bear = evAt(X, fn, 13, 2), base = evAt(X, fn, 12, 3);
  return b1mk(rng,
    `Skenario Bear (WACC 13%, g 2%, FCFFn Rp${b1f(fn)}rb). EV? (FCFF0 ${b1rp(-X, "rb")})`,
    ["Rp" + b1f(bear) + "rb", "Rp" + b1f(base) + "rb", "Rp" + b1f(bear + 3000) + "rb", "Rp" + b1f(bear - 3000) + "rb"],
    `TV = ${b1f(fn)} ÷ 11% = Rp${b1f(Math.round(fn / 0.11))}rb; PV TV = ÷ 1,13; PV FCFF0 = ${b1rp(Math.round(-X / 1.13), "rb")} → EV Rp${b1f(bear)}rb. Bear = dunia memburuk yang koheren.`,
    ["Analysis: yang ditanya EV skenario Bear; WACC naik, g turun, FCFFn turun — serentak.",
     `Solve 1: TV = FCFFn ÷ (WACC−g) = ${b1f(fn)} ÷ 11%.`,
     `Solve 2: PV TV = TV ÷ 1,13; PV FCFF0 = ${b1rp(-X, "rb")} ÷ 1,13.`,
     `Solve 3: EV = PV FCFF0 + PV TV = Rp${b1f(bear)}rb.`]);
}
function b1EN_h152(rng){
  const evAt = (X, fn, w, g) => Math.round(-X / (1 + w / 100) + (fn / ((w - g) / 100)) / (1 + w / 100));
  const X = b1ri(rng, 1500, 2500, 100), fn = b1ri(rng, 2800, 3600, 200);
  const bear = evAt(X, fn, 13, 2), base = evAt(X, fn, 12, 3);
  return b1mk(rng,
    `Bear scenario (WACC 13%, g 2%, FCFFn Rp${b1fe(fn)}k). EV? (FCFF0 ${b1rpe(-X, "k")})`,
    ["Rp" + b1fe(bear) + "k", "Rp" + b1fe(base) + "k", "Rp" + b1fe(bear + 3000) + "k", "Rp" + b1fe(bear - 3000) + "k"],
    `TV = ${b1fe(fn)} ÷ 11% = Rp${b1fe(Math.round(fn / 0.11))}k; PV of TV = ÷ 1.13; PV of FCFF0 = ${b1rpe(Math.round(-X / 1.13), "k")} → EV Rp${b1fe(bear)}k. Bear = a coherently worsening world.`,
    ["Analysis: the question asks for Bear-scenario EV; WACC up, g down, FCFFn down — all at once.",
     `Solve 1: TV = FCFFn ÷ (WACC−g) = ${b1fe(fn)} ÷ 11%.`,
     `Solve 2: PV of TV = TV ÷ 1.13; PV of FCFF0 = ${b1rpe(-X, "k")} ÷ 1.13.`,
     `Solve 3: EV = PV of FCFF0 + PV of TV = Rp${b1fe(bear)}k.`]);
}
/* 15:3 — tornado ranking: which driver moves EV most (±10%) */
function b1_h153(rng){
  const evAt = (f0, fn, w, g) => f0 / (1 + w / 100) + (fn / ((w - g) / 100)) / (1 + w / 100);
  const drivers = ["WACC", "FCFF normal", "g", "FCFF tahun berjalan"];
  let fn = b1ri(rng, 3200, 4000, 400), X = b1ri(rng, 1500, 2500, 250), guard = 0, d = [], base = 0;
  while (guard++ < 60) {
    base = evAt(-X, fn, 12, 3);
    d = [Math.abs(evAt(-X, fn, 13.2, 3) - base), Math.abs(evAt(-X, fn * 1.1, 12, 3) - base),
         Math.abs(evAt(-X, fn, 12, 3.3) - base), Math.abs(evAt(-X * 0.9, fn, 12, 3) - base)];
    const s = d.slice().sort((a, b) => b - a);
    if (s[0] - s[1] > 50) break;
    fn = b1ri(rng, 3200, 4000, 400); X = b1ri(rng, 1500, 2500, 250);
  }
  const ci = d.indexOf(Math.max.apply(null, d));
  const r0 = v => Math.round(v);
  return b1txt(rng,
    `Tornado ±10%: driver dengan |ΔEV| terbesar? (FCFFn Rp${b1f(fn)}rb, FCFF0 ${b1rp(-X, "rb")}, WACC 12%, g 3%)`,
    drivers, ci,
    `|ΔEV| WACC ${b1f(r0(d[0]))} > FCFFn ${b1f(r0(d[1]))} > g ${b1f(r0(d[2]))} > FCFF berjalan ${b1f(r0(d[3]))} — ranking tornado.`,
    ["Analysis: yang ditanya ranking tornado — driver mana paling menggoyang EV.",
     `Solve 1: EV base = Rp${b1f(r0(base))}rb; WACC +10% → |ΔEV| Rp${b1f(r0(d[0]))}rb.`,
     `Solve 2: FCFFn +10% → Rp${b1f(r0(d[1]))}rb; g +10% → Rp${b1f(r0(d[2]))}rb; FCFF berjalan +10% → Rp${b1f(r0(d[3]))}rb.`,
     `Solve 3: terbesar = ${drivers[ci]}.`]);
}
function b1EN_h153(rng){
  const evAt = (f0, fn, w, g) => f0 / (1 + w / 100) + (fn / ((w - g) / 100)) / (1 + w / 100);
  const drivers = ["WACC", "Normal FCFF", "g", "Current-year FCFF"];
  let fn = b1ri(rng, 3200, 4000, 400), X = b1ri(rng, 1500, 2500, 250), guard = 0, d = [], base = 0;
  while (guard++ < 60) {
    base = evAt(-X, fn, 12, 3);
    d = [Math.abs(evAt(-X, fn, 13.2, 3) - base), Math.abs(evAt(-X, fn * 1.1, 12, 3) - base),
         Math.abs(evAt(-X, fn, 12, 3.3) - base), Math.abs(evAt(-X * 0.9, fn, 12, 3) - base)];
    const s = d.slice().sort((a, b) => b - a);
    if (s[0] - s[1] > 50) break;
    fn = b1ri(rng, 3200, 4000, 400); X = b1ri(rng, 1500, 2500, 250);
  }
  const ci = d.indexOf(Math.max.apply(null, d));
  const r0 = v => Math.round(v);
  return b1txt(rng,
    `Tornado ±10%: which driver has the largest |ΔEV|? (FCFFn Rp${b1fe(fn)}k, FCFF0 ${b1rpe(-X, "k")}, WACC 12%, g 3%)`,
    drivers, ci,
    `|ΔEV| WACC ${b1fe(r0(d[0]))} > normal FCFF ${b1fe(r0(d[1]))} > g ${b1fe(r0(d[2]))} > current-year FCFF ${b1fe(r0(d[3]))} — the tornado ranking.`,
    ["Analysis: the question asks for the tornado ranking — which driver moves EV most.",
     `Solve 1: base EV = Rp${b1fe(r0(base))}k; WACC +10% → |ΔEV| Rp${b1fe(r0(d[0]))}k.`,
     `Solve 2: normal FCFF +10% → Rp${b1fe(r0(d[1]))}k; g +10% → Rp${b1fe(r0(d[2]))}k; current-year FCFF +10% → Rp${b1fe(r0(d[3]))}k.`,
     `Solve 3: the largest is ${drivers[ci]}.`]);
}
/* 15:4 — g ≥ WACC breaks Gordon (again: the gate that must never pass) */
function b1_h154(rng){
  const w = b1ri(rng, 10, 13, 1), g = w + 1;
  return b1txt(rng,
    `Analis memakai g = ${b1f(g)}% dengan WACC ${b1f(w)}%. Apa yang terjadi?`,
    [`Penyebut negatif → TV tak bermakna; syarat g < WACC dilanggar (g ${b1f(g)}% > WACC ${b1f(w)}%)`,
     "TV naik 8%",
     "TV menjadi nol",
     "Tidak masalah"], 0,
    `Penyebut ${b1f(w - g)}% → TV negatif. g ≥ WACC = model meminta dunia yang mustahil.`,
    ["Analysis: yang ditanya akibat g ≥ WACC di rumus Gordon.",
     `Solve 1: penyebut = WACC − g = ${b1f(w)}% − ${b1f(g)}% = ${b1f(w - g)}%.`,
     "Solve 2: penyebut negatif → TV negatif — tak bermakna.",
     "Solve 3: syarat mutlak: g < WACC, selalu."]);
}
function b1EN_h154(rng){
  const w = b1ri(rng, 10, 13, 1), g = w + 1;
  return b1txt(rng,
    `An analyst uses g = ${b1fe(g)}% with a WACC of ${b1fe(w)}%. What happens?`,
    [`The denominator turns negative → the TV is meaningless; the g < WACC condition is broken (g ${b1fe(g)}% > WACC ${b1fe(w)}%)`,
     "The TV rises 8%",
     "The TV becomes zero",
     "No problem"], 0,
    `The denominator is ${b1fe(w - g)}% → a negative TV. g ≥ WACC = the model asks for an impossible world.`,
    ["Analysis: the question asks what happens when g ≥ WACC in the Gordon formula.",
     `Solve 1: the denominator = WACC − g = ${b1fe(w)}% − ${b1fe(g)}% = ${b1fe(w - g)}%.`,
     "Solve 2: a negative denominator → a negative TV — meaningless.",
     "Solve 3: the absolute condition: g < WACC, always."]);
}
/* 15:5 — expected EV over the exact 3×3 grid (E[f(X)] ≠ f(E[X])) */
function b1_h155(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const F = b1ri(rng, 100, 140, 10);
  const ws = [10, 12, 14], gs = [2, 3, 4], pw = [0.25, 0.5, 0.25], pg = [0.25, 0.5, 0.25];
  const evAt = (w, g) => -2 / (1 + w / 100) + (F / ((w - g) / 100)) / (1 + w / 100);
  let E = 0;
  ws.forEach((w, i) => gs.forEach((g, j) => { E += pw[i] * pg[j] * evAt(w, g); }));
  E = r2(E);
  const base = r2(evAt(12, 3));
  const f2 = v => "Rp" + b1f(v, 2) + "jt";
  return b1mk(rng,
    `Grid enumerasi eksak 3×3 (WACC 10/12/14%, g 2/3/4%, probabilitas 25/50/25%). E[EV]? (FCFFn Rp${b1f(F)}jt, FCFF0 −Rp2jt)`,
    [f2(E), f2(base), f2(r2(E * 0.9)), f2(r2(E * 1.1))],
    `E[EV] = ${f2(E)} — di atas EV base-case ${f2(base)}. Rata-rata WACC lalu satu EV bukan expected value (E[f(X)] ≠ f(E[X])).`,
    ["Analysis: yang ditanya expected EV dari grid 3×3 — hitung EV tiap sel, lalu timbang probabilitas.",
     `Solve 1: EV tiap sel = −2 ÷ (1+WACC) + [${b1f(F)} ÷ (WACC−g)] ÷ (1+WACC).`,
     `Solve 2: contoh sel (10%, 4%) = ${f2(r2(evAt(10, 4)))}; sel (14%, 2%) = ${f2(r2(evAt(14, 2)))}.`,
     `Solve 3: E[EV] = Σ p(WACC)×p(g)×EV(sel) = ${f2(E)}.`]);
}
function b1EN_h155(rng){
  const r2 = v => Math.round(v * 100) / 100;
  const F = b1ri(rng, 100, 140, 10);
  const ws = [10, 12, 14], gs = [2, 3, 4], pw = [0.25, 0.5, 0.25], pg = [0.25, 0.5, 0.25];
  const evAt = (w, g) => -2 / (1 + w / 100) + (F / ((w - g) / 100)) / (1 + w / 100);
  let E = 0;
  ws.forEach((w, i) => gs.forEach((g, j) => { E += pw[i] * pg[j] * evAt(w, g); }));
  E = r2(E);
  const base = r2(evAt(12, 3));
  const f2 = v => "Rp" + b1fe(v, 2) + "m";
  return b1mk(rng,
    `Exact 3×3 enumeration grid (WACC 10/12/14%, g 2/3/4%, probabilities 25/50/25%). E[EV]? (FCFFn Rp${b1fe(F)}m, FCFF0 −Rp2m)`,
    [f2(E), f2(base), f2(r2(E * 0.9)), f2(r2(E * 1.1))],
    `E[EV] = ${f2(E)} — above the base-case EV of ${f2(base)}. Averaging WACC first and then computing one EV is not the expected value (E[f(X)] ≠ f(E[X])).`,
    ["Analysis: the question asks for expected EV over the 3×3 grid — compute EV per cell, then weight by probability.",
     `Solve 1: EV per cell = −2 ÷ (1+WACC) + [${b1fe(F)} ÷ (WACC−g)] ÷ (1+WACC).`,
     `Solve 2: sample cell (10%, 4%) = ${f2(r2(evAt(10, 4)))}; cell (14%, 2%) = ${f2(r2(evAt(14, 2)))}.`,
     `Solve 3: E[EV] = Σ p(WACC)×p(g)×EV(cell) = ${f2(E)}.`]);
}
/* 15:6 — P(EV < Rp1.000jt) over the same 3×3 grid */
function b1_h156(rng){
  const r1 = v => Math.round(v * 10) / 10;
  let F = b1ri(rng, 100, 130, 10), guard = 0, P = 0;
  const ws = [10, 12, 14], gs = [2, 3, 4], pw = [0.25, 0.5, 0.25], pg = [0.25, 0.5, 0.25];
  const evAt = (w, g) => -2 / (1 + w / 100) + (F / ((w - g) / 100)) / (1 + w / 100);
  while (guard++ < 60) {
    P = 0;
    ws.forEach((w, i) => gs.forEach((g, j) => { if (evAt(w, g) < 1000) P += pw[i] * pg[j] * 100; }));
    P = r1(P);
    if (P > 0 && P < 100 && new Set([P, 6.25, 25, 12.5]).size === 4) break;
    F = b1ri(rng, 100, 130, 10);
  }
  const cell142 = Math.round(evAt(14, 2)), cell143 = Math.round(evAt(14, 3));
  return b1mk(rng,
    `Dari grid yang sama, P(EV < Rp1.000jt)? (FCFFn Rp${b1f(F)}jt, FCFF0 −Rp2jt)`,
    [b1f(P, 2) + "%", "6,25%", "25%", "12,50%"],
    `Sel di bawah 1.000: mis. (14%, 2%) = ${b1f(cell142)} dan (14%, 3%) = ${b1f(cell143)} — jumlahkan probabilitasnya = ${b1f(P, 2)}%.`,
    ["Analysis: yang ditanya probabilitas EV di bawah Rp1.000jt — sel mana saja yang lolos ambang.",
     "Solve 1: hitung EV ke-9 sel grid (WACC × g).",
     "Solve 2: tandai sel dengan EV < 1.000.",
     `Solve 3: jumlahkan probabilitas sel-sel itu = ${b1f(P, 2)}%.`]);
}
function b1EN_h156(rng){
  const r1 = v => Math.round(v * 10) / 10;
  let F = b1ri(rng, 100, 130, 10), guard = 0, P = 0;
  const ws = [10, 12, 14], gs = [2, 3, 4], pw = [0.25, 0.5, 0.25], pg = [0.25, 0.5, 0.25];
  const evAt = (w, g) => -2 / (1 + w / 100) + (F / ((w - g) / 100)) / (1 + w / 100);
  while (guard++ < 60) {
    P = 0;
    ws.forEach((w, i) => gs.forEach((g, j) => { if (evAt(w, g) < 1000) P += pw[i] * pg[j] * 100; }));
    P = r1(P);
    if (P > 0 && P < 100 && new Set([P, 6.25, 25, 12.5]).size === 4) break;
    F = b1ri(rng, 100, 130, 10);
  }
  const cell142 = Math.round(evAt(14, 2)), cell143 = Math.round(evAt(14, 3));
  return b1mk(rng,
    `From the same grid, P(EV < Rp1,000m)? (FCFFn Rp${b1fe(F)}m, FCFF0 −Rp2m)`,
    [b1fe(P, 2) + "%", "6.25%", "25%", "12.50%"],
    `Cells below 1,000: e.g. (14%, 2%) = ${b1fe(cell142)} and (14%, 3%) = ${b1fe(cell143)} — add up their probabilities = ${b1fe(P, 2)}%.`,
    ["Analysis: the question asks for the probability that EV falls below Rp1,000m — which cells pass the threshold.",
     "Solve 1: compute EV for all 9 grid cells (WACC × g).",
     "Solve 2: mark the cells with EV < 1,000.",
     `Solve 3: add up those cells' probabilities = ${b1fe(P, 2)}%.`]);
}
/* 15:7 — real option: value of waiting (EMV with the walk-away payoff 0) */
function b1_h157(rng){
  let N = b1ri(rng, 40, 80, 10), p = b1ri(rng, 50, 70, 10), U = b1ri(rng, 100, 160, 10), guard = 0;
  while ((p * U / 100 <= N || p * U / 100 - N < 10) && guard++ < 60)
    { N = b1ri(rng, 40, 80, 10); p = b1ri(rng, 50, 70, 10); U = b1ri(rng, 100, 160, 10); }
  const emv = p * U / 100, flex = emv - N;
  return b1txt(rng,
    `Investasi sekarang NPV +${b1f(N)}. Tunggu setahun: ${b1f(p)}% NPV +${b1f(U)}, ${b1f(100 - p)}% kondisi buruk — kamu TIDAK jadi bangun (payoff 0). EMV menunggu dan keputusan?`,
    [`Tunggu (EMV ${b1f(emv)} > ${b1f(N)})`,
     "Bangun sekarang",
     "Tolak proyek",
     "Tidak bisa ditentukan"], 0,
    `EMV menunggu (opsi mundur) = ${b1f(p)}% × ${b1f(U)} = +${b1f(emv)} > ${b1f(N)} → tunggu. Nilai fleksibilitas Rp${b1f(flex)}jt.`,
    ["Analysis: yang ditanya EMV menunggu vs bangun sekarang.",
     `Solve 1: EMV menunggu = ${b1f(p)}% × ${b1f(U)} + ${b1f(100 - p)}% × 0 = ${b1f(emv)}.`,
     `Solve 2: bandingkan dengan NPV bangun sekarang +${b1f(N)}.`,
     `Solve 3: ${b1f(emv)} > ${b1f(N)} → tunggu; fleksibilitas bernilai Rp${b1f(flex)}jt.`]);
}
function b1EN_h157(rng){
  let N = b1ri(rng, 40, 80, 10), p = b1ri(rng, 50, 70, 10), U = b1ri(rng, 100, 160, 10), guard = 0;
  while ((p * U / 100 <= N || p * U / 100 - N < 10) && guard++ < 60)
    { N = b1ri(rng, 40, 80, 10); p = b1ri(rng, 50, 70, 10); U = b1ri(rng, 100, 160, 10); }
  const emv = p * U / 100, flex = emv - N;
  return b1txt(rng,
    `Investing now has NPV +${b1fe(N)}. Wait a year: ${b1fe(p)}% chance of NPV +${b1fe(U)}, ${b1fe(100 - p)}% bad state — you do NOT build (payoff 0). EMV of waiting, and the decision?`,
    [`Wait (EMV ${b1fe(emv)} > ${b1fe(N)})`,
     "Build now",
     "Reject the project",
     "Cannot be determined"], 0,
    `EMV of waiting (walk-away option) = ${b1fe(p)}% × ${b1fe(U)} = +${b1fe(emv)} > ${b1fe(N)} → wait. Flexibility is worth Rp${b1fe(flex)}m.`,
    ["Analysis: the question asks for the EMV of waiting vs building now.",
     `Solve 1: EMV of waiting = ${b1fe(p)}% × ${b1fe(U)} + ${b1fe(100 - p)}% × 0 = ${b1fe(emv)}.`,
     `Solve 2: compare with the build-now NPV of +${b1fe(N)}.`,
     `Solve 3: ${b1fe(emv)} > ${b1fe(N)} → wait; flexibility is worth Rp${b1fe(flex)}m.`]);
}

/* ================= registries (Batch 1) ================= */
/* Wiring note for the coordinator: merge these into the live
   VARIANT_FNS / VARIANT_FNS_EN registries in concept-graph.js
   (or load this file after it and merge). No key here overlaps
   the 14 existing keys (fondasi-b, hari-01/02/03). */
const VARIANT_FNS_B1 = {
  "fondasi-a:0": {diff: "Easy", gen: (rng) => b1retry(b1_fa0, rng)},
  "fondasi-a:1": {diff: "Easy", gen: (rng) => b1retry(b1_fa1, rng)},
  "fondasi-a:2": {diff: "Easy", gen: (rng) => b1retry(b1_fa2, rng)},
  "fondasi-a:3": {diff: "Easy", gen: (rng) => b1retry(b1_fa3, rng)},
  "fondasi-a:4": {diff: "Easy", gen: (rng) => b1retry(b1_fa4, rng)},
  "fondasi-c:0": {diff: "Easy", gen: (rng) => b1retry(b1_fc0, rng)},
  "fondasi-c:1": {diff: "Easy", gen: (rng) => b1retry(b1_fc1, rng)},
  "fondasi-c:2": {diff: "Easy", gen: (rng) => b1retry(b1_fc2, rng)},
  "fondasi-c:3": {diff: "Easy", gen: (rng) => b1retry(b1_fc3, rng)},
  "fondasi-c:4": {diff: "Easy", gen: (rng) => b1retry(b1_fc4, rng)},
  "hari-04:0": {diff: "Easy", gen: (rng) => b1retry(b1_h040, rng)},
  "hari-04:1": {diff: "Medium", gen: (rng) => b1retry(b1_h041, rng)},
  "hari-04:2": {diff: "Easy", gen: (rng) => b1retry(b1_h042, rng)},
  "hari-04:3": {diff: "Medium", gen: (rng) => b1retry(b1_h043, rng)},
  "hari-04:4": {diff: "Easy", gen: (rng) => b1retry(b1_h044, rng)},
  "hari-05:0": {diff: "Easy", gen: (rng) => b1retry(b1_h050, rng)},
  "hari-05:1": {diff: "Easy", gen: (rng) => b1retry(b1_h051, rng)},
  "hari-05:2": {diff: "Easy", gen: (rng) => b1retry(b1_h052, rng)},
  "hari-05:3": {diff: "Easy", gen: (rng) => b1retry(b1_h053, rng)},
  "hari-05:4": {diff: "Easy", gen: (rng) => b1retry(b1_h054, rng)},
  "hari-06:0": {diff: "Easy", gen: (rng) => b1retry(b1_h060, rng)},
  "hari-06:1": {diff: "Easy", gen: (rng) => b1retry(b1_h061, rng)},
  "hari-06:2": {diff: "Easy", gen: (rng) => b1retry(b1_h062, rng)},
  "hari-06:3": {diff: "Easy", gen: (rng) => b1retry(b1_h063, rng)},
  "hari-06:4": {diff: "Easy", gen: (rng) => b1retry(b1_h064, rng)},
  "hari-07:0": {diff: "Easy", gen: (rng) => b1retry(b1_h070, rng)},
  "hari-07:1": {diff: "Easy", gen: (rng) => b1retry(b1_h071, rng)},
  "hari-07:2": {diff: "Easy", gen: (rng) => b1retry(b1_h072, rng)},
  "hari-07:3": {diff: "Medium", gen: (rng) => b1retry(b1_h073, rng)},
  "hari-07:4": {diff: "Easy", gen: (rng) => b1retry(b1_h074, rng)},
  "hari-07:5": {diff: "Easy", gen: (rng) => b1retry(b1_h075, rng)},
  "hari-07:6": {diff: "Easy", gen: (rng) => b1retry(b1_h076, rng)},
  "hari-07:7": {diff: "Easy", gen: (rng) => b1retry(b1_h077, rng)},
  "hari-07:8": {diff: "Easy", gen: (rng) => b1retry(b1_h078, rng)},
  "hari-07:9": {diff: "Easy", gen: (rng) => b1retry(b1_h079, rng)},
  "hari-07:10": {diff: "Easy", gen: (rng) => b1retry(b1_h0710, rng)},
  "hari-07:11": {diff: "Easy", gen: (rng) => b1retry(b1_h0711, rng)},
  "hari-07:12": {diff: "Easy", gen: (rng) => b1retry(b1_h0712, rng)},
  "hari-07:13": {diff: "Medium", gen: (rng) => b1retry(b1_h0713, rng)},
  "hari-07:14": {diff: "Easy", gen: (rng) => b1retry(b1_h0714, rng)},
  "hari-08:0": {diff: "Easy", gen: (rng) => b1retry(b1_h080, rng)},
  "hari-08:1": {diff: "Easy", gen: (rng) => b1retry(b1_h081, rng)},
  "hari-08:2": {diff: "Medium", gen: (rng) => b1retry(b1_h082, rng)},
  "hari-08:3": {diff: "Easy", gen: (rng) => b1retry(b1_h083, rng)},
  "hari-08:4": {diff: "Medium", gen: (rng) => b1retry(b1_h084, rng)},
  "hari-09:0": {diff: "Easy", gen: (rng) => b1retry(b1_h090, rng)},
  "hari-09:1": {diff: "Medium", gen: (rng) => b1retry(b1_h091, rng)},
  "hari-09:2": {diff: "Medium", gen: (rng) => b1retry(b1_h092, rng)},
  "hari-09:3": {diff: "Medium", gen: (rng) => b1retry(b1_h093, rng)},
  "hari-09:4": {diff: "Medium", gen: (rng) => b1retry(b1_h094, rng)},
  "hari-09:5": {diff: "Medium", gen: (rng) => b1retry(b1_h095, rng)},
  "hari-09:6": {diff: "Medium", gen: (rng) => b1retry(b1_h096, rng)},
  "hari-09:7": {diff: "Hard", gen: (rng) => b1retry(b1_h097, rng)},
  "hari-09:8": {diff: "Medium", gen: (rng) => b1retry(b1_h098, rng)},
  "hari-09:9": {diff: "Hard", gen: (rng) => b1retry(b1_h099, rng)},
  "hari-09:10": {diff: "Medium", gen: (rng) => b1retry(b1_h0910, rng)},
  "hari-09:11": {diff: "Medium", gen: (rng) => b1retry(b1_h0911, rng)},
  "hari-10:0": {diff: "Medium", gen: (rng) => b1retry(b1_h100, rng)},
  "hari-10:1": {diff: "Medium", gen: (rng) => b1retry(b1_h101, rng)},
  "hari-10:2": {diff: "Easy", gen: (rng) => b1retry(b1_h102, rng)},
  "hari-10:3": {diff: "Medium", gen: (rng) => b1retry(b1_h103, rng)},
  "hari-10:4": {diff: "Medium", gen: (rng) => b1retry(b1_h104, rng)},
  "hari-10:5": {diff: "Medium", gen: (rng) => b1retry(b1_h105, rng)},
  "hari-10:6": {diff: "Hard", gen: (rng) => b1retry(b1_h106, rng)},
  "hari-11:0": {diff: "Easy", gen: (rng) => b1retry(b1_h110, rng)},
  "hari-11:1": {diff: "Easy", gen: (rng) => b1retry(b1_h111, rng)},
  "hari-11:2": {diff: "Easy", gen: (rng) => b1retry(b1_h112, rng)},
  "hari-11:3": {diff: "Medium", gen: (rng) => b1retry(b1_h113, rng)},
  "hari-11:4": {diff: "Easy", gen: (rng) => b1retry(b1_h114, rng)},
  "hari-11:5": {diff: "Medium", gen: (rng) => b1retry(b1_h115, rng)},
  "hari-11:6": {diff: "Medium", gen: (rng) => b1retry(b1_h116, rng)},
  "hari-11:7": {diff: "Medium", gen: (rng) => b1retry(b1_h117, rng)},
  "hari-11:8": {diff: "Medium", gen: (rng) => b1retry(b1_h118, rng)},
  "hari-12:0": {diff: "Medium", gen: (rng) => b1retry(b1_h120, rng)},
  "hari-12:1": {diff: "Easy", gen: (rng) => b1retry(b1_h121, rng)},
  "hari-12:2": {diff: "Medium", gen: (rng) => b1retry(b1_h122, rng)},
  "hari-12:3": {diff: "Easy", gen: (rng) => b1retry(b1_h123, rng)},
  "hari-12:4": {diff: "Easy", gen: (rng) => b1retry(b1_h124, rng)},
  "hari-13:0": {diff: "Easy", gen: (rng) => b1retry(b1_h130, rng)},
  "hari-13:1": {diff: "Medium", gen: (rng) => b1retry(b1_h131, rng)},
  "hari-13:2": {diff: "Easy", gen: (rng) => b1retry(b1_h132, rng)},
  "hari-13:3": {diff: "Easy", gen: (rng) => b1retry(b1_h133, rng)},
  "hari-13:4": {diff: "Medium", gen: (rng) => b1retry(b1_h134, rng)},
  "hari-13:5": {diff: "Hard", gen: (rng) => b1retry(b1_h135, rng)},
  "hari-13:6": {diff: "Hard", gen: (rng) => b1retry(b1_h136, rng)},
  "hari-14:0": {diff: "Easy", gen: (rng) => b1retry(b1_h140, rng)},
  "hari-14:1": {diff: "Easy", gen: (rng) => b1retry(b1_h141, rng)},
  "hari-14:2": {diff: "Medium", gen: (rng) => b1retry(b1_h142, rng)},
  "hari-14:3": {diff: "Medium", gen: (rng) => b1retry(b1_h143, rng)},
  "hari-14:4": {diff: "Easy", gen: (rng) => b1retry(b1_h144, rng)},
  "hari-14:5": {diff: "Medium", gen: (rng) => b1retry(b1_h145, rng)},
  "hari-14:6": {diff: "Easy", gen: (rng) => b1retry(b1_h146, rng)},
  "hari-14:7": {diff: "Easy", gen: (rng) => b1retry(b1_h147, rng)},
  "hari-14:8": {diff: "Medium", gen: (rng) => b1retry(b1_h148, rng)},
  "hari-14:9": {diff: "Easy", gen: (rng) => b1retry(b1_h149, rng)},
  "hari-14:10": {diff: "Medium", gen: (rng) => b1retry(b1_h1410, rng)},
  "hari-14:11": {diff: "Easy", gen: (rng) => b1retry(b1_h1411, rng)},
  "hari-14:12": {diff: "Easy", gen: (rng) => b1retry(b1_h1412, rng)},
  "hari-14:13": {diff: "Easy", gen: (rng) => b1retry(b1_h1413, rng)},
  "hari-14:14": {diff: "Easy", gen: (rng) => b1retry(b1_h1414, rng)},
  "hari-14:15": {diff: "Medium", gen: (rng) => b1retry(b1_h1415, rng)},
  "hari-14:16": {diff: "Easy", gen: (rng) => b1retry(b1_h1416, rng)},
  "hari-14:17": {diff: "Easy", gen: (rng) => b1retry(b1_h1417, rng)},
  "hari-14:18": {diff: "Easy", gen: (rng) => b1retry(b1_h1418, rng)},
  "hari-14:19": {diff: "Medium", gen: (rng) => b1retry(b1_h1419, rng)},
  "hari-15:0": {diff: "Medium", gen: (rng) => b1retry(b1_h150, rng)},
  "hari-15:1": {diff: "Hard", gen: (rng) => b1retry(b1_h151, rng)},
  "hari-15:2": {diff: "Medium", gen: (rng) => b1retry(b1_h152, rng)},
  "hari-15:3": {diff: "Hard", gen: (rng) => b1retry(b1_h153, rng)},
  "hari-15:4": {diff: "Easy", gen: (rng) => b1retry(b1_h154, rng)},
  "hari-15:5": {diff: "Hard", gen: (rng) => b1retry(b1_h155, rng)},
  "hari-15:6": {diff: "Hard", gen: (rng) => b1retry(b1_h156, rng)},
  "hari-15:7": {diff: "Medium", gen: (rng) => b1retry(b1_h157, rng)},
};
const VARIANT_FNS_EN_B1 = {
  "fondasi-a:0": {diff: "Easy", gen: (rng) => b1retry(b1EN_fa0, rng)},
  "fondasi-a:1": {diff: "Easy", gen: (rng) => b1retry(b1EN_fa1, rng)},
  "fondasi-a:2": {diff: "Easy", gen: (rng) => b1retry(b1EN_fa2, rng)},
  "fondasi-a:3": {diff: "Easy", gen: (rng) => b1retry(b1EN_fa3, rng)},
  "fondasi-a:4": {diff: "Easy", gen: (rng) => b1retry(b1EN_fa4, rng)},
  "fondasi-c:0": {diff: "Easy", gen: (rng) => b1retry(b1EN_fc0, rng)},
  "fondasi-c:1": {diff: "Easy", gen: (rng) => b1retry(b1EN_fc1, rng)},
  "fondasi-c:2": {diff: "Easy", gen: (rng) => b1retry(b1EN_fc2, rng)},
  "fondasi-c:3": {diff: "Easy", gen: (rng) => b1retry(b1EN_fc3, rng)},
  "fondasi-c:4": {diff: "Easy", gen: (rng) => b1retry(b1EN_fc4, rng)},
  "hari-04:0": {diff: "Easy", gen: (rng) => b1retry(b1EN_h040, rng)},
  "hari-04:1": {diff: "Medium", gen: (rng) => b1retry(b1EN_h041, rng)},
  "hari-04:2": {diff: "Easy", gen: (rng) => b1retry(b1EN_h042, rng)},
  "hari-04:3": {diff: "Medium", gen: (rng) => b1retry(b1EN_h043, rng)},
  "hari-04:4": {diff: "Easy", gen: (rng) => b1retry(b1EN_h044, rng)},
  "hari-05:0": {diff: "Easy", gen: (rng) => b1retry(b1EN_h050, rng)},
  "hari-05:1": {diff: "Easy", gen: (rng) => b1retry(b1EN_h051, rng)},
  "hari-05:2": {diff: "Easy", gen: (rng) => b1retry(b1EN_h052, rng)},
  "hari-05:3": {diff: "Easy", gen: (rng) => b1retry(b1EN_h053, rng)},
  "hari-05:4": {diff: "Easy", gen: (rng) => b1retry(b1EN_h054, rng)},
  "hari-06:0": {diff: "Easy", gen: (rng) => b1retry(b1EN_h060, rng)},
  "hari-06:1": {diff: "Easy", gen: (rng) => b1retry(b1EN_h061, rng)},
  "hari-06:2": {diff: "Easy", gen: (rng) => b1retry(b1EN_h062, rng)},
  "hari-06:3": {diff: "Easy", gen: (rng) => b1retry(b1EN_h063, rng)},
  "hari-06:4": {diff: "Easy", gen: (rng) => b1retry(b1EN_h064, rng)},
  "hari-07:0": {diff: "Easy", gen: (rng) => b1retry(b1EN_h070, rng)},
  "hari-07:1": {diff: "Easy", gen: (rng) => b1retry(b1EN_h071, rng)},
  "hari-07:2": {diff: "Easy", gen: (rng) => b1retry(b1EN_h072, rng)},
  "hari-07:3": {diff: "Medium", gen: (rng) => b1retry(b1EN_h073, rng)},
  "hari-07:4": {diff: "Easy", gen: (rng) => b1retry(b1EN_h074, rng)},
  "hari-07:5": {diff: "Easy", gen: (rng) => b1retry(b1EN_h075, rng)},
  "hari-07:6": {diff: "Easy", gen: (rng) => b1retry(b1EN_h076, rng)},
  "hari-07:7": {diff: "Easy", gen: (rng) => b1retry(b1EN_h077, rng)},
  "hari-07:8": {diff: "Easy", gen: (rng) => b1retry(b1EN_h078, rng)},
  "hari-07:9": {diff: "Easy", gen: (rng) => b1retry(b1EN_h079, rng)},
  "hari-07:10": {diff: "Easy", gen: (rng) => b1retry(b1EN_h0710, rng)},
  "hari-07:11": {diff: "Easy", gen: (rng) => b1retry(b1EN_h0711, rng)},
  "hari-07:12": {diff: "Easy", gen: (rng) => b1retry(b1EN_h0712, rng)},
  "hari-07:13": {diff: "Medium", gen: (rng) => b1retry(b1EN_h0713, rng)},
  "hari-07:14": {diff: "Easy", gen: (rng) => b1retry(b1EN_h0714, rng)},
  "hari-08:0": {diff: "Easy", gen: (rng) => b1retry(b1EN_h080, rng)},
  "hari-08:1": {diff: "Easy", gen: (rng) => b1retry(b1EN_h081, rng)},
  "hari-08:2": {diff: "Medium", gen: (rng) => b1retry(b1EN_h082, rng)},
  "hari-08:3": {diff: "Easy", gen: (rng) => b1retry(b1EN_h083, rng)},
  "hari-08:4": {diff: "Medium", gen: (rng) => b1retry(b1EN_h084, rng)},
  "hari-09:0": {diff: "Easy", gen: (rng) => b1retry(b1EN_h090, rng)},
  "hari-09:1": {diff: "Medium", gen: (rng) => b1retry(b1EN_h091, rng)},
  "hari-09:2": {diff: "Medium", gen: (rng) => b1retry(b1EN_h092, rng)},
  "hari-09:3": {diff: "Medium", gen: (rng) => b1retry(b1EN_h093, rng)},
  "hari-09:4": {diff: "Medium", gen: (rng) => b1retry(b1EN_h094, rng)},
  "hari-09:5": {diff: "Medium", gen: (rng) => b1retry(b1EN_h095, rng)},
  "hari-09:6": {diff: "Medium", gen: (rng) => b1retry(b1EN_h096, rng)},
  "hari-09:7": {diff: "Hard", gen: (rng) => b1retry(b1EN_h097, rng)},
  "hari-09:8": {diff: "Medium", gen: (rng) => b1retry(b1EN_h098, rng)},
  "hari-09:9": {diff: "Hard", gen: (rng) => b1retry(b1EN_h099, rng)},
  "hari-09:10": {diff: "Medium", gen: (rng) => b1retry(b1EN_h0910, rng)},
  "hari-09:11": {diff: "Medium", gen: (rng) => b1retry(b1EN_h0911, rng)},
  "hari-10:0": {diff: "Medium", gen: (rng) => b1retry(b1EN_h100, rng)},
  "hari-10:1": {diff: "Medium", gen: (rng) => b1retry(b1EN_h101, rng)},
  "hari-10:2": {diff: "Easy", gen: (rng) => b1retry(b1EN_h102, rng)},
  "hari-10:3": {diff: "Medium", gen: (rng) => b1retry(b1EN_h103, rng)},
  "hari-10:4": {diff: "Medium", gen: (rng) => b1retry(b1EN_h104, rng)},
  "hari-10:5": {diff: "Medium", gen: (rng) => b1retry(b1EN_h105, rng)},
  "hari-10:6": {diff: "Hard", gen: (rng) => b1retry(b1EN_h106, rng)},
  "hari-11:0": {diff: "Easy", gen: (rng) => b1retry(b1EN_h110, rng)},
  "hari-11:1": {diff: "Easy", gen: (rng) => b1retry(b1EN_h111, rng)},
  "hari-11:2": {diff: "Easy", gen: (rng) => b1retry(b1EN_h112, rng)},
  "hari-11:3": {diff: "Medium", gen: (rng) => b1retry(b1EN_h113, rng)},
  "hari-11:4": {diff: "Easy", gen: (rng) => b1retry(b1EN_h114, rng)},
  "hari-11:5": {diff: "Medium", gen: (rng) => b1retry(b1EN_h115, rng)},
  "hari-11:6": {diff: "Medium", gen: (rng) => b1retry(b1EN_h116, rng)},
  "hari-11:7": {diff: "Medium", gen: (rng) => b1retry(b1EN_h117, rng)},
  "hari-11:8": {diff: "Medium", gen: (rng) => b1retry(b1EN_h118, rng)},
  "hari-12:0": {diff: "Medium", gen: (rng) => b1retry(b1EN_h120, rng)},
  "hari-12:1": {diff: "Easy", gen: (rng) => b1retry(b1EN_h121, rng)},
  "hari-12:2": {diff: "Medium", gen: (rng) => b1retry(b1EN_h122, rng)},
  "hari-12:3": {diff: "Easy", gen: (rng) => b1retry(b1EN_h123, rng)},
  "hari-12:4": {diff: "Easy", gen: (rng) => b1retry(b1EN_h124, rng)},
  "hari-13:0": {diff: "Easy", gen: (rng) => b1retry(b1EN_h130, rng)},
  "hari-13:1": {diff: "Medium", gen: (rng) => b1retry(b1EN_h131, rng)},
  "hari-13:2": {diff: "Easy", gen: (rng) => b1retry(b1EN_h132, rng)},
  "hari-13:3": {diff: "Easy", gen: (rng) => b1retry(b1EN_h133, rng)},
  "hari-13:4": {diff: "Medium", gen: (rng) => b1retry(b1EN_h134, rng)},
  "hari-13:5": {diff: "Hard", gen: (rng) => b1retry(b1EN_h135, rng)},
  "hari-13:6": {diff: "Hard", gen: (rng) => b1retry(b1EN_h136, rng)},
  "hari-14:0": {diff: "Easy", gen: (rng) => b1retry(b1EN_h140, rng)},
  "hari-14:1": {diff: "Easy", gen: (rng) => b1retry(b1EN_h141, rng)},
  "hari-14:2": {diff: "Medium", gen: (rng) => b1retry(b1EN_h142, rng)},
  "hari-14:3": {diff: "Medium", gen: (rng) => b1retry(b1EN_h143, rng)},
  "hari-14:4": {diff: "Easy", gen: (rng) => b1retry(b1EN_h144, rng)},
  "hari-14:5": {diff: "Medium", gen: (rng) => b1retry(b1EN_h145, rng)},
  "hari-14:6": {diff: "Easy", gen: (rng) => b1retry(b1EN_h146, rng)},
  "hari-14:7": {diff: "Easy", gen: (rng) => b1retry(b1EN_h147, rng)},
  "hari-14:8": {diff: "Medium", gen: (rng) => b1retry(b1EN_h148, rng)},
  "hari-14:9": {diff: "Easy", gen: (rng) => b1retry(b1EN_h149, rng)},
  "hari-14:10": {diff: "Medium", gen: (rng) => b1retry(b1EN_h1410, rng)},
  "hari-14:11": {diff: "Easy", gen: (rng) => b1retry(b1EN_h1411, rng)},
  "hari-14:12": {diff: "Easy", gen: (rng) => b1retry(b1EN_h1412, rng)},
  "hari-14:13": {diff: "Easy", gen: (rng) => b1retry(b1EN_h1413, rng)},
  "hari-14:14": {diff: "Easy", gen: (rng) => b1retry(b1EN_h1414, rng)},
  "hari-14:15": {diff: "Medium", gen: (rng) => b1retry(b1EN_h1415, rng)},
  "hari-14:16": {diff: "Easy", gen: (rng) => b1retry(b1EN_h1416, rng)},
  "hari-14:17": {diff: "Easy", gen: (rng) => b1retry(b1EN_h1417, rng)},
  "hari-14:18": {diff: "Easy", gen: (rng) => b1retry(b1EN_h1418, rng)},
  "hari-14:19": {diff: "Medium", gen: (rng) => b1retry(b1EN_h1419, rng)},
  "hari-15:0": {diff: "Medium", gen: (rng) => b1retry(b1EN_h150, rng)},
  "hari-15:1": {diff: "Hard", gen: (rng) => b1retry(b1EN_h151, rng)},
  "hari-15:2": {diff: "Medium", gen: (rng) => b1retry(b1EN_h152, rng)},
  "hari-15:3": {diff: "Hard", gen: (rng) => b1retry(b1EN_h153, rng)},
  "hari-15:4": {diff: "Easy", gen: (rng) => b1retry(b1EN_h154, rng)},
  "hari-15:5": {diff: "Hard", gen: (rng) => b1retry(b1EN_h155, rng)},
  "hari-15:6": {diff: "Hard", gen: (rng) => b1retry(b1EN_h156, rng)},
  "hari-15:7": {diff: "Medium", gen: (rng) => b1retry(b1EN_h157, rng)},
};
