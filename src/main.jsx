import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import configureStore from './store/create'
import history from './store/history'
import Page from './containers/page'
import User from './containers/user'
import IPC from './containers/ipc'

const store = configureStore()

ReactDOM.render((
  <Provider store={store}>
    <IPC>
      <User>
        <Page />
      </User>
    </IPC>
  </Provider>
), document.getElementById('app-root'))
