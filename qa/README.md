# QA guards — FMVA Sprint

| Guard | Yang dicek |
|---|---|
| `qa_numbers.py` | Hitung ulang independen setiap angka kunci di konten course (toleransi 0,01–0,02) + pin string spesifik pasca-fix (txt). Tambah check baru untuk setiap angka yang dikoreksi. |
| `qa_class_patterns.py` | Pola umum kelas kesalahan di SELURUH konten (bukan satu string/angka). Lihat "Kelas yang dikunci" di bawah. |
| `qa_variant_coverage.py` | Cakupan varian fresh mistake-review: tiap kunci "lesson:qi" wajib ada di ID dan EN, tanpa duplikat antar registry (lama/B1/B2/B3), total = 534 soal kuis (100%). |
| `export_import_test.js` | Hardening export/import progress v2 (node, tanpa DOM): round-trip v2 + legacy, file rusak ditolak (termasuk `bad-version`), merge union (mission/done/checker/simulator), backup + pruning maks 3, guard batal-import bila backup gagal, tanggal backup deterministik. |
| `variant_property_test.js` | Property test SEMUA varian live (534 kunci × ID+EN, gen() 100× per kunci = 106.800 run): tiap run 4 opts berbeda + answer 0–3 valid + q/explain/steps non-kosong; + kunci N2 (variantEntry fallback EN→ID). |
| `variant_regression_test.js` | Regression test fix review Terra R10 (vB2TSM proceeds rb/k, b1_h104 FCFF di Q). |
| `acronym_allowlist.txt` | Daftar akronim yang BOLEH tanpa ekspansi di pemakaian pertama (ticker, fungsi Excel, standar, istilah umum, nama diri) — dipakai C5. Satu token per baris + alasan di komentar. |

Jalankan dari root repo ini:

```sh
node qa/export_import_test.js
node qa/variant_regression_test.js
node qa/variant_property_test.js
python3 qa/qa_numbers.py
python3 qa/qa_class_patterns.py
python3 qa/variant_coverage.py
```

Exit 0 = ALL PASS. Keduanya WAJIB ALL PASS sebelum commit/deploy.

Riwayat: dipindah ke repo 2026-11-08 dari `~/workspace/build-logs/fmva-v161/qa_numbers.py`
(keputusan Septian: guard WAJIB berversi sebagai backup).

## Self-learning loop (aturan Septian 2026-11-09, permanen)

Setiap kelas kesalahan yang di-fix WAJIB dikunci guard di ronde fix yang sama.
Guard harus menangkap KELAS-nya (pola umum), bukan hanya string/angka spesifik
yang muncul kali ini. Bila suatu kelas secara jujur tidak bisa dikunci penuh
oleh guard, catat keterbatasannya di bawah + mitigasi: daftar terlarang/fixture
yang terus tumbuh + sertakan daftar itu ke prompt review ronde berikut.
Jangan pura-pura terkunci.

## Kelas yang dikunci (qa_class_patterns.py)

| Kelas | Pola yang dipindai | Status |
|---|---|---|
| C1 — FCFF tanpa add-back (MF-1 R8) | Setiap pernyataan ajar `FCFF = CFO − capex` (bentuk rumus, definisi, dan angka) WAJIB membawa add-back (`+ bunga×(1−t)`, `NOPAT`, …) ATAU ruang lingkup tanpa-utang (`tanpa utang`, `no debt`, `100% ekuitas`, …) dalam ±800 karakter. | **Kelas terkunci.** Kuis/hint dilewati (singkatan) — rumus ajar-nya yang dijaga; kuis hari-12 dipin txt di qa_numbers.py. |
| C2 — Multiple dibaca payback (SF-1 R8) | Setiap `N tahun EBITDA` / `N years of EBITDA` WAJIB disertai kualifikasi `bukan payback` / `not a payback` dalam ±200 karakter. | **Kelas terkunci.** |
| C3 — Klaim % kegagalan tanpa sumber (SF-3 R8) | Rentang `%` + kata gagal/berhasil WAJIB disertai lembaga BERNAMA + tahun (KPMG, HBR, McKinsey, …) dalam jendela yang sama. Kata generik `studi/riset` BUKAN sitasi. | **Kelas terkunci** (untuk klaim berbentuk rentang %; klaim tanpa angka tetap lolos — lihat batasan). |
| C4 — Frasa absolut/kadaluarsa (N-1/N-3 R8, GG-7) | Daftar terlarang (tumbuh tiap ronde): `bukan opini; ia hukum`, `Berfungsi identik di Excel`, `pasar membayar 8 tahun EBITDA`, `baris 5 kosong dilewati`, dst. = 0 kemunculan. | **Spesifik saja** — daftar string, bukan pola semantik. Mitigasi: daftar tumbuh tiap ronde + sertakan ke prompt review ronde berikut. |
| C5 — Akronim tanpa ekspansi (N-2 R8) | Watchlist fail-closed (MRA, PKPU) + discovery scan semua token ALL-CAPS di pemakaian pertama: WAJIB `TOKEN (ekspansi)`, `Nama (TOKEN)`, `kata-kata/TOKEN`, atau `TOKEN — Bentuk Lengkap`, atau masuk allowlist/glosarium. | **Kelas terkunci untuk pemakaian pertama.** Batasan: (a) akronim polisemik (NOL = "nol"/Net Operating Loss; ARR = Accounting Rate of Return vs Annual Recurring Revenue) — guard hanya memeriksa makna pertama; (b) akronim yang didefinisikan lewat sinonim/frasa tanpa token yang sama (mis. PPOP lewat P/PPP) butuh triase manusia → allowlist beralasan; (c) kata Indonesia berhuruf kapital (penekanan) butuh triase manusia → allowlist. |
| C6 — Minus ASCII di awal nilai tampilan (GG-17, R9) | Setiap `-` U+002D yang menempel di depan digit/`Rp` sebagai awal nilai tampilan (prose, tabel, opsi/hint/explain kuis, callout) WAJIB 0 — ganti ke minus Unicode U+2212. Operator antar-digit (`17 - 20`), metadata (`hari-18`, `ke-1`, tanggal, URL), dan kode JS BUKAN pelanggaran. Pengecualian beralasan: sintaks Excel (rumus `=...`, `<tt>`) + contoh literal ketik Hari 01 (`HPP = -7500` / `COGS = -7500`, vonis 3-suara 3-0: mengetik U+2212 di Excel tersimpan sebagai teks). | **Kelas terkunci.** Batasan: (a) guard tidak membedakan "nilai yang ditampilkan untuk dibaca" vs "nilai yang diinstruksikan untuk diketik" selain dua string allowlist Hari 01 — kemunculan baru pola "ketik -X" di lesson lain akan FAIL dan butuh triase manusia (pertahankan ASCII + allowlist, atau ubah kalimatnya); (b) pola frasa absolut semantik (C4) tetap daftar-string, bukan pemahaman — lihat batasan C4. |
| C4 — Frasa absolut/kadaluarsa (N-1/N-3 R8, GG-7; +R9) | Daftar terlarang (tumbuh tiap ronde): `bukan opini; ia hukum`, `Berfungsi identik di Excel`, `pasar membayar 8 tahun EBITDA`, `baris 5 kosong dilewati`, dst. = 0 kemunculan. R9 menambah: klaim lease absolut (`kalau kamu wajib bayar, itu utang`), TSM campur-arah (`share count basi atau opsi bruto = overvalue`), CFO salah arah (`add-back non-kas Rp3.169,55 melebihi`), leverage absolut (`utang memperbesar return atas modal sendiri` tanpa syarat), variance opex terbalik (`(6.000 - 6.200 = -200)`), no-hardcode absolut (`Tidak ada angka ketik sama sekali`). | **Spesifik saja** — daftar string, bukan pola semantik. Mitigasi: daftar tumbuh tiap ronde + sertakan ke prompt review ronde berikut. |

## Yang HANYA dikunci spesifik (txt di qa_numbers.py, bukan kelas)

| Item R8 | Pin spesifik | Kenapa bukan kelas |
|---|---|---|
| SF-2 checklist goodwill PPA | `goodwill PPA 2.050` hadir | Label checklist spesifik per deal; tidak ada pola umum yang bermakna. Mitigasi: fixture angka + prompt review. |
| SF-4 kunci spill | String kunci spill baru hadir / lama hilang | Mekanisme spill spesifik Excel; pola umumnya = "kunci kuis salah" (terlalu luas untuk guard string). |
| N-4 dua metode TV dinamai | Kalimat penamaan hadir | Penamaan metode spesifik per lesson; kelasnya ("konsep dipakai sebelum didefinisikan") tidak tertangkap guard string. Mitigasi: daftar konsep-diperkenalkan-di-kuis ke prompt review. |
| MF-1 angka DCF (17,46T, 74,55T, Rp8.491, dst.) | Fixture chk + txt hadir/hilang | Angka spesifik; KELAS-nya (C1) dikunci terpisah di atas. |
| R9 T-1..T-8, C-2..C-4 | Fixture chk (TSM EPS bruto 0,413 vs neto 0,451; CFO +540,41; opex +200; MAE presisi penuh) + txt hadir (kualifikasi lease/NPV/leverage, undervalue TSM, satuan Buyback, desimal neraca, ambang NOL >50%) | Angka/kalimat spesifik per lesson; KELAS-nya dikunci C4 (frasa absolut — daftar terlarang) + C6 (minus ASCII — pola umum). Yang TIDAK terkunci penuh: varian kalimat absolut baru dengan kata berbeda (C4 = daftar string) dan klaim "aturan lesson dilanggar" yang butuh pemahaman semantik (variance/NPV/no-hardcode) — mitigasi: daftar tumbuh + prompt review. |
| R10 DeepSeek (M2/S1/S2/S3/S5/M1/S4/N1/N2/N4, Gap a/b/c) | `export_import_test.js` (node): merge mission union per key (best=max, latest dari date terbaru, bal=OR, date=max; test 4l/4p–4t) + done union OR; checker skor seri → date terbaru (4v–4z); simulator runs = max bukan jumlah (4u + komentar alasan di `mergeProgress`); unwrapImport `bad-version` (version wajib number ≤ 2; 99/3/tanpa-version/string ditolak, 2/1 diterima — 3u/3v); `importBackupGuard` (progress isi + backup null → batal; kosong/hanya-_pg2 → lanjut; backup gagal disimulasikan stub localStorage throw — 5h–5m); `backupProgressNow(now)` tanggal tetap (5b2, pruning 5e/5f deterministik); `doResetProgress` backup dulu sebelum removeItem (cek statis di file test). `variant_property_test.js` (node): SEMUA 534 kunci × ID+EN × 100 run — 4 opts berbeda + answer valid + q/explain/steps non-kosong; N2 fallback EN→ID diuji key sintetis. `qa_numbers.py` pin txt R10 (17 pin: prog_backup_fail ID+EN, bad-version, mission/done union, checker tie-break, backup tanggal, runs max, reset backup dulu, simR100 guard, variantEntry fallback, dedupe b3h268/b1_h091/vCCC/vB2CCC/vB2Sculpt/vB2EPS/vB2GoodwillPPA). | Kelas "duplikat opsi varian" dikunci DUA lapis: (1) property test registry live — generator yang duplikat di draw apa pun dalam 100 run deterministik FAIL; (2) fix by construction di generator mentah (dedupe numerik / eliminasi parameter pemicu), BUKAN re-roll — wrapper retry (b1retry/b3retry) tetap sebagai pengaman lapis kedua, bukan satu-satunya. Verifikasi mentah terpisah (bukan bagian test rutin): b1_h091 + b3h268 masing-masing 0/2.000 draw mentah (juga 0/20.000). Batasan jujur: property test memakai 100 seed deterministik per kunci — tabrakan yang hanya muncul di luar seed itu lolos sampai ada yang menambah seed/draw; mitigasi: sweep 500 draw/kunci (baseline pra-fix: 14 kombinasi gagal, semua dari 7 generator yang sudah difix — vCCC/vCCCEN, vB2CCC, vB2EPS, vB2GoodwillPPA, vB2Sculpt — pasca-fix sweep ulang 100 draw = 0 gagal). |

## Batasan yang diketahui (jujur dicatat)

- C1 melewati konteks kuis/hint — singkatan rumus di kuis tetap bisa menyesatkan bila
  learner hanya membaca kuis. Mitigasi: kuis hari-12 dipin txt; reviewer ronde berikut
  diminta memeriksa hint kuis yang menyingkat rumus.
- C3 hanya menangkap klaim berbentuk rentang persen (`70–80%`). Klaim kegagalan tanpa
  angka ("sebagian besar akuisisi gagal") tidak terdeteksi. Mitigasi: daftar frasa
  kegagalan tanpa angka ke prompt review.
- C4 adalah daftar, bukan pemahaman — varian kalimat baru dengan makna absolut yang sama
  lolos sampai ada yang menambahkannya. Mitigasi: daftar tumbuh tiap ronde.
- C5 tidak memahami semantik "didefinisikan": ekspansi yang hadir sebagai sinonim tanpa
  token yang sama, dan akronim polisemik, butuh triase manusia (lihat tabel C5).
- C6 (GG-17) tidak membedakan "nilai untuk dibaca" vs "nilai untuk diketik" selain dua
  string allowlist Hari 01 (`HPP = -7500`, `COGS = -7500` — vonis 3-suara R9 3-0:
  U+2212 yang diketik di Excel tersimpan sebagai teks). Pola "ketik -X" baru di lesson
  lain akan FAIL dan butuh triase manusia. Rumus Excel (`=...`, `<tt>`) dikecualikan
  karena tanda hubung ASCII adalah sintaks; hasil rumus setelah panah (`→ ≈ -4,1`)
  tetap ditandai sebagai nilai tampilan.
- C4 tetap daftar-string: varian kalimat absolut baru (mis. klaim "selalu"/"tidak pernah"
  dengan kata berbeda) lolos sampai ada yang menambahkannya. Kelas semantik "aturan
  lesson dilanggar" (variance/NPV/no-hardcode R9) hanya terkunci lewat pin spesifik
  + daftar terlarang, bukan pemahaman — mitigasi: daftar tumbuh tiap ronde + sertakan
  ke prompt review ronde berikut.
- Konvensi tampil yang dipakai guard angka: angka downstream dihitung dari angka tampil
  hulu (bisa direproduksi learner dengan kalkulator) — BUKAN dari nilai tak-terbulatkan.
  Bila suatu lesson memakai konvensi lain, fixture akan FAIL dan harus diperbaiki
  eksplisit (jangan longgarkan toleransi diam-diam).
