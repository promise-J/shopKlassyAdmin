import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {BrowserRouter as Router, Route, Navigate, Routes} from 'react-router-dom'
import {fetchUser} from './redux/apiCalls'
import {loginStart, loginSuccess} from './redux/userRedux'
import ProtectedRoute from './utils/ProtectedRoute'



import './App.css';
import Homepage from './pages/homepage/Homepage'
import Orders from './pages/orders/Orders'
import NewProduct from './pages/newProduct/NewProduct'
import NewUser from './pages/newUser/NewUser'
import Users from './pages/users/Users'
import Products from './pages/products/Products'
import Product from './pages/product/Product'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import NotFound from './pages/NotFound'
import LoadingImg from './images/loadingGIF.gif'
import User from './pages/user/User'



function App() {

  const [fetching, setFetching] = useState(true)
  const {currentUser, isLogged} = useSelector(state=> state.user)
  const dispatch = useDispatch()
  

  useEffect(() => {
    if (!currentUser && isLogged) {
      const getUser = async () => {
        dispatch(loginStart());
        return fetchUser(dispatch).then((user) => {
          dispatch(loginSuccess(user));
          setFetching(false);
        });
      };
      isLogged && getUser();
    } else {
      setFetching(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  if(fetching){
    return (
      <img style={{height: "100vh", width: "100vw", objectFit: 'cover'}} src={LoadingImg} alt="loading" />
    )
  }


  return (
    <div className="App">
        <Router>
        <Routes>
          <Route path='/' element={isLogged ? <Navigate to='/dashboard' /> : <Login />} caseSensitive={false} exact />
          <Route path='/dashboard' element={<Homepage />} caseSensitive={false} exact />
          <Route path='/login' element={currentUser ? <Navigate to='/dashboard' /> : <Login />} exact />
          <Route path='/register' element={currentUser ? <Navigate to='/dashboard' /> : <Register />} exact />
          <Route path='/orders' element={<ProtectedRoute isLogged={isLogged}><Orders /></ProtectedRoute>} exact />
          <Route path='/newProduct' element={<ProtectedRoute isLogged={isLogged}><NewProduct /></ProtectedRoute>} exact />
          <Route path='/newUser' element={<ProtectedRoute isLogged={isLogged}><NewUser /></ProtectedRoute>} exact />
          <Route path='/users' element={<ProtectedRoute isLogged={isLogged}><Users /></ProtectedRoute>} exact />
          <Route path='/products' element={<ProtectedRoute isLogged={isLogged}><Products /></ProtectedRoute>} exact />
          <Route path='/product/:id' element={<ProtectedRoute isLogged={isLogged}><Product /></ProtectedRoute>} exact />
          <Route path='/user/:id' element={<ProtectedRoute isLogged={isLogged}><User /></ProtectedRoute>} exact />
          {/* <Route path='/cart' element={<ProtectedRoute isLogged={isLogged}><Cart /></ProtectedRoute>} exact />  */}
          <Route path='*' element={<NotFound />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
