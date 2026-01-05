const pool = require('../db');

// Get cart items for a session
const getCart = async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) {
      return res.status(400).json({ error: 'Session ID is required' });
    }
    const result = await pool.query(
      `SELECT cart_items.id, cart_items.quantity, cart_items.product_id, products.name, products.price, products.image_url, products.stock_quantity FROM cart_items JOIN products ON cart_items.product_id = products.id WHERE cart_items.session_id = $1`,
      [session_id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { session_id, product_id, quantity } = req.body;

    if (!session_id || !product_id || !quantity) {
      return res
        .status(400)
        .json({ error: 'Session ID, product ID, and quantity are required' });
    }

    // Check if item already exists in cart
    const existingItem = await pool.query(
      'SELECT * FROM cart_items WHERE session_id = $1 AND product_id = $2',
      [session_id, product_id]
    );

    if (existingItem.rows.length > 0) {
      // Update quantity if item exists
      const updatedItem = await pool.query(
        'UPDATE cart_items SET quantity = quantity + $1 WHERE session_id = $2 AND product_id = $3 RETURNING *',
        [quantity, session_id, product_id]
      );
      res.json(updatedItem.rows[0]);
    } else {
      // Insert new item
      const newItem = await pool.query(
        'INSERT INTO cart_items (session_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [session_id, product_id, quantity]
      );
      res.status(201).json(newItem.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Valid quantity is required' });
    }
    const result = await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *',
      [quantity, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
};
