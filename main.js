const path = require('path');
const { app, BrowserWindow, ipcMain, shell } = require('electron');
const { SolverSession } = require('./solversession');

const WORDLE_URL = 'https://www.nytimes.com/games/wordle/index.html';

const session = new SolverSession();

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 820,
    title: 'Wordle Solver',
    backgroundColor: '#121213',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

ipcMain.handle('solver:reset', () => session.reset());

ipcMain.handle('solver:guess', (event, guess, highlight) => session.submitGuess(guess, highlight));

ipcMain.handle('solver:openWordle', () => shell.openExternal(WORDLE_URL));

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
