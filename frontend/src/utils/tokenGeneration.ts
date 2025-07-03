import axios from 'axios';

const MAIN_LINK = process.env.NEXT_PUBLIC_MAIN_API_URL;
const AUTH_LINK = process.env.NEXT_PUBLIC_AUTH_API_URL;

export const axiosMainInstance = axios.create({
    baseURL: MAIN_LINK,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // Important for sending cookies
});

export const axiosAuthInstance = axios.create({
    baseURL: AUTH_LINK,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // Also needed here
});

const refreshAccessToken = async () => {
    try {
        await axiosAuthInstance.post(`/auth/token`);
    } catch (error) {
        throw error;
    }
};

axiosMainInstance.interceptors.response.use(
    (response) => response,  // Always return the response if it's successful
    async (error) => {

        // Make sure the error is a 401
        if (error.response?.status === 401 && !error.config._retry) {

            const originalRequest = error.config;
            originalRequest._retry = true;  // Mark the original request as retried

            try {
                // Try to refresh the token
                await refreshAccessToken();
                return axiosMainInstance(originalRequest); // Retry the original request
            } catch (refreshError) {
                return Promise.reject(refreshError); // Reject if token refresh fails
            }
        }

        return Promise.reject(error); // Reject other errors
    }
);
