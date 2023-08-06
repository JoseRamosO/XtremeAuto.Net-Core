import { Dispatch } from "redux";
import { baseApi } from "../../../api/apiConfig";
import { setRuedas, setLoadingRuedas, setToggleModalRuedas } from "./ruedasSlice";

import { toast } from "react-toastify";

const obtenerRuedas = () => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.get('/Rueda');
        console.log(data);
        dispatch(setRuedas(data));
    }
};

const agregarRuedas = ({ nombre, imagen, precio }) => {
    return async (dispatch: Dispatch) => {
        let ruedaFormData = new FormData();

        ruedaFormData.append('nombre', nombre);
        ruedaFormData.append('imagen', '');
        ruedaFormData.append('precio', precio);
        ruedaFormData.append('FormFile', imagen);
    
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data', // Ensure you use 'multipart/form-data' for sending files
            },
        };

        const { data } = await baseApi.post("/Rueda", ruedaFormData, config);

        if (data) {
            const { data } = await baseApi.get('/Rueda');
            dispatch(setLoadingRuedas());
            dispatch(setRuedas(data));
            toast.success('¡Rueda agregada con éxito!');
            dispatch(setToggleModalRuedas());
        }
    }
};

const editarRuedas = ({ ruedaId, nombre, imagen, precio, FormFile }) => {
    return async (dispatch: Dispatch) => {
        let ruedaFormData = new FormData();
        ruedaFormData.append('RuedaId', ruedaId);
        ruedaFormData.append('nombre', nombre);
        ruedaFormData.append('precio', precio);
        ruedaFormData.append('imagen', imagen);
        if (FormFile) {
            ruedaFormData.append('FormFile', FormFile);
        }
        console.log(ruedaFormData)
        
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const { data } = await baseApi.put("/Rueda", ruedaFormData, config);

        if (data) {
            const { data } = await baseApi.get('/Rueda');
            dispatch(setLoadingRuedas());
            dispatch(setRuedas(data));
            toast.success('¡Rueda actualizada con éxito!');
            dispatch(setToggleModalRuedas());
        }
    }
};

const eliminarRuedas = ({ ruedaId }) => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.delete(`/Rueda/${ ruedaId }` );
        const { data:newData } = await baseApi.get('/Rueda');
        dispatch(setLoadingRuedas());
        dispatch(setRuedas(newData));
        toast.success('¡Rueda eliminada con éxito!');
        dispatch(setToggleModalRuedas());
    }
};

export {
    obtenerRuedas,
    agregarRuedas,
    eliminarRuedas,
    editarRuedas
}