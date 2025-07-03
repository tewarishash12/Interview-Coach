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
    user:UserCredentials
}

export interface InitialUserState {
    user: UserCredentials | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    errorMessage: string | null;
}