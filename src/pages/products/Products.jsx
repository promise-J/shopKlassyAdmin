import React, { useState, useEffect, useMemo } from 'react'
import Layout from '../../components/layout/Layout'
import './products.css'
import { publicRequest } from '../../redux/apiRequest'
import DataTable from '../../components/table/DataTable';
import {BiEditAlt} from 'react-icons/bi'
import {MdDeleteOutline} from 'react-icons/md'
import { Link } from 'react-router-dom';



const Products = () => {
  const [products, setProducts] = useState([])

  // const handleDelete = async(e)=>{
  //   setProducts(products.filter(product=> product.id !== e))
  // }
  const handleEdit = async(e)=>{
    
  }


  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: (originalRow, rowIndex) => (
           <span style={{fontSize: 12}}>{originalRow.id.slice(0, 8) + '...'}</span>
        )
      },
      {
        Header: 'Title',
        accessor: 'title', // accessor is the "key" in the data
      },
      {
        Header: 'Description',
        accessor: (originalRow, rowIndex) => (
           <span style={{fontSize: 12}}>{originalRow.desc.length > 16 ? originalRow.desc.slice(0, 16) + '...' : originalRow.desc}</span>
        )
      },
      {
        Header: 'Price',
        accessor: (originalRow, rowIndex)=>(
          <span>{'$' + originalRow.price}</span>
        ),
      },
      {
        Header: 'Available',
        accessor: (originalRow, rowIndex) => (
           <span style={{fontSize: 12}}>{originalRow.inStock === true ? 'Yes':'No'}</span>
        )
      },
      {
        Header: 'Action',
        accessor: (originalRow, rowIndex) => (
           <div style={{display: 'flex', justifyContent: 'space-around'}}>
               <Link to={`/product/${originalRow.id}`} className='link'><button style={{border: 'none', padding: '0 3px', cursor: 'pointer'}} onClick={() => handleEdit(originalRow)}><BiEditAlt /></button></Link>
               <button style={{border: 'none', padding: '0 3px', cursor: 'pointer'}} onClick={() => handleDelete(originalRow.id)}><MdDeleteOutline /></button>
           </div>
        ),
        id: 'action',
      },

    ],
    []
  )

  const handleDelete = (e)=>{
    
  }

  // const tableInstance = useTable({ columns, data })

  
  useEffect(() => {
    const getProducts = async () => {
      const res = await publicRequest.get('/product')
      setProducts(res.data)
    }
    getProducts()
  }, [])
  return (
    <Layout>
      <div className='products'>
        <div className="productsWrapper">
        {products.length < 1 ? <h2>Loading Products...</h2> : <h2>View Products</h2>}
        {/* <Link to='/newProduct'>Create</Link> */}
        {/* <DataTable columns={columns} data={data} /> */}
        <DataTable products={products} productColumns={columns} pathRoute='product' />
        </div>
      </div>
    </Layout>
  )
}

export default Products