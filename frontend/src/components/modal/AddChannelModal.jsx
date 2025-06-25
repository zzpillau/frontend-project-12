import { useDispatch } from 'react-redux'

import { useAddChannelMutation } from '../../api/channelsApi.js'
import { setActiveChannelId } from '../../slices/channelsSlice.js'

import { useTranslation } from 'react-i18next'

import { toast } from 'react-toastify'
import handleToastError from '../../toast/handleToastError.js'

import Modal from 'react-bootstrap/Modal'

import AddChannelForm from '../channels/AddChannelForm.jsx'

import CancelButton from './buttons/CancelButton.jsx'
import SubmitButton from './buttons/SubmitButton.jsx'

const AddChannelModal = ({ onClose }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const [addChannel, { isLoading }] = useAddChannelMutation()

  const handleSubmit = async (newChannel) => {
    try {
      if (newChannel?.name?.trim()) {
        const result = await addChannel(newChannel).unwrap()
        dispatch(setActiveChannelId(result.id))
        toast.success(t('channel_added'))
        onClose()
      }
    }
    catch (err) {
      console.error('Add Channel error ocurred', err)
      handleToastError(err.status, t)
    }
  }

  const formId = 'add-channel-form'

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('add_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddChannelForm onSubmit={handleSubmit} />
        <div className="d-flex justify-content-end">
          <CancelButton disabled={isLoading} onClick={onClose} />
          <SubmitButton disabled={isLoading} form={formId} />
        </div>
      </Modal.Body>
    </>
  )
}

export default AddChannelModal
