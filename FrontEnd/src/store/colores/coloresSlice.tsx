import { createSlice } from '@reduxjs/toolkit';

interface colorType {
    colorId: number,
    nombre: string,
    imagen: string,
}

interface coloresInitialValuesType {
    colores: colorType[],
    loadingColores: boolean,
    modalColoresOpen: boolean,
    modalColoresState: number
}

const initialState: coloresInitialValuesType = {
    colores: [],
    loadingColores: true,
    modalColoresOpen: false,
    modalColoresState: 0
};

export const colorSlice = createSlice({
    name: 'Colores',
    initialState,
    reducers: {
      setColores(state, action) {
        state.colores = action.payload;
        state.loadingColores = false;
      },
      setLoadingColores(state) {
        state.loadingColores = true;
      },
      setToggleModalColores(state) {
        state.modalColoresOpen = !state.modalColoresOpen;
      },
      setModalColoresState(state, action) {
        state.modalColoresState = action.payload;
      },
    },
});
  
export const { setColores, setLoadingColores, setToggleModalColores, setModalColoresState } = colorSlice.actions;