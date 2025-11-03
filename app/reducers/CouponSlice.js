'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

// Apply Coupon
export const applyCoupon = createAsyncThunk(
  'applyCoupon',
  async (couponData, { rejectWithValue }) => {
    try {
      const response = await api.post('/coupon/apply', couponData);
      if (response?.data?.status_code === 200 || response?.data?.status_code === 201) {
        return response.data;
      } else {
        return rejectWithValue(response?.data?.errors || response?.data?.message || 'Something went wrong');
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  loading: false,
  error: false,
  appliedCoupon: null,
};

const CouponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    clearCouponState: (state) => {
      state.appliedCoupon = null;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(applyCoupon.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.appliedCoupon = payload;
        state.error = false;
      })
      .addCase(applyCoupon.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearCouponState } = CouponSlice.actions;
export default CouponSlice.reducer;
