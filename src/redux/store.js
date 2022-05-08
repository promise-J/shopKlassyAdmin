import {configureStore} from '@reduxjs/toolkit'

import userReducer from './userRedux'

export default configureStore({
    reducer: {
        user: userReducer
    }
})

