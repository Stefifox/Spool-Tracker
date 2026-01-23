import { useTranslation } from 'react-i18next'
import {
  Grid,
  IconButton,
  ListItem,
  Paper,
  Tooltip,
  Typography
} from '@mui/material'
import { Icon } from '@iconify/react'

/**
 *
 * @param props {{model: {mat_id: number, mat_title: string, mat_std_price: number}, deleteAction: (number)=>void, editAction: (number)=>void}}
 * @return {React.JSX.Element}
 * @constructor
 */
export default function MaterialItem(props) {
  const { t } = useTranslation()

  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton
            onClick={() => {
              props.editAction(props.model.mat_id)
            }}
          >
            <Tooltip title={t('TOOLTIP_EDIT')}>
              <Icon icon={'mdi:edit'} />
            </Tooltip>
          </IconButton>
          <IconButton
            onClick={() => {
              props.deleteAction(props.model.mat_id)
            }}
          >
            <Tooltip title={t('TOOLTIP_DELETE')}>
              <Icon icon={'mdi:trash'} />
            </Tooltip>
          </IconButton>
        </>
      }
    >
      <Paper elevation={2} className={'listItem'}>
        <Grid container spacing={1}>
          <Grid item size={12}>
            <Typography>{props.model.mat_title}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </ListItem>
  )
}
