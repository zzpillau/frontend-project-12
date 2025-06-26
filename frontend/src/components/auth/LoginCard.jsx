import { Card, Col, Image } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import loginCat from '../../assets/loginCat.png'

import LoginForm from './LoginForm.jsx'

const LoginCard = () => {
  const { t } = useTranslation()

  return (
    <Card className="shadow-sm">
      <Card.Body className="row p-5">
        <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <Image src={loginCat} alt="login" className="mascot" />
        </Col>
        <Col>
          <LoginForm />
        </Col>
      </Card.Body>
      <Card.Footer className="p-4 text-center">
        <span>{t('auth.has_no_account')}</span>
        {' '}
        <a href="/signup">{t('auth.registration')}</a>
      </Card.Footer>
    </Card>
  )
}

export default LoginCard
