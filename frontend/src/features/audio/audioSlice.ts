import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AudioState, TranscribeAudioRequest } from "./audio.types";
import { axiosMainInstance } from "@/utils/tokenGeneration";
import { rejectWithError } from "@/utils/errorHandling";


export const transcribeAudio = createAsyncThunk<
    string,
    TranscribeAudioRequest,
    { rejectValue: string }
>("audio/response", async ({ audiobase64 }, thunkAPI) => {
    try {
        const res = await axiosMainInstance.post("/ai/transcribe", { audioBase64: audiobase64 });
        console.log("Transcription response:", res.data.transcription);
        return res.data.transcription;
    } catch (error) {
        return rejectWithError(error, thunkAPI, "Something unexpected happened")
    }
})

const initialState: AudioState = {
    transcribe: '',
    isRecording: false,
    isLoadingAudio: false,
    errorMessage: null,
}

export const audioSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
        resetTranscription: (state) => {
            state.transcribe = '';
        },
        startRecording: (state) => {
            state.isRecording = true;
        },
        stopRecording: (state) => {
            state.isRecording = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(transcribeAudio.pending, (state) => {
                state.isLoadingAudio = true;
                state.errorMessage = null;
            })
            .addCase(transcribeAudio.fulfilled, (state, action) => {
                state.isLoadingAudio = false;
                state.errorMessage = null;
                state.transcribe = action.payload;
            })
            .addCase(transcribeAudio.rejected, (state, action) => {
                state.isLoadingAudio = false;
                state.errorMessage = action.payload ?? "Something unexpected happened";
            })
    },
})

export const { startRecording, stopRecording, resetTranscription } = audioSlice.actions
export default audioSlice.reducer;