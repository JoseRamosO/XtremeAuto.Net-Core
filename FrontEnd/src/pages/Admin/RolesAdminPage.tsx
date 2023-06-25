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
import { DeleteUserModal } from "../../components/Modals/DeleteUserModal";
import { obtenerRoles } from "../../store/slices/roles/rolesThunk";

interface roleType {
    rolId: number,
    nombre: string
}

export const RolesAdminPage = () => {
  const dispatch = useAppDispatch();
  const { roles: data, loadingRoles } = useAppSelector( (state) => state.roles);

  useEffect(() => {
    if (loadingRoles){
      dispatch(obtenerRoles()); 
    } 
  }, [data])
  
  const columns: Column<roleType>[] = useMemo(() => [
    {
      Header: 'Rol Id',
      accessor: "rolId" as keyof roleType,
    },
    {
        Header: 'Nombre',
        accessor: "nombre" as keyof roleType,
    }
  ], [])

  const tableInstance = useTable({columns, data}, usePagination, useRowSelect)
  
  return (
    <MainAdminLayout>
      <UserModal tableInstance={tableInstance}/>
      <DeleteUserModal tableInstance={tableInstance}/>
      {
        loadingRoles ? <GettingDataLoader/> : (
          <>
                <Button variant="contained" color="success" onClick={() => dispatch(setToggleModal())}>Agregar Nuevo Rol</Button>
                <DataTable tableInstance={tableInstance}/>
          </>
         
        )
      }
    </MainAdminLayout>
  )
}