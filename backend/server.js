const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const orderRoutes = require('./routes/orderRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const pharmacyRoutes = require('./routes/pharmacyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve all frontend files — CSS is co-located in pages/ folder
app.use(express.static(path.join(__dirname, '../frontend/src/pages')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/pharmacies', pharmacyRoutes);

// Root → Home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src/pages/Home.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 AI Pharmacy Assistant running at http://localhost:${PORT}`);
});

module.exports = app;
