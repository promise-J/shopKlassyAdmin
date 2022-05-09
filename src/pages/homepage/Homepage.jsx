import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import './homepage.css'
import HomeImg  from '../../images/payment.png'
import { publicRequest } from '../../redux/apiRequest'

const Homepage = () => {
  const initialState = {
    products: 0,
    users: 0,
    orders: 0,
    unVUsers: 0
  }

  const [data,setData] = useState(initialState)
  const {products, users, unVUsers} = data

  useEffect(()=>{
    const getStats = async()=>{
      const res = await publicRequest.get('/user/get/stats')
      const { products, users, unVUsers } = res.data
      // console.log(res.data)
      setData({...data, users, products, unVUsers})
    }
    getStats()
  },[data])


  return (
    <Layout>
      <div className='homepage'>
        <div className="homepageContainer">
          <div className="topSide">
            <div className="topSideBox">
              <h1>Users</h1>
              <h4>{users}</h4>
            </div>
            <div className="topSideBox">
              <h1>Products</h1>
              <h4>{products}</h4>
            </div>
            <div className="topSideBox">
              <h1>Un Verified Users</h1>
              <h4>{unVUsers}</h4>
            </div>
          </div>
          <div className="bottomSide">
            <h1>You are an admin in ShopKlassy</h1>
            <img src={HomeImg} alt="" />
            <img src={HomeImg} alt="" />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Homepage