import { useState, useEffect } from "react"
import AuthContext from "."

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

export default AuthProvider
