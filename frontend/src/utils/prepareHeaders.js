import { getAuthData } from './authData.js'

const prepareHeaders = (headers) => {
  const authData = getAuthData()
  if (authData?.token) {
    headers.set('Authorization', `Bearer ${authData.token}`)
  }
  return headers
}

export default prepareHeaders
