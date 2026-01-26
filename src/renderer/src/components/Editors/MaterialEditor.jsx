import React from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, InputAdornment, TextField } from '@mui/material'
import { useSettings } from '../../hooks'
import { NumericFormat } from 'react-number-format'

export default function MaterialEditor(props) {
  const { t } = useTranslation()
  const { settings } = useSettings()

  return (
    <Grid container spacing={2}>
      <Grid item size={8}>
        <TextField
          label={t('MATERIALS_FIELD_TITLE')}
          name="mat_title"
          variant="outlined"
          fullWidth
          value={props.model.mat_title}
          onChange={props.updateModel}
        />
      </Grid>
      <Grid item size={4}>
        <NumericFormat
          label={t('MATERIALS_FIELD_PRICE')}
          name="mat_std_price"
          value={props.model.mat_std_price}
          onChange={props.updateModel}
          customInput={TextField}
          decimalSeparator="."
          fixedDecimalScale
          valueIsNumericString
          fullWidth
          decimalScale={2}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">{t(settings.currency)}</InputAdornment>
            }
          }}
          variant="outlined"
        />
      </Grid>
    </Grid>
  )
}
