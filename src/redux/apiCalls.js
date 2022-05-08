import { publicRequest } from "./apiRequest"
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess } from "./userRedux"
import Cookies from 'universal-cookie'

const cookie = new Cookies()


export const login = async(dispatch, user)=>{
    dispatch(loginStart())
    try {
        const res = await publicRequest.post('/auth/login', user)
        cookie.set('shopKlassToken', res.data.accessToken, {path: '/'})
        dispatch(loginSuccess(res.data.user))
    } catch (error) {
        dispatch(loginFailure(error.response.data))
    }
}

export const fetchUser = async(dispatch)=>{
    try {       
        const res = await publicRequest.get('/auth/info', {headers: {
            Authorization: cookie.get('shopKlassToken')
        }})
        return res.data.user
    } catch (error) {
        console.log(error.response)
        // await publicRequest.get("/auth/logout")
        // cookie.remove('shopKlassToken')
        // localStorage.removeItem('isLogged')
        // dispatch(logoutSuccess())
    }
}

export const register = async(dipatch, user)=>{
    try {
        const res = await publicRequest.post('/auth/register', user)
        return res
    } catch (error) {
        return error.response
    }
}

export const logout = async(dispatch)=>{
    dispatch(logoutStart())
    try {
        await publicRequest.get("/auth/logout")
        cookie.remove('shopKlassToken')
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFailure())
    }
}