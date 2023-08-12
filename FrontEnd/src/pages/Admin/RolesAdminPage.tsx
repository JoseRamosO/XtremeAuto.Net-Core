import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { UserModal } from '../../components/Modals/UserModal';
import { Column, usePagination, useRowSelect, useTable } from 'react-table';
import { useEffect, useMemo } from 'react';
import { DataTable } from '../../components/Tables/DataTable';
import { MainAdminLayout } from "../theme/MainAdminLayout";
import { GettingDataLoader } from "../../components/Loaders/GettingDataLoader";
import { obtenerRoles } from "../../store/slices/roles/rolesThunk";
import AddIcon from '@mui/icons-material/Add';
import { setToggleModalRoles } from "../../store/slices/roles/rolesSlice";
import { RolsModal } from "../../components/Modals/RolsModal";

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
      <RolsModal tableInstance={tableInstance}/>
      {
        loadingRoles ? <GettingDataLoader/> : (
          <>
            <DataTable tableInstance={tableInstance} tableOwner="roles"/>
          </>
        )
      }
    </MainAdminLayout>
  )
}