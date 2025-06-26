import { useLocation, Link } from 'react-router-dom'
import { Navbar, Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import routes from '../../routes/index.js'

import AuthButton from './AuthButton.jsx'

const Header = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const showLogin = pathname === routes.mainPage()

  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Link to="/" className="navbar-brand">{t('titles.hexlet_chat')}</Link>
        {showLogin && <AuthButton />}
      </Container>
    </Navbar>
  )
}

export default Header
