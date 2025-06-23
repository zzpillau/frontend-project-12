import React from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { useRemoveChannelMutation } from '../../api/channelsApi.js'
import { useSelector } from 'react-redux'
import { selectChannelId } from '../../slices/modalSlice.js'

const RemoveChannelModal = ({ onClose }) => {
  const [removeChannel, { isLoading }] = useRemoveChannelMutation()

  const id = useSelector(selectChannelId)

  const handleSubmit = () => {
    console.log('handleSubmit')
    removeChannel(id)
    onClose()
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" disabled={isLoading} onClick={onClose}>
            Отмена
          </Button>
          <Button variant="primary" disabled={isLoading} onClick={handleSubmit}>
            Отправить
          </Button>
        </div>
      </Modal.Body>
    </>
  )
}

export default RemoveChannelModal
