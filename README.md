# FMVA Sprint — Dari Nol Sampai Siap Ujian FMVA

Kursus financial modeling 30 hari, **buatan sendiri** — teks + quiz + hint + latihan Excel + 5 real cases emiten Indonesia. Tanpa video.

🌐 **Live:** https://fmva-sprint.pages.dev/

## Isi

- **Fondasi A/B/C** — akuntansi, laporan keuangan, time value of money
- **Hari 01–30** — kurikulum lengkap: 3-statement, forecasting, WACC, DCF, comps, M&A, LBO, budgeting, bank modeling
- **Track Excel** (4 level) — dari rumus inti sampai dynamic arrays & audit struktur
- **5 Real Cases** — UNVR (DCF), ASII (SOTP), INDF (forensik), TSLA (reverse-DCF), TLKM (capex harvest)
- **English mode** — seluruh konten tersedia ID + EN
- **Workbook checker** — kerjakan di Google Sheets, upload untuk dinilai otomatis
- **Mistake notebook, simulator, glossary 64 istilah, 15 fungsi Excel, cheatsheet**

## Alur belajar

Unduh workbook `.xlsx` → kerjakan di **Google Sheets** → upload ke web untuk dicek.

## Teknologi

Static site — HTML + CSS + vanilla JS (hash-router SPA), tanpa build step. Deploy ke Cloudflare Pages.

```
index.html          # shell: topbar, bottom nav
css/style.css       # Neo-Brutalism design system
js/app.js           # SPA engine: router, quiz, checker, progress, audio
js/content1.js      # Fondasi
js/content2.js      # Hari 01–30 + glossary + fungsi Excel
js/content3.js      # Track Excel
js/content4.js      # Real cases
js/concept-graph.js # concept map
js/i18n.js          # ID/EN strings
assets/             # favicon, brand mark, audio (85% speed)
manifest.json       # PWA manifest
```

Progress tersimpan di `localStorage` (`fmva_progress`). Workbook latihan & jawaban di-host di Google Drive (tautan ada di tiap lesson).

## Standar

Dibangun dengan review independen berlapis (skor akhir 9,2/10): setiap angka perusahaan terverifikasi tahun + periode + sumber, setiap kunci quiz di-recompute, setiap workbook lolos recalc LibreOffice + Google Sheets.

## Author

**Septian Panjaya** — pivoting into finance risk analytics (credit risk, fraud/AML).

- LinkedIn: https://www.linkedin.com/in/septian-panjaya
- Proyek lain: [EXIT RADAR](https://github.com/rwnliwan/radar-tokenized-stocks) · [Fraud Triage Laya](https://github.com/rwnliwan/fraud-triage)
