// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const s3 = require('../config/s3'); // Import the S3 client from s3.js
// require('dotenv').config();
// const { DeleteObjectCommand } = require('@aws-sdk/client-s3');

// const deleteImageMiddleware = async (req, res, next) => {
//     // Extract bucketName and objectKey from request
//     // You can choose to get these from req.body, req.query, or req.params
//     const bucketName = process.env.AWS_BUCKET_NAME;
//     const objectKey = req.body.prevKey;

//     // Validate input
//     if (!bucketName || !objectKey) {
//         return res.status(400).json({ error: "bucketName and objectKey are required." });
//     }

//     const params = {
//         Bucket: bucketName,
//         Key: objectKey,
//     };

//     try {
//         const command = new DeleteObjectCommand(params);
//         await s3.send(command);
//         console.log(`Deleted ${objectKey} from ${bucketName}`);
//         // You can attach the result to req for downstream middleware if needed
//         req.deletedObject = { bucketName, objectKey };
//         return res.status(200).send("Successfully updated item");
//     } catch (err) {
//         console.error("Error deleting object:", err);
//         // Handle specific AWS errors if needed
//         return res.status(500).json({ error: "Failed to delete object from S3." });
//     }
// };

// module.exports = deleteImageMiddleware;