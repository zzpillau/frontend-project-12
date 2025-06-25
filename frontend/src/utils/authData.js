export const saveAuthData = ({ token, username }) => {
  try {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
  }
  catch (err) {
    console.error('Can not save data in localstorage', err)
  }
}
