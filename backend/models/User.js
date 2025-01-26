const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "farmer"], default: "farmer" },
  isApproved: { type: Boolean, default: false },
  clientReferenceId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },

  // Subscription-related fields
  stripeCustomerId: { type: String, default: null },
  subscriptionStatus: {
    type: String,
    enum: ["active", "inactive", "past_due", "canceled", "trialing"],
    default: "inactive",
  },
  subscriptionPlanId: { type: String, default: null },
  subscriptionStart: { type: Date, default: null },
  subscriptionEnd: { type: Date, default: null },
  trialEnd: { type: Date, default: null },
  cancelAtPeriodEnd: { type: Boolean, default: false },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.hasActiveSubscription = function () {
  return (
    this.subscriptionStatus === "active" ||
    this.subscriptionStatus === "trialing"
  );
};

UserSchema.methods.isSubscriptionExpiringSoon = function (daysThreshold = 7) {
  if (!this.subscriptionEnd) return false;
  const daysUntilExpiration =
    (this.subscriptionEnd - new Date()) / (1000 * 60 * 60 * 24);
  return daysUntilExpiration <= daysThreshold;
};

module.exports = mongoose.model("User", UserSchema);
