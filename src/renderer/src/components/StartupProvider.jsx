import React from 'react'
import { useDispatch } from 'react-redux'

import { useDatabase } from '../hooks'
import { setInitialized, setSettings } from '../slices/appSlice'

export default function StartupProvider({ children }) {
  const dispatch = useDispatch()
  const db = useDatabase('tab_settings')

  const [isLoading, setLoading] = React.useState(true)

  const loadData = (data) => {
    const obj = {}
    data.forEach((val) => {
      obj[val.sett_key] = val.sett_value
    })
    return obj
  }

  React.useEffect(() => {
    db.getData({ columns: ['*'] }).then((data) => {
      const appData = loadData(data)
      dispatch(setSettings(appData))
      setLoading(false)
    })
  }, [])

  if (isLoading) {
    return <></>
  }

  return children
}
