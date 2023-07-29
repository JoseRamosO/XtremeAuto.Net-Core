import { useParams } from "react-router-dom";
import { MainPublicLayout } from "../theme/MainPublicLayout"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { obtenerAutos } from "../../store/slices/autos/autosThunk";
import { useNavigate } from "react-router-dom";


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

export const AutoPage = () => {
    let { autoId = 0 } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { autos, loadingAutos } = useAppSelector( (state) => state.autos);
    const [autoSelected, setAutoSelected] = useState<autoType>()

    useEffect(() => {
        if (loadingAutos){
          dispatch(obtenerAutos());
        } 
        setAutoSelected(autos.find(auto => auto.carroModeloId == autoId ))
    }, [autos])
   
    console.log(autoSelected)
  return (
    <MainPublicLayout>
       <div className='homepage-header bg-gradient-to-r from-slate-800 to-slate-900'>
        <div className='homepgape-header-wrapper'>
        <div className='header-content animate__animated animate__fadeIn'>
        <a className='cursor-pointer text-white font-bold' onClick={ () =>  navigate('/')}>Volver</a>
            <h1 className='bg-cyan-600 rounded-lg px-3 py-1'>{ autoSelected?.marca }</h1>
            <p>{ autoSelected?.tipo }</p>
            <p>{ autoSelected?.modelo }</p>
          </div>
          <div className='header-image max-w-2xl animate__animated animate__bounceInRight'>
            <img src={ `http://localhost:5088${autoSelected?.imagen}` }/>
          </div>
        </div>
      </div>

      <div className='main-content'>
        <h1>{ autoSelected?.marca } | { autoSelected?.tipo }</h1>
        <p>{ autoSelected?.descripcion }</p>
        <p>{ autoSelected?.disponible }</p>
        <p>{ autoSelected?.modelo }</p>
        <p>{ autoSelected?.precio }</p>
      </div>
    </MainPublicLayout>
  )
}
