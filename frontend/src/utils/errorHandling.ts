import { GetThunkAPI } from "@reduxjs/toolkit";

export function rejectWithError (
    error: unknown, 
    thunkAPI: GetThunkAPI<{ rejectValue: string }>,
    defaultMessage = "Something went wrong") {
    if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(defaultMessage);
};