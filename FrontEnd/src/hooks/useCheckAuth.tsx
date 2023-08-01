import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "./reduxHooks";

export const useCheckAuth = () => {
    const usuario = useAppSelector( (state) => state.usuarios );
    const dispatch = useDispatch();
    // useEffect(() => {
    //     onAuthStateChanged(firebaseAuth, async( user ) => {
    //         if (!user) return dispatch(logout()); 
    //         const { uid, email, displayName, photoURL } = user;
    //         dispatch(login({ uid, email, displayName, photoURL }));
    //     });
    // }, []);


    
    return usuario.currentUser.status;
}