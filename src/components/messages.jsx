import React from 'react'
import PropTypes from 'prop-types'
import Message from './message'
import { connect } from 'react-redux'

const Messages = ({ messages = [], members = {} }) => {
  return (
    <div>
      <ul>
        {
          messages.map(message => (
            <li key={`${message.sender}-${message.date}`}>
              <Message
                message={message.message}
                sender={members[message.sender]}
                date={message.date} />
            </li>
          ))
        }
      </ul>
    </div>
  )
}

Messages.propTypes = {
  messages: PropTypes.array
}

const mapStateToProps = (state) => ({
  members: state.chat.members,
  messages: state.chat.messages,
  user: state.app.user
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)
