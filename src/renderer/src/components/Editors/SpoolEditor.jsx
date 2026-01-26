import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, InputAdornment, MenuItem, Select, TextField } from '@mui/material'
import { useDatabase, useSettings } from '../../hooks'
import { NumericFormat } from 'react-number-format'

export default function SpoolEditor(props) {
  const { t } = useTranslation()
  const materialsDb = useDatabase('tab_materials')
  const { settings } = useSettings()

  const [materials, setMaterials] = useState([])
  const [color, setColor] = useState(props.model.spool_color || '#ffffff')

  React.useEffect(() => {
    materialsDb.getData({ columns: ['mat_title', 'mat_id'] }).then((res) => {
      setMaterials(res)
    })
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item size={12}>
        <TextField
          label={t('SPOOL_FIELD_TITLE')}
          name="spool_title"
          variant="outlined"
          fullWidth
          value={props.model.spool_title}
          onChange={props.updateModel}
        />
      </Grid>
      <Grid item size={4}>
        <Select
          label={t('SPOOL_FIELD_MATERIAL')}
          name="spool_mat_id"
          variant="outlined"
          fullWidth
          value={props.model.spool_mat_id}
          onChange={props.updateModel}
        >
          {materials.length === 0 && (
            <MenuItem value={-1} disabled>
              {t('NO_ITEMS')}
            </MenuItem>
          )}
          {materials.length > 0 &&
            materials.map((item, index) => (
              <MenuItem key={index} value={item.mat_id}>
                {item.mat_title}
              </MenuItem>
            ))}
        </Select>
      </Grid>
      <Grid item size={4}>
        PlaceHolder: ColorPicker
      </Grid>
      <Grid item size={4}>
        <NumericFormat
          label={t('SPOOL_FIELD_SIZE')}
          name="spool_size"
          value={props.model.spool_size}
          onChange={({ target }) =>
            props.updateModel({ target: { value: target.value * 1000, name: target.name } })
          }
          customInput={TextField}
          decimalSeparator="."
          fixedDecimalScale
          valueIsNumericString
          fullWidth
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">kg</InputAdornment>
            }
          }}
          decimalScale={2}
          variant="outlined"
        />
      </Grid>
      <Grid item size={4}>
        <NumericFormat
          label={t('SPOOL_FIELD_QTY')}
          name="spool_qty"
          value={props.model.spool_qty}
          onChange={props.updateModel}
          customInput={TextField}
          decimalSeparator="."
          fixedDecimalScale
          valueIsNumericString
          fullWidth
          decimalScale={0}
          variant="outlined"
        />
      </Grid>
      <Grid item size={4}>
        <NumericFormat
          label={t('SPOOL_FIELD_PRICE')}
          name="spool_price"
          value={props.model.spool_price}
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
