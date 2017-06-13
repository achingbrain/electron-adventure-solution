import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware, routerActions } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import { offline } from 'redux-offline'
import offlineConfig from 'redux-offline/lib/defaults'
import localforage from 'localforage'
import history from './history'
import rootReducer from '../reducers'

offlineConfig.persistOptions = {
  storage: localforage
}

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

  // Router Middleware
  middleware.push(routerMiddleware(history))

  enhancers.push(applyMiddleware(...middleware))
  enhancers.push(offline(offlineConfig))

  // Create Store
  const store = createStore(rootReducer, initialState, compose(...enhancers))

  if (module.hot) {
    module.hot.accept(() =>
      store.replaceReducer(require('../reducers').default) // eslint-disable-line global-require
    )
  }

  return store
}

export default configureStore
