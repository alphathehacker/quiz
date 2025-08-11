const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDb = require('./config/db');

// Load environment variables from .env
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Connect to MongoDB Atlas
connectDb();

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Serve static files (Frontend)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Import Routes
const userRoutes = require('./routes/loginRoute');
const quizRoutes = require('./routes/quizRoutes');
const resultRoutes = require('./routes/resultRoutes');

// ✅ Mount Routes
app.use('/api/users', userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/results', resultRoutes);

// ✅ Catch-all for frontend routes (if SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Default 404 handler for APIs
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
