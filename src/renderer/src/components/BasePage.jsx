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

/**
 * Provides a container for the various app pages
 * @param props {{title: string, children: *}}
 * @constructor
 */
export default function BasePage(props) {
  const navigate = useNavigate()

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
              <Icon icon="ic:baseline-16mp" width="36" height="36" />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container>
        {open && (
          <Grid size={2}>
            <Navigation />
          </Grid>
        )}
        <Grid size={open ? 10 : 12}>
          <div className={'page'}>{React.cloneElement(props.children, {})}</div>
        </Grid>
      </Grid>
    </>
  )

  //React.cloneElement(props.children, { navigate })
}

function Navigation() {
  const navigate = useNavigate()

  const routes = [
    {
      path: '/',
      icon: 'mdi:home',
      text: 'HomePage'
    },
    {
      path: '/settings',
      icon: 'mdi:settings',
      text: 'Settings'
    }
  ]

  return (
    <Paper className={'navigation'} elevation={2}>
      <List>
        {routes.map((v, k) => (
          <ListItem key={k} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(v.path)
              }}
            >
              <ListItemIcon>
                <Icon icon={v.icon} width="36" height="36" />
              </ListItemIcon>
              <ListItemText primary={v.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
