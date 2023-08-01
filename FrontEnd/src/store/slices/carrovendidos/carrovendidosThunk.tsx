import { Dispatch } from "redux";
import { baseApi } from "../../../api/apiConfig";
import { setCarroVendidos, setLoadingCarroVendidos, setToggleModalCarroVendidos } from "./carrovendidosSlice";
import { toast } from "react-toastify";



const obtenerCarroVendidos = () => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.get('/CarroVendido');
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
            dispatch(setLoadingCarroVendidos());
            dispatch(setCarroVendidos(data));
            toast.success('¡CarroVendido agregado con éxito!');
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