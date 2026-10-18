const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

function createEmptyLetterMap() {
  const map = {};
  for (const letter of ALPHABET) {
    map[letter] = 0;
  }
  return map;
}

export function letterCount(words) {
  const counts = createEmptyLetterMap();
  for (const word of words) {
    const uniqueChars = new Set(word.split(''));
    for (const char of uniqueChars) {
      if (counts[char] !== undefined) {
        counts[char] += 1;
      }
    }
  }
  return counts;
}

export function positionCount(words) {
  const letterPositionCounts = Array.from({ length: 5 }, () => createEmptyLetterMap());

  for (const word of words) {
    for (let i = 0; i < 5; i++) {
      const char = word[i];
      if (letterPositionCounts[i] && letterPositionCounts[i][char] !== undefined) {
        letterPositionCounts[i][char] += 1;
      }
    }
  }

  return letterPositionCounts;
}

export default {
  letterCount,
  positionCount,
};

