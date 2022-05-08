import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import './user.css'
import { publicRequest } from '../../redux/apiRequest'

const User = () => {
  const { id } = useParams()

  const initialState = {
    status: '',
    email: '',
    username: '',
    isAdmin: '',
    img: null
  }

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(initialState)
  const [imgPrev, setImgPrev] = useState('')
  const [imgLoad, setImgLoad] = useState(false)
  const [imgErr, setImgErr] = useState('')
  const [initialUser, setInitialUser] = useState(initialState)
  const { img, isAdmin, username, email, status } = user

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true)
      const { data } = await publicRequest.get(`/user/find/${id}`)
      setUser({
        status: data.status,
        email: data.email,
        username: data.username,
        isAdmin: data.isAdmin,
      })
      setInitialUser(data)
      setLoading(false)
    }
    getProduct()
  }, [id, setLoading])

  const handleImgChange = async (e) => {
    const file = e.target.files[0]
    if (file.size > 1024 * 1024) {
      setUser({ ...user, img: null })
      setImgPrev('')
      return setImgErr('file too large')
    }
    if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
      setUser({ ...user, img: null })
      setImgPrev('')
      return setImgErr('Image format not allowed')
    }
    setImgErr('')
    setUser({ ...user, img: file })
    setImgPrev(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (img) {
        const requestWithImg = async () => {
          let formData = new FormData()
          formData.append('file', img)
          setImgLoad(true)
          const res = await publicRequest.post('/api/upload_avatar', formData)
          console.log(res)
          if (res.status === 200) {
            const response = await publicRequest.put(`/user/${id}`, {
              status,
              email,
              username,
              isAdmin,
              img: res.data.secure_url,
              publicId: res.data.public_id,
            })
            if (response.status === 200) {
              setInitialUser(response.data)
              setImgPrev('')
              setUser({ ...user, img: null })
            }
            // console.log(res)
            // setData({...data, img: null})
            // setImgPrev('')
            setImgLoad(false)
            // setData({...initialState})
            // navigate('/products')
          }
        }
        return requestWithImg()
        // set({...initialState})
      }
      setImgLoad(true)
      const res = await publicRequest.put(`/user/${id}`, {
        status,
        email,
        username,
        isAdmin,
        img: user.img
      })
      if (res.status === 200) {
        setInitialUser(res.data)
        // setImgPrev('')
        // setProduct({...product, img: null})
      }
      setImgLoad(false)
    } catch (error) {
      console.log(error)
    }
  }


  if (loading) {
    return (
      <Layout>
        <div className="product">
          <div className="productWrapper">
            <h2 style={{ fontWeight: 100, margin: 'auto' }}>Please Wait!  Loading...</h2>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className='user'>
        <div className="userWrapper">
          <div className="userLeft">
            <h4>User Details</h4>
            <div className="divLeftInfos">
              <div className="divLeftInfo">
                <span>ID</span>
                <span>{initialUser?.id}</span>
              </div>
              <div className="divLeftInfo">
                <span>Username</span>
                <span>{initialUser?.username}</span>
              </div>
              <div className="divLeftInfo">
                <span>Email</span>
                <span>{initialUser?.email}</span>
              </div>
              <div className="divLeftInfo">
                <span>Status</span>
                <span>{initialUser?.status}</span>
              </div>
              <div className="divLeftInfo">
                <span>Admin</span>
                <span>{initialUser?.isAdmin===true ? 'Yes': 'No'}</span>
              </div>

              <div className="divLeftInfo">
                {imgLoad ? <h2 style={{ fontWeight: 100, fontStyle: 'italic', fontSize: 17 }}>Loading...</h2> : <img src={initialUser?.img} alt="" />}
              </div>
            </div>
          </div>
          <div className="userRight">
            <div className="divRightInfos">
              <h4>Edit Here</h4>
              <form className="divRightInfos" onSubmit={handleSubmit}>
                <div className="divRightInfo">
                  <span><span style={{ fontWeight: 600 }}>ID: </span>{user?.id}</span>
                </div>
                <div className="divRightInfo">
                  <span>Username</span>
                  <input type="text" placeholder='Title' value={username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                </div>
                <div className="divRightInfo">
                  <span>Email</span>
                  <input type="text" placeholder='Description' value={email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>
                <div className="divRightInfo">
                  <span>Status</span>
                  <select defaultValue={status} onChange={(e) => setUser({ ...user, status: e.target.value })}>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                  </select>                
                  </div>
                <div className="divRightInfo">
                  <span>Is Admin</span>
                  {/* <input type="text" placeholder='Description' /> */}
                  <select defaultValue={isAdmin} onChange={(e) => setUser({ ...user, isAdmin: e.target.value === 'yes' ? true : false })}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                {imgPrev && <div className="divRightInfo">
                  <img src={imgPrev} alt="" />
                </div>
                }
                <div className="divRightInfo">
                  {!imgPrev && <span>Image</span>}
                  <input type="file" onChange={handleImgChange} />
                </div>
                <div className="divRightInfo">
                  <button type='submit'>{imgLoad ? 'Loading...' : 'Save'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default User