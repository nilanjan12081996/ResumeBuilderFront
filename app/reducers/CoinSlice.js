'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from './api';
export const getCoins = createAsyncThunk(
    'getCoins',
    async (_, { rejectWithValue }) => {
        try {
            // const response = await axios.get('https://api.coingecko.com/api/v3/search/trending');
            const response = await axios.get('https://api.coinpaprika.com/v1/coins');
            console.log(response, "response Coins");

            if (response?.status === 200) {
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

export const getCoinsDetails = createAsyncThunk(
    'getCoinsDetails',
    async (user_input, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://n8nnode.bestworks.cloud/webhook/crypto', user_input);
            console.log(response, "response Coins");

            if (response?.status === 200) {
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

export const toSearchData = createAsyncThunk(
    'toSearchData',
    async (user_input, { rejectWithValue }) => {
        try {
            const response = await api.post('user/user-search-manage/add', user_input);
            console.log(response, "response Coins");

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

export const checkAvilableSearch = createAsyncThunk(
    'checkAvilableSearch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('user/user/search-available');
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
    error: false,
    coins: [],
    coinsDatas: [],
    forSearch: [],
    avilableData: [],
    isclick: false,
}
const CoinSlice = createSlice(
    {
        name: 'coin',
        initialState,
        reducers: {
            setIsClick: (state, action) => {
                state.isclick = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(getCoins.pending, (state) => {
                state.loading = true
            })
                .addCase(getCoins.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.coins = payload
                    state.error = false
                })
                .addCase(getCoins.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(getCoinsDetails.pending, (state) => {
                    state.loading = true
                })
                .addCase(getCoinsDetails.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.coinsDatas = payload
                    state.error = false
                })
                .addCase(getCoinsDetails.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(toSearchData.pending, (state) => {
                    state.loading = true
                })
                .addCase(toSearchData.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.forSearch = payload
                    state.error = false
                })
                .addCase(toSearchData.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
                .addCase(checkAvilableSearch.pending, (state) => {
                    state.loading = true
                })
                .addCase(checkAvilableSearch.fulfilled, (state, { payload }) => {
                    state.loading = false
                    state.avilableData = payload
                    state.error = false
                })
                .addCase(checkAvilableSearch.rejected, (state, { payload }) => {
                    state.loading = false
                    state.error = payload
                })
        }
    }
)
export const { setIsClick } = CoinSlice.actions
export default CoinSlice.reducer