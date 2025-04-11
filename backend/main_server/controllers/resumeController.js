const Resume = require('../models/Resume');
const resumeParser = require('../services/resumeParser');
const path = require('path');
const fs = require('fs');

// @desc    Upload and parse a resume
// @route   POST /api/resumes/upload
// @access  Private
exports.uploadResume = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const extractedText = await resumeParser(req.file.path);

        const resume = new Resume({
            user: req.user._id,
            fileName: req.file.originalname,
            filePath: req.file.path,
            extractedText,
        });

        await resume.save();

        res.status(201).json({ message: 'Resume uploaded and parsed', resume });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Get all resumes uploaded by the logged-in user
// @route   GET /api/resumes/user
// @access  Private
exports.getUserResumes = async (req, res, next) => {
    try {
        const resumes = await Resume.find({ user: req.user._id }).sort({ uploadedAt: -1 });
        res.json(resumes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};