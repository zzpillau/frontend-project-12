import React, {useEffect, useRef, useContext, useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import AuthContext from '../../contexts/index.js'

import { setCredentials } from '../../slices/authSlice.js'

import { useLocation, useNavigate } from 'react-router-dom'
import routes from '../../routes/routes.js'

import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'

const LoginForm = () => {
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
    onSubmit: async (values) => {
      setAuthFailed(false)

      try {
        const { data } = await axios.post(routes.login(), { ...values })

        localStorage.setItem(`authToken`, data.token)
        localStorage.setItem('username', data.username)

        dispatch(setCredentials({ username: data.username }))

        auth.logIn()

        const from = location.state?.from?.pathname || '/'
        navigate(from)
      }
      catch (error) {
        formik.setSubmitting(false)
        console.error('Authentification error', error)
        setAuthFailed(true)
      }
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
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
        <Form.Label htmlFor="username">Ваш ник</Form.Label>
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
        <Form.Label htmlFor="password">Пароль</Form.Label>
        <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 ">Submit</Button>
    </Form>
  )
}

export default LoginForm
