import { app, BrowserWindow, ipcMain } from 'electron'
import chat from 'udp-chat-server'
import { machineIdSync } from 'electron-machine-id'
import shortid from 'shortid'
import http from 'http'
import fs from 'fs'
import url from 'url'

let mainWindow
let files = {}

const server = http.createServer((request, response) => {
  const query = url.parse(request.url, true).query
  const file = files[query.file]

  if (!file) {
    response.writeHead(404)
    response.end()
    return
  }

  response.writeHead(200, {
    'Content-Type': file.type,
    'Content-Length': file.size
  })

  fs.createReadStream(file.path).pipe(response)
})
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})
server.listen()

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
    if (data.sender.id === user.id) {
      data.source = true
    }

    mainWindow.webContents.send(type, data)
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

ipcMain.on('file', (event, chosenFiles) => {
  chosenFiles.forEach(file => {
    const id = shortid.generate()
    files[id] = file

    send({
      type: 'message',
      data: {
        message: {
          id: shortid.generate(),
          type: 'file',
          name: file.name,
          mimeType: file.mimeType,
          size: file.size,
          url: `http://localhost:${server.address().port}?file=${id}`
        },
        sender: user
      }
    })
  })
})
