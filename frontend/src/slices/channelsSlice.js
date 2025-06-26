import { createSlice } from '@reduxjs/toolkit'

import { channelsApi } from '../api/channelsApi.js'

const initialState = {
  activeChannelId: null,
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActiveChannelId: (state, { payload }) => {
      state.activeChannelId = payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      channelsApi.endpoints.getChannels.matchFulfilled,
      (state, { payload }) => {
        if (state.activeChannelId === null && payload.length > 0) {
          state.activeChannelId = payload[0].id
        }
      },
    ).addMatcher(
      channelsApi.endpoints.addChannel.matchFulfilled,
      (state, { payload }) => {
        state.activeChannelId = payload.id
      },
    )
  },
})

export const { setActiveChannelId } = channelsSlice.actions

export const selectActiveChannelId = state => state.channels.activeChannelId

export default channelsSlice.reducer
