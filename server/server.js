const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { seedAdmin } = require("./controllers/authController");

// Routes
const authRoutes = require("./routes/authRoutes");
const tourRoutes = require("./routes/tourRoutes");
const visaRoutes = require("./routes/visaRoutes");
const activityRoutes = require("./routes/activityRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const popupRoutes = require("./routes/popupRoutes");
const travelDealRoutes = require("./routes/travelDealRoutes");
const siteContentRoutes = require("./routes/siteContentRoutes");
const settingRoutes = require("./routes/settingRoutes");
const wallpaperRoutes = require("./routes/wallpaperRoutes");
const transferRoutes = require("./routes/transferRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const whyChooseUsRoutes = require("./routes/whyChooseUsRoutes");

const app = express();

// Connect to database in background
connectDB()
  .then(() => {
    seedAdmin().catch((err) => console.warn("[Seed Admin Info]", err.message));
  })
  .catch((err) => console.warn("[DB Connect Error]", err.message));

// Comprehensive CORS Middleware (defined before any routes)
const allowedOrigins = [
  "https://airdreamtraveltourism.com",
  "https://www.airdreamtraveltourism.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin) ||
        /\.vercel\.app$/.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    optionsSuccessStatus: 204,
  }),
);

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Serve local static uploads if directory exists (legacy local fallback)
const uploadsDir = path.join(__dirname, "uploads");
if (fs.existsSync(uploadsDir)) {
  app.use("/uploads", express.static(uploadsDir));
}

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/why-choose-us", whyChooseUsRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/visas", visaRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/popups", popupRoutes);
app.use("/api/travel-deals", travelDealRoutes);
app.use("/api/site-content", siteContentRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/wallpapers", wallpaperRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/gallery", galleryRoutes);

app.get("/", (req, res) => {
  res.send("Air Dream Travel & Tourism API is running perfectly...");
});

// Export app for Vercel Serverless Function handler
module.exports = app;

// In local development or standalone server, start the HTTP listener
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
