import test from 'node:test';
import assert from 'node:assert/strict';

import { get as getWords } from '../src/solver/wordleDictionary.js';
import { letterCount, positionCount } from '../src/solver/calcWeightUtil.js';
import {
  sortByLetterScore,
  sortByPositionWeight,
  sortByEliminationCount,
} from '../src/solver/wordSorter.js';
import { createInitialPatterns, updateArrsWithGuesses } from '../src/solver/patternUpdater.js';
import { search } from '../src/solver/wordSearch.js';
import { yellows as filterYellows, uniques } from '../src/solver/wordFiltering.js';
import { makeInitial, makeMultiple, makeOne } from '../src/solver/recommendations.js';
import { createSolverSession, applyGuess } from '../src/solver/wordleHelper.js';

test('wordleDictionary returns 2309 five-letter words', () => {
  const words = getWords();
  assert.equal(words.length, 2309);
  assert.equal(words[0], 'cigar');
  assert.ok(words.every((w) => w.length === 5));
});

test('calcWeightUtil counts unique letters and positional counts accurately', () => {
  const sample = ['apple', 'alert', 'angle'];
  const lc = letterCount(sample);
  assert.equal(lc.a, 3);
  assert.equal(lc.p, 1); // unique per word
  assert.equal(lc.l, 3);
  assert.equal(lc.e, 3);

  const pc = positionCount(sample);
  assert.equal(pc[0].a, 3);
  assert.equal(pc[4].e, 2);
  assert.equal(pc[4].t, 1);
});

test('wordSorter sorts by letter score, position weight, and elimination count', () => {
  const words = getWords();
  const topLetter = sortByLetterScore(words).slice(0, 5);
  assert.deepEqual(topLetter, ['irate', 'later', 'alter', 'alert', 'arose']);

  const topPos = sortByPositionWeight(words).slice(0, 5);
  assert.deepEqual(topPos, ['slate', 'sauce', 'slice', 'shale', 'saute']);

  const elim = sortByEliminationCount(['abcde', 'abcfg', 'zzzzz']);
  assert.equal(elim[2], 'zzzzz');
});

test('patternUpdater, wordSearch, and wordFiltering narrow down candidates accurately', () => {
  const patterns = createInitialPatterns();
  const yellows = new Set();

  // Suppose secret word is "spice" and guess is "slate" -> s(g), l(b), a(b), t(b), e(g)
  updateArrsWithGuesses(patterns, yellows, 'slate', 'gbbbg');
  assert.equal(patterns[0], 's');
  assert.equal(patterns[4], 'e');
  assert.ok(!patterns[1].includes('l'));
  assert.ok(!patterns[1].includes('a'));
  assert.ok(!patterns[1].includes('t'));

  const matched = search(patterns.join(''), getWords());
  const filtered = filterYellows(yellows, matched);
  assert.ok(filtered.includes('spice'));
  assert.ok(!filtered.includes('slate'));

  const uniqueOnly = uniques(['apple', 'spice']);
  assert.deepEqual(uniqueOnly, ['spice']);
});

test('recommendations and wordleHelper session solve a multi-turn sequence', () => {
  let session = createSolverSession();
  assert.equal(session.initialSuggestions.length, 10);
  assert.equal(session.letterScoreSuggestions.length, 10);
  assert.equal(session.positionWeightSuggestions.length, 10);

  // Secret word: "cigar"
  // Turn 1: guess "slate" -> s(b), l(b), a(y), t(b), e(b)
  session = applyGuess(session, 'slate', 'bbybb');
  assert.ok(session.words.includes('cigar'));
  assert.ok(!session.words.includes('slate'));

  // Turn 2: guess "crony" -> c(g), r(y), o(b), n(b), y(b)
  session = applyGuess(session, 'crony', 'gybbb');
  assert.ok(session.words.includes('cigar'));
  assert.ok(session.yellows.has('r'));

  // Turn 3: guess "cigar" -> 'ggggg'
  session = applyGuess(session, 'cigar', 'ggggg');
  assert.deepEqual(session.words, ['cigar']);
  assert.equal(makeOne(session.words), 'cigar');
  assert.equal(makeMultiple(session.words).positionWeightSuggestions[0], 'cigar');
});
