import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box,  Modal, Fade, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { setToggleModalRuedas } from '../../store/slices/ruedas/ruedasSlice';
import { useState } from 'react';
import { agregarRuedas, editarRuedas, eliminarRuedas } from '../../store/slices/ruedas/ruedasThunk';

interface InitialValuesType {
  ruedaId: number;
  nombre : string;
  imagen: string;
  precio: number;
}

export const RuedasModal = ({ tableInstance }) => {
    const dispatch = useAppDispatch();
    const { modalRuedasOpen, modalRuedasState } = useAppSelector( (state) => state.ruedas );
    const { selectedFlatRows } = tableInstance;
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
  
    const initFormValues: InitialValuesType = {
        ruedaId : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.ruedaId : '',
        nombre : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.nombre : '',
        precio : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.precio : '',
        imagen : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.imagen : '',
    }

    const validationSchema = Yup.object().shape({
      nombre: Yup.string()
      .required('Nombre es requerido')
      .min(2, 'Nombre debe tener al menos 2 caracteres')
      .max(20, 'Nombre no debe tener mas de 20 caracteres')
      .matches(/^[a-zA-Z ]+$/, 'Nombre solo debe tener palabras y espacios')
    });

    return (
        <Modal open={ modalRuedasOpen } onClose={() => dispatch(setToggleModalRuedas())} className='duration-300 bg-opacity-60 bg-black'>
            <Fade in={ modalRuedasOpen }>
                <Box className='global-modal rounded-xl'> 
                    {
                        modalRuedasState === 0 && (
                            <div className="rounded-t-xl px-5 py-2 bg-teal-500 text-slate-50 text-center sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-slate-50" id="modal-title">Agregar Rueda</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-slate-50">Estas viendo la rueda seleccionado</p>
                                </div>
                            </div>
                        )
                    }
                    {
                        modalRuedasState === 1 && (
                            <div className="rounded-t-xl px-5 py-2 bg-orange-600 text-slate-50 text-center sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-slate-50" id="modal-title">Editar Rueda</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-slate-50">Estas viendo la rueda seleccionado</p>
                                </div>
                            </div>
                        )
                    }
                    {
                        modalRuedasState === 2 && (
                            <div className="rounded-t-xl px-5 py-2 bg-green-600 text-slate-50 text-center sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-slate-50" id="modal-title">Ver Rueda</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-slate-50">Estas viendo la rueda seleccionado</p>
                                </div>
                            </div>
                        )
                    }
                    {
                        modalRuedasState === 3 && (
                            <div className="rounded-t-xl px-5 py-2 bg-red-600 text-slate-50 text-center sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-slate-50" id="modal-title">Eliminar Rueda</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-slate-50">Estas viendo la rueda seleccionado</p>
                                </div>
                            </div>
                        )
                    }

                    <div className='modal-body p-5'>
                        <Formik
                            enableReinitialize
                            initialValues={ initFormValues }
                            validationSchema={ validationSchema }
                            onSubmit={({ nombre, imagen,precio }) => {
                                if (modalRuedasState === 0) {
                                    dispatch(agregarRuedas({ 
                                      nombre,
                                      precio,
                                      imagen: selectedImage
                                     }))
                                } else if (modalRuedasState === 1) {
                                    dispatch(editarRuedas({...selectedFlatRows[0].original, nombre, imagen, precio, FormFile: selectedImage }))
                                } else {
                                    dispatch(eliminarRuedas(selectedFlatRows[0].original))
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
                                                        Nombre del rueda
                                                    </label>
                                                    <div className="mt-2">
                                                        <Field
                                                        type="text"
                                                        name="nombre"
                                                        value={ values.nombre || '' }
                                                        onChange={ handleChange }
                                                        disabled={(modalRuedasState === 2 || modalRuedasState === 3) ? true : false}
                                                        className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.nombre && touched.nombre) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                        />
                                                        { errors.nombre && touched.nombre && ( <span className="inline-flex text-sm text-red-700">{errors.nombre}</span> ) }
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="last-name" className={ `block text-sm font-medium leading-6${ (errors.precio && touched.precio) ? ' text-red-600' : ' text-gray-900' }` }>
                                                        Precio
                                                    </label>
                                                    <div className="mt-2">
                                                        <Field
                                                        type="number"
                                                        name="precio"
                                                        value={ values.precio || '' }
                                                        onChange={ handleChange }
                                                        disabled={(modalRuedasState === 2 || modalRuedasState === 3) ? true : false}
                                                        className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.precio && touched.precio) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                                                        />
                                                        { errors.precio && touched.precio && ( <span className="inline-flex text-sm text-red-700">{errors.precio}</span> ) }
                                                    </div>
                                                </div>

                                            </div>
                                            
                                            <div className={`mt-5 image-uploader${ selectedImage ? ' image-uploader-active' : ''} ${ ( !selectedImage && (modalRuedasState === 2 || modalRuedasState === 3 ) ? 'image-looked' : '') }`}>
                                              <CloudUploadIcon/>
                                              <input
                                                  type="file"
                                                  name="myImage"
                                                  onChange={(e) => {
                                                    if (!e.target.files) return;
                                                    console.log(e.target.files[0]);
                                                    setSelectedImage(e.target.files[0]);
                                                  }}
                                                />
                                                {selectedImage && (
                                                  <div className='image-uploaded'>
                                                    <img
                                                      alt="not found"
                                                      width={"250px"}
                                                      src={URL.createObjectURL(selectedImage)}
                                                    />
                                                    <button onClick={() => setSelectedImage(null)}><DeleteIcon/></button>
                                                  </div>
                                                )}
                                                {(!selectedImage && modalRuedasState === 1 ) && (
                                                  <div className='image-uploaded'>
                                                    <img
                                                      alt="not found"
                                                      width={"250px"}
                                                      src={ `http://localhost:5088${values.imagen}` }
                                                    />
                                                    <button onClick={() => setSelectedImage(null)}><DeleteIcon/></button>
                                                  </div>
                                                )}
                                                {(!selectedImage && (modalRuedasState === 2 || modalRuedasState === 3) ) && (
                                                  <div className='image-uploaded'>
                                                    <img
                                                      alt="not found"
                                                      width={"250px"}
                                                      src={ `http://localhost:5088${values.imagen}` }
                                                    />
                                                  </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-0 py-3 sm:flex sm:flex-row-reverse">
                                        {
                                            (modalRuedasState === 0) && (
                                                <button type='submit' className="inline-flex w-full justify-center rounded-md bg-teal-600 hover:bg-teal-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">Guardar Nuevo Rueda</button>
                                            )
                                        }
                                        {
                                            (modalRuedasState === 1) && (
                                                <button type='submit' className="inline-flex w-full justify-center rounded-md bg-orange-600 hover:bg-orange-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">Editar Rueda Existentel</button>
                                            )
                                        }
                                        {
                                            (modalRuedasState === 3) && (
                                                <button type='submit' className="inline-flex w-full justify-center rounded-md bg-red-600 hover:bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">Eliminar Rueda</button>
                                            )
                                        }
                                         <button type='button' onClick={ () => dispatch(setToggleModalRuedas()) } className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cerrar</button>
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