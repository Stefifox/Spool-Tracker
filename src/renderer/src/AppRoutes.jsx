import React from 'react'
import { Navigate, Route, Routes } from 'react-router'

import {Error404, WelcomePage, MaterialsPage } from './pages'
import routes from './routes'
import { BasePage } from './components'
import { useTranslation } from 'react-i18next'

function AppRoutes() {
  const { t } = useTranslation()

  return (
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <BasePage title={t(route.pageName)} page={route.Element} />
          }
        />
      ))}
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
