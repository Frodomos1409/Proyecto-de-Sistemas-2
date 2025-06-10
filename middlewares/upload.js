const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Asegúrate que esta carpeta exista
  },
  filename: (req, file, cb) => {
    // Nombre del archivo: ejemplo veterinario-1681234567890.jpg
    const ext = path.extname(file.originalname);
    const baseName = file.fieldname; // por ejemplo: 'imagen'
    const uniqueSuffix = Date.now();
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  }
});

// Filtro de archivos (opcional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mime = allowedTypes.test(file.mimetype);
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (mime && ext) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes (jpg, jpeg, png, gif).'));
  }
};

// Exportar el middleware
module.exports = multer({ storage, fileFilter });
