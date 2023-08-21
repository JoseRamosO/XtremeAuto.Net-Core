import { useParams } from "react-router-dom";
import { MainPublicLayout } from "../theme/MainPublicLayout"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { obtenerAutos } from "../../store/slices/autos/autosThunk";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { obtenerColores } from "../../store/slices/colores/coloresThunk";
import { obtenerRuedas } from "../../store/slices/ruedas/ruedasThunk";
import { obtenerSeguros } from "../../store/slices/seguros/segurosThunk";
import { agregarCarroVendidos } from "../../store/slices/carrovendidos/carrovendidosThunk";

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

interface itemsAddedType { 
  itemId: string,
  nombre: string,
  price: number,
}

export const AutoPage = () => {
    let { autoId = 0 } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { autos, loadingAutos } = useAppSelector( (state) => state.autos);
    const { colores, loadingColores } = useAppSelector( (state) => state.colores);
    const { ruedas, loadingRuedas } = useAppSelector( (state) => state.ruedas);
    const { seguros, loadingSeguros } = useAppSelector( (state) => state.seguros);
    const [autoSelected, setAutoSelected] = useState<autoType>();
    const [colorSelected, setColorSelected] = useState<number>(0);
    const [ruedaSelected, setRuedaSelected] = useState<number>(0);
    const [seguroSelectedState, setSeguroSelectedState] = useState<number>(0);
    const [precioFinal, setPrecioFinal] = useState<number>(0);
    const [itemsAdded, setItemsAdded] = useState<itemsAddedType[]>([]);

    useEffect(() => {
        if (loadingAutos){
          dispatch(obtenerAutos());
        } 
        if ( loadingColores ) {
          dispatch(obtenerColores());
        }
        if ( loadingRuedas ) {
          dispatch(obtenerRuedas());
        }
        if ( loadingSeguros ) {
          dispatch(obtenerSeguros());
        }
        const autoSeleccionado = autos.find(auto => auto.carroModeloId == autoId);
        setAutoSelected(autoSeleccionado);
        setPrecioFinal(autoSeleccionado?.precio ? autoSeleccionado?.precio : 0);
        priceUpdater(`Auto`, autoSeleccionado?.precio, `${ autoSeleccionado?.marca } ${ autoSeleccionado?.tipo }`)

    }, [autos])

    const updatePreciosRuedas = (rueda) => {
      setPrecioFinal(precioFinal + rueda.precio);
      priceUpdater(`Rueda`, rueda.precio, rueda.nombre)
      setRuedaSelected(rueda.ruedaId)
    }

    const seguroSelected = (seguroId, precio, nombre) => {
      setPrecioFinal(precioFinal + precio);
      priceUpdater(`Seguro`, precio, nombre);
      setSeguroSelectedState(seguroId);
    } 


    const priceUpdater = (itemId, price, nombre) => {
      const itemIndex = itemsAdded.findIndex(el => el.itemId === itemId);
      const updatedCheckout = [...itemsAdded];
    
      if (itemIndex === -1) {
        updatedCheckout.push({ itemId, price, nombre});
      } else {
        updatedCheckout[itemIndex].price = price;
        updatedCheckout[itemIndex].nombre = nombre;
      }
      setItemsAdded([...updatedCheckout]);
    }


    const compraConfirmadaAuto = () => {
      const carrovendidoParsed ={
        ruedaId: ruedaSelected,
        colorId: colorSelected,
        carroModeloId: autoSelected?.carroModeloId,
        seguroId: seguroSelectedState,
        precioTotal: precioFinal,  
      }
      dispatch(agregarCarroVendidos(carrovendidoParsed));
      navigate(`/user/sales/auto/${ autoSelected?.carroModeloId }/confirmation`);
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
        <h1>Descripción del vehiculo</h1>
        <p>{ autoSelected?.descripcion }</p>
        <p>{ autoSelected?.disponible }</p>
        <p className="mt-4"><b>Modelo: </b>{ autoSelected?.modelo }</p>
        <p><b>Precio Inicial: </b>{ autoSelected?.precio }</p>

        <h2 className="mt-5">Pintura</h2>
        <div className="auto-page-colores mt-2">
          {
            colores.map((color) => (
              <a className={ `option-selector${ color.colorId === colorSelected ? ' selected' : '' }` } onClick={ () =>  setColorSelected(color.colorId)}>
                <img src={ `http://localhost:5088${color?.imagen}` }/>
              </a>
            ))
          }
        </div>
        <h2 className="mt-5">Ruedas</h2>
        <div className="auto-page-colores mt-2">
        {
            ruedas.map((rueda) => (
              <a className={ `option-selector${ rueda.ruedaId === ruedaSelected ? ' selected' : '' }` } onClick={ () =>  updatePreciosRuedas(rueda)}>
                <img src={ `http://localhost:5088${rueda?.imagen}` }/>
              </a>
            ))
          }
        </div>
        <h2 className="mt-5">Seguro</h2>
        <div className="auto-page-colores mt-2 max-w-xs">
          <select className={ 'bg-white px-2 py-2 w-full block rounded outline-none focus:ring-2 ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400' }>
          <option onChange={ () => seguroSelected(0, 0, 'No Seguro Seleccionado')}>Seleccione Seguro</option>
            {
              seguros.map(({ nombre, precio, plazo, seguroId }) => (
                <option onChange={ () => seguroSelected(seguroId, precio, nombre) }key={ seguroId } value={ seguroId }>{ nombre } | ${ precio } | { plazo } meses</option>
              ))
            }
          </select>
        </div>
        <h1 className="mt-10 mb-1"><span className="text-cyan-600">PRECIO FINAL:</span> ${ itemsAdded.reduce((total, item) => total + item.price, 0) }</h1>
        <ul className="mb-10">
          {
            itemsAdded.map(({ itemId, nombre, price }) => (
              <li>- <span className="text-cyan-600 font-bold">{ itemId }: </span>{ nombre } | ${ price }</li>
            ))
          }
        </ul>

        <button onClick={ () => compraConfirmadaAuto() } className='cursor-pointer bg-cyan-600 hover:bg-cyan-700 color-white text-white px-10 py-4 rounded-lg font-bold'>Confirmar su compra</button>
      </div>
    </MainPublicLayout>
  )
}
