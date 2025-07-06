export interface TranscribeAudioRequest {
    audiobase64: string;
}

export interface AudioState {
    transcribe: string;
    isRecording: boolean;
    isLoadingAudio: boolean;
    errorMessage: string | null;
}