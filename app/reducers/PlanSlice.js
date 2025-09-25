"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";
import axios from "axios";

export const getPlans = createAsyncThunk(
  "getPlans",
  async ({ plan_type, ip_address }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/plan/list?page=1&limit=20&plan_type=${plan_type}&ip_address=${ip_address}`
      );
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
export const createSubscriptions = createAsyncThunk(
  "createSubscriptions",
  async (user_input, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/payment/create-subscription",
        user_input
      );
      if (response?.data?.status_code === 201) {
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
export const getIpData = createAsyncThunk(
  "ip/getIpData", // Better naming convention with feature prefix
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");

      // ipify.org simply returns { "ip": "xxx.xxx.xxx.xxx" }
      // No status_code is returned by this API
      if (response?.data?.ip) {
        return response.data;
      } else {
        return rejectWithValue("Invalid response format");
      }
    } catch (err) {
      // Better error handling
      if (err.response?.data) {
        return rejectWithValue(err.response.data);
      } else if (err.message) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue("Failed to fetch IP address");
      }
    }
  }
);

export const completeSubscriptions = createAsyncThunk(
  "completeSubscriptions",
  async (user_input, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/payment/create-order", user_input);
      if (response?.data?.status_code === 201) {
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

export const createOrder = createAsyncThunk(
  "createOrder",
  async (user_input, { rejectWithValue }) => {
    try {
      console.log("createOrder API call - input:", user_input);
      const response = await api.post("/api/payment/create-order", user_input);
      console.log("createOrder API response:", response);
      console.log("createOrder API response data:", response?.data);

      if (response?.data?.status_code === 200) {
        console.log("createOrder API success - returning:", response.data);
        return response.data;
      } else {
        console.log(
          "createOrder API error - status_code:",
          response?.data?.status_code
        );
        if (response?.data?.errors) {
          return rejectWithValue(response.data.errors);
        } else {
          return rejectWithValue("Something went wrong.");
        }
      }
    } catch (err) {
      console.log("createOrder API catch error:", err);
      return rejectWithValue(err);
    }
  }
);
export const verifyOrder = createAsyncThunk(
  "verifyOrder",
  async (user_input, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/api/payment/verify-payment",
        user_input
      );
      if (response?.data?.success === true) {
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
export const currentSubscription = createAsyncThunk(
  "currentSubscription",
  async (user_input, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/api/payment/current-subscription",
        user_input
      );
      console.log("currentSubscription API call - input:", response);
      if (response?.data?.success === true) {
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

const initialState = {
  plans: [],
  error: false,
  loading: false,
  subs: [],
  comSubs: [],
  ipData: "",
  createOrderData: {},
  verifyOrderData: {},
  currentSubscriptionData: {},
};

const PlanSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlans.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.plans = payload;
        state.error = false;
      })
      .addCase(getPlans.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
       
      })
       .addCase(createSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSubscriptions.fulfilled, (state, { payload }) => {
        state.subs = payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(createSubscriptions.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })
       .addCase(completeSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(completeSubscriptions.fulfilled, (state, { payload }) => {
        state.comSubs = payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(completeSubscriptions.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })
       .addCase(getIpData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIpData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.ipData = payload;
        state.error = false;
      })
      .addCase(getIpData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
       .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.createOrderData = payload;
        state.error = false;
      })
      .addCase(createOrder.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
       .addCase(verifyOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.verifyOrderData = payload;
        state.error = false;
      })
      .addCase(verifyOrder.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
       .addCase(currentSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(currentSubscription.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentSubscriptionData = payload;
        state.error = false;
      })
      .addCase(currentSubscription.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default PlanSlice.reducer;
