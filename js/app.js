/* FMVA Sprint — app engine */
const ALL_LESSONS = [...LESSONS_FONDASI, ...LESSONS_HARI, ...LESSONS_EXCEL, ...LESSONS_REAL];
const $ = s => document.querySelector(s);
const store = {
  get() { try { return JSON.parse(localStorage.getItem("fmva_progress") || "{}"); } catch { return {}; } },
  set(p) { localStorage.setItem("fmva_progress", JSON.stringify(p)); }
};
/* ---------- progress model v1.10: 📖 Opened / 🎯 Quiz / 📊 Sheet ---------- */
// Migrasi satu kali: p.done[id] lama -> {read:true, quiz:lulus} (skor % bila ada)
function getP() {
  const p = store.get();
  if (!p._pg2) {
    p.lesson = p.lesson || {};
    if (p.done) Object.keys(p.done).forEach(id => {
      const e = p.lesson[id] || {};
      e.read = true;
      const s = p.quiz && p.quiz[id];
      e.quiz = (typeof s === "number") ? s : true;
      p.lesson[id] = e;
    });
    if (p.quiz) Object.keys(p.quiz).forEach(id => {
      const e = p.lesson[id] || {};
      if (e.quiz == null) e.quiz = p.quiz[id];
      e.read = true;
      p.lesson[id] = e;
    });
    p._pg2 = true;
    store.set(p);
  }
  return p;
}
function saveP(p) { store.set(p); }
// Status ternormalisasi satu lesson
function lessonState(id) {
  const p = getP();
  const l = ALL_LESSONS.find(x => x.id === id);
  const e = (p.lesson && p.lesson[id]) || {};
  const q = (typeof e.quiz === "number") ? e.quiz : null;
  const quizPass = q != null ? q >= 80 : e.quiz === true;
  return { read: !!e.read, q, quizPass, sheet: !!e.sheet, hasSheet: !!(l && l.driveFolder) };
}
function lessonComplete(id) {
  const s = lessonState(id);
  return s.read && s.quizPass && (!s.hasSheet || s.sheet);
}
function statusBadgesHTML(id) {
  const s = lessonState(id);
  const qTxt = s.q != null ? s.q + "%" + (s.quizPass ? " ✅" : " 🔄") : (s.quizPass ? T("st_quiz_pass") : T("st_not"));
  const shTxt = !s.hasSheet ? "n/a" : (s.sheet ? "✅" : T("st_not"));
  const st = lessonComplete(id) ? `<span class="sbadge done">${T("st_done")}</span>` : `<span class="sbadge">${T("st_progress")}</span>`;
  return `<span class="sbadge ${s.read ? "ok" : ""}">📖 ${s.read ? T("st_read_open") : T("st_read_not")}</span> `
    + `<span class="sbadge ${s.quizPass ? "ok" : ""}">🎯 ${T("st_quiz")}: ${qTxt}</span> `
    + `<span class="sbadge ${(!s.hasSheet || s.sheet) ? "ok" : ""}">📊 ${T("st_sheet")}: ${shTxt}</span> ${st}`;
}
/* Badge faktual hasil checker (bukan auto-tick self-check):
   lolos checker ≠ model benar, jadi badge ini hanya fakta "pernah dijalankan, skor X". */
function checkerBadgeHTML(lid){
  const p = getP();
  const c = p.checker && p.checker[lid];
  const txt = c
    ? `🔍 Checker: <b>${c.score}/100</b> <span style="font-size:.8rem;opacity:.7">(${new Date(c.date).toLocaleDateString(lang()==="en" ? "en-US" : "id-ID")})</span>`
    : T("checker_never");
  return `<div style="margin-top:8px"><span class="sbadge ${c ? "ok" : ""}">${txt}</span>
    <p style="font-size:.82rem;opacity:.75;margin:4px 0 0">${T("checker_note")}</p></div>`;
}
function toggleSheet(id, checked) {
  const p = getP();
  p.lesson[id] = p.lesson[id] || {};
  p.lesson[id].sheet = !!checked;
  saveP(p);
  const b = document.getElementById("pstatusBadges");
  if (b) b.innerHTML = statusBadgesHTML(id);
}
function touchStreak() {
  const p = store.get();
  const today = new Date().toISOString().slice(0, 10);
  if (p.lastVisit !== today) {
    const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    p.streak = (p.lastVisit === y) ? (p.streak || 0) + 1 : 1;
    p.lastVisit = today;
    store.set(p);
  }
}
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

/* ---------- router ---------- */
function route() {
  touchStreak();
  getP(); // migrasi progress satu kali (v1.8)
  const h = location.hash || "#/home";
  const [, page, arg] = h.split("/");
  document.querySelectorAll(".bottomnav button").forEach(b => b.classList.remove("on"));
  if (page === "lesson") { renderLesson(arg); navOn("belajar"); }
  else if (page === "belajar") { renderBelajar(); navOn("belajar"); }
  else if (page === "glossary") { renderGlossary(); navOn("glossary"); }
  else if (page === "funcs") { renderFuncs(); navOn("funcs"); }
  else if (page === "progress") { renderProgress(); navOn("progress"); }
  else if (page === "cheatsheet") { renderCheatsheet(); navOn("belajar"); }
  else { renderHome(); navOn("home"); }
  window.scrollTo(0, 0);
  if (typeof paintLang === "function") paintLang();
}
function navOn(id) { const b = document.querySelector(`.bottomnav button[data-nav="${id}"]`); if (b) b.classList.add("on"); }
function show(html) { $("#view").innerHTML = html; }
window.addEventListener("hashchange", route);

/* ---------- home ---------- */
function lessonCard(l0) {
  const l = L(l0);
  const s = lessonState(l.id);
  const done = lessonComplete(l.id);
  const tagCls = l.track === "Fondasi" ? "t-fondasi" : l.track === "Excel" ? "t-excel" : l.track === "Real Cases" ? "t-case" : "t-hari";
  return `<div class="card">
    <span class="tag ${tagCls}">${trackLbl(l.track)}${done ? " ✓" : ""}</span>
    <h3>${esc(l.title)}</h3>
    <p>${esc(l.sub)}</p>
    <div class="btnrow"><a class="btn small ${done ? "ghost" : ""}" href="#/lesson/${l.id}">${done ? T("card_repeat") : (s.read ? T("card_continue") : T("card_start"))} →</a></div>
  </div>`;
}
function renderHome() {
  const p = getP();
  const total = ALL_LESSONS.length;
  const doneN = ALL_LESSONS.filter(l => lessonComplete(l.id)).length;
  show(`
  <div class="hero">
    <div class="brandhero">
      <svg class="mark" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="25" fill="#FFC900" stroke="#1a1a1a" stroke-width="7"/><text x="32" y="33" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="21" fill="#1a1a1a" text-anchor="middle" dominant-baseline="central">FS</text></svg>
      <h1>FMVA <span class="hl">Sprint</span></h1>
    </div>
    <p>${T("hero_sub")}</p>
    <div class="badges">
      <span class="badge">🔥 Streak ${p.streak || 0} ${Tp("badge_streak","badge_streak_s",p.streak||0)}</span>
      <span class="badge">✅ ${doneN}/${total} ${T("badge_lessons")}</span>
      <span class="badge">🎯 ${T("badge_target")}</span>
    </div>
  </div>
  <div class="kicker"><span>${T("kick_fondasi")}</span></div>
  <div class="grid two">${LESSONS_FONDASI.map(lessonCard).join("")}</div>
  <div class="kicker"><span>${T("kick_hari")}</span></div>
  <div class="grid two">${LESSONS_HARI.map(lessonCard).join("")}</div>
  <div class="kicker"><span>${T("kick_excel")}</span></div>
  <div class="grid two">${LESSONS_EXCEL.map(lessonCard).join("")}</div>
  <div class="kicker"><span>${T("kick_real")}</span></div>
  <div class="grid two">${LESSONS_REAL.map(lessonCard).join("")}</div>
  <div class="callout scope">${T("scope_now")}</div>
  <div class="grid two" style="margin-top:16px">
    <div class="card"><span class="tag t-tool">Tools</span><h3>${T("tools_card_h")}</h3><p>${T("tools_card_p")}</p>
    <div class="btnrow"><a class="btn small ghost" href="#/cheatsheet">Cheatsheet</a></div></div>
  </div>
  <footer class="note">${T("footer")}</footer>`);
}

function renderBelajar() {
  const total = ALL_LESSONS.length;
  const doneN = ALL_LESSONS.filter(l => lessonComplete(l.id)).length;
  const rec = ALL_LESSONS.find(l => !lessonComplete(l.id));
  show(`
  <div class="kicker"><span>${T("belajar_kick")} (${doneN}/${total})</span></div>
  ${rec ? `<div class="callout">${T("belajar_next")} <a href="#/lesson/${rec.id}">${esc(L(rec).title)}</a></div>` : `<div class="callout">${T("belajar_done")}</div>`}
  <div class="kicker"><span>${trackLbl("Fondasi")}</span></div>
  <div class="grid two">${LESSONS_FONDASI.map(lessonCard).join("")}</div>
  <div class="kicker"><span>${trackLbl("30 Hari")}</span></div>
  <div class="grid two">${LESSONS_HARI.map(lessonCard).join("")}</div>
  <div class="kicker"><span>${T("kick_excel")}</span></div>
  <div class="grid two">${LESSONS_EXCEL.map(lessonCard).join("")}</div>
  <div class="kicker"><span>${T("kick_real")}</span></div>
  <div class="grid two">${LESSONS_REAL.map(lessonCard).join("")}</div>`);
}

/* ---------- lesson ---------- */
function renderLesson(id) {
  let l = ALL_LESSONS.find(x => x.id === id);
  if (!l) { location.hash = "#/home"; return; }
  l = L(l); // localized view (EN overlay when lang=en)
  const p = getP();
  p.lesson = p.lesson || {};
  const le = p.lesson[id] || (p.lesson[id] = {});
  if (!le.read) { le.read = true; saveP(p); } // 📖 otomatis: halaman dibuka
  const best = p.quiz && p.quiz[id];
  let html = `
  <div class="lesson-head">
    <span class="tag ${l.track === "Fondasi" ? "t-fondasi" : l.track === "Excel" ? "t-excel" : l.track === "Real Cases" ? "t-case" : "t-hari"}">${trackLbl(l.track)}</span>
    <h2>${esc(l.title)}</h2>
    <div class="sub">${esc(l.sub)} ${best != null ? `· ${T("best_quiz")}: ${best}%` : ""}</div>
    ${l.prerequisites && typeof CONCEPTS !== "undefined" ? `<div class="sub" style="margin-top:4px">🔗 <b>${T("prereq")}:</b> ${l.prerequisites.map(p => esc(cName(CONCEPTS[p] || {name: prettyKey(p)}))).join(" · ")}</div>` : ""}
  </div>
  ${l.audio ? `<div class="audio-row">🎧 ${T("audio_row")} <audio controls preload="none" src="${l.audio}"></audio><span class="audionote">${T("audio_note")}</span></div>` : ""}`;
  l.sections.forEach((s, i) => {
    html += `<div class="sec"><h3><span class="n">${i + 1}</span>${s.h}</h3>${s.body}</div>`;
    if (l.dksim && l.dksimAfter === i) { dkResetState(); html += `<div id="dkwrap">${dksimSectionHTML()}</div>`; }
  });
  if (l.driveFolder) {
    const dayLbl = (l.sub || "").split(" ·")[0] || l.id;
    html += `<div class="sec"><h3>${T("file_latihan")}</h3>
      <p>${T("file_latihan_p")}</p>
      <div class="btnrow"><a class="btn blue" href="${l.driveFolder}" target="_blank" rel="noopener">${T("open_folder")} ${dayLbl} ${T("in_drive")}</a></div></div>`;
  }
  if (l.tasks) {
    html += `<div class="sec"><h3>${T("tasks_h")}</h3><ul class="checklist">` +
      l.tasks.map(t => `<li><b>${esc(t.t)}</b><br><span style="font-weight:400">${esc(t.d)}</span>${t.url ? `<br><a class="btn small blue" style="margin-top:8px" href="${t.url}" target="_blank" rel="noopener">${T("open_drive_folder")}</a>` : ""}</li>`).join("") +
      `</ul></div>`;
  }
  // latihan buta: kasus fresh, angka beda (setelah tugas)
  if (l.blind) html += `<div class="sec"><h3>🙈 ${l.blind.h}</h3>${l.blind.body}</div>`;
  // simulator transaksi (state berantai, reset tiap render lesson)
  if (l.simulator) { simResetState(); html += `<div id="simwrap">${simSectionHTML()}</div>`; }
  // workbook checker (upload xlsx, cek 100% client-side)
  if (l.checker) html += `<div id="wbwrap">${checkerSectionHTML(l.checker)}</div>`;
  // misi perbaikan "fix the broken model" / forensik (setelah checker)
  if (l.mission) {
    const m = (typeof l.mission === "string") ? {file: l.mission} : l.mission;
    html += `<div id="misiwrap">${missionSectionHTML(m.file, m)}</div>`;
  }
  // quiz
  html += `<div class="kicker"><span>${T("quiz_kick")} ${l.quiz.length} ${T("quiz_n")}</span></div><div id="quizbox">`;
  l.quiz.forEach((q, qi) => {
    html += `<div class="quiz-q" id="qq${qi}">
      <div class="qq">${qi + 1}. ${q.q}</div>
      ${q.opts.map((o, oi) => `<button class="opt" data-q="${qi}" data-o="${oi}">${esc(o)}</button>`).join("")}
      <div class="qfb" id="qfb${qi}"></div>
      <div class="hintbox">
        <button class="btn small ghost" onclick="showHint(${qi},0)">${T("hint1")}</button>
        <button class="btn small ghost" onclick="showHint(${qi},1)">${T("hint2")}</button>
        <div class="hint" id="qh${qi}0"></div>
        <div class="hint" id="qh${qi}1"></div>
      </div>
    </div>`;
  });
  html += `</div>
  <div class="sec" id="quizscore" style="display:none"></div>`;
  // hell mode (opsional, terkunci sampai quiz utama >= 80%)
  if (l.hell && l.hell.length) html += `<div class="kicker"><span>${T("hell_kick")}</span></div><div id="hellwrap">` + hellHTML(l, best, p.hellQuiz && p.hellQuiz[l.id]) + `</div>`;
  // status 3 badge (live) + checkbox spreadsheet — menggantikan tombol "Tandai selesai"
  html += `
  <div class="sec" id="pstatus"><h3>${T("lesson_status")}</h3>
    <div class="statusrow" id="pstatusBadges">${statusBadgesHTML(l.id)}</div>
    ${l.driveFolder
      ? `<label class="sheetcheck"><input type="checkbox" id="sheetcheck"${le.sheet ? " checked" : ""} onchange="toggleSheet('${l.id}',this.checked)"> ${T("sheet_check")}</label>
      ${l.checker ? `<div id="checkerBadge">${checkerBadgeHTML(l.id)}</div>` : ""}`
      : `<p style="font-size:.9rem;opacity:.75">${T("no_sheet")}</p>`}
  </div>
  <div class="btnrow">
    <a class="btn ghost" href="#/home">${T("back_home")}</a>
  </div>`;
  show(html);
  // bungkus tabel agar scroll di dalam kartu (anti-jebol di HP)
  document.querySelectorAll("table.brutal").forEach(t => {
    const w = document.createElement("div");
    w.className = "tblwrap";
    t.parentNode.insertBefore(w, t);
    w.appendChild(t);
  });
  // wire quiz
  const state = { answered: 0, correct: 0, total: l.quiz.length, id: l.id };
  window._quiz = state;
  document.querySelectorAll(".opt").forEach(btn => {
    btn.addEventListener("click", () => answerQ(btn, l));
  });
}
function answerQ(btn, l) {
  const qi = +btn.dataset.q, oi = +btn.dataset.o;
  const box = $("#qq" + qi);
  if (box.dataset.done) return;
  box.dataset.done = "1";
  const q = l.quiz[qi];
  const st = window._quiz;
  st.answered++;
  box.querySelectorAll(".opt").forEach(b => {
    b.disabled = true;
    if (+b.dataset.o === q.answer) b.classList.add("correct");
  });
  const fb = $("#qfb" + qi);
  fb.classList.add("show");
  if (oi === q.answer) { st.correct++; fb.classList.add("ok"); fb.innerHTML = T("fb_correct") + q.explain; }
  else { btn.classList.add("wrong"); fb.classList.add("no"); fb.innerHTML = T("fb_wrong") + q.explain; recordMistake(st.id, qi, q.k || st.id); }
  if (st.answered === st.total) {
    const pct = Math.round(st.correct / st.total * 100);
    const p = getP(); p.quiz = p.quiz || {};
    if (p.quiz[st.id] == null || pct > p.quiz[st.id]) p.quiz[st.id] = pct;
    p.lesson = p.lesson || {}; p.lesson[st.id] = p.lesson[st.id] || {};
    p.lesson[st.id].quiz = p.quiz[st.id]; p.lesson[st.id].read = true;
    saveP(p);
    touchStreak();
    // badge status live (tanpa reload)
    const badges = $("#pstatusBadges");
    if (badges) badges.innerHTML = statusBadgesHTML(st.id);
    // buka Hell Mode langsung bila lolos (tanpa reload)
    const hw = $("#hellwrap");
    if (hw && l.hell && l.hell.length) hw.innerHTML = hellHTML(l, p.quiz[st.id], p.hellQuiz && p.hellQuiz[st.id]);
    const sc = $("#quizscore");
    sc.style.display = "block";
    sc.innerHTML = `<h3>${T("score_h")} ${st.correct}/${st.total} (${pct}%)</h3>
      <div class="progressbar"><div style="width:${pct}%"></div></div>
      <p style="margin-top:8px">${pct >= 80 ? T("quiz_pass") : T("quiz_fail")}</p>
      <p>${T("streak_lbl")} ${(getP().streak || 1)} ${Tp("badge_streak","badge_streak_s",getP().streak||1)}</p>
      <div class="btnrow" style="margin-top:10px"><button class="btn blue" onclick="resetQuiz('${st.id}')">${T("quiz_retry")}</button></div>`;
    sc.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
function resetQuiz(id) {
  const l = L(ALL_LESSONS.find(x => x.id === id));
  let h = "";
  l.quiz.forEach((q, qi) => {
    h += `<div class="quiz-q" id="qq${qi}">
      <div class="qq">${qi + 1}. ${q.q}</div>
      ${q.opts.map((o, oi) => `<button class="opt" data-q="${qi}" data-o="${oi}">${esc(o)}</button>`).join("")}
      <div class="qfb" id="qfb${qi}"></div>
      <div class="hintbox">
        <button class="btn small ghost" onclick="showHint(${qi},0)">💡 Hint 1</button>
        <button class="btn small ghost" onclick="showHint(${qi},1)">💡💡 Hint 2</button>
        <div class="hint" id="qh${qi}0"></div>
        <div class="hint" id="qh${qi}1"></div>
      </div>
    </div>`;
  });
  $("#quizbox").innerHTML = h;
  $("#quizscore").style.display = "none";
  window._quiz = { answered: 0, correct: 0, total: l.quiz.length, id };
  document.querySelectorAll("#quizbox .opt").forEach(btn => btn.addEventListener("click", () => answerQ(btn, l)));
  $("#quizbox").scrollIntoView({ behavior: "smooth", block: "start" });
}
function showHint(qi, hi) {
  const l = L(ALL_LESSONS.find(x => x.id === (location.hash.split("/")[2])));
  const el = $("#qh" + qi + hi);
  el.textContent = "💡 " + l.quiz[qi].hints[hi];
  el.classList.add("show");
}
/* ---------- hell mode ---------- */
// Kembalikan ISI #hellwrap saja (kicker ditulis sekali di renderLesson)
function hellHTML(l, best, hellBest) {
  const pass = l.hellPass || 80;
  let h = "";
  if (!(best != null && best >= 80)) {
    h += `<div class="sec"><div class="callout warn">${T("hell_locked")} ${T("hell_unlock")} ${l.hell.length} ${T("hell_hard")} ${pass}%. ${T("hell_retry_anytime")}</div></div>`;
  } else {
    h += `<div class="sec"><p><b>${l.hell.length} ${T("hell_intro")}${pass}%.</b> ${T("hell_retry")}${hellBest != null ? ` ${T("hell_best")} <b>${hellBest}%</b> ${hellBest >= pass ? "👑" : ""}` : ""}</p>
    <div class="btnrow"><button class="btn dark" onclick="startHell('${l.id}')">${T("hell_start")}</button></div>
    <div id="hellbox"></div></div><div class="sec" id="hellscore" style="display:none"></div>`;
  }
  return h;
}
function startHell(id) {
  const l = L(ALL_LESSONS.find(x => x.id === id));
  const box = $("#hellbox"), sb = $("#hellscore");
  sb.style.display = "none"; sb.innerHTML = "";
  let h = "";
  l.hell.forEach((q, qi) => {
    h += `<div class="quiz-q" id="hq${qi}">
      <div class="qq">🔥 ${qi + 1}. ${q.q}</div>
      ${q.opts.map((o, oi) => `<button class="opt" data-hq="${qi}" data-ho="${oi}">${esc(o)}</button>`).join("")}
      <div class="qfb" id="hfb${qi}"></div>
    </div>`;
  });
  box.innerHTML = h;
  window._hell = { answered: 0, correct: 0, total: l.hell.length, id };
  box.querySelectorAll(".opt").forEach(btn => btn.addEventListener("click", () => answerHellQ(btn, l)));
  box.scrollIntoView({ behavior: "smooth", block: "start" });
}
function answerHellQ(btn, l) {
  const qi = +btn.dataset.hq, oi = +btn.dataset.ho;
  const box = $("#hq" + qi);
  if (box.dataset.done) return;
  box.dataset.done = "1";
  const q = l.hell[qi], st = window._hell;
  st.answered++;
  const okH = oi === q.answer;
  box.querySelectorAll(".opt").forEach(b => {
    b.disabled = true;
    if (+b.dataset.ho === q.answer) b.classList.add("correct");
  });
  const fb = $("#hfb" + qi);
  fb.classList.add("show");
  if (okH) { st.correct++; fb.classList.add("ok"); fb.innerHTML = T("hell_correct") + esc(q.explain); }
  else { btn.classList.add("wrong"); fb.classList.add("no"); fb.innerHTML = T("fb_wrong") + esc(q.explain); }
  if (st.answered === st.total) {
    const pass = l.hellPass || 80;
    const pct = Math.round(st.correct / st.total * 100);
    const passed = pct >= pass;
    const p = store.get(); p.hellQuiz = p.hellQuiz || {};
    if (p.hellQuiz[st.id] == null || pct > p.hellQuiz[st.id]) p.hellQuiz[st.id] = pct;
    store.set(p);
    const sb = $("#hellscore");
    sb.style.display = "block";
    sb.innerHTML = `<h3>${passed ? T("hell_pass_h") : T("hell_fail_h")}</h3>
      <p>${T("hell_score")} <b>${pct}%</b> (${st.correct}/${st.total}) · ${T("hell_passmark")} ${pass}%</p>
      ${passed ? `<p>${T("hell_pass_p")}</p>`
        : `<div class="btnrow"><button class="btn dark" onclick="startHell('${st.id}')">${T("hell_retry_btn")}</button></div>`}`;
    sb.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

/* ---------- simulator transaksi ---------- */
/* SIM-PURE-START */
const SIM0 = {kas:8000, persediaan:1500, peralatan:1600, piutang:0, utang:0, modal:10000, lr:1100};
const SIM_TX = [
 {t:"Penjualan kredit", d:"Jual dagangan Rp3.000 secara kredit. HPP barang yang terjual Rp1.200.",
  pred:{laba:"naik",kas:"tetap",aset:"naik"},
  jurnal:[["D","Piutang","3.000"],["K","Pendapatan","3.000"],["D","HPP","1.200"],["K","Persediaan","1.200"]],
  why:"Kenapa? Pendapatan diakui saat transaksi terjadi (akrual), bukan saat kas masuk — laba naik Rp1.800 tapi kas tidak bergerak. HPP menggerus persediaan Rp1.200.",
  fx:{piutang:3000, persediaan:-1200, lr:1800},
  pre:{need:"persediaan", min:1200, hint:"Persediaan tidak cukup menutup HPP Rp1.200 — saldo terlalu kecil untuk menjual barang ini."}},
 {t:"Beli persediaan tunai", d:"Beli persediaan Rp2.000 dibayar tunai.",
  pred:{laba:"tetap",kas:"turun",aset:"tetap"},
  jurnal:[["D","Persediaan","2.000"],["K","Kas","2.000"]],
  why:"Kenapa? Ini pertukaran aset (kas menjadi persediaan), bukan beban — laba tidak tersentuh. Kas turun Rp2.000, total aset tetap.",
  fx:{kas:-2000, persediaan:2000},
  pre:{need:"kas", min:2000, hint:"Kas tidak cukup untuk beli persediaan Rp2.000 — saldo kas terlalu kecil."}},
 {t:"Beli persediaan kredit", d:"Beli persediaan Rp1.500 dari supplier, bayar tempo (utang dagang).",
  pred:{laba:"tetap",kas:"tetap",aset:"naik"},
  jurnal:[["D","Persediaan","1.500"],["K","Utang dagang","1.500"]],
  why:"Kenapa? Aset dan liabilitas naik berpasangan — persamaan A = L + E tetap balance. Belum ada beban, belum ada kas keluar.",
  fx:{persediaan:1500, utang:1500}},
 {t:"Beban depresiasi", d:"Catat beban penyusutan peralatan Rp200 bulan ini.",
  pred:{laba:"turun",kas:"tetap",aset:"turun"},
  jurnal:[["D","Beban depresiasi","200"],["K","Akum. penyusutan","200"]],
  why:"Kenapa? Depresiasi adalah beban non-kas: laba turun Rp200 tapi kas tidak keluar sepeser pun. Peralatan neto ikut menyusut.",
  fx:{peralatan:-200, lr:-200}},
 {t:"Bayar utang dagang", d:"Bayar utang ke supplier Rp1.000 tunai.",
  pred:{laba:"tetap",kas:"turun",aset:"turun"},
  jurnal:[["D","Utang dagang","1.000"],["K","Kas","1.000"]],
  why:"Kenapa? Jebakan klasik: bayar utang mengurangi kas DAN liabilitas — total aset ikut turun Rp1.000. Laba tidak tersentuh karena ini bukan beban.",
  fx:{kas:-1000, utang:-1000},
  pre:{need:"utang", min:1000, hint:"Belum ada utang dagang. Lakukan pembelian kredit (transaksi 3) dulu biar ada utang."}},
 {t:"Terima kas dari piutang", d:"Pelanggan melunasi piutang Rp2.000 secara tunai.",
  pred:{laba:"tetap",kas:"naik",aset:"tetap"},
  jurnal:[["D","Kas","2.000"],["K","Piutang","2.000"]],
  why:"Kenapa? Pendapatan sudah diakui saat penjualan kredit (transaksi 1) — ini hanya pertukaran aset (piutang menjadi kas). Laba tidak naik dua kali!",
  fx:{kas:2000, piutang:-2000},
  pre:{need:"piutang", min:2000, hint:"Belum ada piutang. Lakukan penjualan kredit (transaksi 1) dulu biar ada piutang."}}
];
/* ---------- English simulator texts (EN mode) ---------- */
const SIM_TX_EN = [
 {t:"Credit sale", d:"Sell merchandise for Rp3,000 on credit. COGS of the goods sold: Rp1,200.",
  pred:{laba:"naik",kas:"tetap",aset:"naik"},
  jurnal:[["D","Receivables","3,000"],["K","Revenue","3,000"],["D","COGS","1,200"],["K","Inventory","1,200"]],
  why:"Why? Revenue is recognized when the transaction happens (accrual), not when cash arrives \u2014 profit rises Rp1,800 but cash doesn't move. COGS eats Rp1,200 of inventory.",
  fx:{piutang:3000, persediaan:-1200, lr:1800},
  pre:{need:"persediaan", min:1200, hint:"Not enough inventory to cover Rp1,200 COGS \u2014 the balance is too small to sell these goods."}},
 {t:"Cash inventory purchase", d:"Buy inventory for Rp2,000, paid in cash.",
  pred:{laba:"tetap",kas:"turun",aset:"tetap"},
  jurnal:[["D","Inventory","2,000"],["K","Cash","2,000"]],
  why:"Why? This is an asset swap (cash becomes inventory), not an expense \u2014 profit untouched. Cash falls Rp2,000, total assets unchanged.",
  fx:{kas:-2000, persediaan:2000},
  pre:{need:"kas", min:2000, hint:"Not enough cash to buy Rp2,000 of inventory \u2014 the cash balance is too small."}},
 {t:"Credit inventory purchase", d:"Buy Rp1,500 of inventory from a supplier, on terms (accounts payable).",
  pred:{laba:"tetap",kas:"tetap",aset:"naik"},
  jurnal:[["D","Inventory","1,500"],["K","Accounts payable","1,500"]],
  why:"Why? Assets and liabilities rise together \u2014 the A = L + E equation stays balanced. No expense yet, no cash out.",
  fx:{persediaan:1500, utang:1500}},
 {t:"Depreciation expense", d:"Record this month's equipment depreciation of Rp200.",
  pred:{laba:"turun",kas:"tetap",aset:"turun"},
  jurnal:[["D","Depreciation expense","200"],["K","Acc. depreciation","200"]],
  why:"Why? Depreciation is a non-cash expense: profit falls Rp200 but not a cent of cash leaves. Net equipment shrinks too.",
  fx:{peralatan:-200, lr:-200}},
 {t:"Pay accounts payable", d:"Pay the supplier Rp1,000 in cash.",
  pred:{laba:"tetap",kas:"turun",aset:"turun"},
  jurnal:[["D","Accounts payable","1,000"],["K","Cash","1,000"]],
  why:"Why? The classic trap: paying debt cuts cash AND liabilities \u2014 total assets fall Rp1,000 too. Profit untouched, because this isn't an expense.",
  fx:{kas:-1000, utang:-1000},
  pre:{need:"utang", min:1000, hint:"No accounts payable yet. Do a credit purchase (transaction 3) first so there's a payable."}},
 {t:"Collect receivables", d:"A customer settles Rp2,000 of receivables in cash.",
  pred:{laba:"tetap",kas:"naik",aset:"tetap"},
  jurnal:[["D","Cash","2,000"],["K","Receivables","2,000"]],
  why:"Why? Revenue was already recognized at the credit sale (transaction 1) \u2014 this is just an asset swap (receivables become cash). Profit must not rise twice!",
  fx:{kas:2000, piutang:-2000},
  pre:{need:"piutang", min:2000, hint:"No receivables yet. Do a credit sale (transaction 1) first so there are receivables."}}
];
const DK_TX_EN = [
 {t:"Cash capital injection", d:"Septian injects Rp10,000 cash capital into the shop.",
  acc:[["Cash","D"],["Capital","K"]],
  jur:[["D","Cash","10,000"],["K","Capital","10,000"]],
  why:"Why? Cash (asset, LEFT side of the equation) rises \u2192 debit. Capital (equity, RIGHT side) rises \u2192 credit. Left side rises = debit, right side rises = credit."},
 {t:"Equipment bought on credit", d:"Buy equipment for Rp6,000 from a supplier, on terms (trade payables).",
  acc:[["Equipment","D"],["Trade payables","K"]],
  jur:[["D","Equipment","6,000"],["K","Trade payables","6,000"]],
  why:"Why? Equipment (asset, left) rises \u2192 debit. Trade payables (liability, right) rise \u2192 credit. Total debit 6,000 = total credit 6,000 \u2713"},
 {t:"Cash rent payment", d:"Pay shop rent of Rp2,000 in cash.",
  acc:[["Rent expense","D"],["Cash","K"]],
  jur:[["D","Rent expense","2,000"],["K","Cash","2,000"]],
  why:"Why? Expense reduces equity \u2192 moves OPPOSITE to the right side: rises when debited. Cash (asset) falls \u2192 credit."},
 {t:"Cash service revenue", d:"Receive Rp5,000 cash from a customer.",
  acc:[["Cash","D"],["Service revenue","K"]],
  jur:[["D","Cash","5,000"],["K","Service revenue","5,000"]],
  why:"Why? Cash (asset, left) rises \u2192 debit. Revenue adds to equity (right) \u2192 credit."},
 {t:"Cash salary payment", d:"Pay employee salaries of Rp3,000 in cash.",
  acc:[["Salary expense","D"],["Cash","K"]],
  jur:[["D","Salary expense","3,000"],["K","Cash","3,000"]],
  why:"Why? Same pattern as rent: expense rises \u2192 debit; cash (asset) falls \u2192 credit."},
 {t:"Pay trade payables", d:"Pay the supplier Rp2,000 in cash.",
  acc:[["Trade payables","D"],["Cash","K"]],
  jur:[["D","Trade payables","2,000"],["K","Cash","2,000"]],
  why:"Why? CLASSIC TRAP: payables (liability, right side) FALL \u2192 moves opposite \u2192 debit. Cash falls \u2192 credit. What decides D/K = position in the equation + direction of change, not the account's name."}
];

function simTX(){ return (typeof lang === "function" && lang() === "en" && typeof SIM_TX_EN !== "undefined") ? SIM_TX_EN : SIM_TX; }
function dkTX(){ return (typeof lang === "function" && lang() === "en" && typeof DK_TX_EN !== "undefined") ? DK_TX_EN : DK_TX; }
function simApply(s, tx){ const n = Object.assign({}, s); for (const k in tx.fx) n[k] = (n[k] || 0) + tx.fx[k]; return n; }
function simAssets(s){ return s.kas + s.persediaan + s.peralatan + s.piutang; }
function simLE(s){ return s.utang + s.modal + s.lr; }
/* SIM-PURE-END */

function simPreOK(i){
  const tx = simTX()[i];
  if (!tx.pre) return {ok:true, hint:""};
  const cur = SIMS.s[tx.pre.need] || 0;
  return cur >= tx.pre.min ? {ok:true, hint:""} : {ok:false, hint:tx.pre.hint};
}

let SIMS = null;
const SIM_DIM = [["laba"],["kas"],["aset"]];
const SIM_OPT = ["naik","turun","tetap"];
const SIM_OPT_LBL = {naik:"Naik ↑", turun:"Turun ↓", tetap:"Tetap →"};
const SIM_DIM_LBL = {laba:"Laba", kas:"Kas", aset:"Total aset"};
function simDimLbl(){ return lang()==="en" ? {laba:T("sim_dim_laba"), kas:T("sim_dim_kas"), aset:T("sim_dim_aset")} : SIM_DIM_LBL; }
function simOptLbl(){ return lang()==="en" ? {naik:T("sim_opt_naik"), turun:T("sim_opt_turun"), tetap:T("sim_opt_tetap")} : SIM_OPT_LBL; }

function simResetState(){
  SIMS = {s:Object.assign({}, SIM0), prev:Object.assign({}, SIM0),
    sel:simTX().map(() => ({laba:null, kas:null, aset:null})),
    done:simTX().map(() => false), benar:0, total:0};
}
function simFmt(n){ return Number(n).toLocaleString(lang()==="en" ? "en-US" : "id-ID"); }
function simDelta(d){
  if (!d) return `<span style="opacity:.4">—</span>`;
  return `<span class="delta ${d > 0 ? "dup" : "ddown"}">${d > 0 ? "+" : ""}${simFmt(d)}</span>`;
}
function simBalHTML(){
  const s = SIMS.s, p = SIMS.prev;
  const A = simAssets(s), Ap = simAssets(p), L = simLE(s), Lp = simLE(p);
  const row = (lbl, v, d) => `<tr><td>${lbl}</td><td style="text-align:right"><b>${simFmt(v)}</b></td><td style="text-align:right">${simDelta(d)}</td></tr>`;
  return `<div class="tblwrap"><table class="brutal">
  <tr><th>${T("sim_acc")}</th><th style="text-align:right">${T("sim_bal")}</th><th style="text-align:right">${T("sim_delta")}</th></tr>
  ${row(T("sim_acc_kas"), s.kas, s.kas - p.kas)}${row(T("sim_acc_pers"), s.persediaan, s.persediaan - p.persediaan)}
  ${row(T("sim_acc_peral"), s.peralatan, s.peralatan - p.peralatan)}${row(T("sim_acc_piut"), s.piutang, s.piutang - p.piutang)}
  ${row("<b>"+T("sim_total_a")+"</b>", A, A - Ap)}
  ${row(T("sim_acc_utang"), s.utang, s.utang - p.utang)}${row(T("sim_acc_modal"), s.modal, s.modal - p.modal)}
  ${row(T("sim_acc_lr"), s.lr, s.lr - p.lr)}${row("<b>"+T("sim_total_le")+"</b>", L, L - Lp)}
  </table></div>
  <p style="font-size:.85rem">${T("sim_checkbal")} ${simFmt(A)} ${A === L ? "=" : "≠"} ${simFmt(L)} ${A === L ? "✓" : "✗"}</p>`;
}
function simCardHTML(i){
  const tx = simTX()[i], sel = SIMS.sel[i], done = SIMS.done[i];
  const pre = done ? {ok:true, hint:""} : simPreOK(i);
  const locked = done || !pre.ok;
  const DL = simDimLbl(), OL = simOptLbl();
  const dims = SIM_DIM.map(([k]) => `
    <div class="predrow"><span class="dim">${DL[k]}:</span>
    ${SIM_OPT.map(o => `<button class="predbtn${sel[k] === o ? " on" : ""}"${locked ? " disabled" : ""} onclick="simPick(${i},'${k}','${o}')">${OL[o]}</button>`).join("")}
    </div>`).join("");
  const ready = sel.laba && sel.kas && sel.aset;
  return `<div class="simcard">
    <h4>${i + 1}. ${esc(tx.t)}</h4>
    <p>${esc(tx.d)}</p>
    ${dims}
    ${pre.ok ? "" : `<p class="simhint">⛔ ${esc(pre.hint)}</p>`}
    <div class="btnrow"><button class="btn small blue"${(done || !ready || !pre.ok) ? " disabled" : ""} onclick="simReveal(${i})">${T("sim_reveal")}</button></div>
    <div id="simrevbox${i}">${done ? simRevealHTML(i) : ""}</div>
  </div>`;
}
function simRevealHTML(i){
  const tx = simTX()[i], sel = SIMS.sel[i];
  const DL = simDimLbl(), OL = simOptLbl();
  const rows = ["laba","kas","aset"].map(k => {
    const ok = sel[k] === tx.pred[k];
    return `<div>${ok ? "✅" : "❌"} <b>${DL[k]}</b>: ${T("sim_guess_yours")} <b>${OL[sel[k]]}</b> — ${T("sim_answer")} <b>${OL[tx.pred[k]]}</b></div>`;
  }).join("");
  const jur = tx.jurnal.map(([dk, ak, n]) => `<tr><td>${dk}</td><td>${esc(ak)}</td><td style="text-align:right">${n}</td></tr>`).join("");
  return `<div class="simrev-in">${rows}
    <p style="margin:8px 0 4px"><b>${T("sim_journal")}</b></p>
    <div class="tblwrap"><table class="brutal"><tr><th>D/K</th><th>${T("sim_acc").split(" (")[0]}</th><th style="text-align:right">${T("sim_ribu")}</th></tr>${jur}</table></div>
    <div class="callout">${esc(tx.why)}</div>
  </div>`;
}
function simSectionHTML(){
  return `<div class="sec"><h3>${T("sim_h")}</h3>
  <p>${T("sim_p")}</p>
  <div class="callout" id="simScore">${T("sim_score")} <b>0</b> ${T("sim_of")} <b>0</b> ${T("sim_correct")}</div>
  <div id="simBal">${simBalHTML()}</div>
  <div id="simCards">${simTX().map((tx, i) => simCardHTML(i)).join("")}</div>
  <div class="btnrow"><button class="btn ghost" onclick="simResetUI()">${T("sim_reset")}</button></div></div>`;
}
function simPick(i, k, o){
  if (SIMS.done[i] || !simPreOK(i).ok) return;
  SIMS.sel[i][k] = o;
  $("#simCards").innerHTML = simTX().map((tx, j) => simCardHTML(j)).join("");
}
function simReveal(i){
  const tx = simTX()[i], sel = SIMS.sel[i];
  if (SIMS.done[i] || !simPreOK(i).ok || !(sel.laba && sel.kas && sel.aset)) return;
  SIMS.prev = Object.assign({}, SIMS.s);
  let benar = 0;
  ["laba","kas","aset"].forEach(k => { if (sel[k] === tx.pred[k]) benar++; });
  SIMS.benar += benar; SIMS.total += 3;
  SIMS.s = simApply(SIMS.s, tx);
  SIMS.done[i] = true;
  $("#simScore").innerHTML = `${T("sim_score")} <b>${SIMS.benar}</b> ${T("sim_of")} <b>${SIMS.total}</b> ${T("sim_correct")}`;
  $("#simBal").innerHTML = simBalHTML();
  $("#simCards").innerHTML = simTX().map((t, j) => simCardHTML(j)).join("");
  const box = $("#simrevbox" + i);
  if (box) box.scrollIntoView({behavior:"smooth", block:"nearest"});
}
function simResetUI(){
  simResetState();
  const w = $("#simwrap");
  if (w) w.innerHTML = simSectionHTML();
}

/* ---------- workbook checker (client-side, SheetJS via CDN) ---------- */
const WB_CDN = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
const WB_SRI = "sha384-vtjasyidUo0kW94K5MXDXntzOJpQgBKXmE7e2Ga4LG0skTTLeBi97eFAXsqewJjw";
/* Konfigurasi checker per lesson: label-driven, 100% client-side.
   Checker menilai keberadaan rumus + angka kunci + balance — BUKAN kebenaran tiap rumus. */
const WB_CFG = {
  "hari-01": {
    tpl: "Latihan Hari 01",
    labels: ["Penjualan","HPP","Laba kotor","Beban sewa","Beban gaji","Beban penyusutan",
      "Laba bersih","Kas","Persediaan","Peralatan neto","TOTAL ASET","Utang usaha",
      "TOTAL LIABILITAS","Modal disetor","Laba ditahan","TOTAL EKUITAS","+ Penyusutan",
      "- Kenaikan persediaan","+ Kenaikan utang usaha","Arus kas operasi",
      "Beli peralatan (investasi)","Setoran modal (pendanaan)","Kenaikan kas bersih",
      "Kas awal","KAS AKHIR"],
    // sel yang WAJIB berisi rumus (sel jawaban); sisanya adalah data kasus (angka tetap OK)
    formulaLabels: ["Laba kotor","Laba bersih","TOTAL ASET","TOTAL LIABILITAS",
      "TOTAL EKUITAS","Arus kas operasi","Kenaikan kas bersih","KAS AKHIR"],
    expect: [["Laba bersih",1100,1],["TOTAL ASET",11100,1],["TOTAL EKUITAS",11100,1],["KAS AKHIR",8000,1]],
    balance: true
  },
  "hari-02": {
    tpl: "Latihan Hari 02",
    labels: ["Revenue 2026","COGS 2026","Laba kotor","Beban sewa","Beban gaji",
      "Beban penyusutan","EBIT","Laba bersih","Gross margin","Net margin"],
    formulaLabels: ["Revenue 2026","COGS 2026","Laba kotor","Beban sewa","Beban gaji",
      "Beban penyusutan","EBIT","Laba bersih","Gross margin","Net margin"],
    expect: [["Revenue 2026",16800,1],["COGS 2026",8400,1],["Laba kotor",8400,1],
      ["Beban sewa",2520,1],["Beban gaji",3780,1],["Beban penyusutan",400,1],
      ["EBIT",1700,1],["Laba bersih",1700,1],["Gross margin",0.5,0.0005],
      ["Net margin",1700/16800,0.0005]],
    balance: false
  },
  "hari-03": {
    tpl: "Latihan Hari 03",
    labels: ["Revenue harian","COGS harian","Piutang usaha","Persediaan","Utang usaha",
      "Working capital 2026","Perubahan WC vs 2025","CCC (hari)"],
    formulaLabels: ["Revenue harian","COGS harian","Piutang usaha","Persediaan","Utang usaha",
      "Working capital 2026","Perubahan WC vs 2025","CCC (hari)"],
    expect: [["Revenue harian",46.67,1],["COGS harian",23.33,1],["Piutang usaha",1400,1],
      ["Persediaan",1050,1],["Utang usaha",700,1],["Working capital 2026",1750,1],
      ["Perubahan WC vs 2025",250,1],["CCC (hari)",45,1]],
    balance: false
  },
  "hari-04": {
    tpl: "Latihan Hari 04",
    labels: ["Add-back penyusutan","Kenaikan WC (pengurang kas)","Arus kas operasi (CFO)",
      "Arus kas investasi (CFI)","Arus kas pendanaan (CFF)","Kenaikan kas bersih",
      "Kas akhir 2026","FCFF 2026 (pengantar)"],
    formulaLabels: ["Add-back penyusutan","Kenaikan WC (pengurang kas)","Arus kas operasi (CFO)",
      "Arus kas investasi (CFI)","Arus kas pendanaan (CFF)","Kenaikan kas bersih",
      "Kas akhir 2026","FCFF 2026 (pengantar)"],
    expect: [["Add-back penyusutan",400,0],["Kenaikan WC (pengurang kas)",250,0],
      ["Arus kas operasi (CFO)",1850,1],["Arus kas investasi (CFI)",-2000,0],
      ["Arus kas pendanaan (CFF)",-3000,0],["Kenaikan kas bersih",-3150,1],
      ["Kas akhir 2026",4850,1],["FCFF 2026 (pengantar)",-150,1]],
    balance: false
  },
  "hari-05": {
    tpl: "Latihan Hari 05",
    labels: ["Kas awal 2026 (Rp ribu)","Piutang awal 2026 (Rp ribu)","Persediaan awal 2026 (Rp ribu)",
      "Aset tetap neto awal 2026 (Rp ribu)","Utang usaha awal 2026 (Rp ribu)","Modal disetor (Rp ribu)",
      "Laba ditahan awal 2026 (Rp ribu)","Laba bersih 2026 (Rp ribu)","Penyusutan 2026 (Rp ribu)",
      "Capex / beli peralatan (Rp ribu)","Dividen 2026 (Rp ribu)","Kenaikan piutang 2026 (Rp ribu)",
      "Kenaikan persediaan 2026 (Rp ribu)","Kenaikan utang usaha 2026 (Rp ribu)",
      "Kas akhir 2026","Piutang usaha","Persediaan","Aset tetap neto",
      "TOTAL ASET","Utang usaha","TOTAL LIABILITAS","Laba ditahan",
      "TOTAL EKUITAS","Cek balance (A = L + E)"],
    formulaLabels: ["Kas akhir 2026","Piutang usaha","Persediaan","Aset tetap neto",
      "TOTAL ASET","Utang usaha","TOTAL LIABILITAS","Laba ditahan",
      "TOTAL EKUITAS","Cek balance (A = L + E)"],
    expect: [["Kas akhir 2026",4850,1],["Piutang usaha",1400,0],
      ["Persediaan",1050,0],["Aset tetap neto",3600,1],
      ["TOTAL ASET",10900,1],["Utang usaha",700,0],
      ["Laba ditahan",200,1],["TOTAL EKUITAS",10200,1]],
    balance: true
  },
  "hari-06": {
    tpl: "Latihan Hari 06",
    labels: ["Laba bersih 2026 (Rp ribu)","Penyusutan 2026 (Rp ribu)",
      "Capex / beli peralatan (Rp ribu)","Dividen 2026 (Rp ribu)",
      "Kas awal 2026 (Rp ribu)","Laba ditahan awal 2026 (Rp ribu)",
      "Aset tetap neto awal 2026 (Rp ribu)","Piutang awal 2026 (Rp ribu)",
      "Persediaan awal 2026 (Rp ribu)","Utang usaha awal 2026 (Rp ribu)",
      "Kas di neraca tutup (Rp ribu)","Piutang tutup 2026 (Rp ribu)",
      "Persediaan tutup 2026 (Rp ribu)","PPE neto tutup 2026 (Rp ribu)",
      "Utang tutup 2026 (Rp ribu)","Modal disetor (Rp ribu)",
      "Laba ditahan tutup 2026 (Rp ribu)",
      "Laba ditahan akhir (roll-forward)","Arus kas operasi (CFO)",
      "PPE neto akhir (roll-forward)","Kas akhir arus kas",
      "Tie-out kas (selisih BS \u2212 CF)","TOTAL ASET","TOTAL L+E",
      "\u0394WC (cek vs schedule)"],
    formulaLabels: ["Laba ditahan akhir (roll-forward)","Arus kas operasi (CFO)",
      "PPE neto akhir (roll-forward)","Kas akhir arus kas",
      "Tie-out kas (selisih BS \u2212 CF)","TOTAL ASET","TOTAL L+E",
      "\u0394WC (cek vs schedule)"],
    expect: [["Laba ditahan akhir (roll-forward)",200,1],
      ["Arus kas operasi (CFO)",1850,1],
      ["PPE neto akhir (roll-forward)",3600,1],
      ["Kas akhir arus kas",4850,1],
      ["Tie-out kas (selisih BS \u2212 CF)",0,0.5],
      ["TOTAL ASET",10900,1],["TOTAL L+E",10900,1],
      ["\u0394WC (cek vs schedule)",250,0]],
    balance: false
  },
  "hari-07": {
    tpl: "Latihan Hari 07",
    labels: ["Modal disetor (Rp ribu)","Beli persediaan tunai (Rp ribu)",
      "Beli persediaan kredit (Rp ribu)","Penjualan tunai (Rp ribu)",
      "Penjualan kredit (Rp ribu)","HPP penjualan tunai (Rp ribu)",
      "HPP penjualan kredit (Rp ribu)","Beban sewa (Rp ribu)","Beban gaji (Rp ribu)",
      "Beli peralatan (Rp ribu)","Penyusutan (Rp ribu)","Bayar utang usaha (Rp ribu)",
      "Laba bersih 2027","Kas akhir 2027","Piutang usaha","Persediaan",
      "Aset tetap neto","TOTAL ASET","Utang usaha","TOTAL LIABILITAS",
      "Laba ditahan","TOTAL EKUITAS","Cek balance (A = L + E)"],
    formulaLabels: ["Laba bersih 2027","Kas akhir 2027","Piutang usaha","Persediaan",
      "Aset tetap neto","TOTAL ASET","Utang usaha","TOTAL LIABILITAS",
      "Laba ditahan","TOTAL EKUITAS","Cek balance (A = L + E)"],
    expect: [["Laba bersih 2027",2100,1],["Kas akhir 2027",4300,1],
      ["Piutang usaha",2000,0],["Persediaan",500,0],["Aset tetap neto",800,1],
      ["TOTAL ASET",7600,1],["Utang usaha",500,0],["Laba ditahan",2100,1]],
    balance: true
  },
  "hari-08": {
    tpl: "Latihan Hari 08",
    labels: ["Revenue 2026 (Rp ribu)","Growth revenue 2027","COGS % revenue",
      "Beban sewa 2026 (Rp ribu)","Beban gaji 2026 (Rp ribu)","Kenaikan sewa/gaji",
      "PPE neto awal 2027 (Rp ribu)","Capex 2027 (Rp ribu)","Penyusutan 2027 (Rp ribu)",
      "DSO (hari)","DIO (hari)","DPO (hari)","Piutang 2026 (Rp ribu)",
      "Persediaan 2026 (Rp ribu)","Utang 2026 (Rp ribu)","Kas awal 2027 (Rp ribu)",
      "Laba ditahan awal 2027 (Rp ribu)","Modal disetor (Rp ribu)","Dividen 2027 (Rp ribu)",
      "Revenue 2027","COGS 2027","Beban sewa 2027","Beban gaji 2027","EBIT 2027",
      "Laba bersih 2027","Piutang 2027","Persediaan 2027","Utang usaha 2027",
      "\u0394WC 2027","PPE neto 2027","CFO 2027","Kas akhir 2027","Laba ditahan 2027",
      "TOTAL ASET","TOTAL LIABILITAS","TOTAL EKUITAS","Cek balance (A = L + E)"],
    formulaLabels: ["Revenue 2027","COGS 2027","Beban sewa 2027","Beban gaji 2027",
      "EBIT 2027","Laba bersih 2027","Piutang 2027","Persediaan 2027",
      "Utang usaha 2027","\u0394WC 2027","PPE neto 2027","CFO 2027","Kas akhir 2027",
      "Laba ditahan 2027","TOTAL ASET","TOTAL LIABILITAS","TOTAL EKUITAS",
      "Cek balance (A = L + E)"],
    expect: [["Revenue 2027",18480,1],["EBIT 2027",2075,1],
      ["PPE neto 2027",5550,1],["\u0394WC 2027",175,0],["CFO 2027",2450,1],
      ["Kas akhir 2027",3300,1],["Laba ditahan 2027",775,1],["TOTAL ASET",11545,1]],
    balance: true
  },
  "hari-09": {
    tpl: "Latihan Hari 09",
    labels: ["Rf (asumsi)","Beta (proxy)","MRP (asumsi)",
      "Utang berbunga (Rp ribu)","Laba bersih 2027 (Rp ribu)",
      "Penyusutan 2027 (Rp ribu)","\u0394WC 2027 (Rp ribu)","Capex 2027 (Rp ribu)",
      "FCFF 2026 kanonis (Rp ribu)","Cost of equity (CAPM)","Bobot ekuitas","WACC",
      "FCFF 2027","Faktor diskonto 2027","PV FCFF 2027","Perisai pajak bunga",
      "FCFF 2026 (cek link)"],
    formulaLabels: ["Cost of equity (CAPM)","Bobot ekuitas","WACC",
      "FCFF 2027","Faktor diskonto 2027","PV FCFF 2027","Perisai pajak bunga",
      "FCFF 2026 (cek link)"],
    expect: [["Cost of equity (CAPM)",0.131,0.001],["Bobot ekuitas",1,0],
      ["WACC",0.131,0.001],["FCFF 2027",-50,1],["Faktor diskonto 2027",0.8842,0.001],
      ["PV FCFF 2027",-44.21,0.5],["Perisai pajak bunga",0,0],
      ["FCFF 2026 (cek link)",-150,0]],
    balance: false
  },
  "hari-10": {
    tpl: "Latihan Hari 10",
    labels: ["FCFF 2027 (Rp ribu)","FCFF 2028 (Rp ribu)","WACC","g perpetuitas",
      "EBITDA 2027 (Rp ribu)","Exit multiple","PV FCFF 2027 (Rp ribu, dari Hari 09)",
      "Sens WACC rendah","Sens WACC tinggi","Sens g rendah","Sens g tinggi",
      "TV perpetuitas","PV TV perpetuitas","EV (perpetuitas)","TV exit multiple",
      "PV TV exit","EV (exit multiple)","WACC 11,1%","WACC 13,1%","WACC 15,1%",
      "Sens EV (WACC 11,1% \u00d7 g 4%)","Sens EV (WACC 15,1% \u00d7 g 2%)"],
    formulaLabels: ["TV perpetuitas","PV TV perpetuitas","EV (perpetuitas)",
      "TV exit multiple","PV TV exit","EV (exit multiple)",
      "Sens EV (WACC 11,1% \u00d7 g 4%)","Sens EV (WACC 15,1% \u00d7 g 2%)"],
    expect: [["TV perpetuitas",22584,1],["PV TV perpetuitas",19968,1],
      ["EV (perpetuitas)",19924,1],["TV exit multiple",21000,0],
      ["PV TV exit",18568,1],["EV (exit multiple)",18523,1],
      ["Sens EV (WACC 11,1% \u00d7 g 4%)",28872,1],
      ["Sens EV (WACC 15,1% \u00d7 g 2%)",15085,1]],
    balance: false
  },
"hari-11": {
    tpl: "Latihan Hari 11",
    labels: ["EV UNVR (Rp T)","EBITDA UNVR (Rp T)","Kap. pasar UNVR (Rp T)","Laba bersih UNVR (Rp T)",
      "EV INDF (Rp T)","EBITDA INDF (Rp T)","Kap. pasar INDF (Rp T)","Laba bersih INDF (Rp T)",
      "EV ICBP (Rp T)","EBITDA ICBP (Rp T)","Kap. pasar ICBP (Rp T)","Laba bersih ICBP (Rp T)",
      "EV KLBF (Rp T)","EBITDA KLBF (Rp T)","Kap. pasar KLBF (Rp T)","Laba bersih KLBF (Rp T)",
      "EV MYOR (Rp T)","EBITDA MYOR (Rp T)","Kap. pasar MYOR (Rp T)","Laba bersih MYOR (Rp T)",
      "Utang bersih INDF (Rp T)","Ekuitas DCF INDF (Rp T)",
      "EV/EBITDA UNVR","EV/EBITDA INDF","EV/EBITDA ICBP","EV/EBITDA KLBF","EV/EBITDA MYOR",
      "P/E UNVR","P/E INDF","P/E ICBP","P/E KLBF","P/E MYOR",
      "Median EV/EBITDA","Median P/E","INDF implied EV (Rp T)",
      "INDF implied ekuitas EV/EBITDA (Rp T)","INDF implied ekuitas P/E (Rp T)",
      "Precedent EV (Rp T)","Precedent ekuitas (Rp T)",
      "DCF low (Rp T)","DCF high (Rp T)","Football low (Rp T)","Football high (Rp T)",
      "Selisih DCF-vs-comps (Rp T)"],
    formulaLabels: ["Median EV/EBITDA","Median P/E","INDF implied EV (Rp T)",
      "INDF implied ekuitas P/E (Rp T)","Football low (Rp T)","Football high (Rp T)",
      "Precedent EV (Rp T)","Selisih DCF-vs-comps (Rp T)"],
    expect: [["Median EV/EBITDA",8.1818,0.01],["Median P/E",13.75,0.01],
      ["INDF implied EV (Rp T)",98.18,0.1],["INDF implied ekuitas P/E (Rp T)",89.38,0.1],
      ["Football low (Rp T)",62.18,0.1],["Football high (Rp T)",102.73,0.1],
      ["Precedent EV (Rp T)",122.73,0.1],["Selisih DCF-vs-comps (Rp T)",5.03,0.1]],
    balance: false
  },
"hari-12": {
    tpl: "Latihan Hari 12",
    labels: ["Revenue 2026 (Rp triliun)","COGS % revenue","Beban SG&A 2026 (Rp triliun)","Beban bunga 2026 (Rp triliun)","Tarif pajak","Penyusutan 2026 (Rp triliun)","Capex 2026 (Rp triliun)","Dividen 2026 (Rp triliun)","Bayar utang bank 2026 (Rp triliun)","Kas awal 2026 (Rp triliun)","Piutang awal 2026 (Rp triliun)","Persediaan awal 2026 (Rp triliun)","PPE neto awal 2026 (Rp triliun)","Utang usaha awal 2026 (Rp triliun)","Utang bank awal 2026 (Rp triliun)","Modal disetor (Rp triliun)","Laba ditahan awal 2026 (Rp triliun)","Piutang akhir 2026 (Rp triliun)","Persediaan akhir 2026 (Rp triliun)","Utang usaha akhir 2026 (Rp triliun)","Laba kotor 2026","EBIT 2026","Laba bersih 2026","ΔWC 2026","Arus kas operasi (CFO)","Kas akhir 2026","FCFF 2026","PPE neto 2026","Laba ditahan 2026","Utang bank 2026","TOTAL ASET","TOTAL LIABILITAS","TOTAL EKUITAS","Cek balance (A = L + E)"],
    formulaLabels: ["Laba bersih 2026","Arus kas operasi (CFO)","Kas akhir 2026","TOTAL ASET","Laba ditahan 2026","ΔWC 2026","FCFF 2026","Cek balance (A = L + E)"],
    expect: [["Laba bersih 2026",15.21,0.02],["Arus kas operasi (CFO)",21.5,0.02],["Kas akhir 2026",26.9,0.02],["TOTAL ASET",150.8,0.05],["Laba ditahan 2026",60.43,0.02],["ΔWC 2026",0.21,0.01],["FCFF 2026",15.9,0.02]],
    balance: true
  },
"hari-13": {
    tpl: "Latihan Hari 13",
    labels: ["FCFF 2026 (Rp triliun)","FCFF 2027 (Rp triliun)","FCFF 2028 (Rp triliun)","FCFF 2029 (Rp triliun)","FCFF 2030 (Rp triliun)","WACC","g perpetuitas","EBITDA 2030 (Rp triliun)","Exit multiple","Utang bank 2026 (Rp triliun)","Kas akhir 2026 (Rp triliun)","Saham beredar (miliar)","WACC sens rendah","WACC sens tinggi","PV FCFF 2026–2030","TV perpetuitas (akhir 2030)","PV TV","EV (perpetuitas)","Net debt","Ekuitas","Nilai per saham ilustrasi (Rp)","Sens ekuitas (WACC 13%)","Sens ekuitas (WACC 11%)","TV exit multiple","PV TV exit","EV (exit multiple)","Ekuitas (exit)"],
    formulaLabels: ["TV perpetuitas (akhir 2030)","PV TV","EV (perpetuitas)","Net debt","Ekuitas","Nilai per saham ilustrasi (Rp)","Sens ekuitas (WACC 13%)","Sens ekuitas (WACC 11%)"],
    expect: [["TV perpetuitas (akhir 2030)",112.17,0.1],["PV TV",63.65,0.1],["EV (perpetuitas)",113.25,0.1],["Net debt",40.1,0.05],["Ekuitas",73.15,0.05],["Nilai per saham ilustrasi (Rp)",8332,5],["Sens ekuitas (WACC 13%)",63.84,0.1],["Sens ekuitas (WACC 11%)",84.45,0.1]],
    balance: false
  },
"hari-14": {
    tpl: "Latihan Hari 14",
    labels: ["Modal disetor (Rp ribu)","Beli persediaan tunai (Rp ribu)",
      "Beli persediaan kredit (Rp ribu)","Penjualan tunai (Rp ribu)",
      "Penjualan kredit (Rp ribu)","HPP penjualan tunai (Rp ribu)",
      "HPP penjualan kredit (Rp ribu)","Beban sewa (Rp ribu)","Beban gaji (Rp ribu)",
      "Beli peralatan / capex (Rp ribu)","Penyusutan (Rp ribu)","Bayar utang usaha (Rp ribu)",
      "Dividen tunai (Rp ribu)","WC awal (Rp ribu, perusahaan baru)",
      "WACC (diberikan)","g perpetuitas (diberikan)","Exit multiple (diberikan)",
      "FCFF normal steady state (Rp ribu, diberikan)",
      "Laba bersih","Kas akhir","Piutang usaha","Persediaan","PPE neto",
      "TOTAL ASET","Utang usaha","TOTAL LIABILITAS","Laba ditahan","TOTAL EKUITAS",
      "Cek balance (A = L + E)","ΔWC","CFO (tidak langsung)","FCFF",
      "TV perpetuitas","PV TV perpetuitas","PV FCFF tahun berjalan","EV (perpetuitas)",
      "EBITDA","TV exit multiple","PV TV exit","EV (exit multiple)"],
    formulaLabels: ["Laba bersih","Kas akhir","Piutang usaha","Persediaan","PPE neto",
      "TOTAL ASET","Utang usaha","TOTAL LIABILITAS","Laba ditahan","TOTAL EKUITAS",
      "Cek balance (A = L + E)","ΔWC","CFO (tidak langsung)","FCFF",
      "TV perpetuitas","PV TV perpetuitas","PV FCFF tahun berjalan","EV (perpetuitas)",
      "EBITDA","TV exit multiple","PV TV exit","EV (exit multiple)"],
    expect: [["Laba bersih",7200,1],["Kas akhir",17000,1],
      ["CFO (tidak langsung)",2000,1],["FCFF",-2000,1],
      ["TV perpetuitas",40000,1],["EV (perpetuitas)",33929,1],
      ["TV exit multiple",48000,1],["TOTAL ASET",28200,1]],
    balance: true
  },
  "excel-l1": {
    tpl: "Latihan Excel L1",
    labels: ["Total qty","Total penjualan (Rp ribu)","Rata-rata harga",
      "Transaksi qty>15","Total setelah diskon","Bonus laris (Rp ribu)","Harga Kopi (XLOOKUP)"],
    formulaLabels: ["Total qty","Total penjualan (Rp ribu)","Rata-rata harga",
      "Transaksi qty>15","Total setelah diskon","Bonus laris (Rp ribu)","Harga Kopi (XLOOKUP)"],
    expect: [["Total qty",113,0],["Total penjualan (Rp ribu)",858,0],["Rata-rata harga",8,0],
      ["Transaksi qty>15",3,0],["Total setelah diskon",772.2,0.01],
      ["Bonus laris (Rp ribu)",50,0],["Harga Kopi (XLOOKUP)",8,0]],
    balance: false
  },
  "excel-l2": {
    tpl: "Latihan Excel L2",
    labels: ["Omzet Jakarta-Kopi-Feb (SUMIFS)","Transaksi Jan qty>100 (COUNTIFS)",
      "Total qty Jakarta (SUMIFS)","Omzet Mie Bandung (SUMIFS)",
      "Omzet pertama Bandung (INDEX+MATCH)","Panjang kode baris-1 (LEN)",
      "Omzet maks Bandung (MAXIFS)","Rata-rata qty Teh (AVERAGEIFS)"],
    formulaLabels: ["Omzet Jakarta-Kopi-Feb (SUMIFS)","Transaksi Jan qty>100 (COUNTIFS)",
      "Total qty Jakarta (SUMIFS)","Omzet Mie Bandung (SUMIFS)",
      "Omzet pertama Bandung (INDEX+MATCH)","Panjang kode baris-1 (LEN)",
      "Omzet maks Bandung (MAXIFS)","Rata-rata qty Teh (AVERAGEIFS)"],
    expect: [["Omzet Jakarta-Kopi-Feb (SUMIFS)",1200,0],["Transaksi Jan qty>100 (COUNTIFS)",2,0],
      ["Total qty Jakarta (SUMIFS)",870,0],["Omzet Mie Bandung (SUMIFS)",1560,0],
      ["Omzet pertama Bandung (INDEX+MATCH)",640,0],["Panjang kode baris-1 (LEN)",11,0],
      ["Omzet maks Bandung (MAXIFS)",880,0],["Rata-rata qty Teh (AVERAGEIFS)",162.5,0.01]],
    balance: false
  },
  "excel-l3": {
    tpl: "Latihan Excel L3",
    labels: ["Jumlah kategori unik (ROWS+UNIQUE)","Produk omzet>1000: jumlah (ROWS+FILTER)",
      "Omzet tertinggi (LARGE)","Awal SEQUENCE(10)",
      "Omzet Kopi Susu (SUMPRODUCT 2 kriteria)","Total + pajak 10% (LET)","Omzet Minuman (SUM+FILTER)"],
    formulaLabels: ["Jumlah kategori unik (ROWS+UNIQUE)","Produk omzet>1000: jumlah (ROWS+FILTER)",
      "Omzet tertinggi (LARGE)","Awal SEQUENCE(10)",
      "Omzet Kopi Susu (SUMPRODUCT 2 kriteria)","Total + pajak 10% (LET)","Omzet Minuman (SUM+FILTER)"],
    expect: [["Jumlah kategori unik (ROWS+UNIQUE)",2,0],["Produk omzet>1000: jumlah (ROWS+FILTER)",5,0],
      ["Omzet tertinggi (LARGE)",1800,0],["Awal SEQUENCE(10)",1,0],
      ["Omzet Kopi Susu (SUMPRODUCT 2 kriteria)",1080,0],["Total + pajak 10% (LET)",12298,1],
      ["Omzet Minuman (SUM+FILTER)",4310,0]],
    balance: false
  },
  "excel-l4": {
    tpl: "Latihan Excel L4",
    labels: ["Revenue 2026 (link input!)","COGS 2026 (link input!)","Laba kotor",
      "Laba bersih","Net margin aman (IFERROR)","Revenue per hari (IFERROR)","Input valid? (IF+AND)"],
    formulaLabels: ["Revenue 2026 (link input!)","COGS 2026 (link input!)","Laba kotor",
      "Laba bersih","Net margin aman (IFERROR)","Revenue per hari (IFERROR)","Input valid? (IF+AND)"],
    expect: [["Revenue 2026 (link input!)",18480,0],["COGS 2026 (link input!)",9240,0],
      ["Laba kotor",9240,0],["Laba bersih",2540,0],
      ["Net margin aman (IFERROR)",2540/18480,0.0005],["Revenue per hari (IFERROR)",18480/360,0.01],
      ["Input valid? (IF+AND)",1,0]],
    balance: false
  },
"hari-15": {
    tpl: "Latihan Hari 15",
    labels: ["EV base (Rp ribu)","Data table EV (WACC 10%, g 2%)",
      "Data table EV (WACC 10%, g 4%)","Data table EV (WACC 14%, g 2%)",
      "Data table EV (WACC 14%, g 4%)","Scenario EV Bear (Rp ribu)",
      "Scenario EV Base (Rp ribu)","Scenario EV Bull (Rp ribu)",
      "Tornado \u0394EV: WACC rendah (Rp ribu)","Tornado driver #1 = WACC? (1=ya)"],
    formulaLabels: ["EV base (Rp ribu)","Data table EV (WACC 10%, g 2%)",
      "Data table EV (WACC 10%, g 4%)","Data table EV (WACC 14%, g 2%)",
      "Data table EV (WACC 14%, g 4%)","Scenario EV Bear (Rp ribu)",
      "Scenario EV Base (Rp ribu)","Scenario EV Bull (Rp ribu)",
      "Tornado \u0394EV: WACC rendah (Rp ribu)","Tornado driver #1 = WACC? (1=ya)"],
    expect: [["EV base (Rp ribu)",33928.57,1],
      ["Data table EV (WACC 10%, g 2%)",39090.91,1],
      ["Data table EV (WACC 10%, g 4%)",52727.27,1],
      ["Data table EV (WACC 14%, g 2%)",24561.40,1],
      ["Data table EV (WACC 14%, g 4%)",29824.56,1],
      ["Scenario EV Bear (Rp ribu)",23974.26,1],
      ["Scenario EV Base (Rp ribu)",33928.57,1],
      ["Scenario EV Bull (Rp ribu)",46246.25,1],
      ["Tornado \u0394EV: WACC rendah (Rp ribu)",5921.47,1],
      ["Tornado driver #1 = WACC? (1=ya)",1,0]],
    balance: false
  },
"hari-16": {
    tpl: "Latihan Hari 16",
    labels: ["NI acquirer (Rp ribu)","Saham acquirer (lembar)","Harga saham acquirer (Rp ribu)",
      "NI target (Rp ribu)","Saham target (lembar)","Harga saham target (Rp ribu)",
      "Book equity target (Rp ribu)","Deal A: harga deal (Rp ribu)","Deal A: porsi saham (equity %)",
      "Tarif bunga utang","Tarif pajak","Fee deal %","Deal B: harga deal (Rp ribu)",
      "EPS acquirer","Market cap acquirer (Rp ribu)","P/E acquirer",
      "EPS target","Market cap target (Rp ribu)","P/E target","Premi Deal A",
      "Fee deal (Rp ribu)","Total uses (Rp ribu)","Nilai saham diterbitkan (Rp ribu)",
      "Saham baru diterbitkan (A)","Utang baru \u2014 plug (Rp ribu)","Total sources (Rp ribu)",
      "Cek sources=uses (A)",
      "Goodwill (A)","Beban bunga (Rp ribu)","Bunga after-tax (Rp ribu)",
      "Pro forma NI (A)","Pro forma shares (A)","Pro forma EPS (A)","Accretion % (A)",
      "Saham baru (B)","Pro forma NI (B)","Pro forma shares (B)","Pro forma EPS (B)","Dilution % (B)"],
    formulaLabels: ["EPS acquirer","Market cap acquirer (Rp ribu)","P/E acquirer",
      "EPS target","Market cap target (Rp ribu)","P/E target","Premi Deal A",
      "Fee deal (Rp ribu)","Total uses (Rp ribu)","Nilai saham diterbitkan (Rp ribu)",
      "Saham baru diterbitkan (A)","Utang baru \u2014 plug (Rp ribu)","Total sources (Rp ribu)",
      "Cek sources=uses (A)",
      "Goodwill (A)","Beban bunga (Rp ribu)","Bunga after-tax (Rp ribu)",
      "Pro forma NI (A)","Pro forma shares (A)","Pro forma EPS (A)","Accretion % (A)",
      "Saham baru (B)","Pro forma NI (B)","Pro forma shares (B)","Pro forma EPS (B)","Dilution % (B)"],
    expect: [["Goodwill (A)",4000,1],["Pro forma NI (A)",8708,1],["Pro forma shares (A)",20500,1],
      ["Pro forma EPS (A)",0.4248,0.0005],["Accretion % (A)",0.0619,0.001],
      ["Pro forma EPS (B)",0.3649,0.0005],["Dilution % (B)",-0.0878,0.001]],
    balance: false
  },
"hari-17": {
    tpl: "Latihan Hari 17",
    labels: [
      "EV (Rp ribu)", "EBITDA T0 (Rp ribu)", "Growth EBITDA (%)",
      "Term loan awal (Rp ribu)", "Tarif bunga (%)", "Equity sponsor (Rp ribu)",
      "Fee transaksi (% dari EV)", "D&A per tahun (Rp ribu)", "Capex per tahun (Rp ribu)",
      "Tarif pajak (%)", "Exit multiple (diberikan)", "Fee transaksi (Rp ribu)",
      "TOTAL USES (Rp ribu)", "TOTAL SOURCES (Rp ribu)", "Cek balance (Sources = Uses)",
      "EBITDA Y1", "EBIT Y1", "Utang awal Y1",
      "Bunga Y1", "EBT Y1", "Pajak Y1",
      "NI Y1", "Kas ke utang Y1", "Utang akhir Y1",
      "EBITDA Y2", "EBIT Y2", "Utang awal Y2",
      "Bunga Y2", "EBT Y2", "Pajak Y2",
      "NI Y2", "Kas ke utang Y2", "Utang akhir Y2",
      "EBITDA Y3", "EBIT Y3", "Utang awal Y3",
      "Bunga Y3", "EBT Y3", "Pajak Y3",
      "NI Y3", "Kas ke utang Y3", "Utang akhir Y3",
      "EBITDA Y4", "EBIT Y4", "Utang awal Y4",
      "Bunga Y4", "EBT Y4", "Pajak Y4",
      "NI Y4", "Kas ke utang Y4", "Utang akhir Y4",
      "EBITDA Y5", "EBIT Y5", "Utang awal Y5",
      "Bunga Y5", "EBT Y5", "Pajak Y5",
      "NI Y5", "Kas ke utang Y5", "Utang akhir Y5",
      "EV exit (Rp ribu)", "Equity exit (Rp ribu)", "MoIC (x)"],
    formulaLabels: [
      "Fee transaksi (Rp ribu)", "TOTAL USES (Rp ribu)", "TOTAL SOURCES (Rp ribu)",
      "Cek balance (Sources = Uses)", "EBITDA Y1", "EBIT Y1",
      "Utang awal Y1", "Bunga Y1", "EBT Y1",
      "Pajak Y1", "NI Y1", "Kas ke utang Y1",
      "Utang akhir Y1", "EBITDA Y2", "EBIT Y2",
      "Utang awal Y2", "Bunga Y2", "EBT Y2",
      "Pajak Y2", "NI Y2", "Kas ke utang Y2",
      "Utang akhir Y2", "EBITDA Y3", "EBIT Y3",
      "Utang awal Y3", "Bunga Y3", "EBT Y3",
      "Pajak Y3", "NI Y3", "Kas ke utang Y3",
      "Utang akhir Y3", "EBITDA Y4", "EBIT Y4",
      "Utang awal Y4", "Bunga Y4", "EBT Y4",
      "Pajak Y4", "NI Y4", "Kas ke utang Y4",
      "Utang akhir Y4", "EBITDA Y5", "EBIT Y5",
      "Utang awal Y5", "Bunga Y5", "EBT Y5",
      "Pajak Y5", "NI Y5", "Kas ke utang Y5",
      "Utang akhir Y5", "EV exit (Rp ribu)", "Equity exit (Rp ribu)",
      "MoIC (x)"],
    expect: [
      ["TOTAL USES (Rp ribu)",51000,1], ["Utang akhir Y1",21055.6,1],
      ["Utang akhir Y3",8229.7,1], ["Utang akhir Y5",0,1],
      ["Equity exit (Rp ribu)",73466.4,1], ["MoIC (x)",2.94,0.01],
      ["EV exit (Rp ribu)",73466.4,1], ["Bunga Y1",1820,1],
      ["NI Y1",5444.4,1], ["Kas ke utang Y1",4944.4,1]],
    balance: false
  },
"hari-18": {
    tpl: "Latihan Hari 18",
    labels: ["Budget revenue tahunan (Rp ribu)",
      "COGS (% revenue)",
      "Opex tetap per bulan (Rp ribu)",
      "Faktor musiman - Jan",
      "Faktor musiman - Feb",
      "Faktor musiman - Mar",
      "Faktor musiman - Apr",
      "Faktor musiman - Mei",
      "Faktor musiman - Jun",
      "Faktor musiman - Jul",
      "Faktor musiman - Agu",
      "Faktor musiman - Sep",
      "Faktor musiman - Okt",
      "Faktor musiman - Nov",
      "Faktor musiman - Des",
      "Actual revenue - Jan",
      "Actual revenue - Feb",
      "Actual revenue - Mar",
      "Actual revenue - Apr",
      "Actual revenue - Mei",
      "Actual revenue - Jun",
      "Actual COGS - Jan",
      "Actual COGS - Feb",
      "Actual COGS - Mar",
      "Actual COGS - Apr",
      "Actual COGS - Mei",
      "Actual COGS - Jun",
      "Actual opex - Jan",
      "Actual opex - Feb",
      "Actual opex - Mar",
      "Actual opex - Apr",
      "Actual opex - Mei",
      "Actual opex - Jun",
      "Harga budget Jun (Rp ribu/unit)",
      "Qty budget Jun (unit)",
      "Harga actual Jun (Rp ribu/unit)",
      "Qty actual Jun (unit)",
      "Biaya per unit (Rp ribu/unit)",
      "Budget revenue - Jan",
      "Budget COGS - Jan",
      "Budget opex - Jan",
      "Budget EBIT - Jan",
      "Budget revenue - Feb",
      "Budget COGS - Feb",
      "Budget opex - Feb",
      "Budget EBIT - Feb",
      "Budget revenue - Mar",
      "Budget COGS - Mar",
      "Budget opex - Mar",
      "Budget EBIT - Mar",
      "Budget revenue - Apr",
      "Budget COGS - Apr",
      "Budget opex - Apr",
      "Budget EBIT - Apr",
      "Budget revenue - Mei",
      "Budget COGS - Mei",
      "Budget opex - Mei",
      "Budget EBIT - Mei",
      "Budget revenue - Jun",
      "Budget COGS - Jun",
      "Budget opex - Jun",
      "Budget EBIT - Jun",
      "Budget revenue - Jul",
      "Budget COGS - Jul",
      "Budget opex - Jul",
      "Budget EBIT - Jul",
      "Budget revenue - Agu",
      "Budget COGS - Agu",
      "Budget opex - Agu",
      "Budget EBIT - Agu",
      "Budget revenue - Sep",
      "Budget COGS - Sep",
      "Budget opex - Sep",
      "Budget EBIT - Sep",
      "Budget revenue - Okt",
      "Budget COGS - Okt",
      "Budget opex - Okt",
      "Budget EBIT - Okt",
      "Budget revenue - Nov",
      "Budget COGS - Nov",
      "Budget opex - Nov",
      "Budget EBIT - Nov",
      "Budget revenue - Des",
      "Budget COGS - Des",
      "Budget opex - Des",
      "Budget EBIT - Des",
      "Budget revenue tahunan",
      "Budget EBIT tahunan",
      "Cek faktor musiman = 1,00",
      "Actual EBIT - Jan",
      "Actual EBIT - Feb",
      "Actual EBIT - Mar",
      "Actual EBIT - Apr",
      "Actual EBIT - Mei",
      "Actual EBIT - Jun",
      "Actual revenue 6 bulan",
      "Variance revenue - Jan",
      "Variance COGS - Jan",
      "Variance opex - Jan",
      "Variance EBIT - Jan",
      "Variance revenue - Feb",
      "Variance COGS - Feb",
      "Variance opex - Feb",
      "Variance EBIT - Feb",
      "Variance revenue - Mar",
      "Variance COGS - Mar",
      "Variance opex - Mar",
      "Variance EBIT - Mar",
      "Variance revenue - Apr",
      "Variance COGS - Apr",
      "Variance opex - Apr",
      "Variance EBIT - Apr",
      "Variance revenue - Mei",
      "Variance COGS - Mei",
      "Variance opex - Mei",
      "Variance EBIT - Mei",
      "Variance revenue - Jun",
      "Variance COGS - Jun",
      "Variance opex - Jun",
      "Variance EBIT - Jun",
      "Total variance revenue 6 bulan",
      "Total variance COGS 6 bulan",
      "Total variance opex 6 bulan",
      "Total variance EBIT 6 bulan",
      "Flex revenue - Jun",
      "Flex COGS - Jun",
      "Flex EBIT - Jun",
      "Sales volume variance - Jun",
      "Flexible budget variance - Jun",
      "Price variance - Jun",
      "Volume variance - Jun",
      "Cek: price + volume = variance revenue Jun"],
    formulaLabels: ["Budget revenue - Jan",
      "Budget COGS - Jan",
      "Budget opex - Jan",
      "Budget EBIT - Jan",
      "Budget revenue - Feb",
      "Budget COGS - Feb",
      "Budget opex - Feb",
      "Budget EBIT - Feb",
      "Budget revenue - Mar",
      "Budget COGS - Mar",
      "Budget opex - Mar",
      "Budget EBIT - Mar",
      "Budget revenue - Apr",
      "Budget COGS - Apr",
      "Budget opex - Apr",
      "Budget EBIT - Apr",
      "Budget revenue - Mei",
      "Budget COGS - Mei",
      "Budget opex - Mei",
      "Budget EBIT - Mei",
      "Budget revenue - Jun",
      "Budget COGS - Jun",
      "Budget opex - Jun",
      "Budget EBIT - Jun",
      "Budget revenue - Jul",
      "Budget COGS - Jul",
      "Budget opex - Jul",
      "Budget EBIT - Jul",
      "Budget revenue - Agu",
      "Budget COGS - Agu",
      "Budget opex - Agu",
      "Budget EBIT - Agu",
      "Budget revenue - Sep",
      "Budget COGS - Sep",
      "Budget opex - Sep",
      "Budget EBIT - Sep",
      "Budget revenue - Okt",
      "Budget COGS - Okt",
      "Budget opex - Okt",
      "Budget EBIT - Okt",
      "Budget revenue - Nov",
      "Budget COGS - Nov",
      "Budget opex - Nov",
      "Budget EBIT - Nov",
      "Budget revenue - Des",
      "Budget COGS - Des",
      "Budget opex - Des",
      "Budget EBIT - Des",
      "Budget revenue tahunan",
      "Budget EBIT tahunan",
      "Cek faktor musiman = 1,00",
      "Actual EBIT - Jan",
      "Actual EBIT - Feb",
      "Actual EBIT - Mar",
      "Actual EBIT - Apr",
      "Actual EBIT - Mei",
      "Actual EBIT - Jun",
      "Actual revenue 6 bulan",
      "Variance revenue - Jan",
      "Variance COGS - Jan",
      "Variance opex - Jan",
      "Variance EBIT - Jan",
      "Variance revenue - Feb",
      "Variance COGS - Feb",
      "Variance opex - Feb",
      "Variance EBIT - Feb",
      "Variance revenue - Mar",
      "Variance COGS - Mar",
      "Variance opex - Mar",
      "Variance EBIT - Mar",
      "Variance revenue - Apr",
      "Variance COGS - Apr",
      "Variance opex - Apr",
      "Variance EBIT - Apr",
      "Variance revenue - Mei",
      "Variance COGS - Mei",
      "Variance opex - Mei",
      "Variance EBIT - Mei",
      "Variance revenue - Jun",
      "Variance COGS - Jun",
      "Variance opex - Jun",
      "Variance EBIT - Jun",
      "Total variance revenue 6 bulan",
      "Total variance COGS 6 bulan",
      "Total variance opex 6 bulan",
      "Total variance EBIT 6 bulan",
      "Flex revenue - Jun",
      "Flex COGS - Jun",
      "Flex EBIT - Jun",
      "Sales volume variance - Jun",
      "Flexible budget variance - Jun",
      "Price variance - Jun",
      "Volume variance - Jun",
      "Cek: price + volume = variance revenue Jun"],
    expect: [["Budget revenue tahunan",240000,1],["Budget EBIT tahunan",48000,1],["Actual revenue 6 bulan",116500,1],["Total variance revenue 6 bulan",-1100,1],["Price variance - Jun",-4500,1],["Volume variance - Jun",6000,1],["Flex EBIT - Jun",9000,1]],
    balance: false
  },
"hari-19": {
    tpl: "Latihan Hari 19",
    labels: ["Harga Kopi Susu (INDEX+MATCH)","Omzet Minuman Bandung (SUMIFS)",
      "Transaksi Jakarta qty>10 (COUNTIFS)","Qty Es Teh pertama (XLOOKUP)",
      "Qty maks Mie Goreng (MAXIFS)","Rata-rata harga Minuman (AVERAGEIFS)",
      "Omzet Minuman qty>10 (SUMPRODUCT)","Omzet tertinggi ke-2 (LARGE)",
      "Jumlah produk unik (ROWS+UNIQUE)","Rata-rata omzet Seafood (IFERROR)"],
    formulaLabels: ["Harga Kopi Susu (INDEX+MATCH)","Omzet Minuman Bandung (SUMIFS)",
      "Transaksi Jakarta qty>10 (COUNTIFS)","Qty Es Teh pertama (XLOOKUP)",
      "Qty maks Mie Goreng (MAXIFS)","Rata-rata harga Minuman (AVERAGEIFS)",
      "Omzet Minuman qty>10 (SUMPRODUCT)","Omzet tertinggi ke-2 (LARGE)",
      "Jumlah produk unik (ROWS+UNIQUE)","Rata-rata omzet Seafood (IFERROR)"],
    expect: [["Harga Kopi Susu (INDEX+MATCH)",25,0],
      ["Omzet Minuman Bandung (SUMIFS)",440,0],
      ["Transaksi Jakarta qty>10 (COUNTIFS)",6,0],
      ["Qty Es Teh pertama (XLOOKUP)",30,0],
      ["Qty maks Mie Goreng (MAXIFS)",20,0],
      ["Rata-rata harga Minuman (AVERAGEIFS)",14.3333,0.01],
      ["Omzet Minuman qty>10 (SUMPRODUCT)",885,0],
      ["Omzet tertinggi ke-2 (LARGE)",280,0],
      ["Jumlah produk unik (ROWS+UNIQUE)",6,0],
      ["Rata-rata omzet Seafood (IFERROR)",0,0]],
    balance: false
  },
"hari-20": {
    tpl: "Latihan Hari 20",
    labels: [
      "Revenue (Rp ribu)", "COGS (Rp ribu)", "Beban gaji (Rp ribu)", "Beban operasi lain (Rp ribu)",
      "Penyusutan buku / D&A (Rp ribu)", "Tarif pajak", "D&A pajak (Rp ribu)", "Rugi fiskal tahun lalu / NOL (Rp ribu)",
      "Pembayaran lease per tahun (Rp ribu)", "Tenor lease (tahun)", "Discount rate lease", "Beban stock comp (Rp ribu)",
      "Saham dasar (lembar)", "Saham baru stock comp (lembar)", "Modal disetor (Rp ribu)", "Kas awal (Rp ribu)",
      "PPE neto awal (Rp ribu)", "Piutang akhir (Rp ribu)", "Persediaan akhir (Rp ribu)", "Utang usaha akhir (Rp ribu)",
      "Dividen tunai (Rp ribu)", "Laba ditahan awal (Rp ribu)", "DTA awal \u2014 NOL (Rp ribu)", "WC awal (Rp ribu, disederhanakan nol)",
      "Faktor anuitas PV", "Liabilitas lease (PV pembayaran)", "Aset ROU awal", "Depresiasi ROU Y1",
      "Beban bunga lease Y1", "Pelunasan pokok lease Y1", "Liabilitas lease akhir Y1", "Aset ROU neto Y1",
      "Beda temporer (D&A pajak \u2212 buku)", "DTL", "Beban stock comp (non-kas)", "APIC dari stock comp",
      "Saham dilusian (lembar)", "NOL tersedia (Rp ribu)", "Manfaat NOL (\u00d7 tarif)", "DTA akhir",
      "Revenue", "COGS", "Laba kotor", "Beban gaji",
      "Beban operasi lain", "Depresiasi ROU", "Penyusutan", "Beban stock comp",
      "EBIT", "Beban bunga lease", "EBT", "Laba fiskal (EBT \u2212 beda temporer)",
      "Pajak kini (setelah NOL)", "Pajak tangguhan (DTL + reversal DTA)", "Beban pajak total", "Laba bersih",
      "Kas akhir", "Piutang usaha", "Persediaan", "Aset ROU neto",
      "PPE neto", "DTA (NOL)", "TOTAL ASET", "Liabilitas lease",
      "Utang usaha", "Utang pajak kini", "DTL (BS)", "TOTAL LIABILITAS",
      "Modal disetor", "APIC stock comp", "Laba ditahan", "TOTAL EKUITAS",
      "Cek balance (A = L + E)", "Laba bersih (untuk CFO)", "(+) Penyusutan", "(+) Depresiasi ROU",
      "(+) Stock comp (non-kas)", "(+) Pajak tangguhan (non-kas)", "(+) Beban bunga lease (kas di CFF)", "\u0394WC",
      "(+) Kenaikan utang pajak", "CFO (operasi)", "CFF: pembayaran lease (pokok+bunga)", "CFF: dividen",
      "CFF", "\u0394kas", "Kas akhir (tie-out)"
    ],
    formulaLabels: [
      "Faktor anuitas PV", "Liabilitas lease (PV pembayaran)", "Aset ROU awal", "Depresiasi ROU Y1",
      "Beban bunga lease Y1", "Pelunasan pokok lease Y1", "Liabilitas lease akhir Y1", "Aset ROU neto Y1",
      "Beda temporer (D&A pajak \u2212 buku)", "DTL", "Beban stock comp (non-kas)", "APIC dari stock comp",
      "Saham dilusian (lembar)", "NOL tersedia (Rp ribu)", "Manfaat NOL (\u00d7 tarif)", "DTA akhir",
      "Revenue", "COGS", "Laba kotor", "Beban gaji",
      "Beban operasi lain", "Depresiasi ROU", "Penyusutan", "Beban stock comp",
      "EBIT", "Beban bunga lease", "EBT", "Laba fiskal (EBT \u2212 beda temporer)",
      "Pajak kini (setelah NOL)", "Pajak tangguhan (DTL + reversal DTA)", "Beban pajak total", "Laba bersih",
      "Kas akhir", "Piutang usaha", "Persediaan", "Aset ROU neto",
      "PPE neto", "DTA (NOL)", "TOTAL ASET", "Liabilitas lease",
      "Utang usaha", "Utang pajak kini", "DTL (BS)", "TOTAL LIABILITAS",
      "Modal disetor", "APIC stock comp", "Laba ditahan", "TOTAL EKUITAS",
      "Cek balance (A = L + E)", "Laba bersih (untuk CFO)", "(+) Penyusutan", "(+) Depresiasi ROU",
      "(+) Stock comp (non-kas)", "(+) Pajak tangguhan (non-kas)", "(+) Beban bunga lease (kas di CFF)", "\u0394WC",
      "(+) Kenaikan utang pajak", "CFO (operasi)", "CFF: pembayaran lease (pokok+bunga)", "CFF: dividen",
      "CFF", "\u0394kas", "Kas akhir (tie-out)"
    ],
    expect: [
      ["Liabilitas lease (PV pembayaran)",4791.25,1],
      ["Beban bunga lease Y1",383.30,0.05],
      ["DTL",88,0.05],
      ["Pajak kini (setelah NOL)",870.86,0.5],
      ["Laba bersih",4959.59,0.5],
      ["CFO (operasi)",5500,1],
      ["Saham dilusian (lembar)",11000,1],
      ["TOTAL ASET",25333,1],
      ["Beban pajak total",1398.86,0.5]],
    balance: true
  },
"hari-21": {
    tpl: "Latihan Hari 21",
    labels: ["EV (Rp ribu)","EBITDA T0 (Rp ribu)","Exit multiple (diberikan)",
      "Term Loan (Rp ribu)","Bunga pinjaman (diberikan)","Equity (Rp ribu)",
      "Fee transaksi (Rp ribu)","EBITDA growth /thn (diberikan)","D&A /thn (Rp ribu)",
      "Capex /thn (Rp ribu)","Delta WC /thn (Rp ribu)","Tarif pajak (diberikan)",
      "Uses total","Sources total","Cek sources = uses",
      "EBITDA Y1","EBIT Y1","Bunga Y1","EBT Y1","Pajak Y1","NI Y1",
      "Kas ke utang Y1","Utang awal Y1","Utang akhir Y1",
      "EBITDA Y2","EBIT Y2","Bunga Y2","EBT Y2","Pajak Y2","NI Y2",
      "Kas ke utang Y2","Utang awal Y2","Utang akhir Y2",
      "EBITDA Y3","EBIT Y3","Bunga Y3","EBT Y3","Pajak Y3","NI Y3",
      "Kas ke utang Y3","Utang awal Y3","Utang akhir Y3",
      "EBITDA Y4","EBIT Y4","Bunga Y4","EBT Y4","Pajak Y4","NI Y4",
      "Kas ke utang Y4","Utang awal Y4","Utang akhir Y4",
      "EBITDA Y5","EBIT Y5","Bunga Y5","EBT Y5","Pajak Y5","NI Y5",
      "Kas ke utang Y5","Utang awal Y5","Utang akhir Y5",
      "EV exit (Y5)","Equity exit","MoIC"],
    formulaLabels: ["Uses total","Sources total","Cek sources = uses",
      "EBITDA Y1","EBIT Y1","Bunga Y1","EBT Y1","Pajak Y1","NI Y1",
      "Kas ke utang Y1","Utang awal Y1","Utang akhir Y1",
      "EBITDA Y2","EBIT Y2","Bunga Y2","EBT Y2","Pajak Y2","NI Y2",
      "Kas ke utang Y2","Utang awal Y2","Utang akhir Y2",
      "EBITDA Y3","EBIT Y3","Bunga Y3","EBT Y3","Pajak Y3","NI Y3",
      "Kas ke utang Y3","Utang awal Y3","Utang akhir Y3",
      "EBITDA Y4","EBIT Y4","Bunga Y4","EBT Y4","Pajak Y4","NI Y4",
      "Kas ke utang Y4","Utang awal Y4","Utang akhir Y4",
      "EBITDA Y5","EBIT Y5","Bunga Y5","EBT Y5","Pajak Y5","NI Y5",
      "Kas ke utang Y5","Utang awal Y5","Utang akhir Y5",
      "EV exit (Y5)","Equity exit","MoIC"],
    expect: [["Uses total",40800,1],["Utang akhir Y1",16741.68,1],
      ["Utang akhir Y3",5782.87,1],["Utang akhir Y5",0,1],
      ["Bunga Y1",1456,1],["NI Y1",4558.32,1],["Kas ke utang Y1",4058.32,1],
      ["EV exit (Y5)",64420.40,1],["Equity exit",64420.40,1],["MoIC",3.2210,0.005]],
    balance: false
  },
  "hari-22": {
    tpl: "Latihan Hari 22",
    labels: ["TV perpetuitas (Rp ribu)","PV FCFF berjalan (Rp ribu)","PV TV perpetuitas (Rp ribu)",
      "EV base (Rp ribu)","PV TV exit (Rp ribu)","EV metode exit (Rp ribu)",
      "Rentang valuasi (Rp ribu)","EV midpoint (Rp ribu)",
      "Sensitivitas (WACC 10%, g 2%)","Sensitivitas (WACC 10%, g 3%)","Sensitivitas (WACC 10%, g 4%)",
      "Sensitivitas (WACC 12%, g 2%)","Sensitivitas (WACC 12%, g 3%)","Sensitivitas (WACC 12%, g 4%)",
      "Sensitivitas (WACC 14%, g 2%)","Sensitivitas (WACC 14%, g 3%)","Sensitivitas (WACC 14%, g 4%)"],
    formulaLabels: ["TV perpetuitas (Rp ribu)","PV FCFF berjalan (Rp ribu)","PV TV perpetuitas (Rp ribu)",
      "EV base (Rp ribu)","PV TV exit (Rp ribu)","EV metode exit (Rp ribu)",
      "Rentang valuasi (Rp ribu)","EV midpoint (Rp ribu)",
      "Sensitivitas (WACC 10%, g 2%)","Sensitivitas (WACC 10%, g 3%)","Sensitivitas (WACC 10%, g 4%)",
      "Sensitivitas (WACC 12%, g 2%)","Sensitivitas (WACC 12%, g 3%)","Sensitivitas (WACC 12%, g 4%)",
      "Sensitivitas (WACC 14%, g 2%)","Sensitivitas (WACC 14%, g 3%)","Sensitivitas (WACC 14%, g 4%)",
      "EV base","EV exit"],
    expect: [["EV base (Rp ribu)",33928.57,1],["EV metode exit (Rp ribu)",41071.43,1],
      ["TV perpetuitas (Rp ribu)",40000,1],["Rentang valuasi (Rp ribu)",7142.86,1],
      ["EV midpoint (Rp ribu)",37500,1],
      ["Sensitivitas (WACC 10%, g 2%)",39090.91,1],
      ["Sensitivitas (WACC 10%, g 3%)",44935.06,1],
      ["Sensitivitas (WACC 10%, g 4%)",52727.27,1],
      ["Sensitivitas (WACC 12%, g 2%)",30357.14,1],
      ["Sensitivitas (WACC 12%, g 3%)",33928.57,1],
      ["Sensitivitas (WACC 12%, g 4%)",38392.86,1],
      ["Sensitivitas (WACC 14%, g 2%)",24561.40,1],
      ["Sensitivitas (WACC 14%, g 3%)",26953.75,1],
      ["Sensitivitas (WACC 14%, g 4%)",29824.56,1]],
    balance: false
  },
  "hari-26": {
    tpl: "Latihan Hari 26",
    labels: ["Kredit T1 (Rp miliar)","Kredit T2 (Rp miliar)","Kredit T3 (Rp miliar)",
      "Aset lain T1 (Rp miliar)","Aset lain T2 (Rp miliar)","Aset lain T3 (Rp miliar)",
      "NII T1 (Rp miliar)","Fee income T1 (Rp miliar)","Provisi T1 (Rp miliar)",
      "Opex T1 (Rp miliar)","EBT T1 (Rp miliar)","Pajak T1 (Rp miliar)",
      "NI T1 (Rp miliar)","Dividen T1 (Rp miliar)",
      "NII T2 (Rp miliar)","Fee income T2 (Rp miliar)","Provisi T2 (Rp miliar)",
      "Opex T2 (Rp miliar)","EBT T2 (Rp miliar)","Pajak T2 (Rp miliar)",
      "NI T2 (Rp miliar)","Dividen T2 (Rp miliar)",
      "NII T3 (Rp miliar)","Fee income T3 (Rp miliar)","Provisi T3 (Rp miliar)",
      "Opex T3 (Rp miliar)","EBT T3 (Rp miliar)","Pajak T3 (Rp miliar)",
      "NI T3 (Rp miliar)","Dividen T3 (Rp miliar)",
      "Ekuitas T1 (Rp miliar)","Ekuitas T2 (Rp miliar)","Ekuitas T3 (Rp miliar)",
      "Total aset T3 (Rp miliar)","Liabilitas T3 (Rp miliar)","DPK T3 (Rp miliar)",
      "Cek liabilitas > DPK (1=ya)",
      "CAR T1","CAR T2","CAR T3",
      "BV per saham T3 (Rp)","Harga wajar (Rp/lembar)"],
    formulaLabels: ["Kredit T1 (Rp miliar)","Kredit T2 (Rp miliar)","Kredit T3 (Rp miliar)",
      "Aset lain T1 (Rp miliar)","Aset lain T2 (Rp miliar)","Aset lain T3 (Rp miliar)",
      "NII T1 (Rp miliar)","Fee income T1 (Rp miliar)","Provisi T1 (Rp miliar)",
      "Opex T1 (Rp miliar)","EBT T1 (Rp miliar)","Pajak T1 (Rp miliar)",
      "NI T1 (Rp miliar)","Dividen T1 (Rp miliar)",
      "NII T2 (Rp miliar)","Fee income T2 (Rp miliar)","Provisi T2 (Rp miliar)",
      "Opex T2 (Rp miliar)","EBT T2 (Rp miliar)","Pajak T2 (Rp miliar)",
      "NI T2 (Rp miliar)","Dividen T2 (Rp miliar)",
      "NII T3 (Rp miliar)","Fee income T3 (Rp miliar)","Provisi T3 (Rp miliar)",
      "Opex T3 (Rp miliar)","EBT T3 (Rp miliar)","Pajak T3 (Rp miliar)",
      "NI T3 (Rp miliar)","Dividen T3 (Rp miliar)",
      "Ekuitas T1 (Rp miliar)","Ekuitas T2 (Rp miliar)","Ekuitas T3 (Rp miliar)",
      "Total aset T3 (Rp miliar)","Liabilitas T3 (Rp miliar)","DPK T3 (Rp miliar)",
      "Cek liabilitas > DPK (1=ya)",
      "CAR T1","CAR T2","CAR T3",
      "BV per saham T3 (Rp)","Harga wajar (Rp/lembar)"],
    expect: [["Kredit T3 (Rp miliar)",11239.42,1],
      ["NII T2 (Rp miliar)",522.37,0.5],["EBT T3 (Rp miliar)",212.55,0.5],
      ["NI T1 (Rp miliar)",132.16,0.5],["Dividen T2 (Rp miliar)",44.41,0.5],
      ["Ekuitas T3 (Rp miliar)",1812.18,1],["CAR T3",0.1789,0.005],
      ["Harga wajar (Rp/lembar)",253.71,1],["Cek liabilitas > DPK (1=ya)",1,0]],
    balance: false
  },
  "real-01": {
    tpl: "Latihan RC1 UNVR",
    labels: ["FCFF 2026 (Base)","PV FCFF 2026-30 (Base)","Terminal value (Base)",
      "PV terminal (Base)","EV (Base)","Equity value (Base)","Nilai/saham Base (Rp)",
      "Upside vs pasar (Base)","Nilai/saham Bear (Rp)","Nilai/saham Bull (Rp)"],
    formulaLabels: ["FCFF 2026 (Base)","PV FCFF 2026-30 (Base)","Terminal value (Base)",
      "PV terminal (Base)","EV (Base)","Equity value (Base)","Nilai/saham Base (Rp)",
      "Upside vs pasar (Base)","Nilai/saham Bear (Rp)","Nilai/saham Bull (Rp)"],
    expect: [["FCFF 2026 (Base)",2.93,0.02],["PV FCFF 2026-30 (Base)",12.05,0.05],
      ["Terminal value (Base)",51.39,0.1],["PV terminal (Base)",31.91,0.05],
      ["EV (Base)",43.96,0.05],["Equity value (Base)",49.03,0.05],
      ["Nilai/saham Base (Rp)",1291,2],["Upside vs pasar (Base)",-0.071,0.005],
      ["Nilai/saham Bear (Rp)",984,2],["Nilai/saham Bull (Rp)",1531,2]],
    balance: false
  },
  "real-02": {
    tpl: "Latihan RC2 ASII",
    labels: ["EV Otomotif","EV Alat berat & tambang","EV Jasa keuangan","EV Agribisnis",
      "EV Infrastruktur & logistik","EV Teknologi informasi","EV Properti",
      "EV SOTP total","Net debt","Equity value SOTP","Nilai/saham SOTP (Rp)","Diskon konglomerat"],
    formulaLabels: ["EV Otomotif","EV Alat berat & tambang","EV Jasa keuangan","EV Agribisnis",
      "EV Infrastruktur & logistik","EV Teknologi informasi","EV Properti",
      "EV SOTP total","Net debt","Equity value SOTP","Nilai/saham SOTP (Rp)","Diskon konglomerat"],
    expect: [["EV Otomotif",92.78,0.05],["EV Alat berat & tambang",59.65,0.05],
      ["EV Jasa keuangan",55.67,0.05],["EV Agribisnis",31.81,0.05],
      ["EV Infrastruktur & logistik",33.93,0.05],["EV Teknologi informasi",21.21,0.05],
      ["EV Properti",11.13,0.05],["EV SOTP total",306.18,0.1],
      ["Net debt",57.68,0.05],["Equity value SOTP",248.50,0.1],
      ["Nilai/saham SOTP (Rp)",6261,5],["Diskon konglomerat",0.233,0.005]],
    balance: false
  },
  "real-04": {
    tpl: "Latihan RC4 TSLA",
    labels: ["Nilai/saham @ g=8%","Nilai/saham @ g=12%","Nilai/saham @ g=16%","g (input — coba-coba / goal seek)","Nilai/saham (g=input)"],
    // g input = jawaban KETIK hasil goal seek (bukan rumus) — hanya dinilai angkanya;
    // "Nilai/saham (g=input)" dinilai RUMUS-nya saja (nilainya ikut input g si learner).
    formulaLabels: ["Nilai/saham @ g=8%","Nilai/saham @ g=12%","Nilai/saham @ g=16%","Nilai/saham (g=input)"],
    expect: [["Nilai/saham @ g=8%",42,1],["Nilai/saham @ g=12%",57,1],
      ["Nilai/saham @ g=16%",78,1],["g (input — coba-coba / goal seek)",0.387,0.005]],
    balance: false
  },
  "real-05": {
    tpl: "Latihan RC5 TLKM",
    labels: ["FCF 2025","FCF 2026 (Panen)","PV FCF 2026-30 (Panen)","EV (Panen)",
      "Nilai/saham Panen (Rp)","FCF 2026 (Wave 5G)","Nilai/saham Wave 5G (Rp)","FCF yield 2025"],
    formulaLabels: ["FCF 2025","FCF 2026 (Panen)","PV FCF 2026-30 (Panen)","EV (Panen)",
      "Nilai/saham Panen (Rp)","FCF 2026 (Wave 5G)","Nilai/saham Wave 5G (Rp)","FCF yield 2025"],
    expect: [["FCF 2025",38.04,0.05],["FCF 2026 (Panen)",39.32,0.05],
      ["PV FCF 2026-30 (Panen)",150.64,0.1],["EV (Panen)",436.89,0.1],
      ["Nilai/saham Panen (Rp)",4015,5],["FCF 2026 (Wave 5G)",31.12,0.05],
      ["Nilai/saham Wave 5G (Rp)",3092,5],["FCF yield 2025",0.1949,0.002]],
    balance: false
  }
};
let WB_CUR = "hari-01";

function checkerSectionHTML(cfgId){
  WB_CUR = cfgId || "hari-01";
  const cfg = WB_CFG[WB_CUR];
  return `<div class="sec"><h3>${T("checker_h")}</h3>
  ${T("checker_en_note") ? `<div class="callout">${T("checker_en_note")}</div>` : ""}
  <p>${T("checker_upload_p").replace("{tpl}", esc(cfg.tpl))}</p>
  <div class="callout">${T("checker_warn")}</div>
  <div class="btnrow"><input type="file" id="wbfile" accept=".xlsx,.xlsm" style="max-width:100%">
  <button class="btn blue" onclick="runChecker()">${T("checker_btn")}</button></div>
  <div id="wbout" style="margin-top:12px"></div></div>`;
}
function wbEnsureLib(cb, outId){
  outId = outId || "wbout";
  if (window.XLSX) return cb();
  const out = document.getElementById(outId);
  out.innerHTML = `<p>${T("checker_lib_loading")}</p>`;
  const s = document.createElement("script");
  s.src = WB_CDN; s.integrity = WB_SRI; s.crossOrigin = "anonymous";
  s.onload = cb;
  s.onerror = () => { out.innerHTML = `<div class="callout">${T("checker_lib_fail")}</div>`; };
  document.head.appendChild(s);
}
function runChecker(){
  const inp = document.getElementById("wbfile");
  const out = document.getElementById("wbout");
  if (!inp || !inp.files || !inp.files[0]) { out.innerHTML = `<div class="callout">Pilih dulu file xlsx hasil kerjaanmu.</div>`; return; }
  wbEnsureLib(() => {
    const rd = new FileReader();
    rd.onload = e => {
      try { wbCheckFile(new Uint8Array(e.target.result)); }
      catch(err){ out.innerHTML = `<div class="callout">${T("mission_readfail")}${esc(String((err && err.message) || err))}</div>`; }
    };
    rd.onerror = () => { out.innerHTML = `<div class="callout">${T("prog_readfail")}</div>`; };
    rd.readAsArrayBuffer(inp.files[0]);
  });
}
/* rumus "palsu": =angka (hardcode berkedok rumus) — ditandai, bukan dihitung sebagai rumus.
   Scope top-level: dipakai checker workbook BIASA maupun checker MISI. */
const wbIsConstF = f => typeof f === "string" && /^\s*[-+]?[\d][\d.,\s]*\s*$/.test(f);
function wbCheckFile(data){
  const out = document.getElementById("wbout");
  const cfg = WB_CFG[WB_CUR] || WB_CFG["hari-01"];
  const wb = XLSX.read(data, {type:"array"});
  if (wb.SheetNames.indexOf("LATIHAN") < 0) {
    out.innerHTML = `<div class="callout">❌ <b>Template tidak dikenali.</b> Upload file berbasis template <b>${esc(cfg.tpl)}</b> (punya sheet "LATIHAN"), bukan file lain.</div>`;
    return;
  }
  const ws = wb.Sheets["LATIHAN"];
  const range = XLSX.utils.decode_range(ws["!ref"]);
  const cellAt = (r, c) => ws[XLSX.utils.encode_cell({r:r, c:c})];
  const rowOf = {};
  for (let r = range.s.r; r <= range.e.r; r++) {
    const c = cellAt(r, 0);
    const v = (c && typeof c.v === "string") ? c.v.trim() : "";
    if (v) (rowOf[v] = rowOf[v] || []).push(r);
  }
  const missing = cfg.labels.filter(l => !rowOf[l]);
  if (missing.length) {
    out.innerHTML = `<div class="callout">❌ Struktur file tidak cocok dengan template (label hilang: ${esc(missing.slice(0,5).join(", "))}${missing.length > 5 ? "…" : ""}). Pastikan file-mu berbasis template ${esc(cfg.tpl)} yang strukturnya tidak diubah.</div>`;
    return;
  }
  const fails = [];
  let nFormula = 0, nEmpty = 0;
  const nFormulaCells = cfg.formulaLabels.reduce((n, lab) => n + rowOf[lab].length, 0);
  cfg.formulaLabels.forEach(lab => {
    rowOf[lab].forEach(r => {
      const b = cellAt(r, 1);
      const hasF = !!(b && b.f) && !wbIsConstF(b.f);
      const hasV = !!(b && b.v !== undefined && b.v !== null && b.v !== "");
      const addr = XLSX.utils.encode_cell({r:r, c:1});
      if (hasF) nFormula++;
      else if (b && b.f && wbIsConstF(b.f)) fails.push({icon:"⚠️",
        t:`<b>${esc(lab)}</b> (${addr}) berisi <b>rumus angka tetap</b> (=angka) — bukan link.`,
        why:"Kenapa? =8400 itu hardcode berkedok rumus: tidak ikut berubah kalau asumsi berubah. Link ke sel input/asumsi, bukan ketik angka di dalam rumus."});
      else if (hasV) fails.push({icon:"⚠️",
        t:`<b>${esc(lab)}</b> (${addr}) berisi angka tetap, bukan rumus — ganti dengan rumus yang me-link ke sel input.`,
        why:"Kenapa? Angka tetap tidak ikut berubah kalau asumsi berubah — model yang benar me-link sel, bukan mengetik ulang angka."});
      else { nEmpty++; fails.push({icon:"⚠️",
        t:`<b>${esc(lab)}</b> (${addr}) masih kosong — atau rumusnya tidak terbaca.`,
        why:"Kenapa? Sel jawaban ini harus diisi dengan rumus yang me-link ke sel input. Kalau kamu SUDAH mengisi rumus tapi tetap terbaca kosong, buka file di Excel/Google Sheets/LibreOffice lalu simpan ulang (agar hasil rumus tersimpan), kemudian upload lagi."}); }
    });
  });
  const val = lab => { const b = cellAt(rowOf[lab][0], 1); return b ? Number(b.v) : NaN; };
  const close = (a, e, tol) => isFinite(a) && Math.abs(a - e) <= tol;
  let nValOK = 0;
  cfg.expect.forEach(([lab, exp, tol]) => {
    const v = val(lab);
    const fmtN = x => isFinite(x) ? x.toLocaleString("id-ID", {maximumFractionDigits: 2}) : "(kosong)";
    if (close(v, exp, tol)) nValOK++;
    else fails.push({icon:"❌",
      t:`<b>${esc(lab)}</b> = ${fmtN(v)}, harusnya ${fmtN(exp)}.`,
      why:"Kenapa? Angka ini tidak cocok dengan kunci — cek lagi perhitunganmu, atau buka file Jawaban untuk melihat cara berpikirnya."});
  });
  let balOK = true;
  if (cfg.balance) {
    const A = val("TOTAL ASET"), L = val("TOTAL LIABILITAS"), E = val("TOTAL EKUITAS");
    balOK = isFinite(A) && isFinite(L) && isFinite(E) && Math.abs(A - (L + E)) <= 1;
    if (!balOK) fails.push({icon:"❌",
      t:`Neraca tidak balance: Aset ${isFinite(A) ? A.toLocaleString("id-ID") : "?"} vs L+E ${(isFinite(L) && isFinite(E)) ? (L+E).toLocaleString("id-ID") : "?"}.`,
      why:"Kenapa? Neraca harus selalu balance: Aset = Liabilitas + Ekuitas. Cari sel yang salah link."});
  }
  const wVal = cfg.balance ? 30 : 40, wBal = cfg.balance ? 10 : 0;
  const skor = Math.round(nFormula/nFormulaCells*60 + nValOK/cfg.expect.length*wVal + (balOK ? wBal : 0));
  let html = `<div class="callout"><b>📊 Hasil cek:</b> rumus di <b>${nFormula}/${nFormulaCells}</b> sel jawaban · `
    + `angka benar <b>${nValOK}/${cfg.expect.length}</b>${cfg.balance ? ` · balance ${balOK ? "✅" : "❌"}` : ""}`
    + `<br>🎯 <b>Skor: ${skor}/100</b>${skor >= 80 ? " — mantap! 🎉" : skor >= 50 ? " — lanjutkan!" : " — coba lagi, cek temuan di bawah."}</div>`;
  if (!fails.length) html += `<div class="callout">✅ <b>Semua cek lolos!</b> Workbook-mu memakai rumus, angkanya benar${cfg.balance ? ", dan neracanya balance" : ""}.</div>`;
  else html += fails.map(f => `<div class="callout">${f.icon} ${f.t}<br><span style="font-size:.9rem">${f.why}</span></div>`).join("");
  out.innerHTML = html;
  // simpan hasil checker ke progress (badge faktual — bukan auto-tick self-check)
  try {
    const p = getP();
    p.checker = p.checker || {};
    p.checker[WB_CUR] = {score: skor, date: Date.now()};
    saveP(p);
    const b = document.getElementById("pstatusBadges");
    if (b) { const l = ALL_LESSONS.find(x => x.id === WB_CUR); b.innerHTML = statusBadgesHTML(l ? l.id : ""); }
    const cb = document.getElementById("checkerBadge");
    if (cb) cb.innerHTML = checkerBadgeHTML(WB_CUR);
  } catch(e) { /* progress opsional — hasil cek tetap tampil */ }
}

/* ---------- misi perbaikan: "fix the broken model" (client-side, SheetJS) ---------- */
/* Menilai PERBAIKAN AKTUAL (rumus benar di sel yang tadinya rusak + balance),
   bukan sekadar angka akhir. Angka ketik yang benar tetap gagal: harus rumus. */
const MISI_FIX = [
  {label: "Laba kotor", expect: null,
   fix: "Ganti angka ketik dengan rumus yang me-link ke sel input, mis. =Penjualan+HPP.",
   cons: "Konsekuensi: total yang diketik manual TIDAK ikut berubah kalau penjualan/HPP berubah — model 'mati' di sel ini. Satu perubahan asumsi, angkanya basi."},
  {label: "Arus kas operasi", expect: 0, tol: 1,
   fix: "Rumus yang benar: Laba bersih + Penyusutan + (- Kenaikan persediaan) + Kenaikan utang. Perhatikan TANDA tiap komponen.",
   cons: "Konsekuensi: tanda yang salah membuat kas operasi jadi Rp3.000 — padahal kas justru TERTAHAN Rp1.500 di persediaan. Kas tidak bisa muncul dari stok yang menahan kas."},
  {label: "Laba ditahan", expect: 1100, tol: 1,
   fix: "Laba ditahan = Laba BERSIH periode ini (dividen 0) — bukan laba kotor.",
   cons: "Konsekuensi: me-link ke laba kotor (7.500) membuat ekuitas bengkak vs aset — neraca tidak balance. Jembatan 1 (IS → neraca) putus."}
];
const MISI_FIX_INDF = [
  {label: "Ekuitas induk (setelah NCI)", expect: 73.15, tol: 0.05,
   fix: "Kurangi NCI: =Total_ekuitas − NCI = 120,24 − 47,09.",
   cons: "Konsekuensi: NCI milik pemegang saham minoritas anak usaha — mengklaimnya sebagai milik induk menggelembungkan valuasi Rp47,09T (≈ Rp5.364/saham)."},
  {label: "Beban bunga 2026 (link)", expect: 4.50, tol: 0.02,
   fix: "Link ke debt schedule: =Utang_awal × tarif = 74,96 × 6%.",
   cons: "Konsekuensi: bunga ketik manual tidak ikut berubah kalau asumsi utang berubah — dan tidak meninggalkan jejak audit."},
  {label: "FCFF 2026 (tanda ΔWC)", expect: 15.90, tol: 0.05,
   fix: "ΔWC positif = kas TERTAHAN → dikurangkan: =NOPAT + D&A − capex − ΔWC.",
   cons: "Konsekuensi: tanda terbalik membuat FCF terlihat Rp20,10T padahal Rp2,1T kas tertahan di modal kerja — overstate 26%."},
  {label: "FCFF final (tanpa double capex)", expect: 15.90, tol: 0.05,
   fix: "Capex hanya dikurangi SEKALI. FCFF final = FCFF (tanpa kurangi capex lagi).",
   cons: "Konsekuensi: double-count memangkas FCF Rp10T — valuasi runtuh karena bug mekanik, bukan karena bisnisnya."},
  {label: "Selisih A − (L+E)", expect: 0, tol: 0.5,
   fix: "Ganti ketikan 0 dengan rumus balance check: =TOTAL_ASET − (TOTAL_LIABILITAS + TOTAL_EKUITAS).",
   cons: "Konsekuensi: 'OK' ketikan adalah alarm yang dicabut kabelnya — ia mematikan peringatan justru saat paling dibutuhkan."}
];
const MISI_FIX_DETEKTIF = [
  {label: "Liabilitas lease (PV pembayaran)", expect: 4791.25, tol: 1,
   fix: "Hitung PV 5 pembayaran: =1200*(1-1/(1+8%)^5)/8% atau =PV(8%,5,-1200). Link juga 'Aset ROU awal' ke sel ini, dan nol-kan baris 'Beban sewa operasi' (perlakuan salah).",
   cons: "Konsekuensi: liabilitas Rp4.791rb hilang dari neraca \u2014 utang tersamar membuat leverage terlihat lebih sehat dari aslinya; aset ROU ikut hilang Rp4.791rb."},
  {label: "Beban bunga lease Y1", expect: 383.30, tol: 0.05,
   fix: "=Liabilitas lease \u00d7 8% = 4.791,25 \u00d7 8%. Beban lease yang benar = depresiasi ROU + bunga, bukan sewa 1.200.",
   cons: "Konsekuensi: struktur beban salah kaprah \u2014 bunga Rp383rb tak diakui sehingga laba tahun-1 terlihat Rp141,55rb lebih besar dari seharusnya."},
  {label: "DTL", expect: 88, tol: 0.05,
   fix: "=(D&A pajak \u2212 D&A buku) \u00d7 tarif = (1.200 \u2212 800) \u00d7 22%.",
   cons: "Konsekuensi: tagihan pajak masa depan Rp88rb yang pasti terjadi tidak diakui \u2014 liabilitas understated, ekuitas overstated."},
  {label: "CFO (operasi)", expect: 5500, tol: 1,
   fix: "Add-back stock comp Rp500rb (non-kas): link sel '(+) Stock comp (non-kas)' ke beban stock comp. Nol-kan baris 'Pembayaran sewa operasi' (kas lease sudah di CFF via porsi bunga).",
   cons: "Konsekuensi: CFO tercatat Rp2.600rb vs seharusnya Rp5.500rb \u2014 arus kas operasi terlihat sekarat padahal sehat; keputusan kredit/investasi bisa salah arah."},
  {label: "Pajak kini (setelah NOL)", expect: 870.86, tol: 0.5,
   fix: "=Laba fiskal \u00d7 22% \u2212 Manfaat NOL = 5.958,45 \u00d7 22% \u2212 440. Link 'Manfaat NOL' dari seksi 4 (jangan ketik 440).",
   cons: "Konsekuensi: pajak kepanjangan Rp440rb \u2014 DTA dari rugi tahun lalu terbuang sia-sia; kas keluar lebih besar dari kewajiban sebenarnya."}
];
function missionSectionHTML(fileUrl, opt){
  opt = opt || {};
  const key = opt.key || "hari-01";
  const title = opt.title || T("mission_default_title");
  const desc = opt.desc || T("mission_default_desc");
  let prevTxt = "";
  try {
    const pm = (getP().mission || {})[key];
    const pb = pm && (pm.best !== undefined ? pm.best : pm.score);
    const pl = pm && pm.latest;
    if (pb !== undefined) prevTxt = `<div class="callout">🏆 Skor terbaikmu: <b>${pb}</b>${pl !== undefined ? ` · percobaan terakhir: <b>${pl}</b>` : ""}.</div>`;
  } catch(e) { /* abaikan */ }
  return `<div class="sec"><h3>${title}</h3>
  ${T("mission_en_note") ? `<div class="callout">${T("mission_en_note")}</div>` : ""}
  <p>${desc}</p>
  ${prevTxt}
  <div class="btnrow"><a class="btn blue" href="${fileUrl}" target="_blank" rel="noopener">${T("mission_dl")}</a></div>
  <div class="callout">${T("mission_warn")}</div>
  <div class="btnrow"><input type="file" id="misifile" accept=".xlsx,.xlsm" style="max-width:100%">
  <button class="btn blue" onclick="runMission('${key}')">${T("mission_btn")}</button></div>
  <div id="misiout" style="margin-top:12px"></div></div>`;
}
function runMission(key){
  const inp = document.getElementById("misifile");
  const out = document.getElementById("misiout");
  if (!inp || !inp.files || !inp.files[0]) { out.innerHTML = `<div class="callout">${T("mission_nofile")}</div>`; return; }
  wbEnsureLib(() => {
    const rd = new FileReader();
    rd.onload = e => {
      try { wbMissionCheck(new Uint8Array(e.target.result), key || "hari-01"); }
      catch(err){ out.innerHTML = `<div class="callout">❌ Gagal membaca file: ${esc(String((err && err.message) || err))}</div>`; }
    };
    rd.onerror = () => { out.innerHTML = `<div class="callout">${T("prog_readfail")}</div>`; };
    rd.readAsArrayBuffer(inp.files[0]);
  }, "misiout");
}
function wbMissionCheck(data, key){
  key = key || "hari-01";
  const LIST = key === "detektif" ? MISI_FIX_DETEKTIF : key === "indf" ? MISI_FIX_INDF : MISI_FIX;
  const out = document.getElementById("misiout");
  const wb = XLSX.read(data, {type:"array"});
  if (wb.SheetNames.indexOf("LATIHAN") < 0) {
    out.innerHTML = `<div class="callout">❌ <b>Template tidak dikenali.</b> Upload file hasil perbaikan berbasis file misi (punya sheet "LATIHAN").</div>`;
    return;
  }
  const ws = wb.Sheets["LATIHAN"];
  const range = XLSX.utils.decode_range(ws["!ref"]);
  const cellAt = (r, c) => ws[XLSX.utils.encode_cell({r:r, c:c})];
  const rowOf = {};
  for (let r = range.s.r; r <= range.e.r; r++) {
    const c = cellAt(r, 0);
    const v = (c && typeof c.v === "string") ? c.v.trim() : "";
    if (v) (rowOf[v] = rowOf[v] || []).push(r);
  }
  const missing = LIST.map(m => m.label).filter(l => !rowOf[l]);
  if (missing.length) {
    out.innerHTML = `<div class="callout">❌ Label tidak ditemukan: ${esc(missing.join(", "))}. Pastikan file-mu berbasis file misi yang strukturnya tidak diubah.</div>`;
    return;
  }
  let nOK = 0;
  const cards = LIST.map(m => {
    const r = rowOf[m.label][0];
    const b = cellAt(r, 1);
    const addr = XLSX.utils.encode_cell({r:r, c:1});
    const hasRealF = !!(b && b.f) && !wbIsConstF(b.f);
    const hasV = !!(b && b.v !== undefined && b.v !== null && b.v !== "");
    const v = hasV ? Number(b.v) : NaN;
    if (!hasRealF && hasV && (m.expect === null || Math.abs(v - m.expect) <= m.tol)) {
      return `<div class="callout">⚠️ <b>${esc(m.label)}</b> (${addr}): angka <b>benar tapi masih KETIKAN</b> — misi ini menuntut <b>rumus</b>.<br><span style="font-size:.9rem">Perbaikan: ${m.fix}</span></div>`;
    }
    if (!hasRealF) {
      return `<div class="callout">❌ <b>${esc(m.label)}</b> (${addr}): <b>belum diperbaiki</b> — masih bukan rumus yang benar.<br><span style="font-size:.9rem">${m.cons}<br>Perbaikan: ${m.fix}</span></div>`;
    }
    if (m.expect !== null && !(isFinite(v) && Math.abs(v - m.expect) <= m.tol)) {
      return `<div class="callout">❌ <b>${esc(m.label)}</b> (${addr}): sudah rumus, tapi hasilnya <b>${isFinite(v) ? v.toLocaleString("id-ID") : "(kosong)"}</b> — harusnya ${m.expect.toLocaleString("id-ID")}. Cek lagi link-nya.<br><span style="font-size:.9rem">${m.cons}</span></div>`;
    }
    nOK++;
    return `<div class="callout">✅ <b>${esc(m.label)}</b> (${addr}): <b>diperbaiki dengan benar</b> — rumus ✓${m.expect !== null ? `, nilai ✓ (${m.expect.toLocaleString("id-ID")})` : ""}.</div>`;
  });
  const val = lab => { const rr = rowOf[lab]; if (!rr) return NaN; const b = cellAt(rr[0], 1); return b ? Number(b.v) : NaN; };
  const A = val("TOTAL ASET"), L = val("TOTAL LIABILITAS"), E = val("TOTAL EKUITAS");
  const balOK = isFinite(A) && isFinite(L) && isFinite(E) && Math.abs(A - (L + E)) <= 1;
  /* best + latest: retry gagal tidak boleh menghapus kelulusan (migrasi format lama {score}) */
  let bestM = nOK;
  try {
    const prevM = (getP().mission || {})[key] || {};
    const prevBest = (prevM.best !== undefined) ? prevM.best : (prevM.score || 0);
    bestM = Math.max(prevBest, nOK);
  } catch(e) { /* abaikan */ }
  let html = `<div class="callout"><b>🛠️ Hasil misi:</b> <b>${nOK}/${LIST.length}</b> kerusakan diperbaiki dengan benar · neraca ${balOK ? "balance ✅" : "belum balance ❌"}`
    + `<br>🏆 Skor terbaik: <b>${bestM}/${LIST.length}</b> · percobaan terakhir: <b>${nOK}/${LIST.length}</b>`
    + (nOK === LIST.length && balOK ? `<br>🎉 <b>Misi selesai!</b> Kamu menemukan, menjelaskan, dan memperbaiki semuanya — itu skill audit.` : "") + `</div>`;
  html += cards.join("");
  if (!balOK) html += `<div class="callout">❌ Neraca belum balance: Aset ${isFinite(A) ? A.toLocaleString("id-ID") : "?"} vs L+E ${(isFinite(L) && isFinite(E)) ? (L+E).toLocaleString("id-ID") : "?"}.<br><span style="font-size:.9rem">Kenapa? Aset harus = Liabilitas + Ekuitas.${key === "hari-01" ? " Perbaikan \"Laba ditahan\" yang benar akan menyeimbangkan ini." : ""}</span></div>`;
  out.innerHTML = html;
  try {
    const p = getP();
    p.mission = p.mission || {};
    p.mission[key] = {best: bestM, latest: nOK, bal: balOK, date: Date.now()};
    saveP(p);
  } catch(e) { /* opsional */ }
}

/* ---------- simulator debit/kredit (Fondasi B) ---------- */
/* DK-PURE-START */
const DK_TX = [
 {t:"Setor modal tunai", d:"Septian menyetor modal Rp10.000 tunai ke warung.",
  acc:[["Kas","D"],["Modal","K"]],
  jur:[["D","Kas","10.000"],["K","Modal","10.000"]],
  why:"Kenapa? Kas (aset, sisi KIRI persamaan) bertambah → debit. Modal (ekuitas, sisi KANAN) bertambah → kredit. Kiri bertambah = debit, kanan bertambah = kredit."},
 {t:"Beli peralatan kredit", d:"Beli peralatan Rp6.000 dari supplier, bayar tempo (utang usaha).",
  acc:[["Peralatan","D"],["Utang usaha","K"]],
  jur:[["D","Peralatan","6.000"],["K","Utang usaha","6.000"]],
  why:"Kenapa? Peralatan (aset, kiri) bertambah → debit. Utang usaha (liabilitas, kanan) bertambah → kredit. Total debit 6.000 = total kredit 6.000 ✓"},
 {t:"Bayar sewa tunai", d:"Bayar sewa ruko Rp2.000 tunai.",
  acc:[["Beban sewa","D"],["Kas","K"]],
  jur:[["D","Beban sewa","2.000"],["K","Kas","2.000"]],
  why:"Kenapa? Beban mengurangi ekuitas → bergerak BERLAWANAN dengan sisi kanan: bertambah saat di-debit. Kas (aset) berkurang → kredit."},
 {t:"Terima pendapatan jasa tunai", d:"Terima Rp5.000 tunai dari pelanggan.",
  acc:[["Kas","D"],["Pendapatan jasa","K"]],
  jur:[["D","Kas","5.000"],["K","Pendapatan jasa","5.000"]],
  why:"Kenapa? Kas (aset, kiri) bertambah → debit. Pendapatan menambah ekuitas (kanan) → kredit."},
 {t:"Bayar gaji tunai", d:"Bayar gaji karyawan Rp3.000 tunai.",
  acc:[["Beban gaji","D"],["Kas","K"]],
  jur:[["D","Beban gaji","3.000"],["K","Kas","3.000"]],
  why:"Kenapa? Pola sama seperti sewa: beban bertambah → debit; kas (aset) berkurang → kredit."},
 {t:"Bayar utang usaha", d:"Bayar utang ke supplier Rp2.000 tunai.",
  acc:[["Utang usaha","D"],["Kas","K"]],
  jur:[["D","Utang usaha","2.000"],["K","Kas","2.000"]],
  why:"Kenapa? JEBAKAN KLASIK: utang (liabilitas, sisi kanan) BERKURANG → bergerak berlawanan → debit. Kas berkurang → kredit. Yang menentukan D/K = posisi di persamaan + arah perubahannya, bukan nama akunnya."}
];
function dkJournalOK(tx){
  let d = 0, k = 0;
  tx.jur.forEach(([s,,n]) => { const v = parseInt(String(n).replace(/[.,]/g, ""), 10); if (s === "D") d += v; else k += v; });
  return d === k && d > 0;
}
/* DK-PURE-END */

let DKS = null;
function dkResetState(){
  DKS = {sel: dkTX().map(tx => tx.acc.map(() => null)), done: dkTX().map(() => false), benar: 0, total: 0};
}
function dkCardHTML(i){
  const tx = dkTX()[i], sel = DKS.sel[i], done = DKS.done[i];
  const rows = tx.acc.map(([nm, side], a) => `
    <div class="predrow"><span class="dim">${esc(nm)}:</span>
    ${["D","K"].map(o => `<button class="predbtn${sel[a] === o ? " on" : ""}"${done ? " disabled" : ""} onclick="dkPick(${i},${a},'${o}')">${o === "D" ? T("dk_debit") : T("dk_credit")}</button>`).join("")}
    </div>`).join("");
  const ready = sel.every(v => v);
  return `<div class="simcard">
    <h4>${i + 1}. ${esc(tx.t)}</h4>
    <p>${esc(tx.d)}</p>
    ${rows}
    <div class="btnrow"><button class="btn small blue"${(done || !ready) ? " disabled" : ""} onclick="dkReveal(${i})">${T("sim_reveal")}</button></div>
    <div id="dkrevbox${i}">${done ? dkRevealHTML(i) : ""}</div>
  </div>`;
}
function dkRevealHTML(i){
  const tx = dkTX()[i], sel = DKS.sel[i];
  const rows = tx.acc.map(([nm, side], a) => {
    const ok = sel[a] === side;
    return `<div>${ok ? "✅" : "❌"} <b>${esc(nm)}</b>: ${T("sim_guess_yours")} <b>${sel[a] === "D" ? T("dk_debit") : T("dk_credit")}</b> — ${T("sim_answer")} <b>${side === "D" ? T("dk_debit") : T("dk_credit")}</b></div>`;
  }).join("");
  const jur = tx.jur.map(([dk, ak, n]) => `<tr><td>${dk}</td><td>${esc(ak)}</td><td style="text-align:right">${n}</td></tr>`).join("");
  return `<div class="simrev-in">${rows}
    <p style="margin:8px 0 4px"><b>${T("sim_journal")}</b></p>
    <div class="tblwrap"><table class="brutal"><tr><th>D/K</th><th>${T("sim_acc").split(" (")[0]}</th><th style="text-align:right">${T("sim_ribu")}</th></tr>${jur}</table></div>
    <div class="callout">${esc(tx.why)}</div>
  </div>`;
}
function dksimSectionHTML(){
  return `<div class="sec"><h3>${T("dk_h")}</h3>
  <p>${T("dk_p")}</p>
  <div class="callout" id="dkScore">${T("sim_score")} <b>0</b> ${T("sim_of")} <b>0</b> ${T("sim_guesses")}</div>
  <div id="dkCards">${dkTX().map((tx, i) => dkCardHTML(i)).join("")}</div>
  <div class="btnrow"><button class="btn ghost" onclick="dkResetUI()">${T("sim_reset")}</button></div></div>`;
}
function dkPick(i, a, o){
  if (DKS.done[i]) return;
  DKS.sel[i][a] = o;
  $("#dkCards").innerHTML = dkTX().map((tx, j) => dkCardHTML(j)).join("");
}
function dkReveal(i){
  const tx = dkTX()[i], sel = DKS.sel[i];
  if (DKS.done[i] || !sel.every(v => v)) return;
  let benar = 0;
  tx.acc.forEach(([nm, side], a) => { if (sel[a] === side) benar++; });
  DKS.benar += benar; DKS.total += tx.acc.length;
  DKS.done[i] = true;
  $("#dkScore").innerHTML = `${T("sim_score")} <b>${DKS.benar}</b> ${T("sim_of")} <b>${DKS.total}</b> ${T("sim_guesses")}`;
  $("#dkCards").innerHTML = dkTX().map((t, j) => dkCardHTML(j)).join("");
  const box = $("#dkrevbox" + i);
  if (box) box.scrollIntoView({behavior:"smooth", block:"nearest"});
}
function dkResetUI(){
  dkResetState();
  const w = $("#dkwrap");
  if (w) w.innerHTML = dksimSectionHTML();
}

/* ---------- glossary ---------- */
function glossRows(){ return (lang()==="en" && typeof GLOSSARY_EN !== "undefined") ? GLOSSARY_EN : GLOSSARY; }
function renderGlossary() {
  show(`
  <div class="lesson-head" style="background:var(--green)"><h2>📖 ${T("nav_glossary")}</h2>
  <div class="sub">${T("glossary_sub")} ${glossRows().length} ${T("glossary_n")}</div></div>
  <input class="searchbar" id="gsearch" placeholder="${T("glossary_ph")}" oninput="filterGlossary()">
  <div id="glist">${glossaryHTML("")}</div>`);
  $("#gsearch").focus();
}
function glossaryHTML(f) {
  f = f.toLowerCase();
  return glossRows().filter(g => !f || g[0].toLowerCase().includes(f) || g[1].toLowerCase().includes(f))
    .map(g => `<div class="gitem"><div class="term">${esc(g[0])} <span class="en">(${esc(g[1])})</span></div>
      <div class="def">${esc(g[2])}</div><div class="def" style="opacity:.75">💡 ${esc(g[3])}</div></div>`).join("")
    || `<div class="card"><p>${T("glossary_none")}</p></div>`;
}
function filterGlossary() { $("#glist").innerHTML = glossaryHTML($("#gsearch").value); }

/* ---------- excel funcs ---------- */
function funcRows(){ return (lang()==="en" && typeof EXCELFUNCS_EN !== "undefined") ? EXCELFUNCS_EN : EXCELFUNCS; }
function renderFuncs() {
  show(`
  <div class="lesson-head" style="background:var(--orange)"><h2>🧮 ${T("nav_funcs")}</h2>
  <div class="sub">${T("funcs_sub")} ${funcRows().length} ${T("funcs_n")}</div></div>
  <input class="searchbar" id="fsearch" placeholder="${T("funcs_ph")}" oninput="filterFuncs()">
  <div id="flist">${funcsHTML("")}</div>`);
}
function funcsHTML(f) {
  f = f.toLowerCase();
  return funcRows().filter(x => !f || x[0].toLowerCase().includes(f))
    .map(x => `<div class="fitem"><span class="fn">${esc(x[0])}</span>
      <div style="font-family:Consolas,monospace;font-size:.88rem;margin:4px 0">${esc(x[1])}</div>
      <div style="font-size:.93rem">${esc(x[2])}</div>
      <div style="font-size:.9rem;opacity:.75;margin-top:4px">💡 ${esc(x[3])}</div></div>`).join("")
    || `<div class="card"><p>${T("funcs_none")}</p></div>`;
}
function filterFuncs() { $("#flist").innerHTML = funcsHTML($("#fsearch").value); }

/* ---------- cheatsheet ---------- */
function renderCheatsheet() {
  show(`
  <div class="lesson-head" style="background:var(--purple)"><h2>${T("cheat_h")}</h2>
  <div class="sub">${T("cheat_sub")}</div></div>
  <div class="grid two">
    <div class="card"><span class="tag t-tool">PNG</span><h3>${T("cheat_linkage_h")}</h3>
      <p>${T("cheat_linkage_p")}</p>
      <div class="btnrow"><a class="btn small blue" href="assets/diagram-linkage.png" download>${T("cheat_dl")}</a></div></div>
    <div class="card"><span class="tag t-soon">${T("cheat_soon")}</span><h3>${T("cheat_dcf_h")}</h3><p>${T("cheat_dcf_p")}</p></div>
    <div class="card"><span class="tag t-soon">${T("cheat_soon")}</span><h3>${T("cheat_jur_h")}</h3><p>${T("cheat_jur_p")}</p></div>
    <div class="card"><span class="tag t-soon">${T("cheat_soon")}</span><h3>${T("cheat_sc_h")}</h3><p>${T("cheat_sc_p")}</p></div>
  </div>`);
}

/* ---------- mistake review (dual-loop, metode DeepTutor) ---------- */
function recordMistake(lid, qi, k){
  const p = getP();
  p.mistakes = p.mistakes || {};
  const key = lid + ":" + qi;
  const m = p.mistakes[key] || {k: k, n: 0};
  m.k = k; m.n = (m.n || 0) + 1; m.t = Date.now(); m.recovered = false;
  p.mistakes[key] = m;
  saveP(p);
}
function variantFor(key){
  const p = getP();
  const concept = (p.mistakes && p.mistakes[key] && p.mistakes[key].k) || key;
  const vf = (typeof variantEntry === "function") ? variantEntry(key) : ((typeof VARIANT_FNS !== "undefined") && VARIANT_FNS[key]);
  if (vf) {
    const v = vf.gen(Math.random);
    return {key, concept, q: v.q, opts: v.opts, answer: v.answer, explain: v.explain, steps: v.steps, diff: vf.diff, note: ""};
  }
  const parts = key.split(":");
  const l = L(ALL_LESSONS.find(x => x.id === parts[0]));
  const q = l && l.quiz[+parts[1]];
  if (!q) return null;
  const order = vShuffle([0, 1, 2, 3], Math.random);
  const cq = (typeof CONCEPTS !== "undefined") && CONCEPTS[q.k];
  return {key, concept: q.k || parts[0], q: q.q, opts: order.map(i => q.opts[i]), answer: order.indexOf(q.answer),
    explain: q.explain, diff: "Medium", note: T("mr_note_shuffled"),
    steps: ["Analysis: " + ((cq && cDiag(cq)) || T("mr_fallback_diag")),
      "Solve: " + T("mr_fallback_step")]};
}
let MRV = null;
function mrStart(key){
  const v = variantFor(key);
  if (!v) return;
  MRV = v;
  const w = $("#mrwrap");
  const cname = ((typeof CONCEPTS !== "undefined") && CONCEPTS[v.concept] && cName(CONCEPTS[v.concept])) || prettyKey(v.concept);
  w.innerHTML = `<div class="simcard"><h4>${T("mr_variant")} <span class="vtag">${esc(v.diff)}</span>${v.note ? ` <span style="font-size:.8rem;opacity:.7">(${esc(v.note)})</span>` : ""}</h4>
    <div class="qq">${esc(v.q)}</div>
    ${v.opts.map((o, oi) => `<button class="opt" onclick="mrAnswer('${key}',${oi})">${esc(o)}</button>`).join("")}
    <div class="qfb" id="mrfb"></div></div>`;
  w.scrollIntoView({behavior:"smooth", block:"center"});
}
function mrAnswer(key, oi){
  const v = MRV;
  if (!v || v.done) return;
  v.done = true;
  const w = $("#mrwrap");
  w.querySelectorAll(".opt").forEach(b => { b.disabled = true; });
  const ok = oi === v.answer;
  const fb = $("#mrfb");
  const cname = ((typeof CONCEPTS !== "undefined") && CONCEPTS[v.concept] && cName(CONCEPTS[v.concept])) || prettyKey(v.concept);
  const steps = v.steps.map((s, i) => `<div style="margin-top:4px">${i === 0 ? "🔍" : "🧮"} ${esc(s)}</div>`).join("");
  if (ok) {
    const p = getP();
    if (p.mistakes && p.mistakes[key]) { p.mistakes[key].recovered = true; saveP(p); }
    fb.classList.add("show", "ok");
    fb.innerHTML = `${T("mr_correct")} <b>${esc(cname)}</b> ${T("mr_marked")}<div style="margin-top:8px">${steps}</div>
      <div class="btnrow" style="margin-top:8px"><button class="btn small ghost" onclick="route()">${T("mr_reload")}</button></div>`;
  } else {
    fb.classList.add("show", "no");
    fb.innerHTML = `${T("mr_notyet")}${esc(v.explain)}<div style="margin-top:8px">${T("mr_dual")}${steps}</div>
      <div class="btnrow" style="margin-top:8px"><button class="btn small blue" onclick="mrStart('${key}')">${T("mr_new_variant")}</button></div>`;
  }
  fb.scrollIntoView({behavior:"smooth", block:"center"});
}
function mistakeReviewHTML(){
  if (typeof CONCEPTS === "undefined" || typeof conceptMiniLesson !== "function") return "";
  const p = getP();
  const ms = p.mistakes || {};
  const keys = Object.keys(ms).filter(k => !ms[k].recovered);
  const nRec = Object.keys(ms).filter(k => ms[k].recovered).length;
  if (!keys.length) return `<div class="sec"><h3>${T("mr_h")}</h3>
    <p>${T("mr_none")}${nRec ? ` ${T("mr_recovered")} <b>${nRec}</b> ${T("mr_concepts")}` : " " + T("mr_none_p")}</p></div>`;
  const byK = {};
  keys.forEach(k => { const c = (ms[k] && ms[k].k) || "?"; (byK[c] = byK[c] || []).push(k); });
  const cards = Object.keys(byK).map(k => {
    const c = CONCEPTS[k] || {name: prettyKey(k), def: "", ref: "", diag: "—"};
    return `<div class="simcard">
      <h4>🎯 ${esc(cName(c))} <span class="vtag">${byK[k].length} ${T("mr_wrong_n")}</span></h4>
      <p><b>${T("mr_diag")}</b> ${esc(cDiag(c))}</p>
      <div class="callout" style="margin:8px 0"><b>${T("mr_minilesson")}</b><br>${conceptMiniLesson(k)}</div>
      <div class="btnrow">${byK[k].map(key => `<button class="btn small blue" onclick="mrStart('${key}')">${T("mr_variant")} ${esc(key)}</button>`).join("")}</div>
    </div>`;
  }).join("");
  return `<div class="sec"><h3>${T("mr_h")}</h3>
    <p>${T("mr_intro")}${nRec ? ` ${T("mr_recovered")} <b>${nRec}</b>.` : ""}</p>
    ${cards}<div id="mrwrap"></div></div>`;
}

/* ---------- progress ---------- */
function renderProgress() {
  const p = getP();
  const total = ALL_LESSONS.length;
  let doneN = 0;
  const rows = ALL_LESSONS.map(l0 => {
    const l = L(l0);
    const s = lessonState(l.id);
    const c = lessonComplete(l.id);
    if (c) doneN++;
    const hb = p.hellQuiz && p.hellQuiz[l.id];
    const hellCell = hb != null ? `<br>${T("prog_hell")} ${hb}% ${hb >= 80 ? "👑" : "💀"}` : "";
    const qCell = s.q != null
      ? `${s.q}% ${s.quizPass ? "✅" : "🔄"}${hellCell}`
      : (s.quizPass ? `${T("st_quiz_pass")}${hellCell}` : "—");
    const ck = p.checker && p.checker[l.id];
    const sheetCell = !s.hasSheet ? "n/a"
      : ((s.sheet ? "✅" : "—") + (ck ? `<br><span style="font-size:.75rem;white-space:nowrap">🔍 ${ck.score}/100</span>` : ""));
    return `<tr><td><b>${esc(l.title)}</b><br><span style="font-size:.78rem;opacity:.7">${esc(l.sub)}</span></td>
      <td style="text-align:center">${s.read ? "✅" : "—"}</td>
      <td style="text-align:center">${qCell}</td>
      <td style="text-align:center">${sheetCell}</td>
      <td style="text-align:center">${c ? T("st_done") : "🔄"}</td></tr>`;
  }).join("");
  const pct = Math.round(doneN / total * 100);
  show(`
  <div class="lesson-head" style="background:var(--yellow)"><h2>${T("prog_h")}</h2>
  <div class="sub">${T("prog_sub")}</div></div>
  <div class="sec"><h3>${T("prog_streak")} ${p.streak || 0} ${Tp("prog_days","prog_days_s",p.streak||0)}</h3>
    <div class="progressbar"><div style="width:${pct}%"></div></div>
    <p style="margin-top:8px">${doneN}/${total} ${T("prog_complete")} (${pct}%)</p></div>
  <div class="sec"><h3>${T("prog_perlesson")}</h3>
    <div class="tblwrap"><table class="brutal">
      <tr><th>${T("prog_th_lesson")}</th><th>📖</th><th>🎯 ${T("st_quiz")}</th><th>${T("prog_th_sheet")}</th><th>${T("prog_th_status")}</th></tr>
      ${rows}
    </table></div></div>
  ${mistakeReviewHTML()}
  <div class="sec"><h3>${T("prog_backup_h")}</h3>
    <p>${T("prog_backup_p")}</p>
    <div class="btnrow"><button class="btn blue" onclick="exportProgress()">${T("prog_backup_btn")}</button>
    <input type="file" id="restorefile" accept=".json" style="max-width:100%">
    <button class="btn ghost" onclick="importProgress()">${T("prog_restore_btn")}</button></div>
    <div id="restoreout" style="margin-top:8px"></div></div>
  <div class="sec"><h3>${T("prog_reset_h")}</h3>
    <div id="resetwrap"><button class="btn small ghost" onclick="showResetCard()">${T("prog_reset_btn")}</button></div></div>`);
}

function exportProgress(){
  const raw = localStorage.getItem("fmva_progress") || "{}";
  const d = new Date();
  const pad = n => String(n).padStart(2, "0");
  const fname = "fmva-progress-" + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + ".json";
  const blob = new Blob([raw], {type: "application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = fname;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
function importProgress(){
  const inp = document.getElementById("restorefile");
  const out = document.getElementById("restoreout");
  if (!inp || !inp.files || !inp.files[0]) { out.innerHTML = `<div class="callout">${T("prog_need_file")}</div>`; return; }
  const rd = new FileReader();
  rd.onload = e => {
    try {
      const obj = JSON.parse(e.target.result);
      if (!obj || typeof obj !== "object" || Array.isArray(obj)) throw new Error("bukan objek");
      ["lesson", "quiz", "hellQuiz", "mistakes", "checker", "mission"].forEach(k => {
        if (obj[k] !== undefined && (typeof obj[k] !== "object" || obj[k] === null)) throw new Error(k);
      });
      localStorage.setItem("fmva_progress", JSON.stringify(obj));
      out.innerHTML = `<div class="callout">${T("prog_restored")}</div>`;
      setTimeout(route, 600);
    } catch(err) {
      out.innerHTML = `<div class="callout">${T("prog_badfile")}</div>`;
    }
  };
  rd.onerror = () => { out.innerHTML = `<div class="callout">❌ Gagal membaca file dari perangkat.</div>`; };
  rd.readAsText(inp.files[0]);
}
function showResetCard(){
  const w = document.getElementById("resetwrap");
  if (!w) return;
  w.innerHTML = `<div class="callout warn"><b>${T("reset_warn")}</b>
    <ul style="margin:8px 0 0 18px"><li>${T("reset_li1")}</li>
    <li>${T("reset_li2")}</li><li>${T("reset_li3")}</li>
    <li>${T("reset_li4")}</li><li>${T("reset_li5")}</li></ul>
    ${T("reset_no_undo")}</div>
    <div class="btnrow"><button class="btn blue" onclick="exportProgress()">${T("reset_backup_first")}</button>
    <button class="btn ghost" onclick="hideResetCard()">${T("reset_cancel")}</button>
    <button class="btn" style="background:#e5484d;color:#fff" onclick="doResetProgress()">${T("reset_yes")}</button></div>`;
}
function hideResetCard(){
  const w = document.getElementById("resetwrap");
  if (w) w.innerHTML = `<button class="btn small ghost" onclick="showResetCard()">${T("prog_reset_btn")}</button>`;
}
function doResetProgress(){ localStorage.removeItem("fmva_progress"); route(); }

route();
