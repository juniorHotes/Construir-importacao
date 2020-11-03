const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 1360,
    minWidth: 760,

    height: 720,
    minHeight: 720,

    autoHideMenuBar: true,
    
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.once('ready-to-show', () => {
    win.show()
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
