#!/usr/bin/env python3
"""Lettering komik FMVA + QA guard otomatis.

Aturan (dari teguran Septian 1 Nov 2026: "ukuran tulisan dan bagan masih kurang rapi"):
1. UKURAN FONT SERAGAM — speech/thought 23px, narasi 20px. Tidak ada auto-shrink
   per bubble (itu yang bikin tidak rapi). Kalau teks tidak muat -> pecah baris
   manual atau perpendek teks, JANGAN kecilkan font.
2. Setiap baris teks WAJIB muat dalam max_w pada font tetap (assert).
3. Bubble WAJIB di dalam panel (assert).
4. Bubble TIDAK BOLEH menutupi wajah (keep-out zones per panel, assert).
5. Ekor bubble menunjuk ke pembicara yang benar (cek manual 1x via visual).

Pakai: python3 lettering_qa.py  -> assert lolos -> render panel + grid final.

Catatan kesalahan & aturan (dokumen hidup, dipakai ulang semua materi):
~/workspace/komik-edu/CATATAN-QA.md — update tiap ada temuan baru.
"""
from PIL import Image, ImageDraw, ImageFont
import math, os

BASE = os.path.dirname(os.path.abspath(__file__))
SRC = "/tmp"  # panelN.png mentah (tanpa teks) dari split grid
F_SPEECH = ImageFont.truetype("DejaVuSans-Bold", 23)
F_NARR = ImageFont.truetype("DejaVuSans-Bold", 20)
KINDS = {"speech": F_SPEECH, "thought": F_SPEECH, "narr": F_NARR}
PAD = 18

# (panel, kind, cx, cy, max_w, [lines], tail|None)
# max_w = lebar baris terlebar aktual pada font TETAP (diukur via PIL, bukan tebakan).
BUBBLES = [
 (1, "narr",   160, 38, 280, ["Warung Sari laku keras!"], None),
 (1, "thought",415, 75, 265, ["Tapi kok uangnya", "selalu habis?", "Ke mana perginya?!"], (230, 150)),
 (2, "speech", 300, 300, 280, ["Tenang, Sari.", "Kenalan dulu dengan", "3 sahabatmu!"], (200, 190)),
 (3, "narr",   145, 36, 245, ["1. Laporan Laba Rugi"], None),
 (3, "speech", 405, 300, 290, ["Pendapatan dikurangi", "beban... jadi tahu", "untung atau rugi!"], (280, 205)),
 (4, "speech", 330, 300, 355, ["2. Neraca:", "Aset = Liabilitas + Ekuitas.", "Harus selalu seimbang!"], (305, 175)),
 (5, "narr",   145, 36, 235, ["3. Laporan Arus Kas"], None),
 (5, "thought",265, 105, 250, ["Uang masuk lawan", "uang keluar...", "bocor ke mana ya?"], (450, 150)),
 (6, "speech", 110, 55, 175, ["Labaku naik!"], (155, 135)),
 (6, "thought",418, 60, 265, ["Dompetku kosong?!", "Laba ≠ kas!"], (450, 145)),
 (7, "speech", 450, 57, 195, ["Ingat: beban", "ditulis negatif."], (455, 150)),
 (7, "speech", 118, 305, 140, ["Minus...", "gampang!"], (190, 240)),
 (8, "narr",   215, 53, 315, ["Misi Hari 1:", "perbaiki model yang rusak!"], None),
 (8, "speech", 300, 322, 110, ["Siap!"], (290, 250)),
]

# zona wajah (x0,y0,x1,y1) per panel — bubble tidak boleh menyentuhnya
KEEPOUT = {
 1: [(150, 90, 240, 170)],
 2: [(110, 70, 250, 210), (470, 170, 560, 260)],
 3: [(190, 110, 310, 200)],
 4: [(260, 80, 350, 170), (0, 150, 110, 240)],
 5: [(420, 110, 540, 190)],
 6: [(300, 120, 400, 200), (430, 130, 540, 200)],
 7: [(190, 150, 280, 230), (410, 110, 520, 190)],
 8: [(190, 210, 290, 285), (340, 200, 440, 280)],
}

def rect_overlap(a, b):
    return not (a[2] <= b[0] or a[0] >= b[2] or a[3] <= b[1] or a[1] >= b[3])

def draw_bubble(im, kind, cx, cy, max_w, lines, tail):
    d = ImageDraw.Draw(im)
    font = KINDS[kind]
    # QA1: tiap baris muat dalam max_w pada font TETAP
    for ln in lines:
        w = d.textlength(ln, font=font)
        assert w <= max_w, f"QA1 FAIL: baris '{ln}' lebar {w:.0f} > max_w {max_w} — pecah baris manual!"
    lh = font.getbbox("Ag")[3] + 8
    tw = max(d.textlength(l, font=font) for l in lines)
    th = lh * len(lines)
    bw, bh = tw + PAD * 2, th + PAD * 2
    x0, y0, x1, y1 = cx - bw / 2, cy - bh / 2, cx + bw / 2, cy + bh / 2
    W, H = im.size
    # QA2: bubble di dalam panel
    assert x0 >= 2 and y0 >= 2 and x1 <= W - 2 and y1 <= H - 2, \
        f"QA2 FAIL: bubble ({x0:.0f},{y0:.0f},{x1:.0f},{y1:.0f}) keluar panel {W}x{H}"
    # QA3: tidak menutupi wajah
    pn = current_panel[0]
    for z in KEEPOUT.get(pn, []):
        assert not rect_overlap((x0, y0, x1, y1), z), \
            f"QA3 FAIL: panel {pn} bubble ({x0:.0f},{y0:.0f}) menutupi zona wajah {z}"
    if kind == "narr":
        d.rounded_rectangle([x0, y0, x1, y1], radius=10, fill=(255, 243, 205), outline="black", width=3)
    else:
        tx, ty = tail
        assert 0 <= tx <= W and 0 <= ty <= H, f"QA4 FAIL: tail di luar panel"
        ang = math.atan2(ty - cy, tx - cx)
        rx, ry = bw / 2, bh / 2
        p1 = (cx + rx * math.cos(ang - 0.24), cy + ry * math.sin(ang - 0.24))
        p2 = (cx + rx * math.cos(ang + 0.24), cy + ry * math.sin(ang + 0.24))
        d.polygon([p1, p2, (tx, ty)], fill="white", outline="black")
        d.ellipse([x0, y0, x1, y1], fill="white", outline="black", width=3)
        if kind == "thought":
            for t, r in [(0.4, 10), (0.65, 6)]:
                bx, by = cx + (tx - cx) * t, cy + (ty - cy) * t
                d.ellipse([bx - r, by - r, bx + r, by + r], fill="white", outline="black", width=2)
    y = cy - th / 2
    for ln in lines:
        w = d.textlength(ln, font=font)
        d.text((cx - w / 2, y), ln, font=font, fill="black")
        y += lh
    return (x0, y0, x1, y1)

current_panel = [0]

def main():
    panels = {}
    for n in range(1, 9):
        panels[n] = Image.open(f"{SRC}/panel{n}.png").convert("RGB")
    for (pn, kind, cx, cy, mw, lines, tail) in BUBBLES:
        current_panel[0] = pn
        box = draw_bubble(panels[pn], kind, cx, cy, mw, lines, tail)
        print(f"panel {pn} {kind:7s} OK box=({box[0]:.0f},{box[1]:.0f},{box[2]:.0f},{box[3]:.0f})")
        panels[pn].save(f"{BASE}/panel{pn}.png")
    # grid final
    g = Image.new("RGB", (569 * 2 + 16, 378 * 4 + 40), (20, 20, 20))
    ys = [378, 375, 375, 361]
    y, idx = 8, 1
    for r in range(4):
        x = 8
        for c in range(2):
            g.paste(panels[idx], (x, y)); x += 569 + 8; idx += 1
        y += ys[r] + 8
    g.save("/tmp/comic_qa.jpg", quality=90)
    print("QA LULUS — /tmp/comic_qa.jpg")

if __name__ == "__main__":
    main()
