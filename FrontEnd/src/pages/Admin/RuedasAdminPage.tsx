import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Column, usePagination, useRowSelect, useTable } from 'react-table';
import { useEffect, useMemo } from 'react';
import { DataTable } from '../../components/Tables/DataTable';
import { MainAdminLayout } from "../theme/MainAdminLayout";
import { GettingDataLoader } from "../../components/Loaders/GettingDataLoader";
import { obtenerRuedas } from "../../store/slices/ruedas/ruedasThunk";
import { RuedasModal } from "../../components/Modals/RuedasModal";

interface ruedaType {
  ruedaId: number,
  nombre: string,
  imagen: string,
  precio: number,
}

export const RuedasAdminPage = () => {
  const dispatch = useAppDispatch();
  const { ruedas: data, loadingRuedas } = useAppSelector( (state) => state.ruedas);

  useEffect(() => {
    if (loadingRuedas){
      dispatch(obtenerRuedas()); 
    } 
  }, [data])
  
  const columns: Column<ruedaType>[] = useMemo(() => [
    {
        Header: 'Nombre',
        accessor: "nombre" as keyof ruedaType,
    },
    {
      Header: 'Precio',
      accessor: "precio" as keyof ruedaType,
  },
    {
      Header: 'Imagen',
      accessor: "imagen" as keyof ruedaType,
  }
  ], [])

  const tableInstance = useTable({columns, data}, usePagination, useRowSelect)
  
  return (
    <MainAdminLayout>
      <RuedasModal tableInstance={tableInstance}/>
      {
        loadingRuedas ? <GettingDataLoader/> : (
          <>
                <DataTable tableInstance={tableInstance} tableOwner='ruedas' showLabel={ true }/>
          </>
         
        )
      }
    </MainAdminLayout>
  )
}