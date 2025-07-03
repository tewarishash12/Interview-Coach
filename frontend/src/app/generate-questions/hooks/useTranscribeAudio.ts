import { useRef, useState } from "react";
import { useAppDispatch } from "@/store";
import {
    resetTranscription,
    startRecording,
    stopRecording,
    transcribeAudio,
} from "@/features/audio/audioSlice";

export function useVoiceRecorder() {
    const dispatch = useAppDispatch();
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [isAvailable, setIsAvailable] = useState<boolean>(true);

    const startRecordingHandler = async () => {
        try {
            dispatch(resetTranscription());
            dispatch(startRecording());

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setMediaStream(stream);

            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            audioChunksRef.current = [];

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            recorder.onstop = async () => {
                const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
                const base64Audio = await convertBlobToBase64(blob);

                dispatch(stopRecording());
                dispatch(transcribeAudio({ audiobase64: base64Audio }));
            };

            recorder.start();
        } catch (error) {
            console.error("Audio recording error:", error);
            dispatch(stopRecording());
            setIsAvailable(false);
        }
    };

    const stopRecordingHandler = () => {
        mediaRecorderRef.current?.stop();
        mediaStream?.getTracks().forEach((track) => track.stop());
    };

    const toggleRecording = async (isRecording: boolean) => {
        if (isRecording) {
            stopRecordingHandler();
        } else {
            await startRecordingHandler();
        }
    };
    
    const reRecord = async () => {
        stopRecordingHandler();
        await startRecordingHandler();
    };

    return {
        toggleRecording,
        reRecord,
        isAvailable,
    };
}

// Helper to convert blob to base64
async function convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob); // base64-encoded string
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
    });
}
