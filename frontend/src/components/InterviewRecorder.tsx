import React, { useState, useRef } from 'react';

const InterviewRecorder = () => {
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.start();
        setRecording(true);

        mediaRecorder.ondataavailable = (event) => {
            // TODO: send audio blob to backend
            console.log('Audio blob:', event.data);
        };

        mediaRecorder.onstop = () => {
            setRecording(false);
            stream.getTracks().forEach((track) => track.stop());
        };
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
    };

    return (
        <div className="text-center my-6">
            <button
                className={`px-6 py-2 rounded-md text-white transition ${recording ? 'bg-red-500' : 'bg-green-500'
                    }`}
                onClick={recording ? stopRecording : startRecording}
            >
                {recording ? 'Stop Recording' : 'Start Recording'}
            </button>
        </div>
    );
};

export default InterviewRecorder;