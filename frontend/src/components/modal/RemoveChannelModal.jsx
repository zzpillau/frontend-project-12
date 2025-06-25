import { useSelector } from 'react-redux'

import { useRemoveChannelMutation } from '../../api/channelsApi.js'
import { selectChannelId } from '../../slices/modalSlice.js'

import { useTranslation } from 'react-i18next'

import toastify from '../../toast/toastify.js'

import DeleteButton from './buttons/DeleteButton.jsx'
import CancelButton from './buttons/CancelButton.jsx'

const RemoveChannelModal = ({ onClose }) => {
  const { t } = useTranslation()

  const [removeChannel, { isLoading }] = useRemoveChannelMutation()

  const id = useSelector(selectChannelId)

  const handleSubmit = async () => {
    try {
      await removeChannel(id).unwrap()
      toastify(t, 'success', 'channel_removed')
      onClose()
    }
    catch (err) {
      console.error('Channel remove error occured', err)
      toastify(t, 'error', err.status)
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
