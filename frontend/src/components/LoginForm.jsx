import React from 'react'
import { Formik, Form, Field } from 'formik'

const LoginForm = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={() => console.log('Nothing to submit')}
    >
      <Form className="col-12 col-md-6 mt-3 mt-md-0">
        <Field name="username" type="text" className="form-control form-floating mb-3" placeholder="Ваш ник" />
        <Field name="password" type="password" className="form-control form-floating mb-4" placeholder="Пароль" />
        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
      </Form>
    </Formik>
  )
}

export default LoginForm
