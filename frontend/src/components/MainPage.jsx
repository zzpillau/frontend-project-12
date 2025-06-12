import {React, useEffect} from 'react'

import axios from 'axios'
import routes from '../routes/routes.js'

import { useDispatch, useSelector } from 'react-redux'

import { fetchChannels } from '../slices/channelsSlice.js'

import { selectAllChannels } from '../slices/channelsSlice.js'

const MainPage = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchChannels())
  }, [])

  const channels = useSelector(selectAllChannels)
  console.log('CHANNELS', channels)

  return (
    <>
      <h1>MAIN PAGE</h1>
      <p>soon here will be a CHAT</p>
    </>
  )
}

export default MainPage
