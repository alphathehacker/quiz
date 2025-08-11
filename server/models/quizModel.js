const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionType: { type: String, enum: ['MCQ', 'MultipleAnswer', 'FillInTheBlanks'], required: true },
  question: { type: String, required: true },
  options: [String], // used for MCQ or MultipleAnswer
  correctAnswer: mongoose.Schema.Types.Mixed // string or array
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [questionSchema]
});

module.exports = mongoose.model('Quiz', quizSchema);
