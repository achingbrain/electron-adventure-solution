import React from 'react'
import PropTypes from 'prop-types'
import { ipcRenderer } from 'electron'

class MessageInput extends React.Component {
  static propTypes = {
    onMessage: PropTypes.func.isRequired,
    onSendFile: PropTypes.func.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      message: ''
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const message = this.state.message.trim()

    if (message) {
      this.props.onMessage(message)
    }

    this.setState({
      message: ''
    })
  }

  onSendFile = (event) => {

  }

  onChange = (event) => {
    this.setState({
      message: event.target.value
    })

    if (!this.timeout) {
      ipcRenderer.send('status', 'TYPING')
    }

    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {
      ipcRenderer.send('status', '')
      this.timeout = null
    }, 1000)
  }

  render () {
    return (
      <form onSubmit={this.onSubmit} className='flex'>
        <input className='h1 bg-yellow maroon flex-auto' type='text' name='message' placeholder='Type your message here' value={this.state.message} onChange={this.onChange} data-id='text-message-input' />
      </form>
    )
  }
}

export default MessageInput
