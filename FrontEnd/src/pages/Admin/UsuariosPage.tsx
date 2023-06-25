import { getAllUsers } from "../../store/slices/usuarios/usuariosThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { UserModal } from '../../components/Modals/UserModal';
import { Column, usePagination, useRowSelect, useTable } from 'react-table';
import { useEffect, useMemo } from 'react';
import { DataTable } from '../../components/Tables/DataTable';
import { MainAdminLayout } from "../theme/MainAdminLayout";
import { Button } from "@mui/material";
import { setToggleModal } from "../../store/slices/userInterface/userInterface";
import { GettingDataLoader } from "../../components/Loaders/GettingDataLoader";

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
      {
        loadingUsers ? <GettingDataLoader/> : (
          <>
                <Button variant="contained" color="success" onClick={() => dispatch(setToggleModal())}>Agregar Nuevo Usuario</Button>
                <DataTable tableInstance={tableInstance}/>
          </>
         
        )
      }
    </MainAdminLayout>
  )
}