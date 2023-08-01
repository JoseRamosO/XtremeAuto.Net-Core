import { MainPublicLayout } from '../theme/MainPublicLayout';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { GettingDataLoader } from '../../components/Loaders/GettingDataLoader';
import { useEffect } from 'react';
import { obtenerAutos } from '../../store/slices/autos/autosThunk';
import { CardSaleHome } from '../../components/Cards/CardSaleHome';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { autos, loadingAutos } = useAppSelector( (state) => state.autos);

  useEffect(() => {
    if (loadingAutos){
      dispatch(obtenerAutos()); 
    } 
  }, [autos])

  const AutosRenderComponent = () => {
    return (
      <>
        {
          autos.map(( auto ) => (
            <CardSaleHome key={ auto.carroModeloId } autoToRender={ auto }/>
          ))
        }
      </>

    )
  }

  const getLastItemByCarroModeloId = (array) =>{
    if (!Array.isArray(array) || array.length === 0) {
      return null;
    }
    return array.reduce((lastItem, currentItem) => {
      if (!lastItem || currentItem.carroModeloId > lastItem.carroModeloId) {
        return currentItem;
      } else {
        return lastItem;
      }
    });
  }
  
  const lastItem = getLastItemByCarroModeloId(autos);

  return (
    <MainPublicLayout>
       <div className='homepage-header bg-gradient-to-r from-slate-800 to-slate-900'>
        <div className='homepgape-header-wrapper'>
        <div className='header-content animate__animated animate__fadeIn'>
            <h1 className='bg-cyan-600 rounded-lg px-3 py-1'>{ lastItem?.marca }</h1>
            <p>{ lastItem?.tipo }</p>
            <p>{ lastItem?.modelo }</p>
          </div>
          <div className='header-image max-w-2xl animate__animated animate__bounceInRight'>
            <img src={ `http://localhost:5088${lastItem?.imagen}` }/>
          </div>
        </div>
      </div>

      <div className='main-content'>
        <h1>AUTOS EN VENTA</h1>
        
          <div className="flex flex-wrap mt-9 cards-container">
            {
              loadingAutos ? <GettingDataLoader/> : <AutosRenderComponent/>
            }
          </div>
      </div>

    </MainPublicLayout>
  )
}
