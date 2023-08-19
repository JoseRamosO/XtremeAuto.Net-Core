import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Column, usePagination, useRowSelect, useTable } from 'react-table';
import { useEffect, useMemo } from 'react';
import { DataTable } from '../../components/Tables/DataTable';
import { MainAdminLayout } from "../theme/MainAdminLayout";
import { GettingDataLoader } from "../../components/Loaders/GettingDataLoader";
import { obtenerAutos } from "../../store/slices/autos/autosThunk";
import { AutosModal } from "../../components/Modals/AutosModal";

interface autoType {
  carroModeloId: number,
  disponible: boolean,
  tipo: string,
  marca: string,
  modelo: string,
  descripcion: string,
  precio: number,
  imagen: string,
  cantidad: number
}

export const AutosAdminPage = () => {
    const dispatch = useAppDispatch();
    const { autos: data, loadingAutos } = useAppSelector( (state) => state.autos);
  
    useEffect(() => {
      if (loadingAutos){
        dispatch(obtenerAutos()); 
      } 
    }, [data])
    
    const columns: Column<autoType>[] = useMemo(() => [
      {
        Header: 'ID',
        accessor: "carroModeloId" as keyof autoType,
      },
      {
        Header: 'Tipo',
        accessor: "tipo" as keyof autoType,
      },
      {
          Header: 'Marca',
          accessor: "marca" as keyof autoType,
      },
      {
        Header: 'Modelo',
        accessor: "modelo" as keyof autoType,
      },
      {
        Header: 'Descripcion',
        accessor: "descripcion" as keyof autoType,
      },
      {
        Header: 'Precio',
        accessor: "precio" as keyof autoType,
      },
      {
        Header: 'Cantidad',
        accessor: "cantidad" as keyof autoType,
      },
      {
        Header: 'Imagen',
        accessor: "imagen" as keyof autoType,
      }
    ], [])
  
    const tableInstance = useTable({columns, data}, usePagination, useRowSelect)
    
    return (
      <MainAdminLayout>
        <AutosModal tableInstance={tableInstance}/>
        {
          loadingAutos ? <GettingDataLoader/> : (
            <>
                  <DataTable tableInstance={tableInstance} tableOwner='autos' showLabel={ true }/>
            </>
           
          )
        }
      </MainAdminLayout>
    )
}
