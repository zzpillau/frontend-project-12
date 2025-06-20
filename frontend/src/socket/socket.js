import { io } from 'socket.io-client'
import { messagesApi } from '../api/messagesApi.js'
import { messageUpdateHelpers } from '../api/messagesApi.js'

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
}

export default initSocket

// app.post('/api/v1/messages', { preValidation: [app.authenticate] }, async (req, reply) => {
// const message = req.body;
// const messageWithId = {
//   ...message,
//   removable: true,
//   id: getNextId(),
// };

// app.io.emit('newMessage', messageWithId);

// app.patch('/api/v1/messages/:messageId', { preValidation: [app.authenticate] }, async (req, reply) => {
//     const { messageId } = req.params;
//     const { body } = req.body;
//     const message = state.messages.find((c) => c.id === messageId);
//     if (!message) {
//       reply.code(404);
//       return;
//     }
//     message.body = body;

//     app.io.emit('renameMessage', message);

// app.delete('/api/v1/messages/:messageId', { preValidation: [app.authenticate] }, async (req, reply) => {
//     const { messageId } = req.params;
//     // @ts-ignore
//     state.messages = state.messages.filter((m) => m.id !== messageId);
//     const data = { id: messageId };

//     app.io.emit('removeMessage', data);
