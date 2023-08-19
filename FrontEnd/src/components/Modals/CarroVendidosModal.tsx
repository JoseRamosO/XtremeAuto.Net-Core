import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box,  Modal, Fade, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { setToggleModalCarroVendidos } from '../../store/slices/carrovendidos/carrovendidosSlice';
import { agregarCarroVendidos, editarCarroVendidos, eliminarCarroVendidos } from '../../store/slices/carrovendidos/carrovendidosThunk';

interface InitialValuesType {
    carroVendidoId: number,
    ruedaId: number,
    colorId: number,
    carroModeloId: number,
    seguroId: number,
    precioTotal: number,
}

export const CarroVendidosModal = ({ tableInstance }) => {
  const dispatch = useAppDispatch();
  const { modalCarroVendidosOpen, modalCarroVendidosState } = useAppSelector( (state) => state.carrovendidos );
  const { selectedFlatRows } = tableInstance;
  const { seguros } = useAppSelector( (state) => state.seguros);
  const { ruedas } = useAppSelector( (state) => state.ruedas);
  const { colores } = useAppSelector( (state) => state.colores);
  const { autos } = useAppSelector( (state) => state.autos);

  const initFormValues: InitialValuesType = {
      carroVendidoId : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.carroVendidoId : '',
      ruedaId: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.ruedaId : '',
      colorId: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.colorId : '',
      carroModeloId: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.carroModeloId : '',
      seguroId: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.seguroId : '',
      precioTotal: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.precioTotal : '',
  }

  const validationSchema = Yup.object().shape({
    
  });


  return (
    <Modal open={ modalCarroVendidosOpen } onClose={() => dispatch(setToggleModalCarroVendidos())} className='duration-300 bg-opacity-60 bg-black'>
      <Fade in={ modalCarroVendidosOpen }>
          <Box className='global-modal rounded-xl'> 
              {
                  modalCarroVendidosState === 0 && (
                      <div className='rounded-t-xl px-5 py-2 bg-teal-500 text-slate-50 text-center sm:text-left'>
                          <h3 className='text-base font-semibold leading-6 text-slate-50' id='modal-title'>Agregar CarroVendidos</h3>
                          <div className='mt-2'>
                              <p className='text-sm text-slate-50'>Estas agregando un auto nuevo al sistema</p>
                          </div>
                      </div>
                  )
              }
              {
                  modalCarroVendidosState === 1 && (
                      <div className='rounded-t-xl px-5 py-2 bg-orange-600 text-slate-50 text-center sm:text-left'>
                          <h3 className='text-base font-semibold leading-6 text-slate-50' id='modal-title'>Editar CarroVendidos</h3>
                          <div className='mt-2'>
                              <p className='text-sm text-slate-50'>Estas editando un auto existente</p>
                          </div>
                      </div>
                  )
              }
              {
                  modalCarroVendidosState === 2 && (
                      <div className='rounded-t-xl px-5 py-2 bg-green-600 text-slate-50 text-center sm:text-left'>
                          <h3 className='text-base font-semibold leading-6 text-slate-50' id='modal-title'>Ver CarroVendidos</h3>
                          <div className='mt-2'>
                              <p className='text-sm text-slate-50'>Estas viendo el auto seleccionado</p>
                          </div>
                      </div>
                  )
              }
              {
                  modalCarroVendidosState === 3 && (
                      <div className='rounded-t-xl px-5 py-2 bg-red-600 text-slate-50 text-center sm:text-left'>
                          <h3 className='text-base font-semibold leading-6 text-slate-50' id='modal-title'>Eliminar CarroVendidos</h3>
                          <div className='mt-2'>
                              <p className='text-sm text-slate-50'>Estas eliminando el auto seleccionado</p>
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
                          if (modalCarroVendidosState === 0) {
                              dispatch(agregarCarroVendidos({ 
                                ...autoNuevo
                                }))
                          } else if (modalCarroVendidosState === 1) {
                              dispatch(editarCarroVendidos({...selectedFlatRows[0].original, ...autoNuevo }))
                          } else {
                              dispatch(eliminarCarroVendidos(selectedFlatRows[0].original))
                          }
                      }}
                  >
                      {({ handleSubmit, handleChange, values, errors, touched }) => (
                          <form id='userRegister' onSubmit={ handleSubmit }>
                              <div className='space-y-12'>
                                  <div className='border-b border-gray-900/10 pb-12'>
                                      <div className='grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6'>
                                        

                                        <div className='sm:col-span-3'>
                                          <label htmlFor='precioTotal' className={ `block text-sm font-medium leading-6${ (errors.precioTotal && touched.precioTotal) ? ' text-red-600' : ' text-gray-900' }` }>
                                              Tipo
                                          </label>
                                          <div className='mt-2'>
                                              <Field
                                              type='number'
                                              name='precioTotal'
                                              value={ values.precioTotal || '' }
                                              onChange={ handleChange }
                                              disabled={(modalCarroVendidosState === 2 || modalCarroVendidosState === 3) ? true : false}
                                              className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.precioTotal && touched.precioTotal) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                              />
                                              { errors.precioTotal && touched.precioTotal && ( <span className='inline-flex text-sm text-red-700'>{errors.precioTotal}</span> ) }
                                          </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                         <label htmlFor="ruedaId" className="block text-sm font-medium leading-6 text-gray-900">
                                         Rueda
                                          </label>
                                                <div className="mt-2">
                                                    <select
                                                    id="ruedaId"
                                                    name="ruedaId"
                                                    defaultValue={ values.ruedaId || 0}
                                                    onChange={handleChange}
                                                    disabled={(modalCarroVendidosState === 2 || modalCarroVendidosState === 3) ? true : false}
                                                    className={ `bg-white px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.ruedaId && touched.ruedaId) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                    >
                                                        <option value="0">Seleccione Rueda</option>
                                                        {
                                                            ruedas.map(({ ruedaId, nombre}) => (
                                                                <option key={ ruedaId } value={ ruedaId }>{ nombre }</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                         <label htmlFor="colorId" className="block text-sm font-medium leading-6 text-gray-900">
                                         Color
                                          </label>
                                                <div className="mt-2">
                                                    <select
                                                    id="colorId"
                                                    name="colorId"
                                                    defaultValue={ values.colorId || 0}
                                                    onChange={handleChange}
                                                    disabled={(modalCarroVendidosState === 2 || modalCarroVendidosState === 3) ? true : false}
                                                    className={ `bg-white px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.colorId && touched.colorId) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                    >
                                                        <option value="0">Seleccione Color</option>
                                                        {
                                                            colores.map(({ colorId, nombre}) => (
                                                                <option key={ colorId } value={ colorId }>{ nombre }</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                         <label htmlFor="carroModeloId" className="block text-sm font-medium leading-6 text-gray-900">
                                         Carro Modelo
                                          </label>
                                                <div className="mt-2">
                                                    <select
                                                    id="carroModeloId"
                                                    name="carroModeloId"
                                                    defaultValue={ values.carroModeloId || 0}
                                                    onChange={handleChange}
                                                    disabled={(modalCarroVendidosState === 2 || modalCarroVendidosState === 3) ? true : false}
                                                    className={ `bg-white px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.carroModeloId && touched.carroModeloId) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                    >
                                                        <option value="0">Seleccione Color</option>
                                                        {
                                                            autos.map(({ carroModeloId, modelo}) => (
                                                                <option key={ carroModeloId } value={ carroModeloId }>{ modelo }</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                         <label htmlFor="seguroId" className="block text-sm font-medium leading-6 text-gray-900">
                                         Seguro
                                          </label>
                                                <div className="mt-2">
                                                    <select
                                                    id="seguroId"
                                                    name="seguroId"
                                                    defaultValue={ values.seguroId || 0}
                                                    onChange={handleChange}
                                                    disabled={(modalCarroVendidosState === 2 || modalCarroVendidosState === 3) ? true : false}
                                                    className={ `bg-white px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.seguroId && touched.seguroId) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                    >
                                                        <option value="0">Seleccione Color</option>
                                                        {
                                                            seguros.map(({ seguroId, nombre}) => (
                                                                <option key={ seguroId } value={ seguroId }>{ nombre }</option>
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
                                      (modalCarroVendidosState === 0) && (
                                          <button type='submit' className='inline-flex w-full justify-center rounded-md bg-teal-600 hover:bg-teal-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto'>Guardar CarroVendidos</button>
                                      )
                                  }
                                  {
                                      (modalCarroVendidosState === 1) && (
                                          <button type='submit' className='inline-flex w-full justify-center rounded-md bg-orange-600 hover:bg-orange-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto'>Editar CarroVendidos</button>
                                      )
                                  }
                                  {
                                      (modalCarroVendidosState === 3) && (
                                          <button type='submit' className='inline-flex w-full justify-center rounded-md bg-red-600 hover:bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto'>Eliminar CarroVendidos</button>
                                      )
                                  }
                                    <button type='button' onClick={ () => dispatch(setToggleModalCarroVendidos()) } className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'>Cerrar</button>
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
