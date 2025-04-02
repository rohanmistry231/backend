// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  getBestsellerProducts,
  getNewProducts,
  getProductsByCategory,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// Middleware to log requests for debugging
router.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.originalUrl}`);
  next();
});

// Specific routes first
router.get('/categories', getCategories);                  // Get all categories
router.get('/products', getAllProducts);                   // Get all products
router.get('/products/featured', getFeaturedProducts);     // Get featured products
router.get('/products/bestsellers', getBestsellerProducts); // Get bestseller products
router.get('/products/new', getNewProducts);               // Get new products
router.get('/products/category/:category', getProductsByCategory); // Get products by category

// Dynamic routes after specific ones
router.get('/products/:id', getProductById);               // Get product by ID
router.post('/products', createProduct);                   // Create a new product
router.put('/products/:id', updateProduct);                // Update a product by ID
router.delete('/products/:id', deleteProduct);             // Delete a product by ID

module.exports = router;