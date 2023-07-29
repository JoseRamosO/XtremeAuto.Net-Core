import { createSlice } from '@reduxjs/toolkit';

interface autoType {
    carroModeloId: number,
    disponible: boolean,
    tipo: string,
    marca: string,
    modelo: string,
    descripcion: string,
    precio: number,
    imagen: string,
    cantidad: number
}

interface coloresInitialValuesType {
    autos: autoType[],
    loadingAutos: boolean,
    modalAutosOpen: boolean,
    modalAutosState: number
}

const initialState: coloresInitialValuesType = {
    autos: [],
    loadingAutos: true,
    modalAutosOpen: false,
    modalAutosState: 0
};

export const autosSlice = createSlice({
    name: 'Autos',
    initialState,
    reducers: {
      setAutos(state, action) {
        state.autos = action.payload;
        state.loadingAutos = false;
      },
      setLoadingAutos(state) {
        state.loadingAutos = true;
      },
      setToggleModalAutos(state) {
        state.modalAutosOpen = !state.modalAutosOpen;
      },
      setModalAutosState(state, action) {
        state.modalAutosState = action.payload;
      },
    },
});
  
export const { setAutos, setLoadingAutos, setToggleModalAutos, setModalAutosState } = autosSlice.actions;