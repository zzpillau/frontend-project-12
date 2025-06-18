import React from 'react'
import axios from 'axios'

const TestSignUp = () => {
  const handleClick = async () => {
    try {
      const response = await axios.post('/api/v1/signup', {
        username: 'testuser',
        password: '123456',
      })
      console.log('Тестовый Юзер создан!', response.data)
    }
    catch (err) {
      console.error('Ошибка регистрации:', err)
    }
  }
  return (
    <button onClick={handleClick} className="btn btn-primary mt-3">
      Зарегистрировать Тестового Юзера
    </button>
  )
}

export default TestSignUp
