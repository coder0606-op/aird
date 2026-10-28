const Enquiry = require("../models/Enquiry");
const store = require("../utils/dataStore");

exports.createEnquiry = async (req, res) => {
  try {
    const enquiryData = {
      fullName:
        req.body.fullName ||
        req.body.name ||
        req.body.custName ||
        "Valued Customer",
      phone:
        req.body.phone ||
        req.body.custPhone ||
        req.body.phoneOrWhatsApp ||
        "+971 58 833 8927",
      email: req.body.email || req.body.custEmail || "customer@example.com",
      city: req.body.city || "",
      destination: req.body.destination || "",
      serviceRequired:
        req.body.serviceRequired || req.body.title || "General Inquiry",
      message: req.body.message || "",
      isRead: false,
      createdAt: req.body.createdAt || new Date().toISOString(),
    };

    let savedEnquiry = null;

    // 1. Save to MongoDB if reachable
    try {
      const newEnquiry = new Enquiry(enquiryData);
      savedEnquiry = await newEnquiry.save();
    } catch (dbErr) {
      console.warn("[Enquiry DB save fallback]", dbErr.message);
    }

    // 2. Always persist to dataStore.json
    const id = savedEnquiry?._id
      ? savedEnquiry._id.toString()
      : req.body._id || `enq-${Date.now()}`;
    const storedItem = store.add("enquiries", {
      ...enquiryData,
      _id: id,
      id: id,
      createdAt: savedEnquiry?.createdAt || enquiryData.createdAt,
    });

    const result = savedEnquiry ? savedEnquiry.toObject() : storedItem;
    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      enquiry: { ...result, _id: id, id: id },
    });
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return res
      .status(400)
      .json({
        success: false,
        message: "Error submitting enquiry",
        error: error.message,
      });
  }
};

exports.getAllEnquiries = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 100;
    const page = parseInt(req.query.page, 10) || 1;
    const skip = (page - 1) * limit;

    let dbEnquiries = [];
    try {
      dbEnquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
    } catch (e) {
      console.warn("[Enquiry DB fallback]", e.message);
    }

    const fileEnquiries = store.get("enquiries") || [];

    // Merge both sources deduplicating by ID
    const mergedMap = new Map();
    [...dbEnquiries, ...fileEnquiries].forEach((item) => {
      const id = String(item._id || item.id || "");
      if (id && !mergedMap.has(id)) {
        mergedMap.set(id, {
          ...item,
          _id: id,
          id: id,
        });
      }
    });

    const allEnquiries = Array.from(mergedMap.values()).sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
    );

    const total = allEnquiries.length;
    const paginated = allEnquiries.slice(skip, skip + limit);

    return res.json({
      success: true,
      enquiries: paginated,
      totalPages: Math.ceil(total / limit) || 1,
      currentPage: page,
      total,
    });
  } catch (error) {
    const allStored = store.get("enquiries") || [];
    return res.json({
      success: true,
      enquiries: allStored,
      totalPages: 1,
      currentPage: 1,
      total: allStored.length,
    });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const isRead = req.body.isRead !== undefined ? req.body.isRead : true;
    const updatedStore = store.update("enquiries", req.params.id, { isRead });
    let enquiry = updatedStore;
    try {
      if (req.params.id && req.params.id.length === 24) {
        enquiry = await Enquiry.findByIdAndUpdate(
          req.params.id,
          { isRead },
          { new: true },
        ).lean();
      }
    } catch (e) {}
    return res.json({ success: true, enquiry: enquiry || updatedStore });
  } catch (error) {
    const isRead = req.body.isRead !== undefined ? req.body.isRead : true;
    const updatedStore = store.update("enquiries", req.params.id, { isRead });
    return res.json({ success: true, enquiry: updatedStore });
  }
};

exports.deleteEnquiry = async (req, res) => {
  try {
    store.delete("enquiries", req.params.id);
    try {
      if (req.params.id && req.params.id.length === 24) {
        await Enquiry.findByIdAndDelete(req.params.id);
      }
    } catch (e) {}
    return res.json({ success: true, message: "Enquiry deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
