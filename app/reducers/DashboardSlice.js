'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';


export const improveResume=createAsyncThunk(
    'improveResume',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/improve-resume/improve-resume', userInput);
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
export const checkATS=createAsyncThunk(
    'checkATS',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/improve-resume/check-ats-score', userInput);
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
error:false,
loading:false,
improveResumeData:{},
checkATSData:{}
}

const DashboardSlice=createSlice(
    {
        name:"dashboard",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(improveResume.pending,(state,{payload})=>{
                state.loading=true  
            })
            builder.addCase(improveResume.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.improveResumeData=payload
            })
            .addCase(improveResume.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })

            builder.addCase(checkATS.pending,(state,{payload})=>{
                state.loading=true
               
            })
            builder.addCase(checkATS.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.checkATSData=payload
            })
            .addCase(checkATS.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })
           
        }
    }
)
export default  DashboardSlice.reducer;