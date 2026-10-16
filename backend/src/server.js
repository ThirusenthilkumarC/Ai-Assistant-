import dotenv from 'dotenv';
// Load environment variables before importing app
dotenv.config();

import app from './app.js';
import { getAiStatus } from './services/ai.service.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  const status = getAiStatus();
  console.log(`\n======================================================`);
  console.log(`🚀 NOVA AI Backend Server running on port ${PORT}`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
  console.log(`🤖 AI Status: ${status.configured ? 'Active (Gemini)' : 'Demo Mode (No API key)'}`);
  console.log(`📘 AI Model: ${status.model}`);
  console.log(`======================================================\n`);
});

// Handle graceful shutdown
const shutdown = (signal) => {
  console.log(`\n[Server] Received ${signal}, shutting down gracefully...`);
  server.close(() => {
    console.log('[Server] HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
