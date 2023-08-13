import { Dispatch } from "redux";
import { baseApi } from "../../../api/apiConfig";
import { setSeguros, setLoadingSeguros, setToggleModalSeguros } from "./segurosSlice";
import { toast } from "react-toastify";



const obtenerSeguros = () => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.get('/Seguro');
        dispatch(setSeguros(data));
    }
};

const agregarSeguros = ( seguroNuevo ) => {
    return async (dispatch: Dispatch) => {
        const seguroParsed ={
            nombre: seguroNuevo.nombre, 
            plazo: seguroNuevo.plazo,
            precio: seguroNuevo.precio,  
    }
        const { data } = await baseApi.post("/Seguro", seguroParsed);

        if (data) {
            const { data } = await baseApi.get('/Seguro');
            dispatch(setLoadingSeguros());
            dispatch(setSeguros(data));
            toast.success('¡Seguro agregado con éxito!');
            dispatch(setToggleModalSeguros());
        }else {
            toast.error('¡Error agregando seguro!')
        }
    }
};

const editarSeguros = (seguroUpdate) => {
    return async (dispatch: Dispatch) => {

        const { data } = await baseApi.put("/Seguro", seguroUpdate);

        if (data) {
            const { data } = await baseApi.get('/Seguro');
            dispatch(setLoadingSeguros());
            dispatch(setSeguros(data));
            toast.success('Seguro actualizado con éxito!');
            dispatch(setToggleModalSeguros());
        }
        else {
            toast.error('¡Error actualizando seguro!')
        }
    }
};

const eliminarSeguros = ({ seguroId }) => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.delete(`/Seguro/${ seguroId }` );
        const { data:newData } = await baseApi.get('/Seguro');
        dispatch(setLoadingSeguros());
        dispatch(setSeguros(newData));
        toast.success('¡Seguro eliminado con éxito!');
        dispatch(setToggleModalSeguros());
        
    }
};

export {
    obtenerSeguros,
    agregarSeguros,
    eliminarSeguros,
    editarSeguros
}