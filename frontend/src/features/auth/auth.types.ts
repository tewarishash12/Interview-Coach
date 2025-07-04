export interface ApiResponse {
    message: string;
}

export type AuthActionResponse = ApiResponse;

export interface UserCredentials {
    _id: string;
    email: string;
    name: string;
}

export interface AuthLoginResponse {
    message:string;
    access_token:string;
    refresh_token: string;
    user:UserCredentials
}

export interface InitialUserState {
    user: UserCredentials | null;
    isLoggingIn: boolean;
    isRegisteringIn: boolean;
    isLoggingOut:boolean;
    isFetchingUser: boolean;
    isAuthenticated: boolean;
    errorMessage: string | null;
}