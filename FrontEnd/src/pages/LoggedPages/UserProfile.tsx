import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { obtenerTarjetas } from '../../store/slices/tarjetas/tarjetasThunk';
import { MainPublicLayout } from '../theme/MainPublicLayout';
import { Column, usePagination, useRowSelect, useTable } from 'react-table';
import { TarjetasModal } from '../../components/Modals/TarjetasModal';
import { GettingDataLoader } from '../../components/Loaders/GettingDataLoader';
import { DataTable } from '../../components/Tables/DataTable';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { editarUsuarios } from '../../store/slices/usuarios/usuariosThunk';
import { setCurrentUser } from '../../store/slices/usuarios/usuariosSlice';
import { TarjetasUsuarioModal } from '../../components/Modals/TarjetasUsuarioModal';

interface tarjetaType {
  tarjetaId: number,
  usuarioId: number,
  nombre: string,
  numeroDeTarjeta: string,
  cvv: string,
  fechaVencimiento: Date,
  lockoutEnabled: boolean,
}

interface InitialValuesType {
  nombre : string;
  apellido: string;
  cedula: string;
  email : string;
  username : string;
  telefono : number;
  salario: number;  
  passwordHash: string;
}

export const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { tarjetas , loadingTarjetas } = useAppSelector( (state) => state.tarjetas);
  const usuario = useAppSelector( (state) => state.usuarios );
  const [data, setData] = useState<tarjetaType[]>([]);

  const initFormValues: InitialValuesType = {
    nombre : usuario.currentUser ? usuario.currentUser.nombre : '',
    apellido : usuario.currentUser ? usuario.currentUser.apellido : '',
    cedula : usuario.currentUser ? usuario.currentUser.cedula : '',
    email : usuario.currentUser ? usuario.currentUser.email : '',
    username : usuario.currentUser ? usuario.currentUser.username : '',
    telefono : usuario.currentUser ? usuario.currentUser.telefono : 0,
    salario : usuario.currentUser ? usuario.currentUser.salario : 0,
    passwordHash : '',
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

  useEffect(() => {
    if (loadingTarjetas){
      dispatch(obtenerTarjetas()); 
    } else {
      setData(tarjetas?.filter((word) => word.usuarioId == usuario.currentUser.UsuarioId));
    }
  }, [tarjetas])

  const columns: Column<tarjetaType>[] = useMemo(() => [
    {
        Header: 'Nombre De Tarjeta',
        accessor: "nombre" as keyof tarjetaType,
    },
    {
      Header: 'Numero IBAN',
      accessor: "numeroDeTarjeta" as keyof tarjetaType,
  },
    {
      Header: 'CVV',
      accessor: "cvv" as keyof tarjetaType,
  },
  {
    Header: 'Fecha Vencimiento',
    accessor: "fechaVencimiento" as keyof tarjetaType,
},
{
  Header: 'Tarjeta Bloqueada',
  accessor: "lockoutEnabled" as keyof tarjetaType,
}

  ], []);

  const tableInstance = useTable({columns, data}, usePagination, useRowSelect)


  return (
    <MainPublicLayout>
      <div className='homepage-header header-profile bg-gradient-to-r from-slate-800 to-slate-900'>
        <div className='homepgape-header-wrapper'>
          <div className='header-content animate__animated animate__fadeIn'>
            <h1 className='bg-cyan-600 rounded-lg px-3 py-1'>Perfil de usuario</h1>
          </div>
        </div>
      </div>

      <div className='main-content'>
        <h1 className='mb-5'>Información de usuario</h1>
          <Formik
            enableReinitialize
            initialValues={ initFormValues }
            validationSchema={ validationSchema }
            onSubmit={( usuarioForm ) => {
              dispatch(editarUsuarios({
                ...usuarioForm,
                usuarioId: usuario.currentUser.UsuarioId,
                rolId: usuario.currentUser.rol
              }))

              dispatch(setCurrentUser({
                UsuarioId: usuario.currentUser.UsuarioId,
                nombre: usuarioForm.nombre,
                apellido:  usuarioForm.apellido,
                cedula:  usuarioForm.cedula,
                email: usuarioForm.email,
                username: usuarioForm.username,
                telefono: usuarioForm.telefono,
                salario: usuarioForm.salario,  
                passwordHash: usuarioForm.passwordHash,
                rol: usuario.currentUser.rol,
                token:  usuario.currentUser.token,
                status: 'authenticated'
            }))
            localStorage.setItem('userLogginStatus', JSON.stringify({
                UsuarioId: usuario.currentUser.UsuarioId ,
                nombre: usuarioForm.nombre,
                apellido:  usuarioForm.apellido,
                cedula:  usuarioForm.cedula,
                email: usuarioForm.email,
                username: usuarioForm.username,
                telefono: usuarioForm.telefono,
                salario: usuarioForm.salario,  
                passwordHash: usuarioForm.passwordHash,
                rol: usuario.currentUser.rol,
                token: usuario.currentUser.token,
                status: 'authenticated'
            }));
            
            }}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <form id="userRegister" onSubmit={ handleSubmit }>
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6">
                      
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
                        <label htmlFor="apellido" className={ `block text-sm font-medium leading-6${ (errors.apellido && touched.apellido) ? ' text-red-600' : ' text-gray-900' }` }>
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
                        <label htmlFor="cedula" className={ `block text-sm font-medium leading-6${ (errors.cedula && touched.cedula) ? ' text-red-600' : ' text-gray-900' }` }>
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
                          { errors.cedula && touched.cedula && ( <span className="inline-flex text-sm text-red-700">{errors.cedula}</span> ) }
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="email" className={ `block text-sm font-medium leading-6${ (errors.email && touched.email) ? ' text-red-600' : ' text-gray-900' }` }>
                            Email
                        </label>
                        <div className="mt-2">
                          <Field
                            type="text"
                            name="email"
                            disabled
                            value={ values.email || '' }
                            onChange={ handleChange }
                            className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.email && touched.email) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                          />
                          { errors.email && touched.email && ( <span className="inline-flex text-sm text-red-700">{errors.email}</span> ) }
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="username" className={ `block text-sm font-medium leading-6${ (errors.username && touched.username) ? ' text-red-600' : ' text-gray-900' }` }>
                            Username
                        </label>
                        <div className="mt-2">
                          <Field
                            type="text"
                            name="username"
                            value={ values.username || '' }
                            onChange={ handleChange }
                            className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.username && touched.username) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                          />
                          { errors.username && touched.username && ( <span className="inline-flex text-sm text-red-700">{errors.username}</span> ) }
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="telefono" className={ `block text-sm font-medium leading-6${ (errors.telefono && touched.telefono) ? ' text-red-600' : ' text-gray-900' }` }>
                            Telefono
                        </label>
                        <div className="mt-2">
                          <Field
                            type="text"
                            name="telefono"
                            value={ values.telefono || '' }
                            onChange={ handleChange }
                            className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.telefono && touched.telefono) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                          />
                          { errors.telefono && touched.telefono && ( <span className="inline-flex text-sm text-red-700">{errors.telefono}</span> ) }
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="salario" className={ `block text-sm font-medium leading-6${ (errors.salario && touched.salario) ? ' text-red-600' : ' text-gray-900' }` }>
                            Salario
                        </label>
                        <div className="mt-2">
                          <Field
                            type="text"
                            name="salario"
                            disabled
                            value={ values.salario || '' }
                            onChange={ handleChange }
                            className={ `px-2 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.salario && touched.salario) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                          />
                          { errors.salario && touched.salario && ( <span className="inline-flex text-sm text-red-700">{errors.salario}</span> ) }
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="passwordHash" className={ `block text-sm font-medium leading-6${ (errors.passwordHash && touched.passwordHash) ? ' text-red-600' : ' text-gray-900' }` }>
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

                    </div>
                    <div className="px-0 py-3 sm:flex sm:flex-row-reverse">
                      <button type='submit' className="inline-flex w-full justify-center rounded-md bg-orange-600 hover:bg-orange-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">Editar Usuario</button>
                    </div>
                </form>
            )}
          </Formik>

        <h1 className='mb-5'>Tarjertas Asociadas</h1>
        
        <TarjetasUsuarioModal tableInstance={tableInstance}/>
        {
          loadingTarjetas ? <GettingDataLoader/> : (
            <>
              <DataTable tableInstance={tableInstance} tableOwner='tarjetas' showLabel={ false }/>
            </>
          )
        }
      </div>
    </MainPublicLayout>
  )
}
