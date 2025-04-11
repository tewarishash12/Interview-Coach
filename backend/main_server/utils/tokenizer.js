function tokenizer(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .split(/\s+/)            // Split by whitespace
        .filter(word => word.length > 2); // Filter out short tokens like "a", "an"
}

module.exports = tokenizer;
