// controllers/interviewController.js
const Interview = require('../models/Interview');

/**
 * Create a new interview record.
 * POST /api/interviews
 * Body: { questions: [String], responses: [String], feedback: Object }
 */
exports.createInterview = async (req, res, next) => {
    try {
        const { questions, responses, feedbacks, scores, jobRole } = req.body;

        if (!questions || !responses || questions.length !== responses.length) {
            return res.status(400).json({ error: 'Questions and responses must be provided and matched.' });
        }

        const formattedQuestions = questions.map((question, index) => ({
            question,
            answer: responses[index],
            feedback: feedbacks?.[index] || '',
            score: scores?.[index] || null,
        }));

        const interview = await Interview.create({
            user: req.user._id,
            jobRole,
            questions: formattedQuestions,
        });

        res.status(201).json(interview);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Get all interviews of the logged-in user.
 * GET /api/interviews
 */
exports.getUserInterviews = async (req, res, next) => {
    try {
        const interviews = await Interview.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(interviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Get a specific interview by ID (must belong to the user).
 * GET /api/interviews/:id
 */
exports.getInterviewById = async (req, res, next) => {
    try {
        const interview = await Interview.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!interview) {
            return res.status(404).json({ error: 'Interview not found or access denied.' });
        }

        res.status(200).json(interview);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};