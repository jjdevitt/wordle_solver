const readline = require('readline');
const { SolverSession } = require('./solversession');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  const session = new SolverSession();
  const { initialSuggestions } = session.reset();
  console.log(`Initial Suggestions: ${JSON.stringify(initialSuggestions)}`);

  while (true) {
    const guess = await ask('Enter guess:');
    const highlight = await ask('Enter highlights:');

    const result = session.submitGuess(guess, highlight);

    console.log(`Patterns:${JSON.stringify(result.patterns)} Yellows:${JSON.stringify(result.yellows)}`);
    console.log(`Possible Matches: ${JSON.stringify(result.matches)} Total: ${result.total}`);
    console.log(`Letter Score Suggestions: ${JSON.stringify(result.suggestions.letterScore)}`);
    console.log(`Positon Weight Suggestions: ${JSON.stringify(result.suggestions.positionWeight)}`);

    if (result.total <= 1) {
      rl.close();
      return;
    }
  }
}

main();
