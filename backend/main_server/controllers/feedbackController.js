const { evaluateText } = require('../services/feedbackEngine');
const Interview = require("../models/Interview");

exports.evaluateTextFeedback = async (req, res) => {
    try {
        const { question, transcript, expectedKeywords, interviewId } = req.body;

        if (!transcript || typeof transcript !== 'string') {
            return res.status(400).json({ error: 'Transcript text is required for evaluation.' });
        }

        if (!question || typeof question !== 'string') {
            return res.status(400).json({ error: 'Question is required for evaluation.' });
        }

        if (!interviewId) {
            return res.status(400).json({ error: 'Interview ID is required.' });
        }

        const interview = await Interview.findById(interviewId);
        
        if (!interview) {
            return res.status(404).json({ error: 'Interview not found' });
        }

        const targetQuestion = interview.questions.find(q => q.question === question);
        if (!targetQuestion) {
            return res.status(404).json({ error: 'Question not found in interview.' });
        }

        let result;
        if (transcript.trim().toLowerCase() === 'unattempted') {
            // 3A. User skipped
            result = {
                tone: 'unattempted',
                toneScore: 0,
                keywordDensity: 0,
                grammarScore: 0,
                relevanceScore: 0,
                totalTokens: 0,
                spellingErrors: 0,
            };
        } else {
            // 3B. Evaluate answer
            result = evaluateText({ question, transcript, expectedKeywords });
        }

        // 4. Calculate average score
        const rawScores = [
            result.toneScore,
            result.keywordDensity,
            result.grammarScore,
            result.relevanceScore,
        ];
        const avgScore = rawScores.reduce((a, b) => a + b, 0) / rawScores.length;

        // 5. Update question with answer, feedback, score
        targetQuestion.answer = transcript;
        targetQuestion.feedback = result;
        targetQuestion.score = +avgScore.toFixed(2);

        // 6. Save updated interview
        await interview.save();

        res.status(200).json({message: "Your answers were evaluated and stored"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};