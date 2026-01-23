import React from 'react'

import useDatabase from '../../hooks/useDatabase'
import { useDispatch } from 'react-redux'
import { showError, showSuccess } from '../../slices/messageSlice'
import { CircularProgress, List, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import MaterialItem from './MaterialItem'

export default function MaterialsPage() {
  const db = useDatabase('tab_materials')
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [matList, setMatList] = React.useState([])
  const [isLoading, setLoading] = React.useState(false)

  const deleteItem = itmId => {
    db.delData("mat_id", itmId)
      .then(() => {
        dispatch(showSuccess("Deleted"))
      })
      .catch((err) => {
        dispatch(showError(err))
      })
  }

  React.useEffect(() => {
    setLoading(true)
    db.getData({ columns: ['*'] })
      .then((data) => {
        setMatList(data)
        setLoading(false)
      })
      .catch((error) => {
        dispatch(showError(error))
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Typography variant="h6">{t('MATERIALS_PAGE_TITLE')}</Typography>
      <Typography variant="subtitle1">{t('MATERIALS_PAGE_DESC')}</Typography>
      {isLoading && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '80vh'
          }}
        >
          <CircularProgress />
        </div>
      )}
      {!isLoading && (
        <div>
          <List>
            {matList.map((v, k) => (
              <MaterialItem key={k} model={v} deleteAction={deleteItem} />
            ))}
          </List>
        </div>
      )}
    </>
  )
}
