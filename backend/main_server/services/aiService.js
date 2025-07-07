const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();


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
    const matches = base64Audio.match(/^data:audio\/(\w+);base64,(.+)$/);
    if (!matches) throw new Error('Invalid base64 audio format');

    const mimeExt = matches[1]; // like webm, wav
    const audioData = matches[2];
    const buffer = Buffer.from(audioData, 'base64');

    const tempFileName = `${uuidv4()}.${mimeExt}`;
    const tempFilePath = path.join(process.env.UPLOAD_DIR, tempFileName);

    try {
        // Save audio temporarily
        fs.writeFileSync(tempFilePath, buffer);

        const audioStream = fs.createReadStream(tempFilePath);
        const response = await axios.post(
            'https://api.deepgram.com/v1/listen',
            audioStream,
            {
                headers: {
                    'Authorization': `Token ${process.env.DEEPGRAM_API_KEY}`,
                    'Content-Type': `audio/${mimeExt}`,
                },
            }
        );

        const result = response.data;
        const transcript = result.results?.channels?.[0]?.alternatives?.[0]?.transcript || '';

        console.log('[Deepgram] Transcription:', transcript);
        return transcript;
    } catch (error) {
        console.error('[Deepgram] Error:', error.response?.data || error.message);
        throw new Error('Deepgram transcription failed');
    } finally {
        // Clean up temp file
        if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
    }
};
