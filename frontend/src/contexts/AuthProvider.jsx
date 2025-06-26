import { useState, useEffect } from 'react'

import AuthContext from '.'
import { getAuthToken, removeAuthToken } from '../utils/authData.js'

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getAuthToken()
    if (token) {
      setLoggedIn(true)
    }
    setLoading(false)
  }, [])

  const logIn = () => {
    setLoggedIn(true)
  }
  const logOut = () => {
    removeAuthToken()
    setLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ loggedIn, loading, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
