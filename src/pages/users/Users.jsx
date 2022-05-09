import React, { useState, useEffect, useMemo } from 'react'
import Layout from '../../components/layout/Layout'
import './users.css'
import { publicRequest } from '../../redux/apiRequest'
import DataTable from '../../components/table/DataTable';
import {BiEditAlt} from 'react-icons/bi'
import {MdDeleteOutline} from 'react-icons/md'
import { Link } from 'react-router-dom';



const Users = () => {
  const [users, setUsers] = useState([])

  const handleDelete = (e)=>{
    // setUsers(users.filter(user=> user.id!== e.id))
  }

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Username',
        accessor: 'username', // accessor is the "key" in the data
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Action',
        accessor: (originalRow, rowIndex) => (
           <div style={{display: 'flex', justifyContent: 'space-around'}}>
               <Link to={`/user/${originalRow.id}`} className='link'><button style={{border: 'none', padding: '0 3px', cursor: 'pointer'}} onClick={() => handleEdit(originalRow)}><BiEditAlt /></button></Link>
               {/* <button style={{border: 'none', padding: '0 3px', cursor: 'pointer'}} onClick={() => handleDelete(originalRow)}><MdDeleteOutline /></button> */}
               <button style={{border: 'none', padding: '0 3px', cursor: 'pointer'}} onClick={(originalRow) => {
                 setUsers(users.filter(user=> user.id !== originalRow.id))
               }}><MdDeleteOutline /></button>
           </div>
        ),
        id: 'action',
      },
    ],
    [users]
  )


  // const tableInstance = useTable({ columns, data })

  useEffect(() => {
    const getUsers = async () => {
      const res = await publicRequest.get('/user')
      setUsers(res.data)
    }
    getUsers()
  }, [])

  const handleEdit = (e)=> {

  }

  




  return (
    <Layout>
      <div className='users'>
        <div className="usersWrapper">
        <h2>View Users</h2>
        <DataTable products={users} productColumns={columns} pathRoute='user' />
        </div>
      </div>
    </Layout>
  )
}

export default Users