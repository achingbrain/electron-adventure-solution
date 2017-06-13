import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Nav from '../components/nav'
import Settings from '../components/settings'
import Messages from '../components/messages'
import Members from '../components/members'
import Input from '../components/input'

class Page extends React.Component {
  onMessage = (message) => {

  }

  render () {
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

export default Page
