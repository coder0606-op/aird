const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dgu6qbxi0",
  api_key: process.env.CLOUDINARY_API_KEY || "367453171681276",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "7BcgLj7rAZ0aAGQEVF8tQ8Au2kI",
  secure: true,
});

module.exports = cloudinary;
