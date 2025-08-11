const express = require('express');
const router = express.Router();
const Quiz = require('../models/quizModel');

// ✅ Add a new quiz
router.post('/add', async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add quiz', details: error.message });
  }
});

// ✅ Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// ✅ Get quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});


// Update route
router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id.trim(); // Trim to remove trailing newline
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedQuiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.status(200).json({ message: 'Quiz updated successfully', updatedQuiz });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quiz', details: error.message });
  }
});



// ✅ Delete quiz by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!deletedQuiz) {
      return res.status(404).json({ error: 'Quiz not found to delete' });
    }
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
});

module.exports = router;
