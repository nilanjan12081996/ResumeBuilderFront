'use client';

const errorHandler = (errorsData) => {
    let errors = {};
    errors.message = errorsData;
    let statusCode = errorsData?.response?.status
        ? errorsData.response.status
        : undefined;
    if (statusCode) {
        switch (statusCode) {
            case 402:
                errors.message = errorsData?.response?.data?.message
                    ? errorsData.response.data.message
                    : 'Something went wrong. Please try again later';
                errors.statusCode = errorsData?.response?.data?.status_code
                    ? errorsData.response.data.status_code
                    : '';

                break;
            case 403:
                break;
            case 422:
                errors.message = errorsData?.response?.data?.errors
                    ? errorsData.response.data.errors
                    : 'Validation error';


                break;
            default:
                errors.message = errorsData?.response?.data?.error
                    ? errorsData.response.data.error
                    : 'Something went wrong. Please try again later';
                break;
        }
    } else if (errorsData.code === 'ERR_NETWORK') {
        errors.message = 'API server network error';
    }

    return errors;
};

export default errorHandler;
