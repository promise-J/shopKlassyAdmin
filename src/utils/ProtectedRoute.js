import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../pages/login/Login'


const ProtectedRoute = ({ children, isLogged}) => {
    const navigate = useNavigate()
    // const [condition, setCondition] = useState(false)
    
    useEffect(()=>{
        if(!isLogged){
            navigate('/login', {replace: true})
        }
    },[isLogged, navigate])

        return (
            (!isLogged) ? <Login /> : children
        )
}

export default ProtectedRoute