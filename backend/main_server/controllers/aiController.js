const { generateAIContent, transcribeAudio } = require('../services/aiService');

function cleanResponse(rawResponse) {
    const rawArray = rawResponse.questions;
    const joined = rawArray.join('\n');
    const cleaned = joined
        .replace(/^```json\s*/i, '')
        .replace(/```$/, '')
        .trim();
    return JSON.parse(cleaned);
}

exports.generateQuestions = async (req, res) => {
    try {
        const { jobRole, resumeText } = req.body;

        if (!jobRole) {
            return res.status(400).json({ error: 'Job role is required' });
        }

        const prompt = `You are an expert technical recruiter and hiring manager.

        Given the following job role and resume text, generate **10 tailored interview questions** specifically for the candidate applying for the role of **"${jobRole}"**. Use the resume content to make the questions relevant and insightful.

        Each question should test the candidate's skills, experience, or problem-solving ability relevant to the role. Focus on both technical expertise and soft skills if appropriate.

        In addition to each question, include a list of **3 to 5 key concepts or keywords** that an ideal answer should demonstrate. These keywords should reflect what a strong candidate would mention in a good response.

        Use the following format in your response (in **valid JSON**):

        [
            {
                "question": "What was your approach to optimizing the cloud infrastructure in your most recent project?",
                "expectedKeywords": ["AWS", "cost optimization", "autoscaling", "infrastructure as code", "monitoring"]
            },
            ...
        ]

        --- RESUME START ---
        ${resumeText}
        --- RESUME END ---
        `;

        const questionsText = await generateAIContent(prompt);

        
        const rawResponse = {
            questions: questionsText.split('\n').filter(line => line.trim() !== '')
        };

        const questions = cleanResponse(rawResponse);

        res.status(200).json({ questions });
    } catch (err) {
        console.error('Error generating questions:', err);
        res.status(500).json({ error: 'Internal server error while generating questions' });
    }
};

exports.transcribeAudio = async (req, res) => {
    try {
        const { audioBase64 } = req.body;

        if (!audioBase64) {
            return res.status(400).json({ error: 'Audio input required' });
        }

        const transcription = await transcribeAudio(audioBase64);
        res.status(200).json({ transcription: transcription });
    } catch (err) {
        console.error('Error generating questions:', err);
        res.status(500).json({ error: 'Internal server error while generating questions' });
    }
};
