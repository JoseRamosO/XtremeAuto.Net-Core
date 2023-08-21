import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { loginUsuario } from '../../store/slices/usuarios/usuariosThunk';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface InitialValuesType {
  correo : string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const usuario = useAppSelector( (state) => state.usuarios );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (usuario.currentUser.status === 'authenticated' && usuario.currentUser.rol === 1) {
      navigate('/admin/usuarios');
    }
    if (usuario.currentUser.status === 'authenticated' && usuario.currentUser.rol !== 1) {
      navigate('/user');
    }
  }, [navigate, usuario.currentUser.status]);

  const initFormValues: InitialValuesType = {
      correo : '',
      password : '',
  }

  const validationSchema = Yup.object().shape({    
    correo: Yup.string()
    // .email('Dirección de email invalida')
    .required('Email es requerido'),
    
    password: Yup.string()
    .required('Contraseña es requerida')
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <img alt="Imagen logo" src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png" className="w-32 mx-auto"/>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Bienvenido de vuelta</h1>
            <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">Sistema de Tiquetes de comedor </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <Formik
                  enableReinitialize
                  initialValues={ initFormValues }
                  validationSchema={ validationSchema }
                  onSubmit={(loginState) => {                    
                    dispatch(loginUsuario(loginState))
                  //     if (modalColoresState === 0) {
                  //         dispatch(agregarColores({ 
                  //           nombre,
                  //           imagen: selectedImage
                  //          }))
                  //     } else if (modalColoresState === 1) {
                  //         dispatch(editarColores({...selectedFlatRows[0].original, nombre, imagen, FormFile: selectedImage }))
                  //     } else {
                  //         dispatch(eliminarColores(selectedFlatRows[0].original))
                  //     }
                  }}
                >
                  {({ handleSubmit, handleChange, values, errors, touched }) => (
                      <form id="userRegister" onSubmit={ handleSubmit }>
                        <Field
                          type="text"
                          name="correo"
                          value={ values.correo || '' }
                          onChange={ handleChange }
                          placeholder="Correo Electronico"
                          className={ `w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${ (errors.correo && touched.correo) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                        />
                        { errors.correo && touched.correo && ( <span className="inline-flex text-sm text-red-700">{errors.correo}</span> ) }

                        <Field
                          type="password"
                          name="password"
                          value={ values.password || '' }
                          onChange={ handleChange }
                          placeholder="Contraseña"
                          className={ `w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${ (errors.password && touched.password) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                        />
                        { errors.password && touched.password && ( <span className="inline-flex text-sm text-red-700">{errors.password}</span> ) }

                                              
                            <button type='submit' className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                              <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M20 8v6M23 11h-6" /></svg>
                              <span className="ml-3">Inciar Sesión</span>
                            </button>
                      </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")' }}/>
        </div>
      </div>
    </div>
  )
}