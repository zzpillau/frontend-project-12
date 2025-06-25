import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: localStorage.getItem('username') || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.username = payload
    },
  },
})

export const { setCredentials } = authSlice.actions

export const selectUsername = state => state.auth.username

export default authSlice.reducer
