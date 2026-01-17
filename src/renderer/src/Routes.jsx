import { Route, Routes } from 'react-router'
import { HomePage } from './pages'
import { BasePage } from './components'

function AppRoutes(props) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <BasePage title={'Test'}>
            <HomePage />
          </BasePage>
        }
      />
    </Routes>
  )
}

export default AppRoutes
