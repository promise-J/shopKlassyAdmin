import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Layout from '../../components/layout/Layout'
import './products.css'
import { publicRequest } from '../../redux/apiRequest'
import DataTable from '../../components/table/DataTable';
import {BiEditAlt} from 'react-icons/bi'
import {MdDeleteOutline} from 'react-icons/md'
import { Link } from 'react-router-dom';



const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const handleDelete = useCallback(async(e)=>{
    try {
      setProducts(products.filter(product=> product.id!==e.id))
      await publicRequest.delete(`/product/${e.id}`)
    } catch (error) {
      console.log(error)
    }
  },[products])



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
        Header: 'Image',
        accessor: (originalRow, rowIndex)=>(
          <img style={{width: 14, height: 14, objectFit: 'contain'}} src={originalRow.img} alt='' />
        )
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
               <Link to={`/product/${originalRow.id}`} className='link'><button style={{border: 'none', padding: '0 3px', cursor: 'pointer'}} ><BiEditAlt /></button></Link>
               <button style={{border: 'none', padding: '0 3px', cursor: 'pointer'}} onClick={() => handleDelete(originalRow)}><MdDeleteOutline /></button>
           </div>
        ),
        id: 'action',
      },

    ],
    [handleDelete]
  )


  // const tableInstance = useTable({ columns, data })

  
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      const res = await publicRequest.get('/product')
      setProducts(res.data)
      setLoading(false)
    }
    getProducts()
  }, [])


  return (
    <Layout>
      <div className='products'>
        <div className="productsWrapper">
        {products.length > 1 && <h2>View Products</h2>}
        {/* <Link to='/newProduct'>Create</Link> */}
        {/* <DataTable columns={columns} data={data} /> */}
        <DataTable products={products} productColumns={columns} pathRoute='product' loading={loading} />
        </div>
      </div>
    </Layout>
  )
}

export default Products