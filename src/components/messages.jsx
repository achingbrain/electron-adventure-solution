import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Message from './message'
import FileMessage from './file-message'
import TextMessage from './text-message'
import { connect } from 'react-redux'

class Messages extends React.Component {
  static propTypes = {
    messages: PropTypes.array
  }

  componentDidMount() {
     this.scrollToBottom()
  }

  componentDidUpdate() {
     this.scrollToBottom()
  }

  scrollToBottom = () => {
    const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer)
    messagesContainer.parentNode.scrollTop = messagesContainer.scrollHeight
  }

  render ()  {
    return (
      <div ref={ref => this.messagesContainer = ref}>
      {
          this.props.messages.map(message => (
            <div key={`${message.sender}-${message.date}`}>
              <Message { ...message} sender={this.props.members[message.sender]}>
                {
                  message.file ?
                    <FileMessage { ...message} sender={this.props.members[message.sender]} /> :
                    <TextMessage { ...message} sender={this.props.members[message.sender]} />
                }
              </Message>
            </div>
          ))
        }
      </div>
    )
  }
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
