import { React, useContext } from 'react'

import { useLocation, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import AuthContext from '../contexts/index.js'

const AuthButton = () => {
  const auth = useContext(AuthContext)
  const location = useLocation()

  return (
    auth.loggedIn
      ? <Button variant="primary" onClick={auth.logOut}>Выйти</Button>
      : <Button variant="primary" as={Link} to="/login" state={{ from: location }}>Войти</Button>
  )
}

export default AuthButton
