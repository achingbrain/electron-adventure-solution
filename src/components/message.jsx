import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ message, date, sender }) => {
  return (
    <div>
      message goes here
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
