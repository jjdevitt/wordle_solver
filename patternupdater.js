function countOccurrences(letters, letter) {
  return Array.from(letters).filter((l) => l === letter).length;
}

function updateArrsWithGuesses(patternArr, yellows, guess, highlight) {
  let i = 0;
  while (i < 5) {
    if (highlight[i] === 'b') {
      patternArr.forEach((pattern, j) => {
        if (patternArr[j].length > 1) {
          patternArr[j] = pattern.split(guess[i]).join('');
        }
      });
    } else if (highlight[i] === 'y') {
      patternArr[i] = patternArr[i].split(guess[i]).join('');
      yellows.add(guess[i]);
    } else if (highlight[i] === 'g') {
      patternArr[i] = guess[i];
      if (yellows.has(guess[i]) && countOccurrences(guess, guess[i]) === 1) {
        yellows.delete(guess[i]);
      }
    }

    i += 1;
  }
}

module.exports = { updateArrsWithGuesses };
