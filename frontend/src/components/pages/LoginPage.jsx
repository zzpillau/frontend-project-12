import { Container, Row, Col } from 'react-bootstrap'

import LoginCard from '../auth/LoginCard.jsx'

const LoginPage = () => {
  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center">
        <Col className="col-12 col-md-8 col-xxl-6">
          <LoginCard />
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
