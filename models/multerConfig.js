const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nommez les fichiers avec un timestamp pour éviter les conflits de noms
  }
});

const upload = multer({
  storage: storage
}).single('image');

module.exports = upload;
