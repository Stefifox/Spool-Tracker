import { Chip, Grid, IconButton, ListItem, Paper, Tooltip, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import showDeleteDialog from '../../components/dialogs/DeleteItemDialog'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

/**
 *
 * @param props {{model: {spool_id: number, spool_title: string, spool_color: string, mat_title: string}}}
 * @return {React.JSX.Element}
 * @constructor
 */
export default function SpoolItem(props) {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  return (
    <Paper elevation={2} style={{ marginBottom: '12px' }}>
      <ListItem
        className={'listItem'}
        secondaryAction={
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <IconButton
              onClick={() => {
                props.editAction(props.model.spool_id)
              }}
            >
              <Tooltip title={t('TOOLTIP_EDIT')}>
                <Icon icon={'mdi:edit'} />
              </Tooltip>
            </IconButton>
            <IconButton
              onClick={() => {
                showDeleteDialog({
                  dispatch,
                  confirmAction: () => {
                    props.deleteAction(props.model.spool_id)
                  }
                })
              }}
            >
              <Tooltip title={t('TOOLTIP_DELETE')}>
                <Icon icon={'mdi:trash'} />
              </Tooltip>
            </IconButton>
          </div>
        }
      >
        <Grid container spacing={1} style={{ width: '100%' }}>
          <Grid item size={12}>
            <Typography>{props.model.spool_title}</Typography>
          </Grid>
          <Grid item size={1}>
            <Chip variant="filled" label={props.model.mat_title} style={{ width: '100%' }} />
          </Grid>
          <Grid item size={2}>
            <Chip
              variant="outlined"
              label={props.model.spool_color}
              style={{ backgroundColor: props.model.spool_color, width: '100%' }}
            />
          </Grid>
          <Grid item size={1}>
            <Chip
              variant="filled"
              label={`${props.model.spool_price}€`}
              style={{ width: '100%' }}
            />
          </Grid>
        </Grid>
      </ListItem>
    </Paper>
  )
}
