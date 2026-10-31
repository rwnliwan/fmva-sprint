/* FMVA Sprint — 5 Guided Real Cases (flagship) */
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
<div class="callout"><b>Kenapa DCF 3 skenario, bukan 1 angka?</b> Karena satu angka = satu tebakan yang disamarkan sebagai presisi. Tiga skenario (Bear/Base/Bull) memetakan <b>ruang kemungkinan</b> — dan keputusan investasi lahir dari membandingkan harga pasar dengan ruang itu, bukan dari satu angka "target price".</p>`},
{h: "Kenapa FCFF, bukan laba bersih?", body: `
<div class="formula">FCFF = NOPAT × (1 − tingkat reinvestasi)</div>
<p><b>NOPAT</b> = EBIT × (1 − pajak): laba operasi seolah tanpa utang. Dari sini, kurangi <b>reinvestasi</b> (capex + modal kerja yang menyerap kas) → dapat <b>FCFF</b>: kas yang benar-benar bisa diambil semua pemodal.</p>
<div class="example jebakan"><div class="lbl">🚫 Jebakan laba bersih</div>
<p>UNVR 2025: net income Rp7,64T <b>lebih tinggi</b> dari 2022 (Rp5,36T) padahal revenue turun 22%! Laba bersih dipengaruhi pos non-operasi & non-kas. DCF yang memakai NI mentah sedang menilai <b>akuntansi</b>, bukan <b>kas</b>.</p></div>
<div class="callout"><b>⚠️ One-off di dalam Rp7,64T itu:</b> angka headline <b>mencakup keuntungan penjualan bisnis es krim</b> (discontinued operations). Laba dari <b>operasi berlanjut (continuing operations) hanya Rp3,5T</b> (press release Unilever, 12 Feb 2026). Pelajaran untuk pemula: angka headline bisa membuat bisnis terlihat <i>lebih</i> menguntungkan dari operasi yang sebenarnya berjalan — selalu tanya <b>"laba dari apa?"</b> sebelum memakai NI untuk valuasi.</div>
<div class="callout"><b>Kenapa reinvestasi 25% dari NOPAT?</b> Perusahaan tidak bisa membagikan seluruh NOPAT — sebagian harus kembali jadi capex dan modal kerja agar mesin tetap jalan. 25% adalah asumsi ilustratif (bukan angka audit): yang penting ia <b>ada dan eksplisit</b>, bukan disembunyikan.</p>`},
{h: "Kenapa terminal value mendominasi?", body: `
<div class="formula">TV = FCFF_2030 × (1+g) / (WACC − g)</div>
<p>Hasil Base: <b>PV FCFF 2026–2030 = Rp12,05T</b>, tapi <b>terminal value = Rp51,39T</b> (PV-nya Rp31,91T). Lebih dari 70% nilai DCF datang dari terminal value — rumus Gordon yang mengasumsikan perusahaan tumbuh 3% <b>selamanya</b>.</p>
<div class="callout"><b>Kenapa ini penting?</b> Karena artinya DCF-mu <b>sangat sensitif</b> pada dua angka kecil: WACC dan g terminal. Naikkan WACC 10%→11%, nilai anjlok. Analis yang tidak melakukan <b>analisis sensitivitas</b> pada dua angka ini sedang membangun istana di atas asumsi yang tidak pernah ia uji.</p>`},
{h: "Kenapa Bear/Base/Bull berbeda?", body: `
<p>Tiga skenario berbeda di <b>dua tuas</b>: kecepatan pemulihan revenue (g 2,5% / 4,5% / 6%) dan normalisasi margin EBIT (12% / 15% / 17%). Margin Bull 17% bukan angka ngawur — <b>margin EBIT 2022 (sebelum boikot) adalah 17,2%</b>: Bull = "kembali ke level historis".</p>
<div class="example korporat"><div class="lbl">🏢 Hasilnya</div>
<p>Nilai/saham: <b>Bear Rp984 · Base Rp1.291 · Bull Rp1.531</b>. Harga pasar Rp1.390 (yfinance, Okt 2026) duduk di antara Base dan Bull — pasar sudah mem-price-in <b>pemulihan moderat</b>. Upside Base −7,1%: model ini TIDAK berteriak "beli".</p></div>
<div class="callout"><b>Kenapa normalisasi one-off?</b> Biaya transformasi & severance 4Q24 adalah pos sekali jalan — kalau ikut diproyeksikan selamanya, kamu menghukum perusahaan untuk biaya yang tidak akan berulang. Normalisasi = membersihkan data sebelum memproyeksikan.</p>`},
{h: "Tugas praktik", body: `
<p>Bangun DCF 3 skenario UNVR di workbook latihan: proyeksikan revenue & FCFF 2026–2030 per skenario, hitung PV, terminal value, EV → equity → nilai per saham → upside. Semua sel jawaban harus rumus yang me-link ke asumsi — ubah g Base jadi 6% dan lihat seluruh model ikut berubah.</p>
<div class="callout"><b>Kenapa tugas ini penting?</b> Ini DCF pertamamu atas perusahaan nyata. Rasakan betapa <b>rapuhnya</b> satu angka valuasi — dan betapa <b>kuatnya</b> rentang skenario sebagai alat berpikir.</p>`},
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
<div class="callout"><b>Kenapa SOTP, bukan DCF konsolidasi?</b> DCF konsolidasi memakai satu WACC dan satu growth untuk 7 bisnis berbeda — itu seperti menilai harga 7 rumah dengan satu harga per meter. <b>Sum-of-the-parts (SOTP)</b> menilai tiap segmen dengan multiple-nya sendiri, lalu menjumlahkan. Inilah cara analis profesional menilai konglomerat.</p>`},
{h: "Kenapa multiple tiap segmen beda?", body: `
<div class="formula">EV segmen = EBIT segmen × multiple EV/EBIT segmen</div>
<p>Multiple mencerminkan <b>kualitas laba</b>: jasa keuangan (arus kas stabil, 7×) vs alat berat (siklikal komoditas, 4,5×) vs IT (tumbuh cepat, 10×). Multiple yang sama untuk semua segmen = mengasumsikan semua bisnis sama menariknya — jelas salah.</p>
<div class="example korporat"><div class="lbl">🏢 Contoh</div>
<p>Otomotif: 35% × Rp53,02T × 5 = <b>Rp92,78T</b> — kontributor EV terbesar. Properti: 3% × Rp53,02T × 7 = Rp11,13T. Total 7 segmen = <b>Rp306,18T</b>.</p></div>
<div class="callout"><b>Kenapa porsi & multiple-nya ilustratif?</b> Angka segmen rinci ada di annual report; di sini disederhanakan agar fokusmu ke <b>mekanik SOTP</b> — bukan menghafal angka. Asumsi boleh diganti; yang dinilai caramu berpikir, bukan ketepatan tebakan.</p>`},
{h: "Kenapa dikurangi net debt?", body: `
<div class="formula">Equity = EV SOTP − Net Debt</div>
<p>EV (enterprise value) = nilai untuk <b>semua pemodal</b> (saham + kreditur). Untuk dapat nilai <b>pemegang saham</b>, kurangi utang bersih: Rp110,30T − Rp52,62T = <b>Rp57,68T</b>. Equity SOTP = 306,18 − 57,68 = <b>Rp248,50T</b> → Rp6.261/saham.</p>
<div class="example jebakan"><div class="lbl">🚫 Bug klasik</div>
<p>Lupa kurangi net debt = mengklaim kas kreditur sebagai milik pemegang saham. Atau lebih halus: memakai <i>gross debt</i> tanpa kurangi kas — padahal kas bisa dipakai melunasi utang. Selalu <b>net</b>.</p></div>`},
{h: "Kenapa ada diskon konglomerat?", body: `
<p>Nilai SOTP Rp6.261 vs harga pasar Rp4.800 (yfinance, Okt 2026) → <b>diskon 23,3%</b>. Pasar menilai Astra lebih murah dari jumlah bagian-bagiannya. Ini bukan kesalahan pasar yang otomatis = peluang — ini <b>pertanyaan</b>.</p>
<div class="callout"><b>Kenapa pasar memberi diskon?</b> Kandidat penjelasan: inefisiensi alokasi modal antar segmen, tata kelola konglomerasi, segmen siklikal (alat berat/tambang) yang sedang di puncak siklus, atau sekadar sentimen. Tugas analis: <b>menjelaskan gap</b>, bukan mengasumsikan pasar bodoh. Kadang diskonnya beralasan — kadang itulah peluangmu.</p>`},
{h: "Tugas praktik", body: `
<p>Bangun SOTP Astra: alokasikan EBIT ke 7 segmen (porsi × multiple), jumlahkan → EV SOTP → kurangi net debt → equity → nilai/saham → diskon konglomerat. Lalu uji: ubah multiple jasa keuangan 7→5 — seberapa besar nilai/saham bergerak?</p>
<div class="callout"><b>Kenapa tugas ini penting?</b> SOTP adalah senjata analis ekuitas untuk holding & konglomerat — struktur yang sangat umum di Indonesia (Astra, Lippo, Bakrie, Sinar Mas). Kuasai polanya sekali, pakai selamanya.</p>`},
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
sub: "Real Case 3 · ±6 jam · Debt schedule + MISI FORENSIK",
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
<div class="callout"><b>Kenapa leverage + NCI = ladang error?</b> Karena keduanya "tidak terlihat" di permukaan: utang bersembunyi di balik jadwal, NCI bersembunyi di balik angka ekuitas total. Analis junior (dan model AI) paling sering terpeleset di dua tempat ini. Makanya case ini punya <b>twist forensik</b>: kamu tidak membangun model — kamu <b>mengaudit</b> model orang.</p>`},
{h: "Kenapa NCI harus dikurangkan?", body: `
<div class="formula">Ekuitas induk = Total ekuitas − NCI</div>
<p><b>NCI (non-controlling interest)</b> = bagian ekuitas anak usaha yang dimiliki pihak lain. Indofood tidak memiliki 100% semua anak usahanya — Rp47,09T dari Rp120,24T ekuitas adalah milik minoritas. Valuasi saham INDF hanya boleh memakai <b>Rp73,15T</b>.</p>
<div class="example jebakan"><div class="lbl">🚫 Error #1 — NCI dilupakan</div>
<p>Model junior: Ekuitas induk = Rp120,24T (total!). Overstate Rp47,09T ≈ <b>Rp5.364/saham</b> — lebih besar dari harga… eh, dari sebagian harga sahamnya (Rp6.400). Satu baris yang lupa = valuasi hancur.</p></div>`},
{h: "Kenapa bunga harus link ke debt schedule?", body: `
<div class="formula">Beban bunga = Utang AWAL × tarif = 74,96 × 6% = Rp4,50T</div>
<p>Bunga berjalan dari <b>saldo awal</b> utang (prinsip debt schedule Hari 03/Fondasi C): uang dipinjam dulu, bunga dihitung dari situ. Model junior mengetik <b>Rp3,00T</b> manual — angka yang tidak bisa dilacak asal-usulnya dan tidak ikut berubah kalau asumsi utang berubah.</p>
<div class="callout"><b>Kenapa ini masalah besar?</b> Bukan soal selisih Rp1,5T — tapi soal <b>jejak audit</b>. Angka ketik adalah jalan buntu: 6 bulan lagi tidak ada yang tahu dari mana Rp3,00T itu datang. Rumus yang me-link = dokumentasi yang hidup.</p>`},
{h: "Kenapa tanda ΔWC & double capex fatal?", body: `
<p><b>Error #3 — tanda ΔWC terbalik:</b> ΔWC +Rp2,1T artinya kas <b>tertahan</b> di modal kerja → harus <b>dikurangkan</b> dari FCFF. Model junior malah <b>menambahkannya</b>: FCFF Rp20,10T vs benar Rp15,90T (overstate 26%).</p>
<p><b>Error #4 — capex double-count:</b> capex Rp10T dikurangi sekali di FCFF, lalu dikurangi <b>lagi</b> di "FCFF final": Rp10,10T. Kesalahan mekanik murni — tidak ada hubungannya dengan bisnis, tapi valuasinya runtuh.</p>
<div class="callout"><b>Kenapa dua error ini satu paket?</b> Karena keduanya soal <b>disiplin tanda dan alur</b>: kas masuk vs kas keluar, sekali vs dua kali. 80% bug model bukan soal teori valuasi — soal aritmetika yang ceroboh.</p>`},
{h: "Kenapa 'OK' palsu paling berbahaya?", body: `
<p><b>Error #5:</b> sel "Selisih A − (L+E)" diketik <b>0</b> — terlihat "balance ✅". Padahal itu bukan hasil perhitungan, melainkan <b>ketikan yang mematikan alarm</b>. Neraca yang tidak balance adalah sinyal ada link putus; mengetik 0 = mencabut kabel alarm kebakaran lalu tidur nyenyak.</p>
<div class="callout"><b>Kenapa ini skill termahal?</b> Model yang salah tapi terlihat benar lebih berbahaya dari model yang jelas rusak. Auditor forensik tidak mencari "angka yang salah" — ia mencari <b>angka yang terlalu rapi untuk jadi kebetulan</b>.</p>
<div class="callout"><b>⚠️ Toleransi rounding itu eksplisit:</b> input case ini dibulatkan (Rp120,24T, Rp47,09T, dst.) — jadi selisih balance check yang <b>kecil (±0,01)</b> adalah <b>noise pembulatan, bukan error</b>. Checker misi memakai toleransi ±0,5 untuk sel ini. Bedakan: residual kecil dari input rounded = wajar; selisih BESAR atau ketikan "0" = alarm beneran. Analis yang baik menyatakan toleransinya, bukan berpura-pura presisi sempurna.</div>`},
{h: "Tugas praktik", body: `
<p>Unduh file misi (model junior yang rusak). Audit 5 titik, perbaiki semuanya dengan <b>rumus</b> (angka ketik yang benar pun tetap gagal — misi menuntut perbaikan aktual), pastikan balance check adalah rumus asli, lalu upload ke Misi Forensik di bawah.</p>
<div class="callout"><b>Kenapa tugas ini penting?</b> Di dunia kerja, kamu lebih sering <b>mewarisi</b> model daripada membangun dari nol. Kemampuan membaca model orang, menemukan bug, dan memperbaikinya = skill analis senior.</p>`},
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
<div class="callout"><b>Kenapa reverse-DCF?</b> DCF biasa: asumsi → nilai. <b>Reverse-DCF</b>: harga pasar → asumsi yang <i>harus</i> benar agar harga itu masuk akal. Ia tidak bilang "mahal/murah" — ia bilang <b>"pasar sedang bertaruh pada X; percayakah kamu pada X?"</b> Ini senjata analis untuk saham growth yang tidak bisa dinilai cara biasa.</p>`},
{h: "Kenapa pertanyaannya 'berapa g'?", body: `
<div class="formula">Cari g sehingga DCF(g) = harga pasar</div>
<p>Model: revenue 10 tahun tumbuh g per tahun, margin EBIT ternormalisasi 12%, pajak 21%, reinvestasi 30%, WACC 9%, g terminal 3%. Hasil trial: g=8% → <b>$42</b>; g=12% → <b>$57</b>; g=16% → <b>$78</b>. Harga pasar: <b>$399,81</b>.</p>
<div class="example jebakan"><div class="lbl">🚫 Bahkan 16% tidak dekat</div>
<p>CAGR 16% selama 10 tahun = revenue naik <b>4,4× lipat</b> — itu sudah skenario heroik. Nilainya $78, masih <b>80% di bawah</b> harga pasar. Jadi pasar membayar untuk sesuatu yang JAUH lebih gila dari 16%/tahun.</p></div>`},
{h: "Kenapa jawabannya 38,7%?", body: `
<p>Goal seek: ubah sel <b>"g (input — coba-coba / goal seek)"</b> sampai sel <b>"Nilai/saham (g=input)" = $399,81</b> (Data → Goal Seek, atau trial-error manual). Jawaban: <b>g ≈ 38,7% per tahun selama 10 tahun</b>. Artinya revenue 2035 = 94,83 × (1,387)^10 ≈ <b>$2,5 triliun</b> — 26× lipat, lebih besar dari PDB kebanyakan negara.</p>
<div class="callout"><b>Kenapa ini BUKAN vonis "Tesla kemahalan"?</b> Karena model ini hanya menilai <b>bisnis inti</b> (jualan mobil + energi). Pasar mungkin membayar untuk <b>opsi</b>: robotaxi, Optimus, AI. Reverse-DCF memisahkan dua hal itu dengan bersih: <i>bisnis inti butuh keajaiban 38,7% — sisanya adalah harga opsi</i>. Tugasmu menilai apakah opsi itu worth $1,2T.</p>`},
{h: "Kenapa margin 'ternormalisasi' 12%?", body: `
<p>Margin EBIT Tesla runtuh (perang harga EV). Memakai margin 2025 yang tertekan untuk 10 tahun = mengasumsikan perang harga <b>selamanya</b>. 12% adalah asumsi ilustratif "kembali ke kewarasan" — <b>eksplisit dan bisa diperdebatkan</b>, bukan disembunyikan.</p>
<div class="callout"><b>Kenapa ini pelajaran penting?</b> Setiap DCF growth mengandung dua taruhan: <b>pertumbuhan</b> DAN <b>profitabilitas</b>. Analis amatir hanya mainkan g; analis profesional menguji keduanya. Coba di filemu: margin 15% → g implied turun ke berapa?</p>`},
{h: "Tugas praktik", body: `
<p>Bangun reverse-DCF Tesla: proyeksikan revenue & FCFF 10 tahun untuk g = 8%, 12%, 16% → nilai/saham tiap skenario. Lalu di blok <b>REVERSE-DCF</b>: <b>goal seek</b> — ubah sel "g (input — coba-coba / goal seek)" sampai "Nilai/saham (g=input)" = $399,81 (Excel/Sheets: Data → Goal Seek, atau coba-coba manual sambil lihat nilainya bergerak). Ketik jawaban g implied-mu — checker menilai angkanya.</p>
<div class="callout"><b>Kenapa tugas ini penting?</b> Ini cara berpikir "outside-in": mulai dari harga, mundur ke ekspektasi. Untuk setiap saham growth yang kamu temui seumur hidup, pertanyaan pertamamu seharusnya: <i>"apa yang sudah di-price-in?"</i></p>`},
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
<div class="callout"><b>Kenapa ini pola wajib dikenal?</b> Setiap bisnis infrastruktur (telekomunikasi, tol, listrik) hidup dalam <b>siklus capex</b>: bangun (FCF tertekan) → panen (FCF mengembang) → bangun lagi (5G, data center). Analis yang hanya melihat laba bersih tidak pernah melihat siklusnya.</p>`},
{h: "Kenapa FCF, bukan laba bersih?", body: `
<div class="formula">FCF = OCF − Capex</div>
<p>Net income TLKM 2025 Rp17,49T — tapi <b>FCF Rp38,04T</b>, lebih dari 2× lipat! Selisihnya = D&A raksasa (aset jaringan disusutkan, tapi kas tidak keluar) dikurangi capex. Untuk perusahaan infrastruktur, <b>FCF adalah angka kebenaran</b>; laba bersih adalah angka akuntansi.</p>
<div class="callout"><b>📋 Status data:</b> net income Rp17,49T & saham 98,58 miliar = <b>input ilustratif pengajaran</b>. Terverifikasi (31 Okt 2026): laba attributable FY2025 <b>Rp17,81T</b> (Telkom Annual Report); saham beredar <b>±99,05 miliar</b> per 31 Des 2025 (di luar treasury). Selisih &lt;2% — tidak mengubah pelajaran jembatan capex→FCF.</div>
<div class="example korporat"><div class="lbl">🏢 Jembatan 2022 → 2025</div>
<p>OCF 2022 Rp73,35T > OCF 2025 Rp63,84T — operasi "melemah". Tapi capex 2022 Rp38,3T vs 2025 Rp25,8T → <b>FCF justru naik</b> Rp35,05T → Rp38,04T. Narasi "kinerja turun" dari OCF terbantahkan oleh FCF.</p></div>`},
{h: "Kenapa dua skenario capex?", body: `
<p><b>Panen</b> (capex tetap hemat Rp25,8T): FCF 2026 Rp39,32T → DCF Rp4.015/saham. <b>Wave 5G</b> (capex naik lagi ke Rp34T): FCF 2026 Rp31,12T → DCF Rp3.092/saham. Satu asumsi capex = selisih valuasi <b>Rp923/saham</b>.</p>
<div class="callout"><b>Presisi: "tumbuh 2%" itu untuk apa?</b> Di model ini g +2%/tahun dipakai <b>dua kali</b>: menumbuhkan OCF 2025→2026, lalu menumbuhkan <b>FCF 2027–2030 dari basis 2026</b> (capex konstan per skenario). Jadi label yang tepat = <b>"FCF tumbuh 2%"</b> — bukan "OCF tumbuh 2% + capex konstan" (itu akan memberi jalur FCF yang sedikit berbeda). Bedanya kecil di sini, tapi analis presisi tidak mencampur keduanya.</div>
<div class="callout"><b>Kenapa ini inti case-nya?</b> Karena untuk bisnis infrastruktur, <b>capex adalah variabel valuasi terpenting</b> — lebih penting dari growth revenue. Analis Telkom yang tidak punya pandangan soal siklus capex (kapan wave 5G/data center datang) tidak punya pandangan apa-apa.</p>`},
{h: "Kenapa DCF bilang Rp4.015 tapi pasar Rp1.980?", body: `
<p>Ini <b>gap terbesar</b> di semua 5 case: DCF mekanis (WACC 11%, g 2%) bilang Rp4.015 — pasar bilang Rp1.980. FCF yield 2025 = <b>19,5%</b>: tiap Rp100 harga didukung Rp19,5 FCF tahunan. Di kertas: murah luar biasa.</p>
<div class="callout"><b>Kenapa pasar tidak percaya?</b> Kandidat: risiko BUMN (intervensi, dividen dipaksa), regulasi tarif, kompetisi seluler, keraguan capex 5G akan melahap FCF lagi. <b>Pelajaran termahal course ini:</b> valuasi = angka + penilaian risiko yang <b>tidak ada di spreadsheet</b>. DCF yang mengabaikan gap ini bukan analisis — itu kalkulator.</p>`},
{h: "Tugas praktik", body: `
<p>Bangun jembatan capex → FCF Telkom 2022–2025, lalu DCF 2 skenario (Panen vs Wave 5G): FCF 2026–2030, PV, EV → equity → nilai/saham → FCF yield. Terakhir: tulis 3 kalimat menjelaskan gap Rp4.015 vs Rp1.980 menurut versimu.</p>
<div class="callout"><b>Kenapa tugas ini penting?</b> Ini case penutup — sintesis segalanya: baca data riil, bangun mekanik, hadapi gap vs pasar dengan jujur. Analis hebat tidak menjual angka; ia menjual <b>penjelasan</b>.</p>`},
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
}
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
<div class="callout"><b>⚠️ Rounding tolerance is explicit:</b> this case's inputs are rounded (Rp120.24T, Rp47.09T, etc.) — so a <b>tiny (±0.01)</b> balance-check residual is <b>rounding noise, not an error</b>. The mission checker uses a ±0.5 tolerance for this cell. Distinguish: small residual from rounded inputs = fine; a LARGE gap or a typed "0" = a real alarm. A good analyst states their tolerance instead of pretending perfect precision.</div></div>`},
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
LESSONS_REAL.forEach(function(l){ if (EN[l.id]) l.en = EN[l.id]; });
})();

/* EN mission overlay for real-03 (forensic mission title/desc) */
(function(){
  const R3 = LESSONS_REAL.find(function(l){ return l.id === "real-03"; });
  if (R3 && R3.en && R3.mission) R3.en.mission = {file: R3.mission.file, key: "indf",
    title: "🕵️ Forensic Mission \u2014 The Junior Analyst's Model (broken)",
    desc: "You've received an INDF valuation model built by a 'junior analyst'. This file was <b>deliberately broken in 5 places</b>: NCI not subtracted, interest typed manually, flipped \u0394WC sign, double-counted capex, and a fake 'OK' balance check. Your mission: <b>find \u2192 explain why it's wrong \u2192 fix with formulas \u2192 upload the result</b>."};
})();
