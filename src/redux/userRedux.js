import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "User",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: '',
        isLogged: Boolean(localStorage.getItem('isLogged'))
    },
    reducers: {
        loginStart: (state)=>{
            state.isFetching = true
        },
        loginSuccess: (state, action)=>{
            localStorage.setItem("isLogged", true)
            state.isFetching = false
            state.currentUser = action.payload
            state.isLogged = true
            state.error = ''
        },
        loginFailure: (state, action)=>{
            state.isFetching = false
            state.error = action.payload
            state.isLogged = false
        },
        logoutStart: (state)=>{
            state.isFetching = true
        },
        logoutSuccess: (state)=>{
            localStorage.removeItem("isLogged")
            state.isFetching = false
            state.currentUser = null
            state.isLogged = false
        },
        logoutFailure: (state)=>{
            state.isFetching = false
            state.error = true
            state.isLogged = false
        }

    },
})

export const {loginStart, loginFailure, loginSuccess, logoutStart, logoutSuccess, logoutFailure} = userSlice.actions
export default userSlice.reducer