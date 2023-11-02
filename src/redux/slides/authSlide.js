import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { userRegister, userLogin } from "../../services/authService"

const initialState = {
    user: {
        user: {

        }
    },
    isLoggedIn: false,
}

export const register = createAsyncThunk(
    "auth/register",
    async (data) => {
        return await userRegister(data)
    } 
)

export const login = createAsyncThunk(
    "auth/login",
    async (data) => {
        return await userLogin(data);
    }
)

export const clearState = createAsyncThunk(
    "auth/clear-state",
    async () => {
        return
    }
)

const authSlide = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload?.data;
            if (state.user?.err === 0) {
                state.isLoggedIn = true
            }
        })
        .addCase(register.fulfilled, (state, action) => {
            state.user = action.payload?.data;
            if (state.user?.err === 0) {
                state.isLoggedIn = true
            }
        })
        .addCase(clearState.fulfilled, (state, action) => {
            state.token = ''
            state.user = {}
            state.isLoggedIn = false
        })
    }
})

const { reducer } = authSlide;

export default reducer;