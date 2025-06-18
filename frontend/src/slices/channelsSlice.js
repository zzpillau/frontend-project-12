import { createSlice } from '@reduxjs/toolkit'

import { channelsApi } from '../api/channelsApi.js'

import { messagesApi } from '../api/messagesApi.js'

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
    builder.addCase(setActiveChannelId, (state, action) => {
      state.activeChannelId = action.payload
      action.dispatch(messagesApi.endpoints.getMessages.initiate())
    })
      .addMatcher(
        channelsApi.endpoints.getChannels.matchFulfilled,
        (state, { payload }) => ({
          ...state,
          activeChannelId: payload[0].id,
        }),
      ).addMatcher(
        channelsApi.endpoints.addChannel.matchFulfilled,
        (state, { payload: { id } }) => ({
          ...state,
          activeChannelId: id,
        }),
      )
  },
})

export const { setActiveChannelId } = channelsSlice.actions

export const selectActiveChannelId = state => state.channels.activeChannelId

export default channelsSlice.reducer
