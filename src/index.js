import { app, BrowserWindow, ipcMain } from 'electron'
import chat from 'udp-chat-server'
import { machineIdSync } from 'electron-machine-id'
import shortid from 'shortid'

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false
  })

  // prevents memory leaks
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // hides the main window until all resources are loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

let user = {
  id: machineIdSync()
}

const send = chat({
  onMessage: ({type, data}) => {

  }
})

ipcMain.on('user', (event, data) => {
  user.name = data.name
  user.avatar = data.avatar

  send({
    type: 'user',
    data: {
      sender: user
    }
  })
})

ipcMain.on('status', (event, status) => {
  user.status = status

  send({
    type: 'user',
    data: {
      sender: user
    }
  })
})

ipcMain.on('message', (event, message) => {
  send({
    type: 'message',
    data: {
      message: {
        id: shortid.generate(),
        type: 'text',
        text: message
      },
      sender: user
    }
  })
})
