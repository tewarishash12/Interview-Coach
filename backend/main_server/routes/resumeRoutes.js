const router = require('express').Router();
const { uploadResume, getUserResumes } = require('../controllers/resumeController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/fileUpload');

// POST /api/resumes/upload
router.post('/upload', authMiddleware, upload.single('resume'), uploadResume);

// GET /api/resumes/user
router.get('/user', authMiddleware, getUserResumes);

module.exports = router;