const User = require("../models/User");
const Field = require("../models/Field");

// Get all users (both admins and farmers)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords from the response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all farmers
exports.getAllFarmers = async (req, res) => {
  try {
    const farmers = await User.find({ role: "farmer" }).select("-password");
    res.status(200).json(farmers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Approve or reject a farmer
exports.approveFarmer = async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;

    const farmer = await User.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true }
    ).select("-password");

    if (!farmer || farmer.role !== "farmer") {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.status(200).json(farmer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a farmer
exports.deleteFarmer = async (req, res) => {
  try {
    const { id } = req.params;

    const farmer = await User.findByIdAndDelete(id);

    if (!farmer || farmer.role !== "farmer") {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.status(200).json({ message: "Farmer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all fields
exports.getAllFields = async (req, res) => {
  try {
    const fields = await Field.find().populate("user", "name email");
    res.status(200).json(fields);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get specific field data by ID
exports.getFieldDataById = async (req, res) => {
  const { id } = req.params;

  try {
    const field = await Field.findById(id).populate("user", "name email");

    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    res.status(200).json(field);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get field analytics
exports.getFieldAnalytics = async (req, res) => {
  try {
    const { id } = req.params;
    const field = await Field.findById(id);

    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    // Dummy AI data
    const soilHealth = ["Poor", "Fair", "Good", "Excellent"][
      Math.floor(Math.random() * 4)
    ];
    const cropHealth = ["Poor", "Fair", "Good", "Excellent"][
      Math.floor(Math.random() * 4)
    ];

    // Ensure yieldTrends is an array before concatenating
    const yieldTrends = Array.isArray(field.yieldTrends)
      ? field.yieldTrends.concat(Math.floor(Math.random() * 100))
      : [Math.floor(Math.random() * 100)]; // Initialize with a random yield value if yieldTrends is not an array

    const recommendations = [
      "Increase irrigation",
      "Add fertilizers",
      "Reduce pesticide use",
    ];

    // Update field with AI data
    field.soilHealth = soilHealth;
    field.cropHealth = cropHealth;
    field.yieldTrends = yieldTrends;

    await field.save();

    res.status(200).json({
      soilHealth,
      cropHealth,
      yieldTrends,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
