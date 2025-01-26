const express = require("express");
const router = express.Router();
const User = require("../models/User");
const stripe = require("../config/stripe");

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const payload = req.body.toString();

    let event;
    console.log("Webhook called");
    try {
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET.trim();
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("Received event:", event.type);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log("Checkout session completed:", session);
        if (session.mode === "subscription") {
          try {
            await saveSubscriptionData(session);
          } catch (error) {
            console.error("Error saving subscription data:", error);
            return res
              .status(500)
              .json({ error: "Error saving subscription data" });
          }
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        console.log("Invoice payment succeeded:", invoice.id);
        await updateSubscriptionStatus(
          invoice.subscription,
          invoice.customer,
          "active"
        );
        break;
      }

      case "invoice.payment_failed": {
        const failedInvoice = event.data.object;
        console.log("Invoice payment failed:", failedInvoice.id);
        await updateSubscriptionStatus(
          failedInvoice.subscription,
          failedInvoice.customer,
          "past_due"
        );
        // TODO: Implement logic to notify the customer
        break;
      }

      case "customer.subscription.updated": {
        const updatedSubscription = event.data.object;
        console.log("Subscription updated:", updatedSubscription.id);
        await updateSubscriptionInDatabase(updatedSubscription);
        break;
      }

      case "customer.subscription.deleted": {
        const deletedSubscription = event.data.object;
        console.log("Subscription deleted:", deletedSubscription.id);
        await updateSubscriptionStatus(
          deletedSubscription.id,
          deletedSubscription.customer,
          "canceled"
        );
        break;
      }

      case "customer.subscription.trial_will_end": {
        const trialEndingSoon = event.data.object;
        console.log("Trial ending soon for subscription:", trialEndingSoon.id);
        // TODO: Implement logic to notify the customer
        break;
      }

      case "customer.updated": {
        const updatedCustomer = event.data.object;
        console.log("Customer updated:", updatedCustomer.id);
        await updateCustomerInDatabase(updatedCustomer);
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }
);

async function saveSubscriptionData(session) {
  const { customer, subscription } = session;

  if (!customer || !subscription) {
    console.error("Missing required session data:", {
      customer,
      subscription,
    });
    throw new Error("Missing required session data");
  }

  const subscriptionDetails = await stripe.subscriptions.retrieve(subscription);
  const user = await User.findOne({ stripeCustomerId: customer });

  if (!user) {
    throw new Error(`User not found for Stripe customer: ${customer}`);
  }

  user.subscriptionStatus = subscriptionDetails.status;
  user.subscriptionPlanId = subscriptionDetails.items.data[0].price.id;
  user.subscriptionStart = new Date(
    subscriptionDetails.current_period_start * 1000
  );
  user.subscriptionEnd = new Date(
    subscriptionDetails.current_period_end * 1000
  );
  user.trialEnd = subscriptionDetails.trial_end
    ? new Date(subscriptionDetails.trial_end * 1000)
    : null;
  user.cancelAtPeriodEnd = subscriptionDetails.cancel_at_period_end;

  await user.save();

  return user;
}

async function updateSubscriptionStatus(subscriptionId, customerId, status) {
  const user = await User.findOne({ stripeCustomerId: customerId });
  if (!user) {
    console.error("User not found for customer:", customerId);
    return;
  }

  user.subscriptionStatus = status;
  if (status === "canceled") {
    user.subscriptionEnd = new Date();
  }

  await user.save();
}

async function updateSubscriptionInDatabase(updatedSubscription) {
  const user = await User.findOne({
    stripeCustomerId: updatedSubscription.customer,
  });
  if (!user) {
    console.error("User not found for customer:", updatedSubscription.customer);
    return;
  }

  user.subscriptionStatus = updatedSubscription.status;
  user.subscriptionPlanId = updatedSubscription.items.data[0].price.id;
  user.subscriptionStart = new Date(
    updatedSubscription.current_period_start * 1000
  );
  user.subscriptionEnd = new Date(
    updatedSubscription.current_period_end * 1000
  );
  user.trialEnd = updatedSubscription.trial_end
    ? new Date(updatedSubscription.trial_end * 1000)
    : null;
  user.cancelAtPeriodEnd = updatedSubscription.cancel_at_period_end;

  await user.save();
}

async function updateCustomerInDatabase(updatedCustomer) {
  const user = await User.findOne({ stripeCustomerId: updatedCustomer.id });
  if (!user) {
    console.error("User not found for customer:", updatedCustomer.id);
    return;
  }

  user.email = updatedCustomer.email;
  user.name = updatedCustomer.name;
  // Add any other fields you want to keep in sync

  await user.save();
}

module.exports = router;
