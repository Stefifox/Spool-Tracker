import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Button, Grid, MenuItem, Select, Typography } from '@mui/material'

import { useTranslation } from 'react-i18next'
import { useDatabase, useSettings } from '../../hooks'
import { setInitialized, setSettings } from '../../slices/appSlice'

export default function WelcomePage() {
  const dispatch = useDispatch()
  const appSettings = useSettings()
  const db = useDatabase('tab_settings')
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [userSettings, setUserSettings] = useState({
    language: 'en',
    app_theme: 'default',
    currency: 'USD'
  })
  const [step, setStep] = useState(0)

  window.api.setTitle('SpoolTracker - Welcome!')

  const updateModel = (key, value) => {
    setUserSettings(() => {
      const model = userSettings
      model[key] = value
      return model
    })
  }

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }
  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const confirmSettings = () => {
    dispatch(setSettings(userSettings))
    dispatch(setInitialized(true))
    navigate('/')
  }

  if (appSettings.isInitialized) {
    navigate('/')
  }

  return (
    <div className="welcomeScreen">
      <img src={''} alt={'logo'} />
      <Typography variant="h5">{t('STARTUP_TITLE')}</Typography>
      <Typography variant="h6">SpoolTracker</Typography>
      {step === 0 && <StartStep model={userSettings} update={updateModel} next={nextStep} />}
      {step === 1 && (
        <SettingsStep model={userSettings} update={updateModel} next={nextStep} prev={prevStep} />
      )}
      {step === 2 && <ReadyStep next={confirmSettings} prev={prevStep} />}
    </div>
  )
}

function StartStep(props) {
  const [language, setLanguage] = useState(props.model.language)

  const { t, i18n } = useTranslation()
  return (
    <>
      <Typography variant="body2">{t('STARTUP_DESCRIPTION')}</Typography>
      <Select
        id="language"
        value={language}
        onChange={({ target }) => {
          setLanguage(target.value)
          props.update('language', target.value)
          i18n.changeLanguage(target.value)
        }}
        fullWidth
        variant="outlined"
        style={{ margin: '8px', width: '250px' }}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="it">Italiano</MenuItem>
      </Select>
      <Button
        variant="contained"
        fullWidth
        onClick={props.next}
        style={{ margin: '2px', maxWidth: '250px' }}
      >
        {t('BUTTON_NEXT')}
      </Button>
    </>
  )
}

function SettingsStep(props) {
  const { t } = useTranslation()

  const [theme, setTheme] = useState(props.model.app_theme)
  const [currency, setCurrency] = useState(props.model.currency)

  return (
    <>
      <Typography variant="body2">{t('STARTUP_SETTINGS_DESCRIPTION')}</Typography>
      <Grid container spacing={2} style={{ margin: '8px', width: '400px' }}>
        <Grid item size={6}>
          <Typography variant="subtitle1">{t('SETTINGS_APP_THEME')}</Typography>
        </Grid>
        <Grid item size={6}>
          <Select
            id="app_theme"
            value={theme || 'default'}
            onChange={({ target }) => {
              setTheme(target.value)
              props.update('app_theme', target.value)
            }}
            fullWidth
            variant="outlined"
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="dark">{t('SETTINGS_DARK_THEME')}</MenuItem>
          </Select>
        </Grid>
        <Grid item size={6}>
          <Typography variant="subtitle1">{t('SETTINGS_CURRENCY')}</Typography>
        </Grid>
        <Grid item size={6}>
          <Select
            id="app_theme"
            value={currency || 'USD'}
            onChange={({ target }) => {
              setCurrency(target.value)
              props.update('currency', target.value)
            }}
            fullWidth
            variant="outlined"
          >
            <MenuItem value="USD">$ (USA)</MenuItem>
            <MenuItem value="EUR">€ (EUR)</MenuItem>
          </Select>
        </Grid>
        <Grid item size={6}>
          <Button variant="contained" fullWidth onClick={props.prev}>
            {t('BUTTON_PREVIOUS')}
          </Button>
        </Grid>
        <Grid item size={6}>
          <Button variant="contained" fullWidth onClick={props.next}>
            {t('BUTTON_NEXT')}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

function ReadyStep(props) {
  const { t } = useTranslation()

  return (
    <>
      <Typography variant="h5">{t('STARTUP_ALL_SET')}</Typography>
      <Typography variant="subtitle1">{t('STARTUP_ALL_SET_DESCRIPTION')}</Typography>
      <Grid container spacing={2}>
        <Grid item size={12}>
          <Button variant="contained" fullWidth onClick={props.next}>
            {t('STARTUP_START')}
          </Button>
        </Grid>
        <Grid item size={12}>
          <Button color={'secondary'} variant="contained" fullWidth onClick={props.prev}>
            {t('BUTTON_PREVIOUS')}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
