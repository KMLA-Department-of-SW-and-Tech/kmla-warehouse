require('dotenv').config(); // Load environment variables from .env
const { S3Client } = require('@aws-sdk/client-s3');

// Configure the S3 client with environment variables
const s3 = new S3Client({
  region: process.env.MY_AWS_REGION,
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  },
});

module.exports = s3;