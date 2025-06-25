import { useContext } from "react"
import { useLocation, Navigate } from "react-router-dom"
import AuthContext from "../../contexts"


const PrivateRoute = ({ children }) => {
  const auth = useContext(AuthContext)
  const location = useLocation()

  if (auth.loading) {
    console.log('authorization in process')
    return <div className="alert alert-info">Authorization in process...</div>
  }

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

export default PrivateRoute