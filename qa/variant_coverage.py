#!/usr/bin/env python3
"""Guard: mistake-review variant coverage (Ronde 10 build).

Counts fresh-number variant keys ("lesson:qi") across the variant
registries and fails closed if coverage drops.

- TOTAL_QUIZ = 534: total quiz questions across all 52 lessons, counted
  2026-11-09 by loading content1-4.js in node and summing
  (lesson.quiz || []).length (fondasi 16, hari 400, excel 41, real 77).
  If lessons/quiz change, update this number deliberately — never
  silently lower the floor.
- Every key must exist in BOTH the ID and the EN registry.
- No key may appear in more than one registry (old / B1 / B2 / B3).

Run from repo root:  python3 qa/variant_coverage.py
Exit 0 = ALL PASS. WAJIB ALL PASS sebelum commit/deploy (aturan Septian).
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOTAL_QUIZ = 534

# (file, id-registry marker, en-registry marker)
REGISTRIES = [
    ("js/concept-graph.js", "const VARIANT_FNS = {", "const VARIANT_FNS_EN = {"),
    ("js/variants-b1.js", "const VARIANT_FNS_B1 = {", "const VARIANT_FNS_EN_B1 = {"),
    ("js/variants-b2.js", "const VARIANT_FNS_B2 = {", "const VARIANT_FNS_EN_B2 = {"),
    ("js/variants-b3.js", "const VARIANT_FNS_B3 = {", "const VARIANT_FNS_EN_B3 = {"),
]

KEY_RE = re.compile(r'^\s*"([a-z0-9-]+:\d+)":\s*\{', re.M)


def keys_in_block(src, marker):
    i = src.index(marker)
    # block ends at the next top-level "};" at column 0 after the marker
    j = src.index("\n};", i)
    return set(KEY_RE.findall(src[i:j]))


def main():
    fails = []
    seen_id, seen_en = {}, {}
    total_id, total_en = set(), set()
    for fname, id_marker, en_marker in REGISTRIES:
        path = os.path.join(ROOT, fname)
        if not os.path.exists(path):
            fails.append(f"{fname}: FILE HILANG")
            continue
        src = open(path, encoding="utf-8").read()
        try:
            id_keys = keys_in_block(src, id_marker)
            en_keys = keys_in_block(src, en_marker)
        except ValueError as e:
            fails.append(f"{fname}: marker registry tidak ditemukan ({e})")
            continue
        if id_keys != en_keys:
            fails.append(
                f"{fname}: ID ({len(id_keys)}) != EN ({len(en_keys)}); "
                f"hanya-ID: {sorted(id_keys - en_keys)[:5]}; "
                f"hanya-EN: {sorted(en_keys - id_keys)[:5]}"
            )
        for k in id_keys:
            if k in seen_id:
                fails.append(f"duplikat ID {k}: {seen_id[k]} dan {fname}")
            seen_id[k] = fname
        for k in en_keys:
            if k in seen_en:
                fails.append(f"duplikat EN {k}: {seen_en[k]} dan {fname}")
            seen_en[k] = fname
        total_id |= id_keys
        total_en |= en_keys
        print(f"PASS {fname}: {len(id_keys)} kunci ID = {len(en_keys)} kunci EN")
    print(f"TOTAL varian ID: {len(total_id)} / {TOTAL_QUIZ} soal kuis "
          f"({len(total_id) / TOTAL_QUIZ * 100:.1f}%)")
    print(f"TOTAL varian EN: {len(total_en)} / {TOTAL_QUIZ} soal kuis")
    if total_id != total_en:
        fails.append("kunci ID keseluruhan != kunci EN keseluruhan")
    missing = TOTAL_QUIZ - len(total_id)
    if missing:
        fails.append(f"coverage belum 100%: {missing} soal kuis tanpa varian")
    if fails:
        print("\nVARIANT COVERAGE QA: FAIL")
        for f in fails:
            print("  FAIL " + f)
        return 1
    print("\nVARIANT COVERAGE QA: ALL PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
