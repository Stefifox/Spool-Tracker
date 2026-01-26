import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { CircularProgress, Fab, List, Typography } from '@mui/material'
import { Icon } from '@iconify/react'

import useDatabase from '../../hooks/useDatabase'
import { showError, showSuccess } from '../../slices/messageSlice'
import SpoolItem from './SpoolItem'
import { closeDialog } from '../../slices/dialogsSlice'
import showAddItemDialog from '../../components/dialogs/AddItemDialog'

export default function SpoolPage() {
  const spoolView = useDatabase('v_spools')
  const spoolTable = useDatabase('tab_spools')
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [spoolList, setSpoolList] = React.useState([])
  const [isLoading, setLoading] = React.useState(false)
  const [reload, setReload] = React.useState(false)

  const deleteSpool = (id) => {
    spoolTable
      .delData('spool_id', id)
      .then(() => {
        dispatch(showSuccess(t('DELETE_SUCCESS')))
        dispatch(closeDialog())
        reloadList()
      })
      .catch((e) => {
        dispatch(showError(e))
      })
  }

  const addSpool = () => {
    showAddItemDialog({ dispatch, database: spoolTable, reload: setReload, type: 'spools' })
  }

  const reloadList = () => setReload((r) => !r)

  React.useEffect(() => {
    setLoading(true)
    spoolView
      .getData({ columns: ['*'] })
      .then((data) => {
        setSpoolList(data)
        setLoading(false)
      })
      .catch((error) => {
        dispatch(showError(error))
        setLoading(false)
      })
  }, [reload])

  return (
    <>
      <Fab className="fab" color="secondary" onClick={addSpool}>
        <Icon icon="mdi:plus" width="36px" height="36px" />
      </Fab>
      <Typography variant="h6">{t('SPOOL_PAGE_TITLE')}</Typography>
      <Typography variant="subtitle1">{t('SPOOL_PAGE_DESC')}</Typography>
      <div>
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
          <List>
            {spoolList.map((v, k) => (
              <SpoolItem key={k} model={v} deleteAction={deleteSpool} />
            ))}
          </List>
        )}
      </div>
    </>
  )
}
