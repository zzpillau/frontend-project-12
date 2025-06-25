import { useContext } from 'react'
import AuthContext from '../../contexts'

import { useLocation, Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const location = useLocation()

  const auth = useContext(AuthContext)

  if (auth.loading) {
    return <div className="alert alert-info">Authorization in process...</div>
  }

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

export default PrivateRoute
