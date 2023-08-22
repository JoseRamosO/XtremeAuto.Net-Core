import { Dispatch } from "redux";
import { baseApi } from "../../../api/apiConfig";
import { setColores, setLoadingColores, setToggleModalColores } from "./coloresSlice";
import { toast } from "react-toastify";

const obtenerColores = () => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.get('/Color');
        dispatch(setColores(data));
    }
};

const agregarColores = ({ nombre, imagen }) => {
    return async (dispatch: Dispatch) => {
        let colorFormData = new FormData();

        colorFormData.append('nombre', nombre);
        colorFormData.append('imagen', '');
        colorFormData.append('FormFile', imagen);
    
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data', // Ensure you use 'multipart/form-data' for sending files
            },
        };

        const { data } = await baseApi.post("/Color", colorFormData, config);

        if (data) {
            const { data } = await baseApi.get('/Color');
            dispatch(setLoadingColores());
            dispatch(setColores(data));
            toast.success('¡Usuario agregado con éxito!');
            dispatch(setToggleModalColores());
        }
    }
};

const editarColores = ({ colorId, nombre, imagen, FormFile }) => {
    return async (dispatch: Dispatch) => {
        let colorFormData = new FormData();
        colorFormData.append('ColorId', colorId);
        colorFormData.append('nombre', nombre);
        colorFormData.append('imagen', imagen);
        if (FormFile) {
            colorFormData.append('FormFile', FormFile);
        }
        
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const { data } = await baseApi.put("/Color", colorFormData, config);

        if (data) {
            const { data } = await baseApi.get('/Color');
            dispatch(setLoadingColores());
            dispatch(setColores(data));
            toast.success('¡Usuario agregado con éxito!');
            dispatch(setToggleModalColores());
        }
    }
};

const eliminarColores = ({ colorId }) => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.delete(`/Color/${ colorId }` );
        const { data:newData } = await baseApi.get('/Color');
        dispatch(setLoadingColores());
        dispatch(setColores(newData));
        toast.success('¡Usuario eliminado con éxito!');
        dispatch(setToggleModalColores());
    }
};

export {
    obtenerColores,
    agregarColores,
    eliminarColores,
    editarColores
}