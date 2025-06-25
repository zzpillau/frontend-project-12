import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { useRemoveChannelMutation } from '../../api/channelsApi.js'
import { useSelector } from 'react-redux'
import { selectChannelId } from '../../slices/modalSlice.js'
import { useTranslation } from 'react-i18next'

import { toast } from 'react-toastify'
import handleToastError from '../../toast/handleToastError.js'

const RemoveChannelModal = ({ onClose }) => {
  const { t } = useTranslation()

  const [removeChannel, { isLoading }] = useRemoveChannelMutation()

  const id = useSelector(selectChannelId)

  const handleSubmit = async () => {
    try {
      await removeChannel(id).unwrap()
      toast.success(t('channel_removed'))
      onClose()
    }
    catch (err) {
      console.error('ERROR RemoveChannelModal')
      handleToastError(err.status, t)
    }
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('remove_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" disabled={isLoading} onClick={onClose}>
            {t('reject')}
          </Button>
          <Button variant="danger" disabled={isLoading} onClick={handleSubmit}>
            {t('remove')}
          </Button>
        </div>
      </Modal.Body>
    </>
  )
}

export default RemoveChannelModal
