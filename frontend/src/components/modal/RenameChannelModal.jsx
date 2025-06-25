import { useSelector } from 'react-redux'

import { useRenameChannelMutation } from '../../api/channelsApi.js'
import { selectChannelId } from '../../slices/modalSlice.js'

import { useTranslation } from 'react-i18next'

import { toast } from 'react-toastify'
import handleToastError from '../../toast/handleToastError.js'

import Modal from 'react-bootstrap/Modal'

import RenameChannelForm from '../channels/RenameChannelForm.jsx'

import CancelButton from './buttons/CancelButton.jsx'
import SubmitButton from './buttons/SubmitButton.jsx'

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

  const formId = 'rename-channel-form'

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('rename_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RenameChannelForm onSubmit={handleSubmit} />
        <div className="d-flex justify-content-end">
          <CancelButton disabled={isLoading} onClick={onClose} />
          <SubmitButton disabled={isLoading} form={formId} />
        </div>
      </Modal.Body>
    </>
  )
}

export default RenameChannelModal
