const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config'); // Assurez-vous que le chemin d'accès au fichier est correct
const phone = require('./router/phoneRouter'); // Assurez-vous que le chemin d'accès au fichier est correct
const computer = require('./router/computerRouter');
const appliance = require('./router/applianceRouter');
const app = express();

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
// Middleware
app.use(cors());
app.use(bodyParser.json());

const Phones = require ('./models/Phone');

const phoneRouter=require('./router/phoneRouter');






app.use('/phones', phoneRouter);
app.use('/computers', computer);
app.use('/appliances', appliance);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
