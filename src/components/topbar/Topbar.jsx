import React, { useState } from 'react'
import './topbar.css'
import { RiMenuFoldLine } from 'react-icons/ri'
import { GrClose } from 'react-icons/gr'
import { AiOutlineHome } from 'react-icons/ai'
import { BiUserPlus } from 'react-icons/bi'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { AiOutlineShop } from 'react-icons/ai'
import { BsShop } from 'react-icons/bs'
import { GrOrderedList } from 'react-icons/gr'


import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/apiCalls'

const Topbar = () => {
    const location = useLocation().pathname
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)
    const { currentUser, isLogged } = useSelector(state => state.user)

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    const closeToggle = () => {
        setIsOpen(false)
    }

    const handleLogout = async () => {
        setIsOpen(true)
        logout(dispatch)
        navigate('/login')
    }


    return (
        <div className='topbar'>
            <div className="menuList" style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-150vw)' }}>
                <GrClose style={{ position: 'absolute', cursor: 'pointer', top: 44, right: 44, fontSize: 20, color: 'purple' }} onClick={() => setIsOpen(!isOpen)} />
                <div className="menuListWrapper">
                    <h2>ShopKlass Admin</h2>
                    <div className="menuListContent">
                        <div className="profileMenu">
                            <img src={currentUser?.img} alt="" />
                            <span>Welcome {currentUser?.username}</span>
                        </div>
                        <div className="profileContent">
                            <ul>
                                <li className={location === '/dashboard' ? 'sidebarList active' : 'sidebarList'} onClick={()=> closeToggle()}>
                                    <Link className='link' to='/dashboard'>Home page </Link><AiOutlineHome style={{ marginLeft: 8 }} />
                                </li>
                                <li className={location === '/newUser' ? 'sidebarList active' : 'sidebarList'} onClick={()=> closeToggle()}>
                                    <Link className='link' to='/newUser'>New User</Link><BiUserPlus style={{ marginLeft: 8 }} />
                                </li>
                                <li className={location === '/users' ? 'sidebarList active' : 'sidebarList'} onClick={()=> closeToggle()}>
                                    <Link className='link' to='/users'>Users</Link><AiOutlineUsergroupAdd style={{ marginLeft: 8 }} />
                                </li>
                                <li className={location === '/newProduct' ? 'sidebarList active' : 'sidebarList'} onClick={()=> closeToggle()}>
                                    <Link className='link' to='/newProduct'>New Product</Link><AiOutlineShop style={{ marginLeft: 8 }} />
                                </li>
                                <li className={location === '/products' ? 'sidebarList active' : 'sidebarList'} onClick={()=> closeToggle()}>
                                    <Link className='link' to='/products'>Products </Link><BsShop style={{ marginLeft: 8 }} />
                                </li>
                                <li className={location === '/orders' ? 'sidebarList active' : 'sidebarList'} onClick={()=> closeToggle()}>
                                    <Link className='link' to='/orders'>Orders</Link><GrOrderedList style={{ marginLeft: 8 }} />
                                </li>
                                {isLogged && <li onClick={handleLogout} className='sidebarList'>
                                    <Link className='link' to='/orders'>Logout</Link>
                                </li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="topbarLeft">
                <span>ShopKlassy</span>
            </div>
            <div className="topbarRight">
                {!isOpen &&
                    // <GrClose onClick={handleToggle} style={{ marginRight: 40, cursor: 'pointer', fontWeight: 600 }} /> 
                    <RiMenuFoldLine onClick={handleToggle} style={{ fontSize: 21, marginRight: 40, cursor: 'pointer', fontWeight: 600 }} />
                }
            </div>
        </div>
    )
}

export default Topbar