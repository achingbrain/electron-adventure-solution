import { PERSIST_REHYDRATE } from 'redux-offline/lib/constants'
import { ADD_MESSAGE } from '../actions/messages'

export default function messages (state = {}, action) {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return Object.assign({}, state, action.payload.messages)
    case ADD_MESSAGE:
      state = Object.assign({}, state, {
        messages: state.messages.contact(action.payload)
      })

      return state
    default:
      return state
  }
}
