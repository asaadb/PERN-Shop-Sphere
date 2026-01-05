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

module.exports = {
  getCart,
};
