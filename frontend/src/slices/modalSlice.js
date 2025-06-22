import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  modalType: null,
  channelId: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { modalType, channelId = null } = action.payload || {}
      state.isOpen = true
      state.modalType = modalType
      state.channelId = channelId
    },
    closeModal: (state) => {
      state.isOpen = false
      state.modalType = null
      state.channelId = null
    },
  },
})

export const { actions } = modalSlice

export const selectModalStatus = state => state.modal.isOpen
export const selectModalType = state => state.modal.modalType
export const selectChannelId = state => state.modal.channelId

export default modalSlice.reducer
