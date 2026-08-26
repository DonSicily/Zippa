const multer = require('multer');

const ALLOWED = {
  image: { mimes: ['image/jpeg', 'image/png', 'image/webp'], maxMB: 5 },
  document: { mimes: ['application/pdf'], maxMB: 10 },
};

const storage = multer.memoryStorage();

const upload = (type = 'image') =>
  multer({
    storage,
    limits: { fileSize: ALLOWED[type].maxMB * 1024 * 1024, files: 5 },
    fileFilter(req, file, cb) {
      if (!ALLOWED[type].mimes.includes(file.mimetype)) {
        return cb(new Error(`File type not allowed. Accepted: ${ALLOWED[type].mimes.join(', ')}`));
      }
      cb(null, true);
    },
  });

module.exports = { upload };