import React from 'react'

const Messages = ({ items }) => {
  // { id: '1', body: 'text message', channelId: '1', username: 'admin }

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 text-start">
      {items.map(m => (
        <div key={m.id} className="text-break mb-2">
          <b>{m.username}</b>
          :
          <span>
            {' '}
            {m.body}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Messages
