import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import { publicRequest } from '../../redux/apiRequest'
import './product.css'

const Product = () => {

  const initialState = {
    title: '',
    desc: '',
    color: [],
    size: [],
    categories: [],
    inStock: '',
    img: null,
    price: 0
  }

  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState(initialState)
  const [imgPrev, setImgPrev] = useState('')
  const [imgLoad, setImgLoad] = useState(false)
  const [imgErr, setImgErr] = useState('')
  const [initialProduct, setInitialProduct] = useState(initialState)
  const { img, size, categories, color, title, price, desc, inStock } = product

  const { id } = useParams()

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true)
      const { data } = await publicRequest.get(`/product/find/${id}`)
      setProduct({
        title: data.title,
        desc: data.desc,
        price: data.price,
        size: data.size,
        color: data.color,
        categories: data.categories,
        inStock: data.inStock
      })
      setInitialProduct(data)
      setLoading(false)
    }
    getProduct()
  }, [id, setLoading])


  // const handleSubmit = (e)=>{
  //   e.preventDefault()
  //   console.log({categories, color, size})
  // }

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
            const response = await publicRequest.put(`/product/${id}`, {
              desc,
              inStock,
              title,
              color,
              categories,
              size,
              img: res.data.secure_url,
              publicId: res.data.public_id,
              price
            })
            if (response.status === 200) {
              setInitialProduct(response.data)
              setImgPrev('')
              setProduct({ ...product, img: null })
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
      const res = await publicRequest.put(`/product/${id}`, {
        desc,
        inStock,
        title,
        color,
        categories,
        size,
        price,
        img: product.img
      })
      if (res.status === 200) {
        setInitialProduct(res.data)
        // setImgPrev('')
        // setProduct({...product, img: null})
      }
      setImgLoad(false)
    } catch (error) {
      console.log(error)
    }
  }


  const handleImgChange = async (e) => {
    const file = e.target.files[0]
    if (file.size > 1024 * 1024) {
      setProduct({ ...product, img: null })
      setImgPrev('')
      return setImgErr('file too large')
    }
    if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
      setProduct({ ...product, img: null })
      setImgPrev('')
      return setImgErr('Image format not allowed')
    }
    setImgErr('')
    setProduct({ ...product, img: file })
    setImgPrev(URL.createObjectURL(file))
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
      <div className='product'>
        <div className="productWrapper">
          <div className="productLeft">
            <h4>Product Details</h4>
            <div className="divLeftInfos">
              <div className="divRightInfo">
                {imgErr && <span style={{ color: 'red', fontStyle: 'italic', fontSize: 13, fontWeight: 600 }}>Error here</span>}
              </div>
              <div className="divLeftInfo">
                <span>ID</span>
                <span>{id}</span>
              </div>
              <div className="divLeftInfo">
                <span>Title</span>
                <span>{initialProduct?.title}</span>
              </div>
              <div className="divLeftInfo">
                <span>Description</span>
                <span>{initialProduct?.desc}</span>
              </div>
              <div className="divLeftInfo">
                <span>Color</span>
                <span>{initialProduct?.color.join(',')}</span>
              </div>
              <div className="divLeftInfo">
                <span>Size</span>
                <span>{initialProduct?.size.join(',')}</span>
              </div>
              <div className="divLeftInfo">
                <span>Categories</span>
                <span>{initialProduct?.categories.join(',')}</span>
              </div>
              <div className="divLeftInfo">
                <span>Price</span>
                <span>{initialProduct?.price}</span>
              </div>
              <div className="divLeftInfo">
                {imgLoad ? <h2 style={{ fontWeight: 100, fontStyle: 'italic', fontSize: 17 }}>Loading...</h2> : <img src={initialProduct?.img} alt="" />}
              </div>
            </div>
          </div>
          <div className="productRight">
            <div className="divRightInfos">
              <h4>Edit Here</h4>
              <form className="divRightInfos" onSubmit={handleSubmit}>
                <div className="divRightInfo">
                  <span><span style={{ fontWeight: 600 }}>ID: </span>{id}</span>
                </div>
                <div className="divRightInfo">
                  <span>Title</span>
                  <input type="text" placeholder='Title' value={title} onChange={(e) => setProduct({ ...product, title: e.target.value })} />
                </div>
                <div className="divRightInfo">
                  <span>Description</span>
                  <input type="text" placeholder='Description' value={desc} onChange={(e) => setProduct({ ...product, desc: e.target.value })} />
                </div>
                <div className="divRightInfo">
                  <span>Price</span>
                  <input type="text" placeholder='Price' value={price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                </div>
                <div className="divRightInfo">
                  <span>In Stock</span>
                  {/* <input type="text" placeholder='Description' /> */}
                  <select defaultValue={inStock} onChange={(e) => setProduct({ ...product, inStock: e.target.value === 'yes' ? true : false })}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="divRightInfo">
                  <span>Categories</span>
                  <input type="text" placeholder='category' value={categories.join(',')} onChange={(e) => setProduct({ ...product, categories: e.target.value.split(',') })} />
                </div>
                <div className="divRightInfo">
                  <span>Size</span>
                  <input type="text" placeholder='size' value={size.join(',')} onChange={(e) => setProduct({ ...product, size: e.target.value.split(',') })} />
                </div>
                <div className="divRightInfo">
                  <span>Color</span>
                  <input type="text" placeholder='color' value={color.join(',')} onChange={(e) => setProduct({ ...product, color: e.target.value.split(',') })} />
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

export default Product