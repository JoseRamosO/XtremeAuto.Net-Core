import { getAllUsers } from "../../store/slices/usuarios/usuariosThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { UserModal } from '../../components/Modals/UserModal';
import { Column, usePagination, useRowSelect, useTable } from 'react-table';
import { useEffect, useMemo } from 'react';
import { DataTable } from '../../components/Tables/DataTable';
import { MainAdminLayout } from "../theme/MainAdminLayout";
import AddIcon from '@mui/icons-material/Add';
import { GettingDataLoader } from "../../components/Loaders/GettingDataLoader";
import { DeleteUserModal } from "../../components/Modals/DeleteUserModal";
import { setToggleModal } from "../../store/slices/userInterface/userInterface";

interface usuarioType {
  cedula: number;
  nombre : string;
  apellido : string;
  username : string;
  salario: number; 
}

export const UsuariosPage = () => {
  const dispatch = useAppDispatch();
  const { users: data, loadingUsers } = useAppSelector( (state) => state.usuarios);

  useEffect(() => {
    if (loadingUsers){
      dispatch(getAllUsers()); 
    } 
  }, [data])
  
  const columns: Column<usuarioType>[] = useMemo(() => [
    {
      Header: 'Cedula',
      accessor: "cedula" as keyof usuarioType,
    },
    {
        Header: 'Nombre',
        accessor: "nombre" as keyof usuarioType,
    },
    {
        Header: 'Apellido',
        accessor: "apellido" as keyof usuarioType,
    },
    {
      Header: 'Username',
      accessor: "username" as keyof usuarioType,
    },
    {
      Header: 'Salario',
      accessor: "salario" as keyof usuarioType,
    }
  ], [])

  const tableInstance = useTable({columns, data}, usePagination, useRowSelect)
  
  return (
    <MainAdminLayout>
      <UserModal tableInstance={tableInstance}/>
      <DeleteUserModal tableInstance={tableInstance}/>
      {
        loadingUsers ? <GettingDataLoader/> : (
          <>
          <div className="flex mb-10">
            <h1 className="origin-left font-medium text-3xl text-teal-700 mr-5">Panel Usuarios</h1>
            <button onClick={() => dispatch(setToggleModal())} className="flex space-x-3 items-center px-4 py-2 bg-teal-500 hover:bg-teal-800 rounded-lg drop-shadow-md duration-300">
              <AddIcon className="text-white"/>
              <span className="text-white text-xl font-bold">Agregar Nuevo</span>
            </button>
          </div>

                {/* <Button variant="contained" color="success" onClick={() => dispatch(setToggleModal())}></Button> */}
                <DataTable tableInstance={tableInstance}/>
          </>
         
        )
      }
    </MainAdminLayout>
  )
}