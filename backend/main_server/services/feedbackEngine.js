const natural = require('natural');
const Sentiment = require('sentiment');
const tokenizer = require('../utils/tokenizer');

const sentiment = new Sentiment();
const grammarTool = new natural.Spellcheck([]); // simple placeholder

/**
 * Evaluates the tone, keyword relevance, and grammar of a given text.
 * @param {string} transcript - The transcribed text or resume content.
 * @param {string[]} expectedKeywords - List of job-relevant keywords.
 * @returns {Object} Evaluation report with tone, grammar, and keyword metrics.
 */
const evaluateText = (transcript, expectedKeywords = []) => {
    // 1. Tone/Sentiment Analysis
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
    const keywordDensity =
        expectedKeywords.length > 0
            ? keywordMatches.length / expectedKeywords.length
            : 0;

    // 3. Basic Grammar Score (placeholder logic)
    const wordCount = tokens.length;
    const spellingErrors = tokens.filter((word) => !grammarTool.isCorrect(word));
    const grammarScore = wordCount > 0 ? 1 - spellingErrors.length / wordCount : 1;

    return {
        tone: toneLabel,
        toneScore: toneScore.toFixed(2),
        keywordDensity: (keywordDensity * 100).toFixed(2) + '%',
        grammarScore: (grammarScore * 100).toFixed(2) + '%',
        totalTokens: wordCount,
        spellingErrors,
    };
};

module.exports = {
    evaluateText,
};