const tiles = Array.from(document.querySelectorAll('.tile'));
const colorButtons = Array.from(document.querySelectorAll('.color-btn'));
const submitButton = document.getElementById('submit');
const newGameButton = document.getElementById('new-game');
const openWordleButton = document.getElementById('open-wordle');
const errorEl = document.getElementById('error');
const historyEl = document.getElementById('history');
const totalEl = document.getElementById('total');
const patternsEl = document.getElementById('patterns');
const yellowsEl = document.getElementById('yellows');

const STATES = ['b', 'y', 'g'];

function renderChips(containerId, words) {
  const container = document.getElementById(containerId);
  container.replaceChildren();
  for (const word of words) {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = word;
    chip.addEventListener('click', () => fillGuess(word));
    container.appendChild(chip);
  }
}

function fillGuess(word) {
  word.split('').forEach((letter, i) => {
    tiles[i].value = letter;
  });
  tiles[0].focus();
}

function currentGuess() {
  return tiles.map((tile) => tile.value.trim().toLowerCase()).join('');
}

function currentHighlight() {
  return colorButtons.map((button) => button.dataset.state).join('');
}

function resetInputs() {
  tiles.forEach((tile) => {
    tile.value = '';
  });
  colorButtons.forEach((button) => {
    button.dataset.state = 'b';
  });
  tiles[0].focus();
}

function appendHistory(guess, highlight) {
  const item = document.createElement('li');
  guess.split('').forEach((letter, i) => {
    const cell = document.createElement('span');
    cell.dataset.state = highlight[i];
    cell.textContent = letter;
    item.appendChild(cell);
  });
  historyEl.appendChild(item);
}

async function submitGuess() {
  errorEl.textContent = '';
  const guess = currentGuess();
  if (!/^[a-z]{5}$/.test(guess)) {
    errorEl.textContent = 'Enter a 5 letter guess.';
    return;
  }

  const result = await window.solver.submitGuess(guess, currentHighlight());

  appendHistory(result.guess, result.highlight);
  renderChips('letter-score', result.suggestions.letterScore);
  renderChips('position-weight', result.suggestions.positionWeight);
  renderChips('matches', result.matches);
  totalEl.textContent = String(result.total);
  patternsEl.textContent = `Patterns: ${result.patterns.join(' ')}`;
  yellowsEl.textContent = `Yellows: ${result.yellows.join(', ') || 'none'}`;

  if (result.total === 1) {
    errorEl.textContent = `Solved: ${result.matches[0]}`;
  } else if (result.total === 0) {
    errorEl.textContent = 'No matching words left — check the colors entered.';
  }

  resetInputs();
}

async function newGame() {
  const state = await window.solver.reset();
  historyEl.replaceChildren();
  renderChips('initial', state.initialSuggestions);
  renderChips('letter-score', []);
  renderChips('position-weight', []);
  renderChips('matches', []);
  totalEl.textContent = String(state.totalWords);
  patternsEl.textContent = '';
  yellowsEl.textContent = '';
  errorEl.textContent = '';
  resetInputs();
}

tiles.forEach((tile, index) => {
  tile.addEventListener('input', () => {
    tile.value = tile.value.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (tile.value && index < tiles.length - 1) {
      tiles[index + 1].focus();
    }
  });
  tile.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace' && !tile.value && index > 0) {
      tiles[index - 1].focus();
    }
    if (event.key === 'Enter') {
      submitGuess();
    }
  });
});

colorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const next = (STATES.indexOf(button.dataset.state) + 1) % STATES.length;
    button.dataset.state = STATES[next];
  });
});

submitButton.addEventListener('click', submitGuess);
newGameButton.addEventListener('click', newGame);
openWordleButton.addEventListener('click', () => window.solver.openWordle());

newGame();
