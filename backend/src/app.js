import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chat.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

// Determine allowed CORS origins
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, or same-origin requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive for local dev environment
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser with 1MB request size limit for security
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'NOVA AI Backend Service',
    version: '1.0.0',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Mount chat routes
app.use('/api/chat', chatRoutes);

// Catch 404 routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Centralized error handling
app.use(errorHandler);

export default app;
