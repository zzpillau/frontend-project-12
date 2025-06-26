const AUTH_KEY = 'authData'

export const saveAuthData = ({ token, username }) => {
  try {
    const data = { token, username }
    localStorage.setItem(AUTH_KEY, JSON.stringify(data))
  }
  catch (err) {
    console.error('Can not save auth data', err)
  }
}

export const getAuthData = () => {
  try {
    const storedData = localStorage.getItem(AUTH_KEY)
    return storedData ? JSON.parse(storedData) : null
  }
  catch (err) {
    console.error('Failed to parse auth data', err)
    return null
  }
}

export const removeAuthData = () => localStorage.removeItem(AUTH_KEY)
