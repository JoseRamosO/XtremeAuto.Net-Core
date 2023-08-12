import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Column, usePagination, useRowSelect, useTable } from 'react-table';
import { useEffect, useMemo } from 'react';
import { DataTable } from '../../components/Tables/DataTable';
import { MainAdminLayout } from "../theme/MainAdminLayout";
import { GettingDataLoader } from "../../components/Loaders/GettingDataLoader";
import { obtenerSeguros } from "../../store/slices/seguros/segurosThunk";
import { SegurosModal } from "../../components/Modals/SegurosModal";

interface seguroType {
  seguroId: number,
  nombre: string,
  precio: number,
  plazo: number,
}

export const SegurosAdminPage = () => {
  const dispatch = useAppDispatch();
  const { seguros: data, loadingSeguros } = useAppSelector( (state) => state.seguros);

  useEffect(() => {
    if (loadingSeguros){
      dispatch(obtenerSeguros()); 
    } 
  }, [data])
  
  const columns: Column<seguroType>[] = useMemo(() => [
    {
        Header: 'Nombre',
        accessor: "nombre" as keyof seguroType,
    },
    {
      Header: 'Precio',
      accessor: "precio" as keyof seguroType,
  },
    {
      Header: 'Plazo',
      accessor: "plazo" as keyof seguroType,
  }
  ], [])

  const tableInstance = useTable({columns, data}, usePagination, useRowSelect)
  
  return (
    <MainAdminLayout>
      <SegurosModal tableInstance={tableInstance}/>
      {
        loadingSeguros ? <GettingDataLoader/> : (
          <>
                <DataTable tableInstance={tableInstance} tableOwner='seguros'/>
          </>
         
        )
      }
    </MainAdminLayout>
  )
}