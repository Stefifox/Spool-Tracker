import React from 'react'
import { HashRouter } from 'react-router'
import { Provider } from 'react-redux'

import Routes from './Routes'
import { MessageProvider, DialogsProvider } from './components'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <MessageProvider>
          <DialogsProvider>
            <Routes />
          </DialogsProvider>
        </MessageProvider>
      </HashRouter>
    </Provider>
  )
}

export default App
