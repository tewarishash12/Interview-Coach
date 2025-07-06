import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import resumeReducer from "@/features/resume/resumeSlice"
import questionReducer from "@/features/questions/questionSlice"
import audioReducer from '@/features/audio/audioSlice';
import interviewReducer from '@/features/interview/interviewSlice';
import contactReducer from '@/features/contact/contactSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    resume: resumeReducer,
    question:questionReducer,
    audio: audioReducer,
    interview: interviewReducer,
    contact:contactReducer
});

export default rootReducer;