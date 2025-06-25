import { useSelector } from 'react-redux'

import { useRemoveChannelMutation } from '../../api/channelsApi.js'
import { selectChannelId } from '../../slices/modalSlice.js'

import { useTranslation } from 'react-i18next'

import { toast } from 'react-toastify'
import handleToastError from '../../toast/handleToastError.js'

import DeleteButton from './buttons/DeleteButton.jsx'
import CancelButton from './buttons/CancelButton.jsx'

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
      <p className="lead">{t('confirm')}</p>
      <div className="d-flex justify-content-end">
        <CancelButton disabled={isLoading} onClick={onClose} />
        <DeleteButton disabled={isLoading} onClick={handleSubmit} />
      </div>
    </>
  )
}

export default RemoveChannelModal
