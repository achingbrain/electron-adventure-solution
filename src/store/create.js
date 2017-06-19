import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore, autoRehydrate } from 'redux-persist'
import localForage from 'localforage'
import rootReducer from '../reducers'

const configureStore = (initialState) => {
  // Redux Configuration
  const middleware = [
    createLogger({
      level: 'info',
      collapsed: true
    })
  ]
  const enhancers = [
    applyMiddleware(...middleware),
    autoRehydrate()
  ]

  // Create Store
  const store = createStore(rootReducer, initialState, compose(...enhancers))

  // begin periodically persisting the store
  persistStore(store, {storage: localForage})

  return store
}

export default configureStore
