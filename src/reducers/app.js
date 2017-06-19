import { REHYDRATE } from 'redux-persist/constants'
import { OPEN_SETTINGS, CLOSE_SETTINGS, UPDATE_USER, RESET } from '../actions/app'

export default function app (state = {}, action) {
  switch (action.type) {
    case RESET:
      return {
        loaded: true,
        user: undefined,
        settingsIsOpen: false
      }
    case REHYDRATE:
      return Object.assign({}, state, action.payload.app)
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
