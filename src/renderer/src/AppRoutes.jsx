import { Navigate, Route, Routes } from 'react-router'

import { HomePage, SpoolsPage, Error404, WelcomePage } from './pages'
import { BasePage } from './components'
import { useTranslation } from 'react-i18next'

function AppRoutes() {

  const {t} = useTranslation()

  return (
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
      <Route
        path="/"
        element={
          <BasePage title={t('HOME_TITLE')}>
            <HomePage />
          </BasePage>
        }
      />
      <Route
        path="/spools"
        element={
          <BasePage title={t('SPOOL_TITLE')}>
            <SpoolsPage />
          </BasePage>
        }
      />
      {/** Errors **/}
      <Route
        path="/404"
        element={
          <BasePage title={'404'}>
            <Error404 />
          </BasePage>
        }
      />
      <Route path="*" element={<Navigate to={'/404'} />} />
    </Routes>
  )
}

export default AppRoutes
