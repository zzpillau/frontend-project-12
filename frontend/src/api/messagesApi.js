import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => '',
    }),
    addMessage: builder.mutation({
      query: newMessage => ({
        url: '',
        method: 'POST',
        body: newMessage,
      }),
    }),
    editMessage: builder.mutation({
      query: (id, body) => ({
        url: id,
        method: 'PATCH',
        body,
      }),
    }),
    removeMessage: builder.mutation({
      query: id => ({
        url: id,
        method: 'DELETE',
      }),
    }),

  }),
})

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
  useRemoveMessageMutation,
} = messagesApi
