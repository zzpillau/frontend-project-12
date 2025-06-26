import { useContext } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import AuthContext from '../../contexts'

const PrivateRoute = ({ children }) => {
  const { t } = useTranslation()

  const location = useLocation()

  const auth = useContext(AuthContext)

  if (auth.loading) {
    return <div className="alert alert-info">{t('auth.loading')}</div>
  }

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

export default PrivateRoute
