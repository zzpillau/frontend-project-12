import { useLocation, Link } from 'react-router-dom'
import { Navbar, Container } from 'react-bootstrap'

import { useTranslation } from 'react-i18next'

import AuthButton from '../auth/AuthButton.jsx'

const Header = () => {
  const {t} = useTranslation()
  const { pathname } = useLocation()
  const showLogin = pathname === '/'

  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Link to="/" className="navbar-brand">{t('hexlet_chat')}</Link>
        {showLogin && <AuthButton />}
      </Container>
    </Navbar>
  )
}

export default Header
