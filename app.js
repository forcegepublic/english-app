// ===== 状态管理 =====
const state = {
  currentPage: 'home',
  currentModule: null,
  questions: [],
  currentIndex: 0,
  score: 0,
  correctCount: 0,
  answered: false,
  speechRate: 0.8,
  dailyGoal: 15
};

// ===== 本地存储 =====
function loadData() {
  return JSON.parse(localStorage.getItem('englishApp') || '{}');
}

function saveData(data) {
  const existing = loadData();
  localStorage.setItem('englishApp', JSON.stringify({ ...existing, ...data }));
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getTodayProgress() {
  const data = loadData();
  return data[getTodayKey()] || { done: 0 };
}

function addTodayProgress(count) {
  const key = getTodayKey();
  const data = loadData();
  const today = data[key] || { done: 0 };
  today.done += count;
  data[key] = today;
  localStorage.setItem('englishApp', JSON.stringify(data));
}

function getStreak() {
  const data = loadData();
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (data[key] && data[key].done > 0) streak++;
    else if (i > 0) break;
  }
  return streak;
}

function getTotalScore() {
  const data = loadData();
  return data.totalScore || 0;
}

function addScore(points) {
  const data = loadData();
  data.totalScore = (data.totalScore || 0) + points;
  localStorage.setItem('englishApp', JSON.stringify(data));
}

function getMistakes() {
  const data = loadData();
  return data.mistakes || [];
}

function addMistake(type, question, correct, userAnswer) {
  const data = loadData();
  const mistakes = data.mistakes || [];
  const existing = mistakes.findIndex(m => m.id === `${type}_${question.id}`);
  const item = { id: `${type}_${question.id}`, type, question, correct, userAnswer, time: Date.now() };
  if (existing >= 0) mistakes[existing] = item;
  else mistakes.unshift(item);
  data.mistakes = mistakes.slice(0, 50);
  localStorage.setItem('englishApp', JSON.stringify(data));
}

// ===== 称号系统 =====
const BADGES = [
  { min: 0, icon: '🌱', name: '英语新苗', desc: '刚开始学习，加油！' },
  { min: 100, icon: '📖', name: '单词学徒', desc: '已积累一定词汇量' },
  { min: 300, icon: '⭐', name: '语法达人', desc: '语法掌握越来越好' },
  { min: 600, icon: '🏆', name: '英语高手', desc: '综合能力出色' },
  { min: 1000, icon: '👑', name: '英语之星', desc: '顶尖水平，继续保持！' }
];

function getBadge(score) {
  let badge = BADGES[0];
  for (const b of BADGES) {
    if (score >= b.min) badge = b;
  }
  return badge;
}

// ===== 页面导航 =====
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  state.currentPage = pageId;
}

// ===== 首页渲染 =====
function renderHome() {
  const today = getTodayProgress();
  const streak = getStreak();
  const totalScore = getTotalScore();
  const badge = getBadge(totalScore);

  document.getElementById('stat-streak').textContent = streak;
  document.getElementById('stat-score').textContent = totalScore;
  document.getElementById('stat-done').textContent = today.done;

  const pct = Math.min(100, Math.round((today.done / state.dailyGoal) * 100));
  document.getElementById('daily-fill').style.width = pct + '%';
  document.getElementById('daily-text').textContent = `${today.done} / ${state.dailyGoal} 题`;

  document.getElementById('badge-icon').textContent = badge.icon;
  document.getElementById('badge-name').textContent = badge.name;
  document.getElementById('badge-desc').textContent = badge.desc;

  showPage('page-home');
}

// ===== 随机抽题 =====
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getRandomQuestions(pool, count) {
  return shuffle(pool).slice(0, count);
}

// ===== 单词模块 =====
function startWords() {
  state.currentModule = 'words';
  state.questions = getRandomQuestions(getMergedPool('words'), 10);
  state.currentIndex = 0;
  state.score = 0;
  state.correctCount = 0;
  document.getElementById('practice-title').textContent = '单词记忆';
  document.getElementById('practice-score-display').textContent = '0分';
  showPage('page-practice');
  renderWordQuestion();
}

function renderWordQuestion() {
  const q = state.questions[state.currentIndex];
  const total = state.questions.length;
  state.answered = false;

  document.getElementById('q-fill').style.width = `${(state.currentIndex / total) * 100}%`;
  document.getElementById('q-progress-text').textContent = `${state.currentIndex + 1}/${total}`;

  // 随机决定题型：中→英 或 英→中
  const mode = Math.random() > 0.5 ? 'zh2en' : 'en2zh';

  document.getElementById('question-emoji').textContent = q.emoji;
  if (mode === 'zh2en') {
    document.getElementById('question-text').textContent = q.zh;
    document.getElementById('question-sub').textContent = '选出对应的英文单词';
  } else {
    document.getElementById('question-text').textContent = q.en;
    document.getElementById('question-sub').textContent = '选出对应的中文意思';
  }

  document.getElementById('tip-box').style.display = 'none';

  // 生成干扰选项
  const others = shuffle(WORDS_DATA.filter(w => w.id !== q.id)).slice(0, 3);
  const allOptions = shuffle([q, ...others]);

  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';
  allOptions.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = mode === 'zh2en' ? opt.en : opt.zh;
    btn.onclick = () => checkWordAnswer(btn, opt.id === q.id, q, mode);
    grid.appendChild(btn);
  });

  hideFeedback();
  document.getElementById('next-btn').classList.remove('show');
}

function checkWordAnswer(btn, isCorrect, q, mode) {
  if (state.answered) return;
  state.answered = true;

  const grid = document.getElementById('options-grid');
  grid.querySelectorAll('.option-btn').forEach(b => {
    b.disabled = true;
    const text = b.textContent;
    const isThisCorrect = mode === 'zh2en' ? text === q.en : text === q.zh;
    if (isThisCorrect) b.classList.add('correct');
  });

  if (isCorrect) {
    btn.classList.add('correct');
    state.score += 10;
    state.correctCount++;
    addScore(10);
    showFeedback(true, `正确！例句：${q.example}`);
  } else {
    btn.classList.add('wrong');
    addMistake('words', q, mode === 'zh2en' ? q.en : q.zh, btn.textContent);
    showFeedback(false, `正确答案：${mode === 'zh2en' ? q.en : q.zh}\n例句：${q.example}`);
  }

  document.getElementById('practice-score-display').textContent = state.score + '分';
  document.getElementById('next-btn').classList.add('show');
}

// ===== 语法模块 =====
function startGrammar() {
  state.currentModule = 'grammar';
  state.questions = getRandomQuestions(getMergedPool('grammar'), 10);
  state.currentIndex = 0;
  state.score = 0;
  state.correctCount = 0;
  document.getElementById('practice-title').textContent = '语法填空';
  document.getElementById('practice-score-display').textContent = '0分';
  showPage('page-practice');
  renderGrammarQuestion();
}

function renderGrammarQuestion() {
  const q = state.questions[state.currentIndex];
  const total = state.questions.length;
  state.answered = false;

  document.getElementById('q-fill').style.width = `${(state.currentIndex / total) * 100}%`;
  document.getElementById('q-progress-text').textContent = `${state.currentIndex + 1}/${total}`;

  document.getElementById('question-emoji').textContent = '📝';
  document.getElementById('question-text').textContent = q.sentence;
  document.getElementById('question-sub').textContent = '选择正确的填空答案';

  const tipBox = document.getElementById('tip-box');
  tipBox.style.display = 'block';
  tipBox.textContent = '💡 ' + q.tip;

  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => checkGrammarAnswer(btn, opt === q.blank, q);
    grid.appendChild(btn);
  });

  hideFeedback();
  document.getElementById('next-btn').classList.remove('show');
}

function checkGrammarAnswer(btn, isCorrect, q) {
  if (state.answered) return;
  state.answered = true;

  document.getElementById('options-grid').querySelectorAll('.option-btn').forEach(b => {
    b.disabled = true;
    if (b.textContent === q.blank) b.classList.add('correct');
  });

  if (isCorrect) {
    btn.classList.add('correct');
    state.score += 10;
    state.correctCount++;
    addScore(10);
    showFeedback(true, q.explanation);
  } else {
    btn.classList.add('wrong');
    addMistake('grammar', q, q.blank, btn.textContent);
    showFeedback(false, `正确答案：${q.blank}\n${q.explanation}`);
  }

  document.getElementById('practice-score-display').textContent = state.score + '分';
  document.getElementById('next-btn').classList.add('show');
}

// ===== 听力模块 =====
function startListening() {
  state.currentModule = 'listening';
  state.questions = getRandomQuestions(getMergedPool('listening'), 10);
  state.currentIndex = 0;
  state.score = 0;
  state.correctCount = 0;
  document.getElementById('practice-title').textContent = '听力练习';
  document.getElementById('practice-score-display').textContent = '0分';
  showPage('page-practice');
  renderListeningQuestion();
}

function renderListeningQuestion() {
  const q = state.questions[state.currentIndex];
  const total = state.questions.length;
  state.answered = false;

  document.getElementById('q-fill').style.width = `${(state.currentIndex / total) * 100}%`;
  document.getElementById('q-progress-text').textContent = `${state.currentIndex + 1}/${total}`;

  document.getElementById('question-emoji').textContent = '🎧';
  document.getElementById('question-text').textContent = '点击播放，选出你听到的句子';
  document.getElementById('question-sub').textContent = q.zh;
  document.getElementById('tip-box').style.display = 'none';

  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';
  grid.style.gridTemplateColumns = '1fr';

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.style.textAlign = 'left';
    btn.onclick = () => checkListeningAnswer(btn, idx === q.correct, q);
    grid.appendChild(btn);
  });

  hideFeedback();
  document.getElementById('next-btn').classList.remove('show');

  // 自动播放
  setTimeout(() => speakText(q.text), 500);
}

function speakText(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = state.speechRate;
  window.speechSynthesis.speak(utter);
}

function checkListeningAnswer(btn, isCorrect, q) {
  if (state.answered) return;
  state.answered = true;

  document.getElementById('options-grid').querySelectorAll('.option-btn').forEach((b, i) => {
    b.disabled = true;
    if (i === q.correct) b.classList.add('correct');
  });

  if (isCorrect) {
    btn.classList.add('correct');
    state.score += 10;
    state.correctCount++;
    addScore(10);
    showFeedback(true, `正确！原文：${q.text}`);
  } else {
    btn.classList.add('wrong');
    addMistake('listening', q, q.options[q.correct], btn.textContent);
    showFeedback(false, `正确答案：${q.options[q.correct]}`);
  }

  document.getElementById('practice-score-display').textContent = state.score + '分';
  document.getElementById('next-btn').classList.add('show');
}

// ===== 下一题 =====
function nextQuestion() {
  state.currentIndex++;
  if (state.currentIndex >= state.questions.length) {
    finishPractice();
    return;
  }

  // 重置听力选项列式
  if (state.currentModule !== 'listening') {
    document.getElementById('options-grid').style.gridTemplateColumns = '1fr 1fr';
  }

  if (state.currentModule === 'words') renderWordQuestion();
  else if (state.currentModule === 'grammar') renderGrammarQuestion();
  else if (state.currentModule === 'listening') renderListeningQuestion();
}

// ===== 完成练习 =====
function finishPractice() {
  const total = state.questions.length;
  addTodayProgress(total);

  const pct = Math.round((state.correctCount / total) * 100);
  let emoji = '😊';
  let title = '不错哦！';
  if (pct >= 90) { emoji = '🎉'; title = '太棒了！'; }
  else if (pct >= 70) { emoji = '👍'; title = '做得好！'; }
  else if (pct < 50) { emoji = '💪'; title = '继续加油！'; }

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-score').textContent = state.score + '分';
  document.getElementById('result-detail').textContent =
    `答对 ${state.correctCount}/${total} 题，正确率 ${pct}%`;

  showPage('page-result');
}

// ===== 反馈显示 =====
function showFeedback(isCorrect, msg) {
  const box = document.getElementById('feedback-box');
  box.className = 'feedback-box show ' + (isCorrect ? 'correct-fb' : 'wrong-fb');
  box.textContent = (isCorrect ? '✅ ' : '❌ ') + msg;
}

function hideFeedback() {
  const box = document.getElementById('feedback-box');
  box.className = 'feedback-box';
  box.textContent = '';
}

// ===== 错题本 =====
function showMistakes() {
  const mistakes = getMistakes();
  const list = document.getElementById('mistakes-list');

  if (mistakes.length === 0) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">🎯</div><p>还没有错题，继续保持！</p></div>`;
  } else {
    list.innerHTML = mistakes.map(m => {
      const typeLabel = { words: '单词', grammar: '语法', listening: '听力' }[m.type] || m.type;
      const qText = m.type === 'words' ? `${m.question.zh} → ${m.question.en}` :
                    m.type === 'grammar' ? m.question.sentence :
                    m.question.text;
      return `<div class="mistake-item">
        <div class="mistake-type">${typeLabel}</div>
        <div class="mistake-q">${qText}</div>
        <div class="mistake-answer">✅ 正确：${m.correct}</div>
        <div class="mistake-wrong">❌ 你选：${m.userAnswer}</div>
      </div>`;
    }).join('');
  }

  showPage('page-mistakes');
}

// ===== 自定义题库（存储在 localStorage） =====
function getCustomData(type) {
  const data = loadData();
  return data['custom_' + type] || [];
}

function saveCustomData(type, arr) {
  const data = loadData();
  data['custom_' + type] = arr;
  localStorage.setItem('englishApp', JSON.stringify(data));
}

// 解析 CSV（支持带引号的字段）
function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/).filter(l => l.trim());
  return lines.map(line => {
    const cols = [];
    let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') { inQ = !inQ; }
      else if (c === ',' && !inQ) { cols.push(cur.trim()); cur = ''; }
      else cur += c;
    }
    cols.push(cur.trim());
    return cols;
  });
}

// 导入单词 CSV：en,zh,emoji,example
function importWordsCSV(text) {
  const rows = parseCSV(text);
  const header = rows[0].map(h => h.toLowerCase());
  const enIdx = header.indexOf('en');
  const zhIdx = header.indexOf('zh');
  const emojiIdx = header.indexOf('emoji');
  const exIdx = header.indexOf('example');
  if (enIdx < 0 || zhIdx < 0) return { ok: false, msg: '缺少 en 或 zh 列' };

  const items = rows.slice(1).filter(r => r[enIdx] && r[zhIdx]).map((r, i) => ({
    id: 10000 + i,
    en: r[enIdx], zh: r[zhIdx],
    emoji: emojiIdx >= 0 ? (r[emojiIdx] || '📝') : '📝',
    example: exIdx >= 0 ? (r[exIdx] || '') : ''
  }));
  if (!items.length) return { ok: false, msg: '没有有效数据行' };
  saveCustomData('words', items);
  return { ok: true, msg: `成功导入 ${items.length} 个单词` };
}

// 导入语法 CSV：sentence,blank,options(用|分隔),tip,explanation
function importGrammarCSV(text) {
  const rows = parseCSV(text);
  const header = rows[0].map(h => h.toLowerCase());
  const sIdx = header.indexOf('sentence');
  const bIdx = header.indexOf('blank');
  const oIdx = header.indexOf('options');
  const tIdx = header.indexOf('tip');
  const eIdx = header.indexOf('explanation');
  if (sIdx < 0 || bIdx < 0 || oIdx < 0) return { ok: false, msg: '缺少 sentence/blank/options 列' };

  const items = rows.slice(1).filter(r => r[sIdx] && r[bIdx]).map((r, i) => ({
    id: 10000 + i,
    sentence: r[sIdx], blank: r[bIdx],
    options: r[oIdx].split('|').map(o => o.trim()),
    tip: tIdx >= 0 ? (r[tIdx] || '') : '',
    explanation: eIdx >= 0 ? (r[eIdx] || '') : ''
  }));
  if (!items.length) return { ok: false, msg: '没有有效数据行' };
  saveCustomData('grammar', items);
  return { ok: true, msg: `成功导入 ${items.length} 道语法题` };
}

// 导入听力 CSV：text,zh,options(用|分隔),correct(0-3)
function importListeningCSV(text) {
  const rows = parseCSV(text);
  const header = rows[0].map(h => h.toLowerCase());
  const tIdx = header.indexOf('text');
  const zIdx = header.indexOf('zh');
  const oIdx = header.indexOf('options');
  const cIdx = header.indexOf('correct');
  if (tIdx < 0 || oIdx < 0 || cIdx < 0) return { ok: false, msg: '缺少 text/options/correct 列' };

  const items = rows.slice(1).filter(r => r[tIdx]).map((r, i) => ({
    id: 10000 + i,
    text: r[tIdx], zh: zIdx >= 0 ? (r[zIdx] || '') : '',
    options: r[oIdx].split('|').map(o => o.trim()),
    correct: parseInt(r[cIdx]) || 0
  }));
  if (!items.length) return { ok: false, msg: '没有有效数据行' };
  saveCustomData('listening', items);
  return { ok: true, msg: `成功导入 ${items.length} 道听力题` };
}

// 处理文件上传
function handleImportFile(file, type) {
  const reader = new FileReader();
  reader.onload = e => {
    const text = e.target.result;
    let result;
    if (type === 'words') result = importWordsCSV(text);
    else if (type === 'grammar') result = importGrammarCSV(text);
    else result = importListeningCSV(text);

    const msgEl = document.getElementById('import-msg');
    msgEl.textContent = result.msg;
    msgEl.style.color = result.ok ? '#2e7d32' : '#c62828';
    if (result.ok) updateModuleCounts();
  };
  reader.readAsText(file, 'UTF-8');
}

// 更新首页题库数量显示
function updateModuleCounts() {
  const wCustom = getCustomData('words');
  const gCustom = getCustomData('grammar');
  const lCustom = getCustomData('listening');
  const wTotal = WORDS_DATA.length + wCustom.length;
  const gTotal = GRAMMAR_DATA.length + gCustom.length;
  const lTotal = LISTENING_DATA.length + lCustom.length;
  const counts = document.querySelectorAll('.module-count');
  if (counts[0]) counts[0].textContent = `题库：${wTotal} 个单词`;
  if (counts[1]) counts[1].textContent = `题库：${gTotal} 道语法题`;
  if (counts[2]) counts[2].textContent = `题库：${lTotal} 个句子`;
}

// 合并内置+自定义题库
function getMergedPool(type) {
  const custom = getCustomData(type);
  if (type === 'words') return [...WORDS_DATA, ...custom];
  if (type === 'grammar') return [...GRAMMAR_DATA, ...custom];
  return [...LISTENING_DATA, ...custom];
}

// 显示导入页
function showImport() {
  document.getElementById('import-msg').textContent = '';
  document.getElementById('import-words-file').value = '';
  document.getElementById('import-grammar-file').value = '';
  document.getElementById('import-listening-file').value = '';
  showPage('page-import');
}

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
  renderHome();
  updateModuleCounts();

  // 速度切换
  document.querySelectorAll('.speed-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.speechRate = parseFloat(btn.dataset.rate);
    };
  });
});
