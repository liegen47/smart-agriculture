const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const fieldRoutes = require("./routes/fieldRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { swaggerUi, swaggerSpec } = require("./swagger");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN.split(","),
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/", (req, res) => {
  res.send("Smart Agriculture API is running");
});
// Base route for authentication
app.use("/api/auth", authRoutes);
// Base route for field management
app.use("/api/fields", fieldRoutes);
// Base route for admin operations
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
