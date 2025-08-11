const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,       // Ensures emails are unique
    lowercase: true,    // Converts emails to lowercase
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports =  mongoose.model('User', userSchema);
