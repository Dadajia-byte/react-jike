// 用户相关
import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { getToken, setToken as _setToken, removeToken } from "@/utils/token";

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || '',
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        }
    }
})

const { setToken } = userStore.actions


// 异步方法
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await request.post('/authorizations', loginForm)
        dispatch(setToken(res.data.token))
    }
}





const userReducer = userStore.reducer
export { setToken, fetchLogin }
export default userReducer