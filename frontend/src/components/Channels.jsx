import React from 'react'
import cn from 'classnames'

import { useDispatch, useSelector } from 'react-redux'
import { setActiveChannel } from '../slices/channelsSlice.js'
import { selectActiveChannelId } from '../slices/channelsSlice.js'
import useChannel from '../hooks/useChannel.js'

const Channels = ({ items }) => {
  const dispatch = useDispatch()

  const activeChannelId = useSelector(selectActiveChannelId)

  const activeChannel = useChannel(activeChannelId)

  console.log('activeChannel', activeChannel)

  const handleClick = (e) => {
    console.log('CLICK', e.target)
    dispatch(setActiveChannel(e.target.id))
  }

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {items.map((channel) => {
        console.log('channel', channel)
        console.log('channel.id', channel.id)

        const classes = cn('w-100', 'rounded-0', 'text-start', 'btn', {
          'btn-secondary': channel.id === activeChannelId,
        })

        return (
          <li key={channel.id} className="nav-item w-100">
            <button
              id={channel.id}
              type="button"
              className={classes}
              onClick={e => handleClick(e)}
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </li>
        )
      },
      )}
    </ul>
  )
}

export default Channels
