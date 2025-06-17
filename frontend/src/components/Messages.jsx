import React from 'react'

const Messages = ({ items, channelId }) => {
  // { id: '1', body: 'text message', channelId: '1', username: 'admin }

  const activeChannelMessages = items.filter(message => message.channelId === channelId) ?? []
  console.log('activeChannelMessages', activeChannelMessages)

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 text-start">
      <b>test</b>
      : test_message for channel
      {channelId}
      {activeChannelMessages.map(m => (
        <div key={m.id} className="text-break mb-2">
          <b>{m.username}</b>
          :
          {m.body}
        </div>
      ))}
    </div>
  )
}

export default Messages
