import React from 'react'
import PropTypes from 'prop-types'
import { updateUser, closeSettings, reset } from '../actions/app'
import { connect } from 'react-redux'

class Settings extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string
    })
  }

  constructor(props) {
    super(props)

    this.state = {
      name: props.user ? props.user.name : '',
      avatar: props.user ? props.user.avatar : ''
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    this.props.updateUser({
      name: this.state.name,
      avatar: this.state.avatar ? this.state.avatar : undefined
    })

    this.props.closeSettings()
  }

  onCancel = (event) => {
    event.preventDefault()
    event.stopPropagation()

    this.props.closeSettings()
  }

  onReset = (event) => {
    event.preventDefault()
    event.stopPropagation()

    this.props.reset()
  }

  render () {
    if (!this.props.open) {
      return null
    }

    return (
      <div className='modal absolute bg-yellow z1 top-0 left-0 right-0 bottom-0'>
        <form onSubmit={this.onSubmit} className='bg-lime p2 rounded ml-auto mr-auto mt2' style={{width: '70vw'}}>
          <h2 className='h2 mt0'>Settings</h2>
          <input
            className='input'
            name='name'
            type='text'
            placeholder='Name'
            value={this.state.name}
            onChange={event => this.setState({
              name: event.target.value.trim()
            })}
            required />
          <input
            className='input'
            name='avatar'
            type='text'
            placeholder='Avatar image url'
            value={this.state.avatar}
            onChange={event => this.setState({
              avatar: event.target.value.trim()
            })} />
          <div className='right-align'>
            <button className='btn btn-outline mr2' onClick={this.onCancel}>Cancel</button>
            <button className='btn btn-primary'>Save</button>
          </div>
        </form>
        <form onSubmit={this.onSubmit} className='bg-red p2 rounded ml-auto mr-auto mt2' style={{width: '70vw'}}>
          <h2 className='h2 mt0 white'>Reset</h2>
          <div className='right-align'>
            <button className='btn btn-primary' onClick={this.onReset}>Reset</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  open: state.app.settingsIsOpen,
  user: state.app.user
})

const mapDispatchToProps = (dispatch) => ({
  closeSettings: () => {
    dispatch(closeSettings())
  },
  updateUser: (user) => {
    dispatch(updateUser(user))
  },
  reset: () => {
    dispatch(reset())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
