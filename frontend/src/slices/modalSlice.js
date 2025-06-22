import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  modalType: null,
  channelId: null,
  channelName: null
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { modalType, channelId = null, channelName = null } = action.payload || {}
      state.isOpen = true
      state.modalType = modalType
      state.channelId = channelId
      state.channelName = channelName
    },
    closeModal: (state) => {
      state.isOpen = false
      state.modalType = null
      state.channelId = null
      state.channelName = null
    },
  },
})

export const { actions } = modalSlice

export const selectModalStatus = state => state.modal.isOpen
export const selectModalType = state => state.modal.modalType
export const selectChannelId = state => state.modal.channelId
export const selectChannelName = state => state.modal.channelName

export default modalSlice.reducer
