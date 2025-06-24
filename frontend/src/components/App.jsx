import React from 'react'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../contexts/index.js'

import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage.jsx'
import Page404 from './pages/Page404.jsx'
import MainPage from './pages/MainPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'

import Layout from './Layout.jsx'

import '../scss/App.scss'

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setLoggedIn(true)
    }
    setLoading(false)
  }, [])

  const logIn = () => setLoggedIn(true)
  const logOut = () => {
    localStorage.removeItem('authToken')
    setLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ loggedIn, loading, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const PrivateRoute = ({ children }) => {
  const auth = useContext(AuthContext)
  const location = useLocation()

  if (auth.loading) {
    console.log('authorization in process')
    return <div className="alert alert-info">Authorization in process...</div>
  }

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<Page404 />} />
            <Route
              index
              element={(
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              )}
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
