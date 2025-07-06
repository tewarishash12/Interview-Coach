import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthActionResponse, AuthLoginResponse, InitialUserState } from "./auth.types";
import { axiosAuthInstance, axiosMainInstance } from "@/utils/tokenGeneration";
import { rejectWithError } from "@/utils/errorHandling";

export const registerUser = createAsyncThunk<
    AuthActionResponse,
    { name: string, email: string, password: string },
    { rejectValue: string }
>("user/register", async (data, thunkAPI) => {
    try {
        const res = await axiosAuthInstance.post("/auth/register", data);
        return res.data;
    } catch (error) {
        return rejectWithError(error, thunkAPI, "Registration Failed")
    }
});

export const verifyEmail = createAsyncThunk<
    { message: string },     // Response type
    string,                  // Token
    { rejectValue: string }  // Rejection type
>("user/verifyEmail", async (token, thunkAPI) => {
    try {
        const res = await axiosAuthInstance.get(`/auth/verify-email?token=${token}`);
        return res.data;
    } catch (error) {
        return rejectWithError(error, thunkAPI, "Email verification failed");
    }
});

export const loginUser = createAsyncThunk<
    AuthLoginResponse,
    { email: string, password: string },
    { rejectValue: string }
>("user/login", async (data, thunkAPI) => {
    try {
        const res = await axiosAuthInstance.post("/auth/login", data);
        return res.data;
    } catch (error) {
        return rejectWithError(error, thunkAPI, "Login Failed");
    }
});

export const logoutUser = createAsyncThunk<
    AuthActionResponse,
    void,
    {
        state: { auth: InitialUserState };
        rejectValue: string
    }
>("user/logout", async (_, thunkAPI) => {
    try {
        const res = await axiosAuthInstance.post("/auth/logout", {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("refresh_token")}`
            }
        });
        return res.data;
    } catch (error) {
        return rejectWithError(error, thunkAPI, "Login Failed");
    }
});

export const fetchUserData = createAsyncThunk<
    InitialUserState,
    void,
    { rejectValue: string }
>("user/info", async (_, thunkAPI) => {
    try {
        const res = await axiosMainInstance.get("/users/me");
        return res.data;
    } catch (error) {
        return rejectWithError(error, thunkAPI, "Login Failed");
    }
})

const initialState: InitialUserState = {
    user: null,
    isRegisteringIn: false,
    isVerifyingToken:false,
    isLoggingIn: false,
    isLoggingOut: false,
    isFetchingUser: false,
    isAuthenticated: false,
    errorMessage: null,
    successMessage: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //registerUser call states
            .addCase(registerUser.pending, (state) => {
                state.isRegisteringIn = true;
                state.errorMessage = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isRegisteringIn = false;
                state.errorMessage = null;
                state.successMessage = action.payload.message ?? "Registration successful. Check your email.";
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isRegisteringIn = false;
                state.errorMessage = action.payload ?? "Somthing unexpected happened";
            })

            //handle verify-token state
            .addCase(verifyEmail.pending, (state) => {
                state.isVerifyingToken = true;
                state.errorMessage = null;
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.isVerifyingToken = false;
                state.errorMessage = null;
                state.successMessage = action.payload.message ?? "Verification successful.";
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.isVerifyingToken = false;
                state.errorMessage = action.payload ?? "Somthing unexpected happened";
            })

            //loginUser call states
            .addCase(loginUser.pending, (state) => {
                state.isLoggingIn = true;
                state.isAuthenticated = false;
                state.errorMessage = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoggingIn = false;
                state.errorMessage = null;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                localStorage.setItem("access_token", action.payload.access_token);
                localStorage.setItem("refresh_token", action.payload.refresh_token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoggingIn = false;
                state.isAuthenticated = false;
                state.errorMessage = action.payload ?? "Something unexpected happened";
            })

            //logoutUser call states
            .addCase(logoutUser.pending, (state) => {
                state.isLoggingOut = true;
                state.errorMessage = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isLoggingOut = false;
                state.errorMessage = null;
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
            })

            //fetchuserdata call
            .addCase(fetchUserData.pending, (state) => {
                state.isFetchingUser = true;
                state.errorMessage = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.isFetchingUser = false;
                state.user = action.payload.user;
                state.errorMessage = null;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isFetchingUser = false;
                state.errorMessage = action.payload ?? "Something unexpected happened";
            })
    }
})


export default authSlice.reducer;