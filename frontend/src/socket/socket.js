import { io } from 'socket.io-client'
import { messagesApi } from '../api/messagesApi.js'
import { channelsApi } from '../api/channelsApi.js'
import { messageUpdateHelpers } from '../api/messagesApi.js'
import { channelsUpdateHelpers } from '../api/channelsApi.js'

const initSocket = (store) => {
  const socket = io()

  socket.on('newMessage', (payload) => {
    store.dispatch(
      messagesApi.util.updateQueryData('getMessages', undefined, messageUpdateHelpers.addMessage(payload)),
    )
  })

  socket.on('removeMessage', (payload) => {
    store.dispatch(
      messagesApi.util.updateQueryData('getMessages', undefined, messageUpdateHelpers.removeMessage(payload.id)),
    )
  })

  socket.on('newChannel', (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData('addChannel', undefined, channelsUpdateHelpers.addChannel(payload)),
    )
  })
}

export default initSocket
