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
    autoSelected: autoType,
    loadingAutos: boolean,
    modalAutosOpen: boolean,
    modalAutosState: number
}

const initialState: coloresInitialValuesType = {
    autos: [],
    autoSelected: {
      carroModeloId: 0,
      disponible: false,
      tipo: '',
      marca: '',
      modelo: '',
      descripcion: '',
      precio: 0,
      imagen: '',
      cantidad: 0
    },
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
      setAuto(state, action) {
        state.autoSelected = action.payload;
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