import { useState, useEffect, useMemo } from 'react'

import AuthContext from '.'
import { getAuthData, removeAuthData } from '../utils/authData.js'

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getAuthData()

    if (auth?.token) {
      setLoggedIn(true)
    }
    setLoading(false)
  }, [])

  const logIn = () => {
    setLoggedIn(true)
  }
  const logOut = () => {
    removeAuthData()
    setLoggedIn(false)
  }

  const memoValue = useMemo(() => ({ loggedIn, loading, logIn, logOut }), [loggedIn, loading])

  return (
    <AuthContext.Provider value={memoValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
