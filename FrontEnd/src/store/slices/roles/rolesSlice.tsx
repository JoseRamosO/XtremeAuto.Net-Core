import { createSlice } from '@reduxjs/toolkit';

interface roleType {
  rolId: number,
  nombre: string
}

interface rolesInitialValuesType {
    roles: roleType[],
    loadingRoles: boolean
}

const initialState: rolesInitialValuesType = {
  roles: [{
    rolId: 0,
    nombre: ''
  }],
  loadingRoles: true
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
    },
});
  
export const { setRoles, setLoadingRoles } = rolSlice.actions;