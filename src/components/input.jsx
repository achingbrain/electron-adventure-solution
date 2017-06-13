import React from 'react'
import PropTypes from 'prop-types'

class Input extends React.Component {
  static propTypes = {
    onMessage: PropTypes.func.isRequired
  }

  onSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const message = this.input.value.trim()

    if (message) {
      this.props.onMessage(message)
    }
  }

  render () {
    return (
      <form onSubmit={this.onSubmit}>
        <input type='text' name='message' placeholder='Type your message here' ref={input => this.input = input} />
      </form>
    )
  }
}

export default Input
