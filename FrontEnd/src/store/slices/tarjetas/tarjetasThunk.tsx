import { Dispatch } from "redux";
import { baseApi } from "../../../api/apiConfig";
import { setTarjetas, setLoadingTarjetas, setToggleModalTarjetas } from "./tarjetasSlice";
import { toast } from "react-toastify";



const obtenerTarjetas = () => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.get('/Tarjeta');
        dispatch(setTarjetas(data));
    }
};

const agregarTarjetas = ( tarjetaNuevo ) => {
    return async (dispatch: Dispatch) => {
        const tarjetaParsed ={
            usuarioId: tarjetaNuevo.usuarioId,
            nombre: tarjetaNuevo.nombre,
            numeroDeTarjeta: tarjetaNuevo.numeroDeTarjeta,
            cvv: tarjetaNuevo.cvv,
            fechaVencimiento: tarjetaNuevo.fechaVencimiento,
            lockoutEnabled: tarjetaNuevo.lockoutEnabled,
    }
        const { data } = await baseApi.post("/Tarjeta", tarjetaParsed);
        if (data) {
            const { data } = await baseApi.get('/Tarjeta');
            dispatch(setLoadingTarjetas());
            dispatch(setTarjetas(data));
            toast.success('¡Tarjeta agregado con éxito!');
            dispatch(setToggleModalTarjetas());
        }else {
            toast.error('¡Error agregando tarjeta!')
        }
    }
};

const editarTarjetas = (tarjetaUpdate) => {
    return async (dispatch: Dispatch) => {

        const { data } = await baseApi.put("/Tarjeta", tarjetaUpdate);

        if (data) {
            const { data } = await baseApi.get('/Tarjeta');
            dispatch(setLoadingTarjetas());
            dispatch(setTarjetas(data));
            toast.success('Tarjeta actualizado con éxito!');
            dispatch(setToggleModalTarjetas());
        }
        else {
            toast.error('¡Error actualizando tarjeta!')
        }
    }
};

const eliminarTarjetas = ({ tarjetaId }) => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.delete(`/Tarjeta/${ tarjetaId }` );
        const { data:newData } = await baseApi.get('/Tarjeta');
        dispatch(setLoadingTarjetas());
        dispatch(setTarjetas(newData));
        toast.success('¡Tarjeta eliminado con éxito!');
        dispatch(setToggleModalTarjetas());
        
    }
};

export {
    obtenerTarjetas,
    agregarTarjetas,
    eliminarTarjetas,
    editarTarjetas
}