import { Container } from 'react-bootstrap'

import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'

const Layout = () => {
  return (
    <Container fluid className="h-100 w-100 px-0">
      <div id="chat" className="h-100 d-flex flex-column">
        <Header />
        <Container fluid className="h-100 d-flex flex-column justify-content-center align-items-center px-0">
          <Outlet />
        </Container>
      </div>
    </Container>
  )
}

export default Layout
