# QA guards — FMVA Sprint

| Guard | Yang dicek |
|---|---|
| `qa_numbers.py` | Hitung ulang independen setiap angka kunci di konten course (toleransi 0,01–0,02) + pin string spesifik pasca-fix (txt). Tambah check baru untuk setiap angka yang dikoreksi. |
| `qa_class_patterns.py` | Pola umum kelas kesalahan di SELURUH konten (bukan satu string/angka). Lihat "Kelas yang dikunci" di bawah. |
| `acronym_allowlist.txt` | Daftar akronim yang BOLEH tanpa ekspansi di pemakaian pertama (ticker, fungsi Excel, standar, istilah umum, nama diri) — dipakai C5. Satu token per baris + alasan di komentar. |

Jalankan dari root repo ini:

```sh
python3 qa/qa_numbers.py
python3 qa/qa_class_patterns.py
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

## Yang HANYA dikunci spesifik (txt di qa_numbers.py, bukan kelas)

| Item R8 | Pin spesifik | Kenapa bukan kelas |
|---|---|---|
| SF-2 checklist goodwill PPA | `goodwill PPA 2.050` hadir | Label checklist spesifik per deal; tidak ada pola umum yang bermakna. Mitigasi: fixture angka + prompt review. |
| SF-4 kunci spill | String kunci spill baru hadir / lama hilang | Mekanisme spill spesifik Excel; pola umumnya = "kunci kuis salah" (terlalu luas untuk guard string). |
| N-4 dua metode TV dinamai | Kalimat penamaan hadir | Penamaan metode spesifik per lesson; kelasnya ("konsep dipakai sebelum didefinisikan") tidak tertangkap guard string. Mitigasi: daftar konsep-diperkenalkan-di-kuis ke prompt review. |
| MF-1 angka DCF (17,46T, 74,55T, Rp8.491, dst.) | Fixture chk + txt hadir/hilang | Angka spesifik; KELAS-nya (C1) dikunci terpisah di atas. |

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
- Konvensi tampil yang dipakai guard angka: angka downstream dihitung dari angka tampil
  hulu (bisa direproduksi learner dengan kalkulator) — BUKAN dari nilai tak-terbulatkan.
  Bila suatu lesson memakai konvensi lain, fixture akan FAIL dan harus diperbaiki
  eksplisit (jangan longgarkan toleransi diam-diam).
