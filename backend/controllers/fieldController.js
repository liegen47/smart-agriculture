const Field = require("../models/Field");
const mongoose = require("mongoose");
// Get all fields for a user
exports.getFields = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const fields = await Field.find({ user: req.user.id })
      .skip(skip)
      .limit(limit);

    const totalFields = await Field.countDocuments({ user: req.user.id });

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
    res
      .status(500)
      .json({ message: "Error fetching fields", error: error.message });
  }
};
//field states
exports.getFieldStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Ensure userId is a string
    const userIdString = userId.toString();

    // Aggregate field data
    const stats = await Field.aggregate([
      // Match fields for the current user
      { $match: { user: new mongoose.Types.ObjectId(userIdString) } },
      {
        $group: {
          _id: "$user",
          totalFields: { $sum: 1 }, // Count of fields
          totalArea: { $sum: "$areaSize" }, // Sum of all field areas
          averageArea: { $avg: "$areaSize" }, // Average area size
          minArea: { $min: "$areaSize" }, // Smallest field area
          maxArea: { $max: "$areaSize" }, // Largest field area
        },
      },
      // Project the results
      {
        $project: {
          _id: 0, // Exclude the MongoDB _id field
          totalFields: 1,
          totalArea: 1,
          averageArea: 1,
          minArea: 1,
          maxArea: 1,
        },
      },
    ]);

    if (stats.length === 0) {
      return res.status(200).json({
        totalFields: 0,
        totalArea: 0,
        averageArea: 0,
        minArea: 0,
        maxArea: 0,
      });
    }

    res.status(200).json(stats[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching field statistics",
      error: error.message,
    });
  }
};
// Add a new field
exports.addField = async (req, res) => {
  const { name, location, cropTypes, areaSize } = req.body;

  try {
    const newField = await Field.create({
      name,
      location,
      cropTypes,
      areaSize,
      user: req.user.id,
    });
    res.status(201).json(newField);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding field", error: error.message });
  }
};
// Get specific field data by ID
exports.getFieldData = async (req, res) => {
  const { id } = req.params;

  try {
    const field = await Field.findById(id).where({ user: req.user.id });

    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    res.status(200).json(field);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching field data", error: error.message });
  }
};

// Update an existing field
exports.updateField = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedField = await Field.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true } // Returns the updated document
    );

    if (!updatedField) {
      return res.status(404).json({ message: "Field not found" });
    }

    res.status(200).json(updatedField);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating field", error: error.message });
  }
};

// Delete a field
exports.deleteField = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedField = await Field.findByIdAndDelete(id);

    if (!deletedField) {
      return res.status(404).json({ message: "Field not found" });
    }

    res.status(200).json({ message: "Field deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting field", error: error.message });
  }
};
//analyzeField function
exports.analyzeField = async (req, res) => {
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
};
