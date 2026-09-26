# wordle_solver

Wordle Solver desktop app built with [Electron](https://www.electronjs.org), plus the original
command line tools. Helps solve the daily [Wordle](https://www.nytimes.com/games/wordle/index.html)
by tracking guesses and ruling words out of the possibility space to suggest the next guess.

## Install

```
npm install
```

## Desktop app

```
npm start
```

Type the word you guessed into the tiles, click the bar under each tile to cycle its color
(grey -> yellow -> green) to match Wordle, then submit. The app shows the remaining possible
words and the letter score / position weight suggestions for your next guess.

Package a distributable with `npm run dist`.

## Command line

```
npm run helper   # solver prompt (guess + highlights such as 'bbygb')
npm run play     # play a local wordle round
npm run sim      # simulate the solver against one word or the whole dictionary
```

Equivalent shell wrappers: `./helper.sh`, `./play.sh`, `./sim.sh`.
