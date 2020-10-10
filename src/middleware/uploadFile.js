const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '.' + file.mimetype.split('/')[1]);
  },
});

const memoryStorage = multer.memoryStorage();
let UploadFile = '';
if (process.env.NODE_ENV === 'production') {
  // firebase upload
  UploadFile = multer({
    storage: memoryStorage,
    limits: {
      fileSize: 1024 * 1024 * 2,
    },
  });
} else {
  // local upload
  UploadFile = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 2,
    },
  });
}

module.exports = UploadFile;
