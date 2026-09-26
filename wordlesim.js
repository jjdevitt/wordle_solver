const readline = require('readline');
const wordledictonary = require('./wordledictonary');
const recommendations = require('./recommendations');
const patternupdater = require('./patternupdater');
const wordsearch = require('./wordsearch');
const wordfiltering = require('./wordfiltering');

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

function wordleRound(wordleWord, verbose) {
  let words = wordledictonary.get();
  const patterns = [
    '[abcdefghijklmnopqrstuvwxyz]',
    '[abcdefghijklmnopqrstuvwxyz]',
    '[abcdefghijklmnopqrstuvwxyz]',
    '[abcdefghijklmnopqrstuvwxyz]',
    '[abcdefghijklmnopqrstuvwxyz]',
  ];

  const yellows = new Set([]);
  let i = 0;
  let found = false;
  while (i < 6) {
    i += 1;
    const guess = recommendations.makeOne(words);
    const highlights = generateHighlights(guess, wordleWord);
    patternupdater.updateArrsWithGuesses(patterns, yellows, guess.split(''), highlights.split(''));
    words = wordsearch.search(patterns.join(''), words);
    words = wordfiltering.yellows(yellows, words);
    if (verbose) {
      console.log(`  ${i}) guess '${guess}' highlights '${highlights}'  ${words.size} words remaining...`);
    }
    if (guess === wordleWord) {
      found = true;
      break;
    }
  }
  return [i, found];
}

function runMultiple() {
  console.log('\n  Running full simulation against all words in dictionary...');
  let sum = 0;
  let total = 0;
  let misses = 0;
  const misswords = [];

  for (const word of wordledictonary.get()) {
    const result = wordleRound(word, false);
    if (result[1]) {
      // found
      sum += result[0];
      total += 1;
    } else {
      misses += 1;
      misswords.push(word);
    }
  }

  console.log('\n############## RESULTS ##############\n');
  console.log(
    `Found ${total}/${wordledictonary.get().length} words with avg ${sum / total} guesses and ${misses} misses -> ${JSON.stringify(misswords)}`
  );
  console.log('\n############## RESULTS ##############\n');
}

function runSingle(wordleWord) {
  console.log('\n');
  const result = wordleRound(wordleWord, true);
  console.log('\n############## RESULTS ##############\n');
  console.log(`Found word ${result[1]} with ${result[0]} guesses\n`);
  console.log('\n############## RESULTS ##############\n');
}

/// MAIN RUN
if (require.main === module) {
  console.log('\n');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('Run which simulation (all,word):', (command) => {
    if (command.trim() === 'all') {
      runMultiple();
    } else {
      runSingle(command.trim());
    }
    rl.close();
  });
}

module.exports = { generateHighlights, wordleRound, runMultiple, runSingle };
