import { Navigate, Route, Routes } from 'react-router-dom'
import { UsuariosPage } from '../UsuariosPage'
import { RolesAdminPage } from '../RolesAdminPage'
import { ColoresAdminPage } from '../ColoresAdminPage'
import { AutosAdminPage } from '../AutosAdminPage'
import { RuedasAdminPage } from '../RuedasAdminPage'
import { SegurosAdminPage } from '../SegurosAdminPage'
import { TransaccionesAdminPage } from '../TransaccionesAdminPage'
import { TarjetasAdminPage } from '../TarjetasAdminPage'

export const AdminRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <UsuariosPage/> }/>
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/roles" element={<RolesAdminPage />} />
        <Route path="/colores" element={<ColoresAdminPage />} />
        <Route path="/autos" element={<AutosAdminPage />} />
        <Route path="/admin/seguros" element={<SegurosAdminPage />} />
          <Route path="/admin/ruedas" element={<RuedasAdminPage />} />
          <Route path="/admin/transacciones" element={<TransaccionesAdminPage />} />
          <Route path="/admin/tarjetas" element={<TarjetasAdminPage />} />

        <Route path="/*" element={ <Navigate to="/"/> }/>
    </Routes>
  )
}
  