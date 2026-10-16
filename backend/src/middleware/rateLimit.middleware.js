import rateLimit from 'express-rate-limit';

/**
 * Chat endpoint rate limiter to prevent abuse and excessive API usage
 * Allows 60 requests per 15 minutes per IP
 */
export const chatRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60, // Limit each IP to 60 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    error: 'Too many requests sent to NOVA AI. Please pause for a few minutes before trying again.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});
