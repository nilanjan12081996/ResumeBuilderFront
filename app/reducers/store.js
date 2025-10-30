'use client';

import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../reducers/AuthSlice';
import PwgnsSlice from '../reducers/PwgnsSlice';
import BlueConnectsSlice from '../reducers/BlueConnectsSlice';
import PlanSlice from '../reducers/PlanSlice'
import CoinSlice from '../reducers/CoinSlice'
import ProfileSlice from '../reducers/ProfileSlice'
import SearchHistroySlice from '../reducers/SearchHistroySlice'
import ResumeHistorySlice from '../reducers/ResumeHistorySlice'
import DashboardSlice from '../reducers/DashboardSlice'
import LinkedinSlice from '../reducers/LinkedinSlice'
import FeatureJobSlice from '../reducers/FeatureJobSlice'
import InviteSlice from '../reducers/InviteSlice'
import ResumeSlice from '../reducers/ResumeSlice'
import SupportSlice from '../reducers/SupportSlice'

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        pwg: PwgnsSlice,
        blueConnects: BlueConnectsSlice,
        planst: PlanSlice,
        coinData: CoinSlice,
        profile: ProfileSlice,
        his: SearchHistroySlice,
       dash:DashboardSlice,
        resHist:ResumeHistorySlice,
        linkedIn:LinkedinSlice,
        featJob:FeatureJobSlice,
        inviteStd:InviteSlice,
        resume:ResumeSlice,
        support:SupportSlice,
    },
    devTools: process.env.NODE_ENV,
});

export default store;
