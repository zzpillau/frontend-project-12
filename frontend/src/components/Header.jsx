import React from 'react'

import { useLocation, Link } from 'react-router-dom'
import { Navbar, Container } from 'react-bootstrap'

import AuthButton from './AuthButton.jsx'

const Header = () => {
  const { pathname } = useLocation()
  const showLogin = pathname === '/'

  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Link to="/" className="navbar-brand">Hexlet Chat</Link>
        {showLogin && <AuthButton />}
      </Container>
    </Navbar>
  )
}

export default Header
