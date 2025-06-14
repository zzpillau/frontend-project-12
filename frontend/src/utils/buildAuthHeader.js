const getHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})


export default getHeaders