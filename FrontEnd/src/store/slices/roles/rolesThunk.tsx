import { Dispatch } from "redux";
import { baseApi } from "../../../api/apiConfig";
import { setRoles } from "./rolesSlice";

const obtenerRoles = () => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.get('/rol');
        console.log(data)
        dispatch(setRoles(data));
    }
};

export {
    obtenerRoles
}