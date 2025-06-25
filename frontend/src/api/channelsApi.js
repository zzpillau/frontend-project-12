import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import routes from '../routes/'

import { setActiveChannelId } from '../slices/channelsSlice.js'

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.channels(),
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
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
    renameChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: id,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: ['Channels'],
    }),
  }),
})

export const createChannelsUpdateHelpers = store => ({
  addChannel: channel => (draft) => {
    draft.push(channel)
  },
  removeChannel: ({ id }) => (draft) => {
    const index = draft.findIndex(c => c.id === id && c.removable)
    if (index !== -1) {
      draft.splice(index, 1)
      store.dispatch(setActiveChannelId(draft[0]?.id ?? null))
    }
    else {
      console.warn('Channel not found', id)
    }
  },
  renameChannel: ({ id, name }) => (draft) => {
    const channel = draft.find(c => c.id === id)
    if (channel) {
      channel.name = name
    }
  },
})

export const {
  useGetChannelsQuery,
  useGetChannelByIdQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
} = channelsApi
