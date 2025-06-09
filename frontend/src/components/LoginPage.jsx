import React from 'react'

import LoginForm from './LoginForm.jsx'
import reactLogo from '../assets/react.svg'

const LoginPage = () => {
  return (
    <>
      <img src={reactLogo} alt="reactLogo" />
      <h1>
        Hi! Im LOGIN PAGE
      </h1>
      <hr />
      <LoginForm />
      <hr />
    </>
  )
}

export default LoginPage
