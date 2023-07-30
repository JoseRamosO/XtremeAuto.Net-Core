import { createSlice } from '@reduxjs/toolkit';

interface seguroType {
    seguroId: number,
    nombre: string,
    precio: number,
    plazo: number,
}

interface segurosInitialValuesType {
    seguros: seguroType[],
    loadingSeguros: boolean,
    modalSegurosOpen: boolean,
    modalSegurosState: number
}

const initialState: segurosInitialValuesType = {
    seguros: [],
    loadingSeguros: true,
    modalSegurosOpen: false,
    modalSegurosState: 0
};

export const seguroSlice = createSlice({
    name: 'Seguros',
    initialState,
    reducers: {
      setSeguros(state, action) {
        state.seguros = action.payload;
        state.loadingSeguros = false;
      },
      setLoadingSeguros(state) {
        state.loadingSeguros = true;
      },
      setToggleModalSeguros(state) {
        state.modalSegurosOpen = !state.modalSegurosOpen;
      },
      setModalSegurosState(state, action) {
        state.modalSegurosState = action.payload;
      },
    },
});
  
export const { setSeguros, setLoadingSeguros, setToggleModalSeguros, setModalSegurosState } = seguroSlice.actions;