import { React, useContext } from 'react'

import { useLocation, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import AuthContext from '../contexts/index.js'

const AuthButton = () => {
  const auth = useContext(AuthContext)
  const location = useLocation()

  return (
    auth.loggedIn
      ? <Button variant="dark" onClick={auth.logOut}>Log out</Button>
      : <Button variant="dark" as={Link} to="/login" state={{ from: location }}>Log in</Button>
  )
}

export default AuthButton
