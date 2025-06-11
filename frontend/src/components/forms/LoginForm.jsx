import React from 'react'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { setCredentials } from '../../slices/authSlice.js'

import { useLocation, useNavigate } from 'react-router-dom'
import routes from '../../routes/routes.js'

import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'


const LoginForm = () => {

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
      password: ''
    },
    onSubmit: async (values) => {
      formik.setSubmitting(false)

      console.log('Something to submit', values)

      const {data} = await axios.post(routes.login(), {...values})

      const token = data.token
      localStorage.setItem(`authToken-${username}`, token)

      dispatch(setCredentials(data))

      // const {from} = location.state
      navigate('/')
    }
  })

  return (
    <Form onSubmit={formik.handleSubmit} >
        <h1 className="text-center mb-4">Войти</h1>
        <Form.Group className='form-floating mb-3'>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder="username"
            name="username"
            id="username"
            autoComplete="username"
            required
            ref={inputRef}
          />
          <Form.Label htmlFor="username">Ваш ник</Form.Label>
        </Form.Group>
        <Form.Group className='form-floating mb-3'>
          <Form.Control
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="password"
            name="password"
            id="password"
            autoComplete="current-password"
            required
          />
          <Form.Label htmlFor="password">Пароль</Form.Label>
          <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="outline-primary" className="w-100 ">Submit</Button>
    </Form>
  )
}

export default LoginForm
