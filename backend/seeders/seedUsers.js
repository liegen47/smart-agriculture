const connectDB = require("../config/db");
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const dotenv = require("dotenv");
const stripe = require("stripe");

dotenv.config();

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

// Function to create a Stripe customer
const createStripeCustomer = async (email, name) => {
  try {
    const customer = await stripeClient.customers.create({
      email,
      name,
    });
    return customer.id;
  } catch (error) {
    console.error("Error creating Stripe customer:", error);
    return null;
  }
};

// Function to generate a fake user
const generateFakeUser = async (role) => {
  const name = faker.person.fullName();
  // Generate email based on role
  const email =
    role === "admin"
      ? faker.internet.email({
          firstName: name.split(" ")[0],
          lastName: name.split(" ")[1],
          provider: "naturesense.com",
        })
      : faker.internet.email();

  const password = "password123";
  const isApproved = role === "farmer" ? faker.datatype.boolean() : true;

  const hashedPassword = await bcrypt.hash(password, 10);

  const subscriptionStatus = faker.helpers.arrayElement([
    "active",
    "inactive",
    "past_due",
    "canceled",
    "trialing",
  ]);

  const stripeCustomerId = await createStripeCustomer(email, name);

  return {
    name,
    email,
    password: hashedPassword,
    role,
    isApproved,
    stripeCustomerId,
    clientReferenceId: faker.string.uuid(),
    subscriptionStatus,
    subscriptionPlanId:
      subscriptionStatus !== "inactive" ? faker.string.alphanumeric(14) : null,
    subscriptionStart:
      subscriptionStatus !== "inactive" ? faker.date.past() : null,
    subscriptionEnd:
      subscriptionStatus !== "inactive" ? faker.date.future() : null,
    trialEnd: subscriptionStatus === "trialing" ? faker.date.future() : null,
    cancelAtPeriodEnd:
      subscriptionStatus === "active" ? faker.datatype.boolean() : false,
  };
};

// Seed the database with fake users
const seedUsers = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Delete all existing users
    await User.deleteMany({});
    console.log("Deleted all existing users.");

    // Generate fake admins
    const admins = await Promise.all(
      Array.from({ length: 2 }, () => generateFakeUser("admin"))
    );
    await User.insertMany(admins);
    console.log("Added 2 admin users with @naturesense.com emails");

    // Generate fake farmers
    const farmers = await Promise.all(
      Array.from({ length: 10 }, () => generateFakeUser("farmer"))
    );
    await User.insertMany(farmers);
    console.log("Added 10 farmer users.");

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Database connection closed.");
  }
};

// Run the seeder
seedUsers();
