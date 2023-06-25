import Lottie from 'lottie-react';
import groovyWalkAnimation from '../../assets/plane-loader.json';
export const GettingDataLoader = () => {
  return (
    <div className='global-loader'>
        <Lottie animationData={groovyWalkAnimation} />
        <p>Cargando Información...</p>
    </div>
  )
}
