// types/Audio.ts
export interface AudioInput {
    audioBase64: string; // Required for sending to backend
}

export interface TranscriptionResponse {
    transcription: string; // Received from /api/audio/transcribe
}
