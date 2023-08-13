import { createSlice } from '@reduxjs/toolkit';

interface ventaType {
    ventaId: number,
    UsuarioId: number,
    CarroVendidoId: number,
    meses: number,
}

interface ventasInitialValuesType {
    ventas: ventaType[],
    loadingVentas: boolean,
    modalVentasOpen: boolean,
    modalVentasState: number
}

const initialState: ventasInitialValuesType = {
    ventas: [],
    loadingVentas: true,
    modalVentasOpen: false,
    modalVentasState: 0
};

export const ventaSlice = createSlice({
    name: 'Ventas',
    initialState,
    reducers: {
      setVentas(state, action) {
        state.ventas = action.payload;
        state.loadingVentas = false;
      },
      setLoadingVentas(state) {
        state.loadingVentas = true;
      },
      setToggleModalVentas(state) {
        state.modalVentasOpen = !state.modalVentasOpen;
      },
      setModalVentasState(state, action) {
        state.modalVentasState = action.payload;
      },
    },
});
  
export const { setVentas, setLoadingVentas, setToggleModalVentas, setModalVentasState } = ventaSlice.actions;