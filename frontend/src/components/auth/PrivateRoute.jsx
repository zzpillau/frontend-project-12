import { useContext } from 'react'
import AuthContext from '../../contexts'

import { useLocation, Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const auth = useContext(AuthContext)

  const location = useLocation()

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

export default PrivateRoute
