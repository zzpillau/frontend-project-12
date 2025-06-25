import LoginForm from '../auth/LoginForm.jsx'
import tomato from '../../assets/tomato.png'

import { useTranslation } from 'react-i18next'

const LoginPage = () => {
  const { t } = useTranslation()
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
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('has_no_account')}</span>
                {' '}
                <a href="/signup">{t('registration')}</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
