import AuthProvider from '../contexts/AuthProvider.jsx'
import PrivateRoute from './auth/PrivateRoute.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<PageNotFound />} />
            <Route
              index
              element={(
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              )}
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer {...toastConfig} />
    </AuthProvider>
  )
}

export default App
