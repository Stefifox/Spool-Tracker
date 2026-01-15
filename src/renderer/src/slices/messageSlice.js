import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    data: {
      showMessage: false,
      severity: 'success',
      message: ''
    }
  },
  reducers: {
    showError: (state, action) => {
      state.data = { showMessage: true, severity: 'error', message: action.payload }
    },
    showSuccess: (state, action) => {
      state.data = { showMessage: true, severity: 'success', message: action.payload }
    },
    showWarning: (state, action) => {
      state.data = { showMessage: true, severity: 'warning', message: action.payload }
    },
    hide: (state, action) => {
      state.data = { showMessage: false }
    }
  }
})

export const { showError, showSuccess, showWarning, hide } = messageSlice.actions
export default messageSlice.reducer
