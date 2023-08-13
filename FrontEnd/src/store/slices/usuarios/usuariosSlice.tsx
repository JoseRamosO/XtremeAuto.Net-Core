import { createSlice } from '@reduxjs/toolkit';

interface currentUserType {
    UsuarioId: number;
    nombre: string;
    apellido: string;
    cedula: string
    email: string;
    username : string,
    telefono : number;
    salario: number;  
    passwordHash: string;
    rol: number;
    token: string;
    status: string;
}

interface usuariosInitialValuesType {
    currentUser: currentUserType,
    users: [],
    loadingUsers: boolean,
    modalUsersOpen: boolean,
    modalUsersState: number
}

const initialState: usuariosInitialValuesType = {
    currentUser: {
        UsuarioId: 0,
        nombre: '',
        apellido: '',
        cedula: '',
        email: '',
        username : '',
        telefono : 0,
        salario: 0,
        passwordHash: '',
        rol: 0,
        token: '',
        status: 'checking', // 'not-authenticated', 'authenticated'
    },
    users: [],
    loadingUsers: true,
    modalUsersOpen: false,
    modalUsersState: 0
};

export const usuarioSlice = createSlice({
    name: 'usuarios',
    initialState,
    reducers: {
      setCurrentUser(state, action) {
        state.currentUser = action.payload;
      },
      setUsers(state, action) {
        state.users = action.payload;
        state.loadingUsers = false;
      },
      setLoadingUsers(state) {
        state.loadingUsers = true;
      },
      setToggleModalUsers(state) {
        state.modalUsersOpen = !state.modalUsersOpen;
      },
      setModalUsersState(state, action) {
        state.modalUsersState = action.payload;
      },
    },
});
  
export const { setCurrentUser, setUsers, setLoadingUsers, setToggleModalUsers, setModalUsersState } = usuarioSlice.actions;