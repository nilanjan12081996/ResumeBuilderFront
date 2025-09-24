'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
import serverApi from './serverApi';

export const inviteStudents=createAsyncThunk(
    'inviteStudents',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/csv/upload-csv', userInput);
            console.log("res",response);
            
            if (response?.data?.data?.status_code === 200) {
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

export const inviteStudentsMannually=createAsyncThunk(
    'inviteStudentsMannually',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await serverApi.post('/api/usercsv/invite-student', userInput);
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

export const saveInvitedStudent=createAsyncThunk(
    'saveInvitedStudent',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await serverApi.post('/api/usercsv/map-data', userInput);
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

export const invitedStudentsList=createAsyncThunk(
    'invitedStudentsList',
      async ({page,limit}, { rejectWithValue }) => {
        try {
            const response = await serverApi.get(`/api/usercsv/list?limit=${limit}&page=${page}`);
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
    inviteStudentData:[],
    manualData:[],
    saveData:[],
    loading_for_csv:false,
    loading_for_manual:false,
    studentsData:[],
    studentLoading:false
}
const InviteSlice=createSlice(
{

     name:"inviteStd",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(inviteStudents.pending,(state)=>{
                state.loading_for_csv=true
            })
            .addCase(inviteStudents.fulfilled,(state,{payload})=>{
                state.loading_for_csv=false
                state.inviteStudentData=payload
                state.error=false
            })
            .addCase(inviteStudents.rejected,(state,{payload})=>{
                state.loading_for_csv=false
                state.error=payload
            })
               .addCase(inviteStudentsMannually.pending,(state)=>{
                state.loading_for_manual=true
            })
            .addCase(inviteStudentsMannually.fulfilled,(state,{payload})=>{
                state.loading_for_manual=false
                state.manualData=payload
                state.error=false
            })
            .addCase(inviteStudentsMannually.rejected,(state,{payload})=>{
                state.loading_for_manual=false
                state.error=payload
            })
            .addCase(saveInvitedStudent.pending,(state)=>{
                state.loading=true
            })
            .addCase(saveInvitedStudent.fulfilled,(state,{payload})=>{
                state.loading=false
                state.saveData=payload
                state.error=false
            })
            .addCase(saveInvitedStudent.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
            .addCase(invitedStudentsList.pending,(state)=>{
                state.studentLoading=true
            })
            .addCase(invitedStudentsList.fulfilled,(state,{payload})=>{
                state.studentLoading=false
                state.studentsData=payload
                state.error=false
            })
            .addCase(invitedStudentsList.rejected,(state,{payload})=>{
                state.studentLoading=false
                state.error=payload
            })
        }
}
)
export default InviteSlice.reducer;