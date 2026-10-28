const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { Readable } = require("stream");

// Use memoryStorage — no local files or directories created on disk
// Completely safe for Vercel serverless / read-only filesystem
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter,
});

/**
 * Upload a Buffer directly to Cloudinary via stream
 */
const uploadBufferToCloudinary = (
  buffer,
  folder = "airdream",
  mimetype = "image/jpeg",
) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [{ quality: "auto:good" }, { fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(uploadStream);
  });
};

// Single file upload middleware (accepts 'file' or 'image')
const uploadMiddleware = (req, res, next) => {
  const handler = upload.fields([
    { name: "file", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]);

  handler(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

// POST /api/upload - Multipart image upload to Cloudinary
router.post("/", uploadMiddleware, async (req, res) => {
  try {
    const file = req.files?.file?.[0] || req.files?.image?.[0] || req.file;
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No image file uploaded" });
    }

    const result = await uploadBufferToCloudinary(
      file.buffer,
      "airdream",
      file.mimetype,
    );

    res.status(201).json({
      success: true,
      url: result.secure_url,
      fullUrl: result.secure_url,
      publicId: result.public_id,
      filename: result.public_id,
      width: result.width,
      height: result.height,
      size: result.bytes,
      mimetype: file.mimetype,
      format: result.format,
    });
  } catch (error) {
    console.error("[Cloudinary Upload Error]", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error uploading image to Cloudinary",
        error: error.message,
      });
  }
});

// POST /api/upload/base64 - Base64 image upload to Cloudinary
router.post("/base64", async (req, res) => {
  try {
    const { base64, filename } = req.body;
    if (!base64) {
      return res
        .status(400)
        .json({ success: false, message: "Base64 data is required" });
    }

    const result = await cloudinary.uploader.upload(base64, {
      folder: "airdream",
      resource_type: "image",
      public_id: filename
        ? filename.replace(/[^a-zA-Z0-9_-]/g, "_")
        : undefined,
      transformation: [{ quality: "auto:good" }, { fetch_format: "auto" }],
    });

    res.status(201).json({
      success: true,
      url: result.secure_url,
      fullUrl: result.secure_url,
      publicId: result.public_id,
      filename: result.public_id,
      format: result.format,
    });
  } catch (error) {
    console.error("[Cloudinary Base64 Error]", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error uploading base64 image to Cloudinary",
        error: error.message,
      });
  }
});

// DELETE /api/upload/:publicId - Delete image from Cloudinary
router.delete("/:publicId(*)", async (req, res) => {
  try {
    const publicId = decodeURIComponent(req.params.publicId);
    const result = await cloudinary.uploader.destroy(publicId);
    res.json({ success: true, result });
  } catch (error) {
    console.error("[Cloudinary Delete Error]", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error deleting from Cloudinary",
        error: error.message,
      });
  }
});

module.exports = router;
