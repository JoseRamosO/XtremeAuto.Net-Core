import { configureStore } from "@reduxjs/toolkit";
import { usuarioSlice } from "./slices/usuarios/usuariosSlice";
import { userInterface } from "./slices/userInterface/userInterface";
import { rolSlice } from "./slices/roles/rolesSlice";
import { colorSlice } from "./slices/colores/coloresSlice";
import { autosSlice } from "./slices/autos/autosSlice";
import { ruedasSlice } from "./slices/ruedas/ruedasSlice";
import { seguroSlice } from "./slices/seguros/segurosSlice";
import { tarjetaSlice } from "./slices/tarjetas/tarjetasSlice";
import { transaccionSlice } from "./slices/transacciones/transaccionesSlice";

export const store = configureStore({
  reducer: {
    usuarios: usuarioSlice.reducer,
    roles: rolSlice.reducer,
    colores: colorSlice.reducer,
    autos: autosSlice.reducer,
    ruedas: ruedasSlice.reducer,
    carrovendidos: carrovendidoSlice.reducer,
    seguros: seguroSlice.reducer,
    tarjetas: tarjetaSlice.reducer,
    transacciones: transaccionSlice.reducer,
    ventas: ventaSlice.reducer,
    userInterface: userInterface.reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch