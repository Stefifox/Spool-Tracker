import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isInitialized: false,
    settings: {
      language: 'en'
    }
  },
  reducers: {
    setInitialized: (state, action) => {
      state.isInitialized = action.payload
    },
    setSettings: (state, action) => {
      state.settings = action.payload
    }
  }
})

export const { setInitialized, setSettings } = appSlice.actions
export default appSlice.reducer
