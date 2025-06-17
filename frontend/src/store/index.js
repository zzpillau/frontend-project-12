import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice.js'
import channelsReducer from '../slices/channelsSlice.js'
import { channelsApi } from '../api/channelsApi.js'
import { messagesApi } from '../api/messagesApi.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    channelsApi: channelsApi.reducer,
    messagesApi: messagesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(channelsApi.middleware, messagesApi.middleware) })
