import { React, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { fetchChannels } from '../slices/channelsSlice.js'
import { fetchMessages } from '../slices/messagesSlice.js'

import { selectAllChannels } from '../slices/channelsSlice.js'
import { selectAllMessages } from '../slices/messagesSlice.js'

import { selectActiveChannelId } from '../slices/channelsSlice.js'
import useChannel from '../hooks/useChannel.js'

import Channels from './Channels.jsx'
import Messages from './Messages.jsx'

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

  const activeChannelId = useSelector(selectActiveChannelId)
  const activeChannel = useChannel(activeChannelId)

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button type="button" className="p-0 text-primary btn btn-group-vertical">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-plus-square"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0
              1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2
              0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
                >
                </path>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5
              0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                >
                </path>
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <Channels items={channels} />
        </div>

        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small text-start">
              <p className="m-0">
                <b>
                  #
                  {activeChannel?.name}
                </b>
              </p>
              <span className="text-muted">0 сообщений</span>
            </div>
              {<Messages items={messages} channelId={activeChannelId} />}
            <div className="mt-auto px-5 py-3">
              <form noValidate className="py-1 border rounded-2">
                <div className="input-group has-validation">
                  <input
                    name="body"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2 form-control"
                    value=""
                  />
                  <button type="submit" disabled className="btn btn-group-vertical">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-right-square"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 2a1 1 0 0 0-1-1H2a1 1
                    0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0
                    2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0
                    1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0
                    0 1h5.793l-2.147 2.146a.5.5 0 0 0
                    .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5
                    0 1 0-.708.708L10.293 7.5z"
                      >
                      </path>
                    </svg>
                    <span className="visually-hidden">Отправить</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
