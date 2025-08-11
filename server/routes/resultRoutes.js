// routes/resultRoutes.js
const express = require('express');
const router = express.Router();
const Quiz = require('../models/quizModel');
const Student = require('../models/studentModel'); // your student schema

// Submit quiz and calculate score
router.post('/submit-quiz', async (req, res) => {
  try {
    const { studentEmail, quizId, answers } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    let score = 0;

    // Compare each submitted answer with correct one
    quiz.questions.forEach((question, idx) => {
      const userAnswer = answers[idx]?.answer;

      if (question.questionType === 'multiple') {
        const correct = Array.isArray(question.correctAnswer) ? question.correctAnswer.sort() : [];
        const submitted = Array.isArray(userAnswer) ? userAnswer.sort() : [];
        if (JSON.stringify(correct) === JSON.stringify(submitted)) {
          score += 1;
        }
      } else {
        if (userAnswer?.toString().trim().toLowerCase() === question.correctAnswer?.toString().trim().toLowerCase()) {
          score += 1;
        }
      }
    });

    // Update student results
    await Student.updateOne(
      { email: studentEmail },
      {
        $push: {
          results: {
            quizName: quiz.title,
            score: score
          }
        }
      }
    );

    res.status(200).json({
      message: "Quiz submitted successfully",
      totalQuestions: quiz.questions.length,
      score
    });

  } catch (error) {
    res.status(500).json({ error: "Quiz submission failed", details: error.message });
  }
});

module.exports = router;
