const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  stripeCustomerId: {
    type: String,
    required: true,
    unique: true,
  },
  stripeSubscriptionId: {
    type: String,
    required: true,
    unique: true,
  },
  clientReferenceId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "canceled", "past_due"],
  },
  planId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
