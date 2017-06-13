import React from 'react'
import PropTypes from 'prop-types'

class Members extends React.Component {
  static propTypes = {
    members: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      avatar: PropTypes.string
    }))
  }

  static defaultProps = {
    members: []
  }

  render () {
    return (
      <div>
        <ul>
          {this.props.members.map(member => (
            <li>{member.name} {member.status}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Members
