import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/features/user/userSlice';
import interviewReducer from '@/features/interview/interviewSlice';
import audioReducer from '@/features/audio/audioSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        interview: interviewReducer,
        audio: audioReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
