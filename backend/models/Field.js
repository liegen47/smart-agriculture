const mongoose = require("mongoose");

const FieldSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    cropType: { type: String, required: true },
    areaSize: { type: Number, required: true },
    soilHealth: { type: String, default: "Unknown" },
    cropHealth: { type: String, default: "Unknown" },
    yieldTrends: { type: [Number], default: [] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

module.exports = mongoose.model("Field", FieldSchema);
