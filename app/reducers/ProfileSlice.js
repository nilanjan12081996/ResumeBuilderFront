import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';


export const getProfile = createAsyncThunk(
    'getProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/user/user-profile/info');
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

export const checkSubscription = createAsyncThunk(
    'checkSubscription',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/user/user-profile/current-subscription');
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

export const cancelSubscription = createAsyncThunk(
    'cancelSubscription',
    async (user_input, { rejectWithValue }) => {
        try {
            const response = await api.post('/user/payment/cancel-subscription', user_input);
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

export const uploadPhoto = createAsyncThunk(
    'uploadPhoto',
    async (user_input, { rejectWithValue }) => {
        try {
            const response = await api.post('user/user-profile/change-avatar', user_input);
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

export const changePassword = createAsyncThunk(
    'changePassword',

    async (user_input, { rejectWithValue }) => {
        try {
            const response = await api.post('user/user-profile/change-password', user_input);
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
const initialState = {
    loading: false,
    profileData: [],
    subscriptionData: {},
    cancelSubsData: {},
    error: false,
    uploadpic: {},
    changePassData: {}
}
const ProfileSlice = createSlice(
    {
        name: 'prof',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(getProfile.pending, (state) => {
                    state.loading = true
                })
                .addCase(getProfile.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.profileData = payload
                    state.error = false
                })
                .addCase(getProfile.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(checkSubscription.pending, (state) => {
                    state.loading = true
                })
                .addCase(checkSubscription.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.subscriptionData = payload
                    state.error = false
                })
                .addCase(checkSubscription.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = false
                })
                .addCase(cancelSubscription.pending, (state) => {
                    state.loading = true
                })
                .addCase(cancelSubscription.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.cancelSubsData = payload
                    state.error = false
                })
                .addCase(cancelSubscription.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(uploadPhoto.pending, (state) => {
                    state.loading = true
                })
                .addCase(uploadPhoto.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.uploadpic = payload
                    state.error = false
                })
                .addCase(uploadPhoto.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(changePassword.pending, (state) => {
                    state.loading = true
                })
                .addCase(changePassword.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.changePassData = payload
                    state.error = false
                })
                .addCase(changePassword.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
        }
    }
)
export default ProfileSlice.reducer