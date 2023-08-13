import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { onLogOutUser } from '../../store/slices/usuarios/usuariosThunk';

export const PublicNavBar = () => {
  const usuario = useAppSelector( (state) => state.usuarios );
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className='main-public-header'>
        <div className='header-container'>
        <div className='header-items'>
        <div className='header-logo cursor-pointer' onClick={ () =>  navigate('/') }>
          <img src={require('../../assets/logo.png')}/>
        </div>
        <ul>
          <li className={`cursor-pointer${ pathname === '/' ? ' text-cyan-500' : ' text-white'}`} onClick={ () =>  navigate('/') }>AUTOS</li>
          <li className={`cursor-pointer${ pathname === '/user' ? ' text-cyan-500' : ' text-white'}`} onClick={ () =>  navigate('/user') }>PERFIL</li>
        </ul>
        </div>
        <div className='header-auth-items'>
            <ul>
              {
                usuario.currentUser.status !== 'authenticated' ? (
                  <li><a className='cursor-pointer bg-cyan-600 hover:bg-cyan-700 color-white text-white px-10 py-4 rounded-full font-bold' onClick={ () =>  navigate('/login') }>Login</a></li>
                ) : (
                  <>
                    <li className='text-white'>{ usuario.currentUser.nombre } { usuario.currentUser.apellido }</li>
                    <li><a className='cursor-pointer bg-red-600 hover:bg-red-700 color-white text-white px-10 py-4 rounded-full font-bold' onClick={ () => dispatch(onLogOutUser()) }>Log Out</a></li>
                  </>
                )
              }
          </ul>
        </div>
      </div>
    </div>
  );
}