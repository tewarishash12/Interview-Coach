// controllers/aiController.js
const { generateAIContent, transcribeAudio } = require('../services/aiService');

/**
 * POST /api/ai/generate-questions
 * Request Body: { jobRole: string, resumeText: string (optional) }
 */
exports.generateQuestions = async (req, res, next) => {
    try {
        const { jobRole, resumeText } = req.body;

        if (!jobRole) {
            return res.status(400).json({ error: 'Job role is required' });
        }

        const prompt = `Generate 10 job interview questions for the position of "${jobRole}" based on the following resume:\n\n${resumeText}`;

        const questionsText = await generateAIContent(prompt);

        // Split questions if the response is in text format
        const questions = questionsText.split('\n').filter(q => q.trim() !== '');

        res.status(200).json({ questions });
    } catch (err) {
        console.error('Error generating questions:', err);
        res.status(500).json({ error: 'Internal server error while generating questions' });
    }
};

/**
 * POST /api/ai/transcribe
 * Request Body: { audioBase64: string }
 */
exports.transcribeAudio = async (req, res, next) => {
    try {
        const { audioBase64 } = req.body;

        if (!audioBase64) {
            return res.status(400).json({ error: 'Audio input required' });
        }

        const transcription = await transcribeAudio(audioBase64);
        res.status(200).json({ transcription });
    } catch (err) {
        console.error('Error generating questions:', err);
        res.status(500).json({ error: 'Internal server error while generating questions' });
    }
};
