import { configureStore } from '@reduxjs/toolkit'

import { messageSlice } from './slices/messageSlice.js'
import { dialogsSlice } from './slices/dialogsSlice.js'
import { appSlice } from './slices/appSlice'

export default configureStore({
  reducer: {
    message: messageSlice.reducer,
    dialogs: dialogsSlice.reducer,
    app: appSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false })
})
