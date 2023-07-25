import { useNavigate } from 'react-router-dom';

export const PublicNavBar = () => {
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
        <div className='header-auth-items'>
          <ul>
              <li><a className='cursor-pointer bg-cyan-600 hover:bg-cyan-700 color-white text-white px-10 py-4 rounded-full font-bold' onClick={ () =>  navigate('/login') }>Login</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}