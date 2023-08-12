import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setToggleModal } from "../../store/slices/userInterface/userInterface";
import { Box, Backdrop, Button, Modal, Fade,Typography } from '@mui/material';
import { agregarRoles, editarRoles, eliminarRoles } from '../../store/slices/roles/rolesThunk';
import { setToggleModalUsers } from '../../store/slices/usuarios/usuariosSlice';
import { agregarUsuarios, editarUsuarios, eliminarUsuario } from '../../store/slices/usuarios/usuariosThunk';

interface InitialValuesType {
  nombre : string;
  apellido : string;
  cedula: number;
  email : string;
  rolId: number;
  username : string;
  telefono : number;
  salario: number;  
  passwordHash: string;
}


export const UserModal = ({ tableInstance }) => {
  const dispatch = useAppDispatch();
    const { modalUsersOpen, modalUsersState } = useAppSelector( (state) => state.usuarios );
    const { roles } = useAppSelector( (state) => state.roles);
    const { selectedFlatRows } = tableInstance;
  
    const initFormValues: InitialValuesType = {
      nombre : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.nombre : 'Jose Mauricio',
      apellido : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.apellido : 'Granados Mudoz',
      cedula: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.cedula : '305300042',
      email : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.email : 'mgranadosmunoz@gmail.com',
      rolId: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.rolId : 1,
      username : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.username : 'MauricioGrM',
      telefono : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.telefono : '83230353',
      salario: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.salario : 3453, 
      passwordHash: '', 
    }

    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
        .required('Nombre es requerido')
        .min(2, 'Nombre debe tener al menos 2 caracteres')
        .max(15, 'Nombre no debe tener mas de 15 caracteres')
        .matches(/^[a-zA-Z ]+$/, 'Nombre solo debe tener palabras y espacios'),
        
        apellido: Yup.string()
        .required('Apellido es requerido')
        .min(2, 'Apellido debe tener al menos 2 caracteres')
        .max(15, 'Apellido no debe tener mas de 15 caracteres')
        .matches(/^[a-zA-Z ]+$/, 'Apellido solo debe tener palabras y espacios'),
    
        email: Yup.string()
        .email('Dirección de email invalida')
        .required('Email es requerido'),
    
        // password: Yup.string()
        // .min(8, 'Contraseña debe de ser de al menos 8 caracteres de largo')
        // .max(15, 'Contraseña no debe ser mayor a 15 caracteres de largo')
        // .matches(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        //   'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.'
        // )
        // .required('Contraseña Requerida'),
    
        // confirmPassword: Yup.string()
        // .oneOf([Yup.ref('password')], 'Contraseñas deben coincidir')
        // .required('Confirmar Contraseña es requerida')
    });
    
    return (
        <Modal open={ modalUsersOpen } onClose={() => dispatch(setToggleModal())} className='duration-300 bg-opacity-60 bg-black'>
            <Fade in={ modalUsersOpen }>
                <Box className='global-modal rounded-xl'> 
                    {
                        modalUsersState === 0 && (
                            <div className="rounded-t-xl px-5 py-2 bg-teal-500 text-slate-50 text-center sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-slate-50" id="modal-title">Agregar usuario</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-slate-50">Estas viendo el usuario seleccionado</p>
                                </div>
                            </div>
                        )
                    }
                    {
                        modalUsersState === 1 && (
                            <div className="rounded-t-xl px-5 py-2 bg-orange-600 text-slate-50 text-center sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-slate-50" id="modal-title">Editar usuario</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-slate-50">Estas viendo el usuario seleccionado</p>
                                </div>
                            </div>
                        )
                    }
                    {
                        modalUsersState === 2 && (
                            <div className="rounded-t-xl px-5 py-2 bg-green-600 text-slate-50 text-center sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-slate-50" id="modal-title">Ver usuario</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-slate-50">Estas viendo el usuario seleccionado</p>
                                </div>
                            </div>
                        )
                    }
                    {
                        modalUsersState === 3 && (
                            <div className="rounded-t-xl px-5 py-2 bg-red-600 text-slate-50 text-center sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-slate-50" id="modal-title">Eliminar usuario</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-slate-50">Estas viendo el usuario seleccionado</p>
                                </div>
                            </div>
                        )
                    }

                    <div className='modal-body p-5'>
                        <Formik
                            enableReinitialize
                            initialValues={ initFormValues }
                            validationSchema={ validationSchema }
                            onSubmit={( usuario ) => {
                                if (modalUsersState === 0) {
                                    dispatch(agregarUsuarios(usuario))
                                } else if (modalUsersState === 1) {
                                    dispatch(editarUsuarios({...usuario, usuarioId: selectedFlatRows[0].original.usuarioId}))
                                } else {
                                    dispatch(eliminarUsuario(selectedFlatRows[0].original.usuarioId))
                                }
                            }}
                        >
                            {({ handleSubmit, handleChange, values, errors, touched }) => (
                                <form id="userRegister" onSubmit={ handleSubmit }>
                                    <div className="space-y-12">
                                        <div className="border-b border-gray-900/10 pb-12">
                                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                        <div className="sm:col-span-3">
                                            <label htmlFor="nombre" className={ `block text-sm font-medium leading-6${ (errors.cedula && touched.cedula) ? ' text-red-600' : ' text-gray-900' }` }>
                                                Cedula
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                type="text"
                                                name="cedula"
                                                value={ values.cedula || '' }
                                                onChange={ handleChange }
                                                className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.cedula && touched.cedula) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                />
                                                { errors.nombre && touched.nombre && ( <span className="inline-flex text-sm text-red-700">{errors.nombre}</span> ) }
                                            </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                            <label htmlFor="last-name" className={ `block text-sm font-medium leading-6${ (errors.username && touched.username) ? ' text-red-600' : ' text-gray-900' }` }>
                                                Nombre de usuario
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                type="text"
                                                name="username"
                                                value={ values.username || '' }
                                                onChange={ handleChange }
                                                className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.username && touched.username) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                />
                                                { errors.apellido && touched.username && ( <span className="inline-flex text-sm text-red-700">{errors.username}</span> ) }
                                            </div>
                                            </div>


                                            <div className="sm:col-span-3">
                                            <label htmlFor="nombre" className={ `block text-sm font-medium leading-6${ (errors.nombre && touched.nombre) ? ' text-red-600' : ' text-gray-900' }` }>
                                                Nombre
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                type="text"
                                                name="nombre"
                                                value={ values.nombre || '' }
                                                onChange={ handleChange }
                                                className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.nombre && touched.nombre) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                />
                                                { errors.nombre && touched.nombre && ( <span className="inline-flex text-sm text-red-700">{errors.nombre}</span> ) }
                                            </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                            <label htmlFor="last-name" className={ `block text-sm font-medium leading-6${ (errors.apellido && touched.apellido) ? ' text-red-600' : ' text-gray-900' }` }>
                                                Apellido
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                type="text"
                                                name="apellido"
                                                value={ values.apellido || '' }
                                                onChange={ handleChange }
                                                className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.apellido && touched.apellido) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                />
                                                { errors.apellido && touched.apellido && ( <span className="inline-flex text-sm text-red-700">{errors.apellido}</span> ) }
                                            </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                            <label htmlFor="last-name" className={ `block text-sm font-medium leading-6${ (errors.salario && touched.salario) ? ' text-red-600' : ' text-gray-900' }` }>
                                                Salario
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                type="number"
                                                name="salario"
                                                value={ values.salario || '' }
                                                onChange={ handleChange }
                                                className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.salario && touched.salario) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                />
                                                { errors.salario && touched.salario && ( <span className="inline-flex text-sm text-red-700">{errors.salario}</span> ) }
                                            </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                            <label htmlFor="last-name" className={ `block text-sm font-medium leading-6${ (errors.passwordHash && touched.passwordHash) ? ' text-red-600' : ' text-gray-900' }` }>
                                                Password
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                type="text"
                                                name="passwordHash"
                                                value={ values.passwordHash || '' }
                                                onChange={ handleChange }
                                                className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.passwordHash && touched.passwordHash) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                />
                                                { errors.passwordHash && touched.passwordHash && ( <span className="inline-flex text-sm text-red-700">{errors.passwordHash}</span> ) }
                                            </div>
                                            </div>

                                            <div className="sm:col-span-4">
                                            <label htmlFor="last-name" className={ `block text-sm font-medium leading-6${ (errors.email && touched.email) ? ' text-red-600' : ' text-gray-900' }` }>
                                                Correo Electronico
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                id="email"
                                                name="email"
                                                type="email"
                                                className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.email && touched.email) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                />
                                                { errors.email && touched.email && ( <span className="inline-flex text-sm text-red-700">{errors.email}</span> ) }
                                            </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                            <label htmlFor="last-name" className={ `block text-sm font-medium leading-6${ (errors.telefono && touched.telefono) ? ' text-red-600' : ' text-gray-900' }` }>
                                                Telefono
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                id="telefono"
                                                name="telefono"
                                                type="telefono"
                                                className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.telefono && touched.telefono) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                />
                                                { errors.telefono && touched.telefono && ( <span className="inline-flex text-sm text-red-700">{errors.telefono}</span> ) }
                                            </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                            <label htmlFor="rolId" className="block text-sm font-medium leading-6 text-gray-900">
                                                Rol de usuario
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                id="rolId"
                                                name="rolId"
                                                defaultValue={ values.rolId || 0}
                                                onChange={handleChange}
                                                className={ `bg-white px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.telefono && touched.telefono) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                >
                                                     <option value="0">Seleccione Rol</option>
                                                    {
                                                        roles.map(({ rolId, nombre }) => (
                                                            <option key={ rolId } value={ rolId }>{ nombre }</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>

                                    <div className="px-0 py-3 sm:flex sm:flex-row-reverse">
                                        {
                                            (modalUsersState === 0) && (
                                                <button type='submit' className="inline-flex w-full justify-center rounded-md bg-teal-600 hover:bg-teal-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">Guardar Nuevo Usuario</button>
                                            )
                                        }
                                        {
                                            (modalUsersState === 1) && (
                                                <button type='submit' className="inline-flex w-full justify-center rounded-md bg-orange-600 hover:bg-orange-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">Editar Usuario Existente</button>
                                            )
                                        }
                                        {
                                            (modalUsersState === 3) && (
                                                <button type='submit' className="inline-flex w-full justify-center rounded-md bg-red-600 hover:bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">Eliminar Usuario</button>
                                            )
                                        }

                                         <button type='button' onClick={ () => dispatch(setToggleModalUsers()) } className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cerrar</button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </Box>
            </Fade>
        </Modal>
    )
}