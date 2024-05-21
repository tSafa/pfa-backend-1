const express = require('express');
const router = express.Router();
const Phone = require('../models/Phone');
const upload = require('../models/multerConfig');

// Route pour créer un nouveau téléphone avec une image
router.post('/create', upload, async (req, res) => {
  try {
    const data = req.body;
    const newPhone = new Phone({
      brand: data.brand,
      model: data.model,
      serialNumber: data.serialNumber,
      image: req.file ? req.file.path : null // Enregistrer le chemin de l'image
    });

    await newPhone.save();
    res.status(201).json({ message: 'Téléphone ajouté avec succès', phone: newPhone });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de l'ajout du téléphone." });
  }
});

router.put('/update/:brand', async (req, res) => {
  try {
    const brand = req.params.brand;
    const newData = req.body;

    const updatedPhone = await Phone.findOneAndUpdate({ brand: brand }, newData, { new: true });

    if (!updatedPhone) {
      return res.status(404).json({ error: "Le téléphone spécifié n'a pas été trouvé." });
    }

    res.status(200).json(updatedPhone);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour du téléphone." });
  }
});

router.get('/getAll', async (req, res) => {
  try {
    const phones = await Phone.find();
    res.status(200).json(phones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des téléphones." });
  }
});

router.delete('/delete/:brand', async (req, res) => {
  try {
    const brand = req.params.brand;
    const deletedPhone = await Phone.findOneAndDelete({ brand: brand });

    if (!deletedPhone) {
      return res.status(404).json({ error: "Le téléphone spécifié n'a pas été trouvé." });
    }

    res.status(200).json(deletedPhone);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la suppression du téléphone." });
  }
});

module.exports = router;
