import React, {useEffect, useRef, useContext, useState} from 'react'
import axios from 'axios'

import AuthContext from '../../contexts/index.js'
import { useLocation, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { setCredentials } from '../../slices/authSlice.js'

import { useFormik } from 'formik'
import {Form, Button} from 'react-bootstrap'

import { signUpSchema } from '../../validationSchemas.js' 

import routes from '../../routes/routes.js'

const SignUpForm = () => {

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
      passwordConfirmation: '',
    },
    validationSchema: signUpSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, {setSubmitting, setFieldError}) => {
      console.log('SUBMITTING REG')
      const route = routes.signup()
      const {username, password} = values
      try {
      const {data, status} = await axios.post(route, {username, password})
      console.log(status)

        localStorage.setItem(`authToken`, data.token)
        localStorage.setItem('username', data.username)
            
        dispatch(setCredentials({ username: data.username }))

        auth.logIn()

        const from = location.state?.from?.pathname || '/'
        navigate(from)

      return data
      } catch (error) {
        console.error('Registration error', error)
        const errorText = 'Такой пользователь уже существует'
        if (error.status === 409) {
          setFieldError('username', errorText);
        }
        setAuthFailed(true)

      } finally {
      setSubmitting(false)
      }
    }
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Регистрация</h1>

      <Form.Group className="form-floating mb-3">
        <Form.Control
          id="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="username"
          name="username"
          isInvalid={!!formik.errors.username}  
          // ref={inputRef}
          />
        <Form.Label htmlFor="username">Имя пользователя</Form.Label>
        <div placement="left" className="invalid-tooltip">
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
        <Form.Label htmlFor="password">Пароль</Form.Label>
        <div placement="left" className="invalid-tooltip">
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
        <Form.Label htmlFor="passwordConfirmation">Подтвердите пароль</Form.Label>
        <div placement="left" className="invalid-tooltip">
          {formik.errors.passwordConfirmation}
        </div>
      </Form.Group>
      <Button type='submit' variant='outline-primary'>Отправить</Button>
    </Form>
  )

}

export default SignUpForm