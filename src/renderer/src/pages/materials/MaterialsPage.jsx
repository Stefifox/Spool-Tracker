import React from 'react'

import useDatabase from '../../hooks/useDatabase'
import { useDispatch } from 'react-redux'
import { showError, showSuccess } from '../../slices/messageSlice'
import { CircularProgress, Fab, List, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import MaterialItem from './MaterialItem'
import { closeDialog } from '../../slices/dialogsSlice'
import { Icon } from '@iconify/react'
import showAddItemDialog from '../../components/dialogs/AddItemDialog'

export default function MaterialsPage() {
  const db = useDatabase('tab_materials')
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [matList, setMatList] = React.useState([])
  const [isLoading, setLoading] = React.useState(false)
  const [reload, setReload] = React.useState(false)

  const reloadList = () => {
    setReload((r) => !r)
  }

  const addMaterial = () => {
    showAddItemDialog({ dispatch, database: db, reload: setReload, type: 'materials' })
  }

  const deleteItem = (itmId) => {
    db.delData('mat_id', itmId)
      .then(() => {
        dispatch(showSuccess(t('DELETE_SUCCESS')))
        dispatch(closeDialog())
        reloadList()
      })
      .catch((err) => {
        dispatch(showError(err))
        reloadList()
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
  }, [reload])

  return (
    <>
      <Fab className="fab" color="secondary" onClick={addMaterial}>
        <Icon icon="mdi:plus" width="36px" height="36px" />
      </Fab>
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
