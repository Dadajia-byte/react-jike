// 用户相关
import { createSlice } from "@reduxjs/toolkit";
import { request, getToken, setToken as _setToken, removeToken } from "@/utils";
import { loginAPI, registerAPI } from "@/apis/user";

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state) {
            state.token = ''
            removeToken()
            state.userInfo = {}
        }
    }
})

const { setToken, setUserInfo, clearUserInfo } = userStore.actions


// 异步方法
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await loginAPI(loginForm)
        dispatch(setToken(res.data.token))
    }
}

// 获取个人信息
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await registerAPI()
        dispatch(setUserInfo(res.data))
    }
}





const userReducer = userStore.reducer
export { setToken, fetchLogin, fetchUserInfo, clearUserInfo }
export default userReducer