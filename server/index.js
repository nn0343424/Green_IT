const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb+srv://nn0343424:5K4nlagn5CWTT804@clusterone.cvieati.mongodb.net/ewaste', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=> console.log("MongoDB connected")).catch(console.error);

// Schema & Model
const itemSchema = new mongoose.Schema({
  name: String,
  category: String,
  condition: String,
  description: String,
  postedBy: String,
  date: { type: Date, default: Date.now }
});
const Item = mongoose.model("Ewaste", itemSchema);

// API Routes
app.get('/api/items', async (req,res)=>{
  const items = await Item.find();
  res.json(items);
});
app.post('/api/items', async (req,res)=>{
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});
app.delete('/api/items/:id', async (req,res)=>{
  await Item.findByIdAndDelete(req.params.id);
  res.json({ success:true });
});

// Start Server
app.listen(5000, ()=> console.log("Server running on port 5000"));