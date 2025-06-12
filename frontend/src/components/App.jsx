import React from 'react'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../contexts/index.js'

import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from '../slices/index.js'

import LoginPage from './LoginPage.jsx'
import Page404 from './Page404.jsx'
import MainPage from './MainPage.jsx'

import { Button } from 'react-bootstrap'
import '../scss/App.scss'


const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true);

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

  console.log('auth PrivateRoute', auth)

  const location = useLocation()

  if (auth.loading) {
    console.log('Loading')
    return <div>Loading...</div>;
  }

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

const AuthButton = () => {
  const auth = useContext(AuthContext)
  const location = useLocation()

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AuthButton />
          <Routes>
            <Route path="*" element={<Page404 />} />
            <Route path="/" element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
              } />
            <Route path="login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  )
}

export default App
