const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// Route to get all products
router.get('/', getAllProducts);

// Route to get a single product by ID
router.get('/:id', getProductById);

//Post route to create a new product
router.post('/', createProduct);

//Put route to update a product
router.put('/:id', updateProduct);

//Delete route to delete a product
router.delete('/:id', deleteProduct);

module.exports = router;
