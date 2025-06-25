export const saveAuthData = ({ token, username }) => {
  try {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
  }
  catch (err) {
    console.error('Can not save data in localstorage', err)
  }
}

export const getAuthToken = () => localStorage.getItem('token')

export const removeAuthToken = () => localStorage.removeItem('token')

export const getAuthUsername = () => localStorage.getItem('username')
