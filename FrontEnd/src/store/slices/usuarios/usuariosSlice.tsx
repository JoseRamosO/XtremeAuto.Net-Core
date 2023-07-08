import { createSlice } from '@reduxjs/toolkit';

interface currentUserType {
    nombre: string;
    email: string;
    rol: number;
}

interface usuariosInitialValuesType {
    currentUser: currentUserType,
    users: [],
    loadingUsers: boolean
}

const initialState: usuariosInitialValuesType = {
    currentUser: {
        nombre: '',
        email: '',
        rol: 0,
    },
    users: [],
    loadingUsers: true
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
    },
});
  
export const { setCurrentUser, setUsers, setLoadingUsers } = usuarioSlice.actions;