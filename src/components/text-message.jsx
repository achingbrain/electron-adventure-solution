import React from 'react'
import PropTypes from 'prop-types'

const TextMessage = ({ text }) => {
  return (
    <div>{text}</div>
  )
}

TextMessage.propTypes = {
  text: PropTypes.string.isRequired
}

export default TextMessage
