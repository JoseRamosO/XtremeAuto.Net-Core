import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box,  Modal, Fade, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { setToggleModalVentas } from '../../store/slices/ventas/ventasSlice';
import { agregarVentas, editarVentas, eliminarVentas } from '../../store/slices/ventas/ventasThunk';

interface InitialValuesType {
    ventaId: number,
    usuarioId: number,
    carroVendidoId: number,
    meses: number,
    total: number,
    intereses: number,
    saldoPendiente: number,
    saldoAbonado: number,
}

export const VentasModal = ({ tableInstance }) => {
  const dispatch = useAppDispatch();
  const { modalVentasOpen, modalVentasState } = useAppSelector( (state) => state.ventas );
  const { selectedFlatRows } = tableInstance;
  const { carrovendidos } = useAppSelector( (state) => state.carrovendidos);
  const { users } = useAppSelector( (state) => state.usuarios);

  const initFormValues: InitialValuesType = {
    ventaId : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.ventaId : '',
    usuarioId: selectedFlatRows.length === 1 ? selectedFlatRows[0].original. usuarioId : '',
    carroVendidoId: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.carroVendidoId : '',
    meses: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.meses : '',
    total: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.total : '',
    intereses: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.intereses : '',
    saldoPendiente: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.saldoPendiente : '',
    saldoAbonado: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.saldoAbonado : '',
  }

  const validationSchema = Yup.object().shape({
    
  });


  return (
    <Modal open={ modalVentasOpen } onClose={() => dispatch(setToggleModalVentas())} className='duration-300 bg-opacity-60 bg-black'>
      <Fade in={ modalVentasOpen }>
          <Box className='global-modal rounded-xl'> 
              {
                  modalVentasState === 0 && (
                      <div className='rounded-t-xl px-5 py-2 bg-teal-500 text-slate-50 text-center sm:text-left'>
                          <h3 className='text-base font-semibold leading-6 text-slate-50' id='modal-title'>Agregar Ventas</h3>
                          <div className='mt-2'>
                              <p className='text-sm text-slate-50'>Estas agregando una venta nueva al sistema</p>
                          </div>
                      </div>
                  )
              }
              {
                  modalVentasState === 1 && (
                      <div className='rounded-t-xl px-5 py-2 bg-orange-600 text-slate-50 text-center sm:text-left'>
                          <h3 className='text-base font-semibold leading-6 text-slate-50' id='modal-title'>Editar Ventas</h3>
                          <div className='mt-2'>
                              <p className='text-sm text-slate-50'>Estas editando una venta existente</p>
                          </div>
                      </div>
                  )
              }
              {
                  modalVentasState === 2 && (
                      <div className='rounded-t-xl px-5 py-2 bg-green-600 text-slate-50 text-center sm:text-left'>
                          <h3 className='text-base font-semibold leading-6 text-slate-50' id='modal-title'>Ver Ventas</h3>
                          <div className='mt-2'>
                              <p className='text-sm text-slate-50'>Estas viendo la venta seleccionada</p>
                          </div>
                      </div>
                  )
              }
              {
                  modalVentasState === 3 && (
                      <div className='rounded-t-xl px-5 py-2 bg-red-600 text-slate-50 text-center sm:text-left'>
                          <h3 className='text-base font-semibold leading-6 text-slate-50' id='modal-title'>Eliminar Ventas</h3>
                          <div className='mt-2'>
                              <p className='text-sm text-slate-50'>Estas eliminando la venta seleccionada</p>
                          </div>
                      </div>
                  )
              }

              <div className='modal-body p-5'>
                  <Formik
                      enableReinitialize
                      initialValues={ initFormValues }
                      validationSchema={ validationSchema }
                      onSubmit={(autoNuevo) => {
                          if (modalVentasState === 0) {
                              dispatch(agregarVentas({ 
                                ...autoNuevo
                                }))
                          } else if (modalVentasState === 1) {
                              dispatch(editarVentas({...selectedFlatRows[0].original, ...autoNuevo }))
                          } else {
                              dispatch(eliminarVentas(selectedFlatRows[0].original))
                          }
                      }}
                  >
                      {({ handleSubmit, handleChange, values, errors, touched }) => (
                          <form id='userRegister' onSubmit={ handleSubmit }>
                              <div className='space-y-12'>
                                  <div className='border-b border-gray-900/10 pb-12'>
                                      <div className='grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6'>
                                        <div className='sm:col-span-3'>
                                          <label htmlFor='saldoPendiente' className={ `block text-sm font-medium leading-6${ (errors.saldoPendiente && touched.saldoPendiente) ? ' text-red-600' : ' text-gray-900' }` }>
                                          saldo Pendiente
                                          </label>
                                          <div className='mt-2'>
                                              <Field
                                              type='number'
                                              name='saldoPendiente'
                                              value={ values.saldoPendiente || '' }
                                              onChange={ handleChange }
                                              disabled={(modalVentasState === 2 || modalVentasState === 3) ? true : false}
                                              className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.saldoPendiente && touched.saldoPendiente) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                              />
                                              { errors.saldoPendiente && touched.saldoPendiente && ( <span className='inline-flex text-sm text-red-700'>{errors.saldoPendiente}</span> ) }
                                          </div>
                                        </div>
                                        <div className='sm:col-span-3'>
                                          <label htmlFor='saldoAbonado' className={ `block text-sm font-medium leading-6${ (errors.saldoAbonado && touched.saldoAbonado) ? ' text-red-600' : ' text-gray-900' }` }>
                                          saldoAbonado
                                          </label>
                                          <div className='mt-2'>
                                              <Field
                                              type='number'
                                              name='saldoAbonado'
                                              value={ values.saldoAbonado || '' }
                                              onChange={ handleChange }
                                              disabled={(modalVentasState === 2 || modalVentasState === 3) ? true : false}
                                              className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.saldoAbonado && touched.saldoAbonado) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                              />
                                              { errors.saldoAbonado && touched.saldoAbonado && ( <span className='inline-flex text-sm text-red-700'>{errors.saldoAbonado}</span> ) }
                                          </div>
                                        </div>
                                        <div className='sm:col-span-3'>
                                          <label htmlFor='intereses' className={ `block text-sm font-medium leading-6${ (errors.intereses && touched.intereses) ? ' text-red-600' : ' text-gray-900' }` }>
                                              Intereses
                                          </label>
                                          <div className='mt-2'>
                                              <Field
                                              type='number'
                                              name='intereses'
                                              value={ values.intereses || '' }
                                              onChange={ handleChange }
                                              disabled={(modalVentasState === 2 || modalVentasState === 3) ? true : false}
                                              className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.intereses && touched.intereses) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                              />
                                              { errors.intereses && touched.intereses && ( <span className='inline-flex text-sm text-red-700'>{errors.intereses}</span> ) }
                                          </div>
                                        </div>
                                        <div className='sm:col-span-3'>
                                          <label htmlFor='total' className={ `block text-sm font-medium leading-6${ (errors.total && touched.total) ? ' text-red-600' : ' text-gray-900' }` }>
                                              Total
                                          </label>
                                          <div className='mt-2'>
                                              <Field
                                              type='number'
                                              name='total'
                                              value={ values.total || '' }
                                              onChange={ handleChange }
                                              disabled={(modalVentasState === 2 || modalVentasState === 3) ? true : false}
                                              className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.total && touched.total) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                              />
                                              { errors.total && touched.total && ( <span className='inline-flex text-sm text-red-700'>{errors.total}</span> ) }
                                          </div>
                                        </div>

                                        <div className='sm:col-span-3'>
                                          <label htmlFor='meses' className={ `block text-sm font-medium leading-6${ (errors.meses && touched.meses) ? ' text-red-600' : ' text-gray-900' }` }>
                                              Meses
                                          </label>
                                          <div className='mt-2'>
                                              <Field
                                              type='number'
                                              name='meses'
                                              value={ values.meses || '' }
                                              onChange={ handleChange }
                                              disabled={(modalVentasState === 2 || modalVentasState === 3) ? true : false}
                                              className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.meses && touched.meses) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                              />
                                              { errors.meses && touched.meses && ( <span className='inline-flex text-sm text-red-700'>{errors.meses}</span> ) }
                                          </div>
                                        </div>


                                        <div className="sm:col-span-3">
                                         <label htmlFor=" usuarioId" className="block text-sm font-medium leading-6 text-gray-900">
                                         Usuario
                                          </label>
                                                <div className="mt-2">
                                                    <select
                                                    id=" usuarioId"
                                                    name=" usuarioId"
                                                    defaultValue={ values. usuarioId || 0}
                                                    onChange={handleChange}
                                                    disabled={(modalVentasState === 2 || modalVentasState === 3) ? true : false}
                                                    className={ `bg-white px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors. usuarioId && touched. usuarioId) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                    >
                                                        <option value="0">Seleccione Rueda</option>
                                                        {
                                                            users.map(({  usuarioId, nombre}) => (
                                                                <option key={  usuarioId } value={  usuarioId }>{ nombre }</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                         <label htmlFor="carroVendidoId" className="block text-sm font-medium leading-6 text-gray-900">
                                         Carro Modelo
                                          </label>
                                                <div className="mt-2">
                                                    <select
                                                    id="carroVendidoId"
                                                    name="carroVendidoId"
                                                    defaultValue={ values.carroVendidoId || 0}
                                                    onChange={handleChange}
                                                    disabled={(modalVentasState === 2 || modalVentasState === 3) ? true : false}
                                                    className={ `bg-white px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.carroVendidoId && touched.carroVendidoId) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                    >
                                                        <option value="0">Seleccione Color</option>
                                                        {
                                                            carrovendidos.map(({ carroVendidoId}) => (
                                                                <option key={ carroVendidoId } value={ carroVendidoId }>{ carroVendidoId }</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                        </div>
                                        
                                        

                                      </div>
                                  </div>
                              </div>
                              <div className='px-0 py-3 sm:flex sm:flex-row-reverse'>
                                  {
                                      (modalVentasState === 0) && (
                                          <button type='submit' className='inline-flex w-full justify-center rounded-md bg-teal-600 hover:bg-teal-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto'>Guardar Ventas</button>
                                      )
                                  }
                                  {
                                      (modalVentasState === 1) && (
                                          <button type='submit' className='inline-flex w-full justify-center rounded-md bg-orange-600 hover:bg-orange-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto'>Editar Ventas</button>
                                      )
                                  }
                                  {
                                      (modalVentasState === 3) && (
                                          <button type='submit' className='inline-flex w-full justify-center rounded-md bg-red-600 hover:bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto'>Eliminar Ventas</button>
                                      )
                                  }
                                    <button type='button' onClick={ () => dispatch(setToggleModalVentas()) } className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'>Cerrar</button>
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
