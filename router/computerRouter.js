const express = require('express');
const router = express.Router();
const Computer = require('../models/computer');
const upload = require('../models/multerConfig');

// Route pour créer un nouveau ordinateur avec une image
router.post('/create', upload, async (req, res) => {
  try {
    const data = req.body;
    const newComputer = new Computer({
      brand: data.brand,
      model: data.model,
      serialNumber: data.serialNumber,
      image: req.file ? req.file.path : null // Enregistrer le chemin de l'image
    });

    await newComputer.save();
    res.status(201).json({ message: 'Ordinateur ajouté avec succès', computer: newComputer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de l'ajout de l'ordinateur." });
  }
});

router.put('/update/:brand', async (req, res) => {
  try {
    const brand = req.params.brand;
    const newData = req.body;

    const updatedComputer = await Computer.findOneAndUpdate({ brand: brand }, newData, { new: true });

    if (!updatedComputer) {
      return res.status(404).json({ error: "L'ordinateur spécifié n'a pas été trouvé." });
    }

    res.status(200).json(updatedComputer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour de l'ordinateur." });
  }
});

router.get('/getAll', async (req, res) => {
  try {
    const computers = await Computer.find();
    res.status(200).json(computers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des ordinateurs." });
  }
});

router.delete('/delete/:brand', async (req, res) => {
  try {
    const brand = req.params.brand;
    const deletedComputer = await Computer.findOneAndDelete({ brand: brand });

    if (!deletedComputer) {
      return res.status(404).json({ error: "L'ordinateur spécifié n'a pas été trouvé." });
    }

    res.status(200).json(deletedComputer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la suppression de l'ordinateur." });
  }
});

module.exports = router;
