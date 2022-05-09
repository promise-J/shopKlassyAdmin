import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Layout from '../../components/layout/Layout'
import './users.css'
import { publicRequest } from '../../redux/apiRequest'
import DataTable from '../../components/table/DataTable';
import {BiEditAlt} from 'react-icons/bi'
import {MdDeleteOutline} from 'react-icons/md'
import { Link } from 'react-router-dom';



const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  
  const handleDelete = useCallback(async(e)=>{
    setUsers(users.filter(user=> user.id!==e.id))
    await publicRequest.delete(`/user/${e.id}`)
  },[users])

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: (originalRow, rowIndex) => (
           <span style={{fontSize: 12}}>{originalRow.id.slice(0, 8) + '...'}</span>
        )
      },
      {
        Header: 'Username',
        accessor: 'username', // accessor is the "key" in the data
      },
      {
        Header: 'Email',
        accessor: (originalRow, rowIndex) => (
           <span style={{fontSize: 12}}>{originalRow.email.slice(0, 8) + '...'}</span>
        )
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Action',
        accessor: (originalRow, rowIndex) => (
           <div style={{display: 'flex', justifyContent: 'space-around'}}>
               <Link to={`/user/${originalRow.id}`} className='link'><button style={{border: 'none', padding: '0 3px', cursor: 'pointer'}} ><BiEditAlt /></button></Link>
               {/* <button style={{border: 'none', padding: '0 3px', cursor: 'pointer'}} onClick={() => handleDelete(originalRow)}><MdDeleteOutline /></button> */}
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
    const getUsers = async () => {
      setLoading(true)
      const res = await publicRequest.get('/user')
      setUsers(res.data)
      setLoading(false)
    }
    getUsers()
  }, [])

 

  return (
    <Layout>
      <div className='users'>
        <div className="usersWrapper">
        {users.length > 1 && <h2>View Users</h2>}
        <DataTable products={users} productColumns={columns} pathRoute='user' loading={loading} />
        </div>
      </div>
    </Layout>
  )
}

export default Users