'use client';

import axios from 'axios';
import { toast } from 'react-toastify';
const aiApi = axios.create({  baseURL: process.env.NEXT_PUBLIC_AI_BASE_URL });

const formDataURL = ['/user/user-profile/change-avatar', '/api/improve-resume/improve-resume','/api/js-based-resume/jd-based-improve','/api/linkedin-rewrite/upload-pdf','/api/csv/upload-csv','/agent/resume/upload'];
aiApi.interceptors.request.use((req) => {
    let userTokenData;
    try {
        // userTokenData = JSON.parse(sessionStorage.getItem('resumeToken'));c
         userTokenData = JSON.parse(localStorage.getItem('resumeToken'));
    } catch (error) {
        userTokenData = null;
    }
    let token = userTokenData && userTokenData.token ? userTokenData.token : null;
    req.headers['Content-Type'] = 'application/json';

    if (formDataURL.includes(req.url)) {
        req.headers['Content-Type'] = 'multipart/form-data';
    }
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    req.headers['x-api-key'] = 'dGhpc2lzZnJvbnRlbmQ=';
    return req;
});

aiApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && [401, 403].includes(error.response.status)) {
             localStorage.removeItem('resumeToken');;
        }
        return Promise.reject(error);
    }
);

export default aiApi;
