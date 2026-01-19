import React from 'react'

import useDatabase from '../../hooks/useDatabase'
import { useDispatch } from 'react-redux'
import { showError } from '../../slices/messageSlice'
import { List, Typography } from '@mui/material'
import SpoolItem from './SpoolItem'

export default function SpoolPage(props) {
  const spoolTable = useDatabase('v_spools')
  const dispatch = useDispatch()

  const [spoolList, setSpoolList] = React.useState([])
  const [isLoading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    spoolTable
      .getData({ columns: ['*'] })
      .then((data) => {
        setSpoolList(data)
        setLoading(false)
      })
      .catch((error) => {
        dispatch(showError(error))
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Typography variant="h6">Your Spools</Typography>
      <Typography variant="subtitle1">Manage the list of spools you own</Typography>
      <div>
        <List>
          {spoolList.map((v, k) => (
            <SpoolItem key={k} model={v} />
          ))}
        </List>
      </div>
    </>
  )
}
