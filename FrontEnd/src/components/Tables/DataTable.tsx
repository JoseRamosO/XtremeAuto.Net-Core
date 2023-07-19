import { useAppDispatch } from "../../hooks/reduxHooks";
import { Table, Button, TableCell, TableContainer, TableHead, TableRow, TableBody, TablePagination, TableFooter, Box} from '@mui/material';
import {  setModalDeleteOpen, setToggleModal } from "../../store/slices/userInterface/userInterface";

import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { setModalRolesLock, setModalRolesLockFalse, setModalRolesState, setToggleModalRoles } from "../../store/slices/roles/rolesSlice";
import AddIcon from '@mui/icons-material/Add';

export const DataTable = ({ tableInstance, tableOwner }) => {
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
      onPageChange(0);
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
        dispatch(setToggleModal())
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
    }
  }

  
  return (
    <>
    <div className="flex mb-10">
      <h1 className="origin-left font-medium text-3xl text-teal-700 mr-5">{ retornaPanelName() }</h1>
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
                        {cell.render('Cell')}
                      </TableCell>
                    )
                })}
                <TableCell>
                  <a className='cursor-pointer rounded-lg p-3 text-slate-50 bg-orange-600 hover:bg-orange-700 mr-2' onClick={() => { toggleAllPageRowsSelected(false); row.toggleRowSelected(); handleModalToOpenClick(1); }}>
                    <EditIcon/>
                  </a>
                  <a className='cursor-pointer rounded-lg p-3 text-slate-50 bg-green-600 hover:bg-green-700 mr-2' onClick={() => { toggleAllPageRowsSelected(false); row.toggleRowSelected(); handleModalToOpenClick(2); }}>
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