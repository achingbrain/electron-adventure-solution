import React from 'react'
import PropTypes from 'prop-types'
import { updateUser } from '../actions/app'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

class User extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string
    })
  }

  constructor (props, context) {
    super(props, context)

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
  }

  render () {
    if (this.props.user) {
      // tell the main process we have a user
      ipcRenderer.send('user', this.props.user)

      return this.props.children
    }

    return (
      <div className='modal absolute bg-gray z1 top-0 left-0 right-0 bottom-0'>
        <form onSubmit={this.onSubmit} className='bg-gray p2 rounded ml-auto mr-auto mt2' style={{width: '70vw'}}>
          <h2 className='h2 mt0'>Hello!</h2>
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
            <button className='btn btn-primary'>Save</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.app.user
})

const mapDispatchToProps = (dispatch) => ({
  updateUser: (user) => {
    dispatch(updateUser(user))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
