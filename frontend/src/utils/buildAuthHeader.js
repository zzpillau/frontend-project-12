const token = localStorage.getItem('authToken')

export default {
    headers: {
    Authorization: `Bearer ${token}`
    }
}