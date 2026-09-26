function yellows(yellowSet, words) {
  const resultSet = new Set([]);
  for (const word of words) {
    let resultContainsAllYellows = true;
    for (const yellow of yellowSet) {
      if (!word.includes(yellow)) {
        resultContainsAllYellows = false;
        break;
      }
    }
    if (resultContainsAllYellows && word.length === 5) {
      resultSet.add(word);
    }
  }

  return resultSet;
}

function uniques(words) {
  return Array.from(words).filter((x) => x.length === new Set(x).size);
}

module.exports = { yellows, uniques };
