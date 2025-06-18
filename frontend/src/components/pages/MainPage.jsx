import { React } from 'react'

import { useSelector } from 'react-redux'

import { selectActiveChannelId } from '../../slices/channelsSlice.js'
import { useGetChannelsQuery } from '../../api/channelsApi.js'
import { useGetMessagesQuery } from '../../api/messagesApi.js'

import Channels from '../Channels.jsx'
import Messages from '../Messages.jsx'
import MessageForm from '../forms/MessageForm.jsx'

import { Button } from 'react-bootstrap'
import { PlusSquare } from 'react-bootstrap-icons'
import ActiveChannelInfo from '../ActiveChannelInfo.jsx'

const MainPage = () => {
  const { data: channels = [], isLoading: isLoadingChannels, error: channelsError } = useGetChannelsQuery()

  const activeChannelId = useSelector(selectActiveChannelId)

  const activeChannel = channels?.find(c => c.id === activeChannelId)


  if (isLoadingChannels) {
    return <div className="alert alert-info">Loading channels...</div>
  }


  if (channelsError) {
    return (
      <div className="alert alert-danger">
        <strong>Error:</strong>
        {' '}
        {channelsError.data?.message || 'Failed to load channels'}
      </div>
    )
  }

  if (!isLoadingChannels && channels) {
    return (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>Каналы</b>
              <Button type="button" variant="group-vertical" className="p-0 text-primary">
                <PlusSquare size={20} />
                <span className="visually-hidden">+</span>
              </Button>
            </div>
            <Channels items={channels} />
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <ActiveChannelInfo />
              <Messages />
              <div className="mt-auto px-5 py-3">
                <MessageForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MainPage
