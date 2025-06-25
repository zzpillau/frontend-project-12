import { useTranslation } from 'react-i18next'

import Modal from 'react-bootstrap/Modal'

import getModalComponent from '.'

const ModalLayout = ({ show, onHide, type }) => {
  const { t } = useTranslation()

  const ModalComponent = getModalComponent(type)

  if (!ModalComponent) {
    return null
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t(`modals.${type}`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalComponent onClose={onHide} type={type} />
      </Modal.Body>
    </Modal>
  )
}

export default ModalLayout
