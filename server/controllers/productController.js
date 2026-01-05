const pool = require('../db');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT products.*, categories.name as category_name FROM products LEFT JOIN categories ON products.category_id = categories.id ORDER BY products.created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single product
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT products.*, categories.name as category_name FROM products LEFT JOIN categories ON products.category_id = categories.id WHERE products.id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category_id, stock_quantity, image_url } =
      req.body;

    const result = await pool.query(
      'INSERT INTO products (name, description, price, category_id, stock_quantity, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, price, category_id, stock_quantity, image_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};
