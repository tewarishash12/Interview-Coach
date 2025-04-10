const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        questions: [
            {
                question: { type: String, required: true },
                answer: { type: String },
                feedback: { type: String },
                score: { type: Number },
            },
        ],
        jobRole: {
            type: String,
            required: true,
        },
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