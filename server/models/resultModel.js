// models/resultModel.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentEmail: { type: String, required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  attemptedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);
