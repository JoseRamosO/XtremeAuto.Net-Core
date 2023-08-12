import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "./reduxHooks";
import { setCurrentUser } from "../store/slices/usuarios/usuariosSlice";


interface currentUserType {
    nombre: string;
    email: string;
    rol: number;
    token: string;
    status: string;
}

export const useCheckAuth = () => {
    const usuario = useAppSelector( (state) => state.usuarios );
    const dispatch = useDispatch();

    useEffect(() => {

        // Retrieve the object from storage
        const currentUserLocalStorage: currentUserType = JSON.parse(localStorage.getItem('userLogginStatus') || '{}');
        if (currentUserLocalStorage.token) {
            dispatch(setCurrentUser({...currentUserLocalStorage}))
        }
    }, []);


    
    return usuario.currentUser;
}