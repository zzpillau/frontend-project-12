import toastify from '../toast/toastify.js'
import { getAuthData } from './authData.js'

const handleQueryErrors = (err, auth, t) => {
  if (err.status === 401) {
    const authData = getAuthData()
    if (authData?.token) {
      return
    }
    auth.logOut()
    toastify(t, 'error', 'errors.unauthorized_error')
    return
  }
  console.error(`Error occured:(${err.status}):`, err.message)
  toastify(t, 'error', err.status)
}

export default handleQueryErrors
