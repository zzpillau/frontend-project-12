import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import routes from '../routes/'
import { getAuthToken } from '../utils/authData.js'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.messages(),
    prepareHeaders: (headers) => {
      const token = getAuthToken()
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
  }),
})

const messageUpdateHelpers = {
  addMessage: message => (draft) => {
    draft.push(message)
  },
}

export { messageUpdateHelpers }

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messagesApi
