# QA guards — FMVA Sprint

| Guard | Yang dicek |
|---|---|
| `qa_numbers.py` | Hitung ulang independen setiap angka kunci di konten course (toleransi 0,01–0,02). Tambah check baru untuk setiap angka yang dikoreksi. |

Jalankan dari root repo ini:

```sh
python3 qa/qa_numbers.py
```

Exit 0 = ALL PASS.

Riwayat: dipindah ke repo 2026-11-08 dari `~/workspace/build-logs/fmva-v161/qa_numbers.py`
(keputusan Septian: guard WAJIB berversi sebagai backup).
