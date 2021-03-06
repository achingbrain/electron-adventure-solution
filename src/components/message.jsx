import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'

const Message = ({ children, date, sender, user, source, id }) => {
  const now = Date.now()
  let time

  if (date > (now - 600000)) {
    time = moment(date).fromNow()
  } else if (date > moment().startOf('day')) {
    time = moment(date).format('hh:mm')
  } else if (date > moment().startOf('day')) {
    time = moment(date).format('ddd Do hh:mm')
  }

  return (
    <div className={`m1 p1 flex ${source ? 'bg-fuchsia' : 'bg-aqua'}`} data-type='message' data-source={source} data-message-id={id}>
      <div className={`flex-none ${source ? 'ml1' : 'mr1'}`} style={{width: 50, order: source ? 1 : 0}}>
        {
          (sender && sender.avatar) ? <img src={sender.avatar} style={{width: 50, height: 50}} /> : <div className='bg-gray' style={{width: 50, height: 50}} />
        }
      </div>
      <div className={`flex-auto ${source ? 'right-align' : 'left-align'}`} style={{order: source ? 0 : 1}}>
        <div className='flex-none muted'>{sender.name} {time}</div>
        <div>{children}</div>
      </div>

    </div>
  )
}

Message.propTypes = {
  id: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  sender: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }),
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string
  })
}

const mapStateToProps = (state) => ({
  user: state.app.user
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message)
