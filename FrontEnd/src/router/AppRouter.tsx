import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/Auth/LoginPage'
import { RegisterPage } from '../pages/Auth/RegisterPage'
import { ToastContainer } from 'react-toastify'
import { HomePage } from '../pages/PublicPages/HomePage'
import { UsuariosPage } from '../pages/Admin/UsuariosPage'
import { RolesAdminPage } from '../pages/Admin/RolesAdminPage'
import { ColoresAdminPage } from '../pages/Admin/ColoresAdminPage'
import { AutosAdminPage } from '../pages/Admin/AutosAdminPage'
import { RuedasAdminPage } from '../pages/Admin/RuedasAdminPage'
import { TransaccionesAdminPage } from '../pages/Admin/TransaccionesAdminPage'
import { CarroVendidosAdminPage } from '../pages/Admin/CarroVendidosAdminPage'
import { AutoPage } from '../pages/LoggedPages/AutoPage'
import { useCheckAuth } from '../hooks/useCheckAuth'
import { AdminRoutes } from '../pages/Admin/routes/AdminRoutes'
import { UserLoggedRoutes } from '../pages/LoggedPages/routes/UserLoggedRoutes'
import { ScrollToTop } from '../hooks/ScrollToTop'

export const AppRouter = () => {
    const currentUsuarioStatus = useCheckAuth();
    
    // if (currentUsuarioStatus === 'checking') {
    //   return <GettingDataLoader/>
    // }
    
  return (
    <>
      <ToastContainer />
      <ScrollToTop/>
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registrar" element={<RegisterPage />} />
            {
              (currentUsuarioStatus.status === 'authenticated' && currentUsuarioStatus.rol === 1) && <Route path="/admin/*" element={<AdminRoutes/>}/>
            }
            {
              (currentUsuarioStatus.status === 'authenticated' && currentUsuarioStatus.rol !== 1) && <Route path="/user/*" element={<UserLoggedRoutes/>}/>
            }
            <Route path="/*" element={ <Navigate to='/login'/> }/>
      </Routes>

      {/* <Routes>
      {
        (status === 'authenticated')
        ? <Route path="/*" element={<JournalRoutes/>}/>
        : <Route path="/auth/*" element={<AuthRoutes/>}/>
      }
      <Route path="/*" element={ <Navigate to='/auth/login'/> }/>
    </Routes> */}
    </>
  )
}