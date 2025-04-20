import axios from 'axios';

const MAIN_LINK = process.env.NEXT_PUBLIC_MAIN_API_URL;
const AUTH_LINK = process.env.NEXT_PUBLIC_AUTH_API_URL;

export const axiosMainInstance = axios.create({
    baseURL: MAIN_LINK,
    headers: { 'Content-Type': 'application/json' },
});

export const axiosAuthInstance = axios.create({
    baseURL: AUTH_LINK,
    headers: { 'Content-Type': 'application/json' },
});

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    try {
        console.log("Auth_Link: ", AUTH_LINK);
        const response = await axiosAuthInstance.post(`/auth/token`, { token: refreshToken });

        const newAccessToken = response.data.access_token;
        localStorage.setItem('accessToken', newAccessToken);

        return newAccessToken;
    } catch (error) {
        throw error;
    }
};

axiosMainInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

axiosMainInstance.interceptors.response.use(
    (response) => response,
    async (error) => {

        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;

            try {
                const newToken = await refreshAccessToken();

                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                if (originalRequest.baseURL === AUTH_LINK) {
                    return axiosAuthInstance(originalRequest);
                } else {
                    return axiosMainInstance(originalRequest);
                }
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
