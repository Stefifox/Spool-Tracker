import { useDispatch, useSelector } from 'react-redux'
import { Alert, AlertTitle, Snackbar } from '@mui/material'
import { hide } from '../slices/messageSlice.js'

export default function MessageProvider({ children }) {
  const messageData = useSelector((state) => state.message?.data)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(hide())
  }

  const title =
    messageData.severity === 'error'
      ? 'Errore'
      : messageData.severity === 'warning'
        ? 'Attenzione'
        : 'Successo'

  return (
    <>
      <Snackbar
        open={messageData.showMessage}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={messageData.severity}
          sx={{ width: '100%' }}
          onClose={handleClose}
          variant="filled"
        >
          <AlertTitle>{title}</AlertTitle>
          {messageData.message}
        </Alert>
      </Snackbar>
      {children}
    </>
  )
}
