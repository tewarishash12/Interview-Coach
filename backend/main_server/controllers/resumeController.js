const Resume = require('../models/Resume');
const resumeParser = require('../services/resumeParser');

exports.uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const extractedText = await resumeParser(req.file.path);

        const relativePath = req.file.path.replace(/\\/g, '/').split('uploads')[1];
        const publicPath = `/uploads${relativePath}`;

        const resume = new Resume({
            user: req.user._id,
            fileName: req.file.originalname,
            filePath: publicPath,
            extractedText,
        });

        await resume.save();

        res.status(201).json({ message: 'Resume uploaded and parsed', resumeId:resume._id, resume:resume, extractedText:extractedText});
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