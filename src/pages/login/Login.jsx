import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../redux/apiCalls'
import './login.css'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {error} = useSelector(state=> state.user)
  const [data, setData] = useState({email: '', password: ''})
  const {email, password} = data


  const handleSubmit = (e)=>{
    e.preventDefault()  
    try {
      console.log(email, password)
      login(dispatch, data)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='login'>
      <div className="loginWrapper">
        <h2>Log in As Admin</h2>
        <form onSubmit={handleSubmit}>
          {error && <span style={{color: 'red', fontSize: 13, fontStyle: 'italic'}}>{error}</span>}
          <input value={email} onChange={(e)=> setData({...data, email: e.target.value})} type="text" placeholder='Enter Email' />
          <input value={password} onChange={(e)=> setData({...data, password: e.target.value})} type="text" placeholder='Enter password' />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login