import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { useRenameChannelMutation } from '../../api/channelsApi.js'
import { useSelector } from 'react-redux'
import { selectChannelId } from '../../slices/modalSlice.js'

import { useTranslation } from 'react-i18next'

import RenameChannelForm from '../forms/RenameChannelForm.jsx'

import { toast } from 'react-toastify'
import handleToastError from '../../helpers/handleToastError.js'

const RenameChannelModal = ({ onClose }) => {
  const { t } = useTranslation()

  const [renameChannel, { isLoading }] = useRenameChannelMutation()

  const id = useSelector(selectChannelId)

  const handleSubmit = async (values) => {
    try {
      await renameChannel({ id, name: values.name }).unwrap()
      toast.success(t('channel_renamed'))
      onClose()
    }
    catch (err) {
      console.error('ERROR RenameChannelModal')
      handleToastError(err.status, t)
    }
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('rename_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RenameChannelForm onSubmit={handleSubmit} />
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" disabled={isLoading} onClick={onClose}>
            {t('reject')}
          </Button>
          <Button type="submit" form="rename-channel-form" variant="primary" disabled={isLoading}>
            {t('send')}
          </Button>
        </div>
      </Modal.Body>
    </>
  )
}

export default RenameChannelModal
