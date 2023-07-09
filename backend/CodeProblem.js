// CodeProblem.js
const mongoose = require('mongoose');

const codeProblemSchema = new mongoose.Schema({
  problemId: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  testCases: [
    {
      input: {
        type: String,
        required: true,
      },
      expectedOutput: {
        type: String,
        required: true,
      },
    },
  ],
});

const CodeProblem = mongoose.model('CodeProblem', codeProblemSchema);

module.exports = CodeProblem;
