import { get as getDictionaryWords } from './wordleDictionary.js';
import { createInitialPatterns, updateArrsWithGuesses } from './patternUpdater.js';
import { search } from './wordSearch.js';
import { yellows as filterYellows } from './wordFiltering.js';
import { makeInitial, makeMultiple } from './recommendations.js';

export function createSolverSession() {
  const allWords = getDictionaryWords();
  const initialSuggestions = makeInitial(allWords);
  const { letterScoreSuggestions, positionWeightSuggestions } = makeMultiple(allWords);

  return {
    patterns: createInitialPatterns(),
    yellows: new Set(),
    words: allWords,
    initialSuggestions,
    letterScoreSuggestions,
    positionWeightSuggestions,
    history: [],
  };
}

export function applyGuess(session, guessInput, highlightInput) {
  const guess = guessInput.toLowerCase().trim();
  const highlight = Array.isArray(highlightInput)
    ? highlightInput.join('').toLowerCase()
    : String(highlightInput).toLowerCase().trim();

  if (guess.length !== 5 || !/^[a-z]{5}$/.test(guess)) {
    throw new Error('Guess must be a 5-letter word (a-z).');
  }
  if (highlight.length !== 5 || !/^[byg]{5}$/.test(highlight)) {
    throw new Error('Highlights must be 5 characters of b (gray), y (yellow), or g (green).');
  }

  const patterns = [...session.patterns];
  const yellows = new Set(session.yellows);

  updateArrsWithGuesses(patterns, yellows, guess.split(''), highlight.split(''));

  const regexPattern = patterns.join('');
  // Guard against empty character classes like '[]' if user enters contradictory clues
  const hasEmptyClass = patterns.some((p) => p === '[]');
  const patternMatchedWords = hasEmptyClass ? [] : search(regexPattern, session.words);
  const filteredResults = filterYellows(yellows, patternMatchedWords);
  const { letterScoreSuggestions, positionWeightSuggestions } = makeMultiple(filteredResults);

  return {
    patterns,
    yellows,
    words: filteredResults,
    initialSuggestions: session.initialSuggestions,
    letterScoreSuggestions,
    positionWeightSuggestions,
    history: [
      ...session.history,
      {
        guess,
        highlight,
        remainingCount: filteredResults.length,
        patterns: [...patterns],
        yellows: Array.from(yellows),
      },
    ],
  };
}

export default {
  createSolverSession,
  applyGuess,
};

