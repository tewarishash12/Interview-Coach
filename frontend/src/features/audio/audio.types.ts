export interface TranscribeAudioRequest {
    audiobase64: string;
}

export interface AudioState {
    transcribe: string;
    isRecording: boolean;
    isLoading: boolean;
    errorMessage: string | null;
}