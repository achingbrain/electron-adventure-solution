import React from 'react'
import PropTypes from 'prop-types'

const TextMessage = ({ message }) => {
  return (
    <div>{message}</div>
  )
}

TextMessage.propTypes = {
  message: PropTypes.string.isRequired
}

export default TextMessage
