import React from 'react'
import PropTypes from 'prop-types'
import { ipcRenderer } from 'electron'

class Input extends React.Component {
  static propTypes = {
    onMessage: PropTypes.func.isRequired
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

  onChange = (event) => {
    this.setState({
      message: event.target.value
    })

    ipcRenderer.send('status', 'TYPING')
  }

  render () {
    return (
      <form onSubmit={this.onSubmit}>
        <input type='text' name='message' placeholder='Type your message here' value={this.state.message} onChange={this.onChange} />
      </form>
    )
  }
}

export default Input
