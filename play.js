const readline = require('readline');
const wordledictonary = require('./wordledictonary');

function generateHighlights(guess, word) {
  let highlights = '';
  guess.split('').forEach((l, i) => {
    if (word.includes(l)) {
      if (l === word.split('')[i]) {
        highlights += 'g';
      } else {
        highlights += 'y';
      }
    } else {
      highlights += 'b';
    }
  });
  return highlights;
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (question) => new Promise((resolve) => rl.question(question, resolve));
  const words = wordledictonary.get();
  const wordleWord = words[Math.floor(Math.random() * words.length)];
  let i = 1;
  while (i <= 6) {
    const guess = (await ask(`Guess (${i} of 6): `)).trim();
    if (words.includes(guess)) {
      i += 1;
      const highlights = generateHighlights(guess, wordleWord);
      console.log(`    Highlights: ${highlights}`);
      if (highlights === 'ggggg') {
        console.log('You win!');
        rl.close();
        return;
      }
    } else {
      console.log(`     ${guess} not in word list`);
    }
  }

  console.log(`Word was: ${wordleWord}`);
  rl.close();
}

if (require.main === module) {
  main();
}

module.exports = { generateHighlights };
