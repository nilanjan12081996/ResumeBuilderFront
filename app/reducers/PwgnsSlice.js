'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const activeEsn = createAsyncThunk(
    'pwg/activeEsn',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/v1/customer/active-esn', userInput);
            console.log("response: ", response);

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

export const addWfc = createAsyncThunk(
    'pwg/addWfc',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/v1/customer/add-wfc-address', userInput);
            console.log("response: ", response);

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

export const updateE911 = createAsyncThunk(
    'pwg/updateE911',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/v1/customer/update-e911addres', userInput);
            console.log("response: ", response);

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

export const purchasePlan = createAsyncThunk(
    'pwg/purchasePlan',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/v1/customer/purchase-plan', userInput);
            console.log("response: ", response);

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
    message: null,
    loadingActiveEsn: false,
    esnActive: {},
    activeEsnError: {},
    loadingAddWfc: false,
    addWfcData: {},
    addWfcError: {},
    loadingUpdateE911: false,
    updateE911Data: {},
    updateE911Error: {},
    loadingPurchasePlan: false,
    purchasePlanData: {},
    purchasePlanError: {},
};

const pwgnsSlice = createSlice({
    name: 'pwg',
    initialState,
    reducers: {
        resetStatesPwg: (state) => {
            state.message = null;
            state.loadingActiveEsn = false;
            state.esnActive = {};
            state.activeEsnError = {};
            state.loadingAddWfc = false;
            state.addWfcData = {};
            state.addWfcError = {};
            state.loadingUpdateE911 = false;
            state.updateE911Data = {};
            state.updateE911Error = {};
            state.loadingPurchasePlan = false;
            state.purchasePlanData = {};
            state.purchasePlanError = {};
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(activeEsn.pending, (state) => {
                state.loadingActiveEsn = true;
                state.activeEsnError = null;
            })
            .addCase(activeEsn.fulfilled, (state, { payload }) => {
                state.loadingActiveEsn = false;
                state.esnActive = payload;
            })
            .addCase(activeEsn.rejected, (state, { payload }) => {
                console.log("Payload", payload);
                state.loadingActiveEsn = false;
                state.activeEsnError = payload?.response?.data?.message?.message?.error?.message;
            })

            .addCase(addWfc.pending, (state) => {
                state.loadingAddWfc = true;
                state.addWfcError = null;
            })
            .addCase(addWfc.fulfilled, (state, { payload }) => {
                state.loadingAddWfc = false;
                state.addWfcData = payload;
            })
            .addCase(addWfc.rejected, (state, { payload }) => {
                console.log("Payload", payload);
                state.loadingAddWfc = false;
                state.addWfcError = payload?.response?.data?.message?.message?.error?.message;
            })

            .addCase(updateE911.pending, (state) => {
                state.loadingUpdateE911 = true;
                state.updateE911Error = null;
            })
            .addCase(updateE911.fulfilled, (state, { payload }) => {
                state.loadingUpdateE911 = false;
                state.updateE911Data = payload;
            })
            .addCase(updateE911.rejected, (state, { payload }) => {
                console.log("Payload", payload);
                state.loadingUpdateE911 = false;
                state.updateE911Error = payload?.response?.data?.message?.message?.error?.message;
            })

            .addCase(purchasePlan.pending, (state) => {
                state.loadingPurchasePlan = true;
                state.purchasePlanError = null;
            })
            .addCase(purchasePlan.fulfilled, (state, { payload }) => {
                state.loadingPurchasePlan = false;
                state.purchasePlanData = payload;
            })
            .addCase(purchasePlan.rejected, (state, { payload }) => {
                console.log("Payload", payload);
                state.loadingPurchasePlan = false;
                state.purchasePlanError = payload?.response?.data?.message?.message?.error?.message;
            })


    },
});

export const { resetStatesPwg } = pwgnsSlice.actions;

export default pwgnsSlice.reducer;