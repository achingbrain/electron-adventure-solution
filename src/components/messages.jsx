import React from 'react'
import PropTypes from 'prop-types'
import Message from './message'

const Messages = ({ messages = [] }) => {
  return (
    <div>
      <ul>
        {messages.map(message => (
          <li><Message message={message} /></li>
        ))}
      </ul>
    </div>
  )
}

Messages.propTypes = {
  messages: PropTypes.array
}

export default Messages
