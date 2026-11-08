"""QA kelas (pola umum) — FMVA Sprint. Ronde 8, 2026-11-09.
Beda dengan qa_numbers.py (angka spesifik): file ini mengunci KELAS kesalahan
di seluruh konten, bukan satu string/angka. Setiap check memindai pola umum;
temuan baru dgn pola sama di lesson mana pun = FAIL.

Jalankan dari root repo:  python3 qa/qa_class_patterns.py
Exit 0 = ALL PASS.

Kelas yang dikunci:
  C1  FCFF tanpa add-back bunga (MF-1 R8): rumus ajar "FCFF = CFO - capex" WAJIB
      membawa add-back ATAU ruang lingkup tanpa-utang di blok yang sama.
      Kuis/hint dilewati (singkatan; rumus ajar-nya yang dijaga) — lihat batasan.
  C2  Multiple dibaca sebagai payback period (SF-1 R8): frasa "N tahun EBITDA"
      WAJIB disertai kualifikasi "bukan payback" di dekatnya.
  C3  Klaim persentase kegagalan tanpa sumber (SF-3 R8): rentang % + kata gagal
      WAJIB disertai sitasi studi di dekatnya.
  C4  Frasa absolut (GG-7 / N-1 / N-3 R8): daftar terlarang yang TUMBUH tiap ronde.
      Tidak menangkap varian baru — lihat batasan + mitigasi di README.
  C5  Akronim tanpa ekspansi di pemakaian pertama (N-2 R8): watchlist fail-closed +
      discovery scan + allowlist berversi (qa/acronym_allowlist.txt).
      Akronim yang SAMA tokennya dgn kata umum (NOL, ARR) = batasan diketahui.
"""
import os
import re
import sys

ROOT = os.path.join(os.path.dirname(__file__), '..')
FILES = ['js/content1.js', 'js/content2.js', 'js/content3.js', 'js/content4.js']
fails = []
_total = [0]


def norm(s):
    """File mencampur UTF-8 literal dan escape \\uXXXX per lesson — samakan dulu."""
    return re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), s)


def chk(name, cond, detail=''):
    _total[0] += 1
    ok = bool(cond)
    print(('PASS ' if ok else 'FAIL ') + name + (f' — {detail}' if detail and not ok else ''))
    if not ok:
        fails.append(name)


TEXTS = {}
for _fn in FILES:
    TEXTS[_fn] = norm(open(os.path.join(ROOT, _fn), encoding='utf-8').read())
ALL = '\n'.join(TEXTS[f] for f in FILES)

# ---------------------------------------------------------------- C1: FCFF add-back
ADD_BACK = ['bunga×(1', 'interest×(1', 'bunga setelah pajak', 'after-tax interest',
            'NOPAT', '+ bunga', '+ interest']
NO_DEBT = ['tanpa utang', 'no debt', 'no-debt', '100% ekuitas', '100% equity', 'tanpa bunga',
           'no interest', 'tidak ada utang', 'tanpa beban bunga', 'no interest expense',
           'warung tanpa utang', '(no-debt']
SHORT_RE = re.compile(r'FCFF\s*=\s*CFO\s*[−\-]\s*capex', re.I)
SHORT_DEF_RE = re.compile(r'CFO\s*[−\-]\s*capex', re.I)  # bentuk definisi: "FCFF ... = CFO - capex"
SHORT_NUM_RE = re.compile(r'FCFF\s*=\s*[\d.,]+\s*[−\-]\s*[\d.,]+\s*\(capex\)')  # bentuk angka: "FCFF = 21,50 - 5,60 (capex)"
_c1_teach, _c1_quiz, _c1_bad = [], [], []
_seen = set()
for _fn, _t in TEXTS.items():
    _cands = []  # (pos, kind)
    for _m in SHORT_RE.finditer(_t):
        _cands.append((_m.start(), 'formula'))
    for _m in SHORT_DEF_RE.finditer(_t):
        if 'FCFF' in _t[max(0, _m.start() - 100):_m.start()]:
            _cands.append((_m.start(), 'definisi'))
    for _m in SHORT_NUM_RE.finditer(_t):
        _cands.append((_m.start(), 'angka'))
    for _pos, _kind in sorted(_cands):
        if any(abs(_pos - _p) < 30 for _p in _seen):
            continue
        _seen.add(_pos)
        _line_start = _t.rfind('\n', 0, _pos) + 1
        _line = _t[_line_start:_t.find('\n', _pos)]
        if 'hints:' in _line or 'explain:' in _line or re.search(r'\{\s*q\s*:', _line):
            _c1_quiz.append((_fn, _pos))
            continue
        _win = _t[max(0, _pos - 800):_pos + 800]
        _frag = _t[_pos:_pos + 120]
        _ok = (any(a in _win for a in ADD_BACK) or any(n in _win for n in NO_DEBT)
               or ('+' in _frag and _kind == 'angka'))
        _c1_teach.append((_fn, _pos, _ok))
        if not _ok:
            _c1_bad.append((_fn, _pos))
chk('C1 FCFF ajar bawa add-back / tanpa-utang (%d pernyataan ajar, %d kuis dilewati)' % (
    len(_c1_teach), len(_c1_quiz)), not _c1_bad,
    'tanpa add-back & tanpa ruang-lingkup: ' + ', '.join('%s@%d' % b for b in _c1_bad[:8]))

# ---------------------------------------------------------------- C2: multiple = payback
PAYBACK_QUAL = ['bukan payback', 'not a payback', 'bukan jangka waktu',
                'not a time period', 'multiple bukan', 'a multiple is not',
                "bukan '7 tahun'", 'not "7 years"', 'bukan “7 tahun”']
_c2_bad = []
for _fn, _t in TEXTS.items():
    for _m in re.finditer(r'(tahun|years of)\s+EBITDA', _t):
        _win = _t[max(0, _m.start() - 200):_m.end() + 200]
        if not any(q in _win for q in PAYBACK_QUAL):
            _c2_bad.append((_fn, _m.start()))
chk('C2 "N tahun EBITDA" selalu terkualifikasi bukan-payback', not _c2_bad,
    'tanpa kualifikasi: ' + ', '.join('%s@%d' % b for b in _c2_bad[:8]))

# ---------------------------------------------------------------- C3: klaim kegagalan tanpa sumber
# "Sumber" = lembaga/penulis BERNAMA + tahun — kata generik "studi/riset" BUKAN sitasi.
CITE = ['KPMG', 'HBR', 'McKinsey', 'Bain', 'Deloitte', 'PwC', 'EY', 'BCG',
        'Oliver Wyman', 'World Bank', 'Bank Indonesia', 'Bank Dunia', 'IMF', 'OECD',
        'BPS', 'OJK', 'Harvard Business Review']
YEAR_RE = re.compile(r'\b(19|20)\d\d\b')
FAILW = ['gagal', 'fail', 'miss', 'berhasil', 'succeed', 'bangkrut', 'default']
_c3_bad = []
for _fn, _t in TEXTS.items():
    for _m in re.finditer(r'\d+\s*[–-]\s*\d+\s*%', _t):
        _ctx = _t[max(0, _m.start() - 60):_m.end() + 160]
        if re.search('|'.join(FAILW), _ctx, re.I):
            _win = _t[max(0, _m.start() - 100):_m.end() + 250]
            if not (any(c in _win for c in CITE) and YEAR_RE.search(_win)):
                _c3_bad.append((_fn, _m.start()))
chk('C3 klaim persentase kegagalan bersumber', not _c3_bad,
    'tanpa sitasi: ' + ', '.join('%s@%d' % b for b in _c3_bad[:8]))

# ---------------------------------------------------------------- C4: frasa absolut (daftar terlarang — TUMBUH tiap ronde)
DENY = [
    # R8 N-1: senioritas absolut
    'bukan opini; ia <b>hukum</b>', "isn't an opinion; it's <b>law</b>",
    'Senioritas bukan opini', "Seniority isn't an opinion",
    # R8 N-3: kompatibilitas absolut + klaim XLOOKUP kedaluwarsa
    'Berfungsi <b>identik</b> di Excel', 'Works <b>identically</b> in Excel',
    'justru <tt>#VALUE!</tt> di Google Sheets', 'returns <tt>#VALUE!</tt> in Google Sheets',
    # R8 SF-1: multiple sebagai payback (bentuk lama, tanpa kualifikasi)
    'pasar membayar 8 tahun EBITDA', 'the market pays 8 years of EBITDA',
    'pasar membayar 8,18 tahun EBITDA', 'the market pays 8.18 years of EBITDA',
    'seharga 7 tahun EBITDA', 'for 7 years of EBITDA',
    # R8 SF-4: kunci spill yang salah (bentuk lama)
    'baris 5 kosong dilewati', 'row 5 skipped',
]
_c4_bad = [(d, ALL.count(d)) for d in DENY if d in ALL]
chk('C4 frasa absolut/kadaluarsa (daftar terlarang) = 0', not _c4_bad,
    'masih ada: ' + ', '.join('%r x%d' % b for b in _c4_bad[:8]))

# ---------------------------------------------------------------- C5: akronim
def _glossary_acronyms():
    out = set()
    for _t in TEXTS.values():
        for _m in re.finditer(r'\["([A-Z][A-Z0-9 /&\-]{2,})"\s*,', _t):
            out.add(_m.group(1).strip())
    return out


ALLOW = set()
_alp = os.path.join(os.path.dirname(__file__), 'acronym_allowlist.txt')
for _line in open(_alp, encoding='utf-8'):
    _line = _line.strip()
    if _line and not _line.startswith('#'):
        ALLOW.add(_line.split()[0])
DEFINED = _glossary_acronyms() | ALLOW
WATCH = {
    # token: (bentuk lengkap ID, bentuk lengkap EN) — WAJIB diekspansi di pemakaian pertama
    'MRA': ('Master Restructuring Agreement', 'Master Restructuring Agreement'),
    'PKPU': ('Penundaan Kewajiban Pembayaran Utang', 'Suspension of Debt Payment'),
}
_lower_words = set(re.findall(r'\b[a-z]{3,}\b', ALL))
_c5_bad, _c5_unknown = [], []
_first = {}
for _fn in FILES:
    _t = TEXTS[_fn]
    for _m in re.finditer(r'\b[A-Z]{3,}\b', _t):
        _tok = _m.group(0)
        if _tok not in _first:
            _first[_tok] = (_fn, _m.start())
for _tok, (_fn, _pos) in sorted(_first.items()):
    if _tok.lower() in _lower_words and _tok not in WATCH:
        continue  # kata umum berhuruf kapital (penekanan), bukan akronim
    if re.fullmatch(r'FY\d+', _tok):
        continue
    _t = TEXTS[_fn]
    _after = _t[_pos:_pos + 200]
    _before = _t[max(0, _pos - 200):_pos]
    _around = _before + _t[_pos:_pos + 10]
    _expanded = (
        bool(re.search(r'\(\s*[^)]*[a-z][^)]*\)', _after))  # TOKEN (ekspansi...)
        or bool(re.search(r'[A-Za-z][\w ]{3,}\s*\(\s*' + re.escape(_tok) + r'\s*\)', _before + _after))  # Nama (TOKEN)
        or bool(re.search(r'[a-z][\w /]{3,}/' + re.escape(_tok) + r'\b', _around))  # kata-kata/TOKEN
        or bool(re.search(r'\b' + re.escape(_tok) + r'\s*[—–-]\s*[A-Z][a-z]', _after[:150]))  # TOKEN — Bentuk Lengkap
        or _tok in DEFINED
    )
    if _tok in WATCH:
        _full_id, _full_en = WATCH[_tok]
        _has_full = (_full_id.lower() in _after.lower() or _full_en.lower() in _after.lower()
                     or _full_id.lower() in _before.lower() or _full_en.lower() in _before.lower())
        chk('C5 watchlist %s diekspansi di pemakaian pertama (%s)' % (_tok, _fn),
            _expanded and _has_full, 'pemakaian pertama %s@%d tanpa ekspansi' % (_fn, _pos))
    elif not _expanded:
        _c5_unknown.append((_tok, _fn))
chk('C5 discovery: akronim tak dikenal di luar allowlist = 0', not _c5_unknown,
    'triase manual: ' + ', '.join('%s(%s)' % u for u in _c5_unknown[:12]))

print()
print('CLASS QA:', f'ALL PASS ({_total[0]} checks)' if not fails else f'{len(fails)} FAILURES: {fails}')
sys.exit(0 if not fails else 1)
