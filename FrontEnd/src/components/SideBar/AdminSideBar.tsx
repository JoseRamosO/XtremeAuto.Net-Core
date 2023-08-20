import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Receipt, PointOfSale, ColorLens, Group, Adjust, KeyboardArrowLeft, DirectionsCar, TireRepair, CreditCard, Paid, Shield, ExitToApp } from '@mui/icons-material';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { onLogOutUser } from '../../store/slices/usuarios/usuariosThunk';

export const AdminSideBar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    console.log(pathname)
    return (
        <div
          className={` ${
            open ? 'w-60' : 'w-20 '
          } bg-teal-700 p-5 pt-8 relative duration-300`}
        >
          <div
            className={`flex items-center justify-center text-slate-50 absolute cursor-pointer w-10 h-12 -right-6 top-7 bg-teal-700 rounded-r-full`}
            onClick={() => setOpen(!open)}
          >
            <KeyboardArrowLeft className={` ${!open && 'rotate-180'}`}/>
          </div>
          <div className='flex gap-x-4 items-center'>
            <img
              src={require('../../assets/logo.png')}
              className={`cursor-pointer duration-500 ${
                open && 'rotate-[360deg]'
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && 'scale-0'
              }`}
            >
              XtremeAuto
            </h1>
          </div>
          <ul className='pt-10'>
            <li className={`duration-300 p-2 rounded-md cursor-pointer text-slate-50 text-sm items-center gap-x-4 flex items-center${ pathname === '/admin/usuarios' ? ' bg-cyan-500' : ' hover:bg-teal-800'}`} onClick={ () =>  navigate('/admin/usuarios') }>
              <Group/>
              <span className={`${!open && 'hidden'} text-white origin-left font-medium duration-300`}>
                Usuarios
              </span>
            </li>
            <li className={`duration-300 p-2 rounded-md cursor-pointer text-slate-50 text-sm items-center gap-x-4 flex items-center${ pathname === '/admin/autos' ? ' bg-cyan-500' : ' hover:bg-teal-800'}`} onClick={ () =>  navigate('/admin/autos') }>
              <DirectionsCar/>
              <span className={`${!open && 'hidden'} text-white origin-left font-medium duration-300`}>
                Autos
              </span>
            </li>
            <li className={`duration-300 p-2 rounded-md cursor-pointer text-slate-50 text-sm items-center gap-x-4 flex items-center${ pathname === '/admin/carrovendidos' ? ' bg-cyan-500' : ' hover:bg-teal-800'}`} onClick={ () =>  navigate('/admin/carrovendidos') }>
              <PointOfSale/>
              <span className={`${!open && 'hidden'} text-white origin-left font-medium duration-300`}>
                Carro Vendidos
              </span>
            </li>
            <li className={`duration-300 p-2 rounded-md cursor-pointer text-slate-50 text-sm items-center gap-x-4 flex items-center${ pathname === '/admin/roles' ? ' bg-cyan-500' : ' hover:bg-teal-800'}`} onClick={ () =>  navigate('/admin/roles') }>
              <Adjust/>
              <span className={`${!open && 'hidden'} text-white origin-left font-medium duration-300`}>
                Roles
              </span>
            </li>

            <li className={`duration-300 p-2 rounded-md cursor-pointer text-slate-50 text-sm items-center gap-x-4 flex items-center${ pathname === '/admin/colores' ? ' bg-cyan-500' : ' hover:bg-teal-800'}`} onClick={ () =>  navigate('/admin/colores') }>
              <ColorLens/>
              <span className={`${!open && 'hidden'} text-white origin-left font-medium duration-300`}>
                Colores
              </span>
            </li>

            <li className={`duration-300 p-2 rounded-md cursor-pointer text-slate-50 text-sm items-center gap-x-4 flex items-center${ pathname === '/admin/ruedas' ? ' bg-cyan-500' : ' hover:bg-teal-800'}`} onClick={ () =>  navigate('/admin/ruedas') }>
              <TireRepair/>
              <span className={`${!open && 'hidden'} text-white origin-left font-medium duration-300`}>
                Ruedas
              </span>
            </li>
            <li className={`duration-300 p-2 rounded-md cursor-pointer text-slate-50 text-sm items-center gap-x-4 flex items-center${ pathname === '/admin/seguros' ? ' bg-cyan-500' : ' hover:bg-teal-800'}`} onClick={ () =>  navigate('/admin/seguros') }>
              <Shield/>
              <span className={`${!open && 'hidden'} text-white origin-left font-medium duration-300`}>
                Seguros
              </span>
            </li>
            <li className={`duration-300 p-2 rounded-md cursor-pointer text-slate-50 text-sm items-center gap-x-4 flex items-center${ pathname === '/admin/ventas' ? ' bg-cyan-500' : ' hover:bg-teal-800'}`} onClick={ () =>  navigate('/admin/ventas') }>
              <Receipt/>
              <span className={`${!open && 'hidden'} text-white origin-left font-medium duration-300`}>
                Ventas
              </span>
            </li>
            <li className={`duration-300 p-2 rounded-md cursor-pointer text-slate-50 text-sm items-center gap-x-4 flex items-center${ pathname === '/admin/transacciones' ? ' bg-cyan-500' : ' hover:bg-teal-800'}`} onClick={ () =>  navigate('/admin/transacciones') }>
              <Paid/>
              <span className={`${!open && 'hidden'} text-white origin-left font-medium duration-300`}>
                Transacciones
              </span>
            </li>
            <li className={`duration-300 p-2 rounded-md cursor-pointer text-slate-50 text-sm items-center gap-x-4 flex items-center${ pathname === '/admin/tarjetas' ? ' bg-cyan-500' : ' hover:bg-teal-800'}`} onClick={ () =>  navigate('/admin/tarjetas') }>
              <CreditCard/>
              <span className={`${!open && 'hidden'} text-white origin-left font-medium duration-300`}>
                Tarjetas
              </span>
            </li>
            <li onClick={ () => dispatch(onLogOutUser()) } className={'bg-red-800 duration-300 hover:bg-red-700 p-2 rounded-md cursor-pointer text-slate-50 text-sm items-center gap-x-4 flex items-center'}>
              <ExitToApp/>
              <span className={`${!open && 'hidden'} text-white origin-left font-medium duration-300`}>
                Log Out
              </span>
            </li>
          </ul>
        </div>
    );
}
