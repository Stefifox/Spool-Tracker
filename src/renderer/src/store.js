import { configureStore } from '@reduxjs/toolkit'

import { messageSlice } from './slices/messageSlice.js'
import { dialogsSlice } from './slices/dialogsSlice.js'

export default configureStore({
  reducer: {
    message: messageSlice.reducer,
    dialogs: dialogsSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false })
})
