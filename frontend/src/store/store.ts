import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '@/features/user/userSlice';
import interviewReducer from '@/features/interview/interviewSlice';
import audioReducer from '@/features/audio/audioSlice';
import feedbackReducer from '@/features/feedback/feedbackSlice';

const rootReducer = combineReducers({
    user: userReducer,
    interview: interviewReducer,
    audio: audioReducer,
    feedback: feedbackReducer,});

export default rootReducer;