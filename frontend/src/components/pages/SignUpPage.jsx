import { Container, Row, Col } from 'react-bootstrap'

import SignUpCard from '../auth/SignUpCard.jsx'

const SignUpPage = () => {
  return (
    <Container fluid className="h-100 d-flex flex-column justify-content-center align-items-center px-0">
      <Container fluid>
        <Row className="justify-content-center align-items-center">
          <Col className="col-12 col-md-8 col-xxl-6">
            <SignUpCard />
          </Col>
        </Row>
      </Container>
    </Container>

  )
}

export default SignUpPage
