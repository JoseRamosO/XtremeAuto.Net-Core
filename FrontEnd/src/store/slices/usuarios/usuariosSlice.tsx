import { createSlice } from '@reduxjs/toolkit';

interface currentUserType {
    nombre: string;
    email: string;
    rol: number;
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
        nombre: '',
        email: '',
        rol: 0,
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