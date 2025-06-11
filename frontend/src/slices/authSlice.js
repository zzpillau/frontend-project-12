import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: {user, token} }) => {
      state.user = user
      state.token = token
    }
  }
})

export const { setCredentials } = AuthSlice.actions

export default AuthSlice.reducer