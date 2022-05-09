import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import './newUser.css'
import { publicRequest } from '../../redux/apiRequest'
import {useNavigate} from 'react-router-dom'

const NewUser = () => {
  const navigate = useNavigate()

  const initialState = {
    img: null,
    username: '',
    email: '',
    status: 'pending',
  }

  const [data, setData] = useState(initialState)
  const [imgLoad, setImgLoad] = useState(false)

  const [imgPrev, setImgPrev] = useState('')
  const [imgErr, setImgErr] = useState('')

  const { img, username, email, status } = data

  const handleImgChange = (e) => {
    const file = e.target.files[0]
    if (file.size > 1024 * 1024) {
      setData({ ...data, img: null })
      setImgPrev('')
      return setImgErr('file too large')
    }
    if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
      setData({ ...data, img: null })
      setImgPrev('')
      return setImgErr('Image format not allowed')
    }
    setImgErr('')
    setData({ ...data, img: file })
    setImgPrev(URL.createObjectURL(file))
  }

 
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
        let formData = new FormData()
        formData.append('file', img)
        if(img){
            const registerUser = async()=>{
            setImgLoad(true)
            const res = await publicRequest.post('/api/upload_avatar', formData)
            console.log(res.data)
            if(res.status===200){
                await publicRequest.post('/auth/register', {
                  password: 'password',
                  username,
                  email,
                  status,
                  img: res.data.secure_url,
                  publicId: res.data.public_id,
                })
                // setData({...data, img: null})

                // setImgPrev('')
                // setImgLoad(false)
                // setData({...initialState})
                navigate('/users')
            }
            setData({...initialState})
          }
          return registerUser()
        }
        await publicRequest.post('/auth/register', {
          password: 'password',
          username,
          email,
          status
        })
        navigate('/users')
    } catch (error) {
            // setData({...initialState})
            console.log(error)
        }
}

  return (
    <Layout>
      <div className='newUser'>
        <div className="newUserWrapper">
          <form onSubmit={handleSubmit} className="newUserForm">
            <h4>Create New User</h4>
            {imgLoad && <span style={{marginLeft: 40, fontSize: 13, fontStyle: 'italic', color: 'green'}}>Loading...</span>}
            {imgErr && <span style={{ marginLeft: 40, fontSize: 13, fontStyle: 'italic', color: 'red' }}>{imgErr}</span>}
            <div className="formItems">
              <input type="text" onChange={(e) => setData({ ...data, username: e.target.value })} value={username} placeholder='Username' />
              <input type="text" onChange={(e) => setData({ ...data, email: e.target.value })} value={email} placeholder='email' />
              
              <input type="file" onChange={handleImgChange} />
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px' }}>
                <span style={{ fontSize: 12 }}>STATUS</span>
                <select defaultValue={status} onChange={(e)=> setData({...data, status: e.target.value})} style={{ width: '100%', padding: 4, background: 'rgb(244, 234, 247)' }}>
                  <option value='pending'>Pending</option>
                  <option value='active'>Active</option>
                </select>
              </div>
              {imgPrev && <img src={imgPrev} alt="" />}
              <button type='submit'>CREATE</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default NewUser