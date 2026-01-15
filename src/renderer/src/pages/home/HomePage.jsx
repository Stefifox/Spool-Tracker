import { Button, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'

import {showSuccess} from '../../slices/messageSlice'

export default function HomePage(props) {
  const dispatch = useDispatch()

  return (
    <>
      <Typography variant="title">Benvenuto</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch(showSuccess('Prova'))
        }}
      >
        Clicca qui
      </Button>
    </>
  )
}
