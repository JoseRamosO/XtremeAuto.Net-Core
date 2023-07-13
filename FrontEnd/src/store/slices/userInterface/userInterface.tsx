import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isModalOpen: false,
    isModalDeleteOpen: false,
    selectedItemId: 0
};

export const userInterface = createSlice({
    name: 'usuarios',
    initialState,
    reducers: {
      setToggleModal(state) {
        state.isModalOpen = !state.isModalOpen;
      },
      setModalDeleteOpen(state) {
        state.isModalDeleteOpen = !state.isModalDeleteOpen;
      },
      setSelectedItemId(state, action) {
        state.selectedItemId = action.payload;
      },
    },
});
  
export const { setToggleModal, setModalDeleteOpen, setSelectedItemId } = userInterface.actions;