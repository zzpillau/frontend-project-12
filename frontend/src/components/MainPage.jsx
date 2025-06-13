import { React, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { fetchChannels } from '../slices/channelsSlice.js'
import { fetchMessages } from '../slices/messagesSlice.js'

import { selectAllChannels } from '../slices/channelsSlice.js'
import { selectAllMessages } from '../slices/messagesSlice.js'

const MainPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchChannels())
    dispatch(fetchMessages())
  }, [])

  const channels = useSelector(selectAllChannels)
  const messages = useSelector(selectAllMessages)
  console.log('CHANNELS', channels)
  console.log('MESSAGES', messages)

  return (
    <>
      <h1>MAIN PAGE</h1>
      <p>soon here will be a CHAT</p>
    </>
  )
}

export default MainPage
