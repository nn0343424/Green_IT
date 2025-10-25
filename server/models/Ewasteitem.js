// server/models/EwasteItem.js
const mongoose = require('mongoose');

const ewasteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    product: { type: String, required: true },
    condition: { type: String, required: true },
    location: { type: String, required: true },
    
    // ✅ FIX: Ensure 'image' type is String and remove the hardcoded default image
    // The Base64 string is a very long string.
    image: { type: String }, // <-- Should be String, no default
    
    message: { type: String },
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("EwasteItem", ewasteSchema);
