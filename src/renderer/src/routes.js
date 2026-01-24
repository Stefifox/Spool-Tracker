import { HomePage, MaterialsPage, SpoolsPage } from './pages'

const routes = [
  {
    path: '/',
    pageName: 'HOME_TITLE',
    navName: 'NAVBAR_HOME',
    icon: 'mdi:home',
    Element: HomePage,
    show: true
  },
  {
    path: '/spools',
    pageName: 'SPOOL_TITLE',
    navName: 'NAVBAR_SPOOLS',
    icon: 'cbi:3d-filament',
    Element: SpoolsPage,
    show: true
  },
  {
    path: '/materials',
    pageName: 'MATERIALS_TITLE',
    navName: 'NAVBAR_MATERIALS',
    icon: 'mdi:material',
    Element: MaterialsPage,
    show: true
  }
]

export default routes
