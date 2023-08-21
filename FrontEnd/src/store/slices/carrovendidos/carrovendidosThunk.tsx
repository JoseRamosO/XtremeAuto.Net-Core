import { Dispatch } from "redux";
import { baseApi } from "../../../api/apiConfig";
import { setCarroVendidos, setLoadingCarroVendidos, setToggleModalCarroVendidos } from "./carrovendidosSlice";
import { toast } from "react-toastify";
import { setLoadingVentas, setVentas } from "../ventas/ventasSlice";



const obtenerCarroVendidos = () => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.get('/CarroVendido');
        console.log(data);
        dispatch(setCarroVendidos(data));
    }
};

const agregarCarroVendidos = ( carrovendidoNuevo ) => {
    return async (dispatch: Dispatch) => {
        const carrovendidoParsed ={
            ruedaId: carrovendidoNuevo.ruedaId,
            colorId: carrovendidoNuevo.colorId,
            carroModeloId: carrovendidoNuevo.carroModeloId,
            seguroId: carrovendidoNuevo.seguroId,
            precioTotal: carrovendidoNuevo.precioTotal,  
        }
        const { data } = await baseApi.post("/CarroVendido", carrovendidoParsed);

        if (data) {
            const { data } = await baseApi.get('/CarroVendido');
            const ventaParsed = {
                VentaId: 0,
                UsuarioId: 1,
                CarroVendidoId: 1,
                Total: 0,
                Meses: 3,
                Intereses: 0,
                SaldoPendiente: 0,
                SaldoAbonado: 0,
            }
            const { data: dataVenta } = await baseApi.post("/Venta", ventaParsed);

            if (dataVenta) {
                const { data: dataVentaAgregadas } = await baseApi.get('/Venta');
                dispatch(setLoadingVentas());
                dispatch(setVentas(dataVentaAgregadas));
            }else {
                toast.error('¡Error agregando venta!')
            }

            dispatch(setLoadingCarroVendidos());
            dispatch(setCarroVendidos(data));
            dispatch(setToggleModalCarroVendidos());

        }else {
            toast.error('¡Error agregando carrovendido!')
        }
    }
};

const editarCarroVendidos = (carrovendidoUpdate) => {
    return async (dispatch: Dispatch) => {

        const { data } = await baseApi.put("/CarroVendido", carrovendidoUpdate);

        if (data) {
            const { data } = await baseApi.get('/CarroVendido');
            dispatch(setLoadingCarroVendidos());
            dispatch(setCarroVendidos(data));
            toast.success('CarroVendido actualizado con éxito!');
            dispatch(setToggleModalCarroVendidos());
        }
        else {
            toast.error('¡Error actualizando carrovendido!')
        }
    }
};

const eliminarCarroVendidos = ({ carrovendidoId }) => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.delete(`/CarroVendido/${ carrovendidoId }` );
        const { data:newData } = await baseApi.get('/CarroVendido');
        dispatch(setLoadingCarroVendidos());
        dispatch(setCarroVendidos(newData));
        toast.success('¡CarroVendido eliminado con éxito!');
        dispatch(setToggleModalCarroVendidos());
        
    }
};

export {
    obtenerCarroVendidos,
    agregarCarroVendidos,
    eliminarCarroVendidos,
    editarCarroVendidos
}