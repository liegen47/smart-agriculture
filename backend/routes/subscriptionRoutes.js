const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const subscriptionData = {
      subscriptionStatus: user.subscriptionStatus,
      subscriptionPlanId: user.subscriptionPlanId,
      subscriptionStart: user.subscriptionStart,
      subscriptionEnd: user.subscriptionEnd,
      trialEnd: user.trialEnd,
      cancelAtPeriodEnd: user.cancelAtPeriodEnd,
      stripeCustomerId: user.stripeCustomerId,
      clientReferenceId: user.clientReferenceId,
    };

    res.json(subscriptionData);
  } catch (error) {
    console.error("Error fetching subscription data:", error);
    res.status(500).json({ error: "Error fetching subscription data" });
  }
});

module.exports = router;
