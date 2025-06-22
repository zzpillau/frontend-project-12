import { io } from 'socket.io-client'
import { messagesApi } from '../api/messagesApi.js'
import { channelsApi } from '../api/channelsApi.js'
import { messageUpdateHelpers } from '../api/messagesApi.js'
import { createChannelsUpdateHelpers } from '../api/channelsApi.js'

const initSocket = (store) => {
  const socket = io()

  const channelsUpdateHelpers = createChannelsUpdateHelpers(store)

  socket.on('newMessage', (payload) => {
    store.dispatch(
      messagesApi.util.updateQueryData('getMessages', undefined, messageUpdateHelpers.addMessage(payload)),
    )
  })

  socket.on('newChannel', (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, channelsUpdateHelpers.addChannel(payload)),
    )
  })

  socket.on('removeChannel', (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, channelsUpdateHelpers.removeChannel(payload)),
    )
  })

  socket.on('renameChannel', (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, channelsUpdateHelpers.renameChannel(payload)),
    )
  })
}

export default initSocket
