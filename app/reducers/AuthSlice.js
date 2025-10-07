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


const initialState = {
    message: null,
    error: null,
    loading: false,
    isLoggedIn: false,
    loadingIccid: false,
    signUpTypes:[],
    loginData:[]
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
                console.log(data,"loginCustomer");
                
                state.loading = false;
                state.isLoggedIn = true;
                localStorage.setItem('projects',JSON.stringify({projects:data?.project}))
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
                sessionStorage.setItem(
                    'resumeToken',
                    JSON.stringify({ token: access_token })
                );
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
                console.log("payload",payload);
                
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
                state.signUpTypes=payload
            })
            .addCase(getSignupType.rejected, (state, { payload }) => {

                state.loading = false;
                state.error = payload;
            })


    },
});
export const { clearCurrentUser, resetAfterLoggedIn, logout } = authSlice.actions;

export default authSlice.reducer;
