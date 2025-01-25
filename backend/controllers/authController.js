const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

// Register user
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user.id);
    // res.cookie("token", token, {
    //   httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    //   secure: process.env.NODE_ENV === "production",
    // });
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user.id);
      // res.cookie("token", token, {
      //   httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      //   secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS
      // });
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//admin login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the user is an admin
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id);
    // res.cookie("token", token, {
    //   httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    //   secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS
    // });
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.authVerify = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).json({
      message: "Token is valid",
      user: { id: decoded.id },
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
// Logout user
exports.logoutUser = async (req, res) => {
  try {
    // Clear the token from the authorization header
    delete req.headers.authorization; // Remove the authorization header
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
