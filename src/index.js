import { app, BrowserWindow, ipcMain } from 'electron'
import chat from 'udp-chat-server'
import { machineIdSync } from 'electron-machine-id'
import shortid from 'shortid'
import http from 'http'
import fs from 'fs'
import url from 'url'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let files = {}
let port

const server = http.createServer((request, response) => {
  const query = url.parse(req.url, true).query
  const file = files[query.file]

  if (!file) {
    return response.send(404).end()
  }

  response.writeHead(200, {
    'Content-Type': file.type,
    'Content-Length': file.size
  })

  fileSystem.createReadStream(file.path).pipe(response)
})
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})
server.listen()

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

let user = {
  // dirty hack to allow us to run the app twice on the same machine
  id: machineIdSync() + process.pid
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const send = chat({
  acceptLocalMessages: true,
  onMessage: ({remote, type, data}) => {
    if (data.id === user.id) {
      data.source = true
    }

    mainWindow.webContents.send(type, {
      remote: remote.address,
      ...data
    })
  }
})

ipcMain.on('user', (event, data) => {
  user.name = data.name
  user.avatar = data.avatar

  send({
    type: 'member:details',
    data: user
  })
})

ipcMain.on('status', (event, status) => {
  user.status = status

  send({
    type: 'member:details',
    data: user
  })
})

ipcMain.on('message', (event, message) => {
  send({
    type: 'message:recieved',
    data: {
      message: message,
      ...user
    }
  })
})

ipcMain.on('file', (event, files) => {
  files.forEach(file => {
    const id = shortid.generate()
    files[id] = file

    send({
      type: 'file:recieved',
      data: {
        file: file.name,
        type: file.type,
        size: file.size,
        url: `http://localhost:${server.address().port}?file=${id}`,
        ...user
      }
    })
  })
})
