// socet
// i18n

// возвращает компонент

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
