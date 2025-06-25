import { useDispatch, useSelector } from 'react-redux'

import { actions, selectModalStatus, selectModalType } from '../../slices/modalSlice.js'

import { Button } from 'react-bootstrap'
import { PlusSquare } from 'react-bootstrap-icons'

import { useTranslation } from 'react-i18next'

import ModalLayout from '../modal/ModalLayout.jsx'

const AddChannelButton = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const openModal = () => {
    dispatch(actions.openModal({ modalType: 'add' }))
  }

  const handleClose = () => dispatch(actions.closeModal())

  const showModal = useSelector(selectModalStatus)
  const modalType = useSelector(selectModalType)

  return (
    <>
      <Button
        type="button"
        variant="group-vertical"
        className="p-0 text-primary"
        onClick={openModal}
      >
        <PlusSquare size={20} />
        <span className="visually-hidden">{t('plus')}</span>
      </Button>
      <ModalLayout show={showModal} onHide={handleClose} type={modalType} />
    </>
  )
}

export default AddChannelButton
