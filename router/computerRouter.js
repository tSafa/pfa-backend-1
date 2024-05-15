const express = require('express');
const router = express.Router();
const Computer = require('../models/computer'); // Assurez-vous que le chemin d'accès au modèle est correct

router.post('/create', async (req, res) => {
    try {
        const data = req.body;

        const newComputer = new Computer({
            brand: data.brand,
            model: data.model,
            serialNumber: data.serialNumber,
            validFrom: data.validFrom,
            validUntil: data.validUntil,
            imageURL: data.imageURL
        });

        await newComputer.save();
        res.status(201).json({ message: 'Computer ajouté avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur s'est produite lors de la création du Computer." });
    }
});

// Ajoutez les autres routes PUT, GET, DELETE ici...

module.exports = router;
