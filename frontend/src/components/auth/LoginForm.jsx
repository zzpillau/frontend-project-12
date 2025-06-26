import axios from 'axios'
import { useEffect, useRef, useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { Form } from 'react-bootstrap'

import routes from '../../routes'
import AuthContext from '../../contexts'
import { setCredentials } from '../../slices/authSlice.js'
import { saveAuthData } from '../../utils/authData.js'

import SubmitAuthButton from './SubmitAuthButton.jsx'

const LoginForm = () => {
  const { t } = useTranslation()

  const [authFailed, setAuthFailed] = useState(false)

  const auth = useContext(AuthContext)

  const dispatch = useDispatch()

  const location = useLocation()
  const navigate = useNavigate()

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setAuthFailed(false)

      try {
        const { data } = await axios.post(routes.login(), { ...values })

        saveAuthData(data)

        dispatch(setCredentials(data.username))

        auth.logIn()

        const from = location.state?.from?.pathname || routes.mainPage()
        navigate(from)
      }
      catch (err) {
        console.error('Authentification error occured', err)
        setAuthFailed(true)
      }
      finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('auth.login')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="username"
          name="username"
          id="username"
          isInvalid={authFailed}
          autoComplete="username"
          required
          ref={inputRef}
        />
        <Form.Label htmlFor="username">{t('auth.nickname')}</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="password"
          name="password"
          id="password"
          isInvalid={authFailed}
          autoComplete="current-password"
          required
        />
        <Form.Label htmlFor="password">{t('auth.password')}</Form.Label>
        <Form.Control.Feedback type="invalid">{t('auth.invalid')}</Form.Control.Feedback>
      </Form.Group>
      <SubmitAuthButton title={t('auth.login')} />
    </Form>
  )
}

export default LoginForm
