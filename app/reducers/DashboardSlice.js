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

export const jdBasedResume=createAsyncThunk(
    'jdBasedResume',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/js-based-resume/jd-based-improve', userInput);
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

export const jdBasedResumeBasicInfo=createAsyncThunk(
    'jdBasedResumeBasicInfo',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/js-based-resume/basic-info', userInput);
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

export const jdBasedResumeEducationInfo=createAsyncThunk(
    'jdBasedResumeEducationInfo',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/js-based-resume/education-info', userInput);
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

export const jdBasedResumeExpInfo=createAsyncThunk(
    'jdBasedResumeExpInfo',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/js-based-resume/experience-info', userInput);
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

export const jdBasedResumeCertificateInfo=createAsyncThunk(
    'jdBasedResumeCertificateInfo',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/js-based-resume/certification-info', userInput);
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

export const jdBasedResumeAchivmentInfo=createAsyncThunk(
    'jdBasedResumeAchivmentInfo',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/js-based-resume/achievement-info', userInput);
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

export const jdBasedResumeProjectsInfo=createAsyncThunk(
    'jdBasedResumeProjectsInfo',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/js-based-resume/extra-project-info', userInput);
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

export const jdBasedResumeSkillsInfo=createAsyncThunk(
    'jdBasedResumeSkillsInfo',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/js-based-resume/skills-info', userInput);
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

export const jdBasedResumeLanguageInfo=createAsyncThunk(
    'jdBasedResumeLanguageInfo',
      async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/js-based-resume/language-info', userInput);
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

export const jdBasedResumeDetails=createAsyncThunk(
    'jdBasedResumeDetails',
     async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/js-based-resume/get-all-details', userInput);
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
checkATSData:{},
jdBasedResumeData:{},
basiInfo:{},
eduInfo:{},
expInfo:{},
cerInfo:{},
achInfo:{},
proInfo:{},
skillsInfo:{},
langInfo:{},
jdBasedDetailsData:{}
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
            .addCase(jdBasedResume.pending,(state,{payload})=>{
                state.loading=true
               
            })
            .addCase(jdBasedResume.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.jdBasedResumeData=payload
            })
            .addCase(jdBasedResume.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })
            .addCase(jdBasedResumeBasicInfo.pending,(state,{payload})=>{
                state.loading=true
               
            })
            .addCase(jdBasedResumeBasicInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.basiInfo=payload
            })
            .addCase(jdBasedResumeBasicInfo.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })
            .addCase(jdBasedResumeEducationInfo.pending,(state,{payload})=>{
                state.loading=true
               
            })
            .addCase(jdBasedResumeEducationInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.eduInfo=payload
            })
            .addCase(jdBasedResumeEducationInfo.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })

            .addCase(jdBasedResumeExpInfo.pending,(state,{payload})=>{
                state.loading=true
               
            })
            .addCase(jdBasedResumeExpInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.expInfo=payload
            })
            .addCase(jdBasedResumeExpInfo.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })

             .addCase(jdBasedResumeCertificateInfo.pending,(state,{payload})=>{
                state.loading=true
               
            })
            .addCase(jdBasedResumeCertificateInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.cerInfo=payload
            })
            .addCase(jdBasedResumeCertificateInfo.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })

            
             .addCase(jdBasedResumeAchivmentInfo.pending,(state,{payload})=>{
                state.loading=true
               
            })
            .addCase(jdBasedResumeAchivmentInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.achInfo=payload
            })
            .addCase(jdBasedResumeAchivmentInfo.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })
              .addCase(jdBasedResumeProjectsInfo.pending,(state,{payload})=>{
                state.loading=true
               
            })
            .addCase(jdBasedResumeProjectsInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.proInfo=payload
            })
            .addCase(jdBasedResumeProjectsInfo.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })
            .addCase(jdBasedResumeSkillsInfo.pending,(state,{payload})=>{
                state.loading=true
               
            })
            .addCase(jdBasedResumeSkillsInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.skillsInfo=payload
            })
            .addCase(jdBasedResumeSkillsInfo.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })
            
            .addCase(jdBasedResumeLanguageInfo.pending,(state,{payload})=>{
                state.loading=true
               
            })
            .addCase(jdBasedResumeLanguageInfo.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.langInfo=payload
            })
            .addCase(jdBasedResumeLanguageInfo.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })
            .addCase(jdBasedResumeDetails.pending,(state,{payload})=>{
                state.loading=true
               
            })
            .addCase(jdBasedResumeDetails.fulfilled,(state,{payload})=>{
                state.loading=false
                state.error=false
                state.jdBasedDetailsData=payload
            })
            .addCase(jdBasedResumeDetails.rejected,(state,{payload})=>{
                state.error=payload
                state.loading=false
            })
           
        }
    }
)
export default  DashboardSlice.reducer;