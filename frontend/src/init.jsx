import React from 'react'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import { Provider as StoreProvider } from 'react-redux'
import { initReactI18next, I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import leoFilter from 'leo-profanity'

import rollbarConfig from './rollbar/rollbarConfig.js'
import store from './store'
import initSocket from './socket/socket.js'
import resources from './locales/index.js'

import App from '../src/components/App.jsx'

const init = async () => {
  initSocket(store)

  await i18next
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    })

  leoFilter.add(leoFilter.getDictionary('ru'))
  leoFilter.add(leoFilter.getDictionary('en'))

  return (
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <StoreProvider store={store}>
            <I18nextProvider i18n={i18next}>
              <App />
            </I18nextProvider>
          </StoreProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>
  )
}

export default init
