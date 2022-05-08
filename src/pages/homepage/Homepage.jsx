import React from 'react'
import Layout from '../../components/layout/Layout'
import './homepage.css'
import HomeImg  from '../../images/payment.png'

const Homepage = () => {
  return (
    <Layout>
      <div className='homepage'>
        <div className="homepageContainer">
          <div className="topSide">
            <div className="topSideBox">
              <h1>Users</h1>
              <h4>45</h4>
            </div>
            <div className="topSideBox">
              <h1>Products</h1>
              <h4>45</h4>
            </div>
            <div className="topSideBox">
              <h1>Orders</h1>
              <h4>45</h4>
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