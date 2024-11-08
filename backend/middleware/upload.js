const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/s3'); // Import the S3 client from s3.js

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically sets the correct Content-Type based on the file type
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `images/${Date.now().toString()}_${file.originalname}`);
    }
  })
});

module.exports = upload;


