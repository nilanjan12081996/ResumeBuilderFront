'use client';

import axios from 'axios';
import { toast } from 'react-toastify';
const apiPwgBlue = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });

const formDataURL = [''];
apiPwgBlue.interceptors.request.use((req) => {
    let userTokenData;
    try {
        userTokenData = JSON.parse(sessionStorage.getItem('getMobileToken'));
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

    // req.headers['x_access_token'] = 'opencom_sk8def63cb-ada0-45d9-bf00-239b58392ecf-84cc1ba9-7368-4ab7-b1e3-62cb531458a8';
    console.log('Request headers:', req.headers);

    return req;
});

apiPwgBlue.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && [401, 403].includes(error.response.status)) {
            sessionStorage.removeItem('getMobileToken');
            // toast.error("You have been logout, Please login again");
        }
        return Promise.reject(error);
    }
);

export default apiPwgBlue;
