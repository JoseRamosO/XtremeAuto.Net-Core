import { AdminSideBar } from "../../components/SideBar/AdminSideBar"

export const MainAdminLayout = ({ children }) => {
  return (
    <div className='flex'>
      <AdminSideBar/>
      <div className='h-screen flex-1 px-12 pt-8'>
        { children }
      </div>
    </div>
  )
}