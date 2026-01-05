const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
} = require('../controllers/categoryController');

// GET all categories
router.get('/', getAllCategories);

// GET single category by ID
router.get('/:id', getCategoryById);

module.exports = router;
