import { combineReducers } from 'redux'
import chat from './chat'
import app from './app'

const rootReducer = combineReducers({
  chat,
  app
})

export default rootReducer
