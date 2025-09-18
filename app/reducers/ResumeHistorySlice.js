'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const getResumeHistory=createAsyncThunk(
    'getResumeHistory',
      async ({page,limit}, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/resume-history/list?page=${page}&limit=${limit}`);
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

export const getRecentResume=createAsyncThunk(
    'getRecentResume',
      async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/home/recent-resume-list`);
            console.log("response", response);
            if (response?.data?.status_code === 200) {
                return response.data?.data;
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
    rHistory:[],
    recentResume:[]
}

const ResumeHistorySlice=createSlice(
    {
        name:"resHist",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(getResumeHistory.pending,(state)=>{
                state.loading=true
            })
            .addCase(getResumeHistory.fulfilled,(state,{payload})=>{
                state.loading=false
                state.rHistory=payload
                state.error=false
            })
            .addCase(getResumeHistory.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(getRecentResume.pending,(state)=>{
                state.loading=true
            })
            .addCase(getRecentResume.fulfilled,(state,{payload})=>{
                state.loading=false
                state.recentResume=payload
                state.error=false
            })
            .addCase(getRecentResume.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
        }
    }
)
export default ResumeHistorySlice.reducer;