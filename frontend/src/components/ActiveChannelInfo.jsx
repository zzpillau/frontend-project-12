import React from "react"

import { useSelector } from "react-redux"

import { useGetChannelsQuery } from "../api/channelsApi.js"

import { useGetMessagesQuery } from "../api/messagesApi.js"

import { selectActiveChannelId } from "../slices/channelsSlice.js"


const ActiveChannelInfo = () => {

  const { data: channels = [] } = useGetChannelsQuery()
  const { data: messages = [] } = useGetMessagesQuery()
  
  const activeChannelId = useSelector(selectActiveChannelId)

  const activeChannel = channels?.find(c => c.id === activeChannelId)

  const activeChannelMessages = messages.filter(m => m.channelId === activeChannelId) ?? []

  const messagesCount = activeChannelMessages?.length || 0

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small text-start">
      <p className="m-0">
        <b>
          #
          {' '}
          {activeChannel?.name}
        </b>
      </p>
      <span className="text-muted">
        {messagesCount}
        {' '}
        сообщений
      </span>
    </div>
  )
}

export default ActiveChannelInfo