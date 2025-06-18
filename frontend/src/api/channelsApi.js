import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
    }),
    removeChannel: builder.mutation({
      query: id => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetChannelsQuery,
  useGetChannelByIdQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
} = channelsApi
