import { PublicNavBar } from "../../components/Header/PublicNavBar"
import { AdminSideBar } from "../../components/SideBar/AdminSideBar"

export const MainPublicLayout = ({ children }) => {
  return (
    <div className='flex flex-col'>
    <PublicNavBar/>
    <div className='h-screen flex-1'>
      { children }
    </div>
  </div>
  )
}
