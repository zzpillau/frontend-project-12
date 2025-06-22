import React from 'react'
import cn from 'classnames'

import { useDispatch, useSelector } from 'react-redux'
import { setActiveChannelId } from '../slices/channelsSlice.js'
import { selectActiveChannelId } from '../slices/channelsSlice.js'
import { actions } from '../slices/modalSlice.js'

import { ButtonGroup, Button, Dropdown } from 'react-bootstrap'

const Channels = ({ items }) => {
  const dispatch = useDispatch()

  const handleSetActiveId = (e) => {
    dispatch(setActiveChannelId(e.target.id))
  }

  const handleRemoveModal = (id) => {
    console.log('handleRemoveModal')

    dispatch(actions.openModal({ modalType: 'remove', channelId: id }))
  }

  const activeChannelId = useSelector(selectActiveChannelId)

  // TODO кнопочку Button компонентом вынести а то дублирование

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {items.map((channel) => {
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
                  {channel.name}
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
                    {channel.name}
                  </Button>
                  <Dropdown.Toggle split variant={isActive ? 'secondary' : null} id={`dropdown-${channel.id}`} />
                  <Dropdown.Menu>
                    <Dropdown.Item>Редактировать</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRemoveModal(channel.id)}>Удалить</Dropdown.Item>
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
