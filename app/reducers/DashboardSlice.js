'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';


export const improveResume=createAsyncThunk(
    'improveResume',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/improve-resume/improve-resume', userInput);
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

const initialState={
loading:false,
error:false,
improveResumeData:{}
}

const DashboardSlice=createSlice(
    {
        name:"dashboard",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(improveResume.pending,(state)=>{
                state.loading=true
            })
            .addCase(improveResume.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.improveResumeData=payload
            })
            .addCase(improveResume.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
           
        }
    }
)
export default  DashboardSlice.reducer;