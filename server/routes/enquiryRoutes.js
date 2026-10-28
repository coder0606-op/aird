const express = require("express");
const router = express.Router();
const enquiryController = require("../controllers/enquiryController");

router.post("/", enquiryController.createEnquiry); // Public route for website booking and quote forms
router.get("/", enquiryController.getAllEnquiries); // Retrieve inquiries (admin + fallback)
router.put("/:id/read", enquiryController.markAsRead); // Toggle or update read status
router.delete("/:id", enquiryController.deleteEnquiry); // Delete inquiry

module.exports = router;
