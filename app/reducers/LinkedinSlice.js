'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const linkedInPdf=createAsyncThunk(
    'linkedInPdf',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/linkedin-rewrite/upload-pdf', userInput);
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

export const linkedInBasicInfo=createAsyncThunk(
    'linkedInBasicInfo',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/linkedin-rewrite/add-basic-info', userInput);
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

export const linkedInEduInfo=createAsyncThunk(
    'linkedInEduInfo',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/linkedin-rewrite/add-education', userInput);
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

export const linkedInExpInfo=createAsyncThunk(
    'linkedInExpInfo',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/linkedin-rewrite/add-experience', userInput);
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

export const linkedInSkillInfo=createAsyncThunk(
    'linkedInSkillInfo',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/linkedin-rewrite/add-skills', userInput);
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

export const linkedInLangInfo=createAsyncThunk(
    'linkedInLangInfo',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/linkedin-rewrite/add-language', userInput);
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
error:false,
loading:false,
linkedIndata:{},
linkedInBasicInfoData:{},
lkdEduInfo:{},
lkdExpInfo:{},
lkdSkillInfo:{},
lkdlangInfo:{}

}

const LinkedinSlice=createSlice(
    {
        name:"linkedIn",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(linkedInPdf.pending,(state,{payload})=>{
                state.loading=true  
            })
            .addCase(linkedInPdf.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.linkedIndata=payload
            })
            .addCase(linkedInPdf.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })
            .addCase(linkedInBasicInfo.pending,(state,{payload})=>{
                state.loading=true  
            })
            .addCase(linkedInBasicInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.linkedInBasicInfoData=payload
            })
            .addCase(linkedInBasicInfo.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })
                .addCase(linkedInEduInfo.pending,(state,{payload})=>{
                state.loading=true  
            })
            .addCase(linkedInEduInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.lkdEduInfo=payload
            })
            .addCase(linkedInEduInfo.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })
                    .addCase(linkedInExpInfo.pending,(state,{payload})=>{
                state.loading=true  
            })
            .addCase(linkedInExpInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.lkdExpInfo=payload
            })
            .addCase(linkedInExpInfo.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })

            .addCase(linkedInSkillInfo.pending,(state,{payload})=>{
                state.loading=true  
            })
            .addCase(linkedInSkillInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.lkdSkillInfo=payload
            })
            .addCase(linkedInSkillInfo.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })

               .addCase(linkedInLangInfo.pending,(state,{payload})=>{
                state.loading=true  
            })
            .addCase(linkedInLangInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.lkdlangInfo=payload
            })
            .addCase(linkedInLangInfo.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })

           
        }
    }
)
export default  LinkedinSlice.reducer;