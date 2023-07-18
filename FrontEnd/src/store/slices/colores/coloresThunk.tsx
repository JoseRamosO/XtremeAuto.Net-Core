import { Dispatch } from "redux";
import { baseApi } from "../../../api/apiConfig";
import { setColores } from "./coloresSlice";

const obtenerColores = () => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.get('/Color');
        dispatch(setColores(data));
    }
};

export {
    obtenerColores
}