const Interview = require('../models/Interview');

exports.saveInterview = async (req, res) => {
    try {
        const { questions, jobRole, resumeId } = req.body;

        if (!questions) {
            return res.status(400).json({ error: 'Questions, responses, and feedbacks must all be provided and of equal length.' });
        }

        const formattedQuestions = questions.map((q) => ({
            question: q.question,
            expectedKeywords: q.expectedKeywords || [],
            answer: q.answer || "unattempted",
            feedback: {
                tone: q.feedback?.tone?.trim() || "unattempted",
                toneScore: q.feedback?.toneScore ?? 0,
                keywordDensity: q.feedback?.keywordDensity ?? 0,
                grammarScore: q.feedback?.grammarScore ?? 0,
                relevanceScore: q.feedback?.relevanceScore ?? 0,
                totalTokens: q.feedback?.totalTokens ?? 0,
                spellingErrors: q.feedback?.spellingErrors ?? 0,
            },
            score: typeof q.score === "number" ? q.score : 0,
        }));

        const isComplete = !formattedQuestions.some(q => q.answer === 'unattempted');
        const status = isComplete ? 'completed' : 'incomplete';

        const interview = await Interview.create({
            user: req.user._id,
            resume: resumeId,
            jobRole,
            questions: formattedQuestions,
            status,
        });

        res.status(201).json(interview);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(interviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getInterviewById = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id);    
        const interview = await Interview.findById({ _id: req.params.id });

        if (!interview) {
            return res.status(404).json({ error: 'Interview not found or access denied.' });
        }

        res.status(200).json(interview);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};