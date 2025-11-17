'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
import serverApi from './serverApi';

export const registerCustomer = createAsyncThunk(
    'registerCustomer',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await serverApi.post('/api/auth/register', userInput);
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
);

export const registerCustomerOrg = createAsyncThunk(
    'registerCustomerOrg',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/auth/signup/organisation', userInput);
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
);

export const getSignupType = createAsyncThunk(
    'getSignupType',
    async (_, { rejectWithValue }) => {
        try {
            const response = await serverApi.get('/api/signup-type/type-list');
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

export const otpVerifyCustomer = createAsyncThunk(
    'otpVerifyCustomer',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/v1/customer/auth/verify-otp', userInput);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.response);

            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

export const resendOtpCustomer = createAsyncThunk(
    'resendOtpCustomer',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/v1/customer/auth/resend-otp', userInput);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                if (response?.data?.errors) {
                    return rejectWithValue(response.data.errors);
                } else {
                    return rejectWithValue('Failed to send OTP');
                }
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const loginCustomer = createAsyncThunk(
    'loginCustomer',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await serverApi.post('/api/auth/login', userInput);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.response);

            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getProfile = createAsyncThunk(
    'getProfile',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await serverApi.get('/api/auth/profile', userInput);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.response);

            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const updateProfile = createAsyncThunk(
    'updateProfile',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await serverApi.post('/api/user/profile-update', userInput);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.response);

            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const changePassword = createAsyncThunk(
    'changePassword',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await serverApi.post('/api/user/password-update', userInput);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.response);

            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


export const detectIccid = createAsyncThunk(
    'detectIccid',
    async (iccid, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/v1/customer/detect-iccid?iccid=${iccid}`);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.response);

            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const googleSignIn = createAsyncThunk(
    'auth/google-signIn',
    async (token, { rejectWithValue }) => {
        try {
            const response = await serverApi.post('api/auth/google-login', token);
            if (response?.data?.status_code === 200) {
                console.log(response?.data, "response?.data")
                return response.data;
            } else {
                // Handle the case when status code is not 200
                return rejectWithValue(response.data.message);
            }
        } catch (error) {
            let errors = errorHandler(error);
            return rejectWithValue(errors);
        }
    }
);

export const addType = createAsyncThunk(
    'auth/addType',
    async (token, { rejectWithValue }) => {
        try {
            const response = await serverApi.post('api/auth/add-type', token);
            if (response?.data?.status_code === 200) {
                console.log(response?.data, "response?.data")
                return response.data;
            } else {
                // Handle the case when status code is not 200
                return rejectWithValue(response.data.message);
            }
        } catch (error) {
            let errors = errorHandler(error);
            return rejectWithValue(errors);
        }
    }
);

/* ----------------------  FORGOT PASSWORD ---------------------- */
export const forgotPassword = createAsyncThunk(
    'forgotPassword',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await serverApi.post('/api/auth/forget-pw-via-link-send', userInput);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.response || 'Failed to send reset link');
            }
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

export const resetPassword = createAsyncThunk(
    "resetPassword",
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await serverApi.post("/api/auth/reset-password", userInput);

            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data.response);
            }
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

export const resendOtpNew = createAsyncThunk(
    'auth/resendOtpNew',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await serverApi.get(`/api/auth/resend?id=${id}`);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.message || 'Failed to resend OTP');
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const verifyOtpNew = createAsyncThunk(
    'auth/verifyOtpNew',
    async (payload, { rejectWithValue }) => {
        // payload = { otp: 822312, id: 42 }
        try {
            const response = await serverApi.post(`/api/auth/verify-otp`, payload);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response?.data?.message || 'OTP verification failed');
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);



const initialState = {
    message: null,
    error: null,
    loading: false,
    isLoggedIn: false,
    loadingIccid: false,
    signUpTypes: [],
    loginData: [],
    profData: [],
    isGoogleLoggedIn: null,
    addTypeData: ""
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearCurrentUser: (state) => {
            state.currentUser = {};
        },
        resetAfterLoggedIn: (state) => {
            state = { ...initialState, isLoggedIn: true };
        },
        logout: (state) => {
            state.isLoggedIn = false;
            sessionStorage.removeItem('resumeToken');
            sessionStorage.removeItem('user_id');
            sessionStorage.removeItem('fullname')
            sessionStorage.removeItem('signup_type_id')
            localStorage.removeItem('projects')
            sessionStorage.clear()
            localStorage.clear()
            localStorage.removeItem('jd_resume_raw_experience')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerCustomer.pending, (state) => {
                state.message = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(registerCustomer.fulfilled, (state, { payload }) => {
                const { access_token, data, refresh_token } = payload;

                state.loading = false;
                state.isLoggedIn = true;
                state.message = payload;
                sessionStorage.setItem(
                    'resumeToken',
                    JSON.stringify({ token: access_token })
                );

                sessionStorage.setItem(
                    'signup_type_id',
                    JSON.stringify({ signup_type_id: data?.signUpType[0]?.UserSignUpTypeMap?.sign_up_type_id })
                );
                sessionStorage.setItem(
                    'user_id',
                    JSON.stringify({ user_id: data?.id })
                );
            })
            .addCase(registerCustomer.rejected, (state, { payload }) => {

                state.loading = false;
                state.error = payload;
            })

            .addCase(otpVerifyCustomer.pending, (state) => {
                state.loading = true
            })
            .addCase(otpVerifyCustomer.fulfilled, (state, { payload }) => {
                state.loading = false
                state.message = payload
                state.error = false
            })
            .addCase(otpVerifyCustomer.rejected, (state, { payload }) => {
                state.error = true;
                state.message =
                    payload !== undefined && payload.message
                        ? payload.message
                        : 'Something went wrong. Try again later.';
            })

            .addCase(resendOtpCustomer.pending, (state) => {
                state.loading = true
            })
            .addCase(resendOtpCustomer.fulfilled, (state, { payload }) => {
                state.loading = false
                state.message = payload
                state.error = false
            })
            .addCase(resendOtpCustomer.rejected, (state, { payload }) => {
                state.error = true;
                state.message =
                    payload !== undefined && payload.message
                        ? payload.message
                        : 'Something went wrong. Try again later.';
            })

            .addCase(loginCustomer.pending, (state) => {
                state.loading = true;
                state.isLoggedIn = false;
                state.error = false;
            })
            .addCase(loginCustomer.fulfilled, (state, { payload }) => {

                const { access_token, data, refresh_token } = payload;
                console.log(data, "loginCustomer");

                state.loading = false;
                state.isLoggedIn = true;
                localStorage.setItem('projects', JSON.stringify({ projects: data?.project }))
                sessionStorage.setItem(
                    'user_id',
                    JSON.stringify({ user_id: data?.id })
                );
                sessionStorage.setItem(
                    'fullname',
                    JSON.stringify({ fullname: data?.fullname })
                );
                sessionStorage.setItem(
                    'signup_type_id',
                    JSON.stringify({ signup_type_id: data?.signUpType[0]?.UserSignUpTypeMap?.sign_up_type_id })
                );
                // sessionStorage.setItem(
                //     'resumeToken',
                //     JSON.stringify({ token: access_token })
                // );
            })
            .addCase(loginCustomer.rejected, (state, { payload }) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.error = true;
                state.message =
                    payload !== undefined && payload.message
                        ? payload.message
                        : 'Something went wrong. Try again later.';
            })

            .addCase(detectIccid.pending, (state) => {
                state.loadingIccid = true
            })
            .addCase(detectIccid.fulfilled, (state, { payload }) => {
                state.loadingIccid = false
                state.message = payload
                state.error = false
            })
            .addCase(detectIccid.rejected, (state, { payload }) => {
                state.loadingIccid = false
                state.error = true;
                state.message =
                    payload !== undefined && payload.message
                        ? payload.message
                        : 'Something went wrong. Try again later.';
            })
            .addCase(registerCustomerOrg.pending, (state) => {
                state.message = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(registerCustomerOrg.fulfilled, (state, { payload }) => {
                const { access_token, data, refresh_token } = payload;
                console.log("payload", payload);

                state.loading = false;
                state.isLoggedIn = true;
                state.message = payload;
                sessionStorage.setItem(
                    'resumeToken',
                    JSON.stringify({ token: access_token })
                );
            })
            .addCase(registerCustomerOrg.rejected, (state, { payload }) => {

                state.loading = false;
                state.error = payload;
            })
            .addCase(getSignupType.pending, (state) => {
                state.message = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(getSignupType.fulfilled, (state, { payload }) => {

                state.loading = false;
                state.signUpTypes = payload
            })
            .addCase(getSignupType.rejected, (state, { payload }) => {

                state.loading = false;
                state.error = payload;
            })
            .addCase(getProfile.pending, (state) => {
                state.message = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, { payload }) => {

                state.loading = false;
                state.profData = payload
            })
            .addCase(getProfile.rejected, (state, { payload }) => {

                state.loading = false;
                state.error = payload;
            })
            .addCase(googleSignIn.pending, (state) => {
                state.loading = false

            })
            .addCase(googleSignIn.fulfilled, (state, { payload }) => {
                console.log("response?.data", payload)
                const { access_token, data, refresh_token } = payload;
                state.loading = false;
                state.isLoggedIn = true;
                state.isGoogleLoggedIn = true
                sessionStorage.setItem(
                    'user_id',
                    JSON.stringify({ user_id: data?.id })
                );
                console.log("response?.data", access_token)
                // sessionStorage.setItem(
                //     'resumeToken',
                //     JSON.stringify({ token: access_token })
                // );
            })
            .addCase(googleSignIn.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            .addCase(addType.pending, (state) => {
                state.loading = true
            })
            .addCase(addType.fulfilled, (state, { payload }) => {
                state.loading = false
                state.addTypeData = payload
                state.error = false
            })
            .addCase(addType.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })


            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.message = payload;
            })
            .addCase(forgotPassword.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })


            .addCase(resendOtpNew.pending, (state) => {
                state.loading = true;
            })
            .addCase(resendOtpNew.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.message = payload;
                state.error = null;
            })
            .addCase(resendOtpNew.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            .addCase(verifyOtpNew.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtpNew.fulfilled, (state, { payload }) => {
                const { access_token } = payload; // get token from payload

                state.loading = false;
                state.message = payload;
                state.error = null;
                state.isLoggedIn = true;

                // Save only the access token
                if (access_token) {
                    sessionStorage.setItem('resumeToken', JSON.stringify({ token: access_token }));
                }
            })

            .addCase(verifyOtpNew.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            // RESET PASSWORD
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = null;
                state.message = payload?.message || "Password reset successful";
            })
            .addCase(resetPassword.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload?.message || "Something went wrong";
            })


    },
});
export const { clearCurrentUser, resetAfterLoggedIn, logout } = authSlice.actions;

export default authSlice.reducer;
