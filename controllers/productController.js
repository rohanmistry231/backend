// backend/controllers/productController.js
const Product = require('../models/Product');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({ message: "No products available yet" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get featured products
const getFeaturedProducts = async (req, res) => {
  try {
    const featured = await Product.find({ featured: true });
    if (featured.length === 0) {
      return res.status(404).json({ message: "No featured products available" });
    }
    res.json(featured);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get bestseller products
const getBestsellerProducts = async (req, res) => {
  try {
    const bestsellers = await Product.find({ bestseller: true });
    if (bestsellers.length === 0) {
      return res.status(404).json({ message: "No bestseller products available" });
    }
    res.json(bestsellers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get new products
const getNewProducts = async (req, res) => {
  try {
    const newProducts = await Product.find({ new: true });
    if (newProducts.length === 0) {
      return res.status(404).json({ message: "No new products available" });
    }
    res.json(newProducts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const query = category === "All" ? {} : { category };
    const filteredProducts = await Product.find(query);
    if (filteredProducts.length === 0) {
      return res.status(404).json({ message: `No products found in category: ${category}` });
    }
    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    console.log("Distinct categories from DB:", categories); // Debugging log
    if (categories.length === 0) {
      return res.json(["All"]); // Fallback to just "All" if no products exist yet
    }
    // Optional: Normalize categories to lowercase and remove duplicates
    const normalizedCategories = categories.map(cat => cat.toLowerCase());
    const uniqueCategories = [...new Set(normalizedCategories)];
    res.json(["All", ...uniqueCategories]);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const existingProduct = await Product.findOne({ id: newProduct.id });
    if (existingProduct) {
      return res.status(400).json({ message: "Product with this ID already exists" });
    }
    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    res.status(400).json({ message: "Invalid product data", error: error.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findOneAndUpdate(
      { id: productId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: "Invalid update data", error: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findOneAndDelete({ id: productId });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
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
};