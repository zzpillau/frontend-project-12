import { useDispatch } from 'react-redux'

import { useAddChannelMutation } from '../../api/channelsApi.js'
import { setActiveChannelId } from '../../slices/channelsSlice.js'

import { useTranslation } from 'react-i18next'

import toastify from '../../toast/toastify.js'

import AddChannelForm from './AddChannelForm.jsx'
import CancelButton from './buttons/CancelButton.jsx'
import SubmitButton from './buttons/SubmitButton.jsx'

const AddChannelModal = ({ onClose, type }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const [addChannel, { isLoading }] = useAddChannelMutation()

  const handleSubmit = async (newChannel) => {
    if (newChannel?.name?.trim()) {
      const result = await addChannel(newChannel).unwrap()
      dispatch(setActiveChannelId(result.id))
      toastify(t, 'success', 'channel_added')
      onClose()
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
