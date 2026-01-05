const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
} = require('../controllers/cartController');

router.get('/', getCart);

router.post('/', addToCart);

router.put('/:id', updateCartItem);

module.exports = router;
