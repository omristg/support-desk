import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { noteService } from './note.service'

const initialState = {
    notes: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

export const getNotes = createAsyncThunk('note/getNotes',
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await noteService.getNotes(ticketId, token)
        } catch (err) {
            const msg = err.response?.data?.message || err.message || err.toString()
            return thunkAPI.rejectWithValue(msg)
        }
    }
)


const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload

            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notes = action.payload
            })
    }
})

export const { reset } = noteSlice.actions
export default noteSlice.reducer