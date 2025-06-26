import { Card, Col } from 'react-bootstrap'

import tomato from '../../assets/tomato.png'

import SignUpForm from './SignUpForm.jsx'

const SignUpCard = () => {
  return (
    <Card className="shadow-sm">
      <Card.Body className="row p-5">
        <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img src={tomato} alt="tomatoLogo" className="logo logo-spin" />
        </Col>
        <Col>
          <SignUpForm />
        </Col>
      </Card.Body>
    </Card>
  )
}

export default SignUpCard
