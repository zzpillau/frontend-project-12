import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { useRenameChannelMutation } from '../../api/channelsApi.js'
import { selectChannelId } from '../../slices/modalSlice.js'
import AuthContext from '../../contexts'

import toastify from '../../toast/toastify.js'
import handleQueryErrors from '../../utils/handleQueryErrors.js'

import RenameChannelForm from './RenameChannelForm.jsx'
import CancelButton from './buttons/CancelButton.jsx'
import SubmitButton from './buttons/SubmitButton.jsx'

const RenameChannelModal = ({ onClose, type }) => {
  const { t } = useTranslation()

  const [renameChannel, { isLoading }] = useRenameChannelMutation()

  const id = useSelector(selectChannelId)

  const auth = useContext(AuthContext)

  const handleSubmit = async (values) => {
    try {
      await renameChannel({ id, name: values.name }).unwrap()
      toastify(t, 'success', 'notif.renamed')
      onClose()
    }
    catch (err) {
      handleQueryErrors(err, auth, t)
    }
  }

  return (
    <>
      <RenameChannelForm onSubmit={handleSubmit} />
      <div className="d-flex justify-content-end">
        <CancelButton disabled={isLoading} onClick={onClose} />
        <SubmitButton disabled={isLoading} form={type} />
      </div>
    </>
  )
}

export default RenameChannelModal
