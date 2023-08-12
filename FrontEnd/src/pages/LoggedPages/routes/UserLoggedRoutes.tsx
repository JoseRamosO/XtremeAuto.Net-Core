import { Navigate, Route, Routes } from 'react-router-dom'
import { AutoPage } from '../AutoPage'

export const UserLoggedRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <AutoPage/> }/>
        <Route path="/sales/auto/:autoId" element={<AutoPage />} />
        <Route path="/*" element={ <Navigate to="/"/> }/>
    </Routes>
  )
}
  