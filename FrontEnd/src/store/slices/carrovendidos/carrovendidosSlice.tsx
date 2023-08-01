import { createSlice } from '@reduxjs/toolkit';

interface carrovendidoType {
    carrovendidoId: number,
    ruedaId: number,
    colorId: number,
    carroModeloId: number,
    seguroId: number,
    precioTotal: number,
}

interface carrovendidosInitialValuesType {
    carrovendidos: carrovendidoType[],
    loadingCarroVendidos: boolean,
    modalCarroVendidosOpen: boolean,
    modalCarroVendidosState: number
}

const initialState: carrovendidosInitialValuesType = {
    carrovendidos: [],
    loadingCarroVendidos: true,
    modalCarroVendidosOpen: false,
    modalCarroVendidosState: 0
};

export const carrovendidoSlice = createSlice({
    name: 'CarroVendidos',
    initialState,
    reducers: {
      setCarroVendidos(state, action) {
        state.carrovendidos = action.payload;
        state.loadingCarroVendidos = false;
      },
      setLoadingCarroVendidos(state) {
        state.loadingCarroVendidos = true;
      },
      setToggleModalCarroVendidos(state) {
        state.modalCarroVendidosOpen = !state.modalCarroVendidosOpen;
      },
      setModalCarroVendidosState(state, action) {
        state.modalCarroVendidosState = action.payload;
      },
    },
});
  
export const { setCarroVendidos, setLoadingCarroVendidos, setToggleModalCarroVendidos, setModalCarroVendidosState } = carrovendidoSlice.actions;