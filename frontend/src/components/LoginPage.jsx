import React from 'react'

import LoginForm from './forms/LoginForm.jsx'
import tomato from '../assets/tomato.png'

const LoginPage = () => {

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="container-fluid">
        <div className="row justify-content-center pt-5">
          <div className="card-body p-5">
            <img src={tomato} alt="tomatoLogo" className='logo logo-spin'/>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
