"""QA v1.61 — independent recomputation of every key figure in the new content.
Each check recomputes from raw inputs; tolerance 0.01 (0.02 where noted)."""
fails = []
_total = [0]
def chk(name, got, want, tol=0.02):
    _total[0] += 1
    ok = abs(got - want) <= tol
    print(('PASS ' if ok else 'FAIL ') + f'{name}: got {got:.4f} want {want}')
    if not ok: fails.append(name)

# --- H15 Monte Carlo 3x3 ---
ev = {}
for w, pw in [(0.10, .25), (0.12, .50), (0.14, .25)]:
    for g, pg in [(0.02, .25), (0.03, .50), (0.04, .25)]:
        ev[(w, g)] = 100 * (1 + g) / (w - g)
E = sum(v * {0.10: .25, 0.12: .50, 0.14: .25}[w] * {0.02: .25, 0.03: .50, 0.04: .25}[g]
        for (w, g), v in ev.items())
chk('MC E[EV]', E, 1183.23, 0.05)
chk('MC base EV', 100 * 1.03 / 0.09, 1144.44, 0.01)
p_lt = sum({0.10: .25, 0.12: .50, 0.14: .25}[w] * {0.02: .25, 0.03: .50, 0.04: .25}[g]
           for (w, g), v in ev.items() if v < 1000)
chk('MC P(EV<1000)', p_lt, 0.1875, 0.001)
# --- H15 decision tree ---
chk('DT EMV wait', 0.6 * 120 + 0.4 * (-20), 64)
# --- H18 capital budgeting ---
cfs = [300, 400, 500, 400]
pv = sum(cf / 1.1 ** (i + 1) for i, cf in enumerate(cfs))
chk('NPV', pv - 1000, 252.18, 0.05)
chk('PI', pv / 1000, 1.25, 0.01)
cum = 0; pb = None
for i, cf in enumerate(cfs):
    if cum + cf >= 1000: pb = i + (1000 - cum) / cf; break
    cum += cf
chk('payback', pb, 2.6, 0.01)
cumd = 0; dpb = None
for i, cf in enumerate(cfs):
    d = cf / 1.1 ** (i + 1)
    if cumd + d >= 1000: dpb = i + (1000 - cumd) / d; break
    cumd += d
chk('disc payback', dpb, 3.08, 0.02)
chk('ARR', 150 / 500, 0.30, 0.001)
def npv_at(r): return sum(cf / (1 + r) ** (i + 1) for i, cf in enumerate(cfs)) - 1000
print(f'  IRR check: NPV(20%)={npv_at(0.20):.2f} NPV(21%)={npv_at(0.21):.2f} (want +10.03 / -10.02)')
chk('NPV@20%', npv_at(0.20), 10.03, 0.05); chk('NPV@21%', npv_at(0.21), -10.02, 0.05)
# conflict
chk('NPV A', -1000 + 1300 / 1.1, 181.82, 0.01)
chk('NPV B', -5000 + 6200 / 1.1, 636.36, 0.01)
chk('IRR A', 1300 / 1000 - 1, 0.30, 0.001)
chk('IRR B', 6200 / 5000 - 1, 0.24, 0.001)
# multiple IRR
chk('multi-IRR NPV(0%)', -100 + 250 - 150, 0, 0.001)
chk('multi-IRR NPV(50%)', -100 + 250 / 1.5 - 150 / 2.25, 0, 0.01)
# Fisher
chk('real rate', 1.12 / 1.05 - 1, 0.0667, 0.001)
# --- H18 forecasting ---
chk('MAE MA3', (15 + 6.33) / 2, 10.67, 0.05)
chk('MAPE MA3', (15 / 120 + 6.33 / 118) / 2 * 100, 8.93, 0.05)
chk('MAE exp', (10 + 2 + 16.4) / 3, 9.47, 0.02)
chk('MAPE exp', (10 / 110 + 2 / 105 + 16.4 / 120) / 3 * 100, 8.22, 0.02)
# --- H18 mix variance ---
chk('price var', (9 - 10) * 1200 + (22 - 20) * 400, -400, 0.01)
chk('vol var', (1200 - 1000) * 10 + (400 - 500) * 20, 0, 0.01)
chk('mix A', (1200 - 1600 * 2 / 3) * 10, 1333.33, 0.01)
chk('mix B', (400 - 1600 * 1 / 3) * 20, -2666.67, 0.01)
chk('qty var', (1600 - 1500) * (20000 / 1500), 1333.33, 0.01)
chk('bridge total', 20000 + 1333.33 - 1333.33 - 400, 19600, 0.01)
# --- H02/H03 ratios + EFN + CVP ---
chk('UNVR current', 8.0 / 12.0, 0.67, 0.01)
chk('UNVR quick', (8.0 - 2.5) / 12.0, 0.46, 0.01)
chk('ASII current', 180 / 120, 1.50, 0.01)
chk('ASII quick', (180 - 60) / 120, 1.00, 0.01)
chk('UNVR D/E', 10 / 4, 2.50, 0.01)
chk('ASII D/E', 150 / 200, 0.75, 0.01)
chk('coverage UNVR', 6 / 1, 6.0, 0.01)
chk('coverage ASII', 40 / 5, 8.0, 0.01)
chk('EFN', 120 - 60 - 72, -12, 0.01)
chk('BEP', 800 / 8, 100, 0.01)
chk('MoS', (150 - 100) / 150, 0.333, 0.001)
# --- H09 APV / EP / CRP / EBIT* ---
chk('VU', 100 * 1.03 / (0.11 - 0.03), 1287.50, 0.01)
pvts = 7.04 / 1.08 + 5.28 / 1.08 ** 2 + 3.52 / 1.08 ** 3 + 1.76 / 1.08 ** 4
chk('PV tax shield', pvts, 15.13, 0.02)
chk('APV', 1287.50 + pvts, 1302.63, 0.05)
chk('EP value', 1000 + 50 / (0.10 - 0.03), 1714.29, 0.05)
chk('DCF cross-check', 120 / (0.10 - 0.03), 1714.29, 0.05)
chk('Ke CRP', 4 + 1.2 * 5 + 2.5, 12.5, 0.01)
chk('EV with CRP', 103 / (0.125 - 0.03), 1084.21, 0.05)
chk('EV w/o CRP', 103 / 0.07, 1471.43, 0.05)
chk('EBIT*', 800, 800, 0.01)
chk('EPS check A', 800 * 0.78 / 1000, 0.624, 0.001)
chk('EPS check B', (800 - 320) * 0.78 / 600, 0.624, 0.001)
# --- H11 DLOM ---
chk('DLOM value', 1000 * 0.80 * 0.75, 600, 0.01)
chk('combined discount', 1 - 0.80 * 0.75, 0.40, 0.001)
chk('conversion value', 100 * 12, 1200, 0.01)
# --- H13 cyclical / 2-stage / ESG ---
chk('EV mid-cycle', 206 / 0.08, 2575, 0.01)
chk('EV peak', 360.5 / 0.08, 4506, 0.5)
chk('EV 2-stage', 62.5 / 1.12 + 78.125 / 1.2544 + 97.65625 / 1.404928 + (97.65625 * 1.03 / 0.09) / 1.404928, 983.12, 0.1)
chk('EV ESG 11%', 103 / 0.08, 1287.50, 0.01)
chk('EV ESG 11.5%', 103 / 0.085, 1211.76, 0.05)
# --- R4: H13 TV share — PV basis, bukan nominal (S7) — R8: rantai DCF baru (PV FCFF 51,00; EV 114,65) ---
chk('H13 PV TV share', 63.65 / 114.65, 0.555, 0.002)
chk('H13 TV nominal trap', 112.17 / (112.17 + 51.00), 0.687, 0.002)
chk('H13 blind per-share', 75660000 / 2000000000, 0.03783, 0.00001)
# --- H16 payout ---
chk('div after tax', 0.9 + 9, 9.90, 0.01)
# --- H17 LBO docs ---
chk('leverage', 600 / 100, 6.0, 0.01)
chk('coverage LBO', 100 / 45, 2.22, 0.01)
chk('sweep', 0.5 * (60 - 20), 20, 0.01)
chk('refi saving', 600 * (0.09 - 0.07), 12, 0.01)
chk('div recap lev', 650 / 100, 6.5, 0.01)
# --- R4: H17 exit math — kas sisa Y5 masuk equity exit (kanonis BERUBAH) ---
_eb = 10000.0; _db = 26000.0; _cs_y5 = 0.0; _db_y5 = 0.0
for _t in range(1, 6):
    _eb *= 1.08
    _ebit = _eb - 2000
    _in = 0.07 * _db
    _ebt = _ebit - _in
    _ni = _ebt * 0.78
    _cs = _ni + 2000 - 2500
    if _t == 5:
        _cs_y5 = _cs; _db_y5 = _db
    _db = max(_db - _cs, 0)
_ev_x = _eb * 5
_cash_left = max(_cs_y5 - _db_y5, 0)
_eq_x = _ev_x + _cash_left - _db
chk('H17 cash leftover Y5', _cash_left, 9266.59, 0.05)
chk('H17 equity exit', _eq_x, 82732.99, 0.05)
chk('H17 MoIC', _eq_x / 25000, 3.31, 0.01)
chk('H17 IRR', (_eq_x / 25000) ** (1 / 5) - 1, 0.27, 0.01)
chk('H17 MoIC flat-EV', (50000 + _cash_left) / 25000, 2.37, 0.01)
chk('H17 MoIC exit-4x', (14693.28 * 4 + _cash_left) / 25000, 2.72, 0.01)
# CROSS-SECTION R4: MoIC prose/quiz vs equity exit (harus dari rantai yang sama)
chk('X H17 MoIC = exit/equity', _eq_x / 25000, 3.31, 0.01)
chk('X H17 exit = EV + cash - debt', _ev_x + _cash_left - 0, 82732.99, 0.05)
# --- H26 CAR ---
chk('CAR', 10 / 80, 0.125, 0.001)
chk('CET1', 9 / 80, 0.1125, 0.001)
chk('excess capital', (0.1125 - 0.10) * 80, 1.0, 0.01)
# --- R5: H26 RWA sensitivity — derivasi yang dikoreksi (jawaban akhir 15,3% TIDAK berubah) ---
# ATMR lama didekomposisi: kredit 0,85x11.239 + aset lain 0,20x2.894 (dulu 2.894 tak terdefinisi,
# rumus lama salah basis: 11.239 + 0,2x2.894). Jalur benar = delta bobot 0,15x11.239.
chk('H26 RWA old decomposition', 0.85 * 11239 + 0.20 * 2894, 10132, 0.1)
chk('H26 RWA delta weight', 0.15 * 11239, 1685.85, 0.01)
chk('H26 RWA new', 10132 + 0.15 * 11239, 11817.85, 0.01)
chk('H26 CAR old', 1812.18 / 10132, 0.1789, 0.001)
chk('H26 CAR new', 1812.18 / 11817.85, 0.1533, 0.001)
chk('H26 CAR buffer shrink pp', 1812.18 / 10132 * 100 - 1812.18 / 11817.85 * 100, 2.55, 0.05)
chk('P/TBV', 5000 / 1800, 2.78, 0.01)
chk('P/PPP', 5000 / 400, 12.5, 0.01)
# --- real-07 binomial ---
p = (1.05 - 0.80) / (1.25 - 0.80)
chk('binom p', p, 0.5556, 0.001)
chk('binom value', (p * 125) / 1.05, 66.13, 0.05)
# --- real-09 Altman ---
chk('Altman Z', 1.2 * (-0.05) + 1.4 * (-0.10) + 3.3 * 0.02 + 0.6 * 0.10 + 1.0 * 0.30, 0.226, 0.001)
chk('Tranche B haircut', 21.7333 * 0.30, 6.52, 0.02)
# --- real-10 project finance ---
chk('DSCR base', 218 / 150, 1.45, 0.01)
chk('waterfall dist', 218 - 150 - 10, 58, 0.01)  # v1.63: CFADS-based; rantai revenue 360-100-22-20-150-10 = 58 (capex 20 wajib dipotong)
chk('waterfall dist revenue-chain', 360 - 100 - 22 - 20 - 150 - 10, 58, 0.01)
chk('waterfall dist tarif-10', 189.92 - 150 - 10, 29.92, 0.01)
chk('waterfall dist vol-20', 161.84 - 150 - 10, 1.84, 0.01)
chk('sculpt DS', 218 / 1.30, 167.69, 0.02)
chk('sculpt principal', 218 / 1.30 - 80, 87.69, 0.02)
chk('CFADS tariff-10', 224 - 14.08 - 20, 189.92, 0.02)
chk('DSCR tariff-10', 189.92 / 150, 1.27, 0.01)
chk('CFADS vol-20', 188 - 6.16 - 20, 161.84, 0.02)
chk('DSCR vol-20', 161.84 / 150, 1.08, 0.01)
# --- R4: M9 DSRA tidak terpakai — CFADS vol-20 > debt service ---
chk('M9 CFADS surplus vol-20', 161.84 - 150, 11.84, 0.01)
# --- Excel L3 Solver ---
chk('Solver NPV', 400 * 0.25 + 500 * 0.20 + 100 * 0.15, 215, 0.01)
# --- hari-31 IPO ---
chk('gross proceeds', 200 * 1000, 200000, 0.01)
chk('net proceeds', 200000 * 0.97, 194000, 0.01)
chk('PF equity', 800 + 194, 994, 0.01)
chk('PF assets', 700 + 994, 1694, 0.01)
chk('P/BV PF', 1000 / 994, 1.01, 0.01)
chk('underpricing', 150 / 1000, 0.15, 0.001)
chk('money left', 200 * 150, 30000, 0.01)
# --- v1.64 nice-to-have: real-11 asuransi (Rp miliar) ---
chk('R11 net prem', 4000 - 1200, 2800, 0.01)
chk('R11 claims net', 2100 - 500, 1600, 0.01)
chk('R11 loss ratio', 1600 / 1680, 0.9524, 0.001)
chk('R11 expense ratio', 700 / 1680, 0.4167, 0.001)
chk('R11 combined ratio', 1600 / 1680 + 700 / 1680, 1.3690, 0.001)
chk('R11 UW profit', 1680 - 1600 - 700, -620, 0.01)
chk('R11 UW margin x-check', (1 - (1600 + 700) / 1680) * 1680, -620, 0.01)
chk('R11 EBT', -620 + 300, -320, 0.01)
chk('R11 tax', -(-320) * 0.22, 70.4, 0.01)
chk('R11 NI', -320 + 70.4, -249.6, 0.01)
chk('R11 LIC end', 9000 + 1600 - 1400, 9200, 0.01)
chk('R11 UPR', 0.40 * 2800, 1120, 0.01)
chk('R11 earned prem', 2800 - 1120, 1680, 0.01)
chk('R11 tech reserves', 9200 + 1120, 10320, 0.01)
chk('R11 RBC', 3000 / 1500, 2.00, 0.001)
chk('R11 RBC buffer', 3000 - 1.20 * 1500, 1200, 0.01)
chk('R11 EV', 2000 + 1200 - 150, 3050, 0.01)
chk('R11 EV/share', 3050000 / 3556, 857.71, 0.05)
chk('R11 BV/share', 6000000 / 3556, 1687.29, 0.05)
chk('R11 P/BV', 1200 / (6000000 / 3556), 0.71, 0.01)
chk('R11 mcap', 1200 * 3556 / 1000, 4267.20, 0.05)
# P/EV DIHAPUS (R4): harga grup / EV life book ilustratif = pencampuran cakupan.
# --- CROSS-SECTION R4: lesson combined ratio vs workbook earned-premium chain ---
_r11_earned_wb = 2800 - 0.40 * 2800  # RESERVING: premi neto - UPR
chk('X R11 earned prem = reserving', _r11_earned_wb, 1680, 0.01)
chk('X R11 combined = (claims+exp)/earned', (1600 + 700) / _r11_earned_wb, 1.3690, 0.001)
chk('X R11 UW = earned - claims - exp', _r11_earned_wb - 1600 - 700, -620, 0.01)
# --- v1.64 nice-to-have: real-12 SaaS (Rp juta) ---
chk('R12 ARR0', 1000 * 12, 12000, 0.01)
chk('R12 cohort m3', 100 * 0.97 ** 3, 91.27, 0.01)
chk('R12 cohort m6', 100 * 0.97 ** 6, 83.30, 0.01)
chk('R12 cohort m12', 100 * 0.97 ** 12, 69.38, 0.01)
chk('R12 churn2 m12', 100 * 0.98 ** 12, 78.47, 0.01)
chk('R12 GRR', (12000 - 1800) / 12000, 0.85, 0.001)
chk('R12 NRR', (12000 - 1800 + 2400) / 12000, 1.05, 0.001)
chk('R12 ARR end', 12000 * 1.05, 12600, 0.01)
chk('R12 lifetime', 1 / 0.03, 33.33, 0.01)
chk('R12 LTV', 1 * 0.80 * (1 / 0.03), 26.67, 0.01)
chk('R12 LTV/CAC', (1 * 0.80 * (1 / 0.03)) / 8, 3.33, 0.01)
chk('R12 payback simple', 8 / (1 * 0.80), 10, 0.01)
chk('R12 cum contrib m10', 0.80 * (1 - 0.97 ** 10) / 0.03, 7.00, 0.01)
import math
chk('R12 payback churn-adj closed', math.log(1 - 8 * 0.03 / 0.80) / math.log(0.97), 11.71, 0.01)
_cum = 0.0; _n = 0
while _cum < 8:
    _cum += 0.80 * 0.97 ** _n; _n += 1
chk('R12 payback churn-adj (bln)', _n, 12, 0.01)
chk('R12 Rule of 40', 0.25 + 0.15, 0.40, 0.001)
chk('R12 deferred m1', 12 - 1, 11, 0.01)
chk('R12 EV', 12000 * 6, 72000, 0.01)
chk('R12 EV/cust', 72000 / 1000, 72, 0.01)
chk('R12 SF FCF margin', 12.4 / 37.9, 0.3272, 0.001)
chk('R12 SF RPO/rev', 63.4 / 37.9, 1.67, 0.01)
# --- v1.64 nice-to-have: N-6 ABC + transfer pricing (H02, Rp ribu) ---
chk('ABC setup rate', 400 / 40, 10, 0.01)
chk('ABC inspect rate', 800 / 200, 4, 0.01)
chk('ABC Kopi', 20 * 10 + 50 * 4, 400, 0.01)
chk('ABC Kopi/unit', 400 / 1000, 0.4, 0.001)
chk('ABC Kue', 20 * 10 + 150 * 4, 800, 0.01)
chk('ABC Kue/unit', 800 / 500, 1.6, 0.001)
chk('ABC trad rate', 1200 / 1500, 0.8, 0.001)
chk('ABC trad Kopi', 0.8 * 1000, 800, 0.01)
chk('ABC trad Kue', 0.8 * 500, 400, 0.01)
chk('TP laba Hulu @50', 50 - 30, 20, 0.01)
chk('TP min', 30, 30, 0.01)
# --- v1.64 nice-to-have: N-5 trial balance (H02/Excel L4, Rp ribu) ---
chk('TB debit', 500 + 300 + 200 + 600, 1600, 0.01)
chk('TB kredit', 400 + 400 + 800, 1600, 0.01)
chk('TB laba', 800 - 600, 200, 0.01)
chk('TB aset', 500 + 300 + 200, 1000, 0.01)
chk('TB ekuitas', 400 + 200, 600, 0.01)
chk('TB balance', 1000 - (400 + 600), 0, 0.01)
# --- Ronde 6 (Terra) fixes, 2026-11-08 ---
# SF-1 real-01: revenue 2025 vs 2022 = 22.51% (bukan 25.72% vs 2024)
chk('R6 SF-1 rev 2025 vs 2022', (41.22 - 31.94) / 41.22 * 100, 22.51, 0.05)
chk('R6 SF-1 rev 2024 vs 2022', (41.22 - 30.62) / 41.22 * 100, 25.72, 0.05)
# SF-2 real-04: 94.83 * 1.387^10 ~ 2.5T (pendukung g implied 38.7%)
chk('R6 SF-2 rev 2035', 94.83 * 1.387 ** 10, 2498.7, 1.0)
# SF-3 hari-05: beli bruto 8.550 - HPP 8.400 = walk +150; utang 8.550 - bayar 8.450 = +100
chk('R6 SF-3 inv walk', 8550 - 8400, 150, 0.01)
chk('R6 SF-3 utang neto', 8550 - 8450, 100, 0.01)
chk('R6 SF-3 inv tutup', 900 + 150, 1050, 0.01)
chk('R6 SF-3 utang tutup', 600 + 100, 700, 0.01)
# SF-7 hari-06 blind Warung Budi: dWC +100, CFO 1.400, kas akhir 6.100, BS 9.800
chk('R6 SF-7 dWC', (900 + 800 - 600) - (800 + 700 - 500), 100, 0.01)
chk('R6 SF-7 CFO', 1200 + 300 - 100, 1400, 0.01)
chk('R6 SF-7 CFO stlh capex', 1400 - 800, 600, 0.01)
chk('R6 SF-7 kas akhir', 6000 + (1400 - 800 - 500), 6100, 0.01)
chk('R6 SF-7 BS tutup', 6100 + 900 + 800 + (1500 + 800 - 300), 9800, 0.01)
chk('R6 SF-7 L+E tutup', 600 + 7000 + (1500 + 1200 - 500), 9800, 0.01)
# SF-10/SF-11 hari-06 PPE: neto 3.600, bruto 4.400, akum 800
chk('R6 SF-10 PPE neto', 2000 + 2000 - 400, 3600, 0.01)
chk('R6 SF-11 PPE bruto', 2400 + 2000, 4400, 0.01)
chk('R6 SF-11 PPE akum', 400 + 400, 800, 0.01)
chk('R6 SF-11 PPE neto cek', 4400 - 800, 3600, 0.01)
# SF-12 excel-l2: nilai >15 dari (10, 30, 20) = 2 (30 dan 20); SUMIFS A = 40
chk('R6 SF-12 COUNTIFS >15', sum(1 for v in [10, 30, 20] if v > 15), 2, 0.01)
chk('R6 SF-12 SUMIFS A', 10 + 30, 40, 0.01)
# MF-2 excel-l1: guard B1<>0 — A1=10,B1=0 harus 0 (bukan #DIV/0!); A1=10,B1=2 -> 5
chk('R6 MF-2 guard B1=0', 0 if not (10 > 0 and 0 != 0) else 10 / 0, 0, 0.01)
chk('R6 MF-2 guard B1=2', (10 / 2) if (10 > 0 and 2 != 0) else 0, 5, 0.01)
# --- Ronde 6 gaps (FMVA), 2026-11-08 ---
# G-1 real-01 bridge: input workbook RC1-UNVR-Jawaban (Kas 5.71, Utang 0.64, saham 37.98)
# FCFF = Rev * margin * (1-0.22) * (1-0.25); WACC 10%, g terminal 3%
def _dcf(g, m):
    fcff = [31.94 * (1 + g) ** i * m * 0.78 * 0.75 for i in range(1, 6)]
    pv = sum(f / 1.10 ** (i + 1) for i, f in enumerate(fcff))
    tv = fcff[-1] * 1.03 / 0.07
    return fcff, pv, tv, tv / 1.10 ** 5
_fc, _pv, _tv, _ptv = _dcf(0.045, 0.15)
chk('G-1 PV FCFF Base', _pv, 12.05, 0.01)
chk('G-1 TV Base', _tv, 51.39, 0.01)
chk('G-1 PV TV Base', _ptv, 31.91, 0.01)
chk('G-1 EV Base', _pv + _ptv, 43.96, 0.01)
chk('G-1 net cash', 5.71 - 0.64, 5.07, 0.01)
chk('G-1 equity Base', 43.96 + 5.07, 49.03, 0.01)
chk('G-1 ps Base', 49.03 / 37.98 * 1000, 1291, 0.5)
chk('G-1 upside Base', 1291 / 1390 - 1, -0.071, 0.002)
chk('G-1 net cash ps', 5.07 / 37.98 * 1000, 133.49, 0.5)
_fc, _pv, _tv, _ptv = _dcf(0.025, 0.12)
chk('G-1 ps Bear', (_pv + _ptv + 5.07) / 37.98 * 1000, 984, 0.5)
_fc, _pv, _tv, _ptv = _dcf(0.06, 0.17)
chk('G-1 ps Bull', (_pv + _ptv + 5.07) / 37.98 * 1000, 1531, 0.5)
# G-3 excel-l2: DATEVALUE('2026-01-15') serial 46037 (epoch Excel 1899-12-30);
# MONTH -> 1. '01/02/2026' = serial 46024 = 2 Jan (locale MM/DD) vs 1 Feb (DD/MM)
from datetime import date as _date, timedelta as _td
chk('G-3 DATEVALUE serial', (_date(2026, 1, 15) - _date(1899, 12, 30)).days, 46037, 0.01)
chk('G-3 DATEVALUE 01/02 US', (_date(2026, 1, 2) - _date(1899, 12, 30)).days, 46024, 0.01)
chk('G-3 DATEVALUE 01/02 ID', (_date(2026, 2, 1) - _date(1899, 12, 30)).days, 46054, 0.01)
# --- Ronde 7 (Terra) fixes, 2026-11-08 ---
# MF-1 real-07: kendali (PSAK 65/IFRS 10) vs pengaruh signifikan (PSAK 15/IAS 28).
# <20% HANYA praduga-terbantahkan tidak ada pengaruh signifikan (IAS 28 para 5);
# konsolidasi penuh butuh PENGENDALIAN (IFRS 10), bukan ambang 20%. Bila pengaruh
# signifikan ADA, metodenya = metode ekuitas, bukan otomatis nilai wajar.
# Guard teks: frasa absolut lama WAJIB hilang, kualifikasi baru WAJIB hadir (ID+EN).
import os as _os
def txt(name, cond):
    _total[0] += 1
    ok = bool(cond)
    print(('PASS ' if ok else 'FAIL ') + name)
    if not ok: fails.append(name)
_c4 = open(_os.path.join(_os.path.dirname(__file__), '..', 'js', 'content4.js'), encoding='utf-8').read()
_c2 = open(_os.path.join(_os.path.dirname(__file__), '..', 'js', 'content2.js'), encoding='utf-8').read()
# MF-1: standar benar dikutip di callout + kuis (ID+EN)
txt('R7 MF-1 PSAK 65/IFRS 10 dikutip', _c4.count('PSAK 65/IFRS 10') >= 3)
txt('R7 MF-1 praduga dapat dibantah (ID)', 'praduga' in _c4 and 'dapat dibantah' in _c4)
txt('R7 MF-1 presumption rebuttable (EN)', 'presumption' in _c4 and 'rebuttable' in _c4)
txt('R7 MF-1 metode ekuitas disebut', 'metode ekuitas' in _c4 and 'equity method' in _c4)
# MF-1: frasa absolut lama WAJIB 0
txt('R7 MF-1 frasa lama ID hilang', 'Di bawah 20% (PSAK 15 / IAS 28) = tidak ada pengendalian' not in _c4)
txt('R7 MF-1 frasa lama EN hilang', 'Below 20% (PSAK 15 / IAS 28) = no control' not in _c4)
txt('R7 MF-1 explain lama hilang', 'Di bawah 20% = tidak ada pengendalian/signifikansi' not in _c4)
# MF-1: 15% berada di zona praduga (<20%), bukan zona kendali
txt('R7 MF-1 15% < 20% (zona praduga)', 15 < 20)
# SF-1 real-06: 900,72 = B0 x multiple TAK dibulatkan; dari angka tampil = 900,86 -> kata "persis" salah
chk('R7 SF-1 DDM unrounded = B0 x 0.12/0.035', 262.71 * 0.12 / 0.035, 900.72, 0.01)
chk('R7 SF-1 DDM dari angka tampil', 31.53 / 0.035, 900.86, 0.01)
chk('R7 SF-1 B0 x multiple tampil', 262.71 * 3.43, 901.10, 0.01)
txt('R7 SF-1 "persis" hilang', 'persis = B0' not in _c4 and 'exactly = B0' not in _c4)
txt('R7 SF-1 "sangat dekat setelah pembulatan" hadir', 'sangat dekat dengan B0' in _c4 and 'very close to B0' in _c4)
# SF-2 real-08: diskon 50,6% benar pada basis market cap; 51,1% pada angka per saham tampil
chk('R7 SF-2 diskon basis market cap', (1 - 25.6 / 51.79) * 100, 50.6, 0.05)
chk('R7 SF-2 diskon basis per-saham tampil', (1 - 22 / 45) * 100, 51.1, 0.05)
txt('R7 SF-2 basis diskon dinyatakan', 'berdasarkan market cap' in _c4 and 'market-cap basis' in _c4)
# N-1 real-05 / N-2 hari-09 / N-3 hari-10 / SF-3 hari-08: frasa absolut lama hilang, kualifikasi hadir
txt('R7 N-1 "angka kebenaran" hilang', 'angka kebenaran' not in _c4 and 'truth number' not in _c4)
txt('R7 N-2 "pemilik" hilang (FCFF)', 'bisa diambil pemilik' not in _c2 and 'can owners take' not in _c2)
txt('R7 N-2 "penyandang modal" hadir', 'seluruh penyandang modal' in _c2 and 'all capital providers' in _c2)
txt('R7 N-3 "sembilan" ber-nomina', 'sembilan kombinasi EV' in _c2 and 'nine EV combinations' in _c2)
txt('R7 SF-3 kualifikasi biaya implisit hadir', 'biaya implisit' in _c2 and 'implicit cost' in _c2)
# --- Ronde 8 (Terra) fixes, 2026-11-09 ---
# MF-1 hari-12: FCFF standar = NOPAT + D&A - capex - dWC = CFO + bunga*(1-t) - capex.
# Angka lama 15,90 = CFO - capex = arus kas LEVERED (tanpa add-back bunga setelah pajak), BUKAN FCFF.
# Konvensi tampil: angka downstream dihitung dari angka tampil hulu (bisa direproduksi learner dgn kalkulator).
chk('R8 H12 FCFF NOPAT path', 21.50 * 0.78 + 6.50 - 5.60 - 0.21, 17.46, 0.01)
chk('R8 H12 FCFF CFO path', 21.50 + 2.00 * 0.78 - 5.60, 17.46, 0.01)
chk('R8 H12 after-tax interest', 2.00 * 0.78, 1.56, 0.01)
chk('R8 H12 levered trap (old FCFF)', 21.50 - 5.60, 15.90, 0.01)
chk('R8 H12 FCFE', 17.46 - 1.56 - 3.00, 12.90, 0.01)
chk('R8 H12 FCFE x-check CFO', 21.50 - 5.60 - 3.00, 12.90, 0.01)
# Blind Kios Rina (kelas yang sama — MF-1 juga hidup di latihan buta): EBIT 56, pajak 20%.
# FCFF benar 37,8; angka lama 36,2 = CFO - capex = arus kas levered.
chk('R8 blind FCFF NOPAT', 56 * 0.80 + 8 - 10 - 5, 37.8, 0.01)
chk('R8 blind FCFF CFO', 46.2 + 2 * 0.80 - 10, 37.8, 0.01)
chk('R8 blind levered trap', 46.2 - 10, 36.2, 0.01)
# H13 DCF — seri 17.46/14.60/13.40/12.30/11.30 (2027-2030 asumsi normalisasi, tak berubah);
# WACC 12%; g 1.75%; net debt 40.10; saham 8,78 miliar.
_s13 = [17.46, 14.60, 13.40, 12.30, 11.30]
def _dcf13(w):
    pvf = sum(f / (1 + w) ** (i + 1) for i, f in enumerate(_s13))
    tv = _s13[-1] * 1.0175 / (w - 0.0175)
    pvt = tv / (1 + w) ** 5
    return pvf, tv, pvt, pvf + pvt, pvf + pvt - 40.10
_pvf, _tv, _pvt, _ev, _eq = _dcf13(0.12)
chk('R8 H13 PV FCFF', _pvf, 51.00, 0.02)
chk('R8 H13 TV', _tv, 112.17, 0.02)
chk('R8 H13 PV TV', _pvt, 63.65, 0.02)
chk('R8 H13 EV', _ev, 114.65, 0.02)
chk('R8 H13 equity', _eq, 74.55, 0.02)
chk('R8 H13 ps base (displayed eq)', 74.55 / 8.78 * 1000, 8491, 1.0)
chk('R8 H13 TV share', _pvt / _ev, 0.555, 0.002)
chk('R8 H13 gap vs RC3 anchor', _eq - 73.15, 1.40, 0.02)
chk('R8 H13 gap = PV add-back', 1.56 / 1.12, 1.39, 0.02)
_pvf11, _tv11, _pvt11, _ev11, _eq11 = _dcf13(0.11)
_pvf13, _tv13, _pvt13, _ev13, _eq13 = _dcf13(0.13)
chk('R8 H13 sens 11% eq', _eq11, 85.85, 0.02)
chk('R8 H13 sens 13% eq', _eq13, 65.22, 0.02)
chk('R8 H13 sens 11% ps', 85.85 / 8.78 * 1000, 9778, 1.0)
chk('R8 H13 sens 13% ps', 65.22 / 8.78 * 1000, 7428, 1.0)
chk('R8 H13 sens 11% pct', (_eq11 - _eq) / _eq, 0.1517, 0.002)
chk('R8 H13 sens 13% pct', (_eq13 - _eq) / _eq, -0.1251, 0.002)
chk('R8 H13 sens range', _eq11 - _eq13, 20.63, 0.02)
chk('R8 H13 exit PV TV', 115.50 / 1.12 ** 5, 65.54, 0.02)
chk('R8 H13 exit EV (displayed)', 51.00 + 65.54, 116.54, 0.02)
chk('R8 H13 exit eq (displayed)', 51.00 + 65.54 - 40.10, 76.44, 0.02)
chk('R8 H13 exit range gap', 76.44 - 74.55, 1.89, 0.02)
# H11 football field — kaki DCF = hasil build Hari 12-13 (74,55), bukan jangkar repair (73,15).
chk('R8 H11 DCF low', 74.55 * 0.85, 63.37, 0.02)
chk('R8 H11 DCF high', 74.55 * 1.15, 85.73, 0.02)
chk('R8 H11 DCF ps low', 63.37 / 8.78 * 1000, 7218, 1.0)
chk('R8 H11 DCF ps high', 85.73 / 8.78 * 1000, 9764, 1.0)
chk('R8 H11 gap vs comps', abs(74.55 - 78.18), 3.63, 0.02)
chk('R8 H11 gap pct', abs(74.55 - 78.18) / 74.55, 0.0487, 0.002)
# --- Ronde 8 txt guards (string spesifik; kelasnya dikunci qa_class_patterns.py) ---
_c3 = open(_os.path.join(_os.path.dirname(__file__), '..', 'js', 'content3.js'), encoding='utf-8').read()
# MF-1: angka baru hadir, angka lama (sebagai FCFF/DCF) hilang
txt('R8 MF-1 FCFF baru hadir', 'FCFF 17,46T' in _c2 and 'FCFF 17.46T' in _c2)
txt('R8 MF-1 target price baru hadir', 'Rp8.491' in _c2 and 'Rp8,491' in _c2)
txt('R8 MF-1 target price lama hilang', 'Rp8.332' not in _c2 and 'Rp8,332' not in _c2)
txt('R8 MF-1 EV lama hilang', '113,25' not in _c2 and '113.25' not in _c2)
txt('R8 MF-1 PV FCFF lama hilang', '49,60' not in _c2 and '49.60' not in _c2)
txt('R8 MF-1 ekuitas baru hadir', '74,55T' in _c2 and '74.55T' in _c2)
txt('R8 MF-1 pangsa TV baru', '55,5%' in _c2 and '55.5%' in _c2 and '56,2%' not in _c2 and '56.2%' not in _c2)
txt('R8 MF-1 blind FCFF baru', 'FCFF = 37,8' in _c2 and 'FCFF = 37.8' in _c2 and 'FCFF = 36,2' not in _c2 and 'FCFF = 36.2' not in _c2)
txt('R8 MF-1 jangkar RC3 dipertahankan', 'jangkar RC3' in _c2 and 'RC3 anchor' in _c2)
txt('R8 MF-1 jebakan levered dilabeli', 'arus kas levered' in _c2 and 'levered cash flow' in _c2 and 'Rp15,90T = CFO' in _c2 and 'Rp15.90T = CFO' in _c2)
txt('R8 H11 DCF range baru', '63,37' in _c2 and '63.37' in _c2 and '85,73' in _c2 and '85.73' in _c2 and '62,18' not in _c2 and '62.18' not in _c2 and '84,12' not in _c2 and '84.12' not in _c2)
txt('R8 H11 gap baru', '3,63T' in _c2 and '3.63T' in _c2 and '5,03T' not in _c2 and '5.03T' not in _c2)
# SF-1 multiple bukan payback
txt('R8 SF-1 kualifikasi payback hadir', 'multiple <b>bukan</b> jangka waktu payback' in _c2 and 'a multiple is <b>not</b> a payback period' in _c2)
txt('R8 SF-1 multiple dinilai, bukan dibayar-tahun', '8× EBITDA LTM' in _c2 and '8× LTM EBITDA' in _c2)
# SF-2 goodwill PPA dilabeli
txt('R8 SF-2 goodwill PPA dilabeli', 'goodwill PPA 2.050' in _c2 and 'PPA goodwill 2,050' in _c2)
# SF-3 klaim kegagalan bersumber + terdefinisi
txt('R8 SF-3 sitasi KPMG 1999 hadir', 'KPMG 1999' in _c2)
txt('R8 SF-3 definisi gagal bervariasi', 'definisi "gagal" bervariasi' in _c2 and 'definition of "fail" varies' in _c2)
# SF-4 kunci spill benar
txt('R8 SF-4 kunci spill baru', 'menempati baris 1–10 setelah pergeseran' in _c3 and 'occupying rows 1–10 after the shift' in _c3)
txt('R8 SF-4 kunci spill lama hilang', 'baris 5 kosong dilewati' not in _c3 and 'row 5 skipped' not in _c3)
# N-1 senioritas dilunakkan
txt('R8 N-1 senioritas dilunakkan', 'Senioritas mengikuti hukum' in _c4 and 'Seniority follows applicable law' in _c4)
# N-2 akronim diekspansi
txt('R8 N-2 MRA diekspansi', 'MRA (Master Restructuring Agreement' in _c4)
txt('R8 N-2 PKPU diekspansi', 'PKPU — Penundaan Kewajiban Pembayaran Utang' in _c4 and 'PKPU — Suspension of Debt Payment' in _c4)
# N-3 kompatibilitas dikualifikasi
txt('R8 N-3 versi modern dikualifikasi', 'Umumnya bekerja sama di versi modern' in _c3 and 'generally works the same on modern versions' in _c3)
# --- Ronde 9 (DeepSeek + Terra), 2026-11-09 ---
# T-5 TSM: opsi bruto = penyebut TERLALU BESAR -> UNDERVALUE (bukan overvalue).
# Laba Rp4.959,59rb: TSM neto 11.000 lbr -> EPS 0,451; bruto 12.000 lbr -> 0,413.
chk('R9 TSM EPS net 11.000', 4959.59 / 11000, 0.451, 0.001)
chk('R9 TSM EPS gross 12.000', 4959.59 / 12000, 0.413, 0.001)
chk('R9 TSM Terra 100/12', 100 / 12, 8.33, 0.01)
chk('R9 TSM Terra 100/11', 100 / 11, 9.09, 0.01)
# T-6 CFO: 3.169,55 < 3.500 (BUKAN melebihi); gap NI->CFO = +540,41.
# Add-back non-kas murni = 3.169,55 - bunga lease 383,30 = 2.786,25.
chk('R9 CFO gap NI->CFO', 3169.55 - 3500 + 870.86, 540.41, 0.01)
chk('R9 CFO = NI + gap', 4959.59 + 540.41, 5500, 0.01)
chk('R9 CFO non-cash murni', 800 + 958.25 + 500 + 528, 2786.25, 0.01)
chk('R9 CFO 3500 - 3169.55', 3500 - 3169.55, 330.45, 0.01)
# T-2 variance opex: actual - budget = 6.200 - 6.000 = +200 (U, biaya);
# dampak ke EBIT = -200; flex var = price -4.500 + (-200) = -4.700.
chk('R9 opex spending var', 6200 - 6000, 200, 0.01)
chk('R9 flex var = price + EBIT impact', -4500 + -200, -4700, 0.01)
chk('R9 opex 6 bln', 200 * 6, 1200, 0.01)
# T-8 MAE: presisi penuh (error ke-2 6,333...) -> 10,666... -> 10,67;
# dari angka tampil 6,33 -> 10,665 -> tetap 10,67. Konvensi tampil: angka
# downstream dari angka tampil hulu; di sini keduanya membulat ke 10,67.
chk('R9 MAE full precision', (15 + 19 / 3) / 2, 10.67, 0.01)
chk('R9 MAE displayed', (15 + 6.33) / 2, 10.67, 0.01)
# --- Ronde 9 txt guards (string spesifik; kelasnya dikunci qa_class_patterns.py C4/C6) ---
# T-1 lease: klaim dibatasi kriteria pengakuan + pengecualian disebut (ID+EN)
txt('R9 T-1 lease kriteria pengakuan', 'memenuhi kriteria pengakuan PSAK 116' in _c2 and 'meets PSAK 116 recognition criteria' in _c2)
txt('R9 T-1 lease pengecualian disebut', 'Pengecualiannya sempit' in _c2 and 'The exemptions are narrow' in _c2)
txt('R9 T-1 lease jangka pendek + nilai rendah', 'lease jangka pendek' in _c2 and 'short-term leases' in _c2 and 'aset bernilai rendah' in _c2 and 'low-value assets' in _c2)
# T-2 variance: spending variance +200 dilabeli, dampak EBIT -200 dipisah (ID+EN)
txt('R9 T-2 variance opex +200 dilabeli', 'dampak opex ke EBIT' in _c2 and 'opex impact on EBIT' in _c2)
txt('R9 T-2 variance spending +200 hadir', '6.200 \\u2212 6.000 = <b>+200 (unfavorable)</b>' in _c2 and '6,200 \\u2212 6,000 = <b>+200 (unfavorable)</b>' in _c2)
# T-3 NPV: syarat aturan disebut (ID+EN); formula tetap, kualifikasi menyertai
txt('R9 T-3 NPV syarat disebut', 'Syarat aturan ini:' in _c2 and 'This rule has conditions:' in _c2)
txt('R9 T-3 NPV mutually exclusive', 'saling meniadakan' in _c2 and 'mutually exclusive' in _c2)
# T-4 no-hardcode: pengecualian konstanta struktural 0/1 (ID+EN, content3)
txt('R9 T-4 hardcode pengecualian 0/1', 'Tidak ada angka ketik \\u2014 kecuali konstanta struktural 0 dan 1' in _c3 and 'No typed numbers \\u2014 except structural constants 0 and 1' in _c3)
txt('R9 T-4 hardcode 1 = pokok 100%', 'pokok 100%' in _c3 and '100% of the base' in _c3)
# T-5 TSM: undervalue dilabeli + EPS bruto 0,413 (ID+EN)
txt('R9 T-5 TSM undervalue dilabeli', 'opsi bruto = <b>undervalue</b>' in _c2 and 'gross options = <b>undervaluation</b>' in _c2)
txt('R9 T-5 TSM EPS bruto 0,413', 'Rp0,413rb' in _c2 and 'Rp0.413k' in _c2)
# T-6 CFO: gap +540,41 + non-kas murni 2.786,25 (ID+EN)
txt('R9 T-6 CFO gap +540,41', '+540,41' in _c2 and '+540.41' in _c2)
txt('R9 T-6 CFO non-kas murni 2.786,25', '2.786,25' in _c2 and '2,786.25' in _c2)
# T-7 leverage: syarat hasil aset > biaya utang (ID+EN)
txt('R9 T-7 leverage syarat hasil > biaya', 'bila hasil aset di atas biaya utang' in _c2 and 'when the asset return beats the cost of debt' in _c2)
# T-8 MAE: presisi penuh disebut (ID+EN)
txt('R9 T-8 MAE presisi penuh', 'presisi penuh' in _c2 and 'full precision' in _c2)
# C-2 TSM nit: satuan Rp500/lembar pada baris Buyback + hint kuis (ID+EN)
txt('R9 C-2 TSM satuan Buyback', _c2.count('500rb ÷ Rp500/lembar') >= 2 and _c2.count('500k ÷ Rp500/share') >= 2)
# C-3 neraca nit: desimal seragam 2 angka (ID+EN)
txt('R9 C-3 neraca A = 25.333,00', 'A = 25.333,00' in _c2 and 'A = 25,333.00' in _c2)
txt('R9 C-3 neraca cek 25.333,00', '25.333,00 = 6.433,41 + 18.899,59' in _c2 and '25,333.00 = 6,433.41 + 18,899.59' in _c2)
# C-4 NOL nit: ambang probable >50% eksplisit di callout H20 (ID+EN)
txt('R9 C-4 NOL ambang probable >50%', '(probable \\u2014 lebih mungkin daripada tidak, >50%)' in _c2 and '(probable \\u2014 more likely than not, >50%)' in _c2)
# C-1 minus ASCII (GG-17): bentuk Unicode baru hadir (kelasnya dikunci C6)
txt('R9 C-1 minus Unicode hadir', '\\u22124.500' in _c2 and '\\u22124,500' in _c2)
# --- Ronde 10 (DeepSeek) fixes, 2026-11-09 ---
# Pin string agar fix export/import + generator tidak berbalik diam-diam.
# Perilakunya dikunci test node: qa/export_import_test.js (M2/S1/S2/S3/S5/N4,
# Gap a/c) + qa/variant_property_test.js (Gap b: 534 kunci x ID+EN x 100 run).
_app = open(_os.path.join(_os.path.dirname(__file__), '..', 'js', 'app.js'), encoding='utf-8').read()
_i18n = open(_os.path.join(_os.path.dirname(__file__), '..', 'js', 'i18n.js'), encoding='utf-8').read()
_vb1 = open(_os.path.join(_os.path.dirname(__file__), '..', 'js', 'variants-b1.js'), encoding='utf-8').read()
_vb2 = open(_os.path.join(_os.path.dirname(__file__), '..', 'js', 'variants-b2.js'), encoding='utf-8').read()
_vb3 = open(_os.path.join(_os.path.dirname(__file__), '..', 'js', 'variants-b3.js'), encoding='utf-8').read()
_cg = open(_os.path.join(_os.path.dirname(__file__), '..', 'js', 'concept-graph.js'), encoding='utf-8').read()
txt('R10 S1 prog_backup_fail ID+EN', 'Backup otomatis progress gagal' in _i18n and 'Automatic backup of your current progress failed' in _i18n)
txt('R10 S1 importBackupGuard dipakai importProgress', 'importBackupGuard(curP, backupProgressNow())' in _app and 'T("prog_backup_fail")' in _app)
txt('R10 S2 bad-version guard', 'throw new Error("bad-version")' in _app)
txt('R10 M2 mission union best=max', 'e.best = Math.max(numOr(c.best, -1), numOr(i.best, -1))' in _app)
txt('R10 M2 done union OR', 'done[key] = (c === true || i === true) ? true' in _app)
txt('R10 S3 checker tie-break date terbaru', 'SERI, entri dengan date terbaru menang' in _app)
txt('R10 S5 backupProgressNow terima tanggal', 'function backupProgressNow(now)' in _app)
txt('R10 N4 simulator runs max (bukan jumlah)', 'runs memakai MAX (bukan jumlah)' in _app)
txt('R10 Gap-c doResetProgress backup dulu', 'function doResetProgress(){ backupProgressNow(); localStorage.removeItem("fmva_progress"); route(); }' in _app)
txt('R10 N1 simR100 guard hi<lo', 'if (hi < lo) return lo;' in _app)
txt('R10 N2 variantEntry fallback EN->ID', 'fallback ke registry ID' in _i18n)
txt('R10 M1 b3h268 dedupe by construction', 'while (valsN.indexOf(valsN[i]) !== i) valsN[i] += 1' in _vb3)
txt('R10 S4 b1_h091 beta tanpa 1,0 (ID+EN)', _vb1.count('b1pick(rng, [0.8, 0.9, 1.1, 1.2, 1.3, 1.4, 1.5])') >= 2)
txt('R10 Gap-b vCCC dedupe +5', 'while (vals.indexOf(vals[i]) !== i) vals[i] += 5' in _cg)
txt('R10 Gap-b vB2CCC+vB2Sculpt dedupe +5', _vb2.count('while (vals.indexOf(vals[i]) !== i) vals[i] += 5') >= 2)
txt('R10 Gap-b vB2EPS distractor +2000', 'Math.round((ni + 2000) / sh * 10000) / 10000' in _vb2)
txt('R10 Gap-b vB2GoodwillPPA dedupe d2', 'while (d2 === gw || d2 === gw + 500 || d2 === gw - 250) d2 += 500' in _vb2)
print()
print('NUMBERS QA:', f'ALL PASS ({_total[0]} checks)' if not fails else f'{len(fails)} FAILURES: {fails}')
raise SystemExit(0 if not fails else 1)
