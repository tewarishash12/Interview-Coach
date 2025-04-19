import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AudioState } from './audioTypes';
import { axiosMainInstance } from '@/utils/hook';

// Async thunk to transcribe audio
export const transcribeAudio = createAsyncThunk(
    'audio/transcribe',
    async (audioBase64: string, thunkAPI) => {
        try {
            const response = await axiosMainInstance.post(
                '/ai/transcribe',
                { audioBase64 },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // if auth required
                }
            );
            return response.data.transcription;
        } catch (error: unknown) {
            if (error instanceof Error)
                return thunkAPI.rejectWithValue(error.message);
            return thunkAPI.rejectWithValue('Transcription failed');
        }
    }
);

const initialState: AudioState = {
    audioBase64: null,
    transcription: '',
    loading: false,
    error: null,
};

const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        setAudioBase64(state, action: PayloadAction<string | null>) {
            state.audioBase64 = action.payload;
        },
        clearAudio(state) {
            state.audioBase64 = null;
            state.transcription = '';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(transcribeAudio.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(transcribeAudio.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.transcription = action.payload;
            })
            .addCase(transcribeAudio.rejected, (state, action) => {
                state.loading = false;
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                } else {
                    state.error = 'An unknown error occurred';
                }
            });
    },
});

export const { setAudioBase64, clearAudio } = audioSlice.actions;
export default audioSlice.reducer;
