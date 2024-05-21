const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/connect');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Servir les fichiers statiques

// Connect to MongoDB
connectDB();
mongoose.connect('mongodb://localhost:27017/shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});

// Define router
const phoneRouter = require('./router/phoneRouter');
const computerRouter =require('./router/computerRouter');
const applianceRouter =require('./router/appliancesRouter');
// Use router
app.use ('/computer',computerRouter);
app.use('/phones', phoneRouter);
app.use('/appliances',applianceRouter);
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
