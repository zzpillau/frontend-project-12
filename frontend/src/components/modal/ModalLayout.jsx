import React from 'react'

import Modal from 'react-bootstrap/Modal'
import getModalComponent from '.'

const ModalLayout = ({ show, onHide, type }) => {
  const ModalComponent = getModalComponent(type)

  if (!ModalComponent) {
    return null
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <ModalComponent onClose={onHide} />
    </Modal>
  )
}

export default ModalLayout
