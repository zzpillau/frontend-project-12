// import { useState } from 'react'
import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './LoginPage.jsx'
import Page404 from './Page404.jsx'

import '../scss/App.scss'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
