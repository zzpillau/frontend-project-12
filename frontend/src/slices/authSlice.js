import { createSlice } from '@reduxjs/toolkit'

import { getAuthData } from '../utils/authData.js'

const initialState = {
  username: getAuthData()?.username ?? null,
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
