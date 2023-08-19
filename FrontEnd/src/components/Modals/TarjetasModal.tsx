import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box,  Modal, Fade, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { setToggleModalTarjetas } from '../../store/slices/tarjetas/tarjetasSlice';
import { useState } from 'react';
import { agregarTarjetas, editarTarjetas, eliminarTarjetas } from '../../store/slices/tarjetas/tarjetasThunk';
import { agregarUsuarios, eliminarUsuario } from '../../store/slices/usuarios/usuariosThunk';

interface InitialValuesType {
    tarjetaId: number,
    usuarioId: number,
    nombre: string,
    numeroDeTarjeta: string,
    cvv: string,
    fechaVencimiento: Date,
    lockoutEnabled: boolean,
}

export const TarjetasModal = ({ tableInstance }) => {
    const dispatch = useAppDispatch();
    const { modalTarjetasOpen, modalTarjetasState } = useAppSelector( (state) => state.tarjetas );
    const { users } = useAppSelector( (state) => state.usuarios);
    const { selectedFlatRows } = tableInstance;
   
  
    const initFormValues: InitialValuesType = {
        tarjetaId : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.tarjetaId : '',
        usuarioId : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.usuarioId : '',
        nombre : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.nombre : '',
        numeroDeTarjeta : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.numeroDeTarjeta : '',
        cvv : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.cvv : '',
        fechaVencimiento : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.fechaVencimiento : '',
        lockoutEnabled : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.lockoutEnabled : '',
    }
const stringToBoolean = (stringValue) => {
    return stringValue === 'true'; // adjust the condition as needed
  };
    const validationSchema = Yup.object().shape({
      nombre: Yup.string()
      .required('Nombre es requerido')
      .min(2, 'Nombre debe tener al menos 2 caracteres')
      .max(20, 'Nombre no debe tener mas de 20 caracteres')
      .matches(/^[a-zA-Z ]+$/, 'Nombre solo debe tener palabras y espacios')
    });

    return (
        <Modal open={ modalTarjetasOpen } onClose={() => dispatch(setToggleModalTarjetas())} className='duration-300 bg-opacity-60 bg-black'>
            <Fade in={ modalTarjetasOpen }>
                <Box className='global-modal rounded-xl'> 
                    {
                        modalTarjetasState === 0 && (
                            <div className="rounded-t-xl px-5 py-2 bg-teal-500 text-slate-50 text-center sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-slate-50" id="modal-title">Agregar Tarjeta</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-slate-50">Estas viendo la tarjeta seleccionado</p>
                                </div>
                            </div>
                        )
                    }
                    {
                        modalTarjetasState === 1 && (
                            <div className="rounded-t-xl px-5 py-2 bg-orange-600 text-slate-50 text-center sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-slate-50" id="modal-title">Editar Tarjeta</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-slate-50">Estas viendo la tarjeta seleccionado</p>
                                </div>
                            </div>
                        )
                    }
                    {
                        modalTarjetasState === 2 && (
                            <div className="rounded-t-xl px-5 py-2 bg-green-600 text-slate-50 text-center sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-slate-50" id="modal-title">Ver Tarjeta</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-slate-50">Estas viendo la tarjeta seleccionado</p>
                                </div>
                            </div>
                        )
                    }
                    {
                        modalTarjetasState === 3 && (
                            <div className="rounded-t-xl px-5 py-2 bg-red-600 text-slate-50 text-center sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-slate-50" id="modal-title">Eliminar Tarjeta</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-slate-50">Estas viendo la tarjeta seleccionado</p>
                                </div>
                            </div>
                        )
                    }

                    <div className='modal-body p-5'>
                        <Formik
                            enableReinitialize
                            initialValues={ initFormValues }
                            validationSchema={ validationSchema }
                            
                            onSubmit={({ tarjetaId, usuarioId,nombre,numeroDeTarjeta,cvv, fechaVencimiento, lockoutEnabled }) => {
                                lockoutEnabled = stringToBoolean(lockoutEnabled);   
                                if (modalTarjetasState === 0) {
                                    dispatch(agregarTarjetas({ 
                                        tarjetaId,
                                        usuarioId,
                                        nombre,
                                        numeroDeTarjeta,
                                        cvv,
                                        fechaVencimiento,
                                        lockoutEnabled
                                     }))
                                } else if (modalTarjetasState === 1) {
                                    dispatch(editarTarjetas({...selectedFlatRows[0].original, usuarioId,nombre,numeroDeTarjeta,cvv, fechaVencimiento, lockoutEnabled }))
                                } else {
                                    dispatch(eliminarTarjetas(selectedFlatRows[0].original))
                                }
                            }}
                        >
                            {({ handleSubmit, handleChange, values, errors, touched }) => (
                                <form id="userRegister" onSubmit={ handleSubmit }>
                                    <div className="space-y-12">
                                        <div className="border-b border-gray-900/10 pb-12">
                                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="nombre" className={ `block text-sm font-medium leading-6${ (errors.nombre && touched.nombre) ? ' text-red-600' : ' text-gray-900' }` }>
                                                        nombre
                                                    </label>
                                                    <div className="mt-2">
                                                        <Field
                                                        type="text"
                                                        name="nombre"
                                                        value={ values.nombre || '' }
                                                        onChange={ handleChange }
                                                        disabled={(modalTarjetasState === 2 || modalTarjetasState === 3) ? true : false}
                                                        className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.nombre && touched.nombre) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                        />
                                                        { errors.nombre && touched.nombre && ( <span className="inline-flex text-sm text-red-700">{errors.nombre}</span> ) }
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="numeroDeTarjeta" className={ `block text-sm font-medium leading-6${ (errors.numeroDeTarjeta && touched.numeroDeTarjeta) ? ' text-red-600' : ' text-gray-900' }` }>
                                                        Numero del tarjeta
                                                    </label>
                                                    <div className="mt-2">
                                                        <Field
                                                        type="text"
                                                        name="numeroDeTarjeta"
                                                        value={ values.numeroDeTarjeta || '' }
                                                        onChange={ handleChange }
                                                        disabled={(modalTarjetasState === 2 || modalTarjetasState === 3) ? true : false}
                                                        className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.numeroDeTarjeta && touched.numeroDeTarjeta) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                        />
                                                        { errors.numeroDeTarjeta && touched.numeroDeTarjeta && ( <span className="inline-flex text-sm text-red-700">{errors.numeroDeTarjeta}</span> ) }
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="cvv" className={ `block text-sm font-medium leading-6${ (errors.cvv && touched.cvv) ? ' text-red-600' : ' text-gray-900' }` }>
                                                    cvv
                                                    </label>
                                                    <div className="mt-2">
                                                        <Field
                                                        type="text"
                                                        name="cvv"
                                                        value={ values.cvv || '' }
                                                        onChange={ handleChange }
                                                        disabled={(modalTarjetasState === 2 || modalTarjetasState === 3) ? true : false}
                                                        className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.cvv && touched.cvv) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                        />
                                                        { errors.cvv && touched.cvv && ( <span className="inline-flex text-sm text-red-700">{errors.cvv}</span> ) }
                                                    </div>
                                                </div>

                                                <div className='sm:col-span-3'>
                                                    <label htmlFor='lockoutEnabled' className={ `block text-sm font-medium leading-6${ (errors.lockoutEnabled && touched.lockoutEnabled) ? ' text-red-600' : ' text-gray-900' }` }>
                                                        Bloqueado?
                                                    </label>
                                                    <div className='mt-2'>
                                                        <select
                                                            name='lockoutEnabled'
                                                            value={ String(values.lockoutEnabled)|| 'unset' }
                                                            onChange={ handleChange }
                                                            className={ `bg-white px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.lockoutEnabled && touched.lockoutEnabled) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                        >
                                                            <option value='unset'>Seleccione si se bloqueo</option>
                                                            <option value='true'>Bloqueado</option>
                                                            <option value='false'>No Bloqueado</option>
                                                        </select>
                                                        { errors.lockoutEnabled && touched.lockoutEnabled && ( <span className='inline-flex text-sm text-red-700'>{errors.lockoutEnabled}</span> ) }
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="fechaVencimiento" className={ `block text-sm font-medium leading-6${ (errors.fechaVencimiento && touched.fechaVencimiento) ? ' text-red-600' : ' text-gray-900' }` }>
                                                    fecha Corte
                                                    </label>
                                                    <div className="mt-2">
                                                        <Field
                                                        type="date"
                                                        name="fechaVencimiento"
                                                        value={values.fechaVencimiento ? new Date(values.fechaVencimiento).toISOString().substr(0, 10) : ''}
                                                        
                                                        onChange={ handleChange }
                                                        className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.fechaVencimiento && touched.fechaVencimiento) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                        />
                                                        <ErrorMessage name="fechaVencimiento" component="span" className="inline-flex text-sm text-red-700" />



                                                    </div>
                                                </div>
                                                <div className="sm:col-span-3">
                                            <label htmlFor="usuarioId" className="block text-sm font-medium leading-6 text-gray-900">
                                                Usuarios
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                id="usuarioId"
                                                name="usuarioId"
                                                defaultValue={ values.usuarioId || 0}
                                                onChange={handleChange}
                                                className={ `bg-white px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.usuarioId && touched.usuarioId) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                >
                                                     <option value="0">Seleccione usuario</option>
                                                    {
                                                        users.map(({ usuarioId, nombre }) => (
                                                            <option key={ usuarioId } value={ usuarioId }>{ nombre }</option>
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
                                            (modalTarjetasState === 0) && (
                                                <button type='submit' className="inline-flex w-full justify-center rounded-md bg-teal-600 hover:bg-teal-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">Guardar Nuevo Tarjeta</button>
                                            )
                                        }
                                        {
                                            (modalTarjetasState === 1) && (
                                                <button type='submit' className="inline-flex w-full justify-center rounded-md bg-orange-600 hover:bg-orange-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">Editar Tarjeta Existentel</button>
                                            )
                                        }
                                        {
                                            (modalTarjetasState === 3) && (
                                                <button type='submit' className="inline-flex w-full justify-center rounded-md bg-red-600 hover:bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">Eliminar Tarjeta</button>
                                            )
                                        }
                                         <button type='button' onClick={ () => dispatch(setToggleModalTarjetas()) } className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cerrar</button>
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