import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Column, usePagination, useRowSelect, useTable } from 'react-table';
import { useEffect, useMemo } from 'react';
import { DataTable } from '../../components/Tables/DataTable';
import { MainAdminLayout } from "../theme/MainAdminLayout";
import { GettingDataLoader } from "../../components/Loaders/GettingDataLoader";
import { obtenerVentas } from "../../store/slices/ventas/ventasThunk";
import { getAllUsers } from "../../store/slices/usuarios/usuariosThunk";
import { obtenerCarroVendidos } from "../../store/slices/carrovendidos/carrovendidosThunk";
import { VentasModal } from "../../components/Modals/VentasModal";

interface ventaType {
  ventaId: number,
  usuarioId: number,
  carroVendidoId: number,
  meses: number,
  total: number,
  intereses: number,
  saldoPendiente: number,
  saldoAbonado: number,
}

export const VentasAdminPage = () => {
  const dispatch = useAppDispatch();
  const { ventas: data, loadingVentas } = useAppSelector( (state) => state.ventas);

  useEffect(() => {
    if (loadingVentas){
      dispatch(obtenerVentas()); 
      dispatch(getAllUsers()); 
      dispatch(obtenerCarroVendidos()); 
    } 
  }, [data])

  const columns: Column<ventaType>[] = useMemo(() => [
    
    {
      Header: 'ID',
      accessor: "ventaId" as keyof ventaType,
    },
    {
      Header: 'Usuario ID',
      accessor: "usuarioId" as keyof ventaType,
    },
    {
      Header: 'Carro Vendido ID',
      accessor: "carroVendidoId" as keyof ventaType,
    },
    {
      Header: 'Meses',
      accessor: "meses" as keyof ventaType,
    },
    {
      Header: 'Total',
      accessor: "total" as keyof ventaType,
    },
    {
      Header: 'intereses',
      accessor: "intereses" as keyof ventaType,
    },
    {
      Header: 'saldo Pendiente',
      accessor: "saldoPendiente" as keyof ventaType,
    },
    {
      Header: 'saldo Abonado',
      accessor: "saldoAbonado" as keyof ventaType,
    }
  ], [])

  const tableInstance = useTable({columns, data}, usePagination, useRowSelect)
  
  return (
    <MainAdminLayout>
      <VentasModal tableInstance={tableInstance}/>
      {
        loadingVentas ? <GettingDataLoader/> : (
          <>
                <DataTable tableInstance={tableInstance} tableOwner='ventas' showLabel={ true }/>
          </>
         
        )
      }
    </MainAdminLayout>
  )

}