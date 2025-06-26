import { useContext } from 'react'
import AuthContext from '../../contexts/index.js'

import { useTranslation } from 'react-i18next'

import { Button } from 'react-bootstrap'

const AuthButton = () => {
  const { t } = useTranslation()

  const auth = useContext(AuthContext)

  return (
    auth.loggedIn && <Button variant="primary" onClick={auth.logOut}>{t('auth.logout')}</Button>
  )
}

export default AuthButton
