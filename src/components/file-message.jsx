import React from 'react'
import PropTypes from 'prop-types'
const shell = require('electron').shell

class FileMessage extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    mimeType: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }

  onClick = () => {
    shell.openExternal(this.props.url)
  }

  render () {
    return (
      <a href='#' onClick={this.onClick}>{this.props.name} ({this.props.mimeType})</a>
    )
  }
}

export default FileMessage
