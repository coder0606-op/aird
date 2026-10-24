const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const inputEmail = (
    req.body.email ||
    req.body.username ||
    req.body.identifier ||
    req.body.baseNumber ||
    ""
  )
    .trim()
    .toLowerCase();
  const inputPassword = (req.body.password || "").trim();

  if (!inputEmail || !inputPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  const envEmail = (process.env.ADMIN_EMAIL || "admin@airdream.com")
    .trim()
    .toLowerCase();
  const envPassword = (process.env.ADMIN_PASSWORD || "admin123").trim();

  try {
    let authenticatedUser = null;

    // 1. Direct authentication against process.env credentials
    if (inputEmail === envEmail && inputPassword === envPassword) {
      authenticatedUser = {
        id: "admin_env",
        email: envEmail,
        name: "Administrator",
        role: "admin",
      };
    } else {
      // 2. Database authentication against MongoDB Admin collection
      const admin = await Admin.findOne({ email: inputEmail });
      if (admin) {
        const isMatch = await bcrypt.compare(inputPassword, admin.password);
        if (isMatch) {
          authenticatedUser = {
            id: admin._id,
            email: admin.email,
            name: admin.name || "Administrator",
            role: admin.role || "admin",
          };
        }
      }
    }

    if (!authenticatedUser) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid admin credentials" });
    }

    const token = jwt.sign(
      {
        id: authenticatedUser.id,
        email: authenticatedUser.email,
        role: authenticatedUser.role,
      },
      process.env.JWT_SECRET || "airdream_jwt_secret",
      { expiresIn: "7d" },
    );

    return res.json({
      success: true,
      token,
      admin: authenticatedUser,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    // Fallback if DB error occurs but credentials match env
    if (inputEmail === envEmail && inputPassword === envPassword) {
      const token = jwt.sign(
        { id: "admin_env", email: envEmail, role: "admin" },
        process.env.JWT_SECRET || "airdream_jwt_secret",
        { expiresIn: "7d" },
      );
      return res.json({
        success: true,
        token,
        admin: {
          id: "admin_env",
          email: envEmail,
          name: "Administrator",
          role: "admin",
        },
      });
    }
    return res
      .status(500)
      .json({ success: false, message: "Server error during authentication" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    if (req.admin && (req.admin.id === "admin_env" || !req.admin.id)) {
      return res.json({
        id: "admin_env",
        email: process.env.ADMIN_EMAIL || "admin@airdream.com",
        name: "Administrator",
        role: "admin",
      });
    }

    const admin = await Admin.findById(req.admin.id).select("-password");
    if (!admin) {
      return res.json({
        id: req.admin.id,
        email:
          req.admin.email || process.env.ADMIN_EMAIL || "admin@airdream.com",
        name: "Administrator",
        role: "admin",
      });
    }
    return res.json(admin);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.seedAdmin = async () => {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@airdream.com")
      .trim()
      .toLowerCase();
    const adminPassword = (process.env.ADMIN_PASSWORD || "admin123").trim();

    let admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      await Admin.create({
        email: adminEmail,
        password: adminPassword,
        name: "Administrator",
      });
      console.log(`[Auth] Default admin initialized: ${adminEmail}`);
    } else {
      const isMatch = await bcrypt.compare(adminPassword, admin.password);
      if (!isMatch) {
        admin.password = adminPassword;
        await admin.save();
        console.log(
          `[Auth] Admin password synced with .env for: ${adminEmail}`,
        );
      }
    }
  } catch (error) {
    console.error("[Auth] Error seeding admin:", error.message);
  }
};
