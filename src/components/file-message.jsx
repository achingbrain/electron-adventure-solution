import React from 'react'
import PropTypes from 'prop-types'
const shell = require('electron').shell

class FileMessage extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }

  onClick = () => {
    shell.openExternal(this.props.url)
  }

  render () {
    return (
      <a onClick={this.onClick}>{this.props.name} ({this.props.type})</a>
    )
  }
}

export default FileMessage
