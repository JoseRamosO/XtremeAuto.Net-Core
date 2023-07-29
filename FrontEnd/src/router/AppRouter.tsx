import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/Auth/LoginPage'
import { RegisterPage } from '../pages/Auth/RegisterPage'
import { ToastContainer } from 'react-toastify'
import { HomePage } from '../pages/PublicPages/HomePage'
import { UsuariosPage } from '../pages/Admin/UsuariosPage'
import { RolesAdminPage } from '../pages/Admin/RolesAdminPage'
import { ColoresAdminPage } from '../pages/Admin/ColoresAdminPage'
import { AutosAdminPage } from '../pages/Admin/AutosAdminPage'
import { AutoPage } from '../pages/LoggedPages/AutoPage'
import { ScrollTop } from '../pages/ScrollTop'

export const AppRouter = () => {
  return (
    <>
    <ScrollTop/>
      <ToastContainer />
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registrar" element={<RegisterPage />} />

            <Route path="/admin/usuarios" element={<UsuariosPage />} />
            <Route path="/admin/roles" element={<RolesAdminPage />} />
            <Route path="/admin/colores" element={<ColoresAdminPage />} />
            <Route path="/admin/autos" element={<AutosAdminPage />} />

            <Route path="/ventas/auto/:autoId" element={<AutoPage />} />

      </Routes>
    </>
  )
}