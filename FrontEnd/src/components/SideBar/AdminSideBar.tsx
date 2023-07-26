import { useState } from 'react';
import GroupIcon from '@mui/icons-material/Group';
import AdjustIcon from '@mui/icons-material/Adjust';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useNavigate } from 'react-router-dom';

export const AdminSideBar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
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
            <KeyboardArrowLeftIcon className={` ${!open && 'rotate-180'}`}/>
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
            <li className={'duration-300 hover:bg-teal-800 p-2 rounded-md cursor-pointer text-slate-50 text-sm items-center gap-x-4 flex items-center'} onClick={ () =>  navigate('/admin/autos') }>
              <DirectionsCarIcon/>
              <span className={`${!open && 'hidden'} text-white origin-left font-medium duration-300`}>
                Autos
              </span>
            </li>
            <li className={'duration-300 hover:bg-teal-800 p-2 rounded-md cursor-pointer text-slate-50 text-sm items-center gap-x-4 flex items-center'} onClick={ () =>  navigate('/admin/usuarios') }>
              <GroupIcon/>
              <span className={`${!open && 'hidden'} text-white origin-left font-medium duration-300`}>
                Usuarios
              </span>
            </li>
            <li className={'duration-300 hover:bg-teal-800 p-2 rounded-md cursor-pointer text-slate-50 text-sm items-center gap-x-4 flex items-center'} onClick={ () =>  navigate('/admin/roles') }>
              <AdjustIcon/>
              <span className={`${!open && 'hidden'} text-white origin-left font-medium duration-300`}>
                Roles
              </span>
            </li>
            <li className={'duration-300 hover:bg-teal-800 p-2 rounded-md cursor-pointer text-slate-50 text-sm items-center gap-x-4 flex items-center'} onClick={ () =>  navigate('/admin/colores') }>
              <ColorLensIcon/>
              <span className={`${!open && 'hidden'} text-white origin-left font-medium duration-300`}>
                Colores
              </span>
            </li>
          </ul>
        </div>
    );
}
