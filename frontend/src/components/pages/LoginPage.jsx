import React from 'react'

import LoginForm from '../forms/LoginForm.jsx'
import tomato from '../../assets/tomato.png'

const LoginPage = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={tomato} alt="tomatoLogo" className="logo logo-spin" />
              </div>
              <div className="col">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
