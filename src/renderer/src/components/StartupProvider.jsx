import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { CircularProgress, Typography } from '@mui/material'

import { useDatabase } from '../hooks'
import { setInitialized, setSettings } from '../slices/appSlice'

export default function StartupProvider({ children }) {
  const dispatch = useDispatch()
  const db = useDatabase('tab_settings')
  const { i18n } = useTranslation()

  const [isLoading, setLoading] = React.useState(true)
  const [initialized, setInit] = React.useState(false)

  const loadData = (data) => {
    const obj = {}
    data.forEach((val) => {
      if (val.settKey === 'initState') {
        setInit(val.sett_value === '1')
      } else {
        obj[val.sett_key] = val.sett_value
      }
    })
    return obj
  }

  React.useEffect(() => {
    db.getData({ columns: ['*'] })
      .then((data) => {
        const appData = loadData(data)
        dispatch(setSettings(appData))
        dispatch(setInitialized(initialized))
        i18n.changeLanguage(appData.language)
        console.log("App Settings: ", appData)
        setLoading(false)
      })
      .catch(() => {
        dispatch(setInitialized(false))
        setLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <div className="loadScreen">
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </div>
    )
  }
  return children
}
