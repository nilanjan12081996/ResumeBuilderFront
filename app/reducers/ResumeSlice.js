'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';


export const savePersonalInfo=createAsyncThunk(
    'savePersonalInfo',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/resume/personal-info/create', userInput);
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

export const saveEducationInfo=createAsyncThunk(
    'saveEducationInfo',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/resume/education/create-update', userInput);
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

export const saveWorkExp=createAsyncThunk(
    'saveWorkExp',
        async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/resume/experience/create-update', userInput);
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

export const saveLanguageInfo=createAsyncThunk(
    'saveLanguageInfo',
        async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/resume/language/add', userInput);
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

export const saveSkillInfo=createAsyncThunk(
    'saveSkillInfo',
        async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/resume/skills/add', userInput);
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

export const saveProjectInfo=createAsyncThunk(
    'saveProjectInfo',
        async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/resume/project/add', userInput);
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

export const saveCertificatesInfo=createAsyncThunk(
    'saveCertificatesInfo',
        async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/resume/certification/add', userInput);
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
export const saveAchivmentInfo=createAsyncThunk(
    'saveAchivmentInfo',
        async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/resume/achievements/add', userInput);
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
savePinfo:"",
saveEInfo:"",
saveWExpinfo:"",
saveLinfo:"",
saveSkinfo:"",
saveProInfo:"",
saveCerInfo:"",
saveAchiveInfo:""
}
const ResumeSlice=createSlice(
    {
        name:"resume",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(savePersonalInfo.pending,(state)=>{
                state.loading=true
            })
            .addCase(savePersonalInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.savePinfo=payload
            })
            .addCase(savePersonalInfo.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(saveEducationInfo.pending,(state)=>{
                state.loading=true
            })
            .addCase(saveEducationInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.saveEInfo=payload
            })
            .addCase(saveEducationInfo.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(saveWorkExp.pending,(state)=>{
                state.loading=true
            })
            .addCase(saveWorkExp.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.saveWExpinfo=payload
            })
            .addCase(saveWorkExp.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(saveLanguageInfo.pending,(state)=>{
                state.loading=true
            })
            .addCase(saveLanguageInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.saveLinfo=payload
            })
            .addCase(saveLanguageInfo.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(saveSkillInfo.pending,(state)=>{
                state.loading=true
            })
            .addCase(saveSkillInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.saveSkinfo=payload
            })
            .addCase(saveSkillInfo.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
             .addCase(saveProjectInfo.pending,(state)=>{
                state.loading=true
            })
            .addCase(saveProjectInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.saveProInfo=payload
            })
            .addCase(saveProjectInfo.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(saveCertificatesInfo.pending,(state)=>{
                state.loading=true
            })
            .addCase(saveCertificatesInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.saveCerInfo=payload
            })
            .addCase(saveCertificatesInfo.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(saveAchivmentInfo.pending,(state)=>{
                state.loading=true
            })
            .addCase(saveAchivmentInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.saveAchiveInfo=payload
            })
            .addCase(saveAchivmentInfo.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })

        }
    }
)
export default  ResumeSlice.reducer;