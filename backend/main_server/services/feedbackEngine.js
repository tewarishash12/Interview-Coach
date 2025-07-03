const natural = require('natural');
const Sentiment = require('sentiment');
const tokenizer = require('../utils/tokenizer');

const sentiment = new Sentiment();
const grammarTool = new natural.Spellcheck([]); // placeholder

const evaluateText = ({ question, transcript, expectedKeywords = [] }) => {
    // 1. Sentiment analysis
    const sentimentResult = sentiment.analyze(transcript);
    const toneScore = sentimentResult.comparative;
    const toneLabel =
        toneScore > 0.5
            ? 'Positive'
            : toneScore < -0.5
                ? 'Negative'
                : 'Neutral';

    // 2. Tokenization + Keyword Density
    const tokens = tokenizer(transcript);
    const keywordMatches = tokens.filter((token) =>
        expectedKeywords.includes(token.toLowerCase())
    );
    const keywordDensityRaw =
        expectedKeywords.length > 0
            ? keywordMatches.length / expectedKeywords.length
            : 0;
    const keywordDensityScore = +(keywordDensityRaw * 10).toFixed(2);

    // 3. Grammar Score (basic logic)
    const wordCount = tokens.length;
    const spellingErrors = tokens.filter((word) => !grammarTool.isCorrect(word));
    const grammarAccuracyRaw = wordCount > 0 ? 1 - spellingErrors.length / wordCount : 1;
    const grammarScore = +(grammarAccuracyRaw * 10).toFixed(2);

    // 4. Relevance Score
    const questionTokens = tokenizer(question.toLowerCase());
    const relevanceRaw =
        questionTokens.length > 0
            ? questionTokens.filter((qt) => tokens.includes(qt)).length / questionTokens.length
            : 0;
    const relevanceScore = +(relevanceRaw * 10).toFixed(2);

    // 5. Tone Score normalization (from comparative, normalize to 0–10)
    const normalizedToneScore = Math.min(Math.max((toneScore + 1) * 5, 0), 10).toFixed(2); // mapping [-1,1] to [0,10]

    return {
        tone: toneLabel,
        toneScore: +normalizedToneScore,
        keywordDensity: keywordDensityScore,
        grammarScore,
        relevanceScore,
        totalTokens: wordCount,
        spellingErrors: spellingErrors.length,
    };
};

module.exports = {
    evaluateText,
};
