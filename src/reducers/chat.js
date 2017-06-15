import { PERSIST_REHYDRATE } from 'redux-offline/lib/constants'
import { ADD_MEMBER, ADD_MESSAGE } from '../actions/chat'

export default function chat (state = {}, action) {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return Object.assign({}, state, {
        members: {},
        messages: []
      }, action.payload.chat)
    case ADD_MEMBER:
      const { id, name, avatar, status, address, port } = action.payload
      const members = JSON.parse(JSON.stringify(state.members || {}))

      members[id] = {
        id, name, avatar, status, address, port
      }

      return Object.assign({}, state, {
        members: members
      })
    case ADD_MESSAGE:
      state = Object.assign({}, state, {
        messages: state.messages.concat({
          sender: action.payload.id,
          message: action.payload.message,
          date: Date.now(),
          source: action.payload.source
        })
      })

      return state
    default:
      return state
  }
}
