import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/Auth/LoginPage'
import { RegisterPage } from '../pages/Auth/RegisterPage'
import { ToastContainer } from 'react-toastify'
import { HomePage } from '../pages/PublicPages/HomePage'

export const AppRouter = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registrar" element={<RegisterPage />} />
      </Routes>
    </>
  )
}