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

  return (
    <MainPublicLayout>
      <div className='homepage-header bg-gradient-to-r from-slate-800 to-slate-900'>
        <div className='homepgape-header-wrapper'>
          <div className='header-content'>
            <h1>Lorem ipsum dolor sit amet, consectetur</h1>
          </div>
          <div className='header-image'>
            <img src={require('../../assets/car-home.png')}/>
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
