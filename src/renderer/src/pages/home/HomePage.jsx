import React from 'react'
import { useNavigate } from 'react-router'
import { Typography } from '@mui/material'

import { useSettings } from '../../hooks'

export default function HomePage() {
  const appSettings = useSettings()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!appSettings.isInitialized) {
      navigate('/welcome')
    }
  }, [appSettings.isInitialized])

  return (
    <>
      <Typography variant="body1">Welcome</Typography>
    </>
  )
}
