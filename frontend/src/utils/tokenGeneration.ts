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

const getAccessToken = () => {
    const token = localStorage.getItem("access_token");
    return token;
};

const getRefreshToken = () => {
    const token = localStorage.getItem("refresh_token");
    return token;
};

const refreshAccessToken = async (): Promise<string> => {
    const refresh_token = getRefreshToken();
    if (!refresh_token) {
        throw new Error("No refresh token available");
    }

    const res = await axiosAuthInstance.post(
        `/auth/token`,
        {},
        {
            headers: {
                Authorization: `Bearer ${refresh_token}`,
            },
        }
    );

    const newAccessToken = res.data.access_token;
    localStorage.setItem("access_token", newAccessToken);
    return newAccessToken;
};

// ✅ Inject access token into all main API requests
axiosMainInstance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ✅ Handle token expiry and retry the failed request
axiosMainInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosMainInstance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);