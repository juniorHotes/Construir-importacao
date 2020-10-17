const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Cria uma janela de navegação.
  const win = new BrowserWindow({
    width: 1366,
    // maxWidth: 1366,
    // minWidth: 760,
    resizable: false,

    height: 768,
    // maxHeight: 768,
    // minHeight: 768,
    
    webPreferences: {
      nodeIntegration: true
    }
  })

  // e carrega o arquivo index.html do seu aplicativo.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
