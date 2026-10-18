import { sortByLetterScore, sortByPositionWeight } from './wordSorter.js';

export const recommendationCount = 10;

export function makeMultiple(words) {
  const letterScoreSuggestions = sortByLetterScore(words).slice(0, recommendationCount);
  const positionWeightSuggestions = sortByPositionWeight(words).slice(0, recommendationCount);

  return {
    letterScoreSuggestions,
    positionWeightSuggestions,
  };
}

export function makeInitial(words) {
  const letterScoreWords = sortByLetterScore(words).slice(0, 200);
  const positionWeight = sortByPositionWeight(letterScoreWords).slice(0, 50);

  // Fisher-Yates shuffle (matching random.shuffle in Python)
  for (let i = positionWeight.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positionWeight[i], positionWeight[j]] = [positionWeight[j], positionWeight[i]];
  }

  return positionWeight.slice(0, recommendationCount);
}

export function makeOne(words) {
  return sortByPositionWeight(words)[0] || null;
}

export default {
  recommendationCount,
  makeMultiple,
  makeInitial,
  makeOne,
};

