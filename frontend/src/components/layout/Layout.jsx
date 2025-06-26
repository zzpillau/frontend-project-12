import { Container } from 'react-bootstrap'

import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'

const Layout = () => {
  return (
    <Container fluid className="h-100 w-100 px-0">
      <div id="chat" className="h-100 d-flex flex-column">
        <Header />
        <Outlet />
      </div>
    </Container>
  )
}

export default Layout
