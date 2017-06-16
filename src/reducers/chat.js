import { PERSIST_REHYDRATE } from 'redux-offline/lib/constants'
import { RESET } from '../actions/app'
import { ADD_MEMBER, ADD_MESSAGE, ADD_FILE } from '../actions/chat'

export default function chat (state = {}, action) {
  switch (action.type) {
    case RESET:
      return {
        members: {},
        messages: []
      }
    case PERSIST_REHYDRATE:
      return Object.assign({}, state, {
        members: {},
        messages: []
      }, action.payload.chat)
    case ADD_MEMBER:
      const { remote, sender } = action.payload
      const { id, name, avatar, status } = sender

      const members = JSON.parse(JSON.stringify(state.members || {}))

      members[id] = {
        id, name, avatar, status
      }

      return Object.assign({}, state, {
        members: members
      })
    case ADD_MESSAGE:
      if (action.payload.message.type === 'text') {
        state = Object.assign({}, state, {
          messages: state.messages.concat({
            id: action.payload.message.id,
            type: 'text',
            sender: action.payload.sender.id,
            text: action.payload.message.text,
            date: Date.now(),
            source: action.payload.source
          })
        })
      } else if (action.payload.message.type === 'file') {
        state = Object.assign({}, state, {
          messages: state.messages.concat({
            id: action.payload.message.id,
            sender: action.payload.sender.id,
            type: 'file',
            url: action.payload.message.url,
            size: action.payload.message.size,
            mimeType: action.payload.message.mimeType,
            date: Date.now(),
            source: action.payload.source,
            name: action.payload.message.name
          })
        })
      }
      return state
    default:
      return state
  }
}
