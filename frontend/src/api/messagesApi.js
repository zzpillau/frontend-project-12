import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import routes from '../routes/'
import prepareHeaders from '../utils/prepareHeaders.js'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.messages(),
    prepareHeaders,
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
