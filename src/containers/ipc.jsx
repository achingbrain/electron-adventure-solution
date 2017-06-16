import React from 'react'
import { updateUser } from '../actions/app'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'
import { addMessage, addMember, addFile } from '../actions/chat'

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
  updateUser: (user) => {
    dispatch(updateUser(user))
  },
  addMessage: (data) => {
    dispatch(addMessage(data))
  },
  addMember: (data) => {
    dispatch(addMember(data))
  },
  addFile: (data) => {
    dispatch(addFile(data))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IPC)
