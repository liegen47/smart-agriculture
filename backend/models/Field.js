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
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

module.exports = mongoose.model("Field", FieldSchema);
