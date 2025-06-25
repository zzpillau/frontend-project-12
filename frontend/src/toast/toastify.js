import { toast } from 'react-toastify'

const toastify = (t, type, notifCode) => {
  const errorMap = {
    FETCH_ERROR: 'fetch_error',
    PARSING_ERROR: 'parsing_error',
    UNAUTHORIZED: 'unauthorized_error',
  }

  const key = errorMap[notifCode] || notifCode

  const message = t(key)

  return toast[type](message, { toastId: key })
}

export default toastify
