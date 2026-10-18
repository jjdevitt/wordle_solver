export function search(pattern, words) {
  const regex = new RegExp(`^${pattern}`);
  return Array.from(words).filter((word) => regex.test(word));
}

export default {
  search,
};

