import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosMainInstance } from "@/utils/tokenGeneration";
import { Feedback, FeedbackRequest, InitialQuestionState, InterviewQuestions } from "./questions.types";
import { rejectWithError } from "@/utils/errorHandling";

export const generateQuestions = createAsyncThunk<
    InterviewQuestions[],
    { jobRole: string, resumeId: string, interviewId:string },
    { rejectValue: string }
>('interview/generate-questions', async ({ jobRole, resumeId, interviewId }, thunkAPI) => {
    try {
        const res = await axiosMainInstance.post('/ai/generate-questions', { jobRole, resumeId, interviewId });
        const formattedQuestions: InterviewQuestions[] = res.data.questions.map(
            (q: { question: string; expectedKeywords: string[] }, index: number) => ({
                id: index + 1,
                question: q.question,
                expectedKeywords: q.expectedKeywords,
            })
        );
        return formattedQuestions;
    } catch (error) {
        return rejectWithError(error, thunkAPI, "Cannot load questions")
    }
})

export const answerFeedback = createAsyncThunk<
    Feedback,
    FeedbackRequest,
    { rejectValue: string }
>("evaluate/feedback", async (data, thunkAPI) => {
    try {
        const res = await axiosMainInstance.post("/feedback/evaluate", data);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return rejectWithError(error, thunkAPI, "Registration Failed");
    }
});

const initialState: InitialQuestionState = {
    jobRole: '',
    questions: [],
    isLoadingQuestions: false,
    isLoadingFeedback:false,
    errorMessage: null,
    current: 0,
    showConfirm: false,
    showFeedback: false,
}

export const questionSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        goToNextQuestion: (state) => {
            if (state.current + 1 < state.questions.length)
                state.current += 1;
        },
        setShowConfirm: (state, action) => {
            state.showConfirm = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // for generating questions
            .addCase(generateQuestions.pending, (state) => {
                state.isLoadingQuestions = true;
                state.errorMessage = null;
            })
            .addCase(generateQuestions.fulfilled, (state, action) => {
                state.isLoadingQuestions = false;
                state.errorMessage = null;
                state.questions = action.payload;
            })
            .addCase(generateQuestions.rejected, (state, action) => {
                state.isLoadingQuestions = false;
                state.errorMessage = action.payload ?? "Something unexpected happened";
            })
            //feedback buiders
            .addCase(answerFeedback.pending, (state) => {
                state.isLoadingFeedback = true;
                state.errorMessage = null;
                state.showFeedback = false;
            })
            .addCase(answerFeedback.fulfilled, (state) => {
                state.isLoadingFeedback = false;
                state.errorMessage = null;
                state.showFeedback = false;
            })
            .addCase(answerFeedback.rejected, (state, action) => {
                state.showFeedback = false;
                state.isLoadingFeedback = false
                state.errorMessage = action.payload ?? "Something unexpected happened";
            })
    }
})

export const { goToNextQuestion, setShowConfirm } = questionSlice.actions;
export default questionSlice.reducer;