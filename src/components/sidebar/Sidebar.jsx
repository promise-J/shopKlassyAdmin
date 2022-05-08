import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import './sidebar.css'
import { logout } from '../../redux/apiCalls'
import {AiOutlineHome} from 'react-icons/ai'
import {AiOutlineShop} from 'react-icons/ai'
import {BiUserPlus} from 'react-icons/bi'
import {AiOutlineUsergroupAdd} from 'react-icons/ai'
import {BsShop} from 'react-icons/bs'
import {GrOrderedList} from 'react-icons/gr'

const Sidebar = () => {

  const location = useLocation().pathname
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isLogged} = useSelector(state=> state.user)

  const handleLogout = async()=>{
    logout(dispatch)
    navigate('/login')
}

  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <Link to='/dashboard'><h2>ShopKlassy Dashboard</h2></Link>
        <ul className="sidebarLists">
          <li className={location==='/dashboard' ? 'sidebarList active' : 'sidebarList'}>
          <Link className='link' to='/dashboard'>Home page </Link><AiOutlineHome style={{marginLeft: 8}} />
          </li>
          <li className={location==='/newUser' ? 'sidebarList active' : 'sidebarList'}>
          <Link className='link' to='/newUser'>New User</Link><BiUserPlus style={{marginLeft: 8}} />
          </li>
          <li className={location==='/users' ? 'sidebarList active' : 'sidebarList'}>
          <Link className='link' to='/users'>Users</Link><AiOutlineUsergroupAdd style={{marginLeft: 8}} />
          </li>
          <li className={location==='/newProduct' ? 'sidebarList active' : 'sidebarList'}>
          <Link className='link' to='/newProduct'>New Product</Link><AiOutlineShop style={{marginLeft: 8}} />
          </li>
          <li className={location==='/products' ? 'sidebarList active' : 'sidebarList'} >
          <Link className='link' to='/products'>Products </Link><BsShop style={{marginLeft: 8}} />
          </li>
          <li className={location==='/orders' ? 'sidebarList active' : 'sidebarList'}>
          <Link className='link' to='/orders'>Orders</Link><GrOrderedList style={{marginLeft: 8}} />
          </li>
          {isLogged && <li onClick={handleLogout} className='sidebarList'>
          <Link className='link' to='/orders'>Logout</Link>
          </li>}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar