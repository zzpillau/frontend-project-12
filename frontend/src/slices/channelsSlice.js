import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes/routes.js';

import headers from '../utils/buildAuthHeader.js'

const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const response = await axios.get(routes.channels(), headers)
    return response.data
  }
)

const channelsAdapter = createEntityAdapter()

const initialState = channelsAdapter.getInitialState({
  loading: false,
  error: null
})

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  // reducers: {
  //   addChannel: channelsAdapter.addOne,
  //   removeChannel: channelsAdapter.removeOne,
  //   updateChannel: channelsAdapter.updateOne
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchChannels.fulfilled, (state, {payload}) => {
        state.loading = false
        channelsAdapter.setAll(state, payload)
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
  }
})

export  { fetchChannels }

export const {
  selectAll: selectAllChannels,
  selectById: selectChannelById,
} = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer