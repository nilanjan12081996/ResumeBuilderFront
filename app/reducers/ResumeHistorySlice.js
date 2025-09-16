'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const getResumeHistory=createAsyncThunk(
    'getResumeHistory',
      async ({page,limit}, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/resume-history/list?page=${page}&limit=${limit}`, userInput);
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
    rHistory:[]
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
            })
        }
    }
)