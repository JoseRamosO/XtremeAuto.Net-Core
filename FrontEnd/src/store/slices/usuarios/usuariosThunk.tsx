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
    passwordHash: string;
}

const getCurrentTimestamp = () => {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(now.getUTCMilliseconds()).padStart(3, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
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
        dispatch(setCurrentUser({
            UsuarioId: data.currentUser.usuarioId,
            nombre: data.currentUser.nombre,
            apellido:  data.currentUser.apellido,
            cedula:  data.currentUser.cedula,
            email: data.currentUser.email,
            username: data.currentUser.username,
            telefono: data.currentUser.telefono,
            salario: data.currentUser.salario,  
            passwordHash: data.currentUser.passwordHash,
            rol: data.currentUser.rolId,
            token: data.token,
            status: 'authenticated'
        }))
        localStorage.setItem('userLogginStatus', JSON.stringify({
            UsuarioId: data.currentUser.usuarioId ,
            nombre: data.currentUser.nombre,
            apellido:  data.currentUser.apellido,
            cedula:  data.currentUser.cedula,
            email: data.currentUser.email,
            username: data.currentUser.username,
            telefono: data.currentUser.telefono,
            salario: data.currentUser.salario,  
            passwordHash: data.currentUser.passwordHash,
            rol: data.currentUser.rolId,
            token: data.token,
            status: 'authenticated'
        }));
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
                salario: usuario.salario,
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
        const { data:newData } = await baseApi.get('/usuario');
        dispatch(setLoadingUsers());
        dispatch(setUsers(newData));
        toast.success('¡Usuario eliminado con éxito!');
        dispatch(setToggleModalUsers());
    }
};

const agregarUsuarios = ( usuarioNuevo ) => {
    return async (dispatch: Dispatch) => {
        const usuarioParsed ={
            nombre: usuarioNuevo.nombre, 
            apellido: usuarioNuevo.apellido, 
            salario: usuarioNuevo.salario,
            cedula: usuarioNuevo.cedula,
            email: usuarioNuevo.email,
            passwordHash: usuarioNuevo.passwordHash,
            securityStamp: '',
            telefono:usuarioNuevo.telefono,
            username: usuarioNuevo.username,
            rolId: usuarioNuevo.rolId,
            lockoutEnabled: true,
            failedAttemptsCount: 0,
            lockoutEndDateUtc: getCurrentTimestamp()
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

const editarUsuarios = ( usuarioActualizar ) => {
    return async (dispatch: Dispatch) => {
        const usuarioParsed ={
            usuarioId: usuarioActualizar.usuarioId, 
            nombre: usuarioActualizar.nombre, 
            apellido: usuarioActualizar.apellido, 
            salario: usuarioActualizar.salario,
            cedula: usuarioActualizar.cedula,
            email: usuarioActualizar.email,
            passwordHash: usuarioActualizar.passwordHash,
            securityStamp: '',
            telefono:usuarioActualizar.telefono,
            username: usuarioActualizar.username,
            rolId: usuarioActualizar.rolId,
            lockoutEnabled: true,
            failedAttemptsCount: 0,
            lockoutEndDateUtc: getCurrentTimestamp()
        }
        const { data } = await baseApi.put("/usuario", usuarioParsed );
        console.log(usuarioParsed)
        
        if (data) {
            const { data:newData } = await baseApi.get('/usuario');
            dispatch(setLoadingUsers());
            dispatch(setUsers(newData));
            toast.success('¡Usuario editado con éxito!');
            dispatch(setToggleModalUsers());
        }
    }
};

const onLogOutUser = () => {
    return async (dispatch: Dispatch) => {
        dispatch(setCurrentUser({
            nombre: '',
            email: '',
            rol: 0,
            token: '',
            status: 'checking'
        }))
        localStorage.removeItem('userLogginStatus');
    }
}



export {
    loginUsuario,
    registrarUsuario,
    getAllUsers,
    eliminarUsuario,
    agregarUsuarios,
    editarUsuarios,
    onLogOutUser
}