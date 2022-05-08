import axios from 'axios'
import Cookies from 'universal-cookie'


const cookie = new Cookies()

// const BASE_URL = process.env.REACT_APP_PUBLIC_URL
const BASE_URL = 'http://localhost:5000'

export const publicRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: cookie.get('shopKlassToken')
    },
    withCredentials: "include"
})

export const imgRequest = axios.create({
    baseUrl: BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data",
        Authorization: cookie.get('shopKlassToken')
    },
    withCredentials: "include"
})

