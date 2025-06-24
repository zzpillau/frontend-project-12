import { useEffect } from 'react'
import cn from 'classnames'

import { useDispatch, useSelector } from 'react-redux'
import { setActiveChannelId } from '../slices/channelsSlice.js'
import { selectActiveChannelId } from '../slices/channelsSlice.js'
import { actions } from '../slices/modalSlice.js'

import { ButtonGroup, Button, Dropdown } from 'react-bootstrap'

import { useGetChannelsQuery } from '../api/channelsApi.js'

import handleToastError from '../helpers/handleToastError.js'
import { useTranslation } from 'react-i18next'

import leoFilter from 'leo-profanity'

const Channels = () => {
  const { t } = useTranslation()
  const { data: channels = [], error, isError } = useGetChannelsQuery()

  console.log('channels', channels)
  const dispatch = useDispatch()

  const handleSetActiveId = (e) => {
    dispatch(setActiveChannelId(e.target.id))
  }

  const handleRemoveModal = (id) => {
    console.log('handleRemoveModal')

    dispatch(actions.openModal({ modalType: 'remove', channelId: id }))
  }

  const handleRenameModal = (id, name) => {
    console.log('handleRenameModal', { modalType: 'rename', channelId: id, channelName: name })
    dispatch(actions.openModal({ modalType: 'rename', channelId: id, channelName: name }))
  }

  const activeChannelId = useSelector(selectActiveChannelId)

  useEffect(() => {
    if (isError) {
      handleToastError(error.status, t)
    }
  }, [isError, error])

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

            {!channel.removable
              && (
                <Button
                  id={channel.id}
                  type="button"
                  variant="null"
                  className={classes}
                  onClick={e => handleSetActiveId(e)}
                >
                  <span className="me-1">#</span>
                  {leoFilter.clean(channel.name)}
                </Button>
              )}
            {channel.removable
              && (
                <Dropdown className="d-flex justify-content-between w-100" as={ButtonGroup}>
                  <Button
                    id={channel.id}
                    type="button"
                    variant="null"
                    className={classes}
                    onClick={e => handleSetActiveId(e)}
                  >
                    <span className="me-1">#</span>
                    {leoFilter.clean(channel.name)}
                  </Button>
                  <Dropdown.Toggle split variant={isActive ? 'secondary' : null} id={`dropdown-${channel.id}`}>
                    <span className="visually-hidden">{t('channel_management')}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleRemoveModal(channel.id)}>{t('remove')}</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRenameModal(channel.id, channel.name)}>{t('rename')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
          </li>
        )
      },
      )}
    </ul>
  )
}

export default Channels
