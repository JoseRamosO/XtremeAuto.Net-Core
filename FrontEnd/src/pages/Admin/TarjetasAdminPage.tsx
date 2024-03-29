import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Column, usePagination, useRowSelect, useTable } from 'react-table';
import { useEffect, useMemo } from 'react';
import { DataTable } from '../../components/Tables/DataTable';
import { MainAdminLayout } from "../theme/MainAdminLayout";
import { GettingDataLoader } from "../../components/Loaders/GettingDataLoader";
import { obtenerTarjetas } from "../../store/slices/tarjetas/tarjetasThunk";
import { TarjetasModal } from "../../components/Modals/TarjetasModal";
import { getAllUsers } from "../../store/slices/usuarios/usuariosThunk";

interface tarjetaType {
  tarjetaId: number,
  usuarioId: number,
  nombre: string,
  numeroDeTarjeta: string,
  cvv: string,
  fechaVencimiento: Date,
  lockoutEnabled: boolean,
}

export const TarjetasAdminPage = () => {
  const dispatch = useAppDispatch();
  const { tarjetas: data, loadingTarjetas } = useAppSelector( (state) => state.tarjetas);

  useEffect(() => {
    if (loadingTarjetas){
      dispatch(obtenerTarjetas()); 
      dispatch(getAllUsers()); 
    } 
  }, [data])
  
  const columns: Column<tarjetaType>[] = useMemo(() => [
    {
      Header: 'ID',
      accessor: "tarjetaId" as keyof tarjetaType,
  },
    {
        Header: 'Nombre',
        accessor: "nombre" as keyof tarjetaType,
    },
    {
      Header: 'numero De Tarjeta',
      accessor: "numeroDeTarjeta" as keyof tarjetaType,
    },
      {
        Header: 'cvv',
        accessor: "cvv" as keyof tarjetaType,
    },
    {
      Header: 'fecha Vencimiento',
      accessor: "fechaVencimiento" as keyof tarjetaType,
    },
    {
      Header: 'Bloqueado',
      accessor: "lockoutEnabled" as keyof tarjetaType,
    },
    {
      Header: 'usuario Id',
      accessor: "usuarioId" as keyof tarjetaType,
    }

  ], [])

  const tableInstance = useTable({columns, data}, usePagination, useRowSelect)
  
  return (
    <MainAdminLayout>
      <TarjetasModal tableInstance={tableInstance}/>
      {
        loadingTarjetas ? <GettingDataLoader/> : (
          <>
                <DataTable tableInstance={tableInstance} tableOwner='tarjetas' showLabel={ true }/>
          </>
         
        )
      }
    </MainAdminLayout>
  )
}