const express = require('express');  
const mongoose = require('mongoose');  
const productRoutes = require('./routes/productRoutes');  
require('dotenv').config(); // Load environment variables from the .env file  

const app = express();  
const PORT = process.env.PORT || 5000; // Fetch the PORT from environment variables  
const MONGODB_URI = 'mongodb+srv://digitalskathmandu:tyc4ugk2cyu3dvDm@cluster0.6mwbmab.mongodb.net/kathmandudigitals?retryWrites=true&w=majority&appName=Cluster0'; // Fetch the MongoDB URI from environment variables  

app.use(express.json());  

app.use((req, res, next) => {  
  res.header('Access-Control-Allow-Origin', '*');  
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');  
  next();  
});  

// Add this root route handler
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

mongoose.connect(MONGODB_URI)  
  .then(() => console.log('Connected to MongoDB'))  
  .catch(err => console.error('MongoDB connection error:', err));  

app.use('/', productRoutes);  

app.listen(PORT, () => {  
  console.log(`Server running on port ${PORT}`);  
});