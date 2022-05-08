import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import { publicRequest } from '../../redux/apiRequest'
import './newProduct.css'


const NewProduct = () => {
  const navigate = useNavigate()

  const initialState = {
    img: null,
    title: '',
    desc: '',
    categories: [],
    size: [],
    color: [],
    price: '',
    inStock: true
  }

  const [data, setData] = useState(initialState)
  const [imgLoad, setImgLoad] = useState(false)

  const {img, title, desc, categories, size, color, price, inStock} = data

  const [imgPrev, setImgPrev] = useState('')
  const [imgErr, setImgErr] = useState('')

   const handleImgChange = async(e)=>{
        const file = e.target.files[0]
        if(file.size > 1024 * 1024){
                setData({...data, img: null})
                setImgPrev('')
                return setImgErr('file too large')
            }
            if(file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png'){
                setData({...data, img: null})
                setImgPrev('')
                return setImgErr('Image format not allowed')
            }
            setImgErr('')
            setData({...data, img: file})
            setImgPrev(URL.createObjectURL(file))
    }

    const handleSubmit = async(e)=>{
      e.preventDefault()
      try {
          let formData = new FormData()
          formData.append('file', img)
          if(img){
              setImgLoad(true)
              const res = await publicRequest.post('/api/upload_avatar', formData)
              console.log(res)
              if(res.status===200){
                  await publicRequest.post('/product', {
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
                  // console.log(res)
                  // setData({...data, img: null})
                  setImgPrev('')
                  setImgLoad(false)
                  setData({...initialState})
                  navigate('/products')
              }
              setData({...initialState})
          }
          return setImgErr('Please select an image')
          // else{
          //     setImgLoad(true)
          //     await publicRequest.post('/auth/register', {...data})
          //     // console.log(res)
          //     setImgLoad(false)
          //     setData({...initialState})
          // }
          // return navigate('/users')
          // console.log(data)
      } catch (error) {
              // setData({...initialState})
              console.log(error)
          }
  }



  return (
    <Layout>
    <div className='newProduct'>
    <div className="newProductWrapper">
          <form className="newProductForm" onSubmit={handleSubmit}>
            <h4>Create New Product</h4>
            {imgErr && <span style={{marginLeft: 40, fontSize: 13, fontStyle: 'italic', color: 'red'}}>{imgErr}</span>}
            <div className="formItems">
              <input value={title} onChange={(e)=> setData({...data, title: e.target.value})} type="text" placeholder='Title' />
              <input value={desc} onChange={(e)=> setData({...data, desc: e.target.value})} type="text" placeholder='Description' />
              <input value={size} onChange={(e)=> setData({...data, size: e.target.value.split(',')})} type="text" placeholder='Size: X,L,XL,S...' />
              <input value={color} onChange={(e)=> setData({...data, color: e.target.value.split(',')})} type="text" placeholder='Color: blue,yellow,white...' />
              <input value={categories} onChange={(e)=> setData({...data, categories: e.target.value.split(',')})} type="text" placeholder='Categories: men,unisex,cap... ' />
              <input value={price} onChange={(e)=> setData({...data, price: e.target.value})} type="text" placeholder='Price: 34$' />
              <input type="file" onChange={handleImgChange} />
              <div style={{display: 'flex', flexDirection: 'column', marginTop: '-10px'}}>
                <span style={{fontSize: 12}}>IN STOCK</span>
              <select onChange={(e)=> setData({...data, inStock: e.target.value === 'true' ? true : false})} defaultValue={inStock} style={{width: '100%', padding: 4, background: 'rgb(244, 234, 247)'}}>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
              </div>
              {imgPrev && <img src={imgPrev} alt="" />}
              <button style={{cursor: 'pointer'}} type='submit'>{imgLoad ? 'loading' : 'CREATE'}</button>
            </div>
          </form>
        </div>
    </div>
  </Layout>
  )
}

export default NewProduct