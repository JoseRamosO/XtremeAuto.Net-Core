import { createSlice } from '@reduxjs/toolkit';

interface tarjetaType {
    tarjetaId: number,
    usuarioId: number,
    nombre: string,
    numeroDeTarjeta: string,
    cvv: string,
    fechaVencimiento: string,
    LockoutEnabled: boolean,
}

interface tarjetasInitialValuesType {
    tarjetas: tarjetaType[],
    loadingTarjetas: boolean,
    modalTarjetasOpen: boolean,
    modalTarjetasState: number
}

const initialState: tarjetasInitialValuesType = {
    tarjetas: [],
    loadingTarjetas: true,
    modalTarjetasOpen: false,
    modalTarjetasState: 0
};

export const tarjetaSlice = createSlice({
    name: 'Tarjetas',
    initialState,
    reducers: {
      setTarjetas(state, action) {
        state.tarjetas = action.payload;
        state.loadingTarjetas = false;
      },
      setLoadingTarjetas(state) {
        state.loadingTarjetas = true;
      },
      setToggleModalTarjetas(state) {
        state.modalTarjetasOpen = !state.modalTarjetasOpen;
      },
      setModalTarjetasState(state, action) {
        state.modalTarjetasState = action.payload;
      },
    },
});
  
export const { setTarjetas, setLoadingTarjetas, setToggleModalTarjetas, setModalTarjetasState } = tarjetaSlice.actions;