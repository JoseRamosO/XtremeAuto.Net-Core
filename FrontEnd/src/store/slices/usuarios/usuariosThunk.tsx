import { Dispatch } from "redux";
import { setCurrentUser, setUsers } from "./usuariosSlice";
import { baseApi } from "../../../api/apiConfig";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface usuarioType {
    usuarioId: number;
    nombre : string;
    apellido : string;
    cedula: number;
    email : string;
    rolId: number;
    username : string;
    telefono : number;
    salario: number;   
}

const loginUsuario = () => {
    return async (dispatch: Dispatch) => {
        dispatch(setCurrentUser({
            nombre: 'Jose Mauricio Granados M',
            email: 'mgranadosmunoz@gmail.com',
            rol: 1,
        }))
    };
};
const registrarUsuario = (usuario: usuarioType) => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.post("/usuarios", usuario);
        if(data.status === 409){
            toast.warn('¡Correo Electronico en uso!')
        } else if (data.status === 201) {
            toast.success('¡Usuario agregado con éxito!')
        } else {
            toast.error('¡Error agregando usuario!')
        }
    };
};
const getAllUsers = () => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.get('/usuario');
        dispatch(setUsers(data));
    }
};
export {
    loginUsuario,
    registrarUsuario,
    getAllUsers
}