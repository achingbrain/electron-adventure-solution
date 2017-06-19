import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import {persistStore, autoRehydrate} from 'redux-persist'
import localForage from 'localforage'
import rootReducer from '../reducers'

const configureStore = (initialState) => {
  // Redux Configuration
  const middleware = []
  const enhancers = []

  // Thunk Middleware
  middleware.push(thunk)

  // Logging Middleware
  middleware.push(createLogger({
    level: 'info',
    collapsed: true
  }))

  enhancers.push(applyMiddleware(...middleware))
  enhancers.push(autoRehydrate())

  // Create Store
  const store = createStore(rootReducer, initialState, compose(...enhancers))

  if (module.hot) {
    module.hot.accept(() =>
      store.replaceReducer(require('../reducers').default) // eslint-disable-line global-require
    )
  }

  // begin periodically persisting the store
  persistStore(store, {storage: localForage})

  return store
}

export default configureStore
