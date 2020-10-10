const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '.' + file.mimetype.split('/')[1]);
  },
});

const UploadFile = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = UploadFile;
