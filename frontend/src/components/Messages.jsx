import React from 'react'
import { useSelector } from 'react-redux'

import { useGetMessagesQuery } from '../api/messagesApi.js'

import { selectActiveChannelId } from '../slices/channelsSlice.js'

const Messages = () => {

  const { data: messages = [], isLoading: isLoadingMessages } = useGetMessagesQuery()
  
  const activeChannelId = useSelector(selectActiveChannelId)

  const activeChannelMessages = messages.filter(m => m.channelId === activeChannelId) ?? []

  if (isLoadingMessages) {
    return <div className="alert alert-info">Loading messages...</div>
  }

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 text-start">
      {activeChannelMessages.map(m => (
        <div key={m.id} className="text-break mb-2">
          <b>{m.username}</b>
          :
          {' '}
          {m.body}
        </div>
      ))}
    </div>
  )
}

export default Messages
