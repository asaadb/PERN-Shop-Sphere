const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  mergeCart,
} = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getCart);

router.post("/", addToCart);

router.put("/:id", updateCartItem);

// Clear all items for a session
router.delete("/", clearCart);
// Remove single item
router.delete("/:id", removeFromCart);

// Merge guest cart into user cart
router.post("/merge", authMiddleware, mergeCart);

module.exports = router;
