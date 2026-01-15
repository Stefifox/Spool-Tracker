import { Navigate, Route, Routes } from 'react-router'
import { HomePage } from './pages'

function AppRoutes(props) {
  return (
    <Routes>
      <Route path="/" element={<HomePage props/>} />
    </Routes>
  )
}

export default AppRoutes
