import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useGetMessagesQuery } from '../api/messagesApi.js'

import { selectActiveChannelId } from '../slices/channelsSlice.js'

import handleToastError from '../helpers/handleToastError.js'
import { useTranslation } from 'react-i18next'

const Messages = () => {
  const {t} = useTranslation()
  
  const { data: messages = [], error, isError } = useGetMessagesQuery()

  const messagesRef = useRef(null)

  useEffect(() => {
    messagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isError) {
      handleToastError(error.status, t)
    }
  }, [isError, error])

  const activeChannelId = useSelector(selectActiveChannelId)

  const activeChannelMessages = messages.filter(m => m.channelId === activeChannelId) ?? []
  
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
      <div ref={messagesRef} />
    </div>
  )
}

export default Messages
