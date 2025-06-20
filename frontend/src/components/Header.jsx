import React from 'react'

import { useLocation } from 'react-router-dom'
import { Navbar, Container } from 'react-bootstrap'
import TestSignUp from './TestUser.jsx'

import AuthButton from './AuthButton.jsx'

const Header = () => {
  const { pathname } = useLocation()
  const showLogin = pathname === '/'

  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand href="/">ZZPILLAU chat</Navbar.Brand>
        <TestSignUp />
        {showLogin && <AuthButton />}
      </Container>
    </Navbar>
  )
}

export default Header
