import { Dispatch } from "redux";
import { baseApi } from "../../../api/apiConfig";
import { setLoadingRoles, setRoles, setToggleModalRoles } from "./rolesSlice";
import { toast } from "react-toastify";

const obtenerRoles = () => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.get('/rol');
        console.log(data)
        dispatch(setRoles(data));
    }
};

const agregarRoles = ( rolNuevo ) => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.post("/rol", rolNuevo );
        if (data) {
            const { data } = await baseApi.get('/rol');
            dispatch(setLoadingRoles());
            dispatch(setRoles(data));
            toast.success('¡Usuario agregado con éxito!');
            dispatch(setToggleModalRoles());
        }
    }
};

const editarRoles = ( rolToUpdate ) => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.put("/rol", rolToUpdate );
        if (data) {
            const { data } = await baseApi.get('/rol');
            dispatch(setLoadingRoles());
            dispatch(setRoles(data));
            toast.success('¡Usuario agregado con éxito!');
            dispatch(setToggleModalRoles());
        }
    }
};

const eliminarRoles = ({ rolId }) => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.delete(`/rol/${ rolId }` );
        const { data:newData } = await baseApi.get('/rol');
        dispatch(setLoadingRoles());
        dispatch(setRoles(newData));
        toast.success('¡Usuario eliminado con éxito!');
        dispatch(setToggleModalRoles());
    }
};

export {
    obtenerRoles,
    agregarRoles,
    editarRoles,
    eliminarRoles
}