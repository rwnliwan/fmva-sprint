/* FMVA Sprint — 9 Guided Real Cases (5 flagship + 4 associate) */
const LESSONS_REAL = [
{
id: "real-01", track: "Real Cases", title: "UNVR: The Boycott Turnaround",
sub: "Real Case 1 · ±6 jam · DCF 3 skenario",
est: "6 jam",
prerequisites: ["model_3_statement", "margin"],
driveFolder: "https://drive.google.com/drive/folders/15etlyOcKIB4Uz9b_I401Iz2ASubqGa2A",
audio: "assets/audio/real-01.mp3",
checker: "real-01",
sections: [
{h: "Kenapa Unilever Indonesia?", body: `
<p><b>Unilever Indonesia (UNVR.JK)</b> adalah studi kasus turnaround klasik: boikot 2023–2024 menghantam volume, revenue anjlok <b>Rp41,22T (2022) → Rp30,62T (2024)</b>, margin EBIT tertekan. Lalu 2025: revenue mulai pulih ke Rp31,94T dan program transformasi jalan.</p>
<div class="example korporat"><div class="lbl">🏢 Kenapa ini flagship</div>
<p>Mayoritas course valuasi memakai perusahaan "sehat dan stabil" — kamu tidak belajar apa-apa tentang <b>ketidakpastian</b>. UNVR memaksamu menjawab pertanyaan analis yang sebenarnya: <i>seberapa cepat pemulihan terjadi, dan berapa harga wajar untuk tiap kecepatan itu?</i></p></div>
<div class="callout"><b>Kenapa DCF 3 skenario, bukan 1 angka?</b> Karena satu angka = satu tebakan yang disamarkan sebagai presisi. Tiga skenario (Bear/Base/Bull) memetakan <b>ruang kemungkinan</b> — dan keputusan investasi lahir dari membandingkan harga pasar dengan ruang itu, bukan dari satu angka "target price".</p></div>`},
{h: "Kenapa FCFF, bukan laba bersih?", body: `
<div class="formula">FCFF = NOPAT × (1 − tingkat reinvestasi)</div>
<p><b>NOPAT</b> = EBIT × (1 − pajak): laba operasi seolah tanpa utang. Dari sini, kurangi <b>reinvestasi</b> (capex + modal kerja yang menyerap kas) → dapat <b>FCFF</b>: kas yang benar-benar bisa diambil semua pemodal.</p>
<div class="example jebakan"><div class="lbl">🚫 Jebakan laba bersih</div>
<p>UNVR 2025: net income Rp7,64T <b>lebih tinggi</b> dari 2022 (Rp5,36T) padahal revenue turun 22%! Laba bersih dipengaruhi pos non-operasi & non-kas. DCF yang memakai NI mentah sedang menilai <b>akuntansi</b>, bukan <b>kas</b>.</p></div>
<div class="callout"><b>⚠️ One-off di dalam Rp7,64T itu:</b> angka headline <b>mencakup keuntungan penjualan bisnis es krim</b> (discontinued operations). Laba dari <b>operasi berlanjut (continuing operations) hanya Rp3,5T</b> (press release Unilever, 12 Feb 2026). Pelajaran untuk pemula: angka headline bisa membuat bisnis terlihat <i>lebih</i> menguntungkan dari operasi yang sebenarnya berjalan — selalu tanya <b>"laba dari apa?"</b> sebelum memakai NI untuk valuasi.</div>
<div class="callout"><b>Kenapa reinvestasi 25% dari NOPAT?</b> Perusahaan tidak bisa membagikan seluruh NOPAT — sebagian harus kembali jadi capex dan modal kerja agar mesin tetap jalan. 25% adalah asumsi ilustratif (bukan angka audit): yang penting ia <b>ada dan eksplisit</b>, bukan disembunyikan.</p></div>`},
{h: "Kenapa terminal value mendominasi?", body: `
<div class="formula">TV = FCFF_2030 × (1+g) / (WACC − g)</div>
<p>Hasil Base: <b>PV FCFF 2026–2030 = Rp12,05T</b>, tapi <b>terminal value = Rp51,39T</b> (PV-nya Rp31,91T). Lebih dari 70% nilai DCF datang dari terminal value — rumus Gordon yang mengasumsikan perusahaan tumbuh 3% <b>selamanya</b>.</p>
<div class="callout"><b>Kenapa ini penting?</b> Karena artinya DCF-mu <b>sangat sensitif</b> pada dua angka kecil: WACC dan g terminal. Naikkan WACC 10%→11%, nilai anjlok. Analis yang tidak melakukan <b>analisis sensitivitas</b> pada dua angka ini sedang membangun istana di atas asumsi yang tidak pernah ia uji.</p></div>`},
{h: "Kenapa Bear/Base/Bull berbeda?", body: `
<p>Tiga skenario berbeda di <b>dua tuas</b>: kecepatan pemulihan revenue (g 2,5% / 4,5% / 6%) dan normalisasi margin EBIT (12% / 15% / 17%). Margin Bull 17% bukan angka ngawur — <b>margin EBIT 2022 (sebelum boikot) adalah 17,2%</b>: Bull = "kembali ke level historis".</p>
<div class="example korporat"><div class="lbl">🏢 Hasilnya</div>
<p>Nilai/saham: <b>Bear Rp984 · Base Rp1.291 · Bull Rp1.531</b>. Harga pasar Rp1.390 (yfinance, Okt 2026) duduk di antara Base dan Bull — pasar sudah mem-price-in <b>pemulihan moderat</b>. Upside Base −7,1%: model ini TIDAK berteriak "beli".</p></div>
<div class="callout"><b>Kenapa normalisasi one-off?</b> Biaya transformasi & severance 4Q24 adalah pos sekali jalan — kalau ikut diproyeksikan selamanya, kamu menghukum perusahaan untuk biaya yang tidak akan berulang. Normalisasi = membersihkan data sebelum memproyeksikan.</p></div>`},
{h: "Tugas praktik", body: `
<p>Bangun DCF 3 skenario UNVR di workbook latihan: proyeksikan revenue & FCFF 2026–2030 per skenario, hitung PV, terminal value, EV → equity → nilai per saham → upside. Semua sel jawaban harus rumus yang me-link ke asumsi — ubah g Base jadi 6% dan lihat seluruh model ikut berubah.</p>
<div class="callout"><b>Kenapa tugas ini penting?</b> Ini DCF pertamamu atas perusahaan nyata. Rasakan betapa <b>rapuhnya</b> satu angka valuasi — dan betapa <b>kuatnya</b> rentang skenario sebagai alat berpikir.</p></div>`},
{h: "🔥 Bekal Hell Mode", body: `
<ul>
<li><b>NOPAT</b> = EBIT × (1 − pajak). Laba operasi tanpa efek utang.</li>
<li><b>FCFF</b> = kas bebas untuk SEMUA pemodal (pemegang saham + kreditur).</li>
<li><b>WACC</b> = biaya modal rata-rata tertimbang — tingkat diskonto DCF.</li>
<li><b>Terminal value</b> = nilai "selamanya" setelah periode proyeksi eksplisit.</li>
<li><b>Upside negatif</b> = nilai model di BAWAH harga pasar (bukan sinyal beli).</li>
</ul>`}
],
quiz: [
{q: "DCF 3 skenario UNVR (Bear/Base/Bull) dibedakan oleh dua asumsi. Dua asumsi itu?", opts: ["Laju pemulihan + margin EBIT","Tingkat WACC dan tarif pajak","Jumlah saham yang beredar","Posisi kas pada akhir 2025"], answer: 0, k: "scenario_analysis", diff: "Easy",
 hints: ["Skenario = cerita masa depan yang berbeda.", "Bear vs Bull: siapa yang pulih lebih cepat, dan margin kembali ke berapa?"],
 explain: "Kecepatan pemulihan volume (g 2,5%/4,5%/6%) dan normalisasi margin EBIT (12%/15%/17%). WACC & pajak sama di semua skenario. (Real-01 § Kenapa Bear/Base/Bull berbeda?)"},
{q: "Hasil Base: PV FCFF 5 tahun Rp12,05T, terminal value Rp51,39T. Pelajaran utamanya?", opts: ["Terminal value boleh diabaikan","Nilai dominan di terminal — uji WACC dan g","Proyeksi 5 tahun tidak penting","WACC tidak memengaruhi terminal"], answer: 1, k: "terminal_value", diff: "Medium",
 hints: ["Bandingkan 12,05 vs 51,39.", "Rumus TV = FCFF×(1+g)/(WACC−g): penyebutnya selisih dua angka kecil."],
 explain: "Terminal value mendominasi (>70% nilai) — DCF sangat sensitif pada WACC dan g terminal. Wajib uji sensitivitas. (Real-01 § Kenapa terminal value mendominasi?)"},
{q: "Upside vs pasar (Base) = −7,1%. Artinya?", opts: ["Model menyarankan beli agresif","WACC wajib dinaikkan 7,1%","Harga pasar 7,1% di atas nilai DCF","Skenario Bear lebih optimis"], answer: 2, k: "dcf", diff: "Medium",
 hints: ["Upside = nilai model / harga pasar − 1.", "Negatif berarti nilai model < harga pasar."],
 explain: "Upside −7,1% = nilai DCF Base (Rp1.291) di bawah harga pasar (Rp1.390). Model tidak berteriak 'beli'. (Real-01 § Kenapa Bear/Base/Bull berbeda?)"},
{q: "Kenapa skenario Bull memakai margin EBIT 17%?", opts: ["Karena 17% angka yang bulat","Bull = kembali ke margin 2022 (17,2%)","Karena WACC 10% ditambah 7%","Margin tidak memengaruhi DCF"], answer: 1, k: "scenario_analysis", diff: "Medium",
 hints: ["Lihat data historis di workbook.", "Bull = cerita 'pulih total'. Pulih ke mana?"],
 explain: "Margin EBIT 2022 = 7,08/41,22 = 17,2%. Bull mengasumsikan normalisasi penuh ke level pra-boikot — berjangkar data, bukan angan. (Real-01 § Kenapa Bear/Base/Bull berbeda?)"},
{q: "FCFF = NOPAT × 75%. Angka 75% ini mewakili?", opts: ["Mencerminkan tarif pajak 25%","Sisa setelah reinvestasi 25% (capex+WC)","Mencerminkan margin EBIT 75%","Diskon atas risiko sebesar 25%"], answer: 1, k: "fcf", diff: "Hard",
 hints: ["NOPAT tidak bisa dibagikan 100% — mesin butuh makan.", "Reinvestasi = capex + ΔWC."],
 explain: "75% = 1 − 25% reinvestasi. Perusahaan menahan 25% NOPAT untuk capex & modal kerja; sisanya FCFF. (Real-01 § Kenapa FCFF, bukan laba bersih?)"}
],
hellPass: 80,
hell: [
{q: "WACC naik 10% → 12%, nilai DCF Base akan…", opts: ["Naik — diskonto lebih tinggi","Tetap; WACC hanya untuk Bear","Turun tajam; terminal paling terpukul","Naik karena risiko berkurang"], answer: 2, diff: "Medium",
 explain: "Diskonto lebih tinggi → PV lebih rendah di semua tahun, dan terminal value (penyebut WACC−g membesar) terpukul paling keras. Inilah kenapa asumsi WACC wajib diuji."},
{q: "Range valuasi Rp984–Rp1.531. Cara pakai yang benar?", opts: ["Ambil tengah sebagai target pasti","Beli di dekat Bear: margin of safety","Abaikan Bear; fokus ke Bull","Range berarti modelnya gagal"], answer: 1, diff: "Medium",
 explain: "Range = peta ketidakpastian. Disiplin value investing: beli di dekat Bear (margin pengaman), bukan di tengah-tengah harapan."},
{q: "Kenapa DCF memakai FCFF, bukan net income?", opts: ["Karena NI selalu lebih kecil","Karena FCFF lebih mudah dihitung","Regulator melarang memakai NI","NI campur bunga; FCFF kas semua pemodal"], answer: 3, diff: "Medium",
 explain: "NI = setelah bunga (milik pemegang saham saja) + distorsi non-kas. FCFF sebelum bunga = kas untuk ekuitas DAN kreditur — cocok dengan EV."},
{q: "g terminal 3% → 4%. Efek ke terminal value?", opts: ["Turun karena tumbuh lebih cepat","Naik — penyebut (WACC−g) mengecil","Tetap; g terminal tak sensitif","Terminal value menjadi negatif"], answer: 1, diff: "Hard",
 explain: "TV = FCF×(1+g)/(WACC−g). g 3%→4%: penyebut 7%→6% — TV naik ~19%. Satu persen di asumsi 'selamanya' = dampak raksasa."},
{q: "Base −7%, Bull +10%. Keputusan analis yang jujur?", opts: ["Tunggu; beli hanya jika ke area Bear","Rekomendasi BELI karena Bull positif","Rekomendasi JUAL karena Base negatif","Atur asumsi sampai upside positif"], answer: 0, diff: "Hard",
 explain: "Analis jujur tidak memijat asumsi agar upside positif. Harga Rp1.390 sudah mencerminkan pemulihan moderat — edge hanya muncul jika harga turun ke Rp984–1.100."}
],
tasks: [
{t: "Tugas A — DCF 3 skenario (±4 jam)", d: "Download workbook RC1. Bangun proyeksi revenue & FCFF 2026–2030 untuk Bear/Base/Bull, lalu PV, terminal value, EV → equity → nilai/saham → upside. Semua rumus me-link ke asumsi.", url: "https://drive.google.com/drive/folders/15etlyOcKIB4Uz9b_I401Iz2ASubqGa2A"},
{t: "Tugas B — Uji sensitivitas (±1 jam)", d: "Di file jawabanmu: ubah WACC 10%→12%, catat perubahan nilai/saham Base. Ubah g terminal 3%→4%, catat lagi. Tulis 2 kalimat: asumsi mana yang paling berbahaya?"},
{t: "Tugas C — Kuis di atas", d: "Target ≥4/5 benar."}
],
blind: {h: "Uji Kilat — angka beda", body: `
<p><b>1.</b> NOPAT Rp5T, reinvestasi 25%. FCFF = ?</p>
<details class="ans"><summary>Jawaban</summary><p>5 × 75% = Rp3,75T.</p></details>
<p><b>2.</b> FCFF tahun ke-5 Rp4T, WACC 10%, g 3%. Terminal value = ?</p>
<details class="ans"><summary>Jawaban</summary><p>4 × 1,03 / (0,10 − 0,03) = Rp58,86T.</p></details>`}
},
{
id: "real-02", track: "Real Cases", title: "ASII: Conglomerate SOTP",
sub: "Real Case 2 · ±5 jam · Sum-of-the-parts",
est: "5 jam",
prerequisites: ["dcf", "model_3_statement"],
driveFolder: "https://drive.google.com/drive/folders/15etlyOcKIB4Uz9b_I401Iz2ASubqGa2A",
audio: "assets/audio/real-02.mp3",
checker: "real-02",
sections: [
{h: "Kenapa Astra?", body: `
<p><b>Astra International (ASII.JK)</b> bukan satu bisnis — ia <b>tujuh</b>: otomotif, alat berat & tambang, jasa keuangan, agribisnis, infrastruktur & logistik, teknologi informasi, properti. Revenue 2025 Rp323,39T, EBIT Rp53,02T — tapi tiap segmen punya risiko, pertumbuhan, dan multiple yang <b>berbeda</b>.</p>
<div class="callout"><b>📋 Status data:</b> revenue & EBIT grup dari annual (ditarik via yfinance). <b>EBIT Rp53,02T belum direkonsiliasi independen ke reported line item</b> — perlakukan sebagai input kerja, bukan angka audit. Porsi & multiple tiap segmen = <b>asumsi ilustratif yang disederhanakan</b> (bukan multiple pasar terverifikasi): yang dinilai adalah <b>mekanik SOTP</b>-mu, bukan ketepatan asumsinya.</div>
<div class="callout"><b>Kenapa SOTP, bukan DCF konsolidasi?</b> DCF konsolidasi memakai satu WACC dan satu growth untuk 7 bisnis berbeda — itu seperti menilai harga 7 rumah dengan satu harga per meter. <b>Sum-of-the-parts (SOTP)</b> menilai tiap segmen dengan multiple-nya sendiri, lalu menjumlahkan. Inilah cara analis profesional menilai konglomerat.</p></div>`},
{h: "Kenapa multiple tiap segmen beda?", body: `
<div class="formula">EV segmen = EBIT segmen × multiple EV/EBIT segmen</div>
<p>Multiple mencerminkan <b>kualitas laba</b>: jasa keuangan (arus kas stabil, 7×) vs alat berat (siklikal komoditas, 4,5×) vs IT (tumbuh cepat, 10×). Multiple yang sama untuk semua segmen = mengasumsikan semua bisnis sama menariknya — jelas salah.</p>
<div class="example korporat"><div class="lbl">🏢 Contoh</div>
<p>Otomotif: 35% × Rp53,02T × 5 = <b>Rp92,78T</b> — kontributor EV terbesar. Properti: 3% × Rp53,02T × 7 = Rp11,13T. Total 7 segmen = <b>Rp306,18T</b>.</p></div>
<div class="callout"><b>Kenapa porsi & multiple-nya ilustratif?</b> Angka segmen rinci ada di annual report; di sini disederhanakan agar fokusmu ke <b>mekanik SOTP</b> — bukan menghafal angka. Asumsi boleh diganti; yang dinilai caramu berpikir, bukan ketepatan tebakan.</p></div>`},
{h: "Kenapa dikurangi net debt?", body: `
<div class="formula">Equity = EV SOTP − Net Debt</div>
<p>EV (enterprise value) = nilai untuk <b>semua pemodal</b> (saham + kreditur). Untuk dapat nilai <b>pemegang saham</b>, kurangi utang bersih: Rp110,30T − Rp52,62T = <b>Rp57,68T</b>. Equity SOTP = 306,18 − 57,68 = <b>Rp248,50T</b> → Rp6.261/saham.</p>
<div class="example jebakan"><div class="lbl">🚫 Bug klasik</div>
<p>Lupa kurangi net debt = mengklaim kas kreditur sebagai milik pemegang saham. Atau lebih halus: memakai <i>gross debt</i> tanpa kurangi kas — padahal kas bisa dipakai melunasi utang. Selalu <b>net</b>.</p></div>`},
{h: "Kenapa ada diskon konglomerat?", body: `
<p>Nilai SOTP Rp6.261 vs harga pasar Rp4.800 (yfinance, Okt 2026) → <b>diskon 23,3%</b>. Pasar menilai Astra lebih murah dari jumlah bagian-bagiannya. Ini bukan kesalahan pasar yang otomatis = peluang — ini <b>pertanyaan</b>.</p>
<div class="callout"><b>Kenapa pasar memberi diskon?</b> Kandidat penjelasan: inefisiensi alokasi modal antar segmen, tata kelola konglomerasi, segmen siklikal (alat berat/tambang) yang sedang di puncak siklus, atau sekadar sentimen. Tugas analis: <b>menjelaskan gap</b>, bukan mengasumsikan pasar bodoh. Kadang diskonnya beralasan — kadang itulah peluangmu.</p></div>`},
{h: "Tugas praktik", body: `
<p>Bangun SOTP Astra: alokasikan EBIT ke 7 segmen (porsi × multiple), jumlahkan → EV SOTP → kurangi net debt → equity → nilai/saham → diskon konglomerat. Lalu uji: ubah multiple jasa keuangan 7→5 — seberapa besar nilai/saham bergerak?</p>
<div class="callout"><b>Kenapa tugas ini penting?</b> SOTP adalah senjata analis ekuitas untuk holding & konglomerat — struktur yang sangat umum di Indonesia (Astra, Lippo, Bakrie, Sinar Mas). Kuasai polanya sekali, pakai selamanya.</p></div>`},
{h: "🔥 Bekal Hell Mode", body: `
<ul>
<li><b>SOTP</b> = sum-of-the-parts: valuasi per segmen lalu dijumlahkan.</li>
<li><b>EV</b> = nilai perusahaan untuk semua pemodal; <b>Equity</b> = EV − net debt.</li>
<li><b>Net debt</b> = total utang − kas (selalu net, bukan gross).</li>
<li><b>Diskon konglomerat</b> = 1 − harga pasar / nilai SOTP.</li>
<li><b>Multiple EV/EBIT</b> = cerminan kualitas & risiko laba tiap bisnis.</li>
</ul>`}
],
quiz: [
{q: "SOTP (sum-of-the-parts) artinya?", opts: ["Menjumlahkan revenue semua segmen","Membagi valuasi dengan jumlah segmen","Menilai tiap segmen lalu menjumlahkan","Menjumlahkan net income 7 segmen"], answer: 2, k: "sotp", diff: "Easy",
 hints: ["Parts = bagian-bagian.", "Tiap bisnis beda → tiap valuasi beda, baru dijumlah."],
 explain: "SOTP menilai tiap segmen secara terpisah (multiple sesuai karakteristiknya) lalu menjumlahkan jadi EV grup. (Real-02 § Kenapa Astra?)"},
{q: "EV SOTP Rp306,18T menjadi equity Rp248,50T. Yang dikurangkan?", opts: ["Net debt Rp57,68T (utang − kas)","Pembayaran dividen tahun berjalan","NCI dari seluruh anak usaha","Saldo pajak tangguhan perusahaan"], answer: 0, k: "sotp", diff: "Medium",
 hints: ["EV = untuk semua pemodal.", "Equity = milik pemegang saham saja. Selisihnya milik siapa?"],
 explain: "Net debt = Rp110,30T − Rp52,62T = Rp57,68T. EV milik semua pemodal; kurangi hak kreditur → equity. (Real-02 § Kenapa dikurangi net debt?)"},
{q: "Diskon konglomerat 23,3% artinya?", opts: ["Astra mengalami rugi 23,3%","Dividen tunai dipotong 23,3%","Beban utang naik 23,3%","Pasar menilai 23,3% di bawah SOTP"], answer: 3, k: "conglomerate_discount", diff: "Medium",
 hints: ["1 − 4800/6261 = ?", "SOTP 6261 vs pasar 4800."],
 explain: "Diskon = 1 − harga pasar/nilai SOTP = 23,3%. Pasar menghargai konglomerat di bawah jumlah bagian-bagiannya. (Real-02 § Kenapa ada diskon konglomerat?)"},
{q: "Kenapa multiple EV/EBIT tiap segmen berbeda?", opts: ["Agar totalnya genap Rp306T","Risiko & kualitas laba tiap bisnis beda","Karena EBIT tiap segmen beda","Aturan akuntansi mewajibkan"], answer: 1, k: "sotp", diff: "Medium",
 hints: ["Bandingkan jasa keuangan vs alat berat tambang.", "Bisnis stabil vs siklikal — mana yang pantas lebih mahal?"],
 explain: "Multiple = harga untuk kualitas laba. IT tumbuh cepat (10×), alat berat siklikal (4,5×). Satu multiple untuk semua = mengasumsikan semua bisnis sama. (Real-02 § Kenapa multiple tiap segmen beda?)"},
{q: "Segmen kontributor EV terbesar?", opts: ["Segmen Properti Rp11,13T","Segmen Agribisnis Rp31,81T","Segmen Otomotif Rp92,78T","Segmen Teknologi Informasi Rp21,21T"], answer: 2, k: "sotp", diff: "Easy",
 hints: ["Porsi × multiple terbesar.", "35% × 5 = ?"],
 explain: "Otomotif: 35% × Rp53,02T × 5 = Rp92,78T — hampir sepertiga EV SOTP. (Real-02 § Kenapa multiple tiap segmen beda?)"}
],
hellPass: 80,
hell: [
{q: "Multiple jasa keuangan turun 7→5. Efek ke nilai/saham SOTP?", opts: ["Nilai naik sekitar Rp400","Nilai turun sekitar Rp400","Tetap karena tak sensitif","Naik karena risiko turun"], answer: 1, diff: "Medium",
 explain: "EV jasa keuangan: 53,02×15%×7=Rp55,67T → ×5=Rp39,77T. Selisih −Rp15,90T ÷ 39,69 miliar saham = −Rp401/saham. Sensitivitas multiple langsung memukul valuasi."},
{q: "Kapan SOTP lebih tepat dari DCF konsolidasi?", opts: ["Selalu — DCF sudah usang","Ketika hanya ada satu segmen","Tidak pernah lebih tepat","Saat multi-segmen beda profil risiko"], answer: 3, diff: "Medium",
 explain: "SOTP unggul untuk konglomerat/holding multi-segmen. Untuk single-business, DCF konsolidasi lebih bersih — SOTP hanya menambah noise."},
{q: "Net debt naik Rp10T (semua else equal). Diskon konglomerat akan…", opts: ["Naik — equity turun, gap melebar","Diskon konglomerat turun","Tetap sama seperti semula","Berubah menjadi negatif"], answer: 0, diff: "Hard",
 explain: "Equity = EV − net debt. Net debt +10T → equity −10T → nilai/saham turun → harga pasar terlihat makin 'murah' vs SOTP → diskon tercatat membesar."},
{q: "Porsi & multiple segmen di file ini ilustratif. Kenapa analis tetap memakai SOTP?", opts: ["Karena presisi tidak penting","Karena pasar tak peduli asumsi","Diuji mekaniknya; input bisa diganti","DCF dilarang untuk konglomerat"], answer: 2, diff: "Hard",
 explain: "Model adalah kerangka berpikir, bukan ramalan. Ganti porsi/multiple dengan angka annual report → mekaniknya sama. Analis hebat menguji 'bagaimana jika', bukan menghafal input."},
{q: "Analis A: 'Diskon 23,3% = beli!'. Kesalahannya?", opts: ["Ya — diskon selalu berarti peluang","Bukan — diskon = pertanyaan","Ya, asal diskon di atas 20%","Tidak — diskon selalu jebakan"], answer: 1, diff: "Hard",
 explain: "Diskon adalah pertanyaan, bukan jawaban. Bisa jadi peluang — bisa juga pasar tahu sesuatu (tata kelola, siklus) yang modelmu abaikan. Jelaskan gap-nya dulu."}
],
tasks: [
{t: "Tugas A — SOTP Astra (±3 jam)", d: "Download workbook RC2. Hitung EV 7 segmen (porsi × multiple), total → net debt → equity → nilai/saham → diskon konglomerat. Semua rumus link ke input.", url: "https://drive.google.com/drive/folders/15etlyOcKIB4Uz9b_I401Iz2ASubqGa2A"},
{t: "Tugas B — Stress test multiple (±1 jam)", d: "Ubah multiple alat berat 4,5→3 (skenario komoditas jatuh). Catat nilai/saham baru. Segmen mana yang paling 'berbahaya' bagi valuasi?"},
{t: "Tugas C — Kuis di atas", d: "Target ≥4/5 benar."}
],
blind: {h: "Uji Kilat — angka beda", body: `
<p><b>1.</b> EBIT grup Rp40T, 2 segmen: A (60%, 6×), B (40%, 8×). EV SOTP = ?</p>
<details class="ans"><summary>Jawaban</summary><p>A: 40×60%×6 = 144. B: 40×40%×8 = 128. Total Rp272T.</p></details>
<p><b>2.</b> EV SOTP Rp272T, net debt Rp50T, saham 20 miliar. Nilai/saham? Harga pasar Rp9.000 → diskon?</p>
<details class="ans"><summary>Jawaban</summary><p>Equity 222T ÷ 20 miliar = Rp11.100. Diskon = 1 − 9000/11100 = 18,9%.</p></details>`}
}
,
{
id: "real-03", track: "Real Cases", title: "INDF: Noodle Empire, Leveraged",
sub: "Real Case 3 · ±6 jam · Debt schedule + MISI FORENSIK (case forensik, bukan valuasi)",
est: "6 jam",
prerequisites: ["debt_schedule", "nci", "fcf"],
driveFolder: "https://drive.google.com/drive/folders/15etlyOcKIB4Uz9b_I401Iz2ASubqGa2A",
audio: "assets/audio/real-03.mp3",
mission: {file: "https://drive.google.com/file/d/1bG1-4aLXW3G1RlhKblFigPq51LgXeQup/view?usp=drive_link", key: "indf",
  title: "🕵️ Misi Forensik — Model Analis Junior (rusak)",
  desc: "Kamu menerima model valuasi INDF buatan 'analis junior'. File ini <b>sengaja dirusak di 5 titik</b>: NCI tidak dikurangkan, bunga diketik manual, tanda ΔWC terbalik, capex dihitung dua kali, dan selisih neraca 'OK' palsu. Misimu: <b>temukan → jelaskan kenapa salah → perbaiki dengan rumus → upload hasilnya</b>."},
sections: [
{h: "Kenapa Indofood?", body: `
<p><b>Indofood (INDF.JK)</b> — mi instan yang mendunia lewat akuisisi <b>Pinehill</b>, didanai <b>utang</b>. Hasilnya: revenue tumbuh (Rp110,83T → Rp123,49T, 2022–2025) TAPI total utang Rp74,96T dan struktur ekuitas yang menjebak: NCI Rp47,09T dari total ekuitas Rp120,24T.</p>
<div class="callout"><b>Kenapa leverage + NCI = ladang error?</b> Karena keduanya "tidak terlihat" di permukaan: utang bersembunyi di balik jadwal, NCI bersembunyi di balik angka ekuitas total. Analis junior (dan model AI) paling sering terpeleset di dua tempat ini. Makanya case ini punya <b>twist forensik</b>: kamu tidak membangun model — kamu <b>mengaudit</b> model orang.</p></div>
<div class="callout"><b>Catatan eksplisit:</b> ini <b>case forensik, bukan valuasi</b> &mdash; outputnya adalah temuan audit (5 error), bukan target price. Satu-satunya dari 9 real cases yang memang dirancang tanpa output valuasi.</div>`},
{h: "Kenapa NCI harus dikurangkan?", body: `
<div class="formula">Ekuitas induk = Total ekuitas − NCI</div>
<p><b>NCI (non-controlling interest)</b> = bagian ekuitas anak usaha yang dimiliki pihak lain. Indofood tidak memiliki 100% semua anak usahanya — Rp47,09T dari Rp120,24T ekuitas adalah milik minoritas. Valuasi saham INDF hanya boleh memakai <b>Rp73,15T</b>.</p>
<div class="example jebakan"><div class="lbl">🚫 Error #1 — NCI dilupakan</div>
<p>Model junior: Ekuitas induk = Rp120,24T (total!). Overstate Rp47,09T ≈ <b>Rp5.364/saham</b> — lebih besar dari harga… eh, dari sebagian harga sahamnya (Rp6.400). Satu baris yang lupa = valuasi hancur.</p></div>`},
{h: "Kenapa bunga harus link ke debt schedule?", body: `
<div class="formula">Beban bunga = Utang AWAL × tarif = 74,96 × 6% = Rp4,50T</div>
<p>Bunga berjalan dari <b>saldo awal</b> utang (prinsip debt schedule Hari 03/Fondasi C): uang dipinjam dulu, bunga dihitung dari situ. Model junior mengetik <b>Rp3,00T</b> manual — angka yang tidak bisa dilacak asal-usulnya dan tidak ikut berubah kalau asumsi utang berubah.</p>
<div class="callout"><b>Kenapa ini masalah besar?</b> Bukan soal selisih Rp1,5T — tapi soal <b>jejak audit</b>. Angka ketik adalah jalan buntu: 6 bulan lagi tidak ada yang tahu dari mana Rp3,00T itu datang. Rumus yang me-link = dokumentasi yang hidup.</p></div>`},
{h: "Kenapa tanda ΔWC & double capex fatal?", body: `
<p><b>Error #3 — tanda ΔWC terbalik:</b> ΔWC +Rp2,1T artinya kas <b>tertahan</b> di modal kerja → harus <b>dikurangkan</b> dari FCFF. Model junior malah <b>menambahkannya</b>: FCFF Rp20,10T vs benar Rp15,90T (overstate 26%).</p>
<p><b>Error #4 — capex double-count:</b> capex Rp10T dikurangi sekali di FCFF, lalu dikurangi <b>lagi</b> di "FCFF final": Rp10,10T. Kesalahan mekanik murni — tidak ada hubungannya dengan bisnis, tapi valuasinya runtuh.</p>
<div class="callout"><b>Kenapa dua error ini satu paket?</b> Karena keduanya soal <b>disiplin tanda dan alur</b>: kas masuk vs kas keluar, sekali vs dua kali. 80% bug model bukan soal teori valuasi — soal aritmetika yang ceroboh.</p></div>`},
{h: "Kenapa 'OK' palsu paling berbahaya?", body: `
<p><b>Error #5:</b> sel "Selisih A − (L+E)" diketik <b>0</b> — terlihat "balance ✅". Padahal itu bukan hasil perhitungan, melainkan <b>ketikan yang mematikan alarm</b>. Neraca yang tidak balance adalah sinyal ada link putus; mengetik 0 = mencabut kabel alarm kebakaran lalu tidur nyenyak.</p>
<div class="callout"><b>Kenapa ini skill termahal?</b> Model yang salah tapi terlihat benar lebih berbahaya dari model yang jelas rusak. Auditor forensik tidak mencari "angka yang salah" — ia mencari <b>angka yang terlalu rapi untuk jadi kebetulan</b>.</p>
<div class="example"><div class="lbl">⚠️ Toleransi</div><p><b>Toleransi rounding itu eksplisit:</b> input case ini dibulatkan (Rp120,24T, Rp47,09T, dst.) — jadi selisih balance check yang <b>kecil (±0,01)</b> adalah <b>noise pembulatan, bukan error</b>. Checker misi memakai toleransi ±0,5 untuk sel ini. Bedakan: residual kecil dari input rounded = wajar; selisih BESAR atau ketikan "0" = alarm beneran. Analis yang baik menyatakan toleransinya, bukan berpura-pura presisi sempurna.</div></div>`},
{h: "Tugas praktik", body: `
<p>Unduh file misi (model junior yang rusak). Audit 5 titik, perbaiki semuanya dengan <b>rumus</b> (angka ketik yang benar pun tetap gagal — misi menuntut perbaikan aktual), pastikan balance check adalah rumus asli, lalu upload ke Misi Forensik di bawah.</p>
<div class="callout"><b>Kenapa tugas ini penting?</b> Di dunia kerja, kamu lebih sering <b>mewarisi</b> model daripada membangun dari nol. Kemampuan membaca model orang, menemukan bug, dan memperbaikinya = skill analis senior.</p></div>`},
{h: "🔥 Bekal Hell Mode", body: `
<ul>
<li><b>NCI</b> = hak minoritas atas ekuitas anak usaha — bukan milik induk.</li>
<li><b>Debt schedule</b> = bunga dari saldo AWAL; tarif × utang awal.</li>
<li><b>ΔWC positif</b> = kas tertahan → KURANGI dari FCFF.</li>
<li><b>Double-count</b> = item yang dikurangi/ditambah dua kali.</li>
<li><b>Balance check</b> = harus RUMUS (=A−(L+E)), bukan ketikan "OK".</li>
</ul>`}
],
quiz: [
{q: "Ekuitas induk = 120,24 − 47,09 = 73,15. Kenapa NCI dikurangkan?", opts: ["Karena NCI adalah utang bank","NCI milik minoritas — bukan milik induk","Karena NCI sudah termasuk pajak","Agar hasil angkanya lebih kecil"], answer: 1, k: "nci", diff: "Easy",
 hints: ["NCI = non-controlling interest.", "Siapa yang 'mengendalikan'? Bukan induk."],
 explain: "NCI adalah hak pihak minoritas atas ekuitas anak usaha. Valuasi saham induk hanya memakai ekuitas milik induk: Rp73,15T. (Real-03 § Kenapa NCI harus dikurangkan?)"},
{q: "Beban bunga = 74,96 × 6% (saldo AWAL). Kenapa saldo awal, bukan akhir?", opts: ["Karena nilainya lebih besar","Karena aturan pajak Indonesia","Bunga berjalan dari utang awal","Agar perhitungannya mudah"], answer: 2, k: "debt_schedule", diff: "Medium",
 hints: ["Kapan bunga mulai dihitung? Saat uang dipinjam.", "Prinsip debt schedule dari Fondasi C."],
 explain: "Bunga = tarif × saldo awal — uang dipinjam dulu, bunga berjalan dari situ. Ini juga memutus circular reference. (Real-03 § Kenapa bunga harus link?)"},
{q: "ΔWC +Rp2,1T DITAMBAHKAN ke FCFF oleh model junior. Salahnya?", opts: ["Kas tertahan → ΔWC harus dikurangkan","Tidak ada yang salah di sini","ΔWC tidak ada dalam rumus FCFF","ΔWC seharusnya dikali dua"], answer: 0, k: "fcf", diff: "Medium",
 hints: ["WC naik = piutang/persediaan naik.", "Kasnya ke mana? Tertahan."],
 explain: "Kenaikan WC menahan kas → FCFF = NOPAT + D&A − capex − ΔWC. Tanda terbalik = overstate 26%. (Real-03 § Kenapa tanda ΔWC fatal?)"},
{q: "Capex Rp10T dikurangi dua kali. Efek ke FCFF?", opts: ["FCFF naik sebesar Rp10T","Tidak menimbulkan efek apa pun","FCFF pasti menjadi negatif","FCFF Rp10T lebih rendah dari benar"], answer: 3, k: "forensic_audit", diff: "Medium",
 hints: ["Kurangi sekali = benar. Kurangi dua kali?", "15,90 − 10 = ?"],
 explain: "Double-count: FCFF final Rp10,10T vs benar Rp15,90T — understate Rp10T penuh. Bug mekanik, bukan teori. (Real-03 § Kenapa double capex fatal?)"},
{q: "Selisih neraca diketik 0 ('OK' palsu). Kenapa ini error paling berbahaya?", opts: ["Karena nol bukan angka cantik","Alarm mati: salah tapi tampak benar","Karena harusnya tertulis 0,01","Tidak berbahaya asalkan balance"], answer: 1, k: "forensic_audit", diff: "Hard",
 hints: ["Alarm kebakaran yang dicabut kabelnya.", "Model salah tapi terlihat benar vs model yang jelas rusak — mana lebih bahaya?"],
 explain: "'OK' ketikan menyembunyikan link putus. Auditor mencari angka yang terlalu rapi untuk jadi kebetulan. (Real-03 § Kenapa 'OK' palsu paling berbahaya?)"}
],
hellPass: 80,
hell: [
{q: "Overstate valuasi akibat lupa NCI, dalam Rp/saham?", opts: ["Kurang lebih Rp1.000","Kurang lebih Rp47.090","Rp5.364 (47,09T ÷ 8,78 miliar)","Kurang lebih Rp73.150"], answer: 2, diff: "Medium",
 explain: "47,09T ÷ 8,78 miliar = Rp5.364/saham — hampir sama dengan harga saham Rp6.400. Satu baris lupa = valuasi meleset satu harga saham."},
{q: "Bunga ketik Rp3,0T vs benar Rp4,5T. Efek LANGSUNG ke FCFF?", opts: ["FCFF turun sebesar Rp1,5T","Nol: FCFF dihitung dari NOPAT","FCFF naik sebesar Rp1,5T","FCFF menjadi sebesar Rp3,0T"], answer: 1, diff: "Hard",
 explain: "Trick question! FCFF = dari NOPAT (sebelum bunga) → bunga tidak masuk FCFF. Error bunga memukul NI & metrik berbasis laba, bukan FCFF. Pahami alur, bukan hafal rumus."},
{q: "Setelah 5 error diperbaiki, selisih = −0,01. Neraca balance?", opts: ["Ya — dalam toleransi pembulatan","Tidak, harus persis nol","Tidak, harus bernilai positif","Ya jika dibulatkan ke triliun"], answer: 0, diff: "Medium",
 explain: "−0,01T = −Rp10 miliar dari total Rp218T — debu pembulatan. Balance check yang jujur memakai toleransi, bukan nol mutlak."},
{q: "Urutan audit model yang benar?", opts: ["Asumsi → struktur → logika","Cek warna sel, font, lalu print","Langsung lompat ke kesimpulan","Struktur → logika → asumsi"], answer: 3, diff: "Medium",
 explain: "Struktur dulu (apakah mekaniknya hidup?), lalu logika (tanda/alur benar?), terakhir asumsi (angkanya masuk akal?). Kebanyakan orang mulai dari asumsi — dan melewatkan bug mekanik."},
{q: "Kenapa twist forensik dipasang di INDF, bukan UNVR?", opts: ["Karena UNVR terlalu gampang","Karena Indofood lebih terkenal","Utang+NCI: tempat error bersembunyi","Dipilih secara acak saja"], answer: 2, diff: "Hard",
 explain: "Forensik butuh 'tempat gelap': utang (jadwal tersembunyi) dan NCI (angka agregat). UNVR hampir tanpa utang — tidak ada tempat untuk menyembunyikan bug yang menarik."}
],
tasks: [
{t: "Tugas A — Audit forensik (±4 jam)", d: "Download file misi INDF. Temukan 5 error, perbaiki dengan RUMUS (bukan ketikan), pastikan selisih neraca adalah rumus asli. Upload ke Misi Forensik.", url: "https://drive.google.com/drive/folders/15etlyOcKIB4Uz9b_I401Iz2ASubqGa2A"},
{t: "Tugas B — Tulis laporan audit (±1 jam)", d: "Untuk tiap error: 1 kalimat APA yang salah + 1 kalimat KENAPA berbahaya + 1 kalimat cara perbaikannya. 5 error = 15 kalimat. Ini format laporan audit profesional."},
{t: "Tugas C — Kuis di atas", d: "Target ≥4/5 benar."}
],
blind: {h: "Uji Kilat — angka beda", body: `
<p><b>1.</b> Total ekuitas Rp200T, NCI Rp60T, saham 10 miliar. Ekuitas induk/saham = ?</p>
<details class="ans"><summary>Jawaban</summary><p>(200−60)/10 miliar = Rp14.000/saham.</p></details>
<p><b>2.</b> NOPAT 30, D&A 5, capex 12, ΔWC +4. FCFF = ?</p>
<details class="ans"><summary>Jawaban</summary><p>30+5−12−4 = 19. ΔWC positif dikurangkan!</p></details>`}
},
{
id: "real-04", track: "Real Cases", title: "TSLA: Growth at What Cost",
sub: "Real Case 4 · ±5 jam · Reverse-DCF",
est: "5 jam",
prerequisites: ["dcf", "wacc", "scenario_analysis"],
driveFolder: "https://drive.google.com/drive/folders/15etlyOcKIB4Uz9b_I401Iz2ASubqGa2A",
audio: "assets/audio/real-04.mp3",
checker: "real-04",
sections: [
{h: "Kenapa Tesla?", body: `
<p><b>Tesla (TSLA)</b> — satu-satunya case global: revenue ±$95B (FY2025: $94,83B), net income runtuh <b>$15,0B (2023) → $3,79B (2025)</b>, tapi harga saham $399,81 (market cap ±$1,50 TRILIUN). Pertanyaannya bukan "berapa nilai wajarnya?" — tapi <b>"pertumbuhan gila apa yang sudah di-price-in pasar?"</b></p>
<div class="callout"><b>📋 Sumber data (terverifikasi 31 Okt 2026):</b> revenue FY2025 $94,83B & net income dari <b>Tesla 10-K filed 29 Jan 2026</b>; saham <b>3,752 miliar = outstanding per 10-K cover per 23 Jan 2026</b>; harga $399,81 (yfinance, Okt 2026). Angka margin 12%, WACC 9%, dst. adalah <b>asumsi ilustratif</b> — yang dinilai adalah mekanik reverse-DCF-mu.</div>
<div class="callout"><b>Kenapa reverse-DCF?</b> DCF biasa: asumsi → nilai. <b>Reverse-DCF</b>: harga pasar → asumsi yang <i>harus</i> benar agar harga itu masuk akal. Ia tidak bilang "mahal/murah" — ia bilang <b>"pasar sedang bertaruh pada X; percayakah kamu pada X?"</b> Ini senjata analis untuk saham growth yang tidak bisa dinilai cara biasa.</p></div>`},
{h: "Kenapa pertanyaannya 'berapa g'?", body: `
<div class="formula">Cari g sehingga DCF(g) = harga pasar</div>
<p>Model: revenue 10 tahun tumbuh g per tahun, margin EBIT ternormalisasi 12%, pajak 21%, reinvestasi 30%, WACC 9%, g terminal 3%. Hasil trial: g=8% → <b>$42</b>; g=12% → <b>$57</b>; g=16% → <b>$78</b>. Harga pasar: <b>$399,81</b>.</p>
<div class="example jebakan"><div class="lbl">🚫 Bahkan 16% tidak dekat</div>
<p>CAGR 16% selama 10 tahun = revenue naik <b>4,4× lipat</b> — itu sudah skenario heroik. Nilainya $78, masih <b>80% di bawah</b> harga pasar. Jadi pasar membayar untuk sesuatu yang JAUH lebih gila dari 16%/tahun.</p></div>`},
{h: "Kenapa jawabannya 38,7%?", body: `
<p>Goal seek: ubah sel <b>"g (input — coba-coba / goal seek)"</b> sampai sel <b>"Nilai/saham (g=input)" = $399,81</b> (Data → Goal Seek, atau trial-error manual). Jawaban: <b>g ≈ 38,7% per tahun selama 10 tahun</b>. Artinya revenue 2035 = 94,83 × (1,387)^10 ≈ <b>$2,5 triliun</b> — 26× lipat, lebih besar dari PDB kebanyakan negara.</p>
<div class="callout"><b>Kenapa ini BUKAN vonis "Tesla kemahalan"?</b> Karena model ini hanya menilai <b>bisnis inti</b> (jualan mobil + energi). Pasar mungkin membayar untuk <b>opsi</b>: robotaxi, Optimus, AI. Reverse-DCF memisahkan dua hal itu dengan bersih: <i>bisnis inti butuh keajaiban 38,7% — sisanya adalah harga opsi</i>. Tugasmu menilai apakah opsi itu worth $1,2T.</p></div>`},
{h: "Kenapa margin 'ternormalisasi' 12%?", body: `
<p>Margin EBIT Tesla runtuh (perang harga EV). Memakai margin 2025 yang tertekan untuk 10 tahun = mengasumsikan perang harga <b>selamanya</b>. 12% adalah asumsi ilustratif "kembali ke kewarasan" — <b>eksplisit dan bisa diperdebatkan</b>, bukan disembunyikan.</p>
<div class="callout"><b>Kenapa ini pelajaran penting?</b> Setiap DCF growth mengandung dua taruhan: <b>pertumbuhan</b> DAN <b>profitabilitas</b>. Analis amatir hanya mainkan g; analis profesional menguji keduanya. Coba di filemu: margin 15% → g implied turun ke berapa?</p></div>`},
{h: "Tugas praktik", body: `
<p>Bangun reverse-DCF Tesla: proyeksikan revenue & FCFF 10 tahun untuk g = 8%, 12%, 16% → nilai/saham tiap skenario. Lalu di blok <b>REVERSE-DCF</b>: <b>goal seek</b> — ubah sel "g (input — coba-coba / goal seek)" sampai "Nilai/saham (g=input)" = $399,81 (Excel/Sheets: Data → Goal Seek, atau coba-coba manual sambil lihat nilainya bergerak). Ketik jawaban g implied-mu — checker menilai angkanya.</p>
<div class="callout"><b>Kenapa tugas ini penting?</b> Ini cara berpikir "outside-in": mulai dari harga, mundur ke ekspektasi. Untuk setiap saham growth yang kamu temui seumur hidup, pertanyaan pertamamu seharusnya: <i>"apa yang sudah di-price-in?"</i></p></div>`},
{h: "🔥 Bekal Hell Mode", body: `
<ul>
<li><b>Reverse-DCF</b> = dari harga pasar, mundur ke asumsi yang harus benar.</li>
<li><b>g implied</b> = CAGR yang membuat DCF = harga pasar.</li>
<li><b>Goal seek</b> = cari input agar output = target.</li>
<li><b>"Di-price-in"</b> = ekspektasi yang sudah tercermin di harga.</li>
<li><b>Opsi</b> = nilai dari kemungkinan masa depan (robotaxi/AI) — di luar DCF inti.</li>
</ul>`}
],
quiz: [
{q: "Reverse-DCF menjawab pertanyaan apa?", opts: ["Berapa nilai wajar saham?","Ekspektasi apa yang di-price-in?","Kapan waktu membeli saham?","Berapa WACC yang paling benar?"], answer: 1, k: "reverse_dcf", diff: "Easy",
 hints: ["Reverse = dibalik.", "DCF biasa: asumsi → nilai. Dibalik: ? → asumsi."],
 explain: "Reverse-DCF: dari harga pasar, mundur ke asumsi (g) yang harus benar agar harga itu masuk akal. (Real-04 § Kenapa Tesla?)"},
{q: "g=16% (heroik, revenue 4,4× lipat) → nilai $78 vs harga $400. Artinya?", opts: ["Ekspektasi pasar jauh melampaui 16%","Modelnya pasti rusak total","Tesla pasti turun ke $78","WACC-nya pasti salah hitung"], answer: 0, k: "reverse_dcf", diff: "Medium",
 hints: ["$78 vs $400 — jurangnya besar.", "Model hanya menilai bisnis inti."],
 explain: "Jurang $78→$400 = ekspektasi ekstrem ATAU nilai opsi (robotaxi/AI) yang tidak ada di DCF inti. (Real-04 § Kenapa pertanyaannya 'berapa g'?) "},
{q: "g implied ≈ 38,7%/tahun 10 tahun. Kesimpulan yang jujur?", opts: ["Tesla kemahalan; segera jual","38,7% mustahil; modelnya salah","Ekspektasi ekstrem; opsi dinilai terpisah","Beli saja karena growth tinggi"], answer: 2, k: "reverse_dcf", diff: "Medium",
 hints: ["38,7% CAGR 10 tahun = revenue 26× lipat.", "Bisnis inti vs opsi — pisahkan."],
 explain: "38,7% untuk bisnis inti tidak masuk akal → pasar membayar opsi (robotaxi/AI). Tugas analis: menilai apakah opsi itu worth $1,2T. (Real-04 § Kenapa jawabannya 38,7%?) "},
{q: "Kenapa margin 12% disebut 'ternormalisasi'?", opts: ["12% adalah rata-rata global","Sebab 21% dikurangi 9% saja","Margin tidak penting dalam DCF","Margin 2025 runtuh; 12% ilustratif"], answer: 3, k: "dcf", diff: "Medium",
 hints: ["Net income 15,0B → 3,8B. Apa yang terjadi?", "Proyeksikan margin tertekan selamanya = asumsi perang harga abadi."],
 explain: "Memakai margin runtuh untuk 10 tahun = mengasumsikan perang harga selamanya. 12% eksplisit & bisa diperdebatkan. (Real-04 § Kenapa margin 'ternormalisasi'?) "},
{q: "Fungsi goal seek dalam latihan ini?", opts: ["Mencari nilai WACC optimal","Mencari g agar DCF = harga pasar","Menghitung rata-rata revenue","Merapikan format sel tabel"], answer: 1, k: "reverse_dcf", diff: "Easy",
 hints: ["Seek = mencari. Goal = target.", "Targetnya harga pasar."],
 explain: "Goal seek: ubah g sampai nilai/saham = $399,81. Itulah g implied. (Real-04 § Tugas praktik)"}
],
hellPass: 80,
hell: [
{q: "WACC 9% → 7%. g implied akan…", opts: ["g implied akan naik","g implied tetap sama","Turun; butuh g lebih kecil","g implied menjadi negatif"], answer: 2, diff: "Medium",
 explain: "Diskonto lebih rendah → PV lebih tinggi untuk setiap g → g yang dibutuhkan untuk mencapai $400 mengecil. Sensitivitas dua arah."},
{q: "Bulls bilang 'robotaxi belum dihitung!'. Jawaban analis yang benar?", opts: ["Benar; opsi dinilai terpisah","Betul; model ini salah total","Robotaxi tidak ada nilainya","Naikkan g hingga mencakup robotaxi"], answer: 0, diff: "Hard",
 explain: "Jangan campur: DCF inti menilai bisnis yang ada; opsi (robotaxi/AI) dinilai terpisah (opsionalitas). Mencampur keduanya = mengaburkan keduanya."},
{q: "Kenapa proyeksi 10 tahun, bukan 5?", opts: ["Agar angkanya terlihat besar","Sebab itu aturan baku DCF","Karena 10 angka yang bulat","Horizon panjang; risiko ikut besar"], answer: 3, diff: "Medium",
 explain: "Growth story butuh horizon panjang agar compounding bekerja — dengan harga: 10 tahun = 10 tahun tebakan. Terminal value makin dominan."},
{q: "Margin 12% → 15%. Efek ke g implied?", opts: ["g implied akan naik","g implied akan turun","g implied akan tetap","Model menjadi error"], answer: 1, diff: "Medium",
 explain: "Dua tuas DCF growth: pertumbuhan DAN profitabilitas. Margin lebih tinggi → nilai lebih tinggi per g → g implied turun. Uji keduanya, bukan cuma g."},
{q: "Reverse-DCF TIDAK cocok untuk?", opts: ["Saham growth berkas positif","Konglomerat multi-segmen","Pre-revenue tanpa kas proyeksian","Valuasi saham bank komersial"], answer: 2, diff: "Hard",
 explain: "Reverse-DCF butuh kerangka DCF yang hidup — perlu arus kas yang bisa diproyeksikan. Pre-revenue = tidak ada yang bisa di-reverse; pakai metode lain (venture-style)."}
],
tasks: [
{t: "Tugas A — Reverse-DCF Tesla (±3 jam)", d: "Download workbook RC4. Proyeksikan 10 tahun untuk g = 8%, 12%, 16% → nilai/saham tiap skenario. Semua rumus link ke input.", url: "https://drive.google.com/drive/folders/15etlyOcKIB4Uz9b_I401Iz2ASubqGa2A"},
{t: "Tugas B — Goal seek g implied (±1 jam)", d: "Di blok REVERSE-DCF workbook: ubah sel 'g (input — coba-coba / goal seek)' sampai 'Nilai/saham (g=input)' = $399,81 (Goal Seek atau trial-error). Bandingkan dengan 38,7% — lalu uji: margin 15% → g implied jadi berapa?"},
{t: "Tugas C — Kuis di atas", d: "Target ≥4/5 benar."}
],
blind: {h: "Uji Kilat — angka beda", body: `
<p><b>1.</b> DCF bilang $50 di g=10%, harga pasar $120. Apa pertanyaan reverse-DCF-nya?</p>
<details class="ans"><summary>Jawaban</summary><p>"g berapa yang membuat DCF = $120?" — lalu nilai apakah g itu masuk akal.</p></details>
<p><b>2.</b> g implied sebuah saham = 8%/tahun. Saham growth atau value?</p>
<details class="ans"><summary>Jawaban</summary><p>Cenderung value/wajar — 8% CAGR 10 tahun = ekspektasi moderat, bukan keajaiban.</p></details>`}
},
{
id: "real-05", track: "Real Cases", title: "TLKM: Capex Harvest",
sub: "Real Case 5 · ±5 jam · Jembatan capex → FCF",
est: "5 jam",
prerequisites: ["fcf", "dcf"],
driveFolder: "https://drive.google.com/drive/folders/15etlyOcKIB4Uz9b_I401Iz2ASubqGa2A",
audio: "assets/audio/real-05.mp3",
checker: "real-05",
sections: [
{h: "Kenapa Telkom?", body: `
<p><b>Telkom Indonesia (TLKM.JK)</b> — infrastruktur defensif: revenue flat ±Rp147–150T (2022–2025), tapi ada cerita di bawahnya: <b>capex turun Rp38,3T → Rp25,8T</b> sementara OCF stabil ±Rp64T. Hasilnya: <b>FCF mengembang Rp35,05T → Rp38,04T</b>. Inilah "capex harvest": panen dari investasi masa lalu.</p>
<div class="callout"><b>Kenapa ini pola wajib dikenal?</b> Setiap bisnis infrastruktur (telekomunikasi, tol, listrik) hidup dalam <b>siklus capex</b>: bangun (FCF tertekan) → panen (FCF mengembang) → bangun lagi (5G, data center). Analis yang hanya melihat laba bersih tidak pernah melihat siklusnya.</p></div>`},
{h: "Kenapa FCF, bukan laba bersih?", body: `
<div class="formula">FCF = OCF − Capex</div>
<p>Net income TLKM 2025 Rp17,49T — tapi <b>FCF Rp38,04T</b>, lebih dari 2× lipat! Selisihnya = D&A raksasa (aset jaringan disusutkan, tapi kas tidak keluar) dikurangi capex. Untuk perusahaan infrastruktur, <b>FCF adalah angka kebenaran</b>; laba bersih adalah angka akuntansi.</p>
<div class="callout"><b>📋 Status data:</b> net income Rp17,49T & saham 98,58 miliar = <b>input ilustratif pengajaran</b>. Terverifikasi (31 Okt 2026): laba attributable FY2025 <b>Rp17,81T</b> (Telkom Annual Report); saham beredar <b>±99,05 miliar</b> per 31 Des 2025 (di luar treasury). Selisih &lt;2% — tidak mengubah pelajaran jembatan capex→FCF.</div>
<div class="example korporat"><div class="lbl">🏢 Jembatan 2022 → 2025</div>
<p>OCF 2022 Rp73,35T > OCF 2025 Rp63,84T — operasi "melemah". Tapi capex 2022 Rp38,3T vs 2025 Rp25,8T → <b>FCF justru naik</b> Rp35,05T → Rp38,04T. Narasi "kinerja turun" dari OCF terbantahkan oleh FCF.</p></div>`},
{h: "Kenapa dua skenario capex?", body: `
<p><b>Panen</b> (capex tetap hemat Rp25,8T): FCF 2026 Rp39,32T → DCF Rp4.015/saham. <b>Wave 5G</b> (capex naik lagi ke Rp34T): FCF 2026 Rp31,12T → DCF Rp3.092/saham. Satu asumsi capex = selisih valuasi <b>Rp923/saham</b>.</p>
<div class="callout"><b>Presisi: "tumbuh 2%" itu untuk apa?</b> Di model ini g +2%/tahun dipakai <b>dua kali</b>: menumbuhkan OCF 2025→2026, lalu menumbuhkan <b>FCF 2027–2030 dari basis 2026</b> (capex konstan per skenario). Jadi label yang tepat = <b>"FCF tumbuh 2%"</b> — bukan "OCF tumbuh 2% + capex konstan" (itu akan memberi jalur FCF yang sedikit berbeda). Bedanya kecil di sini, tapi analis presisi tidak mencampur keduanya.</div>
<div class="callout"><b>Kenapa ini inti case-nya?</b> Karena untuk bisnis infrastruktur, <b>capex adalah variabel valuasi terpenting</b> — lebih penting dari growth revenue. Analis Telkom yang tidak punya pandangan soal siklus capex (kapan wave 5G/data center datang) tidak punya pandangan apa-apa.</p></div>`},
{h: "Kenapa DCF bilang Rp4.015 tapi pasar Rp1.980?", body: `
<p>Ini <b>gap terbesar</b> di semua 5 case: DCF mekanis (WACC 11%, g 2%) bilang Rp4.015 — pasar bilang Rp1.980. FCF yield 2025 = <b>19,5%</b>: tiap Rp100 harga didukung Rp19,5 FCF tahunan. Di kertas: murah luar biasa.</p>
<div class="callout"><b>Kenapa pasar tidak percaya?</b> Kandidat: risiko BUMN (intervensi, dividen dipaksa), regulasi tarif, kompetisi seluler, keraguan capex 5G akan melahap FCF lagi. <b>Pelajaran termahal course ini:</b> valuasi = angka + penilaian risiko yang <b>tidak ada di spreadsheet</b>. DCF yang mengabaikan gap ini bukan analisis — itu kalkulator.</p></div>`},
{h: "Tugas praktik", body: `
<p>Bangun jembatan capex → FCF Telkom 2022–2025, lalu DCF 2 skenario (Panen vs Wave 5G): FCF 2026–2030, PV, EV → equity → nilai/saham → FCF yield. Terakhir: tulis 3 kalimat menjelaskan gap Rp4.015 vs Rp1.980 menurut versimu.</p>
<div class="callout"><b>Kenapa tugas ini penting?</b> Ini case penutup — sintesis segalanya: baca data riil, bangun mekanik, hadapi gap vs pasar dengan jujur. Analis hebat tidak menjual angka; ia menjual <b>penjelasan</b>.</p></div>`},
{h: "🔥 Bekal Hell Mode", body: `
<ul>
<li><b>Capex harvest</b> = fase panen setelah siklus investasi mereda.</li>
<li><b>FCF = OCF − capex</b> — angka kebenaran infrastruktur.</li>
<li><b>FCF yield</b> = FCF ÷ market cap.</li>
<li><b>Siklus capex</b> = bangun → panen → bangun lagi.</li>
<li><b>Gap model vs pasar</b> = pertanyaan, bukan vonis.</li>
</ul>`}
],
quiz: [
{q: "FCF 2025 = 63,84 − 25,80 = ?", opts: ["Rp38,04T","Rp89,64T","Rp17,49T","Rp25,80T"], answer: 0, k: "fcf", diff: "Easy",
 hints: ["FCF = OCF − capex.", "63,84 − 25,80 = ?"],
 explain: "Rp38,04T. Bandingkan dengan net income Rp17,49T — FCF > 2× lipat laba bersih. (Real-05 § Kenapa FCF, bukan laba bersih?)"},
{q: "Capex turun 38,3→25,8 (revenue flat). Efek ke FCF?", opts: ["FCF ikut turun mengikuti OCF","Tidak menimbulkan efek apa pun","FCF mengembang — fase capex harvest","FCF menjadi negatif total"], answer: 2, k: "capex_cycle", diff: "Medium",
 hints: ["FCF = OCF − capex.", "Capex turun, OCF stabil → ?"],
 explain: "Capex harvest: investasi masa lalu dipanen — FCF naik Rp35,05T → Rp38,04T meski OCF melemah. (Real-05 § Kenapa Telkom?)"},
{q: "Skenario Wave 5G: capex kembali Rp34T. FCF 2026 = ?", opts: ["Rp39,32T","Rp31,12T","Rp65,12T","Rp38,04T"], answer: 1, k: "capex_cycle", diff: "Medium",
 hints: ["OCF 2026 = 63,84 × 1,02.", "65,12 − 34 = ?"],
 explain: "Rp31,12T. Satu asumsi capex = selisih valuasi Rp923/saham vs skenario Panen. (Real-05 § Kenapa dua skenario capex?)"},
{q: "FCF yield 19,5% artinya?", opts: ["Dividen tunai sebesar 19,5%","Capex 19,5% dari revenue","Rasio utang 19,5% dari ekuitas","Rp100 harga didukung Rp19,5 FCF"], answer: 3, k: "fcf", diff: "Medium",
 hints: ["Yield = FCF ÷ market cap.", "Seperti dividend yield, tapi untuk FCF."],
 explain: "FCF yield = 38,04 ÷ (1.980 × 98,58 miliar) = 19,5%. Di kertas: sangat murah. (Real-05 § Kenapa DCF bilang Rp4.015?)"},
{q: "DCF Panen Rp4.015 vs pasar Rp1.980. Sikap analis yang benar?", opts: ["Rekomendasi BELI; DCF tak pernah salah","Jelaskan gap: valuasi = angka + risiko","Abaikan pasar; pasar selalu salah","Naikkan WACC sampai cocok pasar"], answer: 1, k: "dcf", diff: "Hard",
 hints: ["Gap terbesar di 5 case.", "Risiko apa yang tidak ada di spreadsheet?"],
 explain: "Gap adalah pertanyaan: risiko BUMN, regulasi, kompetisi, keraguan capex 5G. Analis menjual penjelasan, bukan angka. (Real-05 § Kenapa DCF bilang Rp4.015 tapi pasar Rp1.980?)"}
],
hellPass: 80,
hell: [
{q: "Kenapa FCF 2022 (Rp35,05T) < FCF 2025 (Rp38,04T) padahal OCF 2022 lebih tinggi?", opts: ["Karena revenue-nya turun","Capex 2022 jauh di atas 2025","Karena tarif pajak naik","Data laporannya salah"], answer: 1, diff: "Medium",
 explain: "OCF 2022 Rp73,35T − capex Rp38,3T = Rp35,05T. OCF turun tapi capex turun lebih banyak → FCF naik. Selalu baca OCF DAN capex."},
{q: "g FCF 2% dan g terminal 2% — konsisten?", opts: ["Ya; steady state ke laju permanen","Tidak; keduanya harus berbeda","Tidak; terminal harus 0%","Ya, asal WACC-nya juga 2%"], answer: 0, diff: "Medium",
 explain: "Konsisten: proyeksi eksplisit melandai ke laju permanen. Yang tidak konsisten: g proyeksi 15% lalu terminal 2% tanpa fase transisi."},
{q: "Net debt Rp41,04T dikurangkan dari EV. Kenapa?", opts: ["Utang harus dibayar terlebih dulu","Agar hasilnya menjadi lebih kecil","EV untuk semua pemodal; sisakan ekuitas","Karena aturan OJK mewajibkan"], answer: 2, diff: "Medium",
 explain: "EV = nilai untuk saham + kreditur. Kurangi net debt (utang − kas) → sisa untuk pemegang saham. Sama seperti SOTP Astra."},
{q: "Capex panen ternyata naik ke Rp30T (bukan 25,8T). Nilai/saham akan…", opts: ["Nilai saham akan naik","Nilai saham akan tetap","Naik; investasi itu bagus","Turun karena FCF lebih kecil"], answer: 3, diff: "Medium",
 explain: "Capex +Rp4,2T/tahun → FCF −Rp4,2T/tahun → PV & EV turun. 'Investasi bagus' hanya jika return > WACC — tidak otomatis."},
{q: "Dividen vs FCF — mana lebih fundamental untuk valuasi?", opts: ["FCF: dividen kebijakan, FCF kapasitas","Dividen — kas yang benar-benar diterima","Keduanya sama saja fungsinya","Dividen untuk BUMN; FCF untuk swasta"], answer: 0, diff: "Hard",
 explain: "Dividen = kebijakan (bisa dipaksa/ditahan). FCF = kapasitas kas sebenarnya. Valuasi memakai kapasitas; dividen hanya salah satu penggunaannya."}
],
tasks: [
{t: "Tugas A — Capex harvest (±3 jam)", d: "Download workbook RC5. Bangun jembatan OCF−capex=FCF 2022–2025, lalu DCF Panen vs Wave 5G → nilai/saham → FCF yield. Semua rumus link.", url: "https://drive.google.com/drive/folders/15etlyOcKIB4Uz9b_I401Iz2ASubqGa2A"},
{t: "Tugas B — Jelaskan gap (±1 jam)", d: "Tulis 3 kalimat versimu: kenapa pasar hanya mau bayar Rp1.980 untuk DCF Rp4.015? Riset 1 berita terbaru Telkom untuk mendukung penjelasanmu."},
{t: "Tugas C — Kuis di atas", d: "Target ≥4/5 benar."}
],
blind: {h: "Uji Kilat — angka beda", body: `
<p><b>1.</b> OCF 50, capex 30. FCF = ? Capex turun ke 20, OCF tetap. FCF baru?</p>
<details class="ans"><summary>Jawaban</summary><p>20 → 30. Capex harvest: −10 capex = +10 FCF.</p></details>
<p><b>2.</b> FCF Rp10T, market cap Rp40T. FCF yield = ?</p>
<details class="ans"><summary>Jawaban</summary><p>25%. Sangat tinggi — tanyakan kenapa pasar ragu.</p></details>`}
},
{
id: "real-06", track: "Real Cases", title: "BBCA: Harga Mahal yang Masuk Akal?",
sub: "Real Case 6 · ±5 jam · Residual income bank",
est: "5 jam",
prerequisites: ["dcf", "model_3_statement"],
driveFolder: "1tqJmo75dI7OjtuKFfUb310jXO1W1CaQ8",
audio: "assets/audio/real-06.mp3",
checker: "real-06",
sections: [
{h: "⚠️ Peringatan kontaminasi", body: `
<div class="callout" style="border-left:6px solid #B3261E"><b>JANGAN buka case ini sebelum lulus Ujian Blind BBCA</b> di FSA Lab (<a href="https://fsa-lab.pages.dev/ujian/">fsa-lab.pages.dev/ujian/</a>).
Case ini memakai emiten dan periode yang SAMA dengan ujian blind. Membukanya dulu = ujianmu bukan blind lagi — vonis otomatis jadi <b>"coached capstone"</b>, bukan bukti penguasaan.
Sudah lulus ujian? Lanjutkan — ini artefak kedua dari "one issuer, three artifacts": ujian FSA → valuasi FMVA → research note.</div>`},
{h: "Kenapa bank tidak bisa di-DCF biasa?", body: `
<p><b>Bank Central Asia (BBCA.JK)</b> adalah bank termahal di Indonesia: <b>P/BV ~3,9x</b> (MNC Sekuritas, Okt 2025). DCF biasa mendiskon <b>FCFF</b> — kas untuk semua pemodal <i>setelah</i> membayar utang. Masalahnya: utang bank — DPK <b>Rp1.134tn</b> (BRIDS, FY24) — bukan beban pendanaan, melainkan <b>bahan baku</b>. Bank "meminjam" giro dan tabungan untuk "meminjamkan" kredit <b>Rp911,1tn</b> (LK audited BCA, 31 Des 2024). Menghitung "net debt" BBCA lalu mengurangkannya dari EV menghasilkan angka ngawur.</p>
<div class="formula">V0 = B0 + &Sigma; RI<sub>t</sub> / (1+Ke)<sup>t</sup> &nbsp;&nbsp;&middot;&nbsp;&nbsp; RI<sub>t</sub> = NI<sub>t</sub> &minus; Ke &times; B<sub>t&minus;1</sub></div>
<p>Untuk bank, yang didiskon bukan FCFF melainkan <b>dividen</b> (DDM) atau <b>kelebihan laba di atas biaya modal</b> — residual income. Keduanya berjangkar pada <b>ekuitas (book)</b>, bukan enterprise value.</p>
<div class="example jebakan"><div class="lbl">🚫 Jebakan EV/EBITDA bank</div>
<p>Analis pemula menaruh BBCA di screener EV/EBITDA bersama UNVR dan ASII. Hasilnya: BBCA terlihat "murah" atau "error" — karena EV bank tidak bermakna. Multiple yang benar untuk bank adalah <b>P/BV</b> dan <b>P/E</b>, dan keduanya harus dibaca bersama <b>ROE</b>.</p></div>
<div class="callout"><b>Kenapa residual income, bukan sekadar P/BV mentah?</b> Karena P/BV 3,9x tanpa konteks = "mahal". Residual income memecahnya menjadi: berapa bagian yang dijelaskan book value hari ini, dan berapa bagian yang menuntut ROE di atas biaya modal <i>selamanya</i>. Di situlah debat valuasi yang sebenarnya terjadi.</p></div>`},
{h: "Kenapa residual income cocok untuk BBCA?", body: `
<p>Residual income berdiri di atas <b>identitas clean surplus</b>: ekuitas tahun depan = ekuitas tahun ini + laba &minus; dividen. Nilai wajar = <b>book value hari ini</b> + PV dari "kelebihan" laba (ROE &minus; Ke) di masa depan.</p>
<div class="formula">RI<sub>t</sub> = (ROE &minus; Ke) &times; B<sub>t&minus;1</sub></div>
<p>Angka jangkarnya (FY24, terverifikasi): laba bersih <b>Rp54,8tn</b> (+12,7% YoY; FY23 Rp48,6tn — Maybank Sekuritas 26 Jan 2025 &amp; BRIDS 24 Jan 2025). Book value per saham <b>Rp2.131</b> dengan <b>123,28 miliar</b> saham (MNC, Okt 2025) &rarr; ekuitas awal model <b>B0 = Rp262,71tn</b>.</p>
<div class="example korporat"><div class="lbl">🏢 Cek konsistensi pertama</div>
<p>ROE FY24 implisit = 54,8 / 262,71 = <b>20,86%</b> — konsisten dengan klaim "ROE &gt;20%" (Maybank, Jan 2025). Kalau hasil hitunganmu jauh dari klaim broker, jangan lanjutkan modelnya: ada yang salah di input atau pemahamanmu. Analis yang baik memverifikasi <i>sebelum</i> memproyeksikan.</p></div>
<div class="callout"><b>⚠️ Caveat ekuitas:</b> Rp262,71tn adalah <b>derivasi</b> (Rp2.131 &times; 123,28 miliar saham, dari MNC) — <b>bukan angka LK audited langsung</b>. Untuk presisi penuh, ambil total ekuitas dari LK BCA di bca.co.id. Model ini memakai derivasi agar bisa jalan; labeli apa adanya.</p>
<p>Dengan asumsi kerja ROE 20%, payout 60%, Ke 11,5%: <b>RI 2025 = 52,54 &minus; 30,21 = Rp22,33tn</b> — laba Rp52,54tn dikurangi "sewa" modal Rp30,21tn. Hanya kelebihan inilah yang menciptakan nilai di atas book.</p></div>`},
{h: "Kenapa justified P/BV = (ROE&minus;g)/(Ke&minus;g)?", body: `
<p>Kalau ROE, payout, dan Ke konstan selamanya, deret residual income menyusut menjadi satu rumus elegan — <b>justified P/BV</b>:</p>
<div class="formula">P/BV = 1 + (ROE &minus; Ke)/(Ke &minus; g) = (ROE &minus; g)/(Ke &minus; g)</div>
<p>Tiga tuas, tidak lebih: <b>ROE</b> (seberapa profitable), <b>g</b> (seberapa lama tumbuh), <b>Ke</b> (seberapa berisiko). Growth datang dari dalam: <b>g = ROE &times; retensi = 20% &times; 40% = 8%</b> (payout 60% = asumsi, konsisten dengan historis BBCA).</p>
<div class="example korporat"><div class="lbl">🏢 Hitungannya</div>
<p>(0,20 &minus; 0,08) / (0,115 &minus; 0,08) = <b>3,43x</b>. Cross-check via DDM: dividen 2025 = 52,54 &times; 60% = Rp31,53tn; nilai = 31,53 / (0,115 &minus; 0,08) = <b>Rp900,72tn</b> &mdash; persis = B0 &times; 3,43. Dua metode, satu kerangka: <b>identitas clean surplus terbukti</b>. Kalau DDM dan RI-mu beda jauh, ada rumus yang salah &mdash; bukan "dua pendapat".</p></div>
<div class="callout"><b>Kenapa Ke 11,5%?</b> Asumsi kerja (kisaran riset 11&ndash;12%). Ke bukan angka langit: ia harga yang diminta investor untuk risiko ekuitas bank Indonesia. Di tugas sensitivitas kamu akan merasakan betapa brutalnya 1% perubahan Ke terhadap justified P/BV.</p></div>`},
{h: "Kenapa pasar berani bayar 3,9x? (debat franchise vs fade)", body: `
<p>Sekarang benturkan tiga angka: model <b>2-tahap</b> (ROE memudar ke 16% setelah 2029) memberi <b>1,98x &rarr; Rp4.215/saham</b>. Rumus <b>1-tahap</b> (ROE 20% abadi) memberi <b>3,43x</b>. Pasar (MNC, Okt 2025) membayar <b>3,9x &rarr; Rp8.311/saham</b>. Ketiganya "benar" di bawah asumsinya masing-masing.</p>
<div class="example korporat"><div class="lbl">🏢 Membaca pikiran pasar</div>
<p>3,9x dengan Ke 11,5% dan payout 60% mengimplikasikan <b>ROE ~20,8% selamanya</b> (ada di Hell Mode &mdash; hitung sendiri). Pasar tidak sedang "salah hitung": ia bertaruh bahwa franchise <b>CASA 82,4%</b> (Maybank, Jan 2025) &mdash; dana giro/tabungan termurah di Indonesia &mdash; membuat ROE 20%+ <b>tidak memudar</b>. Pertanyaannya bukan "berapa nilai wajar", melainkan: <b>apakah premi ini layak dibayar untuk franchise itu &mdash; dan kapan tidak lagi layak?</b></p></div>
<div class="callout"><b>Data yang menguji taruhan pasar:</b> guidance FY25 (via BRIDS, Jan 2025) &mdash; kredit <b>6&ndash;8%</b> (FY24: +14%), <b>NIM 5,7&ndash;5,8%</b> (FY24: 5,8%), CoC <b>0,3%</b> stabil, CIR <b>33&ndash;34%</b> (FY24: 31,5%). Plus sinyal 9M25: NIM 5,8% flat YoY tapi <b>turun 10bps QoQ</b> (MNC, Okt 2025). Kredit tumbuh kencang tapi margin tertekan dan biaya naik &mdash; <b>apakah volume mengkompensasi kompresi margin?</b> Itulah inti debat analis BBCA.</p></div>`},
{h: "Jebakan: dua NIM yang sama-sama &ldquo;benar&rdquo;", body: `
<p>Riset menemukan <b>NIM FY24 5,8%</b> (Maybank, konsolidasi; 5,9% di 4Q24) dan <b>NIM FY24 6,4%</b> (BRIDS; FY23: 6,3%). Keduanya dari broker bereputasi. Keduanya "benar" &mdash; karena <b>definisi penyebutnya beda</b> (rata-rata aset produktif versi masing-masing).</p>
<div class="example jebakan"><div class="lbl">🚫 Jebakan definisi</div>
<p>Uji dengan NII FY24 Rp82,3tn (BRIDS): aset produktif implisit versi 5,8% = 82,3/0,058 = <b>Rp1.419tn</b>; versi 6,4% = 82,3/0,064 = <b>Rp1.286tn</b>. Selisihnya <b>Rp133tn</b> &mdash; lebih besar dari total kredit banyak bank menengah! Analis yang membandingkan NIM 6,4% (BRIDS) dengan guidance 5,7&ndash;5,8% lalu berteriak "NIM anjlok 60bps!" sedang membandingkan <b>apel dengan jeruk</b>. Bandingkan yang se-skala: 5,8% &rarr; 5,7&ndash;5,8% = stabil, bukan anjlok.</p></div>
<div class="callout"><b>Sensitivitas yang jujur:</b> dari ROE model 20%, jika NIM turun permanen <b>30bps</b> (&rarr; ~5,5%): &Delta;NII = &minus;Rp4,26tn &rarr; &Delta;laba setelah pajak (22%) = &minus;Rp3,32tn &rarr; <b>ROE stres 18,74%</b> &rarr; justified P/BV <b>2,81x</b> (dari 3,43x). Premi pasar 3,9x <b>tidak tahan</b> kompresi NIM permanen &mdash; kecuali kamu percaya CASA 82,4% menjaganya tidak terjadi.</p></div>`},
{h: "Tugas praktik", body: `
<p>Bangun model residual income BBCA di workbook latihan: (A) rekonsiliasi dua definisi NIM dan pilih yang konsisten dengan skala guidance; (B) proyeksikan NI, ekuitas, dan RI 2025&ndash;2029 lalu hitung PV RI, terminal value, equity value &rarr; nilai/saham &rarr; P/BV 2-tahap; (C) hitung justified P/BV 1-tahap + cross-check DDM (harus &asymp; B0 &times; 3,43); (D) jalankan sensitivitas NIM &minus;30bps. Semua sel jawaban harus rumus yang me-link ke asumsi.</p>
<div class="callout"><b>Kenapa tugas ini penting?</b> Ini valuasi bank pertamamu &mdash; dan pelajaran terbesarnya bukan rumusnya, melainkan <b>disiplin definisinya</b>. Satu angka NIM yang salah skala bisa menggeser kesimpulanmu sebesar Rp133tn aset implisit.</p></div>`},
{h: "🔥 Bekal Hell Mode", body: `
<ul>
<li><b>Residual income</b> = NI &minus; Ke &times; book: kelebihan laba di atas "sewa" modal.</li>
<li><b>Clean surplus</b> = B<sub>t</sub> = B<sub>t&minus;1</sub> + NI &minus; Div. DDM dan RI harus cocok.</li>
<li><b>Justified P/BV</b> = (ROE&minus;g)/(Ke&minus;g). Tiga tuas: ROE, g, Ke.</li>
<li><b>g bank</b> = ROE &times; (1 &minus; payout). Dividen besar = tumbuh lambat.</li>
<li><b>Jebakan NIM</b> = definisi antar-broker beda; samakan skala sebelum membandingkan.</li>
<li><b>Premi 3,9x</b> = pasar bertaruh ROE 20%+ tidak memudar. Itu taruhan, bukan fakta.</li>
</ul>`}
],
quiz: [
{q: "Kenapa DCF/FCFF standar tidak dipakai untuk menilai BBCA?", opts: ["Karena BBCA tidak punya utang sama sekali","Karena utang bank (DPK) adalah bahan baku, bukan pendanaan — FCFF tidak bermakna","Karena bank dilarang memakai DCF oleh regulator","Karena FCFF bank selalu negatif"], answer: 1, k: "bank_valuation", diff: "Easy",
 hints: ["Pikirkan dari mana bank dapat 'barang dagangannya'.", "DPK Rp1.134tn itu apa bagi bank: beban atau bahan baku?"],
 explain: "DPK (Rp1.134tn, BRIDS FY24) adalah bahan baku yang 'dipinjam' untuk disalurkan jadi kredit (Rp911,1tn audited). FCFF setelah membayar utang tidak bermakna untuk bank — yang didiskon adalah dividen / kelebihan laba atas modal. (Real-06 § Kenapa bank tidak bisa di-DCF biasa?)"},
{q: "B0 Rp262,71tn, ROE 20%, Ke 11,5%. Residual income 2025 = ?", opts: ["Rp52,54tn","Rp30,21tn","Rp22,33tn","Rp52,43tn"], answer: 2, k: "residual_income", diff: "Medium",
 hints: ["RI = NI − Ke × B. Hitung NI dulu.", "NI = 0,20 × 262,71 = 52,54. Capital charge = 0,115 × 262,71 = ?"],
 explain: "NI = 0,20 × 262,71 = Rp52,54tn; capital charge = 0,115 × 262,71 = Rp30,21tn; RI = 52,54 − 30,21 = Rp22,33tn. Rp52,54tn = lupa kurangi sewa modal; Rp30,21tn = itu sewanya, bukan kelebihannya. (Real-06 § Kenapa residual income cocok untuk BBCA?)"},
{q: "ROE 20%, payout 60% (g = 8%), Ke 11,5%. Justified P/BV 1-tahap = ?", opts: ["1,74x","3,43x","5,71x","1,98x"], answer: 1, k: "justified_pbv", diff: "Medium",
 hints: ["Rumus: (ROE − g)/(Ke − g).", "Pembilang 0,20−0,08 = 0,12; penyebut 0,115−0,08 = 0,035."],
 explain: "(0,20−0,08)/(0,115−0,08) = 0,12/0,035 = 3,43x. 1,74x = ROE/Ke (lupa growth); 5,71x = lupa kurangi g di pembilang; 1,98x = hasil model 2-tahap dengan fade — bukan rumus 1-tahap. (Real-06 § Kenapa justified P/BV?)"},
{q: "Analis membandingkan NIM BRIDS 6,4% (FY24) dengan guidance 5,7–5,8% lalu menyimpulkan 'NIM anjlok'. Kesalahan utamanya?", opts: ["Angka 6,4% pasti salah ketik","Membandingkan dua definisi/skala berbeda — yang se-skala (5,8%) menunjukkan NIM stabil","Guidance tidak boleh dipakai untuk proyeksi","NIM tidak memengaruhi valuasi bank"], answer: 1, k: "nim_trap", diff: "Medium",
 hints: ["6,4% dan 5,8% memakai penyebut berbeda.", "Guidance 5,7–5,8% se-skala dengan angka 5,8%, bukan 6,4%."],
 explain: "Definisi antar-broker beda (implisit aset produktif selisih Rp133tn). Perbandingan yang benar: 5,8% → guidance 5,7–5,8% = stabil. Membandingkan 6,4% dengan 5,7–5,8% = apel vs jeruk. (Real-06 § Jebakan: dua NIM yang sama-sama 'benar')"},
{q: "P/BV pasar 3,9x vs justified 1-tahap 3,43x. Interpretasi yang jujur?", opts: ["Pasar pasti salah hitung — arbitrase","Model 3,43x pasti benar — jual","Pasar mengasumsikan kombinasi ROE lebih tinggi / Ke lebih rendah / g lebih tinggi selamanya","P/BV di atas 3x selalu bubble"], answer: 2, k: "market_premium", diff: "Hard",
 hints: ["Rumus punya tiga tuas: ROE, g, Ke.", "3,9x mengimplikasikan ROE ~20,8% selamanya — itu taruhan, bukan fakta."],
 explain: "Selisih 3,9x vs 3,43x = perbedaan asumsi, bukan kesalahan hitung. Pasar bertaruh franchise CASA 82,4% membuat ROE 20%+ tidak memudar. Tugas analis: menilai apakah taruhan itu masuk akal — bukan mengklaim pasar bodoh. (Real-06 § Kenapa pasar berani bayar 3,9x?)"},
{q: "Dari ROE model 20%: NIM turun permanen 30bps → justified P/BV menjadi?", opts: ["Tetap 3,43x","3,90x","2,81x","1,98x"], answer: 2, k: "sensitivity", diff: "Hard",
 hints: ["ΔNII = −0,003 × Rp1.419tn = −Rp4,26tn.", "Δlaba setelah pajak 22% = −Rp3,32tn → ROE 18,74% → hitung ulang (ROE−g)/(Ke−g)."],
 explain: "ROE stres = 20% − 3,32/262,71 = 18,74%; g = 7,49%; (0,1874−0,0749)/(0,115−0,0749) = 2,81x. Premi 3,9x tidak tahan kompresi NIM permanen. 1,98x = hasil model fade 2-tahap — konteks berbeda. (Real-06 § Jebakan NIM)"},
{q: "DDM 1-tahap = Rp900,72tn ≈ B0 × 3,43. Ini membuktikan?", opts: ["DDM selalu lebih akurat dari RI","Identitas clean surplus: dua metode, satu kerangka — kalau beda jauh, ada rumus yang salah","BBCA sebaiknya dinilai dengan DDM saja","P/BV 3,43x adalah harga pasar"], answer: 1, k: "ddm", diff: "Medium",
 hints: ["DDM dan RI diturunkan dari identitas yang sama.", "Kecocokan = validasi silang, bukan kebetulan."],
 explain: "DDM dan residual income adalah dua wajah identitas clean surplus (B_t = B_{t−1} + NI − Div). Kecocokan 900,72tn ≈ 262,71 × 3,43 memvalidasi mekanik model — selisih besar = bug rumus. (Real-06 § Kenapa justified P/BV?)"}
],
hellPass: 80,
hell: [
{q: "P/BV pasar 3,9x, Ke 11,5%, payout 60% (retensi 40%). ROE abadi yang diimplikasikan pasar = ?", opts: ["20,0%","22,5%","20,8%","18,7%"], answer: 2, diff: "Hard",
 explain: "3,9 = (R − 0,4R)/(0,115 − 0,4R) → 0,6R = 3,9×(0,115 − 0,4R) → 2,16R = 0,4485 → R = 20,76% ≈ 20,8%. Pasar bertaruh ROE nyaris 21% selamanya — jauh di atas bank normal. Percaya atau tidak, itu keputusan analis."},
{q: "Model 2-tahap memakai ROE terminal 16%, di bawah ROE kini 20%. Alasan konseptualnya?", opts: ["Agar nilai model di bawah harga pasar","Mean reversion: kompetisi mengikis kelebihan ROE; 16% pun masih premium","Karena 16% angka yang bulat","ROE terminal wajib sama dengan g terminal"], answer: 1, diff: "Medium",
 explain: "Kelebihan ROE adalah sewa ekonomi — kompetisi (bank digital, fintech) mengikisnya seiring waktu. 16% masih jauh di atas cost of equity 11,5%: model tidak bilang BBCA jadi bank medioker, hanya tidak abadi luar biasa."},
{q: "Ke naik 11,5% → 13% (mis. premi risiko Indonesia naik). Justified P/BV 1-tahap menjadi?", opts: ["3,43x","2,81x","2,40x","1,98x"], answer: 2, diff: "Hard",
 explain: "(0,20−0,08)/(0,13−0,08) = 0,12/0,05 = 2,40x. Satu setengah persen di Ke menghapus ~30% justified multiple — inilah kenapa asumsi Ke wajib diuji, bukan diterima mentah."},
{q: "Provisi BBCA naik 49% YoY di FY24, tapi CoC tetap 0,3% dan coverage NPL 209%. Tafsir analis yang tepat?", opts: ["Sinyal awal deteriorasi — jual","Normalisasi provisi pasca-Covid dengan buffer tebal; tetap pantau LAR 5,0%","Provisi tidak memengaruhi laba bank","CoC 0,3% berarti tidak ada kredit macet"], answer: 1, diff: "Medium",
 explain: "CoC 0,3% dari NPL 1,7% dengan coverage 209% = bank menaikkan cadangan dari posisi kuat (normalisasi pasca-Covid), bukan menambal lubang. Tapi LAR 5,0% (restru Covid) tetap wajib dipantau — di situlah risiko bersembunyi."},
{q: "Dalam kondisi apa DDM dan residual income bisa memberi nilai yang BERBEDA?", opts: ["Tidak pernah — rumusnya identik","Ketika clean surplus jebol: buyback di atas/bawah book, OCI besar, atau dividen dari cadangan","Ketika payout di atas 100%","Ketika Ke lebih besar dari ROE"], answer: 1, diff: "Hard",
 explain: "Kesetaraan DDM = RI bertumpu pada B_t = B_{t−1} + NI − Div. Buyback di atas book, revaluasi via OCI, atau setoran modal memutus rantai itu — analis bank wajib rekonsiliasi ekuitas, bukan mengasumsikan rumusnya selalu cocok."}
],
tasks: [
{t: "Tugas A — Model residual income BBCA (±3 jam)", d: "Download workbook RC6. Kerjakan blok A (rekonsiliasi NIM), B (RI 2-tahap → nilai/saham → P/BV), C (justified 1-tahap + cross-check DDM), D (sensitivitas NIM −30bps). Semua rumus me-link ke asumsi.", url: "https://drive.google.com/drive/folders/1tqJmo75dI7OjtuKFfUb310jXO1W1CaQ8"},
{t: "Tugas B — Uji taruhan pasar (±1 jam)", d: "Di file jawabanmu: ubah ROE terminal 16%→20% (franchise abadi), catat P/BV 2-tahap baru. Lalu ubah Ke 11,5%→13%, catat lagi. Tulis 2 kalimat: asumsi mana yang paling menentukan apakah 3,9x layak?"},
{t: "Tugas C — Kuis di atas", d: "Target ≥5/7 benar."}
],
blind: {h: "Uji Kilat — angka beda", body: `
<p><b>1.</b> NI Rp60tn, book Rp300tn, Ke 12%. Residual income = ?</p>
<details class="ans"><summary>Jawaban</summary><p>60 &minus; 0,12&times;300 = Rp24tn.</p></details>
<p><b>2.</b> ROE 18%, payout 50%, Ke 12%. Justified P/BV = ?</p>
<details class="ans"><summary>Jawaban</summary><p>g = 9%; (0,18&minus;0,09)/(0,12&minus;0,09) = 3,0x.</p></details>`}
},
{id: "real-07", track: "Real Cases", title: "ADRO/Alamtri: Perusahaan yang Bukan Lagi Dirinya",
sub: "Real Case 7 · ±5 jam · SOTP-NAV tambang",
est: "5 jam",
prerequisites: ["dcf", "model_3_statement"],
driveFolder: "19_WRNJ84ntoN3NVr6sNumNUMA8CTv5Zc",
audio: "assets/audio/real-07.mp3",
checker: "real-07",
sections: [
{h: "Kenapa FY24 vs FY23 tidak comparable?", body: `
<p>Lihat headline-nya: revenue <b>$6.518jt (FY23) → $2.080jt (FY24)</b>, turun <b>68,1%</b>. Laba $1.641jt → $1.380jt. Analis junior menyimpulkan 'kinerja anjlok'. Analis associate bertanya dulu: <b>apakah ini perusahaan yang sama?</b></p>
<div class="callout"><b>📋 Status data:</b> angka headline dari TipRanks/BRIDS (diakses 1 Nov 2026). Pada <b>5 Desember 2024</b>, aset thermal coal di-spin-off ke <b>PT Adaro Andalan Indonesia (AADI)</b> yang tercatat terpisah di IDX — dan perusahaan berganti nama menjadi <b>PT Alamtri Resources Indonesia Tbk</b> (2024). Per Juni 2024, AAI mencakup <b>53% aset, 89% revenue, 105% laba bersih</b> grup (IEEFA + alamtri.com). FY24 vs FY23 bukan kinerja — ini <b>diskontinuitas akuntansi</b>.</div>
<div class="example jebakan"><div class="lbl">🚫 Jebakan headline</div>
<p>Membandingkan $6.518jt vs $2.080jt sebagai 'pertumbuhan −68%' = membandingkan perusahaan <b>dengan</b> thermal coal vs <b>tanpa</b> thermal coal. Yang benar: pakai angka <b>FY23 RESTATED</b> (discontinued operations, SFAS 105 / PSAK) dari LK audited — di mana AAI sudah dikeluarkan dari kedua tahun. Rekonstruksi ilustratif dari porsi AAI: revenue continuing ≈ 11% × $6.518jt = <b>$717jt</b>; laba continuing ≈ (1 − 1,05) × $1.641jt = <b>−$82jt</b>. Ya — versi ilustratifnya, bisnis yang tersisa <b>merugi</b> di FY23. Itulah kenapa analis profesional tidak pernah memakai angka headline mentah.</p></div>
<div class="callout"><b>Kenapa ini pelajaran associate?</b> Di semua case sebelumnya, datanya 'bersih'. Di dunia nyata, <b>perimeter perusahaan berubah</b> (spin-off, akuisisi, dekonsolidasi) dan agregator tidak selalu merestate. Skill-nya: buka catatan LK → cari 'discontinued operations' → pakai angka restated. (Real-07 § Kenapa spin-off bisa jadi jebakan nilai?)</p></div>`},
{h: "Kenapa valuasinya SOTP, bukan satu multiple?", body: `
<div class="formula">Equity = NAV tambang + Nilai SIS + NPV smelter + 15% AADI + Net cash − Holding discount</div>
<p>Alamtri pasca-spin adalah konglomerat <b>4 kaki</b>: (1) <b>Adaro Minerals (ADMR)</b> — batubara metalurgi; (2) <b>Saptaindra Sejati (SIS)</b> — jasa kontraktor tambang; (3) <b>energi & smelter aluminium KAI</b> fase 1 500rb ton/tahun (commissioning 2026); (4) <b>15% saham AADI</b> (tidak dikonsolidasi). Satu multiple P/E atau EV/EBITDA untuk keempatnya = menilai 4 bisnis beda risiko dengan satu harga — tidak bermakna.</p>
<div class="example korporat"><div class="lbl">🏢 Hasil SOTP (angka kerja, $ juta)</div>
<p>NAV ADMR <b>$1.976jt</b> + SIS <b>$750jt</b> (ilustratif) + smelter <b>$236jt</b> (ilustratif) + 15% AADI <b>$375jt</b> (ilustratif) = EV SOTP <b>$3.337jt</b>. Tambah net cash <b>$1.557jt</b> (akhir 1H24) → equity <b>$4.894jt</b>. Dengan holding discount ilustratif 20% → <b>$3.915jt</b>. Yang dinilai di sini <b>mekaniknya</b>: tiap kaki punya metode yang tepat untuk karakternya.</p>
<p><b>Turun ke per saham:</b> $3.915jt ÷ 30,9 miliar saham (ADRO, saham beredar akhir 2023 — periode terdekat dengan data case 1H24) = <b>$0,1267/saham</b> ≈ <b>Rp2.078/saham</b> (kurs Rp16.400/USD, dinyatakan sebagai asumsi). Inilah <b>target price</b> versi SOTP — bandingkan dengan harga pasar untuk keputusan (ingat Hari 13: target price selalu ditemani rentang skenario, bukan satu titik).</p></div>
<div class="callout"><b>Kenapa kaki-kakinya beda metode?</b> Tambang punya umur cadangan → <b>NAV depletion</b>. SIS jasa → <b>multiple</b>. Smelter belum berproduksi → <b>DCF bertahap / real option</b>. 15% AADI → <b>nilai pasar</b> (bukan konsolidasi). SOTP = memilih senjata yang tepat per target, lalu menjumlahkan. (Real-02 memakai logika yang sama untuk Astra.)</p></div>`},
{h: "Kenapa NAV tambang dihitung dengan depletion?", body: `
<div class="formula">Mine life = Reserves ÷ Deplesi tahunan &nbsp;→&nbsp; NAV = FCF × (1 − (1+WACC)^−life) / WACC</div>
<p>Tambang bukan mesin abadi — ia <b>menyusut</b>. ADMR: reserves <b>177Mt</b> (31 Des 2024) ÷ penjualan <b>5,62Mt/tahun</b> = <b>31,5 tahun</b> mine life. Setelah itu, nol. DCF standar dengan terminal value 'tumbuh selamanya' <b>salah secara konsep</b> untuk tambang: tidak ada 'selamanya'.</p>
<div class="example korporat"><div class="lbl">🏢 Depletion ADMR (angka kerja)</div>
<p>Revenue $1.154jt ÷ 5,62Mt = <b>$205/ton</b>. Margin EBITDA ternormalisasi ilustratif 35% → EBITDA $404jt → FCF tahunan <b>$208jt</b> (setelah pajak 25%, D&A & sustaining capex ilustratif). Faktor anuitas 10% selama 31,5 tahun = <b>9,503</b>. NAV = 208 × 9,503 = <b>$1.976jt</b> — kontributor terbesar SOTP (59% EV).</p></div>
<div class="example jebakan"><div class="lbl">🚫 Reserves ≠ resources</div>
<p>Resources metalurgi <b>983Mt</b> — lima setengah kali reserves. Pemula memakai 983Mt → mine life 175 tahun → NAV fantastis. Salah: <b>resources belum terbukti ekonomis</b> (belum studi kelayakan, belum izin, belum infrastruktur). NAV hanya memakai <b>reserves</b> (177Mt): yang bankable. Sensitivitasnya nyata — jika hanya 120Mt yang recoverable, mine life 21,4 tahun dan NAV jatuh ke <b>$1.808jt</b> (−$168jt). (Lihat Hell Mode.)</p></div>
<p><b>Data operasi ADRO/ADMR (dipakai di Hell Mode):</b> volume penjualan <b>+26%</b>, ASP <b>−16%</b>, produksi <b>+30%</b>. Ingat: yang menjadi revenue adalah yang <b>terjual</b> (+26%), bukan yang diproduksi (+30%) &mdash; dan efek gabungan volume &times; harga = 1,26 &times; 0,84 &minus; 1 = +5,8% &asymp; +6% reported.</p>`},
{h: "Kenapa smelter dinilai sebagai real option?", body: `
<p>Smelter aluminium KAI: capex <b>$300–325jt</b> (guidance ADMR 2025, sudah termasuk smelter), revenue <b>nol sampai commissioning 2026</b>. DCF standar melihat ini sebagai: keluar $300jt sekarang, dapat ketidakpastian nanti — dan menghukumnya habis-habisan.</p>
<div class="callout"><b>Kenapa framing-nya opsi, bukan DCF biasa?</b> Smelter adalah <b>hak (bukan kewajiban) atas arus kas masa depan</b>: jika harga aluminium jatuh permanen, ekspansi fase 2 bisa dibatalkan — rugi terbatas pada capex fase 1. DCF standar mengasumsikan komitmen buta; <b>real option</b> menghargai fleksibilitas manajemen. NPV ilustratif: FCF stabil $60jt/thn dari 2027, WACC 12%, g 2% → PV $536jt − capex $300jt = <b>$236jt</b> ≥ 0. Kecil dibanding NAV tambang — tapi <b>opsinya</b> (fase 2, hilirisasi) yang berharga.</div>
<div class="example korporat"><div class="lbl">🏢 Trade-off sesungguhnya: capex vs dividen</div>
<p>Alamtri duduk di <b>net cash $1.557jt</b>. Setiap dolar ke smelter = dolar yang <b>tidak</b> kembali ke pemegang saham sebagai dividen. Pertanyaan associate bukan 'berapa NPV smelter', tapi: <b>apakah $300jt+ ini menciptakan nilai lebih besar daripada dikembalikan ke pemegang saham?</b> Dengan NPV ilustratif $236jt > 0, jawabannya 'ya, di atas kertas' — tapi eksekusi (commissioning 2026, harga aluminium) adalah risikonya. Di sinilah thesis defense dimenangkan atau kalah.</p></div>`},
{h: "Kenapa spin-off bisa jadi jebakan nilai?", body: `
<p>Pertanyaan paling associate dari case ini: <b>apakah spin-off menciptakan nilai, atau hanya memindahkannya?</b> Uji yang benar: bandingkan nilai <b>pre-spin</b> (grup utuh) vs <b>post-spin</b> (SOTP Alamtri + 85% AADI yang dibagikan ke pemegang saham ADRO). Spin-off tidak mencetak nilai dari udara — ia hanya memisahkan.</p>
<div class="example jebakan"><div class="lbl">🚫 Dua jebakan spin-off</div>
<p><b>1. Ilusi 'menciptakan nilai'.</b> Jika jumlah post-spin > pre-spin, tanyakan: dari mana selisihnya? Kandidat jujur: holding discount yang hilang (pasar menghargai fokus), atau multiple re-rating tiap bagian. Kandidat tidak jujur: kamu membandingkan angka yang tidak sebanding (headline vs restated — kembali ke §1).<br/><b>2. Sudut ESG.</b> IEEFA/BankTrack menilai spin-off ini sebagai <b>manuver pembiayaan</b>: bank dengan kebijakan coal-exit bisa kembali membiayai entitas 'bersih'. Ini bahan thesis defense — pasar ESG-sensitive bisa memberi diskon justru karena strukturnya.</p></div>
<div class="callout"><b>Kenapa 15% AADI tidak dikonsolidasi?</b> Di bawah 20% (PSAK 15 / IAS 28) = tidak ada pengendalian/signifikansi untuk konsolidasi penuh — dicatat sebagai investasi (nilai pasar/wajar), bukan digabung line-by-line. Praktisnya: revenue AADI <b>tidak</b> menambah revenue Alamtri; yang masuk SOTP hanya <b>15% × nilai pasar AADI</b> ($375jt ilustratif). Salah kaprah umum: menjumlahkan revenue AADI ke revenue grup.</p></div>`},
{h: "🔥 Bekal Hell Mode", body: `
<ul>
<li><b>Discontinued operations</b> (SFAS 105/PSAK): aset yang dilepas dikeluarkan dari angka restated — headline vs restated bisa beda 68%.</li>
<li><b>SOTP</b> = sum-of-the-parts: tiap kaki konglomerat dinilai dengan metode yang cocok karakternya.</li>
<li><b>NAV tambang</b> = depletion DCF: mine life = reserves ÷ deplesi tahunan; <b>tidak ada terminal value 'selamanya'</b>.</li>
<li><b>Reserves ≠ resources</b>: hanya reserves (terbukti ekonomis) yang masuk NAV.</li>
<li><b>Real option</b>: proyek pra-revenue (smelter) dinilai sebagai hak atas arus kas masa depan, bukan DCF buta.</li>
<li><b>Holding discount</b>: pasar menghargai konglomerat di bawah jumlah bagiannya — jelaskan gap-nya.</li>
<li><b>Net cash</b> ditambahkan ke EV SOTP untuk dapat equity (seperti net debt dikurangkan di Real-02).</li>
</ul>`}
],
quiz: [
{q: "Revenue FY23 $6.518jt vs FY24 $2.080jt. Analis junior: 'kinerja anjlok 68%'. Kesalahannya?", opts: ["Salah hitung — penurunannya 32%","Membandingkan perusahaan yang beda perimeter (spin-off AAI)","Lupa mengonversi kurs dolar","FY24 belum diaudit sehingga tak valid"], answer: 1, k: "discontinued_ops", diff: "Medium",
 hints: ["Apa yang keluar dari grup pada Des 2024?", "AAI = 89% revenue grup. Bandingkan apel vs apel."],
 explain: "5 Des 2024 aset thermal coal (AAI: 89% revenue, 105% laba) di-spin-off ke AADI. $6.518jt vs $2.080jt = perusahaan DENGAN vs TANPA thermal coal — bukan kinerja. Pakai FY23 restated. (Real-07 § Kenapa FY24 vs FY23 tidak comparable?)"},
{q: "Angka mana yang benar untuk analisis YoY pasca-spin-off?", opts: ["FY23 headline $6.518jt","FY23 restated (discontinued ops dikeluarkan)","Rata-rata FY23–FY24 headline","FY24 diproyeksikan setahun penuh"], answer: 1, k: "discontinued_ops", diff: "Easy",
 hints: ["SFAS 105 / PSAK discontinued operations.", "Headline mencampur dua perimeter berbeda."],
 explain: "Hanya FY23 restated (AAI sudah dikeluarkan dari kedua tahun) yang apple-to-apple. Headline $6.518jt mencampur perimeter lama. (Real-07 § Kenapa FY24 vs FY23 tidak comparable?)"},
{q: "Mine life tambang ADMR?", opts: ["983 ÷ 6,63 = 148 tahun","177 ÷ 5,62 = 31,5 tahun","177 ÷ 6,63 = 26,7 tahun","983 ÷ 5,62 = 175 tahun"], answer: 1, k: "mine_life", diff: "Easy",
 hints: ["Reserves atau resources? Penjualan atau produksi?", "NAV pakai yang bankable dibagi deplesi aktual."],
 explain: "Reserves 177Mt ÷ penjualan 5,62Mt = 31,5 tahun. Resources (983Mt) belum bankable; produksi (6,63Mt) bukan deplesi terjual. (Real-07 § Kenapa NAV tambang dihitung dengan depletion?)"},
{q: "Kenapa NAV memakai reserves 177Mt, bukan resources 983Mt?", opts: ["Karena 177 angka yang lebih kecil","Reserves = terbukti ekonomis & bankable; resources belum","Agar mine life tidak terlalu panjang","Aturan PSAK melarang memakai resources"], answer: 1, k: "reserves", diff: "Medium",
 hints: ["Apa beda 'terbukti bisa ditambang untung' vs 'ada di tanah'?", "Bank meminjamkan atas dasar yang mana?"],
 explain: "Reserves sudah lolos studi kelayakan ekonomis — resources baru potensi geologis. NAV = nilai yang bisa dimonetisasi. (Real-07 § Kenapa NAV tambang dihitung dengan depletion?)"},
{q: "Equity value SOTP Alamtri (angka kerja) = ?", opts: ["$3.337jt (EV SOTP — lupa tambah net cash)","$3.915jt (sudah dipotong holding discount)","$4.894jt (EV SOTP + net cash $1.557jt)","$6.518jt (revenue FY23 headline)"], answer: 2, k: "sotp", diff: "Medium",
 hints: ["EV = untuk semua pemodal. Equity = milik pemegang saham.", "Net cash $1.557jt milik siapa?"],
 explain: "EV SOTP $3.337jt (1976+750+236+375) + net cash $1.557jt = equity $4.894jt. $3.915jt = setelah holding discount 20%. (Real-07 § Kenapa valuasinya SOTP?)"},
{q: "Smelter KAI dinilai sebagai real option karena?", opts: ["Opsi selalu lebih akurat dari DCF","Capex besar sekarang, revenue nol s/d 2026 — DCF buta menghukum fleksibilitas","Smelter tidak butuh capex","Aluminium bukan komoditas siklikal"], answer: 1, k: "real_option", diff: "Medium",
 hints: ["Bayar $300jt hari ini, dapat ketidakpastian 2026.", "Fase 2 bisa dibatalkan — rugi terbatas. Itu bentuk apa?"],
 explain: "Smelter = hak atas arus kas masa depan dengan rugi terbatas (bisa stop di fase 1). DCF standar mengasumsikan komitmen buta; real option menghargai fleksibilitas. (Real-07 § Kenapa smelter dinilai sebagai real option?)"},
{q: "Alamtri pegang 15% AADI — kenapa tidak dikonsolidasi penuh?", opts: ["Karena AADI perusahaan terpisah di IDX","Di bawah 20% (PSAK 15/IAS 28) — dicatat sebagai investasi","Karena spin-off belum selesai","Karena AADI merugi"], answer: 1, k: "akuntansi", diff: "Hard",
 hints: ["Ambang batas signifikansi pengendalian?", "Konsolidasi penuh butuh pengendalian, bukan sekadar punya saham."],
 explain: "Di bawah 20% = tidak ada pengendalian/signifikansi untuk konsolidasi line-by-line (PSAK 15/IAS 28). Masuk SOTP sebagai 15% × nilai pasar, bukan penjumlahan revenue. (Real-07 § Kenapa spin-off bisa jadi jebakan nilai?)"},
{q: "Net cash $1.557jt dalam SOTP diperlakukan bagaimana?", opts: ["Dikurangkan seperti utang","Diabaikan — kas bukan aset operasi","Ditambahkan ke EV SOTP → equity","Dibagi ke tiap kaki SOTP"], answer: 2, k: "net_cash", diff: "Medium",
 hints: ["EV = milik semua pemodal. Kas milik siapa?", "Kebalikan dari net debt di Real-02."],
 explain: "Kas bersih milik pemegang saham → EV SOTP + net cash = equity $4.894jt. Cerminan dari 'EV − net debt' di Real-02. (Real-07 § Kenapa valuasinya SOTP?)"}
],
hellPass: 80,
hell: [
{q: "ADMR: penjualan +26%, ASP −16%. Perubahan revenue implisit?", opts: ["+10% (26−16)","−16% (harga yang menentukan)","1,26 × 0,84 − 1 = +5,8% ≈ +6% reported","+30% (ikut produksi)"], answer: 2, diff: "Medium",
 explain: "Efek volume × efek harga: 1,26 × 0,84 = 1,0584 → +5,8%, cocok dengan reported +6%. Produksi +30% ≠ penjualan +26% — yang jadi revenue adalah yang TERJUAL. (Real-07 § Kenapa NAV tambang dihitung dengan depletion?)"},
{q: "Hanya 120Mt reserves yang recoverable (bukan 177Mt). NAV ADMR baru?", opts: ["Tetap $1.976jt — reserves tak sensitif","$1.808jt (life 21,4 thn, anuitas 8,69)","120/177 × $1.976jt = $1.339jt","Naik — tambang lebih fokus"], answer: 1, diff: "Hard",
 explain: "Life = 120/5,62 = 21,4 thn; anuitas 10% = 8,69; NAV = 207,9 × 8,69 = $1.808jt (−$168jt). Bukan proporsional linear karena anuitas melengkung — itulah kenapa sensitivitas dihitung, bukan ditebak."},
{q: "Equity SOTP $4.894jt, terapkan holding discount 20%. Hasil?", opts: ["$4.894jt (discount tidak dihitung)","$5.873jt (malah ditambah)","$3.915jt","$3.337jt"], answer: 2, diff: "Medium",
 explain: "4.894 × (1 − 0,20) = $3.915jt. Discount = pasar membayar di bawah jumlah bagian-bagiannya — sebuah pertanyaan (kenapa?), bukan vonis beli. (Real-07 § Kenapa valuasinya SOTP?)"},
{q: "FY23 continuing (restated, ilustratif) = laba −$82jt. Kesimpulan analis yang jujur?", opts: ["Bisnisnya hancur — hindari","Bisnis tersisa belum tentu profitable; valuasi bertumpu pada aset & opsi masa depan","Angka ilustratif = tak ada artinya","Spin-off gagal total"], answer: 1, diff: "Hard",
 explain: "AAI menyumbang 105% laba grup — artinya continuing ops (ilustratif) merugi $82jt. Valuasi Alamtri bertumpu pada NAV cadangan + opsi smelter/energi, BUKAN earnings power historis. Itu mengubah seluruh thesis."},
{q: "Apakah spin-off ADRO→AADI 'menciptakan nilai'? Uji yang benar?", opts: ["Lihat harga saham naik/turun pasca-spin","Bandingkan nilai pre-spin vs (SOTP Alamtri + 85% AADI yang dibagikan)","Tanya manajemen — mereka pasti tahu","Spin-off selalu menciptakan nilai"], answer: 1, diff: "Hard",
 explain: "Spin-off memisahkan, bukan mencetak nilai. Uji: nilai grup utuh pre-spin vs jumlah bagian post-spin yang diterima pemegang saham. Selisihnya harus dijelaskan (hilangnya holding discount? re-rating?) — bukan diasumsikan. (Real-07 § Kenapa spin-off bisa jadi jebakan nilai?)"}
],
tasks: [
{t: "Tugas A — SOTP Alamtri (±4 jam)", d: "Download workbook RC7. Langkah 1: temukan keanehan headline FY23 vs FY24, restate FY23 (ilustratif). Langkah 2: bangun 4 kaki SOTP (NAV depletion ADMR, multiple SIS, real-option smelter, 15% AADI) → EV → + net cash → equity → holding discount. Semua rumus link ke input.", url: "https://drive.google.com/drive/folders/19_WRNJ84ntoN3NVr6sNumNUMA8CTv5Zc"},
{t: "Tugas B — Stress test (±1 jam)", d: "ASP turun permanen 20%: hitung ulang FCF & NAV ADMR. Lalu: reserves hanya 120Mt — NAV baru? Kaki mana yang paling 'berbahaya' bagi valuasi, dan kenapa?"},
{t: "Tugas C — Kuis di atas", d: "Target ≥6/8 benar."}
],
blind: {h: "Uji Kilat — angka beda", body: `
<p><b>1.</b> Reserves 120Mt, penjualan 6Mt/tahun. Mine life?</p>
<details class="ans"><summary>Jawaban</summary><p>120 ÷ 6 = <b>20 tahun</b>.</p></details>
<p><b>2.</b> FCF $150jt/tahun, WACC 10%, life 20 tahun. NAV?</p>
<details class="ans"><summary>Jawaban</summary><p>Anuitas = (1 − 1,1^−20)/0,1 = 8,5136. NAV = 150 × 8,5136 = <b>$1.277jt</b>.</p></details>
<p><b>3.</b> EV SOTP $3.000jt, net cash $1.500jt, holding discount 15%. Equity final?</p>
<details class="ans"><summary>Jawaban</summary><p>Equity = (3.000 + 1.500) × (1 − 0,15) = <b>$3.825jt</b>.</p></details>`}
},
{
id: "real-08", track: "Real Cases", title: "GOTO: Rugi Rp90 Triliun, Lalu Apa?",
sub: "Real Case 8 · ±6 jam · SOTP + normalisasi one-off",
est: "6 jam",
prerequisites: ["sotp", "model_3_statement"],
driveFolder: "1OrN9fj9jdgSuuC2JertPlAWps4zTRbHX",
audio: "assets/audio/real-08.mp3",
checker: "real-08",
sections: [
{h: "Kenapa rugi Rp90,5 triliun bukan berarti bisnisnya hancur?", body: `
<p><b>GoTo (GOTO.JK)</b> membukukan rugi <b>−Rp90,5 triliun di FY2023</b> (AlphaSpread, income from continuing operations, diakses Nov 2026) — angka yang kalau dibaca mentah terdengar seperti perusahaan menguapkan kas Rp90,5T dalam setahun. Ia tidak.</p>
<p>Dari Rp90,5T itu, sekitar <b>Rp78,8 triliun adalah pembalikan goodwill non-kas</b> akibat <i>loss of control</i> atas Tokopedia dalam transaksi TikTok (rilis hasil GoTo, 19 Mar 2024). Goodwill Rp93,1T sendiri dicatat tahun 2021 saat merger Gojek–Tokopedia (LK audited 2022, catatan 33a): harga yang dibayar untuk <i>ekspektasi</i> — bukan kas yang keluar tahun 2023.</p>
<div class="example korporat"><div class="lbl">🏢 Analogi</div>
<p>Kamu beli lukisan Rp93 juta karena yakin bakal naik. Tiga tahun kemudian penilai bilang cuma laku Rp14 juta. Kamu "rugi" Rp79 juta <b>di kertas</b> — tapi dompetmu tidak berkurang Rp79 juta tahun ini. Itulah goodwill impairment: pengakuan bahwa ekspektasi masa lalu terlalu optimis, bukan pendarahan kas hari ini.</p></div>
<div class="callout"><b>Kenapa ini penting?</b> Arus kas operasi GoTo FY2023 hanya <b>−Rp4,3tn</b> (AlphaSpread) — bukan −Rp90,5tn. Dan <b>adjusted EBITDA FY2024 justru positif Rp386 miliar</b>, melampaui guidance impas (rilis GoTo, 12 Mar 2025). Akuntansi mencatat masa lalu; kas menceritakan masa kini. Analis yang tidak memisahkan keduanya sedang menilai bayangan, bukan bendanya.</p></div>`},
{h: "Kenapa normalisasi one-off adalah THE exercise?", body: `
<div class="formula">Rugi continuing = Rugi headline − One-off = −90,5 − (−78,8) = −Rp11,7T</div>
<p>Normalisasi = membersihkan angka headline dari pos sekali jalan sebelum dipakai menilai. Setelah dibersihkan, ceritanya berubah total:</p>
<p><b>−Rp11,7T</b> (FY23 continuing) → <b>−Rp4,5T</b> (FY24, ≈$286jt per analisis independen venturesg, Okt 2026) → <b>−Rp1,5T</b> (FY25, rilis GoTo 11 Mar 2026) → <b>laba bersih +Rp864 miliar</b> (9M26, Quartr 30 Okt 2026). Dari "hancur" menjadi "menuju impas" — hanya karena kita berhenti menilai pos non-kas satu kali seolah ia rugi operasional.</p>
<div class="example jebakan"><div class="lbl">🚫 Jebakan P/E</div>
<p>EPS FY23 negatif → P/E <b>tidak bermakna</b> (negatif/tak terdefinisi). Perusahaan rugi dinilai dengan <b>EV/Revenue atau SOTP</b>, bukan P/E. Bahkan setelah GOTO mencetak laba (LTM EPS +Rp0,63 per StockAnalysis, Okt 2026), P/E dari dua kuartal laba pertama dalam sejarah = rapuh. Multiple butuh laba yang <i>berulang</i>, bukan yang baru lahir kemarin.</p></div>
<div class="callout"><b>⚠️ Jembatan yang disederhanakan:</b> −Rp11,7T adalah jembatan ilustratif (satu one-off besar dikurangkan). Rekonsiliasi penuh — termasuk one-off FY22 (impairment goodwill Rp11T, kr-asia Mar 2023) dan efek pajak — ada di LK audited. Yang dinilai di sini adalah <b>mekanik normalisasimu</b>, bukan presisi angkanya.</p></div>`},
{h: "Kenapa pertumbuhan +7,5% menipu? (dekonsolidasi & pro-forma)", body: `
<p>Headline: revenue <b>Rp14,8T → Rp15,89T (+7,4%)</b>. Kelihatannya stagnan. Tapi FY2023 masih <b>mengkonsolidasi Tokopedia</b>; Tokopedia keluar dari konsolidasi pada <b>31 Jan 2024</b> setelah TikTok mengambil 75,01%. Membandingkan GAAP FY23 vs FY24 = membandingkan apel dengan kebun apel.</p>
<p>GoTo sendiri menerbitkan angka <b>pro-forma</b> (tanpa Tokopedia): <b>Rp7,652T (FY23) → Rp14,753T (FY24) = +92,8%</b> (rilis GoTo, 12 Mar 2025). Bisnis yang berlanjut tumbuh hampir dua kali lipat — headline +7,4% menyembunyikannya.</p>
<div class="example korporat"><div class="lbl">🏢 Satu deal, tiga aliran nilai</div>
<p>Transaksi TikTok (Des 2023, nilai diumumkan <b>$1,5 miliar untuk 75,01%</b> — i3investor/TheEdge, Jul 2024) memberi GoTo tiga kaki nilai: <b>(1)</b> saham 24,99% di Tokopedia, <b>(2)</b> fee jasa e-commerce (FY24: Rp622m → FY25: Rp820m, +32%), <b>(3)</b> royalti ~0,4% dari GMV (≈$58jt/tahun, nyaris tanpa biaya). Analis SOTP harus menilai ketiganya — bukan cuma sahamnya.</p></div>
<div class="callout"><b>Kenapa pro-forma wajib?</b> Setiap kali struktur perusahaan berubah (akuisisi, divestasi, dekonsolidasi), angka GAAP antar-tahun tidak <i>apple-to-apple</i>. Pro-forma = "bagaimana angkanya <i>jika</i> strukturnya sudah seperti hari ini sejak awal". Tanpa ini, kamu menilai perubahan akuntansi sebagai kinerja bisnis.</p></div>`},
{h: "Kenapa SOTP tiga kaki — dan kenapa pasar mendiskonnya?", body: `
<p>GOTO bukan satu bisnis: <b>on-demand</b> (Gojek), <b>fintech</b> (GoPay), dan <b>24,99% Tokopedia</b>. Satu multiple untuk semuanya = menilai 3 rumah dengan 1 harga per meter. SOTP menilai tiap kaki:</p>
<p>① <b>On-demand:</b> revenue FY24 Rp5,34T (rilis FY25) × <b>2,5× EV/Revenue</b> (ilustratif) = <b>Rp13,35T</b>.<br>
② <b>Fintech:</b> EBITDA FY26E $94–100jt → titik tengah $97jt ≈ Rp1,75T × <b>8× EV/EBITDA</b> (ilustratif) = <b>Rp13,98T</b>.<br>
③ <b>Tokopedia 24,99%:</b> $1,5B ÷ 75,01% × 24,99% = $0,50B ≈ <b>Rp9,0T</b> (kurs Rp18.014, BI 16 Okt 2026) — <i>anchor</i> dari harga transaksi riil.<br>
④ <b>Kas bersih</b> $858jt ≈ <b>Rp15,46T</b> (venturesg, Okt 2026).<br>
<b>Total SOTP ≈ Rp51,79T → Rp45/saham</b> (1,15 triliun saham, pasca-pembatalan treasury 14 Okt 2026). Harga pasar: kapitalisasi Rp25,6T → <b>Rp22/saham</b> (StockAnalysis, 30 Okt 2026). <b>Diskon ≈ 50,6%.</b></p>
<div class="example jebakan"><div class="lbl">🚫 Diskon = pertanyaan, bukan jawaban</div>
<p>Kandidat penjelasan pasar: beban korporat tunai Rp772m/tahun (FY24), <i>loan book</i> konsumer $611jt (+58% YoY, <i>unsecured</i> — 2Q26), saham dual-class (insider pegang ~58% suara), politik merger Grab, dan royalti yang bergantung pada TikTok. Mungkin pasar terlalu pesimis — mungkin pasar tahu sesuatu yang modelmu abaikan. Tugas analis: <b>menjelaskan gap</b>, bukan mengasumsikan pasar bodoh.</p></div>
<div class="callout"><b>⚠️ Kaki fintech = opsi, bukan kepastian:</b> ia memakai EBITDA <i>forward</i> FY26E untuk bisnis yang baru pertama kali laba di 2026 — membayar hari ini untuk laba masa depan dengan multiple ganda (risiko proyeksi × risiko multiple). Di Tugas B kamu akan mengujinya: turunkan multiple 8×→5×, berapa nilai/saham yang tersisa?</p></div>`},
{h: "Kenapa agregator bisa menyesatkanmu?", body: `
<p>Kasus GOTO adalah museum jebakan data. Tiga contoh nyata dari riset case ini:</p>
<p><b>1. D&A yang tidak konsisten.</b> AlphaSpread menampilkan D&A FY24 <b>Rp744 miliar</b> di satu tabel dan <b>Rp2,7 triliun</b> di tabel lain. Keduanya tidak bisa benar bersamaan. Status: <b>flag — wajib rekonsiliasi ke LK audited</b> sebelum dipakai. Di workbook case ini D&A <i>sengaja tidak dipakai</i>.</p>
<p><b>2. "Rugi FY24" punya tiga versi.</b> Rp3,08T (<i>loss for the period</i>, rilis GoTo Mar 2025) vs Rp5,46T (<i>net loss</i>, rilis GoTo Mar 2026) vs ~Rp4,5T ($286jt, venturesg). Bukan karena ada yang bohong — <b>definisinya beda</b>. Analis yang mengutip tanpa menyebut definisi sedang membandingkan tiga hal berbeda.</p>
<p><b>3. Nilai deal vs kas dibayar.</b> "TikTok membayar $1,5B" (angka transaksi yang diumumkan) vs analisis independen: $840jt kas awal + komitmen pendanaan $1B+. <i>Anchor</i> valuasi memakai angka transaksi — tapi analis mencatat nuansanya.</p>
<div class="callout"><b>Kenapa ini pelajaran associate?</b> Junior mengutip angka; associate <b>menyebut tahun + periode + sumber + definisi</b> untuk setiap angka — dan menandai yang belum terverifikasi sebagai ilustratif. Satu sumber = satu versi kebenaran; LK audited = jangkarnya.</p></div>`},
{h: "Tugas praktik", body: `
<p>Bangun normalisasi + pro-forma + SOTP GOTO di workbook latihan: (A) normalisasi rugi FY23 dari headline −Rp90,5T dengan one-off Rp78,8T; (B) hitung pertumbuhan headline vs pro-forma FY23→FY24; (C) bangun SOTP 3 kaki + kas bersih → nilai/saham → upside vs harga pasar. Semua sel jawaban harus rumus yang me-link ke input — ubah multiple on-demand 2,5×→1,5× dan lihat seluruh SOTP ikut bergerak.</p>
<div class="callout"><b>Kenapa tugas ini penting?</b> Ini latihan paling "kotor" di seluruh Real Cases: one-off raksasa, dekonsolidasi, deal tiga lapis, dan data agregator yang bertentangan. Kalau kamu bisa merapikan GOTO, laporan keuangan "normal" akan terasa mudah.</p>
<ul>
<li><b>Normalisasi</b> = membersihkan one-off sebelum menilai; rugi continuing ≠ rugi headline.</li>
<li><b>Pro-forma</b> = apple-to-apple setelah perubahan struktur (dekonsolidasi).</li>
<li><b>SOTP</b> = tiap segmen dinilai dengan multiple-nya sendiri, lalu dijumlahkan.</li>
<li><b>Anchor transaksi</b> = harga deal riil ($1,5B/75,01%) sebagai jangkar nilai wajar.</li>
<li><b>Diskon vs SOTP</b> = 1 − harga pasar / nilai SOTP — sebuah pertanyaan, bukan vonis beli.</li>
</ul></div>`}
],
quiz: [
{q: "One-off Rp78,8T di FY2023 GOTO adalah?", opts: ["Kerugian kas dari operasional Gojek","Pembalikan goodwill non-kas akibat loss of control Tokopedia","Pembayaran utang bank yang jatuh tempo","Biaya marketing Tokopedia yang membengkak"], answer: 1, k: "one_off", diff: "Easy",
 hints: ["Non-kas, satu kali, terkait transaksi TikTok.", "Goodwill dicatat 2021 saat merger; 2023 diakui 'terlalu optimis'."],
 explain: "Rp78,8T = pembalikan goodwill non-kas akibat loss of control Tokopedia (rilis GoTo, 19 Mar 2024). Bukan kas keluar 2023 — pengakuan bahwa ekspektasi merger 2021 terlalu optimis. (Real-08 § Kenapa rugi Rp90,5 triliun…?)"},
{q: "Rugi headline FY23 −Rp90,5T, one-off −Rp78,8T. Rugi continuing ternormalisasi?", opts: ["−Rp169,3T","−Rp11,7T","−Rp90,5T (tidak berubah)","−Rp78,8T"], answer: 1, k: "normalization", diff: "Medium",
 hints: ["Rugi continuing = headline − one-off.", "−90,5 − (−78,8) = ? Perhatikan tanda."],
 explain: "−90,5 − (−78,8) = −Rp11,7T. Tanda adalah segalanya: mengurangkan rugi one-off (bukan menambah) yang membersihkan angka. Salah tanda → −Rp169,3T, dua kali lipat lebih menyeramkan dari aslinya. (Real-08 § Kenapa normalisasi…?)"},
{q: "Headline revenue +7,4% tapi pro-forma +92,8%. Penyebab bedanya?", opts: ["Kurs rupiah menguat tajam di 2024","FY23 masih mengkonsolidasi Tokopedia; dekonsolidasi 31 Jan 2024","GoTo mengubah tahun fiskal","Efek buyback saham 2024"], answer: 1, k: "pro_forma", diff: "Medium",
 hints: ["Apple-to-apple: struktur harus sama.", "Kapan Tokopedia keluar dari laporan konsolidasi?"],
 explain: "FY23 (GAAP) masih mencakup Tokopedia terkonsolidasi; sejak 31 Jan 2024 Tokopedia dekonsolidasi. Pro-forma Rp7,652T→Rp14,753T (+92,8%) membandingkan bisnis berlanjut saja. (Real-08 § Kenapa +7,5% menipu?)"},
{q: "TikTok membayar $1,5B untuk 75,01% Tokopedia. Nilai implisit 100% Tokopedia?", opts: ["$1,125B","$1,5B","$2,0B","$2,5B"], answer: 2, k: "sotp", diff: "Medium",
 hints: ["Nilai 100% = harga deal ÷ porsi yang dibeli.", "1,5 ÷ 0,7501 = ?"],
 explain: "$1,5B ÷ 75,01% = $1,9997B ≈ $2,0B. Inilah anchor transaksi: harga yang benar-benar dibayar pihak ketiga, bukan tebakan analis. (Real-08 § Kenapa SOTP tiga kaki…?)"},
{q: "Nilai 24,99% Tokopedia milik GoTo dalam rupiah (kurs Rp18.014)?", opts: ["Rp4,5T","Rp6,0T","Rp9,0T","Rp13,5T"], answer: 2, k: "sotp", diff: "Hard",
 hints: ["0,2499 × $1,9997B = $0,4997B.", "$0,4997B × 18.014 = ? Jaga tangga satuan: miliar USD → triliun Rp."],
 explain: "0,2499 × $1,9997B = $0,4997B; × Rp18.014 = Rp9,0T. Tangga satuan: $499,7 juta × 18.014 = Rp9.002 miliar = Rp9,0 triliun. (Real-08 § Kenapa SOTP tiga kaki…?)"},
{q: "SOTP total Rp51,79T dengan 1,15 triliun saham. Nilai/saham?", opts: ["Rp22","Rp31","Rp45","Rp51"], answer: 2, k: "sotp", diff: "Hard",
 hints: ["Triliun ÷ triliun = satuan Rp langsung.", "51,79 ÷ 1,15 = ?"],
 explain: "51,79 ÷ 1,15 = Rp45,03 ≈ Rp45/saham. Karena pembilang dan penyebut sama-sama triliun, hasilnya langsung rupiah per saham — tanpa ×1.000. (Real-08 § Kenapa SOTP tiga kaki…?)"},
{q: "Kenapa P/E trailing tidak dipakai menilai GOTO FY23–FY24?", opts: ["Karena GOTO tidak punya saham beredar","EPS negatif → P/E tak bermakna; pakai EV/Revenue atau SOTP","Karena P/E dilarang untuk emiten teknologi","Karena laba GOTO selalu nol"], answer: 1, k: "multiples", diff: "Medium",
 hints: ["P/E = harga ÷ laba. Laba negatif → ?", "Perusahaan rugi dinilai dari apa?"],
 explain: "EPS negatif membuat P/E negatif/tak terdefinisi — multiple-nya tidak bermakna. Perusahaan rugi dinilai via EV/Revenue atau SOTP per segmen. (Real-08 § Kenapa normalisasi…?)"}
],
hellPass: 80,
hell: [
{q: "Adjusted EBITDA FY24 +Rp386m tapi rugi bersih −Rp4,5T. Kok bisa?", opts: ["Laporan keuangannya dipalsukan","Adjusted EBITDA mengeluarkan pos non-kas & one-off (SBC, depresiasi); rugi bersih akuntansi ≠ kas operasi","Rp386m itu sebenarnya Rp386T","Rugi bersih sudah termasuk laba 2025"], answer: 1, diff: "Medium",
 explain: "Adjusted EBITDA = laba sebelum bunga, pajak, depresiasi, amortisasi, SBC, dan one-off. Ia mengukur daya kas operasi inti; rugi bersih akuntansi memuat semua beban non-kas. Keduanya benar — menjawab pertanyaan berbeda."},
{q: "Kaki fintech memakai EBITDA FY26E (forward). Bahaya terbesarnya?", opts: ["Tidak ada — guidance selalu tepat","Risiko ganda: membayar hari ini untuk laba masa depan yang bisa meleset, dengan multiple yang juga tebakan","Kurs rupiah pasti menguat","EBITDA forward dilarang standar akuntansi"], answer: 1, diff: "Hard",
 explain: "Forward multiple = bertaruh dua kali: (1) EBITDA 2026 benar-benar $94–100jt (bisnis baru pertama laba 2026), (2) multiple 8× pantas. Meleset di salah satu → kaki fintech SOTP runtuh. Itulah kenapa ia dilabeli 'opsi', bukan 'nilai pasti'."},
{q: "SOTP Rp45 vs pasar Rp22. Kesimpulan analis yang jujur?", opts: ["Beli agresif — upside 102% pasti","Jual — pasar selalu benar","Jelaskan dulu kenapa ada diskon 51% (beban korporat, loan book, governance); diskon = pertanyaan","Naikkan multiple sampai upside terlihat wajar"], answer: 2, diff: "Hard",
 explain: "Diskon 51% adalah pertanyaan, bukan vonis beli. Kandidat: beban korporat Rp772m/thn, loan book $611jt unsecured, dual-class 58% suara, politik merger. Analis jujur tidak memijat multiple agar cerita terlihat bagus."},
{q: "Royalti 0,4% GMV ≈ $58jt/tahun 'nyaris tanpa biaya'. Kenapa analis tetap hati-hati?", opts: ["Karena royalti selalu nol","Alirannya bergantung pada TikTok (pihak ketiga): GMV bisa turun, syarat deal bisa berubah","Karena royalti tidak tercatat di laporan","Karena $58jt terlalu kecil untuk dihitung"], answer: 1, diff: "Medium",
 explain: "Tiga kaki deal TikTok semuanya bergantung pada pihak yang tidak dikendalikan GoTo. Royalti 'murni' hari ini bisa menyusut jika GMV TikTok Shop turun atau syarat dinegosiasi ulang. Nilai tanpa kendali = nilai dengan diskon risiko."},
{q: "D&A agregator: Rp744m di satu tabel, Rp2,7T di tabel lain (FY24). Tindakan analis?", opts: ["Pakai rata-ratanya Rp1,7T","Pilih yang lebih kecil agar valuasi bagus","Jangan pakai keduanya; rekonsiliasi ke LK audited — flag sebagai data bermasalah","Abaikan D&A selamanya di semua valuasi"], answer: 2, diff: "Hard",
 explain: "Dua angka yang tidak bisa benar bersamaan = sinyal berhenti, bukan sinyal memilih. Analis melacak ke sumber primer (LK audited) dan menandai angka agregator sebagai belum terverifikasi. Di case ini D&A sengaja tidak dipakai sama sekali."}
],
tasks: [
{t: "Tugas A — Normalisasi + pro-forma + SOTP (±4 jam)", d: "Download workbook RC8. (A) Normalisasi rugi FY23 dari headline dengan one-off; (B) hitung pertumbuhan headline vs pro-forma; (C) bangun SOTP 3 kaki + kas bersih → nilai/saham → upside vs harga pasar. Semua rumus link ke input.", url: "https://drive.google.com/drive/folders/1OrN9fj9jdgSuuC2JertPlAWps4zTRbHX"},
{t: "Tugas B — Uji sensitivitas multiple (±1 jam)", d: "Di file jawabanmu: turunkan multiple on-demand 2,5×→1,5× dan multiple fintech 8×→5×. Catat nilai/saham baru. Kaki mana yang paling 'berbahaya' bagi thesis?", url: ""},
{t: "Tugas C — Kuis di atas", d: "Target ≥5/7 benar."}
],
blind: {h: "Uji Kilat — angka beda", body: `
<p><b>1.</b> Rugi headline −Rp50T termasuk one-off −Rp42T (non-kas). Rugi continuing ternormalisasi = ?</p>
<details class="ans"><summary>Jawaban</summary><p>−50 − (−42) = −Rp8T.</p></details>
<p><b>2.</b> Investor membayar $2B untuk 80% sebuah startup. Nilai implisit 100%? Nilai 20% yang tersisa?</p>
<details class="ans"><summary>Jawaban</summary><p>100% = 2 ÷ 0,80 = $2,5B. Sisa 20% = 0,20 × 2,5 = $0,5B.</p></details>`}
},
{
id: "real-09", track: "Real Cases", title: "WSKT: Membedah Perusahaan yang Ekuitasnya Negatif",
sub: "Real Case 9 · ±6 jam · Waterfall likuidasi",
est: "6 jam",
prerequisites: ["dcf", "fcf", "debt_schedule"],
driveFolder: "1A8U9qMg7d5s1dxJca9ZzHjalV8hRu6YT",
audio: "assets/audio/real-09.mp3",
checker: "real-09",
sections: [
{h: "Kenapa Waskita Karya?", body: `
<p><b>Waskita Karya (WSKT.JK)</b> — BUMN konstruksi yang ekuitasnya <b>negatif Rp3,34tn</b> (30 Sep 2026). Ini case paling ekstrem di course: semua multiple ekuitas (P/E, P/BV) <b>tak terdefinisi</b>, saham <b>disuspensi sejak Mei 2023</b> (Rp202), dan peringkat PEFINDO <b>idSD</b> (Selective Default). Di sini kamu tidak menilai saham — kamu menilai <b>recovery untuk kreditor</b>.</p>
<div class="example korporat"><div class="lbl">🏢 Data kunci</div>
<p>FY25 (LK via petromindo.com, Apr 2026): revenue <b>Rp8,85tn</b> (−17% YoY) · rugi <b>−Rp4,48tn</b> · laba kotor Rp1,58tn (margin 18%). FY24: revenue Rp10,71tn · rugi −Rp3,91tn. FY24 audited (pers Okt 2025, mengutip LK BEI): aset Rp77,15tn · liabilitas Rp69,27tn · ekuitas Rp7,88tn. 9M26 interim <b>unaudited</b> (jawawa.id): ekuitas induk <b>−Rp3,34tn</b> · defisit Rp20,8tn · beban keuangan Rp2,79tn · liabilitas jk pendek &gt; aset lancar Rp12,48tn · kas Rp1,50tn.</p></div>
<div class="callout"><b>📋 Status data:</b> angka LK di atas terverifikasi dari sumber yang dicantumkan. <b>Asumsi likuidasi di workbook (book piutang/tol/aset tetap, recovery rate tiap kelas, biaya likuidasi 5%, klaim obligasi/vendor, haircut 30%) = ILUSTRATIF</b> — yang dinilai adalah <b>mekanik waterfall</b>-mu, bukan ketepatan asumsinya. Angka dapat berubah; verifikasi ke LK terbaru sebelum dipakai di dunia nyata.</div>
<div class="callout"><b>⚠️ Catatan forensik:</b> sejumlah media sekunder memberitakan angka 9M26 yang <b>tidak konsisten antar-sumber</b> (mis. ekuitas Rp1,03tn vs defisit Rp22,52tn yang tidak merekonsiliasi dengan aset Rp73,07tn − liabilitas Rp72,03tn). Pelajaran analis: angka agregator/media <b>wajib</b> dicek ulang ke LK resmi sebelum masuk model. Case ini memakai angka riset terverifikasi di atas.</p></div>`},
{h: "Kenapa multiple ekuitas tak bermakna?", body: `
<div class="formula">P/BV = harga ÷ book value per saham → penyebut NEGATIF</div>
<p>Ekuitas −Rp3,34tn berarti <b>book value per saham negatif</b>. P/BV = harga ÷ (negatif) = angka negatif yang tidak bisa diinterpretasikan. P/E juga hancur: rugi −Rp4,48tn → E negatif → P/E negatif. Multiple ekuitas <b>tak terdefinisi secara ekonomi</b> — bukan "murah", bukan "mahal", melainkan <b>bukan alat ukur yang berlaku</b>.</p>
<div class="example jebakan"><div class="lbl">🚫 Jebakan "murah"</div>
<p>"Sahamnya cuma Rp202 — murah!" <b>SALAH.</b> Rp202 adalah harga <b>beku sejak suspensi Mei 2023</b> — 3,5 tahun tanpa price discovery. Harga itu tidak mencerminkan rugi −Rp4,48tn (FY25), ekuitas negatif, atau MRA. Saham suspensi ≠ saham murah; ia = <b>saham tanpa pasar</b>. Analis yang memakai Rp202 sebagai "harga" sedang memakai fosil sebagai data.</p></div>
<div class="callout"><b>Kenapa analis berpikir sebagai kreditor?</b> Karena dalam distress, <b>urutan klaim</b> menentukan segalanya: kreditor dibayar dulu, pemegang saham dapat sisa — kalau ada. Menilai WSKT dari sudut pandang pemegang saham = menilai kursi paling belakang di kapal yang karam.</p></div>`},
{h: "Kenapa waterfall, bukan DCF?", body: `
<div class="formula">Recovery kelas = MIN(sisa dana, klaim kelas) → lanjut ke kelas berikutnya</div>
<p>DCF butuh asumsi <b>going concern</b> (perusahaan hidup selamanya). Dengan defisit Rp20,8tn, gap likuiditas Rp12,48tn, dan rating idSD, asumsi itu <b>rusak</b>. <b>Waterfall likuidasi</b> menggantikannya: jual semua aset dengan haircut realistis → kurangi biaya likuidasi → bagikan ke kreditor <b>sesuai senioritas</b> → sisa (kalau ada) untuk ekuitas.</p>
<div class="callout"><b>Kenapa urutan senioritas?</b> ① <b>Biaya likuidasi</b> (kurator, legal) — tanpa ini tidak ada yang bisa dijual. ② <b>Kreditor dijamin / bank</b> (MRA Tranche A Rp2,154tn + Tranche B Rp21,736tn = Rp23,89tn). ③ <b>Konkuren</b> (obligasi non-penjaminan — sudah direstrukturisasi — &amp; vendor). ④ <b>Ekuitas</b> — paling belakang, paling menderita. Senioritas bukan opini; ia <b>hukum</b>.</p></div>
<div class="example korporat"><div class="lbl">🏢 Hasil waterfall (Rp triliun, asumsi ilustratif di workbook)</div>
<p>Proceeds likuidasi = kas 1,50 + piutang 2,76 + tol 5,40 + aset tetap 4,00 = <b>Rp13,66tn</b>. Biaya likuidasi 5% = 0,68 → <b>net proceeds Rp12,98tn</b>. Klaim bank (Tranche A+B) = <b>Rp23,89tn</b> — hampir <b>dua kali lipat</b> dana yang tersedia. Kreditor bank menerima MIN(12,98; 23,89) = <b>Rp12,98tn</b> → recovery rate <b>54,3%</b>. Sisa untuk obligasi/vendor: <b>Rp0</b>. Sisa untuk ekuitas: <b>Rp0</b>. Bahkan kreditor senior tidak lunas — apalagi pemegang saham.</p></div>
<div class="callout"><b>Kenapa "nol" ini penting?</b> Karena ia menjawab pertanyaan tersulit case ini — <i>apakah ada nilai ekuitas tersisa?</i> — tanpa perlu berdebat soal masa depan. Waterfall tidak meramal; ia <b>menghitung siapa dapat apa jika semuanya dijual hari ini</b>: bukti aritmetika, bukan opini.</p></div>
<div class="callout"><b>⚠️ Distress ≠ otomatis likuidasi.</b> Waterfall di atas = <b>satu skenario</b> (likuidasi hari ini), bukan vonis final. Valuasi distress yang benar memakai <b>pembobotan probabilitas</b>:
<div class="formula">Nilai = p(restrukturisasi) × V<sub>restruktur</sub> + p(likuidasi) × V<sub>likuidasi</sub></div>
<p style="margin-top:8px">Tiga komponen yang berbeda: (1) <b>going-concern/restructuring value</b> — nilai jika restrukturisasi berhasil (butuh model operasi pasca-restrukturisasi, bukan DCF status quo); (2) <b>distress-sale value</b> — nilai jual aset di bawah tekanan (di antara keduanya); (3) <b>liquidation recovery</b> — waterfall di atas. Analis yang langsung melompat ke "distress = likuidasi" melewatkan skenario tengah yang justru paling mungkin dinegosiasikan.</p></div>`},
{h: "Kenapa restrukturisasi bisa bikin ekuitas 'positif'? Tiga skenario yang berbeda", body: `
<p>Haircut 30% atas Tranche B Rp21,736tn → liabilitas turun <b>Rp6,52tn</b>. Ekuitas mekanis = −3,34 + 6,52 = <b>+Rp3,18tn</b>. Tapi <b>siapa pemilik ekuitas itu</b> tergantung skenario — dan ketiganya beda total:</p>
<div class="example korporat"><div class="lbl">🏢 Skenario A — Pure forgiveness (haircut tanpa konversi)</div>
<p>Kreditor memangkas pokok Rp6,52tn <b>tanpa menerima saham</b>. Tidak ada saham baru diterbitkan → <b>pemegang saham lama tetap pemilik 100%</b> perusahaan yang kini berekutias buku +Rp3,18tn. Kedengarannya bagus? Justru itu masalahnya: <b>kreditor tidak akan memberi hadiah cuma-cuma</b>. Pure forgiveness praktis tidak terjadi tanpa kompensasi — kreditor hampir selalu minta imbalan (konversi, warrant, syarat ketat); pengecualian ada, misalnya penghapusan antar-pihak berelasi atau restrukturisasi yang diawasi pengadilan.</p></div>
<div class="example korporat"><div class="lbl">🏢 Skenario B — Debt-for-equity swap (DENGAN terms eksplisit)</div>
<p>Kreditor mengonversi Rp6,52tn utang menjadi <b>N saham baru</b> pada valuasi <b>RpV per saham</b>. Kepemilikan kreditor = N ÷ (N + saham lama). <b>Tanpa N dan V, tidak ada yang bisa disimpulkan soal kepemilikan.</b> Contoh ilustratif: bila valuasi Rp1.000/saham → 6,52 miliar saham baru vs ~29 miliar saham lama → kreditor pegang ~18%. Bila valuasi Rp100/saham → 65,2 miliar saham baru → kreditor pegang ~69%, pemegang lama terdilusi berat. <b>Angka kepemilikan = fungsi terms, bukan fungsi haircut.</b></p></div>
<div class="example korporat"><div class="lbl">🏢 Skenario C — Likuidasi (waterfall)</div>
<p>Sudah dihitung di section sebelumnya: net proceeds Rp12,98tn vs klaim bank Rp23,89tn → ekuitas = <b>Rp0</b>. Ini skenario jika perusahaan dijual hari ini.</p></div>
<div class="callout"><b>Kenapa tiga skenario?</b> Karena "haircut 30%" saja <b>tidak menjawab</b> siapa pemilik ekuitas baru. Haircut = peristiwa akuntansi (liabilitas turun). Kepemilikan = peristiwa hukum (saham diterbitkan kepada siapa, berapa, pada valuasi berapa). Mencampur keduanya = kesalahan konseptual paling umum dalam analisis distressed.</p></div>
<div class="callout"><b>Konteks kebijakan:</b> Danantara pegang 74,6%, merger ke Hutama Karya <b>ditunda</b> (butuh bersih-bersih dulu), PMN Rp3tn <b>dibatalkan</b> (PP 20/2025) — negara tidak menyuntik, kreditor yang menanggung.</p></div>
<div class="example jebakan"><div class="lbl">🚫 Jebakan "turnaround"</div>
<p>"Delapan inisiatif pemulihan, 63 proyek Rp31,7tn — pasti bangkit!" Mungkin. Tapi analis kredit bertanya duluan: <i>dengan beban keuangan Rp2,79tn per 9 bulan vs laba kotor FY25 Rp1,58tn setahun penuh — <b>bunga 9 bulan LEBIH BESAR dari laba kotor setahun</b> — dari mana kas untuk membayarnya?</i> Proyek baru tidak membayar bunga lama.</p></div>`},
{h: "Tugas praktik", body: `
<p>Bangun waterfall likuidasi WSKT di workbook latihan: susun data LK yang disajikan <b>apa adanya (acak-acakan)</b> menjadi proceeds per kelas aset (kas, piutang, tol, aset tetap) → kurangi biaya likuidasi → distribusikan sesuai senioritas → recovery rate bank → sisa untuk obligasi/vendor → sisa untuk ekuitas. Lalu kerjakan <b>skenario restrukturisasi</b>: haircut 30% Tranche B → ekuitas mekanis baru → nilai ekuitas lama. Semua sel jawaban harus rumus yang me-link ke data/asumsi.</p>
<div class="callout"><b>Kenapa tugas ini penting?</b> Ini satu-satunya case di course yang <b>melarangmu berpikir sebagai pemegang saham</b>. Kuasai waterfall sekali — dan kamu tidak akan pernah lagi tertipu saham "murah" yang ekuitasnya negatif.</p></div>`},
{h: "🔥 Bekal Hell Mode", body: `
<ul>
<li><b>Waterfall</b> = distribusi hasil likuidasi sesuai senioritas klaim.</li>
<li><b>Senioritas</b> = biaya likuidasi → kreditor dijamin → konkuren → ekuitas.</li>
<li><b>Recovery rate</b> = dana diterima ÷ klaim.</li>
<li><b>Ekuitas negatif</b> = multiple ekuitas tak terdefinisi; berpikir sebagai kreditor.</li>
<li><b>Haircut</b> = pengurangan pokok utang; menaikkan ekuitas buku mekanis. SIAPA pemilik ekuitas baru tergantung skenario (forgiveness / swap dengan terms / likuidasi) — bukan otomatis kreditor.</li>
<li><b>Harga suspensi</b> = fosil, bukan sinyal valuasi.</li>
</ul>`}
],
quiz: [
{q: "Ekuitas WSKT per 30 Sep 2026 = −Rp3,34tn. Kenapa P/E dan P/BV tidak bermakna?", opts: ["Karena datanya belum diaudit","Ekuitas negatif — penyebut tak bermakna","Karena sahamnya sedang disuspensi","Karena ruginya terlalu besar"], answer: 1, k: "distressed", diff: "Easy",
 hints: ["P/BV = harga ÷ book value per saham.", "Book value negatif → hasil bagi tak bisa diinterpretasikan."],
 explain: "Book value negatif membuat P/BV (dan P/E atas rugi) tak terdefinisi secara ekonomi — bukan 'murah', melainkan alat ukur yang tidak berlaku. (Real-09 § Kenapa multiple ekuitas tak bermakna?)"},
{q: "Dalam analisis distressed seperti WSKT, analis berpikir sebagai?", opts: ["Pemegang saham mayoritas","Kreditor — siapa dibayar duluan","Manajemen — strategi turnaround","Regulator — soal kepatuhan"], answer: 1, k: "distressed", diff: "Easy",
 hints: ["Siapa yang dibayar pertama saat aset dijual?", "Pemegang saham dapat sisa — kalau ada."],
 explain: "Dalam distress, urutan klaim menentukan segalanya. Analis menilai recovery kreditor dulu; ekuitas = sisa. (Real-09 § Kenapa multiple ekuitas tak bermakna?)"},
{q: "Net proceeds Rp12,98tn, klaim bank (Tranche A+B) Rp23,89tn. Recovery rate kreditor bank?", opts: ["100% — bank selalu lunas duluan","54,3%","12,98%","0% — ekuitas didahulukan"], answer: 1, k: "waterfall", diff: "Medium",
 hints: ["Recovery rate = dana diterima ÷ klaim.", "MIN(12,98; 23,89) ÷ 23,89 = ?"],
 explain: "Bank menerima MIN(12,98; 23,89) = Rp12,98tn → 12,98 ÷ 23,89 = 54,3%. Senioritas menjamin urutan, bukan kelunasan. (Real-09 § Kenapa waterfall, bukan DCF?)"},
{q: "Urutan pembayaran waterfall yang benar?", opts: ["Ekuitas → bank → vendor → biaya","Biaya likuidasi → kreditor dijamin → konkuren → ekuitas","Vendor → ekuitas → bank","Semua kreditor dibagi rata"], answer: 1, k: "seniority", diff: "Medium",
 hints: ["Siapa yang harus dibayar agar penjualan aset bisa jalan?", "Ekuitas di urutan keberapa? Paling depan atau paling belakang?"],
 explain: "Biaya likuidasi dulu (tanpa kurator tak ada penjualan), lalu kreditor dijamin, konkuren, terakhir ekuitas. Senioritas = hukum, bukan opini. (Real-09 § Kenapa waterfall, bukan DCF?)"},
{q: "Beban keuangan 9M26 Rp2,79tn vs laba kotor FY25 Rp1,58tn. Artinya?", opts: ["Bunga 9 bulan > laba kotor setahun — pendarahan struktural","Perusahaan hampir mencapai impas","Laba kotor menutupi beban bunga","Beban keuangan turun drastis"], answer: 0, k: "distressed", diff: "Medium",
 hints: ["Bandingkan 2,79 (9 bulan) vs 1,58 (12 bulan).", "Bisakah laba kotor membayar bunganya?"],
 explain: "Bunga 9 bulan (Rp2,79tn) melampaui laba kotor setahun penuh (Rp1,58tn) — operasi tidak bisa menutup biaya utang. Inilah 'pendarahan'. (Real-09 § Kenapa restrukturisasi bisa bikin ekuitas 'positif'?) "},
{q: "Haircut 30% atas Tranche B Rp21,736tn. Ekuitas mekanis pasca-haircut?", opts: ["Tetap −Rp3,34tn","−Rp9,86tn","−Rp3,34tn + Rp6,52tn = +Rp3,18tn","Rp0 persis"], answer: 2, k: "haircut", diff: "Hard",
 hints: ["Haircut 30% × 21,736 = ?", "Liabilitas turun → ekuitas (aset − liabilitas) naik sebesar itu."],
 explain: "Haircut = 21,736 × 30% = Rp6,52tn. Liabilitas turun Rp6,52tn → ekuitas mekanis = −3,34 + 6,52 = +Rp3,18tn. Tapi SIAPA pemiliknya tergantung skenario: pure forgiveness → milik pemegang lama; debt-for-equity swap → tergantung terms (jumlah saham & valuasi); likuidasi → Rp0. (Real-09 § Tiga skenario yang berbeda)"},
{q: "Saham suspensi di Rp202 sejak Mei 2023. Kenapa Rp202 BUKAN sinyal 'murah'?", opts: ["Karena Rp202 sebenarnya terlalu mahal","Harga beku 3,5 tahun — tak ada price discovery","Karena Danantara pegang 74,6%","Karena minimal pembelian 1 lot"], answer: 1, k: "distressed", diff: "Medium",
 hints: ["Kapan terakhir harga itu terbentuk? Mei 2023.", "Apa yang terjadi sejak itu? Rugi −4,48tn, ekuitas negatif, MRA."],
 explain: "Rp202 adalah fosil — harga terakhir sebelum suspensi, tidak mencerminkan 3,5 tahun kabar buruk. Saham suspensi = saham tanpa pasar, bukan saham murah. (Real-09 § Kenapa multiple ekuitas tak bermakna?)"}
],
hellPass: 80,
hell: [
{q: "Biaya likuidasi naik 5% → 10%. Recovery rate bank menjadi?", opts: ["Tetap 54,3%","51,4%","48,9%","45,0%"], answer: 1, diff: "Medium",
 explain: "Net proceeds = 13,66 × 90% = Rp12,29tn → 12,29 ÷ 23,89 = 51,4%. Biaya likuidasi memakan recovery kreditor duluan — ekuitas tetap nol."},
{q: "Recovery piutang jatuh 40% → 20%. Recovery rate bank menjadi?", opts: ["Tetap 54,3%","51,4%","48,9%","0%"], answer: 2, diff: "Medium",
 explain: "Piutang recovery = 6,90 × 20% = Rp1,38tn → proceeds Rp12,28tn → net Rp11,67tn → 11,67 ÷ 23,89 = 48,9%. Sensitivitas asumsi recovery langsung memukul kreditor."},
{q: "Kreditor mengonversi Rp5tn utang menjadi saham baru. Nasib pemegang saham lama?", opts: ["Tetap menjadi mayoritas","Terdilusi mendekati nol — nilai wajar klaim lama = Rp0","Malah untung karena utang turun","Tidak terpengaruh sama sekali"], answer: 1, diff: "Hard",
 explain: "Konversi Rp5tn menjadi saham baru = debt-for-equity swap. Nasib pemegang lama tergantung TERMS: berapa saham baru diterbitkan & pada valuasi berapa. Waterfall membuktikan klaim ekuitas lama = Rp0, sehingga dalam praktik kreditor akan menuntut mayoritas saham baru — tapi 'terdilusi' bukan otomatis; ia hasil negosiasi terms. (Real-09 § Tiga skenario yang berbeda)"},
{q: "Pasca-haircut ekuitas buku +Rp3,18tn, tapi 'nilai ekuitas lama = Rp0'. Kontradiksi?", opts: ["Ya — salah satunya salah hitung","Tidak: ekuitas buku ≠ nilai untuk pemegang lama","Tidak: haircut tak memengaruhi ekuitas","Ya — waterfall-nya yang salah"], answer: 1, diff: "Hard",
 explain: "Tidak kontradiksi — tapi jawabannya tergantung skenario. Pure forgiveness: +Rp3,18tn milik pemegang lama (tidak ada saham baru). Debt-for-equity swap: milik whoever memegang saham baru sesuai terms. Yang pasti: ekuitas buku naik mekanis karena liabilitas turun; kepemilikan ditentukan oleh DOKUMEN konversi, bukan oleh aritmetika haircut. (Real-09 § Tiga skenario yang berbeda)"},
{q: "Kenapa DCF going-concern tidak valid untuk WSKT?", opts: ["Karena WACC tidak bisa dihitung","Asumsi kelangsungan usaha rusak; ekuitas = opsi out-of-the-money atas aset","Karena revenue turun 17%","Karena datanya tidak tersedia"], answer: 1, diff: "Medium",
 explain: "DCF butuh going concern. Dengan defisit Rp20,8tn dan rating idSD, ekuitas secara ekonomi = opsi atas aset setelah kreditor dibayar — dan opsi ini jauh out-of-the-money. Tapi ingat: distress ≠ otomatis likuidasi. Valuasi yang benar = probabilitas-terboboti (restrukturisasi vs likuidasi); waterfall = komponen likuidasinya. (Real-09 § Kenapa waterfall, bukan DCF?)"}
],
tasks: [
{t: "Tugas A — Waterfall likuidasi WSKT (±4 jam)", d: "Download workbook RC9. Susun data LK yang disajikan apa adanya menjadi waterfall: proceeds per kelas aset → biaya likuidasi → distribusi senioritas → recovery rate bank → sisa obligasi/vendor → sisa ekuitas. Lanjut ke skenario restrukturisasi: bedakan (a) pure forgiveness 30% Tranche B, (b) debt-for-equity swap DENGAN terms eksplisit (jumlah saham & valuasi), (c) likuidasi. Semua rumus link ke data/asumsi.", url: "https://drive.google.com/drive/folders/1A8U9qMg7d5s1dxJca9ZzHjalV8hRu6YT"},
{t: "Tugas B — Stress test asumsi (±1 jam)", d: "Di file jawabanmu: ubah recovery tol 45%→30%, catat recovery rate bank yang baru. Ubah biaya likuidasi 5%→10%, catat lagi. Tulis 2 kalimat: asumsi mana yang paling berbahaya bagi kreditor? Bagi ekuitas?", url: ""},
{t: "Tugas C — Kuis di atas", d: "Target ≥6/7 benar.", url: ""}
],
blind: {h: "Uji Kilat — angka beda", body: `
<p><b>1.</b> Proceeds Rp10tn, biaya likuidasi 5%, klaim bank Rp20tn. Recovery rate bank = ?</p>
<details class="ans"><summary>Jawaban</summary><p>Net = 9,5. Rate = 9,5 ÷ 20 = 47,5%.</p></details>
<p><b>2.</b> Tranche B Rp21,736tn di-haircut 50%. Sisa Tranche B = ?</p>
<details class="ans"><summary>Jawaban</summary><p>21,736 × 50% = Rp10,868tn.</p></details>`}
},
];

/* ---------- English mode overlays (EN) ---------- */
(function(){
const EN = {};
EN["real-01"] = {
title: "UNVR: The Boycott Turnaround",
sub: "Real Case 1 · ±6 hrs · 3-scenario DCF",
sections: [
{h: "Why Unilever Indonesia?", body: `
<p><b>Unilever Indonesia (UNVR.JK)</b> is a classic turnaround case study: the 2023–2024 boycott hit volumes, revenue plunged <b>Rp41.22T (2022) → Rp30.62T (2024)</b>, EBIT margin squeezed. Then 2025: revenue recovering to Rp31.94T and the transformation program underway.</p>
<div class="example korporat"><div class="lbl">🏢 Why this is flagship</div>
<p>Most valuation courses use "healthy and stable" companies — you learn nothing about <b>uncertainty</b>. UNVR forces you to answer the real analyst question: <i>how fast does recovery happen, and what's a fair price for each speed?</i></p></div>
<div class="callout"><b>Why a 3-scenario DCF, not one number?</b> Because one number = one guess disguised as precision. Three scenarios (Bear/Base/Bull) map the <b>space of possibilities</b> — and investment decisions are born from comparing the market price against that space, not from one "target price" number.</p></div>`},
{h: "Why FCFF, not net income?", body: `
<div class="formula">FCFF = NOPAT × (1 − reinvestment rate)</div>
<p><b>NOPAT</b> = EBIT × (1 − tax): operating profit as if debt-free. Subtract <b>reinvestment</b> (capex + working capital absorbing cash) → you get <b>FCFF</b>: cash truly available to all capital providers.</p>
<div class="example jebakan"><div class="lbl">🚫 The net-income trap</div>
<p>UNVR 2025: net income Rp7.64T <b>higher</b> than 2022 (Rp5.36T) even though revenue fell 22%! Net income is polluted by non-operating &amp; non-cash items. A DCF using raw NI is valuing <b>accounting</b>, not <b>cash</b>.</p></div>
<div class="callout"><b>⚠️ One-off inside that Rp7.64T:</b> the headline number <b>includes the gain on the ice-cream business disposal</b> (discontinued operations). Profit from <b>continuing operations was only Rp3.5T</b> (Unilever press release, 12 Feb 2026). The beginner's lesson: a headline figure can make the business look <i>more</i> profitable than its actual ongoing operations — always ask <b>"profit from what?"</b> before using NI in a valuation.</div>
<div class="callout"><b>Why 25% reinvestment of NOPAT?</b> A company can't distribute all of NOPAT — some must go back into capex and working capital to keep the machine running. 25% is an illustrative assumption (not an audited number): what matters is that it's <b>there and explicit</b>, not hidden.</p></div>`},
{h: "Why does terminal value dominate?", body: `
<div class="formula">TV = FCFF_2030 × (1+g) / (WACC − g)</div>
<p>Base result: <b>PV of FCFF 2026–2030 = Rp12.05T</b>, but <b>terminal value = Rp51.39T</b> (PV Rp31.91T). Over 70% of DCF value comes from terminal value — the Gordon formula assuming the company grows 3% <b>forever</b>.</p>
<div class="callout"><b>Why does this matter?</b> Because your DCF is <b>extremely sensitive</b> to two small numbers: WACC and terminal g. Raise WACC 10%→11% and value collapses. An analyst who skips <b>sensitivity analysis</b> on these two numbers is building a castle on assumptions they never tested.</p></div>`},
{h: "Why do Bear/Base/Bull differ?", body: `
<p>The three scenarios differ on <b>two levers</b>: revenue recovery speed (g 2.5% / 4.5% / 6%) and EBIT margin normalization (12% / 15% / 17%). The 17% Bull margin isn't made up — <b>2022 EBIT margin (pre-boycott) was 17.2%</b>: Bull = "back to historical levels".</p>
<div class="example korporat"><div class="lbl">🏢 The result</div>
<p>Per-share value: <b>Bear Rp984 · Base Rp1,291 · Bull Rp1,531</b>. The Rp1,390 market price (yfinance, Oct 2026) sits between Base and Bull — the market has already priced in a <b>moderate recovery</b>. Base upside −7.1%: this model does NOT scream "buy".</p></div>
<div class="callout"><b>Why normalize one-offs?</b> The 4Q24 transformation &amp; severance costs are one-time — projecting them forever would punish the company for costs that won't recur. Normalization = cleaning the data before projecting.</p></div>`},
{h: "Practice task", body: `
<p>Build the 3-scenario UNVR DCF in the practice workbook: project revenue &amp; FCFF 2026–2030 per scenario, compute PV, terminal value, EV → equity → per-share value → upside. Every answer cell must be formulas linking to assumptions — change Base g to 6% and watch the whole model follow.</p>
<div class="callout"><b>Why does this task matter?</b> This is your first DCF on a real company. Feel how <b>fragile</b> a single valuation number is — and how <b>powerful</b> a scenario range is as a thinking tool.</p></div>`},
{h: "🔥 Hell Mode briefing", body: `
<ul>
<li><b>NOPAT</b> = EBIT × (1 − tax). Operating profit without debt effects.</li>
<li><b>FCFF</b> = free cash for ALL capital providers (shareholders + creditors).</li>
<li><b>WACC</b> = weighted average cost of capital — the DCF discount rate.</li>
<li><b>Terminal value</b> = the "forever" value after the explicit forecast period.</li>
<li><b>Negative upside</b> = model value BELOW market price (not a buy signal).</li>
</ul>`}
],
quiz: [
{q: `The 3-scenario UNVR DCF (Bear/Base/Bull) is differentiated by two assumptions. Which two?`, opts: ["Recovery pace + EBIT margin","WACC level and tax rate","Shares outstanding","Cash position at end-2025"], answer: 0, k: "scenario_analysis",
 hints: ["Scenarios = different future stories.","Bear vs Bull: who recovers faster, and margin back to what?"],
 explain: `Volume recovery speed (g 2.5%/4.5%/6%) and EBIT margin normalization (12%/15%/17%). WACC &amp; tax are identical across scenarios.`},
{q: `Base result: 5-year PV of FCFF Rp12.05T, terminal value Rp51.39T. The key lesson?`, opts: ["Terminal value can be safely ignored","Value sits in the terminal — stress-test WACC and g","The 5-year projection doesn't matter much","WACC doesn't affect the terminal value"], answer: 1, k: "terminal_value",
 hints: ["Compare 12.05 vs 51.39.","TV formula = FCFF×(1+g)/(WACC−g): the denominator is two small numbers apart."],
 explain: `Terminal value dominates (>70% of value) — the DCF is hypersensitive to WACC and terminal g. Sensitivity testing is mandatory.`},
{q: `Upside vs market (Base) = −7.1%. That means?`, opts: ["The model screams aggressive buy","WACC must be raised 7.1%","Market price is 7.1% above DCF value","The Bear scenario is more optimistic"], answer: 2, k: "dcf",
 hints: ["Upside = model value / market price − 1.","Negative means model value < market price."],
 explain: `−7.1% upside = Base DCF value (Rp1,291) below market price (Rp1,390). The model doesn't scream 'buy'.`},
{q: `Why does the Bull scenario use a 17% EBIT margin?`, opts: ["Because 17% is a round number","Bull = back to the 2022 margin (17.2%)","Because WACC 10% plus 7%","Margins don't affect DCF"], answer: 1, k: "scenario_analysis",
 hints: ["Check the historical data in the workbook.","Bull = the 'full recovery' story. Recover to where?"],
 explain: `2022 EBIT margin = 7.08/41.22 = 17.2%. Bull assumes full normalization to pre-boycott levels — anchored in data, not wishes.`},
{q: `FCFF = NOPAT × 75%. What does the 75% represent?`, opts: ["It reflects a 25% corporate tax rate","The remainder after 25% reinvestment (capex+WC)","It reflects a 75% EBIT margin instead","A 25% discount applied for risk"], answer: 1, k: "fcf",
 hints: ["NOPAT can't be distributed 100% — the machine needs feeding.","Reinvestment = capex + ΔWC."],
 explain: `75% = 1 − 25% reinvestment. The company retains 25% of NOPAT for capex &amp; working capital; the rest is FCFF.`}
],
hell: [
{q: `WACC rises 10% → 12%. The Base DCF value will…`, opts: ["Rise — the discount rate is higher","Stay; WACC only matters for Bear","Fall sharply; the terminal gets hit hardest","Rise because the risk has fallen"], answer: 2,
 explain: `Higher discount → lower PV in every year, and terminal value (denominator WACC−g widens) gets hit hardest. That's why the WACC assumption must be tested.`},
{q: `Valuation range Rp984–Rp1,531. The correct way to use it?`, opts: ["Take the middle as a certain target","Buy near Bear: margin of safety","Ignore Bear; focus on Bull","A range means the model failed"], answer: 1,
 explain: `The range = a map of uncertainty. Value-investing discipline: buy near Bear (margin of safety), not mid-hope.`},
{q: `Why does DCF use FCFF, not net income?`, opts: ["Because NI is always the smaller number","Because FCFF is easier to compute correctly","Because regulators forbid using NI","NI mixes interest; FCFF is cash for all providers"], answer: 3,
 explain: `NI = after interest (shareholders only) + non-cash distortions. FCFF before interest = cash for equity AND creditors — matching EV.`},
{q: `Terminal g 3% → 4%. Effect on terminal value?`, opts: ["Falls because it grows faster","Rises — the (WACC−g) denominator shrinks","Flat; terminal g isn't sensitive","Terminal value turns negative"], answer: 1,
 explain: `TV = FCF×(1+g)/(WACC−g). g 3%→4%: denominator 7%→6% — TV rises ~19%. One percent in the 'forever' assumption = a giant impact.`},
{q: `Base −7%, Bull +10%. The honest analyst's call?`, opts: ["Wait; buy only near Bear territory","Recommend BUY because Bull is positive","Recommend SELL because Base is negative","Tweak assumptions until upside turns positive"], answer: 0,
 explain: `An honest analyst doesn't massage assumptions to make upside positive. At Rp1,390 the price already reflects moderate recovery — edge appears only if the price drops to Rp984–1,100.`}
],
tasks: [
{t: "Task A — 3-scenario DCF (±4 hrs)", d: "Download the RC1 workbook. Build 2026–2030 revenue & FCFF projections for Bear/Base/Bull, then PV, terminal value, EV → equity → per-share value → upside. All formulas link to assumptions.", url: "https://drive.google.com/drive/folders/15etlyOcKIB4Uz9b_I401Iz2ASubqGa2A"},
{t: "Task B — Sensitivity test (±1 hr)", d: "In your answer file: change WACC 10%→12%, note the Base per-share change. Change terminal g 3%→4%, note again. Write 2 sentences: which assumption is most dangerous?", url: ""},
{t: "Task C — The quiz above", d: "Target ≥4/5 correct.", url: ""}
],
blind: {h: "Speed Drill — different numbers", body: `
<p><b>1.</b> NOPAT Rp5T, 25% reinvestment. FCFF = ?</p>
<details class="ans"><summary>Answer</summary><p>5 × 75% = Rp3.75T.</p></details>
<p><b>2.</b> Year-5 FCFF Rp4T, WACC 10%, g 3%. Terminal value = ?</p>
<details class="ans"><summary>Answer</summary><p>4 × 1.03 / (0.10 − 0.03) = Rp58.86T.</p></details>`}
};
EN["real-02"] = {
title: "ASII: Conglomerate SOTP",
sub: "Real Case 2 · ±5 hrs · Sum-of-the-parts",
sections: [
{h: "Why Astra?", body: `
<p><b>Astra International (ASII.JK)</b> isn't one business — it's <b>seven</b>: automotive, heavy equipment &amp; mining, financial services, agribusiness, infrastructure &amp; logistics, information technology, property. 2025 revenue Rp323.39T, EBIT Rp53.02T — but each segment has <b>different</b> risk, growth, and multiples.</p>
<div class="callout"><b>📋 Data status:</b> group revenue &amp; EBIT pulled from the annual report (via yfinance). <b>The Rp53.02T EBIT has not been independently reconciled to a reported line item</b> — treat it as a working input, not an audited figure. Segment weights &amp; multiples = <b>simplified illustrative assumptions</b> (not verified market multiples): what's scored is your <b>SOTP mechanics</b>, not the precision of the assumptions.</div>
<div class="callout"><b>Why SOTP, not consolidated DCF?</b> A consolidated DCF uses one WACC and one growth rate for 7 different businesses — like pricing 7 houses with one price per square meter. <b>Sum-of-the-parts (SOTP)</b> values each segment with its own multiple, then adds them up. That's how professional analysts value conglomerates.</p></div>`},
{h: "Why does each segment get a different multiple?", body: `
<div class="formula">Segment EV = Segment EBIT × Segment EV/EBIT multiple</div>
<p>Multiples reflect <b>earnings quality</b>: financial services (stable cash flow, 7×) vs heavy equipment (commodity-cyclical, 4.5×) vs IT (fast-growing, 10×). One multiple for all segments = assuming all businesses are equally attractive — clearly wrong.</p>
<div class="example korporat"><div class="lbl">🏢 Example</div>
<p>Automotive: 35% × Rp53.02T × 5 = <b>Rp92.78T</b> — the biggest EV contributor. Property: 3% × Rp53.02T × 7 = Rp11.13T. All 7 segments = <b>Rp306.18T</b>.</p></div>
<div class="callout"><b>Why are the weights &amp; multiples illustrative?</b> Detailed segment numbers are in the annual report; here they're simplified so your focus stays on the <b>SOTP mechanics</b> — not memorizing numbers. Assumptions can be swapped; what's scored is how you think, not how precisely you guess.</p></div>`},
{h: "Why subtract net debt?", body: `
<div class="formula">Equity = SOTP EV − Net Debt</div>
<p>EV (enterprise value) = value for <b>all capital providers</b> (equity + creditors). To get <b>shareholder</b> value, subtract net debt: Rp110.30T − Rp52.62T = <b>Rp57.68T</b>. SOTP equity = 306.18 − 57.68 = <b>Rp248.50T</b> → Rp6,261/share.</p>
<div class="example jebakan"><div class="lbl">🚫 Classic bug</div>
<p>Forgetting to subtract net debt = claiming creditors' cash as shareholders'. Or subtler: using <i>gross debt</i> without subtracting cash — even though cash can repay debt. Always <b>net</b>.</p></div>`},
{h: "Why is there a conglomerate discount?", body: `
<p>SOTP value Rp6,261 vs market price Rp4,800 (yfinance, Oct 2026) → <b>23.3% discount</b>. The market prices Astra below the sum of its parts. That's not an automatic market mistake = opportunity — it's a <b>question</b>.</p>
<div class="callout"><b>Why does the market discount it?</b> Candidate explanations: inefficient capital allocation across segments, conglomerate governance, cyclical segments (heavy equipment/mining) at cycle peak, or just sentiment. The analyst's job: <b>explain the gap</b>, not assume the market is dumb. Sometimes the discount is justified — sometimes it's your opportunity.</p></div>`},
{h: "Practice task", body: `
<p>Build Astra's SOTP: allocate EBIT to 7 segments (weight × multiple), sum → SOTP EV → subtract net debt → equity → per-share value → conglomerate discount. Then test: change financial services multiple 7→5 — how much does per-share value move?</p>
<div class="callout"><b>Why does this task matter?</b> SOTP is the equity analyst's weapon for holdings &amp; conglomerates — a very common structure in Indonesia (Astra, Lippo, Bakrie, Sinar Mas). Master the pattern once, use it forever.</p></div>`},
{h: "🔥 Hell Mode briefing", body: `
<ul>
<li><b>SOTP</b> = sum-of-the-parts: value each segment, then add up.</li>
<li><b>EV</b> = company value for all capital providers; <b>Equity</b> = EV − net debt.</li>
<li><b>Net debt</b> = total debt − cash (always net, never gross).</li>
<li><b>Conglomerate discount</b> = 1 − market price / SOTP value.</li>
<li><b>EV/EBIT multiple</b> = a mirror of each business's earnings quality &amp; risk.</li>
</ul>`}
],
quiz: [
{q: `SOTP (sum-of-the-parts) means?`, opts: ["Summing all segments' revenue","Dividing valuation by segment count","Valuing each segment then adding up","Summing 7 segments' net income"], answer: 2, k: "sotp",
 hints: ["Parts = the pieces.","Different businesses → different valuations, then add."],
 explain: `SOTP values each segment separately (a multiple fitting its character) then sums into group EV.`},
{q: `SOTP EV Rp306.18T becomes equity Rp248.50T. What was subtracted?`, opts: ["Net debt Rp57.68T (debt − cash)","This year's dividend payments","NCI of all subsidiaries","The company's deferred tax balance"], answer: 0, k: "sotp",
 hints: ["EV = for all capital providers.","Equity = for shareholders only. The gap belongs to whom?"],
 explain: `Net debt = Rp110.30T − Rp52.62T = Rp57.68T. EV belongs to all providers; subtract creditors' claim → equity.`},
{q: `A 23.3% conglomerate discount means?`, opts: ["Astra's value fell by 23.3%","Cash dividends were cut by 23.3%","Debt expenses rose by 23.3%","The market prices it 23.3% below SOTP"], answer: 3, k: "conglomerate_discount",
 hints: ["1 − 4800/6261 = ?","SOTP 6261 vs market 4800."],
 explain: `Discount = 1 − market price/SOTP value = 23.3%. The market prices the conglomerate below the sum of its parts.`},
{q: `Why does each segment get a different EV/EBIT multiple?`, opts: ["To make the total a round Rp306T","Each business's risk & earnings quality differ","Because each segment's EBIT differs","Accounting rules require it"], answer: 1, k: "sotp",
 hints: ["Compare financial services vs heavy equipment mining.","Stable vs cyclical business — which deserves to be pricier?"],
 explain: `Multiple = the price of earnings quality. Fast-growing IT (10×), cyclical heavy equipment (4.5×). One multiple for all = assuming all businesses are equal.`},
{q: `The biggest EV-contributing segment?`, opts: ["Property at Rp11.13T","Agribusiness at Rp31.81T","Automotive at Rp92.78T","IT segment at Rp21.21T"], answer: 2, k: "sotp",
 hints: ["Biggest weight × multiple.","35% × 5 = ?"],
 explain: `Automotive: 35% × Rp53.02T × 5 = Rp92.78T — nearly a third of SOTP EV.`}
],
hell: [
{q: `Financial services multiple falls 7→5. Effect on SOTP per-share value?`, opts: ["The value rises by ~Rp400","The value falls by ~Rp400","Flat because it's insensitive","It rises because risk fell"], answer: 1,
 explain: `Financial services EV: 53.02×15%×7=Rp55.67T → ×5=Rp39.77T. Gap −Rp15.90T ÷ 39.69 billion shares = −Rp401/share. Multiple sensitivity hits valuation directly.`},
{q: `When is SOTP more appropriate than consolidated DCF?`, opts: ["Always — DCF is now obsolete","When the firm has only one segment","It's never more appropriate","For firms with multiple segments"], answer: 3,
 explain: `SOTP wins for multi-segment conglomerates/holdings. For single-business, consolidated DCF is cleaner — SOTP just adds noise.`},
{q: `Net debt rises Rp10T (all else equal). The conglomerate discount will…`, opts: ["Rise — equity falls, the gap widens","The discount actually falls instead","It stays exactly the same as before","The discount turns fully negative"], answer: 0,
 explain: `Equity = EV − net debt. Net debt +10T → equity −10T → per-share value falls → the market price looks increasingly 'cheap' vs SOTP → the recorded discount widens.`},
{q: `Segment weights & multiples here are illustrative. Why do analysts still use SOTP?`, opts: ["Because precision doesn't matter","Because the market ignores assumptions","The mechanics get tested; inputs can be swapped","DCF is banned for conglomerates"], answer: 2,
 explain: `A model is a thinking framework, not a forecast. Swap weights/multiples with annual-report numbers → same mechanics. Great analysts test 'what if', not memorize inputs.`},
{q: `Analyst A: 'A 23.3% discount = buy!'. The mistake?`, opts: ["Right — discounts always mean opportunity","Wrong — a discount is a question","Right, as long as the discount tops 20%","Wrong — discounts are always traps"], answer: 1,
 explain: `A discount is a question, not an answer. It could be opportunity — or the market knows something (governance, cycle) your model ignored. Explain the gap first.`}
],
tasks: [
{t: "Task A — Astra SOTP (±3 hrs)", d: "Download the RC2 workbook. Compute 7 segments' EV (weight × multiple), total → net debt → equity → per-share value → conglomerate discount. All formulas link to inputs.", url: "https://drive.google.com/drive/folders/15etlyOcKIB4Uz9b_I401Iz2ASubqGa2A"},
{t: "Task B — Multiple stress test (±1 hr)", d: "Change heavy-equipment multiple 4.5→3 (commodity-crash scenario). Note the new per-share value. Which segment is most 'dangerous' to valuation?", url: ""},
{t: "Task C — The quiz above", d: "Target ≥4/5 correct.", url: ""}
],
blind: {h: "Speed Drill — different numbers", body: `
<p><b>1.</b> Group EBIT Rp40T, 2 segments: A (60%, 6×), B (40%, 8×). SOTP EV = ?</p>
<details class="ans"><summary>Answer</summary><p>A: 40×60%×6 = 144. B: 40×40%×8 = 128. Total Rp272T.</p></details>
<p><b>2.</b> SOTP EV Rp272T, net debt Rp50T, 20 billion shares. Per-share value? Market price Rp9,000 → discount?</p>
<details class="ans"><summary>Answer</summary><p>Equity 222T ÷ 20 billion = Rp11,100. Discount = 1 − 9000/11100 = 18.9%.</p></details>`}
};
EN["real-03"] = {
title: "INDF: Noodle Empire, Leveraged",
sub: "Real Case 3 · ±6 hrs · Debt schedule + FORENSIC MISSION",
sections: [
{h: "Why Indofood?", body: `
<p><b>Indofood (INDF.JK)</b> — instant noodles gone global via the <b>Pinehill</b> acquisition, funded by <b>debt</b>. Result: revenue grew (Rp110.83T → Rp123.49T, 2022–2025) BUT total debt Rp74.96T and a trapping equity structure: NCI Rp47.09T of total equity Rp120.24T.</p>
<div class="callout"><b>Why is leverage + NCI an error minefield?</b> Because both are "invisible" on the surface: debt hides behind a schedule, NCI hides behind the total equity number. Junior analysts (and AI models) trip most often in these two places. That's why this case has a <b>forensic twist</b>: you don't build a model — you <b>audit</b> someone else's.</p></div>`},
{h: "Why must NCI be subtracted?", body: `
<div class="formula">Parent equity = Total equity − NCI</div>
<p><b>NCI (non-controlling interest)</b> = the part of subsidiaries' equity owned by others. Indofood doesn't own 100% of all its subsidiaries — Rp47.09T of Rp120.24T equity belongs to minorities. INDF share valuation may only use <b>Rp73.15T</b>.</p>
<div class="example jebakan"><div class="lbl">🚫 Error #1 — forgotten NCI</div>
<p>Junior model: Parent equity = Rp120.24T (the total!). Overstated by Rp47.09T ≈ <b>Rp5,364/share</b> — nearly the share price itself (Rp6,400). One forgotten line = destroyed valuation.</p></div>`},
{h: "Why must interest link to the debt schedule?", body: `
<div class="formula">Interest expense = BEGINNING debt × rate = 74.96 × 6% = Rp4.50T</div>
<p>Interest accrues on the <b>beginning</b> debt balance (the debt-schedule principle from Day 03/Foundation C): money is borrowed first, interest computed on it. The junior model typed <b>Rp3.00T</b> manually — a number with no traceable origin that won't move if debt assumptions change.</p>
<div class="callout"><b>Why is this a big deal?</b> Not the Rp1.5T gap — the <b>audit trail</b>. A typed number is a dead end: 6 months from now nobody knows where Rp3.00T came from. A linking formula = living documentation.</p></div>`},
{h: "Why are the ΔWC sign & double capex fatal?", body: `
<p><b>Error #3 — flipped ΔWC sign:</b> ΔWC +Rp2.1T means cash <b>trapped</b> in working capital → must be <b>subtracted</b> from FCFF. The junior model <b>added</b> it instead: FCFF Rp20.10T vs correct Rp15.90T (26% overstated).</p>
<p><b>Error #4 — double-counted capex:</b> Rp10T capex subtracted once in FCFF, then subtracted <b>again</b> in "final FCFF": Rp10.10T. Pure mechanical error — nothing to do with the business, but the valuation collapses.</p>
<div class="callout"><b>Why are these two errors one package?</b> Because both are about <b>sign and flow discipline</b>: cash in vs cash out, once vs twice. 80% of model bugs aren't valuation theory — they're careless arithmetic.</p></div>`},
{h: "Why is a fake 'OK' the most dangerous?", body: `
<p><b>Error #5:</b> the "A − (L+E) gap" cell typed <b>0</b> — looks "balanced ✅". But that's not a computed result, it's <b>typing that kills the alarm</b>. An unbalanced balance sheet signals a broken link; typing 0 = unplugging the fire alarm and sleeping soundly.</p>
<div class="callout"><b>Why is this the priciest skill?</b> A wrong model that looks right is more dangerous than an obviously broken one. Forensic auditors don't hunt "wrong numbers" — they hunt <b>numbers too tidy to be coincidence</b>.</p>
<div class="example"><div class="lbl">⚠️ Tolerance</div><p><b>Rounding tolerance is explicit:</b> this case's inputs are rounded (Rp120.24T, Rp47.09T, etc.) — so a <b>tiny (±0.01)</b> balance-check residual is <b>rounding noise, not an error</b>. The mission checker uses a ±0.5 tolerance for this cell. Distinguish: small residual from rounded inputs = fine; a LARGE gap or a typed "0" = a real alarm. A good analyst states their tolerance instead of pretending perfect precision.</div></div>`},
{h: "Practice task", body: `
<p>Download the mission file (the junior's broken model). Audit 5 points, fix them all with <b>formulas</b> (correct typed numbers still fail — the mission demands actual fixes), make sure the balance check is a real formula, then upload to the Forensic Mission below.</p>
<div class="callout"><b>Why does this task matter?</b> In real work, you more often <b>inherit</b> models than build from zero. Reading someone's model, finding bugs, and fixing them = senior analyst skill.</p></div>`},
{h: "🔥 Hell Mode briefing", body: `
<ul>
<li><b>NCI</b> = minorities' claim on subsidiaries' equity — not the parent's.</li>
<li><b>Debt schedule</b> = interest from the BEGINNING balance; rate × beginning debt.</li>
<li><b>Positive ΔWC</b> = cash trapped → SUBTRACT from FCFF.</li>
<li><b>Double-count</b> = an item subtracted/added twice.</li>
<li><b>Balance check</b> = must be a FORMULA (=A−(L+E)), not a typed "OK".</li>
</ul>`}
],
quiz: [
{q: `Parent equity = 120.24 − 47.09 = 73.15. Why subtract NCI?`, opts: ["Because NCI is really bank debt","NCI belongs to minorities — not the parent","Because NCI already includes the tax","Just to make the number smaller"], answer: 1, k: "nci",
 hints: ["NCI = non-controlling interest.","Who 'controls'? Not the parent."],
 explain: `NCI is minorities' claim on subsidiaries' equity. Parent-share valuation only uses parent-owned equity: Rp73.15T.`},
{q: `Interest expense = 74.96 × 6% (BEGINNING balance). Why beginning, not ending?`, opts: ["Because the value is bigger","Because of Indonesian tax rules","Interest accrues on beginning debt","Just to make the math easy"], answer: 2, k: "debt_schedule",
 hints: ["When does interest start accruing? When money is borrowed.","The debt-schedule principle from Foundation C."],
 explain: `Interest = rate × beginning balance — money is borrowed first, interest accrues on it. This also breaks the circular reference.`},
{q: `The junior model ADDED ΔWC +Rp2.1T to FCFF. The mistake?`, opts: ["Trapped cash → ΔWC must be subtracted","There is nothing wrong here","ΔWC is not in the FCFF formula","ΔWC should be doubled instead"], answer: 0, k: "fcf",
 hints: ["Rising WC = rising receivables/inventory.","Where did the cash go? Trapped."],
 explain: `Rising WC traps cash → FCFF = NOPAT + D&amp;A − capex − ΔWC. A flipped sign = 26% overstatement.`},
{q: `Rp10T capex subtracted twice. Effect on FCFF?`, opts: ["FCFF rises by Rp10T","There is no effect at all","FCFF surely turns negative","FCFF Rp10T lower than correct"], answer: 3, k: "forensic_audit",
 hints: ["Subtract once = right. Subtract twice?","15.90 − 10 = ?"],
 explain: `Double-count: final FCFF Rp10.10T vs correct Rp15.90T — a full Rp10T understated. Mechanical bug, not theory.`},
{q: `The balance-sheet gap cell typed 0 (fake 'OK'). Why is this the most dangerous error?`, opts: ["Because zero isn't a pretty number","Alarm killed: wrong but looking right","Because it should read 0.01","Harmless as long as it balances"], answer: 1, k: "forensic_audit",
 hints: ["A fire alarm with its wire cut.","A wrong model that looks right vs an obviously broken one — which is more dangerous?"],
 explain: `'Typed OK hides broken links. Auditors hunt numbers too tidy to be coincidence.`}
],
hell: [
{q: `Valuation overstatement from forgotten NCI, in Rp/share?`, opts: ["Roughly Rp1,000 per share","Roughly Rp47,090 per share","Rp5,364 (47.09T ÷ 8.78 billion)","Roughly Rp73,150 per share"], answer: 2,
 explain: `47.09T ÷ 8.78 billion = Rp5,364/share — nearly the Rp6,400 share price. One forgotten line = valuation off by a whole share price.`},
{q: `Typed Rp3.0T interest vs correct Rp4.5T. DIRECT effect on FCFF?`, opts: ["FCFF falls by Rp1.5T instead","Zero: FCFF is computed from NOPAT","FCFF rises by Rp1.5T instead","FCFF becomes exactly Rp3.0T"], answer: 1,
 explain: `Trick question! FCFF starts from NOPAT (before interest) → interest never enters FCFF. The interest error hits NI & profit-based metrics, not FCFF. Understand the flow, don't memorize formulas.`},
{q: `After fixing 5 errors, the gap = −0.01. Is the balance sheet balanced?`, opts: ["Yes — within rounding tolerance","No, must be exactly zero","No, must be positive","Yes if rounded to trillions"], answer: 0,
 explain: `−0.01T = −Rp10 billion against Rp218T total — rounding dust. An honest balance check uses tolerance, not absolute zero.`},
{q: `The correct model-audit order?`, opts: ["Assumptions → structure → logic","Check cell colors, fonts, then print","Jump straight to conclusions","Structure → logic → assumptions"], answer: 3,
 explain: `Structure first (are the mechanics alive?), then logic (signs/flows right?), last assumptions (numbers plausible?). Most people start with assumptions — and miss mechanical bugs.`},
{q: `Why is the forensic twist on INDF, not UNVR?`, opts: ["Because UNVR is too easy","Because Indofood is more famous","Debt+NCI: where errors hide","It was picked purely at random"], answer: 2,
 explain: `Forensics needs 'dark places': debt (hidden schedules) and NCI (aggregate numbers). UNVR is nearly debt-free — no place to hide interesting bugs.`}
],
tasks: [
{t: "Task A — Forensic audit (±4 hrs)", d: "Download the INDF mission file. Find 5 errors, fix with FORMULAS (not typing), make sure the balance-sheet gap is a real formula. Upload to the Forensic Mission.", url: "https://drive.google.com/drive/folders/15etlyOcKIB4Uz9b_I401Iz2ASubqGa2A"},
{t: "Task B — Write the audit report (±1 hr)", d: "Per error: 1 sentence WHAT is wrong + 1 sentence WHY it's dangerous + 1 sentence HOW to fix it. 5 errors = 15 sentences. That's the professional audit-report format.", url: ""},
{t: "Task C — The quiz above", d: "Target ≥4/5 correct.", url: ""}
],
blind: {h: "Speed Drill — different numbers", body: `
<p><b>1.</b> Total equity Rp200T, NCI Rp60T, 10 billion shares. Parent equity/share = ?</p>
<details class="ans"><summary>Answer</summary><p>(200−60)/10 billion = Rp14,000/share.</p></details>
<p><b>2.</b> NOPAT 30, D&amp;A 5, capex 12, ΔWC +4. FCFF = ?</p>
<details class="ans"><summary>Answer</summary><p>30+5−12−4 = 19. Positive ΔWC gets subtracted!</p></details>`}
};
EN["real-04"] = {
title: "TSLA: Growth at What Cost",
sub: "Real Case 4 · ±5 hrs · Reverse-DCF",
sections: [
{h: "Why Tesla?", body: `
<p><b>Tesla (TSLA)</b> — the only global case: revenue ±$95B (FY2025: $94.83B), net income collapsed <b>$15.0B (2023) → $3.79B (2025)</b>, yet the share price is $399.81 (market cap ±$1.50 TRILLION). The question isn't "what's the fair value?" — it's <b>"what insane growth is already priced in?"</b></p>
<div class="callout"><b>📋 Data sources (verified 31 Oct 2026):</b> FY2025 revenue $94.83B & net income from <b>Tesla's 10-K filed 29 Jan 2026</b>; shares <b>3.752 billion = outstanding per 10-K cover as of 23 Jan 2026</b>; price $399.81 (yfinance, Oct 2026). The 12% margin, 9% WACC etc. are <b>illustrative assumptions</b> — what's graded is your reverse-DCF mechanics.</div>
<div class="callout"><b>Why reverse-DCF?</b> Regular DCF: assumptions → value. <b>Reverse-DCF</b>: market price → the assumptions that <i>must</i> hold for that price to make sense. It doesn't say "expensive/cheap" — it says <b>"the market is betting on X; do you believe X?"</b> An analyst's weapon for growth stocks that can't be valued the normal way.</p></div>`},
{h: "Why is the question 'what g'?", body: `
<div class="formula">Find g such that DCF(g) = market price</div>
<p>Model: revenue grows g per year for 10 years, normalized EBIT margin 12%, tax 21%, reinvestment 30%, WACC 9%, terminal g 3%. Trial results: g=8% → <b>$42</b>; g=12% → <b>$57</b>; g=16% → <b>$78</b>. Market price: <b>$399.81</b>.</p>
<div class="example jebakan"><div class="lbl">🚫 Even 16% isn't close</div>
<p>16% CAGR for 10 years = revenue up <b>4.4×</b> — already a heroic scenario. Value $78, still <b>80% below</b> market price. So the market is paying for something FAR crazier than 16%/year.</p></div>`},
{h: "Why is the answer 38.7%?", body: `
<p>Goal seek: change the <b>"g (input — coba-coba / goal seek)"</b> cell until <b>"Nilai/saham (g=input)" = $399.81</b> (Data → Goal Seek, or manual trial-and-error). Answer: <b>g ≈ 38.7% per year for 10 years</b>. That means 2035 revenue = 94.83 × (1.387)^10 ≈ <b>$2.5 trillion</b> — 26×, bigger than most countries' GDP.</p>
<div class="callout"><b>Why is this NOT a "Tesla is overpriced" verdict?</b> Because this model only values the <b>core business</b> (selling cars + energy). The market may be paying for <b>options</b>: robotaxi, Optimus, AI. Reverse-DCF separates the two cleanly: <i>the core business needs a 38.7% miracle — the rest is option value</i>. Your job: judge whether that option is worth $1.2T.</p></div>`},
{h: "Why a 'normalized' 12% margin?", body: `
<p>Tesla's EBIT margin collapsed (EV price war). Using the depressed 2025 margin for 10 years = assuming the price war <b>forever</b>. 12% is an illustrative "back to sanity" assumption — <b>explicit and debatable</b>, not hidden.</p>
<div class="callout"><b>Why is this an important lesson?</b> Every growth DCF contains two bets: <b>growth</b> AND <b>profitability</b>. Amateur analysts only play with g; professionals test both. Try in your file: margin 15% → what does implied g fall to?</p></div>`},
{h: "Practice task", body: `
<p>Build Tesla's reverse-DCF: project 10-year revenue &amp; FCFF for g = 8%, 12%, 16% → per-share value per scenario. Then in the <b>REVERSE-DCF</b> block: <b>goal seek</b> — change the "g (input — coba-coba / goal seek)" cell until "Nilai/saham (g=input)" = $399.81 (Excel/Sheets: Data → Goal Seek, or manual trial-and-error while watching the value move). Type your implied-g answer — the checker scores the number.</p>
<div class="callout"><b>Why does this task matter?</b> This is "outside-in" thinking: start from price, work back to expectations. For every growth stock you meet in your life, your first question should be: <i>"what's already priced in?"</i></p></div>`},
{h: "🔥 Hell Mode briefing", body: `
<ul>
<li><b>Reverse-DCF</b> = from market price, back out the assumptions that must hold.</li>
<li><b>Implied g</b> = the CAGR that makes DCF = market price.</li>
<li><b>Goal seek</b> = find the input that hits a target output.</li>
<li><b>"Priced in"</b> = expectations already reflected in the price.</li>
<li><b>Option</b> = value from future possibilities (robotaxi/AI) — outside the core DCF.</li>
</ul>`}
],
quiz: [
{q: `What question does reverse-DCF answer?`, opts: ["What is the fair share value?","What expectations are priced in?","When is the time to buy?","What is the truest WACC?"], answer: 1, k: "reverse_dcf",
 hints: ["Reverse = flipped.","Regular DCF: assumptions → value. Flipped: ? → assumptions."],
 explain: `Reverse-DCF: from market price, back out the assumption (g) that must hold for that price to make sense.`},
{q: `g=16% (heroic, revenue 4.4×) → value $78 vs price $400. That means?`, opts: ["Market expectations far exceed 16%","The model must be totally broken","Tesla will surely fall to $78","The WACC must be miscalculated"], answer: 0, k: "reverse_dcf",
 hints: ["$78 vs $400 — the gap is huge.","The model only values the core business."],
 explain: `The $78→$400 gap = extreme expectations OR option value (robotaxi/AI) absent from the core DCF.`},
{q: `Implied g ≈ 38.7%/year for 10 years. The honest conclusion?`, opts: ["Tesla is overpriced; sell now","38.7% is impossible; the model is wrong","Extreme expectations; options valued separately","Just buy because growth is high"], answer: 2, k: "reverse_dcf",
 hints: ["38.7% CAGR for 10 years = 26× revenue.","Core business vs options — separate them."],
 explain: `38.7% for the core business makes no sense → the market is paying for options (robotaxi/AI). The analyst's job: judge whether that option is worth $1.2T.`},
{q: `Why is the 12% margin called 'normalized'?`, opts: ["Because 12% is the global average","Because it's simply 21% minus 9%","Margins simply don't matter in a DCF","The 2025 margin collapsed; 12% is illustrative"], answer: 3, k: "dcf",
 hints: ["Net income 15.0B → 3.8B. What happened?","Projecting a depressed margin forever = assuming an eternal price war."],
 explain: `Using the collapsed margin for 10 years = assuming the price war forever. 12% is explicit &amp; debatable.`},
{q: `The role of goal seek in this drill?`, opts: ["Finding the optimal WACC value","Finding the g that makes DCF = market price","Computing the average revenue figure","Tidying up the table's cell formats"], answer: 1, k: "reverse_dcf",
 hints: ["Seek = search. Goal = target.","The target is the market price."],
 explain: `Goal seek: change g until per-share value = $399.81. That's the implied g.`}
],
hell: [
{q: `WACC 9% → 7%. Implied g will…`, opts: ["Implied g will rise","Implied g stays the same","Fall; a smaller g is needed","Implied g turns negative"], answer: 2,
 explain: `Lower discount → higher PV for every g → the g needed to reach $400 shrinks. Two-way sensitivity.`},
{q: `Bulls say 'robotaxi isn't counted!'. The analyst's correct reply?`, opts: ["Right; options are valued separately","Correct; this model is totally wrong","Robotaxi has no value at all","Raise g until it covers robotaxi"], answer: 0,
 explain: `Don't mix: the core DCF values the existing business; options (robotaxi/AI) are valued separately (optionality). Mixing the two blurs both.`},
{q: `Why a 10-year projection, not 5?`, opts: ["To make the numbers look big","Because that's the DCF standard rule","Because 10 is a round number","Long horizon; the risk grows along"], answer: 3,
 explain: `A growth story needs a long horizon for compounding to work — at a price: 10 years = 10 years of guessing. Terminal value grows dominant.`},
{q: `Margin 12% → 15%. Effect on implied g?`, opts: ["Implied g will rise","Implied g will fall","Implied g stays put","The model errors out"], answer: 1,
 explain: `The two levers of growth DCF: growth AND profitability. Higher margin → higher value per g → implied g falls. Test both, not just g.`},
{q: `Reverse-DCF is NOT suitable for?`, opts: ["Growth stocks with positive cash","Multi-segment conglomerates","Pre-revenue with no projectable cash","Commercial bank valuations"], answer: 2,
 explain: `Reverse-DCF needs a living DCF framework — cash flows that can be projected. Pre-revenue = nothing to reverse; use other methods (venture-style).`}
],
tasks: [
{t: "Task A — Tesla reverse-DCF (±3 hrs)", d: "Download the RC4 workbook. Project 10 years for g = 8%, 12%, 16% → per-share value per scenario. All formulas link to inputs.", url: "https://drive.google.com/drive/folders/15etlyOcKIB4Uz9b_I401Iz2ASubqGa2A"},
{t: "Task B — Goal-seek implied g (±1 hr)", d: "In the workbook's REVERSE-DCF block: change the 'g (input — coba-coba / goal seek)' cell until 'Nilai/saham (g=input)' = $399.81 (Goal Seek or trial-and-error). Compare with 38.7% — then test: margin 15% → what does implied g become?", url: ""},
{t: "Task C — The quiz above", d: "Target ≥4/5 correct.", url: ""}
],
blind: {h: "Speed Drill — different numbers", body: `
<p><b>1.</b> A DCF says $50 at g=10%; market price $120. What's the reverse-DCF question?</p>
<details class="ans"><summary>Answer</summary><p>"What g makes DCF = $120?" — then judge whether that g is plausible.</p></details>
<p><b>2.</b> A stock's implied g = 8%/year. Growth or value stock?</p>
<details class="ans"><summary>Answer</summary><p>Leans value/fair — 8% CAGR for 10 years = moderate expectations, not a miracle.</p></details>`}
};
EN["real-05"] = {
title: "TLKM: Capex Harvest",
sub: "Real Case 5 · ±5 hrs · The capex → FCF bridge",
sections: [
{h: "Why Telkom?", body: `
<p><b>Telkom Indonesia (TLKM.JK)</b> — defensive infrastructure: revenue flat ±Rp147–150T (2022–2025), but there's a story underneath: <b>capex fell Rp38.3T → Rp25.8T</b> while OCF held steady ±Rp64T. Result: <b>FCF expanded Rp35.05T → Rp38.04T</b>. That's "capex harvest": reaping past investment.</p>
<div class="callout"><b>Why is this pattern mandatory knowledge?</b> Every infrastructure business (telecom, toll roads, power) lives in a <b>capex cycle</b>: build (FCF squeezed) → harvest (FCF expands) → build again (5G, data centers). Analysts who only watch net income never see the cycle.</p></div>`},
{h: "Why FCF, not net income?", body: `
<div class="formula">FCF = OCF − Capex</div>
<p>TLKM 2025 net income Rp17.49T — but <b>FCF Rp38.04T</b>, more than 2×! The gap = giant D&amp;A (network assets depreciated, but no cash leaves) minus capex. For infrastructure companies, <b>FCF is the truth number</b>; net income is the accounting number.</p>
<div class="callout"><b>📋 Data status:</b> net income Rp17.49T &amp; 98.58 billion shares = <b>illustrative teaching inputs</b>. Verified (31 Oct 2026): FY2025 attributable profit <b>Rp17.81T</b> (Telkom Annual Report); shares outstanding <b>±99.05 billion</b> as of 31 Dec 2025 (ex-treasury). Difference &lt;2% — doesn't change the capex→FCF bridge lesson.</div>
<div class="example korporat"><div class="lbl">🏢 The 2022 → 2025 bridge</div>
<p>OCF 2022 Rp73.35T > OCF 2025 Rp63.84T — operations "weakened". But capex 2022 Rp38.3T vs 2025 Rp25.8T → <b>FCF actually rose</b> Rp35.05T → Rp38.04T. The "declining performance" narrative from OCF is rebutted by FCF.</p></div>`},
{h: "Why two capex scenarios?", body: `
<p><b>Harvest</b> (capex stays lean at Rp25.8T): 2026 FCF Rp39.32T → DCF Rp4,015/share. <b>5G Wave</b> (capex back up to Rp34T): 2026 FCF Rp31.12T → DCF Rp3,092/share. One capex assumption = a <b>Rp923/share</b> valuation gap.</p>
<div class="callout"><b>Precision: what does "grows 2%" apply to?</b> In this model, g = +2%/year is applied <b>twice</b>: growing OCF 2025→2026, then growing <b>FCF 2027–2030 from the 2026 base</b> (capex constant per scenario). So the accurate label = <b>"FCF grows 2%"</b> — not "OCF grows 2% + constant capex" (that would give a slightly different FCF path). The difference is small here, but a precise analyst doesn't conflate the two.</div>
<div class="callout"><b>Why is this the case's core?</b> Because for infrastructure businesses, <b>capex is the most important valuation variable</b> — more important than revenue growth. A Telkom analyst with no view on the capex cycle (when the 5G/data-center wave hits) has no view at all.</p></div>`},
{h: "Why does DCF say Rp4,015 but the market Rp1,980?", body: `
<p>This is the <b>biggest gap</b> across all 5 cases: mechanical DCF (WACC 11%, g 2%) says Rp4,015 — the market says Rp1,980. 2025 FCF yield = <b>19.5%</b>: every Rp100 of price backed by Rp19.5 of annual FCF. On paper: absurdly cheap.</p>
<div class="callout"><b>Why doesn't the market believe it?</b> Candidates: SOE risk (intervention, forced dividends), tariff regulation, mobile competition, doubt that 5G capex will eat FCF again. <b>This course's priciest lesson:</b> valuation = numbers + risk judgment that <b>isn't in the spreadsheet</b>. A DCF ignoring this gap isn't analysis — it's a calculator.</p></div>`},
{h: "Practice task", body: `
<p>Build Telkom's capex → FCF bridge 2022–2025, then the 2-scenario DCF (Harvest vs 5G Wave): 2026–2030 FCF, PV, EV → equity → per-share value → FCF yield. Finally: write 3 sentences explaining the Rp4,015 vs Rp1,980 gap in your own words.</p>
<div class="callout"><b>Why does this task matter?</b> This is the closing case — synthesis of everything: read real data, build the mechanics, face the market gap honestly. Great analysts don't sell numbers; they sell <b>explanations</b>.</p></div>`},
{h: "🔥 Hell Mode briefing", body: `
<ul>
<li><b>Capex harvest</b> = the harvest phase after the investment cycle eases.</li>
<li><b>FCF = OCF − capex</b> — infrastructure's truth number.</li>
<li><b>FCF yield</b> = FCF ÷ market cap.</li>
<li><b>Capex cycle</b> = build → harvest → build again.</li>
<li><b>Model vs market gap</b> = a question, not a verdict.</li>
</ul>`}
],
quiz: [
{q: `2025 FCF = 63.84 − 25.80 = ?`, opts: ["Rp38.04T","Rp89.64T","Rp17.49T","Rp25.80T"], answer: 0, k: "fcf",
 hints: ["FCF = OCF − capex.","63.84 − 25.80 = ?"],
 explain: `Rp38.04T. Compare with net income Rp17.49T — FCF > 2× net income.`},
{q: `Capex falls 38.3→25.8 (revenue flat). Effect on FCF?`, opts: ["FCF falls along with OCF","There is no effect whatsoever","FCF expands — the capex harvest phase","FCF turns fully negative"], answer: 2, k: "capex_cycle",
 hints: ["FCF = OCF − capex.","Capex down, OCF stable → ?"],
 explain: `Capex harvest: past investment reaped — FCF rises Rp35.05T → Rp38.04T even as OCF weakens.`},
{q: `5G Wave scenario: capex back to Rp34T. 2026 FCF = ?`, opts: ["Rp39.32T","Rp31.12T","Rp65.12T","Rp38.04T"], answer: 1, k: "capex_cycle",
 hints: ["2026 OCF = 63.84 × 1.02.","65.12 − 34 = ?"],
 explain: `Rp31.12T. One capex assumption = a Rp923/share valuation gap vs the Harvest scenario.`},
{q: `A 19.5% FCF yield means?`, opts: ["Cash dividends equal to 19.5%","Capex at 19.5% of revenue","A debt ratio of 19.5% of equity","Rp100 of price backed by Rp19.5 FCF"], answer: 3, k: "fcf",
 hints: ["Yield = FCF ÷ market cap.","Like dividend yield, but for FCF."],
 explain: `FCF yield = 38.04 ÷ (1,980 × 98.58 billion) = 19.5%. On paper: very cheap.`},
{q: `Harvest DCF Rp4,015 vs market Rp1,980. The analyst's correct stance?`, opts: ["Recommend BUY; DCF is never wrong","Explain the gap: valuation = numbers + risk","Ignore the market; the market is always wrong","Raise WACC until it matches the market"], answer: 1, k: "dcf",
 hints: ["The biggest gap in the 5 cases.","What risks aren't in the spreadsheet?"],
 explain: `The gap is a question: SOE risk, regulation, competition, doubt 5G capex will eat FCF again. Analysts sell explanations, not numbers.`}
],
hell: [
{q: `Why is 2022 FCF (Rp35.05T) < 2025 FCF (Rp38.04T) even though 2022 OCF was higher?`, opts: ["Because revenue fell","2022 capex far above 2025","Because the tax rate rose","The reported data is wrong"], answer: 1,
 explain: `2022 OCF Rp73.35T − capex Rp38.3T = Rp35.05T. OCF fell but capex fell more → FCF rose. Always read OCF AND capex.`},
{q: `FCF g 2% and terminal g 2% — consistent?`, opts: ["Yes; steady state toward the permanent rate","No; the two must be different","No; the terminal rate must be 0%","Yes, as long as WACC is also 2%"], answer: 0,
 explain: `Consistent: the explicit forecast glides into the permanent rate. What's inconsistent: 15% forecast g then 2% terminal with no transition phase.`},
{q: `Rp41.04T net debt subtracted from EV. Why?`, opts: ["Debt must be paid first","To make the result smaller","EV is for all providers; leave equity","Because OJK rules require it"], answer: 2,
 explain: `EV = value for equity + creditors. Subtract net debt (debt − cash) → what's left for shareholders. Same as the Astra SOTP.`},
{q: `Harvest capex actually rises to Rp30T (not 25.8T). Per-share value will…`, opts: ["The share value will rise","The share value stays put","Rise; investment is good","Fall because FCF is smaller"], answer: 3,
 explain: `Capex +Rp4.2T/year → FCF −Rp4.2T/year → PV & EV fall. 'Good investment' only if return > WACC — not automatic.`},
{q: `Dividends vs FCF — which is more fundamental for valuation?`, opts: ["FCF: dividends are policy, FCF is capacity","Dividends — cash actually received","Both serve the same function","Dividends for SOEs; FCF for private firms"], answer: 0,
 explain: `Dividends = policy (can be forced/withheld). FCF = actual cash capacity. Valuation uses capacity; dividends are just one use of it.`}
],
tasks: [
{t: "Task A — Capex harvest (±3 hrs)", d: "Download the RC5 workbook. Build the OCF−capex=FCF bridge 2022–2025, then the Harvest vs 5G Wave DCF → per-share value → FCF yield. All formulas link.", url: "https://drive.google.com/drive/folders/15etlyOcKIB4Uz9b_I401Iz2ASubqGa2A"},
{t: "Task B — Explain the gap (±1 hr)", d: "Write 3 sentences in your own words: why will the market only pay Rp1,980 for a Rp4,015 DCF? Research 1 recent Telkom news item to support your explanation.", url: ""},
{t: "Task C — The quiz above", d: "Target ≥4/5 correct.", url: ""}
],
blind: {h: "Speed Drill — different numbers", body: `
<p><b>1.</b> OCF 50, capex 30. FCF = ? Capex falls to 20, OCF flat. New FCF?</p>
<details class="ans"><summary>Answer</summary><p>20 → 30. Capex harvest: −10 capex = +10 FCF.</p></details>
<p><b>2.</b> FCF Rp10T, market cap Rp40T. FCF yield = ?</p>
<details class="ans"><summary>Answer</summary><p>25%. Very high — ask why the market doubts it.</p></details>`}
};
EN["real-06"] = {
title: "BBCA: An Expensive Price That Makes Sense?",
sub: "Real Case 6 · ±5 hrs · Bank residual income",
sections: [
{h: "Why can't banks be valued with a regular DCF?", body: `
<p><b>Bank Central Asia (BBCA.JK)</b> is Indonesia's most expensive bank: <b>P/BV ~3.9x</b> (MNC Sekuritas, Oct 2025). A regular DCF discounts <b>FCFF</b> — cash to all investors <i>after</i> paying debt. The problem: a bank's debt — third-party funds of <b>Rp1,134tn</b> (BRIDS, FY24) — is not financing burden, it's <b>raw material</b>. A bank "borrows" current/savings accounts to "lend" <b>Rp911.1tn</b> of loans (BCA audited financials, 31 Dec 2024). Computing BBCA's "net debt" and subtracting it from EV produces nonsense.</p>
<div class="formula">V0 = B0 + &Sigma; RI<sub>t</sub> / (1+Ke)<sup>t</sup> &nbsp;&nbsp;&middot;&nbsp;&nbsp; RI<sub>t</sub> = NI<sub>t</sub> &minus; Ke &times; B<sub>t&minus;1</sub></div>
<p>For banks, what gets discounted is not FCFF but <b>dividends</b> (DDM) or <b>earnings in excess of the cost of capital</b> — residual income. Both anchor on <b>equity (book)</b>, not enterprise value.</p>
<div class="example jebakan"><div class="lbl">🚫 The bank EV/EBITDA trap</div>
<p>A junior analyst drops BBCA into an EV/EBITDA screener with UNVR and ASII. Result: BBCA looks "cheap" or "error" — because bank EV is meaningless. The right multiples for banks are <b>P/BV</b> and <b>P/E</b>, and both must be read together with <b>ROE</b>.</p></div>
<div class="callout"><b>Why residual income, not just raw P/BV?</b> Because 3.9x P/BV without context = "expensive". Residual income splits it into: how much today's book value explains, and how much demands ROE above the cost of capital <i>forever</i>. That's where the real valuation debate happens.</p></div>`},
{h: "Why does residual income fit BBCA?", body: `
<p>Residual income rests on the <b>clean-surplus identity</b>: next year's equity = this year's equity + earnings &minus; dividends. Fair value = <b>today's book value</b> + the PV of earnings "excess" (ROE &minus; Ke) in the future.</p>
<div class="formula">RI<sub>t</sub> = (ROE &minus; Ke) &times; B<sub>t&minus;1</sub></div>
<p>The anchor numbers (FY24, verified): net income <b>Rp54.8tn</b> (+12.7% YoY; FY23 Rp48.6tn — Maybank Sekuritas 26 Jan 2025 &amp; BRIDS 24 Jan 2025). Book value per share <b>Rp2,131</b> on <b>123.28 billion</b> shares (MNC, Oct 2025) &rarr; the model's starting equity <b>B0 = Rp262.71tn</b>.</p>
<div class="example korporat"><div class="lbl">🏢 First consistency check</div>
<p>Implied FY24 ROE = 54.8 / 262.71 = <b>20.86%</b> — consistent with the claimed "ROE &gt;20%" (Maybank, Jan 2025). If your computed number lands far from the broker's claim, stop modelling: something is wrong with your input or your understanding. Good analysts verify <i>before</i> they project.</p></div>
<div class="callout"><b>⚠️ Equity caveat:</b> Rp262.71tn is a <b>derivation</b> (Rp2,131 &times; 123.28 billion shares, from MNC) — <b>not a direct audited financial-statement figure</b>. For full precision, take total equity from BCA's financial statements at bca.co.id. This model uses the derivation so it can run; label it as what it is.</p></div>
<p>With working assumptions of 20% ROE, 60% payout, 11.5% Ke: <b>2025 RI = 52.54 &minus; 30.21 = Rp22.33tn</b> — Rp52.54tn of earnings minus Rp30.21tn of capital "rent". Only that excess creates value above book.</p>`},
{h: "Why does justified P/BV = (ROE&minus;g)/(Ke&minus;g)?", body: `
<p>If ROE, payout, and Ke stay constant forever, the residual-income series collapses into one elegant formula — <b>justified P/BV</b>:</p>
<div class="formula">P/BV = 1 + (ROE &minus; Ke)/(Ke &minus; g) = (ROE &minus; g)/(Ke &minus; g)</div>
<p>Three levers, no more: <b>ROE</b> (how profitable), <b>g</b> (how long it grows), <b>Ke</b> (how risky). Growth comes from within: <b>g = ROE &times; retention = 20% &times; 40% = 8%</b> (60% payout = assumption, consistent with BBCA history).</p>
<div class="example korporat"><div class="lbl">🏢 The math</div>
<p>(0.20 &minus; 0.08) / (0.115 &minus; 0.08) = <b>3.43x</b>. DDM cross-check: 2025 dividend = 52.54 &times; 60% = Rp31.53tn; value = 31.53 / (0.115 &minus; 0.08) = <b>Rp900.72tn</b> &mdash; exactly = B0 &times; 3.43. Two methods, one framework: <b>the clean-surplus identity holds</b>. If your DDM and RI disagree wildly, a formula is wrong &mdash; it's not "two opinions".</p></div>
<div class="callout"><b>Why 11.5% Ke?</b> A working assumption (research range 11&ndash;12%). Ke is not a sky-number: it's the price investors demand for Indonesian bank equity risk. In the sensitivity task you'll feel how brutal a 1% Ke change is on justified P/BV.</p></div>`},
{h: "Why does the market dare pay 3.9x? (franchise vs fade debate)", body: `
<p>Now clash three numbers: the <b>2-stage</b> model (ROE fading to 16% after 2029) gives <b>1.98x &rarr; Rp4,215/share</b>. The <b>1-stage</b> formula (20% ROE forever) gives <b>3.43x</b>. The market (MNC, Oct 2025) pays <b>3.9x &rarr; Rp8,311/share</b>. All three are "right" under their own assumptions.</p>
<div class="example korporat"><div class="lbl">🏢 Reading the market's mind</div>
<p>3.9x at 11.5% Ke and 60% payout implies <b>~20.8% ROE forever</b> (it's in Hell Mode &mdash; compute it yourself). The market isn't "miscalculating": it's betting that the <b>82.4% CASA</b> franchise (Maybank, Jan 2025) &mdash; Indonesia's cheapest current/savings funding &mdash; keeps 20%+ ROE from <b>fading</b>. The question isn't "what's fair value" but: <b>is this premium worth paying for that franchise &mdash; and when does it stop being worth it?</b></p></div>
<div class="callout"><b>Data testing the market's bet:</b> FY25 guidance (via BRIDS, Jan 2025) &mdash; loan growth <b>6&ndash;8%</b> (FY24: +14%), <b>NIM 5.7&ndash;5.8%</b> (FY24: 5.8%), CoC <b>0.3%</b> stable, CIR <b>33&ndash;34%</b> (FY24: 31.5%). Plus the 9M25 signal: NIM 5.8% flat YoY but <b>down 10bps QoQ</b> (MNC, Oct 2025). Loans growing fast but margins squeezed and costs rising &mdash; <b>does volume compensate for margin compression?</b> That's the core of the BBCA analyst debate.</p></div>`},
{h: "Trap: two NIMs that are both &ldquo;correct&rdquo;", body: `
<p>Research found <b>FY24 NIM 5.8%</b> (Maybank, consolidated; 5.9% in 4Q24) and <b>FY24 NIM 6.4%</b> (BRIDS; FY23: 6.3%). Both from reputable brokers. Both "correct" &mdash; because <b>their denominator definitions differ</b> (each broker's version of average earning assets).</p>
<div class="example jebakan"><div class="lbl">🚫 The definition trap</div>
<p>Test with FY24 NII of Rp82.3tn (BRIDS): implied earning assets at 5.8% = 82.3/0.058 = <b>Rp1,419tn</b>; at 6.4% = 82.3/0.064 = <b>Rp1,286tn</b>. The gap is <b>Rp133tn</b> &mdash; bigger than many mid-size banks' entire loan books! An analyst comparing BRIDS's 6.4% NIM against 5.7&ndash;5.8% guidance and screaming "NIM collapsing 60bps!" is comparing <b>apples to oranges</b>. Compare like with like: 5.8% &rarr; 5.7&ndash;5.8% guidance = stable, not collapsing.</p></div>
<div class="callout"><b>An honest sensitivity:</b> from the model's 20% ROE, if NIM falls a permanent <b>30bps</b> (&rarr; ~5.5%): &Delta;NII = &minus;Rp4.26tn &rarr; &Delta;after-tax earnings (22%) = &minus;Rp3.32tn &rarr; <b>stressed ROE 18.74%</b> &rarr; justified P/BV <b>2.81x</b> (from 3.43x). The market's 3.9x premium <b>cannot survive</b> permanent NIM compression &mdash; unless you believe 82.4% CASA keeps it from happening.</p></div>`},
{h: "Practice task", body: `
<p>Build the BBCA residual-income model in the practice workbook: (A) reconcile the two NIM definitions and pick the one consistent with the guidance scale; (B) project NI, equity, and RI for 2025&ndash;2029, then PV of RI, terminal value, equity value &rarr; per-share value &rarr; 2-stage P/BV; (C) compute 1-stage justified P/BV + the DDM cross-check (must &asymp; B0 &times; 3.43); (D) run the &minus;30bps NIM sensitivity. Every answer cell must be formulas linking to assumptions.</p>
<div class="callout"><b>Why does this task matter?</b> This is your first bank valuation &mdash; and its biggest lesson isn't the formula, it's <b>definition discipline</b>. One wrongly-scaled NIM number can shift your conclusion by Rp133tn of implied assets.</p></div>`},
{h: "🔥 Hell Mode briefing", body: `
<ul>
<li><b>Residual income</b> = NI &minus; Ke &times; book: earnings above the capital "rent".</li>
<li><b>Clean surplus</b> = B<sub>t</sub> = B<sub>t&minus;1</sub> + NI &minus; Div. DDM and RI must agree.</li>
<li><b>Justified P/BV</b> = (ROE&minus;g)/(Ke&minus;g). Three levers: ROE, g, Ke.</li>
<li><b>Bank g</b> = ROE &times; (1 &minus; payout). Big dividends = slow growth.</li>
<li><b>The NIM trap</b> = broker definitions differ; align scales before comparing.</li>
<li><b>The 3.9x premium</b> = the market betting 20%+ ROE never fades. That's a bet, not a fact.</li>
</ul>`}
],
quiz: [
{q: `Why isn't a standard DCF/FCFF used to value BBCA?`, opts: ["Because BBCA has no debt at all","Because bank debt (deposits) is raw material, not financing — FCFF is meaningless","Because regulators forbid banks from using DCF","Because bank FCFF is always negative"], answer: 1, k: "bank_valuation",
 hints: ["Think about where a bank gets its 'merchandise'.", "Rp1,134tn of deposits: burden or raw material for a bank?"],
 explain: `Deposits (Rp1,134tn, BRIDS FY24) are raw material "borrowed" to be lent out as loans (Rp911.1tn audited). Post-debt FCFF is meaningless for a bank — what gets discounted is dividends / earnings above the cost of capital.`},
{q: `B0 Rp262.71tn, ROE 20%, Ke 11.5%. 2025 residual income = ?`, opts: ["Rp52.54tn","Rp30.21tn","Rp22.33tn","Rp52.43tn"], answer: 2, k: "residual_income",
 hints: ["RI = NI − Ke × B. Compute NI first.", "NI = 0.20 × 262.71 = 52.54. Capital charge = 0.115 × 262.71 = ?"],
 explain: `NI = 0.20 × 262.71 = Rp52.54tn; capital charge = 0.115 × 262.71 = Rp30.21tn; RI = 52.54 − 30.21 = Rp22.33tn. Rp52.54tn forgets the capital rent; Rp30.21tn IS the rent, not the excess.`},
{q: `ROE 20%, 60% payout (g = 8%), Ke 11.5%. 1-stage justified P/BV = ?`, opts: ["1.74x","3.43x","5.71x","1.98x"], answer: 1, k: "justified_pbv",
 hints: ["Formula: (ROE − g)/(Ke − g).", "Numerator 0.20−0.08 = 0.12; denominator 0.115−0.08 = 0.035."],
 explain: `(0.20−0.08)/(0.115−0.08) = 0.12/0.035 = 3.43x. 1.74x = ROE/Ke (forgot growth); 5.71x = forgot to subtract g in the numerator; 1.98x = the faded 2-stage model result — not the 1-stage formula.`},
{q: `An analyst compares BRIDS's 6.4% FY24 NIM with 5.7–5.8% guidance and concludes "NIM is collapsing". The main error?`, opts: ["The 6.4% figure must be a typo","Comparing two different definitions/scales — the like-for-like (5.8%) shows NIM is stable","Guidance must never be used in projections","NIM doesn't affect bank valuation"], answer: 1, k: "nim_trap",
 hints: ["6.4% and 5.8% use different denominators.", "The 5.7–5.8% guidance is on the same scale as 5.8%, not 6.4%."],
 explain: `Broker definitions differ (implied earning assets differ by Rp133tn). The correct comparison: 5.8% → 5.7–5.8% guidance = stable. Comparing 6.4% with 5.7–5.8% = apples vs oranges.`},
{q: `Market P/BV 3.9x vs 1-stage justified 3.43x. The honest interpretation?`, opts: ["The market must be miscalculating — arbitrage","The 3.43x model must be right — sell","The market assumes some combination of higher ROE / lower Ke / higher g, forever","P/BV above 3x is always a bubble"], answer: 2, k: "market_premium",
 hints: ["The formula has three levers: ROE, g, Ke.", "3.9x implies ~20.8% ROE forever — that's a bet, not a fact."],
 explain: `The 3.9x vs 3.43x gap = different assumptions, not arithmetic errors. The market bets the 82.4% CASA franchise keeps 20%+ ROE from fading. The analyst's job: judge whether that bet is reasonable — not declare the market stupid.`},
{q: `From the model's 20% ROE: NIM falls a permanent 30bps → justified P/BV becomes?`, opts: ["Stays 3.43x","3.90x","2.81x","1.98x"], answer: 2, k: "sensitivity",
 hints: ["ΔNII = −0.003 × Rp1,419tn = −Rp4.26tn.", "Δafter-tax earnings at 22% = −Rp3.32tn → ROE 18.74% → recompute (ROE−g)/(Ke−g)."],
 explain: `Stressed ROE = 20% − 3.32/262.71 = 18.74%; g = 7.49%; (0.1874−0.0749)/(0.115−0.0749) = 2.81x. The 3.9x premium can't survive permanent NIM compression. 1.98x = the faded 2-stage model — a different context.`},
{q: `1-stage DDM = Rp900.72tn ≈ B0 × 3.43. This proves?`, opts: ["DDM is always more accurate than RI","The clean-surplus identity: two methods, one framework — a big gap means a broken formula","BBCA should only be valued with DDM","3.43x P/BV is the market price"], answer: 1, k: "ddm",
 hints: ["DDM and RI are derived from the same identity.", "Agreement = cross-validation, not coincidence."],
 explain: `DDM and residual income are two faces of clean surplus (B_t = B_{t−1} + NI − Div). The 900.72tn ≈ 262.71 × 3.43 match validates the model's mechanics — a big gap = a formula bug.`}
],
hell: [
{q: `Market P/BV 3.9x, Ke 11.5%, 60% payout (40% retention). The market-implied perpetual ROE = ?`, opts: ["20.0%","22.5%","20.8%","18.7%"], answer: 2,
 explain: `3.9 = (R − 0.4R)/(0.115 − 0.4R) → 0.6R = 3.9×(0.115 − 0.4R) → 2.16R = 0.4485 → R = 20.76% ≈ 20.8%. The market bets on nearly 21% ROE forever — far above a normal bank. Believe it or not, that's the analyst's call.`},
{q: `The 2-stage model uses 16% terminal ROE, below today's 20%. The conceptual reason?`, opts: ["To force the model below the market price","Mean reversion: competition erodes excess ROE; 16% is still a premium","Because 16% is a round number","Terminal ROE must equal terminal g"], answer: 1,
 explain: `Excess ROE is economic rent — competition (digital banks, fintech) erodes it over time. 16% is still far above the 11.5% cost of equity: the model doesn't say BBCA becomes mediocre, just not extraordinarily so forever.`},
{q: `Ke rises 11.5% → 13% (e.g. higher Indonesia risk premium). 1-stage justified P/BV becomes?`, opts: ["3.43x","2.81x","2.40x","1.98x"], answer: 2,
 explain: `(0.20−0.08)/(0.13−0.08) = 0.12/0.05 = 2.40x. One and a half percent on Ke wipes ~30% off the justified multiple — that's why the Ke assumption must be stress-tested, never taken raw.`},
{q: `BBCA provisions rose 49% YoY in FY24, yet CoC stayed 0.3% with 209% NPL coverage. The right analyst read?`, opts: ["Early deterioration signal — sell","Post-Covid provision normalization from strength; still watch LAR at 5.0%","Provisions don't affect bank earnings","0.3% CoC means zero bad loans"], answer: 1,
 explain: `0.3% CoC on 1.7% NPL with 209% coverage = the bank building reserves from strength (post-Covid normalization), not plugging holes. But 5.0% LAR (Covid restructurings) still needs watching — that's where risk hides.`},
{q: `When could DDM and residual income give DIFFERENT values?`, opts: ["Never — the formulas are identical","When clean surplus breaks: above/below-book buybacks, large OCI, or reserve-funded dividends","When payout exceeds 100%","When Ke exceeds ROE"], answer: 1,
 explain: `DDM = RI equivalence rests on B_t = B_{t−1} + NI − Div. Above-book buybacks, OCI revaluations, or capital injections break that chain — bank analysts must reconcile equity, not assume the formulas always agree.`}
],
tasks: [
{t: "Task A — BBCA residual-income model (±3 hrs)", d: "Download the RC6 workbook. Do block A (NIM reconciliation), B (2-stage RI → per-share value → P/BV), C (1-stage justified + DDM cross-check), D (−30bps NIM sensitivity). All formulas link to assumptions.", url: "https://drive.google.com/drive/folders/1tqJmo75dI7OjtuKFfUb310jXO1W1CaQ8"},
{t: "Task B — Test the market's bet (±1 hr)", d: "In your answer file: change terminal ROE 16%→20% (eternal franchise), note the new 2-stage P/BV. Then change Ke 11.5%→13%, note again. Write 2 sentences: which assumption decides whether 3.9x is justified?"},
{t: "Task C — The quiz above", d: "Target ≥5/7 correct.", url: ""}
],
blind: {h: "Speed Drill — different numbers", body: `
<p><b>1.</b> NI Rp60tn, book Rp300tn, Ke 12%. Residual income = ?</p>
<details class="ans"><summary>Answer</summary><p>60 &minus; 0.12&times;300 = Rp24tn.</p></details>
<p><b>2.</b> ROE 18%, 50% payout, Ke 12%. Justified P/BV = ?</p>
<details class="ans"><summary>Answer</summary><p>g = 9%; (0.18&minus;0.09)/(0.12&minus;0.09) = 3.0x.</p></details>`}
};
EN["real-07"] = {
title: "ADRO/Alamtri: The Company That Is No Longer Itself",
sub: "Real Case 7 · ±5 hrs · Mining SOTP-NAV",
sections: [
{h: "Why FY24 vs FY23 can't be compared?", body: `
<p>Look at the headlines: revenue <b>$6,518m (FY23) → $2,080m (FY24)</b>, down <b>68.1%</b>. Net income $1,641m → $1,380m. A junior analyst concludes 'performance collapsed'. An associate asks first: <b>is this even the same company?</b></p>
<div class="callout"><b>📋 Data status:</b> headline figures from TipRanks/BRIDS (accessed 1 Nov 2026). On <b>5 December 2024</b>, the thermal coal assets were spun off into <b>PT Adaro Andalan Indonesia (AADI)</b>, separately listed on the IDX — and the company was renamed <b>PT Alamtri Resources Indonesia Tbk</b> (2024). As of June 2024, AAI covered <b>53% of assets, 89% of revenue, 105% of net income</b> of the group (IEEFA + alamtri.com). FY24 vs FY23 is not performance — it is an <b>accounting discontinuity</b>.</div>
<div class="example jebakan"><div class="lbl">🚫 The headline trap</div>
<p>Comparing $6,518m vs $2,080m as '−68% growth' = comparing a company <b>with</b> thermal coal vs <b>without</b> it. The correct input: <b>restated FY23</b> (discontinued operations, SFAS 105 / local PSAK) from the audited statements — where AAI is removed from both years. Illustrative reconstruction from AAI's share: continuing revenue ≈ 11% × $6,518m = <b>$717m</b>; continuing income ≈ (1 − 1.05) × $1,641m = <b>−$82m</b>. Yes — illustratively, the remaining business <b>lost money</b> in FY23. That is why professionals never use raw headline numbers.</p></div>
<div class="callout"><b>Why is this an associate-level lesson?</b> In every earlier case, the data was 'clean'. In the real world, <b>the company perimeter changes</b> (spin-offs, acquisitions, deconsolidations) and aggregators don't always restate. The skill: open the notes to the accounts → find 'discontinued operations' → use the restated figures. (Real-07 § Why a spin-off can be a value trap)</p></div>`},
{h: "Why SOTP instead of one multiple?", body: `
<div class="formula">Equity = Mine NAV + SIS value + Smelter NPV + 15% of AADI + Net cash − Holding discount</div>
<p>Post-spin Alamtri is a <b>4-leg</b> conglomerate: (1) <b>Adaro Minerals (ADMR)</b> — metallurgical coal; (2) <b>Saptaindra Sejati (SIS)</b> — mining contracting services; (3) <b>energy & the KAI aluminium smelter</b> phase 1, 500ktpa (commissioning 2026); (4) a <b>15% stake in AADI</b> (not consolidated). One P/E or EV/EBITDA multiple for all four = pricing 4 different-risk businesses at one price — meaningless.</p>
<div class="example korporat"><div class="lbl">🏢 SOTP result (working figures, $m)</div>
<p>ADMR NAV <b>$1,976m</b> + SIS <b>$750m</b> (illustrative) + smelter <b>$236m</b> (illustrative) + 15% AADI <b>$375m</b> (illustrative) = SOTP EV <b>$3,337m</b>. Add net cash <b>$1,557m</b> (end-1H24) → equity <b>$4,894m</b>. With an illustrative 20% holding discount → <b>$3,915m</b>. What is graded here is the <b>mechanic</b>: each leg gets the method that fits its character.</p></div>
<div class="callout"><b>Why does each leg get a different method?</b> A mine has a reserve life → <b>depletion NAV</b>. SIS is a service business → <b>multiple</b>. The smelter isn't producing yet → <b>staged DCF / real option</b>. The 15% AADI stake → <b>market value</b> (not consolidation). SOTP = picking the right weapon per target, then adding up. (Real-02 uses the same logic for Astra.)</p></div>`},
{h: "Why is a mine's NAV built on depletion?", body: `
<div class="formula">Mine life = Reserves ÷ Annual depletion &nbsp;→&nbsp; NAV = FCF × (1 − (1+WACC)^−life) / WACC</div>
<p>A mine is not a perpetual machine — it <b>depletes</b>. ADMR: reserves <b>177Mt</b> (31 Dec 2024) ÷ sales <b>5.62Mt/year</b> = <b>31.5 years</b> of mine life. After that, zero. A standard DCF with a 'grow forever' terminal value is <b>conceptually wrong</b> for a mine: there is no 'forever'.</p>
<div class="example korporat"><div class="lbl">🏢 ADMR depletion (working figures)</div>
<p>Revenue $1,154m ÷ 5.62Mt = <b>$205/ton</b>. Illustrative normalized EBITDA margin 35% → EBITDA $404m → annual FCF <b>$208m</b> (after 25% tax, illustrative D&A & sustaining capex). Annuity factor at 10% over 31.5 years = <b>9.503</b>. NAV = 208 × 9.503 = <b>$1,976m</b> — the largest SOTP contributor (59% of EV).</p></div>
<div class="example jebakan"><div class="lbl">🚫 Reserves ≠ resources</div>
<p>Metallurgical <b>resources are 983Mt</b> — five and a half times reserves. Beginners use 983Mt → 175-year mine life → fantasy NAV. Wrong: <b>resources are not yet proven economic</b> (no feasibility study, no permits, no infrastructure). NAV only uses <b>reserves</b> (177Mt): what's bankable. The sensitivity is real — if only 120Mt is recoverable, mine life is 21.4 years and NAV falls to <b>$1,808m</b> (−$168m). (See Hell Mode.)</p></div>`},
{h: "Why value the smelter as a real option?", body: `
<p>The KAI aluminium smelter: capex <b>$300–325m</b> (ADMR 2025 guidance, smelter included), revenue <b>zero until 2026 commissioning</b>. A standard DCF sees this as: $300m out today, uncertainty later — and punishes it mercilessly.</p>
<div class="callout"><b>Why frame it as an option, not a plain DCF?</b> The smelter is a <b>right (not an obligation) to future cash flows</b>: if aluminium prices collapse permanently, phase 2 expansion can be cancelled — the loss is capped at phase 1 capex. A standard DCF assumes blind commitment; a <b>real option</b> prices management's flexibility. Illustrative NPV: steady FCF $60m/yr from 2027, WACC 12%, g 2% → PV $536m − $300m capex = <b>$236m</b> ≥ 0. Small next to the mine NAV — but the <b>optionality</b> (phase 2, downstream) is where the value hides.</div>
<div class="example korporat"><div class="lbl">🏢 The real trade-off: capex vs dividends</div>
<p>Alamtri sits on <b>net cash of $1,557m</b>. Every dollar into the smelter = a dollar <b>not</b> returned to shareholders as dividends. The associate question isn't 'what's the smelter's NPV' but: <b>does $300m+ here create more value than returning it to shareholders?</b> With an illustrative NPV of $236m > 0, the answer is 'yes, on paper' — but execution (2026 commissioning, aluminium prices) is the risk. Thesis defenses are won or lost here.</p></div>`},
{h: "Why can a spin-off be a value trap?", body: `
<p>The most associate-level question in this case: <b>did the spin-off create value, or just move it around?</b> The correct test: compare <b>pre-spin</b> value (the whole group) vs <b>post-spin</b> value (Alamtri SOTP + the 85% of AADI distributed to ADRO shareholders). A spin-off doesn't print value from thin air — it only separates.</p>
<div class="example jebakan"><div class="lbl">🚫 Two spin-off traps</div>
<p><b>1. The 'value creation' illusion.</b> If post-spin > pre-spin, ask: where did the difference come from? Honest candidates: the vanished holding discount (the market rewards focus), or a re-rating of each part. Dishonest ones: you're comparing incomparable numbers (headline vs restated — back to §1).<br/><b>2. The ESG angle.</b> IEEFA/BankTrack read this spin-off as a <b>financing maneuver</b>: banks with coal-exit policies can lend again to the 'clean' entity. That's thesis-defense material — an ESG-sensitive market may discount the stock precisely because of the structure.</p></div>
<div class="callout"><b>Why isn't the 15% AADI stake consolidated?</b> Below 20% (PSAK 15 / IAS 28) = no control/significance for full consolidation — it's carried as an investment (market/fair value), not merged line-by-line. Practically: AADI's revenue does <b>not</b> add to Alamtri's revenue; the SOTP only takes <b>15% × AADI's market value</b> ($375m illustrative). Common error: adding AADI's revenue into group revenue.</p></div>`},
{h: "🔥 Hell Mode briefing", body: `
<ul>
<li><b>Discontinued operations</b> (SFAS 105 / PSAK): divested assets are removed from restated figures — headline vs restated can differ by 68%.</li>
<li><b>SOTP</b> = sum-of-the-parts: each conglomerate leg valued with the method that fits its character.</li>
<li><b>Mine NAV</b> = depletion DCF: mine life = reserves ÷ annual depletion; <b>no 'forever' terminal value</b>.</li>
<li><b>Reserves ≠ resources</b>: only reserves (proven economic) enter the NAV.</li>
<li><b>Real option</b>: a pre-revenue project (smelter) is valued as a right to future cash flows, not a blind DCF.</li>
<li><b>Holding discount</b>: the market prices a conglomerate below the sum of its parts — explain the gap.</li>
<li><b>Net cash</b> is added to SOTP EV to get equity (the mirror of subtracting net debt in Real-02).</li>
</ul>`}
],
quiz: [
{q: `Revenue FY23 $6,518m vs FY24 $2,080m. Junior analyst: 'performance collapsed 68%'. The error?`, opts: ["Wrong math — the drop is 32%","Comparing different perimeters (the AAI spin-off)","Forgot to convert the dollar rate","FY24 is unaudited so it's invalid"], answer: 1, k: "discontinued_ops",
 hints: ["What left the group in Dec 2024?", "AAI = 89% of group revenue. Compare apples to apples."],
 explain: `On 5 Dec 2024 the thermal coal assets (AAI: 89% of revenue, 105% of income) were spun off into AADI. $6,518m vs $2,080m = the company WITH vs WITHOUT thermal coal — not performance. Use restated FY23.`},
{q: `Which figures are correct for YoY analysis after the spin-off?`, opts: ["FY23 headline $6,518m","Restated FY23 (discontinued ops removed)","The FY23–FY24 headline average","FY24 projected to a full year"], answer: 1, k: "discontinued_ops",
 hints: ["SFAS 105 / PSAK discontinued operations.", "Headlines mix two different perimeters."],
 explain: `Only restated FY23 (AAI removed from both years) is apples-to-apples. The $6,518m headline mixes the old perimeter.`},
{q: `ADMR's mine life?`, opts: ["983 ÷ 6.63 = 148 years","177 ÷ 5.62 = 31.5 years","177 ÷ 6.63 = 26.7 years","983 ÷ 5.62 = 175 years"], answer: 1, k: "mine_life",
 hints: ["Reserves or resources? Sales or production?", "NAV uses what's bankable divided by actual depletion."],
 explain: `Reserves 177Mt ÷ sales 5.62Mt = 31.5 years. Resources (983Mt) aren't bankable; production (6.63Mt) isn't depletion sold.`},
{q: `Why does the NAV use 177Mt reserves instead of 983Mt resources?`, opts: ["Because 177 is the smaller number","Reserves = proven economic & bankable; resources aren't","To keep mine life from getting too long","Accounting rules forbid using resources"], answer: 1, k: "reserves",
 hints: ["What's the difference between 'proven mineable at a profit' and 'in the ground'?", "Which one would a bank lend against?"],
 explain: `Reserves have passed economic feasibility — resources are only geological potential. NAV = value that can be monetized.`},
{q: `Alamtri's SOTP equity value (working figures) = ?`, opts: ["$3,337m (SOTP EV — forgot net cash)","$3,915m (already holding-discounted)","$4,894m (SOTP EV + $1,557m net cash)","$6,518m (FY23 headline revenue)"], answer: 2, k: "sotp",
 hints: ["EV = for all capital providers. Equity = for shareholders.", "Who owns the $1,557m net cash?"],
 explain: `SOTP EV $3,337m (1976+750+236+375) + net cash $1,557m = equity $4,894m. $3,915m = after the 20% holding discount.`},
{q: `The KAI smelter is valued as a real option because?`, opts: ["Options are always more accurate than DCF","Big capex now, zero revenue until 2026 — a blind DCF punishes flexibility","Smelters need no capex","Aluminium isn't cyclical"], answer: 1, k: "real_option",
 hints: ["Pay $300m today, get 2026 uncertainty.", "Phase 2 can be cancelled — the loss is capped. What shape is that?"],
 explain: `The smelter = a right to future cash flows with capped downside (can stop at phase 1). A standard DCF assumes blind commitment; a real option prices flexibility.`},
{q: `Alamtri holds 15% of AADI — why isn't it fully consolidated?`, opts: ["Because AADI is separately listed on the IDX","Below 20% (PSAK 15/IAS 28) — carried as an investment","Because the spin-off isn't complete","Because AADI is loss-making"], answer: 1, k: "akuntansi",
 hints: ["What's the threshold for significant control?", "Full consolidation needs control, not just shareholding."],
 explain: `Below 20% = no control/significance for line-by-line consolidation (PSAK 15/IAS 28). It enters the SOTP as 15% × market value, not as added revenue.`},
{q: `How is the $1,557m net cash treated in the SOTP?`, opts: ["Subtracted like debt","Ignored — cash isn't an operating asset","Added to SOTP EV → equity","Split across each SOTP leg"], answer: 2, k: "net_cash",
 hints: ["EV = for all capital providers. Who owns cash?", "The mirror image of net debt in Real-02."],
 explain: `Net cash belongs to shareholders → SOTP EV + net cash = equity of $4,894m. The mirror of 'EV − net debt' in Real-02.`}
],
hell: [
{q: `ADMR: sales +26%, ASP −16%. Implied revenue change?`, opts: ["+10% (26−16)","−16% (price decides)","1.26 × 0.84 − 1 = +5.8% ≈ +6% reported","+30% (follow production)"], answer: 2,
 explain: `Volume effect × price effect: 1.26 × 0.84 = 1.0584 → +5.8%, matching the reported +6%. Production +30% ≠ sales +26% — revenue comes from what's SOLD.`},
{q: `Only 120Mt of reserves are recoverable (not 177Mt). New ADMR NAV?`, opts: ["Stays $1,976m — reserves aren't sensitive","$1,808m (21.4-yr life, 8.69 annuity)","120/177 × $1,976m = $1,339m","Rises — a more focused mine"], answer: 1,
 explain: `Life = 120/5.62 = 21.4 yrs; 10% annuity = 8.69; NAV = 207.9 × 8.69 = $1,808m (−$168m). Not linear because the annuity curves — that's why sensitivity is computed, not guessed.`},
{q: `SOTP equity $4,894m, apply a 20% holding discount. Result?`, opts: ["$4,894m (discount not applied)","$5,873m (added instead)","$3,915m","$3,337m"], answer: 2,
 explain: `4,894 × (1 − 0.20) = $3,915m. The discount = the market paying below the sum of the parts — a question (why?), not a buy verdict.`},
{q: `Restated FY23 continuing (illustrative) = −$82m income. The honest analyst's take?`, opts: ["The business is destroyed — avoid","The remaining business may not be profitable; value rests on assets & future options","Illustrative = meaningless","The spin-off failed completely"], answer: 1,
 explain: `AAI contributed 105% of group income — so continuing ops (illustrative) lost $82m. Alamtri's value rests on reserve NAV + smelter/energy options, NOT historical earnings power. That changes the entire thesis.`},
{q: `Did the ADRO→AADI spin-off 'create value'? The correct test?`, opts: ["Check if the share price rose/fell after","Compare pre-spin value vs (Alamtri SOTP + the 85% of AADI distributed)","Ask management — they'd know","Spin-offs always create value"], answer: 1,
 explain: `A spin-off separates; it doesn't print value. Test: whole-group value pre-spin vs the sum of post-spin pieces shareholders received. The difference must be explained (vanished holding discount? re-rating?) — never assumed.`}
],
tasks: [
{t: "Task A — Alamtri SOTP (±4 hrs)", d: "Download the RC7 workbook. Step 1: spot the FY23 vs FY24 headline oddity, restate FY23 (illustrative). Step 2: build the 4-leg SOTP (ADMR depletion NAV, SIS multiple, smelter real-option, 15% AADI) → EV → + net cash → equity → holding discount. All formulas link to inputs.", url: "https://drive.google.com/drive/folders/19_WRNJ84ntoN3NVr6sNumNUMA8CTv5Zc"},
{t: "Task B — Stress test (±1 hr)", d: "ASP falls permanently 20%: recalc ADMR FCF & NAV. Then: reserves only 120Mt — new NAV? Which leg is most 'dangerous' to valuation, and why?"},
{t: "Task C — Quiz above", d: "Target ≥6/8 correct."}
],
blind: {h: "Speed Drill — different numbers", body: `
<p><b>1.</b> Reserves 120Mt, sales 6Mt/year. Mine life?</p>
<details class="ans"><summary>Answer</summary><p>120 ÷ 6 = <b>20 years</b>.</p></details>
<p><b>2.</b> FCF $150m/year, WACC 10%, life 20 years. NAV?</p>
<details class="ans"><summary>Answer</summary><p>Annuity = (1 − 1.1^−20)/0.1 = 8.5136. NAV = 150 × 8.5136 = <b>$1,277m</b>.</p></details>
<p><b>3.</b> SOTP EV $3,000m, net cash $1,500m, holding discount 15%. Final equity?</p>
<details class="ans"><summary>Answer</summary><p>Equity = (3,000 + 1,500) × (1 − 0.15) = <b>$3,825m</b>.</p></details>`}
};
EN["real-08"] = {
title: "GOTO: A Rp90 Trillion Loss, Then What?",
sub: "Real Case 8 · ±6 hrs · SOTP + one-off normalization",
sections: [
{h: "Why doesn't a Rp90.5 trillion loss mean the business is destroyed?", body: `
<p><b>GoTo (GOTO.JK)</b> booked a <b>−Rp90.5 trillion loss in FY2023</b> (AlphaSpread, income from continuing operations, accessed Nov 2026) — a number that read raw sounds like the company vaporized Rp90.5T of cash in a year. It didn't.</p>
<p>Of that Rp90.5T, roughly <b>Rp78.8 trillion was a non-cash goodwill reversal</b> from losing control of Tokopedia in the TikTok transaction (GoTo results release, 19 Mar 2024). The Rp93.1T of goodwill itself was booked back in 2021 at the Gojek–Tokopedia merger (audited FY2022 statements, note 33a): the price paid for <i>expectations</i> — not cash leaving the door in 2023.</p>
<div class="example korporat"><div class="lbl">🏢 Analogy</div>
<p>You buy a painting for Rp93 million convinced it will appreciate. Three years later an appraiser says it's worth Rp14 million. You're "down" Rp79 million <b>on paper</b> — but your wallet didn't lose Rp79 million this year. That's goodwill impairment: admitting past expectations were too optimistic, not bleeding cash today.</p></div>
<div class="callout"><b>Why does this matter?</b> GoTo's FY2023 operating cash flow was only <b>−Rp4.3T</b> (AlphaSpread) — not −Rp90.5T. And <b>FY2024 adjusted EBITDA was actually positive at Rp386 billion</b>, beating breakeven guidance (GoTo release, 12 Mar 2025). Accounting records the past; cash tells the present. An analyst who doesn't separate the two is valuing the shadow, not the object.</p></div>`},
{h: "Why is normalizing one-offs THE exercise?", body: `
<div class="formula">Continuing loss = Headline loss − One-off = −90.5 − (−78.8) = −Rp11.7T</div>
<p>Normalization = cleaning headline numbers of one-time items before using them. Once cleaned, the story flips completely:</p>
<p><b>−Rp11.7T</b> (FY23 continuing) → <b>−Rp4.5T</b> (FY24, ≈$286M per independent analysis by venturesg, Oct 2026) → <b>−Rp1.5T</b> (FY25, GoTo release 11 Mar 2026) → <b>net profit +Rp864 billion</b> (9M26, Quartr 30 Oct 2026). From "destroyed" to "approaching breakeven" — just by refusing to treat a one-time non-cash item as operating loss.</p>
<div class="example jebakan"><div class="lbl">🚫 The P/E trap</div>
<p>Negative FY23 EPS → P/E is <b>meaningless</b> (negative/undefined). Loss-making companies are valued with <b>EV/Revenue or SOTP</b>, not P/E. Even after GOTO turned profitable (LTM EPS +Rp0.63 per StockAnalysis, Oct 2026), a P/E built on the first two profitable quarters in history is fragile. Multiples need <i>recurring</i> earnings, not earnings born yesterday.</p></div>
<div class="callout"><b>⚠️ A simplified bridge:</b> −Rp11.7T is an illustrative bridge (one large one-off removed). The full reconciliation — including the FY22 one-off (Rp11T goodwill impairment, kr-asia Mar 2023) and tax effects — lives in the audited financial statements. What's scored here is your <b>normalization mechanics</b>, not the precision of the number.</p></div>`},
{h: "Why is +7.5% growth deceiving? (deconsolidation & pro-forma)", body: `
<p>The headline: revenue <b>Rp14.8T → Rp15.89T (+7.4%)</b>. Looks stagnant. But FY2023 still <b>consolidated Tokopedia</b>; Tokopedia left the consolidation on <b>31 January 2024</b> after TikTok took 75.01%. Comparing GAAP FY23 vs FY24 = comparing apples with an apple orchard.</p>
<p>GoTo itself published <b>pro-forma</b> numbers (excluding Tokopedia): <b>Rp7.652T (FY23) → Rp14.753T (FY24) = +92.8%</b> (GoTo release, 12 Mar 2025). The continuing business nearly doubled — the +7.4% headline hid it.</p>
<div class="example korporat"><div class="lbl">🏢 One deal, three value streams</div>
<p>The TikTok transaction (Dec 2023, announced value <b>$1.5 billion for 75.01%</b> — i3investor/TheEdge, Jul 2024) gave GoTo three legs of value: <b>(1)</b> a 24.99% stake in Tokopedia, <b>(2)</b> e-commerce service fees (FY24: Rp622B → FY25: Rp820B, +32%), <b>(3)</b> a ~0.4% GMV royalty (≈$58M/year, nearly costless). A SOTP analyst must value all three — not just the shares.</p></div>
<div class="callout"><b>Why is pro-forma mandatory?</b> Whenever a company's structure changes (acquisitions, divestitures, deconsolidation), GAAP numbers across years aren't apple-to-apple. Pro-forma = "what the numbers would look like <i>if</i> today's structure had existed all along." Without it, you're valuing an accounting change as business performance.</p></div>`},
{h: "Why a three-legged SOTP — and why does the market discount it?", body: `
<p>GOTO isn't one business: <b>on-demand</b> (Gojek), <b>fintech</b> (GoPay), and <b>24.99% of Tokopedia</b>. One multiple for all = pricing 3 houses with 1 price per square meter. SOTP values each leg:</p>
<p>① <b>On-demand:</b> FY24 revenue Rp5.34T (FY25 release) × <b>2.5× EV/Revenue</b> (illustrative) = <b>Rp13.35T</b>.<br>
② <b>Fintech:</b> FY26E EBITDA $94–100M → midpoint $97M ≈ Rp1.75T × <b>8× EV/EBITDA</b> (illustrative) = <b>Rp13.98T</b>.<br>
③ <b>Tokopedia 24.99%:</b> $1.5B ÷ 75.01% × 24.99% = $0.50B ≈ <b>Rp9.0T</b> (Rp18,014 FX, BI 16 Oct 2026) — an <i>anchor</i> from a real transaction price.<br>
④ <b>Net cash</b> $858M ≈ <b>Rp15.46T</b> (venturesg, Oct 2026).<br>
<b>Total SOTP ≈ Rp51.79T → Rp45/share</b> (1.15 trillion shares, post treasury cancellation 14 Oct 2026). Market price: Rp25.6T market cap → <b>Rp22/share</b> (StockAnalysis, 30 Oct 2026). <b>Discount ≈ 50.6%.</b></p>
<div class="example jebakan"><div class="lbl">🚫 A discount is a question, not an answer</div>
<p>Candidate explanations from the market: Rp772B/year cash corporate costs (FY24), a $611M consumer <i>loan book</i> (+58% YoY, <i>unsecured</i> — 2Q26), dual-class shares (insiders hold ~58% of votes), Grab-merger politics, and a royalty depending on TikTok. Maybe the market is too pessimistic — maybe it knows something your model ignores. The analyst's job: <b>explain the gap</b>, not assume the market is dumb.</p></div>
<div class="callout"><b>⚠️ The fintech leg = an option, not a certainty:</b> it uses <i>forward</i> FY26E EBITDA for a business that first turned profitable in 2026 — paying today for future earnings with a double risk (projection risk × multiple risk). In Task B you'll stress-test it: cut the multiple 8×→5× and see what per-share value survives.</p></div>`},
{h: "Why can aggregators mislead you?", body: `
<p>The GOTO case is a museum of data traps. Three real ones from this case's research:</p>
<p><b>1. Inconsistent D&A.</b> AlphaSpread shows FY24 D&A of <b>Rp744 billion</b> in one table and <b>Rp2.7 trillion</b> in another. Both can't be right. Status: <b>flagged — must reconcile to the audited statements</b> before use. This case's workbook <i>deliberately doesn't use</i> D&A.</p>
<p><b>2. "FY24 loss" has three versions.</b> Rp3.08T (<i>loss for the period</i>, GoTo release Mar 2025) vs Rp5.46T (<i>net loss</i>, GoTo release Mar 2026) vs ~Rp4.5T ($286M, venturesg). Nobody lied — the <b>definitions differ</b>. An analyst who quotes without naming the definition is comparing three different things.</p>
<p><b>3. Deal value vs cash paid.</b> "TikTok paid $1.5B" (announced transaction value) vs independent analysis: $840M initial cash + $1B+ funding commitments. The valuation <i>anchor</i> uses the transaction figure — but the analyst notes the nuance.</p>
<div class="callout"><b>Why is this an associate-level lesson?</b> Juniors quote numbers; associates cite <b>year + period + source + definition</b> for every figure — and label unverified ones illustrative. One source = one version of truth; the audited statements = the anchor.</p></div>`},
{h: "Practice task", body: `
<p>Build GOTO's normalization + pro-forma + SOTP in the practice workbook: (A) normalize the FY23 loss from the −Rp90.5T headline with the Rp78.8T one-off; (B) compute headline vs pro-forma growth FY23→FY24; (C) build the 3-legged SOTP + net cash → per-share value → upside vs market price. Every answer cell must be formulas linking to inputs — change the on-demand multiple 2.5×→1.5× and watch the whole SOTP follow.</p>
<div class="callout"><b>Why does this task matter?</b> This is the "dirtiest" exercise in all of Real Cases: a giant one-off, a deconsolidation, a three-layered deal, and conflicting aggregator data. If you can tidy up GOTO, "normal" financial statements will feel easy.</p>
<ul>
<li><b>Normalization</b> = cleaning one-offs before valuing; continuing loss ≠ headline loss.</li>
<li><b>Pro-forma</b> = apple-to-apple after structural change (deconsolidation).</li>
<li><b>SOTP</b> = each segment valued with its own multiple, then added up.</li>
<li><b>Transaction anchor</b> = a real deal price ($1.5B/75.01%) as a fair-value anchor.</li>
<li><b>Discount vs SOTP</b> = 1 − market price / SOTP value — a question, not a buy verdict.</li>
</ul></div>`}
],
quiz: [
{q: `The Rp78.8T FY2023 GOTO one-off was?`, opts: ["Cash losses from Gojek operations","A non-cash goodwill reversal from losing control of Tokopedia","Repayment of maturing bank debt","Bloated Tokopedia marketing spend"], answer: 1, k: "one_off",
 hints: ["Non-cash, one-time, tied to the TikTok transaction.","Goodwill was booked in 2021 at the merger; in 2023 it was admitted 'too optimistic'."],
 explain: `Rp78.8T = a non-cash goodwill reversal from losing control of Tokopedia (GoTo release, 19 Mar 2024). Not 2023 cash outflow — an admission that 2021 merger expectations were too optimistic.`},
{q: `FY23 headline loss −Rp90.5T, one-off −Rp78.8T. Normalized continuing loss?`, opts: ["−Rp169.3T","−Rp11.7T","−Rp90.5T (unchanged)","−Rp78.8T"], answer: 1, k: "normalization",
 hints: ["Continuing loss = headline − one-off.","−90.5 − (−78.8) = ? Mind the sign."],
 explain: `−90.5 − (−78.8) = −Rp11.7T. The sign is everything: subtracting a loss one-off (not adding) is what cleans the number. Wrong sign → −Rp169.3T, twice as scary as reality.`},
{q: `Headline revenue +7.4% but pro-forma +92.8%. What caused the gap?`, opts: ["The rupiah strengthened sharply in 2024","FY23 still consolidated Tokopedia; deconsolidated 31 Jan 2024","GoTo changed its fiscal year","The 2024 share buyback effect"], answer: 1, k: "pro_forma",
 hints: ["Apple-to-apple: the structure must match.","When did Tokopedia leave the consolidated statements?"],
 explain: `GAAP FY23 still included consolidated Tokopedia; since 31 Jan 2024 Tokopedia is deconsolidated. Pro-forma Rp7.652T→Rp14.753T (+92.8%) compares the continuing business only.`},
{q: `TikTok paid $1.5B for 75.01% of Tokopedia. Implied 100% value of Tokopedia?`, opts: ["$1.125B","$1.5B","$2.0B","$2.5B"], answer: 2, k: "sotp",
 hints: ["100% value = deal price ÷ stake bought.","1.5 ÷ 0.7501 = ?"],
 explain: `$1.5B ÷ 75.01% = $1.9997B ≈ $2.0B. That's the transaction anchor: a price a real third party actually paid, not an analyst's guess.`},
{q: `GoTo's 24.99% Tokopedia stake in rupiah (Rp18,014 FX)?`, opts: ["Rp4.5T","Rp6.0T","Rp9.0T","Rp13.5T"], answer: 2, k: "sotp",
 hints: ["0.2499 × $1.9997B = $0.4997B.","$0.4997B × 18,014 = ? Watch the unit ladder: USD billions → Rp trillions."],
 explain: `0.2499 × $1.9997B = $0.4997B; × Rp18,014 = Rp9.0T. Unit ladder: $499.7 million × 18,014 = Rp9,002 billion = Rp9.0 trillion.`},
{q: `SOTP total Rp51.79T on 1.15 trillion shares. Per-share value?`, opts: ["Rp22","Rp31","Rp45","Rp51"], answer: 2, k: "sotp",
 hints: ["Trillion ÷ trillion = straight Rp.","51.79 ÷ 1.15 = ?"],
 explain: `51.79 ÷ 1.15 = Rp45.03 ≈ Rp45/share. Numerator and denominator are both in trillions, so the result is rupiah per share directly — no ×1,000.`},
{q: `Why isn't trailing P/E used to value GOTO in FY23–FY24?`, opts: ["Because GOTO has no shares outstanding","Negative EPS → meaningless P/E; use EV/Revenue or SOTP","Because P/E is banned for tech issuers","Because GOTO's profit is always zero"], answer: 1, k: "multiples",
 hints: ["P/E = price ÷ earnings. Negative earnings → ?","What values a loss-making company?"],
 explain: `Negative EPS makes P/E negative/undefined — the multiple is meaningless. Loss-makers are valued via EV/Revenue or segment SOTP.`}
],
hell: [
{q: `FY24 adjusted EBITDA +Rp386B but net loss −Rp4.5T. How?`, opts: ["The financials were fabricated","Adjusted EBITDA strips out non-cash & one-offs (SBC, depreciation); accounting net loss ≠ operating cash","Rp386B is actually Rp386T","Net loss already includes 2025 profit"], answer: 1,
 explain: `Adjusted EBITDA = earnings before interest, tax, depreciation, amortization, SBC, and one-offs. It measures core operating cash power; accounting net loss carries all non-cash charges. Both are true — they answer different questions.`},
{q: `The fintech leg uses forward FY26E EBITDA. The biggest danger?`, opts: ["None — guidance is always right","Double risk: paying today for future earnings that may miss, with a multiple that's also a guess","The rupiah will surely strengthen","Forward EBITDA is banned by accounting standards"], answer: 1,
 explain: `A forward multiple = betting twice: (1) 2026 EBITDA truly hits $94–100M (a business profitable for the first time in 2026), (2) 8× is the right multiple. Miss either → the fintech SOTP leg collapses. That's why it's labeled an 'option', not a 'certain value'.`},
{q: `SOTP Rp45 vs market Rp22. The honest analyst's conclusion?`, opts: ["Buy aggressively — 102% upside guaranteed","Sell — the market is always right","First explain the 51% discount (corporate costs, loan book, governance); a discount is a question","Raise multiples until upside looks reasonable"], answer: 2,
 explain: `A 51% discount is a question, not a buy verdict. Candidates: Rp772B/yr corporate costs, the $611M unsecured loan book, 58% dual-class votes, merger politics. An honest analyst doesn't massage multiples to make the story pretty.`},
{q: `The 0.4% GMV royalty ≈ $58M/year is 'nearly costless'. Why stay cautious?`, opts: ["Because royalties are always zero","The flow depends on TikTok (a third party): GMV can fall, deal terms can change","Because royalties aren't in the statements","Because $58M is too small to count"], answer: 1,
 explain: `All three TikTok-deal legs depend on a party GoTo doesn't control. Today's 'pure' royalty can shrink if TikTok Shop GMV falls or terms get renegotiated. Value without control = value with a risk discount.`},
{q: `Aggregator D&A: Rp744B in one table, Rp2.7T in another (FY24). The analyst's move?`, opts: ["Use the average, Rp1.7T","Pick the smaller one for a nicer valuation","Use neither; reconcile to the audited statements — flag as troubled data","Ignore D&A forever in all valuations"], answer: 2,
 explain: `Two numbers that can't both be true = a stop signal, not a selection signal. The analyst traces to the primary source (audited statements) and flags the aggregator figures as unverified. This case deliberately doesn't use D&A at all.`}
],
tasks: [
{t: "Task A — Normalization + pro-forma + SOTP (±4 hrs)", d: "Download the RC8 workbook. (A) Normalize the FY23 loss from the headline with the one-off; (B) compute headline vs pro-forma growth; (C) build the 3-legged SOTP + net cash → per-share value → upside vs market price. All formulas link to inputs.", url: "https://drive.google.com/drive/folders/1OrN9fj9jdgSuuC2JertPlAWps4zTRbHX"},
{t: "Task B — Multiple sensitivity test (±1 hr)", d: "In your answer file: cut the on-demand multiple 2.5×→1.5× and the fintech multiple 8×→5×. Note the new per-share value. Which leg is most 'dangerous' to the thesis?", url: ""},
{t: "Task C — The quiz above", d: "Target ≥5/7 correct.", url: ""}
],
blind: {h: "Speed Drill — different numbers", body: `
<p><b>1.</b> Headline loss −Rp50T includes a −Rp42T (non-cash) one-off. Normalized continuing loss = ?</p>
<details class="ans"><summary>Answer</summary><p>−50 − (−42) = −Rp8T.</p></details>
<p><b>2.</b> An investor pays $2B for 80% of a startup. Implied 100% value? The remaining 20%?</p>
<details class="ans"><summary>Answer</summary><p>100% = 2 ÷ 0.80 = $2.5B. Remaining 20% = 0.20 × 2.5 = $0.5B.</p></details>`}
};
EN["real-09"] = {
title: "WSKT: Dissecting a Company with Negative Equity",
sub: "Real Case 9 · ±6 hrs · Liquidation waterfall",
sections: [
{h: "Why Waskita Karya?", body: `
<p><b>Waskita Karya (WSKT.JK)</b> — a state-owned contractor with equity of <b>negative Rp3.34tn</b> (30 Sep 2026). This is the course's most extreme case: every equity multiple (P/E, P/BV) is <b>undefined</b>, the shares have been <b>suspended since May 2023</b> (Rp202), and PEFINDO rates it <b>idSD</b> (Selective Default). Here you don't value the shares — you value <b>creditor recovery</b>.</p>
<div class="example korporat"><div class="lbl">🏢 Key data</div>
<p>FY25 (financials via petromindo.com, Apr 2026): revenue <b>Rp8.85tn</b> (−17% YoY) · net loss <b>−Rp4.48tn</b> · gross profit Rp1.58tn (18% margin). FY24: revenue Rp10.71tn · loss −Rp3.91tn. FY24 audited (press Oct 2025, citing IDX filings): assets Rp77.15tn · liabilities Rp69.27tn · equity Rp7.88tn. 9M26 interim <b>unaudited</b> (jawawa.id): parent equity <b>−Rp3.34tn</b> · deficit Rp20.8tn · finance costs Rp2.79tn · short-term liabilities &gt; current assets by Rp12.48tn · cash Rp1.50tn.</p></div>
<div class="callout"><b>📋 Data status:</b> the figures above are verified from the cited sources. <b>The liquidation assumptions in the workbook (book values of receivables/toll/fixed assets, per-class recovery rates, 5% liquidation costs, bond/vendor claims, 30% haircut) are ILLUSTRATIVE</b> — what's scored is your <b>waterfall mechanics</b>, not the precision of the assumptions. Figures may change; verify against the latest filings before real-world use.</div>
<div class="callout"><b>⚠️ Forensic note:</b> several secondary media outlets report 9M26 figures that are <b>inconsistent across sources</b> (e.g. equity Rp1.03tn vs a Rp22.52tn deficit that doesn't reconcile with assets Rp73.07tn − liabilities Rp72.03tn). The analyst's lesson: aggregator/media numbers <b>must</b> be re-checked against the official filings before entering a model. This case uses the verified research figures above.</p></div>`},
{h: "Why are equity multiples meaningless?", body: `
<div class="formula">P/BV = price ÷ book value per share → NEGATIVE denominator</div>
<p>Equity of −Rp3.34tn means <b>negative book value per share</b>. P/BV = price ÷ (negative) = a number that can't be interpreted. P/E breaks too: a −Rp4.48tn loss → negative E → negative P/E. Equity multiples are <b>economically undefined</b> — not "cheap", not "expensive", but <b>not a valid measuring tool</b>.</p>
<div class="example jebakan"><div class="lbl">🚫 The "cheap" trap</div>
<p>"The shares are only Rp202 — cheap!" <b>WRONG.</b> Rp202 is a price <b>frozen since the May 2023 suspension</b> — 3.5 years with no price discovery. That price reflects neither the −Rp4.48tn loss (FY25), the negative equity, nor the MRA. A suspended share ≠ a cheap share; it's a <b>share with no market</b>. An analyst using Rp202 as "the price" is using a fossil as data.</p></div>
<div class="callout"><b>Why does the analyst think like a creditor?</b> Because in distress, the <b>claim priority</b> decides everything: creditors get paid first, shareholders get the leftovers — if any. Valuing WSKT from a shareholder's seat = valuing the back row of a sinking ship.</p></div>`},
{h: "Why a waterfall, not a DCF?", body: `
<div class="formula">Class recovery = MIN(remaining funds, class claim) → move to next class</div>
<p>A DCF needs a <b>going-concern</b> assumption (the company lives forever). With a Rp20.8tn deficit, a Rp12.48tn liquidity gap, and an idSD rating, that assumption is <b>broken</b>. A <b>liquidation waterfall</b> replaces it: sell every asset at realistic haircuts → subtract liquidation costs → distribute to creditors <b>by seniority</b> → leftovers (if any) to equity.</p>
<div class="callout"><b>Why the seniority order?</b> ① <b>Liquidation costs</b> (curator, legal) — without them nothing can be sold. ② <b>Secured creditors / banks</b> (MRA Tranche A Rp2.154tn + Tranche B Rp21.736tn = Rp23.89tn). ③ <b>Unsecured</b> (non-guaranteed bonds — already restructured — &amp; vendors). ④ <b>Equity</b> — last in line, suffering most. Seniority isn't an opinion; it's <b>law</b>.</p></div>
<div class="example korporat"><div class="lbl">🏢 The waterfall result (Rp trillion, illustrative assumptions in the workbook)</div>
<p>Liquidation proceeds = cash 1.50 + receivables 2.76 + toll 5.40 + fixed assets 4.00 = <b>Rp13.66tn</b>. Liquidation costs 5% = 0.68 → <b>net proceeds Rp12.98tn</b>. Bank claims (Tranches A+B) = <b>Rp23.89tn</b> — nearly <b>double</b> the available funds. Bank creditors receive MIN(12.98; 23.89) = <b>Rp12.98tn</b> → recovery rate <b>54.3%</b>. Left for bonds/vendors: <b>Rp0</b>. Left for equity: <b>Rp0</b>. Even senior creditors aren't made whole — let alone shareholders.</p></div>
<div class="callout"><b>Why does this "zero" matter?</b> Because it answers the case's hardest question — <i>is there any equity value left?</i> — without arguing about the future. A waterfall doesn't forecast; it <b>computes who gets what if everything is sold today</b>: arithmetic proof, not opinion.</p></div>
<div class="callout"><b>⚠️ Distress ≠ automatic liquidation.</b> The waterfall above = <b>one scenario</b> (liquidation today), not a final verdict. Proper distressed valuation uses <b>probability weighting</b>:
<div class="formula">Value = p(restructuring) × V<sub>restructured</sub> + p(liquidation) × V<sub>liquidation</sub></div>
<p style="margin-top:8px">Three distinct components: (1) <b>going-concern/restructuring value</b> — value if restructuring succeeds (needs a post-restructuring operating model, not a status-quo DCF); (2) <b>distress-sale value</b> — asset sale under pressure (in between); (3) <b>liquidation recovery</b> — the waterfall above. Analysts who jump straight to "distress = liquidation" skip the middle scenario that is most likely to be negotiated.</p></div>`},
{h: "Why can restructuring make equity 'positive'? Three different scenarios", body: `
<p>A 30% haircut on Tranche B Rp21.736tn → liabilities down <b>Rp6.52tn</b>. Mechanical equity = −3.34 + 6.52 = <b>+Rp3.18tn</b>. But <b>who owns that equity</b> depends on the scenario — and all three differ completely:</p>
<div class="example korporat"><div class="lbl">🏢 Scenario A — Pure forgiveness (haircut, no conversion)</div>
<p>Creditors cut Rp6.52tn of principal <b>without receiving shares</b>. No new shares are issued → <b>old shareholders still own 100%</b> of a company now showing +Rp3.18tn of book equity. Sounds good? That's the problem: <b>creditors don't give free gifts</b>. Pure forgiveness practically never happens without compensation — creditors always demand something in return (conversion, warrants, tight covenants).</p></div>
<div class="example korporat"><div class="lbl">🏢 Scenario B — Debt-for-equity swap (WITH explicit terms)</div>
<p>Creditors convert Rp6.52tn of debt into <b>N new shares</b> at a valuation of <b>RpV per share</b>. Creditor ownership = N ÷ (N + old shares). <b>Without N and V, nothing can be concluded about ownership.</b> Illustrative: at Rp1,000/share → 6.52 billion new shares vs ~29 billion old shares → creditors hold ~18%. At Rp100/share → 65.2 billion new shares → creditors hold ~69%, old holders heavily diluted. <b>Ownership = a function of terms, not of the haircut.</b></p></div>
<div class="example korporat"><div class="lbl">🏢 Scenario C — Liquidation (waterfall)</div>
<p>Already computed above: net proceeds Rp12.98tn vs bank claims Rp23.89tn → equity = <b>Rp0</b>. This is the scenario if the company is sold today.</p></div>
<div class="callout"><b>Why three scenarios?</b> Because "a 30% haircut" alone <b>does not answer</b> who owns the new equity. A haircut = an accounting event (liabilities fall). Ownership = a legal event (shares issued to whom, how many, at what valuation). Mixing the two = the most common conceptual error in distressed analysis.</p></div>
<div class="callout"><b>Policy context:</b> Danantara holds 74.6%, the Hutama Karya merger is <b>delayed</b> (cleanup first), the Rp3tn PMN was <b>cancelled</b> (Gov. Reg. 20/2025) — the state isn't injecting; creditors bear it.</p></div>
<div class="example jebakan"><div class="lbl">🚫 The "turnaround" trap</div>
<p>"Eight recovery initiatives, 63 projects worth Rp31.7tn — it must rebound!" Maybe. But the credit analyst asks first: <i>with finance costs of Rp2.79tn per 9 months vs FY25 gross profit of Rp1.58tn for the full year — <b>9 months of interest EXCEEDS a full year of gross profit</b> — where does the cash to pay it come from?</i> New projects don't pay old interest.</p></div>`},
{h: "Practice task", body: `
<p>Build WSKT's liquidation waterfall in the practice workbook: organize the as-is (messy) financial data into proceeds per asset class (cash, receivables, toll, fixed assets) → subtract liquidation costs → distribute by seniority → bank recovery rate → leftover for bonds/vendors → leftover for equity. Then do the <b>restructuring scenario</b>: 30% haircut on Tranche B → new mechanical equity → old equity value. Every answer cell must be formulas linking to data/assumptions.</p>
<div class="callout"><b>Why does this task matter?</b> This is the only case in the course that <b>forbids you from thinking like a shareholder</b>. Master the waterfall once — and you'll never again be fooled by a "cheap" stock with negative equity.</p></div>`},
{h: "🔥 Hell Mode briefing", body: `
<ul>
<li><b>Waterfall</b> = distributing liquidation proceeds by claim seniority.</li>
<li><b>Seniority</b> = liquidation costs → secured creditors → unsecured → equity.</li>
<li><b>Recovery rate</b> = funds received ÷ claim.</li>
<li><b>Negative equity</b> = equity multiples undefined; think like a creditor.</li>
<li><b>Haircut</b> = principal reduction; lifts book equity mechanically. WHO owns the new equity depends on the scenario (forgiveness / swap with terms / liquidation) — not automatically the creditors.</li>
<li><b>Suspension price</b> = a fossil, not a valuation signal.</li>
</ul>`}
],
quiz: [
{q: `WSKT's equity at 30 Sep 2026 = −Rp3.34tn. Why are P/E and P/BV meaningless?`, opts: ["Because the data is unaudited","Negative equity — the denominator is meaningless","Because the shares are suspended","Because the loss is too large"], answer: 1, k: "distressed",
 hints: ["P/BV = price ÷ book value per share.","Negative book value → the quotient can't be interpreted."],
 explain: `Negative book value makes P/BV (and P/E on a loss) economically undefined — not 'cheap', but a tool that doesn't apply.`},
{q: `In a distressed analysis like WSKT, the analyst thinks like a?`, opts: ["The majority shareholder","A creditor — who gets paid first","Management — the turnaround strategy","The regulator — compliance matters"], answer: 1, k: "distressed",
 hints: ["Who gets paid first when assets are sold?","Shareholders get leftovers — if any."],
 explain: `In distress, claim priority decides everything. The analyst values creditor recovery first; equity = the remainder.`},
{q: `Net proceeds Rp12.98tn, bank claims (Tranches A+B) Rp23.89tn. The bank creditors' recovery rate?`, opts: ["100% — banks always get paid in full","54.3%","12.98%","0% — equity comes first"], answer: 1, k: "waterfall",
 hints: ["Recovery rate = funds received ÷ claim.","MIN(12.98; 23.89) ÷ 23.89 = ?"],
 explain: `Banks receive MIN(12.98; 23.89) = Rp12.98tn → 12.98 ÷ 23.89 = 54.3%. Seniority guarantees order, not full payment.`},
{q: `The correct waterfall payment order?`, opts: ["Equity → banks → vendors → costs","Liquidation costs → secured creditors → unsecured → equity","Vendors → equity → banks","All creditors split equally"], answer: 1, k: "seniority",
 hints: ["Who must be paid for the asset sale to happen at all?","Where does equity stand? First or last?"],
 explain: `Liquidation costs first (no curator, no sale), then secured creditors, unsecured, equity last. Seniority = law, not opinion.`},
{q: `9M26 finance costs Rp2.79tn vs FY25 gross profit Rp1.58tn. That means?`, opts: ["9 months of interest > a full year of gross profit — structural bleeding","The company is nearly breaking even","Gross profit covers the interest bill","Finance costs fell dramatically"], answer: 0, k: "distressed",
 hints: ["Compare 2.79 (9 months) vs 1.58 (12 months).","Can gross profit pay the interest?"],
 explain: `Nine months of interest (Rp2.79tn) exceeds a full year of gross profit (Rp1.58tn) — operations can't cover the debt cost. That's the 'bleeding'.`},
{q: `A 30% haircut on Tranche B Rp21.736tn. Mechanical post-haircut equity?`, opts: ["Stays −Rp3.34tn","−Rp9.86tn","−Rp3.34tn + Rp6.52tn = +Rp3.18tn","Exactly Rp0"], answer: 2, k: "haircut",
 hints: ["30% haircut × 21.736 = ?","Liabilities fall → equity (assets − liabilities) rises by that much."],
 explain: `Haircut = 21.736 × 30% = Rp6.52tn. Liabilities fall Rp6.52tn → mechanical equity = −3.34 + 6.52 = +Rp3.18tn. But WHO owns it depends on the scenario: pure forgiveness → old holders; debt-for-equity swap → depends on terms (share count & valuation); liquidation → Rp0. (Real-09 § Three different scenarios)`},
{q: `Shares suspended at Rp202 since May 2023. Why is Rp202 NOT a 'cheap' signal?`, opts: ["Because Rp202 is actually too expensive","The price is frozen 3.5 years — no price discovery","Because Danantara holds 74.6%","Because the minimum buy is 1 lot"], answer: 1, k: "distressed",
 hints: ["When was that price last formed? May 2023.","What happened since? A −Rp4.48tn loss, negative equity, the MRA."],
 explain: `Rp202 is a fossil — the last price before suspension, reflecting none of 3.5 years of bad news. A suspended share = a share with no market, not a cheap share.`}
],
hell: [
{q: `Liquidation costs rise 5% → 10%. The bank recovery rate becomes?`, opts: ["Stays 54.3%","51.4%","48.9%","45.0%"], answer: 1,
 explain: `Net proceeds = 13.66 × 90% = Rp12.29tn → 12.29 ÷ 23.89 = 51.4%. Liquidation costs eat creditor recovery first — equity stays zero.`},
{q: `Receivables recovery falls 40% → 20%. The bank recovery rate becomes?`, opts: ["Stays 54.3%","51.4%","48.9%","0%"], answer: 2,
 explain: `Receivables recovery = 6.90 × 20% = Rp1.38tn → proceeds Rp12.28tn → net Rp11.67tn → 11.67 ÷ 23.89 = 48.9%. Recovery assumptions hit creditors directly.`},
{q: `Creditors convert Rp5tn of debt into new shares. What happens to old shareholders?`, opts: ["They stay the majority","Diluted to near zero — their claim's fair value = Rp0","They actually profit as debt falls","They're unaffected"], answer: 1,
 explain: `Converting Rp5tn of debt into new shares = a debt-for-equity swap. Old holders' fate depends on TERMS: how many new shares are issued & at what valuation. The waterfall proved the old equity claim = Rp0, so in practice creditors will demand majority of the new shares — but 'dilution' is not automatic; it's a negotiated outcome. (Real-09 § Three different scenarios)`},
{q: `Post-haircut book equity is +Rp3.18tn, but 'old equity value = Rp0'. A contradiction?`, opts: ["Yes — one of them is miscalculated","No: book equity ≠ value for old holders","No: haircuts don't affect equity","Yes — the waterfall is wrong"], answer: 1,
 explain: `No contradiction — but the answer depends on the scenario. Pure forgiveness: +Rp3.18tn belongs to old holders (no new shares). Debt-for-equity swap: belongs to whoever holds the new shares per the terms. What's certain: book equity rises mechanically as liabilities fall; ownership is set by the CONVERSION documents, not by haircut arithmetic. (Real-09 § Three different scenarios)`},
{q: `Why is a going-concern DCF invalid for WSKT?`, opts: ["Because WACC can't be computed","The going-concern assumption is broken; equity = an out-of-the-money option on assets","Because revenue fell 17%","Because no data is available"], answer: 1,
 explain: `A DCF needs going concern. With a Rp20.8tn deficit and an idSD rating, equity is economically an option on assets after creditors are paid — and that option is deep out-of-the-money. But remember: distress ≠ automatic liquidation. Proper valuation = probability-weighted (restructuring vs liquidation); the waterfall = its liquidation component. (Real-09 § Why a waterfall, not a DCF?)`}
],
tasks: [
{t: "Task A — WSKT liquidation waterfall (±4 hrs)", d: "Download the RC9 workbook. Organize the as-is financial data into a waterfall: proceeds per asset class → liquidation costs → seniority distribution → bank recovery rate → leftover for bonds/vendors → leftover for equity. Then the restructuring scenarios: distinguish (a) pure 30% forgiveness on Tranche B, (b) debt-for-equity swap WITH explicit terms (share count & valuation), (c) liquidation. All formulas link to data/assumptions.", url: "https://drive.google.com/drive/folders/1A8U9qMg7d5s1dxJca9ZzHjalV8hRu6YT"},
{t: "Task B — Assumption stress test (±1 hr)", d: "In your answer file: change toll recovery 45%→30%, note the new bank recovery rate. Change liquidation costs 5%→10%, note again. Write 2 sentences: which assumption is most dangerous for creditors? For equity?", url: ""},
{t: "Task C — The quiz above", d: "Target ≥6/7 correct.", url: ""}
],
blind: {h: "Speed Drill — different numbers", body: `
<p><b>1.</b> Proceeds Rp10tn, 5% liquidation costs, bank claims Rp20tn. Bank recovery rate = ?</p>
<details class="ans"><summary>Answer</summary><p>Net = 9.5. Rate = 9.5 ÷ 20 = 47.5%.</p></details>
<p><b>2.</b> Tranche B Rp21.736tn takes a 50% haircut. Remaining Tranche B = ?</p>
<details class="ans"><summary>Answer</summary><p>21.736 × 50% = Rp10.868tn.</p></details>`}
};
LESSONS_REAL.forEach(function(l){ if (EN[l.id]) l.en = EN[l.id]; });
})();

/* EN mission overlay for real-03 (forensic mission title/desc) */
(function(){
  const R3 = LESSONS_REAL.find(function(l){ return l.id === "real-03"; });
  if (R3 && R3.en && R3.mission) R3.en.mission = {file: R3.mission.file, key: "indf",
    title: "🕵️ Forensic Mission \u2014 The Junior Analyst's Model (broken)",
    desc: "You've received an INDF valuation model built by a 'junior analyst'. This file was <b>deliberately broken in 5 places</b>: NCI not subtracted, interest typed manually, flipped \u0394WC sign, double-counted capex, and a fake 'OK' balance check. Your mission: <b>find \u2192 explain why it's wrong \u2192 fix with formulas \u2192 upload the result</b>."};
})();
