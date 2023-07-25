import { useNavigate } from "react-router-dom";

export const CardSaleHome = () => {
    const navigate = useNavigate();

    return (
    <div className='w-full single-card'>
        <article className='overflow-hidden rounded-lg shadow-lg'>
            <div className='block h-auto w-full bg-gradient-to-r from-slate-800 to-slate-900'>
                <img src={require('../../assets/car-home.png')}/>
            </div>

            <header className='flex flex-col p-2 md:p-4'>
                <h1 className='text-lg text-slate-800 pb-4'>Santa Fe</h1>
                <p className='text-grey-darker text-sm'><span className='font-bold'>Marca: </span> Hyundai</p>
                <p className='text-grey-darker text-sm'><span className='font-bold'>Tipo: </span> SUV Urbano</p>
                <p className='text-grey-darker text-sm'><span className='font-bold'>Modelo: </span> 2015</p>
            </header>

            <div className='flex flex-col px-4'>
                <p className='text-grey-darker text-sm font-bold'>Descripción</p>
                <p className='text-grey-darker text-sm pb-4'> Is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution</p>
                <p className='text-lg'><span className='font-bold'>Precio: </span> $10,000</p>
            </div>

            <footer className='flex items-center leading-none p-2 md:p-4'>
                <a className='cursor-pointer bg-cyan-600 hover:bg-cyan-700 color-white text-white px-10 py-4 rounded-lg font-bold' onClick={ () =>  navigate('/admin/usuarios') }>Comprar Auto</a>
                <p className='text-grey-darker text-sm ml-4'><span className='font-bold'>4 </span> Disponibles</p>
            </footer>
        </article>
    </div>
    )
}