const express = require('express');  
const mongoose = require('mongoose');  
const productRoutes = require('./routes/productRoutes');  
require('dotenv').config(); // Load environment variables from the .env file  

const app = express();  
const PORT = process.env.PORT || 5000; // Fetch the PORT from environment variables  
const MONGODB_URI = process.env.MONGODB_URI; // Fetch the MongoDB URI from environment variables  

app.use(express.json());  

app.use((req, res, next) => {  
  res.header('Access-Control-Allow-Origin', '*');  
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');  
  next();  
});  

mongoose.connect(MONGODB_URI)  
  .then(() => console.log('Connected to MongoDB'))  
  .catch(err => console.error('MongoDB connection error:', err));  

app.use('/', productRoutes);  

app.listen(PORT, () => {  
  console.log(`Server running on port ${PORT}`);  
});