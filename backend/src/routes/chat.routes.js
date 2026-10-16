import { Router } from 'express';
import { handleChatMessage, getStatus, generateTitle } from '../controllers/chat.controller.js';
import { validateChatRequest } from '../middleware/validation.middleware.js';
import { chatRateLimiter } from '../middleware/rateLimit.middleware.js';

const router = Router();

// Chat completion endpoint with rate limiting & input validation
router.post('/', chatRateLimiter, validateChatRequest, handleChatMessage);

// Health & AI service status endpoint
router.get('/status', getStatus);

// Automatic conversation title generator endpoint
router.post('/title', generateTitle);

export default router;
