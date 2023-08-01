import { useParams } from "react-router-dom";
import { MainPublicLayout } from "../theme/MainPublicLayout"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { obtenerAutos } from "../../store/slices/autos/autosThunk";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { obtenerColores } from "../../store/slices/colores/coloresThunk";
import { obtenerRuedas } from "../../store/slices/ruedas/ruedasThunk";


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
    const { colores } = useAppSelector( (state) => state.colores);
    const { ruedas } = useAppSelector( (state) => state.ruedas);
    const [autoSelected, setAutoSelected] = useState<autoType>();
    const [colorSelected, setColorSelected] = useState<number>(0);
    const [ruedaSelected, setRuedaSelected] = useState<number>(0);
    const [precioFinal, setPrecioFinal] = useState<number>(0);

    useEffect(() => {
        if (loadingAutos){
          dispatch(obtenerAutos());
          dispatch(obtenerColores());
          dispatch(obtenerRuedas());
        } 
        setAutoSelected(autos.find(auto => auto.carroModeloId == autoId ))
        setPrecioFinal(autoSelected?.precio ? autoSelected?.precio : 0)
    }, [autos])

    const updatePreciosRuedas = (rueda) => {
      setPrecioFinal(autoSelected?.precio + rueda.precio);
      setRuedaSelected(rueda.ruedaId)
    } 
   
  return (
    <MainPublicLayout>
       <div className='homepage-header bg-gradient-to-r from-slate-800 to-slate-900'>
        <div className='homepgape-header-wrapper'>
        <div className='header-content animate__animated animate__fadeIn'>
          
        <a className='cursor-pointer text-white font-bold back-cta' onClick={ () =>  navigate('/')}>
          <ArrowBackIcon sx={{ fontSize: 50 }}/>
        </a>
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
        <h1 className="mt-5">Seleccione el color</h1>
        <div className="auto-page-colores mt-2">
          {
            colores.map((color) => (
              <a className={ `option-selector${ color.colorId === colorSelected ? ' selected' : '' }` } onClick={ () =>  setColorSelected(color.colorId)}>
                <img src={ `http://localhost:5088${color?.imagen}` }/>
              </a>
            ))
          }
        </div>
        <h1 className="mt-5">Tipo Rueda</h1>
        <div className="auto-page-colores mt-2">
        {
            ruedas.map((rueda) => (
              <a className={ `option-selector${ rueda.ruedaId === ruedaSelected ? ' selected' : '' }` } onClick={ () =>  updatePreciosRuedas(rueda)}>
                <img src={ `http://localhost:5088${rueda?.imagen}` }/>
              </a>
            ))
          }
        </div>
        <h1 className="mt-5 mb-10">PRECIO FINAL: ${ precioFinal }</h1>
        <a className='cursor-pointer bg-cyan-600 hover:bg-cyan-700 color-white text-white px-10 py-4 rounded-lg font-bold'>Confirmar su compra</a>
      </div>
    </MainPublicLayout>
  )
}
