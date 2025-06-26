import { configureStore } from '@reduxjs/toolkit'

import { channelsApi } from '../api/channelsApi.js'
import { messagesApi } from '../api/messagesApi.js'
import authReducer from '../slices/authSlice.js'
import channelsReducer from '../slices/channelsSlice.js'
import modalReducer from '../slices/modalSlice.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    modal: modalReducer,
    channelsApi: channelsApi.reducer,
    messagesApi: messagesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(channelsApi.middleware, messagesApi.middleware) })
