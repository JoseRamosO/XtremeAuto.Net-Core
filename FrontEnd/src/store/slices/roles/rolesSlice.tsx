import { createSlice } from '@reduxjs/toolkit';

interface roleType {
  rolId: number,
  nombre: string
}

interface rolesInitialValuesType {
    roles: roleType[],
    loadingRoles: boolean,
    modalRolesOpen: boolean,
    modalRolesLock: boolean,
    modalRolesState: number
}

const initialState: rolesInitialValuesType = {
  roles: [{
    rolId: 0,
    nombre: ''
  }],
  loadingRoles: true,
  modalRolesOpen: false,
  modalRolesLock: false,
  modalRolesState: 0
};

export const rolSlice = createSlice({
    name: 'usuarios',
    initialState,
    reducers: {
      setRoles(state, action) {
        state.roles = action.payload;
        state.loadingRoles = false;
      },
      setLoadingRoles(state) {
        state.loadingRoles = true;
      },
      setToggleModalRoles(state) {
        state.modalRolesOpen = !state.modalRolesOpen;
      },
      setModalRolesLock(state) {
        state.modalRolesLock = true
      },
      setModalRolesLockFalse(state) {
        state.modalRolesLock = false
      },
      setModalRolesState(state, action) {
        state.modalRolesState = action.payload;
      },
    },
});
  
export const { setRoles, setLoadingRoles, setToggleModalRoles, setModalRolesLock, setModalRolesLockFalse, setModalRolesState } = rolSlice.actions;