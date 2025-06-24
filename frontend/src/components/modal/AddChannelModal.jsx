import React from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import AddChannelForm from '../forms/AddChannelForm.jsx'

import { useAddChannelMutation } from '../../api/channelsApi.js'
import { useDispatch } from 'react-redux'
import { setActiveChannelId } from '../../slices/channelsSlice.js'
import { useTranslation } from 'react-i18next'

const AddChannelModal = ({ onClose }) => {
  const { t } = useTranslation()

  const [addChannel, { isLoading }] = useAddChannelMutation()
  const dispatch = useDispatch()

  const handleSubmit = async (newChannel) => {
    if (newChannel?.name?.trim()) {
      const result = await addChannel(newChannel).unwrap()
      dispatch(setActiveChannelId(result.id))
      onClose()
    }
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('add_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddChannelForm onSubmit={handleSubmit} />
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" disabled={isLoading} onClick={onClose}>
            {t('reject')}
          </Button>
          <Button type="submit" disabled={isLoading} form="add-channel-form" variant="primary">
            {t('send')}
          </Button>
        </div>
      </Modal.Body>
    </>
  )
}

export default AddChannelModal
