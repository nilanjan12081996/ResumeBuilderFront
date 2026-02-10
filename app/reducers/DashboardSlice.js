'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
import axios from 'axios';
import aiApi from './aiApi';


export const improveResume = createAsyncThunk(
    "improveResume",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await aiApi.post(
                "/agent/resume/upload",
                formData,
                {
                    params: {
                        security_id: process.env.NEXT_PUBLIC_AI_SECURITY_ID,
                    },
                }
            );

            if (response?.data?.status === "success") {
                return response.data;
            } else {
                if (response?.data?.errors) {
                    return rejectWithValue(response.data.errors);
                }
                return rejectWithValue("Something went wrong.");
            }
        } catch (err) {
            return rejectWithValue(
                err?.response?.data || "Server error occurred"
            );
        }
    }
);


export const checkATS = createAsyncThunk(
    'checkATS',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await aiApi.post('/agent/ATS/Score', payload);
            console.log('ATS API response:', response);
            return response.data;

        } catch (err) {
            console.error('ATS API error:', err);
            return rejectWithValue(err?.response?.data || err.message);
        }
    }
);



export const jdBasedResume = createAsyncThunk(
    'jdBasedResume',
    async (userInput, { rejectWithValue }) => {
        try {
            // const response = await api.post('/api/js-based-resume/jd-based-improve', userInput);
            const response = await api.post('/api/js-based-resume/extract-info', userInput);
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

export const jdBasedResumeBasicInfo = createAsyncThunk(
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

export const jdBasedResumeEducationInfo = createAsyncThunk(
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

export const jdBasedResumeExpInfo = createAsyncThunk(
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

export const jdBasedResumeCertificateInfo = createAsyncThunk(
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

export const jdBasedResumeAchivmentInfo = createAsyncThunk(
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

export const jdBasedResumeProjectsInfo = createAsyncThunk(
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

export const jdBasedResumeSkillsInfo = createAsyncThunk(
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

export const jdBasedResumeLanguageInfo = createAsyncThunk(
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

export const jdBasedResumeDetails = createAsyncThunk(
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

export const updateBasicInfo = createAsyncThunk(
    "updateBasicInfo",
    async ({ resumeid, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(
                `/api/improve-resume/update-basic-info/${resumeid}`,
                data
            );

            if (response?.data?.status_code === 200) {
                return response.data;
            }

            return rejectWithValue(
                response?.data?.errors || "Something went wrong."
            );
        } catch (err) {
            return rejectWithValue(err?.response?.data || err);
        }
    }
);


export const updateExperience = createAsyncThunk(
    'updateExperience',
    async ({ resumeid, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/improve-resume/add-update-experience/${resumeid}`, data);
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

export const updateEducation = createAsyncThunk(
    'updateEducation',
    async ({ resumeid, data }, { rejectWithValue }) => {

        try {
            const response = await api.put(`/api/improve-resume/add-update-education/${resumeid}`, data);
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

export const updateSkills = createAsyncThunk(
    'updateSkills',
    async ({ resumeid, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/improve-resume/add-update-skills/${resumeid}`, data);
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

export const updateLanguage = createAsyncThunk(
    'updateLanguage',
    async ({ resumeid, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/improve-resume/add-update-language/${resumeid}`, data);
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

export const updateExtraProject = createAsyncThunk(
    'updateExtraProject',
    async ({ resumeid, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/improve-resume/add-update-extra-project/${resumeid}`, data);
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

export const updateCertification = createAsyncThunk(
    'updateCertification',
    async ({ resumeid, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/improve-resume/add-update-certification/${resumeid}`, data);
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

export const updateAchievements = createAsyncThunk(
    'updateAchievements',
    async ({ resumeid, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/improve-resume/add-update-achievements/${resumeid}`, data);
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
export const getUpdateResumeInfo = createAsyncThunk(
    'getUpdateResumeInfo',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/improve-resume/get-improve-resume-info/${id}`);
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
export const atsScoreAnalyze = createAsyncThunk(
    'atsScoreAnalyze',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/improve-resume/get-ats-score-analyze?imp_resume_id=${id}`);
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

// Add for chat

// Add JD-based questions
export const getGeneratedQuestions = createAsyncThunk(
    "dashboard/getGeneratedQuestions",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await api.post("/api/js-based-resume/add-question", payload);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong.");
        }
    }
);


export const improveExperience = createAsyncThunk(
    "dashboard/improveExperience",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await api.post("/api/js-based-resume/improve-experience", payload);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong.");
        }
    }
);

export const checkJdAts = createAsyncThunk(
    "checkJdAts",
    async ({ jd_resume_id, raw_data, job_description }, { rejectWithValue }) => {
        try {
            const response = await api.post("/api/js-based-resume/check-jd-ats", {
                jd_resume_id,
                raw_data,
                job_description
            });

            if (response?.data?.status === true) {
                return response.data;
            } else {
                if (response?.data?.errors) {
                    return rejectWithValue(response.data.errors);
                } else {
                    return rejectWithValue("Something went wrong.");
                }
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


export const jdBasedAtsScoreAnalyze = createAsyncThunk(
    'jdBasedAtsScoreAnalyze',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/js-based-resume/get-ats-score-analyze?jd_based_resume_id=${id}`);
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
);

export const impBasedAtsScoreAnalyze = createAsyncThunk(
    'impBasedAtsScoreAnalyze',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/improve-resume/get-ats-score-analyze?imp_resume_id=${id}`);
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
);

/* ============ IMP RESUME (new chat APIs) ============ */

// Add questions (IMP)
export const addImpQuestions = createAsyncThunk(
    'improveResume/addImpQuestions',
    async (payload, { rejectWithValue }) => {
        try {
            const res = await api.post('/api/improve-resume/add-questions', payload);
            if (res?.data?.status === true || res?.data?.status_code === 200 || res?.data?.status_code === 201) {
                return res.data;
            }
            return rejectWithValue(res?.data?.errors || 'Something went wrong.');
        } catch (e) {
            return rejectWithValue(e?.response?.data || 'Network error');
        }
    }
);

// Improve experience (IMP)
export const improveImpExperience = createAsyncThunk(
    'improveResume/improveImpExperience',
    async (payload, { rejectWithValue }) => {
        try {
            const res = await api.post('/api/improve-resume/improve-experience', payload);
            if (res?.data?.status === true || res?.data?.status_code === 200 || res?.data?.status_code === 201) {
                return res.data;
            }
            return rejectWithValue(res?.data?.errors || 'Something went wrong.');
        } catch (e) {
            return rejectWithValue(e?.response?.data || 'Network error');
        }
    }
);

export const getJdEnhance = createAsyncThunk(
    "getJdEnhance",
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/js-based-resume/jd-based-rewrite-text', userInput);

            if (response?.data?.status_code === 201 || response?.data?.status_code === 200) {
                return response.data;
            } else if (response?.data?.errors) {
                return rejectWithValue(response.data.errors);
            } else {
                return rejectWithValue("Something went wrong.");
            }

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const jdEnhanceUsageInfo = createAsyncThunk(
    'jdEnhanceUsageInfo',
    async (cvId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/js-based-resume/jd-based-rewrite-usages-info?cvId=${cvId}`);

            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                if (response?.data?.errors) {
                    return rejectWithValue(response.data.errors);
                } else {
                    return rejectWithValue("Something went wrong.");
                }
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getImpEnhance = createAsyncThunk(
    "getImpEnhance",
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/improve-resume/imp-rewrite-text', userInput);

            if (response?.data?.status_code === 201 || response?.data?.status_code === 200) {
                return response.data;
            } else if (response?.data?.errors) {
                return rejectWithValue(response.data.errors);
            } else {
                return rejectWithValue("Something went wrong.");
            }

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const impEnhanceUsageInfo = createAsyncThunk(
    'impEnhanceUsageInfo',
    async (cvId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/improve-resume/imp-rewrite-usages-info?cvId=${cvId}`);

            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                if (response?.data?.errors) {
                    return rejectWithValue(response.data.errors);
                } else {
                    return rejectWithValue("Something went wrong.");
                }
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const generateImpSummary = createAsyncThunk(
    "dashboard/generateImpSummary",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await aiApi.post(
                "/agent/professional/summary",
                payload
            );
            if (res?.status === 200) {
                return res?.data;
            }
            return rejectWithValue(res?.data?.errors || "Something went wrong.");
        } catch (e) {
            return rejectWithValue(e?.response?.data || "Network error");
        }
    }
);

export const generateNewSummary = createAsyncThunk(
    "dashboard/generateNewSummary",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await aiApi.post(
                "/agent/Generate/professional/summary",
                payload
            );
            if (res?.status === 200) {
                return res?.data;
            }
            return rejectWithValue(res?.data?.errors || "Something went wrong.");
        } catch (e) {
            return rejectWithValue(e?.response?.data || "Network error");
        }
    }
);
export const generateImpExperience = createAsyncThunk(
    "dashboard/generateImpExperience",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await aiApi.post(
                "/agent/Experience/Description",
                payload
            );

            if (res?.status === 200) {
                return res?.data;
            }
            return rejectWithValue(res?.data?.errors || "Something went wrong.");
        } catch (e) {
            return rejectWithValue(e?.response?.data || "Network error");
        }
    }
);

export const checkGrammarlySentence = createAsyncThunk(
    "grammarly/checkSentence",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await aiApi.post(
                "/Grammarly/sentence/Agent",
                payload
            );

            console.log("Grammarly API response:", response);
            return response.data;

        } catch (err) {
            console.error("Grammarly API error:", err);
            return rejectWithValue(
                err?.response?.data || err.message
            );
        }
    }
);

export const fetchMissingSkills = createAsyncThunk(
    "dashboard/fetchMissingSkills",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await aiApi.post("/agent/JD/Missing/Skill", payload);
            if (res?.status === 200) {
                return res?.data;
            }
            return rejectWithValue(res?.data?.errors || "Something went wrong.");
        } catch (e) {
            return rejectWithValue(e?.response?.data || "Network error");
        }
    }
);





const initialState = {
    error: false,
    loading: false,
    improveResumeData: {},
    checkATSData: {},
    atsLoading: false,
    jdBasedResumeData: {},
    basiInfo: {},
    eduInfo: {},
    expInfo: {},
    cerInfo: {},
    achInfo: {},
    proInfo: {},
    skillsInfo: {},
    langInfo: {},
    jdBasedDetailsData: {},
    updateBasicInfoData: {},
    updateExperienceData: {},
    updateEducationData: {},
    updateSkillsData: {},
    updateLanguageData: {},
    updateExtraProjectData: {},
    updateCertificationData: {},
    updateAchievementsData: {},
    getUpdateResumeInfoData: {},
    atsScoreAnalyzeData: {},
    generatedQuestionsData: {},
    improveExperienceData: {},
    checkJdAtsData: {},
    jdBasedAtsScoreAnalyzeData: {},
    impBasedAtsScoreAnalyzeData: {},
    // IMP chat
    addImpQuestionsData: {},
    improveImpExperienceData: {},

    jdEnhance: {},
    jdEnUsageInfo: {},

    impEnhance: {},
    impEnUsageInfo: {},

    generateImpSummaryLoading: false,
    generateImpSummaryData: {},

    generateImpExperienceLoading: false,
    generateImpExperienceData: {},

    grammarlySentenceData: null,
    grammarlySentenceLoading: false,
    missingSkillsData: [],
    jobDescription: "",
}

const DashboardSlice = createSlice(
    {
        name: "dashboard",
        initialState,
        reducers: {
            resetImpSummary(state) {
                state.generateImpSummaryData = null;
            },
            resetImpExperience(state) {
                state.generateImpExperienceData = null;
            },
            setJobDescription: (state, action) => {
                state.jobDescription = action.payload;
            },
        },
        extraReducers: (builder) => {
            builder.addCase(improveResume.pending, (state, { payload }) => {
                state.loading = true
            })
            builder.addCase(improveResume.fulfilled, (state, { payload }) => {
                state.loading = false
                state.error = false
                state.improveResumeData = payload
            })
                .addCase(improveResume.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })

                .addCase(checkATS.pending, (state) => {
                    state.atsLoading = true;
                    state.error = null;
                })

                .addCase(checkATS.fulfilled, (state, { payload }) => {
                    state.atsLoading = false;
                    state.error = null;
                    state.checkATSData = payload;
                })

                .addCase(checkATS.rejected, (state, { payload }) => {
                    state.atsLoading = false;
                    state.error = payload || 'ATS score check failed';
                })

                .addCase(jdBasedResume.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(jdBasedResume.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.jdBasedResumeData = payload
                })
                .addCase(jdBasedResume.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })
                .addCase(jdBasedResumeBasicInfo.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(jdBasedResumeBasicInfo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.basiInfo = payload
                })
                .addCase(jdBasedResumeBasicInfo.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })
                .addCase(jdBasedResumeEducationInfo.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(jdBasedResumeEducationInfo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.eduInfo = payload
                })
                .addCase(jdBasedResumeEducationInfo.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })

                .addCase(jdBasedResumeExpInfo.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(jdBasedResumeExpInfo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.expInfo = payload
                })
                .addCase(jdBasedResumeExpInfo.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })

                .addCase(jdBasedResumeCertificateInfo.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(jdBasedResumeCertificateInfo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.cerInfo = payload
                })
                .addCase(jdBasedResumeCertificateInfo.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })


                .addCase(jdBasedResumeAchivmentInfo.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(jdBasedResumeAchivmentInfo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.achInfo = payload
                })
                .addCase(jdBasedResumeAchivmentInfo.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })
                .addCase(jdBasedResumeProjectsInfo.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(jdBasedResumeProjectsInfo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.proInfo = payload
                })
                .addCase(jdBasedResumeProjectsInfo.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })
                .addCase(jdBasedResumeSkillsInfo.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(jdBasedResumeSkillsInfo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.skillsInfo = payload
                })
                .addCase(jdBasedResumeSkillsInfo.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })

                .addCase(jdBasedResumeLanguageInfo.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(jdBasedResumeLanguageInfo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.langInfo = payload
                })
                .addCase(jdBasedResumeLanguageInfo.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })
                .addCase(jdBasedResumeDetails.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(jdBasedResumeDetails.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.jdBasedDetailsData = payload
                })
                .addCase(jdBasedResumeDetails.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })
                .addCase(updateBasicInfo.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(updateBasicInfo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.updateBasicInfoData = payload
                })
                .addCase(updateBasicInfo.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })
                .addCase(updateExperience.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(updateExperience.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.updateExperienceData = payload
                })
                .addCase(updateExperience.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })
                .addCase(updateEducation.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(updateEducation.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.updateEducationData = payload
                })
                .addCase(updateEducation.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })
                .addCase(updateSkills.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(updateSkills.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.updateSkillsData = payload
                })
                .addCase(updateSkills.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })
                .addCase(updateLanguage.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(updateLanguage.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.updateLanguageData = payload
                })
                .addCase(updateLanguage.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })
                .addCase(updateExtraProject.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(updateExtraProject.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.updateExtraProjectData = payload
                })
                .addCase(updateExtraProject.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })
                .addCase(updateCertification.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(updateCertification.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.updateCertificationData = payload
                })
                .addCase(updateCertification.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })
                .addCase(updateAchievements.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(updateAchievements.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.updateAchievementsData = payload
                })
                .addCase(updateAchievements.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })
                .addCase(getUpdateResumeInfo.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(getUpdateResumeInfo.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.getUpdateResumeInfoData = payload
                })
                .addCase(getUpdateResumeInfo.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })

                // Add for chat
                .addCase(getGeneratedQuestions.pending, (state) => {
                    state.loading = true;
                })
                .addCase(getGeneratedQuestions.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.error = false;
                    state.generatedQuestionsData = payload;
                })
                .addCase(getGeneratedQuestions.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                })

                .addCase(improveExperience.pending, (state) => {
                    state.loading = true;
                })
                .addCase(improveExperience.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.error = false;
                    state.improveExperienceData = payload;
                })
                .addCase(improveExperience.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                })

                .addCase(atsScoreAnalyze.pending, (state, { payload }) => {
                    state.loading = true

                })
                .addCase(atsScoreAnalyze.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                    state.atsScoreAnalyzeData = payload
                })
                .addCase(atsScoreAnalyze.rejected, (state, { payload }) => {
                    state.error = payload
                    state.loading = false
                })

                .addCase(checkJdAts.pending, (state) => {
                    state.loading = true;
                })
                .addCase(checkJdAts.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.error = false;
                    state.checkJdAtsData = payload;
                })
                .addCase(checkJdAts.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                })

                .addCase(jdBasedAtsScoreAnalyze.pending, (state) => {
                    state.loading = true;
                })
                .addCase(jdBasedAtsScoreAnalyze.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.error = false;
                    state.jdBasedAtsScoreAnalyzeData = payload;
                })
                .addCase(jdBasedAtsScoreAnalyze.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                })

                .addCase(impBasedAtsScoreAnalyze.pending, (state) => {
                    state.loading = true;
                })
                .addCase(impBasedAtsScoreAnalyze.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.error = false;
                    state.impBasedAtsScoreAnalyzeData = payload;
                })
                .addCase(impBasedAtsScoreAnalyze.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                })


                .addCase(addImpQuestions.pending, (state) => {
                    state.loading = true;
                })
                .addCase(addImpQuestions.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.error = false;
                    state.addImpQuestionsData = payload;
                })
                .addCase(addImpQuestions.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                })

                .addCase(improveImpExperience.pending, (state) => {
                    state.loading = true;
                })
                .addCase(improveImpExperience.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.error = false;
                    state.improveImpExperienceData = payload;
                })
                .addCase(improveImpExperience.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                })

                // ---------- JD ENHANCE ----------
                .addCase(getJdEnhance.pending, (state) => {
                    state.loading = true;
                    state.error = false;
                })
                .addCase(getJdEnhance.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.error = false;
                    state.jdEnhance = payload;
                })
                .addCase(getJdEnhance.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                })

                .addCase(jdEnhanceUsageInfo.pending, (state) => {
                    state.loading = true;
                })
                .addCase(jdEnhanceUsageInfo.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.error = false;
                    state.jdEnUsageInfo = payload;
                })
                .addCase(jdEnhanceUsageInfo.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                })


                // ---------- IMP ENHANCE ----------
                .addCase(getImpEnhance.pending, (state) => {
                    state.loading = true;
                    state.error = false;
                })
                .addCase(getImpEnhance.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.error = false;
                    state.impEnhance = payload;
                })
                .addCase(getImpEnhance.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                })

                .addCase(impEnhanceUsageInfo.pending, (state) => {
                    state.loading = true;
                })
                .addCase(impEnhanceUsageInfo.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.error = false;
                    state.impEnUsageInfo = payload;
                })
                .addCase(impEnhanceUsageInfo.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = payload;
                })

                // ---------- GENERATE IMP SUMMARY ----------
                .addCase(generateImpSummary.pending, (state) => {
                    state.generateImpSummaryLoading = true;
                    state.error = false;
                })
                .addCase(generateImpSummary.fulfilled, (state, { payload }) => {
                    state.generateImpSummaryLoading = false;
                    state.generateImpSummaryData = payload;
                })
                .addCase(generateImpSummary.rejected, (state, { payload }) => {
                    state.generateImpSummaryLoading = false;
                    state.error = payload;
                })

                // ---------- GENERATE IMP EXPERIENCE ----------
                .addCase(generateImpExperience.pending, (state) => {
                    state.generateImpExperienceLoading = true;
                    state.error = false;
                })
                .addCase(generateImpExperience.fulfilled, (state, { payload }) => {
                    state.generateImpExperienceLoading = false;
                    state.generateImpExperienceData = payload;
                })
                .addCase(generateImpExperience.rejected, (state, { payload }) => {
                    state.generateImpExperienceLoading = false;
                    state.error = payload;
                })

                .addCase(checkGrammarlySentence.pending, (state) => {
                    state.grammarlySentenceLoading = true;
                    state.error = null;
                })

                .addCase(checkGrammarlySentence.fulfilled, (state, action) => {
                    state.grammarlySentenceLoading = false;
                    state.grammarlySentenceData = action.payload;
                })

                .addCase(checkGrammarlySentence.rejected, (state, action) => {
                    state.grammarlySentenceLoading = false;
                    state.error = action.payload;
                })

                .addCase(fetchMissingSkills.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchMissingSkills.fulfilled, (state, payload) => {
                    state.loading = false;
                    state.missingSkillsData = payload;
                })
                .addCase(fetchMissingSkills.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch missing skills";
                });



        }
    }
)
export const { resetImpSummary, resetImpExperience, setJobDescription } = DashboardSlice.actions;
export default DashboardSlice.reducer;