export const INITIAL_PATTERN_SLOT = '[abcdefghijklmnopqrstuvwxyz]';

export function createInitialPatterns() {
  return [
    INITIAL_PATTERN_SLOT,
    INITIAL_PATTERN_SLOT,
    INITIAL_PATTERN_SLOT,
    INITIAL_PATTERN_SLOT,
    INITIAL_PATTERN_SLOT,
  ];
}

export function updateArrsWithGuesses(patternArr, yellows, guess, highlight) {
  const guessChars = typeof guess === 'string' ? guess.split('') : Array.from(guess);
  const highlightChars = typeof highlight === 'string' ? highlight.split('') : Array.from(highlight);

  let i = 0;
  while (i < 5) {
    const letter = guessChars[i];
    const mark = highlightChars[i];

    if (mark === 'b') {
      for (let j = 0; j < patternArr.length; j++) {
        if (patternArr[j].length > 1) {
          patternArr[j] = patternArr[j].replace(letter, '');
        }
      }
    } else if (mark === 'y') {
      patternArr[i] = patternArr[i].replace(letter, '');
      yellows.add(letter);
    } else if (mark === 'g') {
      patternArr[i] = letter;
      const occurrencesInGuess = guessChars.filter((c) => c === letter).length;
      if (yellows.has(letter) && occurrencesInGuess === 1) {
        yellows.delete(letter);
      }
    }

    i += 1;
  }
}

export default {
  INITIAL_PATTERN_SLOT,
  createInitialPatterns,
  updateArrsWithGuesses,
};

