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
                answer: { type: String, default:"unattempted" },
                feedback: {
                    tone: { type: String, default:"unattempted" },
                    toneScore: { type: Number, default:0 },
                    keywordDensity: { type: Number, default:0 },
                    grammarScore: { type: Number, default:0 },
                    relevanceScore: { type: Number, default:0 },
                    totalTokens: { type: Number, default:0 },
                    spellingErrors: { type: Number, default:0 },
                },
                score: { type: Number }
            },
        ],
        jobRole: {
            type: String
        },
        status: { type: String, enum: ["completed", "incomplete"], default: "incomplete" },
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