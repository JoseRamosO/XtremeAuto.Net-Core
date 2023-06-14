import { Dispatch } from "redux";
import { setCurrentUser, setUsers } from "./usuariosSlice";
import { baseApi } from "../../../api/apiConfig";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface usuarioType {
    nombre: string;
    apellidos: string;
    email: string;
    rol: number;
    password: string;
}


const loginUsuario = () => {
    return async (dispatch: Dispatch) => {
        dispatch(setCurrentUser({
            nombre: 'Jose Mauricio Granados M',
            email: 'mgranadosmunoz@gmail.com',
            rol: 1,
        }))
    };
};
const registrarUsuario = (usuario: usuarioType) => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.post("/usuarios", usuario);
        if(data.status === 409){
            toast.warn('¡Correo Electronico en uso!')
        } else if (data.status === 201) {
            toast.success('¡Usuario agregado con éxito!')
        } else {
            toast.error('¡Error agregando usuario!')
        }
    };
};
const getAllUsers = () => {
    return async (dispatch: Dispatch) => {
        // const { data } = await baseApi.get("/usuarios");
        dispatch(setUsers([
            {
              "id": 1,
              "nombre": "Jose Mauricio Granados Muñoz",
              "email": "mgranadosmunoz@gmail.com",
              "rol": 1,
              "password": "$2a$10$78tbkOz4NMdydYExbdHXCOfWRQEcA7qicR44n9ssW1CndR9oYOFiO",
              "last_login": "2023-05-08T21:56:40.000Z"
            },
            {
              "id": 3,
              "nombre": "Jose Mauricio Granados Muñoz",
              "email": "mgranadosmunozw@gmail.com",
              "rol": 1,
              "password": "$2a$10$DZAHb6nV4xtWONOiamEBPu1da4Ie/U.wIdry8nr99Mi31DsC8CaGG",
              "last_login": "2023-05-09T14:37:01.000Z"
            },
            {
              "id": 4,
              "nombre": "Jose Mauricio Granados Muñoz",
              "email": "mgranadosmunoz2@gmail.com",
              "rol": 1,
              "password": "$2a$10$ww8oAvyePmXR.YIadABopedFYLN4czFpX2ob1npujIuqltA2aqiti",
              "last_login": "2023-05-09T14:37:24.000Z"
            },
            {
              "id": 5,
              "nombre": "Jose Mauricio Granados Muñoz",
              "email": "mgranadosmunoz22@gmail.com",
              "rol": 1,
              "password": "$2a$10$shZ0/2PX7cwywr/W3CdNPuGKnLzBUkfX8/6Sp9eckIBTiDI.RoAnu",
              "last_login": "2023-05-09T14:45:20.000Z"
            },
            {
              "id": 7,
              "nombre": "asd",
              "email": "chuz@gmail.com",
              "rol": 1,
              "password": "$2a$10$cINzfE4Wnyq28L3aFPtzdOzQ5PYv4D5F0MyclqR6Buw607SCSfile",
              "last_login": "2023-05-10T14:49:06.000Z"
            },
            {
              "id": 12,
              "nombre": "Jose Mauricio",
              "email": "mgranadosmunoz1@gmail.com",
              "rol": 1,
              "password": "$2a$10$5CJ61g93zUwfd.kGw2YJceaik7w0FOQmFwhzgU5jq4tByvZUWxvoK",
              "last_login": "2023-05-10T18:21:32.000Z"
            },
            {
              "id": 13,
              "nombre": "Jose Mauri test",
              "email": "mgranadosmunoz3@gmail.com",
              "rol": 1,
              "password": "$2a$10$bIqA0OgpE5IXACPDd4WCm.ITgHhHdlISNNBgxslDuEiIiI6jNBL/u",
              "last_login": "2023-05-10T18:21:59.000Z"
            },
            {
              "id": 14,
              "nombre": "Jose Mauricio",
              "email": "mgranadosmunoz432@gmail.com",
              "rol": 1,
              "password": "$2a$10$oQiPWxf1xkSrBHFv8Y.AKukriJitGak8qe/bGSwXRTsnwAIxv0cly",
              "last_login": "2023-05-10T18:43:14.000Z"
            },
            {
              "id": 15,
              "nombre": "Jose Mauricio",
              "email": "mgranadosmunozasd@gmail.com",
              "rol": 1,
              "password": "$2a$10$EE.O5uN/OqCUwOMN7sr/sOT7WN3GhMG/7fliZd6UW6D.pzO.8worK",
              "last_login": "2023-05-10T18:43:32.000Z"
            },
            {
              "id": 16,
              "nombre": "Jose Mauricio",
              "email": "mgranadosmunoz8@gmail.com",
              "rol": 1,
              "password": "$2a$10$mtcaHL0ZM5QjoncNXs0ysOAmlVyLEM.knD7zTtjwlbCT4QA2sv/uK",
              "last_login": "2023-05-10T18:44:29.000Z"
            },
            {
              "id": 17,
              "nombre": "Jose Mauricio",
              "email": "mgranadosmunoz21@gmail.com",
              "rol": 1,
              "password": "$2a$10$QzdaqxCST8axyjhrK0tDDOFVf1Vul.L9jTqtFLzUuYxWpCCPV0RIy",
              "last_login": "2023-05-10T18:45:09.000Z"
            },
            {
              "id": 18,
              "nombre": "TEST USER MAU",
              "email": "encargado@gmail.com",
              "rol": 1,
              "password": "$2a$10$A6SdrlI3tVVz4KPAhbrjEOB8a9VRvyHvtk2bEwhsIjaFvG1agNT1m",
              "last_login": "2023-05-10T18:47:25.000Z"
            },
            {
              "id": 19,
              "nombre": "TEST",
              "email": "chuASDz@gmail.com",
              "rol": 1,
              "password": "$2a$10$df9OfM6NEuAMQDZGeLF5ke5yNANJK2e3rU8YWIKJtDAN3lcsqHoi6",
              "last_login": "2023-05-15T20:01:30.000Z"
            }
          ]));
    }
};
export {
    loginUsuario,
    registrarUsuario,
    getAllUsers
}