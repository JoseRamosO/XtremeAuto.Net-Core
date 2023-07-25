// import { Link } from 'react-router-dom'
import { PublicNavBar } from '../../components/Header/PublicNavBar'
import { BrowserRouter as Router, Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import { MainPublicLayout } from '../theme/MainPublicLayout';
import { CardSaleHome } from '../../components/Cards/CardSaleHome';

export const HomePage = () => {
  return (
    <MainPublicLayout>
      <div className='homepage-header bg-gradient-to-r from-slate-800 to-slate-900'>
        <div className='homepgape-header-wrapper'>
          <div className='header-content'>
            <h1>Lorem ipsum dolor sit amet, consectetur</h1>
          </div>
          <div className='header-image'>
            <img src={require('../../assets/car-home.png')}/>
          </div>
        </div>
      </div>

      <div className='main-content'>
        <h1>AUTOS EN VENTA</h1>
        
          <div className="flex flex-wrap mt-9 cards-container">
            <CardSaleHome/>
            <CardSaleHome/>
            <CardSaleHome/>
            <CardSaleHome/>
            <CardSaleHome/>
            <CardSaleHome/>
          </div>
      </div>

    </MainPublicLayout>
  )
}
