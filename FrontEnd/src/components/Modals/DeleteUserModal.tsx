import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setModalDeleteOpen } from "../../store/slices/userInterface/userInterface";
import { Box, Backdrop, Button, Modal, Fade,Typography } from '@mui/material';
import { eliminarUsuario } from "../../store/slices/usuarios/usuariosThunk";

export const DeleteUserModal = ({ tableInstance }) => {
  const dispatch = useAppDispatch();
  const { isModalDeleteOpen } = useAppSelector( (state) => state.userInterface);
  const { selectedFlatRows, data, setData, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;

  const onEliminar = () => {
    dispatch(eliminarUsuario(selectedFlatRows[0].original.usuarioId))
  }


  return (

    <div>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={ isModalDeleteOpen }
      onClose={() => dispatch(setModalDeleteOpen())}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={ isModalDeleteOpen }>
        <Box className='global-modal'>
          <div className='modal-header'>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Eliminar usuario
              </Typography>
          </div>
          <div>
                  <Button type='submit' variant="contained" color="error" sx={{ mr: 2 }} onClick={ onEliminar }>Si deseo eliminar</Button>
                  <Button variant="outlined" color="success" onClick={ () => dispatch(setModalDeleteOpen()) }>Cancelar</Button>
            </div>
        </Box>
      </Fade>
    </Modal>
  </div>
  )
}