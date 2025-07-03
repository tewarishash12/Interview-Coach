const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        resume: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resume',
        },
        questions: [
            {
                question: { type: String, required: true },
                expectedKeywords: { type: [String], required: true },
                answer: { type: String },
                feedback: {
                    tone: { type: String },
                    toneScore: { type: Number },
                    keywordDensity: { type: Number },
                    grammarScore: { type: Number },
                    relevanceScore: { type: Number },
                    totalTokens: { type: Number },
                    spellingErrors: { type: Number },
                },
                score: { type: Number }
            },
        ],
        jobRole: {
            type: String,
            required: true,
        },
        status: { type: String, enum: ["completed", "incomplete"], default: "completed" },
        conductedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Interview', interviewSchema);