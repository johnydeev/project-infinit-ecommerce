// const multer = require("multer");
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// const s3 = new S3Client({
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID, // store it in .env file to keep it safe
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
//   region: process.env.S3_REGION, // this is the region that you select in AWS account
// });

// const upload = multer({
//   storage: multer.memoryStorage(), // Store the file in memory for further processing
// });

// module.exports = { upload, s3 };
