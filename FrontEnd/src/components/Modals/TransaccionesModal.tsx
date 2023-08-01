import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box,  Modal, Fade, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { setToggleModalTransacciones } from '../../store/slices/transacciones/transaccionesSlice';
import { useState } from 'react';
import { agregarVentas, editarVentas, eliminarVentas } from '../../store/slices/ventas/ventasThunk';
import { agregarTarjetas, editarTarjetas, eliminarTarjetas } from '../../store/slices/tarjetas/tarjetasThunk';
import { agregarTransacciones, editarTransacciones, eliminarTransacciones } from '../../store/slices/transacciones/transaccionesThunk';
//import { format } from 'date-fns';
interface InitialValuesType {
    transaccionId: number,
    ventaId: string,
    tarjetaId: number,
    fechaTransaccion: string,
    fechaCorte: string,
    intereses: number,
    pagado: boolean,
    precio: number,
}

export const TransaccionesModal = ({ tableInstance }) => {
    const dispatch = useAppDispatch();
    const { modalTransaccionesOpen, modalTransaccionesState } = useAppSelector( (state) => state.transacciones );
    const { selectedFlatRows } = tableInstance;
    const { ventas } = useAppSelector( (state) => state.ventas);
    const { tarjetas } = useAppSelector( (state) => state.tarjetas);

  
    const initFormValues: InitialValuesType = {
        transaccionId : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.transaccionId : '',
        ventaId: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.ventaId : '',
        tarjetaId: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.tarjetaId : '',
        fechaTransaccion: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.fechaTransaccion : '',
        fechaCorte: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.fechaCorte : '',
        //fechaTransaccion: selectedFlatRows.length === 1 ? format(new Date(selectedFlatRows[0].original.fechaTransaccion), 'yyyy-MM-dd') : '',
        //fechaCorte: selectedFlatRows.length === 1 ? format(new Date(selectedFlatRows[0].original.fechaCorte), 'yyyy-MM-dd') : '',
        intereses: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.intereses : '',
        pagado: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.pagado : '',
        precio: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.precio : '',
    }

    const validationSchema = Yup.object().shape({

    });

    return (
        <Modal open={ modalTransaccionesOpen } onClose={() => dispatch(setToggleModalTransacciones())} className='duration-300 bg-opacity-60 bg-black'>
            <Fade in={ modalTransaccionesOpen }>
                <Box className='global-modal rounded-xl'> 
                    {
                        modalTransaccionesState === 0 && (
                            <div className="rounded-t-xl px-5 py-2 bg-teal-500 text-slate-50 text-center sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-slate-50" id="modal-title">Agregar Transaccion</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-slate-50">Estas viendo la transaccion seleccionado</p>
                                </div>
                            </div>
                        )
                    }
                    {
                        modalTransaccionesState === 1 && (
                            <div className="rounded-t-xl px-5 py-2 bg-orange-600 text-slate-50 text-center sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-slate-50" id="modal-title">Editar Transaccion</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-slate-50">Estas viendo la transaccion seleccionado</p>
                                </div>
                            </div>
                        )
                    }
                    {
                        modalTransaccionesState === 2 && (
                            <div className="rounded-t-xl px-5 py-2 bg-green-600 text-slate-50 text-center sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-slate-50" id="modal-title">Ver Transaccion</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-slate-50">Estas viendo la transaccion seleccionado</p>
                                </div>
                            </div>
                        )
                    }
                    {
                        modalTransaccionesState === 3 && (
                            <div className="rounded-t-xl px-5 py-2 bg-red-600 text-slate-50 text-center sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-slate-50" id="modal-title">Eliminar Transaccion</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-slate-50">Estas viendo la transaccion seleccionado</p>
                                </div>
                            </div>
                        )
                    }

                    <div className='modal-body p-5'>
                        <Formik
                            enableReinitialize
                            initialValues={ initFormValues }
                            validationSchema={ validationSchema }

                            onSubmit={({ ventaId, tarjetaId, fechaTransaccion, fechaCorte, intereses, pagado, precio }) => {
                                if (modalTransaccionesState === 0) {
                                    dispatch(agregarTransacciones({ 
                                      ventaId, 
                                      tarjetaId, 
                                      fechaTransaccion, 
                                      fechaCorte, 
                                      intereses, 
                                      pagado, 
                                      precio
                                     }))
                                } else if (modalTransaccionesState === 1) {
                                    dispatch(editarTransacciones({...selectedFlatRows[0].original, ventaId, tarjetaId, fechaTransaccion, fechaCorte, intereses, pagado, precio }))
                                } else {
                                    dispatch(eliminarTransacciones(selectedFlatRows[0].original))
                                }
                            }}
                        >
                            {({ handleSubmit, handleChange, values, errors, touched }) => (
                                <form id="userRegister" onSubmit={ handleSubmit }>
                                    <div className="space-y-12">
                                        <div className="border-b border-gray-900/10 pb-12">
                                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="ventaId" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Venta
                                                        </label>
                                                    <div className="mt-2">
                                                        <select
                                                        id="ventaId"
                                                        name="ventaId"
                                                        defaultValue={ values.ventaId || 0}
                                                        onChange={handleChange}
                                                        className={ `bg-white px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.ventaId && touched.ventaId) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                        >
                                                            <option value="0">Seleccione Venta</option>
                                                            {
                                                                
                                                                ventas.map(({ VentaId}) => (
                                                                    <option key={ VentaId } value={ VentaId }>{ VentaId }</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="tarjetaId" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Tarjeta
                                                    </label>
                                                <div className="mt-2">
                                                    <select
                                                    id="tarjetaId"
                                                    name="tarjetaId"
                                                    defaultValue={ values.tarjetaId || 0}
                                                    onChange={handleChange}
                                                    className={ `bg-white px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.tarjetaId && touched.tarjetaId) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                    >
                                                        <option value="0">Seleccione Tarjeta</option>
                                                        {
                                                            
                                                            tarjetas.map(({ tarjetaId, nombre}) => (
                                                                <option key={ tarjetaId } value={ tarjetaId }>{ nombre }</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>

                                                <div className='sm:col-span-3'>
                                                    <label htmlFor='pagado' className={ `block text-sm font-medium leading-6${ (errors.pagado && touched.pagado) ? ' text-red-600' : ' text-gray-900' }` }>
                                                        Pagado?
                                                    </label>
                                                    <div className='mt-2'>
                                                        <select
                                                            name='disponible'
                                                            value={ String(values.pagado)|| 'unset' }
                                                            onChange={ handleChange }
                                                            className={ `bg-white px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.pagado && touched.pagado) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                        >
                                                            <option value='unset'>Seleccione si se pago</option>
                                                            <option value='true'>Pagado</option>
                                                            <option value='false'>No pagado</option>
                                                        </select>
                                                        { errors.pagado && touched.pagado && ( <span className='inline-flex text-sm text-red-700'>{errors.pagado}</span> ) }
                                                    </div>
                                                </div>
                                                
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="fechaTransaccion" className={ `block text-sm font-medium leading-6${ (errors.fechaTransaccion && touched.fechaTransaccion) ? ' text-red-600' : ' text-gray-900' }` }>
                                                    fecha Corte
                                                    </label>
                                                    <div className="mt-2">
                                                        <Field
                                                        type="date"
                                                        name="fechaTransaccion"
                                                        value={ values.fechaTransaccion || '' }
                                                        onChange={ handleChange }
                                                        className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.fechaTransaccion && touched.fechaTransaccion) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                        />
                                                        { errors.fechaTransaccion && touched.fechaTransaccion && ( <span className="inline-flex text-sm text-red-700">{errors.fechaTransaccion}</span> ) }
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="fechaCorte" className={ `block text-sm font-medium leading-6${ (errors.fechaCorte && touched.fechaCorte) ? ' text-red-600' : ' text-gray-900' }` }>
                                                    fecha Corte
                                                    </label>
                                                    <div className="mt-2">
                                                        <Field
                                                        type="date"
                                                        name="fechaCorte"
                                                        value={ values.fechaCorte || '' }
                                                        onChange={ handleChange }
                                                        className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.fechaCorte && touched.fechaCorte) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                        />
                                                        { errors.fechaCorte && touched.fechaCorte && ( <span className="inline-flex text-sm text-red-700">{errors.fechaCorte}</span> ) }
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="intereses" className={ `block text-sm font-medium leading-6${ (errors.intereses && touched.intereses) ? ' text-red-600' : ' text-gray-900' }` }>
                                                    intereses
                                                    </label>
                                                    <div className="mt-2">
                                                        <Field
                                                        type="number"
                                                        name="intereses"
                                                        value={ values.intereses || '' }
                                                        onChange={ handleChange }
                                                        className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.intereses && touched.intereses) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                        />
                                                        { errors.intereses && touched.intereses && ( <span className="inline-flex text-sm text-red-700">{errors.intereses}</span> ) }
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="precio" className={ `block text-sm font-medium leading-6${ (errors.precio && touched.precio) ? ' text-red-600' : ' text-gray-900' }` }>
                                                        Precio
                                                    </label>
                                                    <div className="mt-2">
                                                        <Field
                                                        type="number"
                                                        name="precio"
                                                        value={ values.precio || '' }
                                                        onChange={ handleChange }
                                                        className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.precio && touched.precio) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                        />
                                                        { errors.precio && touched.precio && ( <span className="inline-flex text-sm text-red-700">{errors.precio}</span> ) }
                                                    </div>
                                                </div>

                                            </div>
                                            
                                            
                                            </div>
                                        </div>
                                    </div>


                                    <div className="px-0 py-3 sm:flex sm:flex-row-reverse">
                                        {
                                            (modalTransaccionesState === 0) && (
                                                <button type='submit' className="inline-flex w-full justify-center rounded-md bg-teal-600 hover:bg-teal-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">Guardar Nuevo Transaccion</button>
                                            )
                                        }
                                        {
                                            (modalTransaccionesState === 1) && (
                                                <button type='submit' className="inline-flex w-full justify-center rounded-md bg-orange-600 hover:bg-orange-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">Editar Transaccion Existentel</button>
                                            )
                                        }
                                        {
                                            (modalTransaccionesState === 3) && (
                                                <button type='submit' className="inline-flex w-full justify-center rounded-md bg-red-600 hover:bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">Eliminar Transaccion</button>
                                            )
                                        }
                                         <button type='button' onClick={ () => dispatch(setToggleModalTransacciones()) } className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cerrar</button>
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