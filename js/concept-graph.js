/* FMVA Sprint — concept graph ringan (metodologi DeepTutor, tanpa server)
   Entity: concept | definition | formula | method
   Relation: prerequisite | defines | uses | derives_from
   Dipakai untuk: (1) mistake review — soal salah pada konsep X -> mini-lesson prereq(X)
   dulu, baru soal varian; (2) deklarasi prerequisites tiap lesson. */
const CONCEPTS = {
  persamaan_akuntansi: {name:"Persamaan akuntansi", def:"Aset = Liabilitas + Ekuitas. Setiap transaksi menyentuh minimal 2 akun dan persamaan ini tidak pernah boleh rusak.", ref:"Fondasi B § Persamaan yang mengatur segalanya", diag:"Kamu menebak angkanya — padahal cukup pindahkan suku yang diketahui: Ekuitas = Aset − Liabilitas."},
  debit_kredit: {name:"Debit & kredit", def:"Debit = sisi KIRI persamaan; Kredit = sisi KANAN. Sisi kiri bertambah → debit; sisi kanan bertambah → kredit.", ref:"Fondasi B § Debit & kredit tanpa hafalan", diag:"Jangan hafal 'debit kiri' sebagai mantra — turunkan dari posisi akun di A = L + E."},
  jurnal: {name:"Jurnal double-entry", def:"Setiap jurnal: total debit = total kredit; minimal 2 akun tersentuh.", ref:"Fondasi B § Debit & kredit tanpa hafalan", diag:"Cek dua sisi: akun apa yang bertambah/berkurang, dan di sisi persamaan mana ia berada."},
  beban_non_kas: {name:"Beban non-kas", def:"Beban seperti penyusutan mengurangi laba TANPA mengeluarkan kas.", ref:"Fondasi B § Istilah yang sering menipu pemula", diag:"Pisahkan laba dari kas: penyusutan memotong laba, kas tidak bergerak."},
  akrual: {name:"Prinsip akrual", def:"Pendapatan/beban diakui saat kejadian ekonomi terjadi, bukan saat kas bergerak.", ref:"Fondasi B § Istilah yang sering menipu pemula", diag:"Jual kredit = pendapatan hari ini, kas bulan depan. Ikuti kejadiannya, bukan kasnya."},
  laba_bersih: {name:"Laba bersih", def:"Pendapatan − semua beban; angka final IS yang mengalir ke laba ditahan.", ref:"Hari 01 § Jembatan 1", diag:"Laba bersih adalah ujung dari IS — dari sinilah jembatan ke neraca dimulai."},
  laba_ditahan: {name:"Laba ditahan", def:"RE(akhir) = RE(awal) + Laba bersih − Dividen. Jembatan pertama IS → neraca.", ref:"Fondasi B § Laba ditahan: jembatan ke modeling", diag:"Urutannya: awal + laba bersih − dividen. Laba menambah, dividen mengurangi."},
  linkage_3_laporan: {name:"Keterkaitan 3 laporan", def:"Tiga jembatan: NI → laba ditahan; kas akhir CFS = kas di neraca; depresiasi di-add-back di CFS.", ref:"Hari 01 § Jembatan 1–3", diag:"Telusuri jembatannya satu per satu — jangan campur efek antar laporan."},
  add_back: {name:"Add-back depresiasi", def:"CFO = Laba bersih + depresiasi ± Δworking capital.", ref:"Hari 01 § Jembatan 3", diag:"Depresiasi sudah memotong laba tapi tidak memakai kas — tambahkan kembali di CFS."},
  working_capital: {name:"Working capital", def:"Aset lancar − liabilitas lancar. Piutang/persediaan membengkak = kas tertahan.", ref:"Fondasi A § Bekal Hell Mode", diag:"Laba tanpa kas biasanya tertahan di working capital: piutang atau persediaan."},
  model_3_statement: {name:"Model 3-statement", def:"Tiga laporan yang saling terhubung — fondasi SEMUA model valuasi (DCF, LBO, comps).", ref:"Fondasi A § 5 jenis model", diag:"Ingat urutannya: 3-Statement dulu; DCF, LBO, dan comps dibangun di atasnya."},
  hardcode_rule: {name:"Aturan no-hardcode", def:"Angka asumsi hanya di sel input (biru); rumus hanya me-referensi, tidak mengetik angka.", ref:"Fondasi A § Anatomi model; Fondasi C § 5 aturan main", diag:"Angka 1.05 di dalam rumus akan terlupakan 3 bulan lagi — pindahkan ke sel input."},
  analis_kredit: {name:"Peran credit analyst", def:"Menilai kemampuan debitur membayar utang — proyeksi arus kas vs kewajiban.", ref:"Fondasi A § Siapa yang pakai?", diag:"Fokus analis kredit = risiko gagal bayar (kas), bukan harga saham."},
  budget_forecast: {name:"Budget/forecast", def:"Model yang menjawab pertanyaan operasional: berapa lama kas bertahan (runway).", ref:"Fondasi A § 5 jenis model", diag:"Startup tanpa revenue butuh jawaban 'kapan kas habis' — itu budget forecast, bukan DCF."},
  absolute_ref: {name:"Absolute reference ($)", def:"$ mengunci referensi saat copy. Tanpa $, referensi bergeser relatif mengikuti posisi.", ref:"Fondasi C § Bekal Hell Mode", diag:"Cek tanda $: sel yang dikunci tidak ikut 'jalan' saat rumus di-copy."},
  debt_schedule: {name:"Debt schedule", def:"Jadwal utang per periode; beban bunga dihitung dari saldo AWAL.", ref:"Fondasi C § Bekal Hell Mode", diag:"Bunga = tarif × utang awal — bukan saldo akhir. Ini juga memutus circular reference."},
  revenue_modeling: {name:"Revenue modeling", def:"Tiga pendekatan: bottom-up (volume × harga), top-down (pasar × pangsa), growth-rate. Pilih berdasarkan data yang tersedia.", ref:"Hari 02 § Revenue modeling: 3 pendekatan", diag:"Mulai dari driver yang bisa diobservasi (pelanggan × harga × hari), bukan menebak angka revenue."},
  margin: {name:"Margin (gross & net)", def:"Gross margin = (Revenue − COGS) ÷ Revenue; net margin = NI ÷ Revenue. Margin tertekan = red flag.", ref:"Hari 02 § COGS & gross margin", diag:"Margin bicara tentang efisiensi — kalau tertekan padahal revenue naik, selidiki biayanya."},
  opex: {name:"Fixed vs variable cost", def:"Fixed cost tidak berubah dengan volume (sewa); variable cost ikut volume (komisi).", ref:"Hari 02 § Opex: fixed vs variable", diag:"Tanya: kalau volume nol, biaya ini masih ada? Ya = fixed."},
  operating_leverage: {name:"Operating leverage", def:"Fixed cost tinggi → laba sangat sensitif terhadap perubahan revenue.", ref:"Hari 02 § Opex: fixed vs variable", diag:"Fixed cost tinggi = pedang bermata dua: revenue naik sedikit laba melejit, revenue turun sedikit laba anjlok."},
  is_structure: {name:"Struktur IS bertingkat", def:"Gross profit → EBIT → EBT → NI. Tiap level menjawab pertanyaan berbeda.", ref:"Hari 02 § EBIT, bunga, pajak", diag:"Jangan campur level: operasi (EBIT) vs struktur modal (bunga) vs fiskal (pajak)."},
  dso_dio_dpo: {name:"DSO, DIO, DPO", def:"Days Sales/Inventory/Payables Outstanding — berapa hari kas tertahan di tiap tahap operasi. Piutang = revenue harian × DSO.", ref:"Hari 03 § DSO, DIO, DPO + cash conversion cycle", diag:"Ubah rupiah jadi hari dulu — baru angkanya bisa dibandingkan antar perusahaan."},
  ccc: {name:"Cash conversion cycle", def:"CCC = DSO + DIO − DPO. Jumlah hari kas tertahan dalam operasi; makin kecil makin baik.", ref:"Hari 03 § DSO, DIO, DPO + cash conversion cycle", diag:"DPO dikurangkan: supplier yang memberi tempo justru membebaskan kas."},
  wc_schedule: {name:"Schedule working capital", def:"Dibangun dari driver harian: (revenue ÷ 360) × DSO dst. WC = piutang + persediaan − utang; lalu ΔWC vs tahun lalu.", ref:"Hari 03 § Schedule working capital", diag:"Jangan tebak saldo — turunkan dari driver harian × jumlah hari."},
  sum_avg: {name:"SUM/AVERAGE/COUNT", def:"Tiga agregasi dasar: jumlah, rata-rata, hitung. Ditambah IF dan SUMPRODUCT, ini 80% rumus model.", ref:"Excel L1 § SUM/AVERAGE/COUNT", diag:"Sebelum fungsi eksotis — kuasai yang dasar sampai refleks."},
  if_logic: {name:"Logika IF", def:"=IF(kondisi, ya, tidak). Kondisi menghasilkan TRUE/FALSE; IF memilih cabang. IF bertingkat 4+ = bau.", ref:"Excel L1 § IF", diag:"Urutkan kondisi dari yang paling ketat; pertimbangkan IFS."},
  xlookup: {name:"XLOOKUP", def:"Lookup modern: range terpisah (tanpa nomor kolom), arah bebas, exact match default, argumen if_not_found.", ref:"Excel L1 § XLOOKUP", diag:"Untuk file baru selalu XLOOKUP; VLOOKUP hanya untuk membaca file lama."},
  index_match: {name:"INDEX+MATCH", def:"MATCH cari POSISI, INDEX ambil NILAI di posisi itu. Tahan sisip kolom, bisa cari ke kiri.", ref:"Excel L2 § INDEX+MATCH", diag:"Pisahkan jadi dua langkah: posisi dulu, nilai kemudian."},
  sumifs: {name:"SUMIFS/COUNTIFS", def:"Agregasi multi-kriteria (AND). Urutan SUMIFS: yang dijumlah dulu, baru pasangan kriteria.", ref:"Excel L2 § SUMIFS/COUNTIFS", diag:"Kriteria di sel input, bukan diketik di rumus."},
  text_date: {name:"Fungsi TEXT & DATE", def:"&, LEN/LEFT/RIGHT/MID, DATEVALUE, EOMONTH — alat bersih-bersih data berantakan.", ref:"Excel L2 § TEXT & DATE", diag:"Ubah ke tipe yang benar dulu (teks→tanggal), baru diutak-atik."},
  pivottable: {name:"PivotTable", def:"Agregasi drag-and-drop tanpa rumus. Butuh Refresh manual; jejak audit tersembunyi.", ref:"Excel L2 § Pagar pengaman", diag:"Untuk eksplorasi cepat boleh; untuk model yang dirawat, rumus *IFS menang."},
  dynamic_arrays: {name:"Dynamic arrays", def:"Satu rumus menumpahkan banyak hasil (spill). #SPILL! = area terhalang, bukan rumus rusak.", ref:"Excel L3 § Spill", diag:"Ubah n, hasilnya ikut memanjang — tidak ada drag yang kelewat."},
  filter_sort: {name:"FILTER/SORT/UNIQUE", def:"Query dalam sel: saring, urutkan, unikkan. Digabung ROWS/SUM menjadi agregasi dinamis.", ref:"Excel L3 § UNIQUE/FILTER/SORT", diag:"Pola 'saring dulu, agregasi kemudian' menggantikan banyak kerja manual."},
  let_lambda: {name:"LET/LAMBDA", def:"LET memberi nama pada sub-hitung (hitung sekali, pakai berkali); LAMBDA membuat fungsi sendiri.", ref:"Excel L3 § SUMPRODUCT 2 kriteria & LET", diag:"Rumus dibaca 10× lebih sering dari ditulis — buat terbaca."},
  audit_rumus: {name:"Audit rumus", def:"Trace Precedents/Dependents, F9 evaluasi bagian rumus, Ctrl+` tampilkan semua rumus.", ref:"Excel L4 § Audit", diag:"'Kayaknya benar' bukan standar — trace 5 angka kunci sebelum kirim."},
  iferror: {name:"IFERROR", def:"=IFERROR(rumus, cadangan). Pengaman di titik risiko yang sah — bukan penutup bug.", ref:"Excel L4 § IFERROR", diag:"Sekecil mungkin, sedekat mungkin dengan titik risikonya."},
  model_structure: {name:"Struktur model", def:"3 zona: INPUT (asumsi, sel biru) → KALKULASI (rumus link) → OUTPUT (referensi). Tanpa angka ketik di rumus.", ref:"Excel L4 § Struktur", diag:"Angka salah? Cek berurutan: input → kalkulasi → output."},
  circular_ref: {name:"Circular reference", def:"Rumus yang (langsung/tidak langsung) me-referensi dirinya sendiri. Peringatan Excel jangan diabaikan.", ref:"Excel L4 § Bekal Hell Mode", diag:"Restrukturisasi alurnya — jangan bungkam dengan iterasi."},
  dcf: {name:"DCF", def:"Discounted cash flow: nilai = PV proyeksi FCFF + terminal value. Menerjemahkan ASUMSI menjadi harga.", ref:"Real-01 § Kenapa FCFF, bukan laba bersih?", diag:"Jangan tanya 'berapa nilai wajarnya' dulu — tanya 'asumsi apa yang harus benar?'."},
  wacc: {name:"WACC", def:"Biaya modal rata-rata tertimbang — tingkat diskonto DCF. Naik sedikit, nilai anjlok banyak.", ref:"Real-01 § Kenapa terminal value mendominasi?", diag:"Uji sensitivitas WACC selalu — ia tuas paling berbahaya di DCF."},
  terminal_value: {name:"Terminal value", def:"TV = FCFF_n×(1+g)/(WACC−g): nilai 'selamanya' setelah proyeksi eksplisit. Sering >70% nilai DCF.", ref:"Real-01 § Kenapa terminal value mendominasi?", diag:"Mayoritas nilai di ujung = mayoritas risiko di dua angka kecil (WACC, g)."},
  scenario_analysis: {name:"Analisis skenario", def:"Bear/Base/Bull: memetakan ruang kemungkinan, bukan satu tebakan presisi. Keputusan dari perbandingan harga vs ruang.", ref:"Real-01 § Kenapa Bear/Base/Bull berbeda?", diag:"Satu angka = tebakan tersamar. Selalu tanya: skenario apa yang membuat kesimpulan berubah?"},
  sotp: {name:"Sum-of-the-parts", def:"Valuasi tiap segmen dengan multiple-nya sendiri, lalu dijumlahkan. Senjata untuk konglomerat.", ref:"Real-02 § Kenapa Astra?", diag:"Satu WACC untuk 7 bisnis beda = menilai 7 rumah dengan satu harga per meter."},
  conglomerate_discount: {name:"Diskon konglomerat", def:"1 − harga pasar/nilai SOTP. Pasar menilai konglomerat di bawah jumlah bagiannya — sebuah PERTANYAAN, bukan vonis.", ref:"Real-02 § Kenapa ada diskon konglomerat?", diag:"Jangan asumsikan pasar bodoh — jelaskan MENGAPA diskon ada."},
  fcf: {name:"FCFF", def:"Free cash flow to firm = NOPAT×(1−reinvestasi) = kas untuk SEMUA pemodal. Untuk infrastruktur, angka kebenaran.", ref:"Real-01 § Kenapa FCFF, bukan laba bersih?", diag:"Laba bersih = akuntansi; FCFF = kas. Untuk valuasi, ikuti kas."},
  nopat: {name:"NOPAT", def:"EBIT×(1−pajak): laba operasi seolah tanpa utang. Titik awal FCFF.", ref:"Real-01 § Kenapa FCFF, bukan laba bersih?", diag:"Mulai dari operasi murni — efek utang diurus belakangan (via WACC & net debt)."},
  nci: {name:"NCI", def:"Non-controlling interest: bagian ekuitas anak usaha milik pihak lain. Bukan milik induk — kurangkan.", ref:"Real-03 § Kenapa NCI harus dikurangkan?", diag:"Ekuitas total ≠ ekuitas induk. Lupa NCI = mengklaim milik orang."},
  reverse_dcf: {name:"Reverse-DCF", def:"Dari harga pasar mundur ke asumsi yang harus benar (g implied). Menjawab 'apa yang sudah di-price-in?'.", ref:"Real-04 § Kenapa Tesla?", diag:"Untuk saham growth, pertanyaan pertama: ekspektasi apa yang dibayar pasar?"},
  forensic_audit: {name:"Audit forensik model", def:"Mencari bug di model orang: tanda terbalik, double-count, angka ketik, 'OK' palsu. Cari yang terlalu rapi.", ref:"Real-03 § Kenapa 'OK' palsu paling berbahaya?", diag:"Model salah tapi terlihat benar > model yang jelas rusak. Cari angka yang terlalu rapi."},
  capex_cycle: {name:"Siklus capex", def:"Bangun (FCF tertekan) → panen (FCF mengembang) → bangun lagi. Capex = variabel valuasi terpenting infrastruktur.", ref:"Real-05 § Kenapa Telkom?", diag:"Analis infrastruktur tanpa pandangan soal siklus capex = tidak punya pandangan."}
,
  akuntansi_sulit: {name:"Akuntansi sulit", def:"Area akuntansi yang mengubah angka model secara material: leases (PSAK 73), pajak tangguhan, stock compensation, dan NOL. Salah perlakukan = laba, utang, dan kas operasi meleset.", ref:"Hari 20 § Kenapa ada level 'akuntansi sulit'?", diag:"Jangan perlakukan lease sebagai sewa biasa — PSAK 73 mencatatnya sebagai aset + liabilitas."},
  asumsi: {name:"Asumsi yang dinyatakan", def:"Setiap input model yang bukan fakta (growth, margin, DSO) wajib ditulis eksplisit beserta alasannya. Asumsi tak tertulis = tak bisa diuji.", ref:"Hari 08 § Asumsi 2027: semuanya dinyatakan eksplisit", diag:"Angka tanpa asumsi tertulis terlihat pasti — padahal itu tebakan berbaju rapi."},
  audit_tools: {name:"Audit tools", def:"Trace Precedents/Dependents, evaluasi bagian rumus (F9), dan tampilkan semua rumus (Ctrl+`) untuk memverifikasi model sebelum dikirim.", ref:"Hari 19 § Audit tools: sabuk pengaman modeler", diag:"'Kelihatannya benar' bukan standar — telusuri 5 angka kunci sebelum kirim."},
  averageifs: {name:"AVERAGEIFS", def:"Rata-rata dengan banyak kriteria (AND): =AVERAGEIFS(range_rata, kriteria1, ...). Satu keluarga dengan SUMIFS, COUNTIFS, MAXIFS, MINIFS.", ref:"Hari 19 § SUMIFS/COUNTIFS/AVERAGEIFS: filter yang bisa diaudit", diag:"Pastikan range yang dirata-rata bukan range kriteria — salah kolom = angka 'benar' yang salah."},
  budget: {name:"Budget", def:"Rencana keuangan periodik yang mengikat: target revenue, biaya, dan kas per periode. Beda dengan forecast — budget adalah komitmen.", ref:"Hari 18 § Kenapa budget = forecast + komitmen", diag:"Budget yang tak pernah dibandingkan dengan aktual = dokumen pajangan."},
  budgeting: {name:"Budgeting", def:"Proses menyusun budget: incremental (tahun lalu ± x%) vs zero-based (bangun dari nol). Pilih sesuai seberapa stabil bisnisnya.", ref:"Hari 18 § Zero-based vs incremental: dua cara menyusun budget", diag:"Incremental budgeting mewariskan pemborosan tahun lalu — tantang tiap pos."},
  bunga: {name:"Beban bunga", def:"Biaya utang per periode = tarif × saldo AWAL utang. Mengurangi EBT lewat tax shield, tapi menambah risiko gagal bayar.", ref:"Hari 17 § Debt schedule: jantung LBO", diag:"Bunga dihitung dari saldo awal, bukan akhir — salah basis = bunga salah."},
  capm: {name:"CAPM", def:"Cost of equity = Rf + β × (Rm − Rf). Tiga input yang semuanya harus DINYATAKAN: risk-free, beta, dan market risk premium.", ref:"Hari 09 § CAPM: tiga asumsi yang DINYATAKAN", diag:"Beta comps yang tak disesuaikan leverage = cost of equity pinjaman."},
  cfo: {name:"CFO (arus kas operasi)", def:"Kas dari operasi = laba bersih + beban non-kas ± Δworking capital (metode tidak langsung). Laba tanpa kas biasanya tertahan di WC.", ref:"Hari 06 § Jembatan 3 & 4: CFO dan PPE roll-forward", diag:"CFO positif belum berarti sehat — cek apakah didorong penundaan bayar supplier."},
  countifs: {name:"COUNTIFS", def:"Menghitung baris yang memenuhi SEMUA kriteria (AND). Kriteria teks/operator seperti \">10\" wajib dalam tanda kutip.", ref:"Hari 19 § SUMIFS/COUNTIFS/AVERAGEIFS: filter yang bisa diaudit", diag:"COUNTIFS menghitung baris, bukan menjumlah — untuk menjumlah pakai SUMIFS."},
  diskonto: {name:"Diskonto (discounting)", def:"Menarik nilai masa depan ke hari ini: PV = FV ÷ (1+r)^t. Rp1.000 tahun depan < Rp1.000 hari ini.", ref:"Hari 09 § Time value of money: Rp1.000 besok ≠ Rp1.000 hari ini", diag:"Mendiskonto FCFF tahun ke-n dengan pangkat tahun yang salah = seluruh DCF bergeser."},
  dividen: {name:"Dividen", def:"Pembagian laba ke pemegang saham: mengurangi kas DAN laba ditahan (ekuitas). Bukan beban di laporan laba rugi.", ref:"Hari 05 § Dividen: mengurangi ekuitas, bukan beban", diag:"Dividen bukan beban — ia tak pernah muncul di laporan laba rugi."},
  ebitda: {name:"EBITDA", def:"Laba sebelum bunga, pajak, depresiasi & amortisasi. Proksi kas operasi; basis multiple EV/EBITDA.", ref:"Hari 11 § Memilih multiple: EV/EBITDA vs P/E", diag:"EBITDA mengabaikan capex — untuk bisnis padat modal, selalu sandingkan dengan FCFF."},
  eps: {name:"EPS (laba per saham)", def:"Laba bersih ÷ saham beredar (diluted untuk versi konservatif). Di M&A: accretive bila EPS pro forma naik.", ref:"Hari 16 § Deal A dibedah: 0,40 → 0,4248 (+6,2%)", diag:"EPS naik karena buyback/akresi belum tentu kinerja membaik — cek sumbernya."},
  excel_power: {name:"Excel power untuk modeling", def:"Fungsi lookup & agregasi modern (XLOOKUP, *IFS, dynamic arrays) + audit tools: kecepatan tanpa mengorbankan auditabilitas.", ref:"Hari 19 § Kenapa drill kecepatan, bukan teori fungsi", diag:"Cepat tapi tak bisa diaudit = cepat menuju angka salah."},
  exit_multiple: {name:"Exit multiple", def:"Metode TV kedua: TV = metrik tahun akhir × multiple wajar (mis. EV/EBITDA). Cross-check terhadap perpetuity growth.", ref:"Hari 10 § Metode B: exit multiple", diag:"Multiple 'wajar' tanpa comps pendukung = asumsi menyamar."},
  fcff: {name:"FCFF", def:"Free cash flow to firm: kas untuk SEMUA investor = NOPAT − reinvestasi (capex + ΔWC). Bahan baku DCF.", ref:"Hari 09 § Kenapa FCFF, bukan laba bersih", diag:"Laba bersih = akuntansi; FCFF = kas. Valuasi mengikuti kas."},
  flex_budget: {name:"Flex budget", def:"Budget yang disusun ulang pada volume AKTUAL — memisahkan variance volume dari variance efisiensi. Lebih adil dari static budget.", ref:"Hari 18 § Kenapa flex budget lebih adil dari static budget", diag:"Menilai manajer dengan static budget saat volume meleset = menghukum hal yang salah."},
  goodwill: {name:"Goodwill", def:"Selisih harga akuisisi di atas nilai wajar aset neto target. Bukan kas; diuji penurunan nilai tiap tahun.", ref:"Hari 16 § Purchase accounting: goodwill bukan kas", diag:"Goodwill besar = membayar mahal untuk 'nilai tak terlihat' — uji impairment-nya."},
  large: {name:"LARGE", def:"=LARGE(range, k): nilai terbesar ke-k. Untuk ranking tanpa mengurutkan data.", ref:"Hari 19 § LARGE & ROWS+UNIQUE: ranking dan daftar dinamis", diag:"Duplikat bisa menggeser posisi — LARGE ke-2 dari {300,300,280} = 300, bukan 280."},
  lbo: {name:"LBO", def:"Leveraged buyout: membeli perusahaan dengan utang besar yang dilunasi dari kas perusahaan sendiri. Return dari debt paydown + pertumbuhan + exit multiple.", ref:"Hari 17 § Kenapa LBO: beli warung pakai uang warungnya sendiri", diag:"Leverage memperbesar return DAN risiko — utang yang tak lunas = ekuitas hangus."},
  leverage: {name:"Leverage (daya ungkit)", def:"Penggunaan utang untuk memperbesar return ekuitas. Bekerja dua arah: untung membesar, rugi ikut membesar.", ref:"Hari 17 § Jebakan leverage: return membesar, risiko ikut membesar", diag:"Leverage hanya menguntungkan bila return aset > biaya utang — selalu."},
  linkage: {name:"Linkage antar laporan", def:"Keterkaitan hidup antar 3 laporan di dalam model: perubahan satu angka harus mengalir ke mana-mana. Model yang tak balance = ada yang bocor.", ref:"Hari 06 § Linkage penuh: peta 3 laporan", diag:"Satu angka diubah di IS tanpa mengalir ke BS/CFS = model bocor."},
  ma: {name:"M&A (merger & akuisisi)", def:"Analisis accretive/dilutive: apakah deal menaikkan EPS acquirer? Sources & uses harus balance; sinergi hanya dihitung bila terbukti.", ref:"Hari 16 § Kenapa akresi bukan vonis", diag:"Akresi dari asumsi sinergi khayalan = vonis yang dibeli."},
  maxifs: {name:"MAXIFS", def:"=MAXIFS(range_maks, kriteria1, ...): nilai maksimum dengan kriteria. Di file .xlsx ditulis _xlfn.MAXIFS.", ref:"Hari 19 § SUMIFS/COUNTIFS/AVERAGEIFS: filter yang bisa diaudit", diag:"MAXIFS butuh Excel 2019+/Sheets — di LO lama bisa #NAME?; tulis _xlfn.MAXIFS."},
  npv: {name:"NPV", def:"Net present value: PV arus kas masuk − investasi awal. Aturan: terima bila NPV > 0 (menciptakan nilai di atas cost of capital).", ref:"Hari 18 § NPV > 0: satu aturan untuk menerima proyek", diag:"NPV positif dari discount rate yang terlalu rendah = proyek buruk berbaju bagus."},
  pajak: {name:"Pajak penghasilan", def:"Beban pajak = tarif × EBT; pajak tangguhan (DTL/DTA) muncul dari beda temporer akuntansi vs fiskal.", ref:"Hari 09 § Pajak 22%: kapan ia menggigit", diag:"Tarif efektif jarang = tarif statutori — selisihnya bercerita soal beda temporer."},
  pe_ratio: {name:"P/E ratio", def:"Harga ÷ EPS: berapa rupiah pasar membayar per Rp1 laba. Bandingkan dengan peer & growth — P/E tanpa konteks = angka hampa.", ref:"Hari 11 § Memilih multiple: EV/EBITDA vs P/E", diag:"P/E rendah bukan otomatis murah — bisa jadi pasar mencium laba yang tak berkelanjutan."},
  ppe_roll: {name:"PPE roll-forward", def:"PPE(akhir) = PPE(awal) + capex − depresiasi − penjualan aset. Jembatan CFS → neraca untuk aset tetap.", ref:"Hari 06 § Jembatan 3 & 4: CFO dan PPE roll-forward", diag:"Capex di CFS tak sama dengan ΔPPE — depresiasi selalu di antaranya."},
  proforma: {name:"Pro forma", def:"Laporan 'seolah-olah' deal sudah terjadi: menggabungkan acquirer + target + penyesuaian (bunga utang baru, D&A step-up). Basis uji akresi.", ref:"Hari 16 § Sources & uses: setiap rupiah punya pasangan", diag:"Pro forma tanpa penyesuaian purchase accounting = menggabung dua perusahaan khayalan."},
  re_roll: {name:"Laba ditahan roll-forward", def:"RE(akhir) = RE(awal) + NI − dividen. Jembatan IS → ekuitas; cek pertama setiap model 3-statement.", ref:"Hari 06 § Jembatan 1: NI → laba ditahan", diag:"Dividen lupa dikurangi = ekuitas menggelembung diam-diam."},
  sensitivitas: {name:"Analisis sensitivitas", def:"Menguji seberapa besar output (EV) bergerak saat satu/dua variabel (WACC, g) diubah. Tabel 2D + tornado chart.", ref:"Hari 10 § Tabel sensitivitas 2D: WACC × g", diag:"Sensitivitas satu variabel menyembunyikan interaksi — tornado menunjukkan ranking."},
  skenario: {name:"Analisis skenario", def:"Bear/Base/Bull: memetakan ruang kemungkinan, bukan satu tebakan presisi. Keputusan diambil dari harga vs ruang.", ref:"Hari 15 § Kenapa scenario manager bukan data table", diag:"Satu angka = tebakan menyamar. Selalu tanya: skenario apa yang mengubah kesimpulan?"},
  sumproduct: {name:"SUMPRODUCT", def:"Agregasi bersyarat universal: mengalikan array kondisi (TRUE/FALSE=1/0) dengan nilai, lalu menjumlah. Bekerja identik di Excel/Sheets/LO.", ref:"Hari 19 § SUMPRODUCT: agregasi bersyarat yang universal", diag:"Array harus sama panjang — beda ukuran = #VALUE!."},
  unique: {name:"UNIQUE", def:"=UNIQUE(range): daftar nilai unik yang menumpah (spill). Bungkus dengan ROWS/SUM untuk agregasi dinamis. Di file ditulis _xlfn._xlws.UNIQUE.", ref:"Hari 19 § LARGE & ROWS+UNIQUE: ranking dan daftar dinamis", diag:"UNIQUE menumpah — pastikan area bawahnya kosong atau kena #SPILL!."},
  variance: {name:"Variance (selisih budget)", def:"Actual − budget per pos; tanda dibaca sesuai jenis akun (biaya over = unfavorable). Diurai jadi price vs volume variance.", ref:"Hari 18 § Variance = actual - budget: membaca tanda dengan benar", diag:"Variance tanpa uraian price-vs-volume = tahu 'berapa' tapi tidak 'kenapa'."},
  akuntansi: {name:"Akuntansi", def:"Bahasa pencatatan bisnis: jurnal, buku besar, dan tiga laporan. Di course ini = fondasi sebelum modeling (Fondasi A/B).", ref:"Fondasi B § Persamaan akuntansi", diag:"Model yang tidak balance = akuntansi yang bocor — cek A = L + E dulu sebelum salahkan rumus."},
  capstone: {name:"Capstone", def:"Proyek akhir yang menggabungkan semua skill: model lengkap dari data mentah + rekomendasi. Capstone I = INDF (Hari 12-13), Capstone II = bank (Hari 26).", ref:"Hari 12 § Capstone I", diag:"Capstone menguji transfer: bisa membangun tanpa template yang menuntun tiap sel."},
  comps: {name:"Comps (comparable companies)", def:"Valuasi relatif: membandingkan multiple (EV/EBITDA, P/E) perusahaan target dengan peer sejenis.", ref:"Hari 11 § Comps", diag:"Multiple tanpa konteks peer, growth, dan risiko = angka tanpa vonis."},
  mock_exam: {name:"Mock exam", def:"Simulasi ujian 50 soal / 3 jam kondisi timed. Menguji kesiapan, bukan mengajar materi baru.", ref:"Hari 23 § Mock Exam 1", diag:"Skor mock = bukti kesiapan hanya jika timed dan jujur — bukan hafalan soal."},
  modal_kerja: {name:"Modal kerja", def:"Aset lancar operasional − liabilitas lancar operasional. Lihat entri wc_schedule untuk mekanik schedule-nya.", ref:"Hari 03 § Schedule modal kerja", diag:"Kenaikan modal kerja = kas keluar — laba tanpa kas adalah ilusi."},
  thesis: {name:"Thesis (defense)", def:"Presentasi 10 menit + Q&A mempertahankan rekomendasi valuasi: asumsi, bukti, dan apa yang mengubah keputusan.", ref:"Hari 27 § Thesis defense", diag:"Thesis yang baik memisahkan fakta, asumsi, estimasi, dan judgment."},
excel: {name:"Fungsi Excel untuk valuasi", def:"XNPV/XIRR untuk tanggal tak beraturan, CHOOSE untuk skenario, Data Table untuk sensitivitas — toolkit analis modern.", ref:"Excel L5 § Valuation tools", diag:"Di Sheets tidak ada Data Table native — bangun grid manual dengan referensi campuran."},
  tv: {name:"Terminal value", def:"Nilai perusahaan setelah periode proyeksi eksplisit; biasanya 70%+ dari EV. Dua metode: perpetuitas Gordon dan exit multiple.", ref:"Hari 10 § Terminal value", diag:"TV bukan tebakan — ia didiskonto seperti FCFF lainnya, dan sensitif terhadap (WACC−g)."},
  multiples: {name:"Valuation multiples", def:"Rasio harga/nilai terhadap metrik (EV/EBITDA, P/E). Cepat tapi butuh peer yang benar-benar comparable.", ref:"Hari 11 § Comps", diag:"Multiple tanpa peer yang sebanding = angka tanpa konteks. Samakan definisi pembilang-penyebut."},
  distressed: {name:"Distressed valuation", def:"Valuasi perusahaan bermasalah: bukan DCF growth, melainkan waterfall likuidasi dan analisis recovery per kelas kreditor.", ref:"Real-09 WSKT § Waterfall", diag:"Ekuitas di perusahaan distressed = opsi out-of-the-money; nilai dari sisa, bukan dari growth."},
  xnpv: {name:"XNPV", def:"NPV dengan tanggal aktual tiap arus kas — presisi hari, bukan asumsi akhir tahun. Pasangan XIRR.", ref:"Excel L5 § XNPV", diag:"NPV biasa berasumsi arus kas tiap 31 Des; dunia nyata tidak serapi itu."},
  sensitivity: {name:"Analisis sensitivitas", def:"Uji bagaimana output berubah saat input digoyang. Tabel 1-2 variabel; tornado untuk ranking.", ref:"Hari 15 § Sensitivitas", diag:"Sensitivitas bukan skenario — ia menjawab 'seberapa rapuh', bukan 'bagaimana jika'."},
  arus_kas: {name:"Arus kas operasi", def:"CFO = Laba bersih + beban non-kas ± Δworking capital. Kas adalah fakta; laba adalah opini.", ref:"Hari 04 § Arus kas", diag:"Laba bisa direkayasa akrual; kas operasi sulit dibohongi — ikuti kasnya."},
  siklus_kas: {name:"Siklus kas", def:"CCC = DSO + DIO − DPO. Hari kas tertahan di operasi; DPO mengurangi karena supplier membiayai.", ref:"Hari 03 § CCC", diag:"Jangan jumlahkan semua hari — utang usaha adalah pembiayaan gratis."},
  strategi: {name:"Strategi ujian", def:"Alokasi waktu dan prioritas: kerjakan yang yakin dulu, tandai yang ragu, kembali di putaran 2.", ref:"Hari 23 § Briefing", diag:"Ujian menguji manajemen waktu sama seperti menguji pengetahuan."},
  jebakan: {name:"Jebakan soal", def:"Pola pengecoh: salah tanda, salah level laporan, angka yang terlihat benar tapi salah konsep.", ref:"Hari 23 § Bedah", diag:"Klasifikasikan jebakanmu: hitungan, konsep, atau baca soal — obatnya beda."},
  presentasi: {name:"Presentasi valuasi", def:"Sampaikan titik + rentang + asumsi. Satu angka tanpa konteks = presisi palsu.", ref:"Hari 22 § Dashboard", diag:"Direksi memutuskan dari ringkasan 60 detik — bukan dari 40 sheet."},
  refleksi: {name:"Refleksi belajar", def:"Tinjau apa yang salah dan kenapa — bukan sekadar skor. Kesalahan yang diklasifikasi tidak terulang.", ref:"Hari 24 § Repair", diag:"Tanpa refleksi, latihan hanya mengulang kesalahan yang sama lebih cepat."},
  forecast: {name:"Forecasting", def:"Proyeksi driver (revenue, margin, capex) dengan asumsi eksplisit. Garbage in = garbage out.", ref:"Hari 08 § Forecast", diag:"Forecast bukan ramalan — ia skenario 'jika asumsi ini benar, maka...'."},
  discontinued_ops: {name:"Discontinued operations", def:"Segmen yang dijual/dihentikan — dipisah di IS agar tidak mengotori continuing ops.", ref:"Real-07 ADRO § Normalisasi", diag:"Bandingkan angka restated vs tidak — diskontinuitas palsu menipu tren."},
  wc: {name:"Working capital", def:"Modal kerja = aset lancar − liabilitas lancar. Naik = kas tertahan.", ref:"Hari 03 § WC", diag:"WC naik bukan selalu buruk — tapi selalu mengikat kas."},
  ev: {name:"Enterprise value", def:"Nilai total perusahaan untuk semua pemegang klaim = Ekuitas + Net debt. Basis valuasi DCF.", ref:"Hari 10 § EV", diag:"EV bukan harga saham — kurangi net debt dulu baru bagi saham."},
  defense: {name:"Membela valuasi", def:"Presentasikan asumsi, rentang, dan sensitivitas. Siap ditantang di tiap angka.", ref:"Hari 22 § Dashboard", diag:"Valuasi yang tidak bisa dibela = opini, bukan analisis."},
  bank_valuation: {name:"Valuasi bank", def:"Bank dinilai via residual income/DDM, bukan FCFF — mesinnya spread bunga (NIM).", ref:"Real-06 BBCA § Residual income", diag:"Jangan pakai DCF standar untuk bank — tidak ada FCFF yang bermakna."},
  scenario_tweak: {name:"Uji skenario", def:"Ubah satu asumsi, lihat dampak ke output. Grid skenario = peta, bukan ramalan.", ref:"Hari 15 § Skenario", diag:"Skenario yang tidak mengubah keputusan = skenario yang tidak perlu."},
  susut: {name:"Penyusutan", def:"Alokasi biaya aset sepanjang umur manfaat. Non-kas: mengurangi laba, tidak mengurangi kas.", ref:"Fondasi B § Beban non-kas", diag:"Penyusutan bukan kas keluar — jangan kurangi dua kali di DCF."},
  ev_base: {name:"EV base", def:"Enterprise value dari metode utama (biasanya perpetuitas). Jangkar valuasi.", ref:"Hari 22 § Dashboard", diag:"Base bukan 'yang benar' — ia titik awal triangulasi."},
  market_premium: {name:"Market risk premium", def:"Imbal hasil ekstra pasar saham di atas risk-free. Input CAPM yang paling diperdebatkan.", ref:"Hari 09 § CAPM", diag:"MRP 5% vs 6% mengubah CoE 1pp — dan valuasi 15%."},
  bootstrap_fallacy: {name:"Bootstrap fallacy", def:"Keyakinan keliru bahwa growth tinggi bisa dipertahankan selamanya tanpa ROIC yang mendukung.", ref:"Hari 15 § TV", diag:"g > WACC selamanya = perusahaan jadi lebih besar dari ekonomi — mustahil."},
  one_off: {name:"One-off items", def:"Keuntungan/beban non-berulang (divestasi, impairment). Keluarkan dari continuing ops.", ref:"Real-01 UNVR § One-off", diag:"Valuasi pakai continuing ops — one-off menyesatkan multiple."},
  real_option: {name:"Real options", def:"Nilai fleksibilitas manajerial (ekspansi, tunda, abandon). Di luar DCF standar.", ref:"Real-07 § Real options", diag:"DCF statis meremehkan proyek dengan opsi — tapi jangan pakai sebagai alasan untuk proyek jelek."},
  eps_standalone: {name:"EPS standalone", def:"Laba per saham sebelum merger — baseline untuk uji akresi/dilusi.", ref:"Hari 16 § M&A", diag:"Bandingkan PF EPS vs standalone — bukan vs nol."},
  variance_sign: {name:"Tanda varians", def:"Selisih aktual vs budget: favorable/unfavorable tergantung apakah biaya atau revenue.", ref:"Hari 18 § Varians", diag:"Biaya di bawah budget = favorable; revenue di bawah budget = unfavorable. Jangan terbalik."},
  debt_paydown: {name:"Pelunasan utang", def:"Alur kas untuk membayar pokok utang. Mengurangi leverage, membebaskan kapasitas bunga.", ref:"Hari 17 § LBO", diag:"Debt paydown bukan beban — ia transfer kas ke kreditor."},
  pro_forma: {name:"Pro forma", def:"Laporan 'seolah-olah' — menggabungkan dua perusahaan pasca-merger untuk analisis.", ref:"Hari 16 § Pro forma", diag:"Pro forma bukan ramalan — ia titik awal sebelum sinergi."},
  mine_life: {name:"Umur tambang", def:"Tahun cadangan ÷ produksi tahunan. Menentukan periode DCF tambang.", ref:"Real-07 ADRO § NAV", diag:"Tambang bukan perpetuitas — DCF-nya berakhir saat cadangan habis."},
  tv_exit: {name:"TV metode exit", def:"Terminal value = EBITDA akhir × exit multiple. Alternatif Gordon untuk triangulasi.", ref:"Hari 10 § TV exit", diag:"Exit multiple dari peer — bukan angka yang dipilih agar valuasi 'bagus'."},
  total_aset: {name:"Total aset", def:"Seluruh sumber daya perusahaan. Harus = Liabilitas + Ekuitas (selalu).", ref:"Fondasi B § Neraca", diag:"Jika tidak balance, ada yang salah — bukan 'selisih pembulatan'."},
  consolidation: {name:"Konsolidasi", def:"Gabungkan LK induk + anak (eliminasi antar-perusahaan). NCI untuk minoritas.", ref:"Hari 20 § Akuntansi sulit", diag:"Eliminasi dulu transaksi internal — baru angkanya bermakna."},
  budget_phasing: {name:"Phasing budget", def:"Sebar budget tahunan ke bulanan/kuartalan mengikuti pola musiman.", ref:"Hari 18 § Budget", diag:"Budget flat 1/12 per bulan buta musiman — phasing mengikuti realita operasi."},
  sensitivitas_banding: {name:"Banding sensitivitas", def:"Bandingkan sensitivitas antar input — mana yang paling menggigit valuasi.", ref:"Hari 15 § Tornado", diag:"Fokus pada 2-3 input teratas; sisanya noise."},
  capex: {name:"Capex", def:"Belanja modal untuk aset jangka panjang. Mengurangi FCFF tapi membangun kapasitas.", ref:"Hari 04 § FCFF", diag:"Capex bukan beban — ia investasi yang disusutkan bertahun-tahun."},
  tornado: {name:"Tornado chart", def:"Visual ranking sensitivitas: bar terpanjang = input paling berpengaruh.", ref:"Hari 15 § Tornado", diag:"Tornado untuk prioritas — bukan untuk presisi."},
  jebakan_g: {name:"Jebakan growth", def:"Asumsi g terlalu tinggi di TV — valuasi meledak tidak realistis.", ref:"Hari 10 § TV", diag:"g harus < WACC dan < growth ekonomi jangka panjang. Selalu."},
  cfi_cff: {name:"Arus kas investasi & pendanaan", def:"CFI = capex/investasi; CFF = utang/ekuitas/dividen. Bukan operasi.", ref:"Hari 04 § CFS", diag:"Jangan campur: operasi = bisnis inti; investasi = aset; pendanaan = modal."},
  residual_income: {name:"Residual income", def:"Laba abnormal = (ROE − CoE) × Ekuitas buku. Nilai bank = buku + PV residual income.", ref:"Real-06 BBCA § RI", diag:"Bank dengan ROE > CoE menciptakan nilai; ROE < CoE menghancurkan."},
  justified_pbv: {name:"P/BV wajar", def:"P/BV yang didukung fundamental = (ROE − g) ÷ (CoE − g). Jembatan ROE ke valuasi.", ref:"Real-06 BBCA § P/BV", diag:"P/BV tinggi wajar jika ROE jauh di atas CoE — bukan 'mahal' otomatis."},
  data_table: {name:"Data Table", def:"Fitur Excel untuk tabel sensitivitas otomatis. Tidak ada di Google Sheets.", ref:"Excel L5 § Data Table", diag:"Di Sheets: bangun manual dengan referensi campuran — lebih teraudit."},
  proforma_ni: {name:"Laba pro forma", def:"NI gabungan pasca-merger sebelum sinergi — dasar hitung PF EPS.", ref:"Hari 16 § Pro forma", diag:"Mulai dari penjumlahan sederhana; sinergi ditambahkan terpisah."},
  cash_sweep: {name:"Cash sweep", def:"Kelebihan kas otomatis untuk bayar utang di LBO. Mempercepat deleveraging.", ref:"Hari 17 § LBO", diag:"Cash sweep = disiplin; tanpa itu sponsor tergoda dividen."},
  reserves: {name:"Cadangan tambang", def:"Tonase terbukti & terukur. Basis NAV tambang.", ref:"Real-07 ADRO § NAV", diag:"Cadangan bukan sumber daya — hanya yang ekonomis yang dihitung."},
  data_table_baca: {name:"Baca Data Table", def:"Interpretasi tabel sensitivitas: baris/kolom = input, sel = output.", ref:"Excel L5 § Data Table", diag:"Baca sudutnya dulu (best/worst), baru tengahnya."},
  abs_ref: {name:"Referensi absolut", def:"Tanda $ mengunci baris/kolom saat copy rumus.", ref:"Excel L1 § $", diag:"Input asumsi selalu $ — biar tidak 'jalan' saat di-copy."},
  moic: {name:"MoIC", def:"Multiple on Invested Capital = total kembali ÷ total masuk. Ukuran LBO.", ref:"Hari 17 § LBO", diag:"MoIC 2.5x dalam 5 tahun ≠ 2.5x dalam 2 tahun — sertakan IRR."},
  haircut: {name:"Haircut", def:"Diskon atas nilai aset di likuidasi/distress. Aset tidak laku seharga buku.", ref:"Real-09 WSKT § Waterfall", diag:"Haircut 30-50% wajar untuk aset khusus — jangan pakai nilai buku."},
  tieout: {name:"Tie-out", def:"Cek konsistensi antar sheet/laporan — angka yang sama harus sama.", ref:"Fondasi C § Audit", diag:"Tie-out gagal = ada link putus. Jangan lanjut sebelum beres."},
  xirr: {name:"XIRR", def:"IRR dengan tanggal aktual — untuk arus kas tak beraturan.", ref:"Excel L5 § XIRR", diag:"XIRR butuh minimal satu positif dan satu negatif — atau error."},
  net_cash: {name:"Net cash", def:"Kas − utang. Negatifnya = net debt. Posisi kas bersih perusahaan.", ref:"Hari 10 § Net debt", diag:"Net cash bukan 'kas saja' — kurangi utangnya dulu."},
  normalization: {name:"Normalisasi", def:"Sesuaikan angka reported agar comparable: keluarkan one-off, sesuaikan kebijakan.", ref:"Real-08 GOTO § Normalisasi", diag:"Tanpa normalisasi, multiple = sampah masuk, sampah keluar."},
  seniority: {name:"Senioritas klaim", def:"Urutan prioritas di likuidasi: secured > unsecured > subordinated > ekuitas.", ref:"Real-09 WSKT § Waterfall", diag:"Ekuitas paling buncit — di distress, sering nol."},
  xirr_trap: {name:"Jebakan XIRR", def:"Multiple IRR saat arus kas ganti tanda berkali-kali. Cek dengan NPV.", ref:"Excel L5 § XIRR", diag:"Dua IRR = dua jawaban — keduanya 'benar' secara matematis, tidak membantu keputusan."},
  npv_rule: {name:"Aturan NPV", def:"Terima proyek jika NPV > 0 (dengan discount rate yang benar).", ref:"Hari 18 § NPV", diag:"NPV > 0 tapi IRR < hurdle = ada yang tidak konsisten. Selidiki."},
  sources_uses: {name:"Sources & Uses", def:"Dari mana dana datang (sources) dan ke mana pergi (uses) di transaksi. Harus balance.", ref:"Hari 17 § LBO", diag:"Sources = Uses selalu — ini check pertama setiap model transaksi."},
  tornado_ranking: {name:"Ranking tornado", def:"Urutkan input by dampak ke output — fokus pada yang teratas.", ref:"Hari 15 § Tornado", diag:"Top-3 input menjelaskan 80% variasi — sisanya detail."},
  debt_sensitivity: {name:"Sensitivitas utang", def:"Bagaimana valuasi/return berubah saat leverage berubah.", ref:"Hari 17 § LBO", diag:"Utang memperbesar return EKUAR — ke dua arah."},
  scenario: {name:"Skenario", def:"Kombinasi asumsi yang konsisten (bear/base/bull) — bukan sekadar ganti satu angka.", ref:"Hari 15 § Skenario", diag:"Skenario butuh narasi: KENAPA dunia jadi bear? Angka tanpa cerita = tebakan."},
  breakeven_premium: {name:"Premium impas", def:"Premium akuisisi maksimal sebelum deal jadi dilutif/merusak nilai.", ref:"Hari 16 § M&A", diag:"Bayar di atas breakeven = transfer kekayaan ke target."},
  choose: {name:"Fungsi CHOOSE", def:"Pilih nilai berdasarkan nomor indeks — saklar skenario.", ref:"Excel L5 § CHOOSE", diag:"CHOOSE + sel input = toggle bear/base/bull satu klik."},
  waterfall: {name:"Waterfall", def:"Alokasi hasil likuidasi berurutan dari senior ke junior.", ref:"Real-09 WSKT § Waterfall", diag:"Isi dari atas — yang di bawah dapat sisa. Sering tidak ada sisa."},
  dividen_link: {name:"Link dividen", def:"Dividen di IS (pengurang RE) harus = kas dividen di CFF.", ref:"Hari 01 § Jembatan", diag:"Dividen diumumkan ≠ dibayar — yang masuk CFF hanya yang dibayar."},
  nim_trap: {name:"Jebakan NIM", def:"Dua definisi NIM (earning assets vs total assets) memberi angka beda.", ref:"Real-06 BBCA § NIM", diag:"Jangan bandingkan NIM tanpa samakan penyebutnya dulu."},
  match_trap: {name:"Jebakan MATCH", def:"MATCH tanpa match_type = 1 (approximate) — butuh 0 untuk exact.", ref:"Excel L2 § MATCH", diag:"Approximate match di data tak terurut = hasil ngawur yang terlihat benar."},
  accretion: {name:"Akresi", def:"PF EPS > standalone EPS — merger menambah EPS.", ref:"Hari 16 § Akresi", diag:"Akresi dari multiple murah atau sinergi — bukan dari sulap akuntansi."},
  dilution: {name:"Dilusi", def:"PF EPS < standalone EPS — merger menggerus EPS.", ref:"Hari 16 § Dilusi", diag:"Dilusi bukan selalu buruk — jika strategis, jelaskan trade-off-nya."},
  pe_test_allshare: {name:"Uji P/E all-share", def:"Cek akresi dengan asumsi 100% saham — batas atas dilusi.", ref:"Hari 16 § M&A", diag:"All-share = skenario terburuk untuk EPS; jika masih akretif, aman."},
  ddm: {name:"Dividend Discount Model", def:"Nilai saham = PV dividen masa depan. Untuk bank dengan payout stabil.", ref:"Real-06 BBCA § DDM", diag:"DDM butuh dividen yang bisa diandalkan — bukan untuk growth tanpa dividen."},
  price_volume: {name:"Price × volume", def:"Revenue = harga × kuantitas — driver paling dasar.", ref:"Hari 02 § Revenue", diag:"Mulai dari P×Q sebelum pakai growth rate buta."},

  capm_sens: {name:"Sensitivitas CAPM", def:"WACC berubah saat beta/risk-free berubah — uji rentang, bukan satu titik.", ref:"Hari 09 § CAPM", diag:"Uji WACC di beberapa beta, bukan satu angka."},
  cff: {name:"Cash flow from financing", def:"Arus kas pendanaan: utang diterbitkan/dilunasi, ekuitas, dividen.", ref:"Hari 04 § CFS", diag:"Financing = cara perusahaan mendanai dirinya."},
  cfo12: {name:"CFO Hari 12", def:"Cash flow operasi studi kasus INDF — rekonsiliasi laba ke kas.", ref:"Hari 12 § Capstone", diag:"Lihat rekonsiliasi laba ke kas di capstone."},
  dso: {name:"Days sales outstanding", def:"Rata-rata hari menagih piutang = AR/revenue × 360.", ref:"Hari 03 § WC", diag:"DSO naik = kas tertahan di piutang."},
  dtl: {name:"Deferred tax liability", def:"Pajak tangguhan: beda temporer akuntansi vs fiskal.", ref:"Hari 20 § Pajak", diag:"DTL = pajak yang ditunda ke masa depan."},
  ebit12: {name:"EBIT Hari 12", def:"Laba operasi studi kasus INDF.", ref:"Hari 12 § Capstone", diag:"EBIT capstone INDF."},
  ek12: {name:"Ekuitas Hari 12", def:"Ekuitas studi kasus INDF.", ref:"Hari 12 § Capstone", diag:"Ekuitas capstone INDF."},
  eq13: {name:"Ekuitas Hari 13", def:"Nilai ekuitas hasil DCF INDF.", ref:"Hari 13 § DCF", diag:"Ekuitas = EV − net debt."},
  ev13: {name:"EV Hari 13", def:"Enterprise value hasil DCF INDF.", ref:"Hari 13 § DCF", diag:"EV hasil DCF INDF."},
  excel: {name:"Excel", def:"Tools spreadsheet untuk modeling — rumus, audit, shortcuts.", ref:"Excel L1 § Dasar", diag:"Kuasai dasar sebelum modeling."},
  fb_read: {name:"Membaca laporan keuangan", def:"Skill membaca 3 laporan: IS, BS, CFS.", ref:"Fondasi A § Laporan", diag:"Baca 3 laporan sebagai satu kesatuan."},
  fcff12: {name:"FCFF Hari 12", def:"Free cash flow studi kasus INDF.", ref:"Hari 12 § Capstone", diag:"FCFF capstone INDF."},
  forecast_driver: {name:"Driver forecast", def:"Asumsi pendorong proyeksi: growth, margin, capex.", ref:"Hari 08 § Forecast", diag:"Forecast sebagus drivernya."},
  impl_eq: {name:"Implisit ekuitas", def:"Nilai ekuitas implisit dari EV − net debt.", ref:"Hari 10 § DCF", diag:"Ekuitas implisit = EV − net debt."},
  impl_ev: {name:"Implisit EV", def:"EV implisit dari harga pasar + net debt.", ref:"Hari 11 § Comps", diag:"EV implisit dari harga pasar."},
  kas_roll: {name:"Roll kas", def:"Kas akhir = kas awal + Δkas dari 3 aktivitas.", ref:"Hari 04 § CFS", diag:"Kas harus roll forward dengan benar."},
  lease_expense: {name:"Beban lease", def:"Beban sewa operasi vs finance lease (PSAK 73).", ref:"Hari 20 § Lease", diag:"PSAK 73: lease = aset + liabilitas."},
  lease_pv: {name:"PV lease", def:"Nilai kini kewajiban lease didiskonto.", ref:"Hari 20 § Lease", diag:"PV lease pakai discount rate."},
  med_ev: {name:"Median EV", def:"EV median comps — robust vs outlier.", ref:"Hari 11 § Comps", diag:"Median tahan outlier."},
  nol_benefit: {name:"Manfaat NOL", def:"Net operating loss carryforward mengurangi pajak masa depan.", ref:"Hari 20 § Pajak", diag:"NOL = aset pajak masa depan."},
  prec_ev: {name:"Precedent EV", def:"EV dari transaksi preseden (M&A comps).", ref:"Hari 16 § M&A", diag:"Preseden = harga yang benar-benar dibayar."},
  ps13: {name:"Harga saham Hari 13", def:"Price per share hasil DCF INDF.", ref:"Hari 13 § DCF", diag:"PPS = ekuitas / saham beredar."},
  pv: {name:"Present value", def:"Nilai kini = FV / (1+r)^t.", ref:"Hari 10 § TVM", diag:"Uang hari ini > uang besok."},
  pv_tv: {name:"PV terminal value", def:"Nilai kini TV didiskonto ke hari ini.", ref:"Hari 10 § DCF", diag:"TV harus didiskonto juga."},
  stock_comp_cfo: {name:"Stock comp di CFO", def:"Kompensasi saham: non-kas, add-back di CFO.", ref:"Hari 20 § Akuntansi", diag:"Stock comp = non-kas, add back."},
  tie_out: {name:"Tie-out", def:"Angka antar-sheet harus cocok — validasi silang.", ref:"Excel L2 § Audit", diag:"Tie-out = validasi silang."},
  tv13: {name:"TV Hari 13", def:"Terminal value DCF INDF.", ref:"Hari 13 § DCF", diag:"TV DCF INDF."},
  tv_perp: {name:"TV perpetuitas", def:"TV = FCFF×(1+g)/(WACC−g).", ref:"Hari 10 § DCF", diag:"Gordon growth model."},
  tv_sens: {name:"Sensitivitas TV", def:"TV sensitif ke WACC dan g — uji rentang.", ref:"Hari 15 § Sensitivitas", diag:"TV paling sensitif di DCF."},
  wc_dua_arah: {name:"WC dua arah", def:"Working capital bisa sumber atau pengguna kas.", ref:"Hari 03 § WC", diag:"ΔWC negatif = sumber kas."},
};
const CONCEPT_REL = [
  ["debit_kredit","prerequisite","persamaan_akuntansi"],
  ["jurnal","prerequisite","debit_kredit"],
  ["model_3_statement","prerequisite","jurnal"],
  ["laba_ditahan","derives_from","laba_bersih"],
  ["add_back","uses","beban_non_kas"],
  ["add_back","uses","working_capital"],
  ["linkage_3_laporan","uses","laba_ditahan"],
  ["linkage_3_laporan","uses","add_back"],
  ["model_3_statement","defines","linkage_3_laporan"],
  ["analis_kredit","uses","model_3_statement"],
  ["beban_non_kas","uses","akrual"],
  ["revenue_modeling","uses","model_3_statement"],
  ["is_structure","prerequisite","model_3_statement"],
  ["margin","derives_from","is_structure"],
  ["operating_leverage","uses","opex"],
  ["dso_dio_dpo","uses","working_capital"],
  ["ccc","derives_from","dso_dio_dpo"],
  ["wc_schedule","uses","dso_dio_dpo"],
  ["wc_schedule","uses","akrual"],
  ["if_logic","uses","sum_avg"],
  ["xlookup","uses","sum_avg"],
  ["index_match","uses","xlookup"],
  ["sumifs","uses","sum_avg"],
  ["sumifs","uses","if_logic"],
  ["pivottable","uses","sumifs"],
  ["text_date","uses","sum_avg"],
  ["dynamic_arrays","uses","index_match"],
  ["filter_sort","uses","dynamic_arrays"],
  ["let_lambda","uses","dynamic_arrays"],
  ["model_structure","uses","hardcode_rule"],
  ["model_structure","uses","sum_avg"],
  ["iferror","uses","if_logic"],
  ["audit_rumus","uses","model_structure"],
  ["circular_ref","uses","audit_rumus"],
  ["nopat","uses","is_structure"],
  ["fcf","derives_from","nopat"],
  ["fcf","uses","working_capital"],
  ["wacc","uses","model_3_statement"],
  ["terminal_value","uses","wacc"],
  ["dcf","defines","fcf"],
  ["dcf","uses","terminal_value"],
  ["dcf","uses","wacc"],
  ["scenario_analysis","uses","dcf"],
  ["sotp","uses","model_3_statement"],
  ["conglomerate_discount","derives_from","sotp"],
  ["nci","uses","linkage_3_laporan"],
  ["reverse_dcf","derives_from","dcf"],
  ["forensic_audit","uses","audit_rumus"],
  ["forensic_audit","uses","nci"],
  ["capex_cycle","uses","fcf"]
];
function conceptLinks(id){
  const out = {prereq:[], buildsOn:[], uses:[]};
  CONCEPT_REL.forEach(([a, r, b]) => {
    if (a !== id) return;
    if (r === "prerequisite") out.prereq.push(b);
    else if (r === "derives_from") out.buildsOn.push(b);
    else if (r === "uses") out.uses.push(b);
  });
  return out;
}
/* Mini-lesson: definisi konsep + rantai prasyarat (maks 2 level, tanpa duplikat) */
function conceptMiniLesson(id){
  const c = CONCEPTS[id];
  const noC = (typeof T === "function") ? T("mr_no_concept") : "belum terdaftar di concept graph.";
  if (!c) return `<p>Concept <b>${id}</b> ${noC}</p>`;
  const seen = new Set([id]);
  const nm = (typeof cName === "function") ? cName(c) : c.name;
  const df = (typeof cDef === "function") ? cDef(c) : c.def;
  let html = `<p><b>${nm}.</b> ${df} <span style="opacity:.7">(${c.ref})</span></p>`;
  const links = conceptLinks(id);
  const preLbl = (typeof T === "function") ? T("mr_prereq") : "Prasyarat";
  [...links.prereq, ...links.buildsOn, ...links.uses].slice(0, 2).forEach(pid => {
    if (seen.has(pid) || !CONCEPTS[pid]) return;
    seen.add(pid);
    const p = CONCEPTS[pid];
    const pn = (typeof cName === "function") ? cName(p) : p.name;
    const pd = (typeof cDef === "function") ? cDef(p) : p.def;
    html += `<p style="font-size:.9rem">📎 <b>${preLbl} — ${pn}:</b> ${pd}</p>`;
  });
  return html;
}

/* ---------- generator varian "angka beda" (recompute via kode) ---------- */
/* VARIANT-PURE-START */
function vShuffle(arr, rng){
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}
function vEquity(rng, ref){
  ref = ref || "Fondasi B § Persamaan yang mengatur segalanya";
  const A = 40 + 10 * Math.floor(rng() * 12);   // 40..150
  let L = 10 + 5 * Math.floor(rng() * 10), guard = 0;
  while ((L >= A || A - L === L) && guard++ < 60) L = 10 + 5 * Math.floor(rng() * 10);
  const E = A - L;
  const vals = [E, A + L, A, L];               // unik by construction: L>0, E!=L
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `Warung punya aset Rp${A}jt dan liabilitas Rp${L}jt. Berapa ekuitasnya?`,
    opts: order.map(i => "Rp" + vals[i] + "jt"),
    answer: order.indexOf(0),
    explain: `Ekuitas = Aset − Liabilitas = ${A} − ${L} = Rp${E}jt. (${ref})`,
    steps: [
      "Analysis: yang ditanya ekuitas; diketahui aset & liabilitas.",
      "Solve 1: tulis persamaan — Aset = Liabilitas + Ekuitas.",
      `Solve 2: pindahkan suku → Ekuitas = Aset − Liabilitas = ${A} − ${L}.`,
      `Solve 3: hitung → Rp${E}jt. Cek: ${A} = ${L} + ${E} ✓`
    ]
  };
}
function vRE(rng){
  const R0 = 6 + Math.floor(rng() * 9);                       // 6..14
  const NI = 4 + Math.floor(rng() * 7);                       // 4..10
  const D = 1 + Math.floor(rng() * Math.min(4, NI - 1));      // 1..4, < NI
  const RE = R0 + NI - D;
  const vals = [RE, R0 + NI + D, R0 + NI, NI - D];            // unik: D>=1, R0>0
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `Laba ditahan awal Rp${R0}jt, laba bersih Rp${NI}jt, dividen Rp${D}jt. Laba ditahan akhir?`,
    opts: order.map(i => "Rp" + vals[i] + "jt"),
    answer: order.indexOf(0),
    explain: `${R0} + ${NI} − ${D} = Rp${RE}jt. (Fondasi B § Laba ditahan: jembatan ke modeling)`,
    steps: [
      "Analysis: yang ditanya RE akhir; diketahui RE awal, laba bersih, dividen.",
      "Solve 1: rumus — RE(akhir) = RE(awal) + NI − Dividen.",
      `Solve 2: substitusi → ${R0} + ${NI} − ${D}.`,
      `Solve 3: hitung → Rp${RE}jt.`
    ]
  };
}
function vBottomUp(rng){
  const cust = 20 + 10 * Math.floor(rng() * 9);      // 20..100
  const price = 10 + 10 * Math.floor(rng() * 4);     // 10..40 (Rp ribu)
  const days = 20 + Math.floor(rng() * 9);           // 20..28
  const rev = cust * price * days / 1000;           // Rp juta
  const f = v => (v % 1 === 0 ? String(v) : v.toFixed(1).replace(".", ","));
  const vals = [rev, cust * price / 1000, cust * price * 30 / 1000, rev * 10];
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `Warung: ${cust} pelanggan/hari × Rp${price}rb × ${days} hari buka. Proyeksi revenue sebulan?`,
    opts: order.map(i => "Rp" + f(vals[i]) + "jt"),
    answer: order.indexOf(0),
    explain: `${cust} × Rp${price}rb × ${days} = Rp${f(rev)}jt. (Hari 02 § Revenue modeling: 3 pendekatan)`,
    steps: [
      "Analysis: yang ditanya revenue; diketahui pelanggan/hari, harga, hari buka.",
      "Solve 1: rumus bottom-up — Revenue = Volume × Harga × Periode.",
      `Solve 2: substitusi → ${cust} × ${price}.000 × ${days}.`,
      `Solve 3: hitung → Rp${f(rev)}jt.`
    ]
  };
}
function vGrossProfit(rng){
  const rev = 120 + 20 * Math.floor(rng() * 20);     // 120..500
  let cogs = 40 + 10 * Math.floor(rng() * 10), guard = 0;
  while ((rev - cogs === cogs || rev - cogs <= 0 || cogs >= rev) && guard++ < 60)
    cogs = 40 + 10 * Math.floor(rng() * 10);
  const gp = rev - cogs;
  const vals = [gp, rev + cogs, cogs, rev];
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `Revenue Rp${rev}jt, COGS Rp${cogs}jt. Laba kotor?`,
    opts: order.map(i => "Rp" + vals[i] + "jt"),
    answer: order.indexOf(0),
    explain: `${rev} − ${cogs} = Rp${gp}jt. (Hari 02 § COGS & gross margin)`,
    steps: [
      "Analysis: yang ditanya laba kotor; diketahui revenue & COGS.",
      "Solve 1: rumus — Laba kotor = Revenue − COGS.",
      `Solve 2: substitusi → ${rev} − ${cogs}.`,
      `Solve 3: hitung → Rp${gp}jt.`
    ]
  };
}
const VARIANT_FNS = {
  "fondasi-b:0": {diff: "Easy", gen: (rng) => vEquity(rng)},
  "fondasi-b:3": {diff: "Medium", gen: vRE},
  "fondasi-b:1": {diff: "Easy", gen: vJournal},
  "fondasi-b:4": {diff: "Easy", gen: vLoanEq},
  "hari-01:0": {diff: "Easy", gen: (rng) => vEquity(rng, "Hari 01 § Satu rumus yang tidak boleh lupa")},
  "hari-01:1": {diff: "Easy", gen: vAkrualKas},
  "hari-01:2": {diff: "Medium", gen: (rng) => vRE(rng, "Hari 01 § Jembatan 1")},
  "hari-01:3": {diff: "Easy", gen: vAddBack},
  "hari-02:0": {diff: "Easy", gen: vBottomUp},
  "hari-02:1": {diff: "Easy", gen: vGrossProfit},
  "hari-02:3": {diff: "Easy", gen: vKomisi},
  "hari-02:4": {diff: "Medium", gen: vOpLev},
  "hari-03:1": {diff: "Easy", gen: vCCC},
  "hari-03:3": {diff: "Medium", gen: vPiutang}
};
function vJournal(rng){
  const X = 1 + Math.floor(rng() * 5);                        // 1..5 jt
  const opts = ["Debit Kas, Kredit Beban sewa", "Debit Beban sewa, Kredit Kas",
                "Debit Utang, Kredit Kas", "Debit Kas, Kredit Modal"];
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `Bayar sewa Rp${X}jt tunai. Jurnal yang benar?`,
    opts: order.map(i => opts[i]),
    answer: order.indexOf(1),
    explain: `Beban bertambah → debit; kas (aset) berkurang → kredit. (Fondasi B § Debit & kredit tanpa hafalan)`,
    steps: [
      "Analysis: transaksi bayar sewa tunai — akun apa yang berubah?",
      "Solve 1: Beban sewa bertambah (mengurangi ekuitas) → debit.",
      "Solve 2: Kas (aset, sisi kiri) berkurang → kredit.",
      `Solve 3: jurnal = Debit Beban sewa Rp${X}jt, Kredit Kas Rp${X}jt.`
    ]
  };
}
function vLoanEq(rng){
  const X = 10 + 5 * Math.floor(rng() * 8);                    // 10..45 jt
  const opts = [`Aset +${X}, Ekuitas +${X}`, `Aset +${X}, Liabilitas +${X}`,
                `Liabilitas +${X}, Ekuitas −${X}`, "Tidak ada yang berubah"];
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `Terima pinjaman bank Rp${X}jt tunai. Sisi mana dari A = L + E yang berubah?`,
    opts: order.map(i => opts[i]),
    answer: order.indexOf(1),
    explain: `Kas (aset) +${X} dan utang bank (liabilitas) +${X}. Ekuitas tidak tersentuh. (Fondasi B § Persamaan yang mengatur segalanya)`,
    steps: [
      "Analysis: pinjaman tunai — dua akun tersentuh: kas & utang bank.",
      "Solve 1: Kas = aset (sisi kiri) → +.",
      "Solve 2: Utang bank = liabilitas (sisi kanan) → +.",
      `Solve 3: Aset +${X}, Liabilitas +${X}; persamaan tetap balance.`
    ]
  };
}
function vAddBack(rng){
  const X = 200 + 100 * Math.floor(rng() * 8);                 // 200..900 rb
  const vals = [0, X, Math.round(X / 2), X * 2];
  const order = vShuffle([0, 1, 2, 3], rng);
  const f = v => "Rp" + v.toLocaleString("id-ID") + "rb";
  return {
    q: `Beban penyusutan Rp${X}rb. Berapa kas yang KELUAR untuk beban ini?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Rp0 — penyusutan adalah beban NON-KAS: memotong laba, kas tidak bergerak. (Fondasi B § Istilah yang sering menipu pemula)`,
    steps: [
      "Analysis: yang ditanya kas keluar, bukan pengaruh ke laba.",
      "Solve 1: penyusutan = alokasi biaya aset yang sudah dibayar dulu.",
      "Solve 2: tidak ada pembayaran saat beban diakui → kas keluar Rp0.",
      "Solve 3: di CFS beban ini di-add-back ke laba bersih."
    ]
  };
}
function vAkrualKas(rng){
  const X = 5 + Math.floor(rng() * 8);                         // 5..12 jt
  let Y = 2 + Math.floor(rng() * 4), guard = 0;                // 2..5, < X, X-Y unik
  while ((Y >= X || X - Y === Y || X - Y === X || X - Y === X + Y) && guard++ < 60)
    Y = 2 + Math.floor(rng() * 4);
  const cfo = X - Y;
  const vals = [cfo, X + Y, X, Y];
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `Laba bersih Rp${X}jt, tapi piutang naik Rp${Y}jt (belum tertagih) dan tidak ada beban non-kas lain. Perkiraan kas dari operasi?`,
    opts: order.map(i => "Rp" + vals[i] + "jt"),
    answer: order.indexOf(0),
    explain: `Rp${X}jt − Rp${Y}jt = Rp${cfo}jt. Laba tertahan di piutang = kas belum masuk. (Hari 01 § Jembatan 3)`,
    steps: [
      "Analysis: laba vs kas — piutang naik artinya penjualan belum jadi kas.",
      "Solve 1: kas operasi ≈ laba bersih − kenaikan piutang.",
      `Solve 2: substitusi → ${X} − ${Y}.`,
      `Solve 3: hitung → Rp${cfo}jt. Inilah prinsip akrual.`
    ]
  };
}
function vKomisi(rng){
  const X = 20 + 10 * Math.floor(rng() * 9);                   // 20..100 jt
  const rt = 3 + Math.floor(rng() * 5);                        // 3..7%
  const k = X * rt / 100;
  const f = v => (v % 1 === 0 ? String(v) : v.toFixed(1).replace(".", ","));
  const vals = [k, k * 2, X, k + X];
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `Omzet Rp${X}jt, komisi penjualan ${rt}% dari omzet. Berapa komisi yang dibayar?`,
    opts: order.map(i => "Rp" + f(vals[i]) + "jt"),
    answer: order.indexOf(0),
    explain: `${rt}% × Rp${X}jt = Rp${f(k)}jt. Komisi = biaya VARIABLE: ikut omzet. (Hari 02 § Opex: fixed vs variable)`,
    steps: [
      "Analysis: yang ditanya komisi; diketahui omzet & tarif.",
      "Solve 1: rumus — Komisi = tarif × omzet.",
      `Solve 2: substitusi → ${rt}% × ${X}.`,
      `Solve 3: hitung → Rp${f(k)}jt. Kalau omzet nol, komisi nol.`
    ]
  };
}
function vOpLev(rng){
  const xA = 4 + Math.floor(rng() * 4);                        // 4..7 jt
  const xB = 1 + Math.floor(rng() * 2);                        // 1..2 jt
  const opts = [`B, karena total biayanya lebih kecil dari A`, "Sama dalamnya, karena revenue turunnya sama",
                "Tidak bisa ditentukan tanpa data lengkap", "A, karena operating leverage-nya lebih tinggi"];
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `Dua warung, revenue sama-sama turun 10%. Warung A fixed cost Rp${xA}jt, warung B fixed cost Rp${xB}jt. Mana labanya jatuh lebih dalam?`,
    opts: order.map(i => opts[i]),
    answer: order.indexOf(3),
    explain: `Fixed cost A (Rp${xA}jt) tetap jalan walau revenue turun — labanya terpukul lebih keras. Itulah operating leverage. (Hari 02 § Opex: fixed vs variable)`,
    steps: [
      "Analysis: revenue turun sama; yang beda = fixed cost.",
      "Solve 1: fixed cost tidak ikut turun saat revenue turun.",
      `Solve 2: A menanggung Rp${xA}jt biaya tetap vs B hanya Rp${xB}jt.`,
      "Solve 3: beban tetap yang lebih besar = laba jatuh lebih dalam."
    ]
  };
}
function vCCC(rng){
  const dso = 20 + 5 * Math.floor(rng() * 5);   // 20..40
  const dio = 30 + 5 * Math.floor(rng() * 5);   // 30..50
  const dpo = 15 + 5 * Math.floor(rng() * 5);   // 15..35
  const ccc = dso + dio - dpo;                  // selalu > 0: dso+dio >= 50 > dpo
  const vals = [ccc, dso + dio + dpo, dso + dio, Math.abs(dso - dpo)];
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `DSO ${dso} hari, DIO ${dio} hari, DPO ${dpo} hari. Cash conversion cycle?`,
    opts: order.map(i => vals[i] + " hari"),
    answer: order.indexOf(0),
    explain: `${dso} + ${dio} − ${dpo} = ${ccc} hari. DPO dikurangkan: tempo supplier membebaskan kas. (Hari 03 § DSO, DIO, DPO)`,
    steps: [
      "Analysis: yang ditanya CCC; diketahui DSO, DIO, DPO.",
      "Solve 1: rumus — CCC = DSO + DIO − DPO.",
      `Solve 2: substitusi → ${dso} + ${dio} − ${dpo}.`,
      `Solve 3: hitung → ${ccc} hari kas tertahan dalam operasi.`
    ]
  };
}
function vPiutang(rng){
  const k = 30 + Math.floor(rng() * 31);        // revenue harian 30..60 (Rp ribu), bulat
  const dso = 20 + 5 * Math.floor(rng() * 5);   // 20..40
  const rev = k * 360;
  const ar = k * dso;
  const vals = [ar, k * (dso + 10), Math.round(rev / 1000), Math.round(k * dso / 2)];
  const order = vShuffle([0, 1, 2, 3], rng);
  const f = v => v.toLocaleString("id-ID");
  return {
    q: `Revenue Rp${f(rev)}rb setahun, DSO ${dso} hari (1 tahun = 360 hari). Piutang usaha?`,
    opts: order.map(i => "Rp" + f(vals[i]) + "rb"),
    answer: order.indexOf(0),
    explain: `Revenue harian ${f(k)} × ${dso} = Rp${f(ar)}rb. Jangan tebak saldo — turunkan dari driver. (Hari 03 § Schedule working capital)`,
    steps: [
      "Analysis: yang ditanya piutang; diketahui revenue setahun & DSO.",
      "Solve 1: revenue harian = revenue ÷ 360.",
      `Solve 2: piutang = revenue harian × DSO = ${f(k)} × ${dso}.`,
      `Solve 3: hitung → Rp${f(ar)}rb.`
    ]
  };
}
/* VARIANT-PURE-END */
/* ---------- English concept overlays (EN mode) ---------- */
const CONCEPTS_EN = {
persamaan_akuntansi: {name_en: "Accounting equation", def_en: "Assets = Liabilities + Equity. Every transaction touches at least 2 accounts, and this equation must never break.", diag_en: "Don't guess the number — just move the known terms: Equity = Assets − Liabilities."},
debit_kredit: {name_en: "Debit & credit", def_en: "Debit = LEFT side of the equation; Credit = RIGHT side. Left side increases → debit; right side increases → credit.", diag_en: "Don't memorize 'debit left' as a mantra — derive it from the account's position in A = L + E."},
jurnal: {name_en: "Double-entry journal", def_en: "Every journal: total debit = total credit; at least 2 accounts touched.", diag_en: "Check both sides: which accounts increase/decrease, and which side of the equation they sit on."},
beban_non_kas: {name_en: "Non-cash expenses", def_en: "Expenses like depreciation reduce profit WITHOUT spending cash.", diag_en: "Separate profit from cash: depreciation cuts profit; cash doesn't move."},
akrual: {name_en: "Accrual principle", def_en: "Revenue/expenses are recognized when the economic event happens, not when cash moves.", diag_en: "A credit sale = revenue today, cash next month. Follow the event, not the cash."},
laba_bersih: {name_en: "Net income", def_en: "Revenue − all expenses; the final IS number that flows into retained earnings.", diag_en: "Net income is the end of the IS — that's where the bridge to the balance sheet starts."},
laba_ditahan: {name_en: "Retained earnings", def_en: "RE(end) = RE(start) + Net income − Dividends. The first bridge from IS to the balance sheet.", diag_en: "The order: start + net income − dividends. Profit adds; dividends subtract."},
linkage_3_laporan: {name_en: "3-statement linkage", def_en: "Three bridges: NI → retained earnings; ending cash in CFS = balance-sheet cash; depreciation added back in CFS.", diag_en: "Trace the bridges one at a time — don't mix effects across statements."},
add_back: {name_en: "Depreciation add-back", def_en: "CFO = Net income + depreciation ± Δworking capital.", diag_en: "Depreciation already cut profit but used no cash — add it back in CFS."},
working_capital: {name_en: "Working capital", def_en: "Current assets − current liabilities. Bloated receivables/inventory = cash trapped.", diag_en: "Profit without cash is usually trapped in working capital: receivables or inventory."},
model_3_statement: {name_en: "3-statement model", def_en: "Three interlinked statements — the foundation of ALL valuation models (DCF, LBO, comps).", diag_en: "Remember the order: 3-statement first; DCF, LBO, and comps are built on it."},
hardcode_rule: {name_en: "No-hardcode rule", def_en: "Assumption numbers only in input cells (blue); formulas only reference, never type numbers.", diag_en: "The 1.05 inside a formula will be forgotten in 3 months — move it to an input cell."},
analis_kredit: {name_en: "Credit analyst role", def_en: "Judges a borrower's ability to repay debt — projected cash flows vs obligations.", diag_en: "A credit analyst's focus = default risk (cash), not the share price."},
budget_forecast: {name_en: "Budget/forecast", def_en: "The model that answers operational questions: how long cash lasts (runway).", diag_en: "A pre-revenue startup needs 'when does cash run out' — that's a budget forecast, not DCF."},
absolute_ref: {name_en: "Absolute reference ($)", def_en: "$ locks a reference when copying. Without $, references shift relatively with position.", diag_en: "Check the $ signs: locked cells don't 'walk' when a formula is copied."},
debt_schedule: {name_en: "Debt schedule", def_en: "Debt schedule per period; interest expense computed from the BEGINNING balance.", diag_en: "Interest = rate × beginning debt — not the ending balance. This also breaks circular references."},
revenue_modeling: {name_en: "Revenue modeling", def_en: "Three approaches: bottom-up (volume × price), top-down (market × share), growth-rate. Choose by available data.", diag_en: "Start from observable drivers (customers × price × days), not by guessing revenue."},
margin: {name_en: "Margin (gross & net)", def_en: "Gross margin = (Revenue − COGS) ÷ Revenue; net margin = NI ÷ Revenue. Compressed margin = red flag.", diag_en: "Margin speaks of efficiency — if it's compressed while revenue grows, investigate costs."},
opex: {name_en: "Fixed vs variable cost", def_en: "Fixed cost doesn't move with volume (rent); variable cost follows volume (commission).", diag_en: "Ask: if volume were zero, would this cost still exist? Yes = fixed."},
operating_leverage: {name_en: "Operating leverage", def_en: "High fixed cost → profit very sensitive to revenue changes.", diag_en: "High fixed cost = a double-edged sword: revenue rises a little and profit soars; revenue dips a little and profit collapses."},
is_structure: {name_en: "Tiered IS structure", def_en: "Gross profit → EBIT → EBT → NI. Each level answers a different question.", diag_en: "Don't mix levels: operations (EBIT) vs capital structure (interest) vs fiscal (tax)."},
dso_dio_dpo: {name_en: "DSO, DIO, DPO", def_en: "Days Sales/Inventory/Payables Outstanding — how many days cash is trapped at each operating stage. Receivables = daily revenue × DSO.", diag_en: "Convert rupiah to days first — only then can numbers be compared across companies."},
ccc: {name_en: "Cash conversion cycle", def_en: "CCC = DSO + DIO − DPO. Days cash is trapped in operations; smaller is better.", diag_en: "DPO is subtracted: suppliers who grant terms free up cash."},
wc_schedule: {name_en: "Working capital schedule", def_en: "Built from daily drivers: (revenue ÷ 360) × DSO etc. WC = receivables + inventory − payables; then ΔWC vs last year.", diag_en: "Don't guess balances — derive from daily driver × days."},
sum_avg: {name_en: "SUM/AVERAGE/COUNT", def_en: "Three basic aggregations: sum, average, count. Plus IF and SUMPRODUCT, this is 80% of model formulas.", diag_en: "Before exotic functions — master the basics until they're reflex."},
if_logic: {name_en: "IF logic", def_en: "=IF(condition, yes, no). Conditions produce TRUE/FALSE; IF picks the branch. 4+ nested IFs = smell.", diag_en: "Order conditions from strictest; consider IFS."},
xlookup: {name_en: "XLOOKUP", def_en: "Modern lookup: separate ranges (no column numbers), free direction, exact match by default, if_not_found argument.", diag_en: "For new files always XLOOKUP; VLOOKUP only for reading old files."},
index_match: {name_en: "INDEX+MATCH", def_en: "MATCH finds the POSITION, INDEX takes the VALUE at that position. Survives column inserts, can look left.", diag_en: "Split into two steps: position first, value second."},
sumifs: {name_en: "SUMIFS/COUNTIFS", def_en: "Multi-criteria (AND) aggregation. SUMIFS order: what to sum first, then criteria pairs.", diag_en: "Criteria in input cells, not typed into the formula."},
text_date: {name_en: "TEXT & DATE functions", def_en: "&, LEN/LEFT/RIGHT/MID, DATEVALUE, EOMONTH — tools for cleaning messy data.", diag_en: "Convert to the right type first (text→date), then manipulate."},
pivottable: {name_en: "PivotTable", def_en: "Drag-and-drop aggregation without formulas. Needs manual Refresh; audit trail hidden.", diag_en: "Fine for quick exploration; for maintained models, *IFS formulas win."},
dynamic_arrays: {name_en: "Dynamic arrays", def_en: "One formula spills many results. #SPILL! = blocked area, not a broken formula.", diag_en: "Change n and the results extend — no dragging to miss."},
filter_sort: {name_en: "FILTER/SORT/UNIQUE", def_en: "Queries in cells: filter, sort, unique. Combined with ROWS/SUM they become dynamic aggregations.", diag_en: "The 'filter first, aggregate later' pattern replaces much manual work."},
let_lambda: {name_en: "LET/LAMBDA", def_en: "LET names sub-calculations (compute once, use many); LAMBDA creates your own functions.", diag_en: "Formulas are read 10× more than written — make them readable."},
audit_rumus: {name_en: "Formula auditing", def_en: "Trace Precedents/Dependents, F9 to evaluate formula parts, Ctrl+` to show all formulas.", diag_en: "'Looks right' is not a standard — trace 5 key numbers before sending."},
iferror: {name_en: "IFERROR", def_en: "=IFERROR(formula, fallback). Guard at legitimate risk points — not a bug cover.", diag_en: "As small as possible, as close as possible to the risk point."},
model_structure: {name_en: "Model structure", def_en: "3 zones: INPUT (assumptions, blue cells) → CALCULATION (linked formulas) → OUTPUT (references). No typed numbers in formulas.", diag_en: "Wrong number? Check in order: input → calculation → output."},
circular_ref: {name_en: "Circular reference", def_en: "A formula that (directly/indirectly) references itself. Never ignore Excel's warning.", diag_en: "Restructure the flow — don't silence it with iteration."},
dcf: {name_en: "DCF", def_en: "Discounted cash flow: value = PV of projected FCFF + terminal value. Translates ASSUMPTIONS into a price.", diag_en: "Don't ask 'what's the fair value' first — ask 'what assumptions must hold?'."},
wacc: {name_en: "WACC", def_en: "Weighted average cost of capital — the DCF discount rate. Rises slightly, value drops a lot.", diag_en: "Always test WACC sensitivity — it's the most dangerous lever in DCF."},
terminal_value: {name_en: "Terminal value", def_en: "TV = FCFF_n×(1+g)/(WACC−g): the 'forever' value after the explicit forecast. Often >70% of DCF value.", diag_en: "Most of the value at the far end = most of the risk in two small numbers (WACC, g)."},
scenario_analysis: {name_en: "Scenario analysis", def_en: "Bear/Base/Bull: mapping the possibility space, not one precision guess. Decisions from price vs space.", diag_en: "One number = a disguised guess. Always ask: what scenario changes the conclusion?"},
sotp: {name_en: "Sum-of-the-parts", def_en: "Value each segment with its own multiple, then sum. The weapon for conglomerates.", diag_en: "One WACC for 7 different businesses = valuing 7 houses at one price per square meter."},
conglomerate_discount: {name_en: "Conglomerate discount", def_en: "1 − market price/SOTP value. The market values conglomerates below the sum of parts — a QUESTION, not a verdict.", diag_en: "Don't assume the market is dumb — explain WHY the discount exists."},
fcf: {name_en: "FCFF", def_en: "Free cash flow to firm = NOPAT×(1−reinvestment) = cash for ALL investors. For infrastructure, the truth number.", diag_en: "Net income = accounting; FCFF = cash. For valuation, follow the cash."},
nopat: {name_en: "NOPAT", def_en: "EBIT×(1−tax): operating profit as if debt-free. The FCFF starting point.", diag_en: "Start from pure operations — debt effects handled later (via WACC & net debt)."},
nci: {name_en: "NCI", def_en: "Non-controlling interest: the part of subsidiaries' equity owned by others. Not the parent's — subtract.", diag_en: "Total equity ≠ parent equity. Forgetting NCI = claiming someone else's."},
reverse_dcf: {name_en: "Reverse-DCF", def_en: "From market price back to the assumptions that must hold (implied g). Answers 'what's already priced in?'.", diag_en: "For growth stocks, the first question: what expectations is the market paying for?"},
forensic_audit: {name_en: "Model forensic audit", def_en: "Hunting bugs in others' models: flipped signs, double-counts, typed numbers, fake 'OK's. Look for what's too tidy.", diag_en: "A wrong model that looks right > an obviously broken one. Hunt numbers too tidy to be coincidence."},
capex_cycle: {name_en: "Capex cycle", def_en: "Build (FCF squeezed) → harvest (FCF expands) → build again. Capex = infrastructure's most important valuation variable.", diag_en: "An infrastructure analyst with no view on the capex cycle has no view at all."}
,
akuntansi_sulit: {name_en: "Hard accounting", def_en: "Accounting areas that move model numbers materially: leases (PSAK 73), deferred tax, stock compensation, and NOL. Wrong treatment = profit, debt, and operating cash all miss.", diag_en: "Don't treat a lease as plain rent — PSAK 73 records it as asset + liability."},
asumsi: {name_en: "Stated assumptions", def_en: "Every model input that isn't a fact (growth, margin, DSO) must be written explicitly with its reason. An unwritten assumption can't be tested.", diag_en: "A number with no written assumption looks certain — but it's a guess in a suit."},
audit_tools: {name_en: "Audit tools", def_en: "Trace Precedents/Dependents, evaluate formula parts (F9), and show all formulas (Ctrl+`) to verify a model before sending.", diag_en: "'Looks right' is not a standard — trace 5 key numbers before sending."},
averageifs: {name_en: "AVERAGEIFS", def_en: "Average with multiple (AND) criteria: =AVERAGEIFS(avg_range, criteria1, ...). Same family as SUMIFS, COUNTIFS, MAXIFS, MINIFS.", diag_en: "Make sure the averaged range isn't a criteria range — wrong column = a 'correct' wrong number."},
budget: {name_en: "Budget", def_en: "A binding periodic financial plan: revenue, cost, and cash targets per period. Unlike a forecast — a budget is a commitment.", diag_en: "A budget never compared against actuals = a decoration document."},
budgeting: {name_en: "Budgeting", def_en: "The process of building a budget: incremental (last year ± x%) vs zero-based (built from zero). Choose by business stability.", diag_en: "Incremental budgeting inherits last year's waste — challenge every line."},
bunga: {name_en: "Interest expense", def_en: "Debt cost per period = rate × BEGINNING debt balance. Reduces EBT via the tax shield but raises default risk.", diag_en: "Interest is computed on the beginning balance, not the ending one — wrong base = wrong interest."},
capm: {name_en: "CAPM", def_en: "Cost of equity = Rf + β × (Rm − Rf). Three inputs, all of which must be STATED: risk-free, beta, and market risk premium.", diag_en: "A comps beta never adjusted for leverage = a borrowed cost of equity."},
cfo: {name_en: "CFO (operating cash flow)", def_en: "Cash from operations = net income + non-cash expenses ± Δworking capital (indirect method). Profit without cash is usually trapped in WC.", diag_en: "Positive CFO isn't automatically healthy — check whether it's driven by delaying supplier payments."},
countifs: {name_en: "COUNTIFS", def_en: 'Counts rows meeting ALL criteria (AND). Text/operator criteria like ">10" must be quoted.', diag_en: "COUNTIFS counts rows, it doesn't sum — use SUMIFS to sum."},
diskonto: {name_en: "Discounting", def_en: "Pulling future value to today: PV = FV ÷ (1+r)^t. Rp1,000 next year < Rp1,000 today.", diag_en: "Discounting year-n FCFF with the wrong year exponent shifts the entire DCF."},
dividen: {name_en: "Dividends", def_en: "Profit distribution to shareholders: reduces cash AND retained earnings (equity). Not an expense on the income statement.", diag_en: "Dividends are not an expense — they never appear on the income statement."},
ebitda: {name_en: "EBITDA", def_en: "Earnings before interest, tax, depreciation & amortization. An operating-cash proxy; the basis for EV/EBITDA multiples.", diag_en: "EBITDA ignores capex — for capital-heavy businesses, always pair it with FCFF."},
eps: {name_en: "EPS (earnings per share)", def_en: "Net income ÷ shares outstanding (diluted for the conservative version). In M&A: accretive when pro-forma EPS rises.", diag_en: "EPS rising from buybacks/accretion isn't necessarily better performance — check the source."},
excel_power: {name_en: "Excel power for modeling", def_en: "Modern lookup & aggregation functions (XLOOKUP, *IFS, dynamic arrays) + audit tools: speed without sacrificing auditability.", diag_en: "Fast but unauditable = fast toward a wrong number."},
exit_multiple: {name_en: "Exit multiple", def_en: "The second TV method: TV = final-year metric × a fair multiple (e.g. EV/EBITDA). Cross-check against perpetuity growth.", diag_en: "A 'fair' multiple with no supporting comps = a disguised assumption."},
fcff: {name_en: "FCFF", def_en: "Free cash flow to firm: cash for ALL investors = NOPAT − reinvestment (capex + ΔWC). The raw material of DCF.", diag_en: "Net income = accounting; FCFF = cash. Valuation follows cash."},
flex_budget: {name_en: "Flexible budget", def_en: "A budget restated at ACTUAL volume — separating volume variance from efficiency variance. Fairer than a static budget.", diag_en: "Judging a manager on a static budget when volume missed = punishing the wrong thing."},
goodwill: {name_en: "Goodwill", def_en: "The acquisition price above the target's fair net asset value. Not cash; tested for impairment yearly.", diag_en: "Big goodwill = paying dearly for 'invisible value' — check its impairment test."},
large: {name_en: "LARGE", def_en: "=LARGE(range, k): the k-th largest value. For ranking without sorting data.", diag_en: "Duplicates shift positions — the 2nd LARGE of {300,300,280} = 300, not 280."},
lbo: {name_en: "LBO", def_en: "Leveraged buyout: buying a company with big debt repaid from the company's own cash. Returns from debt paydown + growth + exit multiple.", diag_en: "Leverage magnifies returns AND risk — debt that never pays down = equity wiped out."},
leverage: {name_en: "Leverage", def_en: "Using debt to magnify equity returns. Works both ways: gains grow, losses grow too.", diag_en: "Leverage only pays when asset return > debt cost — always."},
linkage: {name_en: "Statement linkage", def_en: "The living links between the 3 statements inside a model: one changed number must flow everywhere. A model that doesn't balance = something leaking.", diag_en: "One number changed in the IS without flowing to BS/CFS = a leaking model."},
ma: {name_en: "M&A (mergers & acquisitions)", def_en: "Accretion/dilution analysis: does the deal raise the acquirer's EPS? Sources & uses must balance; count synergies only when proven.", diag_en: "Accretion from fantasy synergy assumptions = a bought verdict."},
maxifs: {name_en: "MAXIFS", def_en: "=MAXIFS(max_range, criteria1, ...): maximum with criteria. Written _xlfn.MAXIFS in .xlsx files.", diag_en: "MAXIFS needs Excel 2019+/Sheets — can #NAME? in old LO; write _xlfn.MAXIFS."},
npv: {name_en: "NPV", def_en: "Net present value: PV of cash inflows − initial investment. Rule: accept when NPV > 0 (creates value above cost of capital).", diag_en: "A positive NPV from too-low a discount rate = a bad project in a good suit."},
pajak: {name_en: "Income tax", def_en: "Tax expense = rate × EBT; deferred tax (DTL/DTA) arises from accounting-vs-fiscal temporary differences.", diag_en: "The effective rate rarely equals the statutory rate — the gap tells a temporary-difference story."},
pe_ratio: {name_en: "P/E ratio", def_en: "Price ÷ EPS: how many rupiah the market pays per Rp1 of earnings. Compare against peers & growth — a P/E without context = an empty number.", diag_en: "A low P/E isn't automatically cheap — the market may smell unsustainable earnings."},
ppe_roll: {name_en: "PPE roll-forward", def_en: "PPE(end) = PPE(start) + capex − depreciation − asset sales. The CFS→balance-sheet bridge for fixed assets.", diag_en: "CFS capex ≠ ΔPPE — depreciation always sits between them."},
proforma: {name_en: "Pro forma", def_en: "The 'as-if' statements after the deal: acquirer + target + adjustments (new-debt interest, D&A step-up). The basis for the accretion test.", diag_en: "A pro forma without purchase-accounting adjustments = merging two fantasy companies."},
re_roll: {name_en: "Retained earnings roll-forward", def_en: "RE(end) = RE(start) + NI − dividends. The IS→equity bridge; the first check of every 3-statement model.", diag_en: "Dividends forgotten = equity quietly inflating."},
sensitivitas: {name_en: "Sensitivity analysis", def_en: "Testing how much output (EV) moves when one/two variables (WACC, g) change. 2D tables + tornado charts.", diag_en: "Single-variable sensitivity hides interactions — the tornado shows the ranking."},
skenario: {name_en: "Scenario analysis", def_en: "Bear/Base/Bull: mapping the possibility space, not one precision guess. Decisions from price vs space.", diag_en: "One number = a disguised guess. Always ask: which scenario changes the conclusion?"},
sumproduct: {name_en: "SUMPRODUCT", def_en: "The universal conditional aggregation: multiplies condition arrays (TRUE/FALSE=1/0) by values, then sums. Identical in Excel/Sheets/LO.", diag_en: "Arrays must be the same length — mismatched sizes = #VALUE!."},
unique: {name_en: "UNIQUE", def_en: "=UNIQUE(range): the spilling list of unique values. Wrap with ROWS/SUM for dynamic aggregation. Written _xlfn._xlws.UNIQUE in files.", diag_en: "UNIQUE spills — keep the area below clear or get #SPILL!."},
variance: {name_en: "Variance (vs budget)", def_en: "Actual − budget per line; the sign reads by account type (cost overrun = unfavorable). Split into price vs volume variance.", diag_en: "A variance without price-vs-volume split = knowing 'how much' but not 'why'."},
  akuntansi: {name_en: "Accounting", def_en: "The record-keeping language of business: journals, ledgers, three statements. In this course = the foundation before modeling.", diag_en: "A model that doesn't balance = leaking accounting — check A = L + E before blaming formulas."},
  capstone: {name_en: "Capstone", def_en: "Final project combining all skills: a full model from raw data + recommendation. Capstone I = INDF (Days 12-13), Capstone II = bank (Day 26).", diag_en: "Capstones test transfer: can you build without a template guiding every cell?"},
  comps: {name_en: "Comps (comparable companies)", def_en: "Relative valuation: comparing target multiples (EV/EBITDA, P/E) against similar peers.", diag_en: "A multiple without peer, growth, and risk context = a number without a verdict."},
  mock_exam: {name_en: "Mock exam", def_en: "Simulated exam: 50 questions / 3 hours, timed. Tests readiness; teaches no new material.", diag_en: "A mock score = readiness evidence only if timed and honest — not memorized questions."},
  modal_kerja: {name_en: "Working capital", def_en: "Operating current assets − operating current liabilities. See wc_schedule for the schedule mechanics.", diag_en: "Rising working capital = cash out — profit without cash is an illusion."},
  thesis: {name_en: "Thesis (defense)", def_en: "10-minute presentation + Q&A defending a valuation recommendation: assumptions, evidence, what would change the call.", diag_en: "A good thesis separates fact, assumption, estimate, and judgment."},

};
/* Wire EN overlays into CONCEPTS so cName/cDef/cDiag honor English mode */
for (const _k in CONCEPTS_EN) { if (CONCEPTS[_k]) Object.assign(CONCEPTS[_k], CONCEPTS_EN[_k]); }

/* ---------- English dynamic variants (EN mode) ---------- */
function vEquityEN(rng, ref){
  ref = ref || "Foundation B \u00a7 The equation that rules everything";
  const A = 40 + 10 * Math.floor(rng() * 12);
  let L = 10 + 5 * Math.floor(rng() * 10), guard = 0;
  while ((L >= A || A - L === L) && guard++ < 60) L = 10 + 5 * Math.floor(rng() * 10);
  const E = A - L;
  const vals = [E, A + L, A, L];
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `A shop has assets of Rp${A}m and liabilities of Rp${L}m. What is its equity?`,
    opts: order.map(i => "Rp" + vals[i] + "m"),
    answer: order.indexOf(0),
    explain: `Equity = Assets \u2212 Liabilities = ${A} \u2212 ${L} = Rp${E}m. (${ref})`,
    steps: [
      "Analysis: the question asks for equity; assets & liabilities are known.",
      "Solve 1: write the equation \u2014 Assets = Liabilities + Equity.",
      `Solve 2: move terms \u2192 Equity = Assets \u2212 Liabilities = ${A} \u2212 ${L}.`,
      `Solve 3: compute \u2192 Rp${E}m. Check: ${A} = ${L} + ${E} \u2713`
    ]
  };
}
function vREEN(rng){
  const R0 = 6 + Math.floor(rng() * 9);
  const NI = 4 + Math.floor(rng() * 7);
  const D = 1 + Math.floor(rng() * Math.min(4, NI - 1));
  const RE = R0 + NI - D;
  const vals = [RE, R0 + NI + D, R0 + NI, NI - D];
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `Beginning retained earnings Rp${R0}m, net income Rp${NI}m, dividends Rp${D}m. Ending retained earnings?`,
    opts: order.map(i => "Rp" + vals[i] + "m"),
    answer: order.indexOf(0),
    explain: `${R0} + ${NI} \u2212 ${D} = Rp${RE}m. (Foundation B \u00a7 Retained earnings: the bridge to modeling)`,
    steps: [
      "Analysis: the question asks for ending RE; beginning RE, net income, and dividends are known.",
      "Solve 1: the formula \u2014 RE(end) = RE(start) + NI \u2212 Dividends.",
      `Solve 2: substitute \u2192 ${R0} + ${NI} \u2212 ${D}.`,
      `Solve 3: compute \u2192 Rp${RE}m.`
    ]
  };
}
function vBottomUpEN(rng){
  const cust = 20 + 10 * Math.floor(rng() * 9);
  const price = 10 + 10 * Math.floor(rng() * 4);
  const days = 20 + Math.floor(rng() * 9);
  const rev = cust * price * days / 1000;
  const f = v => (v % 1 === 0 ? String(v) : v.toFixed(1));
  const vals = [rev, cust * price / 1000, cust * price * 30 / 1000, rev * 10];
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `A shop: ${cust} customers/day \u00d7 Rp${price}k \u00d7 ${days} open days. Projected monthly revenue?`,
    opts: order.map(i => "Rp" + f(vals[i]) + "m"),
    answer: order.indexOf(0),
    explain: `${cust} \u00d7 Rp${price}k \u00d7 ${days} = Rp${f(rev)}m. (Day 02 \u00a7 Revenue modeling: 3 approaches)`,
    steps: [
      "Analysis: the question asks for revenue; customers/day, price, and open days are known.",
      "Solve 1: the bottom-up formula \u2014 Revenue = Volume \u00d7 Price \u00d7 Period.",
      `Solve 2: substitute \u2192 ${cust} \u00d7 ${price},000 \u00d7 ${days}.`,
      `Solve 3: compute \u2192 Rp${f(rev)}m.`
    ]
  };
}
function vGrossProfitEN(rng){
  const rev = 120 + 20 * Math.floor(rng() * 20);
  let cogs = 40 + 10 * Math.floor(rng() * 10), guard = 0;
  while ((rev - cogs === cogs || rev - cogs <= 0 || cogs >= rev) && guard++ < 60)
    cogs = 40 + 10 * Math.floor(rng() * 10);
  const gp = rev - cogs;
  const vals = [gp, rev + cogs, cogs, rev];
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `Revenue Rp${rev}m, COGS Rp${cogs}m. Gross profit?`,
    opts: order.map(i => "Rp" + vals[i] + "m"),
    answer: order.indexOf(0),
    explain: `${rev} \u2212 ${cogs} = Rp${gp}m. (Day 02 \u00a7 COGS & gross margin)`,
    steps: [
      "Analysis: the question asks for gross profit; revenue & COGS are known.",
      "Solve 1: the formula \u2014 Gross profit = Revenue \u2212 COGS.",
      `Solve 2: substitute \u2192 ${rev} \u2212 ${cogs}.`,
      `Solve 3: compute \u2192 Rp${gp}m.`
    ]
  };
}
function vJournalEN(rng){
  const X = 1 + Math.floor(rng() * 5);
  const opts = ["Debit Cash, Credit Rent expense", "Debit Rent expense, Credit Cash",
                "Debit Payables, Credit Cash", "Debit Cash, Credit Capital"];
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `Pay rent of Rp${X}m in cash. The correct journal?`,
    opts: order.map(i => opts[i]),
    answer: order.indexOf(1),
    explain: `Expense rises \u2192 debit; cash (asset) falls \u2192 credit. (Foundation B \u00a7 Debit & credit without memorizing)`,
    steps: [
      "Analysis: a cash rent payment \u2014 which accounts change?",
      "Solve 1: Rent expense rises (reduces equity) \u2192 debit.",
      "Solve 2: Cash (asset, left side) falls \u2192 credit.",
      `Solve 3: the journal = Debit Rent expense Rp${X}m, Credit Cash Rp${X}m.`
    ]
  };
}
function vLoanEqEN(rng){
  const X = 10 + 5 * Math.floor(rng() * 8);
  const opts = [`Assets +${X}, Equity +${X}`, `Assets +${X}, Liabilities +${X}`,
                `Liabilities +${X}, Equity \u2212${X}`, "Nothing changes"];
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `Receive a bank loan of Rp${X}m in cash. Which sides of A = L + E change?`,
    opts: order.map(i => opts[i]),
    answer: order.indexOf(1),
    explain: `Cash (asset) +${X} and bank loan (liability) +${X}. Equity untouched. (Foundation B \u00a7 The equation that rules everything)`,
    steps: [
      "Analysis: a cash loan \u2014 two accounts touched: cash & bank debt.",
      "Solve 1: Cash = asset (left side) \u2192 +.",
      "Solve 2: Bank debt = liability (right side) \u2192 +.",
      `Solve 3: Assets +${X}, Liabilities +${X}; the equation stays balanced.`
    ]
  };
}
function vAddBackEN(rng){
  const X = 200 + 100 * Math.floor(rng() * 8);
  const vals = [0, X, Math.round(X / 2), X * 2];
  const order = vShuffle([0, 1, 2, 3], rng);
  const f = v => "Rp" + v.toLocaleString("en-US") + "k";
  return {
    q: `Depreciation expense Rp${X}k. How much cash LEAVES for this expense?`,
    opts: order.map(i => f(vals[i])),
    answer: order.indexOf(0),
    explain: `Rp0 \u2014 depreciation is a NON-CASH expense: it cuts profit, cash doesn't move. (Foundation B \u00a7 Terms that often fool beginners)`,
    steps: [
      "Analysis: the question asks for cash outflow, not the profit effect.",
      "Solve 1: depreciation = allocating the cost of an asset already paid for.",
      "Solve 2: no payment when the expense is recognized \u2192 cash outflow Rp0.",
      "Solve 3: in the CFS this expense is added back to net income."
    ]
  };
}
function vAkrualKasEN(rng){
  const X = 5 + Math.floor(rng() * 8);
  let Y = 2 + Math.floor(rng() * 4), guard = 0;
  while ((Y >= X || X - Y === Y || X - Y === X || X - Y === X + Y) && guard++ < 60)
    Y = 2 + Math.floor(rng() * 4);
  const cfo = X - Y;
  const vals = [cfo, X + Y, X, Y];
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `Net income Rp${X}m, but receivables rose Rp${Y}m (not yet collected) and there are no other non-cash expenses. Estimated cash from operations?`,
    opts: order.map(i => "Rp" + vals[i] + "m"),
    answer: order.indexOf(0),
    explain: `Rp${X}m \u2212 Rp${Y}m = Rp${cfo}m. Profit trapped in receivables = cash not yet in. (Day 01 \u00a7 Bridge 3)`,
    steps: [
      "Analysis: profit vs cash \u2014 rising receivables means sales not yet cash.",
      "Solve 1: operating cash \u2248 net income \u2212 receivables increase.",
      `Solve 2: substitute \u2192 ${X} \u2212 ${Y}.`,
      `Solve 3: compute \u2192 Rp${cfo}m. That's the accrual principle.`
    ]
  };
}
function vKomisiEN(rng){
  const X = 20 + 10 * Math.floor(rng() * 9);
  const rt = 3 + Math.floor(rng() * 5);
  const k = X * rt / 100;
  const f = v => (v % 1 === 0 ? String(v) : v.toFixed(1));
  const vals = [k, k * 2, X, k + X];
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `Revenue Rp${X}m, sales commission ${rt}% of revenue. How much commission is paid?`,
    opts: order.map(i => "Rp" + f(vals[i]) + "m"),
    answer: order.indexOf(0),
    explain: `${rt}% \u00d7 Rp${X}m = Rp${f(k)}m. Commission = a VARIABLE cost: follows revenue. (Day 02 \u00a7 Opex: fixed vs variable)`,
    steps: [
      "Analysis: the question asks for commission; revenue & rate are known.",
      "Solve 1: the formula \u2014 Commission = rate \u00d7 revenue.",
      `Solve 2: substitute \u2192 ${rt}% \u00d7 ${X}.`,
      `Solve 3: compute \u2192 Rp${f(k)}m. If revenue is zero, commission is zero.`
    ]
  };
}
function vOpLevEN(rng){
  const xA = 4 + Math.floor(rng() * 4);
  const xB = 1 + Math.floor(rng() * 2);
  const opts = [`B, because its total costs are lower than A's`, "Both equally, because revenue fell the same",
                "Can't tell without complete data", "A, because its operating leverage is higher"];
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `Two shops, revenue both down 10%. Shop A fixed cost Rp${xA}m, shop B fixed cost Rp${xB}m. Whose profit falls harder?`,
    opts: order.map(i => opts[i]),
    answer: order.indexOf(3),
    explain: `A's fixed cost (Rp${xA}m) keeps running while revenue falls \u2014 its profit gets hit harder. That's operating leverage. (Day 02 \u00a7 Opex: fixed vs variable)`,
    steps: [
      "Analysis: revenue fell the same; the difference = fixed cost.",
      "Solve 1: fixed cost doesn't fall when revenue falls.",
      `Solve 2: A carries Rp${xA}m of fixed cost vs B's Rp${xB}m.`,
      "Solve 3: the bigger fixed burden = profit falls harder."
    ]
  };
}
function vCCCEN(rng){
  const dso = 20 + 5 * Math.floor(rng() * 5);
  const dio = 30 + 5 * Math.floor(rng() * 5);
  const dpo = 15 + 5 * Math.floor(rng() * 5);
  const ccc = dso + dio - dpo;
  const vals = [ccc, dso + dio + dpo, dso + dio, Math.abs(dso - dpo)];
  const order = vShuffle([0, 1, 2, 3], rng);
  return {
    q: `DSO ${dso} days, DIO ${dio} days, DPO ${dpo} days. Cash conversion cycle?`,
    opts: order.map(i => vals[i] + " days"),
    answer: order.indexOf(0),
    explain: `${dso} + ${dio} \u2212 ${dpo} = ${ccc} days. DPO is subtracted: supplier terms free up cash. (Day 03 \u00a7 DSO, DIO, DPO)`,
    steps: [
      "Analysis: the question asks for CCC; DSO, DIO, DPO are known.",
      "Solve 1: the formula \u2014 CCC = DSO + DIO \u2212 DPO.",
      `Solve 2: substitute \u2192 ${dso} + ${dio} \u2212 ${dpo}.`,
      `Solve 3: compute \u2192 ${ccc} days of cash trapped in operations.`
    ]
  };
}
function vPiutangEN(rng){
  const k = 30 + Math.floor(rng() * 31);
  const dso = 20 + 5 * Math.floor(rng() * 5);
  const rev = k * 360;
  const ar = k * dso;
  const vals = [ar, k * (dso + 10), Math.round(rev / 1000), Math.round(k * dso / 2)];
  const order = vShuffle([0, 1, 2, 3], rng);
  const f = v => v.toLocaleString("en-US");
  return {
    q: `Revenue Rp${f(rev)}k per year, DSO ${dso} days (1 year = 360 days). Accounts receivable?`,
    opts: order.map(i => "Rp" + f(vals[i]) + "k"),
    answer: order.indexOf(0),
    explain: `Daily revenue ${f(k)} \u00d7 ${dso} = Rp${f(ar)}k. Don't guess the balance \u2014 derive it from the driver. (Day 03 \u00a7 Working capital schedule)`,
    steps: [
      "Analysis: the question asks for receivables; annual revenue & DSO are known.",
      "Solve 1: daily revenue = revenue \u00f7 360.",
      `Solve 2: receivables = daily revenue \u00d7 DSO = ${f(k)} \u00d7 ${dso}.`,
      `Solve 3: compute \u2192 Rp${f(ar)}k.`
    ]
  };
}
const VARIANT_FNS_EN = {
  "fondasi-b:0": {diff: "Easy", gen: (rng) => vEquityEN(rng)},
  "fondasi-b:3": {diff: "Medium", gen: vREEN},
  "fondasi-b:1": {diff: "Easy", gen: vJournalEN},
  "fondasi-b:4": {diff: "Easy", gen: vLoanEqEN},
  "hari-01:0": {diff: "Easy", gen: (rng) => vEquityEN(rng, "Day 01 \u00a7 The one formula you must never forget")},
  "hari-01:1": {diff: "Easy", gen: vAkrualKasEN},
  "hari-01:2": {diff: "Medium", gen: vREEN},
  "hari-01:3": {diff: "Easy", gen: vAddBackEN},
  "hari-02:0": {diff: "Easy", gen: vBottomUpEN},
  "hari-02:1": {diff: "Easy", gen: vGrossProfitEN},
  "hari-02:3": {diff: "Easy", gen: vKomisiEN},
  "hari-02:4": {diff: "Medium", gen: vOpLevEN},
  "hari-03:1": {diff: "Easy", gen: vCCCEN},
  "hari-03:3": {diff: "Medium", gen: vPiutangEN}
};
