import { Dispatch } from "redux";
import { baseApi } from "../../../api/apiConfig";
import { toast } from "react-toastify";
import { setAutos, setLoadingAutos, setToggleModalAutos } from "./autosSlice";


const obtenerAutos = () => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.get('/CarroModelo');
        dispatch(setAutos(data));
    }
};

const agregarAutos = ({ disponible, tipo, marca, modelo, imagen, descripcion, precio, cantidad }) => {
    return async (dispatch: Dispatch) => {
        let autoFormData = new FormData();

        autoFormData.append('disponible', disponible);
        autoFormData.append('tipo', tipo);
        autoFormData.append('marca', marca);
        autoFormData.append('modelo', modelo);
        autoFormData.append('imagen', '');
        autoFormData.append('FormFile', imagen);
        autoFormData.append('descripcion', descripcion);
        autoFormData.append('precio', precio);
        autoFormData.append('cantidad', cantidad);
    
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const { data } = await baseApi.post("/CarroModelo", autoFormData, config);

        if (data) {
            const { data } = await baseApi.get('/CarroModelo');
            dispatch(setLoadingAutos());
            dispatch(setAutos(data));
            toast.success('Auto agregado con éxito!');
            dispatch(setToggleModalAutos());
        }
    }
};

const editarAuto = ({ carroModeloId, disponible, tipo, marca, modelo, imagen, descripcion, precio, cantidad, FormFile }) => {
    return async (dispatch: Dispatch) => {
        let autoFormData = new FormData();
        
        autoFormData.append('carroModeloId', carroModeloId);
        autoFormData.append('disponible', disponible);
        autoFormData.append('tipo', tipo);
        autoFormData.append('marca', marca);
        autoFormData.append('modelo', modelo);
        autoFormData.append('imagen', imagen);
        autoFormData.append('descripcion', descripcion);
        autoFormData.append('precio', precio);
        autoFormData.append('cantidad', cantidad);

        if (FormFile) {
            autoFormData.append('FormFile', FormFile);
        }
                
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const { data } = await baseApi.put("/CarroModelo", autoFormData, config);

        if (data) {
            const { data } = await baseApi.get('/CarroModelo');
            dispatch(setLoadingAutos());
            dispatch(setAutos(data));
            toast.success('Auto agregado con éxito!');
            dispatch(setToggleModalAutos());
        }
    }
};

const eliminarAuto = ({ carroModeloId }) => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.delete(`/CarroModelo/${ carroModeloId }` );
        const { data:newData } = await baseApi.get('/CarroModelo');
        dispatch(setLoadingAutos());
        dispatch(setAutos(newData));
        toast.success('¡Auto eliminado con éxito!');
        dispatch(setToggleModalAutos());
    }
};

export {
    obtenerAutos,
    agregarAutos,
    editarAuto,
    eliminarAuto
}