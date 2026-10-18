export function yellows(yellowsSet, words) {
  const resultList = [];
  const seen = new Set();

  for (const word of words) {
    let resultContainsAllYellows = true;
    for (const yellow of yellowsSet) {
      if (!word.includes(yellow)) {
        resultContainsAllYellows = false;
        break;
      }
    }
    if (resultContainsAllYellows && word.length === 5 && !seen.has(word)) {
      seen.add(word);
      resultList.push(word);
    }
  }

  return resultList;
}

export function uniques(words) {
  return Array.from(words).filter((word) => word.length === new Set(word.split('')).size);
}

export default {
  yellows,
  uniques,
};

