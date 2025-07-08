import { GetThunkAPI } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export function rejectWithError(
    error: unknown,
    thunkAPI: GetThunkAPI<{ rejectValue: string }>,
    defaultMessage = "Something went wrong"
) {

    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>;
        const messageFromBackend = axiosError.response?.data?.message;

        if (messageFromBackend) 
            return thunkAPI.rejectWithValue(messageFromBackend);
    }

    if (error instanceof Error) 
        return thunkAPI.rejectWithValue(error.message);

    return thunkAPI.rejectWithValue(defaultMessage);
}
