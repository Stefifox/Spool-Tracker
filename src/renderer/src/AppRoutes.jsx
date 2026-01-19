import { Navigate, Route, Routes } from 'react-router'
import { HomePage, SpoolsPage, Error404 } from './pages'
import { BasePage } from './components'

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <BasePage title={'Home'}>
            <HomePage />
          </BasePage>
        }
      />
      <Route
        path="/spools"
        element={
          <BasePage title={'Spools'}>
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
