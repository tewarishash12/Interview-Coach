'use client';
import React from 'react';
import mapToneColor from '@/utils/mapToneColor';

interface FeedbackPanelProps {
    tone: string;
    grammarScore: string;
    keywordDensity: string;
}

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ tone, grammarScore, keywordDensity }) => {
    return (
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <h2 className="font-semibold text-lg mb-4 text-gray-700 dark:text-gray-200">Feedback</h2>
            <div className="space-y-2">
                <p>
                    <strong>Tone:</strong>{' '}
                    <span className={mapToneColor(tone)}>{tone}</span>
                </p>
                <p>
                    <strong>Grammar Score:</strong>{' '}
                    <span>{grammarScore}</span>
                </p>
                <p>
                    <strong>Keyword Match:</strong>{' '}
                    <span>{keywordDensity}</span>
                </p>
            </div>
        </div>
    );
};

export default FeedbackPanel;