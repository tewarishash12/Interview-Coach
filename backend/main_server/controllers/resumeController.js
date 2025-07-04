const Resume = require('../models/Resume');
const Interview = require("../models/Interview")
const resumeParser = require('../services/resumeParser');

exports.uploadResume = async (req, res) => {
    try {
        console.log("➡️ Starting resume upload");

        if (!req.file) {
            console.warn("❌ No file received in request");
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log("📁 File uploaded:", req.file.originalname, "at path:", req.file.path);

        const extractedText = await resumeParser(req.file.path);
        console.log("🧠 Resume parsed. Extracted text length:", extractedText?.length || 0);

        const relativePath = req.file.path.replace(/\\/g, '/').split('uploads')[1];
        const publicPath = `/uploads${relativePath}`;
        console.log("🧾 Computed public path:", publicPath);

        const resume = new Resume({
            user: req.user._id,
            fileName: req.file.originalname,
            filePath: publicPath,
            extractedText,
        });

        await resume.save();
        console.log("✅ Resume saved with ID:", resume._id);

        const interview = new Interview({
            user: req.user._id,
            resume: resume._id,
        });

        await interview.save();
        console.log("🎙️ Interview initialized with ID:", interview._id);

        res.status(201).json({
            message: 'Resume uploaded and parsed',
            resumeId: resume._id,
            resume: resume,
            interviewId: interview._id
        });
    } catch (err) {
        console.error("💥 Error in uploadResume:", err);
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