// i18n
// socket
// возвращает компонент
import React from 'react';
import { Provider } from 'react-redux';


import store from "./store";

import initSocket from "./socket/socket.js";

import App from '../src/components/App.jsx'

const init = () => {

  initSocket(store)

  return(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>

  )

}

export default init







