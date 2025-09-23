'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const inviteStudents=createAsyncThunk(
    'inviteStudents',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/csv/upload-csv', userInput);
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
    inviteStudentData:[]
}
const InviteSlice=createSlice(
{

     name:"inviteStd",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(inviteStudents.pending,(state)=>{
                state.loading=true
            })
            .addCase(inviteStudents.fulfilled,(state,{payload})=>{
                state.loading=false
                state.inviteStudentData=payload
                state.error=false
            })
            .addCase(inviteStudents.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
        }
}
)