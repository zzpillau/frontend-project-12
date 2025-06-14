import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import routes from '../routes/routes.js'

import getHeaders from '../utils/buildAuthHeader.js'


const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const headers = getHeaders()
    console.log('fetchChannels')
    const response = await axios.get(routes.channels(), getHeaders(localStorage.getItem('authToken')))
    return response.data
  },
)

const channelsAdapter = createEntityAdapter()

const initialState = channelsAdapter.getInitialState({
  loading: false,
  error: null,
  activeChannel: null,
})

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActiveChannel: (state, { payload }) => {
      state.activeChannel = payload
    },
  },
  extraReducers: (builder) => {
    //   TO-DO сделать когда будет задача:
    //   addChannel: channelsAdapter.addOne,
    //   removeChannel: channelsAdapter.removeOne,
    //   updateChannel: channelsAdapter.updateOne

    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        channelsAdapter.setAll(state, payload)
        state.activeChannel = payload[0].id
        state.loading = false
      })
      .addCase(fetchChannels.rejected, (state, { error }) => {
        state.loading = false
        state.error = error
      })
  },
})

export const { setActiveChannel } = channelsSlice.actions

export { fetchChannels }

export const {
  selectAll: selectAllChannels,
  selectById: selectChannelById,
} = channelsAdapter.getSelectors(state => state.channels)

export const selectActiveChannelId = state => state.channels.activeChannel

export default channelsSlice.reducer
