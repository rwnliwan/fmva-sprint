/* FMVA Sprint — konten Fondasi (A, B, C) */
const LESSONS_FONDASI = [
{
id: "fondasi-a", track: "Fondasi", title: "Apa itu Financial Modeling?",
sub: "Fondasi A · ±2 jam · Konsep + contoh",
est: "2 jam",
sections: [
{h: "Definisi 1 kalimat", body: `
<p><b>Financial modeling</b> = membangun representasi matematis dari kinerja keuangan perusahaan di Excel, untuk menjawab pertanyaan bisnis tentang <b>masa depan</b>.</p>
<p>Bukan sekadar "bikin laporan". Laporan keuangan mencatat <b>masa lalu</b>. Model memproyeksikan <b>masa depan</b> — lalu dipakai untuk memutuskan: invest atau tidak? pinjam atau tidak? jual berapa?</p>`},
{h: "Siapa yang pakai?", body: `
<ul>
<li><b>Investment banking (IB)</b> — valuasi perusahaan, merger, IPO.</li>
<li><b>Credit analyst / risk</b> — menilai kemampuan bayar utang debitur. <i>(Ini jalurmu.)</i></li>
<li><b>FP&A (corporate)</b> — budgeting & forecasting perusahaan.</li>
<li><b>Private equity</b> — model LBO: beli perusahaan pakai utang, jual 5 tahun lagi.</li>
<li><b>Founder</b> — proyeksi cash runway startup.</li>
</ul>`},
{h: "5 jenis model yang wajib dikenal", body: `
<table class="brutal">
<tr><th>Model</th><th>Pertanyaan yang dijawab</th><th>Kapan dipakai</th></tr>
<tr><td><b>3-Statement</b></td><td>Bagaimana laba, neraca, dan kas 5 tahun ke depan?</td><td>Fondasi SEMUA model</td></tr>
<tr><td><b>DCF</b></td><td>Berapa nilai wajar perusahaan hari ini?</td><td>Valuasi</td></tr>
<tr><td><b>Comps</b></td><td>Berapa harga wajar vs kompetitor?</td><td>Valuasi cepat</td></tr>
<tr><td><b>LBO</b></td><td>Berapa return kalau beli pakai utang?</td><td>Private equity</td></tr>
<tr><td><b>Budget/Forecast</b></td><td>Berapa target tahun depan?</td><td>Korporat</td></tr>
</table>
<p>Urutan belajarmu mengikuti tabel ini dari atas ke bawah.</p>`},
{h: "Anatomi model yang bagus", body: `
<p>Setiap model profesional punya 3 lapisan terpisah:</p>
<ol>
<li><b>INPUTS</b> — asumsi (growth, margin, capex). Sel biru. Satu-satunya tempat angka diketik.</li>
<li><b>PROCESS</b> — rumus perhitungan. Sel hitam. Tidak ada angka ketik di sini.</li>
<li><b>OUTPUTS</b> — ringkasan: valuasi, grafik, dashboard.</li>
</ol>
<div class="callout"><b>Kenapa harus dipisah?</b> Karena asumsi BERUBAH (growth 8% jadi 12%), rumus TIDAK. Kalau tercampur, setiap ganti asumsi kamu harus bedah rumus satu per satu — 3 bulan lagi kamu tidak ingat angka 1.05 di <code>=B5*1.05</code> itu apa. Model yang bagus: ubah 1 sel biru, seluruh output ikut berubah otomatis. Itu juga yang bikin model bisa diaudit orang lain.</div>
<div class="example jebakan"><div class="lbl">🚫 Jebakan pemula</div>
<p>Mengetik angka langsung di dalam rumus, mis. <code>=B5*1.05</code>. Angka 1.05 itu "hardcode" — 3 bulan lagi kamu lupa itu angka apa. Selalu taruh di sel input: <code>=B5*Growth</code>.</p></div>`},
{h: "Contoh: warung vs korporat", body: `
<div class="example warung"><div class="lbl">🏪 Versi warung</div>
<p>"Bulan depan omzet naik 10%, berapa kas akhir bulan?" — Itu financial modeling. Inputs: omzet, belanja, sewa. Process: hitung. Output: kas akhir.</p></div>
<div class="example korporat"><div class="lbl">🏢 Versi korporat</div>
<p>"Kalau Unilever Indonesia tumbuh 5%/tahun 5 tahun ke depan dengan margin 20%, berapa nilai wajar sahamnya hari ini?" — Itu DCF. Struktur berpikirnya SAMA dengan warung, hanya skalanya beda.</p></div>`},
{h: "🔥 Bekal Hell Mode", body: `
<p>Istilah yang dipakai soal Hell Mode — dibaca 3 menit sebelum tempur:</p>
<ul>
<li><b>Margin (net margin)</b> = laba bersih ÷ pendapatan. Ukuran efisiensi: dari tiap Rp100 jualan, berapa jadi laba.</li>
<li><b>CFO</b> = <i>cash flow from operations</i>, kas yang dihasilkan aktivitas operasi inti.</li>
<li><b>Working capital</b> = aset lancar − liabilitas lancar. Piutang & persediaan yang membengkak = kas tertahan di sini.</li>
<li><b>WACC</b> = <i>weighted average cost of capital</i>, rata-rata tertimbang biaya modal. Dipakai sebagai <b>discount rate</b> (tingkat diskonto) di DCF.</li>
<li><b>Sensitivitas</b> = seberapa besar output berubah saat satu asumsi diubah. Sensitivitas tinggi = asumsi itu harus ekstra akurat.</li>
</ul>`}
],
quiz: [
{q: "Apa perbedaan utama laporan keuangan vs financial model?", opts: ["Laporan mencatat masa lalu, model memproyeksikan masa depan","Laporan dibuat analis, model dibuat oleh akuntan","Laporan untuk urusan pajak, model untuk investor","Keduanya sama-sama proyeksi, hanya beda formatnya"], answer: 0, k: "model_3_statement",
 hints: ["Pikirkan arah waktunya: satu mencatat, satu memproyeksikan.", "Laporan = sudah terjadi. Model = skenario ke depan."],
 explain: "Laporan keuangan mencatat masa lalu; model memproyeksikan masa depan untuk pengambilan keputusan."},
{q: "Model apa yang menjadi fondasi semua model valuasi?", opts: ["LBO","Comps","3-Statement","Budget forecast"], answer: 2, k: "model_3_statement",
 hints: ["Model ini menghubungkan laba rugi, neraca, dan arus kas.", "Namanya menyebut angka 3."],
 explain: "3-Statement adalah fondasi — DCF, LBO, dan M&A semuanya dibangun di atasnya."},
{q: "Di mana angka asumsi boleh diketik dalam model profesional?", opts: ["Di dalam rumus, asal diberi komentar","Hanya di sel input (biru)","Di sheet output, dekat hasilnya","Di mana saja asalkan rapi"], answer: 1, k: "hardcode_rule",
 hints: ["Aturan #1: tidak ada hardcode dalam rumus.", "Ada 3 lapisan: inputs, process, outputs."],
 explain: "Angka hanya di sel input (biru). Rumus hanya me-referensi, tidak mengetik angka."},
{q: "Credit analyst memakai model terutama untuk menilai…", opts: ["Harga wajar saham perusahaan","Besar bonus manajemen","Efisiensi pajak perusahaan","Kemampuan debitur membayar utang"], answer: 3, k: "analis_kredit",
 hints: ["Kata 'credit' berkaitan dengan pinjaman.", "Risiko yang dinilai = gagal bayar."],
 explain: "Credit analyst menilai kemampuan bayar utang — proyeksi arus kas vs kewajiban."},
{q: "Startup rintisan belum punya revenue. Model apa yang PALING dibutuhkan founder-nya saat ini?", opts: ["DCF untuk valuasi IPO","Budget forecast: berapa bulan kas bertahan","LBO untuk akuisisi","Comps vs kompetitor"], answer: 1, k: "budget_forecast",
 hints: ["Founder butuh tahu kapan kas habis.", "Lihat tabel 5 jenis model: kapan dipakai?"],
 explain: "Budget forecast: runway kas = nyawa startup. DCF/LBO butuh arus kas stabil yang belum ada."}
],
audio: "assets/audio/fondasi-a.mp3",
hellPass: 80,
hell: [
{q: "Model startup punya hardcode di 40% rumus. Investor minta ubah asumsi growth 8% → 12%. Risiko terbesar?", opts: ["Perhitungan melambat tapi hasil tetap benar","Hasil tidak konsisten: sebagian rumus ikut berubah, sebagian tidak","Ukuran file membesar sehingga sulit dibuka","Tidak ada risiko selama angka awalnya benar"], answer: 1,
 explain: "Hardcode = sebagian rumus pakai angka lama yang tertinggal. Keputusan dibuat dari angka yang salah tanpa disadari."},
{q: "PT A: revenue 100, NI 5. PT B: revenue 60, NI 12. Sebagai credit analyst untuk pinjaman 1 tahun, mana lebih menarik?", opts: ["A, karena pendapatannya lebih besar","Keduanya sama menariknya","Tidak bisa dinilai tanpa laporan arus kas","B, karena margin labanya lebih tebal"], answer: 3,
 explain: "B: net margin 20% vs 5%. Margin tebal = bantalan lebih besar saat kondisi memburuk — yang dinilai credit analyst."},
{q: "Model 3 tahun: laba naik terus, tapi CFO negatif terus. Diagnosis paling mungkin?", opts: ["Perusahaan menahan belanja modal terlalu hemat","Laba tertahan di working capital: piutang/persediaan membengkak","Beban pajak yang dibayar ternyata terlalu kecil","Beban depresiasi yang dicatat terlalu besar"], answer: 1,
 explain: "Laba tanpa kas = red flag klasik. Uang terjebak di piutang (pelanggan belum bayar) atau persediaan menumpuk."},
{q: "DCF-mu menghasilkan nilai Rp10.000/saham, harga pasar Rp6.000. Kesimpulan tepat?", opts: ["Beli sebanyak-banyaknya, pasar pasti salah","Jual sahamnya sebelum turun","Cek ulang asumsi; model bisa salah","Abaikan model, ikut harga pasar"], answer: 2,
 explain: "Selisih besar = undangan untuk mengaudit asumsi sendiri, bukan perintah beli. Analis bagus curiga pada modelnya sendiri."},
{q: "Analis menurunkan discount rate 10% → 8%, nilai perusahaan naik 40%. Ini menunjukkan…", opts: ["Valuasi sensitif ke WACC; asumsi WACC harus ekstra hati-hati","Modelnya rusak total dan harus dibuang","Discount rate tidak berpengaruh ke hasil valuasi","Selalu pakai 8% agar valuasinya tinggi"], answer: 0,
 explain: "Sensitivitas tinggi ke WACC berarti kesalahan kecil di WACC = kesalahan besar di valuasi. WACC layak dapat jam kerja terbanyak."}
],
blind: {h: "Uji Kilat — angka beda", body: `
<p><b>1.</b> Warung: omzet tahun ini Rp800jt. Asumsi growth 15% (di sel input biru bernama <i>Growth</i>). Berapa proyeksi omzet tahun depan, dan bagaimana rumus yang benar?</p>
<details class="ans"><summary>Jawaban</summary>
<p>800 × (1 + 15%) = <b>Rp920jt</b>. Rumus: <code>=Omzet*(1+Growth)</code> — angka 15% TIDAK diketik di dalam rumus.</p>
<p><i>Kenapa?</i> Kalau growth berubah jadi 20%, kamu ubah 1 sel biru dan semua proyeksi ikut berubah. Rumus <code>=800*1.15</code> memaksa kamu berburu angka di setiap sel.</p>
</details>
<p><b>2.</b> Debitur: laba Rp2M dua tahun berturut-turut, tapi CFO −Rp500jt di kedua tahun itu. Sebagai credit analyst, apa sinyalnya?</p>
<details class="ans"><summary>Jawaban</summary>
<p><b>Red flag.</b> Laba tanpa kas = uang tertahan di working capital (piutang membengkak atau persediaan menumpuk). Kemampuan bayar utang diragukan meski "untung" di kertas — analis kredit menilai kas, bukan laba.</p>
</details>`}
},
{
id: "fondasi-b", track: "Fondasi", title: "Akuntansi dari Nol",
dksim: true, dksimAfter: 2, // simulator debit/kredit setelah seksi "Debit & kredit tanpa hafalan"
sub: "Fondasi B · ±3 jam · Bahasa akuntansi",
est: "3 jam",
sections: [
{h: "5 akun, tidak lebih", body: `
<p>Seluruh akuntansi hanya punya <b>5 jenis akun</b>:</p>
<table class="brutal">
<tr><th>Akun (Account)</th><th>English</th><th>Contoh</th></tr>
<tr><td><b>Aset</b></td><td>Asset</td><td>Kas, piutang, persediaan, mesin</td></tr>
<tr><td><b>Liabilitas</b></td><td>Liability</td><td>Utang usaha, utang bank</td></tr>
<tr><td><b>Ekuitas</b></td><td>Equity</td><td>Modal pemilik, laba ditahan</td></tr>
<tr><td><b>Pendapatan</b></td><td>Revenue</td><td>Penjualan</td></tr>
<tr><td><b>Beban</b></td><td>Expense</td><td>Gaji, sewa, HPP</td></tr>
</table>`},
{h: "Persamaan yang mengatur segalanya", body: `
<div class="formula">Aset = Liabilitas + Ekuitas</div>
<p>Setiap transaksi menyentuh minimal 2 akun dan persamaan ini <b>tidak pernah</b> boleh rusak. Kalau rusak, ada yang salah catat.</p>
<div class="example warung"><div class="lbl">🏪 Contoh</div>
<p>Septian setor modal Rp10jt tunai → Kas (aset) +10jt, Modal (ekuitas) +10jt. Cek: 10 = 0 + 10 ✓</p>
<p>Beli stok Rp3jt utang supplier → Persediaan (aset) +3jt, Utang usaha (liabilitas) +3jt. Cek: 13 = 3 + 10 ✓</p></div>
<div class="callout"><b>Kenapa persamaan ini tidak pernah rusak?</b> Karena setiap transaksi adalah PERTUKARAN: kamu dapat sesuatu, kamu kasih sesuatu. Terima kas → kasih saham (kas naik, modal naik). Ambil stok → janji bayar nanti (stok naik, utang naik). Tidak ada "dapat gratis" dalam akuntansi — selalu ada dua sisi. Itu sebabnya setiap jurnal menyentuh minimal 2 akun, dan persamaan selalu balance.</div>`},
{h: "Debit & kredit tanpa hafalan", body: `
<p>Lupakan "debit kiri kredit kanan" sebagai hafalan. Pakai logika kantung:</p>
<ul>
<li><b>Aset & Beban</b> = kantung <b>bertambah saat di-DEBIT</b>.</li>
<li><b>Liabilitas, Ekuitas, Pendapatan</b> = kantung <b>bertambah saat di-KREDIT</b>.</li>
</ul>
<p>Atau lebih sederhana: <b>total debit selalu = total kredit</b> di setiap jurnal. Itu saja.</p>
<div class="callout"><b>Kenapa aturannya begitu? (bukan hafalan)</b> Mulai dari persamaan: <b>Aset = Liabilitas + Ekuitas</b>. "Debit" = sisi KIRI persamaan, "Kredit" = sisi KANAN. Aset ada di kiri → bertambah saat di-debit. Liabilitas & ekuitas ada di kanan → bertambah saat di-kredit. Pendapatan menambah ekuitas (kanan) → bertambah saat di-kredit. Beban MENGURANGI ekuitas → bergerak berlawanan: bertambah saat di-debit. Tidak ada yang perlu dihafal — semua turun dari satu persamaan.</div>
<div class="example korporat"><div class="lbl">🏢 Contoh jurnal</div>
<p>Bayar gaji Rp5jt tunai: Debit Beban gaji 5jt (beban bertambah) — Kredit Kas 5jt (aset berkurang). Total debit 5jt = total kredit 5jt ✓</p></div>`},
{h: "Laba ditahan: jembatan ke modeling", body: `
<div class="formula">Laba Ditahan(akhir) = Laba Ditahan(awal) + Laba Bersih − Dividen</div>
<p><b>Laba ditahan (retained earnings)</b> adalah akumulasi laba yang tidak dibagikan. Inilah <b>jembatan pertama</b> antara laporan laba rugi dan neraca — dan akan kamu pakai di setiap model.</p>
<div class="callout"><b>Kenapa dividen tidak lewat laba rugi?</b> Karena dividen BUKAN biaya. Beban = pengorbanan untuk <b>menghasilkan</b> pendapatan (gaji, sewa, HPP) — terjadi <i>sebelum</i> laba dihitung. Dividen = <b>pembagian hasil</b> ke pemilik — diputuskan <i>setelah</i> laba diketahui. Analogi warung: untung Rp5jt, kamu ambil Rp2jt buat belanja pribadi. Itu bukan "biaya warung" — warungnya tetap untung 5jt. Kalau dividen dicatat sebagai beban, laba jadi Rp3jt: menyesatkan, seolah bisnisnya kurang untung. Jurnalnya: Debit Laba ditahan 2jt — Kredit Kas 2jt. IS tidak tersentuh sama sekali. Untuk modeling ini penting: analis menilai <b>kinerja operasi</b> dari IS; dividen adalah <b>keputusan pembagian</b>, bukan kinerja. Campur keduanya = salah baca perusahaan.</div>`},
{h: "Istilah yang sering menipu pemula", body: `
<ul>
<li><b>Laba ≠ kas.</b> Laba Rp5jt tapi kas bisa nol (uangnya nyangkut di piutang).
<br><i>Kenapa?</i> Akuntansi mencatat saat <b>kejadian ekonomi</b> terjadi (barang diserahkan), bukan saat kas bergerak. Investor mau tahu kinerja periode ini — bukan kapan kasnya mampir.</li>
<li><b>Pendapatan ≠ penerimaan kas.</b> Jualan kredit Rp10jt = pendapatan hari ini, kasnya bulan depan.
<br><i>Kenapa?</i> Pendapatan diakui saat <b>diperoleh</b> (barang/jasa diserahkan). Kalau menunggu kas, perusahaan kredit kelihatan tidak pernah jualan.</li>
<li><b>Beban ≠ pengeluaran kas.</b> Penyusutan Rp400rb mengurangi laba tapi tidak mengeluarkan kas.
<br><i>Kenapa?</i> Prinsip <b>matching</b>: biaya diakui di periode yang sama dengan pendapatan yang dibantunya. Mesin Rp120jt dipakai 6 tahun → bebannya Rp20jt/tahun. Kalau Rp120jt langsung dibebankan tahun beli, tahun itu rugi besar padahal mesinnya dipakai 6 tahun — menyesatkan.</li>
<li><b>Dividen bukan beban.</b> Dividen mengurangi laba ditahan langsung, tidak lewat laba rugi.
<br><i>Kenapa?</i> Lihat bagian Laba ditahan di atas: dividen = pembagian hasil ke pemilik, bukan biaya menghasilkan pendapatan.</li>
</ul>`},
{h: "FIFO vs LIFO: persediaan sama, laba beda", body: `
<p>Persediaan yang sama bisa menghasilkan laba yang <b>beda</b> — tergantung <i>urutan</i> mana yang dianggap terjual dulu:</p>
<p><b>Contoh kerja (ilustrasi dinyatakan):</b> beli 100 unit @ Rp10rb, lalu 100 unit @ Rp12rb. Jual 100 unit @ Rp20rb (revenue Rp2.000rb).</p>
<table class="brutal">
<tr><th>(Rp ribu)</th><th>FIFO</th><th>LIFO</th></tr>
<tr><td>COGS (100 unit terjual)</td><td>100 × 10 = <b>1.000</b> (yang lama dulu)</td><td>100 × 12 = <b>1.200</b> (yang baru dulu)</td></tr>
<tr><td>Laba kotor</td><td>2.000 − 1.000 = <b>1.000</b></td><td>2.000 − 1.200 = <b>800</b></td></tr>
<tr><td>Pajak 22%</td><td><b>220</b></td><td><b>176</b></td></tr>
<tr><td>Laba bersih</td><td><b>780</b></td><td><b>624</b></td></tr>
<tr><td>Persediaan akhir (100 unit sisa)</td><td><b>1.200</b> (harga baru)</td><td><b>1.000</b> (harga lama)</td></tr>
</table>
<p>Saat harga <b>naik</b> (inflasi): LIFO → laba lebih kecil, pajak lebih kecil (hemat Rp44rb di sini), persediaan akhir dinilai harga lama. FIFO → laba lebih besar, pajak lebih besar, persediaan akhir mendekati harga pasar.</p>
<p><b>Aturan yang wajib diingat:</b> <b>PSAK 14 (IAS 2) MELARANG LIFO</b> — di Indonesia, untuk persediaan yang dapat dipertukarkan, hanya FIFO atau rata-rata tertimbang (specific identification tetap berlaku untuk persediaan yang tidak dapat dipertukarkan). LIFO hanya hidup di US GAAP. Jadi di laporan emiten Indonesia kamu akan ketemu FIFO/rata-rata — tapi kamu <i>wajib</i> paham LIFO karena soal exam dan peer AS memakainya.</p>
<div class="callout"><b>Kenapa pilihan ini penting buat analis?</b> Karena dua perusahaan dengan transaksi <i>identik</i> bisa melaporkan laba beda 25% (780 vs 624) hanya karena metode persediaan. Membandingkan margin antar perusahaan tanpa mengecek metodenya = membandingkan apel dengan jeruk. Cek catatan kebijakan akuntansi dulu — selalu.</div>`},
{h: "🔥 Bekal Hell Mode", body: `
<p>Istilah yang dipakai soal Hell Mode:</p>
<ul>
<li><b>Garis lurus</b> = depresiasi dibagi rata tiap tahun (120jt ÷ 6 tahun = 20jt/tahun).</li>
<li><b>Saldo menurun</b> = depresiasi besar di awal, mengecil kemudian. Beban awal lebih besar → laba awal lebih kecil.</li>
<li><b>Non-kas</b> = beban yang tidak mengeluarkan kas (depresiasi). Di arus kas ditambahkan kembali (<i>add-back</i>).</li>
</ul>`}
],
quiz: [
{q: "Warung punya aset Rp50jt dan liabilitas Rp20jt. Ekuitasnya?", opts: ["Rp70jt","Rp20jt","Rp30jt","Rp50jt"], answer: 2, k: "persamaan_akuntansi",
 hints: ["Pakai persamaan: Aset = Liabilitas + Ekuitas.", "50 = 20 + ?"],
 explain: "Ekuitas = Aset − Liabilitas = 50 − 20 = Rp30jt."},
{q: "Bayar sewa Rp2jt tunai. Jurnal yang benar?", opts: ["Debit Kas, Kredit Beban sewa","Debit Beban sewa, Kredit Kas","Debit Utang, Kredit Kas","Debit Kas, Kredit Modal"], answer: 1, k: "jurnal",
 hints: ["Beban bertambah saat di-debit. Kas (aset) berkurang saat di-kredit.", "Total debit harus = total kredit."],
 explain: "Beban sewa (beban) bertambah → debit. Kas (aset) berkurang → kredit."},
{q: "Mana yang BENAR?", opts: ["Laba dan kas selalu bergerak sama","Dividen dicatat sebagai beban","Jual kredit menambah kas hari ini","Susut mengurangi laba, kas tidak keluar"], answer: 3, k: "beban_non_kas",
 hints: ["Tiga pernyataan pertama adalah jebakan klasik.", "Pikirkan: apakah penyusutan mengeluarkan uang?"],
 explain: "Penyusutan adalah beban non-kas — mengurangi laba tanpa mengeluarkan kas."},
{q: "Laba ditahan awal Rp8jt, laba bersih Rp5jt, dividen Rp2jt. Laba ditahan akhir?", opts: ["Rp11jt","Rp13jt","Rp15jt","Rp5jt"], answer: 0, k: "laba_ditahan",
 hints: ["Rumus: awal + laba bersih − dividen.", "8 + 5 − 2 = ?"],
 explain: "8 + 5 − 2 = Rp11jt."},
{q: "Terima pinjaman bank Rp20jt tunai. Sisi mana dari A = L + E yang berubah?", opts: ["Aset +20, Ekuitas +20","Aset +20, Liabilitas +20","Liabilitas +20, Ekuitas −20","Tidak ada yang berubah"], answer: 1, k: "persamaan_akuntansi",
 hints: ["Kas masuk = aset naik. Pinjaman = ?", "Utang itu liabilitas atau ekuitas?"],
 explain: "Kas (aset) +20, utang bank (liabilitas) +20. Ekuitas tidak tersentuh — pinjaman bukan modal pemilik."},
{q: "Harga naik. LIFO vs FIFO: laba bersih & pajak?", opts: ["Laba & pajak lebih BESAR","Laba & pajak lebih KECIL","Laba sama, pajak beda","Tidak ada bedanya"], answer: 1, k: "fifo_lifo", diff: "Medium",
 hints: ["LIFO menjual yang BARU (mahal) dulu → COGS lebih besar.","COGS 1.200 vs 1.000 → laba 624 vs 780."],
 explain: "LIFO: COGS 1.200 → laba 624, pajak 176. FIFO: laba 780, pajak 220. Saat harga naik, LIFO menekan laba & pajak."}
],
audio: "assets/audio/fondasi-b.mp3",
hellPass: 80,
hell: [
{q: "Jual kredit Rp50jt dicatat: Debit Piutang, Kredit Pendapatan. Bulan depan pelanggan bayar lunas. Jurnalnya?", opts: ["Debit Pendapatan, Kredit Kas","Debit Kas, Kredit Piutang","Debit Kas, Kredit Pendapatan","Tidak ada jurnal"], answer: 1,
 explain: "Pendapatan sudah diakui bulan lalu. Saat bayar: aset bertukar bentuk — kas naik, piutang turun."},
{q: "Neraca: Aset 100, Liabilitas 60. Tahun ini rugi 10, tidak ada setoran/penarikan modal. Ekuitas baru?", opts: ["40","50","30","60"], answer: 2,
 explain: "Ekuitas awal 40. Rugi 10 → 30. Cek: aset ikut turun 10 (90) = 60 + 30 ✓"},
{q: "Dividen Rp5jt diumumkan dan dibayar tunai. Efek ke 3 laporan?", opts: ["IS turun 5jt; BS dan CFS tetap","IS tetap; BS: kas −5, RE −5; CFS: −5 pendanaan","IS tetap; CFS: −5 di operasi","BS tidak berubah sama sekali"], answer: 1,
 explain: "Dividen bukan beban — tidak menyentuh IS. Langsung mengurangi kas dan laba ditahan; di CFS masuk pendanaan."},
{q: "Beli mesin Rp120jt tunai, umur 6 tahun, garis lurus. Beban tahun 1 dan efek ke laba vs kas?", opts: ["Beban 120jt; laba dan kas turun 120jt","Tidak ada beban di tahun pertama","Beban 20jt; laba turun, kas tidak keluar","Beban 20jt; kas ikut turun 20jt"], answer: 2,
 explain: "120/6 = 20jt beban/tahun. Kas sudah keluar saat beli (tahun 0). Tahun 1: laba turun 20jt, kas tidak bergerak."},
{q: "Transaksi mana yang MERUSAK persamaan akuntansi bila dicatat seperti ini?", opts: ["Beli stok tunai: Debit Persediaan, Kredit Kas","Bayar gaji: Debit Beban gaji, Kredit Kas","Terima modal: Debit Kas, Kredit Modal","Catat beban gaji tanpa sisi kreditnya"], answer: 3,
 explain: "Double entry rusak bila hanya satu sisi dicatat. Tiga lainnya balance sempurna."}
],
blind: {h: "Uji Kilat — angka beda", body: `
<p><b>1.</b> Toko: aset Rp120jt, liabilitas Rp45jt. Berapa ekuitasnya?</p>
<details class="ans"><summary>Jawaban</summary>
<p>Ekuitas = 120 − 45 = <b>Rp75jt</b>. Cek: 120 = 45 + 75 ✓</p>
<p><i>Kenapa selalu bisa dicek?</i> Setiap transaksi adalah pertukaran dua sisi, jadi persamaan A = L + E tidak pernah rusak. Kalau rusak, jurnalmu yang salah — bukan persamaannya.</p>
</details>
<p><b>2.</b> Diterima jasa Rp8jt TUNAI. Jurnal yang benar?</p>
<details class="ans"><summary>Jawaban</summary>
<p><b>Debit Kas 8jt — Kredit Pendapatan 8jt.</b> Kas (aset, sisi kiri) bertambah → debit. Pendapatan menambah ekuitas (sisi kanan) → kredit.</p>
<p><i>Kenapa bukan sebaliknya?</i> Ikuti posisi di persamaan: kiri bertambah = debit, kanan bertambah = kredit. Tidak perlu dihafal.</p>
</details>`}
},
{
id: "fondasi-c", track: "Fondasi", title: "Excel untuk Modeling",
sub: "Fondasi C · ±3 jam · Aturan main + fungsi wajib",
est: "3 jam",
sections: [
{h: "5 aturan main (non-negotiable)", body: `
<ol>
<li><b>Tidak ada hardcode dalam rumus.</b> Angka asumsi di sel input biru; rumus hanya referensi.</li>
<li><b>Satu rumus per baris, copy ke kanan.</b> Rumus kolom 2027 harus identik dengan 2026.</li>
<li><b>Warna konsisten:</b> biru = input/ketik, hitam = rumus, hijau = link antar-sheet, merah = peringatan.</li>
<li><b>Struktur sheet:</b> <code>Assumptions</code> → <code>IS</code> → <code>BS</code> → <code>CFS</code> → <code>Schedules</code> → <code>Output</code>.</li>
<li><b>Balance check di setiap model:</b> <code>=IF(Aset=Liabilitas+Ekuitas,"OK","ERROR")</code> harus OK di semua kolom.</li>
</ol>`},
{h: "10 fungsi wajib modeling", body: `
<p>Detail lengkap tiap fungsi ada di menu <b>Fungsi Excel</b>. Yang paling sering dipakai:</p>
<ul>
<li><code>IF</code> — logika ("kalau rugi, pajak nol")</li>
<li><code>SUMIFS</code> — menjumlah dengan kriteria</li>
<li><code>XLOOKUP / INDEX+MATCH</code> — mengambil data (lebih aman dari VLOOKUP)</li>
<li><code>NPV</code> & <code>IRR</code> — inti valuasi DCF</li>
<li><code>PMT</code> — cicilan utang</li>
<li><code>IFERROR</code> — model tidak boleh menampilkan #DIV/0!</li>
<li><code>EOMONTH / YEARFRAC</code> — tanggal & periode</li>
<li><code>ROUND</code> — hindari error pembulatan Rp1</li>
</ul>`},
{h: "Pola rumus yang akan dipakai tiap hari", body: `
<div class="formula">Pendapatan(t) = Pendapatan(t-1) × (1 + Growth)</div>
<p>Growth diambil dari sel input biru. Copy rumus ini ke kanan untuk 5 tahun proyeksi — tidak ada yang berubah kecuali kolomnya.</p>
<div class="formula">=IF(LabaBersih&lt;0, 0, LabaBersih*TarifPajak)</div>
<p>Pola "kalau rugi tidak bayar pajak" — dipakai di hampir setiap model.</p>`},
{h: "Audit model 2 menit", body: `
<ul>
<li><b>Ctrl + &#96;</b> (backtick) — tampilkan semua rumus sekaligus. Scan: ada angka ketik di dalam rumus? → hardcode, perbaiki.</li>
<li><b>F2</b> pada sel — lihat sel referensi berwarna. Pastikan tidak menunjuk sel yang salah.</li>
<li><b>Trace Precedents</b> — lacak dari mana angka ini berasal. Angka tanpa sumber = curiga.</li>
<li><b>Cek balance</b> — "OK" di semua tahun? Satu "ERROR" = model belum boleh dipakai.</li>
</ul>`},
{h: "🔥 Bekal Hell Mode", body: `
<p>Istilah yang dipakai soal Hell Mode:</p>
<ul>
<li><b>Absolute reference ($)</b> = referensi yang dikunci, tidak bergeser saat di-copy. <code>$C$2</code> kunci kolom & baris; <code>$C2</code> kunci kolom saja.</li>
<li><b>Debt schedule</b> = jadwal utang: saldo awal → bunga → cicilan pokok → saldo akhir, per periode.</li>
<li><b>Circular reference</b> = rumus A butuh hasil B, tapi B butuh hasil A. Excel tidak bisa hitung — harus diputus.</li>
<li><b>XLOOKUP</b> = fungsi lookup modern (lihat menu Fungsi Excel). Gagal lookup = error, bukan nol.</li>
</ul>`}
],
quiz: [
{q: "Rumus =B5*1.05 di sel proyeksi. Masalahnya?", opts: ["Tidak ada masalah, rumusnya jalan","Seharusnya pakai fungsi SUM","Hardcode: 1.05 harus di sel input","Referensi B5-nya keliru"], answer: 2, k: "hardcode_rule",
 hints: ["Aturan #1 modeling tentang angka dalam rumus.", "3 bulan lagi, kamu masih ingat 1.05 itu apa?"],
 explain: "1.05 adalah hardcode — harusnya di sel input biru bernama, mis. =B5*(1+Growth)."},
{q: "Warna standar sel input dalam modeling?", opts: ["Merah","Biru","Hijau","Kuning"], answer: 1, k: "hardcode_rule",
 hints: ["Warna yang berarti 'ketik di sini'.", "Hitam = rumus."],
 explain: "Biru = input/ketik manual. Hitam = rumus. Hijau = link antar-sheet."},
{q: "Fungsi untuk menghitung cicilan utang tiap periode?", opts: ["PMT","NPV","IRR","SUMIFS"], answer: 0, k: "debt_schedule",
 hints: ["PMT = payment.", "Dipakai di debt schedule."],
 explain: "PMT menghitung pembayaran periodik (pokok + bunga) pinjaman."},
{q: "Balance check menunjukkan ERROR di tahun 2028. Artinya?", opts: ["Model tetap bisa dipakai seperti biasa","Itu normal di tahun proyeksi","Hapus saja balance check-nya","Ada yang salah — perbaiki sebelum dipakai"], answer: 3, k: "persamaan_akuntansi",
 hints: ["Persamaan akuntansi tidak pernah boleh rusak.", "ERROR = Aset ≠ Liabilitas + Ekuitas."],
 explain: "Model dengan balance ERROR tidak valid — perbaiki dulu sebelum dipakai untuk keputusan."},
{q: "Rumus =A1+B1 di-copy 1 sel ke kanan menjadi =B1+C1. Ini contoh…", opts: ["Absolute reference yang terkunci","Circular reference yang berputar","Relative reference: bergeser ikut posisi","Hardcode angka dalam rumus"], answer: 2, k: "absolute_ref",
 hints: ["Tidak ada tanda $ di rumusnya.", "Bandingkan dengan $C$2 di Hell Mode."],
 explain: "Tanpa $, referensi bergeser relatif mengikuti posisi copy. Inilah default Excel — dan alasan $ ada."}
],
audio: "assets/audio/fondasi-c.mp3",
hellPass: 80,
hell: [
{q: "Rumus =B5*(1+$C$2) di-copy ke kanan. Apa fungsi tanda $ di $C$2?", opts: ["Menandai C2 sebagai sel input","Mengunci sheet agar tak diedit","Absolute: C2 tidak bergeser saat di-copy","Tidak ada fungsi khusus"], answer: 2,
 explain: "$ mengunci kolom/baris. Tanpa $, copy ke kanan menggeser ke D2, E2 — asumsi ikut 'jalan' dan model rusak."},
{q: "=IFERROR(VLOOKUP(...),0). Kapan angka 0 ini BERBAHAYA?", opts: ["Lookup gagal tersembunyi — data hilang diam-diam","Tidak pernah; IFERROR selalu aman","File menjadi lambat dihitung","Hanya berbahaya di Excel Mac"], answer: 0,
 explain: "IFERROR menelan semua error termasuk yang seharusnya ketahuan (kode salah ketik → terbaca 0). Untuk lookup kritis, biarkan error terlihat."},
{q: "Debt schedule: bunga = 8% × utang AWAL tahun. Utang awal 1.000, bayar pokok 200 tahun ini. Beban bunga?", opts: ["64","80","96","Tidak bisa dihitung"], answer: 1,
 explain: "8% × 1.000 = 80. Bunga dihitung dari saldo awal, bukan saldo akhir (800) — jebakan klasik debt schedule."},
{q: "Model punya circular reference: bunga → laba → kas → utang → bunga. Solusi profesional?", opts: ["Biarkan; Excel bisa menanganinya","Hapus debt schedule-nya","Pakai angka tebakan untuk bunga","Pecah sirkularitas: bunga dari saldo AWAL"], answer: 3,
 explain: "Bunga dari saldo awal memutus lingkaran tanpa iterasi. Circular reference yang dibiarkan = model rapuh dan tidak auditable."},
{q: "=NPV(10%,B2:B6) dengan B2 = −1.000 (investasi di t=0). Kesalahannya?", opts: ["NPV mendiskonto B2 juga; t=0 tak boleh didiskonto","Tidak ada kesalahan; rumusnya sudah benar","Rate diskontonya harus 0%","Seharusnya pakai fungsi IRR"], answer: 0,
 explain: "NPV menganggap nilai PERTAMA sebagai t=1. Rumus benar: =−1.000+NPV(10%,B3:B6). Ini error NPV paling umum di ujian."}
],
blind: {h: "Uji Kilat — angka beda", body: `
<p><b>1.</b> Rumus <code>=C3*(1+$F$1)</code> di-copy 2 kolom ke kanan (ke kolom E). Rumus di kolom E menjadi…?</p>
<details class="ans"><summary>Jawaban</summary>
<p><code>=E3*(1+$F$1)</code>. <b>$F$1 tetap</b> — tanda $ mengunci kolom &amp; baris, jadi asumsi tidak ikut "jalan" saat di-copy.</p>
<p><i>Kenapa penting?</i> Tanpa $, copy ke kanan menggeser ke G$1, H$1… — asumsi ikut bergeser dan seluruh proyeksi rusak diam-diam.</p>
</details>
<p><b>2.</b> Debt schedule: utang awal Rp2.000, bunga 10%, bayar pokok Rp500 tahun ini. Beban bunganya?</p>
<details class="ans"><summary>Jawaban</summary>
<p>10% × 2.000 = <b>Rp200</b>. Bunga dihitung dari <b>saldo AWAL</b>, bukan saldo akhir (1.500 → jebakan klasik).</p>
<p><i>Kenapa saldo awal?</i> Karena itu juga yang memutus circular reference: bunga → laba → kas → utang → bunga. Saldo awal memutus lingkaran tanpa iterasi.</p>
</details>`}
}
];

/* ---------- English mode overlays (EN) ---------- */
(function(){
const EN = {};
EN["fondasi-a"] = {
title: "What Is Financial Modeling?",
sub: "Foundation A · ±2 hrs · Concepts + examples",
sections: [
{h: "The one-sentence definition", body: `
<p><b>Financial modeling</b> = building a mathematical representation of a company's financial performance in Excel, to answer business questions about the <b>future</b>.</p>
<p>It's not just "making reports." Financial statements record the <b>past</b>. Models project the <b>future</b> — then get used to decide: invest or not? borrow or not? sell at what price?</p>`},
{h: "Who uses it?", body: `
<ul>
<li><b>Investment banking (IB)</b> — company valuations, mergers, IPOs.</li>
<li><b>Credit analyst / risk</b> — assessing a borrower's ability to repay debt. <i>(That's your track.)</i></li>
<li><b>FP&A (corporate)</b> — company budgeting &amp; forecasting.</li>
<li><b>Private equity</b> — LBO models: buy a company with debt, sell it 5 years later.</li>
<li><b>Founder</b> — projecting a startup's cash runway.</li>
</ul>`},
{h: "5 model types you must know", body: `
<table class="brutal">
<tr><th>Model</th><th>Question it answers</th><th>When to use it</th></tr>
<tr><td><b>3-Statement</b></td><td>What will profit, balance sheet, and cash look like 5 years out?</td><td>Foundation of ALL models</td></tr>
<tr><td><b>DCF</b></td><td>What is the company's fair value today?</td><td>Valuation</td></tr>
<tr><td><b>Comps</b></td><td>What is a fair price vs competitors?</td><td>Quick valuation</td></tr>
<tr><td><b>LBO</b></td><td>What return if we buy with debt?</td><td>Private equity</td></tr>
<tr><td><b>Budget/Forecast</b></td><td>What is next year's target?</td><td>Corporate</td></tr>
</table>
<p>Your learning order follows this table top to bottom.</p>`},
{h: "Anatomy of a good model", body: `
<p>Every professional model has 3 separate layers:</p>
<ol>
<li><b>INPUTS</b> — assumptions (growth, margin, capex). Blue cells. The only place numbers get typed.</li>
<li><b>PROCESS</b> — calculation formulas. Black cells. No typed numbers here.</li>
<li><b>OUTPUTS</b> — summary: valuation, charts, dashboard.</li>
</ol>
<div class="callout"><b>Why separate them?</b> Because assumptions CHANGE (growth 8% becomes 12%) while formulas DON'T. If they're mixed, every assumption change forces you to dissect formulas one by one — 3 months from now you won't remember what the 1.05 in <code>=B5*1.05</code> meant. A good model: change 1 blue cell, every output updates automatically. That's also what makes a model auditable by someone else.</div>
<div class="example jebakan"><div class="lbl">🚫 Beginner trap</div>
<p>Typing numbers directly inside formulas, e.g. <code>=B5*1.05</code>. That 1.05 is a "hardcode" — 3 months from now you'll forget what it was. Always put it in an input cell: <code>=B5*Growth</code>.</p></div>`},
{h: "Example: corner shop vs corporation", body: `
<div class="example warung"><div class="lbl">🏪 Corner-shop version</div>
<p>"Next month revenue rises 10% — what is the month-end cash?" — That's financial modeling. Inputs: revenue, purchases, rent. Process: calculate. Output: ending cash.</p></div>
<div class="example korporat"><div class="lbl">🏢 Corporate version</div>
<p>"If Unilever Indonesia grows 5%/year for 5 years at 20% margin, what is the fair value of its shares today?" — That's DCF. The thinking structure is IDENTICAL to the corner shop; only the scale differs.</p></div>`},
{h: "🔥 Hell Mode briefing", body: `
<p>Terms used in the Hell Mode questions — read 3 minutes before battle:</p>
<ul>
<li><b>Margin (net margin)</b> = net income ÷ revenue. Efficiency measure: of every Rp100 sold, how much becomes profit.</li>
<li><b>CFO</b> = <i>cash flow from operations</i>, cash generated by the core operating business.</li>
<li><b>Working capital</b> = current assets − current liabilities. Bloated receivables &amp; inventory = cash trapped here.</li>
<li><b>WACC</b> = <i>weighted average cost of capital</i>. Used as the <b>discount rate</b> in DCF.</li>
<li><b>Sensitivity</b> = how much the output moves when one assumption changes. High sensitivity = that assumption must be extra accurate.</li>
</ul>`}
],
quiz: [
{q: `What is the key difference between financial statements and a financial model?`, opts: ["Statements record the past; models project the future","Statements are built by analysts, models by accountants","Statements are for taxes, models for investors","Both are projections, only the format differs"], answer: 0, k: "model_3_statement",
 hints: ["Think about time direction: one records, one projects.","Statements = already happened. Models = forward scenarios."],
 explain: `Financial statements record the past; models project the future for decision-making.`},
{q: `Which model is the foundation of all valuation models?`, opts: ["LBO","Comps","3-Statement","Budget forecast"], answer: 2, k: "model_3_statement",
 hints: ["This model links the income statement, balance sheet, and cash flow.","Its name mentions the number 3."],
 explain: `The 3-statement model is the foundation — DCF, LBO, and M&amp;A are all built on it.`},
{q: `Where may assumption numbers be typed in a professional model?`, opts: ["Inside formulas, as long as they're commented","Only inside the blue input cells","In the output sheet, near the results","Anywhere, as long as it's tidy"], answer: 1, k: "hardcode_rule",
 hints: ["Rule #1: no hardcodes inside formulas.","There are 3 layers: inputs, process, outputs."],
 explain: `Numbers only in input cells (blue). Formulas only reference; they never type numbers.`},
{q: `A credit analyst uses models mainly to assess…`, opts: ["A company's fair share price","Management bonus size","A company's tax efficiency","A borrower's ability to repay debt"], answer: 3, k: "analis_kredit",
 hints: ["The word 'credit' relates to lending.","The risk being assessed = default."],
 explain: `Credit analysts assess debt repayment ability — projected cash flows vs obligations.`},
{q: `A pre-revenue startup. Which model does its founder need MOST right now?`, opts: ["DCF for IPO valuation","Budget forecast: how many months of cash remain","LBO for acquisition","Comps vs competitors"], answer: 1, k: "budget_forecast",
 hints: ["The founder needs to know when cash runs out.","Check the 5-model table: when is each used?"],
 explain: `Budget forecast: cash runway = a startup's lifeline. DCF/LBO need stable cash flows that don't exist yet.`}
],
hell: [
{q: `A startup's model has hardcodes in 40% of its formulas. An investor asks to change the growth assumption 8% → 12%. Biggest risk?`, opts: ["Calculations slow down but results stay correct","Inconsistent results: some formulas update, some don't","File size grows so it's hard to open","No risk as long as the starting numbers were right"], answer: 1,
 explain: `Hardcodes = some formulas keep using stale numbers. Decisions get made on wrong numbers without anyone noticing.`},
{q: `Company A: revenue 100, NI 5. Company B: revenue 60, NI 12. As a credit analyst for a 1-year loan, which is more attractive?`, opts: ["A, because its revenue is larger","Both are equally attractive","Can't judge without the cash flow statement","B, because its profit margin is fatter"], answer: 3,
 explain: `B: 20% net margin vs 5%. A fatter margin = a bigger cushion when conditions worsen — that's what a credit analyst prices.`},
{q: `3-year model: profit keeps rising, but CFO stays negative. Most likely diagnosis?`, opts: ["The company is holding back capex too aggressively","Profit is trapped in working capital: bloated receivables/inventory","The tax expense paid turns out too small","Recorded depreciation expense is too large"], answer: 1,
 explain: `Profit without cash = the classic red flag. Money is stuck in receivables (customers haven't paid) or piling inventory.`},
{q: `Your DCF gives Rp10,000/share; market price is Rp6,000. The right conclusion?`, opts: ["Buy as much as possible — the market must be wrong","Sell the shares before they fall","Re-check your assumptions; the model could be wrong","Ignore the model, follow the market price"], answer: 2,
 explain: `A big gap is an invitation to audit your own assumptions, not a buy order. Good analysts suspect their own model first.`},
{q: `An analyst cuts the discount rate 10% → 8%; company value jumps 40%. This shows…`, opts: ["Valuation is sensitive to WACC; the WACC assumption deserves extra care","The model is totally broken and must be discarded","Discount rates don't affect valuation results","Always plug in 8% to keep valuations high"], answer: 0,
 explain: `High WACC sensitivity means a small WACC error = a big valuation error. WACC deserves the most working hours.`}
],
blind: {h: "Speed Drill — different numbers", body: `
<p><b>1.</b> Corner shop: this year's revenue Rp800m. Growth assumption 15% (in a blue input cell named <i>Growth</i>). What is next year's projected revenue, and what is the correct formula?</p>
<details class="ans"><summary>Answer</summary>
<p>800 × (1 + 15%) = <b>Rp920m</b>. Formula: <code>=Revenue*(1+Growth)</code> — the 15% is NOT typed inside the formula.</p>
<p><i>Why?</i> If growth changes to 20%, you change 1 blue cell and every projection updates. The formula <code>=800*1.15</code> forces you to hunt numbers in every cell.</p>
</details>
<p><b>2.</b> Borrower: Rp2B profit two years running, but CFO −Rp500m in both years. As a credit analyst, what's the signal?</p>
<details class="ans"><summary>Answer</summary>
<p><b>Red flag.</b> Profit without cash = money trapped in working capital (bloated receivables or piling inventory). Debt repayment ability is doubtful despite being "profitable" on paper — credit analysts judge cash, not profit.</p>
</details>`}
};
EN["fondasi-b"] = {
title: "Accounting From Zero",
sub: "Foundation B · ±3 hrs · The language of accounting",
sections: [
{h: "5 accounts, no more", body: `
<p>All of accounting has just <b>5 account types</b>:</p>
<table class="brutal">
<tr><th>Account (Akun)</th><th>English</th><th>Examples</th></tr>
<tr><td><b>Aset</b></td><td>Asset</td><td>Cash, receivables, inventory, machines</td></tr>
<tr><td><b>Liabilitas</b></td><td>Liability</td><td>Trade payables, bank loans</td></tr>
<tr><td><b>Ekuitas</b></td><td>Equity</td><td>Owner's capital, retained earnings</td></tr>
<tr><td><b>Pendapatan</b></td><td>Revenue</td><td>Sales</td></tr>
<tr><td><b>Beban</b></td><td>Expense</td><td>Salaries, rent, COGS</td></tr>
</table>`},
{h: "The equation that rules everything", body: `
<div class="formula">Assets = Liabilities + Equity</div>
<p>Every transaction touches at least 2 accounts, and this equation <b>never</b> breaks. If it breaks, something was recorded wrong.</p>
<div class="example warung"><div class="lbl">🏪 Example</div>
<p>Septian injects Rp10m cash as capital → Cash (asset) +10m, Capital (equity) +10m. Check: 10 = 0 + 10 ✓</p>
<p>Buys Rp3m of stock on supplier credit → Inventory (asset) +3m, Trade payables (liability) +3m. Check: 13 = 3 + 10 ✓</p></div>
<div class="callout"><b>Why does this equation never break?</b> Because every transaction is an EXCHANGE: you get something, you give something. Receive cash → give shares (cash up, capital up). Take stock → promise to pay later (stock up, payables up). There is no "free lunch" in accounting — always two sides. That's why every journal touches at least 2 accounts, and the equation always balances.</div>`},
{h: "Debit & credit without memorizing", body: `
<p>Forget "debit left, credit right" as a memorized chant. Use pocket logic:</p>
<ul>
<li><b>Assets & Expenses</b> = pockets that <b>grow when DEBITED</b>.</li>
<li><b>Liabilities, Equity, Revenue</b> = pockets that <b>grow when CREDITED</b>.</li>
</ul>
<p>Or simpler: <b>total debits always = total credits</b> in every journal. That's it.</p>
<div class="callout"><b>Why is the rule like that? (not memorization)</b> Start from the equation: <b>Assets = Liabilities + Equity</b>. "Debit" = the LEFT side of the equation, "Credit" = the RIGHT side. Assets sit on the left → they grow when debited. Liabilities &amp; equity sit on the right → they grow when credited. Revenue adds to equity (right) → grows when credited. Expenses REDUCE equity → they move the opposite way: they grow when debited. Nothing to memorize — everything falls out of one equation.</div>
<div class="example korporat"><div class="lbl">🏢 Journal example</div>
<p>Pay Rp5m salary in cash: Debit Salary expense 5m (expense up) — Credit Cash 5m (asset down). Total debits 5m = total credits 5m ✓</p></div>`},
{h: "Retained earnings: the bridge to modeling", body: `
<div class="formula">Retained Earnings(end) = Retained Earnings(start) + Net Income − Dividends</div>
<p><b>Retained earnings</b> is accumulated profit that isn't distributed. This is the <b>first bridge</b> between the income statement and the balance sheet — and you'll use it in every model.</p>
<div class="callout"><b>Why don't dividends go through the income statement?</b> Because dividends are NOT an expense. Expenses = sacrifices made to <b>earn</b> revenue (salaries, rent, COGS) — they happen <i>before</i> profit is computed. Dividends = <b>sharing the result</b> with owners — decided <i>after</i> profit is known. Corner-shop analogy: the shop earns Rp5m, you take Rp2m for personal spending. That's not a "shop expense" — the shop still earned 5m. If dividends were recorded as expenses, profit would read Rp3m: misleading, as if the business were less profitable. The journal: Debit Retained earnings 2m — Credit Cash 2m. The IS is untouched. For modeling this matters: analysts judge <b>operating performance</b> from the IS; dividends are a <b>distribution decision</b>, not performance. Mix the two = misread the company.</div>`},
{h: "Terms that trick beginners", body: `
<ul>
<li><b>Profit ≠ cash.</b> Rp5m profit but cash can be zero (the money is stuck in receivables).
<br><i>Why?</i> Accounting records when the <b>economic event</b> happens (goods delivered), not when cash moves. Investors want to know this period's performance — not when the cash drops by.</li>
<li><b>Revenue ≠ cash received.</b> A Rp10m credit sale = revenue today, cash next month.
<br><i>Why?</i> Revenue is recognized when <b>earned</b> (goods/services delivered). If we waited for cash, credit businesses would look like they never sell.</li>
<li><b>Expense ≠ cash spent.</b> Rp400k depreciation cuts profit but spends no cash.
<br><i>Why?</i> The <b>matching</b> principle: costs are recognized in the same period as the revenue they help. A Rp120m machine used 6 years → Rp20m/year expense. Expensing the full Rp120m in the purchase year would show a huge loss even though the machine works for 6 years — misleading.</li>
<li><b>Dividends are not expenses.</b> Dividends reduce retained earnings directly, bypassing the income statement.
<br><i>Why?</i> See Retained earnings above: dividends = sharing results with owners, not a cost of earning revenue.</li>
</ul>`},
{h: "FIFO vs LIFO: same inventory, different profit", body: `
<p>The same inventory can produce a <b>different</b> profit — depending on <i>which</i> units are deemed sold first:</p>
<p><b>Worked example (stated illustration):</b> buy 100 units @ Rp10k, then 100 units @ Rp12k. Sell 100 units @ Rp20k (revenue Rp2,000k).</p>
<table class="brutal">
<tr><th>(Rp thousand)</th><th>FIFO</th><th>LIFO</th></tr>
<tr><td>COGS (100 units sold)</td><td>100 × 10 = <b>1,000</b> (oldest first)</td><td>100 × 12 = <b>1,200</b> (newest first)</td></tr>
<tr><td>Gross profit</td><td>2,000 − 1,000 = <b>1,000</b></td><td>2,000 − 1,200 = <b>800</b></td></tr>
<tr><td>Tax 22%</td><td><b>220</b></td><td><b>176</b></td></tr>
<tr><td>Net income</td><td><b>780</b></td><td><b>624</b></td></tr>
<tr><td>Ending inventory (100 units left)</td><td><b>1,200</b> (recent prices)</td><td><b>1,000</b> (old prices)</td></tr>
</table>
<p>When prices <b>rise</b> (inflation): LIFO → smaller profit, smaller tax (saves Rp44k here), ending inventory at old prices. FIFO → bigger profit, bigger tax, ending inventory near market prices.</p>
<p><b>The rule to remember:</b> <b>PSAK 14 (IAS 2) PROHIBITS LIFO</b> — in Indonesia, for interchangeable inventories, only FIFO or weighted average are allowed (specific identification still applies to non-interchangeable items). LIFO lives only under US GAAP. So Indonesian issuers' reports will show FIFO/average — but you <i>must</i> understand LIFO because exam questions and US peers use it.</p>
<div class="callout"><b>Why does this choice matter to an analyst?</b> Because two companies with <i>identical</i> transactions can report profits 25% apart (780 vs 624) purely from the inventory method. Comparing margins across companies without checking the method = comparing apples with oranges. Read the accounting policy note first — always.</div>`},
{h: "🔥 Hell Mode briefing", body: `
<p>Terms used in the Hell Mode questions:</p>
<ul>
<li><b>Straight line</b> = depreciation spread evenly each year (120m ÷ 6 years = 20m/year).</li>
<li><b>Declining balance</b> = big depreciation early, shrinking later. Larger early expense → smaller early profit.</li>
<li><b>Non-cash</b> = an expense that spends no cash (depreciation). Added back in cash flow (<i>add-back</i>).</li>
</ul>`}
],
quiz: [
{q: `A shop has Rp50m in assets and Rp20m in liabilities. Its equity?`, opts: ["Rp70m","Rp20m","Rp30m","Rp50m"], answer: 2, k: "persamaan_akuntansi",
 hints: ["Use the equation: Assets = Liabilities + Equity.","50 = 20 + ?"],
 explain: `Equity = Assets − Liabilities = 50 − 20 = Rp30m.`},
{q: `Pay Rp2m rent in cash. The correct journal?`, opts: ["Debit Cash, Credit Rent expense","Debit Rent expense, Credit Cash","Debit Payables, Credit Cash","Debit Cash, Credit Capital"], answer: 1, k: "jurnal",
 hints: ["Expenses grow when debited. Cash (asset) shrinks when credited.","Total debits must = total credits."],
 explain: `Rent expense (expense) up → debit. Cash (asset) down → credit.`},
{q: `Which statement is TRUE?`, opts: ["Profit and cash always move together","Dividends are recorded as expenses","A credit sale adds cash today","Depreciation cuts profit, but no cash leaves"], answer: 3, k: "beban_non_kas",
 hints: ["The first three statements are classic traps.","Think: does depreciation spend money?"],
 explain: `Depreciation is a non-cash expense — it cuts profit without spending cash.`},
{q: `Beginning retained earnings Rp8m, net income Rp5m, dividends Rp2m. Ending retained earnings?`, opts: ["Rp11m","Rp13m","Rp15m","Rp5m"], answer: 0, k: "laba_ditahan",
 hints: ["Formula: start + net income − dividends.","8 + 5 − 2 = ?"],
 explain: `8 + 5 − 2 = Rp11m.`},
{q: `Receive a Rp20m bank loan in cash. Which sides of A = L + E change?`, opts: ["Assets +20, Equity +20","Assets +20, Liabilities +20","Liabilities +20, Equity −20","Nothing changes at all"], answer: 1, k: "persamaan_akuntansi",
 hints: ["Cash in = assets up. A loan = ?","Is debt a liability or equity?"],
 explain: `Cash (asset) +20, bank loan (liability) +20. Equity untouched — a loan is not owner's capital.`},
{q: "Prices rising. LIFO vs FIFO: net income & tax?", opts: ["Bigger profit & tax","Smaller profit & tax","Same profit, different tax","No difference"], answer: 1, k: "fifo_lifo", diff: "Medium",
 hints: ["LIFO sells the NEW (expensive) units first → bigger COGS.","COGS 1,200 vs 1,000 → profit 624 vs 780."],
 explain: "LIFO: COGS 1,200 → profit 624, tax 176. FIFO: profit 780, tax 220. When prices rise, LIFO suppresses profit & tax."}
],
hell: [
{q: `A Rp50m credit sale recorded: Debit Receivables, Credit Revenue. Next month the customer pays in full. The journal?`, opts: ["Debit Revenue, Credit Cash","Debit Cash, Credit Receivables","Debit Cash, Credit Revenue","No journal entry"], answer: 1,
 explain: `Revenue was already recognized last month. On payment: assets swap form — cash up, receivables down.`},
{q: `Balance sheet: Assets 100, Liabilities 60. This year a loss of 10, no capital injections/withdrawals. New equity?`, opts: ["40","50","30","60"], answer: 2,
 explain: `Starting equity 40. Loss of 10 → 30. Check: assets fell by 10 too (90) = 60 + 30 ✓`},
{q: `Rp5m dividend declared and paid in cash. Effect on the 3 statements?`, opts: ["IS down 5m; BS and CFS unchanged","IS unchanged; BS: cash −5, RE −5; CFS: −5 financing","IS unchanged; CFS: −5 in operations","The BS is completely unchanged"], answer: 1,
 explain: `Dividends aren't expenses — they never touch the IS. They directly cut cash and retained earnings; in the CFS they sit in financing.`},
{q: `Buy a Rp120m machine in cash, 6-year life, straight line. Year-1 expense and profit vs cash effect?`, opts: ["120m expense; profit and cash fall 120m","No expense is recorded in year one","20m expense; profit falls, no cash leaves","20m expense; cash falls 20m too"], answer: 2,
 explain: `120/6 = 20m expense/year. Cash already left at purchase (year 0). Year 1: profit down 20m, cash unmoved.`},
{q: `Which transaction BREAKS the accounting equation if recorded like this?`, opts: ["Cash stock purchase: Debit Inventory, Credit Cash","Pay salary: Debit Salary expense, Credit Cash","Receive capital: Debit Cash, Credit Capital","Record salary expense without its credit side"], answer: 3,
 explain: `Double entry breaks when only one side is recorded. The other three balance perfectly.`}
],
blind: {h: "Speed Drill — different numbers", body: `
<p><b>1.</b> Shop: Rp120m assets, Rp45m liabilities. What is the equity?</p>
<details class="ans"><summary>Answer</summary>
<p>Equity = 120 − 45 = <b>Rp75m</b>. Check: 120 = 45 + 75 ✓</p>
<p><i>Why can you always check?</i> Every transaction is a two-sided exchange, so A = L + E never breaks. If it breaks, your journal is wrong — not the equation.</p>
</details>
<p><b>2.</b> Rp8m of services received, paid in CASH. The correct journal?</p>
<details class="ans"><summary>Answer</summary>
<p><b>Debit Cash 8m — Credit Service revenue 8m.</b> Cash (asset, left side) up → debit. Revenue adds to equity (right side) → credit.</p>
<p><i>Why not the reverse?</i> Follow the position in the equation: left side up = debit, right side up = credit. No memorizing needed.</p>
</details>`}
};
EN["fondasi-c"] = {
title: "Excel for Modeling",
sub: "Foundation C · ±3 hrs · Rules of the game + must-know functions",
sections: [
{h: "5 rules of the game (non-negotiable)", body: `
<ol>
<li><b>No hardcodes inside formulas.</b> Assumption numbers live in blue input cells; formulas only reference.</li>
<li><b>One formula per row, copied across.</b> The 2027 column formula must be identical to 2026.</li>
<li><b>Consistent colors:</b> blue = input/typed, black = formula, green = cross-sheet link, red = warning.</li>
<li><b>Sheet structure:</b> <code>Assumptions</code> → <code>IS</code> → <code>BS</code> → <code>CFS</code> → <code>Schedules</code> → <code>Output</code>.</li>
<li><b>Balance check in every model:</b> <code>=IF(Assets=Liabilities+Equity,"OK","ERROR")</code> must read OK in every column.</li>
</ol>`},
{h: "10 must-know modeling functions", body: `
<p>Full details for each function are in the <b>Excel Functions</b> menu. The most-used ones:</p>
<ul>
<li><code>IF</code> — logic ("if there's a loss, tax is zero")</li>
<li><code>SUMIFS</code> — summing with criteria</li>
<li><code>XLOOKUP / INDEX+MATCH</code> — fetching data (safer than VLOOKUP)</li>
<li><code>NPV</code> &amp; <code>IRR</code> — the core of DCF valuation</li>
<li><code>PMT</code> — debt installments</li>
<li><code>IFERROR</code> — a model must never show #DIV/0!</li>
<li><code>EOMONTH / YEARFRAC</code> — dates &amp; periods</li>
<li><code>ROUND</code> — avoid Rp1 rounding errors</li>
</ul>`},
{h: "Formula patterns you'll use every day", body: `
<div class="formula">Revenue(t) = Revenue(t-1) × (1 + Growth)</div>
<p>Growth comes from a blue input cell. Copy this formula across for 5 projection years — nothing changes except the column.</p>
<div class="formula">=IF(NetIncome&lt;0, 0, NetIncome*TaxRate)</div>
<p>The "no tax when there's a loss" pattern — used in almost every model.</p>`},
{h: "2-minute model audit", body: `
<ul>
<li><b>Ctrl + &#96;</b> (backtick) — show all formulas at once. Scan: any typed numbers inside formulas? → hardcode, fix it.</li>
<li><b>F2</b> on a cell — see the colored reference cells. Make sure none points at the wrong cell.</li>
<li><b>Trace Precedents</b> — trace where this number comes from. A number with no source = suspicious.</li>
<li><b>Balance check</b> — "OK" in every year? One "ERROR" = the model must not be used yet.</li>
</ul>`},
{h: "🔥 Hell Mode briefing", body: `
<p>Terms used in the Hell Mode questions:</p>
<ul>
<li><b>Absolute reference ($)</b> = a locked reference that doesn't shift when copied. <code>$C$2</code> locks column &amp; row; <code>$C2</code> locks the column only.</li>
<li><b>Debt schedule</b> = the loan timetable: opening balance → interest → principal repayment → closing balance, per period.</li>
<li><b>Circular reference</b> = formula A needs B's result, but B needs A's result. Excel can't compute it — it must be broken.</li>
<li><b>XLOOKUP</b> = the modern lookup function (see the Excel Functions menu). A failed lookup = an error, not zero.</li>
</ul>`}
],
quiz: [
{q: `The formula =B5*1.05 sits in a projection cell. The problem?`, opts: ["No problem, the formula works","Should use the SUM function","Hardcode: 1.05 belongs in an input cell","The B5 reference is wrong"], answer: 2, k: "hardcode_rule",
 hints: ["Modeling rule #1 about numbers inside formulas.","3 months from now, will you still remember what 1.05 was?"],
 explain: `1.05 is a hardcode — it belongs in a named blue input cell, e.g. =B5*(1+Growth).`},
{q: `The standard color for input cells in modeling?`, opts: ["Red","Blue","Green","Yellow"], answer: 1, k: "hardcode_rule",
 hints: ["The color that means 'type here'.","Black = formula."],
 explain: `Blue = manual input. Black = formula. Green = cross-sheet link.`},
{q: `Which function computes the per-period loan installment?`, opts: ["PMT","NPV","IRR","SUMIFS"], answer: 0, k: "debt_schedule",
 hints: ["PMT = payment.","Used in the debt schedule."],
 explain: `PMT computes the periodic payment (principal + interest) of a loan.`},
{q: `The balance check shows ERROR in 2028. That means?`, opts: ["The model can still be used as usual","That's normal in projection years","Just delete the balance check","Something is wrong — fix it before use"], answer: 3, k: "persamaan_akuntansi",
 hints: ["The accounting equation must never break.","ERROR = Assets ≠ Liabilities + Equity."],
 explain: `A model with an ERROR balance is not valid — fix it before using it for decisions.`},
{q: `=A1+B1 copied 1 cell to the right becomes =B1+C1. This is an example of…`, opts: ["A locked absolute reference","A spinning circular reference","Relative reference: it shifts with position","A hardcoded number inside a formula"], answer: 2, k: "absolute_ref",
 hints: ["There's no $ sign in the formula.","Compare with $C$2 in the Hell Mode briefing."],
 explain: `Without $, references shift relative to the copy position. That's Excel's default — and the reason $ exists.`}
],
hell: [
{q: `The formula =B5*(1+$C$2) is copied to the right. What does the $ in $C$2 do?`, opts: ["It marks C2 as an input cell","Locks the sheet from editing","Absolute: C2 doesn't shift when copied","It has no special function"], answer: 2,
 explain: `$ locks column/row. Without it, copying right shifts to D2, E2 — the assumption would 'walk away' and break the model.`},
{q: `=IFERROR(VLOOKUP(...),0). When is that 0 DANGEROUS?`, opts: ["Failed lookups get hidden — data silently lost","Never; IFERROR is always safe","The file becomes slow to calculate","Only dangerous in Excel for Mac"], answer: 0,
 explain: `IFERROR swallows every error, including ones you should see (a mistyped code reads as 0). For critical lookups, let errors show.`},
{q: `Debt schedule: interest = 8% × BEGINNING debt. Beginning debt 1,000, principal repaid 200 this year. Interest expense?`, opts: ["64","80","96","Cannot be computed"], answer: 1,
 explain: `8% × 1,000 = 80. Interest is computed on the beginning balance, not the ending balance (800) — the classic debt-schedule trap.`},
{q: `A model has a circular reference: interest → profit → cash → debt → interest. The professional fix?`, opts: ["Leave it alone; Excel can handle it","Delete the whole debt schedule","Use a guessed number for the interest","Break the circle: interest from BEGINNING balance"], answer: 3,
 explain: `Beginning-balance interest breaks the loop without iteration. A tolerated circular reference = a fragile, unauditable model.`},
{q: `=NPV(10%,B2:B6) with B2 = −1,000 (investment at t=0). The mistake?`, opts: ["NPV also discounts B2; t=0 must not be discounted","No mistake; the formula is correct","The discount rate should be 0%","Should use the IRR function instead"], answer: 0,
 explain: `NPV treats the FIRST value as t=1. Correct: =−1,000+NPV(10%,B3:B6). The most common NPV error on exams.`}
],
blind: {h: "Speed Drill — different numbers", body: `
<p><b>1.</b> The formula <code>=C3*(1+$F$1)</code> is copied 2 columns to the right (to column E). The formula in column E becomes…?</p>
<details class="ans"><summary>Answer</summary>
<p><code>=E3*(1+$F$1)</code>. <b>$F$1 stays</b> — the $ locks column &amp; row, so the assumption doesn't "walk away" when copied.</p>
<p><i>Why does it matter?</i> Without $, copying right shifts to G$1, H$1… — the assumption drifts and the whole projection silently breaks.</p>
</details>
<p><b>2.</b> Debt schedule: beginning debt Rp2,000, interest 10%, principal repaid Rp500 this year. The interest expense?</p>
<details class="ans"><summary>Answer</summary>
<p>10% × 2,000 = <b>Rp200</b>. Interest is computed on the <b>BEGINNING</b> balance, not the ending balance (1,500 → the classic trap).</p>
<p><i>Why the beginning balance?</i> Because it also breaks the circular reference: interest → profit → cash → debt → interest. Beginning balance breaks the loop without iteration.</p>
</details>`}
};
LESSONS_FONDASI.forEach(function(l){ if (EN[l.id]) l.en = EN[l.id]; });
})();
