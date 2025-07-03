import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosMainInstance } from "@/utils/tokenGeneration";
import { Feedback, FeedbackRequest, InitialQuestionState, InterviewQuestions, InterviewRequest, InterviewResponse } from "./questions.types";
import { rejectWithError } from "@/utils/errorHandling";

export const generateQuestions = createAsyncThunk<
    InterviewQuestions[],
    { jobRole: string, resumeText: string },
    { rejectValue: string }
>('interview/generate-questions', async ({ jobRole, resumeText }, thunkAPI) => {
    try {
        const res = await axiosMainInstance.post('/ai/generate-questions', { jobRole, resumeText });
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

export const saveInterview = createAsyncThunk<
    InterviewResponse,
    InterviewRequest,
    { rejectValue: string }
>('save/interview', async (data, thunkAPI) => {
    try {
        const res = await axiosMainInstance.post('interview/save', data);
        return res.data;
    } catch (error) {
        return rejectWithError(error, thunkAPI, "Resume Upload Failed");
    }
})

const initialState: InitialQuestionState = {
    jobRole: '',
    resumeId: '',
    questions: [],
    isLoading: false,
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
        },
        setResumeMongoId: (state, action) => {
            state.resumeId = action.payload;
        },
        setJobRole: (state, action) => {
            state.jobRole = action.payload
        },
        saveAnswer: (state, action) => {
            const question = state.questions[state.current]
            question.answer = action.payload;
        },
        setSkippedQuestions: (state) => {
            const question = state.questions[state.current]
            question.answer = "unattempted";
            question.feedback = {
                toneScore: 0,
                tone: "unattempted",
                keywordDensity: 0,
                grammarScore: 0,
                relevanceScore: 0,
                totalTokens: 0,
                spellingErrors: 0,
            }
            question.score = 0;
        },
        calculateScore: (state) => {
            const currentQuestion = state.questions[state.current];
            const feedback = currentQuestion.feedback;

            const scores = [
                feedback.grammarScore,
                feedback.relevanceScore,
                feedback.keywordDensity
            ];

            const validScores = scores.filter(score => typeof score === 'number' && !isNaN(score));

            const average =
                validScores.length > 0
                    ? parseFloat((validScores.reduce((acc, val) => acc + val, 0) / validScores.length).toFixed(2))
                    : 0;

            currentQuestion.score = average;
        }
    },
    extraReducers: (builder) => {
        builder
            // for generating questions
            .addCase(generateQuestions.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
            })
            .addCase(generateQuestions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errorMessage = null;
                state.questions = action.payload;
            })
            .addCase(generateQuestions.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload ?? "Something unexpected happened";
            })
            //feedback buiders
            .addCase(answerFeedback.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
                state.showFeedback = false;
            })
            .addCase(answerFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errorMessage = null;
                state.showFeedback = false;
                const question = state.questions[state.current]
                const res = action.payload
                question.feedback = {
                    tone: res.tone,
                    toneScore: res.toneScore,
                    keywordDensity: res.keywordDensity,
                    grammarScore: res.grammarScore,
                    relevanceScore: res.relevanceScore,
                    totalTokens: res.totalTokens,
                    spellingErrors: res.spellingErrors,
                }
                question.score = 0;
            })
            .addCase(answerFeedback.rejected, (state, action) => {
                state.showFeedback = false;
                state.isLoading = false
                state.errorMessage = action.payload ?? "Something unexpected happened";
            })
    }
})

export const { goToNextQuestion, setShowConfirm, saveAnswer, setSkippedQuestions, calculateScore, setResumeMongoId, setJobRole } = questionSlice.actions;
export default questionSlice.reducer;