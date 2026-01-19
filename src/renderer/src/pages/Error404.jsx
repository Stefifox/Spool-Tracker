import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router'

export default function Error404() {
  const navigate = useNavigate()

  return (
    <div className="error404">
      <Typography variant="h1" fontWeight={'bold'}>
        404
      </Typography>
      <Typography variant="h3">This shouldn&#39;t be possible</Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Go back
      </Button>
    </div>
  )
}
