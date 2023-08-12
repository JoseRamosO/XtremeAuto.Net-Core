import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';

export const PublicNavBar = () => {
  const usuario = useAppSelector( (state) => state.usuarios );
  const navigate = useNavigate();
  return (
    <div className='main-public-header'>
        <div className='header-container'>
        <div className='header-items'>
        <div className='header-logo'>
          <img src={require('../../assets/logo.png')}/>
        </div>
        <ul>
          <li>AUTOS</li>
          <li>AUTOS</li>
          <li>AUTOS</li>
        </ul>
        </div>
        {
          usuario.currentUser.status !== 'authenticated' && (
            <div className='header-auth-items'>
            <ul>
                <li><a className='cursor-pointer bg-cyan-600 hover:bg-cyan-700 color-white text-white px-10 py-4 rounded-full font-bold' onClick={ () =>  navigate('/login') }>Login</a></li>
            </ul>
          </div>
          )
        }
      </div>
    </div>
  );
}