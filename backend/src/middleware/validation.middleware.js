/**
 * Request validation middleware for chat requests
 */
export const validateChatRequest = (req, res, next) => {
  const { message, mode, language, conversationHistory } = req.body;

  // 1. Message check
  if (!message || typeof message !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Message is required and must be a text string.'
    });
  }

  const trimmed = message.trim();
  if (trimmed.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Message cannot be empty or only whitespace.'
    });
  }

  if (trimmed.length > 5000) {
    return res.status(400).json({
      success: false,
      error: 'Message is too long. Please keep prompts under 5,000 characters.'
    });
  }

  // 2. Mode check
  const validModes = ['general', 'coding', 'study'];
  if (mode && !validModes.includes(mode)) {
    return res.status(400).json({
      success: false,
      error: `Invalid mode. Allowed modes are: ${validModes.join(', ')}`
    });
  }

  // 3. Language check
  const validLanguages = ['en', 'ta'];
  if (language && !validLanguages.includes(language)) {
    return res.status(400).json({
      success: false,
      error: `Invalid language. Allowed languages are: ${validLanguages.join(', ')}`
    });
  }

  // 4. Conversation history check
  if (conversationHistory && !Array.isArray(conversationHistory)) {
    return res.status(400).json({
      success: false,
      error: 'conversationHistory must be an array of previous messages.'
    });
  }

  next();
};
