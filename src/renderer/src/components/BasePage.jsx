import React from 'react'
import { useNavigate } from 'react-router'
import {
  AppBar,
  Box,
  IconButton,
  Grid,
  Toolbar,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'

import routes from '../routes'

/**
 * Provides a container for the various app pages
 * @param props {{title: string, page: *, children: *}}
 * @constructor
 */
export default function BasePage(props) {
  const [open, setOpen] = React.useState(true)

  const handleMenu = () => {
    setOpen((r) => !r)
  }

  window.api.setTitle(`SpoolTracker - ${props.title}`)

  return (
    <>
      <Box className={'appbar'}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenu}
            >
              <Icon icon="mdi:menu" width="36" height="36" />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div className='pageContainer'>
        {open && (
          <div className='navigationContainer'>
            <Navigation />
          </div>
        )}
        <div className={'page'}>
          {props.children ? React.cloneElement(props.children, {}) : <props.page />}
        </div>
      </div>
    </>
  )

  //React.cloneElement(props.children, { navigate })
}

function Navigation() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const r = routes.filter((f) => f.show)

  return (
    <Paper className={'navigation'} elevation={2}>
      <List>
        {r.map((v, k) => (
          <ListItem key={k} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(v.path)
              }}
            >
              <ListItemIcon>
                <Icon icon={v.icon} width="36" height="36" />
              </ListItemIcon>
              <ListItemText primary={t(v.navName)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
