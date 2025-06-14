import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import routes from '../routes/routes.js'

import getHeaders from '../utils/buildAuthHeader.js'

const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    console.log('fetchMessages')
    const response = await axios.get(routes.messages(), getHeaders(localStorage.getItem('authToken')))
    return response.data
  },
)

const messagesAdapter = createEntityAdapter()

const initialState = messagesAdapter.getInitialState({
  loading: false,
  error: null,
})

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  // reducers: {
  //   addChannel: messagesAdapter.addOne,
  //   removeChannel: messagesAdapter.removeOne,
  //   updateChannel: messagesAdapter.updateOne
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        state.loading = false
        messagesAdapter.setAll(state, payload)
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
  },
})

export { fetchMessages }

export const {
  selectAll: selectAllMessages,
  selectById: selectMessageById,
} = messagesAdapter.getSelectors(state => state.messages)

export default messagesSlice.reducer
