const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { seedAdmin } = require('./controllers/authController');

// Routes
const authRoutes = require('./routes/authRoutes');
const tourRoutes = require('./routes/tourRoutes');
const visaRoutes = require('./routes/visaRoutes');
const activityRoutes = require('./routes/activityRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const popupRoutes = require('./routes/popupRoutes');
const travelDealRoutes = require('./routes/travelDealRoutes');
const siteContentRoutes = require('./routes/siteContentRoutes');
const settingRoutes = require('./routes/settingRoutes');
const wallpaperRoutes = require('./routes/wallpaperRoutes');
const transferRoutes = require('./routes/transferRoutes');
const galleryRoutes = require('./routes/galleryRoutes');

const app = express();

// Connect to database in background
connectDB()
  .then(() => {
    seedAdmin().catch((err) => console.warn('[Seed Admin Info]', err.message));
  })
  .catch((err) => console.warn('[DB Connect Error]', err.message));

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (/^http:\/\/localhost:\d+$/.test(origin) || /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/visas', visaRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/popups', popupRoutes);
app.use('/api/travel-deals', travelDealRoutes);
app.use('/api/site-content', siteContentRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/wallpapers', wallpaperRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/gallery', galleryRoutes);

app.get('/', (req, res) => {
  res.send('Air Dream Travel & Tourism API is running perfectly...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
