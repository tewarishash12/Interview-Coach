export interface AudioState {
    audioBase64: string | null;
    transcription: string;
    loading: boolean;
    error: string | null;
}
