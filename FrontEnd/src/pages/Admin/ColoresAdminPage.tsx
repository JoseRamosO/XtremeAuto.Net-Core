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
import { obtenerColores } from "../../store/slices/colores/coloresThunk";

interface colorType {
  colorId: number,
  nombre: string,
  imagen: string,
}

export const ColoresAdminPage = () => {
  const dispatch = useAppDispatch();
  const { colores: data, loadingColores } = useAppSelector( (state) => state.colores);

  useEffect(() => {
    if (loadingColores){
      dispatch(obtenerColores()); 
    } 
  }, [data])
  
  const columns: Column<colorType>[] = useMemo(() => [
    {
      Header: 'Color Id',
      accessor: "colorId" as keyof colorType,
    },
    {
        Header: 'Nombre',
        accessor: "nombre" as keyof colorType,
    },
    {
      Header: 'Imagen',
      accessor: "imagen" as keyof colorType,
  }
  ], [])

  const tableInstance = useTable({columns, data}, usePagination, useRowSelect)
  
  return (
    <MainAdminLayout>
      <UserModal tableInstance={tableInstance}/>
      <DeleteUserModal tableInstance={tableInstance}/>
      {
        loadingColores ? <GettingDataLoader/> : (
          <>
                <Button variant="contained" color="success" onClick={() => dispatch(setToggleModal())}>Agregar Nuevo Rol</Button>
                <DataTable tableInstance={tableInstance}/>
          </>
         
        )
      }
    </MainAdminLayout>
  )
}