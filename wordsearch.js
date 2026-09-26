function search(pattern, words) {
  const p = new RegExp('^' + pattern);
  return Array.from(words).filter((word) => p.test(word));
}

module.exports = { search };
