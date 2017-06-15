import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Members extends React.Component {
  static propTypes = {
    members: PropTypes.object.isRequired
  }

  static defaultProps = {
    members: []
  }

  render () {
    return (
      <div>
        <h3 className='h1 m0 p1'>Members</h3>
        {
          Object.keys(this.props.members)
            .map(key => this.props.members[key])
            .map(member => (
              <div key={member.id} className='p1 m0'>{member.name} {member.status}</div>
            ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  members: state.chat.members,
  user: state.app.user
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Members)
