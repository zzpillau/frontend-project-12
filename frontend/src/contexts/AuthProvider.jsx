import { useState, useEffect } from 'react'
import AuthContext from '.'

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setLoggedIn(true)
    }
  }, [])

  const logIn = () => setLoggedIn(true)
  const logOut = () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
