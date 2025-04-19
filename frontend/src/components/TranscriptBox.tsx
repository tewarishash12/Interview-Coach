'use client';
import React from 'react';

interface TranscriptBoxProps {
    transcript: string;
    isLoading?: boolean;
}

const TranscriptBox: React.FC<TranscriptBoxProps> = ({ transcript, isLoading }) => {
    return (
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm h-60 overflow-y-auto">
            <h2 className="font-semibold text-lg mb-2 text-gray-700 dark:text-gray-200">Transcript</h2>
            {isLoading ? (
                <p className="text-gray-400 italic">Listening...</p>
            ) : transcript ? (
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{transcript}</p>
            ) : (
                <p className="text-gray-400">Start speaking to see your transcript here.</p>
            )}
        </div>
    );
};

export default TranscriptBox;