require("dotenv").config(); // Load environment variables
const connectDB = require("../config/db");
const { faker } = require("@faker-js/faker");
const Field = require("../models/Field");
const mongoose = require("mongoose");
const User = require("../models/User");

// Function to generate a fake field
const generateFakeField = (userId) => {
  const name = faker.lorem.words(2); // Generate a random field name
  const latitude = faker.location.latitude();
  const longitude = faker.location.longitude();
  const cropType = faker.helpers.arrayElement([
    "Wheat",
    "Corn",
    "Rice",
    "Soybean",
    "Barley",
  ]);
  const areaSize = faker.number.float({ min: 1, max: 100, precision: 0.1 });

  // Dummy AI data
  const soilHealth = faker.helpers.arrayElement([
    "Poor",
    "Fair",
    "Good",
    "Excellent",
  ]);
  const cropHealth = faker.helpers.arrayElement([
    "Poor",
    "Fair",
    "Good",
    "Excellent",
  ]);
  const yieldTrends = Array.from({ length: 5 }, () =>
    faker.number.int({ min: 10, max: 100 })
  ); // Generate 5 random yield values
  const recommendations = faker.helpers.arrayElements([
    "Increase irrigation",
    "Add fertilizers",
    "Reduce pesticide use",
    "Monitor soil moisture",
    "Rotate crops",
  ]);

  return {
    name,
    location: { latitude, longitude },
    cropType,
    areaSize,
    soilHealth,
    cropHealth,
    yieldTrends,
    recommendations,
    user: userId,
  };
};

// Seed the database with fake fields
const seedFields = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all farmers from the database
    const farmers = await User.find({ role: "farmer" });
    if (farmers.length === 0) {
      console.error("No farmers found. Please seed users first.");
      process.exit(1);
    }

    // Delete all existing fields
    await Field.deleteMany({});
    console.log("Deleted all existing fields.");

    // Generate fake fields
    const fields = [];
    for (let i = 0; i < 20; i++) {
      const randomFarmer = faker.helpers.arrayElement(farmers); // Pick a random farmer
      const field = generateFakeField(randomFarmer._id);
      fields.push(field);
    }

    // Insert fields into the database
    await Field.insertMany(fields);
    console.log("Added 20 fields.");

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect();
  }
};

// Run the seeder
seedFields();
