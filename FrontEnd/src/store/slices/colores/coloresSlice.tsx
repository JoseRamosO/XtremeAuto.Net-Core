import { createSlice } from '@reduxjs/toolkit';

interface colorType {
    colorId: number,
    nombre: string,
    imagen: string,
}

interface coloresInitialValuesType {
    colores: colorType[],
    loadingColores: boolean
}

const initialState: coloresInitialValuesType = {
    colores: [],
    loadingColores: true
};

export const colorSlice = createSlice({
    name: 'Colores',
    initialState,
    reducers: {
      setColores(state, action) {
        state.colores = action.payload;
        state.loadingColores = false;
      },
      setLoadingRoles(state) {
        state.loadingColores = true;
      },
    },
});
  
export const { setColores, setLoadingRoles } = colorSlice.actions;