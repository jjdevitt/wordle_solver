import { letterCount, positionCount } from './calcWeightUtil.js';

export function sortByLetterScore(words) {
  const wordArray = Array.from(words);
  const letterScores = letterCount(wordArray);
  const wordScoreTuples = [];

  for (const word of wordArray) {
    let wordLetterScore = 0;
    for (const letter of new Set(word.split(''))) {
      wordLetterScore += letterScores[letter] || 0;
    }
    wordScoreTuples.push([word, wordLetterScore]);
  }

  wordScoreTuples.sort((a, b) => b[1] - a[1]);
  return wordScoreTuples.map(([word]) => word);
}

export function sortByEliminationCount(words) {
  const wordArray = Array.from(words);
  const elimScoreEntries = [];

  const wordSets = wordArray.map((w) => [w, new Set(w.split(''))]);

  for (const [word1, set1] of wordSets) {
    let score = 0;
    for (const [, set2] of wordSets) {
      let hasIntersection = false;
      for (const ch of set1) {
        if (set2.has(ch)) {
          hasIntersection = true;
          break;
        }
      }
      if (hasIntersection) {
        score += 1;
      }
    }
    elimScoreEntries.push([word1, score]);
  }

  elimScoreEntries.sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return b[0].localeCompare(a[0]);
  });

  return elimScoreEntries.map(([word]) => word);
}

export function sortByPositionWeight(words) {
  const wordArray = Array.from(words);
  const posWeights = positionCount(wordArray);
  const posScoreTuples = [];

  for (const word of wordArray) {
    let posWeight = 0;
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      posWeight += posWeights[i]?.[letter] || 0;
    }
    posScoreTuples.push([word, posWeight]);
  }

  posScoreTuples.sort((a, b) => b[1] - a[1]);
  return posScoreTuples.map(([word]) => word);
}

export default {
  sortByLetterScore,
  sortByEliminationCount,
  sortByPositionWeight,
};

