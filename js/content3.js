/* FMVA Sprint — Track Excel Basic → Advance (4 level) */
const LESSONS_EXCEL = [
{
id: "excel-l1", track: "Excel", title: "Excel Basic: Rumus Inti & Referensi",
sub: "Excel L1 · ±4 jam · Fondasi semua workbook",
est: "4 jam",
prerequisites: ["hardcode_rule"],
driveFolder: "https://drive.google.com/drive/folders/1ZemMXTh95PAjLRZc_kSY2MDJOuywblrt",
audio: "assets/audio/excel-l1.mp3",
checker: "excel-l1",
sections: [
{h: "Kenapa SUM/AVERAGE/COUNT adalah 80% pekerjaan", body: `
<p>Buka model profesional mana pun: mayoritas rumusnya hanya <b>SUM</b>, <b>AVERAGE</b>, <b>COUNT</b>/<b>COUNTIF</b>, dan <b>IF</b>. Sisanya bumbu. Analis yang lambat biasanya bukan kurang tahu fungsi eksotis — tapi belum refleks memakai yang dasar.</p>
<div class="formula">=SUMPRODUCT(Qty, Harga) = Σ (Qty × Harga)</div>
<p><b>SUMPRODUCT</b> adalah senjata rahasia level basic: menjumlahkan hasil kali dua kolom tanpa kolom bantu. Total penjualan = SUMPRODUCT(qty, harga), bukan ngetik satu-satu.</p>
<div class="example warung"><div class="lbl">🏪 Contoh</div>
<p>8 transaksi warung: =SUMPRODUCT(C6:C13, D6:D13) langsung dapat Rp858rb. Alternatif kampungan: bikin kolom "Subtotal" dulu lalu SUM — boleh, tapi dua langkah untuk satu jawaban.</p></div>
<div class="callout"><b>Kenapa ini fondasi?</b> Karena pola pikirnya sama di semua level: <b>biarkan Excel yang menjumlahkan, kamu yang menentukan logikanya</b>. Analis yang mengetik subtotal manual sedang memindahkan pekerjaan mesin ke tangannya sendiri.</div>`},
{h: "IF: keputusan pertama", body: `
<div class="formula">=IF(kondisi, nilai_jika_benar, nilai_jika_salah)</div>
<p>IF adalah logika pertama dan tersering: bonus hanya jika target tercapai, pajak hanya jika laba positif, kategori hanya jika ambang terlampaui.</p>
<div class="example warung"><div class="lbl">🏪 Contoh</div>
<p>=IF(Total>=100, 50, 0) — bonus Rp50rb jika total ≥ Rp100rb. Kondisinya menghasilkan TRUE/FALSE; IF memilih cabang.</p></div>
<div class="callout"><b>Kenapa IF dulu, bukan yang lain?</b> Karena hampir semua aturan bisnis berbentuk "jika-maka". Kuasai IF sampai refleks — nanti IFS, AND/OR, dan IFERROR semuanya menempel di pola yang sama. Bau tidak enak: IF bertingkat 4+ — itu sinyal pakai IFS atau tabel lookup.</div>`},
{h: "$: referensi absolut vs relatif", body: `
<p>Copy rumus ke bawah: referensi <b>relatif</b> (B10) ikut bergeser; referensi <b>absolut</b> ($B$10) terkunci. Tombol <b>F4</b> memutar $ saat edit rumus.</p>
<div class="formula">=B20*(1-$B$15) → diskon di $B$15 tidak ikut "jalan"</div>
<div class="example jebakan"><div class="lbl">🚫 Bug #1 sejuta umat</div>
<p>=B20*(1-B15) di-copy ke bawah jadi =B21*(1-B16), =B22*(1-B17) — diskonnya "jalan" mengikuti baris, padahal diskon cuma satu sel. Hasilnya ngaco diam-diam, tidak ada error merah. Inilah bug paling mahal di Excel: <b>salah tapi terlihat benar</b>.</p></div>
<div class="callout"><b>Kenapa ini krusial untuk modeling?</b> Karena model = ratusan rumus yang di-copy. Satu $ yang lupa = satu asumsi yang bocor ke mana-mana. Aturan praktis: <b>referensi ke sel asumsi/input selalu pakai $</b>; referensi ke baris data yang ikut "jalan" jangan pakai $.</div>`},
{h: "XLOOKUP: VLOOKUP sudah pensiun", body: `
<div class="formula">=XLOOKUP("Kopi", Produk_range, Harga_range)</div>
<p><b>VLOOKUP</b> rapuh: pakai nomor kolom (tambah kolom = rusak), hanya cari ke kanan, dan butuh FALSE agar exact match. <b>XLOOKUP</b> memperbaiki ketiganya: range terpisah (tidak ada nomor kolom), cari ke segala arah, exact match sebagai default.</p>
<div class="example korporat"><div class="lbl">🏢 Contoh</div>
<p>=XLOOKUP("Kopi", B6:B13, D6:D13) → 8. Tambah kolom baru di tengah tabel? Rumus tetap benar — karena yang dipegang adalah range, bukan "kolom ke-3".</p></div>
<div class="callout"><b>Kenapa langsung XLOOKUP, bukan VLOOKUP dulu?</b> Karena kamu tidak perlu mewarisi kebiasaan buruk. VLOOKUP hanya perlu dikenal (banyak file lama memakainya) — untuk semua pekerjaan baru, XLOOKUP. Waktu belajarmu terbatas; <div class="callout"><b>⚠️ Prasyarat versi:</b> XLOOKUP hanya ada di <b>Microsoft 365 dan Excel 2021+</b> — di Excel 2019 atau lebih lama rumusnya tidak dikenal (#NAME?). Kalau file-mu harus jalan di Excel lama, pakai alternatif <b>INDEX+MATCH</b> (diajarkan di Excel L2 § Kenapa INDEX+MATCH mengalahkan VLOOKUP) — bekerja di semua versi.</div>
investasikan di yang benar.</div>`},
{h: "Tugas praktik", body: `
<p>Bangun <b>rekap penjualan mingguan</b> Warung Septian (file latihan di Drive): 8 transaksi → total qty, total penjualan (SUMPRODUCT), rata-rata harga, COUNTIF, total setelah diskon (dengan $!), bonus IF, dan harga via XLOOKUP. Semua sel jawaban harus rumus.</p>
<div class="callout"><b>Kenapa tugas ini penting?</b> Ini "Hello World"-nya modeling: data mentah → jawaban lewat rumus. Kalau 7 rumus ini belum refleks, level berikutnya akan terasa seperti berlari dengan sepatu terikat.</div>`},
{h: "🔥 Bekal Hell Mode", body: `
<p>Istilah yang dipakai soal Hell Mode:</p>
<ul>
<li><b>SUMPRODUCT</b> = jumlah dari perkalian berpasangan. Tanpa kolom bantu.</li>
<li><b>Referensi campuran</b> = $ di satu sisi saja ($B15 atau B$15): kunci kolom tapi bukan baris, atau sebaliknya.</li>
<li><b>Exact match</b> = pencocokan persis. XLOOKUP default exact; VLOOKUP butuh FALSE.</li>
<li><b>Kriteria teks</b> = syarat dalam tanda kutip, mis. ">15" di COUNTIF. Tanpa kutip = error.</li>
</ul>`}
],
quiz: [
{q: "Kolom Qty berisi 8 angka. Rumus total yang benar?", opts: ["=SUM(C6:C13)","=AVERAGE(C6:C13)","=COUNT(C6:C13)","=MAX(C6:C13)"], answer: 0, k: "sum_avg", diff: "Easy",
 hints: ["Total = jumlahkan semua.", "Fungsi jumlah dalam bahasa Inggris…"],
 explain: "=SUM(C6:C13). AVERAGE = rata-rata, COUNT = banyaknya, MAX = terbesar. (Excel L1 § SUM/AVERAGE/COUNT)"},
{q: "Mau menghitung 'banyaknya transaksi dengan qty di atas 15'. Fungsi yang tepat?", opts: ["=COUNT(C6:C13) saja","=COUNTA(C6:C13) saja","=COUNTIF(C6:C13,\">15\")","=SUMIF(C6:C13,\">15\")"], answer: 2, k: "sum_avg", diff: "Easy",
 hints: ["'Banyaknya dengan syarat' = COUNT + IF.", "Syaratnya ditulis sebagai teks dalam kutip."],
 explain: "=COUNTIF(C6:C13, \">15\") — COUNTIF = COUNT dengan satu kriteria. (Excel L1 § SUM/AVERAGE/COUNT)"},
{q: "Rumus =B20*(1-$B$15) di-copy dari C20 ke C21. Apa yang terjadi pada $B$15?", opts: ["Ikut berubah menjadi $B$16","Tetap $B$15 karena terkunci","Ikut berubah menjadi $C$15","Menjadi error #REF!"], answer: 1, k: "abs_ref", diff: "Medium",
 hints: ["$ mengunci: $B = kolom terkunci, $15 = baris terkunci.", "Copy ke bawah menggeser baris — kecuali yang dikunci."],
 explain: "Tetap $B$15. Tanda $ mengunci kolom DAN baris — sel asumsi tidak ikut 'jalan'. (Excel L1 § $: referensi absolut vs relatif)"},
{q: "Kenapa XLOOKUP lebih aman dari VLOOKUP untuk model yang akan dirawat bertahun-tahun?", opts: ["XLOOKUP selalu menghitung lebih cepat","XLOOKUP memformat hasil otomatis","VLOOKUP sudah tidak bisa dipakai","XLOOKUP tahan sisip kolom (tanpa nomor kolom)"], answer: 3, k: "xlookup", diff: "Medium",
 hints: ["VLOOKUP(\"x\", tabel, 3, FALSE) — angka 3 itu apa?", "Sisipkan satu kolom di tengah tabel, lalu lihat apa yang terjadi pada angka 3."],
 explain: "VLOOKUP memegang 'kolom ke-3' — sisipkan kolom, referensinya basi. XLOOKUP memegang range langsung. (Excel L1 § XLOOKUP)"},
{q: "Aturan bonus: omzet ≥1000 → 10%, omzet ≥500 → 5%, sisanya 0%. Struktur rumus terbaik?", opts: ["=IF(A1>=500,5%,IF(A1>=1000,10%,0))","=IFS(A1>=1000,10%,A1>=500,5%,1,0)","=IF(A1>=1000,10%,0)+IF(A1>=500,5%,0)","=SWITCH(TRUE,A1>=1000,10%,5%)"], answer: 1, k: "if_logic", diff: "Hard",
 hints: ["Opsi pertama salah urutan: 1.200 kena cabang 5% duluan.", "IFS mengecek kondisi berurutan — tulis dari yang paling ketat."],
 explain: "=IFS(A1>=1000, 10%, A1>=500, 5%, TRUE, 0). IFS lebih terbaca dari IF bertingkat; urutan dari ambang tertinggi. Opsi pertama bug: 1200 kena cabang 5% duluan. (Excel L1 § IF)"}
],
hellPass: 80,
hell: [
{q: "Mana yang PALING cepat dihitung Excel untuk 100 ribu baris: SUMPRODUCT(A:A,B:B) vs kolom bantu C=A*B lalu SUM(C:C)?", opts: ["Kolom bantu — biasanya sedikit lebih cepat & jauh lebih mudah diaudit","Sama saja, Excel mengoptimasi keduanya","SUMPRODUCT — satu rumus selalu menang","Kolom bantu lebih lambat karena makan memori"], answer: 0, diff: "Medium",
 explain: "Kolom bantu + SUM biasanya sedikit lebih cepat dan JAUH lebih mudah diaudit — tapi seberapa cepat bergantung pada ukuran data dan versi Excel, jadi uji di workbook-mu sendiri sebelum menggeneralisasi. SUMPRODUCT elegan untuk kasus kecil; untuk 100rb baris, transparansi + kecepatan = kolom bantu."},
{q: "Rumus =SUM($B6:B$12) di-copy ke kanan jadi kolom C. Range apa yang dijumlahkan?", opts: ["=SUM($B6:B$12) — tidak berubah sama sekali","=SUM($B6:C$12) — ujung awal tetap di B, ujung akhir bergeser ke C","=SUM($B7:B$13) — baris ikut bergeser","Error karena $ tercampur"], answer: 1, diff: "Medium",
 explain: "$B terkunci (tetap B), B$12 terkunci barisnya tapi kolomnya bebas → jadi $B6:C$12. Inilah referensi campuran: kunci yang perlu, bebaskan yang harus jalan."},
{q: "=XLOOKUP(\"Kopi\", B6:B13, D6:D13, \"tidak ada\"). Produk tidak ketemu. Hasil?", opts: ["#N/A","0","\"tidak ada\"","#VALUE!"], answer: 2, diff: "Medium",
 explain: "Argumen ke-4 XLOOKUP = if_not_found. Tanpa itu, hasilnya #N/A. Selalu isi argumen ini di model — #N/A yang tidak tertangani merambat ke seluruh laporan."},
{q: "=COUNTIF(C6:C13, >15) — tanpa tanda kutip. Apa yang terjadi?", opts: ["Berjalan normal, hasilnya 3","Error — kriteria operator harus dalam kutip","Dihitung sebagai >150","Hasilnya 0 diam-diam"], answer: 1, diff: "Hard",
 explain: "Operator perbandingan dalam kriteria WAJIB dalam tanda kutip: \">15\". Tanpa kutip = syntax error. Pengecualian: kriteria angka polos (=15) boleh tanpa kutip."},
{q: "=IF(AND(A1>0, B1<>0), A1/B1, 0). Kapan hasilnya 0?", opts: ["Hanya saat A1 = 0","Saat A1 ≤ 0 ATAU B1 = 0","Hanya saat B1 = 0","Tidak pernah — selalu A1/B1"], answer: 1, diff: "Hard",
 explain: "AND butuh keduanya TRUE: A1>0 DAN B1≠0. Salah satu gagal → 0. Hati-hati: B1<>\"\" hanya mengecek kosong — B1 berisi 0 tetap lolos dan A1/0 = #DIV/0!. Pengaman pembagian yang benar mengecek penyebut nol (B1<>0)."}
],
tasks: [
{t: "Tugas A — Rekap penjualan mingguan (±2 jam)", d: "Download file latihan Excel L1 dari Drive. Kerjakan 7 rumus: SUM, SUMPRODUCT, AVERAGE, COUNTIF, diskon ($!), IF, XLOOKUP. Semua sel jawaban harus rumus — file jawaban untuk cross-check.", url: "https://drive.google.com/drive/folders/1ZemMXTh95PAjLRZc_kSY2MDJOuywblrt"},
{t: "Tugas B — Drill $ 10 menit (±30 menit)", d: "Buka file latihan, blok rumus 'Total setelah diskon', tekan F4 berulang-ulang sampai hafal siklusnya: B15 → $B$15 → B$15 → $B15 → B15. Lalu copy rumus ke 3 sel kosong dan verifikasi hasilnya tetap 772,2."},
{t: "Tugas C — Kuis di atas", d: "Target ≥4/5 benar. Salah? Baca hint, coba lagi."}
],
blind: {h: "Uji Kilat — angka beda", body: `
<p><b>1.</b> Qty: 5, 12, 9, 20, 7. Tulis rumus total dan rata-ratanya (tanpa kalkulator).</p>
<details class="ans"><summary>Jawaban</summary>
<p>=SUM(...) → 53; =AVERAGE(...) → 10,6. Kalau kamu mengetik 53 manual — ulangi level ini.</p>
</details>
<p><b>2.</b> =D10*(1-$D$3) di-copy dari E10 ke E11 dan ke F10. Tulis kedua rumus hasilnya.</p>
<details class="ans"><summary>Jawaban</summary>
<p>E11: =D11*(1-$D$3). F10: =E10*(1-$D$3). $D$3 tidak bergerak ke mana-mana — hanya yang tanpa $ yang jalan.</p>
</details>`}
},
{
id: "excel-l2", track: "Excel", title: "Excel Intermediate: Lookup & Agregasi",
sub: "Excel L2 · ±5 jam · Multi-kriteria & data berantakan",
est: "5 jam",
prerequisites: ["xlookup", "sum_avg"],
driveFolder: "https://drive.google.com/drive/folders/1ZemMXTh95PAjLRZc_kSY2MDJOuywblrt",
audio: "assets/audio/excel-l2.mp3",
checker: "excel-l2",
sections: [
{h: "Kenapa INDEX+MATCH mengalahkan VLOOKUP", body: `
<div class="formula">=INDEX(Omzet_range, MATCH("Bandung", Cabang_range, 0))</div>
<p>Dua langkah: <b>MATCH</b> mencari <i>posisi</i> ("Bandung" = baris ke-7), <b>INDEX</b> mengambil nilai di posisi itu. Kombinasi ini bisa mencari ke <b>kiri</b>, tahan terhadap <b>penyisipan kolom</b>, dan lebih cepat untuk tabel besar.</p>
<div class="example jebakan"><div class="lbl">🚫 Kapan VLOOKUP gagal total</div>
<p>Tabel: kolom A = Harga, kolom B = Produk. Mau cari harga "Kopi"? VLOOKUP tidak bisa — ia hanya mencari di kolom <b>paling kiri</b> lalu mengambil ke <b>kanan</b>. INDEX+MATCH: =INDEX(A:A, MATCH("Kopi", B:B, 0)) — arah bebas.</p></div>
<div class="callout"><b>Kenapa ini level intermediate?</b> Karena ini pola "cari posisi, lalu ambil" — fondasi cara berpikir dua langkah yang dipakai lagi di SUMPRODUCT 2 kriteria (L3) dan di setiap lookup kompleks. Kuasai polanya, bukan hafal rumusnya.</div>`},
{h: "SUMIFS/COUNTIFS: agregasi bersyarat", body: `
<div class="formula">=SUMIFS(yg_dijumlah, range_kriteria1, kriteria1, range_kriteria2, kriteria2, ...)</div>
<p>Urutan yang benar: <b>yang dijumlah dulu</b>, baru pasangan kriteria. Semua kriteria harus TRUE sekaligus (AND). Keluarga lengkap: SUMIFS, COUNTIFS, AVERAGEIFS, MAXIFS, MINIFS.</p>
<div class="example warung"><div class="lbl">🏪 Contoh</div>
<p>=SUMIFS(Omzet, Cabang, "Jakarta", Produk, "Kopi", Bulan, "Feb") → 1200. Tiga filter sekaligus, satu rumus.</p></div>
<div class="callout"><b>Kenapa bukan filter manual + SUBTOTAL?</b> Karena filter manual tidak meninggalkan jejak audit: minggu depan datanya berubah, angkanya basi tanpa peringatan. SUMIFS menghitung ulang otomatis — model yang hidup, bukan foto.</div>`},
{h: "TEXT & DATE: data berantakan", body: `
<p>Data nyata tidak pernah rapi: tanggal sebagai teks, kode digabung manual, nama tidak konsisten. Tiga alat bersih-bersih:</p>
<ul>
<li><b>&</b> — gabung teks: =A7&"-"&B7 → "Jakarta-Jan".</li>
<li><b>LEN/LEFT/RIGHT/MID</b> — bedah teks: =LEN(...) untuk validasi panjang kode.</li>
<li><b>DATE/EOMONTH</b> — tanggal sebagai angka: =EOMONTH(tanggal, 1) untuk akhir bulan depan.</li>
</ul>
<div class="example korporat"><div class="lbl">🏢 Contoh</div>
<p>Kolom Tanggal berisi teks '2026-01-15'. =MONTH(DATEVALUE(A1)) → <b>1</b>: DATEVALUE mengubah teks menjadi tanggal Excel (angka seri 46037), MONTH mengambil bulannya. Tanpa DATEVALUE kamu mengandalkan konversi implisit Excel — tidak kelihatan di audit trail. DATEVALUE membuat konversinya eksplisit: kalau teksnya bukan tanggal yang dikenali, hasilnya #VALUE! yang kelihatan, bukan angka diam-diam salah.</p></div>
<div class="callout"><b>⚠️ Tergantung regional settings:</b> DATEVALUE membaca teks menurut format tanggal Windows/Excel-mu — '01/02/2026' dibaca 2 Januari di locale AS (MM/DD) tapi 1 Februari di locale Indonesia (DD/MM). Kalau hasil DATEVALUE meleset sebulan, cek regional settings dulu sebelum menyalahkan rumus. Format ISO '2026-01-15' aman di kedua locale — dan untuk teks ambigu, yang paling eksplisit adalah merakit tanggal dengan DATE + LEFT/MID/RIGHT.</div>
<div class="callout"><b>Kenapa ini skill analis?</b> Karena 80% waktu analis habis untuk membersihkan data, bukan menganalisis. Yang bisa merapikan data dalam 10 menit dengan rumus akan selalu lebih cepat dari yang mengedit manual 2 jam — dan hasilnya bisa diulang.</div>`},
{h: "Pagar pengaman: validasi data & conditional formatting", body: `
<p>Dua fitur yang mencegah sampah masuk <i>sebelum</i> merusak model:</p>
<ul>
<li><b>Data Validation</b> — batasi isi sel: dropdown cabang (Jakarta/Bandung), angka 0–100 untuk persen. Salah ketik "Jakrta" tidak bisa lewat.</li>
<li><b>Conditional Formatting</b> — sel menyala otomatis saat aneh: balance ≠ 0 jadi merah, margin negatif jadi kuning.</li>
</ul>
<div class="callout"><b>Kenapa ini di level intermediate?</b> Karena inilah bedanya "file yang dipakai sendiri" vs "file yang dipakai tim". Model profesional berasumsi penggunanya akan salah input — dan menjaganya dengan pagar, bukan dengan harapan.</div>`},
{h: "Tugas praktik", body: `
<p>Bangun <b>rekap 2 cabang × 3 bulan</b> (file latihan di Drive): 12 transaksi → 8 rumus (SUMIFS ×3, COUNTIFS, INDEX+MATCH, LEN, MAXIFS, AVERAGEIFS). Lalu tambahkan <b>data validation</b> dropdown untuk kolom Cabang dan <b>conditional formatting</b> yang mewarnai omzet &lt; 700 menjadi kuning.</p>
<div class="callout"><b>Kenapa tugas ini penting?</b> Ini simulasi kerja analis junior yang paling sering: "tolong rekap penjualan per cabang per bulan". Yang bisa menjawab dalam 15 menit dengan rumus akan selalu menang dari yang pivot manual setengah jam.</div>`},
{h: "🔥 Bekal Hell Mode", body: `
<p>Istilah yang dipakai soal Hell Mode:</p>
<ul>
<li><b>Array</b> = sekumpulan nilai yang diproses sekaligus, mis. (A1:A10="x").</li>
<li><b>Kriteria ganda</b> = beberapa syarat sekaligus; di *IFS artinya AND.</li>
<li><b>Posisi vs nilai</b> = MATCH mengembalikan posisi (angka), INDEX mengambil nilai di posisi itu.</li>
<li><b>Volatile</b> = fungsi yang menghitung ulang terus (OFFSET, INDIRECT, NOW). Hindari di model besar.</li>
</ul>`}
],
quiz: [
{q: "Mau mengambil harga dari tabel di mana kolom Produk ada di SEBELAH KANAN kolom Harga. Fungsi yang bisa?", opts: ["VLOOKUP (cari kanan saja)","HLOOKUP (cari ke bawah)","INDEX + MATCH (arah bebas)","SUMIFS (agregasi saja)"], answer: 2, k: "index_match", diff: "Easy",
 hints: ["VLOOKUP hanya bisa mengambil ke kanan dari kolom kunci.", "Pisahkan jadi dua langkah: cari posisi, lalu ambil."],
 explain: "INDEX + MATCH — arah bebas, tidak peduli posisi kolom. VLOOKUP gagal total di kasus ini. (Excel L2 § INDEX+MATCH)"},
{q: "=SUMIFS(D:D, A:A, \"Jakarta\", C:C, \"Kopi\"). Apa yang dihitung?", opts: ["Banyaknya baris Jakarta-Kopi","Total kolom D untuk baris Jakarta DAN Kopi","Rata-rata kolom D untuk Jakarta atau Kopi","Total kolom D untuk Jakarta ATAU Kopi"], answer: 1, k: "sumifs", diff: "Easy",
 hints: ["SUMIFS = SUM dengan kriteria.", "Kriteria ganda di *IFS berarti semuanya harus cocok."],
 explain: "Total kolom D di mana cabang=Jakarta DAN produk=Kopi. Kriteria *IFS = AND, bukan OR. (Excel L2 § SUMIFS/COUNTIFS)"},
{q: "Kolom Tanggal berisi teks '2026-01-15'. Mau ambil bulannya sebagai angka 1. Cara paling bersih?", opts: ["=MONTH(DATEVALUE(A1))","Ambil 7 karakter kiri","Ambil 2 karakter tengah","Ketik manual saja"], answer: 0, k: "text_date", diff: "Medium",
 hints: ["Teks tanggal harus jadi tanggal dulu sebelum diutak-atik.", "DATEVALUE mengubah teks menjadi tanggal Excel."],
 explain: "=MONTH(DATEVALUE(A1)) — ubah teks jadi tanggal, baru ambil bulannya. LEFT/MID rapuh kalau format berubah. (Excel L2 § TEXT & DATE)"},
{q: "Data validation dropdown cabang sudah dipasang, tapi ada sel lama berisi 'Jakrta' (typo). Apa yang terjadi?", opts: ["Dikoreksi otomatis oleh Excel","Tetap — hanya input baru dijaga","File menjadi corrupt total","Dikosongkan secara otomatis"], answer: 1, k: "pivottable", diff: "Medium",
 hints: ["Validasi = penjaga pintu, bukan tukang bersih-bersih.", "Data yang sudah terlanjur masuk sebelum pagar dipasang…"],
 explain: "Validasi hanya mencegah input baru yang salah; data lama yang typo tetap ada dan harus dibersihkan manual (atau dengan rumus). (Excel L2 § Pagar pengaman)"},
{q: "Mana pernyataan BENAR tentang PivotTable vs rumus *IFS?", opts: ["PivotTable lebih cepat, rumus lebih lambat","PivotTable maks 10 ribu baris data","Keduanya sama persis fungsinya","Rumus *IFS teraudit; PivotTable butuh refresh"], answer: 3, k: "pivottable", diff: "Hard",
 hints: ["Pikirkan: data bertambah minggu depan — mana yang otomatis ikut?", "Jejak audit = orang lain bisa melihat DARI MANA angka itu datang."],
 explain: "Rumus *IFS live dan teraudit; PivotTable butuh Refresh dan jejaknya tersembunyi di balik klik. Untuk model yang dirawat, rumus menang. (Excel L2 § SUMIFS/COUNTIFS)"}
],
hellPass: 80,
hell: [
{q: "=MATCH(\"Bandung\", A2:A100, 0) menghasilkan 7, tapi =INDEX(D1:D100, 7) salah. Kemungkinan penyebab?", opts: ["MATCH salah — seharusnya pakai 1 bukan 0","Range tidak sejajar: A mulai baris 2, D mulai baris 1","INDEX tidak bisa dipakai dengan MATCH","Harus pakai VLOOKUP sebagai gantinya"], answer: 1, diff: "Medium",
 explain: "MATCH mengembalikan posisi ke-7 di dalam A2:A100 (= baris 8 lembar), sedangkan INDEX(D1:D100, 7) mengambil baris ke-7 dari D1:D100 (= baris 7 lembar) — selisih satu baris. INDEX+MATCH menuntut range yang sejajar: awal dan panjang range harus sama (mis. A2:A100 dengan D2:D100)."},
{q: "=COUNTIFS(A:A, \">100\", B:B, \"Jan\", C:C, \"<>Mie\"). Baris (150, Jan, Kopi) dihitung?", opts: ["Ya — memenuhi ketiga kriteria","Tidak — \"<>Mie\" membatalkan semuanya","Tidak — COUNTIFS maksimal 2 kriteria","Ya — tapi dihitung dua kali"], answer: 0, diff: "Medium",
 explain: "150>100 ✓, Jan ✓, Kopi<>Mie ✓ → dihitung sekali. \"<>\" = tidak sama dengan. COUNTIFS mendukung puluhan kriteria."},
{q: "Mau jumlahkan omzet hanya untuk baris di mana qty > rata-rata qty. Rumus satu sel?", opts: ["=SUMIF(Qty, \">\"&AVERAGE(Qty), Omzet)","=SUM(Omzet) - AVERAGE(Qty)","Tidak bisa dalam satu rumus","=SUMIFS(Omzet, Qty, AVERAGE(Qty))"], answer: 0, diff: "Hard",
 explain: "Kriteria bisa berupa ekspresi: \">\"&AVERAGE(Qty) menggabungkan operator teks dengan hasil hitungan. Pola 'kriteria dinamis' ini sangat sering dipakai."},
{q: "Kenapa SUMIFS(Omzet, Cabang, J1) lebih baik dari SUMIFS(Omzet, Cabang, \"Jakarta\") di model yang dirawat?", opts: ["Lebih cepat dihitung Excel","Kriteria di sel J1 bisa diubah tanpa menyentuh rumus — asumsi terpisah dari logika","Hasilnya lebih akurat","Tidak ada bedanya sama sekali"], answer: 1, diff: "Hard",
 explain: "Aturan Hari 01: asumsi di sel input, rumus hanya referensi. \"Jakarta\" yang diketik di rumus = hardcode berkedok kriteria. Ganti cabang = edit rumus = risiko."},
{q: "Conditional formatting: warnai merah sel yang #N/A. Aturan yang benar?", opts: ["Format cells containing → equal to → #N/A","Gunakan rumus =ISNA(A1) sebagai aturan","Tidak bisa — #N/A tidak terdeteksi formatting","Warnai manual saja satu per satu"], answer: 1, diff: "Hard",
 explain: "=ISNA(A1) sebagai aturan formula-based. 'Equal to #N/A' tidak jalan karena #N/A adalah error, bukan teks. ISNA/ISERROR adalah detektor error yang benar."}
],
tasks: [
{t: "Tugas A — Rekap 2 cabang × 3 bulan (±3 jam)", d: "Download file latihan Excel L2 dari Drive. Kerjakan 8 rumus: SUMIFS ×3, COUNTIFS, INDEX+MATCH, LEN, MAXIFS, AVERAGEIFS. Tambahkan data validation dropdown Cabang + conditional formatting omzet <700. File jawaban untuk cross-check.", url: "https://drive.google.com/drive/folders/1ZemMXTh95PAjLRZc_kSY2MDJOuywblrt"},
{t: "Tugas B — Audit dengan F9 (±1 jam)", d: "Blok bagian rumus (mis. MATCH(...)), tekan F9 — Excel menampilkan hasil sementaranya. Pakai ini untuk debug INDEX+MATCH yang salah. Kembalikan dengan Esc (jangan Enter!)."},
{t: "Tugas C — Kuis di atas", d: "Target ≥4/5 benar. Salah? Baca hint, coba lagi."}
],
blind: {h: "Uji Kilat — angka beda", body: `
<p><b>1.</b> Data: (A, Jan, 10), (A, Feb, 30), (B, Jan, 20). Tulis SUMIFS untuk total A, dan COUNTIFS untuk baris dengan nilai >15.</p>
<details class="ans"><summary>Jawaban</summary>
<p>=SUMIFS(nilai, kode, "A") → 40. =COUNTIFS(nilai, ">15") → 2 (30 dan 20). Perhatikan: kriteria teks selalu dalam kutip.</p>
</details>
<p><b>2.</b> Kolom Nama di C, kolom Gaji di E. Tulis rumus ambil gaji "Budi" tanpa VLOOKUP.</p>
<details class="ans"><summary>Jawaban</summary>
<p>=INDEX(E:E, MATCH("Budi", C:C, 0)). Dua langkah: posisi dulu, nilai kemudian.</p>
</details>`}
},
{
id: "excel-l3", track: "Excel", title: "Excel Advanced: Dynamic Arrays",
sub: "Excel L3 · ±5 jam · Satu rumus, banyak hasil",
est: "5 jam",
prerequisites: ["index_match", "sumifs"],
driveFolder: "https://drive.google.com/drive/folders/1ZemMXTh95PAjLRZc_kSY2MDJOuywblrt",
audio: "assets/audio/excel-l3.mp3",
checker: "excel-l3",
sections: [
{h: "Kenapa spill mengubah cara berpikir", body: `
<p>Excel lama: satu rumus = satu sel. <b>Dynamic arrays</b> (Excel 365): satu rumus = <b>banyak sel</b> — hasilnya "tumpah" (spill) ke sel tetangga otomatis.</p>
<div class="formula">=SEQUENCE(10) → 1,2,3,...,10 dari SATU sel</div>
<p>Tidak perlu drag, tidak perlu Ctrl+D. Ubah 10 jadi 1000 — hasilnya ikut memanjang sendiri.</p>
<div class="example jebakan"><div class="lbl">🚫 Jebakan #SPILL!</div>
<p>Ada data di sel bawahnya? Rumus spill menampilkan <b>#SPILL!</b> — bukan error rumusmu, tapi jalannya terhalang. Kosongkan area tumpahan, masalah selesai. Jangan "perbaiki" rumusnya.</p></div>
<div class="callout"><b>Kenapa ini revolusioner untuk modeling?</b> Karena menghilangkan seluruh kelas bug "lupa drag sampai bawah". Dulu: tambah 1 tahun proyeksi = drag semua rumus (dan doa tidak ada yang kelewat). Sekarang: SEQUENCE(10) jadi SEQUENCE(11), selesai.</div>`},
{h: "UNIQUE/FILTER/SORT: query dalam sel", body: `
<p>Tiga fungsi ini = <b>query database</b> di dalam spreadsheet:</p>
<ul>
<li><b>UNIQUE</b> — daftar nilai unik: =UNIQUE(Kategori) → {Minuman, Makanan}.</li>
<li><b>FILTER</b> — saring baris: =FILTER(Produk, Omzet>1000) → hanya produk laris.</li>
<li><b>SORT</b> — urutkan: =SORT(Omzet) → menaik (default). <b>Awas:</b> argumen "menurun" BEDA di Excel (<tt>-1</tt>) vs Google Sheets (<tt>FALSE</tt>) — untuk "nilai terbesar", pakai <b>=LARGE(Omzet,1)</b> yang identik di semua aplikasi.</li>
</ul>
<div class="formula">=ROWS(FILTER(Produk, Omzet>B15)) → hitung yang lolos saring</div>
<div class="callout"><b>Kenapa ini menggantikan banyak pekerjaan manual?</b> Karena pola "saring → hitung/urutan" dulu butuh filter manual + copy-paste + rumus terpisah (3 langkah, tidak teraudit). Sekarang satu rumus yang live: data berubah, hasilnya ikut berubah. digabung dengan ROWS/SUM menjadi agregasi dinamis.</div>`},
{h: "SUMPRODUCT 2 kriteria & LET: rumus yang terbaca", body: `
<p>Dua teknik membuat rumus kompleks tetap manusiawi:</p>
<div class="formula">=SUMPRODUCT((Produk="Kopi Susu")*(Kategori="Minuman")*Omzet)</div>
<p><b>SUMPRODUCT 2 kriteria:</b> perkalian array (syarat1)*(syarat2) = AND — baris yang memenuhi keduanya menghasilkan nilai Omzet-nya, yang lain dikali 0. Umumnya bekerja sama di versi modern (Excel 365, Google Sheets saat ini, LibreOffice 24.8+) — cek versi aplikasimu bila ada perbedaan perilaku.</p>
<div class="formula">=LET(t, SUM(Omzet), t*1.1)</div>
<p><b>LET</b> memberi nama pada perhitungan: hitung sekali (t), pakai berkali-kali. Rumus 200 karakter menjadi terbaca — dan dihitung lebih cepat karena tidak mengulang.</p>
<div class="callout"><b>Kenapa keterbacaan = fitur, bukan gaya?</b> Karena rumus dibaca 10× lebih sering dari ditulis — oleh kamu 3 bulan lagi, atau oleh atasan yang mengaudit. Rumus yang tidak bisa dibaca = rumus yang tidak bisa dipercaya.</div>`},
{h: "Data table & Goal Seek: analisis sensitivitas", body: `
<p>Dua alat "bagaimana-jika" tanpa VBA:</p>
<ul>
<li><b>Data Table</b> (What-If Analysis) — tabel sensitivitas: bagaimana laba berubah jika growth 5%/10%/15%? Sekali setting, Excel menghitung semua skenario.</li>
<li><b>Goal Seek</b> — cari input yang menghasilkan target: "growth berapa agar laba = 2.000?" — Excel menebak mundur untukmu.</li>
</ul>
<div class="callout"><b>Kenapa ini senjata analis?</b> Karena pertanyaan bisnis tidak pernah "berapa labanya?" — selalu "labanya berapa JIKA ...?". Data table menjawab 9 skenario sekaligus; Goal Seek menjawab pertanyaan terbalik. Keduanya tidak butuh satu baris VBA pun.</div>`},
{h: "Tugas praktik", body: `
<p>Bangun <b>analisis produk</b> Warung Septian (file latihan di Drive): 10 produk → 7 rumus array (ROWS+UNIQUE, ROWS+FILTER, LARGE, SEQUENCE, SUMPRODUCT 2 kriteria, LET, SUM+FILTER). Lalu buat <b>data table</b> sensitivitas: total omzet untuk batas omzet 800/1000/1200.</p>
<div class="callout"><b>Kenapa tugas ini penting?</b> Ini level di mana Excel berhenti jadi "kalkulator" dan menjadi "bahasa query". Selesai ini, kamu bisa menjawab pertanyaan bisnis langsung dari data mentah — skill yang membedakan analis dari operator.</div>`},
{h: "🔥 Bekal Hell Mode", body: `
<p>Istilah yang dipakai soal Hell Mode:</p>
<ul>
<li><b>Spill</b> = hasil rumus array yang "tumpah" ke sel tetangga otomatis.</li>
<li><b>#SPILL!</b> = area tumpahan terhalang — kosongkan, bukan perbaiki rumus.</li>
<li><b>Array</b> = sekumpulan nilai; (A1:A10>5) menghasilkan array TRUE/FALSE.</li>
<li><b>Anchor</b> = sel tempat rumus spill ditulis (hanya sel ini berisi rumus).</li>
</ul>`}
,
{h: "Solver: optimasi multi-variabel dengan constraints", body: `
<p>Goal Seek (L3) mengubah <b>satu</b> input hingga satu target tercapai. <b>Solver</b> mengubah <b>banyak</b> input sekaligus, dengan batasan (constraints) — inilah optimasi yang dipakai Wharton di capstone-nya:</p>
<p><b>Cara pakai:</b> Data → Solver → Set Objective (sel yang dimaksimalkan/diminimalkan) → By Changing Variable Cells → Subject to the Constraints → Solving Method: <b>Simplex LP</b> untuk model linear (seperti di bawah), GRG Nonlinear bila ada perkalian/pangkat antar variabel.</p>
<div class="example korporat"><div class="lbl">🏢 Contoh — alokasi capex Rp1.000jt</div>
<p>Tiga proyek, NPV per Rp1 yang diinvestasikan: A 0,25; B 0,20; C 0,15. Kapasitas: A maks 400; B maks 500; C maks 600. Total ≤ 1.000. Solver: alokasikan A 400 (NPV 100), B 500 (NPV 100), C 100 (NPV 15) → <b>NPV total Rp215jt</b>. Cek: 400 + 500 + 100 = 1.000 ✓; NPV = 100 + 100 + 15 = 215 ✓. Intuisi "isi dari NPV/Rp tertinggi dulu" bekerja di sini karena modelnya linear — Solver membuktikannya, bukan menebaknya.</p></div>
<p><b>Aturan audit:</b> (1) tulis constraints di sel (bukan hanya di dialog Solver) agar reviewer melihat batasannya; (2) catat solving method di samping hasil; (3) uji sensitivitas: ubah satu constraint, lihat apakah alokasi berubah — bila tidak berubah, constraint itu tidak mengikat (non-binding) dan boleh dihapus. Solver tanpa constraints yang terdokumentasi = jawaban yang tidak bisa direplikasi.</p>
<div class="callout"><b>Jembatan ke H15:</b> decision tree menjawab <i>kapan</i> memutuskan; Solver menjawab <i>berapa</i> yang optimal. Keduanya adalah optimasi — yang satu atas waktu, yang satu atas jumlah.</div>`}],
quiz: [
{q: "=SEQUENCE(10) ditulis di A1. Nilai di A5?", opts: ["Nilai 10","Nilai 1","Nilai 5","#SPILL!"], answer: 2, k: "dynamic_arrays", diff: "Easy",
 hints: ["SEQUENCE(n) menumpahkan 1 sampai n.", "A1=1, A2=2, …"],
 explain: "A5 = 5. Satu rumus di A1 menghasilkan 10 sel. (Excel L3 § Spill)"},
{q: "Sel di bawah rumus FILTER sudah terisi data. Apa yang tampil?", opts: ["Hasil filter menimpa data lama","Error #SPILL! ditampilkan","Error #REF! ditampilkan","Hasil filter terpotong"], answer: 1, k: "dynamic_arrays", diff: "Easy",
 hints: ["Excel tidak akan menimpa datamu diam-diam.", "Ada error khusus untuk kasus ini."],
 explain: "#SPILL! — kosongkan area tumpahan. Bukan error rumus, melainkan tabrakan ruang. (Excel L3 § Spill)"},
{q: "Mau menghitung 'ada berapa produk dengan omzet di atas Rp1.000rb'. Rumus satu sel?", opts: ["=FILTER(Produk,Omzet>1000)","=COUNTIF(Omzet,\">1000\")","=ROWS(FILTER(Produk,Omzet>1000))","=SUMPRODUCT(Omzet>1000)"], answer: 2, k: "filter_sort", diff: "Medium",
 hints: ["FILTER menumpahkan daftarnya — kamu butuh JUMLAHNYA.", "Fungsi apa yang menghitung baris?"],
 explain: "=ROWS(FILTER(...)) — saring dulu, hitung hasilnya. COUNTIF juga bisa di sini, tapi pola FILTER+ROWS berlaku umum. (Excel L3 § UNIQUE/FILTER/SORT)"},
{q: "=SUMPRODUCT((A:A=\"x\")*(B:B=\"y\")*C:C). Apa yang dihitung?", opts: ["Jumlah C di baris A='x', B='y'","Banyaknya baris dengan A='x'","Nilai 1 yang ada di kolom C","Rata-rata C di semua baris"], answer: 0, k: "sumproduct", diff: "Medium",
 hints: ["(syarat1)*(syarat2): TRUE*TRUE = ?", "Baris yang tak cocok dikali 0 — hilang dari jumlah."],
 explain: "Perkalian array = AND: hanya baris yang memenuhi keduanya menyumbang nilai C-nya. (Excel L3 § SUMPRODUCT 2 kriteria)"},
{q: "=LET(t, SUM(A:A), t*1.1) vs =SUM(A:A)*1.1. Kapan LET benar-benar berguna?", opts: ["Tidak pernah","Hanya angka","Rumus pendek","Dipakai berulang"], answer: 3, k: "let_lambda", diff: "Hard",
 hints: ["Bayangkan SUM(A:A) ditulis 4 kali dalam satu rumus.", "LET = beri nama, hitung sekali."],
 explain: "LET bersinar saat sub-hitung panjang dipakai berulang: =LET(t, SUM(...besar...), t*1.1 - t*0.05). Sekali hitung, terbaca, lebih cepat. (Excel L3 § LET)"},
{q: "Alokasi capex Rp1.000jt; NPV/Rp: A 0,25 (maks 400), B 0,20 (maks 500), C 0,15 (maks 600). NPV total optimal Solver?", opts: ["Rp215jt (A 400, B 500, C 100)","Rp200jt (A 400, B 500, C 0)","Rp250jt (A 400, B 500, C 600)","Rp150jt (C 600, B 400)"], answer: 0, k: "solver", diff: "Medium",
 hints: ["Isi dari NPV/Rp tertinggi: A dulu, lalu B, lalu sisa ke C.", "400 + 500 + 100 = 1.000; NPV = 100 + 100 + 15."],
 explain: "A 400 (NPV 100) + B 500 (NPV 100) + C 100 (NPV 15) = Rp215jt. Total 1.000 tepat di batas."},
{q: "Goal Seek vs Solver — perbedaan utamanya?", opts: ["Solver mengubah banyak input dengan constraints; Goal Seek satu input satu target","Goal Seek lebih akurat","Solver hanya untuk DCF","Tidak ada perbedaan"], answer: 0, k: "solver", diff: "Easy",
 hints: ["Goal Seek: satu sel berubah.", "Solver: banyak sel + batasan."],
 explain: "Goal Seek = satu input, satu target. Solver = banyak input sekaligus dengan constraints (Simplex LP untuk model linear)."}

],
hellPass: 80,
hell: [
{q: "=SORT(UNIQUE(A:A), 1, TRUE) — urutan eksekusinya?", opts: ["SORT dulu, baru UNIQUE","UNIQUE dulu (dalam), baru SORT (luar)","Keduanya bersamaan","Error — tidak bisa ditumpuk"], answer: 1, diff: "Medium",
 explain: "Fungsi dalam dievaluasi dulu: UNIQUE menghasilkan daftar unik, SORT mengurutkannya. Komposisi = baca dari dalam ke luar. (Argumen 1, TRUE = urut menaik — bentuk yang jalan identik di Excel & Google Sheets.)"},
{q: "=FILTER(A:A, B:B>100, \"kosong\"). Tidak ada yang cocok. Hasil?", opts: ["#CALC!","\"kosong\"","0","#N/A"], answer: 1, diff: "Medium",
 explain: "Argumen ke-3 FILTER = if_empty. Tanpa itu: #CALC!. Selalu isi — seperti if_not_found di XLOOKUP."},
{q: "Rumus spill di A1 menumpahkan 10 baris (baris 1–10). Kamu hapus SELURUH baris 5 (klik kanan → Delete). Apa yang terjadi?", opts: ["Rumus rusak permanen","Spill menghitung ulang — tetap 10 nilai, menempati baris 1–10 setelah pergeseran; tidak ada baris kosong yang \"dilewati\"","#SPILL! permanen sampai file dibuka ulang","Excel membuat 9 baris saja"], answer: 1, diff: "Hard",
 explain: "Hapus SELURUH baris = baris di bawahnya bergeser naik; spill menghitung ulang dan tetap menumpahkan 10 nilai di baris 1–10. Beda dengan mengosongkan isi sel A5 saja (clear contents): spill mengisi ulang sel itu. Beda lagi dengan rumus copy yang meninggalkan lubang #REF!."},
{q: "=SEQUENCE(5, 3) menghasilkan?", opts: ["5 baris × 3 kolom angka 1–15","3 baris × 5 kolom","Error — SEQUENCE hanya 1 dimensi","5 kolom × 3 baris"], answer: 0, diff: "Hard",
 explain: "SEQUENCE(baris, kolom): 5×3 = 15 angka berurutan. Fondasi membuat matriks tanggal/scenario."},
{q: "Kenapa =SUM(FILTER(Omzet, Kategori=\"Minuman\")) lebih baik dari SUMIFS di kasus ini?", opts: ["Selalu lebih cepat dihitung","FILTER bisa dipakai ulang untuk daftarnya juga — satu logika, dua output","SUMIFS tidak bisa memfilter teks","Tidak ada bedanya"], answer: 1, diff: "Hard",
 explain: "FILTER menghasilkan daftarnya (audit-able), SUM membungkusnya. Satu logika dipakai dua cara: =FILTER(...) untuk daftar, =SUM(FILTER(...)) untuk total. Konsisten."}
],
tasks: [
{t: "Tugas A — Analisis produk 10 item (±3 jam)", d: "Download file latihan Excel L3 dari Drive. Kerjakan 7 rumus array. Lalu buat data table sensitivitas total omzet untuk batas 800/1000/1200 (menu Data → What-If Analysis). File jawaban untuk cross-check.", url: "https://drive.google.com/drive/folders/1ZemMXTh95PAjLRZc_kSY2MDJOuywblrt"},
{t: "Tugas B — Mainkan #SPILL! (±30 menit)", d: "Sengaja taruh data di bawah rumus FILTER sampai muncul #SPILL!. Lalu kosongkan dan lihat pulihnya. Tujuannya: tidak panik saat melihatnya di kerja nyata."},
{t: "Tugas C — Kuis di atas", d: "Target ≥4/5 benar. Salah? Baca hint, coba lagi."}
],
blind: {h: "Uji Kilat — angka beda", body: `
<p><b>1.</b> Nilai: 3, 7, 7, 2, 9. Tulis rumus untuk: (a) banyaknya nilai unik, (b) nilai terbesar ke-2.</p>
<details class="ans"><summary>Jawaban</summary>
<p>(a) =ROWS(UNIQUE(...)) → 4. (b) =LARGE(...,2) → 7.</p>
</details>
<p><b>2.</b> =FILTER(Nama, Nilai>80) menumpahkan 0 baris (tak ada yang lolos). Bagaimana agar tampil "belum ada", bukan error?</p>
<details class="ans"><summary>Jawaban</summary>
<p>=FILTER(Nama, Nilai>80, "belum ada"). Argumen ke-3 = if_empty. Kebiasaan baik: selalu isi.</p>
</details>`}
},
{
id: "excel-l4", track: "Excel", title: "Excel Modeling Craft: Audit & Struktur",
sub: "Excel L4 · ±4 jam · Model yang bisa diaudit",
est: "4 jam",
prerequisites: ["hardcode_rule", "iferror", "dynamic_arrays"],
driveFolder: "https://drive.google.com/drive/folders/1ZemMXTh95PAjLRZc_kSY2MDJOuywblrt",
audio: "assets/audio/excel-l4.mp3",
checker: "excel-l4",
sections: [
{h: "Kenapa model berantakan = bom waktu", body: `
<p>Model yang "berfungsi" tapi berantakan punya 3 dosa: <b>angka ketik di dalam rumus</b> (=16800*1,1), <b>asumsi tersebar</b> di mana-mana, dan <b>tidak ada yang tahu alurnya</b>. Enam bulan kemudian — bahkan oleh pembuatnya sendiri — model itu tidak bisa disentuh tanpa takut merusaknya.</p>
<div class="example jebakan"><div class="lbl">🚫 Horor nyata</div>
<p>Analis mewarisi model dengan =B5*1.12 di 40 sel. "1.12 itu apa?" Tidak ada yang tahu — growth? inflasi? pajak? Mengubahnya = judi. Model seperti ini biasanya <b>dibuang dan dibangun ulang</b> — biaya yang jauh lebih mahal dari 10 menit merapikan di awal.</p></div>
<div class="callout"><b>Kenapa ini level terakhir, bukan pertama?</b> Karena craft hanya bermakna setelah kamu bisa membangun (L1–L3). Aturan tanpa kemampuan = teori kosong. Sekarang kamu sudah bisa — saatnya belajar membangun yang <b>tahan lama</b>.</div>`},
{h: "Struktur: input → kalkulasi → output", body: `
<p>Model profesional punya 3 zona yang terpisah jelas:</p>
<table class="brutal">
<tr><th>Zona</th><th>Isi</th><th>Ciri</th></tr>
<tr><td><b>INPUT</b></td><td>Asumsi: growth, tarif, driver</td><td>Sel biru — satu-satunya tempat angka ketik</td></tr>
<tr><td><b>KALKULASI</b></td><td>Rumus yang me-link</td><td>Tidak ada angka ketik \u2014 kecuali konstanta struktural 0 dan 1</td></tr>
<tr><td><b>OUTPUT</b></td><td>Hasil: laporan, chart, ringkasan</td><td>Hanya referensi ke kalkulasi</td></tr>
</table>
<div class="formula">=B5*(1+B6) ✓ &nbsp;&nbsp;vs&nbsp;&nbsp; =16800*1,1 ✗</div>
<p>Keduanya memberi 18.480 hari ini. Bedanya: 3 bulan lagi growth berubah jadi 15% — yang kiri ikut berubah otomatis, yang kanan diam-diam basi.</p>
<p><b>Pengecualian:</b> konstanta struktural <b>0 dan 1</b> boleh \u2014 angka <b>1</b> di <tt>=B5*(1+B6)</tt> artinya "pokok 100%", bukan asumsi bisnis. Yang dilarang adalah <b>asumsi bisnis yang diketik</b> di dalam rumus: tarif 10%, growth 12%, harga Rp250. Asumsi begitu wajib tinggal di sel INPUT (biru) dan dirujuk, bukan diketik ulang.</p>
<div class="callout"><b>Kenapa pemisahan ini mempercepat audit?</b> Karena mempersempit pencarian: angka salah? Cek 3 zona berurutan — input dulu (asumsinya benar?), kalkulasi (link-nya benar?), output (referensinya benar?). Tanpa zona, kamu mencari jarum di tumpukan 500 rumus.</div>`},
{h: "IFERROR: pengaman, bukan penutup bug", body: `
<div class="formula">=IFERROR(pembagian, 0) — jika error, tampil 0</div>
<p><b>Penggunaan benar:</b> pengaman di titik yang memang bisa error secara sah — pembagian yang penyebutnya bisa nol (margin saat revenue 0), lookup yang memang boleh tidak ketemu.</p>
<p><b>Penggunaan malas:</b> membungkus SELURUH model dengan IFERROR agar tidak ada merah-merah. Ini seperti mematikan alarm kebakaran karena berisik — apinya tetap ada, kamu saja yang tidak tahu.</p>
<div class="example jebakan"><div class="lbl">🚫 Bau IFERROR malas</div>
<p>=IFERROR(rumus_panjang_200_karakter, 0) — kalau hasilnya 0, kamu tidak tahu: apakah memang nol, atau ada #DIV/0!, #N/A, #VALUE! yang disembunyikan? Debug menjadi mustahil. Aturan: <b>IFERROR sekecil mungkin, sedekat mungkin dengan titik risikonya</b>.</p></div>
<div class="callout"><b>Kenapa dibedakan?</b> Karena tujuan IFERROR adalah <i>menangani</i> error yang diantisipasi, bukan <i>menyembunyikan</i> error yang tidak dipahami. Analis senior membaca IFERROR yang malas sebagai sinyal: "pembuatnya tidak tahu apa yang bisa salah di sini".</div>`},
{h: "Audit: trace precedents/dependents", body: `
<p>Menu <b>Formulas → Trace Precedents</b> menggambar panah: dari mana sel ini mengambil angka? <b>Trace Dependents</b>: ke mana sel ini mengalir? Ditambah <b>F9</b> (evaluasi bagian rumus) dan <b>Ctrl+\`</b> (tampilkan semua rumus), kamu punya <b>sinar-X</b> untuk model.</p>
<div class="callout"><b>Kenapa ini skill wajib sebelum kirim model?</b> Karena "kayaknya benar" bukan standar profesional. Ritual sebelum model dikirim: trace 5 angka kunci, pastikan tiap panah masuk akal. Lima menit yang menyelamatkan reputasi.</div>`},
{h: "Tugas praktik", body: `
<p>Bangun <b>model mini 2026</b> Warung Septian dengan struktur 3 zona (file latihan di Drive): INPUT (5 asumsi, sel biru) → KALKULASI (7 rumus, semua me-link, tanpa angka ketik!) → OUTPUT. Tambahkan <b>IFERROR</b> di dua titik pembagian dan <b>validasi input</b> dengan IF+AND. Semua sel jawaban harus rumus.</p>
<div class="callout"><b>Kenapa tugas ini penting?</b> Ini ujian kelulusan track Excel: bukan "bisa rumus", tapi "bisa membangun model yang orang lain berani pakai". Selesai ini, kamu siap masuk Hari 04+ dengan fondasi teknik yang benar.</div>`},
{h: "🔥 Bekal Hell Mode", body: `
<p>Istilah yang dipakai soal Hell Mode:</p>
<ul>
<li><b>Hardcode</b> = angka ketik di dalam rumus. Musuh #1 model yang dirawat.</li>
<li><b>Circular reference</b> = rumus yang (langsung/tidak langsung) me-referensi dirinya sendiri. Excel memberi peringatan — jangan abaikan.</li>
<li><b>Precedent/Dependent</b> = sel yang menjadi sumber / tujuan dari sebuah rumus.</li>
<li><b>Volatile</b> = fungsi yang menghitung ulang terus-menerus (NOW, OFFSET, INDIRECT). Bikin model besar lambat.</li>
</ul>`}
,
{h: "Governance model: versioning, changelog, color-coding & protection", body: `
<p>Model yang tidak bisa diaudit = model yang tidak bisa dipercaya. <b>Governance</b> adalah disiplin yang membuat modelmu bertahan 3 bulan kemudian — saat kamu sendiri sudah lupa konteksnya:</p>
<p><b>1. Versioning &amp; changelog.</b> Satu file, satu versi: nama file <i>Model_v1.2_2026-11-08.xlsx</i> (bukan <i>Model_final_FINAL2.xlsx</i>). Sheet "Changelog" di depan: tanggal | versi | apa berubah | kenapa. Aturan: tidak ada perubahan tanpa baris changelog — perubahan tanpa jejak = bug yang menunggu ditemukan orang lain.</p>
<p><b>2. Color-coding (konvensi baku).</b> Biru = input (angka yang diketik); hitam = rumus; hijau = link ke sheet lain; merah = peringatan/cek gagal. Konsisten di seluruh workbook — reviewer harus bisa membaca modelmu tanpa legenda panjang.</p>
<p><b>3. Protection.</b> Kunci (Review → Protect Sheet) semua sel rumus; biarkan input terbuka. Satu sel rumus yang tertimpa angka mati = seluruh kolom di bawahnya salah diam-diam — dan itulah bug termahal di Excel (H02 § $ yang lupa). Tambahan: satu "single source of truth" — asumsi yang sama tidak boleh diketik di dua tempat (H08: tarif pajak di satu sel input, dirujuk ke mana-mana).</p>
<div class="callout"><b>Sub-poin:</b> membangun 2 laporan (laba rugi + neraca) dari <i>trial balance mentah</i> (bukan dari transaksi seperti H05) adalah latihan governance yang sama: mapping akun → laporan harus terdokumentasi di satu sheet pemetaan, bukan dihafal di kepala. Laporan arus kas TIDAK bisa direkonstruksi dari satu trial balance — butuh saldo awal + akhir dan info transaksi/non-kas.</div>
<p><b>Contoh kerja \u2014 2 laporan dari trial balance mentah.</b> Trial balance (Rp ribu) \u2014 debit: Kas 500, Piutang 300, Persediaan 200, Beban 600 (total 1.600); kredit: Utang 400, Modal 400, Revenue 800 (total 1.600). <b>Langkah 1 \u2014 cek balance:</b> debit 1.600 = kredit 1.600 \u2713 (bila tidak sama, jangan lanjut \u2014 ada akun yang salah sisi). <b>Langkah 2 \u2014 laba:</b> Revenue 800 \u2212 Beban 600 = <b>laba 200</b>. <b>Langkah 3 \u2014 neraca:</b> aset 500 + 300 + 200 = 1.000; liabilitas 400 + ekuitas (400 + 200) = 1.000 \u2713. Kuncinya: <b>sheet pemetaan</b> \u2014 satu tabel yang menulis tiap akun trial balance dipetakan ke baris laporan mana (Kas \u2192 aset lancar; Revenue \u2192 laba rugi). Tanpa sheet pemetaan, mapping itu hanya ada di kepala pembuatnya \u2014 dan hilang saat ia cuti.</p>`}],
quiz: [
{q: "=16800*1,1 dan =B5*(1+B6) memberi hasil sama hari ini (B5=16800, B6=10%). Mana yang benar untuk model?", opts: ["Yang =B5*(1+B6)","Keduanya benar","Yang =16800*1,1","Tidak ada yang benar"], answer: 0, k: "model_structure", diff: "Easy",
 hints: ["Tiga bulan lagi growth berubah jadi 15%.", "Rumus mana yang ikut berubah otomatis?"],
 explain: "=B5*(1+B6). Angka di sel input, rumus hanya referensi — aturan no-hardcode. (Excel L4 § Struktur)"},
{q: "Kapan IFERROR digunakan dengan BENAR?", opts: ["Membungkus seluruh model agar tidak ada error merah","Di titik pembagian yang penyebutnya memang bisa nol","Untuk menyembunyikan #N/A dari VLOOKUP lama","Tidak pernah — error harus dibiarkan muncul"], answer: 1, k: "iferror", diff: "Easy",
 hints: ["Error yang diantisipasi vs error yang disembunyikan.", "Margin = laba/revenue — revenue bisa nol?"],
 explain: "IFERROR di titik risiko yang sah (pembagi bisa nol). Membungkus semuanya = mematikan alarm kebakaran. (Excel L4 § IFERROR)"},
{q: "Rumus A1: =B1+C1. B1: =A1*2. Apa yang terjadi?", opts: ["Berjalan normal","Muncul #DIV/0!","Hasilnya nol","Circular reference"], answer: 3, k: "circular_ref", diff: "Medium",
 hints: ["A1 butuh B1, B1 butuh A1…", "Lingkaran tanpa ujung."],
 explain: "Circular reference: A1↔B1 saling membutuhkan. Excel memberi peringatan — jangan abaikan atau matikan iterasi untuk 'membungkamnya'. (Excel L4 § Bekal Hell Mode)"},
{q: "Mau tahu 'sel mana saja yang memakai angka di B5'. Fitur apa?", opts: ["Cek Precedents-nya","Coba tekan F9","Cek Dependents-nya","Aktifkan Ctrl+`"], answer: 2, k: "audit_rumus", diff: "Medium",
 hints: ["Precedent = sumber (masuk), Dependent = tujuan (keluar).", "B5 adalah sumber — yang ditanya adalah tujuannya."],
 explain: "Trace Dependents: menggambar panah ke semua sel yang memakai B5. Precedents sebaliknya. (Excel L4 § Audit)"},
{q: "Model 5000 baris terasa lambat. Satu sel memakai =INDIRECT(\"Sheet\"&A1&\"!B2\") di 5000 baris. Diagnosis?", opts: ["Data terlalu banyak","Volatile — pakai INDEX saja","IFERROR disalahgunakan","RAM tidak mencukupi"], answer: 1, k: "audit_rumus", diff: "Hard",
 hints: ["Volatile = dihitung ulang setiap ada perubahan apa pun.", "INDIRECT dan OFFSET adalah biang keladi klasik."],
 explain: "INDIRECT volatile — 5000 selnya dihitung ulang terus. Ganti dengan INDEX/MATCH langsung yang non-volatile. (Excel L4 § Bekal Hell Mode)"},
{q: "Konvensi color-coding baku: sel input (angka diketik) berwarna…", opts: ["Biru","Hitam","Hijau","Merah"], answer: 0, k: "governance", diff: "Easy",
 hints: ["Hitam = rumus; hijau = link antar-sheet; merah = peringatan.", "Input = yang diketik manusia."],
 explain: "Biru = input; hitam = rumus; hijau = link ke sheet lain; merah = peringatan/cek gagal. Konsisten di seluruh workbook."},
{q: "Kenapa perubahan model wajib dicatat di changelog?", opts: ["Agar perubahan punya jejak & bisa diaudit","Agar file lebih besar","Agar warna sheet konsisten","Agar Solver berjalan"], answer: 0, k: "governance", diff: "Easy",
 hints: ["Perubahan tanpa jejak = bug yang menunggu ditemukan.", "Satu file, satu versi."],
 explain: "Changelog = jejak audit: tanggal, versi, apa berubah, kenapa. Tanpa itu, tidak ada yang bisa membedakan perbaikan dari kerusakan."},
{q: "Trial balance: debit Kas 500, Piutang 300, Persediaan 200, Beban 600; kredit Utang 400, Modal 400, Revenue 800. Laba dan cek neraca?", opts: ["Laba 200; aset 1.000 = utang 400 + ekuitas 600","Laba 600; aset 1.600 = utang 400 + ekuitas 1.200","Laba 800; aset 1.000 = utang 1.000 + ekuitas 0","Tidak balance \u2014 debit dan kredit beda"], answer: 0, k: "trial_balance", diff: "Medium",
 hints: ["Debit total = 500+300+200+600; kredit total = 400+400+800.", "Laba = revenue \u2212 beban; ekuitas = modal + laba."],
 explain: "Debit 1.600 = kredit 1.600 \u2713. Laba = 800 \u2212 600 = 200. Aset 1.000 = utang 400 + ekuitas (400+200) 600 \u2713."}

],
hellPass: 80,
hell: [
{q: "Rumus =VLOOKUP(A1, Data!A:Z, 26, FALSE) di-copy ke 10 ribu baris dan file lambat. Perbaikan terbaik?", opts: ["Ganti ke XLOOKUP dengan range sempit yang tepat","Tidak ada — VLOOKUP memang lambat","Bungkus dengan IFERROR","Pindahkan ke sheet lain"], answer: 0, diff: "Medium",
 explain: "A:Z = 26 kolom × 10rb baris dipindai sia-sia. XLOOKUP dengan range tepat (mis. A:A, Z:Z) + tidak perlu scan kolom perantara. Range sempit = separuh solusi performa."},
{q: "=IFERROR(VLOOKUP(A1, T:T, 1, FALSE), \"cek\") — apa yang disembunyikan IFERROR di sini?", opts: ["Tidak ada — ini penggunaan benar","#N/A saat tidak ketemu — padahal itu info penting (data tidak ada!)","#DIV/0!","Kesalahan ketik nama fungsi"], answer: 1, diff: "Medium",
 explain: "#N/A di sini = sinyal 'data tidak ada' — justru informasi yang harus terlihat/diinvestigasi, bukan ditutup 'cek'. IFERROR yang benar: hanya untuk error yang memang diantisipasi dan ditangani."},
{q: "Dua model: A memakai 40 named ranges, B memakai alamat sel langsung ($B$12). Mana lebih mudah diaudit orang lain?", opts: ["B — alamat sel lebih eksplisit","A — nama menjelaskan maksud (=Revenue*(1+Growth))","Sama saja","Keduanya buruk"], answer: 1, diff: "Hard",
 explain: "Named ranges = dokumentasi hidup: =Revenue_2026*(1+Growth) terbaca seperti kalimat. Syarat: nama konsisten dan tidak berlebihan (40 masih wajar untuk model besar)."},
{q: "Rumus =OFFSET(A1, B1, 0) di mana B1 berubah-ubah. Masalahnya?", opts: ["Tidak ada — OFFSET memang untuk itu","Volatile + tidak teraudit: jejak referensinya tak terlihat di trace","Hasilnya selalu salah","OFFSET sudah deprecated"], answer: 1, diff: "Hard",
 explain: "OFFSET volatile (hitung terus) DAN referensinya dinamis — Trace Precedents tidak bisa menggambar panahnya. Untuk model yang diaudit orang lain, hindari."},
{q: "Standar warna: biru = input, hitam = rumus, hijau = link antar-sheet. Kenapa ini penting?", opts: ["Agar terlihat cantik saat presentasi","Orang lain langsung tahu mana yang boleh diubah tanpa membaca tiap rumus","Warna tidak berpengaruh apa-apa","Hanya untuk model yang diprint"], answer: 1, diff: "Hard",
 explain: "Konvensi warna = kontrak visual: biru boleh diubah, hitam jangan. Auditor menilai model dalam 30 detik pertama dari warnanya — sebelum membaca satu rumus pun."}
],
tasks: [
{t: "Tugas A — Model mini 3 zona (±3 jam)", d: "Download file latihan Excel L4 dari Drive. Bangun model dengan INPUT (5 asumsi) → KALKULASI (7 rumus, tanpa angka ketik!) → OUTPUT. Tambahkan IFERROR di 2 titik + validasi input. File jawaban untuk cross-check.", url: "https://drive.google.com/drive/folders/1ZemMXTh95PAjLRZc_kSY2MDJOuywblrt"},
{t: "Tugas B — Audit model lamamu (±1 jam)", d: "Buka file latihan Hari 01/02 yang sudah kamu kerjakan. Jalankan Trace Precedents di 3 angka kunci. Cari: ada angka ketik di dalam rumus? Ada sel yang tidak ter-link? Catat temuanmu."},
{t: "Tugas C — Kuis di atas", d: "Target ≥7/8 benar. Salah? Baca hint, coba lagi."}
],
blind: {h: "Uji Kilat — angka beda", body: `
<p><b>1.</b> Rumus =C5*1,2 tersebar di 20 sel. Growth berubah jadi 1,35. Apa masalahnya dan bagaimana seharusnya sejak awal?</p>
<details class="ans"><summary>Jawaban</summary>
<p>Masalah: 1,2 adalah hardcode — harus edit 20 sel (dan pasti ada yang kelewat). Seharusnya: growth di SATU sel input, rumus =C5*(1+$B$3).</p>
</details>
<p><b>2.</b> =A1/B1 dengan B1 kadang 0. Tulis versi amannya dan jelaskan kenapa tidak membungkus seluruh kolom.</p>
<details class="ans"><summary>Jawaban</summary>
<p>=IFERROR(A1/B1, 0). IFERROR hanya di titik pembagian — kalau dibungkus sekolom, error lain (mis. #VALUE! dari teks nyasar) ikut hilang diam-diam.</p>
</details>`}
},
{
id: "excel-l5", track: "Excel", title: "Excel Valuation Tools: XNPV/XIRR & Scenario Switches",
sub: "Excel L5 · ±4 jam · Valuasi tanggal-nyata & skenario",
est: "4 jam",
prerequisites: ["abs_ref", "if_logic"],
audio: "assets/audio/excel-l5.mp3",
sections: [
{h: "Kenapa NPV/IRR menyerah saat tanggalnya berantakan", body: `
<p><b>NPV</b> dan <b>IRR</b> punya asumsi diam-diam: arus kas datang <b>rapi tiap periode</b> — t=1, t=2, t=3. Dunia nyata tidak sopan seperti itu: investasi masuk 1 Januari, top-up darurat 17 Maret, divestasi sebagian 2 Oktober. Kalau kamu memaksa arus kas berantakan ke dalam NPV, kamu <b>berbohong soal waktu</b> — dan waktu adalah setengah dari valuasi.</p>
<div class="formula">NPV = &Sigma; CF<sub>t</sub> / (1+r)<sup>t</sup> &nbsp;&nbsp;→&nbsp;&nbsp; t harus 1, 2, 3…</div>
<p>Huruf <b>X</b> di XNPV/XIRR = <i>extended</i>: ide yang sama, tapi memakai <b>tanggal nyata</b> tiap arus kas. Selisih 47 hari vs 365 hari dihitung presisi — bukan dibulatkan jadi "tahun 1".</p>
<div class="example korporat"><div class="lbl">🏢 Contoh</div>
<p>Kasus PT Cahaya Timur (simulator): capex keluar tidak selalu 31 Desember. Dengan XNPV, tanggal aktual capex masuk ke diskonto — valuasimu mengikuti kas, bukan kalender.</p></div>
<div class="callout"><b>Kenapa ini level 5, bukan level 1?</b> Karena XNPV/XIRR hanya bermakna kalau kamu sudah paham NPV/IRR biasa (Hari 09–10) dan referensi $ (L1). Tanpa fondasi itu, XNPV cuma jadi rumus ajaib yang tidak bisa kamu audit.</div>
<p><b>Catatan Google Sheets:</b> XNPV dan XIRR <b>ada di Sheets</b> dengan sintaks sama persis seperti Excel. Semua rumus di lesson ini jalan di Sheets — alur resmi course ini.</p>`},
{h: "XNPV: diskonto dengan tanggal nyata", body: `
<div class="formula">=XNPV(rate, values, dates)</div>
<p>Tiga argumen, urutan <b>tetap</b>: tingkat diskonto dulu, lalu arus kas, lalu tanggal. Contoh investasi (Rp juta):</p>
<table class="brutal">
<tr><th>Tanggal (A)</th><th>Arus kas (B)</th><th>Keterangan</th></tr>
<tr><td>1 Jan 2025</td><td>\u2212500</td><td>Investasi awal</td></tr>
<tr><td>1 Jul 2025</td><td>200</td><td>Distribusi pertama</td></tr>
<tr><td>1 Mar 2026</td><td>350</td><td>Distribusi kedua</td></tr>
</table>
<div class="formula">=XNPV(12%, B2:B4, A2:A4) &nbsp;→&nbsp; ≈ \u22124,1 (proyek marginal!)</div>
<p><b>Verifikasi manual</b> (wajib bisa — ini cara auditnya):</p>
<div class="formula">=-500 + 200/(1,12)<sup>((A3-A2)/365)</sup> + 350/(1,12)<sup>((A4-A2)/365)</sup></div>
<p>Tanggal pertama = t<sub>0</sub>. Setiap arus kas didiskon proporsional dengan <b>jarak hari sebenarnya</b> dibagi 365.</p>
<div class="example jebakan"><div class="lbl">🚫 Jebakan #1: tanggal sebagai teks</div>
<p>Tanggal diketik "1/7/2025" tapi tersimpan sebagai <b>teks</b> → XNPV melempar #VALUE!. Di Sheets: blok kolom tanggal → Format → Number → Date. Aturan: kalau tanggalnya rata kiri, curigai — tanggal asli rata kanan.</p></div>
<div class="callout"><b>Kenapa verifikasi manual penting?</b> Karena XNPV adalah kotak hitam satu sel. Analis senior tidak percaya kotak hitam — mereka mencocokkan dengan hitungan manual minimal untuk satu baris. Kalau cocok, rumusnya dipercaya; kalau tidak, ada yang salah di tanggalnya.</div>`},
{h: "XIRR: IRR untuk dunia nyata (+ jebakan multiple IRR)", body: `
<div class="formula">=XIRR(values, dates, [guess])</div>
<p>XIRR mencari tingkat diskonto yang membuat XNPV = 0. Dua syarat mati: <b>minimal satu arus kas positif dan satu negatif</b> — kalau tidak, jawabannya #NUM! (tidak ada tingkat yang bisa menyeimbangkan).</p>
<div class="example warung"><div class="lbl">🏪 Contoh</div>
<p>Investasi \u2212Rp1.000jt (1 Jan 2023), kembali Rp1.100jt (1 Jan 2024): =XIRR(B2:B3, A2:A3) → <b>10%</b>. Tepat 365 hari → sama dengan IRR biasa. Bedanya terlihat saat tanggalnya tidak bulat.</p></div>
<div class="example jebakan"><div class="lbl">🚫 Jebakan #2: multiple IRR</div>
<p>Arus kas: <b>\u2212100, +250, \u2212150</b>. Tanda berubah <b>dua kali</b> (− → + → −). Secara matematis bisa ada <b>dua IRR</b> yang sama-sama membuat NPV = 0! XIRR hanya mengembalikan satu (tergantung tebakan awal) — dan kamu tidak tahu yang mana.</p>
<p>Aturan praktis: <b>hitung berapa kali tanda berubah</b>. Sekali = satu IRR, aman. Dua kali atau lebih = laporkan sebagai "IRR tidak tunggal", jangan sajikan satu angka seolah pasti. Ini yang membedakan analis 70% vs 90%.</p></div>
<div class="callout"><b>Kenapa [guess] jarang dipakai?</b> Default 10% cukup untuk 99% kasus. Guess baru dibutuhkan saat XIRR #NUM! padahal data benar — biasanya karena IRR-nya jauh dari 10% (mis. \u221240% atau +200%). Coba =XIRR(values, dates, 0.5) atau \u22120.2 sebagai pancingan.</div>`},
{h: "CHOOSE: satu sel mengendalikan tiga skenario", body: `
<div class="formula">=CHOOSE(index, value1, value2, value3)</div>
<p><b>CHOOSE</b> memilih nilai ke-<i>index</i> dari daftar. Pola skenario standar: satu sel kontrol (mis. B1) berisi 1/2/3, seluruh model membaca skenario dari sel itu.</p>
<div class="formula">=CHOOSE($B$1, 5%, 10%, 15%) &nbsp;→&nbsp; growth bear/base/bull</div>
<p>Pasangan dengan <b>Data → Data validation → Dropdown</b> berisi Bear/Base/Bull di sel tetangga, lalu B1 =MATCH(pilihan, {"Bear","Base","Bull"}, 0). Ganti dropdown → seluruh model ikut berubah. <b>Satu sumber kebenaran.</b></p>
<div class="example jebakan"><div class="lbl">🚫 Jebakan #3: index mulai dari 0</div>
<p>Programmer terbiasa index dari 0 — CHOOSE <b>mulai dari 1</b>. =CHOOSE(0, "a", "b") → #VALUE!. Dan =CHOOSE(4, "a","b","c") → #VALUE! juga (di luar daftar). Selalu validasi dropdown ke 1..n.</p></div>
<div class="callout"><b>Kenapa CHOOSE, bukan IF bertingkat?</b> =IF(B1=1, 5%, IF(B1=2, 10%, 15%)) bekerja, tapi tidak terbaca saat skenario jadi 5. CHOOSE = daftar bersih; tambah skenario tinggal tambah satu nilai. Untuk model yang diwariskan ke orang lain, keterbacaan = kebenaran.</div>`},
{h: "Tabel sensitivitas 2-variabel — versi Google Sheets", body: `
<p>Excel punya <b>Data Table</b> (What-If Analysis) sekali klik. <b>Google Sheets tidak punya</b> — dan itu bukan kerugian. Tabel sensitivitas manual justru <b>lebih bisa diaudit</b>: setiap sel terlihat rumusnya, tidak ada sihir.</p>
<p>Pola: WACC menyamping (baris 1), growth menurun (kolom B), rumus di tiap sel dengan <b>$ campuran</b>:</p>
<table class="brutable">
<tr><th></th><th>C (10%)</th><th>D (12%)</th><th>E (14%)</th></tr>
<tr><td><b>B3: g=2%</b></td><td>1275</td><td>1020</td><td>850</td></tr>
<tr><td><b>B4: g=3%</b></td><td>1471</td><td>1144</td><td>936</td></tr>
<tr><td><b>B5: g=4%</b></td><td>1733</td><td>1300</td><td>1040</td></tr>
</table>
<div class="formula">C3: =100*(1+$B3)/(C$1-$B3) &nbsp;→&nbsp; copy ke seluruh grid</div>
<p><b>$B3</b> = kolom B terkunci (growth ikut baris), <b>C$1</b> = baris 1 terkunci (WACC ikut kolom). Ini L1 §$ yang akhirnya dipakai untuk sesuatu yang nyata. Nilai sudut: WACC 10% + g 2% → 100×1,02/0,08 = <b>1275</b>.</p>
<div class="callout"><b>Kenapa manual lebih baik dari Data Table?</b> Data Table Excel menyembunyikan logika di balik fitur — auditor tidak bisa trace rumusnya. Grid manual: klik sel mana pun, rumusnya jelas. Di interview, "saya bangun sensitivitas manual agar auditable" adalah jawaban senior.</div>
<p><b>Catatan:</b> rumus Gordon di atas (100×(1+g)/(WACC−g)) adalah versi sederhana untuk latihan. Di model penuh, tiap sel grid memanggil ulang rantai DCF lengkap — polanya sama, hanya rumusnya lebih panjang.</p>`},
{h: "Tugas praktik", body: `
<p>Bangun <b>lembar valuasi tanggal-nyata</b> di Google Sheets (mulai dari sheet kosong — tanpa file latihan, ini uji kemandirian):</p>
<ol>
<li><b>Tabel XNPV:</b> investasi \u2212Rp500jt (1 Jan 2025), +Rp200jt (1 Jul 2025), +Rp350jt (1 Mar 2026). Hitung =XNPV(12%, …) lalu <b>verifikasi manual</b> dengan rumus pangkat per baris. Keduanya harus ≈ \u22124,1.</li>
<li><b>XIRR</b> untuk tabel yang sama. Lalu uji jebakan: ganti baris terakhir jadi \u2212150 (tanda berubah 2×) — catat apa yang terjadi dan tulis kesimpulanmu satu kalimat.</li>
<li><b>Scenario switch:</b> sel B1 dropdown Bear/Base/Bull → growth =CHOOSE(…). Hubungkan ke satu baris proyeksi pendapatan.</li>
<li><b>Grid sensitivitas 3×3</b> Gordon seperti di atas. Pastikan copy-paste grid tidak merusak satu sel pun (cek sudut-sudutnya).</li>
</ol>
<div class="callout"><b>Kenapa tanpa file latihan?</b> Karena analis tidak pernah diberi template rapi oleh klien. Bagian tersulit bukan rumusnya — tapi menyusun tabelnya dari nol dengan benar. Kalau ini bisa, kamu siap untuk workbook Hari 09–10 tanpa mencontek struktur.</div>`},
{h: "🔥 Bekal Hell Mode", body: `
<p>Istilah yang dipakai soal Hell Mode:</p>
<ul>
<li><b>t<sub>0</sub></b> = tanggal arus kas pertama di XNPV/XIRR — titik nol diskonto.</li>
<li><b>Multiple IRR</b> = lebih dari satu tingkat yang membuat NPV=0; terjadi saat tanda arus kas berubah >1×.</li>
<li><b>Day-count</b> = konvensi hitung hari. XNPV/XIRR memakai aktual/365.</li>
<li><b>Index basis-1</b> = CHOOSE mulai dari 1, bukan 0.</li>
<li><b>Grid manual</b> = tabel sensitivitas dengan rumus per sel (cara Sheets) — lawan dari Data Table Excel.</li>
</ul>`}
,
{h: "Dari Data Table ke Monte Carlo: simulasi di Excel", body: `
<p>H15 menghitung Monte Carlo 3×3 dengan tangan (E[EV] Rp1.183,23jt; P(EV &lt; 1.000) = 18,75%). Di Excel, ganti grid 3×3 dengan <b>simulasi</b>: tiap iterasi menarik WACC dan g secara acak, lalu hitung EV-nya:</p>
<p><b>Resep minimal (tanpa VBA):</b> (1) WACC simulasi = <i>NORM.INV(RAND(); 12%; 2%)</i> — rata-rata 12%, simpangan baku 2%; g simulasi = <i>NORM.INV(RAND(); 3%; 1%)</i>. (2) EV simulasi = 100 × (1+g) ÷ (WACC − g) — dengan <i>IF(WACC &lt;= g; "error"; …)</i> agar tidak membagi nol/negatif. (3) Buat <b>Data Table</b> 1.000 baris: kolom iterasi 1–1.000, tiap baris menarik RAND baru (tekan F9 = simulasi baru). (4) Baca hasil: <i>AVERAGE</i> (expected value), <i>STDEV</i> (risiko), <i>COUNTIF(EV&lt;1000)/1000</i> (probabilitas gagal).</p>
<p><b>Aturan:</b> (1) jangan pakai RAND langsung di dalam rumus EV tanpa Data Table — tiap F9 mengubah semua angka dan tidak ada yang bisa direplikasi; (2) simpan satu run (paste values) sebagai bukti — simulasi yang tidak tersimpan = simulasi yang tidak terjadi; (3) 1.000 iterasi cukup untuk belajar; 10.000 untuk keputusan nyata (pakai VBA di L6 bila perlu kecepatan). Benchmark simulasi kontinu ini BERBEDA dari grid diskrit H15: dengan WACC ~ N(12%; 2%) dan g ~ N(3%; 1%) yang independen, simulasi (2 jt draw) memberi E[EV] ≈ Rp1.242jt dan P(EV&lt;1.000) ≈ 28% — BUKAN 1.183 / 19%. Grid H15 (E[EV] 1.183,23; P 18,75%) benar untuk 9 titik diskrit 3×3; simulasi kontinu memberi hasil lebih tinggi karena EV cembung terhadap WACC dan g — ekor kanan (WACC mendekati g) menarik rata-rata ke atas, sementara mediannya ≈ Rp1.144jt, dekat dengan base case. Jadi jangan samakan keduanya; bila simulasimu jauh dari 1.242 / 28%, distribusimu yang salah, bukan modelnya.</p>`}],
quiz: [
{q: "Arus kas: investasi 5 Jan, top-up 20 Mar, hasil 11 Nov (tahun sama). Fungsi valuasi yang tepat?", opts: ["=NPV(10%, …) biasa", "=IRR(…) biasa", "=XNPV(10%, values, dates)", "=SUM(…)/(1+10%)"], answer: 2, k: "xnpv", diff: "Easy",
 hints: ["NPV mengasumsikan periode sama besar.", "Huruf X = tanggal nyata."],
 explain: "=XNPV(10%, values, dates). NPV/IRR memaksa tanggal berantakan jadi periode rapi — hasilnya bohong presisi. (Excel L5 §1)"},
{q: "Urutan argumen XNPV yang benar?", opts: ["=XNPV(rate, values, dates)", "=XNPV(values, dates, rate)", "=XNPV(dates, rate, values)", "=XNPV(rate, dates, values)"], answer: 0, k: "xnpv", diff: "Easy",
 hints: ["Diskonto dulu, baru datanya.", "Sama seperti NPV: rate di depan."],
 explain: "=XNPV(rate, values, dates). Urutan salah = hasil ngaco tanpa error — hafalkan: rate, values, dates. (Excel L5 §2)"},
{q: "Satu arus kas Rp110jt tepat 365 hari dari sekarang, rate 10%. Berapa XNPV-nya?", opts: ["Rp110jt", "Rp100jt", "Rp90,91jt", "Rp121jt"], answer: 1, k: "xnpv", diff: "Medium",
 hints: ["110/(1+10%)^1 = …", "365 hari = tepat 1 tahun, jadi ini sama dengan NPV biasa."],
 explain: "110/1,1 = 100. Rp110jt = lupa mendiskon; Rp90,91jt = memakai 100 sebagai pembilang; Rp121jt = malah dikalikan. (Excel L5 §2)"},
{q: "=XIRR(values, dates) melempar #NUM! padahal ada untung dan rugi. Kemungkinan TERKECIL?", opts: ["Semua arus kas bertanda sama", "Tanggal tersimpan sebagai teks", "Range values dan dates beda panjang", "Tebakan awal 10% kurang tepat"], answer: 3, k: "xirr", diff: "Medium",
 hints: ["#NUM! = tidak konvergen atau syarat dilanggar.", "Guess hanya titik awal iterasi — jarang jadi penyebab."],
 explain: "Guess salah hampir tidak pernah jadi penyebab #NUM!; default 10% cukup untuk 99% kasus. Tiga lainnya adalah penyebab klasik. (Excel L5 §3)"},
{q: "Kolom tanggal terlihat '1/7/2025' tapi XNPV #VALUE!. Diagnosis?", opts: ["Rate terlalu besar", "Values harus diurutkan dulu", "Tanggal tersimpan sebagai teks, bukan date", "Kurang argumen guess"], answer: 2, k: "xnpv", diff: "Medium",
 hints: ["#VALUE! = tipe data salah.", "Tanggal teks rata kiri; tanggal asli rata kanan."],
 explain: "Tanggal teks → Format → Number → Date. XNPV butuh date serial, bukan string yang mirip tanggal. (Excel L5 §2)"},
{q: "Arus kas: \u2212100, +250, \u2212150. Apa bahayanya memakai XIRR tunggal?", opts: ["Tanda berubah 2× → bisa ada 2 IRR berbeda", "XIRR pasti menghasilkan 0", "Tidak bisa dihitung sama sekali", "Hasilnya selalu negatif"], answer: 0, k: "xirr_trap", diff: "Hard",
 hints: ["Hitung berapa kali tanda berubah: − → + → −.", "Satu persamaan NPV=0 bisa punya >1 solusi."],
 explain: "Dua kali ganti tanda = hingga dua IRR valid. XIRR mengembalikan satu (tergantung tebakan) — sajikan satu angka tanpa catatan = menyesatkan. (Excel L5 §3)"},
{q: "=CHOOSE(B1, \"bear\", \"base\", \"bull\"), B1 berisi 2. Hasil?", opts: ["\"bear\"", "\"bull\"", "#VALUE!", "\"base\""], answer: 3, k: "choose", diff: "Medium",
 hints: ["CHOOSE mulai dari 1, bukan 0.", "Index 2 = nilai kedua."],
 explain: "\"base\" — nilai kedua. Jebakan programmer: mengira index dari 0 lalu menjawab \"bull\". (Excel L5 §4)"},
{q: "Google Sheets tidak punya Data Table native. Cara membangun tabel sensitivitas 2-variabel?", opts: ["Install add-on khusus", "Grid manual: tiap sel rumus dengan referensi campuran $", "Tidak bisa — pindah ke Excel", "Pakai Goal Seek berulang-ulang"], answer: 1, k: "sensitivity", diff: "Medium",
 hints: ["L1 mengajarkan $ untuk ini.", "Tiap sel = rumus penuh yang memegang input baris & kolom."],
 explain: "Grid manual dengan $B3/C$1 — tiap sel transparan dan bisa diaudit, justru lebih baik dari Data Table. (Excel L5 §5)"},
{q: "Grid sensitivitas: WACC di C1:E1, growth di B3:B5. Rumus di C3 (Gordon, FCF=100) yang benar untuk di-copy ke seluruh grid?", opts: ["=100*(1+B3)/(C1-B3)", "=100*(1+B$3)/(C1-$B3)", "=100*(1+$B3)/(C$1-$B3)", "=100*(1+$B$3)/($C$1-$B$3)"], answer: 2, k: "sensitivity", diff: "Hard",
 hints: ["Growth harus ikut baris (kunci kolom B), WACC ikut kolom (kunci baris 1).", "Tanpa $ = bocor saat di-copy; $ penuh = tidak jalan."],
 explain: "=100*(1+$B3)/(C$1-$B3). $B3: kolom dikunci baris bebas; C$1: baris dikunci kolom bebas. Opsi pertama bocor, ketiga terkunci total. (Excel L5 §5 + L1 §$) "},
{q: "Simulasi Monte Carlo di Excel: rumus WACC acak (rata-rata 12%, std 2%) yang benar?", opts: ["=NORM.INV(RAND(); 12%; 2%)","=RAND()*12%","=12% + RAND()","=NORM.INV(12%; 2%)"], answer: 0, k: "monte_carlo", diff: "Medium",
 hints: ["NORM.INV butuh probabilitas acak + rata-rata + std.", "RAND() memberi probabilitas 0–1."],
 explain: "=NORM.INV(RAND(); 12%; 2%) menarik WACC dari distribusi normal mean 12%, std 2%. RAND() saja memberi uniform 0–1, bukan normal."},
{q: "Kenapa RAND tidak boleh langsung di dalam rumus EV tanpa Data Table?", opts: ["Tiap F9 mengubah semua angka; tidak bisa direplikasi","RAND tidak bisa dipakai di EV","Data Table lebih cepat","RAND hanya untuk VBA"], answer: 0, k: "monte_carlo", diff: "Easy",
 hints: ["Replikasi = hasil yang sama bisa dicek ulang.", "Simulasi yang tidak tersimpan = tidak terjadi."],
 explain: "RAND di dalam rumus membuat tiap F9 mengubah seluruh hasil tanpa jejak. Data Table + paste values satu run = bukti yang bisa diaudit."}

],
hellPass: 80,
hell: [
{q: "=XNPV(XIRR(B2:B5, A2:A5), B2:B5, A2:A5). Hasilnya (aproksimasi)?", opts: ["0", "#NUM!", "Sama dengan =NPV(…)", "#DIV/0!"], answer: 0, diff: "Hard",
 explain: "0 — itu DEFINISI IRR: tingkat yang membuat NPV = 0. Rumus ini adalah test konsistensi: kalau tidak ≈0, ada yang salah di datanya."},
{q: "XNPV memakai day-count aktual/365. Arus kas Rp365jt tepat 366 hari lagi (tahun kabisat), rate 10%. Nilai kini?", opts: ["Rp331,82jt (365/365)", "Rp365jt — kabisat diabaikan", "Rp331,73jt — sedikit lebih kecil karena 366/365", "#NUM!"], answer: 2, diff: "Hard",
 explain: "365/(1,1)^(366/365) ≈ 331,73 — sedikit lebih kecil dari 365/1,1 = 331,82. XNPV presisi tanggal nyata, termasuk kabisat. Bedanya kecil, tapi di sinilah bedanya dengan NPV."},
{q: "B1 dropdown berisi teks \"base\". Rumus growth skenario yang benar?", opts: ["=CHOOSE(B1, 5%, 10%, 15%)", "=CHOOSE(MATCH(B1, {\"bear\",\"base\",\"bull\"}, 0), 5%, 10%, 15%)", "=IF(B1=\"base\", 10%)", "=VLOOKUP(B1, …)"], answer: 1, diff: "Hard",
 explain: "CHOOSE butuh ANGKA, bukan teks — MATCH mengubah \"base\" → 2. Opsi pertama #VALUE! (teks sebagai index). Pola dropdown-teks + MATCH + CHOOSE = standar skenario profesional."},
{q: "Dua proyek: IRR(A) > IRR(B) tapi NPV(A) < NPV(B) pada WACC 12%. Keputusan?", opts: ["Pilih A — IRR lebih tinggi selalu menang", "Pilih yang payback lebih cepat", "Tolak keduanya", "Pilih B — NPV mengukur nilai absolut"], answer: 3, diff: "Hard",
 explain: "NPV menang untuk mutually exclusive: IRR mengasumsikan reinvestasi sebesar IRR itu sendiri (tidak realistis jika IRR 40%), NPV memakai WACC. Di Sheets: hitung dua-duanya, putuskan dengan NPV."},
{q: "Grid sensitivitas manual 5×5 = 25 sel, tiap sel =XNPV(…) atas 20 arus kas. File terasa lambat. Diagnosis tercepat?", opts: ["XNPV memang lambat — tidak ada solusi", "Ganti tiap sel dengan nilai hardcode", "Hitung XNPV sekali per kolom skenario, grid hanya me-reference hasilnya", "Hapus gridnya"], answer: 2, diff: "Hard",
 explain: "25 × XNPV(20 arus kas) = 500 kalkulasi iteratif. Struktur ulang: satu baris 'mesin' menghitung XNPV per skenario, grid hanya menampilkan. Prinsip L4: calculation sekali, output hanya reference."}
],
tasks: [
{t: "Tugas A — Lembar XNPV/XIRR dari nol (±2 jam)", d: "Di Google Sheets kosong: bangun tabel \u2212500/+200/+350 (tanggal 1 Jan 2025, 1 Jul 2025, 1 Mar 2026). Hitung =XNPV(12%,…) lalu verifikasi manual per baris dengan pangkat (tanggal-tanggal)/365. Keduanya ≈ \u22124,1. Lalu =XIRR(…) untuk tabel yang sama.", url: "https://drive.google.com/drive/folders/1ZemMXTh95PAjLRZc_kSY2MDJOuywblrt"},
{t: "Tugas B — Scenario switch (±1 jam)", d: "Sel B1 dropdown Bear/Base/Bull → growth =CHOOSE(MATCH(…), 5%, 10%, 15%). Hubungkan ke satu baris proyeksi pendapatan 3 tahun. Ganti dropdown, pastikan seluruh baris ikut berubah.", url: ""},
{t: "Tugas C — Grid sensitivitas 3×3 (±1 jam)", d: "Bangun grid Gordon seperti di lesson (WACC 10/12/14% × g 2/3/4%, FCF=100). Cek keempat sudutnya manual: 1275 / 850 / 1733 / 1040. Satu sel salah = pola $-mu bocor.", url: ""},
{t: "Tugas D — Kuis di atas", d: "Target ≥8/9 benar (standar 90%). Salah? Baca hint, coba lagi.", url: ""}
],
blind: {h: "Uji Kilat — angka beda", body: `
<p><b>1.</b> Arus kas: \u2212200 (1 Feb 2025), +260 (1 Agu 2025). Tulis rumus XNPV (rate 10%) dan XIRR-nya. Tanpa menghitung — cukup rumusnya benar.</p>
<details class="ans"><summary>Jawaban</summary>
<p>=XNPV(10%, B2:B3, A2:A3) dan =XIRR(B2:B3, A2:A3). Urutan: rate, values, dates untuk XNPV; values, dates untuk XIRR.</p>
</details>
<p><b>2.</b> =CHOOSE(3, 10, 20, 30) menghasilkan? Dan apa yang terjadi pada =CHOOSE(0, 10, 20, 30)?</p>
<details class="ans"><summary>Answer</summary>
<p>30 (nilai ketiga). =CHOOSE(0, …) → #VALUE! — index mulai dari 1.</p>
</details>
<p><b>3.</b> Grid: rate di D1:F1, nilai di C4:C6. Tulis rumus di D4 untuk "nilai × (1+rate)" yang aman di-copy ke seluruh grid.</p>
<details class="ans"><summary>Jawaban</summary>
<p>=$C4*(1+D$1). $C4: kolom C dikunci, baris bebas (nilai ikut baris). D$1: baris 1 dikunci, kolom bebas (rate ikut kolom). Pola sama seperti grid Gordon di lesson.</p>
</details>`}
}
,
{
id: "excel-l6", track: "Excel", title: "Excel Data Prep & Automation: Power Query, PivotTable & VBA",
sub: "Excel L6 · ±6 jam · Bersihkan data sekali, pakai selamanya",
est: "6 jam",
prerequisites: ["hardcode_rule"],
driveFolder: "https://drive.google.com/drive/folders/1ZemMXTh95PAjLRZc_kSY2MDJOuywblrt",
sections: [
{h: "Power Query: bersihkan data sekali, pakai selamanya", body: `
<p>Analis menghabiskan 80% waktunya membersihkan data — dan kebanyakan melakukannya manual, tiap bulan, dengan cara yang sama. <b>Power Query</b> (Data → Get Data) mengubah pembersihan itu jadi <i>resep yang bisa diulang</i>: tiap bulan, data baru masuk, klik Refresh, dan seluruh langkah berjalan lagi otomatis.</p>
<p><b>Alur standar (5 langkah, selalu sama):</b> (1) <b>Connect</b> — ambil dari CSV/Excel/folder (jangan copy-paste ke sheet!); (2) <b>Clean</b> — hapus baris kosong, ubah tipe data (teks → angka/tanggal), pisah kolom (Text to Columns); (3) <b>Transform</b> — unpivot tabel lebar jadi tabel panjang (kolom bulan → baris), ganti nilai salah; (4) <b>Merge/Append</b> — gabung tabel lookup (mis. mapping akun → laporan, seperti governance L4); (5) <b>Load</b> — muat sebagai tabel ke sheet "Data" (bukan ke model langsung — model membaca dari tabel ini).</p>
<div class="example warung"><div class="lbl">🏪 Contoh — rekap penjualan 12 cabang</div>
<p>12 file CSV dengan format tanggal berbeda (12/01 vs Jan-12) dan kolom "Total" yang kadang teks. Tanpa Power Query: 2 jam copy-paste + risiko salah ketik. Dengan Power Query: satu query folder → ubah tipe tanggal → unpivot bulan → load. Bulan depan: taruh file baru di folder, Refresh, selesai dalam 1 menit. <b>Aturan:</b> jangan pernah edit hasil load secara manual — edit querynya. Hasil load yang diedit manual akan tertimpa saat Refresh, dan kamu tidak akan ingat apa yang kamu ubah.</p></div>`},
{h: "PivotTable sebagai alat analisis (bukan sekadar ringkasan)", body: `
<p>PivotTable bukan alat presentasi — ini alat <b>audit &amp; analisis</b>. Tiga kegunaan yang membedakan analis dari pengguna biasa:</p>
<p><b>1. Cek kewajaran cepat:</b> tarik data transaksi ke PivotTable (baris = produk, nilai = sum revenue) — dalam 30 detik kamu melihat produk mana yang mendominasi, dan apakah totalnya cocok dengan laporan (cek silang H06).</p>
<p><b>2. Cari anomali:</b> group by bulan → lonjakan satu bulan langsung terlihat; drill-down (double-click sel) menampilkan transaksi penyusunnya — cara tercepat menemukan satu faktur yang salah ketik Rp10jt jadi Rp100jt.</p>
<p><b>3. Analisis sebelum rumus:</b> sebelum menulis SUMIFS yang rumit (L2), buat PivotTable-nya dulu — bila jawabannya bisa didapat dari PivotTable, jangan tulis rumus. Rumus untuk yang berulang &amp; terstruktur; PivotTable untuk eksplorasi &amp; audit. Pivot chart = PivotTable yang divisualkan — satu grafik yang ikut berubah saat filter berubah.</p>
<div class="callout"><b>Perangkap:</b> PivotTable yang di-copy nilainya ke model (paste values) lalu dilupakan — bulan depan angkanya basi. Bila model butuh angka PivotTable, pakai GETPIVOTDATA atau biarkan PivotTable tetap live di sheet yang sama.</div>`},
{h: "VBA dasar: rekam, baca, edit — lalu loop", body: `
<p><b>VBA (Visual Basic for Applications)</b> adalah macro Excel. Kamu tidak perlu jadi programmer — cukup 3 kemampuan: merekam, membaca hasil rekaman, dan mengeditnya sedikit:</p>
<p><b>1. Record:</b> Developer → Record Macro → lakukan tugas repetitif sekali (mis. format 12 sheet laporan) → Stop. Excel menulis kode VBA-nya untukmu.</p>
<p><b>2. Baca &amp; bersihkan:</b> Alt+F11 → hapus baris <i>Select</i> dan <i>Selection</i> yang berlebihan (hasil rekaman selalu bertele-tele); ganti range yang di-hardcode dengan variabel.</p>
<p><b>3. Loop (satu pola, pakai selamanya):</b></p>
<div class="formula">For Each ws In ThisWorkbook.Worksheets<br>&nbsp;&nbsp;ws.Range("A1").Value = "FMVA Sprint"<br>Next ws</div>
<p>Itu saja: lakukan hal yang sama ke semua sheet. Tambahkan <i>On Error GoTo ErrHandler</i> agar satu sheet yang gagal tidak membunuh seluruh macro — dan selalu simpan salinan sebelum menjalankan macro ke file asli (macro tidak punya Undo!).</p>
<div class="example jebakan"><div class="lbl">🚫 Aturan keamanan macro</div>
<p>Macro dari internet = kode yang bisa menghapus file. Jangan pernah jalankan macro yang tidak kamu baca baris per baris. Di Sprint ini: macro hanya yang kamu rekam/tulis sendiri, untuk filemu sendiri.</p></div>`},
{h: "Keyboard shortcuts: kecepatan adalah akurasi", body: `
<p>Analis yang memakai mouse untuk semua hal bukan hanya lambat — ia lelah, dan analis yang lelah membuat salah ketik. 10 shortcut yang membayar kembali dalam seminggu:</p>
<table class="brutal">
<tr><th>Shortcut</th><th>Fungsi</th></tr>
<tr><td><b>Ctrl + panah</b></td><td>Lompat ke ujung blok data</td></tr>
<tr><td><b>Ctrl + Shift + panah</b></td><td>Seleksi blok data</td></tr>
<tr><td><b>Ctrl + T</b></td><td>Ubah range jadi tabel (untuk Power Query &amp; PivotTable)</td></tr>
<tr><td><b>Alt + =</b></td><td>AutoSum</td></tr>
<tr><td><b>Ctrl + ;</b></td><td>Sisip tanggal hari ini</td></tr>
<tr><td><b>F4</b></td><td>Putar $ (absolut/relatif) saat edit rumus</td></tr>
<tr><td><b>Ctrl + \`</b></td><td>Tampilkan semua rumus (mode audit)</td></tr>
<tr><td><b>Ctrl + [</b></td><td>Lompat ke precedent (audit L4)</td></tr>
<tr><td><b>Ctrl + Shift + L</b></td><td>Filter on/off</td></tr>
<tr><td><b>Alt + E, S, V</b></td><td>Paste values</td></tr>
</table>
<p><b>Latihan:</b> kerjakan satu tugas H18 (rolling forecast) tanpa menyentuh mouse kecuali untuk klik Refresh Power Query. Lambat di hari pertama, 2× lebih cepat di hari kelima — dan lebih sedikit salah ketik karena tanganmu tidak berpindah-pindah.</p>`},
{h: "Tugas: pipeline penjualan warung end-to-end", body: `
<p><b>Tugas (di workbook Drive):</b> (1) ekspor sheet RAW_Jan/Feb/Mar jadi 3 file CSV di satu folder (datanya sudah ada di workbook); (2) bangun 1 Power Query: ambil dari folder → samakan format tanggal → unpivot → load ke tabel; (3) buat PivotTable dari tabel itu: revenue per produk per bulan + drill-down ke satu anomali yang kamu sisipkan sengaja; (4) rekam macro yang memformat laporan (header tebal, angka Rp, print area) lalu edit hasil rekamannya agar berlaku ke semua sheet (loop For Each). Kriteria lolos: tambah file CSV April → Refresh → PivotTable &amp; laporan ikut berubah tanpa edit manual.</p>`}
],
quiz: [
{q: "Prinsip #1 Power Query: data baru bulan depan ditangani dengan cara…", opts: ["Taruh file di folder → Refresh query","Copy-paste manual lagi","Edit hasil load langsung","Buat query baru dari nol"], answer: 0, k: "power_query", diff: "Easy",
 hints: ["Query = resep yang bisa diulang.", "Hasil load yang diedit manual tertimpa saat Refresh."],
 explain: "Power Query menyimpan langkah sebagai resep. File baru di folder + Refresh = seluruh pembersihan berjalan lagi otomatis."},
{q: "Untuk apa PivotTable paling berguna bagi analis (selain ringkasan)?", opts: ["Audit & cari anomali (cek total, drill-down ke transaksi)","Menggantikan semua rumus SUMIFS","Membuat grafik untuk laporan tahunan saja","Menggantikan Power Query"], answer: 0, k: "pivot", diff: "Easy",
 hints: ["Double-click sel PivotTable = transaksi penyusunnya.", "Cek silang total vs laporan = audit H06."],
 explain: "PivotTable = alat audit: cek total dalam 30 detik, drill-down ke transaksi anomali. Rumus untuk yang berulang; PivotTable untuk eksplorasi & audit."},
{q: "Macro VBA direkam untuk memformat 12 sheet. Langkah pertama yang benar sebelum menjalankannya di file asli?", opts: ["Simpan salinan (macro tidak punya Undo)","Langsung jalankan","Hapus semua Select dulu","Ubah ke Python"], answer: 0, k: "vba", diff: "Easy",
 hints: ["Macro tidak punya Undo.", "Baca macro baris per baris sebelum menjalankan."],
 explain: "Simpan salinan dulu — macro tidak bisa di-Undo. Lalu baca kodenya (Alt+F11), bersihkan Select berlebihan, baru jalankan."},
{q: "Shortcut untuk menampilkan semua rumus sekaligus (mode audit)?", opts: ["Ctrl + `","Ctrl + R","Alt + F4","Ctrl + Shift + L"], answer: 0, k: "shortcuts", diff: "Easy",
 hints: ["Tombol di kiri angka 1.", "Dipakai bersama Ctrl + [ (lompat ke precedent)."],
 explain: "Ctrl + ` (backtick) menampilkan semua rumus — mode audit L4. Ctrl + Shift + L = filter on/off."},
{q: "Hasil load Power Query diedit manual, lalu Refresh ditekan. Apa yang terjadi?", opts: ["Edit manual tertimpa (hilang)","Edit manual dipertahankan","Query error permanen","File terkunci"], answer: 0, k: "power_query", diff: "Medium",
 hints: ["Load = output query, bukan input.", "Edit querynya, bukan hasilnya."],
 explain: "Refresh menimpa hasil load dengan output query terbaru — edit manual hilang tanpa peringatan. Selalu edit query, bukan hasil."}
],
hellPass: 80
}
];

/* ---------- English mode overlays (EN) ---------- */
(function(){
const EN = {};
EN["excel-l1"] = {
title: "Excel Basics: Core Formulas & References",
sub: "Excel L1 · ±4 hrs · The foundation of every workbook",
sections: [
{h: "Why SUM/AVERAGE/COUNT is 80% of the job", body: `
<p>Open any professional model: most formulas are just <b>SUM</b>, <b>AVERAGE</b>, <b>COUNT</b>/<b>COUNTIF</b>, and <b>IF</b>. The rest is seasoning. Slow analysts usually don't lack exotic functions — they just haven't made the basics reflexive.</p>
<div class="formula">=SUMPRODUCT(Qty, Price) = Σ (Qty × Price)</div>
<p><b>SUMPRODUCT</b> is the basic-level secret weapon: it sums the products of two columns with no helper column. Total sales = SUMPRODUCT(qty, price), not typing line by line.</p>
<div class="example warung"><div class="lbl">🏪 Example</div>
<p>8 shop transactions: =SUMPRODUCT(C6:C13, D6:D13) instantly gives Rp858k. The clumsy alternative: build a "Subtotal" column first, then SUM — allowed, but two steps for one answer.</p></div>
<div class="callout"><b>Why is this the foundation?</b> Because the mindset is the same at every level: <b>let Excel do the adding, you decide the logic</b>. An analyst typing manual subtotals is moving the machine's job onto their own hands.</div>`},
{h: "IF: the first decision", body: `
<div class="formula">=IF(condition, value_if_true, value_if_false)</div>
<p>IF is the first and most frequent logic: bonus only if the target is hit, tax only if profit is positive, a category only if a threshold is crossed.</p>
<div class="example warung"><div class="lbl">🏪 Example</div>
<p>=IF(Total>=100, 50, 0) — Rp50k bonus if total ≥ Rp100k. The condition produces TRUE/FALSE; IF picks the branch.</p></div>
<div class="callout"><b>Why IF first, not something else?</b> Because almost every business rule is "if-then" shaped. Master IF until it's reflexive — later IFS, AND/OR, and IFERROR all attach to the same pattern. Bad smell: 4+ nested IFs — that's a signal to use IFS or a lookup table.</div>`},
{h: "$: absolute vs relative references", body: `
<p>Copy a formula down: <b>relative</b> references (B10) shift along; <b>absolute</b> references ($B$10) stay locked. The <b>F4</b> key cycles the $ while editing a formula.</p>
<div class="formula">=B20*(1-$B$15) → the discount in $B$15 doesn't "walk away"</div>
<div class="example jebakan"><div class="lbl">🚫 Bug #1 of the masses</div>
<p>=B20*(1-B15) copied down becomes =B21*(1-B16), =B22*(1-B17) — the discount "walks" with the rows, even though the discount lives in one cell. The result is silently wrong, no red error. The most expensive bug in Excel: <b>wrong but looking right</b>.</p></div>
<div class="callout"><b>Why is this crucial for modeling?</b> Because a model = hundreds of copied formulas. One forgotten $ = one assumption leaking everywhere. Rule of thumb: <b>references to assumption/input cells always use $</b>; references to data rows that should "walk" must not use $.</div>`},
{h: "XLOOKUP: VLOOKUP is retired", body: `
<div class="formula">=XLOOKUP("Kopi", Product_range, Price_range)</div>
<p><b>VLOOKUP</b> is fragile: it uses a column number (insert a column = broken), only searches rightward, and needs FALSE for exact match. <b>XLOOKUP</b> fixes all three: separate ranges (no column number), searches any direction, exact match by default.</p>
<div class="example korporat"><div class="lbl">🏢 Example</div>
<p>=XLOOKUP("Kopi", B6:B13, D6:D13) → 8. Insert a new column in the middle of the table? The formula stays correct — because it holds ranges, not "column 3".</p></div>
<div class="callout"><b>Why XLOOKUP straight away, not VLOOKUP first?</b> Because you don't need to inherit bad habits. VLOOKUP only needs to be recognized (many old files use it) — for all new work, XLOOKUP. Your learning time is limited; <div class="callout"><b>⚠️ Version prerequisite:</b> XLOOKUP exists only in <b>Microsoft 365 and Excel 2021+</b> — in Excel 2019 or older the formula is unknown (#NAME?). If your file must run on older Excel, use the <b>INDEX+MATCH</b> alternative (taught in Excel L2 § Why INDEX+MATCH beats VLOOKUP) — it works in every version.</div>
invest it in what's right.</div>`},
{h: "Practice task", body: `
<p>Build Warung Septian's <b>weekly sales recap</b> (practice file in Drive): 8 transactions → total qty, total sales (SUMPRODUCT), average price, COUNTIF, discounted total (with $!), IF bonus, and price via XLOOKUP. Every answer cell must be a formula.</p>
<div class="callout"><b>Why does this task matter?</b> It's the "Hello World" of modeling: raw data → answers via formulas. If these 7 formulas aren't reflexive yet, the next level will feel like running with tied shoes.</div>`},
{h: "🔥 Hell Mode briefing", body: `
<p>Terms used in the Hell Mode questions:</p>
<ul>
<li><b>SUMPRODUCT</b> = the sum of pairwise products. No helper column.</li>
<li><b>Mixed reference</b> = $ on one side only ($B15 or B$15): locks the column but not the row, or vice versa.</li>
<li><b>Exact match</b> = precise matching. XLOOKUP defaults to exact; VLOOKUP needs FALSE.</li>
<li><b>Text criteria</b> = conditions in quotes, e.g. "&gt;15" in COUNTIF. Without quotes = error.</li>
</ul>`}
],
quiz: [
{q: `The Qty column holds 8 numbers. The correct total formula?`, opts: ["=SUM(C6:C13)","=AVERAGE(C6:C13)","=COUNT(C6:C13)","=MAX(C6:C13)"], answer: 0, k: "sum_avg",
 hints: ["Total = add them all up.","The 'add up' function in English…"],
 explain: `=SUM(C6:C13). AVERAGE = average, COUNT = how many, MAX = largest.`},
{q: `You want to count 'transactions with qty above 15'. The right function?`, opts: ["=COUNT(C6:C13) alone","=COUNTA(C6:C13) alone","=COUNTIF(C6:C13,\">15\")","=SUMIF(C6:C13,\">15\")"], answer: 2, k: "sum_avg",
 hints: ["'How many with a condition' = COUNT + IF.","The condition is written as text in quotes."],
 explain: `=COUNTIF(C6:C13, "&gt;15") — COUNTIF = COUNT with one criterion.`},
{q: `The formula =B20*(1-$B$15) is copied from C20 to C21. What happens to $B$15?`, opts: ["It shifts down to $B$16","It stays $B$15 because it's locked","It shifts right to $C$15","It becomes a #REF! error instead"], answer: 1, k: "abs_ref",
 hints: ["$ locks: $B = locked column, $15 = locked row.","Copying down shifts rows — except locked ones."],
 explain: `It stays $B$15. The $ locks column AND row — the assumption cell doesn't 'walk'.`},
{q: `Why is XLOOKUP safer than VLOOKUP for a model maintained for years?`, opts: ["XLOOKUP always calculates much faster","XLOOKUP automatically formats results","VLOOKUP can no longer be used at all","XLOOKUP survives column inserts (no column number)"], answer: 3, k: "xlookup",
 hints: ["VLOOKUP(\"x\", table, 3, FALSE) — what is that 3?","Insert one column mid-table, then watch what happens to the 3."],
 explain: `VLOOKUP holds 'column 3' — insert a column and the reference goes stale. XLOOKUP holds ranges directly.`},
{q: `Bonus rule: revenue ≥1000 → 10%, revenue ≥500 → 5%, else 0%. Best formula structure?`, opts: ["=IF(A1>=500,5%,IF(A1>=1000,10%,0))","=IFS(A1>=1000,10%,A1>=500,5%,1,0)","=IF(A1>=1000,10%,0)+IF(A1>=500,5%,0)","=SWITCH(TRUE,A1>=1000,10%,5%)"], answer: 1, k: "if_logic",
 hints: ["The first option is misordered: 1,200 hits the 5% branch first.","IFS checks conditions in order — write from the strictest."],
 explain: `=IFS(A1>=1000, 10%, A1>=500, 5%, TRUE, 0). IFS reads better than nested IFs; order from the highest threshold. The first option is buggy: 1200 hits the 5% branch first.`}
],
hell: [
{q: `Which is FASTEST for Excel on 100k rows: SUMPRODUCT(A:A,B:B) vs a helper column C=A*B then SUM(C:C)?`, opts: ["Helper column — usually slightly faster & far easier to audit","Same result; Excel optimizes both the same","SUMPRODUCT — one formula always wins","Helper column is slower because it eats memory"], answer: 0,
 explain: `Helper column + SUM is usually slightly faster and FAR easier to audit — but by how much depends on data size and Excel version, so test it in your own workbook before generalizing. SUMPRODUCT is elegant for small cases; for 100k rows, transparency + speed = helper column.`},
{q: `=SUM($B6:B$12) copied rightward into column C. What range gets summed?`, opts: ["=SUM($B6:B$12) — completely unchanged","=SUM($B6:C$12) — the start stays in B, the end shifts to C","=SUM($B7:B$13) — the rows shift along","Error because the $ is mixed"], answer: 1,
 explain: `$B is locked (stays B), B$12 locks the row but the column is free → becomes $B6:C$12. That's a mixed reference: lock what must stay, free what must walk.`},
{q: `=XLOOKUP("Kopi", B6:B13, D6:D13, "tidak ada"). Product not found. Result?`, opts: ["#N/A","0","\"tidak ada\"","#VALUE!"], answer: 2,
 explain: `XLOOKUP's 4th argument = if_not_found. Without it, the result is #N/A. Always fill this argument in models — unhandled #N/A propagates through the whole report.`},
{q: `=COUNTIF(C6:C13, >15) — no quotes. What happens?`, opts: ["Runs fine and the result is 3","Error — operator criteria must be quoted","It gets computed as greater than 150","The result is silently computed as 0"], answer: 1,
 explain: `Comparison operators in criteria MUST be quoted: "&gt;15". Without quotes = syntax error. Exception: a plain number criterion (=15) may skip quotes.`},
{q: `=IF(AND(A1>0, B1<>0), A1/B1, 0). When is the result 0?`, opts: ["Only when A1 = 0","When A1 ≤ 0 OR B1 = 0","Only when B1 = 0","Never — always A1/B1"], answer: 1,
 explain: `AND needs both TRUE: A1>0 AND B1≠0. Either fails → 0. Watch out: B1<>"" only checks for empty — B1 holding 0 still passes and A1/0 = #DIV/0!. A real division guard checks for a zero denominator (B1<>0).`}
],
tasks: [
{t: "Task A — Weekly sales recap (±2 hrs)", d: "Download the Excel L1 practice file from Drive. Work the 7 formulas: SUM, SUMPRODUCT, AVERAGE, COUNTIF, discount ($!), IF, XLOOKUP. Every answer cell must be a formula — the answer file is for cross-checking.", url: "https://drive.google.com/drive/folders/1ZemMXTh95PAjLRZc_kSY2MDJOuywblrt"},
{t: "Task B — 10-minute $ drill (±30 min)", d: "Open the practice file, select the 'discounted total' formula, press F4 repeatedly until the cycle is memorized: B15 → $B$15 → B$15 → $B15 → B15. Then copy the formula to 3 empty cells and verify the result stays 772.2.", url: ""},
{t: "Task C — The quiz above", d: "Target ≥4/5 correct. Missed some? Read the hints, try again.", url: ""}
],
blind: {h: "Speed Drill — different numbers", body: `
<p><b>1.</b> Qty: 5, 12, 9, 20, 7. Write the total and average formulas (no calculator).</p>
<details class="ans"><summary>Answer</summary>
<p>=SUM(...) → 53; =AVERAGE(...) → 10.6. If you typed 53 manually — repeat this level.</p>
</details>
<p><b>2.</b> =D10*(1-$D$3) copied from E10 to E11 and to F10. Write both resulting formulas.</p>
<details class="ans"><summary>Answer</summary>
<p>E11: =D11*(1-$D$3). F10: =E10*(1-$D$3). $D$3 never moves — only the $-less parts walk.</p>
</details>`}
};
EN["excel-l2"] = {
title: "Excel Intermediate: Lookup & Aggregation",
sub: "Excel L2 · ±5 hrs · Multi-criteria & messy data",
sections: [
{h: "Why INDEX+MATCH beats VLOOKUP", body: `
<div class="formula">=INDEX(Revenue_range, MATCH("Bandung", Branch_range, 0))</div>
<p>Two steps: <b>MATCH</b> finds the <i>position</i> ("Bandung" = row 7), <b>INDEX</b> grabs the value at that position. This combo can look <b>leftward</b>, survives <b>column inserts</b>, and is faster on big tables.</p>
<div class="example jebakan"><div class="lbl">🚫 When VLOOKUP fails completely</div>
<p>Table: column A = Price, column B = Product. Want the price of "Kopi"? VLOOKUP can't — it only searches the <b>leftmost</b> column and grabs to the <b>right</b>. INDEX+MATCH: =INDEX(A:A, MATCH("Kopi", B:B, 0)) — free direction.</p></div>
<div class="callout"><b>Why is this intermediate level?</b> Because it's the "find the position, then grab" pattern — the two-step thinking reused in 2-criteria SUMPRODUCT (L3) and in every complex lookup. Master the pattern, not the memorized formula.</div>`},
{h: "SUMIFS/COUNTIFS: conditional aggregation", body: `
<div class="formula">=SUMIFS(what_to_sum, criteria_range1, criteria1, criteria_range2, criteria2, ...)</div>
<p>The correct order: <b>what to sum first</b>, then the criteria pairs. All criteria must be TRUE at once (AND). The full family: SUMIFS, COUNTIFS, AVERAGEIFS, MAXIFS, MINIFS.</p>
<div class="example warung"><div class="lbl">🏪 Example</div>
<p>=SUMIFS(Revenue, Branch, "Jakarta", Product, "Kopi", Month, "Feb") → 1200. Three filters at once, one formula.</p></div>
<div class="callout"><b>Why not manual filter + SUBTOTAL?</b> Because manual filters leave no audit trail: next week the data changes and the number goes stale with no warning. SUMIFS recalculates automatically — a living model, not a photograph.</div>`},
{h: "TEXT & DATE: messy data", body: `
<p>Real data is never tidy: dates as text, manually-joined codes, inconsistent names. Three cleanup tools:</p>
<ul>
<li><b>&amp;</b> — join text: =A7&amp;"-"&amp;B7 → "Jakarta-Jan".</li>
<li><b>LEN/LEFT/RIGHT/MID</b> — dissect text: =LEN(...) to validate code lengths.</li>
<li><b>DATE/EOMONTH</b> — dates as numbers: =EOMONTH(date, 1) for next month-end.</li>
</ul>
<div class="example korporat"><div class="lbl">🏢 Example</div>
<p>The Date column holds the text '2026-01-15'. =MONTH(DATEVALUE(A1)) → <b>1</b>: DATEVALUE turns the text into a real Excel date (serial 46037), then MONTH takes the month. Without DATEVALUE you rely on Excel's implicit conversion — invisible in the audit trail. DATEVALUE makes the conversion explicit: if the text isn't a recognizable date, you get a visible #VALUE!, not a silently wrong number.</p></div>
<div class="callout"><b>⚠️ Depends on regional settings:</b> DATEVALUE reads text using your Windows/Excel date format — '01/02/2026' is 2 January in a US locale (MM/DD) but 1 February in an Indonesian locale (DD/MM). If a DATEVALUE result is off by a month, check regional settings before blaming the formula. The ISO format '2026-01-15' is safe in both locales — and for ambiguous text, the most explicit route is building the date with DATE + LEFT/MID/RIGHT.</div>
<div class="callout"><b>Why is this an analyst skill?</b> Because analysts spend 80% of their time cleaning data, not analyzing. Whoever can tidy data in 10 minutes with formulas will always beat whoever hand-edits for 2 hours — and the result is repeatable.</div>`},
{h: "Guardrails: data validation & conditional formatting", body: `
<p>Two features that stop garbage <i>before</i> it wrecks the model:</p>
<ul>
<li><b>Data Validation</b> — restrict cell contents: branch dropdown (Jakarta/Bandung), numbers 0–100 for percents. A "Jakrta" typo can't get through.</li>
<li><b>Conditional Formatting</b> — cells light up automatically when odd: balance ≠ 0 turns red, negative margin turns yellow.</li>
</ul>
<div class="callout"><b>Why is this intermediate level?</b> Because this is the difference between "a file I use myself" and "a file a team uses". Professional models assume users will mistype — and guard with rails, not with hope.</div>`},
{h: "Practice task", body: `
<p>Build a <b>2-branch × 3-month recap</b> (practice file in Drive): 12 transactions → 8 formulas (SUMIFS ×3, COUNTIFS, INDEX+MATCH, LEN, MAXIFS, AVERAGEIFS). Then add a <b>data validation</b> dropdown for the Branch column and <b>conditional formatting</b> that colors revenue &lt; 700 yellow.</p>
<div class="callout"><b>Why does this task matter?</b> It's the most common junior-analyst job simulation: "please recap sales per branch per month". Whoever answers in 15 minutes with formulas always beats whoever pivots manually for half an hour.</div>`},
{h: "🔥 Hell Mode briefing", body: `
<p>Terms used in the Hell Mode questions:</p>
<ul>
<li><b>Array</b> = a set of values processed at once, e.g. (A1:A10="x").</li>
<li><b>Multiple criteria</b> = several conditions at once; in *IFS it means AND.</li>
<li><b>Position vs value</b> = MATCH returns a position (a number), INDEX grabs the value at that position.</li>
<li><b>Volatile</b> = functions that keep recalculating (OFFSET, INDIRECT, NOW). Avoid in big models.</li>
</ul>`}
],
quiz: [
{q: `You need a price from a table where the Product column is to the RIGHT of the Price column. Which function can do it?`, opts: ["VLOOKUP (rightward only)","HLOOKUP (searches downward)","INDEX + MATCH (free direction)","SUMIFS (aggregation only)"], answer: 2, k: "index_match",
 hints: ["VLOOKUP can only grab to the right of the key column.","Split it into two steps: find the position, then grab."],
 explain: `INDEX + MATCH — free direction, column positions don't matter. VLOOKUP fails completely here.`},
{q: `=SUMIFS(D:D, A:A, "Jakarta", C:C, "Kopi"). What is computed?`, opts: ["The count of Jakarta-Kopi rows","Total of column D for rows that are Jakarta AND Kopi","Average of column D for Jakarta or Kopi","Total of column D for Jakarta OR Kopi"], answer: 1, k: "sumifs",
 hints: ["SUMIFS = SUM with criteria.","Multiple criteria in *IFS means all must match."],
 explain: `Total of column D where branch=Jakarta AND product=Kopi. *IFS criteria = AND, not OR.`},
{q: `The Date column holds the text '2026-01-15'. Cleanest way to get the month as the number 1?`, opts: ["=MONTH(DATEVALUE(A1))","Take the 7 leftmost characters","Take the 2 middle characters","Just type it manually"], answer: 0, k: "text_date",
 hints: ["Text dates must become dates before you tinker.","DATEVALUE converts text into an Excel date."],
 explain: `=MONTH(DATEVALUE(A1)) — convert text to a date, then take the month. LEFT/MID are fragile if the format changes.`},
{q: `A branch data-validation dropdown is installed, but an old cell holds 'Jakrta' (typo). What happens?`, opts: ["Excel auto-corrects it on the spot","It stays — only new input is guarded","The file becomes totally corrupt","It gets emptied automatically"], answer: 1, k: "pivottable",
 hints: ["Validation = a gatekeeper, not a janitor.","Data that slipped in before the guardrail was installed…"],
 explain: `Validation only blocks new wrong input; old typo'd data stays and must be cleaned manually (or with formulas).`},
{q: `Which statement about PivotTable vs *IFS formulas is TRUE?`, opts: ["PivotTables are faster, formulas are slower","PivotTables max out at 10 thousand data rows","Both do exactly the same thing","Formulas are auditable; PivotTables need refresh"], answer: 3, k: "pivottable",
 hints: ["Think: data grows next week — which one follows automatically?","Audit trail = someone else can see WHERE the number came from."],
 explain: `*IFS formulas are live and auditable; PivotTables need Refresh and hide their trail behind clicks. For maintained models, formulas win.`}
],
hell: [
{q: `=MATCH("Bandung", A2:A100, 0) returns 7, but =INDEX(D1:D100, 7) is wrong. Likely cause?`, opts: ["The MATCH is wrong — it should use 1, not 0","Misaligned ranges: A starts at row 2, D starts at row 1","INDEX cannot be paired with MATCH here","VLOOKUP must be used instead of this"], answer: 1,
 explain: `MATCH returns position 7 inside A2:A100 (= row 8 of the sheet), while INDEX(D1:D100, 7) takes row 7 of D1:D100 (= row 7 of the sheet) — off by one row. INDEX+MATCH demands aligned ranges: same start and same length (e.g. A2:A100 with D2:D100).`},
{q: `=COUNTIFS(A:A, ">100", B:B, "Jan", C:C, "<>Mie"). Is the row (150, Jan, Kopi) counted?`, opts: ["Yes — it meets all three criteria","No — \"<>Mie\" cancels everything","No — COUNTIFS allows max 2 criteria","Yes — but it's counted twice"], answer: 0,
 explain: `150>100 ✓, Jan ✓, Kopi<>Mie ✓ → counted once. "<>" = not equal to. COUNTIFS supports dozens of criteria.`},
{q: `Sum revenue only for rows where qty > average qty. One-cell formula?`, opts: ["=SUMIF(Qty, \">\"&AVERAGE(Qty), Revenue)","=SUM(Revenue) - AVERAGE(Qty)","Impossible in one formula","=SUMIFS(Revenue, Qty, AVERAGE(Qty))"], answer: 0,
 explain: `Criteria can be expressions: ">"&AVERAGE(Qty) joins a text operator with a computed result. This 'dynamic criteria' pattern is used constantly.`},
{q: `Why is SUMIFS(Revenue, Branch, J1) better than SUMIFS(Revenue, Branch, "Jakarta") in a maintained model?`, opts: ["Excel computes it much faster","The criterion in J1 can change without touching the formula — assumptions separate from logic","The result becomes more accurate","There is no difference at all"], answer: 1,
 explain: `The Day 01 rule: assumptions in input cells, formulas only reference. "Jakarta" typed in a formula = hardcode disguised as a criterion. Change the branch = edit the formula = risk.`},
{q: `Conditional formatting: color cells red when #N/A. The correct rule?`, opts: ["Format cells containing → equal to → #N/A","Use the formula =ISNA(A1) as the rule","Impossible — #N/A can't be detected by formatting","Color them manually one by one"], answer: 1,
 explain: `=ISNA(A1) as a formula-based rule. 'Equal to #N/A' fails because #N/A is an error, not text. ISNA/ISERROR are the proper error detectors.`}
],
tasks: [
{t: "Task A — 2-branch × 3-month recap (±3 hrs)", d: "Download the Excel L2 practice file from Drive. Work the 8 formulas: SUMIFS ×3, COUNTIFS, INDEX+MATCH, LEN, MAXIFS, AVERAGEIFS. Add a Branch data-validation dropdown + conditional formatting for revenue <700. The answer file is for cross-checking.", url: "https://drive.google.com/drive/folders/1ZemMXTh95PAjLRZc_kSY2MDJOuywblrt"},
{t: "Task B — Audit with F9 (±1 hr)", d: "Select part of a formula (e.g. MATCH(...)), press F9 — Excel shows its interim result. Use this to debug a wrong INDEX+MATCH. Undo with Esc (not Enter!).", url: ""},
{t: "Task C — The quiz above", d: "Target ≥4/5 correct. Missed some? Read the hints, try again.", url: ""}
],
blind: {h: "Speed Drill — different numbers", body: `
<p><b>1.</b> Data: (A, Jan, 10), (A, Feb, 30), (B, Jan, 20). Write a SUMIFS for the A total, and a COUNTIFS for rows with value &gt;15.</p>
<details class="ans"><summary>Answer</summary>
<p>=SUMIFS(value, code, "A") → 40. =COUNTIFS(value, "&gt;15") → 2 (30 and 20). Note: text criteria always in quotes.</p>
</details>
<p><b>2.</b> Names in column C, salaries in column E. Write a formula to fetch "Budi"'s salary without VLOOKUP.</p>
<details class="ans"><summary>Answer</summary>
<p>=INDEX(E:E, MATCH("Budi", C:C, 0)). Two steps: position first, value second.</p>
</details>`}
};
EN["excel-l3"] = {
title: "Excel Advanced: Dynamic Arrays",
sub: "Excel L3 · ±5 hrs · One formula, many results",
sections: [
{h: "Why spill changes how you think", body: `
<p>Old Excel: one formula = one cell. <b>Dynamic arrays</b> (Excel 365): one formula = <b>many cells</b> — the result "spills" into neighboring cells automatically.</p>
<div class="formula">=SEQUENCE(10) → 1,2,3,...,10 from ONE cell</div>
<p>No dragging, no Ctrl+D. Change 10 to 1000 — the result extends itself.</p>
<div class="example jebakan"><div class="lbl">🚫 The #SPILL! trap</div>
<p>Data sitting below? The spill formula shows <b>#SPILL!</b> — not a formula error, just a blocked path. Clear the spill area, problem solved. Don't "fix" the formula.</p></div>
<div class="callout"><b>Why is this revolutionary for modeling?</b> Because it kills the entire bug class of "forgot to drag to the bottom". Before: add 1 projection year = drag every formula (and pray none was missed). Now: SEQUENCE(10) becomes SEQUENCE(11), done.</div>`},
{h: "UNIQUE/FILTER/SORT: queries inside cells", body: `
<p>These three functions = <b>database queries</b> inside the spreadsheet:</p>
<ul>
<li><b>UNIQUE</b> — unique value list: =UNIQUE(Category) → {Beverages, Food}.</li>
<li><b>FILTER</b> — filter rows: =FILTER(Product, Revenue>1000) → only top products.</li>
<li><b>SORT</b> — sort: =SORT(Revenue) → ascending (default). <b>Careful:</b> the "descending" argument DIFFERS in Excel (<tt>-1</tt>) vs Google Sheets (<tt>FALSE</tt>) — for "largest value", use <b>=LARGE(Revenue,1)</b>, identical in every app.</li>
</ul>
<div class="formula">=ROWS(FILTER(Product, Revenue>B15)) → count what passes the filter</div>
<div class="callout"><b>Why does this replace lots of manual work?</b> Because the "filter → count/sort" pattern used to need manual filter + copy-paste + separate formulas (3 steps, unaudited). Now one live formula: data changes, results follow. Combined with ROWS/SUM they become dynamic aggregation.</div>`},
{h: "2-criteria SUMPRODUCT & LET: readable formulas", body: `
<p>Two techniques that keep complex formulas human:</p>
<div class="formula">=SUMPRODUCT((Product="Kopi Susu")*(Category="Beverages")*Revenue)</div>
<p><b>2-criteria SUMPRODUCT:</b> array multiplication (condition1)*(condition2) = AND — rows meeting both contribute their Revenue, the rest are multiplied by 0. It generally works the same on modern versions (Excel 365, current Google Sheets, LibreOffice 24.8+) — check your app version if behavior differs.</p>
<div class="formula">=LET(t, SUM(Revenue), t*1.1)</div>
<p><b>LET</b> names a calculation: compute once (t), use many times. A 200-character formula becomes readable — and computes faster by not repeating.</p>
<div class="callout"><b>Why is readability a feature, not style?</b> Because formulas are read 10× more often than written — by you 3 months from now, or by a boss auditing. A formula that can't be read = a formula that can't be trusted.</div>`},
{h: "Data tables & Goal Seek: sensitivity analysis", body: `
<p>Two "what-if" tools with no VBA:</p>
<ul>
<li><b>Data Table</b> (What-If Analysis) — sensitivity table: how does profit change if growth is 5%/10%/15%? Set once, Excel computes every scenario.</li>
<li><b>Goal Seek</b> — find the input that hits a target: "what growth gives profit = 2,000?" — Excel back-solves for you.</li>
</ul>
<div class="callout"><b>Why is this an analyst's weapon?</b> Because business questions are never "what's the profit?" — always "what's the profit IF ...?". Data tables answer 9 scenarios at once; Goal Seek answers the reversed question. Neither needs a single line of VBA.</div>`},
{h: "Practice task", body: `
<p>Build Warung Septian's <b>product analysis</b> (practice file in Drive): 10 products → 7 array formulas (ROWS+UNIQUE, ROWS+FILTER, LARGE, SEQUENCE, 2-criteria SUMPRODUCT, LET, SUM+FILTER). Then build a <b>data table</b> sensitivity: total revenue for revenue cutoffs 800/1000/1200.</p>
<div class="callout"><b>Why does this task matter?</b> This is the level where Excel stops being a "calculator" and becomes a "query language". Finish this and you can answer business questions straight from raw data — the skill that separates analysts from operators.</div>`},
{h: "🔥 Hell Mode briefing", body: `
<p>Terms used in the Hell Mode questions:</p>
<ul>
<li><b>Spill</b> = an array formula's result "spilling" into neighboring cells automatically.</li>
<li><b>#SPILL!</b> = the spill area is blocked — clear it, don't fix the formula.</li>
<li><b>Array</b> = a set of values; (A1:A10&gt;5) produces a TRUE/FALSE array.</li>
<li><b>Anchor</b> = the cell where the spill formula is written (only this cell holds the formula).</li>
</ul>`}
,
{h: "Solver: multi-variable optimisation with constraints", body: `
<p>Goal Seek (L3) changes <b>one</b> input until one target is met. <b>Solver</b> changes <b>many</b> inputs at once, under constraints — the optimisation Wharton uses in its capstone:</p>
<p><b>How to use it:</b> Data → Solver → Set Objective (the cell to maximise/minimise) → By Changing Variable Cells → Subject to the Constraints → Solving Method: <b>Simplex LP</b> for linear models (like below), GRG Nonlinear when variables multiply each other or carry powers.</p>
<div class="example korporat"><div class="lbl">🏢 Example — allocating Rp1,000m of capex</div>
<p>Three projects, NPV per Rp1 invested: A 0.25; B 0.20; C 0.15. Caps: A max 400; B max 500; C max 600. Total ≤ 1,000. Solver: allocate A 400 (NPV 100), B 500 (NPV 100), C 100 (NPV 15) → <b>total NPV Rp215m</b>. Check: 400 + 500 + 100 = 1,000 ✓; NPV = 100 + 100 + 15 = 215 ✓. The "fill from the highest NPV-per-rupiah first" intuition works here because the model is linear — Solver proves it, not guesses it.</p></div>
<p><b>Audit rules:</b> (1) write constraints in cells (not only in the Solver dialog) so reviewers can see the limits; (2) note the solving method next to the result; (3) sensitivity-test: change one constraint and see whether the allocation moves — if it does not, that constraint is non-binding and may be dropped. Solver without documented constraints = an answer nobody can replicate.</p>
<div class="callout"><b>Bridge to Day 15:</b> a decision tree answers <i>when</i> to decide; Solver answers <i>how much</i> is optimal. Both are optimisation — one over time, one over quantity.</div>`}],
quiz: [
{q: `=SEQUENCE(10) written in A1. The value in A5?`, opts: ["The result is the value 10","The result is the value 1","The result is the value 5","A #SPILL! error appears"], answer: 2, k: "dynamic_arrays",
 hints: ["SEQUENCE(n) spills 1 through n.","A1=1, A2=2, …"],
 explain: `A5 = 5. One formula in A1 produces 10 cells.`},
{q: `Cells below a FILTER formula already hold data. What shows?`, opts: ["The filter overwrites the old data","A #SPILL! error shows up","A #REF! error shows up instead","The filter result gets cut off"], answer: 1, k: "dynamic_arrays",
 hints: ["Excel won't silently overwrite your data.","There's a dedicated error for this case."],
 explain: `#SPILL! — clear the spill area. Not a formula error, but a space collision.`},
{q: `You want to count 'how many products have revenue above Rp1,000k'. One-cell formula?`, opts: ["=FILTER(Product,Revenue>1000)","=COUNTIF(Revenue,\">1000\")","=ROWS(FILTER(Product,Revenue>1000))","=SUMPRODUCT(Revenue>1000)"], answer: 2, k: "filter_sort",
 hints: ["FILTER spills its list — you need its COUNT.","Which function counts rows?"],
 explain: `=ROWS(FILTER(...)) — filter first, count the result. COUNTIF works here too, but the FILTER+ROWS pattern generalizes.`},
{q: `=SUMPRODUCT((A:A="x")*(B:B="y")*C:C). What does it compute?`, opts: ["Sum of C where A='x' and B='y'","Count of rows with A='x'","The value 1 sitting in column C","Average of C over all rows"], answer: 0, k: "sumproduct",
 hints: ["(condition1)*(condition2): TRUE*TRUE = ?","Non-matching rows get multiplied by 0 — they vanish from the sum."],
 explain: `Array multiplication = AND: only rows meeting both contribute their C value.`},
{q: `=LET(t, SUM(A:A), t*1.1) vs =SUM(A:A)*1.1. When is LET actually useful?`, opts: ["It is never worth it","Only for plain numbers","For short, simple formulas","When a value is used repeatedly"], answer: 3, k: "let_lambda",
 hints: ["Imagine SUM(A:A) written 4 times in one formula.","LET = name it, compute once."],
 explain: `LET shines when a long sub-calculation is reused: =LET(t, SUM(...big...), t*1.1 - t*0.05). Compute once, readable, faster.`},
{q: "Capex Rp1,000m; NPV per Rp: A 0.25 (max 400), B 0.20 (max 500), C 0.15 (max 600). Optimal Solver NPV?", opts: ["Rp215m (A 400, B 500, C 100)","Rp200m (A 400, B 500, C 0)","Rp250m (A 400, B 500, C 600)","Rp150m (C 600, B 400)"], answer: 0, k: "solver", diff: "Medium",
 hints: ["Fill from the highest NPV-per-rupiah: A first, then B, then the rest to C.", "400 + 500 + 100 = 1,000; NPV = 100 + 100 + 15."],
 explain: "A 400 (NPV 100) + B 500 (NPV 100) + C 100 (NPV 15) = Rp215m. Total exactly at the 1,000 limit."},
{q: "Goal Seek vs Solver — the main difference?", opts: ["Solver changes many inputs with constraints; Goal Seek one input, one target","Goal Seek is more accurate","Solver is only for DCF","There is no difference"], answer: 0, k: "solver", diff: "Easy",
 hints: ["Goal Seek: one cell changes.", "Solver: many cells + constraints."],
 explain: "Goal Seek = one input, one target. Solver = many inputs at once with constraints (Simplex LP for linear models)."}

],
hell: [
{q: `=SORT(UNIQUE(A:A), 1, TRUE) — the execution order?`, opts: ["Apply SORT first, then UNIQUE after it","UNIQUE first (inner), then SORT (outer)","Apply both of them at the same time","Error — these two can't be stacked"], answer: 1,
 explain: `Inner functions evaluate first: UNIQUE produces the unique list, SORT sorts it. Composition = read inside-out. (Arguments 1, TRUE = ascending — the form that works identically in Excel & Google Sheets.)`},
{q: `=FILTER(A:A, B:B>100, "empty"). Nothing matches. Result?`, opts: ["#CALC!","\"empty\"","0","#N/A"], answer: 1,
 explain: `FILTER's 3rd argument = if_empty. Without it: #CALC!. Always fill it — like if_not_found in XLOOKUP.`},
{q: `A spill formula in A1 spills 10 rows (rows 1–10). You delete the WHOLE row 5 (right-click → Delete). What happens?`, opts: ["The formula breaks permanently","Spill recalculates — still 10 values, occupying rows 1–10 after the shift; no empty row is \"skipped\"","Permanent #SPILL! until the file reopens","Excel makes only 9 rows"], answer: 1,
 explain: `Deleting a WHOLE row shifts the rows below up; the spill recalculates and still spills 10 values in rows 1–10. Different from clearing the contents of cell A5 only: the spill refills it. Different again from copied formulas that leave #REF! holes.`},
{q: `=SEQUENCE(5, 3) produces?`, opts: ["5 rows × 3 columns of numbers 1–15","3 rows × 5 columns","Error — SEQUENCE is 1-D only","5 columns × 3 rows"], answer: 0,
 explain: `SEQUENCE(rows, columns): 5×3 = 15 sequential numbers. The foundation for date/scenario matrices.`},
{q: `Why is =SUM(FILTER(Revenue, Category="Beverages")) better than SUMIFS here?`, opts: ["Always faster to compute","FILTER is reusable for the list too — one logic, two outputs","SUMIFS can't filter text","There is no difference"], answer: 1,
 explain: `FILTER produces the list itself (auditable), SUM wraps it. One logic used two ways: =FILTER(...) for the list, =SUM(FILTER(...)) for the total. Consistent.`}
],
tasks: [
{t: "Task A — 10-item product analysis (±3 hrs)", d: "Download the Excel L3 practice file from Drive. Work the 7 array formulas. Then build a data-table sensitivity of total revenue for cutoffs 800/1000/1200 (Data → What-If Analysis). The answer file is for cross-checking.", url: "https://drive.google.com/drive/folders/1ZemMXTh95PAjLRZc_kSY2MDJOuywblrt"},
{t: "Task B — Play with #SPILL! (±30 min)", d: "Deliberately put data below a FILTER formula until #SPILL! appears. Then clear it and watch it recover. The goal: don't panic when you see it in real work.", url: ""},
{t: "Task C — The quiz above", d: "Target ≥4/5 correct. Missed some? Read the hints, try again.", url: ""}
],
blind: {h: "Speed Drill — different numbers", body: `
<p><b>1.</b> Values: 3, 7, 7, 2, 9. Write formulas for: (a) the count of unique values, (b) the 2nd largest value.</p>
<details class="ans"><summary>Answer</summary>
<p>(a) =ROWS(UNIQUE(...)) → 4. (b) =LARGE(...,2) → 7.</p>
</details>
<p><b>2.</b> =FILTER(Names, Score&gt;80) spills 0 rows (nothing passes). How to show "none yet" instead of an error?</p>
<details class="ans"><summary>Answer</summary>
<p>=FILTER(Names, Score&gt;80, "none yet"). The 3rd argument = if_empty. Good habit: always fill it.</p>
</details>`}
};
EN["excel-l4"] = {
title: "Excel Modeling Craft: Audit & Structure",
sub: "Excel L4 · ±4 hrs · Models that can be audited",
sections: [
{h: "Why a messy model = a time bomb", body: `
<p>A model that "works" but is messy has 3 sins: <b>typed numbers inside formulas</b> (=16800*1.1), <b>assumptions scattered</b> everywhere, and <b>nobody knows the flow</b>. Six months later — even by its own author — the model can't be touched without fear of breaking it.</p>
<div class="example jebakan"><div class="lbl">🚫 Real horror</div>
<p>An analyst inherits a model with =B5*1.12 in 40 cells. "What is 1.12?" Nobody knows — growth? inflation? tax? Changing it = gambling. Models like this usually get <b>thrown away and rebuilt</b> — far costlier than 10 minutes of tidying up front.</p></div>
<div class="callout"><b>Why is this the last level, not the first?</b> Because craft only means something after you can build (L1–L3). Rules without ability = empty theory. You can build now — time to learn to build <b>to last</b>.</div>`},
{h: "Structure: input → calculation → output", body: `
<p>Professional models have 3 clearly separated zones:</p>
<table class="brutal">
<tr><th>Zone</th><th>Contents</th><th>Trait</th></tr>
<tr><td><b>INPUT</b></td><td>Assumptions: growth, rates, drivers</td><td>Blue cells — the only place typed numbers live</td></tr>
<tr><td><b>CALCULATION</b></td><td>Linking formulas</td><td>No typed numbers \u2014 except structural constants 0 and 1</td></tr>
<tr><td><b>OUTPUT</b></td><td>Results: reports, charts, summary</td><td>Only references to calculation</td></tr>
</table>
<div class="formula">=B5*(1+B6) ✓ &nbsp;&nbsp;vs&nbsp;&nbsp; =16800*1.1 ✗</div>
<p>Both give 18,480 today. The difference: 3 months from now growth changes to 15% — the left one follows automatically, the right one silently goes stale.</p>
<p><b>Exception:</b> structural constants <b>0 and 1</b> are fine \u2014 the <b>1</b> in <tt>=B5*(1+B6)</tt> means "100% of the base", not a business assumption. What is banned is a <b>typed business assumption</b> inside a formula: a 10% rate, 12% growth, a Rp250 price. Assumptions like that must live in a blue INPUT cell and be referenced, never re-typed.</p>
<div class="callout"><b>Why does separation speed up audits?</b> Because it narrows the search: wrong number? Check the 3 zones in order — input first (is the assumption right?), calculation (are the links right?), output (are the references right?). Without zones, you're hunting a needle in a 500-formula haystack.</div>`},
{h: "IFERROR: guard, not bug cover", body: `
<div class="formula">=IFERROR(division, 0) — if error, show 0</div>
<p><b>Correct use:</b> guarding points that can legitimately error — a division whose denominator can be zero (margin when revenue is 0), a lookup that's allowed to miss.</p>
<p><b>Lazy use:</b> wrapping the ENTIRE model in IFERROR so nothing shows red. That's like disabling the fire alarm because it's noisy — the fire's still there, you just don't know.</p>
<div class="example jebakan"><div class="lbl">🚫 The lazy-IFERROR smell</div>
<p>=IFERROR(200_character_long_formula, 0) — if the result is 0, you don't know: is it really zero, or is there a hidden #DIV/0!, #N/A, #VALUE!? Debugging becomes impossible. Rule: <b>IFERROR as small as possible, as close as possible to its risk point</b>.</p></div>
<div class="callout"><b>Why the distinction?</b> Because IFERROR's job is to <i>handle</i> anticipated errors, not <i>hide</i> misunderstood ones. Senior analysts read lazy IFERROR as a signal: "the author doesn't know what can go wrong here".</div>`},
{h: "Audit: trace precedents/dependents", body: `
<p>The <b>Formulas → Trace Precedents</b> menu draws arrows: where does this cell get its numbers? <b>Trace Dependents</b>: where does this cell flow to? Plus <b>F9</b> (evaluate part of a formula) and <b>Ctrl+\`</b> (show all formulas), and you have <b>X-ray vision</b> for models.</p>
<div class="callout"><b>Why is this a mandatory skill before sending a model?</b> Because "looks right" isn't a professional standard. The ritual before a model ships: trace 5 key numbers, make sure every arrow makes sense. Five minutes that save a reputation.</div>`},
{h: "Practice task", body: `
<p>Build Warung Septian's <b>2026 mini model</b> with a 3-zone structure (practice file in Drive): INPUT (5 assumptions, blue cells) → CALCULATION (7 formulas, all linking, zero typed numbers!) → OUTPUT. Add <b>IFERROR</b> at two division points and <b>input validation</b> with IF+AND. Every answer cell must be a formula.</p>
<div class="callout"><b>Why does this task matter?</b> It's the Excel track's graduation exam: not "can do formulas", but "can build a model others dare to use". Finish this and you're ready for Day 04+ with proper technique.</div>`},
{h: "🔥 Hell Mode briefing", body: `
<p>Terms used in the Hell Mode questions:</p>
<ul>
<li><b>Hardcode</b> = a typed number inside a formula. Enemy #1 of maintained models.</li>
<li><b>Circular reference</b> = a formula that (directly/indirectly) references itself. Excel warns you — don't ignore it.</li>
<li><b>Precedent/Dependent</b> = cells that are the source / destination of a formula.</li>
<li><b>Volatile</b> = functions that keep recalculating (NOW, OFFSET, INDIRECT). They slow big models down.</li>
</ul>`}
,
{h: "Model governance: versioning, changelog, colour-coding & protection", body: `
<p>A model that cannot be audited = a model that cannot be trusted. <b>Governance</b> is the discipline that keeps your model alive 3 months later — when you yourself have forgotten the context:</p>
<p><b>1. Versioning &amp; changelog.</b> One file, one version: name it <i>Model_v1.2_2026-11-08.xlsx</i> (not <i>Model_final_FINAL2.xlsx</i>). A "Changelog" sheet up front: date | version | what changed | why. Rule: no change without a changelog row — a change with no trail = a bug waiting for someone else to find.</p>
<p><b>2. Colour-coding (standard convention).</b> Blue = inputs (typed numbers); black = formulas; green = links to other sheets; red = warnings/failed checks. Consistent across the whole workbook — a reviewer must be able to read your model without a long legend.</p>
<p><b>3. Protection.</b> Lock (Review → Protect Sheet) every formula cell; leave inputs open. One formula cell overwritten by a hard number = the whole column below it silently wrong — the most expensive bug in Excel (Day 02 § the forgotten $). Plus: one "single source of truth" — the same assumption must never be typed in two places (Day 08: the tax rate lives in one input cell, referenced everywhere).</p>
<div class="callout"><b>Sub-point:</b> building 2 statements (income statement + balance sheet) from a raw <i>trial balance</i> (not from transactions like Day 05) is the same governance exercise: the account → statement mapping must be documented on one mapping sheet, not memorised in your head. The cash-flow statement CANNOT be reconstructed from a single trial balance — it needs opening + closing balances and transaction/non-cash information.</div>
<p><b>Worked example \u2014 2 statements from a raw trial balance.</b> Trial balance (Rp thousands) \u2014 debits: Cash 500, Receivables 300, Inventory 200, Expenses 600 (total 1,600); credits: Payables 400, Capital 400, Revenue 800 (total 1,600). <b>Step 1 \u2014 check the balance:</b> debits 1,600 = credits 1,600 \u2713 (if they differ, stop \u2014 some account sits on the wrong side). <b>Step 2 \u2014 profit:</b> Revenue 800 \u2212 Expenses 600 = <b>profit 200</b>. <b>Step 3 \u2014 balance sheet:</b> assets 500 + 300 + 200 = 1,000; liabilities 400 + equity (400 + 200) = 1,000 \u2713. The key: a <b>mapping sheet</b> \u2014 one table writing which trial-balance account maps to which statement line (Cash \u2192 current assets; Revenue \u2192 income statement). Without a mapping sheet, the mapping lives only in its author's head \u2014 and leaves when they go on leave.</p>`}],
quiz: [
{q: `=16800*1.1 and =B5*(1+B6) give the same result today (B5=16800, B6=10%). Which is right for a model?`, opts: ["The =B5*(1+B6) one","Both are right","The =16800*1.1 one","Neither is right"], answer: 0, k: "model_structure",
 hints: ["Three months from now growth changes to 15%.","Which formula follows automatically?"],
 explain: `=B5*(1+B6). Numbers in input cells, formulas only reference — the no-hardcode rule.`},
{q: `When is IFERROR used CORRECTLY?`, opts: ["Wrapping the whole model so no red errors show","Where a denominator can genuinely be zero","To hide #N/A from an old VLOOKUP","Never — errors should always show"], answer: 1, k: "iferror",
 hints: ["Anticipated errors vs hidden errors.","Margin = profit/revenue — can revenue be zero?"],
 explain: `IFERROR at legitimate risk points (a divisor that can be zero). Wrapping everything = disabling the fire alarm.`},
{q: `Formula A1: =B1+C1. B1: =A1*2. What happens?`, opts: ["Runs normally","A #DIV/0! appears","The result is zero","Circular reference"], answer: 3, k: "circular_ref",
 hints: ["A1 needs B1, B1 needs A1…","A loop with no end."],
 explain: `Circular reference: A1↔B1 need each other. Excel warns you — don't ignore it or silence it with iteration.`},
{q: `You want to know 'which cells use the number in B5'. Which feature?`, opts: ["Check its Precedents","Try pressing F9","Check its Dependents","Toggle Ctrl+\`"], answer: 2, k: "audit_rumus",
 hints: ["Precedent = source (in), Dependent = destination (out).","B5 is the source — the question asks about destinations."],
 explain: `Trace Dependents: draws arrows to every cell using B5. Precedents is the reverse.`},
{q: `A 5000-row model feels slow. One cell uses =INDIRECT("Sheet"&A1&"!B2") across 5000 rows. Diagnosis?`, opts: ["There is simply too much data","Volatile — just use INDEX","The IFERROR function is misused","The computer has insufficient RAM"], answer: 1, k: "audit_rumus",
 hints: ["Volatile = recalculated on every change whatsoever.","INDIRECT and OFFSET are the classic culprits."],
 explain: `INDIRECT is volatile — all 5000 cells recalculate constantly. Replace with a direct non-volatile INDEX/MATCH.`},
{q: "Standard colour-coding: input cells (typed numbers) are…", opts: ["Blue","Black","Green","Red"], answer: 0, k: "governance", diff: "Easy",
 hints: ["Black = formulas; green = links between sheets; red = warnings.", "Inputs = what a human types."],
 explain: "Blue = inputs; black = formulas; green = links to other sheets; red = warnings/failed checks. Consistent across the workbook."},
{q: "Why must model changes be logged in a changelog?", opts: ["So changes leave a trail & can be audited","So the file gets bigger","So sheet colours stay consistent","So Solver runs"], answer: 0, k: "governance", diff: "Easy",
 hints: ["A change with no trail = a bug waiting to be found.", "One file, one version."],
 explain: "The changelog = the audit trail: date, version, what changed, why. Without it, nobody can tell an improvement from damage."},
{q: "Trial balance: debits Cash 500, Receivables 300, Inventory 200, Expenses 600; credits Payables 400, Capital 400, Revenue 800. Profit and balance-sheet check?", opts: ["Profit 200; assets 1,000 = payables 400 + equity 600","Profit 600; assets 1,600 = payables 400 + equity 1,200","Profit 800; assets 1,000 = payables 1,000 + equity 0","Out of balance \u2014 debits and credits differ"], answer: 0, k: "trial_balance", diff: "Medium",
 hints: ["Debit total = 500+300+200+600; credit total = 400+400+800.", "Profit = revenue \u2212 expenses; equity = capital + profit."],
 explain: "Debits 1,600 = credits 1,600 \u2713. Profit = 800 \u2212 600 = 200. Assets 1,000 = payables 400 + equity (400+200) 600 \u2713."}

],
hell: [
{q: `=VLOOKUP(A1, Data!A:Z, 26, FALSE) copied to 10 thousand rows and the file is slow. Best fix?`, opts: ["Switch to XLOOKUP with tight, exact ranges","Nothing — VLOOKUP is just slow","Wrap it in IFERROR","Move it to another sheet"], answer: 0,
 explain: `A:Z = 26 columns × 10k rows scanned for nothing. XLOOKUP with exact ranges (e.g. A:A, Z:Z) + no scanning of in-between columns. Tight ranges = half the performance fix.`},
{q: `=IFERROR(VLOOKUP(A1, T:T, 1, FALSE), "cek") — what is IFERROR hiding here?`, opts: ["Nothing — this is correct use","#N/A when not found — but that's important info (data missing!)","#DIV/0!","A mistyped function name"], answer: 1,
 explain: `#N/A here = the signal 'data missing' — exactly the information that should stay visible/be investigated, not covered with 'cek'. Correct IFERROR: only for errors that are genuinely anticipated and handled.`},
{q: `Two models: A uses 40 named ranges, B uses direct cell addresses ($B$12). Which is easier for someone else to audit?`, opts: ["B — cell addresses are more explicit","A — names explain intent (=Revenue*(1+Growth))","Same either way","Both are bad"], answer: 1,
 explain: `Named ranges = living documentation: =Revenue_2026*(1+Growth) reads like a sentence. Condition: consistent names, not excessive (40 is still fine for a big model).`},
{q: `=OFFSET(A1, B1, 0) where B1 keeps changing. The problem?`, opts: ["None — OFFSET is made for that","Volatile + unauditable: its reference trail is invisible to tracing","The result is always wrong","OFFSET is deprecated"], answer: 1,
 explain: `OFFSET is volatile (always recalculating) AND its reference is dynamic — Trace Precedents can't draw its arrows. For models others audit, avoid it.`},
{q: `Color standard: blue = input, black = formula, green = cross-sheet link. Why does it matter?`, opts: ["To look pretty in client presentations","Others instantly know what's safe to change without reading every formula","The colors change nothing at all","Only for models being printed"], answer: 1,
 explain: `Color convention = a visual contract: blue may change, black must not. Auditors judge a model in the first 30 seconds from its colors — before reading a single formula.`}
],
tasks: [
{t: "Task A — 3-zone mini model (±3 hrs)", d: "Download the Excel L4 practice file from Drive. Build a model with INPUT (5 assumptions) → CALCULATION (7 formulas, zero typed numbers!) → OUTPUT. Add IFERROR at 2 points + input validation. The answer file is for cross-checking.", url: "https://drive.google.com/drive/folders/1ZemMXTh95PAjLRZc_kSY2MDJOuywblrt"},
{t: "Task B — Audit your old model (±1 hr)", d: "Open the Day 01/02 practice file you already worked. Run Trace Precedents on 3 key numbers. Hunt: any typed numbers inside formulas? Any unlinked cells? Note your findings.", url: ""},
{t: "Task C — The quiz above", d: "Target ≥7/8 correct. Missed some? Read the hints, try again.", url: ""}
],
blind: {h: "Speed Drill — different numbers", body: `
<p><b>1.</b> The formula =C5*1.2 is spread across 20 cells. Growth changes to 1.35. What's the problem, and how should it have been built from the start?</p>
<details class="ans"><summary>Answer</summary>
<p>Problem: 1.2 is a hardcode — you must edit 20 cells (and will surely miss one). Proper: growth in ONE input cell, formulas =C5*(1+$B$3).</p>
</details>
<p><b>2.</b> =A1/B1 with B1 sometimes 0. Write the safe version and explain why you don't wrap the whole column.</p>
<details class="ans"><summary>Answer</summary>
<p>=IFERROR(A1/B1, 0). IFERROR only at the division point — wrap a whole column and other errors (e.g. #VALUE! from stray text) disappear silently too.</p>
</details>`}
};
EN["excel-l5"] = {
title: "Excel Valuation Tools: XNPV/XIRR & Scenario Switches",
sub: "Excel L5 · ±4 hrs · Real-date valuation & scenarios",
sections: [
{h: "Why NPV/IRR give up on messy dates", body: `
<p><b>NPV</b> and <b>IRR</b> carry a silent assumption: cash flows arrive <b>neatly each period</b> — t=1, t=2, t=3. Real life isn't that polite: investment on Jan 1, emergency top-up on Mar 17, partial exit on Oct 2. Forcing messy cash flows into NPV means <b>lying about timing</b> — and timing is half of valuation.</p>
<div class="formula">NPV = &Sigma; CF<sub>t</sub> / (1+r)<sup>t</sup> &nbsp;&nbsp;→&nbsp;&nbsp; t must be 1, 2, 3…</div>
<p>The <b>X</b> in XNPV/XIRR = <i>extended</i>: the same idea, but using each cash flow's <b>real date</b>. A 47-day vs 365-day gap is counted precisely — not rounded to "year 1".</p>
<div class="example korporat"><div class="lbl">🏢 Example</div>
<p>The PT Cahaya Timur case (simulator): capex doesn't always land on Dec 31. With XNPV, the actual capex date enters the discounting — your valuation follows the cash, not the calendar.</p></div>
<div class="callout"><b>Why is this level 5, not level 1?</b> Because XNPV/XIRR only make sense once you understand plain NPV/IRR (Days 09–10) and $ references (L1). Without that foundation, XNPV is just a magic formula you can't audit.</div>
<p><b>Google Sheets note:</b> XNPV and XIRR <b>exist in Sheets</b> with exactly the same syntax as Excel. Every formula in this lesson runs in Sheets — this course's official workflow.</p>`},
{h: "XNPV: discounting with real dates", body: `
<div class="formula">=XNPV(rate, values, dates)</div>
<p>Three arguments, <b>fixed</b> order: discount rate first, then cash flows, then dates. Investment example (Rp million):</p>
<table class="brutal">
<tr><th>Date (A)</th><th>Cash flow (B)</th><th>Note</th></tr>
<tr><td>Jan 1, 2025</td><td>\u2212500</td><td>Initial investment</td></tr>
<tr><td>Jul 1, 2025</td><td>200</td><td>First distribution</td></tr>
<tr><td>Mar 1, 2026</td><td>350</td><td>Second distribution</td></tr>
</table>
<div class="formula">=XNPV(12%, B2:B4, A2:A4) &nbsp;→&nbsp; ≈ \u22124.1 (marginal project!)</div>
<p><b>Manual verification</b> (mandatory skill — this is how you audit it):</p>
<div class="formula">=-500 + 200/(1.12)<sup>((A3-A2)/365)</sup> + 350/(1.12)<sup>((A4-A2)/365)</sup></div>
<p>The first date = t<sub>0</sub>. Each cash flow is discounted proportionally to its <b>actual day distance</b> divided by 365.</p>
<div class="example jebakan"><div class="lbl">🚫 Trap #1: dates stored as text</div>
<p>A date typed "1/7/2025" but stored as <b>text</b> → XNPV throws #VALUE!. In Sheets: select the date column → Format → Number → Date. Rule: if your dates align left, be suspicious — real dates align right.</p></div>
<div class="callout"><b>Why does manual verification matter?</b> Because XNPV is a one-cell black box. Senior analysts don't trust black boxes — they reconcile with a manual calc for at least one row. If it matches, the formula is trusted; if not, something's wrong with the dates.</div>`},
{h: "XIRR: IRR for the real world (+ the multiple-IRR trap)", body: `
<div class="formula">=XIRR(values, dates, [guess])</div>
<p>XIRR finds the discount rate that makes XNPV = 0. Two hard requirements: <b>at least one positive and one negative cash flow</b> — otherwise you get #NUM! (no rate can balance it).</p>
<div class="example warung"><div class="lbl">🏪 Example</div>
<p>Invest \u2212Rp1,000m (Jan 1, 2023), receive Rp1,100m (Jan 1, 2024): =XIRR(B2:B3, A2:A3) → <b>10%</b>. Exactly 365 days → same as plain IRR. The difference shows when dates aren't round.</p></div>
<div class="example jebakan"><div class="lbl">🚫 Trap #2: multiple IRRs</div>
<p>Cash flows: <b>\u2212100, +250, \u2212150</b>. The sign changes <b>twice</b> (− → + → −). Mathematically there can be <b>two IRRs</b> that both make NPV = 0! XIRR returns only one (depending on the starting guess) — and you don't know which.</p>
<p>Rule of thumb: <b>count the sign changes</b>. Once = one IRR, safe. Twice or more = report "non-unique IRR", don't present one number as certain. This is what separates 70% analysts from 90% ones.</p></div>
<div class="callout"><b>Why is [guess] rarely used?</b> The 10% default covers 99% of cases. You only need guess when XIRR returns #NUM! despite correct data — usually because the IRR is far from 10% (e.g. \u221240% or +200%). Try =XIRR(values, dates, 0.5) or \u22120.2 as bait.</div>`},
{h: "CHOOSE: one cell controls three scenarios", body: `
<div class="formula">=CHOOSE(index, value1, value2, value3)</div>
<p><b>CHOOSE</b> picks the <i>index</i>-th value from a list. The standard scenario pattern: one control cell (e.g. B1) holding 1/2/3, the whole model reading its scenario from that cell.</p>
<div class="formula">=CHOOSE($B$1, 5%, 10%, 15%) &nbsp;→&nbsp; bear/base/bull growth</div>
<p>Pair with <b>Data → Data validation → Dropdown</b> holding Bear/Base/Bull in a neighboring cell, then B1 =MATCH(choice, {"Bear","Base","Bull"}, 0). Change the dropdown → the whole model follows. <b>One source of truth.</b></p>
<div class="example jebakan"><div class="lbl">🚫 Trap #3: index starts at 0</div>
<p>Programmers expect 0-based index — CHOOSE <b>starts at 1</b>. =CHOOSE(0, "a", "b") → #VALUE!. And =CHOOSE(4, "a","b","c") → #VALUE! too (out of list). Always validate the dropdown to 1..n.</p></div>
<div class="callout"><b>Why CHOOSE instead of nested IF?</b> =IF(B1=1, 5%, IF(B1=2, 10%, 15%)) works, but becomes unreadable at 5 scenarios. CHOOSE = a clean list; adding a scenario means appending one value. For models inherited by others, readability = correctness.</div>`},
{h: "2-variable sensitivity tables — the Google Sheets way", body: `
<p>Excel has <b>Data Table</b> (What-If Analysis) in one click. <b>Google Sheets doesn't</b> — and that's no loss. A manual sensitivity table is <b>more auditable</b>: every cell shows its formula, no magic.</p>
<p>The pattern: WACC across (row 1), growth down (column B), one formula per cell with <b>mixed $</b>:</p>
<table class="brutable">
<tr><th></th><th>C (10%)</th><th>D (12%)</th><th>E (14%)</th></tr>
<tr><td><b>B3: g=2%</b></td><td>1275</td><td>1020</td><td>850</td></tr>
<tr><td><b>B4: g=3%</b></td><td>1471</td><td>1144</td><td>936</td></tr>
<tr><td><b>B5: g=4%</b></td><td>1733</td><td>1300</td><td>1040</td></tr>
</table>
<div class="formula">C3: =100*(1+$B3)/(C$1-$B3) &nbsp;→&nbsp; copy across the grid</div>
<p><b>$B3</b> = column B locked (growth follows rows), <b>C$1</b> = row 1 locked (WACC follows columns). This is L1 §$ finally used for something real. Corner check: WACC 10% + g 2% → 100×1.02/0.08 = <b>1275</b>.</p>
<div class="callout"><b>Why is manual better than Data Table?</b> Excel's Data Table hides logic behind a feature — auditors can't trace its formulas. Manual grid: click any cell, the formula is clear. In interviews, "I build sensitivity manually so it's auditable" is a senior answer.</div>
<p><b>Note:</b> the Gordon formula above (100×(1+g)/(WACC−g)) is the simplified training version. In a full model, each grid cell re-runs the complete DCF chain — same pattern, longer formula.</p>`},
{h: "Practice task", body: `
<p>Build a <b>real-date valuation sheet</b> in Google Sheets (start from a blank sheet — no practice file, this tests independence):</p>
<ol>
<li><b>XNPV table:</b> invest \u2212Rp500m (Jan 1, 2025), +Rp200m (Jul 1, 2025), +Rp350m (Mar 1, 2026). Compute =XNPV(12%,…) then <b>verify manually</b> with per-row power formulas. Both should ≈ \u22124.1.</li>
<li><b>XIRR</b> for the same table. Then test the trap: change the last row to \u2212150 (sign changes 2×) — note what happens and write your conclusion in one sentence.</li>
<li><b>Scenario switch:</b> cell B1 dropdown Bear/Base/Bull → growth =CHOOSE(…). Link it to one 3-year revenue projection row.</li>
<li><b>3×3 sensitivity grid</b> Gordon as above. Verify all four corners manually: 1275 / 850 / 1733 / 1040. One wrong cell = your $ pattern leaks.</li>
</ol>
<div class="callout"><b>Why no practice file?</b> Because analysts are never handed a tidy template by clients. The hardest part isn't the formula — it's laying out the table correctly from scratch. If you can do this, you're ready for Days 09–10 workbooks without copying structure.</div>`},
{h: "🔥 Hell Mode briefing", body: `
<p>Terms used in the Hell Mode questions:</p>
<ul>
<li><b>t<sub>0</sub></b> = the first cash-flow date in XNPV/XIRR — the discounting origin.</li>
<li><b>Multiple IRR</b> = more than one rate making NPV=0; happens when cash-flow signs change >1×.</li>
<li><b>Day-count</b> = day-counting convention. XNPV/XIRR use actual/365.</li>
<li><b>1-based index</b> = CHOOSE starts at 1, not 0.</li>
<li><b>Manual grid</b> = a per-cell-formula sensitivity table (the Sheets way) — the opposite of Excel's Data Table.</li>
</ul>`}
,
{h: "From Data Table to Monte Carlo: simulation in Excel", body: `
<p>Day 15 computed a 3×3 Monte Carlo by hand (E[EV] Rp1,183.23m; P(EV &lt; 1,000) = 18.75%). In Excel, replace the 3×3 grid with a <b>simulation</b>: each iteration draws WACC and g at random, then computes EV:</p>
<p><b>Minimal recipe (no VBA):</b> (1) simulated WACC = <i>NORM.INV(RAND(), 12%, 2%)</i> — mean 12%, standard deviation 2%; simulated g = <i>NORM.INV(RAND(), 3%, 1%)</i>. (2) simulated EV = 100 × (1+g) ÷ (WACC − g) — wrapped in <i>IF(WACC &lt;= g, "error", …)</i> so you never divide by zero or a negative. (3) Build a <b>Data Table</b> of 1,000 rows: iteration column 1–1,000, each row drawing fresh RAND (press F9 = a new simulation). (4) Read the results: <i>AVERAGE</i> (expected value), <i>STDEV</i> (risk), <i>COUNTIF(EV&lt;1000)/1000</i> (failure probability).</p>
<p><b>Rules:</b> (1) never put RAND directly inside the EV formula without a Data Table — every F9 changes all numbers and nothing is replicable; (2) save one run (paste values) as evidence — a simulation that is not saved = a simulation that never happened; (3) 1,000 iterations is enough to learn; 10,000 for real decisions (use L6 VBA if you need speed). Benchmark for this continuous simulation DIFFERS from the Day 15 discrete grid: with WACC ~ N(12%, 2%) and g ~ N(3%, 1%), independent, a simulation (2m draws) gives E[EV] ≈ Rp1,242m and P(EV&lt;1,000) ≈ 28% — NOT 1,183 / 19%. The Day 15 grid (E[EV] 1,183.23; P 18.75%) is correct for its 9 discrete 3×3 points; the continuous simulation runs higher because EV is convex in WACC and g — the right tail (WACC near g) pulls the mean up, while the median is ≈ Rp1,144m, close to the base case. Do not conflate the two; if your simulation is far from 1,242 / 28%, your distributions are wrong, not the model.</p>`}],
quiz: [
{q: `Cash flows: invest Jan 5, top-up Mar 20, proceeds Nov 11 (same year). The right valuation function?`, opts: ["Plain =NPV(10%, …)", "Plain =IRR(…)", "=XNPV(10%, values, dates)", "=SUM(…)/(1+10%)"], answer: 2, k: "xnpv",
 hints: ["NPV assumes equal-sized periods.", "The X = real dates."],
 explain: `=XNPV(10%, values, dates). NPV/IRR force messy dates into tidy periods — precisely wrong. (Excel L5 §1)`},
{q: `The correct XNPV argument order?`, opts: ["=XNPV(rate, values, dates)", "=XNPV(values, dates, rate)", "=XNPV(dates, rate, values)", "=XNPV(rate, dates, values)"], answer: 0, k: "xnpv",
 hints: ["Discount first, then the data.", "Same as NPV: rate up front."],
 explain: `=XNPV(rate, values, dates). Wrong order = wrong result with no error — memorize: rate, values, dates. (Excel L5 §2)`},
{q: `One cash flow of Rp110m exactly 365 days from now, rate 10%. Its XNPV?`, opts: ["Rp110m", "Rp100m", "Rp90.91m", "Rp121m"], answer: 1, k: "xnpv",
 hints: ["110/(1+10%)^1 = …", "365 days = exactly 1 year, so this equals plain NPV."],
 explain: `110/1.1 = 100. Rp110m = forgot to discount; Rp90.91m = used 100 as numerator; Rp121m = multiplied instead. (Excel L5 §2)`},
{q: `=XIRR(values, dates) throws #NUM! despite real gains and losses. LEAST likely cause?`, opts: ["All cash flows share one sign", "Dates stored as text", "Values and dates ranges differ in length", "The 10% starting guess is slightly off"], answer: 3, k: "xirr",
 hints: ["#NUM! = no convergence or violated requirement.", "Guess is only an iteration start — rarely the cause."],
 explain: `A wrong guess is almost never the #NUM! cause; the 10% default covers 99% of cases. The other three are classic causes. (Excel L5 §3)`},
{q: `The date column shows '1/7/2025' but XNPV gives #VALUE!. Diagnosis?`, opts: ["Rate too large", "Values must be sorted first", "Dates stored as text, not dates", "Missing guess argument"], answer: 2, k: "xnpv",
 hints: ["#VALUE! = wrong data type.", "Text dates align left; real dates align right."],
 explain: `Text dates → Format → Number → Date. XNPV needs date serials, not date-looking strings. (Excel L5 §2)`},
{q: `Cash flows: \u2212100, +250, \u2212150. The danger of using a single XIRR?`, opts: ["Sign changes 2× → two different IRRs may exist", "XIRR always returns 0", "It can't be computed at all", "The result is always negative"], answer: 0, k: "xirr_trap",
 hints: ["Count the sign changes: − → + → −.", "One NPV=0 equation can have >1 solution."],
 explain: `Two sign changes = up to two valid IRRs. XIRR returns one (guess-dependent) — presenting one number without a note misleads. (Excel L5 §3)`},
{q: `=CHOOSE(B1, "bear", "base", "bull"), B1 holds 2. Result?`, opts: [`"bear"`, `"bull"`, "#VALUE!", `"base"`], answer: 3, k: "choose",
 hints: ["CHOOSE starts at 1, not 0.", "Index 2 = the second value."],
 explain: `"base" — the second value. The programmer's trap: assuming 0-based index and answering "bull". (Excel L5 §4)`},
{q: `Google Sheets has no native Data Table. How to build a 2-variable sensitivity table?`, opts: ["Install a special add-on", "Manual grid: one formula per cell with mixed $ references", "Impossible — switch to Excel", "Run Goal Seek repeatedly"], answer: 1, k: "sensitivity",
 hints: ["L1 taught $ for exactly this.", "Each cell = a full formula holding its row & column inputs."],
 explain: `Manual grid with $B3/C$1 — every cell transparent and auditable, actually better than Data Table. (Excel L5 §5)`},
{q: `Sensitivity grid: WACC in C1:E1, growth in B3:B5. The correct C3 formula (Gordon, FCF=100) to copy across the grid?`, opts: ["=100*(1+B3)/(C1-B3)", "=100*(1+B$3)/(C1-$B3)", "=100*(1+$B3)/(C$1-$B3)", "=100*(1+$B$3)/($C$1-$B$3)"], answer: 2, k: "sensitivity",
 hints: ["Growth must follow rows (lock column B), WACC follows columns (lock row 1).", "No $ = leaks when copied; full $ = frozen."],
 explain: `=100*(1+$B3)/(C$1-$B3). $B3: column locked, row free; C$1: row locked, column free. First option leaks, third is fully frozen. (Excel L5 §5 + L1 §$)`},
{q: "Monte Carlo in Excel: the correct random-WACC formula (mean 12%, std 2%)?", opts: ["=NORM.INV(RAND(), 12%, 2%)","=RAND()*12%","=12% + RAND()","=NORM.INV(12%, 2%)"], answer: 0, k: "monte_carlo", diff: "Medium",
 hints: ["NORM.INV needs a random probability + mean + std.", "RAND() gives a 0–1 probability."],
 explain: "=NORM.INV(RAND(), 12%, 2%) draws WACC from a normal distribution with mean 12%, std 2%. Bare RAND() gives a uniform 0–1, not a normal."},
{q: "Why must RAND not sit directly inside the EV formula without a Data Table?", opts: ["Every F9 changes all numbers; nothing is replicable","RAND cannot be used in EV","Data Table is faster","RAND is VBA-only"], answer: 0, k: "monte_carlo", diff: "Easy",
 hints: ["Replication = the same result can be re-checked.", "A simulation that is not saved = one that never happened."],
 explain: "RAND inside the formula makes every F9 rewrite all results with no trail. Data Table + one pasted-values run = auditable evidence."}

],
hell: [
{q: `=XNPV(XIRR(B2:B5, A2:A5), B2:B5, A2:A5). The result (approximately)?`, opts: ["0", "#NUM!", "Same as =NPV(…)", "#DIV/0!"], answer: 0,
 explain: `0 — that IS the definition of IRR: the rate making NPV = 0. This formula is a consistency test: if not ≈0, something's wrong with the data.`},
{q: `XNPV uses actual/365 day-count. A Rp365m cash flow exactly 366 days out (leap year), rate 10%. Present value?`, opts: ["Rp331.82m (365/365)", "Rp365m — leap years ignored", "Rp331.73m — slightly smaller due to 366/365", "#NUM!"], answer: 2,
 explain: `365/(1.1)^(366/365) ≈ 331.73 — slightly less than 365/1.1 = 331.82. XNPV counts real dates, leap days included. Small difference — that's exactly the NPV vs XNPV gap.`},
{q: `B1 is a dropdown holding the text "base". The correct scenario growth formula?`, opts: [`=CHOOSE(B1, 5%, 10%, 15%)`, `=CHOOSE(MATCH(B1, {"bear","base","bull"}, 0), 5%, 10%, 15%)`, `=IF(B1="base", 10%)`, "=VLOOKUP(B1, …)"], answer: 1,
 explain: `CHOOSE needs a NUMBER, not text — MATCH turns "base" → 2. The first option gives #VALUE! (text as index). Text-dropdown + MATCH + CHOOSE = the professional scenario pattern.`},
{q: `Two projects: IRR(A) > IRR(B) but NPV(A) < NPV(B) at 12% WACC. Decision?`, opts: ["Pick A — higher IRR always wins", "Pick the faster payback", "Reject both", "Pick B — NPV measures absolute value"], answer: 3,
 explain: `NPV wins for mutually exclusive projects: IRR assumes reinvestment at the IRR itself (unrealistic at 40%), NPV uses WACC. In Sheets: compute both, decide with NPV.`},
{q: `A manual 5×5 sensitivity grid = 25 cells, each =XNPV(…) over 20 cash flows. The file feels slow. Fastest diagnosis?`, opts: ["XNPV is just slow — no fix", "Replace each cell with hardcodes", "Compute XNPV once per scenario column; the grid only references the results", "Delete the grid"], answer: 2,
 explain: `25 × XNPV(20 flows) = 500 iterative calcs. Restructure: one 'engine' row computes XNPV per scenario, the grid merely displays. L4 principle: calculate once, output only references.`}
],
tasks: [
{t: "Task A — XNPV/XIRR sheet from scratch (±2 hrs)", d: "In a blank Google Sheet: build the \u2212500/+200/+350 table (dates Jan 1 2025, Jul 1 2025, Mar 1 2026). Compute =XNPV(12%,…) then verify manually per row with (date-date)/365 powers. Both ≈ \u22124.1. Then =XIRR(…) for the same table.", url: "https://drive.google.com/drive/folders/1ZemMXTh95PAjLRZc_kSY2MDJOuywblrt"},
{t: "Task B — Scenario switch (±1 hr)", d: "Cell B1 dropdown Bear/Base/Bull → growth =CHOOSE(MATCH(…), 5%, 10%, 15%). Link it to one 3-year revenue projection row. Flip the dropdown; the whole row must follow.", url: ""},
{t: "Task C — 3×3 sensitivity grid (±1 hr)", d: "Build the Gordon grid from the lesson (WACC 10/12/14% × g 2/3/4%, FCF=100). Manually check all four corners: 1275 / 850 / 1733 / 1040. One wrong cell = your $ pattern leaks.", url: ""},
{t: "Task D — The quiz above", d: "Target ≥8/9 correct (the 90% standard). Missed some? Read the hints, try again.", url: ""}
],
blind: {h: "Speed Drill — different numbers", body: `
<p><b>1.</b> Cash flows: \u2212200 (Feb 1, 2025), +260 (Aug 1, 2025). Write the XNPV formula (10% rate) and the XIRR formula. No computing — just correct formulas.</p>
<details class="ans"><summary>Answer</summary>
<p>=XNPV(10%, B2:B3, A2:A3) and =XIRR(B2:B3, A2:A3). Order: rate, values, dates for XNPV; values, dates for XIRR.</p>
</details>
<p><b>2.</b> =CHOOSE(3, 10, 20, 30) gives? And what happens with =CHOOSE(0, 10, 20, 30)?</p>
<details class="ans"><summary>Answer</summary>
<p>30 (the third value). =CHOOSE(0, …) → #VALUE! — index starts at 1.</p>
</details>
<p><b>3.</b> Grid: rates in D1:F1, values in C4:C6. Write the D4 formula for "value × (1+rate)" that's safe to copy across the grid.</p>
<details class="ans"><summary>Answer</summary>
<p>=$C4*(1+D$1). $C4: column C locked, row free (value follows rows). D$1: row 1 locked, column free (rate follows columns). Same pattern as the lesson's Gordon grid.</p>
</details>`}
};
EN["excel-l6"] = {
title: "Excel Data Prep & Automation: Power Query, PivotTables & VBA",
sub: "Excel L6 · ±6 hrs · Clean data once, use it forever",
sections: [
{h: "Power Query: clean data once, use it forever", body: `
<p>Analysts spend 80% of their time cleaning data — and most do it manually, every month, the same way. <b>Power Query</b> (Data → Get Data) turns that cleaning into a <i>repeatable recipe</i>: new data arrives each month, click Refresh, and every step runs again automatically.</p>
<p><b>Standard flow (5 steps, always the same):</b> (1) <b>Connect</b> — pull from CSV/Excel/a folder (never copy-paste into a sheet!); (2) <b>Clean</b> — drop blank rows, fix data types (text → numbers/dates), split columns; (3) <b>Transform</b> — unpivot wide tables into long ones (month columns → rows), fix wrong values; (4) <b>Merge/Append</b> — join lookup tables (e.g. account → statement mapping, like L4 governance); (5) <b>Load</b> — load as a table to a "Data" sheet (not straight into the model — the model reads from this table).</p>
<div class="example warung"><div class="lbl">🏪 Example — sales recap for 12 branches</div>
<p>12 CSV files with different date formats (12/01 vs Jan-12) and a "Total" column that is sometimes text. Without Power Query: 2 hours of copy-paste + typo risk. With Power Query: one folder query → fix date types → unpivot months → load. Next month: drop the new file in the folder, Refresh, done in 1 minute. <b>Rule:</b> never edit the loaded output manually — edit the query. Manually edited output gets overwritten on Refresh, and you will not remember what you changed.</p></div>`},
{h: "PivotTables as an analysis tool (not just a summary)", body: `
<p>A PivotTable is not a presentation tool — it is an <b>audit &amp; analysis</b> tool. Three uses that separate analysts from ordinary users:</p>
<p><b>1. Fast reasonableness check:</b> drop transactions into a PivotTable (rows = product, values = sum of revenue) — in 30 seconds you see which product dominates, and whether the total matches the report (Day 06 cross-check).</p>
<p><b>2. Find anomalies:</b> group by month → a one-month spike is instantly visible; drill down (double-click a cell) to see the underlying transactions — the fastest way to find one invoice mistyped from Rp10m to Rp100m.</p>
<p><b>3. Analyse before writing formulas:</b> before writing a complicated SUMIFS (L2), build the PivotTable first — if the answer comes from the PivotTable, do not write a formula. Formulas are for repeated &amp; structured work; PivotTables are for exploration &amp; audit. A pivot chart = a PivotTable visualised — one chart that moves when the filter moves.</p>
<div class="callout"><b>Trap:</b> a PivotTable whose values are pasted into the model (paste values) and then forgotten — next month the numbers are stale. If the model needs PivotTable numbers, use GETPIVOTDATA or keep the PivotTable live on the same sheet.</div>`},
{h: "VBA basics: record, read, edit — then loop", body: `
<p><b>VBA (Visual Basic for Applications)</b> is Excel macros. You do not need to be a programmer — just 3 skills: recording, reading the recording, and editing it a little:</p>
<p><b>1. Record:</b> Developer → Record Macro → do the repetitive task once (e.g. format 12 report sheets) → Stop. Excel writes the VBA code for you.</p>
<p><b>2. Read &amp; clean:</b> Alt+F11 → delete the excessive <i>Select</i> and <i>Selection</i> lines (recordings are always verbose); replace hard-coded ranges with variables.</p>
<p><b>3. Loop (one pattern, use it forever):</b></p>
<div class="formula">For Each ws In ThisWorkbook.Worksheets<br>&nbsp;&nbsp;ws.Range("A1").Value = "FMVA Sprint"<br>Next ws</div>
<p>That is it: do the same thing to every sheet. Add <i>On Error GoTo ErrHandler</i> so one failing sheet does not kill the whole macro — and always save a copy before running a macro on the original file (macros have no Undo!).</p>
<div class="example jebakan"><div class="lbl">🚫 Macro safety rule</div>
<p>A macro from the internet = code that can delete files. Never run a macro you have not read line by line. In this Sprint: macros are only the ones you record/write yourself, for your own files.</p></div>`},
{h: "Keyboard shortcuts: speed is accuracy", body: `
<p>An analyst who uses the mouse for everything is not just slow — they get tired, and tired analysts make typos. 10 shortcuts that pay back within a week:</p>
<table class="brutal">
<tr><th>Shortcut</th><th>Function</th></tr>
<tr><td><b>Ctrl + arrows</b></td><td>Jump to the edge of a data block</td></tr>
<tr><td><b>Ctrl + Shift + arrows</b></td><td>Select a data block</td></tr>
<tr><td><b>Ctrl + T</b></td><td>Turn a range into a table (for Power Query &amp; PivotTables)</td></tr>
<tr><td><b>Alt + =</b></td><td>AutoSum</td></tr>
<tr><td><b>Ctrl + ;</b></td><td>Insert today's date</td></tr>
<tr><td><b>F4</b></td><td>Cycle $ (absolute/relative) while editing a formula</td></tr>
<tr><td><b>Ctrl + \`</b></td><td>Show all formulas (audit mode)</td></tr>
<tr><td><b>Ctrl + [</b></td><td>Jump to precedents (L4 audit)</td></tr>
<tr><td><b>Ctrl + Shift + L</b></td><td>Filter on/off</td></tr>
<tr><td><b>Alt + E, S, V</b></td><td>Paste values</td></tr>
</table>
<p><b>Exercise:</b> do one Day 18 task (rolling forecast) without touching the mouse except to click Refresh in Power Query. Slow on day one, 2× faster by day five — and fewer typos because your hands stop moving back and forth.</p>`},
{h: "Task: end-to-end warung sales pipeline", body: `
<p><b>Task (in the Drive workbook):</b> (1) export sheets RAW_Jan/Feb/Mar as 3 CSVs in one folder (the data is already in the workbook); (2) build 1 Power Query: pull from the folder → unify date formats → unpivot → load to a table; (3) make a PivotTable from that table: revenue per product per month + drill down into one anomaly you planted on purpose; (4) record a macro that formats the report (bold headers, Rp numbers, print area), then edit the recording so it applies to all sheets (For Each loop). Pass criterion: add an April CSV → Refresh → the PivotTable &amp; report update with no manual edits.</p>`}
],
quiz: [
{q: "Power Query rule #1: next month's new data is handled by…", opts: ["Dropping the file in the folder → Refresh query","Copy-pasting manually again","Editing the loaded output directly","Building a new query from scratch"], answer: 0, k: "power_query", diff: "Easy",
 hints: ["A query = a repeatable recipe.", "Manually edited output is overwritten on Refresh."],
 explain: "Power Query stores the steps as a recipe. A new file in the folder + Refresh = the whole cleaning runs again automatically."},
{q: "What is a PivotTable most useful for, besides summarising?", opts: ["Audit & anomaly hunting (check totals, drill to transactions)","Replacing all SUMIFS formulas","Making charts for the annual report only","Replacing Power Query"], answer: 0, k: "pivot", diff: "Easy",
 hints: ["Double-click a PivotTable cell = its underlying transactions.", "Cross-checking totals vs the report = Day 06 audit."],
 explain: "PivotTable = audit tool: check totals in 30 seconds, drill down to anomalous transactions. Formulas for repeated work; PivotTables for exploration & audit."},
{q: "A VBA macro is recorded to format 12 sheets. The first correct step before running it on the original file?", opts: ["Save a copy (macros have no Undo)","Run it immediately","Delete all Select lines first","Rewrite it in Python"], answer: 0, k: "vba", diff: "Easy",
 hints: ["Macros have no Undo.", "Read the macro line by line before running."],
 explain: "Save a copy first — macros cannot be undone. Then read the code (Alt+F11), clean the verbose Select lines, then run."},
{q: "Shortcut to show all formulas at once (audit mode)?", opts: ["Ctrl + `","Ctrl + R","Alt + F4","Ctrl + Shift + L"], answer: 0, k: "shortcuts", diff: "Easy",
 hints: ["The key left of number 1.", "Used with Ctrl + [ (jump to precedents)."],
 explain: "Ctrl + ` (backtick) shows all formulas — L4 audit mode. Ctrl + Shift + L = filter on/off."},
{q: "Power Query output is edited manually, then Refresh is pressed. What happens?", opts: ["The manual edit is overwritten (lost)","The manual edit is kept","The query errors permanently","The file locks"], answer: 0, k: "power_query", diff: "Medium",
 hints: ["The load = the query's output, not an input.", "Edit the query, not the output."],
 explain: "Refresh overwrites the loaded output with the query's latest result — manual edits vanish without warning. Always edit the query, not the output."}
]
};

LESSONS_EXCEL.forEach(function(l){ if (EN[l.id]) l.en = EN[l.id]; });
})();
