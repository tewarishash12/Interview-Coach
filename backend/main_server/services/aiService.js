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

function saveBase64Audio(base64Str) {
    const matches = base64Str.match(/^data:audio\/\w+;base64,(.+)$/);
    const base64 = matches ? matches[1] : base64Str; // Strip prefix if present
    const buffer = Buffer.from(base64, 'base64');
    console.log("Audio file size:", buffer.length); // should not be 0

    const outputPath = path.join(__dirname, '../temp_audio.wav');  // ✅ TEMP FILE PATH
    fs.writeFileSync(outputPath, buffer);
    return outputPath;
}

// ✅ MODIFIED: Accept base64 input instead of path
exports.transcribeAudio = (base64Audio) => {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, '../python/transcribe.py');

        // ✅ Save base64 to file and use real file path
        const audioPath = saveBase64Audio(base64Audio);

        const python = spawn('python', [scriptPath, audioPath]);

        let output = '';
        let error = '';

        python.stdout.on('data', (data) => {
            output += data.toString();
        });

        python.stderr.on('data', (data) => {
            const stderrStr = data.toString();
            console.warn('[Python stderr]:', stderrStr); // ✅ Log the warning but don't treat it as fatal
        });

        python.on('close', (code) => {
            fs.unlinkSync(audioPath); // cleanup

            try {
                console.log("Raw Python output:", output);
                const parsed = JSON.parse(output);
                if (parsed.error) {
                    reject(new Error(parsed.error)); // ❌ True error in output
                } else {
                    resolve(parsed.text);            // ✅ Success
                }
            } catch (e) {
                reject(new Error('Invalid response from Python script:\n' + output));
            }
        });

    });
};
