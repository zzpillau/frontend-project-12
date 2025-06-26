import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from '../routes/index.js'

import AuthProvider from '../contexts/AuthProvider.jsx'
import PrivateRoute from './auth/PrivateRoute.jsx'

import LoginPage from './pages/LoginPage.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import MainPage from './pages/MainPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'

import Layout from './layout/Layout.jsx'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import toastConfig from '../toast/toastConfig.js'

import '../scss/App.scss'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.mainPage()} element={<Layout />}>
            <Route path={routes.notFoundPage()} element={<PageNotFound />} />
            <Route
              index
              element={(
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              )}
            />
            <Route path={routes.loginPage()} element={<LoginPage />} />
            <Route path={routes.signupPage()} element={<SignUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer {...toastConfig} />
    </AuthProvider>
  )
}

export default App
