import { getAllUsers } from "../../store/slices/usuarios/usuariosThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { UserModal } from '../../components/Modals/UserModal';
import { Column, usePagination, useRowSelect, useTable } from 'react-table';
import { useEffect, useMemo } from 'react';
import { DataTable } from '../../components/Tables/DataTable';
import { MainAdminLayout } from "../theme/MainAdminLayout";

interface ExampleObject {
  id: number,
  nombre: string,
  email: string,
  last_login: string,
  rol: number,
}

export const RegisterPage = () => {
  const dispatch = useAppDispatch();

  const { users: data, loadingUsers } = useAppSelector( (state) => state.usuarios);

  useEffect(() => {
    if (loadingUsers){
      dispatch(getAllUsers()); 
    } 
  }, [data])
  
  const columns: Column<ExampleObject>[] = useMemo(() => [
    {
      Header: 'ID',
      accessor: "id" as keyof ExampleObject,
    },
    {
        Header: 'Nombre',
        accessor: "nombre" as keyof ExampleObject,
    },
    {
        Header: 'Rol',
        accessor: "rol" as keyof ExampleObject,
    },
    {
      Header: 'Ultimo Login',
      accessor: "last_login" as keyof ExampleObject,
    }
  ], [])

  
  const tableInstance = useTable({columns, data}, usePagination, useRowSelect)
  
  return (
    <MainAdminLayout>
      <UserModal tableInstance={tableInstance}/>
      {
        loadingUsers ? <p>Loading</p> : <DataTable tableInstance={tableInstance} tableOwner='usuarios'/>
      }
    </MainAdminLayout>
  )
}