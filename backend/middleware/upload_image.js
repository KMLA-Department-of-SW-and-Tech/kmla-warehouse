const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/s3'); // Import the S3 client from s3.js
require('dotenv').config(); // Load environment variables from .env

// Configure Multer-S3 Storage
const upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set Content-Type
      metadata: (req, file, cb) => {
          cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
          // Generate a unique key for the file
          const uniqueSuffix = Date.now().toString();
          const sanitizedFileName = file.originalname.replace(/\s+/g, '_'); // Replace spaces with underscores
          cb(null, `images/${uniqueSuffix}_${sanitizedFileName}`);
      },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
      // Allow only image files
      if (file.mimetype.startsWith('image/')) {
          cb(null, true);
      } else {
          cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only image files are allowed!'), false);
      }
  },
});

/**
* Middleware to handle single image upload.
* Adds imageUrl and imageKey to the request object upon success.
*/
const handleImageUpload = (req, res, next) => {
    const uploadSingle = upload.single('image');
    uploadSingle(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        console.error('Multer Error:', err.message);
        return res.status(400).json({ error: err.message });
    } else if (err) {
        // An unknown error occurred when uploading
        console.error('Unknown Error:', err);
        return res.status(500).json({ error: 'An error occurred while uploading the image.' });
    }

    // Check if file is uploaded
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    // File uploaded successfully
    console.log('Image uploaded to S3:', req.file);
    next();
  });
};

module.exports = handleImageUpload;





