import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ message, date, sender }) => {
  return (
    <div>
      <div>{sender.name}</div>
      <div>{new Date(date).toString()}</div>
      <div>{message}</div>
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  sender: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string
  })
}

export default Message
