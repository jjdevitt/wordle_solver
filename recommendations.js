const wordsorter = require('./wordsorter');

const recommendationCount = 10;

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function getMultiple(words) {
  return {
    letterScore: wordsorter.sortByLetterScore(words).slice(0, recommendationCount),
    positionWeight: wordsorter.sortByPositionWeight(words).slice(0, recommendationCount),
  };
}

function makeMultiple(words) {
  const suggestions = getMultiple(words);
  console.log(`Letter Score Suggestions: ${JSON.stringify(suggestions.letterScore)}`);
  console.log(`Positon Weight Suggestions: ${JSON.stringify(suggestions.positionWeight)}`);
}

function getInitial(words) {
  const letterScoreWords = wordsorter.sortByLetterScore(words).slice(0, 200);
  const positionWeight = wordsorter.sortByPositionWeight(letterScoreWords).slice(0, 50);
  shuffle(positionWeight);
  return positionWeight.slice(0, recommendationCount);
}

function makeInitial(words) {
  console.log(`Initial Suggestions: ${JSON.stringify(getInitial(words))}`);
}

function makeOne(words) {
  return wordsorter.sortByPositionWeight(words)[0];
}

module.exports = { recommendationCount, getMultiple, makeMultiple, getInitial, makeInitial, makeOne };
