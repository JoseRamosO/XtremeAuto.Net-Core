import { createSlice } from '@reduxjs/toolkit';

interface ruedaType {
    ruedaId: number,
    nombre: string,
    imagen: string,
    precio: number,
}


interface ruedasInitialValuesType {
    ruedas: ruedaType[],
    loadingRuedas: boolean,
    modalRuedasOpen: boolean,
    modalRuedasState: number
}

const initialState: ruedasInitialValuesType = {
    ruedas: [],
    loadingRuedas: true,
    modalRuedasOpen: false,
    modalRuedasState: 0
};

export const ruedasSlice = createSlice({
    name: 'Ruedas',
    initialState,
    reducers: {
      setRuedas(state, action) {
        state.ruedas = action.payload;
        state.loadingRuedas = false;
      },
      setLoadingRuedas(state) {
        state.loadingRuedas = true;
      },
      setToggleModalRuedas(state) {
        state.modalRuedasOpen = !state.modalRuedasOpen;
      },
      setModalRuedasState(state, action) {
        state.modalRuedasState = action.payload;
      },
    },
});
  
export const { setRuedas, setLoadingRuedas, setToggleModalRuedas, setModalRuedasState } = ruedasSlice.actions;