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
      <div className='flex flex-column' style={{height: '100%'}}>
        <div className='flex-none'>
          <Nav />
        </div>
        <Settings />
        <div className='flex-auto flex bg-red'>
          <div className='flex-none overflow-auto bg-blue' style={{width: 200, maxWidth: 200}}>
            <Members className='' />
          </div>
          <div className='flex-auto flex flex-column bg-yellow'>
            <div className='flex-auto overflow-auto bg-navy'>
              <Messages />
            </div>
            <div className='flex-none bg-pink' style={{height: 44}}>
              <Input onMessage={this.onMessage} />
            </div>
          </div>
        </div>
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
