// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/exp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema
const expenseSchema = new mongoose.Schema({
  date: String,
  title: String,
  category: String,
  amount: Number,
  credit: String,
});

const Expense = mongoose.model('Expense', expenseSchema);

// API endpoints
app.post('/expenses', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
