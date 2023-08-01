import { Dispatch } from 'redux';
import { setCurrentUser, setLoadingUsers, setToggleModalUsers, setUsers } from './usuariosSlice';
import { baseApi } from '../../../api/apiConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setModalDeleteOpen, setToggleModal } from '../userInterface/userInterface';


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

const loginUsuario = ({ correo, password }) => {
    return async (dispatch: Dispatch) => {

        const usuarioParsed = {
            nombre: '', 
            apellido: '', 
            salario: 0,
            cedula: '',
            email: correo,
            passwordHash: password,
            securityStamp: '',
            telefono: '',
            username: '',
            rolId: 0,
            lockoutEnabled: true,
            failedAttemptsCount: 0,
            lockoutEndDateUtc: '2023-06-18T16:56:50.884Z'
    }

    const { data } = await baseApi.post('/usuario/login', usuarioParsed);

    if(data.authState) {
        console.log(data.currentUser.nombre)
        dispatch(setCurrentUser({
            nombre: data.currentUser.nombre,
            email: data.currentUser.email,
            rol: data.currentUser.rolId,
            token: data.token,
            status: 'authenticated'
        }))
    } else {
        toast.error('¡Correo Eléctronico o contraseña Incorrectos!');
    }
    };
};

const getAllUsers = () => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.get('/usuario');
        dispatch(setUsers(data));
    }
};

const registrarUsuario = (usuario: usuarioType) => {
    return async (dispatch: Dispatch) => {
        const usuarioParsed ={
                nombre: usuario.nombre, 
                apellido: usuario.apellido, 
                salario: 0,
                cedula: usuario.cedula,
                email: usuario.email,
                passwordHash: 'string',
                securityStamp: 'string',
                telefono:usuario.telefono,
                username: usuario.username,
                rolId: usuario.rolId,
                lockoutEnabled: true,
                failedAttemptsCount: 0,
                lockoutEndDateUtc: '2023-06-18T16:56:50.884Z'
        }
        
        const { data } = await baseApi.post('/usuario', usuarioParsed);
        
        if(data.status === 409){
            toast.warn('¡Correo Electronico en uso!')
        } else if (data.status === 200) {
            const { data } = await baseApi.get('/usuario');
            dispatch(setLoadingUsers());
            dispatch(setUsers(data));
            toast.success('¡Usuario agregado con éxito!');
            dispatch(setToggleModal());
        } else {
            toast.error('¡Error agregando usuario!')
        }
    };
};

const eliminarUsuario = (idUsuarioEliminar) => {
    return async (dispatch: Dispatch) => {
        
        await baseApi.delete(`/usuario/${ idUsuarioEliminar }`);
        dispatch(setLoadingUsers());
        const { data } = await baseApi.get('/usuario');
        dispatch(setUsers(data));
        toast.success('¡Usuario eliminado con éxito!');
        dispatch(setModalDeleteOpen());
    }
};

const agregarUsuarios = ( usuarioNuevo ) => {
    return async (dispatch: Dispatch) => {
        const usuarioParsed ={
            nombre: usuarioNuevo.nombre, 
            apellido: usuarioNuevo.apellido, 
            salario: 0,
            cedula: usuarioNuevo.cedula,
            email: usuarioNuevo.email,
            passwordHash: 'string',
            securityStamp: 'string',
            telefono:usuarioNuevo.telefono,
            username: usuarioNuevo.username,
            rolId: usuarioNuevo.rolId,
            lockoutEnabled: true,
            failedAttemptsCount: 0,
            lockoutEndDateUtc: '2023-06-18T16:56:50.884Z'
    }

        const { data } = await baseApi.post('/usuario', usuarioParsed );
        if (data) {
            const { data } = await baseApi.get('/usuario');
            dispatch(setLoadingUsers());
            dispatch(setUsers(data));
            toast.success('¡Usuario agregado con éxito!');
            dispatch(setToggleModalUsers());
        }
    }
};

export {
    loginUsuario,
    registrarUsuario,
    getAllUsers,
    eliminarUsuario,
    agregarUsuarios
}