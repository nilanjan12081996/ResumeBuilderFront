import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

// ===========================
// GET Transactions (No Token)
// ===========================
export const getTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/transactions/history-list');

      if (response?.data) {
        return response.data;
      } else {
        return rejectWithValue(response?.data?.errors || "Something went wrong.");
      }

    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

// ===========================
// Initial State
// ===========================
const initialState = {
  loading: false,
  transactionsData: {},
  error: null,
};

// ===========================
// Slice Definition
// ===========================
const TransactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    resetTransactionsState: (state) => {
      state.loading = false;
      state.transactionsData = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactions.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.transactionsData = payload;
        state.error = null;
      })
      .addCase(getTransactions.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { resetTransactionsState } = TransactionsSlice.actions;
export default TransactionsSlice.reducer;
