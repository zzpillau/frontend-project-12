import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './LoginPage.jsx'
import Page404 from './Page404.jsx'
import MainPage from './MainPage.jsx'

import '../scss/App.scss'
import { Provider } from 'react-redux'
import store from '../slices/index.js'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
