import Header from './Header.jsx'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="h-100 w-100">
      <div className="h-100" id="chat">
        <div className="h-100 d-flex flex-column">
          <Header />
          <div className="h-100 d-flex flex-column justify-content-center align-items-center">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
