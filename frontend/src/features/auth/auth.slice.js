import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userService } from './auth.service'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user || null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const register = createAsyncThunk('auth/register',
    async (user, thunkAPI) => {
        try {
            return await userService.register(user)
        } catch (err) {
            const msg = err.response?.data?.message || err.message || err.toString()
            return thunkAPI.rejectWithValue(msg)
        }
    }
)

export const login = createAsyncThunk('auth/login',
    async (user, thunkAPI) => {
        console.log(user)
    }
)

export const logout = createAsyncThunk('auth/logout',
    async () => {
        await userService.logout()
    })

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.user = null
                state.message = action.payload
            })
    }
})

export default authSlice.reducer
export const { reset } = authSlice.actions 