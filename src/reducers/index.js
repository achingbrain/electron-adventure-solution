import { combineReducers } from 'redux'
import messages from './messages'
import app from './app'

const rootReducer = combineReducers({
  messages,
  app
})

export default rootReducer
