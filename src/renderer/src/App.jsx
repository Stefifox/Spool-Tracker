import React from 'react'
import { HashRouter } from 'react-router'
import { Provider } from 'react-redux'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Routes from './AppRoutes'
import { MessageProvider, DialogsProvider, StartupProvider } from './components'
import store from './store'
import en from './i18n/en'
import it from './i18n/it'

function App() {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      it: { translation: it }
    },
    lng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  })

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
