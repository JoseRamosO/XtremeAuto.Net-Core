import { useAppDispatch } from "../../hooks/reduxHooks";
import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody, TablePagination, Box} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { setModalRolesState, setToggleModalRoles } from "../../store/slices/roles/rolesSlice";
import AddIcon from '@mui/icons-material/Add';
import { setModalUsersState, setToggleModalUsers } from "../../store/slices/usuarios/usuariosSlice";
import { setModalColoresState, setToggleModalColores } from "../../store/slices/colores/coloresSlice";
import { setModalAutosState, setToggleModalAutos } from "../../store/slices/autos/autosSlice";
import { setModalRuedasState, setToggleModalRuedas } from "../../store/slices/ruedas/ruedasSlice";
import { setModalTransaccionesState, setToggleModalTransacciones } from "../../store/slices/transacciones/transaccionesSlice";
import {setModalSegurosState, setToggleModalSeguros } from "../../store/slices/seguros/segurosSlice";
import { setModalTarjetasState, setToggleModalTarjetas } from "../../store/slices/tarjetas/tarjetasSlice";
import { setModalCarroVendidosState, setToggleModalCarroVendidos } from "../../store/slices/carrovendidos/carrovendidosSlice";
import { setModalVentasState, setToggleModalVentas } from "../../store/slices/ventas/ventasSlice";




export const DataTable = ({ tableInstance, tableOwner, showLabel }) => {
  const dispatch = useAppDispatch();
  const { getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    prepareRow,
    onPageChange,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    toggleAllPageRowsSelected,
    state: { pageIndex, pageSize },
  } = tableInstance;
  
  const handleChangeRowsPerPage = (e) => {
    setPageSize(parseInt(e.target.value, 10));
    gotoPage(0)
  };

  const CustomPaginationActions = () =>  {
    const handleFirstPageButtonClick = () => {
      gotoPage(0)
    };
  
    const handleBackButtonClick = () => {
      previousPage();
    };
  
    const handleNextButtonClick = () => {
      nextPage();
    };
  
    const handleLastPageButtonClick = () => {
      gotoPage(pageCount - 1)
    };
  
    return (
      <Box sx={{ width: '250px' }}>
        <IconButton onClick={ handleFirstPageButtonClick } disabled={ !canPreviousPage }><FirstPageIcon /></IconButton>
        <IconButton onClick={ handleBackButtonClick } disabled={ !canPreviousPage }><KeyboardArrowLeft /></IconButton>
        <IconButton onClick={ handleNextButtonClick } disabled={ !canNextPage }><KeyboardArrowRight /></IconButton>
        <IconButton onClick={ handleLastPageButtonClick } disabled={ !canNextPage }><LastPageIcon /></IconButton>
      </Box>
    );
  }

  const handleModalToOpenClick = ( modalType ) => {
    switch (tableOwner) {
      case 'roles':
        dispatch(setModalRolesState(modalType))
        dispatch(setToggleModalRoles())
      break;
      case 'usuarios':
        dispatch(setModalUsersState(modalType))
        dispatch(setToggleModalUsers())
      break;
      case 'colores':
        dispatch(setModalColoresState(modalType))
        dispatch(setToggleModalColores())
      break;
      case 'autos':
        dispatch(setModalAutosState(modalType))
        dispatch(setToggleModalAutos())
      break;
      case 'ruedas':
        dispatch(setModalRuedasState(modalType))
        dispatch(setToggleModalRuedas())
      break;
      case 'tarjetas':
        dispatch(setModalTarjetasState(modalType))
        dispatch(setToggleModalTarjetas())
      break;
      case 'seguros':
        dispatch(setModalSegurosState(modalType))
        dispatch(setToggleModalSeguros())
      break;
      case 'carrovendidos':
        dispatch(setModalCarroVendidosState(modalType))
        dispatch(setToggleModalCarroVendidos())
      break;
      case 'ventas':
        dispatch(setModalVentasState(modalType))
        dispatch(setToggleModalVentas())
      break;
      case 'transacciones':
        dispatch(setModalTransaccionesState(modalType))
        dispatch(setToggleModalTransacciones())
      break;
    }
  }
  
  const retornaPanelName = () => {
    switch (tableOwner) {
      case 'roles':
       return 'Panel Roles';
      break;
      case 'usuarios':
        return 'Panel Usuarios';
      break;
      case 'colores':
        return 'Panel Colores';
      break;
      case 'autos':
        return 'Panel Autos';
      break;
      case 'ruedas':
        return 'Panel Ruedas';
      break;
      case 'transacciones':
        return 'Panel Transacciones';
      break;
      case 'seguros':
        return 'Panel Seguros';
      break;
      case 'tarjetas':
        return 'Panel Tarjetas';
      break;
      case 'ventas':
        return 'Panel Ventas';
      break;
      case 'carrovendidos':
        return 'Panel Carro Vendidos';
      break;
    }
  }

  
  return (
    <>
    <div className="flex mb-10">
      {
        showLabel && <h1 className="origin-left font-medium text-3xl text-teal-700 mr-5">{ retornaPanelName() }</h1>
      }
      <button onClick={() => { toggleAllPageRowsSelected(false); handleModalToOpenClick(0)}} className="flex space-x-3 items-center px-4 py-2 bg-teal-500 hover:bg-teal-800 rounded-lg drop-shadow-md duration-300">
        <AddIcon className="text-white"/>
        <span className="text-white text-xl font-bold">Agregar Nuevo</span>
      </button>
    </div>
    
    <TableContainer className='utility-table'>
      <Table {...getTableProps()}>
        { headerGroups.map(headerGroup => (
          <TableHead {...headerGroup.getHeaderGroupProps()}>
            <TableRow>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
              <TableCell>
                Opciones
              </TableCell>
            </TableRow>
          </TableHead>
        ))}
        <TableBody {...getTableBodyProps()}>
          { page.map(row => {
            prepareRow(row)
            
            return (
              <TableRow {...row.getRowProps()}>
                { row.cells.map(cell => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {
                          ( cell.column.id == 'imagen' ) ? (
                           <img className="w-12 h-12 rounded-md" src={ `http://localhost:5088${cell.value }` }/>
                          ) : (
                            cell.render('Cell')
                          )
                        
                        }
                      </TableCell>
                    )
                })}
                <TableCell>
                  <a className='cursor-pointer rounded-lg p-3 text-slate-50 bg-orange-600 hover:bg-orange-700 mr-2' onClick={() => { toggleAllPageRowsSelected(false); row.toggleRowSelected(); handleModalToOpenClick(1); }}>
                    <EditIcon/>
                  </a>
                  <a  className='cursor-pointer rounded-lg p-3 text-slate-50 bg-green-600 hover:bg-green-700 mr-2' onClick={() => { toggleAllPageRowsSelected(false); row.toggleRowSelected(); handleModalToOpenClick(2); }}>
                    <VisibilityIcon/>
                  </a>
                  <a className='cursor-pointer rounded-lg p-3 text-slate-50 bg-red-600 hover:bg-red-700' onClick={() => { toggleAllPageRowsSelected(false); row.toggleRowSelected(); handleModalToOpenClick(3); }}>
                    <DeleteIcon/>
                  </a>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <TablePagination
        component='div'
        count={pageCount}
        page={pageIndex}
        onPageChange={(newPage) => gotoPage(newPage)}
        rowsPerPage={ pageSize }
        rowsPerPageOptions={[5, 10, 15]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={ CustomPaginationActions  }
        nextIconButtonProps={{ disabled: canNextPage }}
        backIconButtonProps={{ disabled: canPreviousPage }}
        className='utility-pagination'
      />
    </TableContainer>
    </>
  )
}