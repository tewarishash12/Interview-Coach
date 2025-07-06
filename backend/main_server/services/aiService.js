const axios = require('axios');
const { spawn } = require('child_process');
require('dotenv').config();
const path = require('path');
const fs = require('fs');


exports.generateAIContent = async (prompt) => {
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    try {
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const output = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        return output || 'No response from Gemini.';
    } catch (err) {
        console.error('Gemini API error:', err.response?.data || err.message);
        throw new Error('Failed to generate content from Gemini API');
    }
};

// ✅ MODIFIED: Accept base64 input instead of path
exports.transcribeAudio = async (base64Audio) => {
    try {
        // ✅ Strip base64 prefix if present
        const matches = base64Audio.match(/^data:audio\/\w+;base64,(.+)$/);
        const audioData = matches ? matches[1] : base64Audio;

        // ✅ Get Python API URL from env
        const apiUrl = `${process.env.WHISPER_API_URL}/transcribe`;

        const response = await axios.post(apiUrl, {
            audio_base64: audioData,
        });

        if (response.data && response.data.text) {
            return response.data.text;
        } else {
            throw new Error('Invalid response from Whisper API');
        }
    } catch (error) {
        console.error('Whisper API error:', error.message);
        throw error;
    }
};
