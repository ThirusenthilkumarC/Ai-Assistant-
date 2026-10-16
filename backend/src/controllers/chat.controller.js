import { generateChatResponse, getAiStatus } from '../services/ai.service.js';

/**
 * Handle incoming chat message
 * POST /api/chat
 */
export const handleChatMessage = async (req, res, next) => {
  try {
    const { message, conversationHistory = [], mode = 'general', language = 'en' } = req.body;

    const result = await generateChatResponse({
      message,
      conversationHistory,
      mode,
      language
    });

    return res.status(200).json({
      success: true,
      data: {
        response: result.text,
        isDemo: result.isDemo,
        provider: result.provider,
        model: result.model,
        mode,
        language,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get AI provider and backend status
 * GET /api/chat/status
 */
export const getStatus = async (req, res) => {
  const status = getAiStatus();
  return res.status(200).json({
    success: true,
    data: {
      ...status,
      timestamp: new Date().toISOString()
    }
  });
};

/**
 * Generate a short 3-5 word title for a conversation
 * POST /api/chat/title
 */
export const generateTitle = async (req, res) => {
  try {
    const { message, language = 'en' } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(200).json({ success: true, title: 'New Conversation' });
    }

    const trimmed = message.trim();
    // Simple fast title generation
    const clean = trimmed.replace(/[^\w\s\u0B80-\u0BFF]/g, '').trim();
    const words = clean.split(/\s+/).slice(0, 5);
    let title = words.join(' ');
    if (title.length > 40) {
      title = title.substring(0, 37) + '...';
    }
    if (!title) {
      title = language === 'ta' ? 'புதிய உரையாடல்' : 'New Conversation';
    }

    return res.status(200).json({
      success: true,
      title
    });
  } catch (err) {
    return res.status(200).json({ success: true, title: 'New Conversation' });
  }
};
