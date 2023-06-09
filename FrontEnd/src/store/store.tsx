import { configureStore } from "@reduxjs/toolkit";
import { usuarioSlice } from "./slices/usuarios/usuariosSlice";
import { userInterface } from "./slices/userInterface/userInterface";
import { rolSlice } from "./slices/roles/rolesSlice";

export const store = configureStore({
  reducer: {
    usuarios: usuarioSlice.reducer,
    roles: rolSlice.reducer,
    userInterface: userInterface.reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch