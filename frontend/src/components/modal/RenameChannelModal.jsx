import { useSelector } from 'react-redux'

import { useRenameChannelMutation } from '../../api/channelsApi.js'
import { selectChannelId } from '../../slices/modalSlice.js'

import { useTranslation } from 'react-i18next'

import { toast } from 'react-toastify'

import RenameChannelForm from './RenameChannelForm.jsx'

import CancelButton from './buttons/CancelButton.jsx'
import SubmitButton from './buttons/SubmitButton.jsx'

const RenameChannelModal = ({ onClose, type }) => {
  const { t } = useTranslation()

  const [renameChannel, { isLoading }] = useRenameChannelMutation()

  const id = useSelector(selectChannelId)

  const handleSubmit = async (values) => {
    await renameChannel({ id, name: values.name }).unwrap()
    toast.success(t('channel_renamed'))
    onClose()
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
