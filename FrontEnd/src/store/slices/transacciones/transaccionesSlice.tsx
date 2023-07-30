import { createSlice } from '@reduxjs/toolkit';

interface transaccionType {
    transaccionId: number,
    ventaId: string,
    tarjetaId: number,
    fechaTransaccion: string,
    fechaCorte: string,
    intereses: number,
    pagado: boolean,
    precio: number,
}

interface transaccionesInitialValuesType {
    transacciones: transaccionType[],
    loadingTransacciones: boolean,
    modalTransaccionesOpen: boolean,
    modalTransaccionesState: number
}

const initialState: transaccionesInitialValuesType = {
    transacciones: [],
    loadingTransacciones: true,
    modalTransaccionesOpen: false,
    modalTransaccionesState: 0
};

export const transaccionSlice = createSlice({
    name: 'Transacciones',
    initialState,
    reducers: {
      setTransacciones(state, action) {
        state.transacciones = action.payload;
        state.loadingTransacciones = false;
      },
      setLoadingTransacciones(state) {
        state.loadingTransacciones = true;
      },
      setToggleModalTransacciones(state) {
        state.modalTransaccionesOpen = !state.modalTransaccionesOpen;
      },
      setModalTransaccionesState(state, action) {
        state.modalTransaccionesState = action.payload;
      },
    },
});
  
export const { setTransacciones, setLoadingTransacciones, setToggleModalTransacciones, setModalTransaccionesState } = transaccionSlice.actions;