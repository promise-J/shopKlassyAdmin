import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import './layout.css'

const Layout = ({children}) => {
  return (
    <div className='layout'>
      <Sidebar />
      {children}
    </div>
  )
}

export default Layout