import React from 'react'
import { useTable, usePagination } from 'react-table'
import './dataTable.css'
 
 function DataTable({ products, productColumns, loading }) {
   const data = React.useMemo(
     () => products,
     [products])
 
   const columns = React.useMemo(
     () => productColumns,
     [productColumns])


   const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // setPageSize,
    state: { pageIndex,
      //  pageSize
       },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  )
 
  //  const {
  //    getTableProps,
  //    getTableBodyProps,
  //    headerGroups,
  //    rows,
  //    prepareRow,
  //  } = useTable({ columns, data }, useSortBy)

 
   if(loading){
     return <h1 style={{opacity: .4}}>Please Wait!</h1>
   }
   if(data.length < 1){
     return <h1 style={{opacity: .4}}>Opps! There is no Record!</h1>
   }
   return (
     <div className='data-table'>
     <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 1px purple',
                   background: 'aliceblue',
                   color: 'purple',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {page.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       fontSize: 13
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
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
      </div>
     </div>
   )
 }

 export default DataTable
