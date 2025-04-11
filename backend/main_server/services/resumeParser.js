const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const path = require('path');

/**
 * Extract text from a resume file (PDF or DOCX).
 * @param {string} filePath - The full path to the resume file.
 * @returns {Promise<string>} The extracted plain text content.
 */
const resumeParser = async (filePath) => {
    const extension = path.extname(filePath).toLowerCase();
    try {
        if (extension === '.pdf') {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdfParse(dataBuffer);
            return data.text;
        } else if (extension === '.docx') {
            const result = await mammoth.extractRawText({ path: filePath });
            return result.value;
        } else {
            throw new Error('Unsupported file type. Only PDF and DOCX are allowed.');
        }
    } catch (error) {
        console.error('Resume parsing failed:', error);
        throw new Error('Failed to extract text from resume');
    }
};

module.exports = resumeParser;