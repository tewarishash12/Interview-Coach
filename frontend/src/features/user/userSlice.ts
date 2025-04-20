// features/user/userSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosAuthInstance, axiosMainInstance } from "@/utils/tokenCreation";
import {
    AuthResponse,
    RegisterResponse,
    User,
    UserState,
} from "./userTypes";

const initialState: UserState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    isError: false,
    errorMessage: null,
    isAuthenticated: false
};

// 👉 Async Thunks

export const registerUser = createAsyncThunk<
    RegisterResponse,
    { name: string; email: string; password: string },
    { rejectValue: string }
>("user/register", async (data, thunkAPI) => {
    try {
        const res = await axiosAuthInstance.post("/auth/register", data);
        return res.data;
    } catch (error: unknown) {
        if (error instanceof Error)
            return thunkAPI.rejectWithValue(error.message);
        return thunkAPI.rejectWithValue('Transcription failed');
    }
});

export const loginUser = createAsyncThunk<
    AuthResponse,
    { email: string; password: string },
    { rejectValue: string }
>("user/login", async (data, thunkAPI) => {
    try {
        const res = await axiosAuthInstance.post("/auth/login", data);
        const { access_token, refreshToken } = res.data;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refreshToken);
        return res.data;
    } catch (error: unknown) {
        if (error instanceof Error)
            return thunkAPI.rejectWithValue(error.message);
        return thunkAPI.rejectWithValue('Transcription failed');
    }
});

export const logoutUser = createAsyncThunk<
    { message: string },
    void,
    { state: { user: UserState }; rejectValue: string }
>("user/logout", async (_, thunkAPI) => {
    try {
        const refreshToken = thunkAPI.getState().user.refreshToken;
        await axiosAuthInstance.post("/auth/logout", { token: refreshToken });
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return { message: "Logged out successfully" };
    } catch (error: unknown) {
        if (error instanceof Error)
            return thunkAPI.rejectWithValue(error.message);
        return thunkAPI.rejectWithValue('Transcription failed');
    }
});

export const fetchUserData = createAsyncThunk<
    User, // The expected response type is User
    void, // No arguments are needed when calling the function
    { rejectValue: string }
>(
    "user/fetchUserData",
    async (_, thunkAPI) => {
        try {
            const accessToken = localStorage.getItem("access_token");
            if (!accessToken) {
                return thunkAPI.rejectWithValue("No access token found");
            }

            const res = await axiosMainInstance.get("/users/me");
            return res.data.user; // The response should contain the user object
        } catch (error: unknown) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue("Failed to fetch user data");
        }
    }
);

export const refreshAccessToken = createAsyncThunk<
    { access_token: string },
    void,
    { state: { user: UserState }; rejectValue: string }
>("user/refreshToken", async (_, thunkAPI) => {
    try {
        const refreshToken = thunkAPI.getState().user.refreshToken;
        const res = await axiosAuthInstance.post("/auth/token", { token: refreshToken });
        localStorage.setItem("access_token", res.data.access_token);
        return { access_token: res.data.access_token };
    } catch (error: unknown) {
        if (error instanceof Error)
            return thunkAPI.rejectWithValue(error.message);
        return thunkAPI.rejectWithValue('Transcription failed');
    }
});

// 👉 Slice

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.errorMessage = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload || "Registration failed";
            })

            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.accessToken = action.payload.access_token;
                state.refreshToken = action.payload.refreshToken;
                state.isLoading = false;
                state.isError = false;
                state.errorMessage = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload || "Login failed";
            })

            // Fetch User Data
            .addCase(fetchUserData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.user = action.payload; // Store the user data
                state.isLoading = false;
                state.isError = false;
                state.errorMessage = null;
                state.isAuthenticated = true;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload || "Failed to fetch user data";
            })

            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuthenticated = false;
            })

            // Refresh Token
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.access_token;
            })
            .addCase(refreshAccessToken.rejected, (state, action) => {
                state.isError = true;
                state.errorMessage = action.payload || "Token refresh failed";
            });
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

