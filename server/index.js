// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. IMPORT ROUTES
const ewasteRoutes = require('./routes/ewasteRoutes');
const aiRoutes = require('./routes/aiRoutes'); 
const contactRoutes = require('./routes/contactRoutes'); // For contact form

// Initialize Express app
const app = express();

// --- Database Connection ---
const MONGODB_URI = process.env.MONGODB_URI;

// 2. Check if the environment variable is set
if (!MONGODB_URI) {
    console.error("❌ FATAL ERROR: MONGODB_URI is not defined in the .env file.");
    // Exit the process if the database connection string is missing
    process.exit(1); 
}

// --- Database Connection ---
mongoose.connect(MONGODB_URI, {
    // These options are now deprecated in modern Mongoose, but keeping them for compatibility
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected successfully (via Environment Variable)"))
.catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    // Exit on connection failure
    process.exit(1);
});

// --- Middleware ---
// Must come BEFORE route definitions
app.use(cors());
// Set payload size limit for handling Base64 images
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true })); 


// --- Routes ---

// Root Test Endpoint
app.get('/', (req, res) => {
    res.send("E-Waste Community Exchange API is running ✅");
});

// E-waste CRUD and item routes (mounted at /api/items)
app.use('/api/items', ewasteRoutes);

// AI Description Generation route (mounted at /api/ai)
app.use('/api/ai', aiRoutes); 

// ✅ CONTACT FORM ROUTE (mounted at /api/contact)
app.use('/api/contact', contactRoutes); 


// --- Start Server ---
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));