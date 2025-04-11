// controllers/feedbackController.js
const { evaluateText } = require('../services/feedbackEngine');

/**
 * POST /api/feedback/evaluate
 * Body: { transcript: string, expectedKeywords: [String] }
 * Returns tone, grammar score, and keyword relevance
 */
exports.evaluateTextFeedback = async (req, res, next) => {
    try {
        const { transcript, expectedKeywords } = req.body;

        if (!transcript || typeof transcript !== 'string') {
            return res.status(400).json({ error: 'Transcript text is required for evaluation.' });
        }

        const result = evaluateText(transcript, expectedKeywords || []);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};