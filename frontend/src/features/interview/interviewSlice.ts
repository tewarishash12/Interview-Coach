import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Interview, InterviewState } from './interviewTypes';
import { axiosMainInstance } from '@/utils/hook';

const initialState: InterviewState = {
    interviews: [],
    currentInterview: null,
    generatedQuestions: [],
    loading: false,
    error: null,
};

// Thunks
export const fetchUserInterviews = createAsyncThunk(
    'interview/fetchUserInterviews',
    async (_, thunkAPI) => {
        try {
            const res = await axiosMainInstance.get('/api/interviews');
            return res.data;
        } catch (error: unknown) {
            if (error instanceof Error)
                return thunkAPI.rejectWithValue(error.message);
            return thunkAPI.rejectWithValue('Transcription failed');
        }
    }
);

export const fetchInterviewById = createAsyncThunk(
    'interview/fetchInterviewById',
    async (id: string, thunkAPI) => {
        try {
            const res = await axiosMainInstance.get(`/api/interviews/${id}`);
            return res.data;
        } catch (error: unknown) {
            if (error instanceof Error)
                return thunkAPI.rejectWithValue(error.message);
            return thunkAPI.rejectWithValue('Transcription failed');
        }
    }
);

export const createInterview = createAsyncThunk(
    'interview/createInterview',
    async (
        {
            questions,
            responses,
            feedbacks,
            scores,
            jobRole,
        }: {
            questions: string[];
            responses: string[];
            feedbacks?: string[];
            scores?: number[];
            jobRole: string;
        },
        thunkAPI
    ) => {
        try {
            const res = await axiosMainInstance.post(
                '/api/interviews',
                { questions, responses, feedbacks, scores, jobRole }
            );
            return res.data;
        } catch (error: unknown) {
            if (error instanceof Error)
                return thunkAPI.rejectWithValue(error.message);
            return thunkAPI.rejectWithValue('Transcription failed');
        }
    }
);

export const generateQuestions = createAsyncThunk(
    'interview/generateQuestions',
    async ({ jobRole, resumeText }: { jobRole: string; resumeText: string }, thunkAPI) => {
        try {
            const res = await axiosMainInstance.post(
                '/api/interviews/generate-questions',
                { jobRole, resumeText },
            );
            return res.data.questions;
        } catch (error: unknown) {
            if (error instanceof Error)
                return thunkAPI.rejectWithValue(error.message);
            return thunkAPI.rejectWithValue('Transcription failed');
        }
    }
);

// Slice
const interviewSlice = createSlice({
    name: 'interview',
    initialState,
    reducers: {
        clearCurrentInterview(state) {
            state.currentInterview = null;
        },
        clearGeneratedQuestions(state) {
            state.generatedQuestions = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch All
            .addCase(fetchUserInterviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserInterviews.fulfilled, (state, action: PayloadAction<Interview[]>) => {
                state.loading = false;
                state.interviews = action.payload;
            })
            .addCase(fetchUserInterviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch One
            .addCase(fetchInterviewById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInterviewById.fulfilled, (state, action: PayloadAction<Interview>) => {
                state.loading = false;
                state.currentInterview = action.payload;
            })
            .addCase(fetchInterviewById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Create
            .addCase(createInterview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createInterview.fulfilled, (state, action: PayloadAction<Interview>) => {
                state.loading = false;
                state.interviews.unshift(action.payload);
                state.currentInterview = action.payload;
            })
            .addCase(createInterview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Generate Questions
            .addCase(generateQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(generateQuestions.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.loading = false;
                state.generatedQuestions = action.payload;
            })
            .addCase(generateQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearCurrentInterview, clearGeneratedQuestions } = interviewSlice.actions;

export default interviewSlice.reducer;
