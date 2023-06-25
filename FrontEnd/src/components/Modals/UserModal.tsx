import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Formik, Field } from 'formik';
import { registrarUsuario } from "../../store/slices/usuarios/usuariosThunk";
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setToggleModal } from "../../store/slices/userInterface/userInterface";
import { Box } from '@mui/material';

interface InitialValuesType {
  usuarioId: number;
  nombre : string;
  apellido : string;
  cedula: number;
  email : string;
  rolId: number;
  username : string;
  telefono : number;
  salario: number;   
}

export const UserModal = ({ tableInstance }) => {
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector( (state) => state.userInterface);
  const { selectedFlatRows, data, setData, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;

  const initFormValues: InitialValuesType = {
    usuarioId: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.nombre : '',
    nombre : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.nombre : '',
    apellido : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.nombre : '',
    cedula: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.nombre : '',
    email : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.nombre : '',
    rolId: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.nombre : '',
    username : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.nombre : '',
    telefono : selectedFlatRows.length === 1 ? selectedFlatRows[0].original.nombre : '',
    salario: selectedFlatRows.length === 1 ? selectedFlatRows[0].original.nombre : '', 
    
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
    <>
      <Modal 
          open={isModalOpen}
          onClose={() => dispatch(setToggleModal())}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"    
      >
        {/* <Modal.Header closeButton>
          {selectedFlatRows.length === 1 ? 'Editar Usuario' : 'Agregar Usuario'}
        </Modal.Header> */}
        <Box>
          <Formik
            enableReinitialize
            initialValues={ initFormValues }
            validationSchema={ validationSchema }
            onSubmit={({ usuarioId, nombre, apellido, cedula, email, rolId, username, telefono, salario }) => {
              dispatch(registrarUsuario({
                usuarioId,
                nombre,
                apellido,
                cedula,
                email,
                rolId,
                username,
                telefono,
                salario  
              }))
            }}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <form id="userRegister" onSubmit={ handleSubmit }>
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option value={ 0 } >Administrador</option>
                              <option value={ 1 } >Vendedor</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                {/* <Modal.Footer className="pl-0 pr-0 pb-0">
                  <Button variant="contained">Guardar Nuevo Usuario</Button>
                  <Button variant="contained" onClick={ () => dispatch(setToggleModal()) }>Cancelar</Button>
                </Modal.Footer> */}
              </form>
            )}
          </Formik>
          </Box>
      </Modal>
    </>
  )
}