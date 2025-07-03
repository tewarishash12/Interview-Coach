const { evaluateText } = require('../services/feedbackEngine');

exports.evaluateTextFeedback = async (req, res) => {
    try {
        const { question, transcript, expectedKeywords } = req.body;

        if (!transcript || typeof transcript !== 'string') {
            return res.status(400).json({ error: 'Transcript text is required for evaluation.' });
        }

        if (!question || typeof question !== 'string') {
            return res.status(400).json({ error: 'Question is required for evaluation.' });
        }

        const result = evaluateText({ question, transcript, expectedKeywords:expectedKeywords || []});
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};