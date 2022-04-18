import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

//redux resource
const initialState = {
    goals: [],
    currentGoal: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    showSelectedGoal: false,
    message: '',
}

//Create new goal
export const createGoal = createAsyncThunk('goals/create', async(goalData, thunkAPI) => {
    try {
        //thunkapi can get any object from your states
        const token = thunkAPI.getState().auth.user.token
        return await goalService.createGoal(goalData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Update goal
export const updateGoal = createAsyncThunk('goals/update', async(goalData, thunkAPI) => {
    try {
        //thunkapi can get any object from your states
        const token = thunkAPI.getState().auth.user.token
        return await goalService.updateGoal(goalData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get user goals not passing anything but need thunkapi
export const getGoals = createAsyncThunk('goals/getAll', async(_, thunkAPI) => {
    try {
        //thunkapi can get any object from your states
        const token = thunkAPI.getState().auth.user.token
        return await goalService.getGoals(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }   
})

//Delete goal
export const deleteGoal = createAsyncThunk('goals/delete', async(id, thunkAPI) => {
    try {
        //thunkapi can get any object from your states
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get current goal by goal id
export const getCurrentGoal = createAsyncThunk('goals/getCurrentGoal', async(id, thunkAPI) => {
    try {
        //thunkapi can get any object from your states
        const token = thunkAPI.getState().auth.user.token
        return await goalService.getCurrentGoal(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const closeForm = createAsyncThunk('goals/closeForm', async(thunkAPI) => {
    try {
        //thunkapi can get any object from your states
        return await goalService.closeForm()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: { 
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.goals = action.payload

            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateGoal.pending, (state) => {
                state.isLoading = true
                state.showSelectedGoal = false
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.goals = action.payload
                state.showSelectedGoal = false
            })
            .addCase(updateGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.showSelectedGoal = true
                state.message = action.payload
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getCurrentGoal.pending, (state) => {
                state.isLoading = true
                state.showSelectedGoal = false
            })
            .addCase(getCurrentGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.showSelectedGoal = true
                state.currentGoal = action.payload
            })
            .addCase(getCurrentGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.showSelectedGoal = false
                state.message = action.payload
            })
            .addCase(closeForm.pending, (state) => {
                state.isLoading = true
                state.showSelectedGoal = false
            })
            .addCase(closeForm.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.showSelectedGoal = false
            })
            .addCase(closeForm.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.showSelectedGoal = true
                state.message = action.payload
            })
    }
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer