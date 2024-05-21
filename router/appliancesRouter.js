const express = require('express');
const router = express.Router();
const Appliance = require('../models/appliance'); // Importez Appliance au lieu de appliance
const upload = require('../models/multerConfig');

// Route pour créer un nouveau appareil avec une image
router.post('/create', upload, async (req, res) => {
  try {
    const data = req.body;
    const newAppliance = new Appliance({ // Utilisez Appliance ici
      brand: data.brand,
      model: data.model,
      serialNumber: data.serialNumber,
      image: req.file ? req.file.path : null // Enregistrer le chemin de l'image
    });

    await newAppliance.save();
    res.status(201).json({ message: 'Appareil ajouté avec succès', appliance: newAppliance }); // Modifiez le message pour "Appareil"
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de l'ajout de l'appareil." }); // Modifiez le message pour "appareil"
  }
});

router.put('/update/:brand', async (req, res) => {
  try {
    const brand = req.params.brand;
    const newData = req.body;

    const updatedAppliance = await Appliance.findOneAndUpdate({ brand: brand }, newData, { new: true }); // Utilisez Appliance ici

    if (!updatedAppliance) {
      return res.status(404).json({ error: "L'appareil spécifié n'a pas été trouvé." }); // Modifiez le message pour "appareil"
    }

    res.status(200).json(updatedAppliance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour de l'appareil." }); // Modifiez le message pour "appareil"
  }
});

router.get('/getAll', async (req, res) => {
  try {
    const appliances = await Appliance.find(); // Utilisez Appliance ici
    res.status(200).json(appliances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des appareils." }); // Modifiez le message pour "appareils"
  }
});

router.delete('/delete/:brand', async (req, res) => {
  try {
    const brand = req.params.brand;
    const deletedAppliance = await Appliance.findOneAndDelete({ brand: brand }); // Utilisez Appliance ici

    if (!deletedAppliance) {
      return res.status(404).json({ error: "L'appareil spécifié n'a pas été trouvé." }); // Modifiez le message pour "appareil"
    }

    res.status(200).json(deletedAppliance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la suppression de l'appareil." }); // Modifiez le message pour "appareil"
  }
});

module.exports = router;
