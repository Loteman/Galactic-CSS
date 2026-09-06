
/* ---------------- Level configuration ---------------- */

const PROPERTY_META = {
  flexDirection: {
    label: 'Flex Direction',
    cssProp: 'flex-direction',
    options: ['row', 'row-reverse', 'column', 'column-reverse']
  },
  justifyContent: {
    label: 'Justify Content',
    cssProp: 'justify-content',
    options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']
  },
  alignItems: {
    label: 'Align Items',
    cssProp: 'align-items',
    options: ['flex-start', 'flex-end', 'center', 'stretch']
  },
  flexWrap: {
    label: 'Flex Wrap',
    cssProp: 'flex-wrap',
    options: ['nowrap', 'wrap', 'wrap-reverse']
  }
};

const LEVELS = [
  {
    id: 1,
    title: 'Right Alignment',
    itemCount: 5,
    base: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'nowrap' },
    controls: ['justifyContent'],
    target: { justifyContent: 'flex-end' },
    instruction: 'Mission Control needs the rocket squadron pushed to the far RIGHT (end) of the docking bay, lined up in a single row.',
    hint: 'You need the property that positions items along the main axis. Try the value that means "end".'
  },
  {
    id: 2,
    title: 'Touch Down',
    itemCount: 5,
    base: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'nowrap' },
    controls: ['alignItems'],
    target: { alignItems: 'flex-end' },
    instruction: 'The rockets are floating too high! Align the whole squadron to the BOTTOM of the docking bay.',
    hint: 'This time you need to control the cross axis, not the main axis.'
  },
  {
    id: 3,
    title: 'Vertical Launch',
    itemCount: 4,
    base: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'nowrap' },
    controls: ['flexDirection'],
    target: { flexDirection: 'column' },
    instruction: 'Time for a vertical launch sequence — stack the rockets in a single column, from TOP to BOTTOM.',
    hint: 'Change the direction of the main axis itself.'
  },
  {
    id: 4,
    title: 'Even Spacing',
    itemCount: 6,
    base: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'nowrap' },
    controls: ['justifyContent'],
    target: { justifyContent: 'space-between' },
    instruction: 'Reinforcements arrived! Spread all rockets evenly across the bay so there is equal space BETWEEN each rocket, with no gap before the first or after the last.',
    hint: 'One justify-content value places space only between items, none at the edges.'
  },
  {
    id: 5,
    title: 'Grounded Column',
    itemCount: 5,
    base: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'nowrap' },
    controls: ['flexDirection', 'justifyContent', 'alignItems'],
    target: { flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' },
    instruction: 'Complex maneuver: stack the rockets in a COLUMN, keep the formation horizontally CENTERED, and push the whole group to the BOTTOM of the bay.',
    hint: 'Set the direction to a column first — that changes which property controls "bottom" and which controls "centered".'
  },
  {
    id: 6,
    title: 'Fleet Overflow',
    itemCount: 10,
    base: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'nowrap' },
    controls: ['flexWrap', 'justifyContent'],
    target: { flexWrap: 'wrap', justifyContent: 'center' },
    instruction: 'Too many rockets for one row! Enable wrapping so the fleet flows onto multiple rows, and CENTER the rockets horizontally within the bay.',
    hint: 'By default flex items refuse to wrap onto new lines — there is a property that turns that on.'
  },
  {
    id: 7,
    title: 'Dead Center',
    itemCount: 5,
    base: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'nowrap' },
    controls: ['justifyContent', 'alignItems'],
    target: { justifyContent: 'center', alignItems: 'center' },
    instruction: 'Perfect symmetry required — center the fleet both HORIZONTALLY and VERTICALLY in the middle of the bay.',
    hint: 'You will need both the main-axis and the cross-axis centering properties together.'
  },
  {
    id: 8,
    title: 'Final Countdown (Bonus)',
    itemCount: 9,
    base: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'nowrap' },
    controls: ['flexDirection', 'flexWrap', 'justifyContent'],
    target: { flexDirection: 'column-reverse', flexWrap: 'wrap', justifyContent: 'space-evenly' },
    instruction: 'BONUS — Final Countdown: launch in REVERSE column order, WRAP the overflowing columns, and spread those columns EVENLY across the bay.',
    hint: 'Reverse column direction, allow wrapping, then pick the justify-content value that evenly spaces columns including the outer edges.'
  }
];

const STORAGE_KEY = 'galacticDockingBay.progress.v1';



/* ---------------- Navigation ---------------- */

function goNext() {
  const nextIndex = state.currentIndex + 1;
  if (nextIndex < LEVELS.length && nextIndex < getUnlockedCount()) {
    loadLevel(nextIndex);
  }
}

function goPrev() {
  const prevIndex = state.currentIndex - 1;
  if (prevIndex >= 0) {
    loadLevel(prevIndex);
  }
}

function resetAllProgress() {
  const confirmed = window.confirm(
    'This will permanently erase ALL saved progress, scores, and stars for every level. Continue?'
  );
  if (!confirmed) return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Could not clear saved progress.', e);
  }

  state = { currentIndex: 0, completed: {}, scores: {}, attempts: {}, stars: {}, summaryShown: false };
  loadLevel(0);
}

/* ---------------- Mission summary overlay ---------------- */

const CONFETTI_EMOJI = ['⭐', '🚀', '✨', '🪐'];

function spawnConfetti() {
  els.confettiLayer.innerHTML = '';
  const pieceCount = 28;

  for (let i = 0; i < pieceCount; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.textContent = CONFETTI_EMOJI[Math.floor(Math.random() * CONFETTI_EMOJI.length)];
    piece.style.left = Math.random() * 100 + '%';
    piece.style.animationDuration = (3 + Math.random() * 3) + 's';
    piece.style.animationDelay = (Math.random() * 3) + 's';
    piece.style.fontSize = (14 + Math.random() * 14) + 'px';
    els.confettiLayer.appendChild(piece);
  }
}

function showSummaryOverlay() {
  const totalScore = Object.values(state.scores).reduce((sum, s) => sum + s, 0);
  const totalStars = Object.values(state.stars).reduce((sum, s) => sum + s, 0);
  const maxStars = LEVELS.length * 3;

  els.summaryTagline.textContent = 'Every docking bay in the sector has been mastered.';
  els.summaryScore.textContent = String(totalScore);
  els.summaryStars.textContent = totalStars + ' / ' + maxStars;

  els.summaryTbody.innerHTML = '';
  LEVELS.forEach((level) => {
    const row = document.createElement('tr');
    const attempts = state.attempts[level.id] || 0;
    const score = state.scores[level.id] || 0;
    const stars = state.stars[level.id] || 0;

    row.innerHTML =
      '<td>' + level.title + '</td>' +
      '<td>' + attempts + '</td>' +
      '<td>' + score + '</td>' +
      '<td class="table-stars">' + '★'.repeat(stars) + '☆'.repeat(3 - stars) + '</td>';

    els.summaryTbody.appendChild(row);
  });

  spawnConfetti();
  els.summaryOverlay.hidden = false;
}

function hideSummaryOverlay() {
  els.summaryOverlay.hidden = true;
  els.confettiLayer.innerHTML = '';
}

/* ---------------- State ---------------- */

let state = {
  currentIndex: 0,
  completed: {},   // { [levelId]: true }
  scores: {},      // { [levelId]: number }
  attempts: {},    // { [levelId]: totalAttemptsEver }
  stars: {},       // { [levelId]: 1|2|3 }
  summaryShown: false
};

function computeStars(attemptsTaken) {
  if (attemptsTaken <= 1) return 3;
  if (attemptsTaken <= 3) return 2;
  return 1;
}

let currentValues = {}; // live property values for the level being played
let sessionAttempts = 0; // attempts made on the current level since it was loaded
let hintLevel = 0; // 0 = no hint shown yet, 1 = soft hint, 2+ = strong (reveal) hint

/* ---------------- Persistence ---------------- */

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save progress to localStorage.', e);
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = Object.assign(state, parsed);
    }
  } catch (e) {
    console.warn('Could not load saved progress.', e);
  }
}

function getUnlockedCount() {
  const completedCount = Object.keys(state.completed).length;
  return Math.min(completedCount + 1, LEVELS.length);
}


/* ---------------- DOM references ---------------- */

const els = {
  levelIndicator: document.getElementById('level-indicator'),
  levelDots: document.getElementById('level-dots'),
  progressTrack: document.getElementById('progress-track'),
  progressFill: document.getElementById('progress-fill'),
  instructionText: document.getElementById('instruction-text'),
  feedback: document.getElementById('feedback'),
  board: document.getElementById('game-board'),
  controlPanel: document.getElementById('control-panel'),
  liveCss: document.getElementById('live-css'),
  checkBtn: document.getElementById('check-btn'),
  resetBtn: document.getElementById('reset-btn'),
  hintBtn: document.getElementById('hint-btn'),
  prevBtn: document.getElementById('prev-btn'),
  nextBtn: document.getElementById('next-btn'),
  scoreDisplay: document.getElementById('score-display'),
  attemptsDisplay: document.getElementById('attempts-display'),
  resetAllBtn: document.getElementById('reset-all-btn'),
  summaryOverlay: document.getElementById('summary-overlay'),
  summaryTagline: document.getElementById('summary-tagline'),
  summaryScore: document.getElementById('summary-score'),
  summaryStars: document.getElementById('summary-stars'),
  summaryTbody: document.getElementById('summary-tbody'),
  summaryCloseBtn: document.getElementById('summary-close-btn'),
  confettiLayer: document.getElementById('confetti-layer')
};

/* ---------------- Rendering ---------------- */

function renderProgressBar() {
  const completedCount = Object.keys(state.completed).length;
  const percent = Math.round((completedCount / LEVELS.length) * 100);
  els.progressFill.style.width = percent + '%';
  els.progressTrack.setAttribute('aria-valuenow', String(percent));
}

function renderLevelDots() {
  els.levelDots.innerHTML = '';
  renderProgressBar();
  const unlockedCount = getUnlockedCount();

  LEVELS.forEach((level, idx) => {
    const dot = document.createElement('button');
    dot.className = 'level-dot';
    dot.type = 'button';

    const isUnlocked = idx < unlockedCount;
    const isCompleted = !!state.completed[level.id];
    const isCurrent = idx === state.currentIndex;
    const stars = state.stars[level.id] || 0;

    dot.innerHTML = '<span class="dot-number">' + (idx + 1) + '</span>' +
      (isCompleted ? '<span class="dot-stars">' + '★'.repeat(stars) + '</span>' : '');

    dot.setAttribute('aria-label', 'Level ' + (idx + 1) + ': ' + level.title +
      (isCompleted ? ', ' + stars + ' out of 3 stars' : ''));

    if (isCompleted) dot.classList.add('completed');
    if (isCurrent) dot.classList.add('current');
    if (isUnlocked) {
      dot.classList.add('unlocked');
      dot.addEventListener('click', () => goToLevel(idx));
    } else {
      dot.disabled = true;
    }

    els.levelDots.appendChild(dot);
  });
}

function renderBoard(level) {
  els.board.innerHTML = '';
  applyBoardStyles();

  for (let i = 1; i <= level.itemCount; i++) {
    const item = document.createElement('div');
    item.className = 'rocket-item';
    item.innerHTML = '🚀<span class="rocket-label">R' + i + '</span>';
    els.board.appendChild(item);
  }
}

function applyBoardStyles() {
  els.board.style.flexDirection = currentValues.flexDirection;
  els.board.style.justifyContent = currentValues.justifyContent;
  els.board.style.alignItems = currentValues.alignItems;
  els.board.style.flexWrap = currentValues.flexWrap;
  renderLiveCss();
}

function renderLiveCss() {
  const lines = [
    ['display', 'flex'],
    ['flex-direction', currentValues.flexDirection],
    ['justify-content', currentValues.justifyContent],
    ['align-items', currentValues.alignItems],
    ['flex-wrap', currentValues.flexWrap]
  ];

  let html = '<span class="css-selector">.docking-bay</span> <span class="css-punct">{</span>\n';
  lines.forEach(([prop, value]) => {
    html += '  <span class="css-prop">' + prop + '</span><span class="css-punct">:</span> ' +
      '<span class="css-value">' + value + '</span><span class="css-punct">;</span>\n';
  });
  html += '<span class="css-punct">}</span>';

  els.liveCss.innerHTML = html;
}

function renderControls(level) {
  els.controlPanel.innerHTML = '';

  level.controls.forEach((propKey) => {
    const meta = PROPERTY_META[propKey];

    const group = document.createElement('div');
    group.className = 'control-group';

    const label = document.createElement('label');
    const selectId = 'control-' + propKey;
    label.setAttribute('for', selectId);
    label.textContent = meta.label;

    const select = document.createElement('select');
    select.id = selectId;
    select.dataset.prop = propKey;

    meta.options.forEach((optionValue) => {
      const opt = document.createElement('option');
      opt.value = optionValue;
      opt.textContent = optionValue;
      select.appendChild(opt);
    });

    select.value = currentValues[propKey];

    select.addEventListener('change', (e) => {
      currentValues[propKey] = e.target.value;
      applyBoardStyles();
    });

    group.appendChild(label);
    group.appendChild(select);
    els.controlPanel.appendChild(group);
  });
}

function renderStats(level) {
  const totalScore = Object.values(state.scores).reduce((sum, s) => sum + s, 0);
  els.scoreDisplay.textContent = '🏆 Score: ' + totalScore;
  els.attemptsDisplay.textContent = '🎯 Attempts this level: ' + sessionAttempts;
}

function renderNavButtons() {
  els.prevBtn.disabled = state.currentIndex === 0;
  els.nextBtn.disabled = state.currentIndex >= getUnlockedCount() - 1;
}

function clearFeedback() {
  els.feedback.textContent = '';
  els.feedback.className = 'feedback';
}

function showFeedback(message, type) {
  els.feedback.textContent = message;
  els.feedback.className = 'feedback ' + type;
}

/* ---------------- Level lifecycle ---------------- */

function loadLevel(index) {
  state.currentIndex = index;
  const level = LEVELS[index];

  currentValues = Object.assign({}, level.base);
  sessionAttempts = 0;
  hintLevel = 0;

  els.levelIndicator.textContent = 'Level ' + (index + 1) + ' of ' + LEVELS.length + ' — ' + level.title;
  els.instructionText.textContent = level.instruction;
  clearFeedback();

  renderBoard(level);
  renderControls(level);
  renderStats(level);
  renderLevelDots();
  renderNavButtons();

  saveState();
}

function goToLevel(index) {
  if (index < 0 || index >= LEVELS.length) return;
  if (index >= getUnlockedCount()) return;
  loadLevel(index);
}

function resetCurrentLevel() {
  const level = LEVELS[state.currentIndex];
  currentValues = Object.assign({}, level.base);
  hintLevel = 0;
  applyBoardStyles();
  renderControls(level);
  clearFeedback();
  els.board.classList.remove('flash-success', 'flash-error');
}


/* ---------------- Init ---------------- */

function init() {
  loadState();

  const startIndex = Math.min(state.currentIndex || 0, getUnlockedCount() - 1);

  els.checkBtn.addEventListener('click', checkSolution);
  els.resetBtn.addEventListener('click', resetCurrentLevel);
  els.hintBtn.addEventListener('click', showHint);
  els.prevBtn.addEventListener('click', goPrev);
  els.nextBtn.addEventListener('click', goNext);
  els.resetAllBtn.addEventListener('click', resetAllProgress);
  els.summaryCloseBtn.addEventListener('click', hideSummaryOverlay);

  loadLevel(startIndex);
}

document.addEventListener('DOMContentLoaded', init);
