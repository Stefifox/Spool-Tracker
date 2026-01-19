import { Route, Routes } from 'react-router'
import { HomePage, SpoolsPage } from './pages'
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
    </Routes>
  )
}

export default AppRoutes
