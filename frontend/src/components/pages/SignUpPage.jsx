import { Container, Row, Col } from 'react-bootstrap'

import SignUpCard from '../auth/SignUpCard.jsx'

const SignUpPage = () => {
  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center">
        <Col className="col-12 col-md-8 col-xxl-6">
          <SignUpCard />
        </Col>
      </Row>
    </Container>
  )
}

export default SignUpPage
