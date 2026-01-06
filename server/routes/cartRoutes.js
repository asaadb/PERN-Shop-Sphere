const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');

router.get('/', getCart);

router.post('/', addToCart);

router.put('/:id', updateCartItem);

// Clear all items for a session
router.delete('/', clearCart);
// Remove single item
router.delete('/:id', removeFromCart);

module.exports = router;
