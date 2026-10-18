import { createSolverSession, applyGuess } from './solver/wordleHelper.js';
import { makeInitial } from './solver/recommendations.js';
import { get as getDictionaryWords } from './solver/wordleDictionary.js';

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;
const CLUE_CYCLE = ['b', 'y', 'g'];

let sessionStack = [];
let session = createSolverSession();
let currentGuess = '';
let currentHighlights = Array(WORD_LENGTH).fill('b');
let matchFilterQuery = '';

// DOM Elements
const boardEl = document.getElementById('board');
const keyboardEl = document.getElementById('keyboard');
const statusBannerEl = document.getElementById('status-banner');
const remainingCountEl = document.getElementById('remaining-count');
const matchesHeaderCountEl = document.getElementById('matches-header-count');
const turnCountEl = document.getElementById('turn-count');
const yellowsDisplayEl = document.getElementById('yellows-display');
const initialSuggestionsEl = document.getElementById('initial-suggestions');
const positionSuggestionsEl = document.getElementById('position-suggestions');
const letterSuggestionsEl = document.getElementById('letter-suggestions');
const possibleMatchesEl = document.getElementById('possible-matches');
const slotPatternsEl = document.getElementById('slot-patterns');
const submitRowBtn = document.getElementById('submit-row-btn');
const clearRowBtn = document.getElementById('clear-row-btn');
const undoBtn = document.getElementById('undo-btn');
const resetBtn = document.getElementById('reset-btn');
const shuffleInitialBtn = document.getElementById('shuffle-initial-btn');
const matchFilterInput = document.getElementById('match-filter-input');

function getClueClass(code) {
  if (code === 'g') return 'correct';
  if (code === 'y') return 'present';
  return 'absent';
}

function getClueLabel(code) {
  if (code === 'g') return 'G';
  if (code === 'y') return 'Y';
  return 'B';
}

function isSolved() {
  const lastTurn = session.history[session.history.length - 1];
  return Boolean(lastTurn && lastTurn.highlight === 'ggggg');
}

function isGameOver() {
  return isSolved() || session.history.length >= MAX_GUESSES;
}

function selectWordForCurrentRow(word) {
  if (isGameOver()) return;
  currentGuess = word.toLowerCase().slice(0, WORD_LENGTH);
  // Pre-fill green positions if slot pattern is already locked to a single character
  currentHighlights = session.patterns.map((pattern, idx) =>
    pattern.length === 1 && pattern === currentGuess[idx] ? 'g' : 'b'
  );
  renderAll();
}

function cycleTileHighlight(index) {
  if (isGameOver() || index >= currentGuess.length) return;
  const currentCode = currentHighlights[index] || 'b';
  const nextIndex = (CLUE_CYCLE.indexOf(currentCode) + 1) % CLUE_CYCLE.length;
  currentHighlights[index] = CLUE_CYCLE[nextIndex];
  renderAll();
}

function submitCurrentRow() {
  if (isGameOver() || currentGuess.length !== WORD_LENGTH) return;

  sessionStack.push(session);
  session = applyGuess(session, currentGuess, currentHighlights);
  currentGuess = '';
  currentHighlights = Array(WORD_LENGTH).fill('b');
  renderAll();
}

function undoLastRow() {
  if (sessionStack.length === 0) return;
  const lastTurn = session.history[session.history.length - 1];
  session = sessionStack.pop();
  if (lastTurn) {
    currentGuess = lastTurn.guess;
    currentHighlights = lastTurn.highlight.split('');
  }
  renderAll();
}

function resetSolver() {
  sessionStack = [];
  session = createSolverSession();
  currentGuess = '';
  currentHighlights = Array(WORD_LENGTH).fill('b');
  matchFilterQuery = '';
  matchFilterInput.value = '';
  renderAll();
}

function handleKeyInput(key) {
  if (isGameOver()) return;

  if (key === 'Enter') {
    if (currentGuess.length === WORD_LENGTH) {
      submitCurrentRow();
    }
    return;
  }

  if (key === 'Backspace') {
    if (currentGuess.length > 0) {
      currentGuess = currentGuess.slice(0, -1);
      renderAll();
    }
    return;
  }

  if (/^[a-z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
    const nextIndex = currentGuess.length;
    currentGuess += key;
    if (session.patterns[nextIndex].length === 1 && session.patterns[nextIndex] === key) {
      currentHighlights[nextIndex] = 'g';
    } else {
      currentHighlights[nextIndex] = 'b';
    }
    renderAll();
  }
}

function renderBoard() {
  boardEl.innerHTML = '';

  for (let rowIdx = 0; rowIdx < MAX_GUESSES; rowIdx++) {
    const rowEl = document.createElement('div');
    rowEl.className = 'board-row';

    const historyEntry = session.history[rowIdx];
    const isActiveRow = rowIdx === session.history.length && !isGameOver();

    for (let colIdx = 0; colIdx < WORD_LENGTH; colIdx++) {
      const tileEl = document.createElement('div');
      tileEl.className = 'tile';

      if (historyEntry) {
        const letter = historyEntry.guess[colIdx];
        const clue = historyEntry.highlight[colIdx];
        tileEl.classList.add('filled', getClueClass(clue));
        tileEl.textContent = letter;
      } else if (isActiveRow) {
        const letter = currentGuess[colIdx] || '';
        if (letter) {
          const clue = currentHighlights[colIdx] || 'b';
          tileEl.classList.add('filled', 'editable', getClueClass(clue));
          tileEl.textContent = letter;

          const hintEl = document.createElement('span');
          hintEl.className = 'tile-hint';
          hintEl.textContent = getClueLabel(clue);
          tileEl.appendChild(hintEl);

          tileEl.title = 'Click to cycle Gray (B) → Yellow (Y) → Green (G)';
          tileEl.addEventListener('click', () => cycleTileHighlight(colIdx));
        }
      }

      rowEl.appendChild(tileEl);
    }

    boardEl.appendChild(rowEl);
  }
}

function computeKeyboardLetterStates() {
  const states = {};
  const priority = { b: 1, y: 2, g: 3 };

  for (const turn of session.history) {
    for (let i = 0; i < WORD_LENGTH; i++) {
      const letter = turn.guess[i];
      const clue = turn.highlight[i];
      if (!states[letter] || priority[clue] > priority[states[letter]]) {
        states[letter] = clue;
      }
    }
  }
  return states;
}

function renderKeyboard() {
  keyboardEl.innerHTML = '';
  const letterStates = computeKeyboardLetterStates();
  const rows = [
    'qwertyuiop'.split(''),
    'asdfghjkl'.split(''),
    ['Enter', ...'zxcvbnm'.split(''), 'Backspace'],
  ];

  for (const row of rows) {
    const rowEl = document.createElement('div');
    rowEl.className = 'keyboard-row';

    for (const key of row) {
      const btn = document.createElement('button');
      btn.className = 'key';
      if (key === 'Enter' || key === 'Backspace') {
        btn.classList.add('wide');
      } else if (letterStates[key]) {
        btn.classList.add(getClueClass(letterStates[key]));
      }

      btn.textContent = key === 'Backspace' ? '⌫' : key;
      btn.addEventListener('click', () => handleKeyInput(key));
      rowEl.appendChild(btn);
    }

    keyboardEl.appendChild(rowEl);
  }
}

function renderWordChipList(containerEl, words, highlightFirst = false, maxDisplay = 250) {
  containerEl.innerHTML = '';
  if (!words || words.length === 0) {
    const empty = document.createElement('span');
    empty.className = 'empty-message';
    empty.textContent = 'No matching words';
    containerEl.appendChild(empty);
    return;
  }

  const slice = words.slice(0, maxDisplay);
  slice.forEach((word, index) => {
    const chip = document.createElement('button');
    chip.className = 'word-chip';
    if (highlightFirst && index === 0) {
      chip.classList.add('top-pick');
    }
    chip.textContent = word;
    chip.title = `Click to fill "${word.toUpperCase()}" in current row`;
    chip.addEventListener('click', () => selectWordForCurrentRow(word));
    containerEl.appendChild(chip);
  });

  if (words.length > maxDisplay) {
    const more = document.createElement('span');
    more.className = 'empty-message';
    more.textContent = `+${words.length - maxDisplay} more (use filter above)`;
    containerEl.appendChild(more);
  }
}

function renderSlotPatterns() {
  slotPatternsEl.innerHTML = '';
  session.patterns.forEach((pattern, index) => {
    const box = document.createElement('div');
    box.className = 'slot-box';
    const isLocked = pattern.length === 1;
    if (isLocked) {
      box.classList.add('locked');
    }

    const title = document.createElement('span');
    title.className = 'slot-title';
    title.textContent = `Slot ${index + 1}`;

    const val = document.createElement('span');
    val.className = 'slot-value';
    if (isLocked) {
      val.textContent = `Locked: ${pattern.toUpperCase()}`;
    } else {
      const inner = pattern.replace(/^\[|\]$/g, '');
      val.textContent = inner.length === 26 ? 'a-z (all 26)' : `${inner} (${inner.length})`;
    }

    box.appendChild(title);
    box.appendChild(val);
    slotPatternsEl.appendChild(box);
  });
}

function renderStatusAndControls() {
  submitRowBtn.disabled = isGameOver() || currentGuess.length !== WORD_LENGTH;
  clearRowBtn.disabled = isGameOver() || currentGuess.length === 0;
  undoBtn.disabled = sessionStack.length === 0;

  remainingCountEl.textContent = String(session.words.length);
  matchesHeaderCountEl.textContent = String(session.words.length);
  turnCountEl.textContent = `${session.history.length} / ${MAX_GUESSES}`;

  const yellowsList = Array.from(session.yellows);
  yellowsDisplayEl.textContent =
    yellowsList.length > 0 ? yellowsList.join(', ').toUpperCase() : 'None';

  statusBannerEl.className = 'status-banner';
  if (isSolved()) {
    const winningWord = session.history[session.history.length - 1].guess.toUpperCase();
    statusBannerEl.classList.add('solved');
    statusBannerEl.innerHTML = `Solved! Target word <strong>${winningWord}</strong> found in ${session.history.length} ${
      session.history.length === 1 ? 'guess' : 'guesses'
    }.`;
  } else if (session.words.length === 1) {
    const onlyMatch = session.words[0];
    statusBannerEl.classList.add('solved');
    statusBannerEl.innerHTML = `Only <strong>1</strong> possible match left: <strong>${onlyMatch.toUpperCase()}</strong>! Click it to fill the row.`;
  } else if (session.words.length === 0) {
    statusBannerEl.classList.add('warning');
    statusBannerEl.innerHTML =
      'No words match the entered clues. Use <strong>Undo Row</strong> or <strong>Reset Solver</strong> to fix highlights.';
  } else if (currentGuess.length === WORD_LENGTH) {
    statusBannerEl.innerHTML =
      'Click any letter tile in the current row to set its color (<strong>Gray / Yellow / Green</strong>), then press <strong>Enter</strong>.';
  } else {
    statusBannerEl.innerHTML =
      'Type a 5-letter guess (or click any recommended word on the right), set tile colors, and press <strong>Enter</strong>.';
  }
}

function renderAll() {
  renderBoard();
  renderKeyboard();
  renderStatusAndControls();
  renderWordChipList(initialSuggestionsEl, session.initialSuggestions, true);
  renderWordChipList(positionSuggestionsEl, session.positionWeightSuggestions, true);
  renderWordChipList(letterSuggestionsEl, session.letterScoreSuggestions, true);

  const filteredMatches = matchFilterQuery
    ? session.words.filter((w) => w.includes(matchFilterQuery))
    : session.words;
  renderWordChipList(possibleMatchesEl, filteredMatches, session.words.length === 1);
  renderSlotPatterns();
}

// Event Listeners
document.addEventListener('keydown', (event) => {
  if (document.activeElement === matchFilterInput) return;

  if (event.key === 'Enter' || event.key === 'Backspace') {
    event.preventDefault();
    handleKeyInput(event.key);
  } else if (/^[a-zA-Z]$/.test(event.key) && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault();
    handleKeyInput(event.key.toLowerCase());
  }
});

submitRowBtn.addEventListener('click', submitCurrentRow);
clearRowBtn.addEventListener('click', () => {
  currentGuess = '';
  currentHighlights = Array(WORD_LENGTH).fill('b');
  renderAll();
});
undoBtn.addEventListener('click', undoLastRow);
resetBtn.addEventListener('click', resetSolver);
shuffleInitialBtn.addEventListener('click', () => {
  session.initialSuggestions = makeInitial(getDictionaryWords());
  renderWordChipList(initialSuggestionsEl, session.initialSuggestions, true);
});
matchFilterInput.addEventListener('input', (e) => {
  matchFilterQuery = e.target.value.toLowerCase().trim();
  const filteredMatches = matchFilterQuery
    ? session.words.filter((w) => w.includes(matchFilterQuery))
    : session.words;
  renderWordChipList(possibleMatchesEl, filteredMatches, session.words.length === 1);
});

// Initial render
renderAll();

