const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('solver', {
  reset: () => ipcRenderer.invoke('solver:reset'),
  submitGuess: (guess, highlight) => ipcRenderer.invoke('solver:guess', guess, highlight),
  openWordle: () => ipcRenderer.invoke('solver:openWordle'),
});
