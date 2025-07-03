import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialInterviewState, InterviewResponse } from "./interview.types";
import { rejectWithError } from "@/utils/errorHandling";
import { axiosMainInstance } from "@/utils/tokenGeneration";

export const fetchUserInterviews = createAsyncThunk<
InterviewResponse[],
void,
{rejectValue:string}
>('load/interviews', async(_, thunkAPI)=>{
    try {
        const res = await axiosMainInstance.get('/interview/');
        return res.data;
    } catch(error) {
        return rejectWithError(error, thunkAPI, "Error loading interviews");
    }
})

export const getInterviewById = createAsyncThunk<
    InterviewResponse,
    string,
    {rejectValue:string}
>('fetch/interview', async(id,thunkAPI)=>{
    try{
        const res = await axiosMainInstance.get(`/interview/${id}`);
        return res.data;
    } catch(error) {
        return rejectWithError(error, thunkAPI, "Failed to reload Resume")
    }
})

const initialState: InitialInterviewState = {
    interviews: [],
    isLoading: false,
    errorMessage: null
}

export const interviewSlice = createSlice({
    name:'interview',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(fetchUserInterviews.pending, (state)=>{
            state.isLoading = true;
            state.errorMessage = null;
        })
        .addCase(fetchUserInterviews.fulfilled, (state,action)=>{
            state.interviews = action.payload
            state.isLoading = false;
            state.errorMessage = null;
        })
        .addCase(fetchUserInterviews.rejected, (state,action)=>{
            state.isLoading = false;
            state.errorMessage = action.payload ?? "Something unexpected happened";
        })
        //getch single interview
        .addCase(getInterviewById.pending, (state)=>{
            state.isLoading = true;
            state.errorMessage = null;
        })
        .addCase(getInterviewById.fulfilled, (state)=>{
            state.isLoading = false;
            state.errorMessage = null;
        })
        .addCase(getInterviewById.rejected, (state,action)=>{
            state.isLoading = false;
            state.errorMessage = action.payload ?? "Something unexpected happened";
        })

    }
})

export default interviewSlice.reducer;