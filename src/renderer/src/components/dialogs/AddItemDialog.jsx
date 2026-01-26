import { DialogContent, DialogTitle, DialogActions, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { showDialog, closeDialog } from '../../slices/dialogsSlice'
import { showError, showSuccess } from '../../slices/messageSlice'
import editors from '../Editors/editors'
import { useState } from 'react'

export default function showAddItemDialog(props) {
  console.log(props)
  props.dispatch(showDialog({ content: <AddItemDialog {...props} />, maxWidth: 'md' }))
}

// eslint-disable-next-line react-refresh/only-export-components
function AddItemDialog(props) {
  const { t } = useTranslation()

  const { dispatch, database, reload, type } = props
  const Editor = editors[type]

  const [model, setModel] = useState({})

  const updateModel = ({ target }) => {
    const { name, value } = target
    setModel((model) => {
      model[name] = value
      return model
    })
  }

  const saveClick = () => {
    console.log(model)
    database
      .addData(model)
      .then(() => {
        reload()
        dispatch(showSuccess)
        dispatch(closeDialog())
      })
      .catch((err) => {
        dispatch(showError(err))
      })
  }

  return (
    <>
      <DialogTitle>{t('DIALOG_ADD')}</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{t('DIALOG_ADD_TEXT')}</Typography>
        <Editor {...props} model={model} updateModel={updateModel} />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={() => props.dispatch(closeDialog())}>
          {t('BUTTON_CANCEL')}
        </Button>
        <Button onClick={saveClick}>{t('BUTTON_SAVE')}</Button>
      </DialogActions>
    </>
  )
}
