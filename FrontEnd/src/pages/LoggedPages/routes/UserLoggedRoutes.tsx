import { Navigate, Route, Routes } from 'react-router-dom'
import { AutoPage } from '../AutoPage'
import { AutoPageConfirmation } from '../AutoPageConfirmation'
import { UserProfile } from '../UserProfile'

export const UserLoggedRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <UserProfile/> }/>
        <Route path="/sales/auto/:autoId" element={<AutoPage />} />
        <Route path="/sales/auto/:autoId/confirmation" element={<AutoPageConfirmation />} />
        <Route path="/*" element={ <Navigate to="/"/> }/>
    </Routes>
  )
}
  