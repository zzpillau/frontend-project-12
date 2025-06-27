import { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'

import { useGetChannelsQuery } from '../../api/channelsApi.js'
import { setActiveChannelId, selectActiveChannelId } from '../../slices/channelsSlice.js'
import { actions } from '../../slices/modalSlice.js'
import AuthContext from '../../contexts/index.js'

import toastify from '../../toast/toastify.js'

import PrimaryChannelButton from './PrimaryChannelButton.jsx'
import CustomChannelButton from './CustomChannelButton.jsx'

const Channels = () => {
  const { t } = useTranslation()

  const { data: channels = [], isError, error } = useGetChannelsQuery()

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

  const dispatch = useDispatch()

  const handleSetActiveId = (e) => {
    dispatch(setActiveChannelId(e.target.id))
  }

  const handleRemoveModal = (id) => {
    dispatch(actions.openModal({ modalType: 'remove', channelId: id }))
  }

  const handleRenameModal = (id, name) => {
    dispatch(actions.openModal({ modalType: 'rename', channelId: id, channelName: name }))
  }

  const activeChannelId = useSelector(selectActiveChannelId)

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels.map((channel) => {
        const isActive = channel.id === activeChannelId

        const classes = cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn', {
          'btn-secondary': isActive,
        })

        return (
          <li key={channel.id} className="nav-item w-100">
            {channel.removable
              ? (
                  <CustomChannelButton
                    id={channel.id}
                    classes={classes}
                    onClick={e => handleSetActiveId(e)}
                    channelName={channel.name}
                    isActive={isActive}
                    handleRemoveModal={() => handleRemoveModal(channel.id)}
                    handleRenameModal={() => handleRenameModal(channel.id, channel.name)}
                  />
                )
              : (
                  <PrimaryChannelButton
                    id={channel.id}
                    classes={classes}
                    onClick={e => handleSetActiveId(e)}
                    channelName={channel.name}
                  />
                )}
          </li>
        )
      },
      )}
    </ul>
  )
}

export default Channels
