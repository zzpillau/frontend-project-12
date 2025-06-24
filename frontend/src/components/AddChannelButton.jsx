import { useDispatch, useSelector } from 'react-redux'

import ModalLayout from '../components/modal/ModalLayout.jsx'

import { Button } from 'react-bootstrap'
import { PlusSquare } from 'react-bootstrap-icons'

import { actions, selectModalStatus, selectModalType } from '../slices/modalSlice.js'

import { useTranslation } from 'react-i18next'

const AddChannelButton = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const showModal = useSelector(selectModalStatus)

  const openModal = () => {
    dispatch(actions.openModal({ modalType: 'add' }))
  }

  const handleClose = () => dispatch(actions.closeModal())

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
