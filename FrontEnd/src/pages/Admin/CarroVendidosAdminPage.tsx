import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Column, usePagination, useRowSelect, useTable } from 'react-table';
import { useEffect, useMemo } from 'react';
import { DataTable } from '../../components/Tables/DataTable';
import { MainAdminLayout } from "../theme/MainAdminLayout";
import { GettingDataLoader } from "../../components/Loaders/GettingDataLoader";
import { obtenerAutos } from "../../store/slices/autos/autosThunk";
import { obtenerCarroVendidos } from "../../store/slices/carrovendidos/carrovendidosThunk";
import { obtenerColores } from "../../store/slices/colores/coloresThunk";
import { obtenerSeguros } from "../../store/slices/seguros/segurosThunk";
import { obtenerRuedas } from "../../store/slices/ruedas/ruedasThunk";
import { CarroVendidosModal } from "../../components/Modals/CarroVendidosModal";

interface carrovendidoType {
  carroVendidoId: number,
  ruedaId: number,
  colorId: number,
  carroModeloId: number,
  seguroId: number,
  precioTotal: number,
}

export const CarroVendidosAdminPage = () => {
    const dispatch = useAppDispatch();
    const { carrovendidos: data, loadingCarroVendidos } = useAppSelector( (state) => state.carrovendidos);
  
    useEffect(() => {
      if (loadingCarroVendidos){
        dispatch(obtenerCarroVendidos()); 
      } 
    }, [data])
    
    const columns: Column<carrovendidoType>[] = useMemo(() => [
      {
        Header: 'ID',
        accessor: "carroVendidoId" as keyof carrovendidoType,
      },
      {
        Header: 'Rueda',
        accessor: "ruedaId" as keyof carrovendidoType,
      },
      {
          Header: 'Color',
          accessor: "colorId" as keyof carrovendidoType,
      },
      {
        Header: 'Auto',
        accessor: "carroModeloId" as keyof carrovendidoType,
      },
      {
        Header: 'Seguro',
        accessor: "seguroId" as keyof carrovendidoType,
      },
      {
        Header: 'Precio',
        accessor: "precioTotal" as keyof carrovendidoType,
      }
    ], [])
  
    const tableInstance = useTable({columns, data}, usePagination, useRowSelect)
    
    return (
      <MainAdminLayout>
        <CarroVendidosModal tableInstance={tableInstance}/>
        {
          loadingCarroVendidos ? <GettingDataLoader/> : (
            <>
                  <DataTable tableInstance={tableInstance} tableOwner='carrovendidos' showLabel={ true }/>
            </>
           
          )
        }
      </MainAdminLayout>
    )
}
