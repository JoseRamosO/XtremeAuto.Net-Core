// import { Button, Pagination, Table } from "flowbite-react";
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setToggleModal } from "../../store/slices/userInterface/userInterface";

export const DataTable = ({ tableInstance } ) => {
  const dispatch = useAppDispatch();
  const { getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    rows, 
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    toggleAllPageRowsSelected,
    state: { pageIndex, pageSize, selectedRowIds },
  } = tableInstance;
  
  return (
    <>
      <Button onClick={ () => {
         toggleAllPageRowsSelected(false);
        dispatch(setToggleModal());
      }}>
          Agregar Nuevo Usuario
      </Button>
    <Table {...getTableProps()} striped bordered hover>
      {headerGroups.map(headerGroup => (
        <thead {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps()}>
              {column.render('Header')}
            </th>
          ))}
          <th>
            Opciones
          </th>
        </thead>
      ))}

      <tbody {...getTableBodyProps()}>
        {page.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
              <td>
                <button onClick={() => {
                    toggleAllPageRowsSelected(false);
                    row.toggleRowSelected();
                    dispatch(setToggleModal())
                  }} className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Edit
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 15].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <table className="table-auto">
  <thead>
    <tr>
      <th>Song</th>
      <th>Artist</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
    <tr>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
    </tr>
    <tr>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
    </tr>
  </tbody>
</table>
      </>
  )
}