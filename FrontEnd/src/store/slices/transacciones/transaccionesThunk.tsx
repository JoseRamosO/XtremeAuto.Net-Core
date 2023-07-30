import { Dispatch } from "redux";
import { baseApi } from "../../../api/apiConfig";
import { setTransacciones, setLoadingTransacciones, setToggleModalTransacciones } from "./transaccionesSlice";
import { toast } from "react-toastify";



const obtenerTransacciones = () => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.get('/Transaccion');
        dispatch(setTransacciones(data));
    }
};

const agregarTransacciones = ( transaccionNuevo ) => {
    return async (dispatch: Dispatch) => {
        const transaccionParsed ={
            ventaId: transaccionNuevo.ventaId,
            tarjetaId: transaccionNuevo.tarjetaId,
            fechaTransaccion: transaccionNuevo.fechaTransaccion,
            fechaCorte: transaccionNuevo.fechaCorte,
            intereses: transaccionNuevo.intereses,
            pagado: transaccionNuevo.pagado,
            precio: transaccionNuevo.precio, 
    }
        const { data } = await baseApi.post("/Transaccion", transaccionParsed);

        if (data) {
            const { data } = await baseApi.get('/Transaccion');
            dispatch(setLoadingTransacciones());
            dispatch(setTransacciones(data));
            toast.success('¡Transaccion agregado con éxito!');
            dispatch(setToggleModalTransacciones());
        }else {
            toast.error('¡Error agregando transaccion!')
        }
    }
};

const editarTransacciones = (transaccionUpdate) => {
    return async (dispatch: Dispatch) => {

        const { data } = await baseApi.put("/Transaccion", transaccionUpdate);

        if (data) {
            const { data } = await baseApi.get('/Transaccion');
            dispatch(setLoadingTransacciones());
            dispatch(setTransacciones(data));
            toast.success('Transaccion actualizado con éxito!');
            dispatch(setToggleModalTransacciones());
        }
        else {
            toast.error('¡Error actualizando transaccion!')
        }
    }
};

const eliminarTransacciones = ({ transaccionId }) => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.delete(`/Transaccion/${ transaccionId }` );
        const { data:newData } = await baseApi.get('/Transaccion');
        dispatch(setLoadingTransacciones());
        dispatch(setTransacciones(newData));
        toast.success('¡Transaccion eliminado con éxito!');
        dispatch(setToggleModalTransacciones());
        
    }
};

export {
    obtenerTransacciones,
    agregarTransacciones,
    eliminarTransacciones,
    editarTransacciones
}