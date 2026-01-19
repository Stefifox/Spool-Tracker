import { Chip, Grid, ListItem, Paper, Typography } from '@mui/material'

/**
 *
 * @param props {{model: {spool_id: number, spool_title: string, spool_color: string, mat_title: string}}}
 * @return {React.JSX.Element}
 * @constructor
 */
export default function SpoolItem(props) {
  return (
    <ListItem>
      <Paper elevation={2} className={'listItem'}>
        <Grid container spacing={1}>
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
      </Paper>
    </ListItem>
  )
}
