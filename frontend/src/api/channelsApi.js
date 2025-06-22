import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { setActiveChannelId } from '../slices/channelsSlice.js'

// TODO rename endpoint

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channels'],
    }),
    getChannelById: builder.query({
      query: id => `${id}`,
    }),
    addChannel: builder.mutation({
      query: channel => ({
        url: '',
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channels'],
    }),
    removeChannel: builder.mutation({
      query: id => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels'],
    }),
  }),
})

export const createChannelsUpdateHelpers = store => ({
  addChannel: channel => (draft) => {
    draft.push(channel)
  },
  removeChannel: id => (draft) => {
    const newChannels = draft.filter(channel => channel.id !== id)
    store.dispatch(setActiveChannelId(newChannels[0].id))
    return newChannels
  },
})

export const {
  useGetChannelsQuery,
  useGetChannelByIdQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
} = channelsApi
