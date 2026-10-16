/**
 * Centralized error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
  // Log internal error for server operators
  console.error('[Error Middleware Caught]:', {
    message: err.message,
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Provide client-safe error response
  const statusCode = err.statusCode || (err.status ? parseInt(err.status, 10) : 500) || 500;
  
  res.status(statusCode).json({
    success: false,
    error: err.message || 'An unexpected error occurred while communicating with NOVA AI.',
    code: err.code || 'INTERNAL_SERVER_ERROR'
  });
};
