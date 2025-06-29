import axios from 'axios'
import { useEffect, useRef, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { Form } from 'react-bootstrap'

import { signUpSchema } from '../../validation/validationSchemas.js'
import routes from '../../routes'
import AuthContext from '../../contexts/index.js'
import { setCredentials } from '../../slices/authSlice.js'
import { saveAuthData } from '../../utils/authData.js'

import SubmitAuthButton from './SubmitAuthButton.jsx'

const SignUpForm = () => {
  const { t } = useTranslation()

  const auth = useContext(AuthContext)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: signUpSchema(t),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      const { username, password } = values

      try {
        const { data } = await axios.post(routes.signup(), { username, password })

        saveAuthData(data)

        dispatch(setCredentials(data.username))

        auth.logIn()

        navigate(routes.mainPage())
      }
      catch (err) {
        console.error('Registration error occured', err)
        if (err.status === 409) {
          setFieldError('username', t('auth.user_exists'))
        }
      }
      finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <Form autoComplete="off" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('auth.registration')}</h1>

      <Form.Group className="form-floating mb-3">
        <Form.Control
          id="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="username"
          name="username"
          autoComplete="off"
          isInvalid={!!formik.errors.username}
          ref={inputRef}
        />
        <Form.Label htmlFor="username">{t('auth.username')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          id="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="password"
          name="password"
          autoComplete="off"
          isInvalid={!!formik.errors.password}
        />
        <Form.Label htmlFor="password">{t('auth.password')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          id="passwordConfirmation"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirmation}
          placeholder="passwordConfirmation"
          name="passwordConfirmation"
          autoComplete="off"
          isInvalid={!!formik.errors.passwordConfirmation}
        />
        <Form.Label htmlFor="passwordConfirmation">{t('auth.password_confirmation')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.passwordConfirmation}
        </Form.Control.Feedback>
      </Form.Group>
      <SubmitAuthButton title={t('auth.signup')} />
    </Form>
  )
}

export default SignUpForm
