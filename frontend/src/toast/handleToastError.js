import { toast } from 'react-toastify'

const handleToastError = (errorStatus, t) => {
  const message = errorStatus === 'FETCH_ERROR' ? t('fetch_error') : t('parsing_error')
  return toast.error(message)
}

export default handleToastError
