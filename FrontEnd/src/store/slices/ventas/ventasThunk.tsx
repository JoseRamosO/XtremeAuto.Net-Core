import { Dispatch } from "redux";
import { baseApi } from "../../../api/apiConfig";
import { setVentas, setLoadingVentas, setToggleModalVentas } from "./ventasSlice";
import { toast } from "react-toastify";



const obtenerVentas = () => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.get('/Venta');
        dispatch(setVentas(data));
    }
};

const agregarVentas = ( ventaNuevo ) => {
    console.log(ventaNuevo)
    return async (dispatch: Dispatch) => {
        const ventaParsed ={
            UsuarioId: ventaNuevo.usuarioId,
            CarroVendidoId: ventaNuevo.carroVendidoId,
            meses: ventaNuevo.meses,  
    }
        const { data } = await baseApi.post("/Venta", ventaParsed);

        if (data) {
            const { data } = await baseApi.get('/Venta');
            dispatch(setLoadingVentas());
            dispatch(setVentas(data));
            toast.success('¡Venta agregado con éxito!');
            dispatch(setToggleModalVentas());
        }else {
            toast.error('¡Error agregando venta!')
        }
    }
};

const editarVentas = (ventaUpdate) => {
    return async (dispatch: Dispatch) => {

        const { data } = await baseApi.put("/Venta", ventaUpdate);

        if (data) {
            const { data } = await baseApi.get('/Venta');
            dispatch(setLoadingVentas());
            dispatch(setVentas(data));
            toast.success('Venta actualizado con éxito!');
            dispatch(setToggleModalVentas());
        }
        else {
            toast.error('¡Error actualizando venta!')
        }
    }
};

const eliminarVentas = ({ ventaId }) => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.delete(`/Venta/${ ventaId }` );
        const { data:newData } = await baseApi.get('/Venta');
        dispatch(setLoadingVentas());
        dispatch(setVentas(newData));
        toast.success('¡Venta eliminado con éxito!');
        dispatch(setToggleModalVentas());
        
    }
};

export {
    obtenerVentas,
    agregarVentas,
    eliminarVentas,
    editarVentas
}