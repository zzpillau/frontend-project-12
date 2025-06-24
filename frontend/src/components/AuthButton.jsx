import { useContext } from 'react'

import { Button } from 'react-bootstrap'
import AuthContext from '../contexts/index.js'

const AuthButton = () => {
  const auth = useContext(AuthContext)

  return (
    auth.loggedIn && <Button variant="primary" onClick={auth.logOut}>Выйти</Button>
  )
}

export default AuthButton
