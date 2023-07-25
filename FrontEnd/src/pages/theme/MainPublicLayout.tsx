import { FooterPublic } from "../../components/Footer/FooterPublic"
import { PublicNavBar } from "../../components/Header/PublicNavBar"

export const MainPublicLayout = ({ children }) => {
  return (
    <div className='flex flex-col'>
      <PublicNavBar/>
      <div className='flex-1 mb-14'>
        { children }
      </div>
      <FooterPublic/>
    </div>
  )
}