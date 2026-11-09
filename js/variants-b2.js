/* FMVA Sprint — varian mistake-review batch B2 (angka beda, recompute via kode)
   Cakupan: hari-16..hari-22, hari-23/25/28 (mock exam 1-3), hari-31 (bonus IPO),
   excel-l1..excel-l6, real-01..real-12. Total 338 kunci.
   CATATAN: mock hari-23/25/28 BUKAN bank drill ter-parameterisasi — tiap soal ditulis
   tangan (soal biasa, paralel antar mock dengan angka berbeda) sehingga dikerjakan.
   Setiap generator: gen(rng) -> {q, opts[4], answer, explain, steps[]}.
   - opts selalu 4 opsi BERBEDA; answer = indeks opsi benar SETELAH shuffle.
   - Semua angka jawaban dihitung ulang dari angka varian itu sendiri; steps
     menunjukkan hitungannya langkah demi langkah.
   - Varian real-case memakai angka LATIHAN fresh pada mekanik case yang sama
     (bukan angka LK asli case, dan tidak pernah campur angka antar emiten);
     soal yang semata-mata menanyakan fakta case memakai angka case + shuffle.
   - FMVA di sini adalah program belajar (sprint), BUKAN sertifikat selesai.
   Helper lokal ber-prefix b2* supaya tidak bentrok dengan concept-graph.js.
   File ini hanya mendefinisikan; TIDAK memanggil fungsi apa pun. */
function b2Shuffle(arr, rng){
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}
function b2i(v, d){ d = d || 0; return v.toLocaleString("id-ID", {minimumFractionDigits: d, maximumFractionDigits: d}); }
function b2e(v, d){ d = d || 0; return v.toLocaleString("en-US", {minimumFractionDigits: d, maximumFractionDigits: d}); }
function b2i4(v){ return v.toFixed(4).replace(".", ","); }
function b2e4(v){ return v.toFixed(4); }
function b2pick(arr, rng){ return arr[Math.floor(rng() * arr.length)]; }
function b2int(rng, a, b){ return a + Math.floor(rng() * (b - a + 1)); }
function b2step(rng, a, b, s){ return a + s * Math.floor(rng() * ((b - a) / s + 1)); }

/* ---------- shared: akuntansi & linkage ---------- */
function vB2RE(rng, ref, L){
  const R0 = b2step(rng, 6000, 16000, 500), NI = b2step(rng, 3000, 7000, 500), D = b2step(rng, 1000, 4000, 500);
  const RE = R0 + NI - D;
  const vals = [RE, R0 + NI + D, R0 + NI, R0 - D];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Beginning retained earnings Rp${b2e(R0)}k, this year's net income Rp${b2e(NI)}k, dividends paid Rp${b2e(D)}k. Ending retained earnings?`,
    opts: order.map(i => "Rp" + b2e(vals[i]) + "k"),
    answer: order.indexOf(0),
    explain: `${b2e(R0)} + ${b2e(NI)} − ${b2e(D)} = ${b2e(RE)}. (${ref})`,
    steps: ["Analysis: ending RE is asked; beginning RE, net income and dividends are known.",
      "Solve 1: formula — RE(end) = RE(start) + NI − Dividends.",
      `Solve 2: substitute → ${b2e(R0)} + ${b2e(NI)} − ${b2e(D)}.`,
      `Solve 3: compute → Rp${b2e(RE)}k.`]
  };
  return {
    q: `Laba ditahan awal Rp${b2i(R0)} ribu, laba bersih tahun ini Rp${b2i(NI)} ribu, dividen dibayar Rp${b2i(D)} ribu. Laba ditahan akhir?`,
    opts: order.map(i => "Rp" + b2i(vals[i]) + " ribu"),
    answer: order.indexOf(0),
    explain: `${b2i(R0)} + ${b2i(NI)} − ${b2i(D)} = ${b2i(RE)}. (${ref})`,
    steps: ["Analysis: yang ditanya laba ditahan akhir; diketahui awal, laba bersih, dividen.",
      "Solve 1: rumus — RE(akhir) = RE(awal) + NI − Dividen.",
      `Solve 2: substitusi → ${b2i(R0)} + ${b2i(NI)} − ${b2i(D)}.`,
      `Solve 3: hitung → Rp${b2i(RE)} ribu.`]
  };
}
function vB2TrailMachine(rng, ref, L){
  const X = b2step(rng, 6000, 20000, 2000);
  const c = L === "en"
    ? `IS: no impact; BS: cash −${b2e(X)} & fixed assets +${b2e(X)}; CFS: investing −${b2e(X)}`
    : `IS: tidak ada dampak; BS: kas −${b2i(X)} & aset tetap +${b2i(X)}; CFS: investasi −${b2i(X)}`;
  const o = L === "en" ? [
    `IS: expense ${b2e(X)}; BS: cash −${b2e(X)}; CFS: operating −${b2e(X)}`,
    c,
    `IS: revenue +${b2e(X)}; BS: cash +${b2e(X)}`,
    `BS unchanged; CFS: financing −${b2e(X)}`
  ] : [
    `IS: beban ${b2i(X)}; BS: kas −${b2i(X)}; CFS: operasi −${b2i(X)}`,
    c,
    `IS: pendapatan +${b2i(X)}; BS: kas +${b2i(X)}`,
    `BS tidak berubah; CFS: pendanaan −${b2i(X)}`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The company buys a machine for Rp${b2e(X)}k cash. The correct trail across the 3 statements?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Buying a machine swaps assets (cash → fixed assets), not an expense — IS untouched. BS: cash −${b2e(X)}, fixed assets +${b2e(X)}. CFS: −${b2e(X)} in investing. (${ref})`,
    steps: ["Analysis: a machine purchase is capex, not an expense — which statements move?",
      "Solve 1: IS — no expense is recognized at purchase.",
      `Solve 2: BS — cash −${b2e(X)}, fixed assets +${b2e(X)} (asset swap, balanced).`,
      `Solve 3: CFS — −${b2e(X)} in investing activities.`]
  };
  return {
    q: `Perusahaan membeli mesin Rp${b2i(X)} ribu tunai. Jejak ke 3 laporan yang benar?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Membeli mesin adalah pertukaran aset (kas → aset tetap), bukan beban — IS nihil. BS: kas −${b2i(X)}, aset tetap +${b2i(X)}. CFS: −${b2i(X)} di aktivitas investasi. (${ref})`,
    steps: ["Analysis: beli mesin = capex, bukan beban — laporan mana yang bergerak?",
      "Solve 1: IS — tidak ada beban yang diakui saat pembelian.",
      `Solve 2: BS — kas −${b2i(X)}, aset tetap +${b2i(X)} (tukar aset, tetap balance).`,
      `Solve 3: CFS — −${b2i(X)} di aktivitas investasi.`]
  };
}
function vB2TrailShares(rng, ref, L){
  const X = b2step(rng, 10000, 40000, 5000);
  const c = L === "en"
    ? `IS untouched; BS: cash & equity +${b2e(X)}; CFS: financing +${b2e(X)}`
    : `IS nihil; BS: kas & modal +${b2i(X)}; CFS: pendanaan +${b2i(X)}`;
  const o = L === "en" ? [
    `IS: revenue +${b2e(X)}`, c, `BS unchanged`, `CFS: operating +${b2e(X)}`
  ] : [
    `IS: pendapatan +${b2i(X)}`, c, `BS tidak berubah`, `CFS: operasi +${b2i(X)}`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The company issues new shares for Rp${b2e(X)}k cash. The trail across the 3 statements?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `A share issue is not revenue — IS untouched. Pure financing: BS cash +${b2e(X)} & equity +${b2e(X)}; CFS +${b2e(X)} in financing. (${ref})`,
    steps: ["Analysis: issuing shares is financing, not operations.",
      "Solve 1: IS — a share issue is never revenue.",
      `Solve 2: BS — cash +${b2e(X)}, equity (share capital) +${b2e(X)}.`,
      `Solve 3: CFS — +${b2e(X)} in financing activities.`]
  };
  return {
    q: `Perusahaan menerbitkan saham baru Rp${b2i(X)} ribu tunai. Jejak ke 3 laporan?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Penerbitan saham bukan pendapatan — IS nihil. Murni pendanaan: BS kas +${b2i(X)} & modal +${b2i(X)}; CFS +${b2i(X)} di pendanaan. (${ref})`,
    steps: ["Analysis: terbit saham = pendanaan, bukan operasi.",
      "Solve 1: IS — penerbitan saham tidak pernah jadi pendapatan.",
      `Solve 2: BS — kas +${b2i(X)}, modal saham +${b2i(X)}.`,
      `Solve 3: CFS — +${b2i(X)} di aktivitas pendanaan.`]
  };
}
function vB2TrailInventory(rng, ref, L){
  const X = b2step(rng, 4000, 12000, 1000);
  const c = L === "en"
    ? `BS: inventory +${b2e(X)} & payables +${b2e(X)}; IS and CFS untouched`
    : `BS: persediaan +${b2i(X)} & utang usaha +${b2i(X)}; IS dan CFS nihil`;
  const o = L === "en" ? [
    `IS: expense ${b2e(X)}`, c, `CFS: operating −${b2e(X)}`, `BS: cash −${b2e(X)}`
  ] : [
    `IS: beban ${b2i(X)}`, c, `CFS: operasi −${b2i(X)}`, `BS: kas −${b2i(X)}`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Buys Rp${b2e(X)}k of inventory on supplier credit. Impact AT purchase?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `At purchase: BS inventory +${b2e(X)}, payables +${b2e(X)} — balanced, no cash. IS untouched (expense/COGS hits only when SOLD); CFS untouched (no cash out). (${ref})`,
    steps: ["Analysis: inventory bought on credit — what moves at the purchase moment?",
      `Solve 1: BS — inventory +${b2e(X)}, payables +${b2e(X)}; A = L + E still holds.`,
      "Solve 2: IS — nothing; COGS is recognized at SALE, not purchase.",
      "Solve 3: CFS — nothing; no cash has moved yet."]
  };
  return {
    q: `Beli persediaan Rp${b2i(X)} ribu secara utang ke supplier. Dampak SAAT pembelian?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Saat pembelian: BS persediaan +${b2i(X)}, utang usaha +${b2i(X)} — seimbang, tanpa kas. IS nihil (beban/HPP baru muncul saat TERJUAL); CFS nihil (kas belum keluar). (${ref})`,
    steps: ["Analysis: beli persediaan secara utang — apa yang bergerak saat pembelian?",
      `Solve 1: BS — persediaan +${b2i(X)}, utang usaha +${b2i(X)}; A = L + E tetap balance.`,
      "Solve 2: IS — nihil; HPP diakui saat TERJUAL, bukan saat beli.",
      "Solve 3: CFS — nihil; kas belum bergerak."]
  };
}
function vB2TrailLoanPay(rng, ref, L){
  const X = b2step(rng, 3000, 12000, 1000);
  const c = L === "en"
    ? `IS untouched; BS: cash −${b2e(X)} & debt −${b2e(X)}; CFS: financing −${b2e(X)}`
    : `IS nihil; BS: kas −${b2i(X)} & utang −${b2i(X)}; CFS: pendanaan −${b2i(X)}`;
  const o = L === "en" ? [
    `IS: expense ${b2e(X)}`, c, `CFS: operating −${b2e(X)}`, `BS: equity −${b2e(X)}`
  ] : [
    `IS: beban ${b2i(X)}`, c, `CFS: operasi −${b2i(X)}`, `BS: ekuitas −${b2i(X)}`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The company repays a Rp${b2e(X)}k bank loan in cash. The trail across the 3 statements?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `IS untouched (not an expense — the interest is the expense, the principal is not). BS: cash −${b2e(X)}, debt −${b2e(X)}. CFS: −${b2e(X)} in financing. (${ref})`,
    steps: ["Analysis: repaying loan principal — expense or balance-sheet movement?",
      "Solve 1: IS — nothing; principal repayment is not an expense (only interest is).",
      `Solve 2: BS — cash −${b2e(X)}, bank debt −${b2e(X)}.`,
      `Solve 3: CFS — −${b2e(X)} in financing activities.`]
  };
  return {
    q: `Perusahaan membayar utang bank Rp${b2i(X)} ribu tunai. Jejak ke 3 laporan?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `IS nihil (bukan beban — bunganya yang beban, pokoknya bukan). BS: kas −${b2i(X)}, utang −${b2i(X)}. CFS: −${b2i(X)} di pendanaan. (${ref})`,
    steps: ["Analysis: bayar pokok utang — beban atau gerakan neraca?",
      "Solve 1: IS — nihil; pelunasan pokok bukan beban (bunganya yang beban).",
      `Solve 2: BS — kas −${b2i(X)}, utang bank −${b2i(X)}.`,
      `Solve 3: CFS — −${b2i(X)} di aktivitas pendanaan.`]
  };
}
function vB2TrailSalary(rng, ref, L){
  const X = b2step(rng, 1000, 5000, 500);
  const c = L === "en"
    ? `IS: salary expense −${b2e(X)}; BS: salaries payable +${b2e(X)} (accrual)`
    : `IS: beban gaji −${b2i(X)}; BS: utang gaji +${b2i(X)} (akrual)`;
  const o = L === "en" ? [
    `Not recorded — not yet paid`, c, `CFS: operating −${b2e(X)}`, `BS: cash −${b2e(X)}`
  ] : [
    `Tidak dicatat — belum dibayar`, c, `CFS: operasi −${b2i(X)}`, `BS: kas −${b2i(X)}`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Rp${b2e(X)}k of salaries are earned in December but paid in January. December treatment?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Accrual: the expense is recognized when incurred (December) — IS −${b2e(X)}, BS payable +${b2e(X)}. Cash & CFS move only in January. (${ref})`,
    steps: ["Analysis: expense incurred in December, cash paid in January — accrual or cash basis?",
      `Solve 1: IS (December) — salary expense −${b2e(X)} when the work happens.`,
      `Solve 2: BS (December) — salaries payable +${b2e(X)}.`,
      "Solve 3: cash & CFS — nothing in December; they move in January."]
  };
  return {
    q: `Beban gaji Rp${b2i(X)} ribu terjadi di Desember tapi baru dibayar Januari. Perlakuan Desember?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Akrual: beban diakui saat terjadi (Desember) — IS −${b2i(X)}, BS utang +${b2i(X)}. Kas & CFS baru bergerak Januari. (${ref})`,
    steps: ["Analysis: beban terjadi Desember, kas dibayar Januari — akrual atau kas basis?",
      `Solve 1: IS (Desember) — beban gaji −${b2i(X)} saat pekerjaan terjadi.`,
      `Solve 2: BS (Desember) — utang gaji +${b2i(X)}.`,
      "Solve 3: kas & CFS — nihil di Desember; baru bergerak Januari."]
  };
}
function vB2TrailDividend(rng, ref, L){
  const D = b2step(rng, 3000, 6000, 500), P = b2step(rng, 1500, 3500, 500), U = D - P;
  const c = L === "en"
    ? `BS: retained earnings −${b2e(D)}, dividends payable +${b2e(U)}, cash −${b2e(P)}; CFS: financing −${b2e(P)}`
    : `BS: laba ditahan −${b2i(D)}, utang dividen +${b2i(U)}, kas −${b2i(P)}; CFS: pendanaan −${b2i(P)}`;
  const o = L === "en" ? [
    `IS: dividend expense ${b2e(D)}`, c, `CFS: operating −${b2e(D)}`, `BS: cash −${b2e(D)}`
  ] : [
    `IS: beban dividen ${b2i(D)}`, c, `CFS: operasi −${b2i(D)}`, `BS: kas −${b2i(D)}`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Dividends declared Rp${b2e(D)}k, only Rp${b2e(P)}k paid in cash before year-end. The correct trail?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Declaration: RE −${b2e(D)}, dividends payable +${b2e(D)}. Payment: cash −${b2e(P)}, payable −${b2e(P)} → ${b2e(U)} payable remains. The CFS records only cash actually paid: −${b2e(P)} in financing. Dividends are not an expense — never touch the IS. (${ref})`,
    steps: ["Analysis: declared vs paid — two events, two trails.",
      `Solve 1: declaration — RE −${b2e(D)}, dividends payable +${b2e(D)}.`,
      `Solve 2: payment — cash −${b2e(P)}, payable −${b2e(P)} → payable left ${b2e(U)}.`,
      `Solve 3: CFS — only cash out: −${b2e(P)} in financing. IS never touched.`]
  };
  return {
    q: `Dividen diumumkan Rp${b2i(D)} ribu, baru dibayar tunai Rp${b2i(P)} ribu sebelum tutup tahun. Jejak yang benar?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Pengumuman: RE −${b2i(D)}, utang dividen +${b2i(D)}. Pembayaran: kas −${b2i(P)}, utang dividen −${b2i(P)} → sisa utang ${b2i(U)}. CFS hanya mencatat kas yang benar-benar keluar: −${b2i(P)} di pendanaan. Dividen bukan beban — tidak menyentuh IS. (${ref})`,
    steps: ["Analysis: diumumkan vs dibayar — dua kejadian, dua jejak.",
      `Solve 1: pengumuman — RE −${b2i(D)}, utang dividen +${b2i(D)}.`,
      `Solve 2: pembayaran — kas −${b2i(P)}, utang −${b2i(P)} → sisa utang ${b2i(U)}.`,
      `Solve 3: CFS — hanya kas keluar: −${b2i(P)} di pendanaan. IS tidak tersentuh.`]
  };
}
function vB2AccrualSale(rng, ref, L){
  const R = b2step(rng, 12000, 30000, 2000), C = b2step(rng, 6000, 15000, 1000);
  const GP = R - C;
  const c = L === "en"
    ? `IS: revenue ${b2e(R)}, gross profit ${b2e(GP)}; operating cash smaller because receivables rise ${b2e(R)}`
    : `IS: pendapatan ${b2i(R)}, laba kotor ${b2i(GP)}; kas operasi lebih kecil karena piutang naik ${b2i(R)}`;
  const o = L === "en" ? [
    `IS: revenue ${b2e(R)}; CFS operating: cash in ${b2e(R)}`, c,
    `IS: no revenue because no cash received`, `BS: cash up ${b2e(R)}`
  ] : [
    `IS: pendapatan ${b2i(R)}; CFS operasi: kas masuk ${b2i(R)}`, c,
    `IS: tidak ada pendapatan karena kas belum diterima`, `BS: kas naik ${b2i(R)}`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Credit sales Rp${b2e(R)}k (COGS Rp${b2e(C)}k). The customer pays 2 months later, after year-end. This year's impact?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Accrual: the IS records revenue ${b2e(R)} and gross profit ${b2e(GP)} (${b2e(R)}−${b2e(C)}) though no cash arrived. In the CFS, profit is adjusted −${b2e(R)} (receivables up) → operating cash far smaller. (${ref})`,
    steps: ["Analysis: sold on credit — revenue now, cash later.",
      `Solve 1: IS — revenue ${b2e(R)}, gross profit ${b2e(R)} − ${b2e(C)} = ${b2e(GP)}.`,
      `Solve 2: BS — receivables +${b2e(R)} (cash not yet in).`,
      "Solve 3: CFS — operating cash is smaller by the receivables build-up."]
  };
  return {
    q: `Penjualan kredit Rp${b2i(R)} ribu (HPP Rp${b2i(C)} ribu). Pelanggan baru membayar 2 bulan kemudian, setelah tahun buku tutup. Dampak tahun ini?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Akrual: IS mencatat pendapatan ${b2i(R)} dan laba kotor ${b2i(GP)} (${b2i(R)}−${b2i(C)}) walau kas belum masuk. Di CFS, laba dikoreksi −${b2i(R)} (piutang naik) → kas operasi jauh lebih kecil. (${ref})`,
    steps: ["Analysis: jual kredit — pendapatan sekarang, kas nanti.",
      `Solve 1: IS — pendapatan ${b2i(R)}, laba kotor ${b2i(R)} − ${b2i(C)} = ${b2i(GP)}.`,
      `Solve 2: BS — piutang +${b2i(R)} (kas belum masuk).`,
      "Solve 3: CFS — kas operasi lebih kecil sebesar kenaikan piutang."]
  };
}
function vB2DeprNoTax(rng, ref, L){
  const cost = b2step(rng, 12000, 36000, 6000), life = b2pick([5, 6], rng);
  const sl = cost / life, rate = b2pick([33.3, 40], rng);
  const db = Math.round(cost * rate / 100), diff = db - sl;
  const c = L === "en"
    ? `B's profit lower by ${b2e(diff)}; CFO identical for both`
    : `Laba B lebih rendah ${b2i(diff)}; CFO keduanya sama`;
  const o = L === "en" ? [
    `A's profit lower by ${b2e(diff)}; A's CFO higher`, c,
    `Profits equal; B's CFO higher`, `Both exactly the same`
  ] : [
    `Laba A lebih rendah ${b2i(diff)}; CFO A lebih tinggi`, c,
    `Laba sama; CFO B lebih tinggi`, `Keduanya persis sama`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A Rp${b2e(cost)}k machine, ${life}-year life. A: straight line (${b2e(sl)}/yr). B: ${rate}% declining balance (${b2e(db)} in year 1). No taxes — year 1?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `B's charge ${b2e(db)} vs A's ${b2e(sl)} → B's profit lower by ${b2e(diff)}. Without taxes, CFO = NI + D&A — identical for both. Depreciation methods move accounting profit, not cash (pre-tax). (${ref})`,
    steps: ["Analysis: two depreciation methods, no tax — profit vs cash?",
      `Solve 1: year-1 charge — A ${b2e(sl)}, B ${b2e(db)}; gap ${b2e(diff)}.`,
      `Solve 2: profit — B lower by ${b2e(diff)}.`,
      "Solve 3: CFO — NI + D&A adds the charge straight back, so CFO is identical."]
  };
  return {
    q: `Mesin Rp${b2i(cost)} ribu, umur ${life} tahun. A: garis lurus (${b2i(sl)}/thn). B: saldo menurun ${b2i(rate, 1)}% (${b2i(db)} di tahun-1). Tanpa pajak — tahun-1?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Beban B ${b2i(db)} vs A ${b2i(sl)} → laba B lebih rendah ${b2i(diff)}. Tanpa pajak, CFO = NI + D&A — identik untuk keduanya. Metode depresiasi mengubah laba akuntansi, bukan kas (sebelum pajak). (${ref})`,
    steps: ["Analysis: dua metode depresiasi, tanpa pajak — laba vs kas?",
      `Solve 1: beban tahun-1 — A ${b2i(sl)}, B ${b2i(db)}; selisih ${b2i(diff)}.`,
      `Solve 2: laba — B lebih rendah ${b2i(diff)}.`,
      "Solve 3: CFO — NI + D&A mengembalikan beban, jadi CFO identik."]
  };
}
function vB2DeprTax(rng, ref, L){
  const cost = b2step(rng, 24000, 36000, 6000), life = 5;
  const sl = cost / life, db = Math.round(cost * 0.4), diff = db - sl, tax = 25, shield = Math.round(diff * tax / 100);
  const c = L === "en"
    ? `B's CFO higher by ${b2e(shield)} (tax shield)`
    : `CFO B lebih tinggi ${b2i(shield)} (tax shield)`;
  const o = L === "en" ? [
    c, `CFO identical`, `A's CFO higher by ${b2e(shield)}`, `B's CFO lower`
  ] : [
    c, `CFO sama`, `CFO A lebih tinggi ${b2i(shield)}`, `CFO B lebih rendah`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A Rp${b2e(cost)}k machine, ${life}-year life. A: straight line (${b2e(sl)}/yr). B: 40% declining balance (${b2e(db)} in year 1). Tax ${tax}%. Year-1 CFO?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `B's bigger charge ${b2e(diff)} → B's tax smaller by ${b2e(diff)} × ${tax}% = ${b2e(shield)} → B's CFO higher by ${b2e(shield)}. That is the depreciation tax shield: without taxes methods do not move cash; with taxes, aggressive = more early cash. (${ref})`,
    steps: ["Analysis: same methods, now WITH tax — does the method move cash?",
      `Solve 1: extra year-1 charge for B = ${b2e(db)} − ${b2e(sl)} = ${b2e(diff)}.`,
      `Solve 2: tax saved = ${b2e(diff)} × ${tax}% = ${b2e(shield)}.`,
      `Solve 3: CFO — B keeps ${b2e(shield)} more cash in year 1.`]
  };
  return {
    q: `Mesin Rp${b2i(cost)} ribu, umur ${life} tahun. A: garis lurus (${b2i(sl)}/thn). B: saldo menurun 40% (${b2i(db)} thn-1). Pajak ${tax}%. CFO tahun-1?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Beban B lebih besar ${b2i(diff)} → pajak B lebih kecil ${b2i(diff)} × ${tax}% = ${b2i(shield)} → CFO B lebih tinggi ${b2i(shield)}. Inilah tax shield depresiasi: tanpa pajak metode tak memengaruhi kas; dengan pajak, metode agresif = kas lebih besar di awal. (${ref})`,
    steps: ["Analysis: metode sama, kini DENGAN pajak — apakah metode menggerakkan kas?",
      `Solve 1: beban tahun-1 B lebih besar ${b2i(db)} − ${b2i(sl)} = ${b2i(diff)}.`,
      `Solve 2: pajak dihemat = ${b2i(diff)} × ${tax}% = ${b2i(shield)}.`,
      `Solve 3: CFO — B menyimpan kas ${b2i(shield)} lebih banyak di tahun-1.`]
  };
}
function vB2CFO(rng, ref, L){
  const NI = b2step(rng, 8000, 16000, 1000), DA = b2step(rng, 2000, 5000, 500);
  const up = rng() < 0.5, dWC = b2step(rng, 1000, 2500, 500);
  const cfo = up ? NI + DA - dWC : NI + DA + dWC;
  const vals = [cfo, NI + DA + (up ? dWC : -dWC), NI + DA, NI - DA];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const dir = L === "en" ? (up ? "UP" : "DOWN") : (up ? "NAIK" : "TURUN");
  if (L === "en") return {
    q: `NI Rp${b2e(NI)}k, D&A Rp${b2e(DA)}k, working capital ${dir} Rp${b2e(dWC)}k. CFO?`,
    opts: order.map(i => "Rp" + b2e(vals[i]) + "k"),
    answer: order.indexOf(0),
    explain: `${b2e(NI)} + ${b2e(DA)} ${up ? "−" : "+"} ${b2e(dWC)} = ${b2e(cfo)}. Rising WC ties up cash (subtract); falling WC frees it (add). (${ref})`,
    steps: ["Analysis: indirect CFO — NI plus non-cash, adjusted for ΔWC.",
      "Solve 1: formula — CFO = NI + D&A ± ΔWC.",
      `Solve 2: substitute → ${b2e(NI)} + ${b2e(DA)} ${up ? "−" : "+"} ${b2e(dWC)} (WC ${dir.toLowerCase()}).`,
      `Solve 3: compute → Rp${b2e(cfo)}k.`]
  };
  return {
    q: `NI Rp${b2i(NI)} ribu, D&A Rp${b2i(DA)} ribu, modal kerja ${dir} Rp${b2i(dWC)} ribu. CFO?`,
    opts: order.map(i => "Rp" + b2i(vals[i]) + " ribu"),
    answer: order.indexOf(0),
    explain: `${b2i(NI)} + ${b2i(DA)} ${up ? "−" : "+"} ${b2i(dWC)} = ${b2i(cfo)}. WC naik mengikat kas (kurangi); WC turun membebaskan kas (tambah). (${ref})`,
    steps: ["Analysis: CFO tidak langsung — NI plus non-kas, disesuaikan ΔWC.",
      "Solve 1: rumus — CFO = NI + D&A ± ΔWC.",
      `Solve 2: substitusi → ${b2i(NI)} + ${b2i(DA)} ${up ? "−" : "+"} ${b2i(dWC)} (WC ${dir.toLowerCase()}).`,
      `Solve 3: hitung → Rp${b2i(cfo)} ribu.`]
  };
}
function vB2CFOWC(rng, ref, L){
  let dAR, dInv, dAP, dWC, eff;
  for (let t = 0; t < 50; t++) {
    dAR = b2step(rng, 1000, 3000, 500) * b2pick([1, -1], rng);
    dInv = b2step(rng, 1000, 2500, 500) * b2pick([1, -1], rng);
    dAP = b2step(rng, 500, 2500, 500) * b2pick([1, -1], rng);
    dWC = (dAR + dInv) - dAP; eff = -dWC;
    // guard: distractor magnitudes must differ from |eff| and each other; eff != 0
    if (eff !== 0 && Math.abs(dAR) !== Math.abs(eff) && Math.abs(dAP) !== Math.abs(eff) && Math.abs(dAR) !== Math.abs(dAP)) break;
  }
  const fmt = v => (v >= 0 ? "+" : "−") + (L === "en" ? b2e(Math.abs(v)) : b2i(Math.abs(v)));
  const up = v => (L === "en" ? (v > 0 ? "up" : v < 0 ? "down" : "flat") : (v > 0 ? "naik" : v < 0 ? "turun" : "tetap"));
  const c = eff === 0
    ? (L === "en" ? "Unchanged (zero)" : "Tidak berubah (nol)")
    : (L === "en" ? `CFO ${eff > 0 ? "up" : "down"} ${b2e(Math.abs(eff))}` : `CFO ${eff > 0 ? "naik" : "turun"} ${b2i(Math.abs(eff))}`);
  const o = [c,
    L === "en" ? `CFO ${eff > 0 ? "down" : "up"} ${b2e(Math.abs(eff))}` : `CFO ${eff > 0 ? "turun" : "naik"} ${b2i(Math.abs(eff))}`,
    L === "en" ? `CFO down ${b2e(Math.abs(dAR))}` : `CFO turun ${b2i(Math.abs(dAR))}`,
    L === "en" ? `CFO up ${b2e(Math.abs(dAP))}` : `CFO naik ${b2i(Math.abs(dAP))}`];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Receivables ${up(dAR)} ${b2e(Math.abs(dAR))}, inventory ${up(dInv)} ${b2e(Math.abs(dInv))}, payables ${up(dAP)} ${b2e(Math.abs(dAP))} (k). CFO impact?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `ΔWC = (${fmt(dAR)} ${fmt(dInv)}) − (${fmt(dAP)}) = ${fmt(dWC)} → CFO ${eff === 0 ? "unchanged" : (eff > 0 ? "up" : "down") + " " + b2e(Math.abs(eff))}. Asset rises tie up cash; payables rises free it. (${ref})`,
    steps: ["Analysis: three ΔWC pieces — combine them before touching CFO.",
      `Solve 1: Δassets = ${fmt(dAR)} + ${fmt(dInv)} = ${fmt(dAR + dInv)}.`,
      `Solve 2: ΔWC = Δassets − Δliabilities = ${fmt(dAR + dInv)} − (${fmt(dAP)}) = ${fmt(dWC)}.`,
      `Solve 3: CFO impact = −ΔWC = ${fmt(eff)}.`]
  };
  return {
    q: `Piutang ${up(dAR)} ${b2i(Math.abs(dAR))}, persediaan ${up(dInv)} ${b2i(Math.abs(dInv))}, utang usaha ${up(dAP)} ${b2i(Math.abs(dAP))} (ribu). Dampak ke CFO?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `ΔWC = (${fmt(dAR)} ${fmt(dInv)}) − (${fmt(dAP)}) = ${fmt(dWC)} → CFO ${eff === 0 ? "tidak berubah" : (eff > 0 ? "naik" : "turun") + " " + b2i(Math.abs(eff))}. Aset naik mengikat kas; utang naik membebaskan kas. (${ref})`,
    steps: ["Analysis: tiga komponen ΔWC — gabungkan dulu sebelum menyentuh CFO.",
      `Solve 1: Δaset = ${fmt(dAR)} + ${fmt(dInv)} = ${fmt(dAR + dInv)}.`,
      `Solve 2: ΔWC = Δaset − Δliabilitas = ${fmt(dAR + dInv)} − (${fmt(dAP)}) = ${fmt(dWC)}.`,
      `Solve 3: dampak CFO = −ΔWC = ${fmt(eff)}.`]
  };
}
function vB2CashBridge(rng, ref, L){
  const end = b2step(rng, 4500, 8000, 500), gap = b2step(rng, 250, 1000, 250), bs = end - gap;
  const c = L === "en"
    ? "Some cell is unlinked — the cash bridge is absolute"
    : "Pasti ada sel yang tidak ter-link — jembatan kas bersifat mutlak";
  const o = L === "en" ? [
    "Normal — two different methods", "Fine if there are dividends", c, "Depends on assumptions"
  ] : [
    "Normal — dua metode berbeda", "Wajar kalau ada dividen", c, "Tergantung asumsi"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Ending cash in the CFS is Rp${b2e(end)}k, but balance-sheet cash is Rp${b2e(bs)}k. Other checks pass. Meaning?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `The cash bridge is absolute: CFS ending cash must exactly equal balance-sheet cash. A ${b2e(gap)} gap = a broken link (e.g. dividends in RE but missing from CFF). Not a method difference — no method justifies a gap. (${ref})`,
    steps: ["Analysis: two cash numbers that must be one number.",
      `Solve 1: CFS ending cash ${b2e(end)} vs BS cash ${b2e(bs)} — gap ${b2e(gap)}.`,
      "Solve 2: the cash bridge is absolute — tolerance is zero.",
      "Solve 3: a gap means a broken link somewhere (check dividends, debt, capex links)."]
  };
  return {
    q: `Kas akhir di CFS Rp${b2i(end)} ribu, tapi kas di neraca Rp${b2i(bs)} ribu. Balance check lain OK. Artinya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Jembatan kas bersifat mutlak: kas akhir CFS harus sama persis dengan kas di neraca. Selisih ${b2i(gap)} = ada link yang putus (mis. dividen tercatat di RE tapi tidak di CFF). Bukan perbedaan metode — tidak ada metode yang membenarkan selisih. (${ref})`,
    steps: ["Analysis: dua angka kas yang harusnya satu angka.",
      `Solve 1: kas akhir CFS ${b2i(end)} vs kas neraca ${b2i(bs)} — selisih ${b2i(gap)}.`,
      "Solve 2: jembatan kas bersifat mutlak — toleransi selisih = nol.",
      "Solve 3: selisih berarti ada link putus (cek dividen, utang, capex)."]
  };
}
function vB2CashTieOut(rng, ref, L){
  const cfo = b2step(rng, 9000, 14000, 1000), cfi = -b2step(rng, 4000, 8000, 1000), cff = -b2step(rng, 2000, 4000, 1000);
  const beg = b2step(rng, 2000, 4000, 500), end = beg + cfo + cfi + cff, gap = b2pick([500, 1000], rng);
  const c = L === "en" ? `A ${b2e(gap)} gap to the BS is fine` : `Selisih ${b2i(gap)} dengan neraca itu wajar`;
  const o = L === "en" ? [
    `Ending cash = ${b2e(end)}`, `The BS tie-out must be exactly ${b2e(end)}`, c, `Negative CFF = cash out for financing`
  ] : [
    `Kas akhir = ${b2e(end)}`, `Tie-out ke kas neraca harus ${b2e(end)} persis`, c, `CFF negatif = kas keluar untuk pendanaan`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `CFO ${b2e(cfo)}, CFI ${b2e(cfi)}, CFF ${b2e(cff)}, beginning cash ${b2e(beg)} (k). Which statement is WRONG?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Ending cash = ${b2e(end)}, and the BS tie-out must be EXACTLY ${b2e(end)} — gap tolerance is zero. 'A ${b2e(gap)} gap is fine' is the most dangerous wrong statement: it legalizes a broken link. (${ref})`,
    steps: ["Analysis: build ending cash first, then judge each statement.",
      `Solve 1: ending cash = ${b2e(beg)} + ${b2e(cfo)} + (${b2e(cfi)}) + (${b2e(cff)}) = ${b2e(end)}.`,
      `Solve 2: the BS tie-out must be ${b2e(end)} exactly — zero tolerance.`,
      "Solve 3: so the 'gap is fine' statement is the wrong one."]
  };
  return {
    q: `CFO ${b2i(cfo)}, CFI ${b2i(cfi)}, CFF ${b2i(cff)}, kas awal ${b2i(beg)} (ribu). Pernyataan yang SALAH?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Kas akhir = ${b2i(end)}, dan tie-out ke neraca harus ${b2i(end)} PERSIS — toleransi selisih = nol. 'Selisih ${b2i(gap)} wajar' adalah pernyataan salah yang paling berbahaya: ia melegalkan bug link. (${ref})`,
    steps: ["Analysis: bangun kas akhir dulu, baru nilai tiap pernyataan.",
      `Solve 1: kas akhir = ${b2i(beg)} + ${b2i(cfo)} + (${b2i(cfi)}) + (${b2i(cff)}) = ${b2i(end)}.`,
      `Solve 2: tie-out ke neraca harus ${b2i(end)} persis — toleransi nol.`,
      "Solve 3: jadi pernyataan 'selisih wajar' itulah yang salah."]
  };
}
function vB2DefTaxProv(rng, ref, L){
  const X = b2step(rng, 600, 1600, 200), t = 22, dta = Math.round(X * t / 100);
  const vals = [dta, dta * 2, dta / 2, 0];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const c = L === "en" ? `Deferred tax asset ${b2e(dta)}` : `Aset pajak tangguhan ${b2i(dta)}`;
  const o = L === "en" ? [c, `Deferred tax liability ${b2e(dta)}`, `Tax expense up ${b2e(dta)}`, `No impact`]
    : [c, `Liabilitas pajak tangguhan ${b2i(dta)}`, `Beban pajak naik ${b2i(dta)}`, `Tidak ada dampak`];
  if (L === "en") return {
    q: `A Rp${b2e(X)}k warranty provision is recognized in the accounts but only tax-deductible when actually paid. Tax rate ${t}%. Deferred-tax impact?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `The ${b2e(X)} hits accounting profit but not taxable profit → taxable profit higher → more tax paid now. The excess becomes a deferred tax asset: ${b2e(X)} × ${t}% = ${b2e(dta)} — the right to cut tax when warranties are actually paid later. (${ref})`,
    steps: ["Analysis: expense recognized in books, not yet deductible for tax.",
      `Solve 1: temporary difference = ${b2e(X)} (book expense ahead of tax deduction).`,
      `Solve 2: prepaid tax = ${b2e(X)} × ${t}% = ${b2e(dta)}.`,
      "Solve 3: prepaid tax is an ASSET (DTA) — it cuts future tax."]
  };
  return {
    q: `Provisi garansi Rp${b2i(X)} ribu diakui di laporan akuntansi, tapi baru deductible pajak saat benar-benar dibayar. Tarif pajak ${t}%. Dampak pajak tangguhan?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Beban ${b2i(X)} diakui akuntansi tapi belum boleh dikurangkan fiskal → laba fiskal lebih tinggi → pajak kini lebih besar. Kelebihan itu menjadi aset pajak tangguhan: ${b2i(X)} × ${t}% = ${b2i(dta)} — hak memotong pajak saat garansi benar-benar dibayar nanti. (${ref})`,
    steps: ["Analysis: beban diakui di buku, belum deductible fiskal.",
      `Solve 1: beda temporer = ${b2i(X)} (beban buku mendahului pengurang pajak).`,
      `Solve 2: pajak dibayar di muka = ${b2i(X)} × ${t}% = ${b2i(dta)}.`,
      "Solve 3: pajak dibayar di muka adalah ASET (DTA) — memotong pajak masa depan."]
  };
}
function vB2DefTaxDepr(rng, ref, L){
  const X = b2step(rng, 1500, 3000, 500), t = 22, dtl = Math.round(X * t / 100);
  const c = L === "en" ? `Deferred tax liability ${b2e(dtl)}` : `Liabilitas pajak tangguhan ${b2i(dtl)}`;
  const o = L === "en" ? [
    `Deferred tax asset ${b2e(dtl)}`, c, `No impact`, `Tax expense up ${b2e(dtl)}`
  ] : [
    `Aset pajak tangguhan ${b2i(dtl)}`, c, `Tidak ada dampak`, `Beban pajak naik ${b2i(dtl)}`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Tax depreciation exceeds book depreciation by Rp${b2e(X)}k. Tax rate ${t}%. Impact?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Bigger tax charge → smaller taxable profit → ${b2e(dtl)} less tax paid now. But books recognize less expense — the gap becomes a deferred tax liability: ${b2e(X)} × ${t}% = ${b2e(dtl)}, tax 'deferred' to the future. (${ref})`,
    steps: ["Analysis: tax depreciation ahead of book depreciation.",
      `Solve 1: temporary difference = ${b2e(X)}.`,
      `Solve 2: tax deferred = ${b2e(X)} × ${t}% = ${b2e(dtl)}.`,
      "Solve 3: tax paid LATER than books show = a LIABILITY (DTL)."]
  };
  return {
    q: `Depresiasi fiskal Rp${b2i(X)} ribu LEBIH BESAR dari depresiasi akuntansi. Tarif ${t}%. Dampak?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Beban fiskal lebih besar → laba kena pajak lebih kecil → pajak kini lebih kecil ${b2i(dtl)}. Tapi akuntansi mengakui beban lebih kecil — selisihnya jadi liabilitas pajak tangguhan: ${b2i(X)} × ${t}% = ${b2i(dtl)}, pajak yang 'ditunda' ke masa depan. (${ref})`,
    steps: ["Analysis: depresiasi fiskal mendahului depresiasi buku.",
      `Solve 1: beda temporer = ${b2i(X)}.`,
      `Solve 2: pajak ditunda = ${b2i(X)} × ${t}% = ${b2i(dtl)}.`,
      "Solve 3: pajak dibayar LEBIH LAMBAT dari yang diakui buku = LIABILITAS (DTL)."]
  };
}
function vB2DTANOL(rng, ref, L){
  const X = b2step(rng, 8000, 15000, 1000), t = 22, dta = Math.round(X * t / 100);
  const c = L === "en"
    ? `Rp${b2e(dta)}k ONLY if future taxable profits are probable; otherwise none (in full)`
    : `Rp${b2i(dta)} ribu HANYA jika probable ada laba kena pajak masa depan; jika tidak, tidak boleh (penuh)`;
  const o = L === "en" ? [
    `Rp${b2e(dta)}k automatically`, c, `Rp${b2e(X)}k`, `Zero — losses can never be an asset`
  ] : [
    `Rp${b2i(dta)} ribu otomatis`, c, `Rp${b2i(X)} ribu`, `Nol — rugi tidak bisa jadi aset`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Tax losses of Rp${b2e(X)}k. Tax rate ${t}%. Recognizable deferred tax asset?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `${b2e(dta)} is the ceiling, not an automatic right. Loss-based DTAs are recognized only when future taxable profits are probable — otherwise a valuation allowance (zero). 'Auto-multiply by the rate' = a phantom asset. (${ref})`,
    steps: ["Analysis: a tax loss is only worth something if future profits exist to shield.",
      `Solve 1: ceiling = ${b2e(X)} × ${t}% = ${b2e(dta)}.`,
      "Solve 2: recognition test — probable future taxable profit?",
      "Solve 3: not probable → valuation allowance → DTA zero."]
  };
  return {
    q: `Rugi fiskal Rp${b2i(X)} ribu. Tarif ${t}%. Aset pajak tangguhan yang boleh diakui?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `${b2i(dta)} = plafon, bukan hak otomatis. DTA dari rugi fiskal hanya diakui jika probable ada laba kena pajak untuk memakainya — jika tidak probable, wajib valuation allowance (nol). 'Otomatis dikali tarif' = aset hantu. (${ref})`,
    steps: ["Analysis: rugi fiskal hanya berharga bila ada laba masa depan untuk dilindungi.",
      `Solve 1: plafon = ${b2i(X)} × ${t}% = ${b2i(dta)}.`,
      "Solve 2: uji pengakuan — apakah probable ada laba kena pajak?",
      "Solve 3: tidak probable → valuation allowance → DTA nol."]
  };
}
function vB2WC(rng, ref, L){
  let CA, CL;
  for (let t = 0; t < 50; t++) {
    CA = b2step(rng, 12000, 24000, 1000); CL = b2step(rng, 8000, 14000, 500);
    if (CA > CL && CA !== 2 * CL) break; // guard: CA = 2x CL would make WC == CL
  }
  const wc = CA - CL;
  const vals = [wc, CA + CL, CL, CA];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Current assets Rp${b2e(CA)}k, current liabilities Rp${b2e(CL)}k. Working capital?`,
    opts: order.map(i => "Rp" + b2e(vals[i]) + "k"),
    answer: order.indexOf(0),
    explain: `${b2e(CA)} − ${b2e(CL)} = ${b2e(wc)}. (${ref})`,
    steps: ["Analysis: working capital is asked; current assets & liabilities are known.",
      "Solve 1: formula — WC = Current assets − Current liabilities.",
      `Solve 2: substitute → ${b2e(CA)} − ${b2e(CL)}.`,
      `Solve 3: compute → Rp${b2e(wc)}k.`]
  };
  return {
    q: `Aset lancar Rp${b2i(CA)} ribu, liabilitas lancar Rp${b2i(CL)} ribu. Modal kerja?`,
    opts: order.map(i => "Rp" + b2i(vals[i]) + " ribu"),
    answer: order.indexOf(0),
    explain: `${b2i(CA)} − ${b2i(CL)} = ${b2i(wc)}. (${ref})`,
    steps: ["Analysis: yang ditanya modal kerja; diketahui aset & liabilitas lancar.",
      "Solve 1: rumus — Modal kerja = Aset lancar − Liabilitas lancar.",
      `Solve 2: substitusi → ${b2i(CA)} − ${b2i(CL)}.`,
      `Solve 3: hitung → Rp${b2i(wc)} ribu.`]
  };
}

/* ---------- shared: days, DCF core ---------- */
function vB2Days(rng, ref, L, mode){
  const bal = b2step(rng, 2000, 5000, 500), flow = b2step(rng, 30000, 72000, 6000);
  const days = Math.round(bal / flow * 360);
  // 365-day distractor rounds onto `days` for small values; use multipliers instead
  const vals = [days, Math.round(days * 1.2), Math.round(days / 2), Math.round(days * 0.8)];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const names = {DSO: ["Piutang", "penjualan tahunan", "DSO", "Receivables", "annual sales", "DSO"],
    DPO: ["Utang usaha", "pembelian tahunan", "DPO", "Payables", "annual purchases", "DPO"],
    DIO: ["Persediaan", "HPP tahunan", "DIO", "Inventory", "annual COGS", "DIO"]}[mode];
  if (L === "en") return {
    q: `${names[3]} Rp${b2e(bal)}k, ${names[4]} Rp${b2e(flow)}k (360 days). ${names[5]}?`,
    opts: order.map(i => vals[i] + " days"),
    answer: order.indexOf(0),
    explain: `${b2e(bal)} ÷ ${b2e(flow)} × 360 = ${days} days. (${ref})`,
    steps: ["Analysis: convert a balance into days of flow.",
      `Solve 1: daily flow = ${b2e(flow)} ÷ 360 = ${b2e(Math.round(flow / 360 * 100) / 100)}.`,
      `Solve 2: days = balance ÷ daily flow = ${b2e(bal)} ÷ ${b2e(Math.round(flow / 360 * 100) / 100)}.`,
      `Solve 3: compute → ${days} days.`]
  };
  return {
    q: `${names[0]} Rp${b2i(bal)} ribu, ${names[1]} Rp${b2i(flow)} ribu (360 hari). ${names[2]}?`,
    opts: order.map(i => vals[i] + " hari"),
    answer: order.indexOf(0),
    explain: `${b2i(bal)} ÷ ${b2i(flow)} × 360 = ${days} hari. (${ref})`,
    steps: ["Analysis: ubah saldo jadi hari dari arus tahunan.",
      `Solve 1: arus harian = ${b2i(flow)} ÷ 360 = ${b2i(Math.round(flow / 360 * 100) / 100)}.`,
      `Solve 2: hari = saldo ÷ arus harian = ${b2i(bal)} ÷ ${b2i(Math.round(flow / 360 * 100) / 100)}.`,
      `Solve 3: hitung → ${days} hari.`]
  };
}
function vB2CCC(rng, ref, L){
  const dso = b2step(rng, 25, 50, 5), dio = b2step(rng, 40, 65, 5), dpo = b2step(rng, 35, 60, 5);
  const ccc = dso + dio - dpo;
  const vals = [ccc, dso + dio + dpo, dso + dio, Math.abs(dso - dpo)];
  /* Dedupe by construction: |dso−dpo| bisa sama dengan CCC (saat
     dpo = dso + dio/2, mis. 25/40/45 → 20 = 20). Distractor yang
     bertabrakan digeser +5 hari sampai berbeda — tetap di grid kelipatan 5. */
  for (let i = 1; i < vals.length; i++) while (vals.indexOf(vals[i]) !== i) vals[i] += 5;
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `DIO ${dio} days, DSO ${dso} days, DPO ${dpo} days. Cash conversion cycle?`,
    opts: order.map(i => vals[i] + " days"),
    answer: order.indexOf(0),
    explain: `${dio} + ${dso} − ${dpo} = ${ccc} days — cash tied up from paying suppliers to collecting from customers. (${ref})`,
    steps: ["Analysis: CCC is asked; DIO, DSO, DPO are known.",
      "Solve 1: formula — CCC = DIO + DSO − DPO.",
      `Solve 2: substitute → ${dio} + ${dso} − ${dpo}.`,
      `Solve 3: compute → ${ccc} days.`]
  };
  return {
    q: `DIO ${dio} hari, DSO ${dso} hari, DPO ${dpo} hari. Cash conversion cycle?`,
    opts: order.map(i => vals[i] + " hari"),
    answer: order.indexOf(0),
    explain: `${dio} + ${dso} − ${dpo} = ${ccc} hari — kas terikat dari bayar supplier sampai terima dari pelanggan. (${ref})`,
    steps: ["Analysis: yang ditanya CCC; diketahui DIO, DSO, DPO.",
      "Solve 1: rumus — CCC = DIO + DSO − DPO.",
      `Solve 2: substitusi → ${dio} + ${dso} − ${dpo}.`,
      `Solve 3: hitung → ${ccc} hari.`]
  };
}
function vB2DPOExt(rng, ref, L){
  const pur = b2step(rng, 36000, 72000, 12000), d0 = b2pick([30, 45], rng), d1 = d0 + 15;
  const perDay = pur / 360, cash = Math.round(perDay * 15);
  const vals = [cash, Math.round(perDay * 30), Math.round(perDay * 5), pur];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `DPO extended ${d0} → ${d1} days, annual purchases Rp${b2e(pur)}k. One-time free cash released?`,
    opts: order.map(i => "Rp" + b2e(vals[i]) + "k"),
    answer: order.indexOf(0),
    explain: `${b2e(pur)} ÷ 360 = ${b2e(perDay)}/day; 15 days × ${b2e(perDay)} = ${b2e(cash)} — suppliers fund 15 more days of purchases. One-time, not yearly (unless purchases grow). (${ref})`,
    steps: ["Analysis: longer supplier terms = supplier-financed cash, once.",
      `Solve 1: daily purchases = ${b2e(pur)} ÷ 360 = ${b2e(perDay)}.`,
      `Solve 2: extra days = ${d1} − ${d0} = 15.`,
      `Solve 3: cash freed = 15 × ${b2e(perDay)} = Rp${b2e(cash)}k.`]
  };
  return {
    q: `DPO diperpanjang ${d0} → ${d1} hari, pembelian tahunan Rp${b2i(pur)} ribu. Tambahan kas bebas (sekali)?`,
    opts: order.map(i => "Rp" + b2i(vals[i]) + " ribu"),
    answer: order.indexOf(0),
    explain: `${b2i(pur)} ÷ 360 = ${b2i(perDay)}/hari; 15 hari × ${b2i(perDay)} = ${b2i(cash)} — supplier membiayai 15 hari pembelian lebih lama. Satu kali, bukan tiap tahun (kecuali pembelian tumbuh). (${ref})`,
    steps: ["Analysis: tempo supplier lebih panjang = kas dibiayai supplier, sekali saja.",
      `Solve 1: pembelian harian = ${b2i(pur)} ÷ 360 = ${b2i(perDay)}.`,
      `Solve 2: tambahan hari = ${d1} − ${d0} = 15.`,
      `Solve 3: kas bebas = 15 × ${b2i(perDay)} = Rp${b2i(cash)} ribu.`]
  };
}
function vB2DSOUp(rng, ref, L){
  const sales = b2step(rng, 36000, 72000, 18000), d0 = b2pick([25, 30], rng), d1 = d0 + 10;
  const perDay = sales / 360, cash = Math.round(perDay * 10);
  const vals = [cash, Math.round(perDay * 40), Math.round(perDay * 2), sales];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `DSO rises ${d0} → ${d1} days, annual sales Rp${b2e(sales)}k. Extra cash trapped?`,
    opts: order.map(i => "Rp" + b2e(vals[i]) + "k"),
    answer: order.indexOf(0),
    explain: `${b2e(sales)} ÷ 360 = ${b2e(perDay)}/day; 10 extra days × ${b2e(perDay)} = ${b2e(cash)} trapped in receivables. Slower-paying customers = you lending them free money. (${ref})`,
    steps: ["Analysis: slower collection traps cash in receivables.",
      `Solve 1: daily sales = ${b2e(sales)} ÷ 360 = ${b2e(perDay)}.`,
      `Solve 2: extra days = ${d1} − ${d0} = 10.`,
      `Solve 3: cash trapped = 10 × ${b2e(perDay)} = Rp${b2e(cash)}k.`]
  };
  return {
    q: `DSO naik ${d0} → ${d1} hari, penjualan tahunan Rp${b2i(sales)} ribu. Kas yang tertahan tambahan?`,
    opts: order.map(i => "Rp" + b2i(vals[i]) + " ribu"),
    answer: order.indexOf(0),
    explain: `${b2i(sales)} ÷ 360 = ${b2i(perDay)}/hari; 10 hari tambahan × ${b2i(perDay)} = ${b2i(cash)} kas tertahan di piutang. Pelanggan membayar lebih lambat = kamu meminjamkan uang gratis ke mereka. (${ref})`,
    steps: ["Analysis: penagihan melambat = kas tertahan di piutang.",
      `Solve 1: penjualan harian = ${b2i(sales)} ÷ 360 = ${b2i(perDay)}.`,
      `Solve 2: tambahan hari = ${d1} − ${d0} = 10.`,
      `Solve 3: kas tertahan = 10 × ${b2i(perDay)} = Rp${b2i(cash)} ribu.`]
  };
}
function vB2FCFF(rng, ref, L){
  let nopat, da, capex, dwc, fcff, vals;
  for (let t = 0; t < 50; t++) {
    nopat = b2step(rng, 5000, 10000, 500); da = b2step(rng, 1000, 3000, 500);
    capex = b2step(rng, 2000, 5000, 500); dwc = b2step(rng, 500, 1500, 500);
    fcff = nopat + da - capex - dwc;
    vals = [fcff, nopat + da - dwc, nopat + da - capex, nopat - da];
    if (new Set(vals).size === 4) break;
  }
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `NOPAT ${b2e(nopat)}, D&A ${b2e(da)}, capex ${b2e(capex)}, ΔWC ${b2e(dwc)} (k). FCFF?`,
    opts: order.map(i => b2e(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2e(nopat)} + ${b2e(da)} − ${b2e(capex)} − ${b2e(dwc)} = ${b2e(fcff)}. (${ref})`,
    steps: ["Analysis: FCFF from NOPAT — add back non-cash, subtract reinvestment.",
      "Solve 1: formula — FCFF = NOPAT + D&A − capex − ΔWC.",
      `Solve 2: substitute → ${b2e(nopat)} + ${b2e(da)} − ${b2e(capex)} − ${b2e(dwc)}.`,
      `Solve 3: compute → ${b2e(fcff)}.`]
  };
  return {
    q: `NOPAT ${b2i(nopat)}, D&A ${b2i(da)}, capex ${b2i(capex)}, ΔWC ${b2i(dwc)} (ribu). FCFF?`,
    opts: order.map(i => b2i(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2i(nopat)} + ${b2i(da)} − ${b2i(capex)} − ${b2i(dwc)} = ${b2i(fcff)}. (${ref})`,
    steps: ["Analysis: FCFF dari NOPAT — tambah non-kas, kurangi reinvestasi.",
      "Solve 1: rumus — FCFF = NOPAT + D&A − capex − ΔWC.",
      `Solve 2: substitusi → ${b2i(nopat)} + ${b2i(da)} − ${b2i(capex)} − ${b2i(dwc)}.`,
      `Solve 3: hitung → ${b2i(fcff)}.`]
  };
}
function vB2CAPM(rng, ref, L){
  const rf = b2pick([5, 6, 7], rng), beta = b2pick([0.8, 1.2, 1.5], rng), mrp = b2pick([4, 5, 6], rng);
  const ke = rf + beta * mrp;
  const f = v => L === "en" ? b2e(v, 1) + "%" : b2i(v, 1) + "%";
  const vals = [ke, rf + mrp, rf + beta, rf];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Rf ${rf}%, beta ${b2e(beta, 1)}, MRP ${mrp}%. Cost of equity?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${rf}% + ${b2e(beta, 1)} × ${mrp}% = ${b2e(ke, 1)}%. Beta ${beta > 1 ? "above 1 = riskier than the market" : "below 1 = defensive"}. (${ref})`,
    steps: ["Analysis: CAPM — risk-free plus beta times the market premium.",
      "Solve 1: formula — Ke = Rf + β × MRP.",
      `Solve 2: substitute → ${rf}% + ${b2e(beta, 1)} × ${mrp}%.`,
      `Solve 3: compute → ${b2e(ke, 1)}%.`]
  };
  return {
    q: `Rf ${rf}%, beta ${b2i(beta, 1)}, MRP ${mrp}%. Cost of equity?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${rf}% + ${b2i(beta, 1)} × ${mrp}% = ${b2i(ke, 1)}%. Beta ${beta > 1 ? "di atas 1 = lebih berisiko dari pasar" : "di bawah 1 = defensif"}. (${ref})`,
    steps: ["Analysis: CAPM — risk-free plus beta kali premi pasar.",
      "Solve 1: rumus — Ke = Rf + β × MRP.",
      `Solve 2: substitusi → ${rf}% + ${b2i(beta, 1)} × ${mrp}%.`,
      `Solve 3: hitung → ${b2i(ke, 1)}%.`]
  };
}
function vB2WACC(rng, ref, L){
  const we = b2pick([50, 60, 70], rng), wd = 100 - we;
  const ke = b2pick([11, 12, 13], rng), kd = b2pick([7, 8, 9], rng), t = b2pick([22, 25], rng);
  const wacc = we / 100 * ke + wd / 100 * kd * (1 - t / 100);
  const waccR = Math.round(wacc * 100) / 100;
  const noShield = Math.round((we / 100 * ke + wd / 100 * kd) * 100) / 100;
  const vals = [waccR, noShield, ke, kd];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? b2e(v, 2) + "%" : b2i(v, 2) + "%";
  if (L === "en") return {
    q: `Equity ${we}, debt ${wd}, Ke ${ke}%, Kd ${kd}%, tax ${t}%. WACC?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${we / 100} × ${ke}% + ${wd / 100} × ${kd}% × ${(1 - t / 100).toFixed(2)} = ${b2e(waccR, 2)}%. ${b2e(noShield, 2)}% = forgot the tax shield. WACC is always below Ke when debt exists. (${ref})`,
    steps: ["Analysis: WACC weights each capital source after tax.",
      "Solve 1: formula — WACC = We×Ke + Wd×Kd×(1−t).",
      `Solve 2: substitute → ${we / 100}×${ke}% + ${wd / 100}×${kd}%×(1−${t}%).`,
      `Solve 3: compute → ${b2e(waccR, 2)}%.`]
  };
  return {
    q: `Ekuitas ${we}, utang ${wd}, Ke ${ke}%, Kd ${kd}%, pajak ${t}%. WACC?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2i(we / 100, 1)} × ${ke}% + ${b2i(wd / 100, 1)} × ${kd}% × ${(1 - t / 100).toFixed(2).replace(".", ",")} = ${b2i(waccR, 2)}%. ${b2i(noShield, 2)}% = lupa perisai pajak. WACC selalu di bawah Ke kalau ada utang. (${ref})`,
    steps: ["Analysis: WACC membobot tiap sumber modal setelah pajak.",
      "Solve 1: rumus — WACC = We×Ke + Wd×Kd×(1−t).",
      `Solve 2: substitusi → ${b2i(we / 100, 1)}×${ke}% + ${b2i(wd / 100, 1)}×${kd}%×(1−${t}%).`,
      `Solve 3: hitung → ${b2i(waccR, 2)}%.`]
  };
}
function vB2PVFCF(rng, ref, L, yr){
  const fcff = b2step(rng, 1000, 2000, 250), wacc = b2pick([10, 11, 12], rng);
  const pv = Math.round(fcff / Math.pow(1 + wacc / 100, yr));
  const pvN = Math.round(fcff / Math.pow(1 + wacc / 100, yr + 1));
  // guard: year 1 makes the "discount 1 year" distractor identical to the answer
  const wrongYr = yr === 1 ? Math.round(fcff / Math.pow(1 + (wacc + 2) / 100, yr)) : Math.round(fcff / (1 + wacc / 100));
  const vals = [pv, fcff, wrongYr, pvN];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Year-${yr} FCFF Rp${b2e(fcff)}k, WACC ${wacc}%. Present value?`,
    opts: order.map(i => "Rp" + b2e(vals[i]) + "k"),
    answer: order.indexOf(0),
    explain: `${b2e(fcff)} ÷ ${(1 + wacc / 100).toFixed(2)}^${yr} = ${b2e(pv)}. ${yr === 1 ? "Year 1 = discount once — do not compound twice." : "Discount by the RIGHT year — year " + yr + ", not year 1."} (${ref})`,
    steps: ["Analysis: discount a future FCFF to today.",
      `Solve 1: discount factor = (1 + ${wacc}%)^${yr} = ${b2e(Math.pow(1 + wacc / 100, yr), 4)}.`,
      `Solve 2: PV = ${b2e(fcff)} ÷ ${b2e(Math.pow(1 + wacc / 100, yr), 4)}.`,
      `Solve 3: compute → Rp${b2e(pv)}k.`]
  };
  return {
    q: `FCFF tahun-${yr} Rp${b2i(fcff)} ribu, WACC ${wacc}%. Present value?`,
    opts: order.map(i => "Rp" + b2i(vals[i]) + " ribu"),
    answer: order.indexOf(0),
    explain: `${b2i(fcff)} ÷ ${(1 + wacc / 100).toFixed(2).replace(".", ",")}^${yr} = ${b2i(pv)}. ${yr === 1 ? "Tahun 1 = diskonto sekali — jangan dikali dua kali." : "Diskon dengan tahun yang BENAR — tahun " + yr + ", bukan tahun 1."} (${ref})`,
    steps: ["Analysis: diskonto FCFF masa depan ke hari ini.",
      `Solve 1: faktor diskonto = (1 + ${wacc}%)^${yr} = ${b2i(Math.pow(1 + wacc / 100, yr), 4)}.`,
      `Solve 2: PV = ${b2i(fcff)} ÷ ${b2i(Math.pow(1 + wacc / 100, yr), 4)}.`,
      `Solve 3: hitung → Rp${b2i(pv)} ribu.`]
  };
}
function vB2Gordon(rng, ref, L){
  const f6 = b2step(rng, 2200, 7000, 100), wacc = b2pick([11, 12, 13], rng), g = b2pick([3, 4, 5], rng);
  const tv = Math.round(f6 / ((wacc - g) / 100));
  const vals = [tv, Math.round(f6 / (wacc / 100)), Math.round(f6 / (g / 100)), Math.round(f6 / ((wacc + g) / 100))];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Normalized year-6 FCFF Rp${b2e(f6)}k, g ${g}%, WACC ${wacc}%. Gordon terminal value?`,
    opts: order.map(i => "Rp" + b2e(vals[i]) + "k"),
    answer: order.indexOf(0),
    explain: `${b2e(f6)} ÷ (${b2e(wacc / 100, 2)} − ${b2e(g / 100, 2)}) = ${b2e(f6)} ÷ ${b2e((wacc - g) / 100, 2)} = ${b2e(tv)}. (${ref})`,
    steps: ["Analysis: Gordon TV from normalized FCFF.",
      "Solve 1: formula — TV = FCFF₆ ÷ (WACC − g).",
      `Solve 2: substitute → ${b2e(f6)} ÷ (${wacc}% − ${g}%).`,
      `Solve 3: compute → Rp${b2e(tv)}k.`]
  };
  return {
    q: `FCFF tahun-6 (ternormalisasi) Rp${b2i(f6)} ribu, g ${g}%, WACC ${wacc}%. Terminal value (Gordon)?`,
    opts: order.map(i => "Rp" + b2i(vals[i]) + " ribu"),
    answer: order.indexOf(0),
    explain: `${b2i(f6)} ÷ (${b2i(wacc / 100, 2)} − ${b2i(g / 100, 2)}) = ${b2i(f6)} ÷ ${b2i((wacc - g) / 100, 2)} = ${b2i(tv)}. (${ref})`,
    steps: ["Analysis: TV Gordon dari FCFF ternormalisasi.",
      "Solve 1: rumus — TV = FCFF₆ ÷ (WACC − g).",
      `Solve 2: substitusi → ${b2i(f6)} ÷ (${wacc}% − ${g}%).`,
      `Solve 3: hitung → Rp${b2i(tv)} ribu.`]
  };
}
function vB2ExitTV(rng, ref, L){
  const ebitda = b2step(rng, 4000, 8000, 1000), mult = b2pick([6, 6.5, 7, 7.5], rng);
  const tv = Math.round(ebitda * mult);
  const vals = [tv, ebitda * 5, ebitda * 9, Math.round(ebitda * mult * 1.25)];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Year-5 EBITDA Rp${b2e(ebitda)}k, exit multiple ${b2e(mult, 1)}x. Terminal value?`,
    opts: order.map(i => "Rp" + b2e(vals[i]) + "k"),
    answer: order.indexOf(0),
    explain: `${b2e(ebitda)} × ${b2e(mult, 1)} = ${b2e(tv)} — 'selling the company' at end of year 5 for ${b2e(mult, 1)}× EBITDA. The multiple must come from comparable comps. (${ref})`,
    steps: ["Analysis: exit-multiple TV — metric times multiple.",
      "Solve 1: formula — TV = EBITDA₅ × exit multiple.",
      `Solve 2: substitute → ${b2e(ebitda)} × ${b2e(mult, 1)}.`,
      `Solve 3: compute → Rp${b2e(tv)}k.`]
  };
  return {
    q: `EBITDA tahun-5 Rp${b2i(ebitda)} ribu, exit multiple ${b2i(mult, 1)}x. Terminal value?`,
    opts: order.map(i => "Rp" + b2i(vals[i]) + " ribu"),
    answer: order.indexOf(0),
    explain: `${b2i(ebitda)} × ${b2i(mult, 1)} = ${b2i(tv)} — 'jual perusahaan' di akhir tahun-5 seharga ${b2i(mult, 1)}× EBITDA. Multiple-nya harus dari comps yang sebanding. (${ref})`,
    steps: ["Analysis: TV exit multiple — metrik kali multiple.",
      "Solve 1: rumus — TV = EBITDA₅ × exit multiple.",
      `Solve 2: substitusi → ${b2i(ebitda)} × ${b2i(mult, 1)}.`,
      `Solve 3: hitung → Rp${b2i(tv)} ribu.`]
  };
}
function vB2EVPS(rng, ref, L){
  const ev = b2step(rng, 50000, 120000, 10000), debt = b2step(rng, 12000, 35000, 1000), cash = b2step(rng, 3000, 8000, 1000);
  const eq = ev - debt + cash, sh = b2step(rng, 8000, 16000, 500);
  const ps = Math.round(eq / sh * 100) / 100;
  const psNoCash = Math.round((ev - debt) / sh * 100) / 100, psNoDebt = Math.round((ev + cash) / sh * 100) / 100;
  const vals = [ps, psNoCash, psNoDebt, Math.round(ev / sh * 100) / 100];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? "Rp" + b2e(v, 2) : "Rp" + b2i(v, 2);
  if (L === "en") return {
    q: `EV Rp${b2e(ev)}k, debt Rp${b2e(debt)}k, cash Rp${b2e(cash)}k, ${b2e(sh)} shares. Fair value per share?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Equity = ${b2e(ev)} − ${b2e(debt)} + ${b2e(cash)} = ${b2e(eq)}; ÷ ${b2e(sh)} = ${b2e(ps, 2)}/share. The EV→equity bridge is where valuations most often 'leak'. (${ref})`,
    steps: ["Analysis: EV belongs to all investors — bridge to equity, then divide.",
      `Solve 1: equity = EV − debt + cash = ${b2e(ev)} − ${b2e(debt)} + ${b2e(cash)} = ${b2e(eq)}.`,
      `Solve 2: per share = ${b2e(eq)} ÷ ${b2e(sh)}.`,
      `Solve 3: compute → Rp${b2e(ps, 2)}/share.`]
  };
  return {
    q: `EV Rp${b2i(ev)} ribu, utang Rp${b2i(debt)} ribu, kas Rp${b2i(cash)} ribu, saham beredar ${b2i(sh)}. Nilai wajar per saham?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Ekuitas = ${b2i(ev)} − ${b2i(debt)} + ${b2i(cash)} = ${b2i(eq)}; ÷ ${b2i(sh)} = ${b2i(ps, 2)}/saham. Jembatan EV→ekuitas adalah tempat paling umum valuasi 'bocor'. (${ref})`,
    steps: ["Analysis: EV milik semua pemodal — jembatani ke ekuitas, lalu bagi.",
      `Solve 1: ekuitas = EV − utang + kas = ${b2i(ev)} − ${b2i(debt)} + ${b2i(cash)} = ${b2i(eq)}.`,
      `Solve 2: per saham = ${b2i(eq)} ÷ ${b2i(sh)}.`,
      `Solve 3: hitung → Rp${b2i(ps, 2)}/saham.`]
  };
}
function vB2PVTV(rng, ref, L){
  const tv = b2step(rng, 27000, 55000, 250), wacc = b2pick([11, 12], rng), yr = 5;
  const df = Math.pow(1 + wacc / 100, yr), pv = Math.round(tv / df);
  const pv1 = Math.round(tv / (1 + wacc / 100)), pv6 = Math.round(tv / Math.pow(1 + wacc / 100, 6));
  const vals = [pv, tv, pv1, pv6];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `TV Rp${b2e(tv)}k at end of year ${yr}, WACC ${wacc}%. PV of TV?`,
    opts: order.map(i => "Rp" + b2e(vals[i]) + "k"),
    answer: order.indexOf(0),
    explain: `${b2e(tv)} ÷ ${b2e(df, 4)} = ${b2e(pv)}. Always ask: which year does the TV sit in? (${ref})`,
    steps: ["Analysis: the TV sits in year 5 — discount 5 years, not 1.",
      `Solve 1: discount factor = (1 + ${wacc}%)^${yr} = ${b2e(df, 4)}.`,
      `Solve 2: PV of TV = ${b2e(tv)} ÷ ${b2e(df, 4)}.`,
      `Solve 3: compute → Rp${b2e(pv)}k.`]
  };
  return {
    q: `TV Rp${b2i(tv)} ribu di akhir tahun-${yr}, WACC ${wacc}%. Present value TV?`,
    opts: order.map(i => "Rp" + b2i(vals[i]) + " ribu"),
    answer: order.indexOf(0),
    explain: `${b2i(tv)} ÷ ${b2i(df, 4)} = ${b2i(pv)}. Selalu tanya: TV duduk di tahun ke berapa? (${ref})`,
    steps: ["Analysis: TV duduk di tahun 5 — diskonto 5 tahun, bukan 1.",
      `Solve 1: faktor diskonto = (1 + ${wacc}%)^${yr} = ${b2i(df, 4)}.`,
      `Solve 2: PV TV = ${b2i(tv)} ÷ ${b2i(df, 4)}.`,
      `Solve 3: hitung → Rp${b2i(pv)} ribu.`]
  };
}
function vB2EV(rng, ref, L){
  const mc = b2step(rng, 30000, 60000, 5000), debt = b2step(rng, 8000, 15000, 1000), cash = b2step(rng, 2000, 7000, 1000);
  const ev = mc + debt - cash;
  const vals = [ev, mc, mc + debt + cash, mc - debt];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Market cap Rp${b2e(mc)}k, debt Rp${b2e(debt)}k, cash Rp${b2e(cash)}k. EV?`,
    opts: order.map(i => "Rp" + b2e(vals[i]) + "k"),
    answer: order.indexOf(0),
    explain: `${b2e(mc)} + ${b2e(debt)} − ${b2e(cash)} = ${b2e(ev)} — the whole-company price for all investors. (${ref})`,
    steps: ["Analysis: EV = value for ALL capital providers.",
      "Solve 1: formula — EV = Market cap + Debt − Cash.",
      `Solve 2: substitute → ${b2e(mc)} + ${b2e(debt)} − ${b2e(cash)}.`,
      `Solve 3: compute → Rp${b2e(ev)}k.`]
  };
  return {
    q: `Market cap Rp${b2i(mc)} ribu, utang Rp${b2i(debt)} ribu, kas Rp${b2i(cash)} ribu. EV?`,
    opts: order.map(i => "Rp" + b2i(vals[i]) + " ribu"),
    answer: order.indexOf(0),
    explain: `${b2i(mc)} + ${b2i(debt)} − ${b2i(cash)} = ${b2i(ev)} — harga seluruh perusahaan untuk semua investor. (${ref})`,
    steps: ["Analysis: EV = nilai untuk SEMUA pemodal.",
      "Solve 1: rumus — EV = Market cap + Utang − Kas.",
      `Solve 2: substitusi → ${b2i(mc)} + ${b2i(debt)} − ${b2i(cash)}.`,
      `Solve 3: hitung → Rp${b2i(ev)} ribu.`]
  };
}
function vB2MultPS(rng, ref, L){
  const mult = b2pick([8, 9, 10], rng), ebitda = b2step(rng, 5000, 9000, 1000);
  const nd = b2step(rng, 6000, 12000, 1000), sh = b2step(rng, 10000, 13000, 1000);
  const ev = mult * ebitda, eq = ev - nd, ps = Math.round(eq / sh * 100) / 100;
  const psNoND = Math.round(ev / sh * 100) / 100, psPlus = Math.round((ev + nd) / sh * 100) / 100;
  const vals = [ps, psNoND, psPlus, Math.round((ev - nd) / (sh + 2000) * 100) / 100];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? "Rp" + b2e(v, 2) : "Rp" + b2i(v, 2);
  if (L === "en") return {
    q: `Peer median EV/EBITDA ${mult}x. Target EBITDA Rp${b2e(ebitda)}k, net debt Rp${b2e(nd)}k, ${b2e(sh)} shares. Value per share?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `EV = ${b2e(ev)}; equity = ${b2e(ev)} − ${b2e(nd)} = ${b2e(eq)}; ÷ ${b2e(sh)} = ${b2e(ps, 2)}/share. Multiples produce EV, not share price — subtract net debt first. (${ref})`,
    steps: ["Analysis: multiple → EV → equity → per share.",
      `Solve 1: EV = ${mult} × ${b2e(ebitda)} = ${b2e(ev)}.`,
      `Solve 2: equity = ${b2e(ev)} − ${b2e(nd)} = ${b2e(eq)}.`,
      `Solve 3: per share = ${b2e(eq)} ÷ ${b2e(sh)} = Rp${b2e(ps, 2)}.`]
  };
  return {
    q: `Median EV/EBITDA peer ${mult}x. EBITDA target Rp${b2i(ebitda)} ribu, net debt Rp${b2i(nd)} ribu, saham ${b2i(sh)}. Nilai per saham?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `EV = ${b2i(ev)}; ekuitas = ${b2i(ev)} − ${b2i(nd)} = ${b2i(eq)}; ÷ ${b2i(sh)} = ${b2i(ps, 2)}/saham. Multiple menghasilkan EV, bukan harga saham — kurangi net debt dulu. (${ref})`,
    steps: ["Analysis: multiple → EV → ekuitas → per saham.",
      `Solve 1: EV = ${mult} × ${b2i(ebitda)} = ${b2i(ev)}.`,
      `Solve 2: ekuitas = ${b2i(ev)} − ${b2i(nd)} = ${b2i(eq)}.`,
      `Solve 3: per saham = ${b2i(eq)} ÷ ${b2i(sh)} = Rp${b2i(ps, 2)}.`]
  };
}
function vB2CashPE(rng, ref, L){
  const mc = b2step(rng, 50000, 100000, 10000), cashPct = b2pick([40, 50, 60], rng);
  const cash = Math.round(mc * cashPct / 100), ni = b2step(rng, 2500, 4000, 500), ebitda = ni * 2;
  const ev = mc - cash, pe = Math.round(mc / ni), evEbitda = Math.round(ev / ebitda * 10) / 10;
  const c = L === "en"
    ? `EV/EBITDA only ${b2e(evEbitda, 1)}x — cash at ${cashPct}% of market cap distorts P/E`
    : `EV/EBITDA hanya ${b2i(evEbitda, 1)}x — kas ${cashPct}% market cap mendistorsi P/E`;
  const o = L === "en" ? [
    `Agreed — P/E ${pe}x is indeed expensive`, c, `EBITDA is irrelevant`, `P/E must be compared with debt`
  ] : [
    `Setuju — P/E ${pe}x memang mahal`, c, `EBITDA tidak relevan`, `P/E harus dibanding utang`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Market cap Rp${b2e(mc)}k, cash Rp${b2e(cash)}k, zero debt, net income Rp${b2e(ni)}k, EBITDA Rp${b2e(ebitda)}k. An analyst says 'expensive, P/E ${pe}x'. Your rebuttal?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `EV = ${b2e(ev)} → EV/EBITDA = ${b2e(evEbitda, 1)}x — far more reasonable than the ${pe}x P/E impression. The P/E looks dear because ${b2e(cash)} of cash (${cashPct}% of market cap) sits in the price but earns no operating profit. A final cheap/expensive verdict still needs peers, growth, and risk. (${ref})`,
    steps: ["Analysis: does the cash in the price distort the P/E?",
      `Solve 1: EV = ${b2e(mc)} − ${b2e(cash)} = ${b2e(ev)} (no debt).`,
      `Solve 2: EV/EBITDA = ${b2e(ev)} ÷ ${b2e(ebitda)} = ${b2e(evEbitda, 1)}x vs P/E ${pe}x.`,
      "Solve 3: the gap is the cash — judge cheap/expensive on EV multiples + peers, not headline P/E."]
  };
  return {
    q: `Market cap Rp${b2i(mc)} ribu, kas Rp${b2i(cash)} ribu, utang nol, laba bersih Rp${b2i(ni)} ribu, EBITDA Rp${b2i(ebitda)} ribu. Analis bilang 'mahal, P/E ${pe}x'. Sangahanmu?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `EV = ${b2i(ev)} → EV/EBITDA = ${b2i(evEbitda, 1)}x — jauh lebih wajar daripada kesan P/E ${pe}x. P/E terlihat mahal karena kas ${b2i(cash)} (${cashPct}% market cap) ikut dihitung di harga tapi tidak menghasilkan laba operasi. Vonis final 'murah/mahal' tetap butuh pembanding: peer, growth, dan risiko. (${ref})`,
    steps: ["Analysis: apakah kas di dalam harga mendistorsi P/E?",
      `Solve 1: EV = ${b2i(mc)} − ${b2i(cash)} = ${b2i(ev)} (tanpa utang).`,
      `Solve 2: EV/EBITDA = ${b2i(ev)} ÷ ${b2i(ebitda)} = ${b2i(evEbitda, 1)}x vs P/E ${pe}x.`,
      "Solve 3: selisihnya adalah kas — nilai murah/mahal dari multiple EV + peer, bukan P/E headline."]
  };
}
function vB2Precedent(rng, ref, L){
  const ev = b2step(rng, 40000, 68000, 4000), prem = b2pick([25, 30], rng);
  const prec = Math.round(ev * (1 + prem / 100));
  const vals = [prec, ev, Math.round(ev * (1 - prem / 100)), Math.round(ev * (1 + prem / 100) * 1.3)];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Comps imply EV Rp${b2e(ev)}k. A comparable precedent deal paid a ${prem}% control premium. Estimated precedent EV?`,
    opts: order.map(i => "Rp" + b2e(vals[i]) + "k"),
    answer: order.indexOf(0),
    explain: `${b2e(ev)} × ${b2e(1 + prem / 100, 2)} = ${b2e(prec)}. Precedents run higher because buyers pay for CONTROL — do not use that number for a minority-share valuation without adjustment. (${ref})`,
    steps: ["Analysis: comps EV plus a control premium.",
      `Solve 1: premium factor = 1 + ${prem}% = ${b2e(1 + prem / 100, 2)}.`,
      `Solve 2: precedent EV = ${b2e(ev)} × ${b2e(1 + prem / 100, 2)}.`,
      `Solve 3: compute → Rp${b2e(prec)}k.`]
  };
  return {
    q: `Comps menghasilkan EV Rp${b2i(ev)} ribu. Precedent transaction sebanding dibayar dengan premi kontrol ${prem}%. Estimasi precedent EV?`,
    opts: order.map(i => "Rp" + b2i(vals[i]) + " ribu"),
    answer: order.indexOf(0),
    explain: `${b2i(ev)} × ${b2i(1 + prem / 100, 2)} = ${b2i(prec)}. Precedent lebih tinggi karena pembeli membayar untuk KONTROL — jangan pakai angka ini untuk valuasi saham minoritas tanpa penyesuaian. (${ref})`,
    steps: ["Analysis: EV comps ditambah premi kontrol.",
      `Solve 1: faktor premi = 1 + ${prem}% = ${b2i(1 + prem / 100, 2)}.`,
      `Solve 2: precedent EV = ${b2i(ev)} × ${b2i(1 + prem / 100, 2)}.`,
      `Solve 3: hitung → Rp${b2i(prec)} ribu.`]
  };
}

/* ---------- shared: skenario, M&A, LBO, budgeting, Excel konsep ---------- */
function vB2DataTable(rng, ref, L){
  const wLo = b2pick([8, 9, 10], rng), gHi = b2pick([5, 6, 7], rng);
  const den = (wLo - gHi) / 100;
  const c = L === "en"
    ? `The (WACC−g) denominator = ${b2e(den, 2)}, the smallest → largest TV`
    : `Penyebut (WACC−g) = ${b2i(den, 2)}, terkecil → TV terbesar`;
  const o = L === "en" ? [
    "The table is miscalculated", "Low WACC raises FCFF", c, "High g raises capex"
  ] : [
    "Tabelnya salah", "WACC rendah menaikkan FCFF", c, "g tinggi menaikkan capex"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Data table: WACC ${wLo}–${wLo + 4}%, g ${gHi - 4}–${gHi}%. Highest EV at WACC ${wLo}% + g ${gHi}%. Why?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `The ${b2e(den, 2)} denominator is the smallest in the table → largest TV. Lesson: valuation risk lives in the denominator — small WACC/g moves near the edge can swing EV by tens of percent. (${ref})`,
    steps: ["Analysis: where in the table is EV highest, and why?",
      "Solve 1: TV = FCFF ÷ (WACC − g) — the denominator drives TV.",
      `Solve 2: at WACC ${wLo}% and g ${gHi}%, the denominator = ${b2e(den, 2)} — the smallest in the table.`,
      "Solve 3: smallest denominator → largest TV → largest EV."]
  };
  return {
    q: `Data table: WACC ${wLo}–${wLo + 4}%, g ${gHi - 4}–${gHi}%. EV tertinggi di WACC ${wLo}% + g ${gHi}%. Kenapa?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Penyebut ${b2i(den, 2)} adalah yang terkecil di tabel → TV terbesar. Pelajaran: risiko valuasi hidup di penyebut — perubahan kecil WACC/g di dekat batas bisa mengayunkan EV puluhan persen. (${ref})`,
    steps: ["Analysis: di mana EV tertinggi di tabel, dan kenapa?",
      "Solve 1: TV = FCFF ÷ (WACC − g) — penyebut yang menggerakkan TV.",
      `Solve 2: di WACC ${wLo}% dan g ${gHi}%, penyebut = ${b2i(den, 2)} — terkecil di tabel.`,
      "Solve 3: penyebut terkecil → TV terbesar → EV terbesar."]
  };
}
function vB2Tornado(rng, ref, L){
  const longs = L === "en"
    ? ["WACC", "exit multiple", "g", "growth"]
    : ["WACC", "exit multiple", "g", "growth"];
  const shorts = ["D&A", "tax rate", "capex"];
  const lg = b2pick(longs, rng);
  let sh = b2pick(shorts, rng);
  const c = L === "en"
    ? `Focus analysis hours on ${lg}; ${sh} barely moves EV`
    : `Fokus jam analisis ke ${lg}; ${sh} hampir tak menggerakkan EV`;
  const o = L === "en" ? [
    c, "The chart is upside down", "All assumptions matter equally", `Focus on ${sh} because it is most certain`
  ] : [
    c, "Chart-nya terbalik", "Semua asumsi sama pentingnya", `Fokus ke ${sh} karena paling pasti`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Tornado chart: the '${lg}' bar is longest, the '${sh}' bar shortest. Your move as analyst?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Bar length = how far EV moves when the assumption shifts. The longest bar (${lg}) bites hardest; the stubby ${sh} bar = accept the number, do not spend hours there. (${ref})`,
    steps: ["Analysis: read the tornado — bar length is sensitivity.",
      `Solve 1: longest bar = ${lg} — EV moves most when it shifts.`,
      `Solve 2: shortest bar = ${sh} — EV barely moves.`,
      "Solve 3: spend expensive analyst hours on the longest bar."]
  };
  return {
    q: `Tornado chart: bar '${lg}' terpanjang, bar '${sh}' terpendek. Tindakanmu sebagai analis?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Panjang bar = seberapa jauh EV bergerak saat asumsi digeser. Bar terpanjang (${lg}) paling menggigit; bar ${sh} yang pendek = terima saja angkanya, jangan habiskan jam di sana. (${ref})`,
    steps: ["Analysis: baca tornado — panjang bar = sensitivitas.",
      `Solve 1: bar terpanjang = ${lg} — EV paling bergerak saat ia bergeser.`,
      `Solve 2: bar terpendek = ${sh} — EV hampir tak bergerak.`,
      "Solve 3: belanjakan jam analis yang mahal di bar terpanjang."]
  };
}
function vB2Range(rng, ref, L){
  const base = b2step(rng, 45000, 70000, 5000), bear = Math.round(base * 0.68 / 1000) * 1000, bull = Math.round(base * 1.3 / 1000) * 1000;
  const c = L === "en"
    ? `A single number hides the ${b2e(bear)}–${b2e(bull)} range`
    : `Angka tunggal menyembunyikan rentang ${b2i(bear)}–${b2i(bull)}`;
  const o = L === "en" ? [
    "The bear case cannot happen", "Use the bull case instead", c, "No problem"
  ] : [
    "Bear case tidak mungkin", "Bull case harus dipakai", c, "Tidak ada masalah"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Base EV Rp${b2e(base)}k, bear Rp${b2e(bear)}k, bull Rp${b2e(bull)}k. The report says 'valuation: ${b2e(base)}'. The problem?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `${b2e(base)} is only true in the base-case world. The ${b2e(bear)}–${b2e(bull)} range answers the more important question: when do I lose. A point without a range = false precision. (${ref})`,
    steps: ["Analysis: a point estimate vs the range around it.",
      `Solve 1: base ${b2e(base)} is one world; bear ${b2e(bear)} and bull ${b2e(bull)} are others.`,
      "Solve 2: decisions need the downside — how bad can it get?",
      "Solve 3: report point + range + the scenarios at each end."]
  };
  return {
    q: `Base EV Rp${b2i(base)} ribu, bear Rp${b2i(bear)} ribu, bull Rp${b2i(bull)} ribu. Laporan 'valuasi: ${b2i(base)}'. Masalahnya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `${b2i(base)} hanya benar di dunia base. Rentang ${b2i(bear)}–${b2i(bull)} menjawab pertanyaan yang lebih penting: kapan saya rugi. Titik tanpa rentang = presisi palsu. (${ref})`,
    steps: ["Analysis: estimasi titik vs rentang di sekitarnya.",
      `Solve 1: base ${b2i(base)} adalah satu dunia; bear ${b2i(bear)} dan bull ${b2i(bull)} adalah dunia lain.`,
      "Solve 2: keputusan butuh sisi bawah — seberapa buruk bisa terjadi?",
      "Solve 3: laporkan titik + rentang + skenario di tiap ujung."]
  };
}
function vB2MoICGrowth(rng, ref, L){
  const g0 = b2pick([6, 8, 10], rng), d1 = b2pick([0.4, 0.5, 0.6], rng), d2 = Math.round((d1 + 0.3) * 10) / 10;
  const c = L === "en"
    ? "Compounding EBITDA off a bigger base AND faster deleveraging → two effects in the same direction"
    : "Compounding EBITDA di basis lebih besar DAN deleverage lebih cepat → dua efek searah";
  const o = L === "en" ? [
    "Interest stays flat", c, "Tax falls", "The multiple rises too"
  ] : [
    "Bunganya tetap", c, "Pajaknya turun", "Multiple ikut naik"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Growth +2pts (${g0}%→${g0 + 2}%) lifts MoIC ${b2e(d1, 1)}x; another +2pts (${g0 + 2}%→${g0 + 4}%) lifts it ${b2e(d2, 1)}x. Why does the effect grow instead of staying linear?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `A double same-direction effect: (1) compounding — year-5 EBITDA grows off a bigger base; (2) bigger cash retires debt earlier → interest falls → NI rises. Non-linear — that is why growth sensitivity in LBO is 'wilder' than in DCF. (${ref})`,
    steps: ["Analysis: two equal growth hikes, unequal MoIC lifts — what compounds?",
      "Solve 1: compounding — the second hike grows EBITDA off a bigger base.",
      "Solve 2: deleveraging — bigger cash retires debt earlier, so interest falls faster.",
      "Solve 3: two same-direction effects = convex, not linear."]
  };
  return {
    q: `Growth +2 poin (${g0}%→${g0 + 2}%) menaikkan MoIC ${b2i(d1, 1)}x; +2 poin lagi (${g0 + 2}%→${g0 + 4}%) menaikkan ${b2i(d2, 1)}x. Kenapa efeknya membesar, bukan linear?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Efek ganda searah: (1) compounding — EBITDA tahun-5 tumbuh dari basis lebih besar; (2) kas lebih besar melunasi utang lebih awal → bunga turun → NI naik. Non-linear — inilah kenapa sensitivitas growth di LBO 'lebih liar' dari DCF. (${ref})`,
    steps: ["Analysis: dua kenaikan growth yang sama, kenaikan MoIC berbeda — apa yang berlipat?",
      "Solve 1: compounding — kenaikan kedua menumbuhkan EBITDA dari basis lebih besar.",
      "Solve 2: deleverage — kas lebih besar melunasi utang lebih awal, bunga turun lebih cepat.",
      "Solve 3: dua efek searah = konveks, bukan linear."]
  };
}
function vB2BEP(rng, ref, L){
  const fc = b2step(rng, 10000, 24000, 2000), p = b2step(rng, 500, 1200, 100), vc = Math.round(p * b2pick([0.6, 0.625, 0.7], rng));
  const cm = p - vc, bep = Math.round(fc / cm);
  const vals = [bep, Math.round(fc / p), Math.round(fc / vc), Math.round(fc / cm * 1.5)];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Fixed cost Rp${b2e(fc)}k, price Rp${b2e(p)}k/unit, variable cost Rp${b2e(vc)}k/unit. Break-even?`,
    opts: order.map(i => b2e(vals[i]) + " units"),
    answer: order.indexOf(0),
    explain: `${b2e(fc)} ÷ (${b2e(p)} − ${b2e(vc)}) = ${b2e(bep)} units. Below ${b2e(bep)} = loss; above, each unit contributes ${b2e(cm)}. BEP is the simplest 'bear case'. (${ref})`,
    steps: ["Analysis: break-even is where contribution covers fixed cost.",
      `Solve 1: contribution per unit = ${b2e(p)} − ${b2e(vc)} = ${b2e(cm)}.`,
      `Solve 2: BEP = fixed cost ÷ contribution = ${b2e(fc)} ÷ ${b2e(cm)}.`,
      `Solve 3: compute → ${b2e(bep)} units.`]
  };
  return {
    q: `Fixed cost Rp${b2i(fc)} ribu, harga Rp${b2i(p)} ribu/unit, variable cost Rp${b2i(vc)} ribu/unit. Titik impas?`,
    opts: order.map(i => b2i(vals[i]) + " unit"),
    answer: order.indexOf(0),
    explain: `${b2i(fc)} ÷ (${b2i(p)} − ${b2i(vc)}) = ${b2i(bep)} unit. Di bawah ${b2i(bep)} = rugi; di atasnya tiap unit menyumbang ${b2i(cm)}. BEP adalah 'bear case' paling sederhana. (${ref})`,
    steps: ["Analysis: titik impas = saat kontribusi menutup fixed cost.",
      `Solve 1: kontribusi per unit = ${b2i(p)} − ${b2i(vc)} = ${b2i(cm)}.`,
      `Solve 2: BEP = fixed cost ÷ kontribusi = ${b2i(fc)} ÷ ${b2i(cm)}.`,
      `Solve 3: hitung → ${b2i(bep)} unit.`]
  };
}
function vB2PEAccr(rng, ref, L){
  const pa = b2pick([10, 12, 15], rng), pb = b2pick([6, 8, 9], rng);
  const c = L === "en"
    ? `Accretive — buying B's earnings cheaper (${pb}x) than the market prices A's earnings (${pa}x)`
    : `Akretif — membeli laba B (${pb}x) lebih murah dari harga pasar laba A (${pa}x)`;
  const o = L === "en" ? [
    c, "Dilutive", "Neutral", "Cannot be determined"
  ] : [
    c, "Dilutif", "Netral", "Tidak bisa ditentukan"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A acquires B entirely with shares. A's P/E = ${pa}x, B's P/E = ${pb}x. Year-1 accretion/dilution (ignore synergies)?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Accretive. A pays ${pb}x for each rupiah of B's earnings while the market prices A's earnings at ${pa}x — every new share 'buys' more earnings than it dilutes. Trap: accretive ≠ good; ${pb}x can be overpriced if B's earnings collapse. (${ref})`,
    steps: ["Analysis: share-for-share deal — compare the two P/Es.",
      `Solve 1: A pays ${pb}x per rupiah of B's earnings.`,
      `Solve 2: the market prices A's own earnings at ${pa}x.`,
      `Solve 3: ${pb}x < ${pa}x → each new share buys MORE earnings than it dilutes → accretive.`]
  };
  return {
    q: `A mengakuisisi B murni saham. P/E A ${pa}x, P/E B ${pb}x. Akrisi/dilusi tahun-1 (abaikan sinergi)?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Akretif: setiap saham baru 'membeli' laba lebih banyak daripada yang diencerkan. Tapi akretif ≠ bagus — ${pb}x bisa kemahalan kalau laba B runtuh tahun depan. (${ref})`,
    steps: ["Analysis: deal murni saham — bandingkan dua P/E.",
      `Solve 1: A membayar ${pb}x per rupiah laba B.`,
      `Solve 2: pasar menghargai laba A sendiri ${pa}x.`,
      `Solve 3: ${pb}x < ${pa}x → tiap saham baru membeli laba LEBIH BANYAK daripada yang diencerkan → akretif.`]
  };
}
function vB2PEDil(rng, ref, L){
  const pa = b2pick([8, 10], rng), pb = b2pick([12, 14], rng);
  const c = L === "en"
    ? `Dilutive — buying ${pb}x earnings with '${pa}x' currency`
    : `Dilutif — membeli laba ${pb}x dengan 'mata uang' ${pa}x`;
  const o = L === "en" ? [
    "Accretive", c, "Neutral", "Need debt info"
  ] : [
    "Akretif", c, "Netral", "Butuh info utang"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A acquires B entirely with shares. A's P/E ${pa}x, B's P/E ${pb}x. Year 1 (ignore synergies)?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Dilutive: each new share 'buys' less earnings than it dilutes — you pay dear (${pb}x) with cheap currency (${pa}x). The mirror image of classic accretion. (${ref})`,
    steps: ["Analysis: share-for-share deal — compare the two P/Es.",
      `Solve 1: A pays ${pb}x per rupiah of B's earnings.`,
      `Solve 2: the market prices A's own earnings at only ${pa}x.`,
      `Solve 3: ${pb}x > ${pa}x → each new share buys LESS earnings than it dilutes → dilutive.`]
  };
  return {
    q: `A mengakuisisi B murni saham. P/E A ${pa}x, P/E B ${pb}x. Tahun-1 (abaikan sinergi)?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Dilutif: setiap saham baru 'membeli' laba lebih sedikit daripada yang diencerkan — kamu membayar mahal (${pb}x) dengan mata uang murah (${pa}x). Kebalikan dari akretif klasik. (${ref})`,
    steps: ["Analysis: deal murni saham — bandingkan dua P/E.",
      `Solve 1: A membayar ${pb}x per rupiah laba B.`,
      `Solve 2: pasar menghargai laba A sendiri hanya ${pa}x.`,
      `Solve 3: ${pb}x > ${pa}x → tiap saham baru membeli laba LEBIH SEDIKIT daripada yang diencerkan → dilutif.`]
  };
}
function vB2SynZero(rng, ref, L){
  const c = L === "en"
    ? "Synergies take time and integration costs; claiming them upfront = paying for a promise"
    : "Sinergi butuh waktu dan biaya integrasi; mengklaimnya di muka = membayar untuk janji";
  const o = L === "en" ? [
    "Because the target forbids it", "Because synergies never exist", c, "Because synergies cannot be calculated"
  ] : [
    "Karena target melarang", "Karena sinergi tidak pernah ada", c, "Karena sinergi tidak bisa dihitung"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const months = b2pick(["12–24", "12–18", "18–24"], rng);
  if (L === "en") return {
    q: `An accretion/dilution model uses Rp0 synergies in year 1. Why does a disciplined analyst insist on that?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Synergies take ${months} months + integration costs (layoffs, systems, rebranding). A model booking full year-1 synergies justifies today's high price with tomorrow's promise — that is how overpaying gets legalized in a spreadsheet. (${ref})`,
    steps: ["Analysis: when do synergies actually arrive?",
      `Solve 1: synergies need ${months} months to materialize — plus integration costs.`,
      "Solve 2: year-1 synergies are a promise, not a fact.",
      "Solve 3: booking them in year 1 justifies today's price with tomorrow's promise."]
  };
  return {
    q: `Model akresi/dilusi memakai sinergi Rp0 di tahun-1. Kenapa analis yang disiplin bersikeras begitu?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Sinergi butuh ${months} bulan + biaya integrasi (PHK, sistem, rebranding). Model yang memasukkan sinergi penuh di tahun-1 membenarkan harga mahal hari ini dengan janji besok — itulah cara overpay dilegalkan di spreadsheet. (${ref})`,
    steps: ["Analysis: kapan sinergi benar-benar tiba?",
      `Solve 1: sinergi butuh ${months} bulan — plus biaya integrasi.`,
      "Solve 2: sinergi tahun-1 adalah janji, bukan fakta.",
      "Solve 3: membookingnya di tahun-1 membenarkan harga hari ini dengan janji besok."]
  };
}
function vB2SynCost(rng, ref, L){
  const X = b2step(rng, 1500, 3000, 500);
  const c = L === "en"
    ? "Net year-1 synergies can be NEGATIVE; don't claim full synergies upfront"
    : "Sinergi net tahun-1 bisa NEGATIF; jangan klaim sinergi penuh di muka";
  const o = L === "en" ? [
    "Ignore it — it's small", c, "Add it to goodwill", "Reduce the purchase price"
  ] : [
    "Abaikan — kecil", c, "Tambahkan ke goodwill", "Kurangi harga beli"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Integration costs of Rp${b2e(X)}k in year 1, synergies from year 2. Impact on the deal model?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Year 1 = integration costs with no synergies → net negative. A model booking full year-1 synergies is doubly wrong: claiming what does not exist AND ignoring costs that do. (${ref})`,
    steps: ["Analysis: year-1 cash flows of the deal — costs now, synergies later.",
      `Solve 1: year-1 synergies = 0; integration costs = Rp${b2e(X)}k.`,
      `Solve 2: net year-1 synergy = −Rp${b2e(X)}k (negative).`,
      "Solve 3: claiming full synergies in year 1 ignores a certain cost and books an uncertain gain."]
  };
  return {
    q: `Biaya integrasi Rp${b2i(X)} ribu di tahun-1, sinergi mulai tahun-2. Dampak ke model akuisisi?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Tahun-1 = biaya integrasi tanpa sinergi → net negatif. Model yang membooking sinergi penuh tahun-1 double salah: mengklaim yang belum ada DAN mengabaikan biaya yang pasti ada. (${ref})`,
    steps: ["Analysis: arus kas tahun-1 deal — biaya sekarang, sinergi nanti.",
      `Solve 1: sinergi tahun-1 = 0; biaya integrasi = Rp${b2i(X)} ribu.`,
      `Solve 2: sinergi net tahun-1 = −Rp${b2i(X)} ribu (negatif).`,
      "Solve 3: mengklaim sinergi penuh di tahun-1 mengabaikan biaya pasti dan membooking keuntungan yang belum pasti."]
  };
}
function vB2MixDeal(rng, ref, L){
  const cashPct = b2pick([50, 60, 70], rng), rate = b2pick([6, 7, 8], rng);
  const c = L === "en"
    ? "After-tax interest depresses earnings, but fewer shares are issued — an interest-vs-dilution tug of war"
    : "Beban bunga setelah pajak menekan laba, tapi saham bertambah lebih sedikit — tarik-menarik bunga vs dilusi";
  const o = L === "en" ? [
    "Certainly higher", c, "Certainly lower", "No impact"
  ] : [
    "Pasti lebih tinggi", c, "Pasti lebih rendah", "Tidak ada dampak"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A ${cashPct}% cash (funded by new debt @${rate}%) + ${100 - cashPct}% stock deal vs a 100% stock deal. Pro-forma EPS impact?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Tug of war: the debt portion adds after-tax interest that depresses earnings, but issues fewer shares. Net result depends: cheap debt + high acquirer P/E → the debt portion tends accretive; otherwise it can dilute. (${ref})`,
    steps: ["Analysis: cash funded by debt vs pure stock — two opposite forces.",
      "Solve 1: debt adds after-tax interest → earnings down.",
      "Solve 2: less stock issued → share count up less → EPS up.",
      "Solve 3: net effect depends on debt cheapness vs acquirer P/E — compute, do not guess."]
  };
  return {
    q: `Deal ${cashPct}% kas (utang baru @${rate}%) + ${100 - cashPct}% saham vs 100% saham. Dampak ke EPS pro forma?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Tarik-menarik: porsi utang menambah beban bunga setelah pajak yang menekan laba, tetapi menerbitkan saham lebih sedikit. Hasil bersih tergantung: bunga murah + P/E acquirer tinggi → porsi utang cenderung akretif; sebaliknya bisa dilutif. (${ref})`,
    steps: ["Analysis: kas didanai utang vs murni saham — dua gaya berlawanan.",
      "Solve 1: utang menambah bunga setelah pajak → laba turun.",
      "Solve 2: saham diterbitkan lebih sedikit → jumlah saham naik lebih kecil → EPS naik.",
      "Solve 3: hasil bersih tergantung murahnya utang vs P/E acquirer — hitung, jangan tebak."]
  };
}
function vB2NOLVal(rng, ref, L){
  const nol = b2step(rng, 10000, 20000, 5000), t = 22, ceil = Math.round(nol * t / 100);
  const c = L === "en"
    ? `Not ${b2e(ceil)} raw: limited by loss-utilization rules & the acquirer's ability to absorb them; value = PV of tax savings actually usable`
    : `Bukan ${b2i(ceil)} mentah: dibatasi aturan utilisasi & kemampuan laba acquirer; nilai = PV penghematan yang benar-benar bisa dipakai`;
  const o = L === "en" ? [
    `Rp${b2e(ceil)}k for sure — just multiply by the rate`, `Zero — NOLs die in a merger`, c, `Rp${b2e(nol)}k in full`
  ] : [
    `Rp${b2i(ceil)} ribu pasti — tinggal dikali tarif`, `Nol — NOL hangus saat merger`, c, `Rp${b2i(nol)} ribu penuh`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The target has NOLs (tax losses) of Rp${b2e(nol)}k, tax rate ${t}%. Their value to the acquirer?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `${b2e(ceil)} is the theoretical ceiling, not the value. Carryforward rules + annual utilization caps + the need for taxable profits = real value often far below. Booking the full amount = paying for a phantom tax shield. (${ref})`,
    steps: ["Analysis: NOLs are only worth something with profits to shield.",
      `Solve 1: theoretical ceiling = ${b2e(nol)} × ${t}% = ${b2e(ceil)}.`,
      "Solve 2: limits — carryforward rules, annual caps, acquirer profit capacity.",
      "Solve 3: fair value = PV of savings actually usable — often far below the ceiling."]
  };
  return {
    q: `Target punya NOL (rugi fiskal) Rp${b2i(nol)} ribu, tarif pajak ${t}%. Nilai NOL bagi acquirer?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `${b2i(ceil)} = plafon teoritis, bukan nilai. Aturan carryforward + batas utilisasi tahunan + butuh laba kena pajak = nilai riil sering jauh di bawahnya. Membooking penuh = membayar untuk perisai pajak hantu. (${ref})`,
    steps: ["Analysis: NOL hanya berharga bila ada laba kena pajak untuk dilindungi.",
      `Solve 1: plafon teoritis = ${b2i(nol)} × ${t}% = ${b2i(ceil)}.`,
      "Solve 2: batasan — aturan carryforward, batas tahunan, kapasitas laba acquirer.",
      "Solve 3: nilai wajar = PV penghematan yang benar-benar bisa dipakai — sering jauh di bawah plafon."]
  };
}
function vB2NOLSyn(rng, ref, L){
  const nol = b2step(rng, 10000, 15000, 2000), syn = b2step(rng, 2000, 4000, 1000);
  const c = L === "en"
    ? "Synergies raise taxable profit → accelerate NOL use → the NOLs are worth more to THIS acquirer than to one without synergies"
    : "Sinergi menaikkan laba kena pajak → mempercepat utilisasi NOL → NOL lebih berharga bagi acquirer ini dibanding acquirer tanpa sinergi";
  const o = L === "en" ? [
    "No interaction", c, "NOLs reduce synergies", "Both expire"
  ] : [
    "Tidak ada interaksi", c, "NOL mengurangi sinergi", "Keduanya hangus"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The target has NOLs of Rp${b2e(nol)}k + cost synergies of Rp${b2e(syn)}k/yr from year 2. The interaction?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Cross-topic interaction: NOLs are only worth something with taxable profits; the ${b2e(syn)}/yr synergies create those profits → faster NOL use → higher PV of tax savings. NOL value is NOT buyer-independent — a synergistic buyer pays more for the same NOLs. (${ref})`,
    steps: ["Analysis: NOLs need profits; synergies create profits.",
      `Solve 1: NOLs alone = a shield with nothing to shield (worth little).`,
      `Solve 2: synergies of Rp${b2e(syn)}k/yr create taxable profit from year 2.`,
      "Solve 3: faster NOL use → higher PV of tax savings → NOLs worth more to THIS buyer."]
  };
  return {
    q: `Target punya NOL Rp${b2i(nol)} ribu + sinergi cost Rp${b2i(syn)} ribu/thn mulai tahun-2. Interaksinya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Interaksi antar-topik: NOL hanya berharga jika ada laba kena pajak; sinergi ${b2i(syn)}/thn menciptakan laba itu → utilisasi NOL lebih cepat → PV penghematan pajak lebih tinggi. Nilai NOL TIDAK independen dari siapa yang membeli — acquirer bersinergi membayar lebih untuk NOL yang sama. (${ref})`,
    steps: ["Analysis: NOL butuh laba; sinergi menciptakan laba.",
      "Solve 1: NOL saja = perisai tanpa yang dilindungi (nilainya kecil).",
      `Solve 2: sinergi Rp${b2i(syn)} ribu/thn menciptakan laba kena pajak sejak tahun-2.`,
      "Solve 3: utilisasi NOL lebih cepat → PV penghematan pajak lebih tinggi → NOL lebih berharga bagi pembeli INI."]
  };
}
function vB2EquityNeeded(rng, ref, L){
  const ev = b2step(rng, 30000, 60000, 10000), fee = b2step(rng, 600, 1500, 100), tl = b2step(rng, 18000, 36000, 2000);
  const uses = ev + fee, eq = uses - tl;
  const vals = [eq, ev - tl, uses, ev];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `EV Rp${b2e(ev)}k + fee Rp${b2e(fee)}k. Term Loan Rp${b2e(tl)}k. Equity needed?`,
    opts: order.map(i => "Rp" + b2e(vals[i]) + "k"),
    answer: order.indexOf(0),
    explain: `Uses = ${b2e(uses)}; equity = ${b2e(uses)} − ${b2e(tl)} = ${b2e(eq)}. ${b2e(ev - tl)} = forgot the fee — the fee is day-1 cash out that must be funded. (${ref})`,
    steps: ["Analysis: sources must equal uses — solve for equity.",
      `Solve 1: uses = EV + fee = ${b2e(ev)} + ${b2e(fee)} = ${b2e(uses)}.`,
      `Solve 2: equity = uses − Term Loan = ${b2e(uses)} − ${b2e(tl)}.`,
      `Solve 3: compute → Rp${b2e(eq)}k.`]
  };
  return {
    q: `EV Rp${b2i(ev)} ribu + fee Rp${b2i(fee)} ribu. Term Loan Rp${b2i(tl)} ribu. Ekuitas yang dibutuhkan?`,
    opts: order.map(i => "Rp" + b2i(vals[i]) + " ribu"),
    answer: order.indexOf(0),
    explain: `Uses = ${b2i(uses)}; ekuitas = ${b2i(uses)} − ${b2i(tl)} = ${b2i(eq)}. ${b2i(ev - tl)} = lupa fee — fee adalah kas keluar hari-1 yang harus didanai. (${ref})`,
    steps: ["Analysis: sources harus = uses — cari ekuitasnya.",
      `Solve 1: uses = EV + fee = ${b2i(ev)} + ${b2i(fee)} = ${b2i(uses)}.`,
      `Solve 2: ekuitas = uses − Term Loan = ${b2i(uses)} − ${b2i(tl)}.`,
      `Solve 3: hitung → Rp${b2i(eq)} ribu.`]
  };
}
function vB2EquityNeeded2(rng, ref, L){
  const ev = b2step(rng, 40000, 70000, 10000), fee = b2step(rng, 1000, 2000, 500);
  const tl = b2step(rng, 24000, 40000, 4000), mz = b2step(rng, 4000, 8000, 1000);
  const uses = ev + fee, eq = uses - tl - mz;
  const vals = [eq, uses - tl, ev - tl, uses];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `EV Rp${b2e(ev)}k + fee Rp${b2e(fee)}k. TL Rp${b2e(tl)}k + mezzanine Rp${b2e(mz)}k. Equity?`,
    opts: order.map(i => "Rp" + b2e(vals[i]) + "k"),
    answer: order.indexOf(0),
    explain: `Uses = ${b2e(uses)}; equity = ${b2e(uses)} − ${b2e(tl)} − ${b2e(mz)} = ${b2e(eq)}. Two debt layers — subtract BOTH. ${b2e(uses - tl)} = forgot the fee. (${ref})`,
    steps: ["Analysis: sources = uses with TWO debt layers.",
      `Solve 1: uses = ${b2e(ev)} + ${b2e(fee)} = ${b2e(uses)}.`,
      `Solve 2: equity = uses − TL − mezzanine = ${b2e(uses)} − ${b2e(tl)} − ${b2e(mz)}.`,
      `Solve 3: compute → Rp${b2e(eq)}k.`]
  };
  return {
    q: `EV Rp${b2i(ev)} ribu + fee Rp${b2i(fee)} ribu. TL Rp${b2i(tl)} ribu + mezzanine Rp${b2i(mz)} ribu. Ekuitas?`,
    opts: order.map(i => "Rp" + b2i(vals[i]) + " ribu"),
    answer: order.indexOf(0),
    explain: `Uses = ${b2i(uses)}; ekuitas = ${b2i(uses)} − ${b2i(tl)} − ${b2i(mz)} = ${b2i(eq)}. Dua lapis utang — kurangi KEDUANYA. ${b2i(uses - tl)} = fee dilupakan. (${ref})`,
    steps: ["Analysis: sources = uses dengan DUA lapis utang.",
      `Solve 1: uses = ${b2i(ev)} + ${b2i(fee)} = ${b2i(uses)}.`,
      `Solve 2: ekuitas = uses − TL − mezzanine = ${b2i(uses)} − ${b2i(tl)} − ${b2i(mz)}.`,
      `Solve 3: hitung → Rp${b2i(eq)} ribu.`]
  };
}
function vB2Interest(rng, ref, L){
  const debt = b2step(rng, 18000, 30000, 2000), rate = b2pick([7, 8], rng);
  const intr = Math.round(debt * rate / 100);
  const vals = [intr, Math.round(debt * (rate + 2) / 100), Math.round(debt * rate / 100 * 1.5), Math.round(debt * 0.05)];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Beginning-of-year debt Rp${b2e(debt)}k, interest ${rate}%. This year's interest expense?`,
    opts: order.map(i => "Rp" + b2e(vals[i]) + "k"),
    answer: order.indexOf(0),
    explain: `${b2e(debt)} × ${rate}% = ${b2e(intr)}. Interest runs on beginning debt (accruing through the year) — using ending debt = circular reference. (${ref})`,
    steps: ["Analysis: interest base — beginning or ending debt?",
      "Solve 1: rule — interest = rate × BEGINNING debt.",
      `Solve 2: substitute → ${b2e(debt)} × ${rate}%.`,
      `Solve 3: compute → Rp${b2e(intr)}k.`]
  };
  return {
    q: `Utang awal tahun Rp${b2i(debt)} ribu, bunga ${rate}%. Beban bunga tahun berjalan?`,
    opts: order.map(i => "Rp" + b2i(vals[i]) + " ribu"),
    answer: order.indexOf(0),
    explain: `${b2i(debt)} × ${rate}% = ${b2i(intr)}. Bunga dihitung dari utang awal (bunga berjalan sepanjang tahun) — pakai utang akhir = circular reference. (${ref})`,
    steps: ["Analysis: basis bunga — utang awal atau akhir?",
      "Solve 1: aturan — bunga = tarif × utang AWAL.",
      `Solve 2: substitusi → ${b2i(debt)} × ${rate}%.`,
      `Solve 3: hitung → Rp${b2i(intr)} ribu.`]
  };
}
function vB2DebtFloor(rng, ref, L){
  const beg = b2step(rng, 4000, 6000, 100), cash = beg + b2step(rng, 500, 2000, 100);
  const excess = cash - beg;
  const c = L === "en"
    ? `Rp0 — MAX floor; the ${b2e(excess)} excess becomes cash/dividends`
    : `Rp0 — floor MAX; sisa ${b2i(excess)} jadi kas/dividen`;
  const o = L === "en" ? [
    c, `Rp${b2e(excess)}k`, `Minus Rp${b2e(excess)}k`, `Add new debt ${b2e(excess)}`
  ] : [
    c, `Rp${b2i(excess)} ribu`, `Minus Rp${b2i(excess)} ribu`, `Tambah utang baru ${b2i(excess)}`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Cash to debt Rp${b2e(cash)}k, beginning debt Rp${b2e(beg)}k. Ending debt?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `MAX(${b2e(beg)} − ${b2e(cash)}, 0) = 0; the ${b2e(excess)} excess piles up as cash. Negative debt = the bank paying the company — does not exist; the zero floor belongs in every debt schedule. (${ref})`,
    steps: ["Analysis: can debt go negative when cash to debt exceeds the balance?",
      `Solve 1: raw paydown = ${b2e(beg)} − ${b2e(cash)} = −${b2e(excess)}.`,
      "Solve 2: apply the floor — ending debt = MAX(raw, 0) = 0.",
      `Solve 3: excess ${b2e(excess)} becomes balance-sheet cash (or dividends).`]
  };
  return {
    q: `Kas untuk utang Rp${b2i(cash)} ribu, utang awal Rp${b2i(beg)} ribu. Utang akhir?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `MAX(${b2i(beg)} − ${b2i(cash)}, 0) = 0; sisa ${b2i(excess)} menumpuk jadi kas. Utang negatif = bank membayar perusahaan — tidak ada; floor nol wajib di setiap jadwal utang. (${ref})`,
    steps: ["Analysis: bisakah utang negatif saat kas ke utang melebihi saldo?",
      `Solve 1: pelunasan mentah = ${b2i(beg)} − ${b2i(cash)} = −${b2i(excess)}.`,
      "Solve 2: terapkan floor — utang akhir = MAX(mentah, 0) = 0.",
      `Solve 3: kelebihan ${b2i(excess)} menjadi kas di neraca (atau dividen).`]
  };
}
function vB2MoIC(rng, ref, L){
  const eqIn = b2step(rng, 12000, 25000, 1000);
  const mult = b2pick([2.78, 2.82, 3.02, 3.22, 3.31], rng);
  const eqOut = Math.round(eqIn * mult / 100) * 100;
  const moic = Math.round(eqOut / eqIn * 100) / 100;
  const gain = Math.round((moic - 1) * 100);
  const f = v => L === "en" ? b2e(v, 2) + "x" : b2i(v, 2) + "x";
  const c = L === "en"
    ? `${f(moic)} — money multiplied ${b2e(moic, 2)} (${gain}% gain)`
    : `${f(moic)} — modal berlipat ${b2i(moic, 2)} (untung ${gain}%)`;
  const o = L === "en" ? [
    c, `${f(moic)} — ${Math.round(moic * 100)}% return`, f(Math.round((moic - 1) * 100) / 100), f(moic + 1)
  ] : [
    c, `${f(moic)} — return ${Math.round(moic * 100)}%`, f(Math.round((moic - 1) * 100) / 100), f(moic + 1)
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Entry equity Rp${b2e(eqIn)}k → exit equity Rp${b2e(eqOut)}k (5 years). MoIC and meaning?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `${b2e(eqOut)} ÷ ${b2e(eqIn)} = ${b2e(moic, 2)}x: money multiplied ${b2e(moic, 2)} → a ${gain}% gain. '${Math.round(moic * 100)}% return' is wrong — that mixes capital with profit. And MoIC is time-blind: ${b2e(moic, 2)}x over 5 years ≠ ${b2e(moic, 2)}x over 10 years. (${ref})`,
    steps: ["Analysis: MoIC is a multiple — the gain is the multiple MINUS the capital.",
      `Solve 1: MoIC = exit ÷ entry = ${b2e(eqOut)} ÷ ${b2e(eqIn)} = ${b2e(moic, 2)}x.`,
      `Solve 2: gain = (${b2e(moic, 2)} − 1) × 100% = ${gain}%.`,
      "Solve 3: remember — MoIC says nothing about time; 5-year vs 10-year matters (that is IRR's job)."]
  };
  return {
    q: `Ekuitas awal Rp${b2i(eqIn)} ribu → ekuitas saat exit Rp${b2i(eqOut)} ribu (5 tahun). MoIC dan artinya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `${b2i(eqOut)} ÷ ${b2i(eqIn)} = ${b2i(moic, 2)}x: modal berlipat ${b2i(moic, 2)} → keuntungan ${gain}%. 'Return ${Math.round(moic * 100)}%' salah — ${Math.round(moic * 100)}% = modal+untung. Dan MoIC buta waktu: ${b2i(moic, 2)}x dalam 5 tahun ≠ ${b2i(moic, 2)}x dalam 10 tahun. (${ref})`,
    steps: ["Analysis: MoIC adalah kelipatan — keuntungannya adalah kelipatan DIKURANGI modal.",
      `Solve 1: MoIC = exit ÷ awal = ${b2i(eqOut)} ÷ ${b2i(eqIn)} = ${b2i(moic, 2)}x.`,
      `Solve 2: keuntungan = (${b2i(moic, 2)} − 1) × 100% = ${gain}%.`,
      "Solve 3: ingat — MoIC tidak bicara waktu; 5 tahun vs 10 tahun itu beda (itulah tugas IRR)."]
  };
}
function vB2InterestCirc(rng, ref, L){
  const yr = b2pick([2, 3], rng), rate = b2pick([7, 8], rng);
  const c = L === "en"
    ? "Wrong: must be beginning debt; ending debt = circular reference + understated interest"
    : "Salah: harus utang awal; utang akhir = circular reference + bunga understated";
  const o = L === "en" ? [
    "No error — that is standard", c, "Should use the average of beginning and ending", "Interest should be zero"
  ] : [
    "Tidak ada — itu standar", c, "Harusnya rata-rata", "Bunganya harus nol"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The model computes year-${yr} interest = ${rate}% × year-${yr} ENDING debt. The error?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Interest → NI → cash → ending debt → interest = circular reference; Excel needs iterative calc (fragile). Conservative standard: beginning-of-year debt. Bonus: since debt falls through the year, ending-debt interest is also understated. Beginning debt of year t = ending debt of year t−1 — that is a correct roll-forward, not circular. (${ref})`,
    steps: ["Analysis: trace the loop — where does ending debt come from?",
      "Solve 1: interest → NI → cash → ending debt → interest: a circle.",
      "Solve 2: Excel would need iterative calculation — fragile, may not converge.",
      "Solve 3: fix — interest on BEGINNING debt; the roll-forward (begin t = end t−1) is not circular."]
  };
  return {
    q: `Model menghitung bunga tahun-${yr} = ${rate}% × utang AKHIR tahun-${yr}. Kesalahannya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Bunga → NI → kas → utang akhir → bunga = circular reference; Excel butuh iterative calc (rapuh). Standar konservatif: bunga dari utang awal tahun. Bonus: karena utang turun sepanjang tahun, bunga dari utang akhir juga understated. Utang AWAL tahun-t = utang AKHIR tahun-(t−1) — itu roll-forward yang benar, bukan circular. (${ref})`,
    steps: ["Analysis: telusuri lingkarannya — utang akhir berasal dari mana?",
      "Solve 1: bunga → NI → kas → utang akhir → bunga: lingkaran.",
      "Solve 2: Excel butuh iterative calculation — rapuh, bisa tidak konvergen.",
      "Solve 3: perbaiki — bunga dari utang AWAL; roll-forward (awal t = akhir t−1) bukan circular."]
  };
}
function vB2BudgetForecast(rng, ref, L){
  const c = L === "en"
    ? "Budget = an approved target/commitment set at period start; forecast = a realistic expectation updated through the period"
    : "Budget = target/komitmen yang disetujui di awal periode; forecast = ekspektasi realistis yang di-update sepanjang periode";
  const o = L === "en" ? [
    "Both can never change", "They are the same thing", c, "Forecast = target; budget = actual"
  ] : [
    "Keduanya tidak bisa diubah", "Sama saja", c, "Forecast = target; budget = realisasi"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Distinguish budget vs forecast in one sentence.`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Budget = the approved commitment (performance benchmark, locked). Forecast = the current realistic expectation (updated quarterly/monthly). Mixing them = punishing managers because the world changed, or letting targets drift silently. (${ref})`,
    steps: ["Analysis: one is a promise, the other is a view — which is which?",
      "Solve 1: budget — approved at period start, locked, the performance benchmark.",
      "Solve 2: forecast — the realistic expectation now, updated as conditions change.",
      "Solve 3: mixing them breaks accountability either way."]
  };
  return {
    q: `Bedakan budget vs forecast dalam satu kalimat.`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Budget = komitmen yang disetujui (tolok ukur kinerja, dikunci). Forecast = ekspektasi realistis terkini (di-update tiap kuartal/bulan). Mencampur keduanya = menghukum manajer karena dunia berubah, atau membiarkan target bergeser diam-diam. (${ref})`,
    steps: ["Analysis: satu adalah janji, satunya pandangan — mana yang mana?",
      "Solve 1: budget — disetujui di awal periode, dikunci, tolok ukur kinerja.",
      "Solve 2: forecast — ekspektasi realistis saat ini, di-update saat kondisi berubah.",
      "Solve 3: mencampurnya merusak akuntabilitas ke dua arah."]
  };
}
function vB2BudgetLock(rng, ref, L){
  const c = L === "en"
    ? "Refuse: the budget = a locked commitment; forecasts may move, budgets do not follow forecasts"
    : "Tolak: budget = komitmen yang dikunci; forecast boleh bergerak, budget tidak mengikuti forecast";
  const o = L === "en" ? [
    "Agree — alignment is good", c, "Raise both", "Drop the budget"
  ] : [
    "Setuju — selaras itu baik", c, "Naikkan keduanya", "Hapus budget"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The Q2 forecast is revised up; the manager wants the budget raised to stay aligned. Your response?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `The budget is locked at the start as the commitment benchmark. An improving forecast is good news to beat, not a reason to shift the target. Chasing the forecast = targets always 'hit' = zero accountability. (${ref})`,
    steps: ["Analysis: who moves — the commitment or the view?",
      "Solve 1: budget = the locked commitment, the benchmark.",
      "Solve 2: forecast = the moving view; a better forecast is news to beat.",
      "Solve 3: moving the budget to match the forecast makes every target 'hit' — accountability zero."]
  };
  return {
    q: `Forecast Q2 direvisi naik, manajer minta budget ikut dinaikkan agar selaras. Responsmu?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Budget dikunci di awal sebagai tolok ukur komitmen. Forecast yang membaik = kabar baik untuk dilampaui, bukan alasan menggeser target. Mengikuti forecast = target selalu 'tercapai' = akuntabilitas nol. (${ref})`,
    steps: ["Analysis: siapa yang bergerak — komitmen atau pandangan?",
      "Solve 1: budget = komitmen yang dikunci, tolok ukur.",
      "Solve 2: forecast = pandangan yang bergerak; forecast membaik adalah kabar untuk dilampaui.",
      "Solve 3: menggeser budget mengikuti forecast membuat semua target 'tercapai' — akuntabilitas nol."]
  };
}
function vB2Rolling(rng, ref, L){
  const c = L === "en"
    ? "A constant 12-month horizon, adaptive to conditions — but it demands process discipline"
    : "Horizon selalu 12 bulan ke depan dan adaptif ke kondisi — tapi menuntut disiplin proses";
  const o = L === "en" ? [
    "No weakness", c, "Too accurate", "Too cheap"
  ] : [
    "Tidak ada", c, "Terlalu akurat", "Terlalu murah"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `October, the board wants a view of next year. The weakness of a static annual budget here — and the fix?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `In October the annual budget has 2 months of horizon left — blind to next year. A rolling forecast always sees 12 months ahead and absorbs fresh conditions. The price: quarterly update discipline; without it, it is just a renamed budget. (${ref})`,
    steps: ["Analysis: how much future does a static budget still see in October?",
      "Solve 1: annual budget in October — 2 months of horizon left, blind to next year.",
      "Solve 2: rolling forecast — always 12 months ahead, refreshed quarterly.",
      "Solve 3: the cost is discipline; without quarterly updates it is a budget renamed."]
  };
  return {
    q: `Oktober, direksi minta pandangan tahun depan. Kelemahan budget tahunan statis di titik ini — dan solusinya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Di Oktober, budget tahunan tinggal 2 bulan horizon — buta untuk tahun depan. Rolling forecast selalu punya 12 bulan ke depan dan menyerap kondisi terbaru. Harganya: disiplin update tiap kuartal; tanpa itu ia cuma budget yang diganti nama. (${ref})`,
    steps: ["Analysis: seberapa jauh masa depan yang masih dilihat budget statis di Oktober?",
      "Solve 1: budget tahunan di Oktober — tinggal 2 bulan horizon, buta terhadap tahun depan.",
      "Solve 2: rolling forecast — selalu 12 bulan ke depan, di-refresh kuartalan.",
      "Solve 3: harganya disiplin; tanpa update kuartalan ia cuma budget berganti nama."]
  };
}
function vB2VarVerdict(rng, ref, L){
  const rp = b2pick([5, 8, 10], rng), cp = rp + b2pick([5, 7, 8], rng);
  const c = L === "en"
    ? `Bad: costs grew faster than revenue; investigate the cost drivers — unprofitable growth`
    : `Buruk: biaya tumbuh lebih cepat dari revenue; selidiki driver biaya — pertumbuhan yang tidak profitable`;
  const o = L === "en" ? [
    "Good — revenue rose", "Neutral", c, "Raise next year's budget"
  ] : [
    "Bagus — revenue naik", "Netral", c, "Naikkan budget tahun depan"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Actual revenue ${rp}% above budget (favorable), costs ${cp}% above budget (unfavorable). Variance-analysis conclusion?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Bad. Costs grew ${cp}% vs revenue ${rp}% = margin erosion; unprofitable growth. Proper variance analysis always pairs price/volume vs cost — one favorable variance does not redeem a bigger unfavorable one. (${ref})`,
    steps: ["Analysis: two variances, opposite signs — which dominates?",
      `Solve 1: revenue +${rp}% (favorable) vs costs +${cp}% (unfavorable).`,
      `Solve 2: costs outgrew revenue by ${cp - rp} points → margin shrinks.`,
      "Solve 3: growth that shrinks margin is unprofitable growth — investigate cost drivers."]
  };
  return {
    q: `Revenue aktual ${rp}% di atas budget (favorable), biaya ${cp}% di atas budget (unfavorable). Kesimpulan variance analysis?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Buruk. Biaya tumbuh ${cp}% vs revenue ${rp}% = marjin tergerus; pertumbuhan yang tidak profitable. Variance analysis yang benar selalu memasangkan price/volume vs cost — satu variance favorable tidak menebus satu unfavorable yang lebih besar. (${ref})`,
    steps: ["Analysis: dua variansi, tanda berlawanan — mana yang dominan?",
      `Solve 1: revenue +${rp}% (favorable) vs biaya +${cp}% (unfavorable).`,
      `Solve 2: biaya tumbuh ${cp - rp} poin lebih cepat → marjin menyusut.`,
      "Solve 3: pertumbuhan yang menggerus marjin = pertumbuhan tidak profitable — selidiki driver biaya."]
  };
}
function vB2PriceVar(rng, ref, L){
  const units = b2step(rng, 1000, 2400, 200), pb = b2pick([50, 100, 200], rng);
  const pa = Math.round(pb * b2pick([0.94, 0.95, 0.85], rng));
  const flex = units * pb, act = units * pa, pv = act - flex;
  const vv = Math.round((units - 1000) / 1000 * 100);
  const c = L === "en"
    ? `−Rp${b2e(Math.abs(pv))}k (unfavorable)`
    : `−Rp${b2i(Math.abs(pv))} ribu (unfavorable)`;
  const o = L === "en" ? [
    c, `Rp${b2e(Math.abs(pv))}k (favorable)`, `−Rp${b2e(Math.abs(pv))}k is the volume variance`, `Rp0`
  ] : [
    c, `Rp${b2i(Math.abs(pv))} ribu (favorable)`, `−Rp${b2i(Math.abs(pv))} ribu adalah volume variance`, `Rp0`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Budget: 1,000 units @Rp${b2e(pb)}k. Actual: ${b2e(units)} units, revenue Rp${b2e(act)}k. Price variance?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Flex = ${b2e(flex)}; price variance = ${b2e(act)} − ${b2e(flex)} = −${b2e(Math.abs(pv))} (unfavorable — actual selling price below budget). Volume variance is separate. Do not mix 'sold more' with 'sold cheaper'. (${ref})`,
    steps: ["Analysis: separate price from volume — flex the budget to actual volume first.",
      `Solve 1: flex revenue = ${b2e(units)} × ${b2e(pb)} = ${b2e(flex)}.`,
      `Solve 2: price variance = actual − flex = ${b2e(act)} − ${b2e(flex)} = ${b2e(pv)}.`,
      "Solve 3: negative on revenue = unfavorable (sold cheaper than budget)."]
  };
  return {
    q: `Budget: 1.000 unit @Rp${b2i(pb)} ribu. Aktual: ${b2i(units)} unit, revenue Rp${b2i(act)} ribu. Price variance?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Flex = ${b2i(flex)}; price variance = ${b2i(act)} − ${b2i(flex)} = −${b2i(Math.abs(pv))} (unfavorable — harga jual aktual di bawah budget). Volume variance terpisah. Jangan campur 'jual lebih banyak' dengan 'jual lebih murah'. (${ref})`,
    steps: ["Analysis: pisahkan harga dari volume — flex budget ke volume aktual dulu.",
      `Solve 1: flex revenue = ${b2i(units)} × ${b2i(pb)} = ${b2i(flex)}.`,
      `Solve 2: price variance = aktual − flex = ${b2i(act)} − ${b2i(flex)} = ${b2i(pv)}.`,
      "Solve 3: negatif pada revenue = unfavorable (jual lebih murah dari budget)."]
  };
}
function vB2PriceVolVar(rng, ref, L){
  const qb = b2step(rng, 2000, 5000, 1000), pb = b2pick([50, 100, 200], rng);
  const qa = Math.round(qb * b2pick([0.92, 1.2], rng) / 100) * 100;
  const pa = Math.round(pb * 0.975);
  const flex = qa * pb, act = qa * pa, pv = act - flex, vv = flex - qb * pb;
  const c = L === "en"
    ? `Price ${b2e(pv)} (unfav); volume ${b2e(vv)} (unfav)`
    : `Price ${b2i(pv)} (unfav); volume ${b2i(vv)} (unfav)`;
  const o = L === "en" ? [
    c, `Price +${b2e(Math.abs(pv))} (fav); volume +${b2e(Math.abs(vv))}`, `Both zero`, `Volume only`
  ] : [
    c, `Price +${b2i(Math.abs(pv))} (fav); volume +${b2i(Math.abs(vv))}`, `Keduanya nol`, `Hanya volume`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Budget: ${b2e(qb)} units @Rp${b2e(pb)}k. Actual: ${b2e(qa)} units, revenue Rp${b2e(act)}k. Price & volume variance?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Flex = ${b2e(flex)}. Price variance = ${b2e(act)} − ${b2e(flex)} = ${b2e(pv)} unfav (sold at ${b2e(pa)}/unit vs ${b2e(pb)} budget). Volume variance = ${b2e(flex)} − ${b2e(qb * pb)} = ${b2e(vv)} unfav (${b2e(Math.abs(qa - qb))} units lost). Both red — a double problem. (${ref})`,
    steps: ["Analysis: split the total variance into price and volume.",
      `Solve 1: flex = ${b2e(qa)} × ${b2e(pb)} = ${b2e(flex)}.`,
      `Solve 2: price variance = ${b2e(act)} − ${b2e(flex)} = ${b2e(pv)}.`,
      `Solve 3: volume variance = ${b2e(flex)} − ${b2e(qb * pb)} = ${b2e(vv)}.`]
  };
  return {
    q: `Budget: ${b2i(qb)} unit @Rp${b2i(pb)} ribu. Aktual: ${b2i(qa)} unit, revenue Rp${b2i(act)} ribu. Price & volume variance?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Flex = ${b2i(flex)}. Price variance = ${b2i(act)} − ${b2i(flex)} = ${b2i(pv)} unfav (jual ${b2i(pa)}/unit vs budget ${b2i(pb)}). Volume variance = ${b2i(flex)} − ${b2i(qb * pb)} = ${b2i(vv)} unfav (${b2i(Math.abs(qa - qb))} unit hilang). Dua-duanya merah — masalah ganda. (${ref})`,
    steps: ["Analysis: uraikan total variance jadi price dan volume.",
      `Solve 1: flex = ${b2i(qa)} × ${b2i(pb)} = ${b2i(flex)}.`,
      `Solve 2: price variance = ${b2i(act)} − ${b2i(flex)} = ${b2i(pv)}.`,
      `Solve 3: volume variance = ${b2i(flex)} − ${b2i(qb * pb)} = ${b2i(vv)}.`]
  };
}
function vB2AbsRef(rng, ref, L){
  const c = L === "en"
    ? "$ locks the reference to the growth-assumption cell; without $ it drifts to C3, D3, ... — linking the wrong cells"
    : "$ mengunci referensi ke sel asumsi growth; tanpa $ ia bergeser ke C3, D3, ... — me-link sel yang salah";
  const o = L === "en" ? [
    c, "So it cannot be edited", "So the numbers grow", "To look tidy"
  ] : [
    c, "Agar tidak bisa diedit", "Supaya angkanya membesar", "Supaya terlihat rapi"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The formula =B12*(1+$B$3) is copied right across Y1..Y5. Why is $B$3 absolute?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `B12 is relative (correct: each year uses its own EBITDA), $B$3 absolute (one assumption cell for all years). Without $, copying right drifts to C3/D3/E3 — linking empty/wrong cells and breaking the model with no error message. Rule: assumptions = absolute, time series = relative. (${ref})`,
    steps: ["Analysis: which part should move when copied, which should stay?",
      "Solve 1: B12 relative — each year uses its own EBITDA. Correct to move.",
      "Solve 2: $B$3 absolute — one growth-assumption cell for all years.",
      "Solve 3: without $, the copy drifts to C3/D3 — wrong cells, no warning."]
  };
  return {
    q: `Rumus =B12*(1+$B$3) di-copy ke kanan untuk Y1..Y5. Kenapa $B$3 di-absolute-kan?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `B12 relatif (benar: tiap tahun pakai EBITDA tahunnya), $B$3 absolut (satu sel asumsi untuk semua tahun). Tanpa $, copy ke kanan menggeser ke C3/D3/E3 — me-link sel kosong/salah dan model rusak tanpa pesan error. Aturan: asumsi = absolute, deret waktu = relatif. (${ref})`,
    steps: ["Analysis: bagian mana yang boleh bergerak saat di-copy, mana yang harus diam?",
      "Solve 1: B12 relatif — tiap tahun pakai EBITDA tahunnya sendiri. Benar bergerak.",
      "Solve 2: $B$3 absolut — satu sel asumsi growth untuk semua tahun.",
      "Solve 3: tanpa $, copy bergeser ke C3/D3 — sel salah, tanpa warning."]
  };
}
function vB2AbsRef2(rng, ref, L){
  const col = b2pick(["D", "E"], rng), row = b2pick([10, 12], rng);
  const c = L === "en"
    ? `${col}${row} locked, E5 → F5, G5 (relative)`
    : `${col}${row} terkunci, E5 → F5, G5 (relatif)`;
  const o = L === "en" ? [
    c, "Both locked", "Both shift", "Error"
  ] : [
    c, "Keduanya terkunci", "Keduanya bergeser", "Error"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The formula =$${col}$${row}*E5 is copied right. What happens?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `$${col}$${row} stays; E5 → F5 → G5. The classic pattern: rate/assumption in column ${col} (locked), running data in row 5 (flowing). (${ref})`,
    steps: ["Analysis: read the $ signs — what is locked, what flows?",
      `Solve 1: $${col}$${row} — $ on column AND row: fully locked.`,
      "Solve 2: E5 — no $: fully relative, shifts right on copy.",
      "Solve 3: result — assumption stays, data flows F5, G5, ..."]
  };
  return {
    q: `Rumus =$${col}$${row}*E5 di-copy ke kanan. Yang terjadi?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `$${col}$${row} tetap; E5 → F5 → G5. Pola klasik: tarif/asumsi di kolom ${col} (kunci), data berjalan di baris 5 (mengalir). (${ref})`,
    steps: ["Analysis: baca tanda $ — apa yang terkunci, apa yang mengalir?",
      `Solve 1: $${col}$${row} — $ di kolom DAN baris: terkunci penuh.`,
      "Solve 2: E5 — tanpa $: relatif penuh, bergeser ke kanan saat di-copy.",
      "Solve 3: hasil — asumsi diam, data mengalir F5, G5, ..."]
  };
}
function vB2IdxMatch(rng, ref, L){
  const c = L === "en"
    ? "Survives column inserts and can look left; VLOOKUP breaks when columns are inserted and is blind to the left"
    : "Tahan sisip kolom dan bisa lookup ke kiri; VLOOKUP rusak saat kolom disisipkan dan buta ke kiri";
  const o = L === "en" ? [
    "Shorter to type", c, "10x faster", "VLOOKUP is banned"
  ] : [
    "Lebih pendek diketik", c, "Lebih cepat 10x", "VLOOKUP dilarang"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A 5-year LBO model uses INDEX+MATCH to pull assumptions, not VLOOKUP. The main reason?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `VLOOKUP uses a hardcoded column number — insert one column and every lookup silently shifts wrong. INDEX+MATCH links logical ranges: insert-proof and can fetch left of the key. In a 5-year model under constant revision, VLOOKUP fragility = a time bomb. (${ref})`,
    steps: ["Analysis: what breaks when the model structure changes?",
      "Solve 1: VLOOKUP holds a column NUMBER — insert a column, it points elsewhere.",
      "Solve 2: INDEX+MATCH holds RANGES — insert-proof, and can look left.",
      "Solve 3: in a model revised for 5 years, silent breakage is the expensive bug."]
  };
  return {
    q: `Model LBO 5 tahun memakai INDEX+MATCH untuk menarik asumsi, bukan VLOOKUP. Alasan utamanya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `VLOOKUP memakai nomor kolom hardcode — sisip satu kolom, semua lookup geser dan salah diam-diam. INDEX+MATCH me-link range yang logis: tahan sisip kolom dan bisa mengambil dari kiri kunci. Di model 5 tahun yang terus direvisi, kerapuhan VLOOKUP = bom waktu. (${ref})`,
    steps: ["Analysis: apa yang rusak saat struktur model berubah?",
      "Solve 1: VLOOKUP memegang NOMOR kolom — sisip kolom, ia menunjuk ke tempat lain.",
      "Solve 2: INDEX+MATCH memegang RANGE — tahan sisip, bisa ambil ke kiri.",
      "Solve 3: di model yang direvisi 5 tahun, kerusakan diam-diam adalah bug termahal."]
  };
}
function vB2XLookup2(rng, ref, L){
  const yr = b2pick([2024, 2025, 2026], rng), city = b2pick(["Jakarta", "Bandung"], rng);
  const c = `=XLOOKUP(1,(Tahun=${yr})*(Cabang="${city}"),Revenue)`;
  const o = [
    c,
    `=VLOOKUP("${yr}",Tabel,3)`,
    `=XLOOKUP("${yr}",Tahun,Revenue)`,
    `=SUM(Tahun=${yr})`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Fetch revenue on 2 criteria (year=${yr}, branch=${city}). The correct formula?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `XLOOKUP(1, (criteria1)*(criteria2), return) — multiplying arrays yields 1 only on rows meeting both. Two-criteria VLOOKUP needs a helper column; XLOOKUP does not. (${ref})`,
    steps: ["Analysis: two criteria must hold on the SAME row.",
      "Solve 1: (Year=2025)*(Branch=\"Jakarta\") = 1 only where both are true.",
      "Solve 2: XLOOKUP(1, that array, Revenue) returns the matching revenue.",
      "Solve 3: VLOOKUP cannot do two criteria without a helper column."]
  };
  return {
    q: `Ambil revenue dengan 2 kriteria (tahun=${yr}, cabang=${city}). Rumus yang benar?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `XLOOKUP(1, (kriteria1)*(kriteria2), return) — perkalian array menghasilkan 1 hanya di baris yang memenuhi keduanya. VLOOKUP 2 kriteria butuh kolom helper; XLOOKUP tidak. (${ref})`,
    steps: ["Analysis: dua kriteria harus terpenuhi di baris yang SAMA.",
      `Solve 1: (Tahun=${yr})*(Cabang="${city}") = 1 hanya di baris yang memenuhi keduanya.`,
      "Solve 2: XLOOKUP(1, array itu, Revenue) mengembalikan revenue yang cocok.",
      "Solve 3: VLOOKUP tidak bisa 2 kriteria tanpa kolom helper."]
  };
}
function vB2Sumifs2(rng, ref, L){
  const city = b2pick(["Jakarta", "Bandung"], rng), mon = b2pick(["Jan", "Feb"], rng);
  const c = `=SUMIFS(Penjualan,Cabang,"${city}",Bulan,"${mon}")`;
  const o = [
    c, `=SUM(Penjualan)`, `=VLOOKUP("${city}",Tabel,5)`, `=COUNTIFS(Cabang,"${city}",Bulan,"${mon}")`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Total sales on 2 criteria (branch + month: ${city}, ${mon}). The formula?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `=SUMIFS(Sales, Branch, "${city}", Month, "${mon}"). COUNTIFS counts rows (does not sum values) — swapping them = a totally wrong answer. (${ref})`,
    steps: ["Analysis: SUM the values, not COUNT the rows, on two criteria.",
      `Solve 1: SUMIFS takes the sum-range first, then criteria pairs.`,
      `Solve 2: criteria — Branch = "${city}" AND Month = "${mon}".`,
      "Solve 3: COUNTIFS would count rows, not sum sales — wrong tool."]
  };
  return {
    q: `Ambil total penjualan dengan 2 kriteria (cabang + bulan: ${city}, ${mon}). Rumus?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `=SUMIFS(Penjualan, Cabang, "${city}", Bulan, "${mon}"). COUNTIFS menghitung baris (bukan menjumlah nilai) — tertukar keduanya = jawaban salah total. (${ref})`,
    steps: ["Analysis: JUMLAHKAN nilainya, bukan HITUNG barisnya, dengan dua kriteria.",
      "Solve 1: SUMIFS — range yang dijumlah dulu, baru pasangan kriteria.",
      `Solve 2: kriteria — Cabang = "${city}" DAN Bulan = "${mon}".`,
      "Solve 3: COUNTIFS menghitung baris, bukan menjumlah penjualan — alat yang salah."]
  };
}
function vB2Sequence(rng, ref, L, rows, cols){
  const n = rows, m = cols || 1;
  const c = L === "en"
    ? `Spills ${b2e(n)}${m > 1 ? "×" + m : ""} values${m > 1 ? " 1–" + (n * m) : " 1–" + n}; #SPILL! if the path is blocked by filled cells`
    : `Spill ${b2i(n)}${m > 1 ? "×" + m : ""} angka${m > 1 ? " 1–" + (n * m) : " 1–" + n}; #SPILL! jika jalannya terhalang sel isi`;
  const o = L === "en" ? [
    c, "Fills only the first cell", "Error #VALUE!", "Deletes the column"
  ] : [
    c, "Hanya mengisi sel pertama", "Error #VALUE!", "Menghapus kolom"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const fn = m > 1 ? `=SEQUENCE(${n},${m})` : `=SEQUENCE(${n})`;
  if (L === "en") return {
    q: `${fn} in ${m > 1 ? "A1" : "B2"}. Result and risk?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Spills ${b2e(n)}${m > 1 ? "×" + m + " (1–" + (n * m) + ")" : " values (1–" + n + ")"} from the anchor cell. Blocked by filled cells → #SPILL!. For forecast year series it is cleaner than typing — as long as the path is clear. (${ref})`,
    steps: ["Analysis: SEQUENCE is a dynamic array — one formula, many cells.",
      `Solve 1: ${fn} spills ${n * m} values from the anchor.`,
      "Solve 2: the spill area must be empty.",
      "Solve 3: blocked path → #SPILL! (not a formula error — a space collision)."]
  };
  return {
    q: `${fn} di ${m > 1 ? "A1" : "B2"}. Hasil dan risiko?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Men-spill ${b2i(n)}${m > 1 ? "×" + m + " (1–" + (n * m) + ")" : " angka (1–" + n + ")"} dari sel jangkar. Terhalang sel isi → #SPILL!. Untuk deret tahun forecast, ini lebih rapi dari mengetik manual — asal jalannya bersih. (${ref})`,
    steps: ["Analysis: SEQUENCE adalah dynamic array — satu rumus, banyak sel.",
      `Solve 1: ${fn} men-spill ${n * m} nilai dari sel jangkar.`,
      "Solve 2: area tumpahan harus kosong.",
      "Solve 3: jalur terhalang → #SPILL! (bukan error rumus — tabrakan ruang)."]
  };
}
function vB2TaxFloor(rng, ref, L){
  const rate = b2pick([22, 25], rng);
  const c = `=MAX(EBT,0)*${rate}% atau =IF(EBT<0,0,EBT*${rate}%)`;
  const o = [
    c, `=EBT*${rate}% selalu`, `=ABS(EBT)*${rate}%`, `Pajak nol selamanya`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The correct tax formula when the firm can lose money (negative EBT)?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `=MAX(EBT,0)×${rate}% floors tax at zero in loss years — a loss-maker pays no 'negative tax'. Raw =EBT×${rate}% creates negative tax that inflates NI. (Losses can become NOLs — that is a separate schedule.) (${ref})`,
    steps: ["Analysis: what tax does a loss-making firm pay?",
      `Solve 1: EBT < 0 → tax must be 0, not negative.`,
      `Solve 2: =MAX(EBT,0)×${rate}% floors it at zero.`,
      "Solve 3: raw EBT×rate would create negative tax and inflate NI."]
  };
  return {
    q: `Rumus pajak yang benar saat perusahaan bisa rugi (EBT negatif)?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `=MAX(EBT,0)×${rate}% mem-floor pajak di nol saat rugi — perusahaan rugi tidak membayar 'pajak negatif'. =EBT×${rate}% mentah menghasilkan pajak negatif yang menggelembungkan NI. (Kerugian bisa jadi NOL — itu schedule terpisah.) (${ref})`,
    steps: ["Analysis: berapa pajak perusahaan yang merugi?",
      "Solve 1: EBT < 0 → pajak harus 0, bukan negatif.",
      `Solve 2: =MAX(EBT,0)×${rate}% mem-floor pajak di nol.`,
      "Solve 3: EBT×rate mentah menciptakan pajak negatif dan menggelembungkan NI."]
  };
}
function vB2FCFFvsFCFE(rng, ref, L){
  const c = L === "en"
    ? "FCFF = cash for ALL investors (discounted at WACC); FCFE = cash for shareholders only (discounted at Ke)"
    : "FCFF = kas untuk SEMUA investor (didiskon WACC); FCFE = kas untuk pemegang saham saja (didiskon Ke)";
  const o = L === "en" ? [
    "They are the same", c, "FCFF = net income", "FCFE is always bigger"
  ] : [
    "Sama saja", c, "FCFF = laba bersih", "FCFE selalu lebih besar"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Distinguish FCFF from FCFE in one sentence.`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `FCFF = cash before paying lenders (for all capital providers) → discounted at WACC. FCFE = the leftover for shareholders after debt service → discounted at Ke. Standard DCF uses FCFF because it values the whole firm, not just equity. (${ref})`,
    steps: ["Analysis: whose cash is it — everyone's, or shareholders' only?",
      "Solve 1: FCFF — cash for ALL investors, before debt payments → WACC.",
      "Solve 2: FCFE — cash left for shareholders AFTER debt service → Ke.",
      "Solve 3: match the cash flow to its discount rate — mixing them misvalues the firm."]
  };
  return {
    q: `Bedakan FCFF dan FCFE dalam satu kalimat.`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `FCFF = kas sebelum membayar kreditur (untuk semua pemodal) → didiskon WACC. FCFE = sisa untuk pemegang saham setelah bayar utang → didiskon Ke. DCF standar pakai FCFF karena menilai seluruh perusahaan, bukan cuma ekuitas. (${ref})`,
    steps: ["Analysis: kas siapa — semua pemodal, atau pemegang saham saja?",
      "Solve 1: FCFF — kas untuk SEMUA investor, sebelum bayar utang → WACC.",
      "Solve 2: FCFE — kas sisa untuk pemegang saham SETELAH bayar utang → Ke.",
      "Solve 3: pasangkan arus kas dengan tingkat diskontonya — tertukar = valuasi salah."]
  };
}
function vB2FCFFvsNI(rng, ref, L){
  const c = L === "en"
    ? "FCFF measures operating cash before financing decisions — interest is a financing decision, not operations; whole-firm valuation must be capital-structure independent"
    : "FCFF mengukur kas operasi sebelum keputusan pendanaan — bunga adalah keputusan pendanaan, bukan operasi; valuasi seluruh perusahaan harus independen dari struktur modal";
  const o = L === "en" ? [
    "Net income is always wrong", c, "FCFF is bigger", "It is the rule"
  ] : [
    "Laba bersih selalu salah", c, "FCFF lebih besar", "Aturan"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Why does standard DCF use FCFF (unlevered) instead of net income?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Net income is already after interest — then discounting at WACC (which also embeds debt) = double-counting debt (once in cash flows, once in the discount rate). Unlevered FCFF + WACC = capital-structure-independent valuation. (${ref})`,
    steps: ["Analysis: where does interest already appear?",
      "Solve 1: net income is AFTER interest — debt already charged once.",
      "Solve 2: WACC also embeds the cost of debt — discounting NI at WACC charges debt twice.",
      "Solve 3: FCFF is BEFORE interest, so WACC charges debt exactly once."]
  };
  return {
    q: `Kenapa DCF standar memakai FCFF (unlevered), bukan laba bersih?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Laba bersih sudah dikurangi bunga — memakai laba bersih lalu mendiskon dengan WACC = double-counting utang (sekali di arus kas, sekali di diskonto). FCFF unlevered + WACC = valuasi independen struktur modal. (${ref})`,
    steps: ["Analysis: di mana bunga sudah muncul?",
      "Solve 1: laba bersih adalah SETELAH bunga — utang sudah dibebankan sekali.",
      "Solve 2: WACC juga mengandung biaya utang — mendiskon NI dengan WACC membebankan utang dua kali.",
      "Solve 3: FCFF adalah SEBELUM bunga, jadi WACC membebankan utang tepat sekali."]
  };
}
function vB2TVShare(rng, ref, L){
  const pct = b2pick([62, 65, 70, 75], rng);
  const c = L === "en"
    ? `Normal — but ${pct}% of the valuation rests on WACC & g assumptions: validating them is the most critical job`
    : `Wajar — tapi ${pct}% valuasi ditentukan asumsi WACC & g: validasi keduanya adalah pekerjaan paling kritis`;
  const o = L === "en" ? [
    "The model is wrong", c, "Ignore the TV", "Raise g"
  ] : [
    "Model salah", c, "Abaikan TV", "Naikkan g"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `TV = ${pct}% of EV in a DCF. Implication?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `TV at 60–80% of EV is normal — but it means over half the 'valuation' is really a bet on two numbers: WACC and g. The best validation hours go there, not to the year-2 forecast. (${ref})`,
    steps: ["Analysis: most of the value sits beyond the explicit forecast.",
      `Solve 1: TV = ${pct}% of EV — the explicit years are the minority.`,
      "Solve 2: TV depends almost entirely on WACC and g.",
      "Solve 3: validate WACC and g first — that is where the valuation lives."]
  };
  return {
    q: `TV = ${pct}% dari EV dalam sebuah DCF. Implikasinya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `TV 60–80% dari EV itu normal — tapi artinya lebih dari setengah 'valuasi' sebenarnya adalah taruhan pada dua angka: WACC dan g. Jam validasi terbaik dihabiskan di sana, bukan di forecast tahun-2. (${ref})`,
    steps: ["Analysis: sebagian besar nilai duduk di luar forecast eksplisit.",
      `Solve 1: TV = ${pct}% dari EV — tahun eksplisit adalah minoritas.`,
      "Solve 2: TV hampir sepenuhnya bergantung pada WACC dan g.",
      "Solve 3: validasi WACC dan g dulu — di sanalah valuasi hidup."]
  };
}
function vB2LTMNTM(rng, ref, L){
  const c = L === "en"
    ? "LTM = trailing 12-month denominator (factual); NTM = next-12-month forecast. Trap: mixing the target's LTM with peers' NTM"
    : "LTM = denominator historis 12 bulan (faktual); NTM = forecast 12 bulan ke depan. Jebakan: campur LTM target dengan NTM peer";
  const o = L === "en" ? [
    "They are the same", c, "NTM is always higher", "LTM must never be used"
  ] : [
    "Sama saja", c, "NTM selalu lebih tinggi", "LTM tidak boleh dipakai"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `LTM vs NTM multiples: the difference and the trap?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `LTM is factual vs NTM is expected — different things. Comparing the target's LTM EV/EBITDA (8x) with peers' NTM (10x) = mixing fact with hope. Align the basis first. (${ref})`,
    steps: ["Analysis: what time does each denominator cover?",
      "Solve 1: LTM — the last 12 months, factual.",
      "Solve 2: NTM — the next 12 months, a forecast.",
      "Solve 3: never compare the target's LTM with peers' NTM — align the basis."]
  };
  return {
    q: `Multiple LTM vs NTM: bedanya dan jebakannya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `LTM faktual vs NTM ekspektasi — dua hal berbeda. Membandingkan EV/EBITDA LTM target (8x) dengan NTM peer (10x) = campur fakta dengan harapan. Samakan basisnya dulu. (${ref})`,
    steps: ["Analysis: periode waktu apa yang dicakup tiap denominator?",
      "Solve 1: LTM — 12 bulan terakhir, faktual.",
      "Solve 2: NTM — 12 bulan ke depan, forecast.",
      "Solve 3: jangan bandingkan LTM target dengan NTM peer — samakan basisnya."]
  };
}
function vB2DebtTranches(rng, ref, L){
  const tl = b2step(rng, 30000, 40000, 2000), r1 = 8, mz = b2step(rng, 4000, 6000, 1000), r2 = 12;
  const i1 = Math.round(tl * r1 / 100), i2 = Math.round(mz * r2 / 100), tot = i1 + i2;
  const vals = [tot, i1, tot + i2, Math.round((tl + mz) * 0.08)];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Interest: TL Rp${b2e(tl)}k @${r1}% + mezzanine Rp${b2e(mz)}k @${r2}%. Total year-1 interest?`,
    opts: order.map(i => "Rp" + b2e(vals[i]) + "k"),
    answer: order.indexOf(0),
    explain: `${b2e(i1)} + ${b2e(i2)} = ${b2e(tot)}. Each tranche has its rate — sum them, do not average. ${b2e(i1)} = forgot the mezzanine. (${ref})`,
    steps: ["Analysis: two tranches, two rates — compute each, then add.",
      `Solve 1: TL interest = ${b2e(tl)} × ${r1}% = ${b2e(i1)}.`,
      `Solve 2: mezzanine interest = ${b2e(mz)} × ${r2}% = ${b2e(i2)}.`,
      `Solve 3: total = ${b2e(i1)} + ${b2e(i2)} = ${b2e(tot)}.`]
  };
  return {
    q: `Bunga: TL Rp${b2i(tl)} ribu @${r1}% + mezzanine Rp${b2i(mz)} ribu @${r2}%. Total bunga tahun-1?`,
    opts: order.map(i => "Rp" + b2i(vals[i]) + " ribu"),
    answer: order.indexOf(0),
    explain: `${b2i(i1)} + ${b2i(i2)} = ${b2i(tot)}. Tiap tranche punya tarifnya — jumlahkan, jangan rata-rata. ${b2i(i1)} = mezzanine dilupakan. (${ref})`,
    steps: ["Analysis: dua tranche, dua tarif — hitung masing-masing, lalu jumlahkan.",
      `Solve 1: bunga TL = ${b2i(tl)} × ${r1}% = ${b2i(i1)}.`,
      `Solve 2: bunga mezzanine = ${b2i(mz)} × ${r2}% = ${b2i(i2)}.`,
      `Solve 3: total = ${b2i(i1)} + ${b2i(i2)} = ${b2i(tot)}.`]
  };
}
function vB2AmortSweep(rng, ref, L){
  const tl = b2step(rng, 30000, 42000, 6000), pct = 10, cash = b2step(rng, 4500, 6500, 500);
  const mand = Math.round(tl * pct / 100), opt = cash - mand;
  const c = L === "en"
    ? `${b2e(mand)} mandatory + ${b2e(opt)} optional (sweep)`
    : `${b2i(mand)} wajib + ${b2i(opt)} optional (sweep)`;
  const o = L === "en" ? [
    c, `${b2e(cash)} all mandatory`, `${b2e(mand)} only, keep the rest`, `Pay nothing`
  ] : [
    c, `${b2i(cash)} semua wajib`, `${b2i(mand)} saja, sisa ditahan`, `Tidak bayar`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `TL Rp${b2e(tl)}k, mandatory amortization ${pct}%/year. Cash available to debt Rp${b2e(cash)}k. Payment?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Mandatory = ${b2e(mand)}; the ${b2e(opt)} remainder = optional prepayment (cash sweep). '${b2e(mand)} only' wastes deleveraging — cash idles while ${b2e(8)}% interest runs. LBO structure: mandatory first, sweep the rest. (${ref})`,
    steps: ["Analysis: mandatory first, sweep the remainder.",
      `Solve 1: mandatory = ${pct}% × ${b2e(tl)} = ${b2e(mand)}.`,
      `Solve 2: cash available ${b2e(cash)} − mandatory ${b2e(mand)} = ${b2e(opt)} optional.`,
      "Solve 3: sweep the rest — idle cash while interest runs is wasted deleveraging."]
  };
  return {
    q: `TL Rp${b2i(tl)} ribu, amortisasi wajib ${pct}%/tahun. Kas tersedia ke utang Rp${b2i(cash)} ribu. Pembayaran?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Wajib = ${b2i(mand)}; sisa ${b2i(opt)} = optional prepayment (cash sweep). '${b2i(mand)} saja' menyia-nyiakan deleverage — kas menganggur sementara bunga 8% berjalan. Struktur LBO: wajib dulu, sweep sisanya. (${ref})`,
    steps: ["Analysis: wajib dulu, sweep sisanya.",
      `Solve 1: wajib = ${pct}% × ${b2i(tl)} = ${b2i(mand)}.`,
      `Solve 2: kas tersedia ${b2i(cash)} − wajib ${b2i(mand)} = ${b2i(opt)} optional.`,
      "Solve 3: sweep sisanya — kas menganggur sementara bunga berjalan adalah deleverage yang terbuang."]
  };
}
function vB2DivRecap(rng, ref, L){
  const X = b2step(rng, 6000, 10000, 1000), yr = b2pick([3, 4], rng);
  const c = L === "en"
    ? "MoIC UNCHANGED (same total cash back; only timing shifts) — IRR rises; leverage & risk rise"
    : "MoIC TETAP (total kas kembali sama; yang berubah hanya timing) — IRR naik; leverage & risiko naik";
  const o = L === "en" ? [
    "MoIC rises and IRR rises — cash returns earlier", c, "MoIC falls; IRR unchanged", "No impact on either"
  ] : [
    "MoIC naik dan IRR naik — kas kembali lebih awal", c, "MoIC turun; IRR tetap", "Tidak ada dampak ke keduanya"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Dividend recap: Rp${b2e(X)}k of new debt drawn for a sponsor dividend in year ${yr}. Impact on MoIC & IRR?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `MoIC is blind to timing: the ${b2e(X)} dividend in year ${yr} + a smaller exit proceed (the ${b2e(X)} of debt is still on the company) = the SAME total cash to sponsor → MoIC unchanged (before interest/fees on the new debt). What rises is IRR — cash comes back earlier. Lesson: MoIC without a timeline is half the story; recaps shift risk to lenders. (${ref})`,
    steps: ["Analysis: a recap moves cash in TIME, not in total.",
      `Solve 1: dividend ${b2e(X)} in year ${yr} — cash to sponsor earlier.`,
      `Solve 2: exit proceeds fall by the same ${b2e(X)} (the debt stays on the company).`,
      "Solve 3: total cash unchanged → MoIC unchanged; earlier cash → IRR up; leverage up."]
  };
  return {
    q: `Dividend recap: utang baru Rp${b2i(X)} ribu ditarik untuk dividen ke sponsor di tahun-${yr}. Dampak ke MoIC & IRR?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `MoIC buta terhadap waktu: dividen ${b2i(X)} di tahun-${yr} + hasil exit yang lebih kecil (utang ${b2i(X)} masih menempel di perusahaan) = total kas ke sponsor SAMA → MoIC tetap (sebelum bunga/biaya utang baru). Yang naik adalah IRR — kas kembali lebih awal. Pelajaran: MoIC tanpa timeline = setengah cerita; recap memindahkan risiko ke kreditur. (${ref})`,
    steps: ["Analysis: recap menggeser kas dalam WAKTU, bukan dalam total.",
      `Solve 1: dividen ${b2i(X)} di tahun-${yr} — kas ke sponsor lebih awal.`,
      `Solve 2: hasil exit turun sebesar ${b2i(X)} yang sama (utang tetap di perusahaan).`,
      "Solve 3: total kas sama → MoIC tetap; kas lebih awal → IRR naik; leverage naik."]
  };
}
function vB2FlexRole(rng, ref, L){
  const c = L === "en"
    ? "Recasts the budget at actual volume, separating price variance from volume variance"
    : "Menghitung ulang budget pada volume aktual, sehingga variansi harga terpisah dari variansi volume";
  const o = L === "en" ? [
    c, "Raises the budget", "Replaces the forecast", "Erases variance"
  ] : [
    c, "Menaikkan budget", "Mengganti forecast", "Menghapus variansi"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `What is the role of a flexible budget in variance analysis?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `A flexible budget recasts the budget at actual volume. Without it, revenue variance mixes 'sold more' with 'sold dearer' — two different problems. (${ref})`,
    steps: ["Analysis: why flex the budget at all?",
      "Solve 1: static budget compares actuals at actual volume vs budget at BUDGET volume.",
      "Solve 2: flexing re-states the budget at ACTUAL volume.",
      "Solve 3: now the leftover variance is price only — volume is isolated."]
  };
  return {
    q: `Fungsi flexible budget dalam analisis variansi?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Flexible budget = budget yang dihitung ulang pada volume aktual. Tanpa ini, variansi revenue mencampur 'jual lebih banyak' dengan 'jual lebih mahal' — dua masalah berbeda. (${ref})`,
    steps: ["Analysis: kenapa budget perlu di-flex?",
      "Solve 1: budget statis membandingkan aktual di volume AKTUAL vs budget di volume BUDGET.",
      "Solve 2: flexing menyusun ulang budget di volume AKTUAL.",
      "Solve 3: kini sisa variansi murni harga — volume terisolasi."]
  };
}
function vB2CapexDepr(rng, ref, L){
  const g = b2pick([2, 3, 5], rng);
  const c = L === "en"
    ? `A simplification for g ≈ 0; for consistent g > 0: net reinvestment = (g ÷ ROIC) × NOPAT, so capex > depreciation`
    : `Ini penyederhanaan untuk g ≈ 0; untuk g > 0 yang konsisten: reinvestasi neto = (g ÷ ROIC) × NOPAT, jadi capex > depresiasi`;
  const o = L === "en" ? [
    "Valid generally for all g", c, "Capex must be zero in perpetuity", "Depreciation must be zero in perpetuity"
  ] : [
    "Berlaku umum untuk semua g", c, "Capex harus nol di perpetuitas", "Depresiasi harus nol di perpetuitas"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Perpetuity TV uses capex = depreciation with a small g (${g}%). The honest qualification?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Capex = depreciation means ZERO net reinvestment — consistent only with g = 0. For a consistent g > 0, the firm must reinvest (g ÷ ROIC) × NOPAT yearly, so capex > depreciation. Practitioners often use capex = D&A as a simplification when g is small — but it is a simplification, not a law. What is truly inconsistent is g > 0 with NO reinvestment: claiming free growth. (${ref})`,
    steps: ["Analysis: what does capex = depreciation actually assume?",
      "Solve 1: capex = D&A → net reinvestment = 0.",
      "Solve 2: zero net reinvestment sustains g = 0 only.",
      `Solve 3: for g = ${g}% to be consistent, reinvest (g ÷ ROIC) × NOPAT every year → capex > D&A.`]
  };
  return {
    q: `TV perpetuitas memakai capex = depresiasi dengan g kecil (${g}%). Kualifikasi jujur dari asumsi ini?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Capex = depresiasi berarti reinvestasi neto NOL — konsisten hanya dengan g = 0. Untuk g > 0 yang konsisten, perusahaan harus menginvestasikan (g ÷ ROIC) × NOPAT tiap tahun, jadi capex > depresiasi. Praktisi sering memakai capex = D&A sebagai penyederhanaan saat g kecil — tetapi itu penyederhanaan, bukan hukum. Yang inkonsisten justru g > 0 TANPA reinvestasi: mengklaim pertumbuhan gratis. (${ref})`,
    steps: ["Analysis: apa sebenarnya yang diasumsikan capex = depresiasi?",
      "Solve 1: capex = D&A → reinvestasi neto = 0.",
      "Solve 2: reinvestasi neto nol hanya menopang g = 0.",
      `Solve 3: agar g = ${g}% konsisten, investasikan (g ÷ ROIC) × NOPAT tiap tahun → capex > D&A.`]
  };
}
function vB2CashDealAccr(rng, ref, L){
  const pe = b2pick([12, 14, 16], rng), kd = b2pick([5, 6], rng), t = 22;
  const yld = Math.round(100 / pe * 100) / 100, afterTax = Math.round(kd * (1 - t / 100) * 100) / 100;
  const c = L === "en"
    ? `Accretive: target earnings yield ${b2e(yld, 2)}% > after-tax debt cost ${b2e(afterTax, 2)}%`
    : `Akretif: earnings yield target ${b2i(yld, 2)}% > biaya utang setelah pajak ${b2i(afterTax, 2)}%`;
  const o = L === "en" ? [
    "Certainly dilutive — there is interest", c, "Neutral", "Cannot be determined"
  ] : [
    "Pasti dilutif — ada bunga", c, "Netral", "Tidak bisa ditentukan"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `All-cash deal funded by debt @${kd}%. Target P/E ${pe}x, tax rate ${t}%. Accretion/dilution (ignore synergies)?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Earnings yield 1/${pe} = ${b2e(yld, 2)}% vs after-tax debt cost ${kd}% × (1−${t}%) = ${b2e(afterTax, 2)}%. The earnings bought (${b2e(yld, 2)}%) exceed the funding cost (${b2e(afterTax, 2)}%) → accretive. Quick cash-deal rule: compare yield vs after-tax cost of debt. (${ref})`,
    steps: ["Analysis: cash deal — compare what the earnings yield vs what the debt costs.",
      `Solve 1: earnings yield = 1 ÷ ${pe} = ${b2e(yld, 2)}%.`,
      `Solve 2: after-tax debt cost = ${kd}% × (1 − ${t}%) = ${b2e(afterTax, 2)}%.`,
      `Solve 3: ${b2e(yld, 2)}% > ${b2e(afterTax, 2)}% → the bought earnings cover the funding cost → accretive.`]
  };
  return {
    q: `Deal all-cash didanai utang @${kd}%. P/E target ${pe}x, tarif pajak ${t}%. Akrisi/dilusi (abaikan sinergi)?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Earnings yield 1/${pe} = ${b2i(yld, 2)}% vs biaya utang setelah pajak ${kd}% × (1−${t}%) = ${b2i(afterTax, 2)}%. Laba yang dibeli (${b2i(yld, 2)}%) lebih besar dari biaya dananya (${b2i(afterTax, 2)}%) → akretif. Rumus cepat deal kas: bandingkan yield vs after-tax cost of debt. (${ref})`,
    steps: ["Analysis: deal kas — bandingkan yield laba vs biaya utang.",
      `Solve 1: earnings yield = 1 ÷ ${pe} = ${b2i(yld, 2)}%.`,
      `Solve 2: biaya utang setelah pajak = ${kd}% × (1 − ${t}%) = ${b2i(afterTax, 2)}%.`,
      `Solve 3: ${b2i(yld, 2)}% > ${b2i(afterTax, 2)}% → laba yang dibeli menutup biaya dana → akretif.`]
  };
}
function vB2ZBB(rng, ref, L){
  const c = L === "en"
    ? "Every period built from ZERO — each line re-justified, not from last year's baseline"
    : "Setiap periode disusun dari NOL — tiap pos harus dijustifikasi ulang, bukan dari baseline tahun lalu";
  const o = L === "en" ? [
    "Budget = last year +10%", c, "No budget at all", "Budget for costs only"
  ] : [
    "Budget = tahun lalu +10%", c, "Tanpa budget sama sekali", "Budget hanya untuk cost"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The zero-based budgeting (ZBB) concept?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `ZBB: every budget line must be justified from zero each period — killing 'last year + x%' that perpetuates waste. Expensive (time), but effective at cutting fat. (${ref})`,
    steps: ["Analysis: what is the 'zero' in zero-based?",
      "Solve 1: every line starts at zero — no inherited baseline.",
      "Solve 2: each line must be re-justified from scratch.",
      "Solve 3: that kills 'last year + x%' budgeting that carries waste forward."]
  };
  return {
    q: `Konsep zero-based budgeting (ZBB)?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `ZBB: tiap pos budget harus dijustifikasi dari nol setiap periode — membunuh 'budget tahun lalu + x%' yang melanggengkan pemborosan. Mahal (waktu), tapi ampuh memangkas lemak. (${ref})`,
    steps: ["Analysis: apa 'nol' dalam zero-based?",
      "Solve 1: tiap pos mulai dari nol — tanpa baseline warisan.",
      "Solve 2: tiap pos harus dijustifikasi ulang dari awal.",
      "Solve 3: itu membunuh budgeting 'tahun lalu + x%' yang membawa pemborosan ke depan."]
  };
}
function vB2StockSplit(rng, ref, L){
  const ratio = b2pick(["2:1", "3:1"], rng);
  const c = L === "en"
    ? "No value change — just shares × " + ratio.split(":")[0] + " (price per share ÷ " + ratio.split(":")[0] + "); nothing hits the 3 statements"
    : "Nilai tidak berubah — hanya jumlah saham × " + ratio.split(":")[0] + " (harga per saham ÷ " + ratio.split(":")[0] + "); nihil ke 3 laporan";
  const o = L === "en" ? [
    "Equity rises " + ratio.split(":")[0] + "x", c, "Cash increases", "Retained earnings fall"
  ] : [
    "Ekuitas naik " + ratio.split(":")[0] + "x", c, "Kas bertambah", "Laba ditahan turun"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Stock split ${ratio} (each share becomes ${ratio.split(":")[0]}). The financial-statement trail?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `A split changes nothing of value — just denomination: shares ×${ratio.split(":")[0]}, price ÷${ratio.split(":")[0]}. Nothing hits the 3 statements (footnote & share count only). Answering 'equity rises' confuses a split with a new share issue. (${ref})`,
    steps: ["Analysis: does a split create value or just re-denominate it?",
      `Solve 1: shares ×${ratio.split(":")[0]}, price per share ÷${ratio.split(":")[0]} — market cap unchanged.`,
      "Solve 2: no cash moves, no earnings change.",
      "Solve 3: nothing hits the 3 statements — only the share count and footnotes."]
  };
  return {
    q: `Stock split ${ratio} (tiap 1 saham jadi ${ratio.split(":")[0]}). Jejak ke laporan keuangan?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Split tidak mengubah nilai — hanya denominasi: saham ×${ratio.split(":")[0]}, harga ÷${ratio.split(":")[0]}. Nihil ke 3 laporan (hanya catatan kaki & jumlah saham). Yang menjawab 'ekuitas naik' mencampur split dengan penerbitan saham baru. (${ref})`,
    steps: ["Analysis: apakah split menciptakan nilai atau hanya mengganti denominasi?",
      `Solve 1: saham ×${ratio.split(":")[0]}, harga per saham ÷${ratio.split(":")[0]} — market cap tidak berubah.`,
      "Solve 2: tidak ada kas bergerak, tidak ada laba berubah.",
      "Solve 3: nihil ke 3 laporan — hanya jumlah saham dan catatan kaki."]
  };
}
function vB2XLookupApprox(rng, ref, L){
  const c = L === "en"
    ? "VLOOKUP without FALSE/0 can return a wrong 'nearest' row — silent error; XLOOKUP is safe by default"
    : "VLOOKUP tanpa FALSE/0 bisa me-return baris 'terdekat' yang salah — silent error; XLOOKUP aman default";
  const o = L === "en" ? [
    "No trap", c, "XLOOKUP is slower", "Both are the same"
  ] : [
    "Tidak ada", c, "XLOOKUP lebih lambat", "Keduanya sama"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `XLOOKUP defaults to exact match; VLOOKUP to approximate. The trap?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `VLOOKUP's default approximate match: without FALSE it returns a 'nearest match' — silently wrong on unsorted data. XLOOKUP defaults to exact: no hit → #N/A (honest). Always write the match argument explicitly. (${ref})`,
    steps: ["Analysis: what does each function do when there is no exact hit?",
      "Solve 1: VLOOKUP default — approximate: returns the 'nearest' row, silently wrong.",
      "Solve 2: XLOOKUP default — exact: no hit → #N/A, honestly wrong.",
      "Solve 3: always write the match argument explicitly — never rely on defaults."]
  };
  return {
    q: `XLOOKUP default exact match; VLOOKUP default approximate. Jebakannya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `VLOOKUP default approximate match: tanpa FALSE ia me-return 'kecocokan terdekat' — salah diam-diam kalau data tidak terurut. XLOOKUP default exact: tidak ketemu → #N/A (jujur). Selalu tulis argumen match-nya eksplisit. (${ref})`,
    steps: ["Analysis: apa yang dilakukan tiap fungsi saat tidak ada kecocokan persis?",
      "Solve 1: VLOOKUP default — approximate: me-return baris 'terdekat', salah diam-diam.",
      "Solve 2: XLOOKUP default — exact: tidak ketemu → #N/A, salah dengan jujur.",
      "Solve 3: selalu tulis argumen match eksplisit — jangan andalkan default."]
  };
}
function vB2DebtFormula(rng, ref, L){
  const c = `=MAX(utang_awal−kas_ke_utang,0)`;
  const o = [
    c, `=utang_awal−kas_ke_utang (tanpa MAX)`, `=MIN(utang_awal−kas_ke_utang,0)`, `=ABS(utang_awal−kas_ke_utang)`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Debt schedule: the correct ending-debt formula?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `=MAX(beginning_debt−cash,0): pay down to zero, the rest becomes cash. Without MAX the model can show negative debt — the bank paying the company — and that error flows into next year's interest. (${ref})`,
    steps: ["Analysis: what stops debt from going negative?",
      "Solve 1: raw ending debt = beginning − cash to debt.",
      "Solve 2: wrap it in MAX(..., 0) — the floor.",
      "Solve 3: without MAX, negative debt flows into next year's interest and corrupts it."]
  };
  return {
    q: `Jadwal utang: rumus utang akhir yang benar?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `=MAX(utang_awal−kas,0): bayar sampai nol, sisa jadi kas. Tanpa MAX, model bisa menampilkan utang negatif — bank membayar perusahaan — dan error itu mengalir ke bunga tahun berikutnya. (${ref})`,
    steps: ["Analysis: apa yang mencegah utang jadi negatif?",
      "Solve 1: utang akhir mentah = utang awal − kas ke utang.",
      "Solve 2: bungkus dengan MAX(..., 0) — floor-nya.",
      "Solve 3: tanpa MAX, utang negatif mengalir ke bunga tahun depan dan merusaknya."]
  };
}
function vB2LETAdv(rng, ref, L){
  const c = L === "en"
    ? "Readability & audit: g defined once, used many times — change in one place, consistent everywhere"
    : "Keterbacaan & audit: g didefinisikan sekali, dipakai berkali-kali — ubah di satu tempat, konsisten di semua";
  const o = L === "en" ? [
    "No advantage", c, "Faster calculation", "Mandatory for models"
  ] : [
    "Tidak ada", c, "Lebih cepat hitung", "Wajib untuk model"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `=LET(g,B2, rev*(1+g)^5). The advantage over writing it raw?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `LET names variables inside the formula: g defined once at B2, used repeatedly without layered $ refs. Change one place — consistent. For long 5-year formulas, this separates auditable models from unauditable ones. (${ref})`,
    steps: ["Analysis: what does naming a sub-calculation buy you?",
      "Solve 1: LET defines g once, then reuses it.",
      "Solve 2: one change point — no hunting through five copies of the same logic.",
      "Solve 3: the formula reads like a sentence, not a puzzle — auditable."]
  };
  return {
    q: `=LET(g,B2, rev*(1+g)^5). Keuntungannya vs menulis langsung?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `LET menamai variabel di dalam rumus: g didefinisikan sekali di B2, dipakai berkali-kali tanpa $ berlapis. Ubah di satu tempat — konsisten. Untuk rumus 5-tahun yang panjang, ini pembeda model yang bisa diaudit vs tidak. (${ref})`,
    steps: ["Analysis: apa untungnya menamai sub-hitung?",
      "Solve 1: LET mendefinisikan g sekali, lalu memakainya berulang.",
      "Solve 2: satu titik perubahan — tidak berburu lima salinan logika yang sama.",
      "Solve 3: rumus terbaca seperti kalimat, bukan teka-teki — bisa diaudit."]
  };
}
function vB2Iterative(rng, ref, L){
  const c = L === "en"
    ? "Reject: fix to beginning-debt interest; iterative masks a fragile circular that may not converge"
    : "Tolak: perbaiki ke bunga dari utang AWAL; iterative menyembunyikan circular yang rapuh & bisa tidak konvergen";
  const o = L === "en" ? [
    "OK — the result comes out", c, "Add more iterations", "Shrink the interest"
  ] : [
    "OK — hasilnya keluar", c, "Tambah iterasi", "Kecilkan bunga"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Circular LBO model: interest on ending debt → iterative calculation switched on 'to make it run'. Your call?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Iterative calculation covers up the circular reference instead of fixing it — it can fail to converge or converge wrongly with no warning. Standard: beginning-debt interest = no circular at all. (${ref})`,
    steps: ["Analysis: does iteration FIX the circle or HIDE it?",
      "Solve 1: iteration hides it — the formula still references itself.",
      "Solve 2: it can fail to converge, or converge to a wrong number silently.",
      "Solve 3: the fix is structural — interest on BEGINNING debt removes the circle entirely."]
  };
  return {
    q: `Model LBO circular: bunga dari utang akhir → iterative calculation dinyalakan 'agar jalan'. Sikapmu?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Iterative calculation menutupi circular reference, bukan memperbaikinya — bisa tidak konvergen atau konvergen ke angka salah tanpa warning. Standar: bunga dari utang awal = tanpa circular sama sekali. (${ref})`,
    steps: ["Analysis: apakah iterasi MEMPERBAIKI lingkaran atau MENYEMBUNYIKANNYA?",
      "Solve 1: iterasi menyembunyikannya — rumus tetap me-referensi dirinya sendiri.",
      "Solve 2: bisa gagal konvergen, atau konvergen ke angka salah diam-diam.",
      "Solve 3: perbaikannya struktural — bunga dari utang AWAL menghilangkan lingkaran sepenuhnya."]
  };
}
function vB2VlookupNA(rng, ref, L){
  const c = L === "en"
    ? `=IFERROR(XLOOKUP(lookup,range,return),"check data") — plus check spaces/data types in the lookup value`
    : `=IFERROR(XLOOKUP(lookup,range,return),"cek data") — plus cek spasi/tipe data di lookup value`;
  const o = L === "en" ? [
    "Retype the data", c, "Ignore it", "Use HLOOKUP"
  ] : [
    "Ketik ulang datanya", c, "Abaikan", "Pakai HLOOKUP"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Repeated VLOOKUP #N/A though the data exists. The tidiest fix?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `The most common #N/A causes: trailing spaces ('2025 ' vs '2025') or text-vs-number. IFERROR gives a tidy message; XLOOKUP's exact-default avoids VLOOKUP's approximate trap. Fix the source, do not mask the error. (${ref})`,
    steps: ["Analysis: the data IS there — so why #N/A?",
      "Solve 1: check the lookup value — trailing spaces or text-vs-number are the usual culprits.",
      "Solve 2: XLOOKUP exact-default avoids the approximate-match trap.",
      "Solve 3: IFERROR gives a readable message — and fix the source data, do not mask it."]
  };
  return {
    q: `VLOOKUP berulang #N/A padahal datanya ada. Perbaikan paling rapi?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Penyebab #N/A tersering: spasi ('2025 ' vs '2025') atau teks-vs-angka. IFERROR memberi pesan rapi; XLOOKUP exact-default menghindari jebakan approximate VLOOKUP. Perbaiki sumbernya, jangan tutupi errornya. (${ref})`,
    steps: ["Analysis: datanya ADA — kenapa #N/A?",
      "Solve 1: cek lookup value — spasi di ujung atau teks-vs-angka adalah biang usual.",
      "Solve 2: XLOOKUP exact-default menghindari jebakan approximate-match.",
      "Solve 3: IFERROR memberi pesan yang terbaca — dan perbaiki data sumbernya, jangan tutupi."]
  };
}
function vB2MoS(rng, ref, L){
  const base = b2step(rng, 60000, 80000, 5000), bear = Math.round(base * 0.68 / 1000) * 1000, mkt = Math.round((base + bear) / 2 / 1000) * 1000;
  const c = L === "en"
    ? `Fragile: in the bear case (${b2e(bear)} < ${b2e(mkt)}) margin of safety is NEGATIVE — the thesis only lives if the bear never happens`
    : `Rapuh: di bear case (${b2i(bear)} < ${b2i(mkt)}) margin of safety NEGATIF — thesis hanya hidup jika bear tidak terjadi`;
  const o = L === "en" ? [
    "Valid — base beats market", c, "Buy more", "Sell"
  ] : [
    "Valid — base di atas pasar", c, "Beli lebih banyak", "Jual"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Base EV Rp${b2e(base)}k, bear Rp${b2e(bear)}k. Market price Rp${b2e(mkt)}k. Thesis 'buy because base > market'?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `In the bear case you pay ${b2e(mkt)} for ${b2e(bear)} of value = a ${b2e(mkt - bear)} loss. A 'base > market' thesis is fragile when the bear has material probability. Honest margin of safety is measured from the bear, not the base. (${ref})`,
    steps: ["Analysis: measure the margin of safety from the BEAR, not the base.",
      `Solve 1: bear value ${b2e(bear)} vs market price ${b2e(mkt)}.`,
      `Solve 2: bear-case loss = ${b2e(mkt)} − ${b2e(bear)} = ${b2e(mkt - bear)}.`,
      "Solve 3: if the bear is plausible, the thesis is fragile — base > market is not enough."]
  };
  return {
    q: `Base EV Rp${b2i(base)} ribu, bear Rp${b2i(bear)} ribu. Harga pasar Rp${b2i(mkt)} ribu. Thesis 'beli karena base > pasar'?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Di bear, kamu membayar ${b2i(mkt)} untuk barang ${b2i(bear)} = rugi ${b2i(mkt - bear)}. Thesis 'base > pasar' rapuh jika bear punya probabilitas material. Margin of safety yang jujur diukur dari bear, bukan base. (${ref})`,
    steps: ["Analysis: ukur margin of safety dari BEAR, bukan base.",
      `Solve 1: nilai bear ${b2i(bear)} vs harga pasar ${b2i(mkt)}.`,
      `Solve 2: rugi di bear = ${b2i(mkt)} − ${b2i(bear)} = ${b2i(mkt - bear)}.`,
      "Solve 3: bila bear masuk akal, thesis rapuh — base > pasar saja tidak cukup."]
  };
}
function vB2ExitVsGrowth(rng, ref, L){
  const c = L === "en"
    ? "Exit multiple — it bites directly through TV at ~70% of EV; growth works via 5-year compounding with more spread-out effects"
    : "Exit multiple — menggigit langsung via TV yang ~70% EV; growth via compounding 5 tahun yang efeknya lebih tersebar";
  const o = L === "en" ? [
    "Growth — always", c, "Equal", "Cannot be compared"
  ] : [
    "Growth — selalu", c, "Sama", "Tidak bisa dibandingkan"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `In an LBO model (TV ≈ 70% of EV, debt repaid by year 5): sensitivity of exit multiple ±1x vs growth ±2%. Which bites EV harder, and why?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `A ±1x exit multiple on 70%-of-EV TV = a ±~10% EV swing directly. ±2% growth spreads through 5-year compounding + deleveraging — big too, but a less direct channel. This holds for this model; with different leverage/structure the ranking can flip — always run your own sensitivity, never memorize rankings. (${ref})`,
    steps: ["Analysis: which channel to EV is more direct?",
      "Solve 1: exit multiple hits TV directly — and TV is ~70% of EV.",
      "Solve 2: growth works indirectly — 5 years of compounding + deleveraging.",
      "Solve 3: direct beats indirect here — but re-test for every model; rankings flip with structure."]
  };
  return {
    q: `Dalam model LBO (TV ≈ 70% EV, utang lunas tahun-5): sensitivitas exit multiple ±1x vs growth ±2%. Mana lebih menggigit EV dan kenapa?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Exit multiple ±1x pada TV 70% EV = ayunan ± ~10% EV langsung. Growth ±2% tersebar via compounding 5 tahun + deleverage — besar juga, tapi channel-nya tidak selangsung multiple. Berlaku untuk model ini; pada model dengan leverage/struktur berbeda, urutannya bisa terbalik — selalu uji sensitivitas sendiri, jangan hafal urutan. (${ref})`,
    steps: ["Analysis: channel mana ke EV yang lebih langsung?",
      "Solve 1: exit multiple menghantam TV langsung — dan TV ~70% EV.",
      "Solve 2: growth bekerja tidak langsung — compounding 5 tahun + deleverage.",
      "Solve 3: langsung mengalahkan tidak langsung di sini — tapi uji ulang tiap model; urutan bisa terbalik."]
  };
}
function vB2GoodwillTreat(rng, ref, L){
  const price = b2step(rng, 40000, 60000, 10000), book = b2step(rng, 20000, 35000, 5000);
  const gw = price - book;
  const c = L === "en"
    ? `Goodwill ${b2e(gw)}; NOT amortized — annual impairment test`
    : `Goodwill ${b2i(gw)}; TIDAK diamortisasi — impairment test tahunan`;
  const o = L === "en" ? [
    `Goodwill ${b2e(gw)}; amortized over 10 years`, c, `Not goodwill`, `Goodwill ${b2e(book)}`
  ] : [
    `Goodwill ${b2i(gw)}; diamortisasi 10 tahun`, c, `Bukan goodwill`, `Goodwill ${b2i(book)}`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Paid Rp${b2e(price)}k for target equity with book value Rp${b2e(book)}k (assume = fair value of identifiable net assets). Goodwill and treatment?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Goodwill = ${b2e(price)} − ${b2e(book)} = ${b2e(gw)} (valid only under the stated assumption). General IFRS 3 rule: goodwill = price − FAIR VALUE of identifiable net assets, not price − book value. Not amortized — impairment-tested yearly. 'Amortize over 10 years' = a dead rule from stale sources. (${ref})`,
    steps: ["Analysis: price vs identifiable net assets — the gap is goodwill.",
      `Solve 1: goodwill = ${b2e(price)} − ${b2e(book)} = ${b2e(gw)}.`,
      "Solve 2: general rule — use FAIR VALUE of net assets, not book value.",
      "Solve 3: goodwill is NOT amortized — it is impairment-tested every year."]
  };
  return {
    q: `Bayar Rp${b2i(price)} ribu untuk ekuitas target dengan book value Rp${b2i(book)} ribu (asumsikan = nilai wajar aset neto teridentifikasi). Goodwill dan perlakuannya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Goodwill = ${b2i(price)} − ${b2i(book)} = ${b2i(gw)} (hanya sah dengan asumsi di soal). Aturan umum IFRS 3: goodwill = harga − nilai WAJAR aset neto teridentifikasi, bukan harga − book value. Tidak diamortisasi — diuji impairment tiap tahun. 'Diamortisasi 10 tahun' = aturan lama yang sudah tidak berlaku. (${ref})`,
    steps: ["Analysis: harga vs aset neto teridentifikasi — selisihnya goodwill.",
      `Solve 1: goodwill = ${b2i(price)} − ${b2i(book)} = ${b2i(gw)}.`,
      "Solve 2: aturan umum — pakai nilai WAJAR aset neto, bukan book value.",
      "Solve 3: goodwill TIDAK diamortisasi — diuji impairment tiap tahun."]
  };
}

/* ---------- hari-16: M&A ---------- */
function vB2EPS(rng, ref, L){
  const ni = b2step(rng, 6000, 9000, 600), sh = b2step(rng, 12000, 20000, 2000);
  const eps = Math.round(ni / sh * 10000) / 10000;
  /* Distractor ke-4 memakai (ni+2000), BUKAN (ni+1000): saat sh = 2×ni+2000
     (mis. ni=9000, sh=20000) berlaku ni/(sh−2000) = (ni+1000)/sh = 0,5000
     — dua opsi identik. Dengan +2000, kesamaan itu butuh sh = ni+2000,
     mustahil di rentang ini (sh ≥ 12000 > ni+2000 ≤ 11000). */
  const vals = [eps, Math.round(ni / (sh + 2000) * 10000) / 10000, Math.round(ni / (sh - 2000) * 10000) / 10000, Math.round((ni + 2000) / sh * 10000) / 10000];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? b2e4(v) : b2i4(v);
  if (L === "en") return {
    q: `PT Maju Jaya: NI ${b2e(ni)}, ${b2e(sh)} shares. Standalone EPS?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2e(ni)} / ${b2e(sh)} = ${b2e(eps, 4)} — the baseline before the deal. (${ref})`,
    steps: ["Analysis: standalone EPS is the pre-deal baseline.",
      "Solve 1: formula — EPS = NI ÷ shares outstanding.",
      `Solve 2: substitute → ${b2e(ni)} ÷ ${b2e(sh)}.`,
      `Solve 3: compute → ${b2e(eps, 4)}.`]
  };
  return {
    q: `PT Maju Jaya: NI ${b2i(ni)}, ${b2i(sh)} lembar. EPS standalone?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2i(ni)} / ${b2i(sh)} = ${b2i(eps, 4)} — garis dasar sebelum deal. (${ref})`,
    steps: ["Analysis: EPS standalone adalah garis dasar sebelum deal.",
      "Solve 1: rumus — EPS = NI ÷ saham beredar.",
      `Solve 2: substitusi → ${b2i(ni)} ÷ ${b2i(sh)}.`,
      `Solve 3: hitung → ${b2i(eps, 4)}.`]
  };
}
function vB2Goodwill(rng, ref, L){
  const price = b2step(rng, 8000, 12000, 1000);
  let book = b2step(rng, 4000, 7000, 1000);
  // guard: price = 2x book would make goodwill == book (duplicate option)
  for (let t = 0; t < 20 && price - book === book; t++) book = b2step(rng, 4000, 7000, 1000);
  const gw = price - book;
  const vals = [gw, price, book, price + book];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Deal: price ${b2e(price)}, target book equity ${b2e(book)}. Goodwill?`,
    opts: order.map(i => b2e(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2e(price)} − ${b2e(book)} = ${b2e(gw)} — premium over book value, not cash. (${ref})`,
    steps: ["Analysis: goodwill is the price paid ABOVE book value.",
      "Solve 1: formula — Goodwill = Price − Book equity.",
      `Solve 2: substitute → ${b2e(price)} − ${b2e(book)}.`,
      `Solve 3: compute → ${b2e(gw)}.`]
  };
  return {
    q: `Deal: harga ${b2i(price)}, book equity target ${b2i(book)}. Goodwill?`,
    opts: order.map(i => b2i(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2i(price)} − ${b2i(book)} = ${b2i(gw)} — premi di atas nilai buku, bukan kas. (${ref})`,
    steps: ["Analysis: goodwill adalah harga yang dibayar DI ATAS nilai buku.",
      "Solve 1: rumus — Goodwill = Harga − Book equity.",
      `Solve 2: substitusi → ${b2i(price)} − ${b2i(book)}.`,
      `Solve 3: hitung → ${b2i(gw)}.`]
  };
}
function vB2GoodwillPPA(rng, ref, L){
  const price = b2step(rng, 8000, 12000, 1000), fv = price - b2step(rng, 1500, 3000, 250);
  const gw = price - fv;
  /* Distractor ke-2 (price − 4000..5000) bisa sama dengan gw (saat
     price−X = gw, mis. 8000−5000 = 3000) atau dengan gw+500 (saat
     price−X = gw+500, mis. 8000−4500 = 3500 = 3000+500). Yang bertabrakan
     digeser +500 sampai berbeda — by construction, bukan re-roll. */
  let d2 = price - b2step(rng, 4000, 5000, 500);
  while (d2 === gw || d2 === gw + 500 || d2 === gw - 250) d2 += 500;
  const vals = [gw, d2, gw + 500, gw - 250];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? "Rp" + b2e(v) + "k" : "Rp" + b2i(v) + "rb";
  if (L === "en") return {
    q: `Deal: price ${b2e(price)}, FV of identifiable net assets ${b2e(fv)}. PPA goodwill?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2e(price)} − ${b2e(fv)} = Rp${b2e(gw)}k. PPA separates the after-tax write-up out of simple goodwill (price − book value). (${ref})`,
    steps: ["Analysis: PPA goodwill uses FAIR VALUE, not book value.",
      "Solve 1: formula — PPA goodwill = Price − FV of identifiable net assets.",
      `Solve 2: substitute → ${b2e(price)} − ${b2e(fv)}.`,
      `Solve 3: compute → Rp${b2e(gw)}k.`]
  };
  return {
    q: `Deal: harga ${b2i(price)}, FV aset neto teridentifikasi ${b2i(fv)}. Goodwill PPA?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2i(price)} − ${b2i(fv)} = Rp${b2i(gw)}rb. PPA memisahkan write-up bersih pajak dari goodwill sederhana (harga − book value). (${ref})`,
    steps: ["Analysis: goodwill PPA memakai NILAI WAJAR, bukan nilai buku.",
      "Solve 1: rumus — Goodwill PPA = Harga − FV aset neto teridentifikasi.",
      `Solve 2: substitusi → ${b2i(price)} − ${b2i(fv)}.`,
      `Solve 3: hitung → Rp${b2i(gw)}rb.`]
  };
}
function vB2ProFormaNI(rng, ref, L){
  const nia = b2step(rng, 6000, 8000, 600), nib = b2step(rng, 1500, 2500, 300);
  const intr = b2pick([250, 375, 500, 625], rng), tax = 22, afterTax = Math.round(intr * (1 - tax / 100) * 100) / 100;
  const comb = nia + nib, pf = Math.round((comb - afterTax) * 100) / 100;
  const f = v => L === "en" ? b2e(v, 2) : b2i(v, 2);
  const vals = [pf, comb, Math.round((comb - intr) * 100) / 100, Math.round((comb + afterTax) * 100) / 100];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Deal: combined earnings ${b2e(comb)}, after-tax interest ${b2e(afterTax, 2)}. Pro forma NI?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2e(nia)} + ${b2e(nib)} − ${b2e(afterTax, 2)} = ${b2e(pf, 2)}. (${ref})`,
    steps: ["Analysis: pro forma NI = combined earnings minus the NEW interest (after tax).",
      `Solve 1: combined earnings = ${b2e(nia)} + ${b2e(nib)} = ${b2e(comb)}.`,
      `Solve 2: after-tax interest = ${b2e(intr)} × (1 − ${tax}%) = ${b2e(afterTax, 2)}.`,
      `Solve 3: pro forma NI = ${b2e(comb)} − ${b2e(afterTax, 2)} = ${b2e(pf, 2)}.`]
  };
  return {
    q: `Deal: laba gabungan ${b2i(comb)}, bunga after-tax ${b2i(afterTax, 2)}. Pro forma NI?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2i(nia)} + ${b2i(nib)} − ${b2i(afterTax, 2)} = ${b2i(pf, 2)}. (${ref})`,
    steps: ["Analysis: pro forma NI = laba gabungan dikurangi bunga BARU (setelah pajak).",
      `Solve 1: laba gabungan = ${b2i(nia)} + ${b2i(nib)} = ${b2i(comb)}.`,
      `Solve 2: bunga after-tax = ${b2i(intr)} × (1 − ${tax}%) = ${b2i(afterTax, 2)}.`,
      `Solve 3: pro forma NI = ${b2i(comb)} − ${b2i(afterTax, 2)} = ${b2i(pf, 2)}.`]
  };
}
function vB2Accretion(rng, ref, L){
  const std = b2pick([0.4, 0.5, 0.6], rng), pct = b2pick([5.0, 6.2, 7.5], rng);
  const pf = Math.round(std * (1 + pct / 100) * 10000) / 10000;
  const f4 = v => L === "en" ? b2e4(v) : b2i4(v);
  const fp = v => L === "en" ? b2e(v, 1) + "%" : b2i(v, 1) + "%";
  const c = L === "en"
    ? `Accretive +${fp(pct)}`
    : `Akretif +${fp(pct)}`;
  const o = L === "en" ? [
    `Dilutive −${fp(pct)}`, c, "Neutral", "Cannot be concluded"
  ] : [
    `Dilutif −${fp(pct)}`, c, "Netral", "Tidak bisa disimpulkan"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Deal: pro forma EPS ${f4(pf)} vs standalone ${f4(std)}. Verdict?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `${f4(pf)} / ${f4(std)} − 1 = +${fp(pct)} → ACCRETIVE. (But accretion ≠ a good deal.) (${ref})`,
    steps: ["Analysis: compare pro forma EPS with standalone EPS.",
      `Solve 1: ratio = ${f4(pf)} ÷ ${f4(std)} = ${b2e(pf / std, 4)}.`,
      `Solve 2: change = ratio − 1 = +${fp(pct)}.`,
      "Solve 3: positive → accretive. (Accretion is not a verdict that the deal is good.)"]
  };
  return {
    q: `Deal: pro forma EPS ${f4(pf)} vs standalone ${f4(std)}. Vonis?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `${f4(pf)} / ${f4(std)} − 1 = +${fp(pct)} → ACCRETIVE. (Tapi akresi ≠ vonis deal bagus.) (${ref})`,
    steps: ["Analysis: bandingkan EPS pro forma dengan EPS standalone.",
      `Solve 1: rasio = ${f4(pf)} ÷ ${f4(std)} = ${b2i(pf / std, 4)}.`,
      `Solve 2: perubahan = rasio − 1 = +${fp(pct)}.`,
      "Solve 3: positif → akretif. (Akresi bukan vonis bahwa deal itu bagus.)"]
  };
}
function vB2Dilution(rng, ref, L){
  const std = 0.4, ni = b2pick([8000, 9000, 10000], rng), sh = b2step(rng, 22000, 27000, 500);
  const eps = Math.round(ni / sh * 10000) / 10000;
  const pct = Math.round((eps / std - 1) * 1000) / 10;
  const f4 = v => L === "en" ? b2e4(v) : b2i4(v);
  const fp = v => L === "en" ? b2e(Math.abs(v), 1) + "%" : b2i(Math.abs(v), 1) + "%";
  const c = L === "en"
    ? `${f4(eps)} — dilutive −${fp(pct)}`
    : `${f4(eps)} — dilutif −${fp(pct)}`;
  const o = L === "en" ? [
    c, `${f4(eps)} — accretive +${fp(pct)}`, `${f4(Math.round(std * 1.062 * 10000) / 10000)} — accretive`, `${f4(0.5)} — neutral`
  ] : [
    c, `${f4(eps)} — akretif +${fp(pct)}`, `${f4(Math.round(std * 1.062 * 10000) / 10000)} — akretif`, `${f4(0.5)} — netral`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Deal: pro forma NI ${b2e(ni)}, shares ${b2e(sh)}. EPS and verdict?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `${b2e(ni)} / ${b2e(sh)} = ${f4(eps)} < ${f4(std)} → DILUTIVE ${fp(pct)}. (${ref})`,
    steps: ["Analysis: compute pro forma EPS, then compare with standalone.",
      `Solve 1: EPS = ${b2e(ni)} ÷ ${b2e(sh)} = ${f4(eps)}.`,
      `Solve 2: change vs standalone ${f4(std)} = ${f4(eps)} ÷ ${f4(std)} − 1 = −${fp(pct)}.`,
      "Solve 3: negative → dilutive."]
  };
  return {
    q: `Deal: pro forma NI ${b2i(ni)}, shares ${b2i(sh)}. EPS dan vonis?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `${b2i(ni)} / ${b2i(sh)} = ${f4(eps)} < ${f4(std)} → DILUTIVE −${fp(pct)}. (${ref})`,
    steps: ["Analysis: hitung EPS pro forma, lalu bandingkan dengan standalone.",
      `Solve 1: EPS = ${b2i(ni)} ÷ ${b2i(sh)} = ${f4(eps)}.`,
      `Solve 2: perubahan vs standalone ${f4(std)} = ${f4(eps)} ÷ ${f4(std)} − 1 = −${fp(pct)}.`,
      "Solve 3: negatif → dilutif."]
  };
}
function vB2DivBuyback(rng, ref, L){
  const price = b2pick([8, 10, 12, 20], rng), tax = b2pick([10, 15], rng);
  const divVal = Math.round((price - tax / 100) * 100) / 100;
  const f = v => L === "en" ? "Rp" + b2e(v, 2) : "Rp" + b2i(v, 2);
  const c = L === "en"
    ? `Buyback (${f(price)} vs ${f(divVal)})`
    : `Buyback (${f(price)} vs ${f(divVal)})`;
  const o = L === "en" ? [
    c, `Dividend (${f(price)} vs ${f(divVal)})`, "Exactly the same", "Dividends always win"
  ] : [
    c, `Dividen (${f(price)} vs ${f(divVal)})`, "Sama persis", "Dividen selalu menang"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Cash Rp1,000m, 1,000 shares @ Rp${price}, dividend tax ${tax}%. Rp1/share dividend vs buyback — which is better for the holder?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Dividend: ${(1 - tax / 100).toFixed(2)} + ${price - 1} = ${f(divVal)}; buyback: ${f(price)}. Without tax both are ${f(price)} (M-M). Tax makes the buyback win by Rp${b2e(tax / 100, 2)}/share. (${ref})`,
    steps: ["Analysis: Rp1 per share returned two ways — what does the holder keep?",
      `Solve 1: dividend — Rp1 × (1 − ${tax}%) = Rp${b2e(1 - tax / 100, 2)} cash + Rp${price - 1} of remaining value = ${f(divVal)}.`,
      `Solve 2: buyback — sell 1 share's worth at Rp${price}, no dividend tax = ${f(price)}.`,
      `Solve 3: buyback wins by Rp${b2e(tax / 100, 2)}/share — the dividend tax.`]
  };
  return {
    q: `Kas Rp1.000jt, 1.000 saham @ Rp${price}, pajak dividen ${tax}%. Dividen Rp1/saham vs buyback — mana lebih baik bagi pemegang?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Dividen: ${(1 - tax / 100).toFixed(2).replace(".", ",")} + ${price - 1} = ${f(divVal)}; buyback: ${f(price)}. Tanpa pajak keduanya ${f(price)} (M-M). Pajak membuat buyback menang Rp${b2i(tax / 100, 2)}/saham. (${ref})`,
    steps: ["Analysis: Rp1 per saham dikembalikan dua cara — berapa yang disimpan pemegang?",
      `Solve 1: dividen — Rp1 × (1 − ${tax}%) = Rp${b2i(1 - tax / 100, 2)} kas + Rp${price - 1} nilai tersisa = ${f(divVal)}.`,
      `Solve 2: buyback — jual senilai Rp${price}, tanpa pajak dividen = ${f(price)}.`,
      `Solve 3: buyback menang Rp${b2i(tax / 100, 2)}/saham — pajak dividennya.`]
  };
}
function vB2DivSignal(rng, ref, L){
  const c = L === "en"
    ? "A dividend is a promise; a cut is punished by the market"
    : "Dividen adalah janji; pemotongan dihukum pasar";
  const o = L === "en" ? [
    c, "Dividends cannot be changed", "Buybacks are banned after a dividend rise", "Dividend tax rises every year"
  ] : [
    c, "Dividen tidak bisa diubah", "Buyback dilarang setelah dividen naik", "Pajak dividen naik tiap tahun"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Why do companies raise dividends only when confident they can sustain them?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `A dividend is a promise — a cut reads as distress. A buyback is an option that can be stopped quietly. (${ref})`,
    steps: ["Analysis: what signal does a dividend send?",
      "Solve 1: raising the dividend sets an expectation — a promise.",
      "Solve 2: cutting it later signals distress; the market punishes the cut.",
      "Solve 3: buybacks carry no such promise — they can stop quietly."]
  };
  return {
    q: `Kenapa perusahaan menaikkan dividen hanya bila yakin bisa mempertahankannya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Dividen adalah janji — pemotongan dibaca pasar sebagai sinyal kesulitan. Buyback adalah opsi yang bisa dihentikan diam-diam. (${ref})`,
    steps: ["Analysis: sinyal apa yang dikirim dividen?",
      "Solve 1: menaikkan dividen menetapkan ekspektasi — sebuah janji.",
      "Solve 2: memotongnya nanti dibaca sebagai kesulitan; pasar menghukum pemotongan.",
      "Solve 3: buyback tidak membawa janji itu — bisa dihentikan diam-diam."]
  };
}
/* ---------- hari-17: LBO ---------- */
function vB2CashToDebt(rng, ref, L){
  const ni = b2step(rng, 4000, 7000, 100) + 0.4, da = b2step(rng, 1500, 3000, 500), capex = b2step(rng, 2000, 3000, 500);
  const cash = Math.round((ni + da - capex) * 10) / 10;
  const f = v => L === "en" ? b2e(v, 1) : b2i(v, 1);
  const vals = [cash, Math.round((ni + da) * 10) / 10, Math.round((ni - capex) * 10) / 10, Math.round((ni + da + capex) * 10) / 10];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Y1 NI ${f(ni)}; D&A ${f(da)}; capex ${f(capex)}. Cash to debt Y1?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${f(ni)} + ${f(da)} − ${f(capex)} = ${f(cash)} — free cash swept to repay debt. (${ref})`,
    steps: ["Analysis: cash to debt = cash the business frees up in the year.",
      "Solve 1: start from NI, add back non-cash D&A.",
      `Solve 2: subtract capex — cash that must be reinvested.`,
      `Solve 3: ${f(ni)} + ${f(da)} − ${f(capex)} = ${f(cash)}.`]
  };
  return {
    q: `NI Y1 ${f(ni)}; D&A ${f(da)}; capex ${f(capex)}. Kas ke utang Y1?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${f(ni)} + ${f(da)} − ${f(capex)} = ${f(cash)} — kas bebas disapu untuk membayar utang. (${ref})`,
    steps: ["Analysis: kas ke utang = kas yang dibebaskan bisnis di tahun itu.",
      "Solve 1: mulai dari NI, tambah kembali D&A non-kas.",
      "Solve 2: kurangi capex — kas yang harus diinvestasikan kembali.",
      `Solve 3: ${f(ni)} + ${f(da)} − ${f(capex)} = ${f(cash)}.`]
  };
}
function vB2PIK(rng, ref, L){
  const p = b2step(rng, 4000, 8000, 1000), r = b2pick([5, 6, 8], rng);
  const bal = Math.round(p * (1 + r / 100));
  const vals = [bal, p, Math.round(p * (1 + 2 * r / 100)), Math.round(p * (1 - r / 100))];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Mezzanine ${b2e(p)} @${r}% PIK. Balance at end of Year 1?`,
    opts: order.map(i => b2e(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2e(p)} + ${b2e(Math.round(p * r / 100))} = ${b2e(bal)}. PIK defers cash — the principal grows. (${ref})`,
    steps: ["Analysis: PIK interest is not paid in cash — it accretes to principal.",
      `Solve 1: PIK interest = ${b2e(p)} × ${r}% = ${b2e(Math.round(p * r / 100))}.`,
      `Solve 2: ending balance = principal + PIK interest.`,
      `Solve 3: ${b2e(p)} + ${b2e(Math.round(p * r / 100))} = ${b2e(bal)}.`]
  };
  return {
    q: `Mezzanine ${b2i(p)} @${r}% PIK. Saldo akhir Tahun 1?`,
    opts: order.map(i => b2i(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2i(p)} + ${b2i(Math.round(p * r / 100))} = ${b2i(bal)}. PIK menunda kas — pokoknya membesar. (${ref})`,
    steps: ["Analysis: bunga PIK tidak dibayar tunai — menempel ke pokok.",
      `Solve 1: bunga PIK = ${b2i(p)} × ${r}% = ${b2i(Math.round(p * r / 100))}.`,
      "Solve 2: saldo akhir = pokok + bunga PIK.",
      `Solve 3: ${b2i(p)} + ${b2i(Math.round(p * r / 100))} = ${b2i(bal)}.`]
  };
}
function vB2Covenant(rng, ref, L){
  const ebitda = b2step(rng, 80, 150, 10), lev = b2pick([5.8, 6.0, 6.5], rng);
  const debt = Math.round(ebitda * lev / 10) * 10, max = b2pick([5.0, 5.5], rng);
  const levR = Math.round(debt / ebitda * 10) / 10;
  const f = v => L === "en" ? b2e(v, 1) : b2i(v, 1);
  const c = L === "en"
    ? `BREACH (${f(levR)}× > ${f(max)}×)`
    : `BREACH (${f(levR)}× > ${f(max)}×)`;
  const o = L === "en" ? [
    c, `Pass (${f(levR)}× < ${f(max)}×)`, "Pass if coverage is enough", "Cannot be tested without interest"
  ] : [
    c, `Lolos (${f(levR)}× < ${f(max)}×)`, "Lolos bila coverage cukup", "Tidak bisa diuji tanpa bunga"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `LBO: debt Rp${b2e(debt)}m, EBITDA Rp${b2e(ebitda)}m, leverage covenant max ${f(max)}×. Test result?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Leverage = ${b2e(debt)} ÷ ${b2e(ebitda)} = ${f(levR)}× > max ${f(max)}× → BREACH. One breached covenant is enough to trigger renegotiation. (${ref})`,
    steps: ["Analysis: leverage covenant — debt divided by EBITDA vs the max.",
      `Solve 1: leverage = ${b2e(debt)} ÷ ${b2e(ebitda)} = ${f(levR)}×.`,
      `Solve 2: compare with max ${f(max)}×.`,
      "Solve 3: above the max → BREACH, even if other covenants pass."]
  };
  return {
    q: `LBO: utang Rp${b2i(debt)}jt, EBITDA Rp${b2i(ebitda)}jt, covenant leverage maks ${f(max)}×. Hasil uji?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Leverage = ${b2i(debt)} ÷ ${b2i(ebitda)} = ${f(levR)}× > maks ${f(max)}× → BREACH. Satu covenant breach cukup memicu renegosiasi. (${ref})`,
    steps: ["Analysis: covenant leverage — utang dibagi EBITDA vs batas maks.",
      `Solve 1: leverage = ${b2i(debt)} ÷ ${b2i(ebitda)} = ${f(levR)}×.`,
      `Solve 2: bandingkan dengan maks ${f(max)}×.`,
      "Solve 3: di atas maks → BREACH, walau covenant lain lolos."]
  };
}
function vB2Sweep(rng, ref, L){
  let fcf, mand, pct, extra, vals;
  for (let t = 0; t < 50; t++) {
    fcf = b2step(rng, 50, 80, 10); mand = b2step(rng, 10, 30, 10); pct = b2pick([50, 75], rng);
    extra = Math.round((fcf - mand) * pct / 100);
    vals = [extra, Math.round(fcf * pct / 100), fcf - mand, mand];
    if (new Set(vals).size === 4) break;
  }
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? "Rp" + b2e(v) + "m" : "Rp" + b2i(v) + "jt";
  if (L === "en") return {
    q: `FCF Rp${b2e(fcf)}m, mandatory amortization Rp${b2e(mand)}m, cash sweep ${pct}%. Extra prepay?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Sweep = ${pct}% × (${b2e(fcf)} − ${b2e(mand)}) = Rp${b2e(extra)}m → total paydown ${b2e(mand + extra)}m. The sweep speeds deleveraging but locks up cash. (${ref})`,
    steps: ["Analysis: the sweep applies only to FCF AFTER mandatory amortization.",
      `Solve 1: excess FCF = ${b2e(fcf)} − ${b2e(mand)} = ${b2e(fcf - mand)}.`,
      `Solve 2: sweep = ${pct}% × ${b2e(fcf - mand)} = Rp${b2e(extra)}m.`,
      `Solve 3: total paydown = ${b2e(mand)} + ${b2e(extra)} = ${b2e(mand + extra)}m.`]
  };
  return {
    q: `FCF Rp${b2i(fcf)}jt, amortisasi mandatory Rp${b2i(mand)}jt, cash sweep ${pct}%. Prepay tambahan?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Sweep = ${pct}% × (${b2i(fcf)} − ${b2i(mand)}) = Rp${b2i(extra)}jt → total paydown ${b2i(mand + extra)}jt. Sweep mempercepat deleveraging tapi mengunci kas. (${ref})`,
    steps: ["Analysis: sweep hanya berlaku atas FCF SETELAH amortisasi mandatory.",
      `Solve 1: kelebihan FCF = ${b2i(fcf)} − ${b2i(mand)} = ${b2i(fcf - mand)}.`,
      `Solve 2: sweep = ${pct}% × ${b2i(fcf - mand)} = Rp${b2i(extra)}jt.`,
      `Solve 3: total paydown = ${b2i(mand)} + ${b2i(extra)} = ${b2i(mand + extra)}jt.`]
  };
}
function vB2SourcesUsesFee(rng, ref, L){
  const ev = b2step(rng, 30000, 50000, 5000), fee = b2step(rng, 500, 1200, 100);
  const tl = b2step(rng, 18000, 26000, 2000), eq = ev + fee - tl;
  const c = L === "en"
    ? `Sources > uses by Rp${b2e(fee)}k → unbalanced; the fee is real day-1 cash outflow that must be funded`
    : `Sources > uses Rp${b2i(fee)} ribu → tidak balance; fee adalah kas keluar nyata yang harus didanai`;
  const o = L === "en" ? [
    `EV rises by ${b2e(fee)}`, `Equity falls by ${b2e(fee)}`, "No problem, the fee is small", c
  ] : [
    `EV-nya naik ${b2i(fee)}`, `Equity-nya turun ${b2i(fee)}`, "Tidak apa-apa, fee kecil", c
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Sources & uses: EV ${b2e(ev)} + fee ${b2e(fee)} = ${b2e(ev + fee)}; Term Loan ${b2e(tl)} + equity ${b2e(eq)} = ${b2e(ev + fee)}. The fee is forgotten in uses. Consequence?`,
    opts: order.map(i => o[i]), answer: order.indexOf(3),
    explain: `Uses ${b2e(ev)} vs sources ${b2e(ev + fee)} — a ${b2e(fee)} gap. The fee (bankers, legal, notary) is real cash leaving on closing day and must be funded. Forgetting the fee = the model is Rp${b2e(fee)}k short of cash on day 1. (${ref})`,
    steps: ["Analysis: sources must equal uses — find the gap.",
      `Solve 1: true uses = EV + fee = ${b2e(ev)} + ${b2e(fee)} = ${b2e(ev + fee)}.`,
      `Solve 2: sources = ${b2e(tl)} + ${b2e(eq)} = ${b2e(ev + fee)}.`,
      `Solve 3: without the fee, uses = ${b2e(ev)} — sources exceed uses by ${b2e(fee)}: the model is short that cash on day 1.`]
  };
  return {
    q: `Sources & uses: EV ${b2i(ev)} + fee ${b2i(fee)} = ${b2i(ev + fee)}; Term Loan ${b2i(tl)} + equity ${b2i(eq)} = ${b2i(ev + fee)}. Fee transaksi lupa dimasukkan di uses. Akibatnya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(3),
    explain: `Uses ${b2i(ev)} vs sources ${b2i(ev + fee)} — selisih ${b2i(fee)}. Fee (bankir, legal, notaris) adalah kas keluar nyata di hari penutupan dan harus didanai. Lupa fee = model kekurangan kas Rp${b2i(fee)} ribu di hari-1. (${ref})`,
    steps: ["Analysis: sources harus = uses — cari selisihnya.",
      `Solve 1: uses benar = EV + fee = ${b2i(ev)} + ${b2i(fee)} = ${b2i(ev + fee)}.`,
      `Solve 2: sources = ${b2i(tl)} + ${b2i(eq)} = ${b2i(ev + fee)}.`,
      `Solve 3: tanpa fee, uses = ${b2i(ev)} — sources melebihi uses ${b2i(fee)}: model kekurangan kas itu di hari-1.`]
  };
}
function vB2MoICClaim(rng, ref, L){
  const moic = b2pick([2.82, 3.02, 3.22, 3.31], rng), yrs = b2pick([5, 6], rng);
  const gain = Math.round((moic - 1) * 100);
  const f = v => L === "en" ? b2e(v, 2) : b2i(v, 2);
  const c = L === "en"
    ? `Wrong twice: (1) ${f(moic)}x = money multiplied ${f(moic)} → a ${gain}% gain, not ${Math.round(moic * 100)}%; (2) MoIC is time-blind — ${f(moic)}x over ${yrs} years ≠ ${f(moic)}x over ${yrs * 2} years`
    : `Salah dua lapis: (1) ${f(moic)}x = uang jadi ${f(moic)}x lipat → keuntungan ${gain}%, bukan ${Math.round(moic * 100)}%; (2) MoIC buta waktu — ${f(moic)}x dalam ${yrs} tahun ≠ ${f(moic)}x dalam ${yrs * 2} tahun`;
  const o = L === "en" ? [
    "MoIC cannot be used", `Correct — ${f(moic)}x = ${Math.round(moic * 100)}%`, c, `Wrong: it should be ${gain / 10}%`
  ] : [
    "MoIC tidak bisa dipakai", `Benar — ${f(moic)}x = ${Math.round(moic * 100)}%`, c, `Salah: seharusnya ${b2i(gain / 10, 1)}%`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A ${yrs}-year MoIC of ${f(moic)}x is claimed as a '${Math.round(moic * 100)}% return'. The correct correction?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Two corrections: (1) ${f(moic)}x means capital multiplied ${f(moic)} — the gain is ${gain}% (${Math.round(moic * 100)}% = capital + gain, not the return). (2) MoIC is time-blind; ${f(moic)}x over ${yrs} years is far better than ${f(moic)}x over ${yrs * 2} years — that is what IRR measures. (${ref})`,
    steps: ["Analysis: two mistakes hide in one claim.",
      `Solve 1: ${f(moic)}x = capital × ${f(moic)} → gain = (${f(moic)} − 1) × 100% = ${gain}%.`,
      `Solve 2: ${Math.round(moic * 100)}% counts the capital itself as return — wrong.`,
      `Solve 3: MoIC has no time in it — ${yrs} years vs ${yrs * 2} years is a different return (IRR's job).`]
  };
  return {
    q: `MoIC ${f(moic)}x selama ${yrs} tahun diklaim sebagai 'return ${Math.round(moic * 100)}%'. Koreksi yang tepat?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Dua koreksi: (1) ${f(moic)}x artinya modal berlipat ${f(moic)} — keuntungannya ${gain}% (${Math.round(moic * 100)}% = modal + untung, bukan return). (2) MoIC buta terhadap waktu; ${f(moic)}x dalam ${yrs} tahun jauh lebih baik daripada ${f(moic)}x dalam ${yrs * 2} tahun — itulah yang diukur IRR. (${ref})`,
    steps: ["Analysis: dua kesalahan bersembunyi dalam satu klaim.",
      `Solve 1: ${f(moic)}x = modal × ${f(moic)} → keuntungan = (${f(moic)} − 1) × 100% = ${gain}%.`,
      `Solve 2: ${Math.round(moic * 100)}% menghitung modal itu sendiri sebagai return — salah.`,
      `Solve 3: MoIC tidak mengandung waktu — ${yrs} tahun vs ${yrs * 2} tahun adalah return yang berbeda (tugas IRR).`]
  };
}
/* ---------- hari-18: budgeting & capital budgeting ---------- */
function vB2Seasonal(rng, ref, L){
  const ann = b2step(rng, 180000, 300000, 20000), fac = b2pick([0.08, 0.1, 0.12], rng);
  const m = Math.round(ann * fac);
  const vals = [m, Math.round(ann / 12), Math.round(ann * fac * 0.9), Math.round(ann * (1 - fac))];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? "Rp" + b2e(v) + "k" : "Rp" + b2i(v) + "rb";
  if (L === "en") return {
    q: `Annual budget revenue Rp${b2e(ann)}k, June seasonal factor ${b2e(fac, 2)}. June budget revenue?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2e(ann)} × ${b2e(fac, 2)} = Rp${b2e(m)}k. Not ${b2e(ann)}/12 = ${b2e(Math.round(ann / 12))} — seasonal, not average. (${ref})`,
    steps: ["Analysis: seasonal budget — apply the month's factor, do not average.",
      "Solve 1: formula — month budget = annual × seasonal factor.",
      `Solve 2: substitute → ${b2e(ann)} × ${b2e(fac, 2)}.`,
      `Solve 3: compute → Rp${b2e(m)}k.`]
  };
  return {
    q: `Budget revenue tahunan Rp${b2i(ann)}rb, faktor musiman Jun ${b2i(fac, 2)}. Budget revenue Jun?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2i(ann)} × ${b2i(fac, 2)} = Rp${b2i(m)}rb. Bukan ${b2i(ann)}/12 = ${b2i(Math.round(ann / 12))} — musiman, bukan rata-rata. (${ref})`,
    steps: ["Analysis: budget musiman — pakai faktor bulan itu, jangan rata-rata.",
      "Solve 1: rumus — budget bulan = tahunan × faktor musiman.",
      `Solve 2: substitusi → ${b2i(ann)} × ${b2i(fac, 2)}.`,
      `Solve 3: hitung → Rp${b2i(m)}rb.`]
  };
}
function vB2VarSign(rng, ref, L){
  const bud = b2step(rng, 100000, 130000, 2000), act = bud - b2step(rng, 800, 2500, 100);
  const v = act - bud;
  const f = x => L === "en" ? (x >= 0 ? "+" : "−") + b2e(Math.abs(x)) + (x < 0 ? " (unfavorable)" : " (favorable)") : (x >= 0 ? "+" : "−") + b2i(Math.abs(x)) + (x < 0 ? " (unfavorable)" : " (favorable)");
  const c = f(v);
  const o = [c, f(-v), f(v - 3000), "Rp0 (" + (L === "en" ? "on budget" : "tepat budget") + ")"];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Actual 6-month revenue Rp${b2e(act)}k, budget Rp${b2e(bud)}k. Total revenue variance?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `${b2e(act)} − ${b2e(bud)} = ${b2e(v)}. Negative on revenue = unfavorable. (${ref})`,
    steps: ["Analysis: variance = actual minus budget; read the sign by account type.",
      "Solve 1: formula — variance = actual − budget.",
      `Solve 2: substitute → ${b2e(act)} − ${b2e(bud)} = ${b2e(v)}.`,
      "Solve 3: revenue short of budget = negative = unfavorable."]
  };
  return {
    q: `Actual revenue 6 bulan Rp${b2i(act)}rb, budget Rp${b2i(bud)}rb. Total variance revenue?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `${b2i(act)} − ${b2i(bud)} = ${b2i(v)}. Negatif pada revenue = unfavorable. (${ref})`,
    steps: ["Analysis: variance = aktual dikurangi budget; baca tandanya sesuai jenis akun.",
      "Solve 1: rumus — variance = aktual − budget.",
      `Solve 2: substitusi → ${b2i(act)} − ${b2i(bud)} = ${b2i(v)}.`,
      "Solve 3: revenue di bawah budget = negatif = unfavorable."]
  };
}
function vB2NPVRule(rng, ref, L){
  const c = L === "en"
    ? "Accepted — it creates value above the cost of capital"
    : "Diterima — menciptakan nilai di atas biaya modal";
  const o = L === "en" ? [
    c, "Rejected — positive NPV means overpriced", "Delayed until NPV = 0", "Accepted only if IRR < WACC"
  ] : [
    c, "Ditolak — NPV positif artinya kemahalan", "Ditunda sampai NPV = 0", "Diterima hanya jika IRR < WACC"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A project with NPV > 0 should be?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `NPV > 0 = the project adds firm value. Accept. (${ref})`,
    steps: ["Analysis: what does a positive NPV mean?",
      "Solve 1: NPV = PV of inflows − investment.",
      "Solve 2: NPV > 0 → inflows exceed the investment at the cost of capital.",
      "Solve 3: value-creating → accept."]
  };
  return {
    q: `Proyek dengan NPV > 0 sebaiknya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `NPV > 0 = proyek menambah nilai perusahaan. Terima. (${ref})`,
    steps: ["Analysis: apa arti NPV positif?",
      "Solve 1: NPV = PV arus masuk − investasi.",
      "Solve 2: NPV > 0 → arus masuk melebihi investasi pada biaya modal.",
      "Solve 3: menciptakan nilai → terima."]
  };
}
function vB2NPVPI(rng, ref, L){
  let flows, inv, wacc = 10, pv, npv, pi, tries = 0;
  do {
    inv = b2step(rng, 800, 1200, 100);
    flows = [b2step(rng, 200, 400, 100), b2step(rng, 300, 500, 100), b2step(rng, 400, 600, 100), b2step(rng, 300, 500, 100)];
    pv = flows.reduce((s, f, i) => s + f / Math.pow(1.1, i + 1), 0);
    npv = Math.round((pv - inv) * 100) / 100; pi = Math.round(pv / inv * 100) / 100;
    tries++;
  } while ((npv <= 0 || Math.abs(pi - 1.25) < 0.05) && tries < 40);
  const pvR = Math.round(pv * 100) / 100;
  const f2 = v => L === "en" ? b2e(v, 2) : b2i(v, 2);
  const c = L === "en"
    ? `NPV +${f2(npv)}; PI ${f2(pi)}`
    : `NPV +${f2(npv)}; PI ${f2(pi)}`;
  const o = [c,
    `NPV +${f2(Math.round((npv - 100) * 100) / 100)}; PI ${f2(Math.round((pi - 0.1) * 100) / 100)}`,
    `NPV −${f2(npv)}; PI ${f2(Math.round((1 - (pi - 1)) * 100) / 100)}`,
    `NPV +${f2(npv)}; PI ${f2(Math.round((pi + 0.1) * 100) / 100)}`];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Project: invest ${b2e(inv)}; inflows ${flows.join("/")}; WACC ${wacc}%. NPV and PI?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `PV of inflows Rp${f2(pvR)} → NPV = +${f2(npv)}; PI = ${f2(pi)}. Accept (NPV > 0, PI > 1). (${ref})`,
    steps: ["Analysis: discount each inflow, sum, compare with the investment.",
      `Solve 1: PV = ${flows.map((f, i) => `${f}÷1.1^${i + 1}`).join(" + ")} = ${f2(pvR)}.`,
      `Solve 2: NPV = ${f2(pvR)} − ${inv} = +${f2(npv)}.`,
      `Solve 3: PI = ${f2(pvR)} ÷ ${inv} = ${f2(pi)}.`]
  };
  return {
    q: `Proyek: investasi ${b2i(inv)}; arus ${flows.join("/")}; WACC ${wacc}%. NPV dan PI?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `PV masuk Rp${f2(pvR)} → NPV = +${f2(npv)}; PI = ${f2(pi)}. Terima (NPV > 0, PI > 1). (${ref})`,
    steps: ["Analysis: diskonto tiap arus masuk, jumlahkan, bandingkan dengan investasi.",
      `Solve 1: PV = ${flows.map((f, i) => `${f}÷1,1^${i + 1}`).join(" + ")} = ${f2(pvR)}.`,
      `Solve 2: NPV = ${f2(pvR)} − ${inv} = +${f2(npv)}.`,
      `Solve 3: PI = ${f2(pvR)} ÷ ${inv} = ${f2(pi)}.`]
  };
}
function vB2Payback(rng, ref, L){
  const flows = [300, 400, 500, 400], inv = 1000, wacc = 10;
  const pv = flows.map((f, i) => f / Math.pow(1.1, i + 1));
  const pb = 2 + (inv - 700) / 500;
  const cumD = pv[0] + pv[1] + pv[2], dpb = 3 + (inv - cumD) / pv[3];
  const pbR = Math.round(pb * 100) / 100, dpbR = Math.round(dpb * 100) / 100;
  const f1 = v => L === "en" ? b2e(v, 2) : b2i(v, 2);
  const c = `${f1(pbR)} yrs; ${f1(dpbR)} yrs`;
  const o = L === "en" ? [
    c, `${f1(2)} yrs; ${f1(pbR)} yrs`, `${f1(3)} yrs; ${f1(3.5)} yrs`, `${f1(pbR)} yrs; ${f1(pbR)} yrs`
  ] : [
    `${f1(pbR)} thn; ${f1(dpbR)} thn`, `${f1(2)} thn; ${f1(pbR)} thn`, `${f1(3)} thn; ${f1(3.5)} thn`, `${f1(pbR)} thn; ${f1(pbR)} thn`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Project: invest ${inv}; inflows ${flows.join("/")}; WACC ${wacc}%. Payback and discounted payback?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Payback = 2 + 300÷500 = ${f1(pbR)} yrs. Discounted payback = 3 + ${f1(inv - cumD)}÷${f1(pv[3])} = ${f1(dpbR)} yrs. (${ref})`,
    steps: ["Analysis: payback counts undiscounted cash; discounted payback counts PV.",
      `Solve 1: cumulative inflows — 300, 700, 1200 → payback in year 3: 2 + 300÷500 = ${f1(pbR)} yrs.`,
      `Solve 2: discounted cumulative after year 3 = ${f1(cumD)}; shortfall ${f1(inv - cumD)}.`,
      `Solve 3: discounted payback = 3 + ${f1(inv - cumD)}÷${f1(pv[3])} = ${f1(dpbR)} yrs.`]
  };
  return {
    q: `Proyek: investasi ${inv}; arus ${flows.join("/")}; WACC ${wacc}%. Payback dan discounted payback?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Payback = 2 + 300÷500 = ${f1(pbR)} thn. Discounted payback = 3 + ${f1(inv - cumD)}÷${f1(pv[3])} = ${f1(dpbR)} thn. (${ref})`,
    steps: ["Analysis: payback menghitung kas tanpa diskonto; discounted payback menghitung PV.",
      `Solve 1: kumulatif arus — 300, 700, 1200 → payback di tahun 3: 2 + 300÷500 = ${f1(pbR)} thn.`,
      `Solve 2: kumulatif terdiskonto setelah tahun 3 = ${f1(cumD)}; kekurangan ${f1(inv - cumD)}.`,
      `Solve 3: discounted payback = 3 + ${f1(inv - cumD)}÷${f1(pv[3])} = ${f1(dpbR)} thn.`]
  };
}
function vB2NPVIRR(rng, ref, L){
  const npvA = b2step(rng, 150, 250, 10), irrA = b2pick([28, 30, 32], rng);
  const npvB = npvA + b2step(rng, 300, 500, 50), irrB = irrA - b2pick([4, 6], rng);
  const c = L === "en" ? `B (bigger NPV)` : `B (NPV lebih besar)`;
  const o = L === "en" ? [
    c, "A (bigger IRR)", "Reject both", "Pick the bigger PI"
  ] : [
    c, "A (IRR lebih besar)", "Tolak keduanya", "Pilih yang PI-nya lebih besar"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Project A: NPV ${b2e(npvA)}, IRR ${irrA}%. Project B (mutually exclusive): NPV ${b2e(npvB)}, IRR ${irrB}%. Choose?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Choose B — NPV ${b2e(npvB)} > ${b2e(npvA)}. IRR picks A because it cannot see project scale. (${ref})`,
    steps: ["Analysis: mutually exclusive projects — NPV or IRR decides?",
      `Solve 1: NPV — B ${b2e(npvB)} vs A ${b2e(npvA)}: B creates more value.`,
      `Solve 2: IRR — A ${irrA}% vs B ${irrB}%: A looks better, but IRR is a RATE, not value.`,
      "Solve 3: for mutually exclusive projects, NPV rules — it measures value created."]
  };
  return {
    q: `Proyek A: NPV ${b2i(npvA)}, IRR ${irrA}%. Proyek B (mutually exclusive): NPV ${b2i(npvB)}, IRR ${irrB}%. Pilih?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Pilih B — NPV ${b2i(npvB)} > ${b2i(npvA)}. IRR memilih A karena tidak melihat skala proyek. (${ref})`,
    steps: ["Analysis: proyek mutually exclusive — NPV atau IRR yang memutuskan?",
      `Solve 1: NPV — B ${b2i(npvB)} vs A ${b2i(npvA)}: B menciptakan nilai lebih besar.`,
      `Solve 2: IRR — A ${irrA}% vs B ${irrB}%: A tampak lebih baik, tapi IRR adalah TARIF, bukan nilai.`,
      "Solve 3: untuk proyek mutually exclusive, NPV yang berlaku — ia mengukur nilai yang diciptakan."]
  };
}
function vB2MultIRR(rng, ref, L){
  const x = b2pick([80, 100, 120, 200], rng);
  const y = Math.round(x * 2.5), z = Math.round(x * 1.5);
  const c = L === "en" ? "Two IRRs: 0% and 50%" : "Dua IRR: 0% dan 50%";
  const o = L === "en" ? [
    c, "One IRR: 25%", "No IRR", "IRR 100%"
  ] : [
    c, "Satu IRR: 25%", "Tidak ada IRR", "IRR 100%"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Cash flows −${b2e(x)}, +${b2e(y)}, −${b2e(z)}. How many IRRs?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `NPV(0%) = −${b2e(x)} + ${b2e(y)} − ${b2e(z)} = 0; NPV(50%) = −${b2e(x)} + ${b2e(Math.round(y / 1.5))} − ${b2e(Math.round(z / 2.25))} = 0. Two IRRs — discard IRR, use NPV. (${ref})`,
    steps: ["Analysis: count sign changes — two changes can mean two IRRs.",
      `Solve 1: NPV at 0% = −${b2e(x)} + ${b2e(y)} − ${b2e(z)} = 0 → 0% is an IRR.`,
      `Solve 2: NPV at 50% = −${b2e(x)} + ${b2e(y)}÷1.5 − ${b2e(z)}÷2.25 = 0 → 50% is an IRR too.`,
      "Solve 3: two valid IRRs → the IRR rule is useless here; use NPV."]
  };
  return {
    q: `Arus kas −${b2i(x)}, +${b2i(y)}, −${b2i(z)}. Berapa IRR?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `NPV(0%) = −${b2i(x)} + ${b2i(y)} − ${b2i(z)} = 0; NPV(50%) = −${b2i(x)} + ${b2i(Math.round(y / 1.5))} − ${b2i(Math.round(z / 2.25))} = 0. Dua IRR — buang IRR, pakai NPV. (${ref})`,
    steps: ["Analysis: hitung perubahan tanda — dua kali ganti tanda bisa berarti dua IRR.",
      `Solve 1: NPV di 0% = −${b2i(x)} + ${b2i(y)} − ${b2i(z)} = 0 → 0% adalah IRR.`,
      `Solve 2: NPV di 50% = −${b2i(x)} + ${b2i(y)}÷1,5 − ${b2i(z)}÷2,25 = 0 → 50% juga IRR.`,
      "Solve 3: dua IRR valid → aturan IRR tidak berguna di sini; pakai NPV."]
  };
}
function vB2MAEMAPE(rng, ref, L){
  const e1 = b2step(rng, 10, 20, 1), a1 = b2step(rng, 110, 140, 5);
  const e2 = Math.round((e1 * b2pick([0.35, 0.42, 0.5], rng)) * 100) / 100, a2 = b2step(rng, 105, 130, 5);
  const mae = Math.round((e1 + e2) / 2 * 100) / 100;
  const mape = Math.round(((e1 / a1 + e2 / a2) / 2 * 100) * 100) / 100;
  const f = v => L === "en" ? b2e(v, 2) : b2i(v, 2);
  const c = L === "en" ? `MAE ${f(mae)}; MAPE ${f(mape)}%` : `MAE ${f(mae)}; MAPE ${f(mape)}%`;
  const o = [
    c,
    L === "en" ? `MAE ${f(mae)}; MAPE ${f(Math.round(mape * 1.4 * 100) / 100)}%` : `MAE ${f(mae)}; MAPE ${f(Math.round(mape * 1.4 * 100) / 100)}%`,
    L === "en" ? `MAE ${f(Math.round((e1 + e2) * 100) / 100)}; MAPE ${f(mape)}%` : `MAE ${f(Math.round((e1 + e2) * 100) / 100)}; MAPE ${f(mape)}%`,
    L === "en" ? `MAE ${f(Math.round(mae * 0.89 * 100) / 100)}; MAPE ${f(Math.round(mape * 0.92 * 100) / 100)}%` : `MAE ${f(Math.round(mae * 0.89 * 100) / 100)}; MAPE ${f(Math.round(mape * 0.92 * 100) / 100)}%`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `MA-3 forecast: errors ${f(e1)} (actual ${b2e(a1)}) and ${f(e2)} (actual ${b2e(a2)}). MAE and MAPE?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `MAE = (${f(e1)} + ${f(e2)}) ÷ 2 = ${f(mae)}; MAPE = (${f(e1)}÷${b2e(a1)} + ${f(e2)}÷${b2e(a2)}) ÷ 2 = ${f(mape)}%. Use full precision, not the displayed rounded error. (${ref})`,
    steps: ["Analysis: MAE averages absolute errors; MAPE averages percentage errors.",
      `Solve 1: MAE = (${f(e1)} + ${f(e2)}) ÷ 2 = ${f(mae)}.`,
      `Solve 2: MAPE = (${f(e1)}÷${b2e(a1)} + ${f(e2)}÷${b2e(a2)}) ÷ 2 × 100% = ${f(mape)}%.`,
      "Solve 3: use full-precision errors — rounding the inputs first shifts the answer."]
  };
  return {
    q: `Forecast MA-3: error ${f(e1)} (aktual ${b2i(a1)}) dan ${f(e2)} (aktual ${b2i(a2)}). MAE dan MAPE?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `MAE = (${f(e1)} + ${f(e2)}) ÷ 2 = ${f(mae)}; MAPE = (${f(e1)}÷${b2i(a1)} + ${f(e2)}÷${b2i(a2)}) ÷ 2 = ${f(mape)}%. MAE memakai presisi penuh, bukan angka tampil yang dibulatkan. (${ref})`,
    steps: ["Analysis: MAE merata-rata error absolut; MAPE merata-rata error persen.",
      `Solve 1: MAE = (${f(e1)} + ${f(e2)}) ÷ 2 = ${f(mae)}.`,
      `Solve 2: MAPE = (${f(e1)}÷${b2i(a1)} + ${f(e2)}÷${b2i(a2)}) ÷ 2 × 100% = ${f(mape)}%.`,
      "Solve 3: pakai error presisi penuh — membulatkan input dulu menggeser jawaban."]
  };
}
function vB2MixVar(rng, ref, L){
  const pA = b2pick([18, 20, 22], rng), pB = pA - b2pick([8, 10, 12], rng);
  const qb = 100, qa = b2pick([110, 120, 130], rng);
  const avg = (pA + pB) / 2;
  const mix = Math.round(qa * (0.4 * pA + 0.6 * pB - avg) * 100) / 100;
  const qty = Math.round((qa - qb) * avg * 100) / 100;
  const tot = Math.round((mix + qty) * 100) / 100;
  const f = v => L === "en" ? b2e(v, 2) : b2i(v, 2);
  const c = L === "en"
    ? `Mix ${f(mix)}; quantity +${f(qty)} (total volume ${f(tot)})`
    : `Mix ${f(mix)}; quantity +${f(qty)} (total volume ${f(tot)})`;
  const o = [
    c,
    L === "en" ? `Mix +${f(Math.abs(mix))}; quantity −${f(qty)}` : `Mix +${f(Math.abs(mix))}; quantity −${f(qty)}`,
    L === "en" ? `Mix ${f(mix * 2)}; quantity 0` : `Mix ${f(mix * 2)}; quantity 0`,
    L === "en" ? `Mix 0; quantity −${f(qty)}` : `Mix 0; quantity −${f(qty)}`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Warung sells A @Rp${b2e(pA)}k and B @Rp${b2e(pB)}k. Budget: ${qb} units (50/50). Actual: ${b2e(qa)} units (40% A / 60% B). Mix variance and quantity variance?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Mix total ${f(mix)}; quantity +${f(qty)}; they sum to ${f(tot)} = volume variance. Volume rose but toward the cheap product — that is the mix story. (${ref})`,
    steps: ["Analysis: split the volume variance into mix (WHICH products) and quantity (HOW MANY).",
      `Solve 1: budget avg price = (${b2e(pA)} + ${b2e(pB)}) ÷ 2 = ${f(avg)}.`,
      `Solve 2: mix = ${b2e(qa)} × (actual mix revenue ${f(0.4 * pA + 0.6 * pB)} − avg ${f(avg)}) = ${f(mix)}.`,
      `Solve 3: quantity = (${b2e(qa)} − ${qb}) × ${f(avg)} = +${f(qty)}. Mix + quantity = ${f(tot)}.`]
  };
  return {
    q: `Warung jual A @Rp${b2i(pA)}rb dan B @Rp${b2i(pB)}rb. Budget: ${qb} unit (50/50). Aktual: ${b2i(qa)} unit (40% A / 60% B). Mix variance dan quantity variance?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Mix total ${f(mix)}; quantity +${f(qty)}; jumlahnya ${f(tot)} = volume variance. Volume naik tapi ke produk murah — itulah cerita mix. (${ref})`,
    steps: ["Analysis: uraikan volume variance jadi mix (produk APA) dan quantity (BERAPA banyak).",
      `Solve 1: harga rata-rata budget = (${b2i(pA)} + ${b2i(pB)}) ÷ 2 = ${f(avg)}.`,
      `Solve 2: mix = ${b2i(qa)} × (revenue mix aktual ${f(0.4 * pA + 0.6 * pB)} − rata-rata ${f(avg)}) = ${f(mix)}.`,
      `Solve 3: quantity = (${b2i(qa)} − ${qb}) × ${f(avg)} = +${f(qty)}. Mix + quantity = ${f(tot)}.`]
  };
}
/* ---------- hari-19: Excel speed drill ---------- */
function vB2IMTable(rng, ref, L){
  const prods = ["Kopi Susu", "Kopi Hitam", "Teh Manis", "Es Jeruk"];
  const prices = b2Shuffle([8, 12, 15, 20, 25, 30], rng).slice(0, 4);
  const idx = b2int(rng, 0, 3);
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? "Rp" + b2e(v) + "k" : "Rp" + b2i(v) + "rb";
  const table = prods.map((p, i) => `${p} ${f(prices[i])}`).join("; ");
  if (L === "en") return {
    q: `Price list — ${table}. INDEX+MATCH: price of "${prods[idx]}"?`,
    opts: order.map(i => f(prices[i])),
    answer: order.indexOf(idx),
    explain: `MATCH finds the ${prods[idx]} row, INDEX takes its price: ${f(prices[idx])}. (${ref})`,
    steps: ["Analysis: two steps — find the POSITION, then take the VALUE.",
      `Solve 1: MATCH("${prods[idx]}", products) → row ${idx + 1}.`,
      `Solve 2: INDEX(prices, ${idx + 1}) → ${f(prices[idx])}.`,
      "Solve 3: separating position from value is what makes it insert-proof."]
  };
  return {
    q: `Daftar harga — ${table}. INDEX+MATCH: harga produk "${prods[idx]}"?`,
    opts: order.map(i => f(prices[i])),
    answer: order.indexOf(idx),
    explain: `MATCH menemukan baris ${prods[idx]}, INDEX mengambil harganya: ${f(prices[idx])}. (${ref})`,
    steps: ["Analysis: dua langkah — cari POSISI, lalu ambil NILAI.",
      `Solve 1: MATCH("${prods[idx]}", produk) → baris ${idx + 1}.`,
      `Solve 2: INDEX(harga, ${idx + 1}) → ${f(prices[idx])}.`,
      "Solve 3: memisahkan posisi dari nilai inilah yang membuatnya tahan sisip."]
  };
}
function vB2SumifsTable(rng, ref, L){
  let a, b, c, sum, other1, other2, vals;
  for (let t = 0; t < 50; t++) {
    a = b2step(rng, 100, 300, 10); b = b2step(rng, 100, 300, 10); c = b2step(rng, 20, 80, 10);
    sum = a + b + c;
    other1 = b2step(rng, 150, 350, 10); other2 = b2step(rng, 100, 250, 10);
    vals = [sum, a + b + other1, a + other2, a];
    if (new Set(vals).size === 4) break;
  }
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? "Rp" + b2e(v) + "k" : "Rp" + b2i(v) + "rb";
  const rows = L === "en"
    ? `Rows (Category–City–Revenue k): Beverage–Bandung ${a}; Beverage–Bandung ${b}; Food–Bandung ${other1}; Beverage–Jakarta ${other2}; Beverage–Bandung ${c}; Food–Jakarta 100.`
    : `Baris (Kategori–Kota–Omzet rb): Minuman–Bandung ${a}; Minuman–Bandung ${b}; Makanan–Bandung ${other1}; Minuman–Jakarta ${other2}; Minuman–Bandung ${c}; Makanan–Jakarta 100.`;
  if (L === "en") return {
    q: `${rows} Revenue of category "Beverage" in "Bandung" (SUMIFS)?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${a} + ${b} + ${c} = Rp${b2e(sum)}k. Only rows meeting BOTH criteria are summed. (${ref})`,
    steps: ["Analysis: SUMIFS sums only rows meeting ALL criteria.",
      `Solve 1: matching rows — Beverage–Bandung: ${a}, ${b}, ${c}.`,
      `Solve 2: other rows fail at least one criterion — excluded.`,
      `Solve 3: ${a} + ${b} + ${c} = Rp${b2e(sum)}k.`]
  };
  return {
    q: `${rows} Omzet kategori "Minuman" di "Bandung" (SUMIFS)?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${a} + ${b} + ${c} = Rp${b2i(sum)}rb. Hanya baris yang memenuhi KEDUA kriteria yang dijumlah. (${ref})`,
    steps: ["Analysis: SUMIFS hanya menjumlah baris yang memenuhi SEMUA kriteria.",
      `Solve 1: baris cocok — Minuman–Bandung: ${a}, ${b}, ${c}.`,
      "Solve 2: baris lain gagal di minimal satu kriteria — dikeluarkan.",
      `Solve 3: ${a} + ${b} + ${c} = Rp${b2i(sum)}rb.`]
  };
}
function vB2MatchTrap(rng, ref, L){
  const city = b2pick(["Bandung", "Jakarta", "Surabaya"], rng);
  const c = L === "en"
    ? "Silently wrong result if data is unsorted"
    : "Hasil salah diam-diam bila data tidak terurut";
  const o = L === "en" ? [
    c, "Always #NAME?", "The formula cannot be saved", "No risk"
  ] : [
    c, "Selalu #NAME?", "Rumus tidak bisa disimpan", "Tidak ada risiko"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `MATCH("${city}", range) WITHOUT the 3rd argument. The risk?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Without 0 = sorted mode. Random data yields a wrong position with NO warning — the most expensive Excel bug. (${ref})`,
    steps: ["Analysis: what is MATCH's default match mode?",
      "Solve 1: no 3rd argument → approximate (sorted) mode.",
      "Solve 2: unsorted data → a wrong position, silently.",
      "Solve 3: always write the 0 (exact match) explicitly."]
  };
  return {
    q: `MATCH("${city}", range) TANPA argumen ke-3. Risikonya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Tanpa 0 = mode terurut. Data acak menghasilkan posisi salah TANPA peringatan — bug termahal di Excel. (${ref})`,
    steps: ["Analysis: apa mode match default MATCH?",
      "Solve 1: tanpa argumen ke-3 → mode approximate (terurut).",
      "Solve 2: data tidak terurut → posisi salah, diam-diam.",
      "Solve 3: selalu tulis 0 (exact match) secara eksplisit."]
  };
}
function vB2XLookupSafe(rng, ref, L){
  const col = b2pick([3, 5, 6], rng);
  const c = L === "en"
    ? "XLOOKUP holds ranges, not column numbers"
    : "XLOOKUP memegang range, bukan nomor kolom";
  const o = L === "en" ? [
    c, "XLOOKUP types faster", "VLOOKUP cannot exact-match", "No difference"
  ] : [
    c, "XLOOKUP mengetik lebih cepat", "VLOOKUP tidak bisa exact match", "Tidak ada bedanya"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Why is XLOOKUP safer than VLOOKUP when columns are inserted?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `VLOOKUP("...", table, ${col}, ...) points at 'column ${col}' — insert a column and it points at the wrong one. XLOOKUP holds the range directly. (${ref})`,
    steps: ["Analysis: what does each function actually hold on to?",
      `Solve 1: VLOOKUP holds a column NUMBER (${col}) — fragile to inserts.`,
      "Solve 2: XLOOKUP holds the return RANGE itself.",
      "Solve 3: insert a column — XLOOKUP still points at the right range."]
  };
  return {
    q: `Kenapa XLOOKUP lebih aman dari VLOOKUP saat kolom disisipkan?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `VLOOKUP("...", tabel, ${col}, ...) menunjuk 'kolom ke-${col}' — sisip kolom, ia menunjuk kolom yang salah. XLOOKUP memegang range langsung. (${ref})`,
    steps: ["Analysis: apa yang sebenarnya dipegang tiap fungsi?",
      `Solve 1: VLOOKUP memegang NOMOR kolom (${col}) — rapuh terhadap sisipan.`,
      "Solve 2: XLOOKUP memegang RANGE hasil itu sendiri.",
      "Solve 3: sisip kolom — XLOOKUP tetap menunjuk range yang benar."]
  };
}
function vB2IfErrorUse(rng, ref, L){
  const c = L === "en"
    ? "At legitimate risk points: a divisor that can be zero"
    : "Di titik risiko yang sah: pembagi yang bisa nol";
  const o = L === "en" ? [
    "Wrapping the whole workbook to look tidy", c, "Hiding all errors", "Replacing IF"
  ] : [
    "Membungkus seluruh workbook biar rapi", c, "Menyembunyikan semua error", "Menggantikan IF"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `IFERROR is best used...`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `IFERROR only at specific risk points (zero divisor, failing lookup). Wrapping everything = disabling the fire alarm. (${ref})`,
    steps: ["Analysis: what is IFERROR for — a guard or a blanket?",
      "Solve 1: legitimate risk points — a divisor that can be zero, a lookup that can miss.",
      "Solve 2: wrap ONLY that point, as close to the risk as possible.",
      "Solve 3: wrapping everything hides real bugs — the fire alarm switched off."]
  };
  return {
    q: `IFERROR paling tepat dipakai...`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `IFERROR hanya di titik risiko spesifik (pembagi nol, lookup gagal). Membungkus semuanya = mematikan alarm kebakaran. (${ref})`,
    steps: ["Analysis: IFERROR itu untuk apa — pengaman atau selimut?",
      "Solve 1: titik risiko yang sah — pembagi yang bisa nol, lookup yang bisa gagal.",
      "Solve 2: bungkus HANYA titik itu, sedekat mungkin dengan risikonya.",
      "Solve 3: membungkus semuanya menyembunyikan bug sungguhan — alarm kebakaran dimatikan."]
  };
}
/* ---------- hari-20: akuntansi sulit ---------- */
function vB2LeasePV(rng, ref, L){
  const n = b2pick([4, 5, 6], rng), r = b2pick([6, 7, 8, 9, 10], rng);
  const pmt = b2pick([1000, 1200, 1500], rng);
  const fac = (1 - Math.pow(1 + r / 100, -n)) / (r / 100);
  const pv = Math.round(pmt * fac * 100) / 100;
  const fac2 = (1 - Math.pow(1 + (r + 2) / 100, -n)) / ((r + 2) / 100);
  const vals = [pv, pmt * n, Math.round(pmt * fac2 * 100) / 100, Math.round(pmt * n / (1 + r / 100) * 100) / 100];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? "Rp" + b2e(v, 2) + "k" : "Rp" + b2i(v, 2) + "rb";
  if (L === "en") return {
    q: `Equipment lease ${n} years, Rp${b2e(pmt)}k/year, discount rate ${r}%. PV of the lease liability?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2e(pmt)} × ${b2e(fac, 5)} = Rp${b2e(pv, 2)}k. That is the liability (and ROU asset) recognized today. (${ref})`,
    steps: ["Analysis: PV of an annuity — the lease liability today.",
      `Solve 1: annuity factor = (1 − (1+${r}%)^−${n}) ÷ ${r}% = ${b2e(fac, 5)}.`,
      `Solve 2: PV = payment × factor = ${b2e(pmt)} × ${b2e(fac, 5)}.`,
      `Solve 3: compute → Rp${b2e(pv, 2)}k.`]
  };
  return {
    q: `Sewa alat ${n} tahun, Rp${b2i(pmt)}rb/thn, discount rate ${r}%. PV liabilitas lease?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2i(pmt)} × ${b2i(fac, 5)} = Rp${b2i(pv, 2)}rb. Inilah liabilitas (dan aset ROU) yang diakui hari ini. (${ref})`,
    steps: ["Analysis: PV anuitas — liabilitas lease hari ini.",
      `Solve 1: faktor anuitas = (1 − (1+${r}%)^−${n}) ÷ ${r}% = ${b2i(fac, 5)}.`,
      `Solve 2: PV = pembayaran × faktor = ${b2i(pmt)} × ${b2i(fac, 5)}.`,
      `Solve 3: hitung → Rp${b2i(pv, 2)}rb.`]
  };
}
function vB2LeaseExp(rng, ref, L){
  const n = b2pick([4, 5, 6], rng), r = b2pick([6, 8, 10], rng);
  const pmt = b2pick([1000, 1200, 1500], rng);
  const fac = (1 - Math.pow(1 + r / 100, -n)) / (r / 100);
  const pv = Math.round(pmt * fac * 100) / 100;
  const depr = Math.round(pv / n * 100) / 100, intr = Math.round(pv * r / 100 * 100) / 100;
  const tot = Math.round((depr + intr) * 100) / 100;
  const f = v => L === "en" ? "Rp" + b2e(v, 2) + "k" : "Rp" + b2i(v, 2) + "rb";
  const vals = [tot, pmt, depr, intr];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Lease: ${n} years, Rp${b2e(pmt)}k/year, rate ${r}% (PV Rp${b2e(pv, 2)}k). Total year-1 expense under PSAK 116?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2e(depr, 2)} + ${b2e(intr, 2)} = Rp${b2e(tot, 2)}k — above the rent ${b2e(pmt)} because interest is front-loaded. (${ref})`,
    steps: ["Analysis: PSAK 116 splits rent into depreciation + interest.",
      `Solve 1: ROU depreciation = PV ÷ years = ${b2e(pv, 2)} ÷ ${n} = ${b2e(depr, 2)}.`,
      `Solve 2: year-1 interest = PV × rate = ${b2e(pv, 2)} × ${r}% = ${b2e(intr, 2)}.`,
      `Solve 3: total year-1 expense = ${b2e(depr, 2)} + ${b2e(intr, 2)} = Rp${b2e(tot, 2)}k.`]
  };
  return {
    q: `Lease: ${n} tahun, Rp${b2i(pmt)}rb/thn, rate ${r}% (PV Rp${b2i(pv, 2)}rb). Total beban tahun-1 menurut PSAK 116?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2i(depr, 2)} + ${b2i(intr, 2)} = Rp${b2i(tot, 2)}rb — lebih besar dari sewa ${b2i(pmt)} karena bunga front-loaded. (${ref})`,
    steps: ["Analysis: PSAK 116 memecah sewa jadi depresiasi + bunga.",
      `Solve 1: depresiasi ROU = PV ÷ tahun = ${b2i(pv, 2)} ÷ ${n} = ${b2i(depr, 2)}.`,
      `Solve 2: bunga tahun-1 = PV × rate = ${b2i(pv, 2)} × ${r}% = ${b2i(intr, 2)}.`,
      `Solve 3: total beban tahun-1 = ${b2i(depr, 2)} + ${b2i(intr, 2)} = Rp${b2i(tot, 2)}rb.`]
  };
}
function vB2DTL(rng, ref, L){
  const book = b2step(rng, 600, 1000, 100), tax = book + b2step(rng, 300, 600, 100);
  const diff = tax - book, t = 22, dtl = Math.round(diff * t / 100);
  const vals = [dtl, Math.round(diff * 0.44), Math.round(diff * 0.11), 0];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? "Rp" + b2e(v) + "k" : "Rp" + b2i(v) + "rb";
  if (L === "en") return {
    q: `Book D&A Rp${b2e(book)}k, tax D&A Rp${b2e(tax)}k, rate ${t}%. DTL?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Temporary difference ${b2e(diff)} × ${t}% = Rp${b2e(dtl)}k. Tax deferred, not avoided. (${ref})`,
    steps: ["Analysis: tax D&A ahead of book D&A — a temporary difference.",
      `Solve 1: difference = ${b2e(tax)} − ${b2e(book)} = ${b2e(diff)}.`,
      `Solve 2: DTL = difference × rate = ${b2e(diff)} × ${t}%.`,
      `Solve 3: compute → Rp${b2e(dtl)}k — tax paid later, not never.`]
  };
  return {
    q: `D&A buku Rp${b2i(book)}rb, D&A pajak Rp${b2i(tax)}rb, tarif ${t}%. DTL?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Beda temporer ${b2i(diff)} × ${t}% = Rp${b2i(dtl)}rb. Pajak yang ditunda, bukan dihindari. (${ref})`,
    steps: ["Analysis: D&A pajak mendahului D&A buku — beda temporer.",
      `Solve 1: beda = ${b2i(tax)} − ${b2i(book)} = ${b2i(diff)}.`,
      `Solve 2: DTL = beda × tarif = ${b2i(diff)} × ${t}%.`,
      `Solve 3: hitung → Rp${b2i(dtl)}rb — pajak dibayar nanti, bukan tidak pernah.`]
  };
}
function vB2StockComp(rng, ref, L){
  const X = b2step(rng, 300, 800, 100);
  const c = L === "en"
    ? `Add ${b2e(X)} (non-cash add-back)`
    : `Tambah ${b2i(X)} (add-back non-kas)`;
  const o = L === "en" ? [
    `Subtract ${b2e(X)} (cash out)`, c, "No adjustment", `Subtract from CFF`
  ] : [
    `Kurangi ${b2i(X)} (kas keluar)`, c, "Tidak ada penyesuaian", "Kurangi dari CFF"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Stock comp expense Rp${b2e(X)}k. Effect on CFO (indirect)?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `No cash leaves → Rp${b2e(X)}k added back. CFO rises ${b2e(X)}, but shares are diluted. (${ref})`,
    steps: ["Analysis: stock comp hits profit — does cash move?",
      "Solve 1: no cash leaves — it is a non-cash expense.",
      `Solve 2: indirect CFO adds back non-cash expenses: +${b2e(X)}.`,
      "Solve 3: CFO rises, but the share count rises too — dilution is the real cost."]
  };
  return {
    q: `Beban stock comp Rp${b2i(X)}rb. Dampak ke CFO (tidak langsung)?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Tidak ada kas keluar → Rp${b2i(X)}rb di-add-back. CFO naik ${b2i(X)}, tapi saham terdilusi. (${ref})`,
    steps: ["Analysis: stock comp memotong laba — apakah kas bergerak?",
      "Solve 1: tidak ada kas keluar — ini beban non-kas.",
      `Solve 2: CFO tidak langsung meng-add-back beban non-kas: +${b2i(X)}.`,
      "Solve 3: CFO naik, tapi jumlah saham ikut naik — dilusi adalah biaya sebenarnya."]
  };
}
function vB2NOLSave(rng, ref, L){
  const nol = b2step(rng, 1500, 3000, 500), t = 22;
  const save = Math.round(nol * t / 100);
  const vals = [save, nol, Math.round(save / 5), Math.round(nol * 0.655)];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? "Rp" + b2e(v) + "k" : "Rp" + b2i(v) + "rb";
  if (L === "en") return {
    q: `NOL Rp${b2e(nol)}k, rate ${t}%, fully used this year. Current-tax saving?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2e(nol)} × ${t}% = Rp${b2e(save)}k — current tax falls by that amount. (${ref})`,
    steps: ["Analysis: using an NOL shields current profit from tax.",
      `Solve 1: shielded profit = the full NOL = ${b2e(nol)}.`,
      `Solve 2: tax saved = shielded profit × rate = ${b2e(nol)} × ${t}%.`,
      `Solve 3: compute → Rp${b2e(save)}k.`]
  };
  return {
    q: `NOL Rp${b2i(nol)}rb, tarif ${t}%, dipakai penuh tahun ini. Penghematan pajak kini?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2i(nol)} × ${t}% = Rp${b2i(save)}rb — pajak kini turun sebesar itu. (${ref})`,
    steps: ["Analysis: memakai NOL melindungi laba kini dari pajak.",
      `Solve 1: laba yang dilindungi = NOL penuh = ${b2i(nol)}.`,
      `Solve 2: pajak dihemat = laba terlindungi × tarif = ${b2i(nol)} × ${t}%.`,
      `Solve 3: hitung → Rp${b2i(save)}rb.`]
  };
}
function vB2TSM(rng, ref, L){
  const n = b2pick([1000, 2000, 3000, 4000], rng), k = b2pick([100, 200, 250, 500], rng);
  const mult = b2pick([3, 4], rng), m = k * mult;
  const proceeds = n * k, buyback = Math.round(proceeds / m), net = n - buyback;
  const vals = [net, n, buyback, Math.round(buyback / 2)];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? b2e(v) + " shares" : b2i(v) + " lembar";
  if (L === "en") return {
    q: `${b2e(n)} options, strike Rp${b2e(k)}, average market price Rp${b2e(m)}. Net additional shares (TSM)?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Proceeds Rp${b2e(proceeds / 1000)}k buy back ${b2e(buyback)} shares → net addition ${b2e(n)} − ${b2e(buyback)} = ${b2e(net)}. That is where diluted shares come from. (${ref})`,
    steps: ["Analysis: TSM — options exercised, proceeds buy shares back.",
      `Solve 1: proceeds = ${b2e(n)} × ${b2e(k)} = Rp${b2e(proceeds / 1000)}k.`,
      `Solve 2: buyback = proceeds ÷ market price = ${b2e(proceeds)} ÷ ${b2e(m)} = ${b2e(buyback)}.`,
      `Solve 3: net new shares = ${b2e(n)} − ${b2e(buyback)} = ${b2e(net)}.`]
  };
  return {
    q: `${b2i(n)} opsi, strike Rp${b2i(k)}, harga pasar rata-rata Rp${b2i(m)}. Saham tambahan bersih (TSM)?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Proceeds Rp${b2i(proceeds / 1000)}rb membeli kembali ${b2i(buyback)} lembar → tambahan bersih ${b2i(n)} − ${b2i(buyback)} = ${b2i(net)}. Inilah asal saham dilusian. (${ref})`,
    steps: ["Analysis: TSM — opsi dieksekusi, proceeds membeli kembali saham.",
      `Solve 1: proceeds = ${b2i(n)} × ${b2i(k)} = Rp${b2i(proceeds / 1000)}rb.`,
      `Solve 2: buyback = proceeds ÷ harga pasar = ${b2i(proceeds)} ÷ ${b2i(m)} = ${b2i(buyback)}.`,
      `Solve 3: saham baru bersih = ${b2i(n)} − ${b2i(buyback)} = ${b2i(net)}.`]
  };
}
/* ---------- hari-22: dashboard capstone ---------- */
function vB2TVDual(rng, ref, L){
  const tvP = b2step(rng, 32000, 44000, 4000), tvE = tvP + b2step(rng, 6000, 10000, 2000);
  const evB = Math.round(tvP * 0.85), evE = Math.round(tvE * 0.85);
  const c = L === "en"
    ? "Two TV methods give two answers framing a valuation range — the gap is information, not error"
    : "Dua metode TV memberi dua jawaban yang membingkai rentang valuasi — selisihnya informasi, bukan error";
  const o = L === "en" ? [
    "One of them must be miscalculated", c, "Take the bigger one as the answer", "Average them and forget the gap"
  ] : [
    "Salah satu pasti salah hitung", c, "Ambil yang lebih besar sebagai jawaban", "Ambil rata-ratanya dan lupakan selisihnya"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The dashboard shows EV base ${b2e(evB)} and EV exit ${b2e(evE)}. The correct reading?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Triangulation: perpetuity (TV ${b2e(tvP)}) and exit multiple (TV ${b2e(tvE)}) are two independent lenses. Each is right under its own assumptions; the gap frames the range and forces the question 'which TV assumption is more defensible'. (${ref})`,
    steps: ["Analysis: two methods, two answers — error or information?",
      `Solve 1: perpetuity TV ${b2e(tvP)} → EV base ${b2e(evB)}.`,
      `Solve 2: exit TV ${b2e(tvE)} → EV exit ${b2e(evE)}.`,
      "Solve 3: both are right under their own assumptions — the gap IS the range; ask which TV assumption defends better."]
  };
  return {
    q: `Dashboard menampilkan EV base ${b2i(evB)} dan EV exit ${b2i(evE)}. Bacaan yang benar?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Triangulasi: perpetuitas (TV ${b2i(tvP)}) dan exit multiple (TV ${b2i(tvE)}) adalah dua lensa independen. Keduanya benar di bawah asumsinya masing-masing; selisihnya membingkai rentang dan memaksa pertanyaan 'asumsi TV mana yang lebih bisa dipertahankan'. (${ref})`,
    steps: ["Analysis: dua metode, dua jawaban — error atau informasi?",
      `Solve 1: TV perpetuitas ${b2i(tvP)} → EV base ${b2i(evB)}.`,
      `Solve 2: TV exit ${b2i(tvE)} → EV exit ${b2i(evE)}.`,
      "Solve 3: keduanya benar di bawah asumsinya — selisihnya ADALAH rentang; tanyakan asumsi TV mana yang lebih bisa dipertahankan."]
  };
}
function vB2WACCChange(rng, ref, L){
  const w0 = b2pick([11, 12, 13], rng), w1 = w0 - 2;
  const c = L === "en"
    ? "TV, PV, both EVs, the range, and the midpoint move; the 3×3 grid STAYS — its what-if scenarios are fixed"
    : "TV, PV, kedua EV, rentang, dan midpoint bergerak; grid 3×3 TETAP — skenario what-if-nya tetap";
  const o = L === "en" ? [
    "Nothing changes", "Only EV base changes", c, "Error #DIV/0! in every cell"
  ] : [
    "Tidak ada yang berubah", "Hanya EV base yang berubah", c, "Error #DIV/0! di semua sel"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `You change the WACC input ${w0}% → ${w1}%. On a correct dashboard, what happens?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Base WACC flows into the TV denominator (WACC−g) and the discount factor — TV, PV, both EVs, the range, and the midpoint move. The grid hardcodes scenario WACC/g as scenario DEFINITIONS ('what if WACC = ${w1}%?'), so its 9 cells stay put — correctly. Test the grid: change FCFF, all 9 must move. A cell that stays still when ITS input changes = a typed number in disguise. (${ref})`,
    steps: ["Analysis: trace the WACC input through the dashboard.",
      "Solve 1: base WACC feeds the TV denominator and discount factors — TV, PV, EVs, range, midpoint all move.",
      "Solve 2: the 3×3 grid hardcodes scenario WACC/g as DEFINITIONS — its cells correctly stay.",
      "Solve 3: test the grid with FCFF — all 9 cells must move; a still cell = a typed number."]
  };
  return {
    q: `Kamu ubah WACC input ${w0}% → ${w1}%. Pada dashboard yang benar, apa yang terjadi?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `WACC base mengalir ke penyebut TV (WACC−g) dan faktor diskonto — TV, PV, kedua EV, rentang, midpoint bergerak. Grid memakai skenario WACC/g yang di-hardcode sebagai DEFINISI skenario ('bagaimana jika WACC = ${w1}%?'), jadi 9 selnya diam — itu benar. Uji grid: ubah FCFF, 9 sel harus bergerak. Satu sel yang diam saat INPUTNYA berubah = angka ketik yang menyamar. (${ref})`,
    steps: ["Analysis: telusuri input WACC ke seluruh dashboard.",
      "Solve 1: WACC base masuk ke penyebut TV dan faktor diskonto — TV, PV, EV, rentang, midpoint semua bergerak.",
      "Solve 2: grid 3×3 meng-hardcode WACC/g skenario sebagai DEFINISI — selnya benar diam.",
      "Solve 3: uji grid dengan FCFF — 9 sel harus bergerak; sel yang diam = angka ketik."]
  };
}
function vB2Hardcode(rng, ref, L){
  const ev = b2step(rng, 30000, 45000, 1000);
  const c = L === "en"
    ? "Dead dashboard: it won't move when assumptions change; looks right until someone sensitivity-tests it"
    : "Dashboard mati: tak ikut berubah saat asumsi diubah; terlihat benar sampai seseorang menguji sensitivitas";
  const o = L === "en" ? [
    "No problem — the number is right", c, "The file gets smaller", "The checker still gives full marks"
  ] : [
    "Tidak ada — angkanya benar", c, "File jadi lebih kecil", "Checker tetap memberi nilai penuh"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The 'EV base' dashboard cell contains the typed number ${b2e(ev)} (not a formula). The problem?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `A typed number freezes at today's value. Once assumptions are revised, the dashboard lies with a straight face — and the checker flags =number as hardcode dressed as a formula, not a formula. (${ref})`,
    steps: ["Analysis: what happens to a typed number when assumptions change?",
      "Solve 1: nothing — it stays frozen at today's value.",
      "Solve 2: the dashboard then reports stale values as if live.",
      "Solve 3: link it — every output cell must be a formula, never a typed number."]
  };
  return {
    q: `Sel 'EV base' di dashboard berisi angka ketik ${b2i(ev)} (bukan rumus). Masalahnya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Angka ketik membeku di nilai hari ini. Begitu asumsi direvisi, dashboard berbohong dengan wajah meyakinkan — dan checker menandai =angka sebagai hardcode berkedok rumus, bukan rumus. (${ref})`,
    steps: ["Analysis: apa yang terjadi pada angka ketik saat asumsi berubah?",
      "Solve 1: tidak ada — ia membeku di nilai hari ini.",
      "Solve 2: dashboard lalu melaporkan nilai basi seolah-olah live.",
      "Solve 3: link-kan — tiap sel output harus rumus, bukan angka ketik."]
  };
}
function vB2RangePresent(rng, ref, L){
  const lo = b2step(rng, 22000, 28000, 1000), hi = lo + b2step(rng, 24000, 30000, 1000);
  const mid = Math.round((lo + hi) / 2);
  const c = L === "en"
    ? "Report the range + the scenarios producing it; a single point hides risk"
    : "Laporkan rentang + skenario yang menghasilkannya; satu titik menyembunyikan risiko";
  const o = L === "en" ? [
    `Report the midpoint ${b2e(mid)}`, c, "Hide the sensitivity table", "Raise g to narrow the range"
  ] : [
    `Laporkan titik tengah ${b2i(mid)}`, c, "Sembunyikan tabel sensitivitasnya", "Naikkan g agar rentang menyempit"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The sensitivity range ${b2e(lo)}–${b2e(hi)} comes from just ±2pp on WACC & g. Implication for the valuation presentation?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `One point (e.g. ${b2e(mid)}) hides that valuation could be ${b2e(lo)} in a bad world. Honest presentation: point + range + scenarios at each end. Tweaking g to make the range 'pretty' = falsifying uncertainty. (${ref})`,
    steps: ["Analysis: what does a wide range mean for the audience?",
      `Solve 1: the range ${b2e(lo)}–${b2e(hi)} spans a ${b2e(hi - lo)} swing from ±2pp of assumptions.`,
      "Solve 2: a single point hides that whole swing.",
      "Solve 3: present point + range + the scenarios at each end — never tune g to beautify it."]
  };
  return {
    q: `Rentang sensitivitas ${b2i(lo)}–${b2i(hi)} hanya dari ±2pp di WACC & g. Implikasi untuk presentasi valuasi?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Satu titik (mis. ${b2i(mid)}) menyembunyikan bahwa valuasi bisa ${b2i(lo)} di dunia buruk. Presentasi yang jujur: titik + rentang + skenario di tiap ujung. Mengutak-atik g agar rentang 'cantik' = memalsukan ketidakpastian. (${ref})`,
    steps: ["Analysis: apa arti rentang lebar bagi audiens?",
      `Solve 1: rentang ${b2i(lo)}–${b2i(hi)} mencakup ayunan ${b2i(hi - lo)} dari ±2pp asumsi.`,
      "Solve 2: satu titik menyembunyikan seluruh ayunan itu.",
      "Solve 3: sajikan titik + rentang + skenario di tiap ujung — jangan utak-atik g agar cantik."]
  };
}
function vB2REPT(rng, ref, L){
  const evB = b2step(rng, 30000, 40000, 2500), evE = evB + b2step(rng, 5000, 10000, 2500);
  const blk = 2500, bB = Math.round(evB / blk), bE = Math.round(evE / blk);
  const tvP = Math.round(evB * 1.18), tvE = Math.round(evE * 1.17);
  const c = L === "en"
    ? `EV exit > EV base because exit TV (${b2e(tvE)}) > perpetuity TV (${b2e(tvP)}) — an instant visual comparison`
    : `EV exit > EV base karena TV exit (${b2i(tvE)}) > TV perpetuitas (${b2i(tvP)}) — perbandingan visual instan`;
  const o = L === "en" ? [
    "The exact numbers", c, "The chart is miscalculated", "The block scale is inconsistent"
  ] : [
    "Angka pastinya", c, "Chart-nya salah hitung", "Skala bloknya tidak konsisten"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `REPT bars: EV base ${bB} blocks vs EV exit ${bE} blocks (1 block = ${b2e(blk)}). What does it communicate in 3 seconds?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Bar charts are not for precision — for instant comparison. ${bE} vs ${bB} blocks reads immediately: the exit method is higher, consistent with exit TV > perpetuity TV. Exact numbers still live in the dashboard cells. (${ref})`,
    steps: ["Analysis: what is a bar chart FOR — precision or comparison?",
      `Solve 1: ${bE} blocks vs ${bB} blocks — exit is visibly taller.`,
      "Solve 2: the visual gap matches the TV gap (exit TV > perpetuity TV).",
      "Solve 3: exact numbers stay in the cells; the chart is the 3-second read."]
  };
  return {
    q: `Bar REPT: EV base ${bB} blok vs EV exit ${bE} blok (1 blok = ${b2i(blk)}). Apa yang dikomunikasikan dalam 3 detik?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Bar chart bukan untuk presisi — untuk perbandingan instan. ${bE} vs ${bB} blok langsung terbaca: metode exit lebih tinggi, konsisten dengan TV exit > TV perpetuitas. Angka pastinya tetap dibaca di sel dashboard. (${ref})`,
    steps: ["Analysis: bar chart itu UNTUK apa — presisi atau perbandingan?",
      `Solve 1: ${bE} blok vs ${bB} blok — exit tampak lebih tinggi.`,
      "Solve 2: selisih visual cocok dengan selisih TV (TV exit > TV perpetuitas).",
      "Solve 3: angka pastinya tetap di sel; chart adalah bacaan 3 detik."]
  };
}
function vB2KPITree(rng, ref, L){
  const kpi = b2pick([["kunjungan × konversi", "visits × conversion"], ["traffic × conversion", "traffic × conversion"], ["kunjungan toko × basket", "store visits × basket"]], rng);
  const c = L === "en"
    ? `Operating KPIs + their owners (e.g. ${kpi[1]})`
    : `KPI operasional + pemiliknya (mis. ${kpi[0]})`;
  const o = L === "en" ? [
    c, "One EV number only", "The industry average", "Yesterday's share price"
  ] : [
    c, "Satu angka EV saja", "Rata-rata industri", "Harga saham kemarin"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A proper KPI tree traces EV down to…`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `KPI tree: EV → value drivers → operating KPIs with owners. A tree without owners = decoration. (${ref})`,
    steps: ["Analysis: where does a KPI tree END?",
      "Solve 1: EV → value drivers → operating KPIs.",
      "Solve 2: each KPI needs an OWNER — someone accountable.",
      "Solve 3: a tree without owners is decoration, not management."]
  };
  return {
    q: `KPI tree yang benar menelusuri EV ke bawah sampai ke…`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `KPI tree: EV → driver nilai → KPI operasional yang punya pemilik. Pohon tanpa pemilik = dekorasi. (${ref})`,
    steps: ["Analysis: di mana KPI tree BERAKHIR?",
      "Solve 1: EV → driver nilai → KPI operasional.",
      "Solve 2: tiap KPI butuh PEMILIK — seseorang yang bertanggung jawab.",
      "Solve 3: pohon tanpa pemilik adalah dekorasi, bukan alat manajemen."]
  };
}
function vB2LeaseEBITDA(rng, ref, L){
  const c = L === "en"
    ? "EBITDA RISES: operating rent expense (above EBITDA) disappears, replaced by right-of-use depreciation + lease interest (below EBITDA) — same economics, different number"
    : "EBITDA NAIK: beban sewa operasi (di atas EBITDA) hilang, diganti depresiasi hak-guna + bunga sewa (di bawah EBITDA) — ekonomi sama, angka beda";
  const o = L === "en" ? [
    "Net income rises", "EBITDA falls", c, "No impact"
  ] : [
    "Laba bersih naik", "EBITDA turun", c, "Tidak ada dampak"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `New standard: operating leases go on-balance-sheet (right-of-use asset + lease liability). Impact on a retailer's EBITDA?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `EBITDA rises with zero economic change: rent expense (above EBITDA) becomes right-of-use depreciation + lease interest (both below EBITDA). Gate trap: EV/EBITDA looks 'cheap' when it is just reclassification — compare multiples only under the same standard. (${ref})`,
    steps: ["Analysis: where does rent sit relative to EBITDA, before and after?",
      "Solve 1: before — operating rent is ABOVE EBITDA (it reduces it).",
      "Solve 2: after — ROU depreciation + lease interest sit BELOW EBITDA.",
      "Solve 3: same economics, higher EBITDA — compare multiples only within one standard."]
  };
  return {
    q: `Standar baru: operating lease masuk neraca (aset hak-guna + liabilitas sewa). Dampak ke EBITDA perusahaan ritel?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `EBITDA naik tanpa perubahan ekonomi: beban sewa (dulu di atas EBITDA) menjadi depresiasi hak-guna + bunga sewa (keduanya di bawah EBITDA). Jebakan gerbang: EV/EBITDA terlihat 'murah' padahal cuma reklasifikasi — bandingkan multiple hanya dalam standar yang sama. (${ref})`,
    steps: ["Analysis: di mana posisi sewa relatif terhadap EBITDA, sebelum dan sesudah?",
      "Solve 1: sebelum — beban sewa operasi DI ATAS EBITDA (menguranginya).",
      "Solve 2: sesudah — depresiasi hak-guna + bunga sewa DI BAWAH EBITDA.",
      "Solve 3: ekonomi sama, EBITDA naik — bandingkan multiple hanya dalam satu standar."]
  };
}
function vB2DTARecog(rng, ref, L){
  const nol = b2step(rng, 8000, 15000, 2000), t = 22, dta = Math.round(nol * t / 100);
  const c = L === "en"
    ? "Only when future taxable profits sufficient to absorb it are probable; otherwise → valuation allowance; a DTA isn't cash"
    : "Hanya bila probable ada laba fiskal masa depan yang cukup menyerapnya; bila tidak → valuation allowance; DTA bukan kas";
  const o = L === "en" ? [
    "Always — losses always become tax savings", c, "Never", "Only for banks"
  ] : [
    "Selalu — rugi pasti jadi penghemat pajak", c, "Tidak pernah", "Hanya untuk bank"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `NOL Rp${b2e(nol)}k × ${t}% rate = DTA Rp${b2e(dta)}k. When may the DTA be recognized on the balance sheet?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `A DTA is recognized only when sufficient future taxable profit to absorb the loss is probable (more likely than not). Otherwise a valuation allowance is booked (net DTA can be zero). A DTA is not cash or a receivable — it is a conditional promise; recognizing it fully without prospective profits = inflating assets. (${ref})`,
    steps: ["Analysis: the ceiling is arithmetic; recognition is a probability test.",
      `Solve 1: ceiling = ${b2e(nol)} × ${t}% = ${b2e(dta)}.`,
      "Solve 2: test — are future taxable profits PROBABLE?",
      "Solve 3: not probable → valuation allowance; the DTA is a conditional promise, not cash."]
  };
  return {
    q: `NOL Rp${b2i(nol)} ribu × tarif ${t}% = DTA Rp${b2i(dta)} ribu. Kapan DTA boleh diakui di neraca?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `DTA diakui hanya bila probable (lebih mungkin daripada tidak) ada laba kena pajak masa depan untuk menyerap rugi. Bila tidak, dibentuk valuation allowance (DTA neto bisa nol). DTA bukan kas dan bukan piutang — ia janji bersyarat; mengakuinya penuh tanpa laba prospektif = menggelembungkan aset. (${ref})`,
    steps: ["Analysis: plafon itu aritmetika; pengakuan adalah uji probabilitas.",
      `Solve 1: plafon = ${b2i(nol)} × ${t}% = ${b2i(dta)}.`,
      "Solve 2: uji — apakah laba kena pajak masa depan PROBABLE?",
      "Solve 3: tidak probable → valuation allowance; DTA adalah janji bersyarat, bukan kas."]
  };
}

/* ---------- hari-31: IPO (bonus) ---------- */
function vB2IPOProceeds(rng, ref, L){
  const sh = b2pick([100, 150, 200, 250], rng), price = b2pick([800, 1000, 1200], rng), fee = b2pick([2, 3, 4], rng);
  const gross = sh * price / 1000, cost = Math.round(gross * fee / 100 * 100) / 100, net = Math.round((gross - cost) * 100) / 100;
  const vals = [net, gross, Math.round((gross + cost) * 100) / 100, cost];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? "Rp" + b2e(v, 0) + " billion" : "Rp" + b2i(v, 0) + " miliar";
  if (L === "en") return {
    q: `IPO: ${b2e(sh)} million new shares @ Rp${b2e(price)}, ${fee}% issue costs. Net proceeds?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Gross Rp${b2e(gross, 0)} billion; costs Rp${b2e(cost, 2)} billion; net = Rp${b2e(net, 0)} billion. (${ref})`,
    steps: ["Analysis: net proceeds = gross minus issue costs.",
      `Solve 1: gross = ${b2e(sh)}m × ${b2e(price)} = Rp${b2e(gross, 0)} billion.`,
      `Solve 2: costs = ${fee}% × ${b2e(gross, 0)} = Rp${b2e(cost, 2)} billion.`,
      `Solve 3: net = ${b2e(gross, 0)} − ${b2e(cost, 2)} = Rp${b2e(net, 0)} billion.`]
  };
  return {
    q: `IPO: ${b2i(sh)} juta saham baru @ Rp${b2i(price)}, biaya emisi ${fee}%. Net proceeds?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Gross Rp${b2i(gross, 0)} miliar; biaya Rp${b2i(cost, 2)} miliar; net = Rp${b2i(net, 0)} miliar. (${ref})`,
    steps: ["Analysis: net proceeds = gross dikurangi biaya emisi.",
      `Solve 1: gross = ${b2i(sh)} jt × ${b2i(price)} = Rp${b2i(gross, 0)} miliar.`,
      `Solve 2: biaya = ${fee}% × ${b2i(gross, 0)} = Rp${b2i(cost, 2)} miliar.`,
      `Solve 3: net = ${b2i(gross, 0)} − ${b2i(cost, 2)} = Rp${b2i(net, 0)} miliar.`]
  };
}
function vB2IPOEquity(rng, ref, L){
  const pre = b2step(rng, 600, 1000, 100), net = b2step(rng, 150, 250, 10), liab = b2step(rng, 600, 800, 100);
  const eq = pre + net, assets = liab + eq;
  const vals = [eq, pre, pre + net + liab, assets + 500];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? "Rp" + b2e(v) + " billion" : "Rp" + b2i(v) + " miliar";
  if (L === "en") return {
    q: `Pre-IPO equity Rp${b2e(pre)} billion; net proceeds Rp${b2e(net)} billion. Pro forma equity?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Pro forma equity = ${b2e(pre)} + ${b2e(net)} = Rp${b2e(eq)} billion. Pro forma assets Rp${b2e(assets)} billion (= ${b2e(liab)} liabilities + ${b2e(eq)} equity) ✓ balanced. (${ref})`,
    steps: ["Analysis: IPO proceeds land in equity (and cash).",
      `Solve 1: pro forma equity = pre-IPO equity + net proceeds.`,
      `Solve 2: substitute → ${b2e(pre)} + ${b2e(net)} = Rp${b2e(eq)} billion.`,
      `Solve 3: check — assets ${b2e(assets)} = liabilities ${b2e(liab)} + equity ${b2e(eq)} ✓.`]
  };
  return {
    q: `Pra-IPO ekuitas Rp${b2i(pre)} miliar; net proceeds Rp${b2i(net)} miliar. Ekuitas pro forma?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Ekuitas pro forma = ${b2i(pre)} + ${b2i(net)} = Rp${b2i(eq)} miliar. Aset pro forma Rp${b2i(assets)} miliar (= ${b2i(liab)} liabilitas + ${b2i(eq)} ekuitas) ✓ balance. (${ref})`,
    steps: ["Analysis: proceeds IPO masuk ke ekuitas (dan kas).",
      "Solve 1: ekuitas pro forma = ekuitas pra-IPO + net proceeds.",
      `Solve 2: substitusi → ${b2i(pre)} + ${b2i(net)} = Rp${b2i(eq)} miliar.`,
      `Solve 3: cek — aset ${b2i(assets)} = liabilitas ${b2i(liab)} + ekuitas ${b2i(eq)} ✓.`]
  };
}
function vB2IPOUnder(rng, ref, L){
  const sh = b2pick([100, 150, 200], rng), price = b2pick([800, 1000, 1250], rng);
  const up = b2pick([10, 15, 20, 25], rng), close = Math.round(price * (1 + up / 100));
  const left = Math.round(sh * (close - price) / 1000);
  const f = v => L === "en" ? "Rp" + b2e(v) + " billion" : "Rp" + b2i(v) + " miliar";
  const c = L === "en" ? `${up}%; ${f(left)}` : `${up}%; ${f(left)}`;
  const o = [
    c,
    L === "en" ? `${up}%; ${f(sh * price / 1000)}` : `${up}%; ${f(sh * price / 1000)}`,
    L === "en" ? `${Math.round(up * 0.7)}%; ${f(left)}` : `${Math.round(up * 0.7)}%; ${f(left)}`,
    L === "en" ? `${up - 2}%; ${f(Math.round(left * 0.87))}` : `${up - 2}%; ${f(Math.round(left * 0.87))}`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `IPO price Rp${b2e(price)}, first-day close Rp${b2e(close)}, ${b2e(sh)} million shares offered. Underpricing & money left on the table?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Underpricing ${up}%; money left on the table = ${b2e(sh)}m × ${b2e(close - price)} = ${f(left)}. (${ref})`,
    steps: ["Analysis: underpricing is the first-day jump; money left is the jump times shares sold.",
      `Solve 1: underpricing = (${b2e(close)} − ${b2e(price)}) ÷ ${b2e(price)} = ${up}%.`,
      `Solve 2: money left = ${b2e(sh)}m shares × Rp${b2e(close - price)} per share.`,
      `Solve 3: compute → ${f(left)}.`]
  };
  return {
    q: `Harga IPO Rp${b2i(price)}, tutup hari pertama Rp${b2i(close)}, ${b2i(sh)} juta saham ditawarkan. Underpricing & money left on the table?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Underpricing ${up}%; money left on the table = ${b2i(sh)} jt × ${b2i(close - price)} = ${f(left)}. (${ref})`,
    steps: ["Analysis: underpricing adalah lompatan hari pertama; money left adalah lompatan dikali saham terjual.",
      `Solve 1: underpricing = (${b2i(close)} − ${b2i(price)}) ÷ ${b2i(price)} = ${up}%.`,
      `Solve 2: money left = ${b2i(sh)} jt saham × Rp${b2i(close - price)} per saham.`,
      `Solve 3: hitung → ${f(left)}.`]
  };
}
function vB2IPOLockup(rng, ref, L){
  const c = L === "en" ? "8 months (lock-up)" : "8 bulan (lock-up)";
  const o = L === "en" ? [
    c, "30 days", "1 year", "No lock-up"
  ] : [
    c, "30 hari", "1 tahun", "Tidak ada lock-up"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Post-IPO controlling shareholders on the IDX may not sell for…`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `An 8-month lock-up. When it expires, extra supply can pressure the price — apart from fundamentals. (${ref})`,
    steps: ["Analysis: the lock-up protects the aftermarket from an insider supply flood.",
      "Solve 1: IDX rule — controlling shareholders are locked up for 8 months.",
      "Solve 2: expiry adds supply — price pressure is possible, separate from fundamentals.",
      "Solve 3: mark the expiry date; it is a supply event, not a verdict on the business."]
  };
  return {
    q: `Pemegang saham pengendali pasca-IPO di BEI dilarang menjual selama…`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Lock-up 8 bulan. Saat lock-up berakhir, supply tambahan bisa menekan harga — terpisah dari fundamental. (${ref})`,
    steps: ["Analysis: lock-up melindungi pasar dari banjir supply orang dalam.",
      "Solve 1: aturan BEI — pemegang saham pengendali lock-up 8 bulan.",
      "Solve 2: saat berakhir, supply bertambah — tekanan harga mungkin terjadi, terpisah dari fundamental.",
      "Solve 3: catat tanggal berakhirnya; itu peristiwa supply, bukan vonis atas bisnisnya."]
  };
}
function vB2IPOBook(rng, ref, L){
  const c = L === "en"
    ? "Collecting institutional orders at a price range before pricing"
    : "Pengumpulan pesanan investor institusi pada kisaran harga sebelum pricing";
  const o = L === "en" ? [
    c, "Selling shares to retail on day one", "Auditing pre-IPO financials", "A board meeting to set dividends"
  ] : [
    c, "Penjualan saham ke ritel di hari pertama", "Audit laporan keuangan pra-IPO", "Rapat direksi penentuan dividen"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Bookbuilding is…`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Bookbuilding: the underwriter collects institutional orders at a price range; the result sets the final price & allotment. (${ref})`,
    steps: ["Analysis: what happens BEFORE the IPO price is set?",
      "Solve 1: the underwriter opens a price RANGE, not a fixed price.",
      "Solve 2: institutional investors submit orders (price × quantity) into the 'book'.",
      "Solve 3: the book sets the final price and the allotment."]
  };
  return {
    q: `Bookbuilding adalah…`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Bookbuilding: underwriter mengumpulkan pesanan institusi pada kisaran harga; hasilnya menentukan harga final & allotment. (${ref})`,
    steps: ["Analysis: apa yang terjadi SEBELUM harga IPO ditetapkan?",
      "Solve 1: underwriter membuka KISARAN harga, bukan harga tetap.",
      "Solve 2: investor institusi memasukkan pesanan (harga × jumlah) ke 'buku'.",
      "Solve 3: buku itu menentukan harga final dan allotment."]
  };
}
function vB2IPOSecondary(rng, ref, L){
  const c = L === "en"
    ? "The selling shareholder, not company cash"
    : "Pemegang saham yang menjual, bukan kas perusahaan";
  const o = L === "en" ? [
    c, "Company cash", "The underwriter", "The exchange"
  ] : [
    c, "Kas perusahaan", "Underwriter", "BEI"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Secondary offering: the sale cash goes to…`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `A secondary offering sells existing shares — cash goes to the seller, not the company. Do not record it as cash in the pro forma. (${ref})`,
    steps: ["Analysis: primary vs secondary — who issues the shares?",
      "Solve 1: secondary = EXISTING shares sold by a holder.",
      "Solve 2: the company issues nothing new — it receives nothing.",
      "Solve 3: cash goes to the selling shareholder; the pro forma shows no cash in."]
  };
  return {
    q: `Secondary offering: kas hasil penjualan saham masuk ke…`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Secondary offering menjual saham lama — kasnya ke penjual, bukan perusahaan. Jangan catat sebagai kas masuk di pro forma. (${ref})`,
    steps: ["Analysis: primary vs secondary — siapa yang menerbitkan saham?",
      "Solve 1: secondary = saham LAMA yang dijual pemegangnya.",
      "Solve 2: perusahaan tidak menerbitkan saham baru — tidak menerima apa-apa.",
      "Solve 3: kas masuk ke pemegang saham yang menjual; pro forma tidak mencatat kas masuk."]
  };
}
/* ---------- excel-l1 ---------- */
function vB2SumRange(rng, ref, L){
  const r0 = b2pick([6, 8, 10], rng), n = b2pick([5, 8, 10], rng), col = b2pick(["C", "D"], rng);
  const r1 = r0 + n - 1;
  const c = `=SUM(${col}${r0}:${col}${r1})`;
  const o = [
    c, `=AVERAGE(${col}${r0}:${col}${r1})`, `=COUNT(${col}${r0}:${col}${r1})`, `=MAX(${col}${r0}:${col}${r1})`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The Qty column holds ${n} numbers (${col}${r0}:${col}${r1}). The correct total formula?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `=SUM(${col}${r0}:${col}${r1}). AVERAGE = average, COUNT = how many, MAX = largest. (${ref})`,
    steps: ["Analysis: which aggregation gives a TOTAL?",
      "Solve 1: SUM adds the range.",
      "Solve 2: AVERAGE/COUNT/MAX answer different questions.",
      `Solve 3: =SUM(${col}${r0}:${col}${r1}).`]
  };
  return {
    q: `Kolom Qty berisi ${n} angka (${col}${r0}:${col}${r1}). Rumus total yang benar?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `=SUM(${col}${r0}:${col}${r1}). AVERAGE = rata-rata, COUNT = banyaknya, MAX = terbesar. (${ref})`,
    steps: ["Analysis: agregasi mana yang menghasilkan TOTAL?",
      "Solve 1: SUM menjumlah range.",
      "Solve 2: AVERAGE/COUNT/MAX menjawab pertanyaan berbeda.",
      `Solve 3: =SUM(${col}${r0}:${col}${r1}).`]
  };
}
function vB2Countif(rng, ref, L){
  const th = b2pick([10, 15, 20, 25], rng), col = b2pick(["C", "D"], rng);
  const r0 = 6, r1 = 13;
  const c = `=COUNTIF(${col}${r0}:${col}${r1},">${th}")`;
  const o = [
    `=COUNT(${col}${r0}:${col}${r1}) saja`, `=COUNTA(${col}${r0}:${col}${r1}) saja`, c, `=SUMIF(${col}${r0}:${col}${r1},">${th}")`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `You want to count 'transactions with qty above ${th}'. The right function?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `=COUNTIF(${col}${r0}:${col}${r1}, ">${th}") — COUNTIF = COUNT with one criterion. (${ref})`,
    steps: ["Analysis: COUNT rows that meet a condition — which function?",
      "Solve 1: COUNT counts all numbers — no condition.",
      `Solve 2: COUNTIF adds one criterion: ">${th}".`,
      `Solve 3: =COUNTIF(${col}${r0}:${col}${r1},">${th}"). SUMIF would SUM, not count.`]
  };
  return {
    q: `Mau menghitung 'banyaknya transaksi dengan qty di atas ${th}'. Fungsi yang tepat?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `=COUNTIF(${col}${r0}:${col}${r1}, ">${th}") — COUNTIF = COUNT dengan satu kriteria. (${ref})`,
    steps: ["Analysis: HITUNG baris yang memenuhi kondisi — fungsi mana?",
      "Solve 1: COUNT menghitung semua angka — tanpa kondisi.",
      `Solve 2: COUNTIF menambah satu kriteria: ">${th}".`,
      `Solve 3: =COUNTIF(${col}${r0}:${col}${r1},">${th}"). SUMIF menjumlah, bukan menghitung.`]
  };
}
function vB2AbsCopy(rng, ref, L){
  const col = b2pick(["B", "C"], rng), row = b2pick([15, 20], rng);
  const c = L === "en" ? `Stays $${col}$${row} because it is locked` : `Tetap $${col}$${row} karena terkunci`;
  const o = L === "en" ? [
    `Moves to $${col}$${row + 1}`, c, `Moves to $${String.fromCharCode(col.charCodeAt(0) + 1)}$${row}`, "Becomes error #REF!"
  ] : [
    `Ikut berubah menjadi $${col}$${row + 1}`, c, `Ikut berubah menjadi $${String.fromCharCode(col.charCodeAt(0) + 1)}$${row}`, "Menjadi error #REF!"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The formula =B20*(1-$${col}$${row}) is copied from C20 to C21. What happens to $${col}$${row}?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `It stays $${col}$${row}. The $ locks column AND row — the assumption cell does not 'walk'. (${ref})`,
    steps: ["Analysis: read the $ signs on the reference.",
      `Solve 1: $${col}$${row} — $ before column AND before row: fully absolute.`,
      "Solve 2: copying down (or across) cannot move it.",
      "Solve 3: the assumption cell stays put — that is the point of $. "]
  };
  return {
    q: `Rumus =B20*(1-$${col}$${row}) di-copy dari C20 ke C21. Apa yang terjadi pada $${col}$${row}?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Tetap $${col}$${row}. Tanda $ mengunci kolom DAN baris — sel asumsi tidak ikut 'jalan'. (${ref})`,
    steps: ["Analysis: baca tanda $ pada referensi.",
      `Solve 1: $${col}$${row} — $ sebelum kolom DAN sebelum baris: absolut penuh.`,
      "Solve 2: copy ke bawah (atau ke kanan) tidak bisa menggesernya.",
      "Solve 3: sel asumsi tetap di tempat — itulah gunanya $."]
  };
}
function vB2IFS(rng, ref, L){
  const t1 = b2pick([500, 1000], rng), t2 = t1 * 2;
  const r1 = 5, r2 = 10;
  const c = `=IFS(A1>=${t2},${r2}%,A1>=${t1},${r1}%,1,0)`;
  const o = [
    `=IF(A1>=${t1},${r1}%,IF(A1>=${t2},${r2}%,0))`, c,
    `=IF(A1>=${t2},${r2}%,0)+IF(A1>=${t1},${r1}%,0)`, `=SWITCH(TRUE,A1>=${t2},${r2}%,${r1}%)`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Bonus rule: revenue ≥${t2} → ${r2}%, revenue ≥${t1} → ${r1}%, else 0%. Best formula structure?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `=IFS(A1>=${t2}, ${r2}%, A1>=${t1}, ${r1}%, TRUE, 0). IFS reads better than nested IFs; order from the highest threshold. The first option is buggy: ${t2} hits the ${r1}% branch first. (${ref})`,
    steps: ["Analysis: tiered thresholds — order matters.",
      `Solve 1: test the HIGHEST threshold first (${t2}), then ${t1}.`,
      `Solve 2: IFS lists pairs in order — first true pair wins.`,
      `Solve 3: the nested-IF option tests ${t1} first, so ${t2} wrongly earns ${r1}%.`]
  };
  return {
    q: `Aturan bonus: omzet ≥${t2} → ${r2}%, omzet ≥${t1} → ${r1}%, sisanya 0%. Struktur rumus terbaik?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `=IFS(A1>=${t2}, ${r2}%, A1>=${t1}, ${r1}%, TRUE, 0). IFS lebih terbaca dari IF bertingkat; urutan dari ambang tertinggi. Opsi pertama bug: ${t2} kena cabang ${r1}% duluan. (${ref})`,
    steps: ["Analysis: ambang bertingkat — urutan menentukan.",
      `Solve 1: uji ambang TERTINGGI dulu (${t2}), baru ${t1}.`,
      "Solve 2: IFS menulis pasangan berurutan — pasangan benar pertama yang menang.",
      `Solve 3: opsi IF bertingkat menguji ${t1} dulu, sehingga ${t2} salah dapat ${r1}%.`]
  };
}
/* ---------- excel-l2 ---------- */
function vB2IMLeft(rng, ref, L){
  const c = L === "en" ? "INDEX + MATCH (free direction)" : "INDEX + MATCH (arah bebas)";
  const o = L === "en" ? [
    "VLOOKUP (searches right only)", "HLOOKUP (searches down)", c, "SUMIFS (aggregation only)"
  ] : [
    "VLOOKUP (cari kanan saja)", "HLOOKUP (cari ke bawah)", c, "SUMIFS (agregasi saja)"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `You need a price from a table where the Product column is to the RIGHT of the Price column. Which function can do it?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `INDEX + MATCH — free direction, column positions do not matter. VLOOKUP fails completely here. (${ref})`,
    steps: ["Analysis: the key is RIGHT of the value — which lookups can go left?",
      "Solve 1: VLOOKUP only searches right of the key — dead here.",
      "Solve 2: MATCH finds the position regardless of direction.",
      "Solve 3: INDEX takes the value at that position — left or right."]
  };
  return {
    q: `Mau mengambil harga dari tabel di mana kolom Produk ada di SEBELAH KANAN kolom Harga. Fungsi yang bisa?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `INDEX + MATCH — arah bebas, tidak peduli posisi kolom. VLOOKUP gagal total di kasus ini. (${ref})`,
    steps: ["Analysis: kunci ada di KANAN nilai — lookup mana yang bisa ke kiri?",
      "Solve 1: VLOOKUP hanya mencari ke kanan kunci — mati di sini.",
      "Solve 2: MATCH menemukan posisi tanpa peduli arah.",
      "Solve 3: INDEX mengambil nilai di posisi itu — kiri atau kanan."]
  };
}
function vB2SumifsRead(rng, ref, L){
  const city = b2pick(["Jakarta", "Bandung"], rng), prod = b2pick(["Kopi", "Teh"], rng);
  const c = L === "en"
    ? `Total of column D for rows that are ${city} AND ${prod}`
    : `Total kolom D untuk baris ${city} DAN ${prod}`;
  const o = L === "en" ? [
    `Count of ${city}-${prod} rows`, c, `Average of column D for ${city} or ${prod}`, `Total of column D for ${city} OR ${prod}`
  ] : [
    `Banyaknya baris ${city}-${prod}`, c, `Rata-rata kolom D untuk ${city} atau ${prod}`, `Total kolom D untuk ${city} ATAU ${prod}`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `=SUMIFS(D:D, A:A, "${city}", C:C, "${prod}"). What is computed?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Total of column D where branch=${city} AND product=${prod}. *IFS criteria = AND, not OR. (${ref})`,
    steps: ["Analysis: read SUMIFS argument by argument.",
      "Solve 1: D:D is the range being SUMMED.",
      `Solve 2: criteria — A:A = "${city}" AND C:C = "${prod}".`,
      "Solve 3: *IFS criteria combine with AND — a row must meet both."]
  };
  return {
    q: `=SUMIFS(D:D, A:A, "${city}", C:C, "${prod}"). Apa yang dihitung?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Total kolom D di mana cabang=${city} DAN produk=${prod}. Kriteria *IFS = AND, bukan OR. (${ref})`,
    steps: ["Analysis: baca argumen SUMIFS satu per satu.",
      "Solve 1: D:D adalah range yang DIJUMLAH.",
      `Solve 2: kriteria — A:A = "${city}" DAN C:C = "${prod}".`,
      "Solve 3: kriteria *IFS bergabung dengan AND — baris harus memenuhi keduanya."]
  };
}
function vB2DateValue(rng, ref, L){
  const y = b2pick([2025, 2026], rng), m = b2pick([1, 3, 7, 11], rng), d = b2pick([5, 15, 28], rng);
  const ds = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const c = `=MONTH(DATEVALUE(A1))`;
  const o = [
    c, "Take the 7 left characters", "Take the 2 middle characters", "Type it manually"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The Date column holds the text '${ds}'. Cleanest way to get the month as the number ${m}?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `=MONTH(DATEVALUE(A1)) — convert text to a date, then take the month. LEFT/MID are fragile if the format changes. (${ref})`,
    steps: ["Analysis: the value LOOKS like a date but IS text.",
      "Solve 1: convert the text to a real date — DATEVALUE.",
      `Solve 2: take the month — MONTH(...) = ${m}.`,
      "Solve 3: string surgery (LEFT/MID) breaks the moment the format changes."]
  };
  return {
    q: `Kolom Tanggal berisi teks '${ds}'. Mau ambil bulannya sebagai angka ${m}. Cara paling bersih?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `=MONTH(DATEVALUE(A1)) — ubah teks jadi tanggal, baru ambil bulannya. LEFT/MID rapuh kalau format berubah. (${ref})`,
    steps: ["Analysis: nilainya TERLIHAT seperti tanggal tapi BERTIPE teks.",
      "Solve 1: ubah teks jadi tanggal sungguhan — DATEVALUE.",
      `Solve 2: ambil bulannya — MONTH(...) = ${m}.`,
      "Solve 3: bedah string (LEFT/MID) rusak begitu format berubah."]
  };
}
function vB2Validation(rng, ref, L){
  const typo = b2pick(["Jakrta", "Bandng", "Jakrata"], rng);
  const c = L === "en"
    ? "It stays — only new input is guarded"
    : "Tetap — hanya input baru dijaga";
  const o = L === "en" ? [
    "Excel auto-corrects it", c, "The file becomes fully corrupt", "It is emptied automatically"
  ] : [
    "Dikoreksi otomatis oleh Excel", c, "File menjadi corrupt total", "Dikosongkan secara otomatis"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A branch data-validation dropdown is installed, but an old cell holds '${typo}' (typo). What happens?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Validation only blocks new wrong input; old typo'd data stays and must be cleaned manually (or with formulas). (${ref})`,
    steps: ["Analysis: when does validation act — on old data or new input?",
      "Solve 1: validation fires at INPUT time only.",
      "Solve 2: existing cells are never re-checked.",
      "Solve 3: clean old typos separately — validation will not do it."]
  };
  return {
    q: `Data validation dropdown cabang sudah dipasang, tapi ada sel lama berisi '${typo}' (typo). Apa yang terjadi?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Validasi hanya mencegah input baru yang salah; data lama yang typo tetap ada dan harus dibersihkan manual (atau dengan rumus). (${ref})`,
    steps: ["Analysis: kapan validasi bekerja — pada data lama atau input baru?",
      "Solve 1: validasi hanya aktif saat INPUT.",
      "Solve 2: sel yang sudah ada tidak pernah dicek ulang.",
      "Solve 3: bersihkan typo lama secara terpisah — validasi tidak melakukannya."]
  };
}
function vB2PivotIFS(rng, ref, L){
  const c = L === "en"
    ? "Formulas are auditable; PivotTables need refresh"
    : "Rumus *IFS teraudit; PivotTable butuh refresh";
  const o = L === "en" ? [
    "PivotTables are faster, formulas slower", "PivotTables max out at 10k rows of data", "Both do exactly the same thing", c
  ] : [
    "PivotTable lebih cepat, rumus lebih lambat", "PivotTable maks 10 ribu baris data", "Keduanya sama persis fungsinya", c
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Which statement about PivotTable vs *IFS formulas is TRUE?`,
    opts: order.map(i => o[i]), answer: order.indexOf(3),
    explain: `*IFS formulas are live and auditable; PivotTables need Refresh and hide their trail behind clicks. For maintained models, formulas win. (${ref})`,
    steps: ["Analysis: compare the two on auditability and freshness.",
      "Solve 1: *IFS formulas are live — they recalculate and show their logic.",
      "Solve 2: PivotTables are snapshots — they need Refresh and hide logic behind clicks.",
      "Solve 3: for a model that is maintained, the auditable live formula wins."]
  };
  return {
    q: `Mana pernyataan BENAR tentang PivotTable vs rumus *IFS?`,
    opts: order.map(i => o[i]), answer: order.indexOf(3),
    explain: `Rumus *IFS live dan teraudit; PivotTable butuh Refresh dan jejaknya tersembunyi di balik klik. Untuk model yang dirawat, rumus menang. (${ref})`,
    steps: ["Analysis: bandingkan keduanya dari sisi auditabilitas dan kesegaran.",
      "Solve 1: rumus *IFS live — menghitung ulang dan logikanya terlihat.",
      "Solve 2: PivotTable adalah snapshot — butuh Refresh dan logikanya tersembunyi di balik klik.",
      "Solve 3: untuk model yang dirawat, rumus yang live dan teraudit menang."]
  };
}
/* ---------- excel-l3 ---------- */
function vB2Spill(rng, ref, L){
  const c = L === "en" ? "A #SPILL! error shows up" : "Error #SPILL! ditampilkan";
  const o = L === "en" ? [
    "The filter result overwrites old data", c, "A #REF! error shows up", "The filter result is cut off"
  ] : [
    "Hasil filter menimpa data lama", c, "Error #REF! ditampilkan", "Hasil filter terpotong"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Cells below a FILTER formula already hold data. What shows?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `#SPILL! — clear the spill area. Not a formula error, but a space collision. (${ref})`,
    steps: ["Analysis: a dynamic array needs empty land to spill into.",
      "Solve 1: FILTER wants to spill several cells below the formula.",
      "Solve 2: occupied cells block the spill.",
      "Solve 3: Excel reports #SPILL! — clear the area, do not rewrite the formula."]
  };
  return {
    q: `Sel di bawah rumus FILTER sudah terisi data. Apa yang tampil?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `#SPILL! — kosongkan area tumpahan. Bukan error rumus, melainkan tabrakan ruang. (${ref})`,
    steps: ["Analysis: dynamic array butuh lahan kosong untuk menumpah.",
      "Solve 1: FILTER ingin menumpah beberapa sel di bawah rumus.",
      "Solve 2: sel yang terisi menghalangi tumpahan.",
      "Solve 3: Excel melaporkan #SPILL! — kosongkan area, jangan tulis ulang rumus."]
  };
}
function vB2RowsFilter(rng, ref, L){
  const th = b2pick([500, 1000, 1500], rng);
  const c = `=ROWS(FILTER(Produk,Omzet>${th}))`;
  const o = [
    `=FILTER(Produk,Omzet>${th})`, `=COUNTIF(Omzet,">${th}")`, c, `=SUMPRODUCT(Omzet>${th})`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `You want to count 'how many products have revenue above Rp${b2e(th)}k'. One-cell formula?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `=ROWS(FILTER(...)) — filter first, count the result. COUNTIF works here too, but the FILTER+ROWS pattern generalizes. (${ref})`,
    steps: ["Analysis: filter first, then count — which pieces?",
      `Solve 1: FILTER(Produk, Omzet>${th}) returns the matching products.`,
      "Solve 2: ROWS(...) counts how many came back.",
      "Solve 3: the pattern generalizes to any filter — COUNTIF only counts one criterion."]
  };
  return {
    q: `Mau menghitung 'ada berapa produk dengan omzet di atas Rp${b2i(th)}rb'. Rumus satu sel?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `=ROWS(FILTER(...)) — saring dulu, hitung hasilnya. COUNTIF juga bisa di sini, tapi pola FILTER+ROWS berlaku umum. (${ref})`,
    steps: ["Analysis: saring dulu, baru hitung — bagiannya apa saja?",
      `Solve 1: FILTER(Produk, Omzet>${th}) mengembalikan produk yang cocok.`,
      "Solve 2: ROWS(...) menghitung berapa yang kembali.",
      "Solve 3: pola ini berlaku umum untuk filter apa pun — COUNTIF hanya satu kriteria."]
  };
}
function vB2Sumprod(rng, ref, L){
  const x = b2pick(["x", "a", "p"], rng), y = b2pick(["y", "b", "q"], rng);
  const c = L === "en"
    ? `Sum of C where A='${x}' and B='${y}'`
    : `Jumlah C di baris A='${x}', B='${y}'`;
  const o = L === "en" ? [
    c, `Count of rows with A='${x}'`, "The value 1 in column C", "Average of C across all rows"
  ] : [
    c, `Banyaknya baris dengan A='${x}'`, "Nilai 1 yang ada di kolom C", "Rata-rata C di semua baris"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `=SUMPRODUCT((A:A="${x}")*(B:B="${y}")*C:C). What does it compute?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Array multiplication = AND: only rows meeting both contribute their C value. (${ref})`,
    steps: ["Analysis: read the multiplication as logic.",
      `Solve 1: (A:A="${x}") is 1 where A is ${x}, else 0.`,
      `Solve 2: (B:B="${y}") is 1 where B is ${y}, else 0.`,
      "Solve 3: 1×1×C = C only on rows meeting both; everything else contributes 0."]
  };
  return {
    q: `=SUMPRODUCT((A:A="${x}")*(B:B="${y}")*C:C). Apa yang dihitung?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Perkalian array = AND: hanya baris yang memenuhi keduanya menyumbang nilai C-nya. (${ref})`,
    steps: ["Analysis: baca perkalian sebagai logika.",
      `Solve 1: (A:A="${x}") bernilai 1 di baris A = ${x}, 0 di lainnya.`,
      `Solve 2: (B:B="${y}") bernilai 1 di baris B = ${y}, 0 di lainnya.`,
      "Solve 3: 1×1×C = C hanya di baris yang memenuhi keduanya; sisanya menyumbang 0."]
  };
}
function vB2LETUse(rng, ref, L){
  const c = L === "en" ? "When a value is used repeatedly" : "Dipakai berulang";
  const o = L === "en" ? [
    "Never", "Numbers only", "Short formulas", c
  ] : [
    "Tidak pernah", "Hanya angka", "Rumus pendek", c
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `=LET(t, SUM(A:A), t*1.1) vs =SUM(A:A)*1.1. When is LET actually useful?`,
    opts: order.map(i => o[i]), answer: order.indexOf(3),
    explain: `LET shines when a long sub-calculation is reused: =LET(t, SUM(...big...), t*1.1 - t*0.05). Compute once, readable, faster. (${ref})`,
    steps: ["Analysis: what does LET change — the math or the writing?",
      "Solve 1: the math is identical — LET changes the WRITING.",
      "Solve 2: a long sub-calculation written once, named, reused.",
      "Solve 3: used once = no gain; used repeatedly = readable and faster."]
  };
  return {
    q: `=LET(t, SUM(A:A), t*1.1) vs =SUM(A:A)*1.1. Kapan LET benar-benar berguna?`,
    opts: order.map(i => o[i]), answer: order.indexOf(3),
    explain: `LET bersinar saat sub-hitung panjang dipakai berulang: =LET(t, SUM(...besar...), t*1.1 - t*0.05). Sekali hitung, terbaca, lebih cepat. (${ref})`,
    steps: ["Analysis: apa yang diubah LET — matematikanya atau penulisannya?",
      "Solve 1: matematikanya identik — LET mengubah PENULISAN.",
      "Solve 2: sub-hitung panjang ditulis sekali, dinamai, dipakai ulang.",
      "Solve 3: dipakai sekali = tidak ada untung; dipakai berulang = terbaca dan lebih cepat."]
  };
}
function vB2Solver(rng, ref, L){
  const budget = b2pick([1000, 1200], rng);
  const ra = 0.25, rb = 0.20, rc = 0.15;
  const capA = 400, capB = 500, capC = 600;
  let rem = budget, a = Math.min(capA, rem); rem -= a;
  let b = Math.min(capB, rem); rem -= b;
  let c = Math.min(capC, rem);
  const npv = Math.round((a * ra + b * rb + c * rc) * 100) / 100;
  const all = capA + capB + capC;
  const lowFirst = (() => { let r2 = budget, cc = Math.min(capC, r2); r2 -= cc; let bb = Math.min(capB, r2); r2 -= bb; let aa = Math.min(capA, r2); return Math.round((aa * ra + bb * rb + cc * rc) * 100) / 100; })();
  const abOnly = Math.round((a * ra + b * rb) * 100) / 100;
  const f = v => L === "en" ? "Rp" + b2e(v, 0) + "m" : "Rp" + b2i(v, 0) + "jt";
  const cc2 = L === "en" ? `${f(npv)} (A ${a}, B ${b}, C ${c})` : `${f(npv)} (A ${a}, B ${b}, C ${c})`;
  const o = [
    cc2,
    L === "en" ? `${f(abOnly)} (A ${a}, B ${b}, C 0)` : `${f(abOnly)} (A ${a}, B ${b}, C 0)`,
    L === "en" ? `${f(Math.round((capA * ra + capB * rb + capC * rc) * 100) / 100)} (A ${capA}, B ${capB}, C ${capC})` : `${f(Math.round((capA * ra + capB * rb + capC * rc) * 100) / 100)} (A ${capA}, B ${capB}, C ${capC})`,
    L === "en" ? `${f(lowFirst)} (C first, then B, then A)` : `${f(lowFirst)} (C dulu, lalu B, lalu A)`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Capex allocation Rp${b2e(budget)}m; NPV per Rp: A ${ra} (max ${capA}), B ${rb} (max ${capB}), C ${rc} (max ${capC}). Optimal Solver NPV?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `A ${a} (NPV ${b2e(a * ra)}) + B ${b} (NPV ${b2e(b * rb)}) + C ${c} (NPV ${b2e(c * rc)}) = Rp${b2e(npv)}m. Total ${a + b + c} exactly at the limit. (${ref})`,
    steps: ["Analysis: greedy by NPV per rupiah — highest rate first, up to its cap.",
      `Solve 1: A first — ${ra}/Rp is highest: ${a} × ${ra} = ${b2e(a * ra)}.`,
      `Solve 2: B next — ${b} × ${rb} = ${b2e(b * rb)}.`,
      `Solve 3: C gets the remainder ${c} × ${rc} = ${b2e(c * rc)}. Total NPV = ${b2e(npv)}.`]
  };
  return {
    q: `Alokasi capex Rp${b2i(budget)}jt; NPV/Rp: A ${b2i(ra, 2)} (maks ${capA}), B ${b2i(rb, 2)} (maks ${capB}), C ${b2i(rc, 2)} (maks ${capC}). NPV total optimal Solver?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `A ${a} (NPV ${b2i(a * ra)}) + B ${b} (NPV ${b2i(b * rb)}) + C ${c} (NPV ${b2i(c * rc)}) = Rp${b2i(npv)}jt. Total ${a + b + c} tepat di batas. (${ref})`,
    steps: ["Analysis: greedy berdasarkan NPV per rupiah — tarif tertinggi dulu, sampai cap-nya.",
      `Solve 1: A dulu — ${b2i(ra, 2)}/Rp tertinggi: ${a} × ${b2i(ra, 2)} = ${b2i(a * ra)}.`,
      `Solve 2: B berikutnya — ${b} × ${b2i(rb, 2)} = ${b2i(b * rb)}.`,
      `Solve 3: C dapat sisanya ${c} × ${b2i(rc, 2)} = ${b2i(c * rc)}. Total NPV = ${b2i(npv)}.`]
  };
}
function vB2GoalSolver(rng, ref, L){
  const c = L === "en"
    ? "Solver changes many inputs with constraints; Goal Seek one input, one target"
    : "Solver mengubah banyak input dengan constraints; Goal Seek satu input satu target";
  const o = L === "en" ? [
    c, "Goal Seek is more accurate", "Solver is only for DCF", "No difference"
  ] : [
    c, "Goal Seek lebih akurat", "Solver hanya untuk DCF", "Tidak ada perbedaan"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Goal Seek vs Solver — the main difference?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Goal Seek = one input, one target. Solver = many inputs at once with constraints (Simplex LP for linear models). (${ref})`,
    steps: ["Analysis: how many inputs does each tool move?",
      "Solve 1: Goal Seek — one input, one target value.",
      "Solve 2: Solver — many inputs at once, with constraints.",
      "Solve 3: optimization with limits = Solver; a single what-if = Goal Seek."]
  };
  return {
    q: `Goal Seek vs Solver — perbedaan utamanya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Goal Seek = satu input, satu target. Solver = banyak input sekaligus dengan constraints (Simplex LP untuk model linear). (${ref})`,
    steps: ["Analysis: berapa input yang digerakkan tiap alat?",
      "Solve 1: Goal Seek — satu input, satu nilai target.",
      "Solve 2: Solver — banyak input sekaligus, dengan constraints.",
      "Solve 3: optimasi dengan batasan = Solver; satu what-if = Goal Seek."]
  };
}
/* ---------- excel-l4 ---------- */
function vB2NoHardcode(rng, ref, L){
  const base = b2step(rng, 12000, 20000, 1000), g = b2pick([8, 10, 12], rng);
  const c = `=B5*(1+B6)`;
  const o = [
    c, "Both are correct", `=${base}*1,${g}`, "Neither is correct"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `=${b2e(base)}*1.${g} and =B5*(1+B6) give the same result today (B5=${b2e(base)}, B6=${g}%). Which is right for a model?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `=B5*(1+B6). Numbers in input cells, formulas only reference — the no-hardcode rule. (${ref})`,
    steps: ["Analysis: same result today — which survives a revision?",
      "Solve 1: the typed numbers freeze — change the assumption, the formula lies.",
      "Solve 2: =B5*(1+B6) reads the assumption from its cell.",
      "Solve 3: assumptions live in input cells; formulas only reference them."]
  };
  return {
    q: `=${b2i(base)}*1,${g} dan =B5*(1+B6) memberi hasil sama hari ini (B5=${b2i(base)}, B6=${g}%). Mana yang benar untuk model?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `=B5*(1+B6). Angka di sel input, rumus hanya referensi — aturan no-hardcode. (${ref})`,
    steps: ["Analysis: hasil sama hari ini — mana yang bertahan saat revisi?",
      "Solve 1: angka ketik membeku — ubah asumsi, rumus berbohong.",
      "Solve 2: =B5*(1+B6) membaca asumsi dari selnya.",
      "Solve 3: asumsi tinggal di sel input; rumus hanya me-referensi."]
  };
}
function vB2IfErrorRight(rng, ref, L){
  const c = L === "en"
    ? "At a division whose denominator can genuinely be zero"
    : "Di titik pembagian yang penyebutnya memang bisa nol";
  const o = L === "en" ? [
    "Wrapping the whole model so no red errors show", c, "To hide #N/A from old VLOOKUPs", "Never — errors must stay visible"
  ] : [
    "Membungkus seluruh model agar tidak ada error merah", c, "Untuk menyembunyikan #N/A dari VLOOKUP lama", "Tidak pernah — error harus dibiarkan muncul"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `When is IFERROR used CORRECTLY?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `IFERROR at legitimate risk points (a divisor that can be zero). Wrapping everything = disabling the fire alarm. (${ref})`,
    steps: ["Analysis: IFERROR is a guard, not a blanket.",
      "Solve 1: legitimate risk — a divisor that can genuinely be zero.",
      "Solve 2: wrap that point only, as close to the risk as possible.",
      "Solve 3: wrapping everything hides real bugs."]
  };
  return {
    q: `Kapan IFERROR digunakan dengan BENAR?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `IFERROR di titik risiko yang sah (pembagi bisa nol). Membungkus semuanya = mematikan alarm kebakaran. (${ref})`,
    steps: ["Analysis: IFERROR adalah pengaman, bukan selimut.",
      "Solve 1: risiko yang sah — pembagi yang memang bisa nol.",
      "Solve 2: bungkus titik itu saja, sedekat mungkin dengan risikonya.",
      "Solve 3: membungkus semuanya menyembunyikan bug sungguhan."]
  };
}
function vB2Circular(rng, ref, L){
  const a = b2pick(["A1", "C2"], rng), b = a === "A1" ? "B1" : "D2";
  const c = "Circular reference";
  const o = L === "en" ? [
    "Runs normally", "Shows #DIV/0!", "Returns zero", c
  ] : [
    "Berjalan normal", "Muncul #DIV/0!", "Hasilnya nol", c
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Formula ${a}: =${b}+C1. ${b}: =${a}*2. What happens?`,
    opts: order.map(i => o[i]), answer: order.indexOf(3),
    explain: `Circular reference: ${a}↔${b} need each other. Excel warns you — do not ignore it or silence it with iteration. (${ref})`,
    steps: ["Analysis: trace the references — does any cell need itself?",
      `Solve 1: ${a} needs ${b}.`,
      `Solve 2: ${b} needs ${a}.`,
      "Solve 3: a loop — circular reference. Restructure the flow; do not silence it with iteration."]
  };
  return {
    q: `Rumus ${a}: =${b}+C1. ${b}: =${a}*2. Apa yang terjadi?`,
    opts: order.map(i => o[i]), answer: order.indexOf(3),
    explain: `Circular reference: ${a}↔${b} saling membutuhkan. Excel memberi peringatan — jangan abaikan atau matikan iterasi untuk 'membungkamnya'. (${ref})`,
    steps: ["Analysis: telusuri referensinya — adakah sel yang membutuhkan dirinya sendiri?",
      `Solve 1: ${a} butuh ${b}.`,
      `Solve 2: ${b} butuh ${a}.`,
      "Solve 3: lingkaran — circular reference. Restrukturisasi alurnya; jangan bungkam dengan iterasi."]
  };
}
function vB2Dependents(rng, ref, L){
  const cell = b2pick(["B5", "C7", "D12"], rng);
  const c = L === "en" ? "Check its Dependents" : "Cek Dependents-nya";
  const o = L === "en" ? [
    "Check its Precedents", "Press F9", c, "Turn on Ctrl+`"
  ] : [
    "Cek Precedents-nya", "Coba tekan F9", c, "Aktifkan Ctrl+`"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `You want to know 'which cells use the number in ${cell}'. Which feature?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Trace Dependents: draws arrows to every cell using ${cell}. Precedents is the reverse. (${ref})`,
    steps: ["Analysis: forward or backward — which direction is the question?",
      `Solve 1: the question asks what USES ${cell} — forward.`,
      "Solve 2: Trace Dependents draws arrows from the cell to its users.",
      "Solve 3: Precedents is the reverse — what the cell itself uses."]
  };
  return {
    q: `Mau tahu 'sel mana saja yang memakai angka di ${cell}'. Fitur apa?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Trace Dependents: menggambar panah ke semua sel yang memakai ${cell}. Precedents sebaliknya. (${ref})`,
    steps: ["Analysis: maju atau mundur — arah mana yang ditanya?",
      `Solve 1: pertanyaan menanyakan apa yang MEMAKAI ${cell} — maju.`,
      "Solve 2: Trace Dependents menggambar panah dari sel ke pemakainya.",
      "Solve 3: Precedents sebaliknya — apa yang dipakai sel itu sendiri."]
  };
}
function vB2Volatile(rng, ref, L){
  const n = b2pick([2000, 5000, 10000], rng);
  const c = L === "en" ? "Volatile — just use INDEX" : "Volatile — pakai INDEX saja";
  const o = L === "en" ? [
    "Too much data", c, "IFERROR misused", "Not enough RAM"
  ] : [
    "Data terlalu banyak", c, "IFERROR disalahgunakan", "RAM tidak mencukupi"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A ${b2e(n)}-row model feels slow. One cell uses =INDIRECT("Sheet"&A1&"!B2") across ${b2e(n)} rows. Diagnosis?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `INDIRECT is volatile — all ${b2e(n)} cells recalculate constantly. Replace with a direct non-volatile INDEX/MATCH. (${ref})`,
    steps: ["Analysis: what makes a formula recalculate on EVERY change?",
      "Solve 1: INDIRECT is volatile — it recalculates on any change, anywhere.",
      `Solve 2: ${b2e(n)} volatile cells = ${b2e(n)} recalculations per keystroke.`,
      "Solve 3: replace with INDEX/MATCH — non-volatile, calculates only when its inputs change."]
  };
  return {
    q: `Model ${b2i(n)} baris terasa lambat. Satu sel memakai =INDIRECT("Sheet"&A1&"!B2") di ${b2i(n)} baris. Diagnosis?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `INDIRECT volatile — ${b2i(n)} selnya dihitung ulang terus. Ganti dengan INDEX/MATCH langsung yang non-volatile. (${ref})`,
    steps: ["Analysis: apa yang membuat rumus menghitung ulang di SETIAP perubahan?",
      "Solve 1: INDIRECT volatile — menghitung ulang pada perubahan apa pun, di mana pun.",
      `Solve 2: ${b2i(n)} sel volatile = ${b2i(n)} kalkulasi ulang per ketikan.`,
      "Solve 3: ganti dengan INDEX/MATCH — non-volatile, hanya menghitung saat inputnya berubah."]
  };
}
function vB2Colors(rng, ref, L){
  const c = L === "en" ? "Blue" : "Biru";
  const o = L === "en" ? [
    c, "Black", "Green", "Red"
  ] : [
    c, "Hitam", "Hijau", "Merah"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Standard colour-coding: input cells (typed numbers) are…`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Blue = inputs; black = formulas; green = links to other sheets; red = warnings/failed checks. Consistent across the workbook. (${ref})`,
    steps: ["Analysis: the colour tells you what kind of cell it is.",
      "Solve 1: blue = typed input — the only cells a user should type in.",
      "Solve 2: black = formula; green = link to another sheet.",
      "Solve 3: red = warning or failed check — look here first."]
  };
  return {
    q: `Konvensi color-coding baku: sel input (angka diketik) berwarna…`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Biru = input; hitam = rumus; hijau = link ke sheet lain; merah = peringatan/cek gagal. Konsisten di seluruh workbook. (${ref})`,
    steps: ["Analysis: warna memberi tahu jenis sel itu.",
      "Solve 1: biru = input ketik — satu-satunya sel yang boleh diketik pengguna.",
      "Solve 2: hitam = rumus; hijau = link ke sheet lain.",
      "Solve 3: merah = peringatan atau cek gagal — lihat ke sini dulu."]
  };
}
function vB2Changelog(rng, ref, L){
  const c = L === "en"
    ? "So changes leave a trail & can be audited"
    : "Agar perubahan punya jejak & bisa diaudit";
  const o = L === "en" ? [
    c, "To make the file bigger", "To keep sheet colours consistent", "So Solver runs"
  ] : [
    c, "Agar file lebih besar", "Agar warna sheet konsisten", "Agar Solver berjalan"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Why must model changes be logged in a changelog?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `The changelog = the audit trail: date, version, what changed, why. Without it, nobody can tell an improvement from damage. (${ref})`,
    steps: ["Analysis: what does a changelog let you do later?",
      "Solve 1: it records date, version, what changed, and why.",
      "Solve 2: when a number moves, you can trace it to a decision.",
      "Solve 3: without it, improvement and damage look identical."]
  };
  return {
    q: `Kenapa perubahan model wajib dicatat di changelog?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Changelog = jejak audit: tanggal, versi, apa berubah, kenapa. Tanpa itu, tidak ada yang bisa membedakan perbaikan dari kerusakan. (${ref})`,
    steps: ["Analysis: apa yang bisa dilakukan changelog nanti?",
      "Solve 1: ia mencatat tanggal, versi, apa berubah, dan kenapa.",
      "Solve 2: saat angka bergerak, kamu bisa menelusurinya ke sebuah keputusan.",
      "Solve 3: tanpanya, perbaikan dan kerusakan tampak identik."]
  };
}
function vB2TrialBal(rng, ref, L){
  const cash0 = b2step(rng, 300, 700, 100), ar = b2step(rng, 200, 400, 100), inv = b2step(rng, 100, 300, 100);
  const exp = b2step(rng, 400, 700, 100), ap = b2step(rng, 300, 500, 100), cap = b2step(rng, 300, 500, 100);
  let cash = cash0;
  let rev = cash + ar + inv + exp - ap - cap;
  if (rev < 300) { cash += (300 - rev); rev = 300; }
  const profit = rev - exp, assets = cash + ar + inv, equity = cap + profit;
  const f = v => L === "en" ? b2e(v) : b2i(v);
  const c = L === "en"
    ? `Profit ${f(profit)}; assets ${f(assets)} = payables ${f(ap)} + equity ${f(equity)}`
    : `Laba ${f(profit)}; aset ${f(assets)} = utang ${f(ap)} + ekuitas ${f(equity)}`;
  const o = [
    c,
    L === "en" ? `Profit ${f(profit + 200)}; assets ${f(assets + 200)} = payables ${f(ap)} + equity ${f(equity + 200)}` : `Laba ${f(profit + 200)}; aset ${f(assets + 200)} = utang ${f(ap)} + ekuitas ${f(equity + 200)}`,
    L === "en" ? `Profit ${f(rev)}; assets ${f(assets)} = payables ${f(assets)} + equity 0` : `Laba ${f(rev)}; aset ${f(assets)} = utang ${f(assets)} + ekuitas 0`,
    L === "en" ? "Not balanced — debits and credits differ" : "Tidak balance — debit dan kredit beda"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Trial balance: debits Cash ${f(cash)}, Receivables ${f(ar)}, Inventory ${f(inv)}, Expenses ${f(exp)}; credits Payables ${f(ap)}, Capital ${f(cap)}, Revenue ${f(rev)}. Profit and balance-sheet check?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Debits ${f(cash + ar + inv + exp)} = credits ${f(ap + cap + rev)} ✓. Profit = ${f(rev)} − ${f(exp)} = ${f(profit)}. Assets ${f(assets)} = payables ${f(ap)} + equity (${f(cap)}+${f(profit)}) ${f(equity)} ✓. (${ref})`,
    steps: ["Analysis: two checks — debits = credits, then A = L + E.",
      `Solve 1: debits = ${f(cash)} + ${f(ar)} + ${f(inv)} + ${f(exp)} = ${f(cash + ar + inv + exp)}; credits = ${f(ap)} + ${f(cap)} + ${f(rev)} = ${f(ap + cap + rev)} ✓.`,
      `Solve 2: profit = revenue − expenses = ${f(rev)} − ${f(exp)} = ${f(profit)}.`,
      `Solve 3: assets ${f(assets)} = payables ${f(ap)} + equity ${f(equity)} ✓.`]
  };
  return {
    q: `Trial balance: debit Kas ${f(cash)}, Piutang ${f(ar)}, Persediaan ${f(inv)}, Beban ${f(exp)}; kredit Utang ${f(ap)}, Modal ${f(cap)}, Revenue ${f(rev)}. Laba dan cek neraca?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Debit ${f(cash + ar + inv + exp)} = kredit ${f(ap + cap + rev)} ✓. Laba = ${f(rev)} − ${f(exp)} = ${f(profit)}. Aset ${f(assets)} = utang ${f(ap)} + ekuitas (${f(cap)}+${f(profit)}) ${f(equity)} ✓. (${ref})`,
    steps: ["Analysis: dua cek — debit = kredit, lalu A = L + E.",
      `Solve 1: debit = ${f(cash)} + ${f(ar)} + ${f(inv)} + ${f(exp)} = ${f(cash + ar + inv + exp)}; kredit = ${f(ap)} + ${f(cap)} + ${f(rev)} = ${f(ap + cap + rev)} ✓.`,
      `Solve 2: laba = revenue − beban = ${f(rev)} − ${f(exp)} = ${f(profit)}.`,
      `Solve 3: aset ${f(assets)} = utang ${f(ap)} + ekuitas ${f(equity)} ✓.`]
  };
}
/* ---------- excel-l5 ---------- */
function vB2XNPVWhen(rng, ref, L){
  const c = `=XNPV(10%, values, dates)`;
  const o = [
    `=NPV(10%, …) biasa`, `=IRR(…) biasa`, c, `=SUM(…)/(1+10%)`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const d1 = b2pick([5, 12, 20], rng), d2 = d1 + b2pick([40, 70], rng);
  if (L === "en") return {
    q: `Cash flows: invest Jan ${d1}, top-up Mar ${d2}, proceeds Nov 11 (same year). The right valuation function?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `=XNPV(10%, values, dates). NPV/IRR force messy dates into tidy periods — precisely wrong. (${ref})`,
    steps: ["Analysis: are the cash flows on tidy year-ends?",
      "Solve 1: no — Jan, Mar, Nov of the same year.",
      "Solve 2: NPV/IRR assume equal periods — they would misplace the cash.",
      "Solve 3: XNPV takes the actual dates — use it."]
  };
  return {
    q: `Arus kas: investasi ${d1} Jan, top-up ${d2} Mar, hasil 11 Nov (tahun sama). Fungsi valuasi yang tepat?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `=XNPV(10%, values, dates). NPV/IRR memaksa tanggal berantakan jadi periode rapi — hasilnya bohong presisi. (${ref})`,
    steps: ["Analysis: apakah arus kas jatuh di akhir tahun yang rapi?",
      "Solve 1: tidak — Jan, Mar, Nov di tahun yang sama.",
      "Solve 2: NPV/IRR mengasumsikan periode sama — mereka salah menempatkan kas.",
      "Solve 3: XNPV memakai tanggal aktual — pakai itu."]
  };
}
function vB2XNPVOrder(rng, ref, L){
  const c = `=XNPV(rate, values, dates)`;
  const o = [
    c, `=XNPV(values, dates, rate)`, `=XNPV(dates, rate, values)`, `=XNPV(rate, dates, values)`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The correct XNPV argument order?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `=XNPV(rate, values, dates). Wrong order = wrong result with no error — memorize: rate, values, dates. (${ref})`,
    steps: ["Analysis: XNPV's signature — what comes first?",
      "Solve 1: rate first — the discount rate.",
      "Solve 2: values second — the cash flows.",
      "Solve 3: dates third — one date per cash flow. Rate, values, dates."]
  };
  return {
    q: `Urutan argumen XNPV yang benar?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `=XNPV(rate, values, dates). Urutan salah = hasil ngaco tanpa error — hafalkan: rate, values, dates. (${ref})`,
    steps: ["Analysis: signature XNPV — apa yang pertama?",
      "Solve 1: rate dulu — tingkat diskonto.",
      "Solve 2: values kedua — arus kasnya.",
      "Solve 3: dates ketiga — satu tanggal per arus kas. Rate, values, dates."]
  };
}
function vB2XNPVDisc(rng, ref, L){
  const pv = b2pick([80, 100, 120, 150], rng), rate = b2pick([8, 10, 12], rng);
  const cf = Math.round(pv * (1 + rate / 100));
  const vals = [pv, cf, Math.round(cf / (1 + rate / 100) / (1 + rate / 100) * 100) / 100, Math.round(cf * (1 + rate / 100))];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? "Rp" + b2e(v) + "m" : "Rp" + b2i(v) + "jt";
  if (L === "en") return {
    q: `One cash flow of Rp${b2e(cf)}m exactly 365 days from now, rate ${rate}%. Its XNPV?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2e(cf)}/1.${rate} = ${b2e(pv)}. Rp${b2e(cf)}m = forgot to discount; Rp${b2e(vals[2])}m = used ${b2e(pv)} as numerator; Rp${b2e(vals[3])}m = multiplied instead. (${ref})`,
    steps: ["Analysis: one cash flow, exactly one year out — XNPV is plain discounting here.",
      `Solve 1: discount factor = 1 + ${rate}% = 1.${rate}.`,
      `Solve 2: XNPV = ${b2e(cf)} ÷ 1.${rate}.`,
      `Solve 3: compute → Rp${b2e(pv)}m.`]
  };
  return {
    q: `Satu arus kas Rp${b2i(cf)}jt tepat 365 hari dari sekarang, rate ${rate}%. Berapa XNPV-nya?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `${b2i(cf)}/1,${rate} = ${b2i(pv)}. Rp${b2i(cf)}jt = lupa mendiskon; Rp${b2i(vals[2])}jt = memakai ${b2i(pv)} sebagai pembilang; Rp${b2i(vals[3])}jt = malah dikalikan. (${ref})`,
    steps: ["Analysis: satu arus kas, tepat satu tahun lagi — XNPV di sini adalah diskonto biasa.",
      `Solve 1: faktor diskonto = 1 + ${rate}% = 1,${rate}.`,
      `Solve 2: XNPV = ${b2i(cf)} ÷ 1,${rate}.`,
      `Solve 3: hitung → Rp${b2i(pv)}jt.`]
  };
}
function vB2XIRRNum(rng, ref, L){
  const c = L === "en" ? "The 10% starting guess is slightly off" : "Tebakan awal 10% kurang tepat";
  const o = L === "en" ? [
    "All cash flows have the same sign", "Dates stored as text", "Values and dates ranges differ in length", c
  ] : [
    "Semua arus kas bertanda sama", "Tanggal tersimpan sebagai teks", "Range values dan dates beda panjang", c
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `=XIRR(values, dates) throws #NUM! despite real gains and losses. LEAST likely cause?`,
    opts: order.map(i => o[i]), answer: order.indexOf(3),
    explain: `A wrong guess is almost never the #NUM! cause; the 10% default covers 99% of cases. The other three are classic causes. (${ref})`,
    steps: ["Analysis: #NUM! means the solver failed — what usually breaks it?",
      "Solve 1: all cash flows the same sign — no IRR exists at all.",
      "Solve 2: text dates or mismatched range lengths — garbage in.",
      "Solve 3: the starting guess — the 10% default almost never matters."]
  };
  return {
    q: `=XIRR(values, dates) melempar #NUM! padahal ada untung dan rugi. Kemungkinan TERKECIL?`,
    opts: order.map(i => o[i]), answer: order.indexOf(3),
    explain: `Guess salah hampir tidak pernah jadi penyebab #NUM!; default 10% cukup untuk 99% kasus. Tiga lainnya adalah penyebab klasik. (${ref})`,
    steps: ["Analysis: #NUM! berarti solver gagal — apa yang biasanya merusaknya?",
      "Solve 1: semua arus kas bertanda sama — IRR tidak ada sama sekali.",
      "Solve 2: tanggal teks atau panjang range beda — garbage in.",
      "Solve 3: tebakan awal — default 10% hampir tidak pernah jadi masalah."]
  };
}
function vB2TextDate(rng, ref, L){
  const d = b2pick(["1/7/2025", "15/3/2026", "2/11/2025"], rng);
  const c = L === "en"
    ? "Dates stored as text, not dates"
    : "Tanggal tersimpan sebagai teks, bukan date";
  const o = L === "en" ? [
    "Rate too big", "Values must be sorted first", c, "Missing the guess argument"
  ] : [
    "Rate terlalu besar", "Values harus diurutkan dulu", c, "Kurang argumen guess"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The date column shows '${d}' but XNPV gives #VALUE!. Diagnosis?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Text dates → Format → Number → Date. XNPV needs date serials, not date-looking strings. (${ref})`,
    steps: ["Analysis: the cell LOOKS like a date — is it one?",
      "Solve 1: #VALUE! from XNPV usually means the dates are text.",
      "Solve 2: check — text dates align left; real dates align right.",
      "Solve 3: convert (Format → Number → Date, or DATEVALUE) and retry."]
  };
  return {
    q: `Kolom tanggal terlihat '${d}' tapi XNPV #VALUE!. Diagnosis?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Tanggal teks → Format → Number → Date. XNPV butuh date serial, bukan string yang mirip tanggal. (${ref})`,
    steps: ["Analysis: selnya TERLIHAT seperti tanggal — benarkah?",
      "Solve 1: #VALUE! dari XNPV biasanya berarti tanggalnya teks.",
      "Solve 2: cek — tanggal teks rata kiri; tanggal asli rata kanan.",
      "Solve 3: konversi (Format → Number → Date, atau DATEVALUE) lalu coba lagi."]
  };
}
function vB2XIRRTrap(rng, ref, L){
  const x = b2pick([80, 100, 120], rng);
  const y = Math.round(x * 2.5), z = Math.round(x * 1.5);
  const c = L === "en"
    ? "Sign changes 2× → two different IRRs may exist"
    : "Tanda berubah 2× → bisa ada 2 IRR berbeda";
  const o = L === "en" ? [
    c, "XIRR always returns 0", "Cannot be computed at all", "The result is always negative"
  ] : [
    c, "XIRR pasti menghasilkan 0", "Tidak bisa dihitung sama sekali", "Hasilnya selalu negatif"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Cash flows: −${b2e(x)}, +${b2e(y)}, −${b2e(z)}. The danger of using a single XIRR?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Two sign changes = up to two valid IRRs. XIRR returns one (guess-dependent) — presenting one number without a note misleads. (${ref})`,
    steps: ["Analysis: count the sign changes in the cash-flow stream.",
      "Solve 1: − to + is change one; + to − is change two.",
      "Solve 2: two changes admit up to two IRRs (here 0% and 50%).",
      "Solve 3: XIRR returns ONE of them, depending on the guess — report the range, not a single number."]
  };
  return {
    q: `Arus kas: −${b2i(x)}, +${b2i(y)}, −${b2i(z)}. Apa bahayanya memakai XIRR tunggal?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Dua kali ganti tanda = hingga dua IRR valid. XIRR mengembalikan satu (tergantung tebakan) — sajikan satu angka tanpa catatan = menyesatkan. (${ref})`,
    steps: ["Analysis: hitung perubahan tanda dalam arus kas.",
      "Solve 1: − ke + adalah perubahan pertama; + ke − adalah perubahan kedua.",
      "Solve 2: dua perubahan memungkinkan hingga dua IRR (di sini 0% dan 50%).",
      "Solve 3: XIRR mengembalikan SATU di antaranya, tergantung tebakan — laporkan rentangnya, bukan satu angka."]
  };
}
function vB2Choose(rng, ref, L){
  const idx = b2pick([1, 2, 3], rng);
  const labels = L === "en" ? ["bear", "base", "bull"] : ["bear", "base", "bull"];
  const c = `"${labels[idx - 1]}"`;
  const o = [`"bear"`, `"bull"`, "#VALUE!", `"base"`];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `=CHOOSE(B1, "bear", "base", "bull"), B1 holds ${idx}. Result?`,
    opts: order.map(i => o[i]), answer: order.indexOf(idx === 1 ? 0 : idx === 2 ? 3 : 1),
    explain: `"${labels[idx - 1]}" — the ${idx === 1 ? "first" : idx === 2 ? "second" : "third"} value. The programmer's trap: assuming 0-based index and answering "${idx === 2 ? "bull" : "base"}". (${ref})`,
    steps: ["Analysis: CHOOSE is 1-based — which position is B1?",
      `Solve 1: index ${idx} → the ${idx === 1 ? "first" : idx === 2 ? "second" : "third"} item in the list.`,
      `Solve 2: the list is "bear", "base", "bull".`,
      `Solve 3: position ${idx} = "${labels[idx - 1]}". (0-based thinking would pick the wrong one.)`]
  };
  return {
    q: `=CHOOSE(B1, "bear", "base", "bull"), B1 berisi ${idx}. Hasil?`,
    opts: order.map(i => o[i]), answer: order.indexOf(idx === 1 ? 0 : idx === 2 ? 3 : 1),
    explain: `"${labels[idx - 1]}" — nilai ke-${idx === 1 ? "satu" : idx === 2 ? "dua" : "tiga"}. Jebakan programmer: mengira index dari 0 lalu menjawab "${idx === 2 ? "bull" : "base"}". (${ref})`,
    steps: ["Analysis: CHOOSE berbasis 1 — posisi berapa B1?",
      `Solve 1: index ${idx} → item ke-${idx} dalam daftar.`,
      'Solve 2: daftarnya "bear", "base", "bull".',
      `Solve 3: posisi ${idx} = "${labels[idx - 1]}". (Berpikir 0-based akan memilih yang salah.)`]
  };
}
function vB2SheetsGrid(rng, ref, L){
  const c = L === "en"
    ? "Manual grid: one formula per cell with mixed $ references"
    : "Grid manual: tiap sel rumus dengan referensi campuran $";
  const o = L === "en" ? [
    "Install a special add-on", c, "Impossible — move to Excel", "Repeat Goal Seek over and over"
  ] : [
    "Install add-on khusus", c, "Tidak bisa — pindah ke Excel", "Pakai Goal Seek berulang-ulang"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Google Sheets has no native Data Table. How to build a 2-variable sensitivity table?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Manual grid with $B3/C$1 — every cell transparent and auditable, actually better than Data Table. (${ref})`,
    steps: ["Analysis: no Data Table — build the table cell by cell.",
      "Solve 1: one formula per cell, referencing the row and column headers.",
      "Solve 2: mixed $ locks the right axis on each reference.",
      "Solve 3: every cell is transparent and auditable — better than a black-box Data Table."]
  };
  return {
    q: `Google Sheets tidak punya Data Table native. Cara membangun tabel sensitivitas 2-variabel?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Grid manual dengan $B3/C$1 — tiap sel transparan dan bisa diaudit, justru lebih baik dari Data Table. (${ref})`,
    steps: ["Analysis: tanpa Data Table — bangun tabel sel demi sel.",
      "Solve 1: satu rumus per sel, me-referensi header baris dan kolom.",
      "Solve 2: $ campuran mengunci sumbu yang tepat di tiap referensi.",
      "Solve 3: tiap sel transparan dan bisa diaudit — lebih baik dari Data Table black-box."]
  };
}
function vB2GridFormula(rng, ref, L){
  const fcf = b2pick([100, 200, 250], rng);
  const c = `=${fcf}*(1+$B3)/(C$1-$B3)`;
  const o = [
    `=${fcf}*(1+B3)/(C1-B3)`, `=${fcf}*(1+B$3)/(C1-$B3)`, c, `=${fcf}*(1+$B$3)/($C$1-$B$3)`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Sensitivity grid: WACC in C1:E1, growth in B3:B5. The correct C3 formula (Gordon, FCF=${fcf}) to copy across the grid?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `=${fcf}*(1+$B3)/(C$1-$B3). $B3: column locked, row free; C$1: row locked, column free. First option leaks, third is fully frozen. (${ref})`,
    steps: ["Analysis: what must move, and what must stay, when copying across the grid?",
      "Solve 1: growth comes from column B — lock the COLUMN ($B3), let the row flow.",
      "Solve 2: WACC comes from row 1 — lock the ROW (C$1), let the column flow.",
      "Solve 3: fully relative leaks; fully absolute freezes — mixed $ is the answer."]
  };
  return {
    q: `Grid sensitivitas: WACC di C1:E1, growth di B3:B5. Rumus di C3 (Gordon, FCF=${fcf}) yang benar untuk di-copy ke seluruh grid?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `=${fcf}*(1+$B3)/(C$1-$B3). $B3: kolom dikunci baris bebas; C$1: baris dikunci kolom bebas. Opsi pertama bocor, ketiga terkunci total. (${ref})`,
    steps: ["Analysis: apa yang harus bergerak, dan apa yang harus diam, saat di-copy ke seluruh grid?",
      "Solve 1: growth dari kolom B — kunci KOLOM ($B3), biarkan baris mengalir.",
      "Solve 2: WACC dari baris 1 — kunci BARIS (C$1), biarkan kolom mengalir.",
      "Solve 3: relatif penuh bocor; absolut penuh membeku — $ campuran adalah jawabannya."]
  };
}
function vB2NormInv(rng, ref, L){
  const mean = b2pick([10, 12, 15], rng), sd = b2pick([1, 2, 3], rng);
  const c = `=NORM.INV(RAND(), ${mean}%, ${sd}%)`;
  const o = [
    c, `=RAND()*${mean}%`, `=${mean}% + RAND()`, `=NORM.INV(${mean}%, ${sd}%)`
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Monte Carlo in Excel: the correct random-WACC formula (mean ${mean}%, std ${sd}%)?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `=NORM.INV(RAND(), ${mean}%, ${sd}%) draws WACC from a normal distribution with mean ${mean}%, std ${sd}%. Bare RAND() gives a uniform 0–1, not a normal. (${ref})`,
    steps: ["Analysis: RAND() alone is uniform — how do you get a NORMAL draw?",
      "Solve 1: RAND() gives a uniform probability 0–1.",
      "Solve 2: NORM.INV(probability, mean, std) inverts it into a normal draw.",
      `Solve 3: =NORM.INV(RAND(), ${mean}%, ${sd}%) — mean ${mean}%, std ${sd}%.`]
  };
  return {
    q: `Simulasi Monte Carlo di Excel: rumus WACC acak (rata-rata ${mean}%, std ${sd}%) yang benar?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `=NORM.INV(RAND(), ${mean}%, ${sd}%) menarik WACC dari distribusi normal mean ${mean}%, std ${sd}%. RAND() saja memberi uniform 0–1, bukan normal. (${ref})`,
    steps: ["Analysis: RAND() saja uniform — bagaimana mendapat tarikan NORMAL?",
      "Solve 1: RAND() memberi probabilitas uniform 0–1.",
      "Solve 2: NORM.INV(probabilitas, mean, std) membaliknya jadi tarikan normal.",
      `Solve 3: =NORM.INV(RAND(), ${mean}%, ${sd}%) — mean ${mean}%, std ${sd}%.`]
  };
}
function vB2RandNo(rng, ref, L){
  const c = L === "en"
    ? "Every F9 changes all numbers; nothing is replicable"
    : "Tiap F9 mengubah semua angka; tidak bisa direplikasi";
  const o = L === "en" ? [
    c, "RAND cannot be used in EV", "Data Table is faster", "RAND is only for VBA"
  ] : [
    c, "RAND tidak bisa dipakai di EV", "Data Table lebih cepat", "RAND hanya untuk VBA"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Why must RAND not sit directly inside the EV formula without a Data Table?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `RAND inside the formula makes every F9 rewrite all results with no trail. Data Table + one pasted-values run = auditable evidence. (${ref})`,
    steps: ["Analysis: what happens to the evidence when RAND lives inside the formula?",
      "Solve 1: every F9 re-rolls every random draw.",
      "Solve 2: the numbers you reported can never be reproduced.",
      "Solve 3: run the simulation once via Data Table, paste values — that run is the evidence."]
  };
  return {
    q: `Kenapa RAND tidak boleh langsung di dalam rumus EV tanpa Data Table?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `RAND di dalam rumus membuat tiap F9 mengubah seluruh hasil tanpa jejak. Data Table + paste values satu run = bukti yang bisa diaudit. (${ref})`,
    steps: ["Analysis: apa yang terjadi pada bukti saat RAND tinggal di dalam rumus?",
      "Solve 1: tiap F9 mengocok ulang semua tarikan acak.",
      "Solve 2: angka yang kamu laporkan tidak pernah bisa direproduksi.",
      "Solve 3: jalankan simulasi sekali via Data Table, paste values — run itu adalah buktinya."]
  };
}
/* ---------- excel-l6 ---------- */
function vB2PQRefresh(rng, ref, L){
  const c = L === "en"
    ? "Drop the file in the folder → Refresh query"
    : "Taruh file di folder → Refresh query";
  const o = L === "en" ? [
    c, "Copy-paste manually again", "Edit the loaded output directly", "Build a new query from scratch"
  ] : [
    c, "Copy-paste manual lagi", "Edit hasil load langsung", "Buat query baru dari nol"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Power Query rule #1: next month's new data is handled by…`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Power Query stores the steps as a recipe. A new file in the folder + Refresh = the whole cleaning runs again automatically. (${ref})`,
    steps: ["Analysis: what does Power Query actually store?",
      "Solve 1: it stores STEPS (a recipe), not the cleaned data.",
      "Solve 2: new data in the same folder feeds the same recipe.",
      "Solve 3: Refresh re-runs the whole cleaning automatically."]
  };
  return {
    q: `Prinsip #1 Power Query: data baru bulan depan ditangani dengan cara…`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Power Query menyimpan langkah sebagai resep. File baru di folder + Refresh = seluruh pembersihan berjalan lagi otomatis. (${ref})`,
    steps: ["Analysis: apa sebenarnya yang disimpan Power Query?",
      "Solve 1: ia menyimpan LANGKAH (resep), bukan data yang sudah bersih.",
      "Solve 2: data baru di folder yang sama masuk ke resep yang sama.",
      "Solve 3: Refresh menjalankan ulang seluruh pembersihan otomatis."]
  };
}
function vB2PivotAudit(rng, ref, L){
  const c = L === "en"
    ? "Audit & anomaly hunting (check totals, drill to transactions)"
    : "Audit & cari anomali (cek total, drill-down ke transaksi)";
  const o = L === "en" ? [
    c, "Replacing all SUMIFS formulas", "Making charts for the annual report only", "Replacing Power Query"
  ] : [
    c, "Menggantikan semua rumus SUMIFS", "Membuat grafik untuk laporan tahunan saja", "Menggantikan Power Query"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `What is a PivotTable most useful for, besides summarising?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `PivotTable = audit tool: check totals in 30 seconds, drill down to anomalous transactions. Formulas for repeated work; PivotTables for exploration & audit. (${ref})`,
    steps: ["Analysis: what can a PivotTable do in 30 seconds that formulas cannot?",
      "Solve 1: slice totals by any dimension instantly.",
      "Solve 2: drill down from a total to the transactions behind it.",
      "Solve 3: that is audit work — formulas are for the repeated, PivotTables for exploration."]
  };
  return {
    q: `Untuk apa PivotTable paling berguna bagi analis (selain ringkasan)?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `PivotTable = alat audit: cek total dalam 30 detik, drill-down ke transaksi anomali. Rumus untuk yang berulang; PivotTable untuk eksplorasi & audit. (${ref})`,
    steps: ["Analysis: apa yang bisa dilakukan PivotTable dalam 30 detik yang tidak bisa dilakukan rumus?",
      "Solve 1: iris total berdasarkan dimensi apa pun secara instan.",
      "Solve 2: drill-down dari total ke transaksi di baliknya.",
      "Solve 3: itu pekerjaan audit — rumus untuk yang berulang, PivotTable untuk eksplorasi."]
  };
}
function vB2VBACopy(rng, ref, L){
  const n = b2pick([6, 12, 20], rng);
  const c = L === "en"
    ? "Save a copy (macros have no Undo)"
    : "Simpan salinan (macro tidak punya Undo)";
  const o = L === "en" ? [
    c, "Run it directly", "Delete all Select lines first", "Convert to Python"
  ] : [
    c, "Langsung jalankan", "Hapus semua Select dulu", "Ubah ke Python"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A VBA macro is recorded to format ${n} sheets. The first correct step before running it on the original file?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Save a copy first — macros cannot be undone. Then read the code (Alt+F11), clean the verbose Select lines, then run. (${ref})`,
    steps: ["Analysis: what is irreversible about a macro?",
      "Solve 1: macros have no Undo — a bad run cannot be rolled back.",
      `Solve 2: save a copy of the file before touching the original.`,
      "Solve 3: read the recorded code, clean it, then run on the copy first."]
  };
  return {
    q: `Macro VBA direkam untuk memformat ${n} sheet. Langkah pertama yang benar sebelum menjalankannya di file asli?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Simpan salinan dulu — macro tidak bisa di-Undo. Lalu baca kodenya (Alt+F11), bersihkan Select berlebihan, baru jalankan. (${ref})`,
    steps: ["Analysis: apa yang tidak bisa dibatalkan dari macro?",
      "Solve 1: macro tidak punya Undo — run yang salah tidak bisa di-rollback.",
      "Solve 2: simpan salinan file sebelum menyentuh file asli.",
      "Solve 3: baca kode hasil rekaman, bersihkan, lalu jalankan di salinan dulu."]
  };
}
function vB2Shortcut(rng, ref, L){
  const c = "Ctrl + `";
  const o = [
    c, "Ctrl + R", "Alt + F4", "Ctrl + Shift + L"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Shortcut to show all formulas at once (audit mode)?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Ctrl + ` + " (backtick) shows all formulas — L4 audit mode. Ctrl + Shift + L = filter on/off. (" + ref + ")",
    steps: ["Analysis: audit mode shows FORMULAS instead of values.",
      "Solve 1: Ctrl + ` toggles formula view.",
      "Solve 2: scan for typed numbers hiding among formulas.",
      "Solve 3: Ctrl + Shift + L is filter — a different tool."]
  };
  return {
    q: `Shortcut untuk menampilkan semua rumus sekaligus (mode audit)?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: "Ctrl + ` (backtick) menampilkan semua rumus — mode audit L4. Ctrl + Shift + L = filter on/off. (" + ref + ")",
    steps: ["Analysis: mode audit menampilkan RUMUS, bukan nilai.",
      "Solve 1: Ctrl + ` mengaktifkan tampilan rumus.",
      "Solve 2: pindai angka ketik yang bersembunyi di antara rumus.",
      "Solve 3: Ctrl + Shift + L adalah filter — alat yang berbeda."]
  };
}
function vB2PQOverwrite(rng, ref, L){
  const c = L === "en"
    ? "The manual edit is overwritten (lost)"
    : "Edit manual tertimpa (hilang)";
  const o = L === "en" ? [
    c, "The manual edit is kept", "Permanent query error", "The file locks"
  ] : [
    c, "Edit manual dipertahankan", "Query error permanen", "File terkunci"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Power Query output is edited manually, then Refresh is pressed. What happens?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Refresh overwrites the loaded output with the query's latest result — manual edits vanish without warning. Always edit the query, not the output. (${ref})`,
    steps: ["Analysis: what does Refresh rebuild from?",
      "Solve 1: Refresh re-runs the QUERY and rewrites the output.",
      "Solve 2: the output is not a source — it is a result.",
      "Solve 3: manual edits to a result are overwritten. Edit the query instead."]
  };
  return {
    q: `Hasil load Power Query diedit manual, lalu Refresh ditekan. Apa yang terjadi?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Refresh menimpa hasil load dengan output query terbaru — edit manual hilang tanpa peringatan. Selalu edit query, bukan hasil. (${ref})`,
    steps: ["Analysis: Refresh membangun ulang dari apa?",
      "Solve 1: Refresh menjalankan ulang QUERY dan menulis ulang output.",
      "Solve 2: output bukan sumber — ia adalah hasil.",
      "Solve 3: edit manual pada hasil akan tertimpa. Edit query-nya."]
  };
}

/* ---------- real-01: UNVR (margin decline, DCF) ---------- */
function vB2UNVRScen(rng, ref, L){
  const c = L === "en"
    ? "Slower revenue recovery + lower EBIT margin than 2022"
    : "Pemulihan revenue lebih lambat + margin EBIT di bawah 2022";
  const o = L === "en" ? [
    "Revenue back to 2022 levels fast", "Margin back to 2022 level fast", c, "Dividend payout only"
  ] : [
    "Revenue cepat kembali ke level 2022", "Margin cepat kembali ke level 2022", c, "Hanya payout dividen"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `UNVR bear case: what drives it?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Bear = revenue recovers slowly AND EBIT margin stays below 2022. The bull case needs BOTH back — the value is not 'cheap' on a single ratio. (${ref})`,
    steps: ["Analysis: the bear case is an assumption package, not one number.",
      "Solve 1: slower revenue recovery — less volume to absorb fixed costs.",
      "Solve 2: margin stays below 2022 — the decline is structural, not one-off.",
      "Solve 3: both together = the bear DCF. Fixing only one does not make it a bull."]
  };
  return {
    q: `Kasus bear UNVR: apa pendorongnya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Bear = revenue pulih lambat DAN margin EBIT tetap di bawah 2022. Kasus bull butuh KEDUANYA kembali — nilainya bukan 'murah' dari satu rasio saja. (${ref})`,
    steps: ["Analysis: kasus bear adalah paket asumsi, bukan satu angka.",
      "Solve 1: pemulihan revenue lambat — volume lebih kecil untuk menyerap biaya tetap.",
      "Solve 2: margin tetap di bawah 2022 — penurunannya struktural, bukan sekali jalan.",
      "Solve 3: keduanya bersama = DCF bear. Memperbaiki satu saja tidak menjadikannya bull."]
  };
}
function vB2TVDom(rng, ref, L){
  const c = L === "en"
    ? "Most of EV sits in the terminal value — assumptions decide"
    : "Mayoritas EV ada di terminal value — asumsi yang menentukan";
  const o = L === "en" ? [
    "The explicit forecast years decide everything", "The terminal value is minor", c, "Dividends decide everything"
  ] : [
    "Tahun proyeksi eksplisit yang menentukan segalanya", "Terminal value kecil saja", c, "Dividen yang menentukan segalanya"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `When the terminal value dominates a DCF, what does it warn you?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `TV dominates → WACC and g decide the answer, not the 5-year forecast. Stress-test them (tornado), do not polish year 3. (${ref})`,
    steps: ["Analysis: where does the value actually live?",
      "Solve 1: if TV is most of EV, the explicit years are a small slice.",
      "Solve 2: the answer is then a WACC-and-g answer.",
      "Solve 3: stress-test WACC and g; polishing year 3 changes almost nothing."]
  };
  return {
    q: `Saat terminal value mendominasi DCF, apa peringatannya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `TV mendominasi → WACC dan g yang menentukan jawaban, bukan proyeksi 5 tahun. Stress-test keduanya (tornado), jangan poles tahun ke-3. (${ref})`,
    steps: ["Analysis: nilai sebenarnya tinggal di mana?",
      "Solve 1: jika TV adalah mayoritas EV, tahun eksplisit hanya irisan kecil.",
      "Solve 2: jawabannya lalu menjadi jawaban WACC-dan-g.",
      "Solve 3: stress-test WACC dan g; memoles tahun ke-3 hampir tidak mengubah apa-apa."]
  };
}
function vB2Upside(rng, ref, L){
  const dcf = b2step(rng, 3000, 5000, 500), price = b2step(rng, 1500, 2800, 100);
  const up = Math.round((dcf / price - 1) * 1000) / 10;
  const vals = [up, Math.round((dcf / price - 1) * 1000) / 10 * 0.5, Math.round((price / dcf - 1) * 1000) / 10, 5];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => b2i(v, 1) + "%";
  const fe = v => b2e(v, 1) + "%";
  if (L === "en") return {
    q: `DCF value Rp${b2e(dcf)}; market price Rp${b2e(price)}. Upside?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Upside = (${b2e(dcf)} ÷ ${b2e(price)}) − 1 = ${b2e(up, 1)}%. The negative sign flip (${b2e(vals[2], 1)}%) is upside computed backwards. (${ref})`,
    steps: ["Analysis: upside is (value ÷ price) − 1.",
      `Solve 1: value ÷ price = ${b2e(dcf)} ÷ ${b2e(price)} = ${(dcf / price).toFixed(2)}×.`,
      "Solve 2: subtract 1 (the price itself).",
      `Solve 3: ${b2e(up, 1)}% upside.`]
  };
  return {
    q: `Nilai DCF Rp${b2i(dcf)}; harga pasar Rp${b2i(price)}. Upside?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Upside = (${b2i(dcf)} ÷ ${b2i(price)}) − 1 = ${b2i(up, 1)}%. Pembalikan tanda (${b2i(vals[2], 1)}%) adalah upside yang dihitung terbalik. (${ref})`,
    steps: ["Analysis: upside adalah (nilai ÷ harga) − 1.",
      `Solve 1: nilai ÷ harga = ${b2i(dcf)} ÷ ${b2i(price)} = ${(dcf / price).toFixed(2).replace(".", ",")}×.`,
      "Solve 2: kurangi 1 (harga itu sendiri).",
      `Solve 3: upside ${b2i(up, 1)}%.`]
  };
}
function vB2BullMargin(rng, ref, L){
  const c = L === "en"
    ? "EBIT margin returns to the 2022 level (17.2%)"
    : "Margin EBIT kembali ke level 2022 (17,2%)";
  const o = L === "en" ? [
    c, "Capex falls to zero", "Debt is fully repaid", "Dividend payout rises"
  ] : [
    c, "Capex turun ke nol", "Utang lunas sepenuhnya", "Payout dividen naik"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `UNVR bull case: what must happen?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Bull = EBIT margin back to the 2022 level (17.2%). Capex or payout alone cannot repair the DCF. (${ref})`,
    steps: ["Analysis: which assumption repairs the bull DCF?",
      "Solve 1: the margin decline is the value driver.",
      "Solve 2: bull requires it back to the 2022 level, 17.2%.",
      "Solve 3: capex and payout are second-order here."]
  };
  return {
    q: `Kasus bull UNVR: apa yang harus terjadi?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Bull = margin EBIT kembali ke level 2022 (17,2%). Capex atau payout saja tidak bisa memperbaiki DCF. (${ref})`,
    steps: ["Analysis: asumsi mana yang memperbaiki DCF bull?",
      "Solve 1: penurunan margin adalah pendorong nilai.",
      "Solve 2: bull mensyaratkan margin kembali ke level 2022, 17,2%.",
      "Solve 3: capex dan payout adalah urutan kedua di sini."]
  };
}
function vB2Reinvest(rng, ref, L){
  const nopat = b2pick([1000, 1200, 1500], rng), rr = b2pick([30, 40, 60], rng);
  const fcff = Math.round(nopat * (1 - rr / 100));
  const vals = [fcff, nopat, Math.round(nopat * (rr / 100)), Math.round(nopat * (1 - rr / 100) * 0.8)];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? "Rp" + b2e(v) + " billion" : "Rp" + b2i(v) + " miliar";
  if (L === "en") return {
    q: `NOPAT Rp${b2e(nopat)} billion; reinvestment rate ${rr}%. FCFF?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `FCFF = NOPAT × (1 − reinvestment rate) = ${b2e(nopat)} × ${100 - rr}% = Rp${b2e(fcff)} billion. (${ref})`,
    steps: ["Analysis: FCFF is what NOPAT leaves after reinvestment.",
      `Solve 1: reinvestment = ${rr}% × ${b2e(nopat)} = Rp${b2e(nopat * rr / 100)} billion.`,
      `Solve 2: FCFF = NOPAT − reinvestment.`,
      `Solve 3: ${b2e(nopat)} − ${b2e(nopat * rr / 100)} = Rp${b2e(fcff)} billion.`]
  };
  return {
    q: `NOPAT Rp${b2i(nopat)} miliar; reinvestment rate ${rr}%. FCFF?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `FCFF = NOPAT × (1 − reinvestment rate) = ${b2i(nopat)} × ${100 - rr}% = Rp${b2i(fcff)} miliar. (${ref})`,
    steps: ["Analysis: FCFF adalah sisa NOPAT setelah reinvestasi.",
      `Solve 1: reinvestasi = ${rr}% × ${b2i(nopat)} = Rp${b2i(nopat * rr / 100)} miliar.`,
      `Solve 2: FCFF = NOPAT − reinvestasi.`,
      `Solve 3: ${b2i(nopat)} − ${b2i(nopat * rr / 100)} = Rp${b2i(fcff)} miliar.`]
  };
}
/* ---------- real-02: ASII (SOTP, conglomerate) ---------- */
function vB2SOTPDef(rng, ref, L){
  const c = L === "en"
    ? "Sum of segment values minus holding discount"
    : "Jumlah nilai segmen dikurangi holding discount";
  const o = L === "en" ? [
    "One multiple applied to total EBIT", c, "Consolidated net profit × P/E", "Sum of segment revenues"
  ] : [
    "Satu multiple untuk total EBIT", c, "Laba bersih konsolidasi × P/E", "Jumlah revenue segmen"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Sum-of-the-parts (SOTP) means…`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `SOTP = value each segment separately (its own multiple), add them, subtract the holding discount. (${ref})`,
    steps: ["Analysis: why split a conglomerate before valuing it?",
      "Solve 1: segments have different margins and risks — one multiple lies.",
      "Solve 2: value each leg with its own multiple.",
      "Solve 3: add the legs, subtract the holding discount."]
  };
  return {
    q: `Sum-of-the-parts (SOTP) berarti…`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `SOTP = nilai tiap segmen secara terpisah (multiple masing-masing), jumlahkan, kurangi holding discount. (${ref})`,
    steps: ["Analysis: kenapa konglomerat dipecah dulu sebelum dinilai?",
      "Solve 1: segmen punya margin dan risiko berbeda — satu multiple berbohong.",
      "Solve 2: nilai tiap kaki dengan multiple-nya sendiri.",
      "Solve 3: jumlahkan kakinya, kurangi holding discount."]
  };
}
function vB2NetDebt(rng, ref, L){
  const debt = b2step(rng, 40, 90, 10), cash = b2step(rng, 10, 30, 10), ev = b2step(rng, 300, 500, 50);
  const nd = debt - cash, eq = ev - nd;
  const vals = [nd, debt + cash, debt, eq];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? "Rp" + b2e(v) + " trillion" : "Rp" + b2i(v) + " triliun";
  if (L === "en") return {
    q: `Total debt Rp${b2e(debt)} trillion; cash Rp${b2e(cash)} trillion. Net debt?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Net debt = ${b2e(debt)} − ${b2e(cash)} = Rp${b2e(nd)} trillion. (${ref})`,
    steps: ["Analysis: net debt nets cash against debt.",
      `Solve 1: total debt = Rp${b2e(debt)} trillion.`,
      `Solve 2: less cash Rp${b2e(cash)} trillion.`,
      `Solve 3: net debt = Rp${b2e(nd)} trillion.`]
  };
  return {
    q: `Total utang Rp${b2i(debt)} triliun; kas Rp${b2i(cash)} triliun. Net debt?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Net debt = ${b2i(debt)} − ${b2i(cash)} = Rp${b2i(nd)} triliun. (${ref})`,
    steps: ["Analysis: net debt mengurangkan kas dari utang.",
      `Solve 1: total utang = Rp${b2i(debt)} triliun.`,
      `Solve 2: kurangi kas Rp${b2i(cash)} triliun.`,
      `Solve 3: net debt = Rp${b2i(nd)} triliun.`]
  };
}
function vB2CongDisc(rng, ref, L){
  const sotp = b2step(rng, 8000, 12000, 1000), mkt = Math.round(sotp * b2pick([0.55, 0.6, 0.65, 0.7], rng));
  const disc = Math.round((1 - mkt / sotp) * 1000) / 10;
  const vals = [disc, Math.round((sotp / mkt - 1) * 1000) / 10, Math.round((1 - mkt / sotp) * 1000) / 10 + 15, 5];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => b2i(v, 1) + "%";
  const fe = v => b2e(v, 1) + "%";
  if (L === "en") return {
    q: `SOTP value Rp${b2e(sotp)}; market value Rp${b2e(mkt)}. Conglomerate discount?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Discount = 1 − market/SOTP = 1 − ${b2e(mkt)}/${b2e(sotp)} = ${b2e(disc, 1)}%. (${ref})`,
    steps: ["Analysis: the discount is the gap between SOTP and market.",
      `Solve 1: market ÷ SOTP = ${b2e(mkt)} ÷ ${b2e(sotp)} = ${(mkt / sotp).toFixed(2)}.`,
      "Solve 2: discount = 1 − that ratio.",
      `Solve 3: ${b2e(disc, 1)}%.`]
  };
  return {
    q: `Nilai SOTP Rp${b2i(sotp)}; nilai pasar Rp${b2i(mkt)}. Conglomerate discount?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Diskon = 1 − pasar/SOTP = 1 − ${b2i(mkt)}/${b2i(sotp)} = ${b2i(disc, 1)}%. (${ref})`,
    steps: ["Analysis: diskon adalah selisih antara SOTP dan pasar.",
      `Solve 1: pasar ÷ SOTP = ${b2i(mkt)} ÷ ${b2i(sotp)} = ${(mkt / sotp).toFixed(2).replace(".", ",")}.`,
      "Solve 2: diskon = 1 − rasio itu.",
      `Solve 3: ${b2i(disc, 1)}%.`]
  };
}
function vB2MultDiff(rng, ref, L){
  const c = L === "en"
    ? "Different margins, growth, and risk — one multiple hides them"
    : "Margin, growth, dan risiko berbeda — satu multiple menyembunyikannya";
  const o = L === "en" ? [
    "Segments share one ticker", c, "Revenue is identical across segments", "EBITDA is always positive"
  ] : [
    "Segmen berbagi satu ticker", c, "Revenue identik di semua segmen", "EBITDA selalu positif"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Why value each ASII segment with its own multiple?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Different margins, growth, and risk across segments — one multiple would price a car dealer like a plantation. (${ref})`,
    steps: ["Analysis: what differs between segments?",
      "Solve 1: margins differ — automotive vs agribusiness vs IT.",
      "Solve 2: growth and risk differ too.",
      "Solve 3: one multiple hides all of that — segment multiples do not."]
  };
  return {
    q: `Kenapa tiap segmen ASII dinilai dengan multiple sendiri?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Margin, growth, dan risiko berbeda antar segmen — satu multiple akan menilai dealer mobil seperti perkebunan. (${ref})`,
    steps: ["Analysis: apa yang berbeda antar segmen?",
      "Solve 1: margin berbeda — otomotif vs agribisnis vs TI.",
      "Solve 2: growth dan risiko juga berbeda.",
      "Solve 3: satu multiple menyembunyikan semua itu — multiple per segmen tidak."]
  };
}
function vB2BigSegment(rng, ref, L){
  const share = b2pick([30, 35, 40], rng), ebit = b2pick([12000, 15000, 18000], rng), mult = b2pick([6, 7, 8], rng);
  const val = Math.round(share / 100 * ebit * mult / 100) / 10;
  const vals = [val, 11.13, 31.81, 21.21];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => "Rp" + b2i(v, 2) + " triliun";
  const fe = v => "Rp" + b2e(v, 2) + " trillion";
  if (L === "en") return {
    q: `Automotive contributes ${share}% of consolidated EBIT Rp${b2e(ebit)} billion at a ${mult}× multiple. Segment value (trillions)?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Automotive EBIT ${share}% × ${b2e(ebit)} = Rp${b2e(share / 100 * ebit)} billion; × ${mult} = Rp${b2e(val, 2)} trillion — still the biggest leg (Property 11.13, Agribusiness 31.81, IT 21.21). (${ref})`,
    steps: ["Analysis: segment value = segment EBIT × its multiple.",
      `Solve 1: automotive EBIT = ${share}% × Rp${b2e(ebit)} billion = Rp${b2e(share / 100 * ebit)} billion.`,
      `Solve 2: value = Rp${b2e(share / 100 * ebit)} billion × ${mult}.`,
      `Solve 3: Rp${b2e(val, 2)} trillion — the biggest leg.`]
  };
  return {
    q: `Otomotif menyumbang ${share}% dari EBIT konsolidasi Rp${b2i(ebit)} miliar dengan multiple ${mult}×. Nilai segmen (triliun)?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `EBIT Otomotif ${share}% × ${b2i(ebit)} = Rp${b2i(share / 100 * ebit)} miliar; × ${mult} = Rp${b2i(val, 2)} triliun — tetap kaki terbesar (Properti 11,13, Agribisnis 31,81, TI 21,21). (${ref})`,
    steps: ["Analysis: nilai segmen = EBIT segmen × multiple-nya.",
      `Solve 1: EBIT Otomotif = ${share}% × Rp${b2i(ebit)} miliar = Rp${b2i(share / 100 * ebit)} miliar.`,
      `Solve 2: nilai = Rp${b2i(share / 100 * ebit)} miliar × ${mult}.`,
      `Solve 3: Rp${b2i(val, 2)} triliun — kaki terbesar.`]
  };
}
function vB2BridgeFull(rng, ref, L){
  const c = L === "en"
    ? "EV − net debt − NCI"
    : "EV − net debt − NCI";
  const o = L === "en" ? [
    "EV + net debt + NCI", "EV − net debt only", c, "EV × (1 − holding discount)"
  ] : [
    "EV + net debt + NCI", "EV − net debt saja", c, "EV × (1 − holding discount)"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `SOTP: from EV to equity value, the bridge is…`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Equity = EV − net debt − NCI. NCI is the minority share of subsidiary value — the parent does not own it. (${ref})`,
    steps: ["Analysis: EV belongs to all capital providers — who must be paid first?",
      "Solve 1: EV − net debt = value for ALL equity holders.",
      "Solve 2: part of that belongs to minorities (NCI).",
      "Solve 3: subtract NCI too → equity value for the parent's shareholders."]
  };
  return {
    q: `SOTP: dari EV ke nilai ekuitas, bridge-nya adalah…`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `Ekuitas = EV − net debt − NCI. NCI adalah bagian minoritas atas nilai anak perusahaan — induk tidak memilikinya. (${ref})`,
    steps: ["Analysis: EV milik semua penyedia modal — siapa yang harus dibayar dulu?",
      "Solve 1: EV − net debt = nilai untuk SEMUA pemegang ekuitas.",
      "Solve 2: sebagian di antaranya milik minoritas (NCI).",
      "Solve 3: kurangi NCI juga → nilai ekuitas untuk pemegang saham induk."]
  };
}
/* ---------- real-03: acquisition accounting ---------- */
function vB2NCIWhy(rng, ref, L){
  const c = L === "en"
    ? "The parent consolidates 100% of the subsidiary, so minorities' share is a separate line"
    : "Induk mengkonsolidasi 100% anak, jadi bagian minoritas jadi baris terpisah";
  const o = L === "en" ? [
    "The parent owns 100% of the subsidiary", c, "The subsidiary is not consolidated", "Goodwill is booked twice"
  ] : [
    "Induk memiliki 100% anak", c, "Anak tidak dikonsolidasi", "Goodwill dibukukan dua kali"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Why does NCI appear on a consolidated balance sheet?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `The parent consolidates 100% of the subsidiary's assets and liabilities; NCI is the minority's share of that net value — a liability-side line, not a deduction from assets. (${ref})`,
    steps: ["Analysis: consolidation is 100%, ownership is not.",
      "Solve 1: the parent consolidates 100% of the subsidiary.",
      "Solve 2: the minority owns part of that 100%.",
      "Solve 3: NCI records their share — so the balance sheet still balances."]
  };
  return {
    q: `Kenapa NCI muncul di neraca konsolidasi?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Induk mengkonsolidasi 100% aset dan liabilitas anak; NCI adalah bagian minoritas atas nilai bersih itu — baris sisi liabilitas, bukan pengurang aset. (${ref})`,
    steps: ["Analysis: konsolidasi 100%, kepemilikan tidak.",
      "Solve 1: induk mengkonsolidasi 100% anak perusahaan.",
      "Solve 2: minoritas memiliki sebagian dari 100% itu.",
      "Solve 3: NCI mencatat bagian mereka — agar neraca tetap balance."]
  };
}
function vB2IntBegin(rng, ref, L){
  const c = L === "en"
    ? "Beginning debt (the interest accrual base)"
    : "Utang awal (basis akrual bunga)";
  const o = L === "en" ? [
    "Ending debt", c, "Average equity", "EBITDA"
  ] : [
    "Utang akhir", c, "Rata-rata ekuitas", "EBITDA"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Interest in a model is computed on…`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Beginning debt — interest accrues on the opening balance (ending-debt interest would be circular). (${ref})`,
    steps: ["Analysis: when does interest accrue — on the opening or closing balance?",
      "Solve 1: interest accrues over the period on the balance at its start.",
      "Solve 2: that is the beginning debt.",
      "Solve 3: ending debt depends on the repayment, which depends on cash, which depends on interest — circular."]
  };
  return {
    q: `Bunga dalam model dihitung atas…`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Utang awal — bunga terakrual atas saldo awal (bunga atas utang akhir akan circular). (${ref})`,
    steps: ["Analysis: kapan bunga terakrual — atas saldo awal atau akhir?",
      "Solve 1: bunga terakrual selama periode atas saldo di awalnya.",
      "Solve 2: itu adalah utang awal.",
      "Solve 3: utang akhir bergantung pada pelunasan, yang bergantung pada kas, yang bergantung pada bunga — circular."]
  };
}
function vB2WCSign(rng, ref, L){
  const d = b2pick([100, 200, 300], rng);
  const dir = rng() < 0.5 ? 1 : -1;
  const eff = dir * d;
  const f = v => L === "en" ? (v > 0 ? `CFO up ${b2e(v)}` : v < 0 ? `CFO down ${b2e(-v)}` : "Unchanged (zero)") : (v > 0 ? `CFO naik ${b2i(v)}` : v < 0 ? `CFO turun ${b2i(-v)}` : "Tidak berubah (nol)");
  const c = dir > 0 ? (L === "en" ? `Working capital up ${b2e(d)}` : `Modal kerja naik ${b2i(d)}`) : (L === "en" ? `Working capital down ${b2e(d)}` : `Modal kerja turun ${b2i(d)}`);
  const o = [f(eff), f(-eff), f(0), f(Math.round(eff * 0.5))];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `${c} (all else equal). CFO effect?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Working capital ${dir > 0 ? "up" : "down"} ${b2e(d)} ties ${dir > 0 ? "up" : "releases"} cash → CFO ${eff > 0 ? "up" : "down"} ${b2e(Math.abs(eff))}. (${ref})`,
    steps: ["Analysis: ΔWC moves cash in the opposite direction.",
      `Solve 1: working capital ${dir > 0 ? "up" : "down"} ${b2e(d)}.`,
      `Solve 2: that ${dir > 0 ? "ties up" : "releases"} ${b2e(d)} of cash.`,
      `Solve 3: CFO ${eff > 0 ? "up" : "down"} ${b2e(Math.abs(eff))}.`]
  };
  return {
    q: `${c} (semua lain sama). Dampak ke CFO?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Modal kerja ${dir > 0 ? "naik" : "turun"} ${b2i(d)} ${dir > 0 ? "mengikat" : "melepas"} kas → CFO ${eff > 0 ? "naik" : "turun"} ${b2i(Math.abs(eff))}. (${ref})`,
    steps: ["Analysis: ΔWC menggerakkan kas ke arah berlawanan.",
      `Solve 1: modal kerja ${dir > 0 ? "naik" : "turun"} ${b2i(d)}.`,
      `Solve 2: itu ${dir > 0 ? "mengikat" : "melepas"} kas ${b2i(d)}.`,
      `Solve 3: CFO ${eff > 0 ? "naik" : "turun"} ${b2i(Math.abs(eff))}.`]
  };
}
function vB2DoubleCapex(rng, ref, L){
  const capex = b2pick([200, 300, 400], rng);
  const base = b2step(rng, 800, 1200, 100);
  const wrong = base - capex;
  const vals = [base, wrong, base + capex, base - capex * 2];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? "Rp" + b2e(v) + " billion" : "Rp" + b2i(v) + " miliar";
  if (L === "en") return {
    q: `A model subtracts capex ${b2e(capex)} twice (once in 'capex' and once inside ΔWC via a PPE roll). Correct FCFF is Rp${b2e(base)} billion. What did the model show?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(1),
    explain: `The model showed Rp${b2e(wrong)} billion — one capex too many. Find it via the PPE roll-forward: ΔPPE + D&A = capex. (${ref})`,
    steps: ["Analysis: where can capex hide twice?",
      `Solve 1: capex appears in its own line (${b2e(capex)}).`,
      `Solve 2: it also hides inside ΔWC via the PPE roll.`,
      `Solve 3: the model double-counts → ${b2e(base)} − ${b2e(capex)} = Rp${b2e(wrong)} billion. Correct is Rp${b2e(base)} billion.`]
  };
  return {
    q: `Model mengurangkan capex ${b2i(capex)} dua kali (sekali di 'capex', sekali di dalam ΔWC via roll PPE). FCFF benar Rp${b2i(base)} miliar. Berapa yang ditampilkan model?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(1),
    explain: `Model menampilkan Rp${b2i(wrong)} miliar — satu capex kebanyakan. Temukan via roll-forward PPE: ΔPPE + D&A = capex. (${ref})`,
    steps: ["Analysis: di mana capex bisa bersembunyi dua kali?",
      `Solve 1: capex muncul di barisnya sendiri (${b2i(capex)}).`,
      `Solve 2: ia juga bersembunyi di dalam ΔWC via roll PPE.`,
      `Solve 3: model menghitung ganda → ${b2i(base)} − ${b2i(capex)} = Rp${b2i(wrong)} miliar. Yang benar Rp${b2i(base)} miliar.`]
  };
}
function vB2FakeOK(rng, ref, L){
  const c = L === "en"
    ? "False — it can still be wrong (double-counted capex)"
    : "Salah — bisa tetap salah (capex terhitung ganda)";
  const o = L === "en" ? [
    "True — a tied-out model is always right", c, "True, if the error is small", "True for DCF but not for LBO"
  ] : [
    "Benar — model yang balance pasti benar", c, "Benar, kalau errornya kecil", "Benar untuk DCF tapi bukan LBO"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `'The model ties out (balance sheet balances), so it must be right.' True or false?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `False. A balance sheet can balance with a wrong FCFF (e.g. double-counted capex hidden in ΔWC). Tying out is necessary, not sufficient. (${ref})`,
    steps: ["Analysis: what does 'ties out' prove?",
      "Solve 1: it proves the arithmetic of the statements is consistent.",
      "Solve 2: it does not prove the economics — capex can be double-counted and still balance.",
      "Solve 3: tying out is necessary, not sufficient. Audit the logic too."]
  };
  return {
    q: `'Model balance (neraca seimbang), jadi pasti benar.' Benar atau salah?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Salah. Neraca bisa balance dengan FCFF yang salah (mis. capex terhitung ganda tersembunyi di ΔWC). Balance itu perlu, bukan cukup. (${ref})`,
    steps: ["Analysis: apa yang dibuktikan 'balance'?",
      "Solve 1: ia membuktikan aritmatika laporan konsisten.",
      "Solve 2: ia tidak membuktikan ekonominya — capex bisa terhitung ganda dan tetap balance.",
      "Solve 3: balance itu perlu, bukan cukup. Audit juga logikanya."]
  };
}
function vB2NCIRoll(rng, ref, L){
  const open = b2step(rng, 400, 800, 100), profit = b2step(rng, 100, 300, 50), div = b2step(rng, 50, 150, 50);
  const close = open + profit - div;
  const vals = [close, open + profit, open - div, open + profit + div];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? "Rp" + b2e(v) + " billion" : "Rp" + b2i(v) + " miliar";
  if (L === "en") return {
    q: `NCI opening Rp${b2e(open)} billion; minority share of profit Rp${b2e(profit)} billion; dividends to minorities Rp${b2e(div)} billion. Closing NCI?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Closing NCI = ${b2e(open)} + ${b2e(profit)} − ${b2e(div)} = Rp${b2e(close)} billion. (${ref})`,
    steps: ["Analysis: NCI rolls like any equity balance.",
      `Solve 1: opening Rp${b2e(open)} billion.`,
      `Solve 2: add the minority's share of profit +Rp${b2e(profit)} billion.`,
      `Solve 3: less dividends paid to them −Rp${b2e(div)} billion → Rp${b2e(close)} billion.`]
  };
  return {
    q: `NCI awal Rp${b2i(open)} miliar; bagian minoritas atas laba Rp${b2i(profit)} miliar; dividen ke minoritas Rp${b2i(div)} miliar. NCI akhir?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `NCI akhir = ${b2i(open)} + ${b2i(profit)} − ${b2i(div)} = Rp${b2i(close)} miliar. (${ref})`,
    steps: ["Analysis: NCI menggulung seperti saldo ekuitas lainnya.",
      `Solve 1: awal Rp${b2i(open)} miliar.`,
      `Solve 2: tambah bagian minoritas atas laba +Rp${b2i(profit)} miliar.`,
      `Solve 3: kurangi dividen ke mereka −Rp${b2i(div)} miliar → Rp${b2i(close)} miliar.`]
  };
}
function vB2GoodwillPartial(rng, ref, L){
  const price = b2step(rng, 600, 900, 100), stake = b2pick([70, 80, 90], rng), fv = b2step(rng, 700, 900, 100);
  const gw = price - Math.round(stake / 100 * fv);
  const full = Math.round(price / (stake / 100) - fv);
  const vals = [gw, full, Math.round(price - fv), Math.round(stake / 100 * fv)];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? "Rp" + b2e(v) + " billion" : "Rp" + b2i(v) + " miliar";
  if (L === "en") return {
    q: `Price paid Rp${b2e(price)} billion for ${stake}% of a target with FV of net assets Rp${b2e(fv)} billion (NCI at proportionate share). Goodwill (partial method)?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Goodwill = price − ${stake}% × FV = ${b2e(price)} − ${b2e(stake / 100 * fv)} = Rp${b2e(gw)} billion. The full method would add NCI at fair value (${b2e(full)}). (${ref})`,
    steps: ["Analysis: partial method — goodwill only on the parent's stake.",
      `Solve 1: identifiable net assets acquired = ${stake}% × Rp${b2e(fv)} billion = Rp${b2e(stake / 100 * fv)} billion.`,
      `Solve 2: price paid Rp${b2e(price)} billion.`,
      `Solve 3: goodwill = ${b2e(price)} − ${b2e(stake / 100 * fv)} = Rp${b2e(gw)} billion.`]
  };
  return {
    q: `Harga bayar Rp${b2i(price)} miliar untuk ${stake}% target dengan FV aset bersih Rp${b2i(fv)} miliar (NCI metode proporsional). Goodwill (metode parsial)?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Goodwill = harga − ${stake}% × FV = ${b2i(price)} − ${b2i(stake / 100 * fv)} = Rp${b2i(gw)} miliar. Metode penuh akan menambah NCI pada fair value (${b2i(full)}). (${ref})`,
    steps: ["Analysis: metode parsial — goodwill hanya atas porsi induk.",
      `Solve 1: aset bersih teridentifikasi yang diperoleh = ${stake}% × Rp${b2i(fv)} miliar = Rp${b2i(stake / 100 * fv)} miliar.`,
      `Solve 2: harga dibayar Rp${b2i(price)} miliar.`,
      `Solve 3: goodwill = ${b2i(price)} − ${b2i(stake / 100 * fv)} = Rp${b2i(gw)} miliar.`]
  };
}
/* ---------- real-04: GOTO (growth, implied g) ---------- */
function vB2RevDCF(rng, ref, L){
  const c = L === "en"
    ? "Revenue growth without margin and cash conversion proves nothing"
    : "Growth revenue tanpa margin & konversi kas tidak membuktikan apa-apa";
  const o = L === "en" ? [
    "Revenue growth alone is enough", c, "Revenue growth always raises value", "Growth means dividends rise"
  ] : [
    "Growth revenue saja sudah cukup", c, "Growth revenue selalu menaikkan nilai", "Growth berarti dividen naik"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A growth company shows 40% revenue growth. For a DCF, what is still missing?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Revenue growth without margin, reinvestment, and cash conversion proves nothing — value lives in FCFF, not the top line. (${ref})`,
    steps: ["Analysis: what does a DCF actually discount?",
      "Solve 1: FCFF — cash, not revenue.",
      "Solve 2: revenue growth must survive margin and reinvestment to become FCFF.",
      "Solve 3: the top line alone is a headline, not a valuation."]
  };
  return {
    q: `Perusahaan growth menunjukkan growth revenue 40%. Untuk DCF, apa yang masih hilang?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Growth revenue tanpa margin, reinvestasi, dan konversi kas tidak membuktikan apa-apa — nilai hidup di FCFF, bukan top line. (${ref})`,
    steps: ["Analysis: apa sebenarnya yang didiskon DCF?",
      "Solve 1: FCFF — kas, bukan revenue.",
      "Solve 2: growth revenue harus selamat dari margin dan reinvestasi untuk jadi FCFF.",
      "Solve 3: top line saja adalah headline, bukan valuasi."]
  };
}
function vB2RevGap(rng, ref, L){
  const g = b2pick([20, 25, 30], rng), val = b2pick([50, 60, 70], rng), price = b2step(rng, 150, 250, 50);
  const vals = [val, price, Math.round((val + price) / 2), Math.round(val * 1.5)];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => "Rp" + b2i(v);
  const fe = v => "Rp" + b2e(v);
  if (L === "en") return {
    q: `At ${g}% revenue growth forever, the model values the share at Rp${b2e(val)}. The market price is Rp${b2e(price)}. The model implies the market is…`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Even at ${g}% growth the value (Rp${b2e(val)}) is far below the price (Rp${b2e(price)}). The market prices in far more — or the model is too harsh. Either way, the gap is the question. (${ref})`,
    steps: ["Analysis: compare the model value with the price.",
      `Solve 1: model value Rp${b2e(val)} at ${g}% growth.`,
      `Solve 2: market price Rp${b2e(price)} — higher by Rp${b2e(price - val)}.`,
      "Solve 3: the market implies more growth (or less risk) than the model. That gap is the investment question."]
  };
  return {
    q: `Dengan growth revenue ${g}% selamanya, model menilai saham Rp${b2i(val)}. Harga pasar Rp${b2i(price)}. Model menyiratkan pasar…`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Bahkan dengan growth ${g}%, nilai (Rp${b2i(val)}) jauh di bawah harga (Rp${b2i(price)}). Pasar menghargai jauh lebih banyak — atau model terlalu keras. Bagaimanapun, selisihnya adalah pertanyaannya. (${ref})`,
    steps: ["Analysis: bandingkan nilai model dengan harga.",
      `Solve 1: nilai model Rp${b2i(val)} pada growth ${g}%.`,
      `Solve 2: harga pasar Rp${b2i(price)} — lebih tinggi Rp${b2i(price - val)}.`,
      "Solve 3: pasar menyiratkan growth lebih besar (atau risiko lebih kecil) dari model. Selisih itu adalah pertanyaan investasinya."]
  };
}
function vB2ImpliedG(rng, ref, L){
  const g = b2pick([30, 35, 40, 45], rng);
  const vals = [g, g - 10, g + 10, 15];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => b2i(v) + "%";
  const fe = v => b2e(v) + "%";
  if (L === "en") return {
    q: `Reverse-DCF: the market price implies revenue growth of ${g}% for a decade. What is the honest reading?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Implied growth ${g}% — the market's embedded assumption. Ask whether the business can actually deliver it, not whether the model 'agrees'. (${ref})`,
    steps: ["Analysis: reverse the DCF — what growth does the PRICE imply?",
      `Solve 1: solve for the growth that reproduces the market price: ${g}%.`,
      "Solve 2: that is the market's embedded assumption.",
      "Solve 3: judge the business against it — can it deliver a decade of that?"]
  };
  return {
    q: `Reverse-DCF: harga pasar menyiratkan growth revenue ${g}% selama satu dekade. Apa bacaan jujurnya?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Implied growth ${g}% — asumsi yang tertanam di pasar. Tanyakan apakah bisnisnya benar-benar bisa mewujudkannya, bukan apakah model 'setuju'. (${ref})`,
    steps: ["Analysis: balik DCF — growth berapa yang disiratkan HARGA?",
      `Solve 1: cari growth yang menghasilkan harga pasar: ${g}%.`,
      "Solve 2: itulah asumsi yang tertanam di pasar.",
      "Solve 3: nilai bisnis terhadap asumsi itu — bisakah ia mewujudkannya selama satu dekade?"]
  };
}
function vB2NormMargin(rng, ref, L){
  const c = L === "en"
    ? "12% — an illustrative normalisation, not a forecast"
    : "12% — normalisasi ilustratif, bukan forecast";
  const o = L === "en" ? [
    c, "40% — the peak year margin", "0% — growth companies have no margin", "25% — the sector average"
  ] : [
    c, "40% — margin tahun puncak", "0% — perusahaan growth tidak punya margin", "25% — rata-rata sektor"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `The case normalises the long-run margin to…`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `12% — an illustrative normalisation. It is a judgement call to test, not a fact to defend. (${ref})`,
    steps: ["Analysis: what is a 'normalised' margin?",
      "Solve 1: a steady-state judgement, not a forecast of any single year.",
      "Solve 2: the case uses 12% as the illustration.",
      "Solve 3: test it — the DCF answer moves with it, so it must be argued, not assumed."]
  };
  return {
    q: `Kasus ini menormalisasi margin jangka panjang ke…`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `12% — normalisasi ilustratif. Ini judgement call untuk diuji, bukan fakta untuk dipertahankan. (${ref})`,
    steps: ["Analysis: apa itu margin 'ternormalisasi'?",
      "Solve 1: judgement steady-state, bukan forecast satu tahun tertentu.",
      "Solve 2: kasus memakai 12% sebagai ilustrasi.",
      "Solve 3: uji ia — jawaban DCF bergerak bersamanya, jadi harus diargumentasikan, bukan diasumsikan."]
  };
}
function vB2GoalSeek(rng, ref, L){
  const c = L === "en"
    ? "Goal Seek on the growth assumption until value = price"
    : "Goal Seek pada asumsi growth sampai nilai = harga";
  const o = L === "en" ? [
    "Solver on capex only", c, "A new DCF from scratch", "Changing the WACC to match"
  ] : [
    "Solver pada capex saja", c, "DCF baru dari nol", "Mengubah WACC agar cocok"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `How is the implied growth found in the model?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Goal Seek on the growth assumption until value = price. One input, one target — the textbook Goal Seek use. (${ref})`,
    steps: ["Analysis: implied growth = the growth that reproduces the price.",
      "Solve 1: set the target — value per share = market price.",
      "Solve 2: change one input — the growth assumption.",
      "Solve 3: that is Goal Seek: one input, one target."]
  };
  return {
    q: `Bagaimana implied growth ditemukan dalam model?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Goal Seek pada asumsi growth sampai nilai = harga. Satu input, satu target — penggunaan Goal Seek yang textbook. (${ref})`,
    steps: ["Analysis: implied growth = growth yang menghasilkan harga.",
      "Solve 1: tetapkan target — nilai per saham = harga pasar.",
      "Solve 2: ubah satu input — asumsi growth.",
      "Solve 3: itulah Goal Seek: satu input, satu target."]
  };
}
/* ---------- real-05: TLKM (FCF, harvest) ---------- */
function vB2FCFSimple(rng, ref, L){
  let ocf, capex;
  for (let t = 0; t < 50; t++) {
    ocf = b2step(rng, 30000, 60000, 5000); capex = b2step(rng, 15000, 25000, 5000);
    if (ocf !== 2 * capex) break; // guard: OCF = 2x capex would make FCF == capex
  }
  const fcf = ocf - capex;
  const vals = [fcf, ocf + capex, ocf, capex];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => "Rp" + b2i(v) + " miliar";
  const fe = v => "Rp" + b2e(v) + " billion";
  if (L === "en") return {
    q: `OCF Rp${b2e(ocf)} billion; capex Rp${b2e(capex)} billion. Free cash flow?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `FCF = OCF − capex = ${b2e(ocf)} − ${b2e(capex)} = Rp${b2e(fcf)} billion. (${ref})`,
    steps: ["Analysis: free cash flow is OCF after keeping the business running.",
      `Solve 1: OCF Rp${b2e(ocf)} billion.`,
      `Solve 2: less capex Rp${b2e(capex)} billion.`,
      `Solve 3: FCF = Rp${b2e(fcf)} billion.`]
  };
  return {
    q: `OCF Rp${b2i(ocf)} miliar; capex Rp${b2i(capex)} miliar. Free cash flow?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `FCF = OCF − capex = ${b2i(ocf)} − ${b2i(capex)} = Rp${b2i(fcf)} miliar. (${ref})`,
    steps: ["Analysis: free cash flow adalah OCF setelah menjaga bisnis tetap jalan.",
      `Solve 1: OCF Rp${b2i(ocf)} miliar.`,
      `Solve 2: kurangi capex Rp${b2i(capex)} miliar.`,
      `Solve 3: FCF = Rp${b2i(fcf)} miliar.`]
  };
}
function vB2Harvest(rng, ref, L){
  const c = L === "en"
    ? "FCF expands — but check whether growth is being starved"
    : "FCF membesar — tapi cek apakah growth dikorbankan";
  const o = L === "en" ? [
    "FCF falls", "Revenue falls", c, "Capex rises forever"
  ] : [
    "FCF turun", "Revenue turun", c, "Capex naik selamanya"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Capex falls after the 5G build-out. What happens to FCF — and what is the catch?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `FCF expands as capex falls — but a harvest that starves growth destroys the next cycle. Judge the capex cut, don't just celebrate the FCF. (${ref})`,
    steps: ["Analysis: FCF = OCF − capex; capex falls.",
      "Solve 1: lower capex → higher FCF, arithmetically.",
      "Solve 2: but capex buys future capacity — a cut is a harvest.",
      "Solve 3: ask whether growth is being starved before celebrating."]
  };
  return {
    q: `Capex turun setelah build-out 5G. Apa yang terjadi pada FCF — dan apa jebakannya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `FCF membesar saat capex turun — tapi panen yang mengorbankan growth merusak siklus berikutnya. Nilai pemotongan capex-nya, jangan hanya merayakan FCF. (${ref})`,
    steps: ["Analysis: FCF = OCF − capex; capex turun.",
      "Solve 1: capex lebih rendah → FCF lebih tinggi, secara aritmatika.",
      "Solve 2: tapi capex membeli kapasitas masa depan — pemotongan adalah panen.",
      "Solve 3: tanyakan apakah growth dikorbankan sebelum merayakannya."]
  };
}
function vB2Wave5G(rng, ref, L){
  const ocf = b2step(rng, 45000, 55000, 5000), capex = b2pick([32000, 34000, 36000], rng);
  const fcf = ocf - capex;
  const vals = [fcf, ocf - 25000, ocf, ocf - capex - 5000];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => "Rp" + b2i(v) + " miliar";
  const fe = v => "Rp" + b2e(v) + " billion";
  if (L === "en") return {
    q: `5G wave year: OCF Rp${b2e(ocf)} billion; capex Rp${b2e(capex)} billion (peak). FCF?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `FCF = ${b2e(ocf)} − ${b2e(capex)} = Rp${b2e(fcf)} billion. A peak-capex year compresses FCF — that is the wave, not a broken business. (${ref})`,
    steps: ["Analysis: the 5G wave is a capex peak — FCF compresses that year.",
      `Solve 1: OCF Rp${b2e(ocf)} billion.`,
      `Solve 2: less peak capex Rp${b2e(capex)} billion.`,
      `Solve 3: FCF = Rp${b2e(fcf)} billion.`]
  };
  return {
    q: `Tahun gelombang 5G: OCF Rp${b2i(ocf)} miliar; capex Rp${b2i(capex)} miliar (puncak). FCF?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `FCF = ${b2i(ocf)} − ${b2i(capex)} = Rp${b2i(fcf)} miliar. Tahun capex puncak menekan FCF — itu gelombangnya, bukan bisnis yang rusak. (${ref})`,
    steps: ["Analysis: gelombang 5G adalah puncak capex — FCF tertekan tahun itu.",
      `Solve 1: OCF Rp${b2i(ocf)} miliar.`,
      `Solve 2: kurangi capex puncak Rp${b2i(capex)} miliar.`,
      `Solve 3: FCF = Rp${b2i(fcf)} miliar.`]
  };
}
function vB2FCFYield(rng, ref, L){
  const fcf = b2pick([12000, 15000, 18000], rng), price = b2pick([3000, 4000, 5000], rng), sh = b2pick([90, 100, 110], rng);
  const y = Math.round(fcf / (price * sh) * 1000 * 100) / 100;
  const vals = [y, Math.round(fcf / (price * sh) * 1000 * 100) / 100 * 0.5, Math.round(y * 1.2 * 100) / 100, 3];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => b2i(v, 2) + "%";
  const fe = v => b2e(v, 2) + "%";
  if (L === "en") return {
    q: `FCF Rp${b2e(fcf)} billion; price Rp${b2e(price)}; ${b2e(sh)} billion shares. FCF yield?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Market cap = ${b2e(price)} × ${b2e(sh)}bn = Rp${b2e(price * sh)} billion; yield = ${b2e(fcf)} ÷ ${b2e(price * sh)} = ${b2e(y, 2)}%. (${ref})`,
    steps: ["Analysis: yield = FCF ÷ market cap.",
      `Solve 1: market cap = price × shares = ${b2e(price)} × ${b2e(sh)}bn = Rp${b2e(price * sh)} billion.`,
      `Solve 2: yield = FCF ÷ market cap.`,
      `Solve 3: ${b2e(fcf)} ÷ ${b2e(price * sh)} = ${b2e(y, 2)}%.`]
  };
  return {
    q: `FCF Rp${b2i(fcf)} miliar; harga Rp${b2i(price)}; ${b2i(sh)} miliar saham. FCF yield?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Market cap = ${b2i(price)} × ${b2i(sh)} mld = Rp${b2i(price * sh)} miliar; yield = ${b2i(fcf)} ÷ ${b2i(price * sh)} = ${b2i(y, 2)}%. (${ref})`,
    steps: ["Analysis: yield = FCF ÷ market cap.",
      `Solve 1: market cap = harga × saham = ${b2i(price)} × ${b2i(sh)} mld = Rp${b2i(price * sh)} miliar.`,
      `Solve 2: yield = FCF ÷ market cap.`,
      `Solve 3: ${b2i(fcf)} ÷ ${b2i(price * sh)} = ${b2i(y, 2)}%.`]
  };
}
function vB2GapStance(rng, ref, L){
  const c = L === "en"
    ? "A gap is a question to investigate, not a verdict"
    : "Selisih adalah pertanyaan untuk diselidiki, bukan vonis";
  const o = L === "en" ? [
    "The gap proves the model is wrong", c, "The gap proves the market is wrong", "Ignore the gap entirely"
  ] : [
    "Selisih membuktikan model salah", c, "Selisih membuktikan pasar salah", "Abaikan selisih sepenuhnya"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Model value and market price differ. The right stance?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `A gap is a question: what does the market assume that the model does not (or vice versa)? Investigate the assumptions, do not pick a side. (${ref})`,
    steps: ["Analysis: a gap is information, not a verdict.",
      "Solve 1: the model and the market embed different assumptions.",
      "Solve 2: list them — growth, margin, WACC, capex.",
      "Solve 3: investigate which side is right; the gap is the research agenda."]
  };
  return {
    q: `Nilai model dan harga pasar berbeda. Sikap yang benar?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Selisih adalah pertanyaan: apa yang diasumsikan pasar yang tidak diasumsikan model (atau sebaliknya)? Selidiki asumsinya, jangan pilih kubu. (${ref})`,
    steps: ["Analysis: selisih adalah informasi, bukan vonis.",
      "Solve 1: model dan pasar menanam asumsi berbeda.",
      "Solve 2: daftarkan — growth, margin, WACC, capex.",
      "Solve 3: selidiki pihak mana yang benar; selisih adalah agenda risetnya."]
  };
}
/* ---------- real-06: BBRI (bank valuation) ---------- */
function vB2BankDCF(rng, ref, L){
  const c = L === "en"
    ? "Deposits are the raw material, not debt to subtract"
    : "Deposito adalah bahan baku, bukan utang untuk dikurangi";
  const o = L === "en" ? [
    "Banks have no working capital", c, "Banks cannot be valued with DCF", "Interest is not a cost for banks"
  ] : [
    "Bank tidak punya modal kerja", c, "Bank tidak bisa dinilai dengan DCF", "Bunga bukan biaya bagi bank"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Why does a standard FCFF DCF misfire on a bank?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `For a bank, deposits ARE the raw material — 'debt' is the product. FCFF's debt logic collapses; use dividends or residual income instead. (${ref})`,
    steps: ["Analysis: what is 'debt' to a bank?",
      "Solve 1: deposits fund the loan book — they are the raw material.",
      "Solve 2: FCFF treats debt as financing to subtract — wrong frame here.",
      "Solve 3: value the bank on equity cash flows (dividends) or residual income."]
  };
  return {
    q: `Kenapa DCF FCFF standar gagal pada bank?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Bagi bank, deposito ADALAH bahan baku — 'utang' adalah produknya. Logika utang FCFF runtuh; pakai dividen atau residual income. (${ref})`,
    steps: ["Analysis: apa itu 'utang' bagi bank?",
      "Solve 1: deposito mendanai buku pinjaman — ia adalah bahan baku.",
      "Solve 2: FCFF memperlakukan utang sebagai pendanaan untuk dikurangi — frame yang salah di sini.",
      "Solve 3: nilai bank dari arus kas ekuitas (dividen) atau residual income."]
  };
}
function vB2RI(rng, ref, L){
  // guard: (roe, ke) = (20, 10) would make RI == Ke x book (duplicate option)
  const pair = b2pick([[16, 10], [18, 10], [18, 12], [20, 12]], rng);
  const roe = pair[0], ke = pair[1], b0 = b2pick([200, 250, 300], rng);
  const ri = Math.round((roe - ke) / 100 * b0 * 100) / 100;
  const vals = [ri, Math.round(roe / 100 * b0 * 100) / 100, Math.round(ke / 100 * b0 * 100) / 100, Math.round((roe + ke) / 100 * b0 * 100) / 100];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => "Rp" + b2i(v, 1) + " triliun";
  const fe = v => "Rp" + b2e(v, 1) + " trillion";
  if (L === "en") return {
    q: `ROE ${roe}%, cost of equity ${ke}%, opening book Rp${b2e(b0)} trillion. Residual income (one year)?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `RI = (ROE − Ke) × book = (${roe}% − ${ke}%) × ${b2e(b0)} = Rp${b2e(ri, 1)} trillion. (${ref})`,
    steps: ["Analysis: residual income is profit above the cost of equity.",
      `Solve 1: excess return = ROE − Ke = ${roe}% − ${ke}% = ${roe - ke}%.`,
      `Solve 2: apply it to opening book Rp${b2e(b0)} trillion.`,
      `Solve 3: RI = Rp${b2e(ri, 1)} trillion.`]
  };
  return {
    q: `ROE ${roe}%, cost of equity ${ke}%, book awal Rp${b2i(b0)} triliun. Residual income (satu tahun)?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `RI = (ROE − Ke) × book = (${roe}% − ${ke}%) × ${b2i(b0)} = Rp${b2i(ri, 1)} triliun. (${ref})`,
    steps: ["Analysis: residual income adalah laba di atas cost of equity.",
      `Solve 1: excess return = ROE − Ke = ${roe}% − ${ke}% = ${roe - ke}%.`,
      `Solve 2: terapkan pada book awal Rp${b2i(b0)} triliun.`,
      `Solve 3: RI = Rp${b2i(ri, 1)} triliun.`]
  };
}
function vB2JustPBV(rng, ref, L){
  let roe, g, ke, pbv, d1, d2, d3, vals;
  for (let t = 0; t < 50; t++) {
    roe = b2pick([15, 18, 20], rng); g = b2pick([5, 6, 8], rng); ke = b2pick([11, 12, 13], rng);
    pbv = Math.round((roe - g) / (ke - g) * 100) / 100;
    d1 = Math.round((roe - g) / (ke - g + 2) * 100) / 100;
    d2 = Math.round((roe + g) / (ke - g) * 100) / 100;
    d3 = Math.round((roe + 2) / ke * 100) / 100;
    vals = [pbv, d1, d2, d3];
    if (new Set(vals).size === 4) break;
  }
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => b2i(v, 2) + "×";
  const fe = v => b2e(v, 2) + "×";
  if (L === "en") return {
    q: `ROE ${roe}%, g ${g}%, Ke ${ke}%. Justified P/BV?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Justified P/BV = (ROE − g) ÷ (Ke − g) = (${roe} − ${g}) ÷ (${ke} − ${g}) = ${b2e(pbv, 2)}×. (${ref})`,
    steps: ["Analysis: justified P/BV links ROE, growth, and cost of equity.",
      `Solve 1: numerator ROE − g = ${roe} − ${g} = ${roe - g}.`,
      `Solve 2: denominator Ke − g = ${ke} − ${g} = ${ke - g}.`,
      `Solve 3: ${roe - g} ÷ ${ke - g} = ${b2e(pbv, 2)}×.`]
  };
  return {
    q: `ROE ${roe}%, g ${g}%, Ke ${ke}%. P/BV wajar?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `P/BV wajar = (ROE − g) ÷ (Ke − g) = (${roe} − ${g}) ÷ (${ke} − ${g}) = ${b2i(pbv, 2)}×. (${ref})`,
    steps: ["Analysis: P/BV wajar menghubungkan ROE, growth, dan cost of equity.",
      `Solve 1: pembilang ROE − g = ${roe} − ${g} = ${roe - g}.`,
      `Solve 2: penyebut Ke − g = ${ke} − ${g} = ${ke - g}.`,
      `Solve 3: ${roe - g} ÷ ${ke - g} = ${b2i(pbv, 2)}×.`]
  };
}
function vB2NIMTrap(rng, ref, L){
  const c = L === "en"
    ? "6.4% (like-for-like, same method)"
    : "6,4% (like-for-like, metode sama)";
  const o = L === "en" ? [
    "5.8% (old method, lower)", c, "7.4% (add both)", "12.2% (sum of both)"
  ] : [
    "5,8% (metode lama, lebih rendah)", c, "7,4% (jumlahkan keduanya)", "12,2% (jumlah keduanya)"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `NIM is reported 6.4% under the new method and 5.8% under the old method. Which number do you compare across years?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `6.4% like-for-like — same method. Comparing 6.4% (new) with last year's 5.8% (old) fabricates a trend. (${ref})`,
    steps: ["Analysis: a ratio is only comparable under the same definition.",
      "Solve 1: the two numbers use different methods.",
      "Solve 2: restate one year on the other's method — like-for-like.",
      "Solve 3: 6.4% on the new method is the comparable figure."]
  };
  return {
    q: `NIM dilaporkan 6,4% dengan metode baru dan 5,8% dengan metode lama. Angka mana yang dibandingkan antar tahun?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `6,4% like-for-like — metode sama. Membandingkan 6,4% (baru) dengan 5,8% tahun lalu (lama) memfabrikasi tren. (${ref})`,
    steps: ["Analysis: rasio hanya bisa dibandingkan dengan definisi yang sama.",
      "Solve 1: kedua angka memakai metode berbeda.",
      "Solve 2: nyatakan ulang satu tahun dengan metode tahun lain — like-for-like.",
      "Solve 3: 6,4% dengan metode baru adalah angka yang bisa dibandingkan."]
  };
}
function vB2MktPrem(rng, ref, L){
  const c = L === "en"
    ? "It prices in future ROE the book does not yet show"
    : "Ia menghargai ROE masa depan yang belum tercermin di book";
  const o = L === "en" ? [
    "The book value is wrong", c, "The market made an error", "P/BV above 1 is impossible"
  ] : [
    "Book value-nya salah", c, "Pasar membuat kesalahan", "P/BV di atas 1 mustahil"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A bank trades at P/BV 2×. What does the premium mean?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `The market prices in future ROE above the cost of equity — value the book does not yet show. A premium is an expectation, not an error. (${ref})`,
    steps: ["Analysis: P/BV above 1 — what is the market paying for?",
      "Solve 1: book is the past; the price is the future.",
      "Solve 2: a premium prices future ROE above Ke.",
      "Solve 3: judge whether that future ROE is credible — do not call it an error."]
  };
  return {
    q: `Bank diperdagangkan di P/BV 2×. Apa arti premium itu?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Pasar menghargai ROE masa depan di atas cost of equity — nilai yang belum tercermin di book. Premium adalah ekspektasi, bukan kesalahan. (${ref})`,
    steps: ["Analysis: P/BV di atas 1 — pasar membayar untuk apa?",
      "Solve 1: book adalah masa lalu; harga adalah masa depan.",
      "Solve 2: premium menghargai ROE masa depan di atas Ke.",
      "Solve 3: nilai apakah ROE masa depan itu kredibel — jangan sebut kesalahan."]
  };
}
function vB2NIMStress(rng, ref, L){
  const roe = b2pick([18, 20], rng), drop = b2pick([50, 100], rng), ea = b2pick([800, 1000], rng), b0 = b2pick([200, 250], rng);
  const payout = 60, g0 = roe * (1 - payout / 100);
  const roeS = Math.round((roe - drop / 100 * ea / b0) * 100) / 100;
  const gS = Math.round(roeS * (1 - payout / 100) * 100) / 100;
  const ke = 12;
  const pbv = Math.round((roeS - gS) / (ke - gS) * 100) / 100;
  const pbv0 = Math.round((roe - g0) / (ke - g0) * 100) / 100;
  const vals = [pbv, pbv0, Math.round((roeS - gS) / (ke - gS + 2) * 100) / 100, Math.round(roeS / ke * 100) / 100];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => b2i(v, 2) + "×";
  const fe = v => b2e(v, 2) + "×";
  if (L === "en") return {
    q: `ROE ${roe}%, payout ${payout}%, Ke ${ke}%, earning assets Rp${b2e(ea)} trillion, book Rp${b2e(b0)} trillion. NIM falls ${drop} bps. Stressed justified P/BV?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `ROE falls ${b2e(drop / 100 * ea / b0, 2)}pp to ${b2e(roeS, 2)}%; g = ${b2e(roeS, 2)}% × 40% = ${b2e(gS, 2)}%; P/BV = (${b2e(roeS, 2)} − ${b2e(gS, 2)}) ÷ (${ke} − ${b2e(gS, 2)}) = ${b2e(pbv, 2)}× (was ${b2e(pbv0, 2)}×). (${ref})`,
    steps: ["Analysis: NIM drop → ROE drop → g drop → P/BV drop. Chain it.",
      `Solve 1: ROE impact = ${drop} bps × earning assets ÷ book = ${b2e(drop / 100 * ea / b0, 2)}pp → ROE ${b2e(roeS, 2)}%.`,
      `Solve 2: g = ROE × (1 − payout) = ${b2e(roeS, 2)}% × 40% = ${b2e(gS, 2)}%.`,
      `Solve 3: P/BV = (${b2e(roeS, 2)} − ${b2e(gS, 2)}) ÷ (${ke} − ${b2e(gS, 2)}) = ${b2e(pbv, 2)}×.`]
  };
  return {
    q: `ROE ${roe}%, payout ${payout}%, Ke ${ke}%, earning assets Rp${b2i(ea)} triliun, book Rp${b2i(b0)} triliun. NIM turun ${drop} bps. P/BV wajar setelah stress?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `ROE turun ${b2i(drop / 100 * ea / b0, 2)}pp menjadi ${b2i(roeS, 2)}%; g = ${b2i(roeS, 2)}% × 40% = ${b2i(gS, 2)}%; P/BV = (${b2i(roeS, 2)} − ${b2i(gS, 2)}) ÷ (${ke} − ${b2i(gS, 2)}) = ${b2i(pbv, 2)}× (sebelumnya ${b2i(pbv0, 2)}×). (${ref})`,
    steps: ["Analysis: NIM turun → ROE turun → g turun → P/BV turun. Rangkai.",
      `Solve 1: dampak ROE = ${drop} bps × earning assets ÷ book = ${b2i(drop / 100 * ea / b0, 2)}pp → ROE ${b2i(roeS, 2)}%.`,
      `Solve 2: g = ROE × (1 − payout) = ${b2i(roeS, 2)}% × 40% = ${b2i(gS, 2)}%.`,
      `Solve 3: P/BV = (${b2i(roeS, 2)} − ${b2i(gS, 2)}) ÷ (${ke} − ${b2i(gS, 2)}) = ${b2i(pbv, 2)}×.`]
  };
}
function vB2CleanSurplus(rng, ref, L){
  const c = L === "en"
    ? "Book rolls cleanly: B1 = B0 + NI − dividends"
    : "Book menggulung bersih: B1 = B0 + NI − dividen";
  const o = L === "en" ? [
    c, "Dividends are added to book", "NI is ignored in book", "Book never changes"
  ] : [
    c, "Dividen ditambahkan ke book", "NI diabaikan di book", "Book tidak pernah berubah"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Clean surplus means…`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Clean surplus: B1 = B0 + NI − dividends. Every change in book comes through net income or dividends — nothing bypasses the P&L. (${ref})`,
    steps: ["Analysis: clean surplus is a bookkeeping identity.",
      "Solve 1: book grows by net income.",
      "Solve 2: book shrinks by dividends.",
      "Solve 3: B1 = B0 + NI − dividends — nothing else moves book."]
  };
  return {
    q: `Clean surplus berarti…`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Clean surplus: B1 = B0 + NI − dividen. Setiap perubahan book lewat laba bersih atau dividen — tidak ada yang melewati P&L. (${ref})`,
    steps: ["Analysis: clean surplus adalah identitas pembukuan.",
      "Solve 1: book bertambah sebesar laba bersih.",
      "Solve 2: book berkurang sebesar dividen.",
      "Solve 3: B1 = B0 + NI − dividen — tidak ada yang lain menggerakkan book."]
  };
}
/* ---------- real-07: ANTM (mining, SOTP, real options) ---------- */
function vB2SpinOff(rng, ref, L){
  const c = L === "en"
    ? "The spin-off is a separate value leg in the SOTP"
    : "Spin-off adalah kaki nilai terpisah dalam SOTP";
  const o = L === "en" ? [
    "The spin-off is worthless", c, "The spin-off is ignored in SOTP", "The spin-off replaces the mine"
  ] : [
    "Spin-off tidak bernilai", c, "Spin-off diabaikan dalam SOTP", "Spin-off menggantikan tambang"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `ANTM spins off a business unit. In the SOTP, what happens?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `The spin-off becomes its own SOTP leg — valued separately, not folded into the mine. (${ref})`,
    steps: ["Analysis: a spin-off changes the structure, not the total.",
      "Solve 1: the unit leaves the consolidated mine value.",
      "Solve 2: it becomes its own SOTP leg with its own multiple.",
      "Solve 3: total = mine + spin-off leg — value the parts, then add."]
  };
  return {
    q: `ANTM memisahkan (spin-off) satu unit bisnis. Dalam SOTP, apa yang terjadi?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Spin-off menjadi kaki SOTP sendiri — dinilai terpisah, bukan dilipat ke tambang. (${ref})`,
    steps: ["Analysis: spin-off mengubah struktur, bukan totalnya.",
      "Solve 1: unit itu keluar dari nilai tambang konsolidasi.",
      "Solve 2: ia menjadi kaki SOTP sendiri dengan multiple-nya sendiri.",
      "Solve 3: total = tambang + kaki spin-off — nilai bagiannya, lalu jumlahkan."]
  };
}
function vB2Restated(rng, ref, L){
  const c = L === "en"
    ? "Use the restated (comparable) figures, not the old ones"
    : "Pakai angka restated (bisa dibandingkan), bukan yang lama";
  const o = L === "en" ? [
    "Use the old figures as printed", c, "Drop the year entirely", "Average old and restated"
  ] : [
    "Pakai angka lama apa adanya", c, "Buang tahun itu seluruhnya", "Rata-rata angka lama dan restated"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A prior-year figure is restated after a spin-off. Which number goes in the model?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `The restated figure — comparability beats the original print. Using the old number breaks the trend. (${ref})`,
    steps: ["Analysis: comparability vs the original print.",
      "Solve 1: the restatement exists so years compare like-for-like.",
      "Solve 2: the old number belongs to a different structure.",
      "Solve 3: use the restated figure; note the change."]
  };
  return {
    q: `Angka tahun lalu direstate setelah spin-off. Angka mana yang masuk model?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Angka restated — keterbandingan mengalahkan cetakan asli. Memakai angka lama merusak tren. (${ref})`,
    steps: ["Analysis: keterbandingan vs cetakan asli.",
      "Solve 1: restatement ada agar tahun bisa dibandingkan like-for-like.",
      "Solve 2: angka lama milik struktur yang berbeda.",
      "Solve 3: pakai angka restated; catat perubahannya."]
  };
}
function vB2MineLife(rng, ref, L){
  const res = b2pick([100, 120, 150], rng), sales = b2pick([10, 12, 15], rng);
  const life = Math.round(res / sales * 10) / 10;
  const vals = [life, Math.round(res / sales * 10) / 10 * 2, res * sales, Math.round(sales / res * 100) / 10];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => b2i(v, 1) + " tahun";
  const fe = v => b2e(v, 1) + " years";
  if (L === "en") return {
    q: `Reserves ${b2e(res)} million tonnes; annual sales ${b2e(sales)} million tonnes. Mine life?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Mine life = reserves ÷ annual sales = ${b2e(res)} ÷ ${b2e(sales)} = ${b2e(life, 1)} years. (${ref})`,
    steps: ["Analysis: mine life is reserves divided by the annual run-rate.",
      `Solve 1: reserves ${b2e(res)} million tonnes.`,
      `Solve 2: annual sales ${b2e(sales)} million tonnes.`,
      `Solve 3: ${b2e(res)} ÷ ${b2e(sales)} = ${b2e(life, 1)} years.`]
  };
  return {
    q: `Cadangan ${b2i(res)} juta ton; penjualan tahunan ${b2i(sales)} juta ton. Umur tambang?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Umur tambang = cadangan ÷ penjualan tahunan = ${b2i(res)} ÷ ${b2i(sales)} = ${b2i(life, 1)} tahun. (${ref})`,
    steps: ["Analysis: umur tambang adalah cadangan dibagi laju tahunan.",
      `Solve 1: cadangan ${b2i(res)} juta ton.`,
      `Solve 2: penjualan tahunan ${b2i(sales)} juta ton.`,
      `Solve 3: ${b2i(res)} ÷ ${b2i(sales)} = ${b2i(life, 1)} tahun.`]
  };
}
function vB2Reserves(rng, ref, L){
  const c = L === "en"
    ? "Reserves (proven + probable), not resources"
    : "Cadangan (terbukti + terkira), bukan sumber daya";
  const o = L === "en" ? [
    "Total resources (including inferred)", c, "Exploration targets", "Historical production"
  ] : [
    "Total sumber daya (termasuk tereka)", c, "Target eksplorasi", "Produksi historis"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Mine life is computed from…`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Reserves (proven + probable) — economically mineable. Resources include inferred tonnes that may never be mined. (${ref})`,
    steps: ["Analysis: reserves vs resources — which is mineable?",
      "Solve 1: resources = everything geologically there.",
      "Solve 2: reserves = the economically mineable subset (proven + probable).",
      "Solve 3: mine life uses reserves — using resources overstates it."]
  };
  return {
    q: `Umur tambang dihitung dari…`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Cadangan (terbukti + terkira) — yang ekonomis ditambang. Sumber daya mencakup tonase tereka yang mungkin tak pernah ditambang. (${ref})`,
    steps: ["Analysis: cadangan vs sumber daya — mana yang bisa ditambang?",
      "Solve 1: sumber daya = semua yang ada secara geologis.",
      "Solve 2: cadangan = subset yang ekonomis ditambang (terbukti + terkira).",
      "Solve 3: umur tambang memakai cadangan — memakai sumber daya melebih-lebihkannya."]
  };
}
function vB2SOTPEquity(rng, ref, L){
  const a = b2step(rng, 20000, 30000, 5000), b = b2step(rng, 10000, 20000, 5000), c2 = b2step(rng, 5000, 10000, 5000);
  const nc = b2step(rng, 5000, 10000, 5000);
  const eq = a + b + c2 + nc;
  const vals = [eq, a + b + c2, a + b + c2 - nc, eq + nc];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => "Rp" + b2i(v) + " miliar";
  const fe = v => "Rp" + b2e(v) + " billion";
  if (L === "en") return {
    q: `SOTP legs: nickel Rp${b2e(a)}bn, gold Rp${b2e(b)}bn, bauxite Rp${b2e(c2)}bn; net cash Rp${b2e(nc)}bn. Equity value?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Equity = ${b2e(a)} + ${b2e(b)} + ${b2e(c2)} + net cash ${b2e(nc)} = Rp${b2e(eq)} billion. (${ref})`,
    steps: ["Analysis: add the legs, then add net cash (cash is not in the leg values).",
      `Solve 1: legs = ${b2e(a)} + ${b2e(b)} + ${b2e(c2)} = Rp${b2e(a + b + c2)} billion.`,
      `Solve 2: add net cash Rp${b2e(nc)} billion.`,
      `Solve 3: equity = Rp${b2e(eq)} billion.`]
  };
  return {
    q: `Kaki SOTP: nikel Rp${b2i(a)} mld, emas Rp${b2i(b)} mld, bauksit Rp${b2i(c2)} mld; kas bersih Rp${b2i(nc)} mld. Nilai ekuitas?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Ekuitas = ${b2i(a)} + ${b2i(b)} + ${b2i(c2)} + kas bersih ${b2i(nc)} = Rp${b2i(eq)} miliar. (${ref})`,
    steps: ["Analysis: jumlahkan kakinya, lalu tambah kas bersih (kas tidak ada di nilai kaki).",
      `Solve 1: kaki = ${b2i(a)} + ${b2i(b)} + ${b2i(c2)} = Rp${b2i(a + b + c2)} miliar.`,
      `Solve 2: tambah kas bersih Rp${b2i(nc)} miliar.`,
      `Solve 3: ekuitas = Rp${b2i(eq)} miliar.`]
  };
}
function vB2RealOption(rng, ref, L){
  const c = L === "en"
    ? "The option to delay/expand — a DCF misses it"
    : "Opsi menunda/memperluas — DCF melewatkannya";
  const o = L === "en" ? [
    "A fixed dividend stream", c, "The mine's book value", "The spot commodity price"
  ] : [
    "Arus dividen tetap", c, "Nilai buku tambang", "Harga komoditas spot"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A mine can be opened later if prices rise. What does a plain DCF miss?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `The real option — the right (not obligation) to delay or expand. A DCF values a fixed plan; flexibility has value of its own. (${ref})`,
    steps: ["Analysis: what is flexible in a mine plan?",
      "Solve 1: the mine can wait for better prices — that is an option.",
      "Solve 2: a plain DCF assumes a fixed plan and misses the option.",
      "Solve 3: flexibility has value — price it separately (binomial or Black-Scholes)."]
  };
  return {
    q: `Tambang bisa dibuka belakangan jika harga naik. Apa yang dilewatkan DCF biasa?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Real option — hak (bukan kewajiban) untuk menunda atau memperluas. DCF menilai rencana tetap; fleksibilitas punya nilai sendiri. (${ref})`,
    steps: ["Analysis: apa yang fleksibel dalam rencana tambang?",
      "Solve 1: tambang bisa menunggu harga lebih baik — itu sebuah opsi.",
      "Solve 2: DCF biasa mengasumsikan rencana tetap dan melewatkan opsi itu.",
      "Solve 3: fleksibilitas punya nilai — hargai terpisah (binomial atau Black-Scholes)."]
  };
}
function vB2Consol15(rng, ref, L){
  const c = L === "en"
    ? "No — 15% is an investment, not control"
    : "Tidak — 15% adalah investasi, bukan pengendalian";
  const o = L === "en" ? [
    "Yes — any stake consolidates", c, "Yes, if the stake is listed", "Only if it is above 50%"
  ] : [
    "Ya — saham berapa pun dikonsolidasi", c, "Ya, kalau sahamnya listed", "Hanya kalau di atas 50%"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A 15% stake in a joint venture — consolidated line by line?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `No — 15% is an investment (equity method at most), not control. Consolidation needs control, not a big stake. (${ref})`,
    steps: ["Analysis: consolidation needs CONTROL, not a percentage.",
      "Solve 1: 15% does not control the venture.",
      "Solve 2: it is an investment — equity method at most.",
      "Solve 3: line-by-line consolidation would overstate the parent's assets."]
  };
  return {
    q: `Kepemilikan 15% di joint venture — dikonsolidasi baris demi baris?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Tidak — 15% adalah investasi (paling jauh metode ekuitas), bukan pengendalian. Konsolidasi butuh pengendalian, bukan persentase besar. (${ref})`,
    steps: ["Analysis: konsolidasi butuh PENGENDALIAN, bukan persentase.",
      "Solve 1: 15% tidak mengendalikan venture.",
      "Solve 2: ia adalah investasi — paling jauh metode ekuitas.",
      "Solve 3: konsolidasi baris demi baris akan melebih-lebihkan aset induk."]
  };
}
function vB2NetCash(rng, ref, L){
  const c = L === "en"
    ? "Net cash adds to equity value (cash is not in the leg values)"
    : "Kas bersih menambah nilai ekuitas (kas tidak ada di nilai kaki)";
  const o = L === "en" ? [
    "Net cash is ignored", c, "Net cash is subtracted", "Net cash replaces the legs"
  ] : [
    "Kas bersih diabaikan", c, "Kas bersih dikurangkan", "Kas bersih menggantikan kaki"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `In the SOTP bridge, net cash is…`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Net cash ADDS to equity value — the leg values are enterprise values that exclude cash. (${ref})`,
    steps: ["Analysis: what do the leg values include?",
      "Solve 1: each leg is an enterprise value — operating value only.",
      "Solve 2: cash sits outside the operating value.",
      "Solve 3: add net cash to reach equity value."]
  };
  return {
    q: `Dalam bridge SOTP, kas bersih…`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Kas bersih MENAMBAH nilai ekuitas — nilai kaki adalah enterprise value yang tidak mencakup kas. (${ref})`,
    steps: ["Analysis: apa yang tercakup dalam nilai kaki?",
      "Solve 1: tiap kaki adalah enterprise value — hanya nilai operasi.",
      "Solve 2: kas berada di luar nilai operasi.",
      "Solve 3: tambah kas bersih untuk sampai ke nilai ekuitas."]
  };
}
function vB2BinomP(rng, ref, L){
  let u, d, r, p, vals;
  for (let t = 0; t < 50; t++) {
    u = b2pick([1.3, 1.4, 1.5], rng); d = b2pick([0.7, 0.8], rng); r = b2pick([5, 8, 10], rng);
    p = Math.round((1 + r / 100 - d) / (u - d) * 1000) / 1000;
    vals = [p,
      Math.round((u - 1 - r / 100) / (u - d) * 1000) / 1000,
      Math.round((1 + r / 100 - u) / (u - d) * 1000) / 1000,
      Math.round((1 + (r + 5) / 100 - d) / (u - d) * 1000) / 1000];
    // guard: u+d = 2+2r makes p == 0.5 == the old fixed distractor (and == d1)
    if (new Set(vals).size === 4) break;
  }
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => b2i(v, 3);
  const fe = v => b2e(v, 3);
  if (L === "en") return {
    q: `Binomial: u=${b2e(u, 1)}, d=${b2e(d, 1)}, r=${r}%. Risk-neutral probability p?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `p = (1 + r − d) ÷ (u − d) = (1.${r < 10 ? "0" + r : r} − ${b2e(d, 1)}) ÷ (${b2e(u, 1)} − ${b2e(d, 1)}) = ${b2e(p, 3)}. (${ref})`,
    steps: ["Analysis: risk-neutral p makes the expected price grow at r.",
      `Solve 1: numerator 1 + r − d = 1.${r < 10 ? "0" + r : r} − ${b2e(d, 1)} = ${(1 + r / 100 - d).toFixed(2)}.`,
      `Solve 2: denominator u − d = ${b2e(u, 1)} − ${b2e(d, 1)} = ${(u - d).toFixed(1)}.`,
      `Solve 3: p = ${b2e(p, 3)}.`]
  };
  return {
    q: `Binomial: u=${b2i(u, 1)}, d=${b2i(d, 1)}, r=${r}%. Probabilitas risk-neutral p?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `p = (1 + r − d) ÷ (u − d) = (1,${r < 10 ? "0" + r : r} − ${b2i(d, 1)}) ÷ (${b2i(u, 1)} − ${b2i(d, 1)}) = ${b2i(p, 3)}. (${ref})`,
    steps: ["Analysis: p risk-neutral membuat harga harapan tumbuh pada r.",
      `Solve 1: pembilang 1 + r − d = 1,${r < 10 ? "0" + r : r} − ${b2i(d, 1)} = ${(1 + r / 100 - d).toFixed(2).replace(".", ",")}.`,
      `Solve 2: penyebut u − d = ${b2i(u, 1)} − ${b2i(d, 1)} = ${(u - d).toFixed(1).replace(".", ",")}.`,
      `Solve 3: p = ${b2i(p, 3)}.`]
  };
}
function vB2BinomVal(rng, ref, L){
  let u, d, r, p, pay, val, vals;
  for (let t = 0; t < 50; t++) {
    u = b2pick([1.3, 1.4], rng); d = b2pick([0.7, 0.8], rng); r = b2pick([5, 10], rng);
    p = (1 + r / 100 - d) / (u - d);
    pay = b2pick([100, 200], rng);
    val = Math.round(p * pay / (1 + r / 100) * 100) / 100;
    vals = [val, Math.round((1 - p) * pay / (1 + r / 100) * 100) / 100, Math.round(p * pay * 100) / 100, Math.round(pay / (1 + r / 100) * 100) / 100];
    // guard: p = 0.5 (u+d = 2+2r) makes val == the (1-p) distractor after rounding
    if (new Set(vals).size === 4) break;
  }
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => "Rp" + b2i(v, 2);
  const fe = v => "Rp" + b2e(v, 2);
  if (L === "en") return {
    q: `One-step binomial: up payoff Rp${b2e(pay)}, down payoff 0, u=${b2e(u, 1)}, d=${b2e(d, 1)}, r=${r}%. Option value today?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `p = (1 + ${r}% − ${b2e(d, 1)}) ÷ (${b2e(u, 1)} − ${b2e(d, 1)}) = ${b2e(p, 3)}; value = p × ${b2e(pay)} ÷ (1 + ${r}%) = Rp${b2e(val, 2)}. (${ref})`,
    steps: ["Analysis: risk-neutral value = expected payoff (at p) discounted at r.",
      `Solve 1: p = (1 + r − d) ÷ (u − d) = ${b2e(p, 3)}.`,
      `Solve 2: expected payoff = ${b2e(p, 3)} × ${b2e(pay)} = ${b2e(p * pay, 2)}.`,
      `Solve 3: discount at ${r}% → Rp${b2e(val, 2)}.`]
  };
  return {
    q: `Binomial satu langkah: payoff naik Rp${b2i(pay)}, payoff turun 0, u=${b2i(u, 1)}, d=${b2i(d, 1)}, r=${r}%. Nilai opsi hari ini?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `p = (1 + ${r}% − ${b2i(d, 1)}) ÷ (${b2i(u, 1)} − ${b2i(d, 1)}) = ${b2i(p, 3)}; nilai = p × ${b2i(pay)} ÷ (1 + ${r}%) = Rp${b2i(val, 2)}. (${ref})`,
    steps: ["Analysis: nilai risk-neutral = payoff harapan (pada p) didiskon pada r.",
      `Solve 1: p = (1 + r − d) ÷ (u − d) = ${b2i(p, 3)}.`,
      `Solve 2: payoff harapan = ${b2i(p, 3)} × ${b2i(pay)} = ${b2i(p * pay, 2)}.`,
      `Solve 3: diskonto pada ${r}% → Rp${b2i(val, 2)}.`]
  };
}
/* ---------- real-08: GOTO post-merger (one-offs, SOTP) ---------- */
function vB2OneOff(rng, ref, L){
  const c = L === "en"
    ? "Strip it out — it will not repeat"
    : "Keluarkan — ia tidak akan berulang";
  const o = L === "en" ? [
    "Keep it in — it is real profit", c, "Double it — it is a trend", "Move it to revenue"
  ] : [
    "Biarkan — itu laba nyata", c, "Gandakan — itu tren", "Pindah ke revenue"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A one-off gain inflates this year's profit. For a normalised valuation, you…`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Strip it out. Normalised earnings exclude what will not repeat — the multiple belongs on the repeatable base. (${ref})`,
    steps: ["Analysis: what does a multiple belong on?",
      "Solve 1: the repeatable earnings base.",
      "Solve 2: a one-off gain is not repeatable.",
      "Solve 3: strip it out before applying any multiple."]
  };
  return {
    q: `Gain sekali jalan membesarkan laba tahun ini. Untuk valuasi yang dinormalisasi, kamu…`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Keluarkan. Laba yang dinormalisasi mengecualikan yang tidak berulang — multiple milik basis yang bisa diulang. (${ref})`,
    steps: ["Analysis: multiple milik basis apa?",
      "Solve 1: basis laba yang bisa diulang.",
      "Solve 2: gain sekali jalan tidak bisa diulang.",
      "Solve 3: keluarkan sebelum menerapkan multiple apa pun."]
  };
}
function vB2Normalize(rng, ref, L){
  let head, one;
  for (let t = 0; t < 50; t++) {
    head = b2step(rng, -8000, -4000, 1000); one = b2step(rng, -3000, -1000, 500);
    if (head !== 2 * one) break; // guard: headline = 2x one-off would make normalised == one-off
  }
  const norm = head - one;
  const vals = [norm, head + one, head, one];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => "Rp" + b2i(v) + " miliar";
  const fe = v => "Rp" + b2e(v) + " billion";
  if (L === "en") return {
    q: `Headline loss Rp${b2e(head)} billion includes a one-off loss of Rp${b2e(one)} billion. Normalised loss?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Normalised = headline − one-off = ${b2e(head)} − (${b2e(one)}) = Rp${b2e(norm)} billion. (${ref})`,
    steps: ["Analysis: remove the one-off from the headline.",
      `Solve 1: headline loss Rp${b2e(head)} billion.`,
      `Solve 2: one-off loss Rp${b2e(one)} billion (negative).`,
      `Solve 3: ${b2e(head)} − (${b2e(one)}) = Rp${b2e(norm)} billion.`]
  };
  return {
    q: `Rugi headline Rp${b2i(head)} miliar mencakup rugi sekali jalan Rp${b2i(one)} miliar. Rugi yang dinormalisasi?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Normalisasi = headline − sekali jalan = ${b2i(head)} − (${b2i(one)}) = Rp${b2i(norm)} miliar. (${ref})`,
    steps: ["Analysis: keluarkan yang sekali jalan dari headline.",
      `Solve 1: rugi headline Rp${b2i(head)} miliar.`,
      `Solve 2: rugi sekali jalan Rp${b2i(one)} miliar (negatif).`,
      `Solve 3: ${b2i(head)} − (${b2i(one)}) = Rp${b2i(norm)} miliar.`]
  };
}
function vB2ProFormaRev(rng, ref, L){
  const c = L === "en"
    ? "Tokopedia was deconsolidated on 31 Jan 2024"
    : "Tokopedia didekonsolidasi pada 31 Jan 2024";
  const o = L === "en" ? [
    "Tokopedia grew 40% that year", c, "Tokopedia was acquired in 2024", "Tokopedia merged with Gojek in 2024"
  ] : [
    "Tokopedia tumbuh 40% tahun itu", c, "Tokopedia diakuisisi pada 2024", "Tokopedia merger dengan Gojek pada 2024"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Why does GOTO's pro forma revenue exclude Tokopedia from Feb 2024?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Tokopedia was deconsolidated on 31 Jan 2024 — after that date its revenue is not GOTO's revenue. Pro forma must compare like-for-like. (${ref})`,
    steps: ["Analysis: when did Tokopedia leave the consolidation?",
      "Solve 1: 31 Jan 2024 — deconsolidation date.",
      "Solve 2: from Feb 2024 its revenue is not GOTO's.",
      "Solve 3: pro forma excludes it so the trend compares like-for-like."]
  };
  return {
    q: `Kenapa revenue pro forma GOTO mengecualikan Tokopedia sejak Feb 2024?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Tokopedia didekonsolidasi 31 Jan 2024 — setelah tanggal itu revenue-nya bukan revenue GOTO. Pro forma harus membandingkan like-for-like. (${ref})`,
    steps: ["Analysis: kapan Tokopedia keluar dari konsolidasi?",
      "Solve 1: 31 Jan 2024 — tanggal dekonsolidasi.",
      "Solve 2: sejak Feb 2024 revenue-nya bukan revenue GOTO.",
      "Solve 3: pro forma mengecualikannya agar tren membandingkan like-for-like."]
  };
}
function vB2Implied100(rng, ref, L){
  const pct = b2pick([25, 50, 75], rng), paid = b2pick([500, 750, 1000], rng);
  const total = Math.round(paid / (pct / 100));
  const vals = [total, paid, Math.round(paid * pct / 100), Math.round(total * 1.5)];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => "$" + b2i(v) + " juta";
  const fe = v => "$" + b2e(v) + " million";
  if (L === "en") return {
    q: `An investor paid $${b2e(paid)} million for ${pct}% of a unit. Implied total value?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Total = paid ÷ stake = $${b2e(paid)}m ÷ ${pct}% = $${b2e(total)} million. (${ref})`,
    steps: ["Analysis: a stake price implies the whole.",
      `Solve 1: $${b2e(paid)} million bought ${pct}%.`,
      `Solve 2: 100% = paid ÷ ${pct}%.`,
      `Solve 3: $${b2e(total)} million.`]
  };
  return {
    q: `Investor membayar $${b2i(paid)} juta untuk ${pct}% unit. Nilai total yang tersirat?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Total = bayar ÷ porsi = $${b2i(paid)} jt ÷ ${pct}% = $${b2i(total)} juta. (${ref})`,
    steps: ["Analysis: harga porsi menyiratkan keseluruhannya.",
      `Solve 1: $${b2i(paid)} juta membeli ${pct}%.`,
      `Solve 2: 100% = bayar ÷ ${pct}%.`,
      `Solve 3: $${b2i(total)} juta.`]
  };
}
function vB2StakeRp(rng, ref, L){
  const pct = b2pick([20, 25, 30], rng), total = b2pick([2, 3, 4], rng), fx = b2pick([15000, 16000], rng);
  const rp = Math.round(pct / 100 * total * fx / 100) / 10;
  const vals = [rp, Math.round(total * fx / 100) / 10, Math.round(pct / 100 * total * 100) / 100, Math.round(rp * 1.25 * 10) / 10];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => "Rp" + b2i(v, 1) + " triliun";
  const fe = v => "Rp" + b2e(v, 1) + " trillion";
  if (L === "en") return {
    q: `A ${pct}% stake in a unit worth $${b2e(total)} billion; FX Rp${b2e(fx)}/$. Value in rupiah?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Stake = ${pct}% × $${b2e(total)}bn = $${b2e(pct / 100 * total, 2)}bn; × Rp${b2e(fx)} = Rp${b2e(rp, 1)} trillion. (${ref})`,
    steps: ["Analysis: stake first, then convert currency.",
      `Solve 1: stake in dollars = ${pct}% × $${b2e(total)}bn = $${b2e(pct / 100 * total, 2)}bn.`,
      `Solve 2: convert at Rp${b2e(fx)}/$.`,
      `Solve 3: Rp${b2e(rp, 1)} trillion.`]
  };
  return {
    q: `Porsi ${pct}% di unit senilai $${b2i(total)} miliar; kurs Rp${b2i(fx)}/$. Nilainya dalam rupiah?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Porsi = ${pct}% × $${b2i(total)} mld = $${b2i(pct / 100 * total, 2)} mld; × Rp${b2i(fx)} = Rp${b2i(rp, 1)} triliun. (${ref})`,
    steps: ["Analysis: porsi dulu, baru konversi mata uang.",
      `Solve 1: porsi dalam dolar = ${pct}% × $${b2i(total)} mld = $${b2i(pct / 100 * total, 2)} mld.`,
      `Solve 2: konversi pada Rp${b2i(fx)}/$.`,
      `Solve 3: Rp${b2i(rp, 1)} triliun.`]
  };
}
function vB2SOTPPS(rng, ref, L){
  const total = b2step(rng, 80000, 120000, 10000), sh = b2pick([100, 110, 120], rng);
  const ps = Math.round(total / sh);
  const vals = [ps, Math.round(total / sh * 1.2), Math.round(total / (sh + 20)), Math.round(total / sh / 2)];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => "Rp" + b2i(v);
  const fe = v => "Rp" + b2e(v);
  if (L === "en") return {
    q: `SOTP equity Rp${b2e(total)} billion; ${b2e(sh)} billion shares. Value per share?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Per share = ${b2e(total)} ÷ ${b2e(sh)} = Rp${b2e(ps)}. (${ref})`,
    steps: ["Analysis: equity value ÷ shares outstanding.",
      `Solve 1: equity Rp${b2e(total)} billion.`,
      `Solve 2: shares ${b2e(sh)} billion.`,
      `Solve 3: Rp${b2e(ps)} per share.`]
  };
  return {
    q: `Ekuitas SOTP Rp${b2i(total)} miliar; ${b2i(sh)} miliar saham. Nilai per saham?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Per saham = ${b2i(total)} ÷ ${b2i(sh)} = Rp${b2i(ps)}. (${ref})`,
    steps: ["Analysis: nilai ekuitas ÷ saham beredar.",
      `Solve 1: ekuitas Rp${b2i(total)} miliar.`,
      `Solve 2: saham ${b2i(sh)} miliar.`,
      `Solve 3: Rp${b2i(ps)} per saham.`]
  };
}
function vB2NegPE(rng, ref, L){
  const c = L === "en"
    ? "Meaningless — use EV/Sales or normalised earnings"
    : "Tidak bermakna — pakai EV/Sales atau laba yang dinormalisasi";
  const o = L === "en" ? [
    "It means the stock is cheap", c, "It means the stock is expensive", "It is always zero"
  ] : [
    "Artinya saham murah", c, "Artinya saham mahal", "Selalu nol"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A loss-making company shows P/E −8×. What does it mean?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Nothing — a negative P/E is meaningless. Use EV/Sales, or normalise earnings first. (${ref})`,
    steps: ["Analysis: P/E divides price by earnings — what if earnings are negative?",
      "Solve 1: the ratio flips sign — −8× looks 'cheap' but means nothing.",
      "Solve 2: a multiple needs a positive, repeatable base.",
      "Solve 3: use EV/Sales or normalised earnings instead."]
  };
  return {
    q: `Perusahaan merugi menunjukkan P/E −8×. Apa artinya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Tidak ada artinya — P/E negatif tidak bermakna. Pakai EV/Sales, atau normalisasi laba dulu. (${ref})`,
    steps: ["Analysis: P/E membagi harga dengan laba — bagaimana jika labanya negatif?",
      "Solve 1: rasionya berbalik tanda — −8× terlihat 'murah' tapi tidak berarti apa-apa.",
      "Solve 2: multiple butuh basis positif yang bisa diulang.",
      "Solve 3: pakai EV/Sales atau laba yang dinormalisasi."]
  };
}
/* ---------- real-09: WSKT (distress, restructuring) ---------- */
function vB2NegEquity(rng, ref, L){
  const c = L === "en"
    ? "Liabilities exceed assets — equity is negative"
    : "Liabilitas melebihi aset — ekuitas negatif";
  const o = L === "en" ? [
    "Assets exceed liabilities", c, "The company has no debt", "Equity is always positive"
  ] : [
    "Aset melebihi liabilitas", c, "Perusahaan tidak punya utang", "Ekuitas selalu positif"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Negative equity means…`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Liabilities exceed assets. The equity value is not 'zero' — it is negative, and the question becomes who bears the loss. (${ref})`,
    steps: ["Analysis: equity = assets − liabilities.",
      "Solve 1: if liabilities exceed assets, the difference is negative.",
      "Solve 2: that is negative equity.",
      "Solve 3: the value question shifts to the creditors — the waterfall."]
  };
  return {
    q: `Ekuitas negatif berarti…`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Liabilitas melebihi aset. Nilai ekuitas bukan 'nol' — ia negatif, dan pertanyaannya menjadi siapa yang menanggung rugi. (${ref})`,
    steps: ["Analysis: ekuitas = aset − liabilitas.",
      "Solve 1: jika liabilitas melebihi aset, selisihnya negatif.",
      "Solve 2: itulah ekuitas negatif.",
      "Solve 3: pertanyaan nilai bergeser ke kreditor — waterfall."]
  };
}
function vB2Creditor(rng, ref, L){
  const c = L === "en"
    ? "Creditors — shareholders are last in line"
    : "Kreditor — pemegang saham paling akhir";
  const o = L === "en" ? [
    "Shareholders first", c, "Management first", "The government first"
  ] : [
    "Pemegang saham dulu", c, "Manajemen dulu", "Pemerintah dulu"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `In distress, who decides the restructuring?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Creditors — when equity is negative, the economic owners are the creditors. Shareholders are last in line. (${ref})`,
    steps: ["Analysis: who bears the loss when equity is gone?",
      "Solve 1: shareholders are last in the waterfall.",
      "Solve 2: creditors bear the loss — so they decide.",
      "Solve 3: a restructuring is a creditor negotiation, not a shareholder vote."]
  };
  return {
    q: `Dalam distress, siapa yang menentukan restrukturisasi?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Kreditor — saat ekuitas negatif, pemilik ekonomis adalah kreditor. Pemegang saham paling akhir. (${ref})`,
    steps: ["Analysis: siapa yang menanggung rugi saat ekuitas habis?",
      "Solve 1: pemegang saham paling akhir dalam waterfall.",
      "Solve 2: kreditor menanggung rugi — jadi mereka yang menentukan.",
      "Solve 3: restrukturisasi adalah negosiasi kreditor, bukan voting pemegang saham."]
  };
}
function vB2WaterfallOrder(rng, ref, L){
  const c = L === "en"
    ? "Secured → unsecured → subordinated → equity"
    : "Secured → unsecured → subordinasi → ekuitas";
  const o = L === "en" ? [
    "Equity → secured → unsecured", c, "Unsecured → secured → equity", "All creditors share equally"
  ] : [
    "Ekuitas → secured → unsecured", c, "Unsecured → secured → ekuitas", "Semua kreditor berbagi sama rata"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Liquidation waterfall order?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Secured first, then unsecured, then subordinated, equity last. Seniority is the whole game in distress. (${ref})`,
    steps: ["Analysis: who gets paid first when the cash runs out?",
      "Solve 1: secured creditors — they hold collateral.",
      "Solve 2: unsecured, then subordinated.",
      "Solve 3: equity last — usually nothing."]
  };
  return {
    q: `Urutan waterfall likuidasi?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Secured dulu, lalu unsecured, lalu subordinasi, ekuitas terakhir. Senioritas adalah inti permainan dalam distress. (${ref})`,
    steps: ["Analysis: siapa dibayar dulu saat kas habis?",
      "Solve 1: kreditor secured — mereka memegang agunan.",
      "Solve 2: unsecured, lalu subordinasi.",
      "Solve 3: ekuitas terakhir — biasanya tidak ada sisa."]
  };
}
function vB2Frozen(rng, ref, L){
  const c = L === "en"
    ? "Frozen — the distressed valuation is a snapshot, not a forecast"
    : "Beku — valuasi distress adalah snapshot, bukan forecast";
  const o = L === "en" ? [
    "It keeps growing at 10%", c, "It becomes positive automatically", "It is replaced by book value"
  ] : [
    "Terus tumbuh 10%", c, "Otomatis menjadi positif", "Digantikan nilai buku"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `In a distressed valuation, what happens to the going-concern growth assumption?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Frozen. A distressed valuation is a snapshot of recovery value — growth assumptions belong to a going concern that may not survive. (${ref})`,
    steps: ["Analysis: does a distressed company get a growth forecast?",
      "Solve 1: the question is recovery, not growth.",
      "Solve 2: growth assumptions assume survival — not granted here.",
      "Solve 3: freeze the growth; value the recovery."]
  };
  return {
    q: `Dalam valuasi distress, apa yang terjadi pada asumsi growth going-concern?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Beku. Valuasi distress adalah snapshot nilai recovery — asumsi growth milik going concern yang mungkin tidak bertahan. (${ref})`,
    steps: ["Analysis: apakah perusahaan distress mendapat forecast growth?",
      "Solve 1: pertanyaannya adalah recovery, bukan growth.",
      "Solve 2: asumsi growth mengasumsikan kelangsungan hidup — tidak dijamin di sini.",
      "Solve 3: bekukan growth; nilai recovery-nya."]
  };
}
function vB2DIP(rng, ref, L){
  const c = L === "en"
    ? "New money that funds the restructuring (super-priority)"
    : "Dana baru yang mendanai restrukturisasi (super-prioritas)";
  const o = L === "en" ? [
    "A dividend to shareholders", c, "A write-off of old debt", "A new equity issue to the public"
  ] : [
    "Dividen ke pemegang saham", c, "Penghapusan utang lama", "Emisi saham baru ke publik"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `DIP financing is…`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Debtor-in-possession financing: new money that funds the restructuring, with super-priority — it gets repaid before old debt. (${ref})`,
    steps: ["Analysis: who lends to a company in restructuring?",
      "Solve 1: old creditors will not fund it — they are already impaired.",
      "Solve 2: new money comes in as DIP financing.",
      "Solve 3: it carries super-priority — repaid before the old debt."]
  };
  return {
    q: `Pendanaan DIP adalah…`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Debtor-in-possession: dana baru yang mendanai restrukturisasi, dengan super-prioritas — dibayar sebelum utang lama. (${ref})`,
    steps: ["Analysis: siapa yang meminjami perusahaan dalam restrukturisasi?",
      "Solve 1: kreditor lama tidak akan mendanai — mereka sudah impaired.",
      "Solve 2: dana baru masuk sebagai pendanaan DIP.",
      "Solve 3: ia membawa super-prioritas — dibayar sebelum utang lama."]
  };
}
function vB2Holdout(rng, ref, L){
  const c = L === "en"
    ? "A creditor who refuses the deal to extract a better one"
    : "Kreditor yang menolak kesepakatan untuk memeras yang lebih baik";
  const o = L === "en" ? [
    "A creditor who accepts first", c, "A shareholder who votes yes", "A court-appointed trustee"
  ] : [
    "Kreditor yang menerima duluan", c, "Pemegang saham yang setuju", "Kurator yang ditunjuk pengadilan"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `A holdout creditor is…`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `A creditor who refuses the restructuring to extract a better deal — the classic collective-action problem. Majority-binding clauses exist to defeat holdouts. (${ref})`,
    steps: ["Analysis: why would one creditor refuse a deal everyone else accepts?",
      "Solve 1: to extract a better recovery for itself.",
      "Solve 2: if every creditor did that, no deal would ever close.",
      "Solve 3: that is the holdout problem — majority-binding clauses are the answer."]
  };
  return {
    q: `Kreditor holdout adalah…`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Kreditor yang menolak restrukturisasi untuk memeras kesepakatan lebih baik — masalah aksi kolektif klasik. Klausul pengikat mayoritas ada untuk mengalahkan holdout. (${ref})`,
    steps: ["Analysis: kenapa satu kreditor menolak kesepakatan yang diterima semua orang?",
      "Solve 1: untuk memeras recovery lebih baik bagi dirinya.",
      "Solve 2: jika semua kreditor begitu, tidak ada kesepakatan yang pernah tertutup.",
      "Solve 3: itulah masalah holdout — klausul pengikat mayoritas adalah jawabannya."]
  };
}
function vB2Recovery(rng, ref, L){
  let proc, claims;
  for (let t = 0; t < 50; t++) {
    proc = b2step(rng, 20000, 40000, 5000); claims = b2step(rng, 40000, 80000, 10000);
    if (proc < claims) break; // guard: proc == claims would make recovery 100% (== fixed distractor)
  }
  const rec = Math.round(Math.min(proc, claims) / claims * 1000) / 10;
  const vals = [rec, rec + 15, Math.round(claims / proc * 1000) / 10, 100];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => b2i(v, 1) + "%";
  const fe = v => b2e(v, 1) + "%";
  if (L === "en") return {
    q: `Liquidation proceeds Rp${b2e(proc)} billion; unsecured claims Rp${b2e(claims)} billion. Recovery rate?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Recovery = MIN(proceeds, claims) ÷ claims = ${b2e(proc)} ÷ ${b2e(claims)} = ${b2e(rec, 1)}%. (${ref})`,
    steps: ["Analysis: recovery is proceeds divided by claims — capped at 100%.",
      `Solve 1: proceeds Rp${b2e(proc)} billion.`,
      `Solve 2: claims Rp${b2e(claims)} billion.`,
      `Solve 3: ${b2e(proc)} ÷ ${b2e(claims)} = ${b2e(rec, 1)}%.`]
  };
  return {
    q: `Hasil likuidasi Rp${b2i(proc)} miliar; klaim unsecured Rp${b2i(claims)} miliar. Recovery rate?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Recovery = MIN(hasil, klaim) ÷ klaim = ${b2i(proc)} ÷ ${b2i(claims)} = ${b2i(rec, 1)}%. (${ref})`,
    steps: ["Analysis: recovery adalah hasil dibagi klaim — dibatasi 100%.",
      `Solve 1: hasil Rp${b2i(proc)} miliar.`,
      `Solve 2: klaim Rp${b2i(claims)} miliar.`,
      `Solve 3: ${b2i(proc)} ÷ ${b2i(claims)} = ${b2i(rec, 1)}%.`]
  };
}
function vB2Bleeding(rng, ref, L){
  const gp = b2pick([2000, 3000, 4000], rng), intr = gp + b2pick([1000, 2000, 3000], rng);
  const c = L === "en"
    ? `Interest Rp${b2e(intr)}bn exceeds gross profit Rp${b2e(gp)}bn — it bleeds before operating costs`
    : `Bunga Rp${b2i(intr)} mld melebihi laba kotor Rp${b2i(gp)} mld — berdarah sebelum biaya operasi`;
  const o = L === "en" ? [
    c, `Gross profit covers interest ${b2e(intr / gp, 1)}×`, "Interest is irrelevant", "Gross profit is negative"
  ] : [
    c, `Laba kotor menutup bunga ${b2i(intr / gp, 1)}×`, "Bunga tidak relevan", "Laba kotor negatif"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Gross profit Rp${b2e(gp)} billion; interest expense Rp${b2e(intr)} billion. What does it tell you?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Interest exceeds gross profit — the company bleeds before operating costs. No cost-cutting below the gross-profit line can fix this; the capital structure must change. (${ref})`,
    steps: ["Analysis: compare interest with gross profit — before operating costs.",
      `Solve 1: gross profit Rp${b2e(gp)} billion.`,
      `Solve 2: interest Rp${b2e(intr)} billion — larger.`,
      "Solve 3: the bleed starts above the operating line — only a capital-structure fix helps."]
  };
  return {
    q: `Laba kotor Rp${b2i(gp)} miliar; beban bunga Rp${b2i(intr)} miliar. Apa artinya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `Bunga melebihi laba kotor — perusahaan berdarah sebelum biaya operasi. Tidak ada pemotongan biaya di bawah garis laba kotor yang bisa memperbaiki ini; struktur modal harus berubah. (${ref})`,
    steps: ["Analysis: bandingkan bunga dengan laba kotor — sebelum biaya operasi.",
      `Solve 1: laba kotor Rp${b2i(gp)} miliar.`,
      `Solve 2: bunga Rp${b2i(intr)} miliar — lebih besar.`,
      "Solve 3: pendarahan dimulai di atas garis operasi — hanya perbaikan struktur modal yang membantu."]
  };
}
function vB2Haircut(rng, ref, L){
  const eq = b2step(rng, 10000, 20000, 5000), tranche = b2step(rng, 20000, 40000, 10000), hc = b2pick([30, 40, 50], rng);
  const val = Math.round((eq + tranche * hc / 100) / 100) * 100;
  const vals = [val, eq + tranche, eq, Math.round((eq + tranche * (100 - hc - 10) / 100) / 100) * 100];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => "Rp" + b2i(v) + " miliar";
  const fe = v => "Rp" + b2e(v) + " billion";
  if (L === "en") return {
    q: `Restructuring: equity value Rp${b2e(eq)} billion plus a Rp${b2e(tranche)} billion tranche at a ${hc}% haircut. Total recovery value?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Tranche recovery = ${hc}% × ${b2e(tranche)} = Rp${b2e(tranche * hc / 100)} billion; total = ${b2e(eq)} + ${b2e(tranche * hc / 100)} = Rp${b2e(val)} billion. (${ref})`,
    steps: ["Analysis: a haircut reduces the tranche's value — it does not erase it.",
      `Solve 1: tranche recovery = ${hc}% × Rp${b2e(tranche)} billion = Rp${b2e(tranche * hc / 100)} billion.`,
      `Solve 2: add the equity value Rp${b2e(eq)} billion.`,
      `Solve 3: total = Rp${b2e(val)} billion.`]
  };
  return {
    q: `Restrukturisasi: nilai ekuitas Rp${b2i(eq)} miliar ditambah tranche Rp${b2i(tranche)} miliar dengan haircut ${hc}%. Total nilai recovery?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Recovery tranche = ${hc}% × ${b2i(tranche)} = Rp${b2i(tranche * hc / 100)} miliar; total = ${b2i(eq)} + ${b2i(tranche * hc / 100)} = Rp${b2i(val)} miliar. (${ref})`,
    steps: ["Analysis: haircut mengurangi nilai tranche — bukan menghapusnya.",
      `Solve 1: recovery tranche = ${hc}% × Rp${b2i(tranche)} miliar = Rp${b2i(tranche * hc / 100)} miliar.`,
      `Solve 2: tambah nilai ekuitas Rp${b2i(eq)} miliar.`,
      `Solve 3: total = Rp${b2i(val)} miliar.`]
  };
}
function vB2PKPU(rng, ref, L){
  const hold = b2pick([10, 15, 20, 25], rng);
  const c = L === "en"
    ? "In-court (PKPU) — the qualifying majority binds the minority"
    : "In-court (PKPU) — mayoritas kualifikasi mengikat minoritas";
  const o = L === "en" ? [
    c, "Stay out-of-court forever", "Liquidate immediately without process", "Ask the holdout to leave for free"
  ] : [
    c, "Tetap out-of-court selamanya", "Likuidasi langsung tanpa proses", "Minta holdout keluar gratis"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Creditors are fragmented and one holdout (${hold}%) blocks the voluntary deal. The credible route?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `In-court (PKPU): a qualifying majority binds the minority (cram-down). Out-of-court fails when a single holdout can veto. (${ref})`,
    steps: ["Analysis: what stops the voluntary deal?",
      `Solve 1: one holdout (${hold}%) can veto — the deal needs unanimity out of court.`,
      "Solve 2: in-court, a qualifying majority binds the minority.",
      "Solve 3: PKPU is the credible route — the holdout cannot block a court-approved plan."]
  };
  return {
    q: `Kreditur terfragmentasi + satu holdout (${hold}%) memblokir kesepakatan sukarela. Jalur yang kredibel?`,
    opts: order.map(i => o[i]), answer: order.indexOf(0),
    explain: `In-court (PKPU): mayoritas kualifikasi mengikat minoritas (cram-down). Out-of-court gagal bila satu holdout bisa memveto. (${ref})`,
    steps: ["Analysis: apa yang menghentikan kesepakatan sukarela?",
      `Solve 1: satu holdout (${hold}%) bisa memveto — kesepakatan di luar pengadilan butuh suara bulat.`,
      "Solve 2: di pengadilan, mayoritas kualifikasi mengikat minoritas.",
      "Solve 3: PKPU adalah jalur kredibel — holdout tidak bisa memblokir rencana yang disetujui pengadilan."]
  };
}
/* ---------- real-10: project finance (toll road) ---------- */
function vB2DSCR(rng, ref, L){
  let cfads, ds, dscr, vals;
  for (let t = 0; t < 50; t++) {
    cfads = b2step(rng, 300, 600, 50); ds = b2step(rng, 200, 350, 50);
    dscr = Math.round(cfads / ds * 100) / 100;
    vals = [dscr, Math.round(ds / cfads * 100) / 100, Math.round((cfads - ds) / ds * 100) / 100, 1.25];
    if (new Set(vals).size === 4) break;
  }
  const verdict = dscr >= 1.25 ? (L === "en" ? "bankable" : "bankable") : (L === "en" ? "below the 1.25× bankable line" : "di bawah garis bankable 1,25×");
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => b2i(v, 2) + "×";
  const fe = v => b2e(v, 2) + "×";
  if (L === "en") return {
    q: `CFADS Rp${b2e(cfads)} billion; debt service Rp${b2e(ds)} billion. DSCR?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `DSCR = ${b2e(cfads)} ÷ ${b2e(ds)} = ${b2e(dscr, 2)}× — ${verdict}. (${ref})`,
    steps: ["Analysis: DSCR is cash available ÷ debt service.",
      `Solve 1: CFADS Rp${b2e(cfads)} billion.`,
      `Solve 2: debt service Rp${b2e(ds)} billion.`,
      `Solve 3: ${b2e(cfads)} ÷ ${b2e(ds)} = ${b2e(dscr, 2)}× (${verdict}).`]
  };
  return {
    q: `CFADS Rp${b2i(cfads)} miliar; debt service Rp${b2i(ds)} miliar. DSCR?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `DSCR = ${b2i(cfads)} ÷ ${b2i(ds)} = ${b2i(dscr, 2)}× — ${verdict}. (${ref})`,
    steps: ["Analysis: DSCR adalah kas tersedia ÷ debt service.",
      `Solve 1: CFADS Rp${b2i(cfads)} miliar.`,
      `Solve 2: debt service Rp${b2i(ds)} miliar.`,
      `Solve 3: ${b2i(cfads)} ÷ ${b2i(ds)} = ${b2i(dscr, 2)}× (${verdict}).`]
  };
}
function vB2WFDist(rng, ref, L){
  let rev, opex, tax, ds, eq, vals;
  for (let t = 0; t < 50; t++) {
    rev = b2step(rng, 800, 1200, 100); opex = b2step(rng, 200, 300, 50); tax = b2step(rng, 50, 100, 25);
    ds = b2step(rng, 300, 400, 50);
    eq = rev - opex - tax - ds;
    vals = [eq, rev - opex, rev - opex - tax, rev - ds];
    if (new Set(vals).size === 4) break;
  }
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => "Rp" + b2i(v) + " miliar";
  const fe = v => "Rp" + b2e(v) + " billion";
  if (L === "en") return {
    q: `Toll revenue Rp${b2e(rev)}bn; opex Rp${b2e(opex)}bn; tax Rp${b2e(tax)}bn; debt service Rp${b2e(ds)}bn. Cash to equity?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Waterfall: ${b2e(rev)} − ${b2e(opex)} − ${b2e(tax)} − ${b2e(ds)} = Rp${b2e(eq)} billion to equity. (${ref})`,
    steps: ["Analysis: the waterfall pays in order — opex, tax, debt, then equity.",
      `Solve 1: after opex: ${b2e(rev)} − ${b2e(opex)} = Rp${b2e(rev - opex)} billion.`,
      `Solve 2: after tax: − Rp${b2e(tax)} billion → Rp${b2e(rev - opex - tax)} billion.`,
      `Solve 3: after debt service: − Rp${b2e(ds)} billion → Rp${b2e(eq)} billion to equity.`]
  };
  return {
    q: `Pendapatan tol Rp${b2i(rev)} mld; opex Rp${b2i(opex)} mld; pajak Rp${b2i(tax)} mld; debt service Rp${b2i(ds)} mld. Kas ke ekuitas?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Waterfall: ${b2i(rev)} − ${b2i(opex)} − ${b2i(tax)} − ${b2i(ds)} = Rp${b2i(eq)} miliar ke ekuitas. (${ref})`,
    steps: ["Analysis: waterfall membayar berurutan — opex, pajak, utang, lalu ekuitas.",
      `Solve 1: setelah opex: ${b2i(rev)} − ${b2i(opex)} = Rp${b2i(rev - opex)} miliar.`,
      `Solve 2: setelah pajak: − Rp${b2i(tax)} miliar → Rp${b2i(rev - opex - tax)} miliar.`,
      `Solve 3: setelah debt service: − Rp${b2i(ds)} miliar → Rp${b2i(eq)} miliar ke ekuitas.`]
  };
}
function vB2Sculpt(rng, ref, L){
  const cfads = b2step(rng, 400, 600, 50), target = b2pick([1.25, 1.3, 1.4], rng), intr = b2step(rng, 100, 150, 25);
  const princ = Math.round((cfads / target - intr) / 5) * 5;
  const vals = [princ, Math.round((cfads - intr) / 5) * 5, Math.round((cfads / target) / 5) * 5, Math.round((cfads / target + intr) / 5) * 5];
  /* Dedupe by construction: (cfads−intr) bisa sama dengan cfads/target
     setelah dibulatkan ke kelipatan 5 — saat CFADS×(1−1/target) ≈ intr
     (mis. 500/1,25/100 → 400 = 400; 550/1,3/125 → 425 = 425). Distractor
     yang bertabrakan digeser +5 sampai berbeda — tetap di grid kelipatan 5. */
  for (let i = 1; i < vals.length; i++) while (vals.indexOf(vals[i]) !== i) vals[i] += 5;
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => "Rp" + b2i(v) + " miliar";
  const fe = v => "Rp" + b2e(v) + " billion";
  if (L === "en") return {
    q: `CFADS Rp${b2e(cfads)}bn; target DSCR ${b2e(target, 2)}×; interest Rp${b2e(intr)}bn. Sculpted principal?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Debt service = CFADS ÷ target = ${b2e(cfads)} ÷ ${b2e(target, 2)} = Rp${b2e(Math.round(cfads / target))}bn; principal = debt service − interest = Rp${b2e(princ)}bn. (${ref})`,
    steps: ["Analysis: sculpting sizes the debt service to the cash flow.",
      `Solve 1: debt service = CFADS ÷ target DSCR = ${b2e(cfads)} ÷ ${b2e(target, 2)} = Rp${b2e(Math.round(cfads / target))}bn.`,
      `Solve 2: debt service = interest + principal.`,
      `Solve 3: principal = Rp${b2e(Math.round(cfads / target))}bn − Rp${b2e(intr)}bn = Rp${b2e(princ)}bn.`]
  };
  return {
    q: `CFADS Rp${b2i(cfads)} mld; target DSCR ${b2i(target, 2)}×; bunga Rp${b2i(intr)} mld. Pokok yang di-sculpt?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Debt service = CFADS ÷ target = ${b2i(cfads)} ÷ ${b2i(target, 2)} = Rp${b2i(Math.round(cfads / target))} mld; pokok = debt service − bunga = Rp${b2i(princ)} mld. (${ref})`,
    steps: ["Analysis: sculpting menyesuaikan debt service dengan arus kas.",
      `Solve 1: debt service = CFADS ÷ target DSCR = ${b2i(cfads)} ÷ ${b2i(target, 2)} = Rp${b2i(Math.round(cfads / target))} mld.`,
      `Solve 2: debt service = bunga + pokok.`,
      `Solve 3: pokok = Rp${b2i(Math.round(cfads / target))} mld − Rp${b2i(intr)} mld = Rp${b2i(princ)} mld.`]
  };
}
function vB2DSCRWatch(rng, ref, L){
  const d = Math.round(b2step(rng, 10, 12, 1) / 10 * 10) / 10;
  const c = L === "en"
    ? "Watch zone (1.0–1.2×) — tight, monitor closely"
    : "Zona pantau (1,0–1,2×) — ketat, pantau dekat";
  const o = L === "en" ? [
    "Comfortably bankable", c, "Default is certain", "No covenant applies"
  ] : [
    "Nyaman bankable", c, "Default sudah pasti", "Tidak ada covenant berlaku"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `DSCR ${b2e(d, 1)}×. Reading?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `DSCR ${b2e(d, 1)}× is in the watch zone (1.0–1.2×): the project pays, but with almost no cushion. Lenders watch it closely. (${ref})`,
    steps: ["Analysis: where does the DSCR sit against the thresholds?",
      "Solve 1: below 1.0× = cannot pay; 1.0–1.2× = watch zone; above 1.25× = bankable.",
      `Solve 2: ${b2e(d, 1)}× is in the watch zone.`,
      "Solve 3: it pays — but with almost no cushion. Monitor closely."]
  };
  return {
    q: `DSCR ${b2i(d, 1)}×. Bacaannya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `DSCR ${b2i(d, 1)}× ada di zona pantau (1,0–1,2×): proyek membayar, tapi hampir tanpa bantalan. Lender memantaunya dekat. (${ref})`,
    steps: ["Analysis: di mana posisi DSCR terhadap ambang?",
      "Solve 1: di bawah 1,0× = tidak bisa bayar; 1,0–1,2× = zona pantau; di atas 1,25× = bankable.",
      `Solve 2: ${b2i(d, 1)}× ada di zona pantau.`,
      "Solve 3: ia membayar — tapi hampir tanpa bantalan. Pantau dekat."]
  };
}
function vB2Tenor(rng, ref, L){
  const c = L === "en"
    ? "Match the tenor to the concession life — not longer"
    : "Sesuaikan tenor dengan umur konsesi — jangan lebih panjang";
  const o = L === "en" ? [
    "As long as possible", c, "As short as possible", "Tenor does not matter"
  ] : [
    "Sepanjang mungkin", c, "Secepat mungkin", "Tenor tidak penting"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `How is the loan tenor chosen for a toll-road project?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Match the tenor to the concession life. Longer than the concession = repaying after the cash stops. (${ref})`,
    steps: ["Analysis: what funds the repayment?",
      "Solve 1: toll cash flows, which stop when the concession ends.",
      "Solve 2: the tenor must fit inside the concession life.",
      "Solve 3: longer than the concession = repaying after the cash stops."]
  };
  return {
    q: `Bagaimana tenor pinjaman dipilih untuk proyek jalan tol?`,
    opts: order.map(i => o[i]), answer: order.indexOf(1),
    explain: `Sesuaikan tenor dengan umur konsesi. Lebih panjang dari konsesi = membayar setelah kas berhenti. (${ref})`,
    steps: ["Analysis: apa yang mendanai pelunasan?",
      "Solve 1: arus kas tol, yang berhenti saat konsesi berakhir.",
      "Solve 2: tenor harus muat di dalam umur konsesi.",
      "Solve 3: lebih panjang dari konsesi = membayar setelah kas berhenti."]
  };
}
/* ---------- real-11: insurance (ASII insurance / underwriting) ---------- */
function vB2Combined(rng, ref, L){
  const written = b2step(rng, 1000, 1500, 100), upr0 = b2step(rng, 300, 500, 100), upr1 = upr0 + b2pick([-100, -50, 50, 100], rng);
  const earned = written - (upr1 - upr0);
  const loss = Math.round(earned * b2pick([55, 60, 65], rng) / 100);
  const exp = Math.round(earned * b2pick([25, 30], rng) / 100);
  const comb = Math.round((loss + exp) / earned * 1000) / 10;
  const vals = [comb, Math.round(loss / earned * 1000) / 10, Math.round((loss + exp) / written * 1000) / 10, 100];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => b2i(v, 1) + "%";
  const fe = v => b2e(v, 1) + "%";
  if (L === "en") return {
    q: `Written premiums Rp${b2e(written)}bn; UPR ${b2e(upr0)}bn → ${b2e(upr1)}bn; claims Rp${b2e(loss)}bn; expenses Rp${b2e(exp)}bn. Combined ratio?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Earned = ${b2e(written)} − (${b2e(upr1)} − ${b2e(upr0)}) = Rp${b2e(earned)}bn; combined = (${b2e(loss)} + ${b2e(exp)}) ÷ ${b2e(earned)} = ${b2e(comb, 1)}%. (${ref})`,
    steps: ["Analysis: combined ratio divides by EARNED premiums, not written.",
      `Solve 1: earned = written − ΔUPR = ${b2e(written)} − ${b2e(upr1 - upr0)} = Rp${b2e(earned)}bn.`,
      `Solve 2: loss + expenses = ${b2e(loss)} + ${b2e(exp)} = Rp${b2e(loss + exp)}bn.`,
      `Solve 3: ${b2e(loss + exp)} ÷ ${b2e(earned)} = ${b2e(comb, 1)}%.`]
  };
  return {
    q: `Premi tertulis Rp${b2i(written)} mld; UPR ${b2i(upr0)} mld → ${b2i(upr1)} mld; klaim Rp${b2i(loss)} mld; beban Rp${b2i(exp)} mld. Combined ratio?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Earned = ${b2i(written)} − (${b2i(upr1)} − ${b2i(upr0)}) = Rp${b2i(earned)} mld; combined = (${b2i(loss)} + ${b2i(exp)}) ÷ ${b2i(earned)} = ${b2i(comb, 1)}%. (${ref})`,
    steps: ["Analysis: combined ratio membagi dengan premi EARNED, bukan tertulis.",
      `Solve 1: earned = tertulis − ΔUPR = ${b2i(written)} − ${b2i(upr1 - upr0)} = Rp${b2i(earned)} mld.`,
      `Solve 2: klaim + beban = ${b2i(loss)} + ${b2i(exp)} = Rp${b2i(loss + exp)} mld.`,
      `Solve 3: ${b2i(loss + exp)} ÷ ${b2i(earned)} = ${b2i(comb, 1)}%.`]
  };
}
function vB2UWProfit(rng, ref, L){
  let earned, claims, exp, uw, vals;
  for (let t = 0; t < 50; t++) {
    earned = b2step(rng, 800, 1200, 100); claims = b2step(rng, 400, 600, 50); exp = b2step(rng, 200, 300, 50);
    uw = earned - claims - exp;
    vals = [uw, earned - claims, earned - exp, claims + exp];
    if (new Set(vals).size === 4) break;
  }
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => "Rp" + b2i(v) + " miliar";
  const fe = v => "Rp" + b2e(v) + " billion";
  if (L === "en") return {
    q: `Earned premiums Rp${b2e(earned)}bn; claims Rp${b2e(claims)}bn; expenses Rp${b2e(exp)}bn. Underwriting profit?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `UW profit = ${b2e(earned)} − ${b2e(claims)} − ${b2e(exp)} = Rp${b2e(uw)}bn. (${ref})`,
    steps: ["Analysis: underwriting profit is what the insurance operation itself earns.",
      `Solve 1: earned premiums Rp${b2e(earned)}bn.`,
      `Solve 2: less claims Rp${b2e(claims)}bn.`,
      `Solve 3: less expenses Rp${b2e(exp)}bn → Rp${b2e(uw)}bn.`]
  };
  return {
    q: `Premi earned Rp${b2i(earned)} mld; klaim Rp${b2i(claims)} mld; beban Rp${b2i(exp)} mld. Laba underwriting?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Laba UW = ${b2i(earned)} − ${b2i(claims)} − ${b2i(exp)} = Rp${b2i(uw)} mld. (${ref})`,
    steps: ["Analysis: laba underwriting adalah yang dihasilkan operasi asuransi itu sendiri.",
      `Solve 1: premi earned Rp${b2i(earned)} mld.`,
      `Solve 2: kurangi klaim Rp${b2i(claims)} mld.`,
      `Solve 3: kurangi beban Rp${b2i(exp)} mld → Rp${b2i(uw)} mld.`]
  };
}
function vB2LIC(rng, ref, L){
  const open = b2step(rng, 500, 800, 100), inc = b2step(rng, 200, 400, 50), paid = b2step(rng, 150, 300, 50);
  const close = open + inc - paid;
  const vals = [close, open + inc, open - paid, open + inc + paid];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => "Rp" + b2i(v) + " miliar";
  const fe = v => "Rp" + b2e(v) + " billion";
  if (L === "en") return {
    q: `Loss reserves opening Rp${b2e(open)}bn; incurred Rp${b2e(inc)}bn; paid Rp${b2e(paid)}bn. Closing reserves?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Closing = ${b2e(open)} + ${b2e(inc)} − ${b2e(paid)} = Rp${b2e(close)}bn. (${ref})`,
    steps: ["Analysis: reserves roll like any balance.",
      `Solve 1: opening Rp${b2e(open)}bn.`,
      `Solve 2: add incurred +Rp${b2e(inc)}bn.`,
      `Solve 3: less paid −Rp${b2e(paid)}bn → Rp${b2e(close)}bn.`]
  };
  return {
    q: `Cadangan kerugian awal Rp${b2i(open)} mld; incurred Rp${b2i(inc)} mld; dibayar Rp${b2i(paid)} mld. Cadangan akhir?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Akhir = ${b2i(open)} + ${b2i(inc)} − ${b2i(paid)} = Rp${b2i(close)} mld. (${ref})`,
    steps: ["Analysis: cadangan menggulung seperti saldo lainnya.",
      `Solve 1: awal Rp${b2i(open)} mld.`,
      `Solve 2: tambah incurred +Rp${b2i(inc)} mld.`,
      `Solve 3: kurangi dibayar −Rp${b2i(paid)} mld → Rp${b2i(close)} mld.`]
  };
}
function vB2RBC(rng, ref, L){
  let cap = b2step(rng, 300, 500, 50);
  const mmbr = b2step(rng, 200, 300, 50);
  let rbc = Math.round(cap / mmbr * 1000) / 10;
  if (rbc === 120 || rbc === 100) { cap += 50; rbc = Math.round(cap / mmbr * 1000) / 10; } // guard: rbc == 120 would duplicate the fixed "minimum" distractor; rbc == 100 would duplicate the inverted distractor
  const vals = [rbc, Math.round(mmbr / cap * 1000) / 10, Math.round(cap / mmbr * 100) * 10, 120];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => b2i(v, 1) + "%";
  const fe = v => b2e(v, 1) + "%";
  if (L === "en") return {
    q: `Admitted capital Rp${b2e(cap)}bn; MMBR Rp${b2e(mmbr)}bn. RBC ratio? (OJK minimum 120%)`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `RBC = ${b2e(cap)} ÷ ${b2e(mmbr)} = ${b2e(rbc, 1)}% — above the 120% OJK minimum. (${ref})`,
    steps: ["Analysis: RBC is capital divided by the minimum requirement.",
      `Solve 1: capital Rp${b2e(cap)}bn.`,
      `Solve 2: MMBR Rp${b2e(mmbr)}bn.`,
      `Solve 3: ${b2e(cap)} ÷ ${b2e(mmbr)} = ${b2e(rbc, 1)}% (minimum 120%).`]
  };
  return {
    q: `Modal diakui Rp${b2i(cap)} mld; MMBR Rp${b2i(mmbr)} mld. Rasio RBC? (minimum OJK 120%)`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `RBC = ${b2i(cap)} ÷ ${b2i(mmbr)} = ${b2i(rbc, 1)}% — di atas minimum OJK 120%. (${ref})`,
    steps: ["Analysis: RBC adalah modal dibagi kebutuhan minimum.",
      `Solve 1: modal Rp${b2i(cap)} mld.`,
      `Solve 2: MMBR Rp${b2i(mmbr)} mld.`,
      `Solve 3: ${b2i(cap)} ÷ ${b2i(mmbr)} = ${b2i(rbc, 1)}% (minimum 120%).`]
  };
}
/* ---------- real-12: SaaS (cohort, LTV/CAC) ---------- */
function vB2Cohort(rng, ref, L){
  const n = b2pick([1000, 2000, 5000], rng), ch = b2pick([3, 5, 8], rng), m = b2pick([6, 12], rng);
  const rem = Math.round(n * Math.pow(1 - ch / 100, m));
  const vals = [rem, Math.round(n * (1 - ch / 100 * m)), Math.round(n * Math.pow(1 - ch / 100, m / 2)), n];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => b2i(v) + " pelanggan";
  const fe = v => b2e(v) + " customers";
  if (L === "en") return {
    q: `Cohort ${b2e(n)} customers; monthly churn ${ch}%. Remaining after ${m} months?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Remaining = ${b2e(n)} × (1 − ${ch}%)^${m} = ${b2e(rem)} customers. Linear churn (${b2e(vals[1])}) ignores compounding. (${ref})`,
    steps: ["Analysis: churn compounds — each month applies to the survivors.",
      `Solve 1: monthly retention = 1 − ${ch}% = ${(1 - ch / 100).toFixed(2)}.`,
      `Solve 2: over ${m} months: ${(1 - ch / 100).toFixed(2)}^${m} = ${Math.pow(1 - ch / 100, m).toFixed(3)}.`,
      `Solve 3: ${b2e(n)} × ${Math.pow(1 - ch / 100, m).toFixed(3)} = ${b2e(rem)} customers.`]
  };
  return {
    q: `Kohor ${b2i(n)} pelanggan; churn bulanan ${ch}%. Sisa setelah ${m} bulan?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Sisa = ${b2i(n)} × (1 − ${ch}%)^${m} = ${b2i(rem)} pelanggan. Churn linear (${b2i(vals[1])}) mengabaikan compounding. (${ref})`,
    steps: ["Analysis: churn berlipat — tiap bulan berlaku atas yang bertahan.",
      `Solve 1: retensi bulanan = 1 − ${ch}% = ${(1 - ch / 100).toFixed(2).replace(".", ",")}.`,
      `Solve 2: selama ${m} bulan: ${(1 - ch / 100).toFixed(2).replace(".", ",")}^${m} = ${Math.pow(1 - ch / 100, m).toFixed(3).replace(".", ",")}.`,
      `Solve 3: ${b2i(n)} × ${Math.pow(1 - ch / 100, m).toFixed(3).replace(".", ",")} = ${b2i(rem)} pelanggan.`]
  };
}
function vB2LTVCAC(rng, ref, L){
  let arpa, mg, ch, cac, ltv, ratio, vals;
  for (let t = 0; t < 50; t++) {
    arpa = b2pick([100, 150, 200], rng); mg = b2pick([60, 70, 80], rng); ch = b2pick([4, 5, 6], rng); cac = b2pick([500, 800, 1000], rng);
    ltv = Math.round(arpa * (mg / 100) / (ch / 100));
    ratio = Math.round(ltv / cac * 100) / 100;
    vals = [ratio, Math.round(ltv / cac * 100) / 100 * 2, Math.round(arpa / cac * 100) / 100, 1];
    if (new Set(vals).size === 4) break; // guard: ratio == 1 would duplicate the fixed "1x" distractor
  }
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => b2i(v, 2) + "×";
  const fe = v => b2e(v, 2) + "×";
  if (L === "en") return {
    q: `ARPA $${b2e(arpa)}/mo; gross margin ${mg}%; monthly churn ${ch}%; CAC $${b2e(cac)}. LTV/CAC?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `LTV = ${b2e(arpa)} × ${mg}% ÷ ${ch}% = $${b2e(ltv)}; LTV/CAC = ${b2e(ltv)} ÷ ${b2e(cac)} = ${b2e(ratio, 2)}×. (${ref})`,
    steps: ["Analysis: LTV is monthly gross profit times expected lifetime.",
      `Solve 1: monthly gross profit = ${b2e(arpa)} × ${mg}% = $${b2e(arpa * mg / 100)}.`,
      `Solve 2: lifetime = 1 ÷ churn = 1 ÷ ${ch}% = ${(100 / ch).toFixed(1)} months.`,
      `Solve 3: LTV $${b2e(ltv)} ÷ CAC $${b2e(cac)} = ${b2e(ratio, 2)}×.`]
  };
  return {
    q: `ARPA $${b2i(arpa)}/bln; margin kotor ${mg}%; churn bulanan ${ch}%; CAC $${b2i(cac)}. LTV/CAC?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `LTV = ${b2i(arpa)} × ${mg}% ÷ ${ch}% = $${b2i(ltv)}; LTV/CAC = ${b2i(ltv)} ÷ ${b2i(cac)} = ${b2i(ratio, 2)}×. (${ref})`,
    steps: ["Analysis: LTV adalah laba kotor bulanan dikali umur harapan.",
      `Solve 1: laba kotor bulanan = ${b2i(arpa)} × ${mg}% = $${b2i(arpa * mg / 100)}.`,
      `Solve 2: umur = 1 ÷ churn = 1 ÷ ${ch}% = ${(100 / ch).toFixed(1).replace(".", ",")} bulan.`,
      `Solve 3: LTV $${b2i(ltv)} ÷ CAC $${b2i(cac)} = ${b2i(ratio, 2)}×.`]
  };
}
function vB2PaybackChurn(rng, ref, L){
  let gp, ch, cac, c, m, cum, simple, lifetime, vals;
  for (let t = 0; t < 50; t++) {
    gp = b2pick([50, 80, 100], rng); ch = b2pick([4, 5, 8], rng); cac = b2pick([300, 400, 500], rng);
    c = ch / 100;
    m = 1; cum = 0;
    while (m <= 60) { cum += gp * Math.pow(1 - c, m - 1); if (cum >= cac) break; m++; }
    simple = Math.ceil(cac / gp);
    lifetime = Math.round(1 / c);
    vals = [m, simple, lifetime, m + 3];
    if (new Set(vals).size === 4) break;
  }
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => "bulan ke-" + v;
  const fe = v => "month " + v;
  if (L === "en") return {
    q: `Monthly gross profit $${b2e(gp)}; monthly churn ${ch}%; CAC $${b2e(cac)}. In which month is CAC paid back (churn-adjusted)?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `Cumulative churn-adjusted GP reaches $${b2e(cac)} in month ${m}. Simple payback (${simple} months) ignores churn; lifetime (1/churn = ${lifetime} months) is not payback. (${ref})`,
    steps: ["Analysis: each month's profit only counts if the customer is still there.",
      `Solve 1: month-1 profit $${b2e(gp)}; month-2 profit $${b2e(gp)} × ${(1 - c).toFixed(2)} — and so on.`,
      "Solve 2: add the churn-adjusted profits month by month.",
      `Solve 3: the running total reaches $${b2e(cac)} in month ${m}.`]
  };
  return {
    q: `Laba kotor bulanan $${b2i(gp)}; churn bulanan ${ch}%; CAC $${b2i(cac)}. Bulan ke berapa CAC terbayar (disesuaikan churn)?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `GP kumulatif yang disesuaikan churn mencapai $${b2i(cac)} di bulan ke-${m}. Payback sederhana (${simple} bulan) mengabaikan churn; lifetime (1/churn = ${lifetime} bulan) bukan payback. (${ref})`,
    steps: ["Analysis: laba tiap bulan hanya dihitung jika pelanggan masih ada.",
      `Solve 1: laba bulan-1 $${b2i(gp)}; laba bulan-2 $${b2i(gp)} × ${(1 - c).toFixed(2).replace(".", ",")} — dan seterusnya.`,
      "Solve 2: jumlahkan laba yang disesuaikan churn bulan demi bulan.",
      `Solve 3: total berjalan mencapai $${b2i(cac)} di bulan ke-${m}.`]
  };
}
function vB2NRR(rng, ref, L){
  let arr, churn, exp;
  for (let t = 0; t < 50; t++) {
    arr = b2pick([1000, 1200, 1500], rng); churn = b2pick([100, 120, 150], rng); exp = b2pick([150, 200, 250], rng);
    if (exp !== churn) break; // guard: expansion == churn would make NRR == 100% (fixed distractor)
  }
  const nrr = Math.round((arr - churn + exp) / arr * 1000) / 10;
  const vals = [nrr, Math.round((arr - churn) / arr * 1000) / 10, Math.round((arr + exp) / arr * 1000) / 10, 100];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => b2i(v, 1) + "%";
  const fe = v => b2e(v, 1) + "%";
  if (L === "en") return {
    q: `Starting ARR $${b2e(arr)}k; churned $${b2e(churn)}k; expansion $${b2e(exp)}k. Net revenue retention?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `NRR = (starting ARR − churn + expansion) ÷ starting ARR = (${b2e(arr)} − ${b2e(churn)} + ${b2e(exp)}) ÷ ${b2e(arr)} = ${b2e(nrr, 1)}%. (${ref})`,
    steps: ["Analysis: NRR tracks the same cohort — churn out, expansion in.",
      `Solve 1: retained = ${b2e(arr)} − ${b2e(churn)} + ${b2e(exp)} = $${b2e(arr - churn + exp)}k.`,
      `Solve 2: divide by starting ARR $${b2e(arr)}k.`,
      `Solve 3: NRR = ${b2e(nrr, 1)}%.`]
  };
  return {
    q: `ARR awal $${b2i(arr)}rb; churn $${b2i(churn)}rb; ekspansi $${b2i(exp)}rb. Net revenue retention?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `NRR = (ARR awal − churn + ekspansi) ÷ ARR awal = (${b2i(arr)} − ${b2i(churn)} + ${b2i(exp)}) ÷ ${b2i(arr)} = ${b2i(nrr, 1)}%. (${ref})`,
    steps: ["Analysis: NRR melacak kohor yang sama — churn keluar, ekspansi masuk.",
      `Solve 1: tertahan = ${b2i(arr)} − ${b2i(churn)} + ${b2i(exp)} = $${b2i(arr - churn + exp)}rb.`,
      `Solve 2: bagi dengan ARR awal $${b2i(arr)}rb.`,
      `Solve 3: NRR = ${b2i(nrr, 1)}%.`]
  };
}
function vB2EVARR(rng, ref, L){
  const arr = b2pick([50, 80, 100], rng), mult = b2pick([6, 8, 10], rng);
  const ev = arr * mult;
  const vals = [ev, arr * (mult + 2), arr * mult / 2, arr + mult];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => "$" + b2i(v) + " juta";
  const fe = v => "$" + b2e(v) + " million";
  if (L === "en") return {
    q: `ARR $${b2e(arr)} million; SaaS multiple ${mult}×. Enterprise value?`,
    opts: order.map(i => fe(vals[i])),
    answer: order.indexOf(0),
    explain: `EV = ARR × multiple = $${b2e(arr)}m × ${mult} = $${b2e(ev)} million. (${ref})`,
    steps: ["Analysis: SaaS EV is ARR times the revenue multiple.",
      `Solve 1: ARR $${b2e(arr)} million.`,
      `Solve 2: multiple ${mult}×.`,
      `Solve 3: EV = $${b2e(ev)} million.`]
  };
  return {
    q: `ARR $${b2i(arr)} juta; multiple SaaS ${mult}×. Enterprise value?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `EV = ARR × multiple = $${b2i(arr)} jt × ${mult} = $${b2i(ev)} juta. (${ref})`,
    steps: ["Analysis: EV SaaS adalah ARR dikali multiple revenue.",
      `Solve 1: ARR $${b2i(arr)} juta.`,
      `Solve 2: multiple ${mult}×.`,
      `Solve 3: EV = $${b2i(ev)} juta.`]
  };
}

/* ---------- excel-l3:0 dedicated: SEQUENCE cell value ---------- */
function vB2SeqCell(rng, ref, L){
  const n = b2pick([10, 12, 15], rng), row = b2pick([5, 7], rng);
  const vals = [row, row + 1, n, 1];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  const f = v => L === "en" ? String(v) : String(v);
  if (L === "en") return {
    q: `=SEQUENCE(${n}) in A1 (spills down A1:A${n}). Value in A${row}?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `SEQUENCE(${n}) fills 1, 2, 3… down the column — A${row} holds ${row}. (${ref})`,
    steps: ["Analysis: SEQUENCE(n) spills 1…n down the column.",
      `Solve 1: A1 = 1, A2 = 2, …`,
      `Solve 2: the value in row ${row} is ${row}.`,
      `Solve 3: A${row} = ${row} (not ${n} — that is the last row, A${n}).`]
  };
  return {
    q: `=SEQUENCE(${n}) di A1 (menumpah ke bawah A1:A${n}). Nilai di A${row}?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `SEQUENCE(${n}) mengisi 1, 2, 3… ke bawah kolom — A${row} berisi ${row}. (${ref})`,
    steps: ["Analysis: SEQUENCE(n) menumpah 1…n ke bawah kolom.",
      "Solve 1: A1 = 1, A2 = 2, …",
      `Solve 2: nilai di baris ${row} adalah ${row}.`,
      `Solve 3: A${row} = ${row} (bukan ${n} — itu baris terakhir, A${n}).`]
  };
}
/* ---------- hari-21:17: Trace Precedents (audit visual) ---------- */
function vB2Precedents(rng, ref, L){
  const cell = b2pick(["Utang akhir Y3", "Kas akhir Y2", "EBITDA Y4"], rng);
  const src = b2pick(["Utang awal Y3", "Saldo awal", "EBITDA tahun berjalan"], rng);
  const c = L === "en"
    ? "Visual audit: confirm the formula links the right cells; a missing/odd arrow = a broken link"
    : "Audit visual: pastikan rumus me-link sel yang benar; panah hilang/aneh = link putus";
  const o = L === "en" ? [
    "Speed up calculation", "Lock the cell", "Decoration", c
  ] : [
    "Mempercepat kalkulasi", "Mengunci sel", "Hiasan", c
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `Trace Precedents on '${cell}' draws arrows from '${src}' and other inputs. What is it for?`,
    opts: order.map(i => o[i]), answer: order.indexOf(3),
    explain: `Visual audit: the arrows show what the formula really uses. A jumping arrow exposes a wrong reference instantly — audit is half reading arrows, not formulas. (${ref})`,
    steps: ["Analysis: what does Trace Precedents show?",
      "Solve 1: arrows from every cell the formula uses.",
      "Solve 2: a wrong link (e.g. pointing at the wrong year) jumps out visually.",
      "Solve 3: audit = check the arrows first, the formula second."]
  };
  return {
    q: `Trace Precedents pada '${cell}' menampilkan panah dari '${src}' dan input lain. Gunanya?`,
    opts: order.map(i => o[i]), answer: order.indexOf(3),
    explain: `Audit visual: panah menunjukkan apa yang sebenarnya dipakai rumus. Panah yang melompat langsung mengungkap referensi salah — audit itu setengah membaca panah, bukan rumus. (${ref})`,
    steps: ["Analysis: apa yang ditampilkan Trace Precedents?",
      "Solve 1: panah dari tiap sel yang dipakai rumus.",
      "Solve 2: link salah (mis. menunjuk tahun yang keliru) langsung terlihat.",
      "Solve 3: audit = cek panahnya dulu, rumusnya kemudian."]
  };
}
/* ---------- hari-28:7: which statement is WRONG (linkage) ---------- */
function vB2WrongStmt(rng, ref, L){
  const ni = b2step(rng, 6000, 12000, 1000), da = b2step(rng, 1500, 3000, 500), dwc = b2step(rng, 500, 2000, 500);
  const capex = b2step(rng, 2000, 4000, 500), div = b2step(rng, 1000, 3000, 500), open = b2step(rng, 2000, 4000, 1000);
  const cfo = ni + da - dwc, wrongCfo = ni + da + dwc, end = open + cfo - capex - div;
  const f = v => L === "en" ? "Rp" + b2e(v) : "Rp" + b2i(v);
  const o = [
    L === "en" ? `CFO = ${f(cfo)}` : `CFO = ${f(cfo)}`,
    L === "en" ? `Ending cash = ${f(end)}` : `Kas akhir = ${f(end)}`,
    L === "en" ? `CFO = ${f(wrongCfo)}` : `CFO = ${f(wrongCfo)}`,
    L === "en" ? "Dividends in CFF" : "Dividen di CFF"
  ];
  const order = b2Shuffle([0, 1, 2, 3], rng);
  if (L === "en") return {
    q: `NI ${f(ni)}, D&A ${f(da)}, WC up ${f(dwc)}, capex ${f(capex)}, dividends ${f(div)}, opening cash ${f(open)} (thousands). Which statement is FALSE?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `"CFO = ${f(wrongCfo)}" is FALSE: CFO = ${f(ni)} + ${f(da)} − ${f(dwc)} = ${f(cfo)} (ΔWC up = subtract). Ending cash = ${f(open)} + ${f(cfo)} − ${f(capex)} − ${f(div)} = ${f(end)}. (${ref})`,
    steps: ["Analysis: compute CFO and ending cash, then test each statement.",
      `Solve 1: CFO = NI + D&A − ΔWC = ${f(ni)} + ${f(da)} − ${f(dwc)} = ${f(cfo)}.`,
      `Solve 2: ending cash = ${f(open)} + ${f(cfo)} − ${f(capex)} − ${f(div)} = ${f(end)}.`,
      `Solve 3: "CFO = ${f(wrongCfo)}" adds ΔWC instead of subtracting — FALSE. The other three are true.`]
  };
  return {
    q: `NI ${f(ni)}, D&A ${f(da)}, WC naik ${f(dwc)}, capex ${f(capex)}, dividen ${f(div)}, kas awal ${f(open)} (ribu). Pernyataan yang SALAH?`,
    opts: order.map(i => o[i]), answer: order.indexOf(2),
    explain: `"CFO = ${f(wrongCfo)}" SALAH: CFO = ${f(ni)} + ${f(da)} − ${f(dwc)} = ${f(cfo)} (ΔWC naik = kurangi). Kas akhir = ${f(open)} + ${f(cfo)} − ${f(capex)} − ${f(div)} = ${f(end)}. (${ref})`,
    steps: ["Analysis: hitung CFO dan kas akhir, lalu uji tiap pernyataan.",
      `Solve 1: CFO = NI + D&A − ΔWC = ${f(ni)} + ${f(da)} − ${f(dwc)} = ${f(cfo)}.`,
      `Solve 2: kas akhir = ${f(open)} + ${f(cfo)} − ${f(capex)} − ${f(div)} = ${f(end)}.`,
      `Solve 3: "CFO = ${f(wrongCfo)}" menambah ΔWC bukannya mengurangkan — SALAH. Tiga lainnya benar.`]
  };
}

/* ================================================================
   REGISTRIES
   ID: VARIANT_FNS_B2 — Indonesian variants (338 keys)
   EN: VARIANT_FNS_EN_B2 — English variants, same numbers (338 keys)
   Shape per key (identical to concept-graph.js): {diff, gen}
   gen receives rng (Math.random in app.js) and returns
   {q, opts[4], answer, explain, steps[]}.
   ================================================================ */
const VARIANT_FNS_B2 = {
/* ---- hari-16 (8) ---- */
"hari-16:0": {diff: "Easy", gen: (rng) => vB2EPS(rng, "Hari 16 §1")},
"hari-16:1": {diff: "Easy", gen: (rng) => vB2Goodwill(rng, "Hari 16 §2")},
"hari-16:2": {diff: "Medium", gen: (rng) => vB2ProFormaNI(rng, "Hari 16 §3")},
"hari-16:3": {diff: "Medium", gen: (rng) => vB2Accretion(rng, "Hari 16 §4")},
"hari-16:4": {diff: "Medium", gen: (rng) => vB2Dilution(rng, "Hari 16 §5")},
"hari-16:5": {diff: "Medium", gen: (rng) => vB2GoodwillPPA(rng, "Hari 16 §6")},
"hari-16:6": {diff: "Medium", gen: (rng) => vB2DivBuyback(rng, "Hari 16 §7")},
"hari-16:7": {diff: "Easy", gen: (rng) => vB2DivSignal(rng, "Hari 16 §8")},
/* ---- hari-17 (8) ---- */
"hari-17:0": {diff: "Medium", gen: (rng) => vB2EquityNeeded(rng, "Hari 17 §1")},
"hari-17:1": {diff: "Easy", gen: (rng) => vB2Interest(rng, "Hari 17 §2")},
"hari-17:2": {diff: "Medium", gen: (rng) => vB2CashToDebt(rng, "Hari 17 §3")},
"hari-17:3": {diff: "Medium", gen: (rng) => vB2DebtFloor(rng, "Hari 17 §4")},
"hari-17:4": {diff: "Medium", gen: (rng) => vB2MoIC(rng, "Hari 17 §5")},
"hari-17:5": {diff: "Medium", gen: (rng) => vB2PIK(rng, "Hari 17 §6")},
"hari-17:6": {diff: "Medium", gen: (rng) => vB2Covenant(rng, "Hari 17 §7")},
"hari-17:7": {diff: "Medium", gen: (rng) => vB2Sweep(rng, "Hari 17 §8")},
/* ---- hari-18 (11) ---- */
"hari-18:0": {diff: "Easy", gen: (rng) => vB2Seasonal(rng, "Hari 18 §1")},
"hari-18:1": {diff: "Easy", gen: (rng) => vB2VarSign(rng, "Hari 18 §2")},
"hari-18:2": {diff: "Medium", gen: (rng) => vB2PriceVar(rng, "Hari 18 §3")},
"hari-18:3": {diff: "Medium", gen: (rng) => vB2FlexRole(rng, "Hari 18 §4")},
"hari-18:4": {diff: "Easy", gen: (rng) => vB2NPVRule(rng, "Hari 18 §5")},
"hari-18:5": {diff: "Hard", gen: (rng) => vB2NPVPI(rng, "Hari 18 §6")},
"hari-18:6": {diff: "Medium", gen: (rng) => vB2Payback(rng, "Hari 18 §7")},
"hari-18:7": {diff: "Hard", gen: (rng) => vB2NPVIRR(rng, "Hari 18 §8")},
"hari-18:8": {diff: "Hard", gen: (rng) => vB2MultIRR(rng, "Hari 18 §9")},
"hari-18:9": {diff: "Medium", gen: (rng) => vB2MAEMAPE(rng, "Hari 18 §10")},
"hari-18:10": {diff: "Hard", gen: (rng) => vB2MixVar(rng, "Hari 18 §11")},
/* ---- hari-19 (5) ---- */
"hari-19:0": {diff: "Medium", gen: (rng) => vB2IMTable(rng, "Hari 19 §1")},
"hari-19:1": {diff: "Medium", gen: (rng) => vB2SumifsTable(rng, "Hari 19 §2")},
"hari-19:2": {diff: "Easy", gen: (rng) => vB2MatchTrap(rng, "Hari 19 §3")},
"hari-19:3": {diff: "Medium", gen: (rng) => vB2XLookupSafe(rng, "Hari 19 §4")},
"hari-19:4": {diff: "Easy", gen: (rng) => vB2IfErrorUse(rng, "Hari 19 §5")},
/* ---- hari-20 (6) ---- */
"hari-20:0": {diff: "Medium", gen: (rng) => vB2LeasePV(rng, "Hari 20 §1")},
"hari-20:1": {diff: "Medium", gen: (rng) => vB2LeaseExp(rng, "Hari 20 §2")},
"hari-20:2": {diff: "Easy", gen: (rng) => vB2DTL(rng, "Hari 20 §3")},
"hari-20:3": {diff: "Easy", gen: (rng) => vB2StockComp(rng, "Hari 20 §4")},
"hari-20:4": {diff: "Easy", gen: (rng) => vB2NOLSave(rng, "Hari 20 §5")},
"hari-20:5": {diff: "Medium", gen: (rng) => vB2TSM(rng, "Hari 20 §6")},
/* ---- hari-21 (20) ---- */
"hari-21:0": {diff: "Medium", gen: (rng) => vB2DataTable(rng, "Hari 21 §1")},
"hari-21:1": {diff: "Medium", gen: (rng) => vB2Tornado(rng, "Hari 21 §2")},
"hari-21:2": {diff: "Medium", gen: (rng) => vB2Range(rng, "Hari 21 §3")},
"hari-21:3": {diff: "Medium", gen: (rng) => vB2MoICGrowth(rng, "Hari 21 §4")},
"hari-21:4": {diff: "Medium", gen: (rng) => vB2PEAccr(rng, "Hari 21 §5")},
"hari-21:5": {diff: "Easy", gen: (rng) => vB2SynZero(rng, "Hari 21 §6")},
"hari-21:6": {diff: "Medium", gen: (rng) => vB2MixDeal(rng, "Hari 21 §7")},
"hari-21:7": {diff: "Hard", gen: (rng) => vB2NOLVal(rng, "Hari 21 §8")},
"hari-21:8": {diff: "Medium", gen: (rng) => vB2SourcesUsesFee(rng, "Hari 21 §9")},
"hari-21:9": {diff: "Medium", gen: (rng) => vB2InterestCirc(rng, "Hari 21 §10")},
"hari-21:10": {diff: "Medium", gen: (rng) => vB2DebtFloor(rng, "Hari 21 §11")},
"hari-21:11": {diff: "Hard", gen: (rng) => vB2MoICClaim(rng, "Hari 21 §12")},
"hari-21:12": {diff: "Medium", gen: (rng) => vB2BudgetForecast(rng, "Hari 21 §13")},
"hari-21:13": {diff: "Medium", gen: (rng) => vB2VarVerdict(rng, "Hari 21 §14")},
"hari-21:14": {diff: "Medium", gen: (rng) => vB2Rolling(rng, "Hari 21 §15")},
"hari-21:15": {diff: "Medium", gen: (rng) => vB2IdxMatch(rng, "Hari 21 §16")},
"hari-21:16": {diff: "Medium", gen: (rng) => vB2AbsRef(rng, "Hari 21 §17")},
"hari-21:17": {diff: "Easy", gen: (rng) => vB2Precedents(rng, "Hari 21 §18")},
"hari-21:18": {diff: "Medium", gen: (rng) => vB2LeaseEBITDA(rng, "Hari 21 §19")},
"hari-21:19": {diff: "Medium", gen: (rng) => vB2DTARecog(rng, "Hari 21 §20")},
/* ---- hari-22 (6) ---- */
"hari-22:0": {diff: "Medium", gen: (rng) => vB2TVDual(rng, "Hari 22 §1")},
"hari-22:1": {diff: "Medium", gen: (rng) => vB2WACCChange(rng, "Hari 22 §2")},
"hari-22:2": {diff: "Easy", gen: (rng) => vB2Hardcode(rng, "Hari 22 §3")},
"hari-22:3": {diff: "Easy", gen: (rng) => vB2RangePresent(rng, "Hari 22 §4")},
"hari-22:4": {diff: "Medium", gen: (rng) => vB2REPT(rng, "Hari 22 §5")},
"hari-22:5": {diff: "Easy", gen: (rng) => vB2KPITree(rng, "Hari 22 §6")},
/* ---- hari-31 (6) ---- */
"hari-31:0": {diff: "Medium", gen: (rng) => vB2IPOProceeds(rng, "Hari 31 §1")},
"hari-31:1": {diff: "Medium", gen: (rng) => vB2IPOEquity(rng, "Hari 31 §2")},
"hari-31:2": {diff: "Medium", gen: (rng) => vB2IPOUnder(rng, "Hari 31 §3")},
"hari-31:3": {diff: "Easy", gen: (rng) => vB2IPOLockup(rng, "Hari 31 §4")},
"hari-31:4": {diff: "Easy", gen: (rng) => vB2IPOBook(rng, "Hari 31 §5")},
"hari-31:5": {diff: "Easy", gen: (rng) => vB2IPOSecondary(rng, "Hari 31 §6")},
/* ---- excel-l1 (5) ---- */
"excel-l1:0": {diff: "Easy", gen: (rng) => vB2SumRange(rng, "Excel L1 §1")},
"excel-l1:1": {diff: "Easy", gen: (rng) => vB2Countif(rng, "Excel L1 §2")},
"excel-l1:2": {diff: "Easy", gen: (rng) => vB2AbsCopy(rng, "Excel L1 §3")},
"excel-l1:3": {diff: "Medium", gen: (rng) => vB2IdxMatch(rng, "Excel L1 §4")},
"excel-l1:4": {diff: "Medium", gen: (rng) => vB2IFS(rng, "Excel L1 §5")},
/* ---- excel-l2 (5) ---- */
"excel-l2:0": {diff: "Easy", gen: (rng) => vB2IMLeft(rng, "Excel L2 §1")},
"excel-l2:1": {diff: "Easy", gen: (rng) => vB2SumifsRead(rng, "Excel L2 §2")},
"excel-l2:2": {diff: "Medium", gen: (rng) => vB2DateValue(rng, "Excel L2 §3")},
"excel-l2:3": {diff: "Easy", gen: (rng) => vB2Validation(rng, "Excel L2 §4")},
"excel-l2:4": {diff: "Easy", gen: (rng) => vB2PivotIFS(rng, "Excel L2 §5")},
/* ---- excel-l3 (7) ---- */
"excel-l3:0": {diff: "Easy", gen: (rng) => vB2SeqCell(rng, "Excel L3 §1")},
"excel-l3:1": {diff: "Easy", gen: (rng) => vB2Spill(rng, "Excel L3 §2")},
"excel-l3:2": {diff: "Medium", gen: (rng) => vB2RowsFilter(rng, "Excel L3 §3")},
"excel-l3:3": {diff: "Medium", gen: (rng) => vB2Sumprod(rng, "Excel L3 §4")},
"excel-l3:4": {diff: "Easy", gen: (rng) => vB2LETUse(rng, "Excel L3 §5")},
"excel-l3:5": {diff: "Hard", gen: (rng) => vB2Solver(rng, "Excel L3 §6")},
"excel-l3:6": {diff: "Easy", gen: (rng) => vB2GoalSolver(rng, "Excel L3 §7")},
/* ---- excel-l4 (8) ---- */
"excel-l4:0": {diff: "Easy", gen: (rng) => vB2NoHardcode(rng, "Excel L4 §1")},
"excel-l4:1": {diff: "Easy", gen: (rng) => vB2IfErrorRight(rng, "Excel L4 §2")},
"excel-l4:2": {diff: "Easy", gen: (rng) => vB2Circular(rng, "Excel L4 §3")},
"excel-l4:3": {diff: "Easy", gen: (rng) => vB2Dependents(rng, "Excel L4 §4")},
"excel-l4:4": {diff: "Medium", gen: (rng) => vB2Volatile(rng, "Excel L4 §5")},
"excel-l4:5": {diff: "Easy", gen: (rng) => vB2Colors(rng, "Excel L4 §6")},
"excel-l4:6": {diff: "Easy", gen: (rng) => vB2Changelog(rng, "Excel L4 §7")},
"excel-l4:7": {diff: "Hard", gen: (rng) => vB2TrialBal(rng, "Excel L4 §8")},
/* ---- excel-l5 (11) ---- */
"excel-l5:0": {diff: "Easy", gen: (rng) => vB2XNPVWhen(rng, "Excel L5 §1")},
"excel-l5:1": {diff: "Easy", gen: (rng) => vB2XNPVOrder(rng, "Excel L5 §2")},
"excel-l5:2": {diff: "Hard", gen: (rng) => vB2XNPVDisc(rng, "Excel L5 §3")},
"excel-l5:3": {diff: "Easy", gen: (rng) => vB2XIRRNum(rng, "Excel L5 §4")},
"excel-l5:4": {diff: "Easy", gen: (rng) => vB2TextDate(rng, "Excel L5 §5")},
"excel-l5:5": {diff: "Hard", gen: (rng) => vB2XIRRTrap(rng, "Excel L5 §6")},
"excel-l5:6": {diff: "Easy", gen: (rng) => vB2Choose(rng, "Excel L5 §7")},
"excel-l5:7": {diff: "Easy", gen: (rng) => vB2SheetsGrid(rng, "Excel L5 §8")},
"excel-l5:8": {diff: "Medium", gen: (rng) => vB2GridFormula(rng, "Excel L5 §9")},
"excel-l5:9": {diff: "Medium", gen: (rng) => vB2NormInv(rng, "Excel L5 §10")},
"excel-l5:10": {diff: "Easy", gen: (rng) => vB2RandNo(rng, "Excel L5 §11")},
/* ---- excel-l6 (5) ---- */
"excel-l6:0": {diff: "Easy", gen: (rng) => vB2PQRefresh(rng, "Excel L6 §1")},
"excel-l6:1": {diff: "Easy", gen: (rng) => vB2PivotAudit(rng, "Excel L6 §2")},
"excel-l6:2": {diff: "Easy", gen: (rng) => vB2VBACopy(rng, "Excel L6 §3")},
"excel-l6:3": {diff: "Easy", gen: (rng) => vB2Shortcut(rng, "Excel L6 §4")},
"excel-l6:4": {diff: "Easy", gen: (rng) => vB2PQOverwrite(rng, "Excel L6 §5")},
/* ---- real-01 (5) ---- */
"real-01:0": {diff: "Easy", gen: (rng) => vB2UNVRScen(rng, "Real 01 §1")},
"real-01:1": {diff: "Easy", gen: (rng) => vB2TVDom(rng, "Real 01 §2")},
"real-01:2": {diff: "Medium", gen: (rng) => vB2Upside(rng, "Real 01 §3")},
"real-01:3": {diff: "Easy", gen: (rng) => vB2BullMargin(rng, "Real 01 §4")},
"real-01:4": {diff: "Easy", gen: (rng) => vB2Reinvest(rng, "Real 01 §5")},
/* ---- real-02 (6) ---- */
"real-02:0": {diff: "Easy", gen: (rng) => vB2SOTPDef(rng, "Real 02 §1")},
"real-02:1": {diff: "Easy", gen: (rng) => vB2NetDebt(rng, "Real 02 §2")},
"real-02:2": {diff: "Medium", gen: (rng) => vB2CongDisc(rng, "Real 02 §3")},
"real-02:3": {diff: "Easy", gen: (rng) => vB2MultDiff(rng, "Real 02 §4")},
"real-02:4": {diff: "Medium", gen: (rng) => vB2BigSegment(rng, "Real 02 §5")},
"real-02:5": {diff: "Easy", gen: (rng) => vB2BridgeFull(rng, "Real 02 §6")},
/* ---- real-03 (7) ---- */
"real-03:0": {diff: "Easy", gen: (rng) => vB2NCIWhy(rng, "Real 03 §1")},
"real-03:1": {diff: "Easy", gen: (rng) => vB2IntBegin(rng, "Real 03 §2")},
"real-03:2": {diff: "Medium", gen: (rng) => vB2WCSign(rng, "Real 03 §3")},
"real-03:3": {diff: "Hard", gen: (rng) => vB2DoubleCapex(rng, "Real 03 §4")},
"real-03:4": {diff: "Easy", gen: (rng) => vB2FakeOK(rng, "Real 03 §5")},
"real-03:5": {diff: "Easy", gen: (rng) => vB2NCIRoll(rng, "Real 03 §6")},
"real-03:6": {diff: "Hard", gen: (rng) => vB2GoodwillPartial(rng, "Real 03 §7")},
/* ---- real-04 (5) ---- */
"real-04:0": {diff: "Easy", gen: (rng) => vB2RevDCF(rng, "Real 04 §1")},
"real-04:1": {diff: "Medium", gen: (rng) => vB2RevGap(rng, "Real 04 §2")},
"real-04:2": {diff: "Medium", gen: (rng) => vB2ImpliedG(rng, "Real 04 §3")},
"real-04:3": {diff: "Easy", gen: (rng) => vB2NormMargin(rng, "Real 04 §4")},
"real-04:4": {diff: "Easy", gen: (rng) => vB2GoalSeek(rng, "Real 04 §5")},
/* ---- real-05 (5) ---- */
"real-05:0": {diff: "Easy", gen: (rng) => vB2FCFSimple(rng, "Real 05 §1")},
"real-05:1": {diff: "Easy", gen: (rng) => vB2Harvest(rng, "Real 05 §2")},
"real-05:2": {diff: "Medium", gen: (rng) => vB2Wave5G(rng, "Real 05 §3")},
"real-05:3": {diff: "Medium", gen: (rng) => vB2FCFYield(rng, "Real 05 §4")},
"real-05:4": {diff: "Easy", gen: (rng) => vB2GapStance(rng, "Real 05 §5")},
/* ---- real-06 (7) ---- */
"real-06:0": {diff: "Easy", gen: (rng) => vB2BankDCF(rng, "Real 06 §1")},
"real-06:1": {diff: "Medium", gen: (rng) => vB2RI(rng, "Real 06 §2")},
"real-06:2": {diff: "Medium", gen: (rng) => vB2JustPBV(rng, "Real 06 §3")},
"real-06:3": {diff: "Easy", gen: (rng) => vB2NIMTrap(rng, "Real 06 §4")},
"real-06:4": {diff: "Easy", gen: (rng) => vB2MktPrem(rng, "Real 06 §5")},
"real-06:5": {diff: "Hard", gen: (rng) => vB2NIMStress(rng, "Real 06 §6")},
"real-06:6": {diff: "Easy", gen: (rng) => vB2CleanSurplus(rng, "Real 06 §7")},
/* ---- real-07 (10) ---- */
"real-07:0": {diff: "Easy", gen: (rng) => vB2SpinOff(rng, "Real 07 §1")},
"real-07:1": {diff: "Easy", gen: (rng) => vB2Restated(rng, "Real 07 §2")},
"real-07:2": {diff: "Medium", gen: (rng) => vB2MineLife(rng, "Real 07 §3")},
"real-07:3": {diff: "Easy", gen: (rng) => vB2Reserves(rng, "Real 07 §4")},
"real-07:4": {diff: "Medium", gen: (rng) => vB2SOTPEquity(rng, "Real 07 §5")},
"real-07:5": {diff: "Easy", gen: (rng) => vB2RealOption(rng, "Real 07 §6")},
"real-07:6": {diff: "Easy", gen: (rng) => vB2Consol15(rng, "Real 07 §7")},
"real-07:7": {diff: "Easy", gen: (rng) => vB2NetCash(rng, "Real 07 §8")},
"real-07:8": {diff: "Medium", gen: (rng) => vB2BinomP(rng, "Real 07 §9")},
"real-07:9": {diff: "Hard", gen: (rng) => vB2BinomVal(rng, "Real 07 §10")},
/* ---- real-08 (7) ---- */
"real-08:0": {diff: "Easy", gen: (rng) => vB2OneOff(rng, "Real 08 §1")},
"real-08:1": {diff: "Medium", gen: (rng) => vB2Normalize(rng, "Real 08 §2")},
"real-08:2": {diff: "Easy", gen: (rng) => vB2ProFormaRev(rng, "Real 08 §3")},
"real-08:3": {diff: "Medium", gen: (rng) => vB2Implied100(rng, "Real 08 §4")},
"real-08:4": {diff: "Medium", gen: (rng) => vB2StakeRp(rng, "Real 08 §5")},
"real-08:5": {diff: "Medium", gen: (rng) => vB2SOTPPS(rng, "Real 08 §6")},
"real-08:6": {diff: "Easy", gen: (rng) => vB2NegPE(rng, "Real 08 §7")},
/* ---- real-09 (10) ---- */
"real-09:0": {diff: "Easy", gen: (rng) => vB2NegEquity(rng, "Real 09 §1")},
"real-09:1": {diff: "Easy", gen: (rng) => vB2Creditor(rng, "Real 09 §2")},
"real-09:2": {diff: "Easy", gen: (rng) => vB2WaterfallOrder(rng, "Real 09 §3")},
"real-09:3": {diff: "Easy", gen: (rng) => vB2Frozen(rng, "Real 09 §4")},
"real-09:4": {diff: "Easy", gen: (rng) => vB2DIP(rng, "Real 09 §5")},
"real-09:5": {diff: "Easy", gen: (rng) => vB2Holdout(rng, "Real 09 §6")},
"real-09:6": {diff: "Medium", gen: (rng) => vB2Recovery(rng, "Real 09 §7")},
"real-09:7": {diff: "Medium", gen: (rng) => vB2Bleeding(rng, "Real 09 §8")},
"real-09:8": {diff: "Medium", gen: (rng) => vB2Haircut(rng, "Real 09 §9")},
"real-09:9": {diff: "Easy", gen: (rng) => vB2PKPU(rng, "Real 09 §10")},
/* ---- real-10 (5) ---- */
"real-10:0": {diff: "Medium", gen: (rng) => vB2DSCR(rng, "Real 10 §1")},
"real-10:1": {diff: "Medium", gen: (rng) => vB2WFDist(rng, "Real 10 §2")},
"real-10:2": {diff: "Hard", gen: (rng) => vB2Sculpt(rng, "Real 10 §3")},
"real-10:3": {diff: "Easy", gen: (rng) => vB2DSCRWatch(rng, "Real 10 §4")},
"real-10:4": {diff: "Easy", gen: (rng) => vB2Tenor(rng, "Real 10 §5")},
/* ---- real-11 (5) ---- */
"real-11:0": {diff: "Hard", gen: (rng) => vB2Combined(rng, "Real 11 §1")},
"real-11:1": {diff: "Easy", gen: (rng) => vB2UWProfit(rng, "Real 11 §2")},
"real-11:2": {diff: "Easy", gen: (rng) => vB2LIC(rng, "Real 11 §3")},
"real-11:3": {diff: "Medium", gen: (rng) => vB2RBC(rng, "Real 11 §4")},
"real-11:4": {diff: "Medium", gen: (rng) => vB2EVPS(rng, "Real 11 §5")},
/* ---- real-12 (5) ---- */
"real-12:0": {diff: "Medium", gen: (rng) => vB2Cohort(rng, "Real 12 §1")},
"real-12:1": {diff: "Medium", gen: (rng) => vB2LTVCAC(rng, "Real 12 §2")},
"real-12:2": {diff: "Hard", gen: (rng) => vB2PaybackChurn(rng, "Real 12 §3")},
"real-12:3": {diff: "Medium", gen: (rng) => vB2NRR(rng, "Real 12 §4")},
"real-12:4": {diff: "Easy", gen: (rng) => vB2EVARR(rng, "Real 12 §5")},
/* ---- hari-23 MOCK 1 (50) ---- */
"hari-23:0": {diff: "Easy", gen: (rng) => vB2RE(rng, "Hari 23 §1")},
"hari-23:1": {diff: "Easy", gen: (rng) => vB2TrailMachine(rng, "Hari 23 §2")},
"hari-23:2": {diff: "Easy", gen: (rng) => vB2AccrualSale(rng, "Hari 23 §3")},
"hari-23:3": {diff: "Easy", gen: (rng) => vB2DeprNoTax(rng, "Hari 23 §4")},
"hari-23:4": {diff: "Medium", gen: (rng) => vB2CFO(rng, "Hari 23 §5")},
"hari-23:5": {diff: "Medium", gen: (rng) => vB2CashBridge(rng, "Hari 23 §6")},
"hari-23:6": {diff: "Easy", gen: (rng) => vB2TrailDividend(rng, "Hari 23 §7")},
"hari-23:7": {diff: "Medium", gen: (rng) => vB2DefTaxProv(rng, "Hari 23 §8")},
"hari-23:8": {diff: "Easy", gen: (rng) => vB2WC(rng, "Hari 23 §9")},
"hari-23:9": {diff: "Easy", gen: (rng) => vB2Days(rng, "Hari 23 §10", undefined, "DSO")},
"hari-23:10": {diff: "Medium", gen: (rng) => vB2CCC(rng, "Hari 23 §11")},
"hari-23:11": {diff: "Medium", gen: (rng) => vB2CFOWC(rng, "Hari 23 §12")},
"hari-23:12": {diff: "Medium", gen: (rng) => vB2DPOExt(rng, "Hari 23 §13")},
"hari-23:13": {diff: "Medium", gen: (rng) => vB2FCFF(rng, "Hari 23 §14")},
"hari-23:14": {diff: "Medium", gen: (rng) => vB2CAPM(rng, "Hari 23 §15")},
"hari-23:15": {diff: "Medium", gen: (rng) => vB2WACC(rng, "Hari 23 §16")},
"hari-23:16": {diff: "Medium", gen: (rng) => vB2PVFCF(rng, "Hari 23 §17", undefined, 1)},
"hari-23:17": {diff: "Medium", gen: (rng) => vB2Gordon(rng, "Hari 23 §18")},
"hari-23:18": {diff: "Medium", gen: (rng) => vB2ExitTV(rng, "Hari 23 §19")},
"hari-23:19": {diff: "Medium", gen: (rng) => vB2EVPS(rng, "Hari 23 §20")},
"hari-23:20": {diff: "Medium", gen: (rng) => vB2PVTV(rng, "Hari 23 §21")},
"hari-23:21": {diff: "Hard", gen: (rng) => vB2CapexDepr(rng, "Hari 23 §22")},
"hari-23:22": {diff: "Medium", gen: (rng) => vB2Gordon(rng, "Hari 23 §23")},
"hari-23:23": {diff: "Easy", gen: (rng) => vB2EV(rng, "Hari 23 §24")},
"hari-23:24": {diff: "Medium", gen: (rng) => vB2MultPS(rng, "Hari 23 §25")},
"hari-23:25": {diff: "Medium", gen: (rng) => vB2CashPE(rng, "Hari 23 §26")},
"hari-23:26": {diff: "Medium", gen: (rng) => vB2Precedent(rng, "Hari 23 §27")},
"hari-23:27": {diff: "Medium", gen: (rng) => vB2DataTable(rng, "Hari 23 §28")},
"hari-23:28": {diff: "Medium", gen: (rng) => vB2Tornado(rng, "Hari 23 §29")},
"hari-23:29": {diff: "Medium", gen: (rng) => vB2Range(rng, "Hari 23 §30")},
"hari-23:30": {diff: "Medium", gen: (rng) => vB2MoICGrowth(rng, "Hari 23 §31")},
"hari-23:31": {diff: "Medium", gen: (rng) => vB2BEP(rng, "Hari 23 §32")},
"hari-23:32": {diff: "Medium", gen: (rng) => vB2PEAccr(rng, "Hari 23 §33")},
"hari-23:33": {diff: "Easy", gen: (rng) => vB2SynZero(rng, "Hari 23 §34")},
"hari-23:34": {diff: "Medium", gen: (rng) => vB2MixDeal(rng, "Hari 23 §35")},
"hari-23:35": {diff: "Hard", gen: (rng) => vB2NOLVal(rng, "Hari 23 §36")},
"hari-23:36": {diff: "Medium", gen: (rng) => vB2EquityNeeded(rng, "Hari 23 §37")},
"hari-23:37": {diff: "Easy", gen: (rng) => vB2Interest(rng, "Hari 23 §38")},
"hari-23:38": {diff: "Medium", gen: (rng) => vB2DebtFloor(rng, "Hari 23 §39")},
"hari-23:39": {diff: "Medium", gen: (rng) => vB2MoIC(rng, "Hari 23 §40")},
"hari-23:40": {diff: "Medium", gen: (rng) => vB2InterestCirc(rng, "Hari 23 §41")},
"hari-23:41": {diff: "Medium", gen: (rng) => vB2BudgetForecast(rng, "Hari 23 §42")},
"hari-23:42": {diff: "Medium", gen: (rng) => vB2VarVerdict(rng, "Hari 23 §43")},
"hari-23:43": {diff: "Medium", gen: (rng) => vB2PriceVar(rng, "Hari 23 §44")},
"hari-23:44": {diff: "Medium", gen: (rng) => vB2Rolling(rng, "Hari 23 §45")},
"hari-23:45": {diff: "Medium", gen: (rng) => vB2AbsRef(rng, "Hari 23 §46")},
"hari-23:46": {diff: "Medium", gen: (rng) => vB2IdxMatch(rng, "Hari 23 §47")},
"hari-23:47": {diff: "Medium", gen: (rng) => vB2XLookup2(rng, "Hari 23 §48")},
"hari-23:48": {diff: "Medium", gen: (rng) => vB2Sequence(rng, "Hari 23 §49", undefined, 5, 3)},
"hari-23:49": {diff: "Medium", gen: (rng) => vB2TaxFloor(rng, "Hari 23 §50")},
/* ---- hari-25 MOCK 2 (50) ---- */
"hari-25:0": {diff: "Easy", gen: (rng) => vB2RE(rng, "Hari 25 §1")},
"hari-25:1": {diff: "Easy", gen: (rng) => vB2TrailShares(rng, "Hari 25 §2")},
"hari-25:2": {diff: "Easy", gen: (rng) => vB2TrailInventory(rng, "Hari 25 §3")},
"hari-25:3": {diff: "Easy", gen: (rng) => vB2DeprNoTax(rng, "Hari 25 §4")},
"hari-25:4": {diff: "Medium", gen: (rng) => vB2CFO(rng, "Hari 25 §5")},
"hari-25:5": {diff: "Easy", gen: (rng) => vB2TrailDividend(rng, "Hari 25 §6")},
"hari-25:6": {diff: "Medium", gen: (rng) => vB2DefTaxDepr(rng, "Hari 25 §7")},
"hari-25:7": {diff: "Medium", gen: (rng) => vB2CashTieOut(rng, "Hari 25 §8")},
"hari-25:8": {diff: "Easy", gen: (rng) => vB2WC(rng, "Hari 25 §9")},
"hari-25:9": {diff: "Easy", gen: (rng) => vB2Days(rng, "Hari 25 §10", undefined, "DPO")},
"hari-25:10": {diff: "Medium", gen: (rng) => vB2CCC(rng, "Hari 25 §11")},
"hari-25:11": {diff: "Medium", gen: (rng) => vB2CFOWC(rng, "Hari 25 §12")},
"hari-25:12": {diff: "Medium", gen: (rng) => vB2DSOUp(rng, "Hari 25 §13")},
"hari-25:13": {diff: "Medium", gen: (rng) => vB2FCFF(rng, "Hari 25 §14")},
"hari-25:14": {diff: "Medium", gen: (rng) => vB2CAPM(rng, "Hari 25 §15")},
"hari-25:15": {diff: "Medium", gen: (rng) => vB2WACC(rng, "Hari 25 §16")},
"hari-25:16": {diff: "Medium", gen: (rng) => vB2PVFCF(rng, "Hari 25 §17", undefined, 2)},
"hari-25:17": {diff: "Medium", gen: (rng) => vB2Gordon(rng, "Hari 25 §18")},
"hari-25:18": {diff: "Medium", gen: (rng) => vB2ExitTV(rng, "Hari 25 §19")},
"hari-25:19": {diff: "Medium", gen: (rng) => vB2EVPS(rng, "Hari 25 §20")},
"hari-25:20": {diff: "Medium", gen: (rng) => vB2PVTV(rng, "Hari 25 §21")},
"hari-25:21": {diff: "Medium", gen: (rng) => vB2FCFFvsFCFE(rng, "Hari 25 §22")},
"hari-25:22": {diff: "Medium", gen: (rng) => vB2Gordon(rng, "Hari 25 §23")},
"hari-25:23": {diff: "Easy", gen: (rng) => vB2EV(rng, "Hari 25 §24")},
"hari-25:24": {diff: "Medium", gen: (rng) => vB2MultPS(rng, "Hari 25 §25")},
"hari-25:25": {diff: "Medium", gen: (rng) => vB2CashPE(rng, "Hari 25 §26")},
"hari-25:26": {diff: "Medium", gen: (rng) => vB2Precedent(rng, "Hari 25 §27")},
"hari-25:27": {diff: "Medium", gen: (rng) => vB2DataTable(rng, "Hari 25 §28")},
"hari-25:28": {diff: "Medium", gen: (rng) => vB2Tornado(rng, "Hari 25 §29")},
"hari-25:29": {diff: "Medium", gen: (rng) => vB2Range(rng, "Hari 25 §30")},
"hari-25:30": {diff: "Medium", gen: (rng) => vB2MoICGrowth(rng, "Hari 25 §31")},
"hari-25:31": {diff: "Medium", gen: (rng) => vB2BEP(rng, "Hari 25 §32")},
"hari-25:32": {diff: "Medium", gen: (rng) => vB2PEAccr(rng, "Hari 25 §33")},
"hari-25:33": {diff: "Medium", gen: (rng) => vB2SynCost(rng, "Hari 25 §34")},
"hari-25:34": {diff: "Medium", gen: (rng) => vB2MixDeal(rng, "Hari 25 §35")},
"hari-25:35": {diff: "Hard", gen: (rng) => vB2NOLVal(rng, "Hari 25 §36")},
"hari-25:36": {diff: "Medium", gen: (rng) => vB2EquityNeeded(rng, "Hari 25 §37")},
"hari-25:37": {diff: "Easy", gen: (rng) => vB2Interest(rng, "Hari 25 §38")},
"hari-25:38": {diff: "Medium", gen: (rng) => vB2DebtFloor(rng, "Hari 25 §39")},
"hari-25:39": {diff: "Medium", gen: (rng) => vB2MoIC(rng, "Hari 25 §40")},
"hari-25:40": {diff: "Medium", gen: (rng) => vB2InterestCirc(rng, "Hari 25 §41")},
"hari-25:41": {diff: "Medium", gen: (rng) => vB2BudgetLock(rng, "Hari 25 §42")},
"hari-25:42": {diff: "Medium", gen: (rng) => vB2VarVerdict(rng, "Hari 25 §43")},
"hari-25:43": {diff: "Medium", gen: (rng) => vB2PriceVar(rng, "Hari 25 §44")},
"hari-25:44": {diff: "Easy", gen: (rng) => vB2ZBB(rng, "Hari 25 §45")},
"hari-25:45": {diff: "Medium", gen: (rng) => vB2AbsRef(rng, "Hari 25 §46")},
"hari-25:46": {diff: "Medium", gen: (rng) => vB2IdxMatch(rng, "Hari 25 §47")},
"hari-25:47": {diff: "Medium", gen: (rng) => vB2XLookupApprox(rng, "Hari 25 §48")},
"hari-25:48": {diff: "Medium", gen: (rng) => vB2Sequence(rng, "Hari 25 §49", undefined, 12)},
"hari-25:49": {diff: "Medium", gen: (rng) => vB2DebtFormula(rng, "Hari 25 §50")},
/* ---- hari-28 MOCK 3 (50) ---- */
"hari-28:0": {diff: "Easy", gen: (rng) => vB2RE(rng, "Hari 28 §1")},
"hari-28:1": {diff: "Easy", gen: (rng) => vB2TrailLoanPay(rng, "Hari 28 §2")},
"hari-28:2": {diff: "Easy", gen: (rng) => vB2TrailSalary(rng, "Hari 28 §3")},
"hari-28:3": {diff: "Medium", gen: (rng) => vB2DeprTax(rng, "Hari 28 §4")},
"hari-28:4": {diff: "Medium", gen: (rng) => vB2CFO(rng, "Hari 28 §5")},
"hari-28:5": {diff: "Easy", gen: (rng) => vB2StockSplit(rng, "Hari 28 §6")},
"hari-28:6": {diff: "Medium", gen: (rng) => vB2DTANOL(rng, "Hari 28 §7")},
"hari-28:7": {diff: "Medium", gen: (rng) => vB2WrongStmt(rng, "Hari 28 §8")},
"hari-28:8": {diff: "Easy", gen: (rng) => vB2WC(rng, "Hari 28 §9")},
"hari-28:9": {diff: "Easy", gen: (rng) => vB2Days(rng, "Hari 28 §10", undefined, "DIO")},
"hari-28:10": {diff: "Medium", gen: (rng) => vB2CCC(rng, "Hari 28 §11")},
"hari-28:11": {diff: "Medium", gen: (rng) => vB2CFOWC(rng, "Hari 28 §12")},
"hari-28:12": {diff: "Medium", gen: (rng) => vB2DPOExt(rng, "Hari 28 §13")},
"hari-28:13": {diff: "Medium", gen: (rng) => vB2FCFF(rng, "Hari 28 §14")},
"hari-28:14": {diff: "Medium", gen: (rng) => vB2CAPM(rng, "Hari 28 §15")},
"hari-28:15": {diff: "Medium", gen: (rng) => vB2WACC(rng, "Hari 28 §16")},
"hari-28:16": {diff: "Medium", gen: (rng) => vB2PVFCF(rng, "Hari 28 §17", undefined, 3)},
"hari-28:17": {diff: "Medium", gen: (rng) => vB2Gordon(rng, "Hari 28 §18")},
"hari-28:18": {diff: "Medium", gen: (rng) => vB2ExitTV(rng, "Hari 28 §19")},
"hari-28:19": {diff: "Medium", gen: (rng) => vB2EVPS(rng, "Hari 28 §20")},
"hari-28:20": {diff: "Medium", gen: (rng) => vB2PVTV(rng, "Hari 28 §21")},
"hari-28:21": {diff: "Medium", gen: (rng) => vB2FCFFvsNI(rng, "Hari 28 §22")},
"hari-28:22": {diff: "Medium", gen: (rng) => vB2TVShare(rng, "Hari 28 §23")},
"hari-28:23": {diff: "Easy", gen: (rng) => vB2EV(rng, "Hari 28 §24")},
"hari-28:24": {diff: "Medium", gen: (rng) => vB2MultPS(rng, "Hari 28 §25")},
"hari-28:25": {diff: "Medium", gen: (rng) => vB2LTMNTM(rng, "Hari 28 §26")},
"hari-28:26": {diff: "Medium", gen: (rng) => vB2Precedent(rng, "Hari 28 §27")},
"hari-28:27": {diff: "Medium", gen: (rng) => vB2DataTable(rng, "Hari 28 §28")},
"hari-28:28": {diff: "Medium", gen: (rng) => vB2Tornado(rng, "Hari 28 §29")},
"hari-28:29": {diff: "Medium", gen: (rng) => vB2MoS(rng, "Hari 28 §30")},
"hari-28:30": {diff: "Hard", gen: (rng) => vB2ExitVsGrowth(rng, "Hari 28 §31")},
"hari-28:31": {diff: "Medium", gen: (rng) => vB2BEP(rng, "Hari 28 §32")},
"hari-28:32": {diff: "Medium", gen: (rng) => vB2PEDil(rng, "Hari 28 §33")},
"hari-28:33": {diff: "Medium", gen: (rng) => vB2CashDealAccr(rng, "Hari 28 §34")},
"hari-28:34": {diff: "Easy", gen: (rng) => vB2GoodwillTreat(rng, "Hari 28 §35")},
"hari-28:35": {diff: "Medium", gen: (rng) => vB2NOLSyn(rng, "Hari 28 §36")},
"hari-28:36": {diff: "Medium", gen: (rng) => vB2EquityNeeded2(rng, "Hari 28 §37")},
"hari-28:37": {diff: "Hard", gen: (rng) => vB2DebtTranches(rng, "Hari 28 §38")},
"hari-28:38": {diff: "Hard", gen: (rng) => vB2AmortSweep(rng, "Hari 28 §39")},
"hari-28:39": {diff: "Medium", gen: (rng) => vB2MoIC(rng, "Hari 28 §40")},
"hari-28:40": {diff: "Medium", gen: (rng) => vB2DivRecap(rng, "Hari 28 §41")},
"hari-28:41": {diff: "Medium", gen: (rng) => vB2FlexRole(rng, "Hari 28 §42")},
"hari-28:42": {diff: "Medium", gen: (rng) => vB2VarVerdict(rng, "Hari 28 §43")},
"hari-28:43": {diff: "Medium", gen: (rng) => vB2PriceVolVar(rng, "Hari 28 §44")},
"hari-28:44": {diff: "Medium", gen: (rng) => vB2Rolling(rng, "Hari 28 §45")},
"hari-28:45": {diff: "Medium", gen: (rng) => vB2AbsRef2(rng, "Hari 28 §46")},
"hari-28:46": {diff: "Easy", gen: (rng) => vB2VlookupNA(rng, "Hari 28 §47")},
"hari-28:47": {diff: "Medium", gen: (rng) => vB2Sumifs2(rng, "Hari 28 §48")},
"hari-28:48": {diff: "Easy", gen: (rng) => vB2LETAdv(rng, "Hari 28 §49")},
"hari-28:49": {diff: "Easy", gen: (rng) => vB2Iterative(rng, "Hari 28 §50")},
};



const VARIANT_FNS_EN_B2 = {
/* ---- hari-16 (8) ---- */
"hari-16:0": {diff: "Easy", gen: (rng) => vB2EPS(rng, "Day 16 §1", "en")},
"hari-16:1": {diff: "Easy", gen: (rng) => vB2Goodwill(rng, "Day 16 §2", "en")},
"hari-16:2": {diff: "Medium", gen: (rng) => vB2ProFormaNI(rng, "Day 16 §3", "en")},
"hari-16:3": {diff: "Medium", gen: (rng) => vB2Accretion(rng, "Day 16 §4", "en")},
"hari-16:4": {diff: "Medium", gen: (rng) => vB2Dilution(rng, "Day 16 §5", "en")},
"hari-16:5": {diff: "Medium", gen: (rng) => vB2GoodwillPPA(rng, "Day 16 §6", "en")},
"hari-16:6": {diff: "Medium", gen: (rng) => vB2DivBuyback(rng, "Day 16 §7", "en")},
"hari-16:7": {diff: "Easy", gen: (rng) => vB2DivSignal(rng, "Day 16 §8", "en")},
/* ---- hari-17 (8) ---- */
"hari-17:0": {diff: "Medium", gen: (rng) => vB2EquityNeeded(rng, "Day 17 §1", "en")},
"hari-17:1": {diff: "Easy", gen: (rng) => vB2Interest(rng, "Day 17 §2", "en")},
"hari-17:2": {diff: "Medium", gen: (rng) => vB2CashToDebt(rng, "Day 17 §3", "en")},
"hari-17:3": {diff: "Medium", gen: (rng) => vB2DebtFloor(rng, "Day 17 §4", "en")},
"hari-17:4": {diff: "Medium", gen: (rng) => vB2MoIC(rng, "Day 17 §5", "en")},
"hari-17:5": {diff: "Medium", gen: (rng) => vB2PIK(rng, "Day 17 §6", "en")},
"hari-17:6": {diff: "Medium", gen: (rng) => vB2Covenant(rng, "Day 17 §7", "en")},
"hari-17:7": {diff: "Medium", gen: (rng) => vB2Sweep(rng, "Day 17 §8", "en")},
/* ---- hari-18 (11) ---- */
"hari-18:0": {diff: "Easy", gen: (rng) => vB2Seasonal(rng, "Day 18 §1", "en")},
"hari-18:1": {diff: "Easy", gen: (rng) => vB2VarSign(rng, "Day 18 §2", "en")},
"hari-18:2": {diff: "Medium", gen: (rng) => vB2PriceVar(rng, "Day 18 §3", "en")},
"hari-18:3": {diff: "Medium", gen: (rng) => vB2FlexRole(rng, "Day 18 §4", "en")},
"hari-18:4": {diff: "Easy", gen: (rng) => vB2NPVRule(rng, "Day 18 §5", "en")},
"hari-18:5": {diff: "Hard", gen: (rng) => vB2NPVPI(rng, "Day 18 §6", "en")},
"hari-18:6": {diff: "Medium", gen: (rng) => vB2Payback(rng, "Day 18 §7", "en")},
"hari-18:7": {diff: "Hard", gen: (rng) => vB2NPVIRR(rng, "Day 18 §8", "en")},
"hari-18:8": {diff: "Hard", gen: (rng) => vB2MultIRR(rng, "Day 18 §9", "en")},
"hari-18:9": {diff: "Medium", gen: (rng) => vB2MAEMAPE(rng, "Day 18 §10", "en")},
"hari-18:10": {diff: "Hard", gen: (rng) => vB2MixVar(rng, "Day 18 §11", "en")},
/* ---- hari-19 (5) ---- */
"hari-19:0": {diff: "Medium", gen: (rng) => vB2IMTable(rng, "Day 19 §1", "en")},
"hari-19:1": {diff: "Medium", gen: (rng) => vB2SumifsTable(rng, "Day 19 §2", "en")},
"hari-19:2": {diff: "Easy", gen: (rng) => vB2MatchTrap(rng, "Day 19 §3", "en")},
"hari-19:3": {diff: "Medium", gen: (rng) => vB2XLookupSafe(rng, "Day 19 §4", "en")},
"hari-19:4": {diff: "Easy", gen: (rng) => vB2IfErrorUse(rng, "Day 19 §5", "en")},
/* ---- hari-20 (6) ---- */
"hari-20:0": {diff: "Medium", gen: (rng) => vB2LeasePV(rng, "Day 20 §1", "en")},
"hari-20:1": {diff: "Medium", gen: (rng) => vB2LeaseExp(rng, "Day 20 §2", "en")},
"hari-20:2": {diff: "Easy", gen: (rng) => vB2DTL(rng, "Day 20 §3", "en")},
"hari-20:3": {diff: "Easy", gen: (rng) => vB2StockComp(rng, "Day 20 §4", "en")},
"hari-20:4": {diff: "Easy", gen: (rng) => vB2NOLSave(rng, "Day 20 §5", "en")},
"hari-20:5": {diff: "Medium", gen: (rng) => vB2TSM(rng, "Day 20 §6", "en")},
/* ---- hari-21 (20) ---- */
"hari-21:0": {diff: "Medium", gen: (rng) => vB2DataTable(rng, "Day 21 §1", "en")},
"hari-21:1": {diff: "Medium", gen: (rng) => vB2Tornado(rng, "Day 21 §2", "en")},
"hari-21:2": {diff: "Medium", gen: (rng) => vB2Range(rng, "Day 21 §3", "en")},
"hari-21:3": {diff: "Medium", gen: (rng) => vB2MoICGrowth(rng, "Day 21 §4", "en")},
"hari-21:4": {diff: "Medium", gen: (rng) => vB2PEAccr(rng, "Day 21 §5", "en")},
"hari-21:5": {diff: "Easy", gen: (rng) => vB2SynZero(rng, "Day 21 §6", "en")},
"hari-21:6": {diff: "Medium", gen: (rng) => vB2MixDeal(rng, "Day 21 §7", "en")},
"hari-21:7": {diff: "Hard", gen: (rng) => vB2NOLVal(rng, "Day 21 §8", "en")},
"hari-21:8": {diff: "Medium", gen: (rng) => vB2SourcesUsesFee(rng, "Day 21 §9", "en")},
"hari-21:9": {diff: "Medium", gen: (rng) => vB2InterestCirc(rng, "Day 21 §10", "en")},
"hari-21:10": {diff: "Medium", gen: (rng) => vB2DebtFloor(rng, "Day 21 §11", "en")},
"hari-21:11": {diff: "Hard", gen: (rng) => vB2MoICClaim(rng, "Day 21 §12", "en")},
"hari-21:12": {diff: "Medium", gen: (rng) => vB2BudgetForecast(rng, "Day 21 §13", "en")},
"hari-21:13": {diff: "Medium", gen: (rng) => vB2VarVerdict(rng, "Day 21 §14", "en")},
"hari-21:14": {diff: "Medium", gen: (rng) => vB2Rolling(rng, "Day 21 §15", "en")},
"hari-21:15": {diff: "Medium", gen: (rng) => vB2IdxMatch(rng, "Day 21 §16", "en")},
"hari-21:16": {diff: "Medium", gen: (rng) => vB2AbsRef(rng, "Day 21 §17", "en")},
"hari-21:17": {diff: "Easy", gen: (rng) => vB2Precedents(rng, "Day 21 §18", "en")},
"hari-21:18": {diff: "Medium", gen: (rng) => vB2LeaseEBITDA(rng, "Day 21 §19", "en")},
"hari-21:19": {diff: "Medium", gen: (rng) => vB2DTARecog(rng, "Day 21 §20", "en")},
/* ---- hari-22 (6) ---- */
"hari-22:0": {diff: "Medium", gen: (rng) => vB2TVDual(rng, "Day 22 §1", "en")},
"hari-22:1": {diff: "Medium", gen: (rng) => vB2WACCChange(rng, "Day 22 §2", "en")},
"hari-22:2": {diff: "Easy", gen: (rng) => vB2Hardcode(rng, "Day 22 §3", "en")},
"hari-22:3": {diff: "Easy", gen: (rng) => vB2RangePresent(rng, "Day 22 §4", "en")},
"hari-22:4": {diff: "Medium", gen: (rng) => vB2REPT(rng, "Day 22 §5", "en")},
"hari-22:5": {diff: "Easy", gen: (rng) => vB2KPITree(rng, "Day 22 §6", "en")},
/* ---- hari-31 (6) ---- */
"hari-31:0": {diff: "Medium", gen: (rng) => vB2IPOProceeds(rng, "Day 31 §1", "en")},
"hari-31:1": {diff: "Medium", gen: (rng) => vB2IPOEquity(rng, "Day 31 §2", "en")},
"hari-31:2": {diff: "Medium", gen: (rng) => vB2IPOUnder(rng, "Day 31 §3", "en")},
"hari-31:3": {diff: "Easy", gen: (rng) => vB2IPOLockup(rng, "Day 31 §4", "en")},
"hari-31:4": {diff: "Easy", gen: (rng) => vB2IPOBook(rng, "Day 31 §5", "en")},
"hari-31:5": {diff: "Easy", gen: (rng) => vB2IPOSecondary(rng, "Day 31 §6", "en")},
/* ---- excel-l1 (5) ---- */
"excel-l1:0": {diff: "Easy", gen: (rng) => vB2SumRange(rng, "Excel L1 §1", "en")},
"excel-l1:1": {diff: "Easy", gen: (rng) => vB2Countif(rng, "Excel L1 §2", "en")},
"excel-l1:2": {diff: "Easy", gen: (rng) => vB2AbsCopy(rng, "Excel L1 §3", "en")},
"excel-l1:3": {diff: "Medium", gen: (rng) => vB2IdxMatch(rng, "Excel L1 §4", "en")},
"excel-l1:4": {diff: "Medium", gen: (rng) => vB2IFS(rng, "Excel L1 §5", "en")},
/* ---- excel-l2 (5) ---- */
"excel-l2:0": {diff: "Easy", gen: (rng) => vB2IMLeft(rng, "Excel L2 §1", "en")},
"excel-l2:1": {diff: "Easy", gen: (rng) => vB2SumifsRead(rng, "Excel L2 §2", "en")},
"excel-l2:2": {diff: "Medium", gen: (rng) => vB2DateValue(rng, "Excel L2 §3", "en")},
"excel-l2:3": {diff: "Easy", gen: (rng) => vB2Validation(rng, "Excel L2 §4", "en")},
"excel-l2:4": {diff: "Easy", gen: (rng) => vB2PivotIFS(rng, "Excel L2 §5", "en")},
/* ---- excel-l3 (7) ---- */
"excel-l3:0": {diff: "Easy", gen: (rng) => vB2SeqCell(rng, "Excel L3 §1", "en")},
"excel-l3:1": {diff: "Easy", gen: (rng) => vB2Spill(rng, "Excel L3 §2", "en")},
"excel-l3:2": {diff: "Medium", gen: (rng) => vB2RowsFilter(rng, "Excel L3 §3", "en")},
"excel-l3:3": {diff: "Medium", gen: (rng) => vB2Sumprod(rng, "Excel L3 §4", "en")},
"excel-l3:4": {diff: "Easy", gen: (rng) => vB2LETUse(rng, "Excel L3 §5", "en")},
"excel-l3:5": {diff: "Hard", gen: (rng) => vB2Solver(rng, "Excel L3 §6", "en")},
"excel-l3:6": {diff: "Easy", gen: (rng) => vB2GoalSolver(rng, "Excel L3 §7", "en")},
/* ---- excel-l4 (8) ---- */
"excel-l4:0": {diff: "Easy", gen: (rng) => vB2NoHardcode(rng, "Excel L4 §1", "en")},
"excel-l4:1": {diff: "Easy", gen: (rng) => vB2IfErrorRight(rng, "Excel L4 §2", "en")},
"excel-l4:2": {diff: "Easy", gen: (rng) => vB2Circular(rng, "Excel L4 §3", "en")},
"excel-l4:3": {diff: "Easy", gen: (rng) => vB2Dependents(rng, "Excel L4 §4", "en")},
"excel-l4:4": {diff: "Medium", gen: (rng) => vB2Volatile(rng, "Excel L4 §5", "en")},
"excel-l4:5": {diff: "Easy", gen: (rng) => vB2Colors(rng, "Excel L4 §6", "en")},
"excel-l4:6": {diff: "Easy", gen: (rng) => vB2Changelog(rng, "Excel L4 §7", "en")},
"excel-l4:7": {diff: "Hard", gen: (rng) => vB2TrialBal(rng, "Excel L4 §8", "en")},
/* ---- excel-l5 (11) ---- */
"excel-l5:0": {diff: "Easy", gen: (rng) => vB2XNPVWhen(rng, "Excel L5 §1", "en")},
"excel-l5:1": {diff: "Easy", gen: (rng) => vB2XNPVOrder(rng, "Excel L5 §2", "en")},
"excel-l5:2": {diff: "Hard", gen: (rng) => vB2XNPVDisc(rng, "Excel L5 §3", "en")},
"excel-l5:3": {diff: "Easy", gen: (rng) => vB2XIRRNum(rng, "Excel L5 §4", "en")},
"excel-l5:4": {diff: "Easy", gen: (rng) => vB2TextDate(rng, "Excel L5 §5", "en")},
"excel-l5:5": {diff: "Hard", gen: (rng) => vB2XIRRTrap(rng, "Excel L5 §6", "en")},
"excel-l5:6": {diff: "Easy", gen: (rng) => vB2Choose(rng, "Excel L5 §7", "en")},
"excel-l5:7": {diff: "Easy", gen: (rng) => vB2SheetsGrid(rng, "Excel L5 §8", "en")},
"excel-l5:8": {diff: "Medium", gen: (rng) => vB2GridFormula(rng, "Excel L5 §9", "en")},
"excel-l5:9": {diff: "Medium", gen: (rng) => vB2NormInv(rng, "Excel L5 §10", "en")},
"excel-l5:10": {diff: "Easy", gen: (rng) => vB2RandNo(rng, "Excel L5 §11", "en")},
/* ---- excel-l6 (5) ---- */
"excel-l6:0": {diff: "Easy", gen: (rng) => vB2PQRefresh(rng, "Excel L6 §1", "en")},
"excel-l6:1": {diff: "Easy", gen: (rng) => vB2PivotAudit(rng, "Excel L6 §2", "en")},
"excel-l6:2": {diff: "Easy", gen: (rng) => vB2VBACopy(rng, "Excel L6 §3", "en")},
"excel-l6:3": {diff: "Easy", gen: (rng) => vB2Shortcut(rng, "Excel L6 §4", "en")},
"excel-l6:4": {diff: "Easy", gen: (rng) => vB2PQOverwrite(rng, "Excel L6 §5", "en")},
/* ---- real-01 (5) ---- */
"real-01:0": {diff: "Easy", gen: (rng) => vB2UNVRScen(rng, "Real 01 §1", "en")},
"real-01:1": {diff: "Easy", gen: (rng) => vB2TVDom(rng, "Real 01 §2", "en")},
"real-01:2": {diff: "Medium", gen: (rng) => vB2Upside(rng, "Real 01 §3", "en")},
"real-01:3": {diff: "Easy", gen: (rng) => vB2BullMargin(rng, "Real 01 §4", "en")},
"real-01:4": {diff: "Easy", gen: (rng) => vB2Reinvest(rng, "Real 01 §5", "en")},
/* ---- real-02 (6) ---- */
"real-02:0": {diff: "Easy", gen: (rng) => vB2SOTPDef(rng, "Real 02 §1", "en")},
"real-02:1": {diff: "Easy", gen: (rng) => vB2NetDebt(rng, "Real 02 §2", "en")},
"real-02:2": {diff: "Medium", gen: (rng) => vB2CongDisc(rng, "Real 02 §3", "en")},
"real-02:3": {diff: "Easy", gen: (rng) => vB2MultDiff(rng, "Real 02 §4", "en")},
"real-02:4": {diff: "Medium", gen: (rng) => vB2BigSegment(rng, "Real 02 §5", "en")},
"real-02:5": {diff: "Easy", gen: (rng) => vB2BridgeFull(rng, "Real 02 §6", "en")},
/* ---- real-03 (7) ---- */
"real-03:0": {diff: "Easy", gen: (rng) => vB2NCIWhy(rng, "Real 03 §1", "en")},
"real-03:1": {diff: "Easy", gen: (rng) => vB2IntBegin(rng, "Real 03 §2", "en")},
"real-03:2": {diff: "Medium", gen: (rng) => vB2WCSign(rng, "Real 03 §3", "en")},
"real-03:3": {diff: "Hard", gen: (rng) => vB2DoubleCapex(rng, "Real 03 §4", "en")},
"real-03:4": {diff: "Easy", gen: (rng) => vB2FakeOK(rng, "Real 03 §5", "en")},
"real-03:5": {diff: "Easy", gen: (rng) => vB2NCIRoll(rng, "Real 03 §6", "en")},
"real-03:6": {diff: "Hard", gen: (rng) => vB2GoodwillPartial(rng, "Real 03 §7", "en")},
/* ---- real-04 (5) ---- */
"real-04:0": {diff: "Easy", gen: (rng) => vB2RevDCF(rng, "Real 04 §1", "en")},
"real-04:1": {diff: "Medium", gen: (rng) => vB2RevGap(rng, "Real 04 §2", "en")},
"real-04:2": {diff: "Medium", gen: (rng) => vB2ImpliedG(rng, "Real 04 §3", "en")},
"real-04:3": {diff: "Easy", gen: (rng) => vB2NormMargin(rng, "Real 04 §4", "en")},
"real-04:4": {diff: "Easy", gen: (rng) => vB2GoalSeek(rng, "Real 04 §5", "en")},
/* ---- real-05 (5) ---- */
"real-05:0": {diff: "Easy", gen: (rng) => vB2FCFSimple(rng, "Real 05 §1", "en")},
"real-05:1": {diff: "Easy", gen: (rng) => vB2Harvest(rng, "Real 05 §2", "en")},
"real-05:2": {diff: "Medium", gen: (rng) => vB2Wave5G(rng, "Real 05 §3", "en")},
"real-05:3": {diff: "Medium", gen: (rng) => vB2FCFYield(rng, "Real 05 §4", "en")},
"real-05:4": {diff: "Easy", gen: (rng) => vB2GapStance(rng, "Real 05 §5", "en")},
/* ---- real-06 (7) ---- */
"real-06:0": {diff: "Easy", gen: (rng) => vB2BankDCF(rng, "Real 06 §1", "en")},
"real-06:1": {diff: "Medium", gen: (rng) => vB2RI(rng, "Real 06 §2", "en")},
"real-06:2": {diff: "Medium", gen: (rng) => vB2JustPBV(rng, "Real 06 §3", "en")},
"real-06:3": {diff: "Easy", gen: (rng) => vB2NIMTrap(rng, "Real 06 §4", "en")},
"real-06:4": {diff: "Easy", gen: (rng) => vB2MktPrem(rng, "Real 06 §5", "en")},
"real-06:5": {diff: "Hard", gen: (rng) => vB2NIMStress(rng, "Real 06 §6", "en")},
"real-06:6": {diff: "Easy", gen: (rng) => vB2CleanSurplus(rng, "Real 06 §7", "en")},
/* ---- real-07 (10) ---- */
"real-07:0": {diff: "Easy", gen: (rng) => vB2SpinOff(rng, "Real 07 §1", "en")},
"real-07:1": {diff: "Easy", gen: (rng) => vB2Restated(rng, "Real 07 §2", "en")},
"real-07:2": {diff: "Medium", gen: (rng) => vB2MineLife(rng, "Real 07 §3", "en")},
"real-07:3": {diff: "Easy", gen: (rng) => vB2Reserves(rng, "Real 07 §4", "en")},
"real-07:4": {diff: "Medium", gen: (rng) => vB2SOTPEquity(rng, "Real 07 §5", "en")},
"real-07:5": {diff: "Easy", gen: (rng) => vB2RealOption(rng, "Real 07 §6", "en")},
"real-07:6": {diff: "Easy", gen: (rng) => vB2Consol15(rng, "Real 07 §7", "en")},
"real-07:7": {diff: "Easy", gen: (rng) => vB2NetCash(rng, "Real 07 §8", "en")},
"real-07:8": {diff: "Medium", gen: (rng) => vB2BinomP(rng, "Real 07 §9", "en")},
"real-07:9": {diff: "Hard", gen: (rng) => vB2BinomVal(rng, "Real 07 §10", "en")},
/* ---- real-08 (7) ---- */
"real-08:0": {diff: "Easy", gen: (rng) => vB2OneOff(rng, "Real 08 §1", "en")},
"real-08:1": {diff: "Medium", gen: (rng) => vB2Normalize(rng, "Real 08 §2", "en")},
"real-08:2": {diff: "Easy", gen: (rng) => vB2ProFormaRev(rng, "Real 08 §3", "en")},
"real-08:3": {diff: "Medium", gen: (rng) => vB2Implied100(rng, "Real 08 §4", "en")},
"real-08:4": {diff: "Medium", gen: (rng) => vB2StakeRp(rng, "Real 08 §5", "en")},
"real-08:5": {diff: "Medium", gen: (rng) => vB2SOTPPS(rng, "Real 08 §6", "en")},
"real-08:6": {diff: "Easy", gen: (rng) => vB2NegPE(rng, "Real 08 §7", "en")},
/* ---- real-09 (10) ---- */
"real-09:0": {diff: "Easy", gen: (rng) => vB2NegEquity(rng, "Real 09 §1", "en")},
"real-09:1": {diff: "Easy", gen: (rng) => vB2Creditor(rng, "Real 09 §2", "en")},
"real-09:2": {diff: "Easy", gen: (rng) => vB2WaterfallOrder(rng, "Real 09 §3", "en")},
"real-09:3": {diff: "Easy", gen: (rng) => vB2Frozen(rng, "Real 09 §4", "en")},
"real-09:4": {diff: "Easy", gen: (rng) => vB2DIP(rng, "Real 09 §5", "en")},
"real-09:5": {diff: "Easy", gen: (rng) => vB2Holdout(rng, "Real 09 §6", "en")},
"real-09:6": {diff: "Medium", gen: (rng) => vB2Recovery(rng, "Real 09 §7", "en")},
"real-09:7": {diff: "Medium", gen: (rng) => vB2Bleeding(rng, "Real 09 §8", "en")},
"real-09:8": {diff: "Medium", gen: (rng) => vB2Haircut(rng, "Real 09 §9", "en")},
"real-09:9": {diff: "Easy", gen: (rng) => vB2PKPU(rng, "Real 09 §10", "en")},
/* ---- real-10 (5) ---- */
"real-10:0": {diff: "Medium", gen: (rng) => vB2DSCR(rng, "Real 10 §1", "en")},
"real-10:1": {diff: "Medium", gen: (rng) => vB2WFDist(rng, "Real 10 §2", "en")},
"real-10:2": {diff: "Hard", gen: (rng) => vB2Sculpt(rng, "Real 10 §3", "en")},
"real-10:3": {diff: "Easy", gen: (rng) => vB2DSCRWatch(rng, "Real 10 §4", "en")},
"real-10:4": {diff: "Easy", gen: (rng) => vB2Tenor(rng, "Real 10 §5", "en")},
/* ---- real-11 (5) ---- */
"real-11:0": {diff: "Hard", gen: (rng) => vB2Combined(rng, "Real 11 §1", "en")},
"real-11:1": {diff: "Easy", gen: (rng) => vB2UWProfit(rng, "Real 11 §2", "en")},
"real-11:2": {diff: "Easy", gen: (rng) => vB2LIC(rng, "Real 11 §3", "en")},
"real-11:3": {diff: "Medium", gen: (rng) => vB2RBC(rng, "Real 11 §4", "en")},
"real-11:4": {diff: "Medium", gen: (rng) => vB2EVPS(rng, "Real 11 §5", "en")},
/* ---- real-12 (5) ---- */
"real-12:0": {diff: "Medium", gen: (rng) => vB2Cohort(rng, "Real 12 §1", "en")},
"real-12:1": {diff: "Medium", gen: (rng) => vB2LTVCAC(rng, "Real 12 §2", "en")},
"real-12:2": {diff: "Hard", gen: (rng) => vB2PaybackChurn(rng, "Real 12 §3", "en")},
"real-12:3": {diff: "Medium", gen: (rng) => vB2NRR(rng, "Real 12 §4", "en")},
"real-12:4": {diff: "Easy", gen: (rng) => vB2EVARR(rng, "Real 12 §5", "en")},
/* ---- hari-23 MOCK 1 (50) ---- */
"hari-23:0": {diff: "Easy", gen: (rng) => vB2RE(rng, "Day 23 §1", "en")},
"hari-23:1": {diff: "Easy", gen: (rng) => vB2TrailMachine(rng, "Day 23 §2", "en")},
"hari-23:2": {diff: "Easy", gen: (rng) => vB2AccrualSale(rng, "Day 23 §3", "en")},
"hari-23:3": {diff: "Easy", gen: (rng) => vB2DeprNoTax(rng, "Day 23 §4", "en")},
"hari-23:4": {diff: "Medium", gen: (rng) => vB2CFO(rng, "Day 23 §5", "en")},
"hari-23:5": {diff: "Medium", gen: (rng) => vB2CashBridge(rng, "Day 23 §6", "en")},
"hari-23:6": {diff: "Easy", gen: (rng) => vB2TrailDividend(rng, "Day 23 §7", "en")},
"hari-23:7": {diff: "Medium", gen: (rng) => vB2DefTaxProv(rng, "Day 23 §8", "en")},
"hari-23:8": {diff: "Easy", gen: (rng) => vB2WC(rng, "Day 23 §9", "en")},
"hari-23:9": {diff: "Easy", gen: (rng) => vB2Days(rng, "Day 23 §10", "en", "DSO")},
"hari-23:10": {diff: "Medium", gen: (rng) => vB2CCC(rng, "Day 23 §11", "en")},
"hari-23:11": {diff: "Medium", gen: (rng) => vB2CFOWC(rng, "Day 23 §12", "en")},
"hari-23:12": {diff: "Medium", gen: (rng) => vB2DPOExt(rng, "Day 23 §13", "en")},
"hari-23:13": {diff: "Medium", gen: (rng) => vB2FCFF(rng, "Day 23 §14", "en")},
"hari-23:14": {diff: "Medium", gen: (rng) => vB2CAPM(rng, "Day 23 §15", "en")},
"hari-23:15": {diff: "Medium", gen: (rng) => vB2WACC(rng, "Day 23 §16", "en")},
"hari-23:16": {diff: "Medium", gen: (rng) => vB2PVFCF(rng, "Day 23 §17", "en", 1)},
"hari-23:17": {diff: "Medium", gen: (rng) => vB2Gordon(rng, "Day 23 §18", "en")},
"hari-23:18": {diff: "Medium", gen: (rng) => vB2ExitTV(rng, "Day 23 §19", "en")},
"hari-23:19": {diff: "Medium", gen: (rng) => vB2EVPS(rng, "Day 23 §20", "en")},
"hari-23:20": {diff: "Medium", gen: (rng) => vB2PVTV(rng, "Day 23 §21", "en")},
"hari-23:21": {diff: "Hard", gen: (rng) => vB2CapexDepr(rng, "Day 23 §22", "en")},
"hari-23:22": {diff: "Medium", gen: (rng) => vB2Gordon(rng, "Day 23 §23", "en")},
"hari-23:23": {diff: "Easy", gen: (rng) => vB2EV(rng, "Day 23 §24", "en")},
"hari-23:24": {diff: "Medium", gen: (rng) => vB2MultPS(rng, "Day 23 §25", "en")},
"hari-23:25": {diff: "Medium", gen: (rng) => vB2CashPE(rng, "Day 23 §26", "en")},
"hari-23:26": {diff: "Medium", gen: (rng) => vB2Precedent(rng, "Day 23 §27", "en")},
"hari-23:27": {diff: "Medium", gen: (rng) => vB2DataTable(rng, "Day 23 §28", "en")},
"hari-23:28": {diff: "Medium", gen: (rng) => vB2Tornado(rng, "Day 23 §29", "en")},
"hari-23:29": {diff: "Medium", gen: (rng) => vB2Range(rng, "Day 23 §30", "en")},
"hari-23:30": {diff: "Medium", gen: (rng) => vB2MoICGrowth(rng, "Day 23 §31", "en")},
"hari-23:31": {diff: "Medium", gen: (rng) => vB2BEP(rng, "Day 23 §32", "en")},
"hari-23:32": {diff: "Medium", gen: (rng) => vB2PEAccr(rng, "Day 23 §33", "en")},
"hari-23:33": {diff: "Easy", gen: (rng) => vB2SynZero(rng, "Day 23 §34", "en")},
"hari-23:34": {diff: "Medium", gen: (rng) => vB2MixDeal(rng, "Day 23 §35", "en")},
"hari-23:35": {diff: "Hard", gen: (rng) => vB2NOLVal(rng, "Day 23 §36", "en")},
"hari-23:36": {diff: "Medium", gen: (rng) => vB2EquityNeeded(rng, "Day 23 §37", "en")},
"hari-23:37": {diff: "Easy", gen: (rng) => vB2Interest(rng, "Day 23 §38", "en")},
"hari-23:38": {diff: "Medium", gen: (rng) => vB2DebtFloor(rng, "Day 23 §39", "en")},
"hari-23:39": {diff: "Medium", gen: (rng) => vB2MoIC(rng, "Day 23 §40", "en")},
"hari-23:40": {diff: "Medium", gen: (rng) => vB2InterestCirc(rng, "Day 23 §41", "en")},
"hari-23:41": {diff: "Medium", gen: (rng) => vB2BudgetForecast(rng, "Day 23 §42", "en")},
"hari-23:42": {diff: "Medium", gen: (rng) => vB2VarVerdict(rng, "Day 23 §43", "en")},
"hari-23:43": {diff: "Medium", gen: (rng) => vB2PriceVar(rng, "Day 23 §44", "en")},
"hari-23:44": {diff: "Medium", gen: (rng) => vB2Rolling(rng, "Day 23 §45", "en")},
"hari-23:45": {diff: "Medium", gen: (rng) => vB2AbsRef(rng, "Day 23 §46", "en")},
"hari-23:46": {diff: "Medium", gen: (rng) => vB2IdxMatch(rng, "Day 23 §47", "en")},
"hari-23:47": {diff: "Medium", gen: (rng) => vB2XLookup2(rng, "Day 23 §48", "en")},
"hari-23:48": {diff: "Medium", gen: (rng) => vB2Sequence(rng, "Day 23 §49", "en", 5, 3)},
"hari-23:49": {diff: "Medium", gen: (rng) => vB2TaxFloor(rng, "Day 23 §50", "en")},
/* ---- hari-25 MOCK 2 (50) ---- */
"hari-25:0": {diff: "Easy", gen: (rng) => vB2RE(rng, "Day 25 §1", "en")},
"hari-25:1": {diff: "Easy", gen: (rng) => vB2TrailShares(rng, "Day 25 §2", "en")},
"hari-25:2": {diff: "Easy", gen: (rng) => vB2TrailInventory(rng, "Day 25 §3", "en")},
"hari-25:3": {diff: "Easy", gen: (rng) => vB2DeprNoTax(rng, "Day 25 §4", "en")},
"hari-25:4": {diff: "Medium", gen: (rng) => vB2CFO(rng, "Day 25 §5", "en")},
"hari-25:5": {diff: "Easy", gen: (rng) => vB2TrailDividend(rng, "Day 25 §6", "en")},
"hari-25:6": {diff: "Medium", gen: (rng) => vB2DefTaxDepr(rng, "Day 25 §7", "en")},
"hari-25:7": {diff: "Medium", gen: (rng) => vB2CashTieOut(rng, "Day 25 §8", "en")},
"hari-25:8": {diff: "Easy", gen: (rng) => vB2WC(rng, "Day 25 §9", "en")},
"hari-25:9": {diff: "Easy", gen: (rng) => vB2Days(rng, "Day 25 §10", "en", "DPO")},
"hari-25:10": {diff: "Medium", gen: (rng) => vB2CCC(rng, "Day 25 §11", "en")},
"hari-25:11": {diff: "Medium", gen: (rng) => vB2CFOWC(rng, "Day 25 §12", "en")},
"hari-25:12": {diff: "Medium", gen: (rng) => vB2DSOUp(rng, "Day 25 §13", "en")},
"hari-25:13": {diff: "Medium", gen: (rng) => vB2FCFF(rng, "Day 25 §14", "en")},
"hari-25:14": {diff: "Medium", gen: (rng) => vB2CAPM(rng, "Day 25 §15", "en")},
"hari-25:15": {diff: "Medium", gen: (rng) => vB2WACC(rng, "Day 25 §16", "en")},
"hari-25:16": {diff: "Medium", gen: (rng) => vB2PVFCF(rng, "Day 25 §17", "en", 2)},
"hari-25:17": {diff: "Medium", gen: (rng) => vB2Gordon(rng, "Day 25 §18", "en")},
"hari-25:18": {diff: "Medium", gen: (rng) => vB2ExitTV(rng, "Day 25 §19", "en")},
"hari-25:19": {diff: "Medium", gen: (rng) => vB2EVPS(rng, "Day 25 §20", "en")},
"hari-25:20": {diff: "Medium", gen: (rng) => vB2PVTV(rng, "Day 25 §21", "en")},
"hari-25:21": {diff: "Medium", gen: (rng) => vB2FCFFvsFCFE(rng, "Day 25 §22", "en")},
"hari-25:22": {diff: "Medium", gen: (rng) => vB2Gordon(rng, "Day 25 §23", "en")},
"hari-25:23": {diff: "Easy", gen: (rng) => vB2EV(rng, "Day 25 §24", "en")},
"hari-25:24": {diff: "Medium", gen: (rng) => vB2MultPS(rng, "Day 25 §25", "en")},
"hari-25:25": {diff: "Medium", gen: (rng) => vB2CashPE(rng, "Day 25 §26", "en")},
"hari-25:26": {diff: "Medium", gen: (rng) => vB2Precedent(rng, "Day 25 §27", "en")},
"hari-25:27": {diff: "Medium", gen: (rng) => vB2DataTable(rng, "Day 25 §28", "en")},
"hari-25:28": {diff: "Medium", gen: (rng) => vB2Tornado(rng, "Day 25 §29", "en")},
"hari-25:29": {diff: "Medium", gen: (rng) => vB2Range(rng, "Day 25 §30", "en")},
"hari-25:30": {diff: "Medium", gen: (rng) => vB2MoICGrowth(rng, "Day 25 §31", "en")},
"hari-25:31": {diff: "Medium", gen: (rng) => vB2BEP(rng, "Day 25 §32", "en")},
"hari-25:32": {diff: "Medium", gen: (rng) => vB2PEAccr(rng, "Day 25 §33", "en")},
"hari-25:33": {diff: "Medium", gen: (rng) => vB2SynCost(rng, "Day 25 §34", "en")},
"hari-25:34": {diff: "Medium", gen: (rng) => vB2MixDeal(rng, "Day 25 §35", "en")},
"hari-25:35": {diff: "Hard", gen: (rng) => vB2NOLVal(rng, "Day 25 §36", "en")},
"hari-25:36": {diff: "Medium", gen: (rng) => vB2EquityNeeded(rng, "Day 25 §37", "en")},
"hari-25:37": {diff: "Easy", gen: (rng) => vB2Interest(rng, "Day 25 §38", "en")},
"hari-25:38": {diff: "Medium", gen: (rng) => vB2DebtFloor(rng, "Day 25 §39", "en")},
"hari-25:39": {diff: "Medium", gen: (rng) => vB2MoIC(rng, "Day 25 §40", "en")},
"hari-25:40": {diff: "Medium", gen: (rng) => vB2InterestCirc(rng, "Day 25 §41", "en")},
"hari-25:41": {diff: "Medium", gen: (rng) => vB2BudgetLock(rng, "Day 25 §42", "en")},
"hari-25:42": {diff: "Medium", gen: (rng) => vB2VarVerdict(rng, "Day 25 §43", "en")},
"hari-25:43": {diff: "Medium", gen: (rng) => vB2PriceVar(rng, "Day 25 §44", "en")},
"hari-25:44": {diff: "Easy", gen: (rng) => vB2ZBB(rng, "Day 25 §45", "en")},
"hari-25:45": {diff: "Medium", gen: (rng) => vB2AbsRef(rng, "Day 25 §46", "en")},
"hari-25:46": {diff: "Medium", gen: (rng) => vB2IdxMatch(rng, "Day 25 §47", "en")},
"hari-25:47": {diff: "Medium", gen: (rng) => vB2XLookupApprox(rng, "Day 25 §48", "en")},
"hari-25:48": {diff: "Medium", gen: (rng) => vB2Sequence(rng, "Day 25 §49", "en", 12)},
"hari-25:49": {diff: "Medium", gen: (rng) => vB2DebtFormula(rng, "Day 25 §50", "en")},
/* ---- hari-28 MOCK 3 (50) ---- */
"hari-28:0": {diff: "Easy", gen: (rng) => vB2RE(rng, "Day 28 §1", "en")},
"hari-28:1": {diff: "Easy", gen: (rng) => vB2TrailLoanPay(rng, "Day 28 §2", "en")},
"hari-28:2": {diff: "Easy", gen: (rng) => vB2TrailSalary(rng, "Day 28 §3", "en")},
"hari-28:3": {diff: "Medium", gen: (rng) => vB2DeprTax(rng, "Day 28 §4", "en")},
"hari-28:4": {diff: "Medium", gen: (rng) => vB2CFO(rng, "Day 28 §5", "en")},
"hari-28:5": {diff: "Easy", gen: (rng) => vB2StockSplit(rng, "Day 28 §6", "en")},
"hari-28:6": {diff: "Medium", gen: (rng) => vB2DTANOL(rng, "Day 28 §7", "en")},
"hari-28:7": {diff: "Medium", gen: (rng) => vB2WrongStmt(rng, "Day 28 §8", "en")},
"hari-28:8": {diff: "Easy", gen: (rng) => vB2WC(rng, "Day 28 §9", "en")},
"hari-28:9": {diff: "Easy", gen: (rng) => vB2Days(rng, "Day 28 §10", "en", "DIO")},
"hari-28:10": {diff: "Medium", gen: (rng) => vB2CCC(rng, "Day 28 §11", "en")},
"hari-28:11": {diff: "Medium", gen: (rng) => vB2CFOWC(rng, "Day 28 §12", "en")},
"hari-28:12": {diff: "Medium", gen: (rng) => vB2DPOExt(rng, "Day 28 §13", "en")},
"hari-28:13": {diff: "Medium", gen: (rng) => vB2FCFF(rng, "Day 28 §14", "en")},
"hari-28:14": {diff: "Medium", gen: (rng) => vB2CAPM(rng, "Day 28 §15", "en")},
"hari-28:15": {diff: "Medium", gen: (rng) => vB2WACC(rng, "Day 28 §16", "en")},
"hari-28:16": {diff: "Medium", gen: (rng) => vB2PVFCF(rng, "Day 28 §17", "en", 3)},
"hari-28:17": {diff: "Medium", gen: (rng) => vB2Gordon(rng, "Day 28 §18", "en")},
"hari-28:18": {diff: "Medium", gen: (rng) => vB2ExitTV(rng, "Day 28 §19", "en")},
"hari-28:19": {diff: "Medium", gen: (rng) => vB2EVPS(rng, "Day 28 §20", "en")},
"hari-28:20": {diff: "Medium", gen: (rng) => vB2PVTV(rng, "Day 28 §21", "en")},
"hari-28:21": {diff: "Medium", gen: (rng) => vB2FCFFvsNI(rng, "Day 28 §22", "en")},
"hari-28:22": {diff: "Medium", gen: (rng) => vB2TVShare(rng, "Day 28 §23", "en")},
"hari-28:23": {diff: "Easy", gen: (rng) => vB2EV(rng, "Day 28 §24", "en")},
"hari-28:24": {diff: "Medium", gen: (rng) => vB2MultPS(rng, "Day 28 §25", "en")},
"hari-28:25": {diff: "Medium", gen: (rng) => vB2LTMNTM(rng, "Day 28 §26", "en")},
"hari-28:26": {diff: "Medium", gen: (rng) => vB2Precedent(rng, "Day 28 §27", "en")},
"hari-28:27": {diff: "Medium", gen: (rng) => vB2DataTable(rng, "Day 28 §28", "en")},
"hari-28:28": {diff: "Medium", gen: (rng) => vB2Tornado(rng, "Day 28 §29", "en")},
"hari-28:29": {diff: "Medium", gen: (rng) => vB2MoS(rng, "Day 28 §30", "en")},
"hari-28:30": {diff: "Hard", gen: (rng) => vB2ExitVsGrowth(rng, "Day 28 §31", "en")},
"hari-28:31": {diff: "Medium", gen: (rng) => vB2BEP(rng, "Day 28 §32", "en")},
"hari-28:32": {diff: "Medium", gen: (rng) => vB2PEDil(rng, "Day 28 §33", "en")},
"hari-28:33": {diff: "Medium", gen: (rng) => vB2CashDealAccr(rng, "Day 28 §34", "en")},
"hari-28:34": {diff: "Easy", gen: (rng) => vB2GoodwillTreat(rng, "Day 28 §35", "en")},
"hari-28:35": {diff: "Medium", gen: (rng) => vB2NOLSyn(rng, "Day 28 §36", "en")},
"hari-28:36": {diff: "Medium", gen: (rng) => vB2EquityNeeded2(rng, "Day 28 §37", "en")},
"hari-28:37": {diff: "Hard", gen: (rng) => vB2DebtTranches(rng, "Day 28 §38", "en")},
"hari-28:38": {diff: "Hard", gen: (rng) => vB2AmortSweep(rng, "Day 28 §39", "en")},
"hari-28:39": {diff: "Medium", gen: (rng) => vB2MoIC(rng, "Day 28 §40", "en")},
"hari-28:40": {diff: "Medium", gen: (rng) => vB2DivRecap(rng, "Day 28 §41", "en")},
"hari-28:41": {diff: "Medium", gen: (rng) => vB2FlexRole(rng, "Day 28 §42", "en")},
"hari-28:42": {diff: "Medium", gen: (rng) => vB2VarVerdict(rng, "Day 28 §43", "en")},
"hari-28:43": {diff: "Medium", gen: (rng) => vB2PriceVolVar(rng, "Day 28 §44", "en")},
"hari-28:44": {diff: "Medium", gen: (rng) => vB2Rolling(rng, "Day 28 §45", "en")},
"hari-28:45": {diff: "Medium", gen: (rng) => vB2AbsRef2(rng, "Day 28 §46", "en")},
"hari-28:46": {diff: "Easy", gen: (rng) => vB2VlookupNA(rng, "Day 28 §47", "en")},
"hari-28:47": {diff: "Medium", gen: (rng) => vB2Sumifs2(rng, "Day 28 §48", "en")},
"hari-28:48": {diff: "Easy", gen: (rng) => vB2LETAdv(rng, "Day 28 §49", "en")},
"hari-28:49": {diff: "Easy", gen: (rng) => vB2Iterative(rng, "Day 28 §50", "en")},
};


