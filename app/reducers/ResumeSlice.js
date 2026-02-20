'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';


export const savePersonalInfo = createAsyncThunk(
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

export const updatePersonalInfo = createAsyncThunk(
    'updatePersonalInfo',
    async ({ id, ...data }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/api/resume/personal-info/update/${id}`, data);
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

export const saveEducationInfo = createAsyncThunk(
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

export const saveWorkExp = createAsyncThunk(
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

export const saveLanguageInfo = createAsyncThunk(
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

export const saveSkillInfo = createAsyncThunk(
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

export const saveProjectInfo = createAsyncThunk(
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

export const saveCertificatesInfo = createAsyncThunk(
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
export const saveAchivmentInfo = createAsyncThunk(
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

export const saveForDraft = createAsyncThunk(
    'saveForDraft',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/draft/resumeInfo', userInput);
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

export const saveTemplate = createAsyncThunk(
    'saveTemplate',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/templete/templete', userInput);
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

export const getSingleResume = createAsyncThunk(
    'getSingleResume',
    async ({ id, fetch }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/resume/single-data?id=${id}&fetch=${fetch}`);
            if (response?.data?.statusCode === 200) {
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

export const addCountResume = createAsyncThunk(
    'addCountResume',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/resume-count/add-count`, userInput);
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

export const addCountResumeOrg = createAsyncThunk(
    'addCountResumeOrg',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/resume-count/add-org-count`, userInput);
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


export const saveResumeNew = createAsyncThunk(
    'saveResumeNew',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/scatch/resume/save', userInput);
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

export const saveResumeImprove = createAsyncThunk(
    'saveResumeImprove',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/imp/resume/save', userInput);
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

export const saveResumeJd = createAsyncThunk(
    'saveResumeJd',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/jd/resume/save', userInput);
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


export const saveResumeLinkedIn = createAsyncThunk(
    'saveResumeLinkedIn',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/linkdin/resume/save', userInput);
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

export const generatePDF = createAsyncThunk(
    'generatePDF',
    async (htmlContent, { rejectWithValue }) => {
        try {

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pdf/convert`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                    body: htmlContent,
                }
            );

            if (!response.ok) {
                return rejectWithValue(`Server error: ${response.status}`);
            }

            const blob = await response.blob();
            return blob;

        } catch (err) {
            return rejectWithValue(err?.message || 'PDF generation failed');
        }
    }
)
export const generateDocx = createAsyncThunk(
    'generateDocx',
    async (htmlContent, { rejectWithValue }) => {
        try {

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pdf/convert/doc`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                    body: htmlContent,
                }
            );

            if (!response.ok) {
                return rejectWithValue(`Server error: ${response.status}`);
            }

            const blob = await response.blob();
            return blob;

        } catch (err) {
            return rejectWithValue(err?.message || 'PDF generation failed');
        }
    }
)

const initialState = {
    loading: false,
    error: false,
    savePinfo: "",
    saveEInfo: "",
    saveWExpinfo: "",
    saveLinfo: "",
    saveSkinfo: "",
    saveProInfo: "",
    saveCerInfo: "",
    saveAchiveInfo: "",
    saveTemplateInfo: "",
    singleResumeInfo: "",
    updateBasicInfoData: "",
    saveResumeData: "",
    pdfLoading: false,
    pdfError: null,
    docxLoading: false,
    docxError: null,
}
const ResumeSlice = createSlice(
    {
        name: "resume",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(savePersonalInfo.pending, (state) => {
                state.loading = true
            })
                .addCase(savePersonalInfo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.savePinfo = payload
                })
                .addCase(savePersonalInfo.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(saveEducationInfo.pending, (state) => {
                    state.loading = true
                })
                .addCase(saveEducationInfo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.saveEInfo = payload
                })
                .addCase(saveEducationInfo.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(saveWorkExp.pending, (state) => {
                    state.loading = true
                })
                .addCase(saveWorkExp.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.saveWExpinfo = payload
                })
                .addCase(saveWorkExp.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(saveLanguageInfo.pending, (state) => {
                    state.loading = true
                })
                .addCase(saveLanguageInfo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.saveLinfo = payload
                })
                .addCase(saveLanguageInfo.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(saveSkillInfo.pending, (state) => {
                    state.loading = true
                })
                .addCase(saveSkillInfo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.saveSkinfo = payload
                })
                .addCase(saveSkillInfo.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(saveProjectInfo.pending, (state) => {
                    state.loading = true
                })
                .addCase(saveProjectInfo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.saveProInfo = payload
                })
                .addCase(saveProjectInfo.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(saveCertificatesInfo.pending, (state) => {
                    state.loading = true
                })
                .addCase(saveCertificatesInfo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.saveCerInfo = payload
                })
                .addCase(saveCertificatesInfo.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(saveAchivmentInfo.pending, (state) => {
                    state.loading = true
                })
                .addCase(saveAchivmentInfo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.saveAchiveInfo = payload
                })
                .addCase(saveAchivmentInfo.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(saveTemplate.pending, (state) => {
                    state.loading = true
                })
                .addCase(saveTemplate.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.saveTemplateInfo = payload
                    state.error = false
                })
                .addCase(saveTemplate.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(getSingleResume.pending, (state) => {
                    state.loading = true
                })
                .addCase(getSingleResume.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.singleResumeInfo = payload
                    state.error = false
                })
                .addCase(getSingleResume.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(updatePersonalInfo.pending, (state) => {
                    state.loading = true
                })
                .addCase(updatePersonalInfo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.updateBasicInfoData = payload
                    state.error = false
                })
                .addCase(updatePersonalInfo.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(saveResumeNew.pending, (state) => {
                    state.loading = true
                })
                .addCase(saveResumeNew.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.saveResumeData = payload
                    state.error = false
                })
                .addCase(saveResumeNew.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(saveResumeImprove.pending, (state) => {
                    state.loading = true
                })
                .addCase(saveResumeImprove.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.saveResumeData = payload
                    state.error = false
                })
                .addCase(saveResumeImprove.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })

                .addCase(saveResumeJd.pending, (state) => {
                    state.loading = true
                })
                .addCase(saveResumeJd.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.saveResumeData = payload
                    state.error = false
                })
                .addCase(saveResumeJd.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })

                .addCase(saveResumeLinkedIn.pending, (state) => {
                    state.loading = true
                })
                .addCase(saveResumeLinkedIn.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.saveResumeData = payload
                    state.error = false
                })
                .addCase(saveResumeLinkedIn.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })

                .addCase(generatePDF.pending, (state) => {
                    state.pdfLoading = true;
                    state.pdfError = null;
                })
                .addCase(generatePDF.fulfilled, (state) => {
                    state.pdfLoading = false;
                    state.pdfError = null;
                })
                .addCase(generatePDF.rejected, (state, { payload }) => {
                    state.pdfLoading = false;
                    state.pdfError = payload;
                })

                .addCase(generateDocx.pending, (state) => {
                    state.docxLoading = true;
                    state.docxError = null;
                })
                .addCase(generateDocx.fulfilled, (state) => {
                    state.docxLoading = false;
                    state.docxError = null;
                })
                .addCase(generateDocx.rejected, (state, { payload }) => {
                    state.docxLoading = false;
                    state.docxError = payload;
                })
        }
    }
)
export default ResumeSlice.reducer;