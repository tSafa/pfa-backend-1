const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const phone = require('./router/phoneRouter'); // Assurez-vous que le chemin d'accès au fichier est correct
const computer = require('./router/computerRouter');
const appliance = require('./router/applianceRouter');
const app = express();

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/phones', phone); // Utilisez le routeur pour les téléphones
app.use('/computers', computer);
app.use('/computers', appliances);
// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
