const Resume = require('../models/Resume');
const Interview = require("../models/Interview")
const resumeParser = require('../services/resumeParser');
const path = require("path");
const fs = require("fs");

exports.uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const extractedText = await resumeParser(req.file.path);

        const relativePath = req.file.path.replace(/\\/g, '/').split('uploads')[1];
        const publicPath = `/uploads${relativePath}`;

        let existingResume = await Resume.findOne({
            user: req.user._id,
            extractedText: extractedText
        });

        let resume;
        if (existingResume) {
            resume = existingResume;
        } else {
            // 🆕 Create new Resume
            resume = new Resume({
                user: req.user._id,
                fileName: req.file.originalname,
                filePath: publicPath,
                extractedText,
            });
            await resume.save();
        }

        await resume.save();

        const interview = new Interview({
            user: req.user._id,
            resume: resume._id,
        });

        await interview.save();

        res.status(201).json({
            message: 'Resume uploaded and parsed',
            resumeId: resume._id,
            resume: resume,
            interviewId: interview._id
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user._id }).sort({ uploadedAt: -1 });
        res.json(resumes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.useExistingResume = async (req, res) => {
    try {
        const { resumeId } = req.body;

        if (!resumeId) {
            return res.status(400).json({ message: 'Resume ID is required' });
        }

        const resume = await Resume.findOne({ _id: resumeId, user: req.user._id });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found or unauthorized access' });
        }

        const interview = new Interview({
            user: req.user._id,
            resume: resume._id,
        });

        await interview.save();

        res.status(201).json({
            message: 'Existing resume used successfully',
            resumeId: resume._id,
            interviewId: interview._id,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteResume = async (req, res) => {
    try {
        const { id } = req.params;

        const resume = await Resume.findOne({ _id: id, user: req.user._id });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found or unauthorized access' });
        }

        await Interview.deleteMany({ resume: resume._id });

        // Delete the actual file from disk (optional but recommended)
        const fileToDelete = path.join(__dirname, '..', resume.filePath);
        fs.unlink(fileToDelete, (err) => {
            if (err && err.code !== 'ENOENT') {
                console.error('Failed to delete resume file:', err);
            }
        });

        // Delete the resume document
        await resume.deleteOne();

        res.status(200).json({ message: 'Resume and associated interviews deleted successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while deleting resume' });
    }
};