import { useRef, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import leoFilter from 'leo-profanity'

import { useGetMessagesQuery } from '../../api/messagesApi.js'
import { selectActiveChannelId } from '../../slices/channelsSlice.js'
import AuthContext from '../../contexts/index.js'

import toastify from '../../toast/toastify.js'

const Messages = () => {
  const { t } = useTranslation()

  const { data: messages = [], error, isError } = useGetMessagesQuery()

  const auth = useContext(AuthContext)

  useEffect(() => {
    if (isError) {
      if (error.status === 401) {
        toastify(t, 'error', 'errors.unauthorized_error')
        auth.logOut()
      }
      else {
        console.error(`Unexpected error (${error.status}):`, error)
      }
    }
  }, [isError, error])

  const messagesRef = useRef(null)

  useEffect(() => {
    messagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const activeChannelId = useSelector(selectActiveChannelId)

  const activeChannelMessages = messages.filter(m => m.channelId === activeChannelId) ?? []

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 text-start">
      {activeChannelMessages.map(m => (
        <div key={m.id} className="text-break mb-2">
          <b>{m.username}</b>
          :
          {' '}
          {leoFilter.clean(m.body)}
        </div>
      ))}
      <div ref={messagesRef} />
    </div>
  )
}

export default Messages
