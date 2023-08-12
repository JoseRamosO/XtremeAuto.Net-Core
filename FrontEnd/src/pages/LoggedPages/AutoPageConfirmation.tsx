import { useParams } from "react-router-dom";
import { MainPublicLayout } from "../theme/MainPublicLayout"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { obtenerAutos } from "../../store/slices/autos/autosThunk";
import { useNavigate } from "react-router-dom";
import Lottie from 'lottie-react';
import groovyWalkAnimation from '../../assets/confirmation-party.json';


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

export const AutoPageConfirmation = () => {
    let { autoId = 0 } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { autos, loadingAutos } = useAppSelector( (state) => state.autos);
    const [autoSelected, setAutoSelected] = useState<autoType>();

    useEffect(() => {
        if (loadingAutos){
          dispatch(obtenerAutos());
        } 
        const autoSeleccionado = autos.find(auto => auto.carroModeloId == autoId);
        setAutoSelected(autoSeleccionado);
    }, [autos])

  return (
    <MainPublicLayout>
    <div className='homepage-header confirmation bg-gradient-to-r from-slate-800 to-slate-900'>
     <div className='homepgape-header-wrapper'>
     <div className='header-content animate__animated animate__fadeIn'>
         <h1 className='text-header-con bg-cyan-600 rounded-lg px-3 py-1'>YA ESTA EN TUS MANOS!</h1>
         <Lottie animationData={groovyWalkAnimation} />
       </div>
       <div className='header-image max-w-2xl animate__animated animate__bounceInRight'>
         <img src={ `http://localhost:5088${autoSelected?.imagen}` }/>
       </div>
     </div>
   </div>
   <div className='main-content'>
        <h1>{ autoSelected?.marca } { autoSelected?.tipo } { autoSelected?.modelo }</h1>
        <button onClick={ () =>  navigate('/') } className='cursor-pointer bg-cyan-600 hover:bg-cyan-700 color-white text-white px-10 py-4 rounded-lg font-bold mt-5'>Ver más autos</button>
    </div>
   </MainPublicLayout>
  )
}
