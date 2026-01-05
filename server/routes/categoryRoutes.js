const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
} = require('../controllers/categoryController');

// GET all categories
router.get('/', getAllCategories);

// GET single category by ID
router.get('/:id', getCategoryById);

// POST route to create a new category
router.post('/', createCategory);

module.exports = router;
