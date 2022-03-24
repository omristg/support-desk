import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ticketService } from './ticket.service'


const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createTicket = createAsyncThunk('ticket/createTicket',
    async (ticketData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.createTicket(ticketData, token)
        } catch (err) {
            const msg = err.response?.data?.message || err.message || err.toString()
            return thunkAPI.rejectWithValue(msg)
        }
    }
)

export const ticketSlice = createSlice({
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
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload

            })
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
    }
})

export default ticketSlice.reducer
export const { reset } = ticketSlice.actions 