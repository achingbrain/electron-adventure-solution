import React from 'react'
import { connect } from 'react-redux'
import { openSettings } from '../actions/app'

const Nav = ({ openSettings }) => {
  return (
    <nav className='bg-orange flex'>
      <h1 className='white flex-auto p1 m0 h1'>Chat</h1>
      <span className='flex-none right-align p1 m0 mt1 btn h1' onClick={openSettings}>Settings</span>
    </nav>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  openSettings: () => {
    dispatch(openSettings())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)
