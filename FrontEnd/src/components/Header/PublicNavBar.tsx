import { useState } from 'react';
import GroupIcon from '@mui/icons-material/Group';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from 'react-router-dom';

export const PublicNavBar = () => {
  return (
    <div className='main-public-header'>
        <div className='header-container'>
        <div className='header-logo'>
          <img src={require('../../assets/logo.png')}/>
        </div>
        <div className='header-items'>
        <ul>
          <li>HOME</li>
            <li>HOME</li>
            <li>MANTENIMIENTO</li>
            <li>AUTOS</li>
        </ul>
        </div>
        <div className='header-auth-items'>
          <ul>
              <li>LOGIN</li>
          </ul>
        </div>
      </div>
    </div>
  );
}