const connectDB = require("../config/db"); // Import your database connection
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Adjust the path to your User model
const dotenv = require("dotenv");
dotenv.config();

// Function to generate a fake user
const generateFakeUser = async (role) => {
  const name = faker.person.fullName();
  const email = faker.internet.email();
  const password = "password123"; // Default password for all fake users
  const isApproved = role === "farmer" ? faker.datatype.boolean() : true; // Farmers may or may not be approved

  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 10);

  return {
    name,
    email,
    password: hashedPassword,
    role,
    isApproved,
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
    console.log("Added 2 admin users.");

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
    mongoose.disconnect();
  }
};

// Run the seeder
seedUsers();
