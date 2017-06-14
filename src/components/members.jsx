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
        <ul>
          {
            Object.keys(this.props.members)
              .map(key => this.props.members[key])
              .map(member => (
                <li key={member.id}>{member.name} {member.status}</li>
              ))
          }
        </ul>
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
