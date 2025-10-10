'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const getFeatureJob=createAsyncThunk(
    'getFeatureJob',
      async ({page,limit}, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/featured-job/list?page=${page}&limit=${limit}`);
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

export const getFeatureJobDetails=createAsyncThunk(
    'getFeatureJobDetails',
        async ({id}, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/featured-job/detail/${id}`);
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

export const applyJobs=createAsyncThunk(
    'applyJobs',
        async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/apply-job/apply`,userInput);
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

const initialState={
    loading:false,
    error:false,
    jobs:[],
    jobDetails:{},
    applyJobData:""
}
const FeatureJobSlice=createSlice(
    {
        name:"featJob",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(getFeatureJob.pending,(state,{payload})=>{
                state.loading=true  
            })
            .addCase(getFeatureJob.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.jobs=payload
            })
            .addCase(getFeatureJob.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })
            .addCase(getFeatureJobDetails.pending,(state,{payload})=>{
                state.loading=true  
            })
            .addCase(getFeatureJobDetails.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.jobDetails=payload
            })
            .addCase(getFeatureJobDetails.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })
            .addCase(applyJobs.pending,(state)=>{
                state.loading=true
            })
            .addCase(applyJobs.fulfilled,(state,{payload})=>{
                state.loading=false
                state.applyJobData=payload
                state.error=false
            })
            .addCase(applyJobs.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
      

           
        }
    }
)
export default  FeatureJobSlice.reducer;