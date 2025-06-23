import React from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { useRenameChannelMutation } from '../../api/channelsApi.js'
import { useSelector } from 'react-redux'
import { selectChannelId } from '../../slices/modalSlice.js'

import RenameChannelForm from '../forms/RenameChannelForm.jsx'

const RenameChannelModal = ({ onClose }) => {
  const [renameChannel, { isLoading }] = useRenameChannelMutation()

  const id = useSelector(selectChannelId)
  console.log('id', id)

  const handleSubmit = (values) => {
    renameChannel({ id, name: values.name })
    onClose()
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RenameChannelForm onSubmit={handleSubmit} />
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" disabled={isLoading} onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit" form="rename-channel-form" variant="primary" disabled={isLoading}>
            Отправить
          </Button>
        </div>
      </Modal.Body>
    </>
  )
}

export default RenameChannelModal
