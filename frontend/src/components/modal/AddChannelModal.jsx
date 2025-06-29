import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { useAddChannelMutation } from '../../api/channelsApi.js'
import { setActiveChannelId } from '../../slices/channelsSlice.js'
import AuthContext from '../../contexts/index.js'

import toastify from '../../toast/toastify.js'

import AddChannelForm from './AddChannelForm.jsx'
import CancelButton from './buttons/CancelButton.jsx'
import SubmitButton from './buttons/SubmitButton.jsx'
import handleQueryErrors from '../../utils/handleQueryErrors.js'

const AddChannelModal = ({ onClose, type }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const auth = useContext(AuthContext)

  const [addChannel, { isLoading }] = useAddChannelMutation()

  const handleSubmit = async (newChannel) => {
    try {
      if (newChannel?.name?.trim()) {
        const result = await addChannel(newChannel).unwrap()
        dispatch(setActiveChannelId(result.id))
        toastify(t, 'success', 'notif.added')
        onClose()
      }
    }
    catch (err) {
      handleQueryErrors(err, auth, t)
    }
  }

  return (
    <>
      <AddChannelForm onSubmit={handleSubmit} />
      <div className="d-flex justify-content-end">
        <CancelButton disabled={isLoading} onClick={onClose} />
        <SubmitButton disabled={isLoading} form={type} />
      </div>
    </>
  )
}

export default AddChannelModal
