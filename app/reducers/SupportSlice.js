import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

// ===========================
// POST Support Ticket
// ===========================
export const postSupportTicket = createAsyncThunk(
  'support/postSupportTicket',
  async (user_input, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/support/submit', user_input);

      if (response?.data) {
        return response.data;
      } else {
        if (response?.data?.errors) {
          return rejectWithValue(response.data.errors);
        } else {
          return rejectWithValue('Something went wrong.');
        }
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
  supportData: {},
  error: null,
};

// ===========================
// Slice Definition
// ===========================
const SupportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    resetSupportState: (state) => {
      state.loading = false;
      state.supportData = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSupportTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(postSupportTicket.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.supportData = payload;
        state.error = null;
      })
      .addCase(postSupportTicket.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { resetSupportState } = SupportSlice.actions;
export default SupportSlice.reducer;
