import React, { useEffect, useRef, useContext, useState } from 'react'
import axios from 'axios'

import AuthContext from '../../contexts/index.js'
import { useLocation, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { setCredentials } from '../../slices/authSlice.js'

import { useFormik } from 'formik'
import { Form, Button } from 'react-bootstrap'

import { signUpSchema } from '../../validationSchemas.js'

import { useTranslation } from 'react-i18next'

import routes from '../../routes/routes.js'

const SignUpForm = () => {
  const { t } = useTranslation()

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
      passwordConfirmation: '',
    },
    validationSchema: signUpSchema(t),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      const route = routes.signup()
      const { username, password } = values
      try {
        const { data, status } = await axios.post(route, { username, password })

        localStorage.setItem(`authToken`, data.token)
        localStorage.setItem('username', data.username)

        dispatch(setCredentials({ username: data.username }))

        auth.logIn()

        const from = location.state?.from?.pathname || '/'
        navigate(from)

        return data
      }
      catch (error) {
        console.error('Registration error', error)
        if (error.status === 409) {
          setFieldError('username', t('user_exists'))
        }
      }
      finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('registration')}</h1>

      <Form.Group className="form-floating mb-3">
        <Form.Control
          id="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="username"
          name="username"
          isInvalid={!!formik.errors.username}
          ref={inputRef}
        />
        <Form.Label htmlFor="username">{t('username')}</Form.Label>
        <div className="invalid-tooltip">
          {formik.errors.username}
        </div>
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          id="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="password"
          name="password"
          isInvalid={!!formik.errors.password}
        />
        <Form.Label htmlFor="password">{t('password')}</Form.Label>
        <div className="invalid-tooltip">
          {formik.errors.password}
        </div>
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          id="passwordConfirmation"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirmation}
          placeholder="passwordConfirmation"
          name="passwordConfirmation"
          isInvalid={!!formik.errors.passwordConfirmation}
        />
        <Form.Label htmlFor="passwordConfirmation">{t('password_confirmation')}</Form.Label>
        <div className="invalid-tooltip">
          {formik.errors.passwordConfirmation}
        </div>
      </Form.Group>
      <Button className="w-100" type="submit" variant="outline-primary">{t('signup')}</Button>
    </Form>
  )
}

export default SignUpForm
