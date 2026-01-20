import React from 'react'
import { HashRouter } from 'react-router'
import { Provider } from 'react-redux'

import Routes from './AppRoutes'
import { MessageProvider, DialogsProvider, StartupProvider } from './components'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <StartupProvider>
          <MessageProvider>
            <DialogsProvider>
              <Routes />
            </DialogsProvider>
          </MessageProvider>
        </StartupProvider>
      </HashRouter>
    </Provider>
  )
}

export default App
