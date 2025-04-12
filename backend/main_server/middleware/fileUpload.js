const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Define upload directory
const uploadPath = path.resolve(process.env.UPLOAD_DIR);

// Ensure directory exists
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// Create multer instance
const upload = multer({ storage });

module.exports = { upload };
