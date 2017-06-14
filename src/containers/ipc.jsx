import React from 'react'
import PropTypes from 'prop-types'
import { updateUser } from '../actions/app'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'
import { addMessage, addMember } from '../actions/chat'

class IPC extends React.Component {
  constructor (props, context) {
    super(props, context)

    ipcRenderer.on('member:details', (event, data) => {
      this.props.addMember(data)
    })

    ipcRenderer.on('message:recieved', (event, data) => {
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
  addMessage: (remote, message) => {
    dispatch(addMessage(remote, message))
  },
  addMember: (remote, member) => {
    dispatch(addMember(remote, member))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IPC)
