import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useState } from 'react'

import ModalLayout from '../components/modal/ModalLayout.jsx'
import AddChannelModal from '../components/modal/AddChannelModal.jsx'

import { Button } from 'react-bootstrap'
import { PlusSquare } from 'react-bootstrap-icons'

import { actions, selectModalStatus } from '../slices/modalSlice.js'

const AddChannelButton = () => {
  const dispatch = useDispatch()

  const showModal = useSelector(selectModalStatus)

  const openModal = () => {
    dispatch(actions.openModal())
  }

  const handleClose = () => dispatch(actions.closeModal())

  return (
    <>
      <Button
        type="button"
        variant="group-vertical"
        className="p-0 text-primary"
        onClick={openModal}
      >
        <PlusSquare size={20} />
        <span className="visually-hidden">+</span>
      </Button>
      {showModal
        && (
          <ModalLayout show={showModal} onHide={handleClose}>
            <AddChannelModal onClose={handleClose} />
          </ModalLayout>
        )}
    </>
  )
}

export default AddChannelButton
