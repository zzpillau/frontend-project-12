// i18n
// socket
// возвращает компонент
import React from 'react'

import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import { Provider as StoreProvider } from 'react-redux'

import store from './store'

import initSocket from './socket/socket.js'

import i18next from 'i18next'
import { initReactI18next, I18nextProvider } from 'react-i18next'
import resources from './locales/index.js'

import leoFilter from 'leo-profanity';

import App from '../src/components/App.jsx'

const init = async () => {

  const rollbarConfig = {
    // accessToken: process.env.REACT_APP_POST_CLIENT_ITEM_ACCESS_TOKEN,
    accessToken: '506517bc535d4b81866d3c461c1492a4',
    environment: 'testenv',
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

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

  initSocket(store)

  function TestError() { const a = null; return a.hello(); }

  return (
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <StoreProvider store={store}>
            <I18nextProvider i18n={i18next}>
              <App />
              <TestError />
            </I18nextProvider>
          </StoreProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>
  )
}

export default init
