const calcweightutil = require('./calcweightutil');

function sortByLetterScore(words) {
  const wordScoreTuples = [];
  const letterScores = calcweightutil.letterCount(words);
  for (const word of words) {
    let wordLetterScore = 0;
    for (const letter of new Set(word.split(''))) {
      wordLetterScore += letterScores[letter];
    }
    wordScoreTuples.push([word, wordLetterScore]);
  }
  return wordScoreTuples.sort((a, b) => b[1] - a[1]).map((wst) => wst[0]);
}

function sortByEliminationCount(words) {
  const elimScoreDict = new Map();
  for (const word of words) {
    elimScoreDict.set(word, 0);
  }

  for (const word1 of elimScoreDict.keys()) {
    for (const word2 of elimScoreDict.keys()) {
      const word2Letters = new Set(word2.split(''));
      const intersects = word1.split('').some((letter) => word2Letters.has(letter));
      if (intersects) {
        elimScoreDict.set(word1, elimScoreDict.get(word1) + 1);
      }
    }
  }
  return Array.from(elimScoreDict.entries())
    .sort((a, b) => (a[1] !== b[1] ? b[1] - a[1] : b[0].localeCompare(a[0])))
    .map((es) => es[0]);
}

function sortByPositionWeight(words) {
  const posWeights = calcweightutil.positionCount(words);
  const posScoreTuples = [];
  for (const word of words) {
    let posWeight = 0;
    word.split('').forEach((letter, i) => {
      posWeight += posWeights[i][letter];
    });
    posScoreTuples.push([word, posWeight]);
  }
  return posScoreTuples.sort((a, b) => b[1] - a[1]).map((wst) => wst[0]);
}

module.exports = { sortByLetterScore, sortByEliminationCount, sortByPositionWeight };
