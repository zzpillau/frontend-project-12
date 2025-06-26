import { Card, Col, Image } from 'react-bootstrap'

import signupCat from '../../assets/signupCat.png'

import SignUpForm from './SignUpForm.jsx'

const SignUpCard = () => {
  return (
    <Card className="shadow-sm">
      <Card.Body className="row p-5">
        <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <Image src={signupCat} alt="signuo" className="mascot" />
        </Col>
        <Col>
          <SignUpForm />
        </Col>
      </Card.Body>
    </Card>
  )
}

export default SignUpCard
