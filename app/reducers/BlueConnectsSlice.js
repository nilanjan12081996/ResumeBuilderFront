import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api";

export const activateNewSubscriber = createAsyncThunk(
    'blueConnects/activateNewSubscriber',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/v1/customer/active-new-subscriber', userInput);
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

export const subscriberInquiry = createAsyncThunk(
    'blueConnects/subscriberInquiry',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/v1/customer/subscriber-inquiry', userInput);
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

export const buyPlan = createAsyncThunk(
    'blueConnects/buyPlan',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/v1/customer/buy-plan', userInput);
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

export const switchPlan = createAsyncThunk(
    'blueConnects/switchPlan',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/v1/customer/switch-plan', userInput);
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
    loadingActivateNewSubscriber: false,
    activatedNewSubscriber: {},
    activatedNewSubscriberError: {},
    loadingSubscriberInquiry: false,
    subscriberInquiryData: {},
    subscriberInquiryError: {},
    loadingBuyPlan: false,
    buyPlanData: {},
    buyPlanError: {},
    loadingSwitchPlan: false,
    switchPlanData: {},
    switchPlanError: {},
}

const blueConnectsSlice = createSlice({
    name: 'blueConnects',
    initialState,
    reducers: {
        resetStatesBlueConnects: (state) => {
            state.message = null;
            state.loadingActivateNewSubscriber = false;
            state.activatedNewSubscriber = {};
            state.activatedNewSubscriberError = {};
            state.loadingSubscriberInquiry = false;
            state.subscriberInquiryData = {};
            state.subscriberInquiryError = {};
            state.loadingBuyPlan = false;
            state.buyPlanData = {};
            state.buyPlanError = {};
            state.loadingSwitchPlan = false;
            state.switchPlanData = {};
            state.switchPlanError = {};
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(activateNewSubscriber.pending, (state) => {
                state.loadingActivateNewSubscriber = true;
                state.activatedNewSubscriberError = null;
            })
            .addCase(activateNewSubscriber.fulfilled, (state, { payload }) => {
                state.loadingActivateNewSubscriber = false;
                state.activatedNewSubscriber = payload;
            })
            .addCase(activateNewSubscriber.rejected, (state, { payload }) => {
                console.log("payload", payload)
                state.loadingActivateNewSubscriber = false;
                state.activatedNewSubscriberError = payload?.response?.data?.message?.message?.description;
            })

            .addCase(subscriberInquiry.pending, (state) => {
                state.loadingSubscriberInquiry = true;
                state.subscriberInquiryError = null;
            })
            .addCase(subscriberInquiry.fulfilled, (state, { payload }) => {
                state.loadingSubscriberInquiry = false;
                state.subscriberInquiryData = payload;
            })
            .addCase(subscriberInquiry.rejected, (state, { payload }) => {
                console.log("payload", payload)
                state.loadingSubscriberInquiry = false;
                state.subscriberInquiryError = payload?.response?.data?.message?.message?.description;
            })

            .addCase(buyPlan.pending, (state) => {
                state.loadingBuyPlan = true;
                state.buyPlanError = null;
            })
            .addCase(buyPlan.fulfilled, (state, { payload }) => {
                state.loadingBuyPlan = false;
                state.buyPlanData = payload;
            })
            .addCase(buyPlan.rejected, (state, { payload }) => {
                console.log("payload", payload)
                state.loadingBuyPlan = false;
                state.buyPlanError = payload?.response?.data?.message?.message?.description;
            })

            .addCase(switchPlan.pending, (state) => {
                state.loadingSwitchPlan = true;
                state.switchPlanError = null;
            })
            .addCase(switchPlan.fulfilled, (state, { payload }) => {
                state.loadingSwitchPlan = false;
                state.switchPlanData = payload;
            })
            .addCase(switchPlan.rejected, (state, { payload }) => {
                console.log("payload", payload)
                state.loadingSwitchPlan = false;
                state.switchPlanError = payload?.response?.data?.message?.message?.description;
            })

    },
});

export const { resetStatesBlueConnects } = blueConnectsSlice.actions;

export default blueConnectsSlice.reducer;