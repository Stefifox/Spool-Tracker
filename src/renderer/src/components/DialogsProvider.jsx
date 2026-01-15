import { useDispatch, useSelector } from 'react-redux'

import { closeDialog } from '../slices/dialogsSlice.js'
import { Dialog } from '@mui/material'

// eslint-disable-next-line react/prop-types
export default function DialogsProvider({ children }) {
  const dialogData = useSelector((state) => state.dialogs?.data)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeDialog())
  }

  return (
    <>
      {children}
      <Dialog
        fullWidth
        maxWidth={dialogData.maxWidth || 'xl'}
        open={dialogData.open}
        onClose={handleClose}
      >
        {dialogData.content}
      </Dialog>
    </>
  )
}
