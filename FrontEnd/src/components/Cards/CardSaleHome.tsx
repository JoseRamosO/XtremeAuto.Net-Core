import { useNavigate } from "react-router-dom";

export const CardSaleHome = ({ autoToRender }) => {
    const navigate = useNavigate();
    const { marca, tipo, modelo, descripcion, precio, cantidad, carroModeloId, imagen } = autoToRender;

    console.log(autoToRender)

    return (
    <div className='w-full single-card'>
        <article className='overflow-hidden rounded-lg shadow-lg'>
            <div className='block h-auto w-full bg-gradient-to-r from-slate-800 to-slate-900 bg-card-image px-2 py-5'>
                <img className='max-w-xs m-auto' src={ `http://localhost:5088${imagen}` }/>
            </div>

            <header className='flex flex-col p-2 md:p-4'>
                <h1 className='text-lg text-slate-800 pb-4'>{ tipo }</h1>
                <p className='text-grey-darker text-sm'><span className='font-bold'>Marca: </span> { marca }</p>
                <p className='text-grey-darker text-sm'><span className='font-bold'>Modelo: </span> { modelo }</p>
            </header>

            <div className='flex flex-col px-4'>
                <p className='text-grey-darker text-sm font-bold'>Descripción</p>
                <p className='text-grey-darker text-sm pb-4'>{ descripcion }</p>
                <p className='text-lg'><span className='font-bold'>Precio: </span> ${ precio }</p>
            </div>

            <footer className='flex items-center leading-none p-2 md:p-4'>
                <a className='cursor-pointer bg-cyan-600 hover:bg-cyan-700 color-white text-white px-10 py-4 rounded-lg font-bold' onClick={ () =>  navigate(`/user/sales/auto/${ carroModeloId }`) }>Comprar Auto</a>
                <p className='text-grey-darker text-sm ml-4'><span className='font-bold'>{ cantidad } </span> Disponibles</p>
            </footer>
        </article>
    </div>
    )
}