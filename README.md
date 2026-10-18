# Wordle Solver (Electron + JavaScript)

Desktop Wordle Solver application migrated from Python to JavaScript with an interactive Electron UI.

## Features

- **Interactive 6x5 Wordle Grid**: Type guesses via physical or on-screen keyboard, or click any recommended word to populate the active row.
- **One-Click Tile Clues**: Click any letter tile in the active row to cycle through **Gray (Absent)**, **Yellow (Present)**, and **Green (Correct)**.
- **Multi-Strategy Word Recommendations**:
  - **Initial Suggestions**: Shuffled top picks from the highest letter-coverage and positional-weight words.
  - **Position Weight Top 10**: Ranked by exact slot (1–5) letter frequency among remaining candidates.
  - **Letter Score Top 10**: Ranked by unique letter frequency across remaining candidates.
- **Live Candidate Inspector**: View all remaining possible matches, filter them in real time, inspect per-slot regex constraints, or undo previous turns.

## Getting Started

```bash
npm install
npm start
```

## Running Tests

```bash
npm test
```
