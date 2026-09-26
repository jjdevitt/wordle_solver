const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

function emptyLetterCounts() {
  const counts = {};
  for (const letter of ALPHABET) {
    counts[letter] = 0;
  }
  return counts;
}

function letterCount(words) {
  const lettercount = emptyLetterCounts();
  for (const result of words) {
    for (const char of new Set(result.split(''))) {
      lettercount[char] += 1;
    }
  }
  return lettercount;
}

function positionCount(words) {
  const letterPositionCounts = [
    emptyLetterCounts(),
    emptyLetterCounts(),
    emptyLetterCounts(),
    emptyLetterCounts(),
    emptyLetterCounts(),
  ];

  for (const word of words) {
    word.split('').forEach((c, i) => {
      letterPositionCounts[i][c] += 1;
    });
  }

  return letterPositionCounts;
}

module.exports = { letterCount, positionCount };
