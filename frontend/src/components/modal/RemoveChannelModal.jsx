import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { useRemoveChannelMutation } from '../../api/channelsApi.js'
import { selectChannelId } from '../../slices/modalSlice.js'
import AuthContext from '../../contexts'

import toastify from '../../toast/toastify.js'
import handleQueryErrors from '../../utils/handleQueryErrors.js'

import DeleteButton from './buttons/DeleteButton.jsx'
import CancelButton from './buttons/CancelButton.jsx'

const RemoveChannelModal = ({ onClose }) => {
  const { t } = useTranslation()

  const [removeChannel, { isLoading }] = useRemoveChannelMutation()

  const id = useSelector(selectChannelId)

  const auth = useContext(AuthContext)

  const handleSubmit = async () => {
    try {
      await removeChannel(id).unwrap()
      toastify(t, 'success', 'notif.removed')
      onClose()
    }
    catch (err) {
      handleQueryErrors(err, auth, t)
    }
  }

  return (
    <>
      <p className="lead">{t('modals.confirm')}</p>
      <div className="d-flex justify-content-end">
        <CancelButton disabled={isLoading} onClick={onClose} />
        <DeleteButton disabled={isLoading} onClick={handleSubmit} />
      </div>
    </>
  )
}

export default RemoveChannelModal
