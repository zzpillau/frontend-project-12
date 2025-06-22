import React from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import AddChannelForm from '../forms/AddChannelForm.jsx'

import { useAddChannelMutation } from '../../api/channelsApi.js'

const AddChannelModal = ({ onClose }) => {
  const [addChannel] = useAddChannelMutation()

  const handleSubmit = (newChannel) => {
    if (newChannel?.name?.trim()) {
      addChannel(newChannel)
      onClose()
    }
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddChannelForm onSubmit={handleSubmit} />
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit" form="add-channel-form" variant="primary">
            Отправить
          </Button>
        </div>
      </Modal.Body>
    </>
  )
}

export default AddChannelModal
