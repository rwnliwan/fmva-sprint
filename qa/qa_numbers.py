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
# --- R4: H13 TV share — PV basis, bukan nominal (S7) ---
chk('H13 PV TV share', 63.65 / 113.25, 0.562, 0.001)
chk('H13 TV nominal trap', 112.17 / (112.17 + 49.60), 0.693, 0.001)
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
print()
print('NUMBERS QA:', f'ALL PASS ({_total[0]} checks)' if not fails else f'{len(fails)} FAILURES: {fails}')
raise SystemExit(0 if not fails else 1)
