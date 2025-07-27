const router = require('express').Router();
const { uploadResume, getUserResumes, useExistingResume, deleteResume } = require('../controllers/resumeController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/fileUpload');

router.post('/upload', authMiddleware, upload.single('resume'), uploadResume);

router.post('/use-existing', authMiddleware, useExistingResume)

router.get('/user', authMiddleware, getUserResumes);

router.delete('/delete/:id', authMiddleware, deleteResume);

module.exports = router;