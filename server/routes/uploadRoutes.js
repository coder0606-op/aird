const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueName = `img_${Date.now()}_${cleanBase}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter
});

// Single file upload endpoint (accepts 'file' or 'image')
const uploadMiddleware = (req, res, next) => {
  const handler = upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]);

  handler(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

router.post('/', uploadMiddleware, (req, res) => {
  try {
    const file = req.files?.file?.[0] || req.files?.image?.[0] || req.file;
    if (!file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const host = req.get('host');
    const protocol = req.protocol;
    // Provide both relative and full URL
    const relativeUrl = `/uploads/${file.filename}`;
    const fullUrl = `${protocol}://${host}/uploads/${file.filename}`;

    res.status(201).json({
      success: true,
      url: relativeUrl,
      fullUrl: fullUrl,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing upload', error: error.message });
  }
});

// Base64 image upload fallback
router.post('/base64', (req, res) => {
  try {
    const { base64, filename } = req.body;
    if (!base64) {
      return res.status(400).json({ message: 'Base64 data is required' });
    }

    const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ message: 'Invalid base64 string' });
    }

    const mime = matches[1];
    const dataBuffer = Buffer.from(matches[2], 'base64');
    let ext = '.jpg';
    if (mime.includes('png')) ext = '.png';
    else if (mime.includes('webp')) ext = '.webp';
    else if (mime.includes('svg')) ext = '.svg';
    else if (mime.includes('gif')) ext = '.gif';

    const cleanName = filename ? filename.replace(/[^a-zA-Z0-9_-]/g, '_') : 'upload';
    const uniqueFilename = `img_${Date.now()}_${cleanName}${ext}`;
    const filePath = path.join(uploadsDir, uniqueFilename);

    fs.writeFileSync(filePath, dataBuffer);

    const relativeUrl = `/uploads/${uniqueFilename}`;
    res.status(201).json({
      success: true,
      url: relativeUrl,
      filename: uniqueFilename
    });
  } catch (error) {
    res.status(500).json({ message: 'Error saving base64 image', error: error.message });
  }
});

module.exports = router;
