const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/s3'); // Import the S3 client from s3.js
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config(); // Load environment variables from .env
const itemService = require("../services/item_service");

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

/*
* Middleware to handle single image upload.
* Adds imageUrl and imageKey to the request object upon success.
*/


module.exports.deleteImage = async (fileKey) => {
    if (!fileKey) {
        console.warn("No imageKey provided for deletion.");
        return { success: false, message: "No image found to delete." };
    }

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
    };

    try {
        const command = new DeleteObjectCommand(params);
        await s3.send(command); 
        console.log(`File deleted successfully: ${fileKey}`);
        return { success: true, message: "File deleted successfully" };
    } catch (error) {
        console.error(`Error deleting file: ${error.message}`);
        throw new Error(`Could not delete file: ${error.message}`);
    }
};

const handleImageUpload = async (req, res, next) => {
    if(req.params.id) {
        const id = req.params.id;
        const item = await itemService.getOne(id);

        if(!item) {
            throw new Error("Item not found");
        }

        console.log(item);

        try {
            await exports.deleteImage(item.imageKey); 
        } catch(e) {
            throw(e);
        }

            
    }

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
            // return res.status(400).json({ error: 'No file uploaded.' });
            return next();
        }

        // File uploaded successfully
        // console.log('Image uploaded to S3:', req.file);

        req.body = Object.assign(req.body, {
            imageUrl: req.file.location,
            imageKey: req.file.key,
        });
        return next();
    });
};

module.exports = handleImageUpload;