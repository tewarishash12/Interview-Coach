// features/user/userTypes.ts

export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface AuthResponse {
    message: string;
    access_token: string;
    refreshToken: string;
}

export interface RegisterResponse {
    message: string;
}

export interface UserState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    isError: boolean;
    isAuthenticated: boolean,
    errorMessage: string | null;
}
