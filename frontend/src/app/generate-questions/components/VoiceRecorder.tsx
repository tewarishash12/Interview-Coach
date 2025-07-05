import { Button1 } from "@/global-components/Button";
import { useAppSelector } from "@/store";
import { useVoiceRecorder } from "@/app/generate-questions/hooks/useTranscribeAudio";

export default function VoiceRecorder() {
    const { isLoadingAudio, isRecording, transcribe } = useAppSelector((state) => state.audio);
    const { toggleRecording, isAvailable, reRecord } = useVoiceRecorder();

    function handleToggle() {
        toggleRecording(isRecording);
    };


    return (
        <div className="flex flex-col items-center">
            {(!isLoadingAudio && !transcribe) ?
                <Button1
                    onClick={handleToggle}
                    aria-label={isRecording ? "Stop Recording" : "Start Recording"}
                    disabled={isLoadingAudio || !isAvailable}
                >
                    <span className="text-2xl text-white">{isRecording ? "⏸️" : "🎤"}</span>
                </Button1>
                :
                (!isRecording && !!transcribe &&
                    <>
                        <Button1 onClick={reRecord}>Re-record</Button1>
                    </>)
            }

            {isLoadingAudio && (
                <div className="flex items-center gap-2 text-purple-500">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    <span className="text-sm font-medium">Transcribing...</span>
                </div>
            )}
            {transcribe && !isLoadingAudio && (
                <div className="text-gray-700 text-sm mt-2 w-full text-center">
                    <span className="font-semibold">Transcribe:</span> {transcribe}
                </div>
            )}
        </div>
    );
}
