const express = require('express');
const router = express.Router();
const Phone = require('../models/Phone'); // Assurez-vous que le chemin d'accès au modèle est correct

router.post('/create', async (req, res) => {
    try {
        const data = req.body;

        const newPhone = new Phone({
            brand: data.brand,
            model: data.model,
            serialNumber: data.serialNumber,
            validFrom: data.validFrom,
            validUntil: data.validUntil,
            imageURL: data.imageURL
        });

        await newPhone.save();
        res.status(201).json({ message: 'Smartphone ajouté avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur s'est produite lors de la création du Smartphone." });
    }
});


// Ajoutez les autres routes PUT, GET, DELETE ici...

module.exports = router;
