import React from 'react'
import Nav from '../components/nav'
import Settings from '../components/settings'
import Messages from '../components/messages'
import Members from '../components/members'
import MessageInput from '../components/message-input'
import { ipcRenderer } from 'electron'

class Page extends React.Component {
  onMessage = (message) => {
    ipcRenderer.send('message', message)
  }

  onSendFile = (file) => {
    ipcRenderer.send('file', file)
  }

  render () {
    return (
      <div className='flex flex-column' style={{height: '100%'}}>
        <div className='flex-none'>
          <Nav />
        </div>
        <Settings />
        <div className='flex-auto flex bg-red'>
          <div className='flex-none overflow-auto bg-blue' style={{width: 200, maxWidth: 200}}>
            <Members className='' />
          </div>
          <div className='flex-auto flex flex-column bg-yellow'>
            <div className='flex-auto overflow-auto bg-navy'>
              <Messages />
            </div>
            <div className='flex-none bg-pink' style={{height: 44}}>
              <MessageInput onMessage={this.onMessage} onSendFile={this.onSendFile} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Page
