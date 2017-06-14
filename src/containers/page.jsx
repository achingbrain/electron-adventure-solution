import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Nav from '../components/nav'
import Settings from '../components/settings'
import Messages from '../components/messages'
import Members from '../components/members'
import Input from '../components/input'
import { ipcRenderer } from 'electron'

class Page extends React.Component {
  static propTypes = {
    loaded: PropTypes.bool
  }

  onMessage = (message) => {
    ipcRenderer.send('message', message)
  }

  render () {
    if (!this.props.loaded) {
      return (
        <p>Loading</p>
      )
    }

    return (
      <div>
        <Nav />
        <Members className='' />
        <Messages className='' />
        <Input className='' onMessage={this.onMessage} />
        <Settings />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loaded: state.app.loaded
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)
