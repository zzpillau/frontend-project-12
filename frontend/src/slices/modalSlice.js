import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  modalType: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
      state.modalType = action?.payload || null
    },
    closeModal: (state) => {
      state.isOpen = false
      state.modalType = null
    },
  },
})

export const { actions } = modalSlice

export const selectModalStatus = state => state.modal.isOpen
export const selectModalType = state => state.modal.isOpen

export default modalSlice.reducer
