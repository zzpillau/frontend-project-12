import { toast } from 'react-toastify'

const toastify = (t, type, notifCode) => {
  const errorMap = {
    FETCH_ERROR: 'errors.fetch_error',
    PARSING_ERROR: 'errors.parsing_error',
    Unauthorized: 'errors.unauthorized_error',
    unexpected: 'errors.unexpected_error',
  }

  const key = errorMap[notifCode] || notifCode

  const message = t(key)

  return toast[type](message, { toastId: key })
}

export default toastify
