import React from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'
import { addMessage, addMember } from '../actions/chat'

class IPC extends React.Component {
  constructor (props, context) {
    super(props, context)

    ipcRenderer.on('user', (event, data) => {
      this.props.addMember(data)
    })

    ipcRenderer.on('message', (event, data) => {
      this.props.addMessage(data)
    })
  }

  render () {
    return this.props.children
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  addMessage: (data) => {
    dispatch(addMessage(data))
  },
  addMember: (data) => {
    dispatch(addMember(data))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IPC)
