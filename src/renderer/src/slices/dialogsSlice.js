import { createSlice } from '@reduxjs/toolkit'

export const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState: {
    data: {
      open: false
    }
  },
  reducers: {
    showDialog: (state, action) => {
      state.data = { open: true, ...action.payload }
    },
    closeDialog: (state, _action) => {
      state.data = { open: false }
    }
  }
})

export const { showDialog, closeDialog } = dialogsSlice.actions
export default dialogsSlice.reducer
