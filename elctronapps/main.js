const { app, BrowserWindow } = require('electron')
function createWindow () {
    const win = new BrowserWindow({
      width: 1082,
      height: 800
    })
    win.setMenuBarVisibility(false)
    win.loadFile('index.html')
    
  }
  app.whenReady().then(() => {
    createWindow()
  })
