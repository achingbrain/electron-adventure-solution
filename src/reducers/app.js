import { PERSIST_REHYDRATE } from 'redux-offline/lib/constants'
import { OPEN_SETTINGS, CLOSE_SETTINGS, UPDATE_USER } from '../actions/app'

export default function app (state = {}, action) {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return Object.assign({}, state, action.payload.app, {
        loaded: true
      })
    case OPEN_SETTINGS:
      state = Object.assign({}, state, {
        settingsIsOpen: true
      })

      return state
    case CLOSE_SETTINGS:
      state = Object.assign({}, state, {
        settingsIsOpen: false
      })

      return state
    case UPDATE_USER:
      state = Object.assign({}, state, {
        user: {
          name: action.payload.name,
          avatar: action.payload.avatar
        }
      })
      return state
    default:
      return state
  }
}
