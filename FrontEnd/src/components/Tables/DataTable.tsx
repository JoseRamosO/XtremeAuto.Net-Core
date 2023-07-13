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

export const DataTable = ({ tableInstance } ) => {
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

  return (
    <TableContainer>
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
                  <Button sx={{ bgcolor: 'warning.main', color: 'white' }} onClick={() => { toggleAllPageRowsSelected(false); row.toggleRowSelected(); dispatch(setToggleModal())} }>
                    <EditIcon/>
                  </Button>
                  <Button sx={{ bgcolor: 'success.main', color: 'white' }} onClick={() => { toggleAllPageRowsSelected(false); row.toggleRowSelected(); dispatch(setToggleModal())} }>
                    <VisibilityIcon/>
                  </Button>
                  <Button sx={{ bgcolor: 'error.main', color: 'white' }} onClick={() => { toggleAllPageRowsSelected(false); row.toggleRowSelected(); dispatch(setModalDeleteOpen())} }>
                    <DeleteIcon/>
                  </Button>
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
      />
    </TableContainer>
  )
}