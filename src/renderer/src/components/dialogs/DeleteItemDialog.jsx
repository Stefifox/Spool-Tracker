import { DialogContent, DialogTitle, DialogActions, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { showDialog, closeDialog } from '../../slices/dialogsSlice'

export default function showDeleteDialog(props) {
  props.dispatch(showDialog({ content: <DeleteItemDialog {...props} />, maxWidth: 'xs' }))
}

// eslint-disable-next-line react-refresh/only-export-components
function DeleteItemDialog(props) {
  const { t } = useTranslation()

  return (
    <>
      <DialogTitle>{t('DIALOG_DELETE')}</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{t('DIALOG_DELETE_TEXT')}</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={() => props.dispatch(closeDialog())}>
          {t('BUTTON_CANCEL')}
        </Button>
        <Button onClick={props.confirmAction}>{t('BUTTON_CONFIRM')}</Button>
      </DialogActions>
    </>
  )
}
