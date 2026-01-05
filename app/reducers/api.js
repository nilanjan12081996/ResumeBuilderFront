'use client';

import axios from 'axios';
import { toast } from 'react-toastify';
const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });

const formDataURL = ['/user/user-profile/change-avatar', '/api/improve-resume/improve-resume','/api/js-based-resume/jd-based-improve','/api/linkedin-rewrite/upload-pdf','/api/csv/upload-csv','/api/apply-job/apply','/api/improve-resume/extract-imp-resume','/api/js-based-resume/extract-info', '/api/linkedin-rewrite/extract-info'];
api.interceptors.request.use((req) => {
    let userTokenData;
    try {
        // userTokenData = JSON.parse(sessionStorage.getItem('resumeToken'));c
         userTokenData = JSON.parse(localStorage.getItem('resumeToken'));
    } catch (error) {
        userTokenData = null;
    }
    let token = userTokenData && userTokenData.token ? userTokenData.token : null;
    // Temp Hack to make formData work
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

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && [401, 403].includes(error.response.status)) {
            // sessionStorage.removeItem('resumeToken');c 
             localStorage.removeItem('resumeToken');
            // toast.error("You have been logout, Please login again");
        }
        return Promise.reject(error);
    }
);

export default api;
