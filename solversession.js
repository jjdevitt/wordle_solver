const wordsearch = require('./wordsearch');
const patternupdater = require('./patternupdater');
const wordfiltering = require('./wordfiltering');
const recommendations = require('./recommendations');
const wordledictonary = require('./wordledictonary');

const INITIAL_PATTERN = '[abcdefghijklmnopqrstuvwxyz]';

class SolverSession {
  constructor() {
    this.reset();
  }

  reset() {
    this.patterns = [
      INITIAL_PATTERN,
      INITIAL_PATTERN,
      INITIAL_PATTERN,
      INITIAL_PATTERN,
      INITIAL_PATTERN,
    ];
    this.yellows = new Set([]);
    this.words = wordledictonary.get();
    this.guesses = [];
    return {
      initialSuggestions: recommendations.getInitial(this.words),
      totalWords: this.words.length,
    };
  }

  submitGuess(guessInput, highlightInput) {
    const guess = String(guessInput).trim().toLowerCase().split('');
    const highlight = String(highlightInput).trim().toLowerCase().split('');

    patternupdater.updateArrsWithGuesses(this.patterns, this.yellows, guess, highlight);

    // Search based on user inputs
    this.words = wordsearch.search(this.patterns.join(''), this.words);

    // Filter out words that don't contain yellows
    const filteredResults = wordfiltering.yellows(this.yellows, this.words);

    const suggestions = recommendations.getMultiple(filteredResults);

    this.guesses.push({ guess: guess.join(''), highlight: highlight.join('') });

    return {
      guess: guess.join(''),
      highlight: highlight.join(''),
      patterns: [...this.patterns],
      yellows: Array.from(this.yellows),
      matches: Array.from(filteredResults),
      total: filteredResults.size,
      suggestions,
      solved: filteredResults.size <= 1,
    };
  }
}

module.exports = { SolverSession, INITIAL_PATTERN };
