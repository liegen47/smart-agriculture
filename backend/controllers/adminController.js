const User = require("../models/User");
const Field = require("../models/Field");

// Get all users (both admins and farmers)
exports.getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const users = await User.find().select("-password").skip(skip).limit(limit);

    const totalUsers = await User.countDocuments();

    res.status(200).json({
      users,
      pagination: {
        totalUsers,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        hasNextPage: page * limit < totalUsers,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all farmers
exports.getAllFarmers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const farmers = await User.find({ role: "farmer" })
      .select("-password")
      .skip(skip)
      .limit(limit);

    const totalFarmers = await User.countDocuments({ role: "farmer" });

    res.status(200).json({
      users: farmers,
      pagination: {
        totalFarmers,
        currentPage: page,
        totalPages: Math.ceil(totalFarmers / limit),
        hasNextPage: page * limit < totalFarmers,
        hasPrevPage: page > 1,
      },
    });
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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const fields = await Field.find()
      .skip(skip)
      .limit(limit)
      .populate("user", "name email");
    const totalFields = await Field.countDocuments();

    res.status(200).json({
      fields,
      pagination: {
        totalFields,
        currentPage: page,
        totalPages: Math.ceil(totalFields / limit),
        hasNextPage: page * limit < totalFields,
        hasPrevPage: page > 1,
      },
    });
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

    const yieldTrends = Array.isArray(field.yieldTrends)
      ? field.yieldTrends.concat(Math.floor(Math.random() * 100))
      : [Math.floor(Math.random() * 100)];

    const recommendations = [
      "Increase irrigation",
      "Add fertilizers",
      "Reduce pesticide use",
    ];

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

//application stats

exports.getApplicationStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalSubscribedUsers = await User.countDocuments({
      subscriptionStatus: { $in: ["active", "trialing"] },
    });

    const totalFarmers = await User.countDocuments({ role: "farmer" });

    const approvedFarmers = await User.countDocuments({
      role: "farmer",
      isApproved: true,
    });

    const totalFields = await Field.countDocuments();

    // Yield trends (average yield per field)
    const fields = await Field.find({}, { yieldTrends: 1 });
    const yieldTrends = fields
      .map((field) => field.yieldTrends)
      .flat()
      .filter((yield) => yield !== undefined);
    const averageYield =
      yieldTrends.length > 0
        ? yieldTrends.reduce((a, b) => a + b, 0) / yieldTrends.length
        : 0;

    // Soil health distribution
    const soilHealthDistribution = await Field.aggregate([
      { $group: { _id: "$soilHealth", count: { $sum: 1 } } },
    ]);

    // Crop health distribution
    const cropHealthDistribution = await Field.aggregate([
      { $group: { _id: "$cropHealth", count: { $sum: 1 } } },
    ]);

    // Subscription status distribution
    const subscriptionStatusDistribution = await User.aggregate([
      { $group: { _id: "$subscriptionStatus", count: { $sum: 1 } } },
    ]);

    // Response data
    res.status(200).json({
      totalUsers,
      totalSubscribedUsers,
      totalFarmers,
      approvedFarmers,
      totalFields,
      averageYield: Math.round(averageYield),
      soilHealthDistribution,
      cropHealthDistribution,
      subscriptionStatusDistribution,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
