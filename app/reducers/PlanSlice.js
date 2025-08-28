'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';


export const getPlans = createAsyncThunk(
    'getPlans',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/user/plan/list');
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                if (response?.data?.errors) {
                    return rejectWithValue(response.data.errors);
                } else {
                    return rejectWithValue('Something went wrong.');
                }
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)
export const createSubscriptions = createAsyncThunk(
    'createSubscriptions',
    async (user_input, { rejectWithValue }) => {
        try {
            const response = await api.post('/user/payment/create-subscription', user_input);
            if (response?.data?.status_code === 201) {
                return response.data;
            } else {
                if (response?.data?.errors) {
                    return rejectWithValue(response.data.errors);
                } else {
                    return rejectWithValue('Something went wrong.');
                }
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }

)

export const completeSubscriptions = createAsyncThunk(
    'completeSubscriptions',
    async (user_input, { rejectWithValue }) => {
        try {
            const response = await api.post('/user/payment/complete-payment', user_input);
            if (response?.data?.status_code === 201) {
                return response.data;
            } else {
                if (response?.data?.errors) {
                    return rejectWithValue(response.data.errors);
                } else {
                    return rejectWithValue('Something went wrong.');
                }
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }

)
const initialState = {
    loading: false,
    plans: [],
    error: false,
    subs: [],
    comSubs: []
}

const PlanSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPlans.pending, (state) => {
                state.loading = true
            })
            .addCase(getPlans.fulfilled, (state, { payload }) => {
                state.loading = false
                state.plans = payload
                state.error = false
            })
            .addCase(getPlans.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            .addCase(createSubscriptions.pending, (state) => {
                state.loading = true
            })
            .addCase(createSubscriptions.fulfilled, (state, { payload }) => {
                state.loading = false
                state.subs = payload
                state.error = false
            })
            .addCase(createSubscriptions.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            .addCase(completeSubscriptions.pending, (state) => {
                state.loading = true
            })
            .addCase(completeSubscriptions.fulfilled, (state, { payload }) => {
                state.loading = false
                state.comSubs = payload
                state.error = false
            })
            .addCase(completeSubscriptions.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
    }

})
export default PlanSlice.reducer