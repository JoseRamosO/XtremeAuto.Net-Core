import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box,  Modal, Fade, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { setToggleModalAutos } from '../../store/slices/autos/autosSlice';
import { agregarAutos, editarAuto, eliminarAuto } from '../../store/slices/autos/autosThunk';

interface InitialValuesType {
  carroModeloId: number,
  disponible: boolean,
  tipo: string,
  marca: string,
  modelo: string,
  descripcion: string,
  precio: number,
  imagen: string,
  cantidad: number
}

export const AutosModal = ({ tableInstance }) => {
  const dispatch = useAppDispatch();
  const { modalAutosOpen, modalAutosState } = useAppSelector( (state) => state.autos );
  const { selectedFlatRows } = tableInstance;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const initFormValues: InitialValuesType = {
      carroModeloId : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.carroModeloId : '',
      disponible : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.disponible : 'unset',
      tipo : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.tipo : '',
      marca : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.marca : '',
      modelo : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.modelo : '',
      descripcion : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.descripcion : '',
      precio : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.precio : '',
      imagen : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.imagen : '',
      cantidad : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.cantidad : ''
  }

  const validationSchema = Yup.object().shape({
    marca: Yup.string()
    .required('Marca es requerido')
    .min(2, 'Marca debe tener al menos 2 caracteres')
    .max(20, 'Marca no debe tener mas de 20 caracteres'),

    tipo: Yup.string()
    .required('Marca es requerido')
    .min(2, 'Marca debe tener al menos 2 caracteres')
    .max(20, 'Marca no debe tener mas de 20 caracteres'),

    modelo: Yup.string()
    .required('Marca es requerido')
    .min(2, 'Marca debe tener al menos 2 caracteres')
    .max(20, 'Marca no debe tener mas de 20 caracteres'),
    
    descripcion: Yup.string()
    .required('Marca es requerido')
    .min(2, 'Marca debe tener al menos 2 caracteres'),

    disponible: Yup.string().notOneOf(['unset'], 'Por Favor seleone'),

    precio: Yup.number().typeError('Please enter a valid number').required('Required'),

    cantidad: Yup.number().typeError('Please enter a valid number').required('Required'),
  });


  return (
    <Modal open={ modalAutosOpen } onClose={() => dispatch(setToggleModalAutos())} className='duration-300 bg-opacity-60 bg-black'>
      <Fade in={ modalAutosOpen }>
          <Box className='global-modal rounded-xl'> 
              {
                  modalAutosState === 0 && (
                      <div className='rounded-t-xl px-5 py-2 bg-teal-500 text-slate-50 text-center sm:text-left'>
                          <h3 className='text-base font-semibold leading-6 text-slate-50' id='modal-title'>Agregar Auto</h3>
                          <div className='mt-2'>
                              <p className='text-sm text-slate-50'>Estas agregando un auto nuevo al sistema</p>
                          </div>
                      </div>
                  )
              }
              {
                  modalAutosState === 1 && (
                      <div className='rounded-t-xl px-5 py-2 bg-orange-600 text-slate-50 text-center sm:text-left'>
                          <h3 className='text-base font-semibold leading-6 text-slate-50' id='modal-title'>Editar Auto</h3>
                          <div className='mt-2'>
                              <p className='text-sm text-slate-50'>Estas editando un auto existente</p>
                          </div>
                      </div>
                  )
              }
              {
                  modalAutosState === 2 && (
                      <div className='rounded-t-xl px-5 py-2 bg-green-600 text-slate-50 text-center sm:text-left'>
                          <h3 className='text-base font-semibold leading-6 text-slate-50' id='modal-title'>Ver Auto</h3>
                          <div className='mt-2'>
                              <p className='text-sm text-slate-50'>Estas viendo el auto seleccionado</p>
                          </div>
                      </div>
                  )
              }
              {
                  modalAutosState === 3 && (
                      <div className='rounded-t-xl px-5 py-2 bg-red-600 text-slate-50 text-center sm:text-left'>
                          <h3 className='text-base font-semibold leading-6 text-slate-50' id='modal-title'>Eliminar Auto</h3>
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
                          if (modalAutosState === 0) {
                              dispatch(agregarAutos({ 
                                ...autoNuevo,
                                imagen: selectedImage
                                }))
                          } else if (modalAutosState === 1) {
                              dispatch(editarAuto({...selectedFlatRows[0].original, ...autoNuevo, FormFile: selectedImage }))
                          } else {
                              dispatch(eliminarAuto(selectedFlatRows[0].original))
                          }
                      }}
                  >
                      {({ handleSubmit, handleChange, values, errors, touched }) => (
                          <form id='userRegister' onSubmit={ handleSubmit }>
                              <div className='space-y-12'>
                                  <div className='border-b border-gray-900/10 pb-12'>
                                      <div className='grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6'>
                                        <div className='sm:col-span-3'>
                                          <label htmlFor='marca' className={ `block text-sm font-medium leading-6${ (errors.marca && touched.marca) ? ' text-red-600' : ' text-gray-900' }` }>
                                              Marca
                                          </label>
                                          <div className='mt-2'>
                                              <Field
                                              type='text'
                                              name='marca'
                                              value={ values.marca || '' }
                                              onChange={ handleChange }
                                              disabled={(modalAutosState === 2 || modalAutosState === 3) ? true : false}
                                              className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.marca && touched.marca) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                              />
                                              { errors.marca && touched.marca && ( <span className='inline-flex text-sm text-red-700'>{errors.marca}</span> ) }
                                          </div>
                                        </div>

                                        <div className='sm:col-span-3'>
                                          <label htmlFor='tipo' className={ `block text-sm font-medium leading-6${ (errors.tipo && touched.tipo) ? ' text-red-600' : ' text-gray-900' }` }>
                                              Tipo
                                          </label>
                                          <div className='mt-2'>
                                              <Field
                                              type='text'
                                              name='tipo'
                                              value={ values.tipo || '' }
                                              onChange={ handleChange }
                                              disabled={(modalAutosState === 2 || modalAutosState === 3) ? true : false}
                                              className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.tipo && touched.tipo) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                              />
                                              { errors.tipo && touched.tipo && ( <span className='inline-flex text-sm text-red-700'>{errors.tipo}</span> ) }
                                          </div>
                                        </div>

                                        <div className='sm:col-span-3'>
                                          <label htmlFor='modelo' className={ `block text-sm font-medium leading-6${ (errors.modelo && touched.modelo) ? ' text-red-600' : ' text-gray-900' }` }>
                                              Modelo
                                          </label>
                                          <div className='mt-2'>
                                              <Field
                                              type='text'
                                              name='modelo'
                                              value={ values.modelo || '' }
                                              onChange={ handleChange }
                                              disabled={(modalAutosState === 2 || modalAutosState === 3) ? true : false}
                                              className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.modelo && touched.modelo) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                              />
                                              { errors.modelo && touched.modelo && ( <span className='inline-flex text-sm text-red-700'>{errors.modelo}</span> ) }
                                          </div>
                                        </div>

                                        <div className='sm:col-span-3'>
                                          <label htmlFor='precio' className={ `block text-sm font-medium leading-6${ (errors.precio && touched.precio) ? ' text-red-600' : ' text-gray-900' }` }>
                                            Precio
                                          </label>
                                          <div className='mt-2'>
                                              <Field
                                              type='text'
                                              name='precio'
                                              value={ values.precio || '' }
                                              onChange={ handleChange }
                                              disabled={(modalAutosState === 2 || modalAutosState === 3) ? true : false}
                                              className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.precio && touched.precio) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                              />
                                              { errors.precio && touched.precio && ( <span className='inline-flex text-sm text-red-700'>{errors.precio}</span> ) }
                                          </div>
                                        </div>

                                        <div className='sm:col-span-3'>
                                          <label htmlFor='cantidad' className={ `block text-sm font-medium leading-6${ (errors.cantidad && touched.cantidad) ? ' text-red-600' : ' text-gray-900' }` }>
                                            Cantidad
                                          </label>
                                          <div className='mt-2'>
                                              <Field
                                              type='text'
                                              name='cantidad'
                                              value={ values.cantidad || '' }
                                              onChange={ handleChange }
                                              disabled={(modalAutosState === 2 || modalAutosState === 3) ? true : false}
                                              className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.cantidad && touched.cantidad) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                              />
                                              { errors.cantidad && touched.cantidad && ( <span className='inline-flex text-sm text-red-700'>{errors.cantidad}</span> ) }
                                          </div>
                                        </div>

                                        <div className='sm:col-span-3'>
                                          <label htmlFor='disponible' className={ `block text-sm font-medium leading-6${ (errors.disponible && touched.disponible) ? ' text-red-600' : ' text-gray-900' }` }>
                                            Disponible
                                          </label>
                                          <div className='mt-2'>
                                              <select
                                                name='disponible'
                                                value={ String(values.disponible)|| 'unset' }
                                                onChange={ handleChange }
                                                disabled={(modalAutosState === 2 || modalAutosState === 3) ? true : false}
                                                className={ `bg-white px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.disponible && touched.disponible) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                              >
                                                <option value='unset'>Seleccione Disponibilidad</option>
                                                <option value='true'>Disponible</option>
                                                <option value='false'>No Disponible</option>
                                              </select>
                                              { errors.disponible && touched.disponible && ( <span className='inline-flex text-sm text-red-700'>{errors.disponible}</span> ) }
                                          </div>
                                        </div>

                                        <div className='sm:col-span-3'>
                                          <label htmlFor='descripcion' className={ `block text-sm font-medium leading-6${ (errors.descripcion && touched.descripcion) ? ' text-red-600' : ' text-gray-900' }` }>
                                            Descripción
                                          </label>
                                          <div className='mt-2'>
                                              <Field
                                              as="textarea"
                                              type='text'
                                              name='descripcion'
                                              value={ values.descripcion || '' }
                                              onChange={ handleChange }
                                              disabled={(modalAutosState === 2 || modalAutosState === 3) ? true : false}
                                              className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.descripcion && touched.descripcion) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                              />
                                              { errors.descripcion && touched.descripcion && ( <span className='inline-flex text-sm text-red-700'>{errors.descripcion}</span> ) }
                                          </div>
                                        </div>

                                        <div className='sm:col-span-3'>
                                          <label htmlFor='descripcion' className={ `block text-sm font-medium leading-6${ (errors.descripcion && touched.descripcion) ? ' text-red-600' : ' text-gray-900' }` }>
                                            Imagen del auto
                                          </label>
                                        <div className={`mt-1 image-uploader${ selectedImage ? ' image-uploader-active' : ''} ${ ( !selectedImage && (modalAutosState === 2 || modalAutosState === 3 ) ? 'image-looked' : '') }`}>
                                          <CloudUploadIcon/>
                                          <input
                                              type='file'
                                              name='myImage'
                                              onChange={(e) => {
                                                if (!e.target.files) return;
                                                console.log(e.target.files[0]);
                                                setSelectedImage(e.target.files[0]);
                                              }}
                                            />
                                            {selectedImage && (
                                              <div className='image-uploaded'>
                                                <img
                                                  alt='not found'
                                                  width={'250px'}
                                                  src={URL.createObjectURL(selectedImage)}
                                                />
                                                <button onClick={() => setSelectedImage(null)}><DeleteIcon/></button>
                                              </div>
                                            )}
                                            {(!selectedImage && modalAutosState === 1 ) && (
                                              <div className='image-uploaded'>
                                                <img
                                                  alt='not found'
                                                  width={'250px'}
                                                  src={ `http://localhost:5088${values.imagen}` }
                                                />
                                                <button onClick={() => setSelectedImage(null)}><DeleteIcon/></button>
                                              </div>
                                            )}
                                            {(!selectedImage && (modalAutosState === 2 || modalAutosState === 3) ) && (
                                              <div className='image-uploaded'>
                                                <img
                                                  alt='not found'
                                                  width={'250px'}
                                                  src={ `http://localhost:5088${values.imagen}` }
                                                />
                                              </div>
                                            )}
                                        </div>
                                        </div>
                                      </div>
                                  </div>
                              </div>
                              <div className='px-0 py-3 sm:flex sm:flex-row-reverse'>
                                  {
                                      (modalAutosState === 0) && (
                                          <button type='submit' className='inline-flex w-full justify-center rounded-md bg-teal-600 hover:bg-teal-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto'>Guardar Auto</button>
                                      )
                                  }
                                  {
                                      (modalAutosState === 1) && (
                                          <button type='submit' className='inline-flex w-full justify-center rounded-md bg-orange-600 hover:bg-orange-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto'>Editar Auto</button>
                                      )
                                  }
                                  {
                                      (modalAutosState === 3) && (
                                          <button type='submit' className='inline-flex w-full justify-center rounded-md bg-red-600 hover:bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto'>Eliminar Auto</button>
                                      )
                                  }
                                    <button type='button' onClick={ () => dispatch(setToggleModalAutos()) } className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'>Cerrar</button>
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
