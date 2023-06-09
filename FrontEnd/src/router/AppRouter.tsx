import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/Auth/LoginPage'
import { RegisterPage } from '../pages/Auth/RegisterPage'
import { ToastContainer } from 'react-toastify'
import { HomePage } from '../pages/PublicPages/HomePage'
import { UsuariosPage } from '../pages/Admin/UsuariosPage'
import { RolesAdminPage } from '../pages/Admin/RolesAdminPage'

export const AppRouter = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registrar" element={<RegisterPage />} />

            <Route path="/admin/usuarios" element={<UsuariosPage />} />
            <Route path="/admin/roles" element={<RolesAdminPage />} />
      </Routes>
    </>
  )
}