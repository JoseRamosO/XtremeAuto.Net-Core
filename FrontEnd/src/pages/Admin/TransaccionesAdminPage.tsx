import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Column, usePagination, useRowSelect, useTable } from 'react-table';
import { useEffect, useMemo } from 'react';
import { DataTable } from '../../components/Tables/DataTable';
import { MainAdminLayout } from "../theme/MainAdminLayout";
import { GettingDataLoader } from "../../components/Loaders/GettingDataLoader";
import { DeleteUserModal } from "../../components/Modals/DeleteUserModal";
import { obtenerTransacciones } from "../../store/slices/transacciones/transaccionesThunk";
import { TransaccionesModal } from "../../components/Modals/TransaccionesModal";

interface transaccionType {
  transaccionId: number,
  ventaId: string,
  tarjetaId: number,
  fechaTransaccion: string,
  fechaCorte: string,
  intereses: number,
  pagado: boolean,
  precio: number,
}

export const TransaccionesAdminPage = () => {
  const dispatch = useAppDispatch();
  const { transacciones: data, loadingTransacciones } = useAppSelector( (state) => state.transacciones);

  useEffect(() => {
    if (loadingTransacciones){
      dispatch(obtenerTransacciones()); 
    } 
  }, [data])

  const columns: Column<transaccionType>[] = useMemo(() => [
    {
      Header: 'Venta ID',
      accessor: "ventaId" as keyof transaccionType,
    },
    {
      Header: 'Tarjeta ID',
      accessor: "tarjetaId" as keyof transaccionType,
    },
    {
      Header: 'fecha Transaccion',
      accessor: "fechaTransaccion" as keyof transaccionType,
    },
    {
      Header: 'fecha Corte',
      accessor: "fechaCorte" as keyof transaccionType,
    },
    {
      Header: 'intereses',
      accessor: "intereses" as keyof transaccionType,
    },
    {
      Header: 'pagado',
      accessor: "pagado" as keyof transaccionType,
    },
    {
      Header: 'Precio',
      accessor: "precio" as keyof transaccionType,
    }
  ], [])

  const tableInstance = useTable({columns, data}, usePagination, useRowSelect)
  
  return (
    <MainAdminLayout>
      <TransaccionesModal tableInstance={tableInstance}/>
      <DeleteUserModal tableInstance={tableInstance}/>
      {
        loadingTransacciones ? <GettingDataLoader/> : (
          <>
                <DataTable tableInstance={tableInstance} tableOwner='transacciones'/>
          </>
         
        )
      }
    </MainAdminLayout>
  )

}