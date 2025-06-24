// i18n
// socket
// возвращает компонент
import React from 'react'
import { Provider } from 'react-redux'

import store from './store'

import initSocket from './socket/socket.js'

import i18next from 'i18next'
import { initReactI18next, I18nextProvider } from 'react-i18next'
import resources from './locales/index.js'

import App from '../src/components/App.jsx'

const init = async () => {
  await i18next
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    })

  initSocket(store)

  return (
    <React.StrictMode>
      <Provider store={store}>
        <I18nextProvider i18n={i18next}>
          <App />
        </I18nextProvider>
      </Provider>
    </React.StrictMode>
  )
}

export default init
